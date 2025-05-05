import express from "express";
import { submitBooking } from "../controllers/bookingController.js"; // Add .js extension for ES modules

const router = express.Router();

router.post("/", submitBooking);

export default router; // Use ES module default export
