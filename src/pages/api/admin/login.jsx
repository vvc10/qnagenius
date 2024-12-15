import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASS;

    if (username === adminUsername && password === adminPassword) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  }

  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}
