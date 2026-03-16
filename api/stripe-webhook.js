// api/stripe-webhook.js
// Handles Stripe webhook events — called by Stripe after payment succeeds
// Set your webhook endpoint in Stripe Dashboard to: https://watchinorder.com/api/stripe-webhook

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const customerEmail = session.customer_email;

      console.log(`Pro activated for: ${userId || customerEmail}`);

      // TODO: Update your database here
      // When you add Supabase:
      // await supabase.from('users').update({ is_pro: true }).eq('email', customerEmail)

      // For now, the client-side handleSubscribe() sets isPro=true in localStorage
      // Once you have a real backend, move this logic server-side
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      console.log(`Subscription cancelled: ${subscription.id}`);

      // TODO: Set is_pro = false for this customer in your database
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      console.log(`Payment failed for: ${invoice.customer_email}`);

      // TODO: Send dunning email, potentially downgrade account
      break;
    }

    default:
      // Ignore other event types
      console.log(`Unhandled event type: ${event.type}`);
  }

  return res.status(200).json({ received: true });
}

// Required for Stripe webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};
