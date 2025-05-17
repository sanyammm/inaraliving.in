// routes/adminRoutes.js
import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: { email: admin.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
