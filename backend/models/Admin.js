import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String, // hashed
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin; // Use ES module default export
