import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Removed password hashing and matching logic since we'll be doing static validation

export default mongoose.model("Admin", AdminSchema);
