export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ua = req.headers['user-agent'] || 'unknown';
  
  const data = JSON.stringify({content: `📸 **View** ${ip} | ${ua}`});
  const webhook = 'https://discord.com/api/webhooks/1464006669796118610/NtLug816A6N5psWgUjMrUBFe-yRtvmPvmIC8hMrbORLuDrxP4QnErus1K5XH2pKlqXi9';
  
  // Log to webhook (non-blocking)
  fetch(webhook, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: data
  }).catch(() => {});
  
  // Return 1x1 transparent GIF (works everywhere)
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
}