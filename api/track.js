const axios = require('axios');

module.exports = async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const userAgent = req.headers['user-agent'] || 'Unknown';
  
  const timestamp = new Date().toISOString();
  const logEntry = `Image View [${timestamp}] IP: ${ip} UA: ${userAgent}`;
  
  if (process.env.WEBHOOK_URL) {
    try {
      await axios.post(process.env.WEBHOOK_URL, { content: logEntry });
    } catch (e) {}
  }
  
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store');
  res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
};