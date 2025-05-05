import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
  name: String,
  phone: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Inquiry = mongoose.model("Inquiry", InquirySchema);

export default Inquiry; // Use ES module default export
