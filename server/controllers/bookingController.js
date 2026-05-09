const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
    try {

        const {
            expertId,
            name,
            email,
            phone,
            date,
            timeSlot,
            notes,
        } = req.body;

        // Basic validation
        if (
            !expertId ||
            !name ||
            !email ||
            !phone ||
            !date ||
            !timeSlot
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        // Create booking
        const booking = await Booking.create({
            expertId,
            name,
            email,
            phone,
            date,
            timeSlot,
            notes,
        });

        // Socket.io realtime event
        const io = req.app.get("io");

        io.emit("slotBooked", {
            expertId,
            date,
            timeSlot,
        });

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking,
        });

    } catch (error) {

        // Duplicate booking error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "This slot is already booked",
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("expertId", "name category")
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBookingsByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ success: false, message: "Email is required" });

        const bookings = await Booking.find({ email }).populate("expertId", "name category");
        res.status(200).json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowed = ["Pending", "Confirmed", "Completed"];
        if (!status || !allowed.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Status must be Pending, Confirmed, or Completed",
            });
        }

        const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
        if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

        res.status(200).json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createBooking, getAllBookings, getBookingsByEmail, updateBookingStatus };