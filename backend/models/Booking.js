import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  // Define the schema for booking details
  userName: { type: String, required: true },
  userPhone: { type: String, required: true },
  moveInDate: { type: Date, required: true },
  transactionId: { type: String, required: true },
  roomId: { type: String, required: false }, // Change ObjectId to String
  roomName: { type: String, required: false }, // Optional for PricingPage
  roomPrice: { type: Number, required: false }, // Optional for PricingPage
  planName: { type: String, required: false }, // Optional for RoomsPage
  planPrice: { type: Number, required: false }, // Optional for RoomsPage
  totalAmount: { type: Number, required: true }, // Common field
  status: { type: String, default: "Pending" }, // Pending, Confirmed, Rejected
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking; // Use ES module default export
