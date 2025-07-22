import express from "express";
import { getAllLeads } from "../controllers/adminController.js";

const router = express.Router();

// Hardcoded admin credentials for login
const validEmail = "admin@inaraliving.in";
const validPassword = "Sanyam@6399";

// Login route (static check)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (email === validEmail && password === validPassword) {
    // No JWT token, just respond with a success message
    res.status(200).json({
      message: "Login successful",
      user: { email: validEmail }, // Just return the hardcoded email
    });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// Leads route (No authentication required now)
router.get("/leads", getAllLeads);

export default router;
