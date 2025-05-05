import Inquiry from "../models/Inquiry.js";

export const submitInquiry = async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json({ message: "Inquiry submitted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
