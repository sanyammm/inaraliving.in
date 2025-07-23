import Booking from "../models/Booking.js"; // Import the Booking model

export const submitBooking = async (req, res) => {
  try {
    console.log("Received booking data:", req.body); // 👈 log incoming data

    const {
      roomId,
      roomName,
      roomPrice,
      planName,
      planPrice,
      userName,
      userPhone,
      moveInDate,
      transactionId,
      totalAmount,
    } = req.body;

    if (
      !userName ||
      !userPhone ||
      !moveInDate ||
      !transactionId ||
      !totalAmount
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const booking = new Booking({
      roomId: roomId || null,
      roomName: roomName || null,
      roomPrice: roomPrice || null,
      planName: planName || null,
      planPrice: planPrice || null,
      userName,
      userPhone,
      moveInDate: new Date(moveInDate), // ensure proper type
      transactionId,
      totalAmount,
      status: "Pending",
    });

    await booking.save();
    res
      .status(201)
      .json({ message: "Booking request submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving booking:", error); // 👈 log detailed error
    res.status(500).json({ message: "Failed to submit booking request." });
  }
};

// controllers/bookingController.js
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
