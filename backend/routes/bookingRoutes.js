import express from "express";
import { submitBooking,updateBookingStatus } from "../controllers/bookingController.js"; // Add .js extension for ES modules

const router = express.Router();

router.post("/", submitBooking);
router.patch("/:id/status", updateBookingStatus);

export default router; // Use ES module default export
