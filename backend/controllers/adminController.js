import Booking from "../models/Booking.js";
import Inquiry from "../models/Inquiry.js";

export const getAllLeads = async (req, res) => {
  try {
    const bookings = await Booking.find();
    const inquiries = await Inquiry.find();
    res.status(200).json({ bookings, inquiries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
