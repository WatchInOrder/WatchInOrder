// api/create-checkout.js
// Vercel serverless function — handles Stripe checkout session creation
// Deploy this by placing it in /api/ folder — Vercel auto-deploys it as a serverless function

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { priceId, email, userId } = req.body;

  if (!priceId || !email) {
    return res.status(400).json({ error: 'Missing priceId or email' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        userId: userId || email,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://watchinorder.com'}/?pro=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://watchinorder.com'}/?pro=cancelled`,
      subscription_data: {
        trial_period_days: 7, // 7-day free trial
        metadata: {
          userId: userId || email,
        },
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: error.message });
  }
}
