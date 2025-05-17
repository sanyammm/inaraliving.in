// controllers/adminAuth.js
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ token, user: { email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
