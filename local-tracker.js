const http = require('http');
const https = require('https');

const WEBHOOK = 'https://discord.com/api/webhooks/1464006669796118610/NtLug816A6N5psWgUjMrUBFe-yRtvmPvmIC8hMrbORLuDrxP4QnErus1K5XH2pKlqXi9';

const server = http.createServer((req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ua = req.headers['user-agent'] || 'unknown';
  
  // Log to webhook
  try {
    const data = JSON.stringify({content: `📸 **View** ${ip} | ${ua}`});
    const url = new URL(WEBHOOK);
    const opts = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data)}
    };
    https.request(opts).end(data);
  } catch (e) {}
  
  // Return 1x1 GIF
  res.setHeader('Content-Type', 'image/gif');
  res.end(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
});

server.listen(3000, () => console.log('Tracker on :3000'));