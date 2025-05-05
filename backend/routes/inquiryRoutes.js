import express from "express";
import { submitInquiry } from "../controllers/inquiryController.js"; // Add .js extension for ES modules

const router = express.Router();

router.post("/", submitInquiry);

export default router; // Use ES module default export
