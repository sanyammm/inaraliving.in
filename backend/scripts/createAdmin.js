// scripts/createAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const admin = new Admin({
  email: "admin@inaraliving.in",
  password: "Sanyam@6399"
});

await admin.save();
console.log("Admin created");

process.exit();
