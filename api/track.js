export default function handler(req, res) {
  // Log the view
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ua = req.headers['user-agent'] || 'unknown';
  
  // Use native fetch (available in Node 18+)
  fetch('https://discord.com/api/webhooks/1464006669796118610/NtLug816A6N5psWgUjMrUBFe-yRtvmPvmIC8hMrbORLuDrxP4QnErus1K5XH2pKlqXi9', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({content: `📸 **Image View**\nIP: ${ip}\nAgent: ${ua}`})
  }).catch(() => {});
  
  // Return a 400x300 SVG image (looks like an image preview)
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#4a90d9"/><text x="200" y="150" font-size="24" fill="white" text-anchor="middle">Image</text></svg>`);
}// trigger deployment
