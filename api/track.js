module.exports = async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const referer = req.headers['referer'] || 'Direct';
  
  const timestamp = new Date().toISOString();
  const logEntry = `📸 Image View [${timestamp}]\nIP: ${ip}\nUA: ${userAgent}\nRef: ${referer}`;
  
  if (process.env.WEBHOOK_URL) {
    try {
      await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: logEntry})
      });
    } catch (e) {}
  }
  
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store');
  res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
};