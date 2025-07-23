import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
  name: String,
  phone: String,
  message: String,
  status: { type: String, default: "pending" }, // Default status is 'pending'
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Inquiry = mongoose.model("Inquiry", InquirySchema);

export default Inquiry; // Use ES module default export
