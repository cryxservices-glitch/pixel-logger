module.exports = async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'Unknown';
  
  const logEntry = `Image View - IP: ${ip} - ${userAgent}`;
  
  if (process.env.WEBHOOK_URL) {
    try {
      const response = await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({content: logEntry})
      });
    } catch (e) {}
  }
  
  res.setHeader('Content-Type', 'image/gif');
  res.send('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
};