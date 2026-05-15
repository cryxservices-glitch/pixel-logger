module.exports = async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const referer = req.headers['referer'] || 'Direct';
  
  console.log(`Pixel hit: ${ip} | ${userAgent} | ${referer}`);
  
  if (process.env.WEBHOOK_URL) {
    try {
      await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: `📸 ${ip} | ${userAgent}`})
      });
    } catch (e) {}
  }
  
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-cache');
  res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
};