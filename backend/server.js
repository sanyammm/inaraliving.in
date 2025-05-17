import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js"; // Add .js extension for ES modules

dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: 'https://inaraliving.in', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Optional: Only if you're using cookies
}));
 // Enable CORS
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
import inquiryRoutes from "./routes/inquiryRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

app.use("/api/inquiry", inquiryRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/admin", adminRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Welcome to Inara Living API");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
// Export app for testing