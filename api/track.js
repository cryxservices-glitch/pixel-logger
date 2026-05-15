const https = require('https');

module.exports = function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ua = req.headers['user-agent'] || 'unknown';
  const ref = req.headers['referer'] || 'Direct';
  
  const data = JSON.stringify({
    content: `📸 **View Logged**\n**IP:** ${ip}\n**Agent:** ${ua.substring(0, 100)}\n**From:** ${ref}`
  });
  
  const webhook = 'https://discord.com/api/webhooks/1464006669796118610/NtLug816A6N5psWgUjMrUBFe-yRtvmPvmIC8hMrbORLuDrxP4QnErus1K5XH2pKlqXi9';
  
  try {
    const url = new URL(webhook);
    const opts = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req2 = https.request(opts, (r) => r.on('data', () => {}));
    req2.write(data);
    req2.end();
  } catch (e) {}
  
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
};