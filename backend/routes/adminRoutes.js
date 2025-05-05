import express from "express";
import { getAllLeads } from "../controllers/adminController.js"; // Add .js extension for ES modules

const router = express.Router();

router.get("/leads", getAllLeads);

export default router; // Use ES module default export
