import express from "express";
import { submitInquiry, updateInquiryStatus } from "../controllers/inquiryController.js"; // Add .js extension for ES modules

const router = express.Router();

router.post("/", submitInquiry);
router.patch("/:id/status", updateInquiryStatus);

export default router; // Use ES module default export
