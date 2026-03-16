// api/newsletter.js
// Serverless function to add subscribers to ConvertKit without exposing API key client-side

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const FORM_ID = process.env.CONVERTKIT_FORM_ID;
  const API_KEY = process.env.CONVERTKIT_API_KEY;

  if (!FORM_ID || !API_KEY) {
    // If not configured, silently succeed (dev mode)
    console.log('ConvertKit not configured — email would be:', email);
    return res.status(200).json({ success: true });
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: API_KEY,
          email,
          tags: ['watchinorder-subscriber'],
        }),
      }
    );

    const data = await response.json();

    if (data.subscription) {
      return res.status(200).json({ success: true });
    } else {
      throw new Error(data.message || 'ConvertKit error');
    }
  } catch (error) {
    console.error('Newsletter error:', error);
    // Don't surface errors to the user
    return res.status(200).json({ success: true });
  }
}
