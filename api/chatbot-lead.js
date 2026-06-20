export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).send('Method not allowed');
  }

  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
  if (!webhookUrl) {
    return response.status(503).send('Google Sheets webhook is not configured. Set GOOGLE_APPS_SCRIPT_WEBHOOK_URL in Vercel.');
  }

  try {
    const payload = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    const required = ['name', 'email', 'message'];
    for (const field of required) {
      if (!payload?.[field] || String(payload[field]).trim() === '') {
        return response.status(400).send(`Missing required field: ${field}`);
      }
    }

    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        timestamp: payload.timestamp || new Date().toISOString(),
        name: String(payload.name || '').trim(),
        email: String(payload.email || '').trim(),
        phone: String(payload.phone || '').trim(),
        message: String(payload.message || '').trim(),
        transcript: String(payload.transcript || '').trim(),
        pageUrl: String(payload.pageUrl || '').trim()
      })
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      return response.status(502).send(text || 'Google Sheets webhook failed');
    }

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return response.status(500).send('Unable to submit chatbot lead');
  }
}
