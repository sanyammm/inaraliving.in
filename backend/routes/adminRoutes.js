// routes/adminRoutes.js
import express from "express";
import { adminLogin } from "../controllers/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);

export default router;
