const Booking = require("../models/HouseBooking");
const House = require("../models/HouseOwner");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc Get all bookings
// @route GET /bookings
// @access Private

/*

// @desc Get renter's bookings
// @route GET /bookings
// @access Private
const getRenterBookings = asyncHandler(async (req, res) => {
  const renterEmail = req.user.email;

  // Get renter's bookings from MongoDB
  const bookings = await Booking.find({ renterEmail }).populate('house').lean();

  // If no bookings
  if (!bookings?.length) {
    return res.status(400).json({ message: "No bookings found for the renter" });
  }

  res.json(bookings);
});

*/

const getAllBooking = asyncHandler(async (req, res) => {
  // Get all booking from MongoDB
  const bookings = await Booking.find().lean();

  // If no bookings
  if (!bookings?.length) {
    return res.status(400).json({ message: "No Bookings found" });
  }

  res.json(bookings);
});

// @desc Create new booking
// @route POST /bookings
// @access Private
const bookHouse = asyncHandler(async (req, res) => {
  const { house, renterName, renterEmail, renterPhone } = req.body;

  // Confirm data
  if (!house || !renterName || !renterEmail || !renterPhone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check the number of existing bookings for the renter
  const existingBookings = await Booking.find({ renterEmail }).countDocuments();

  if (existingBookings >= 2) {
    return res.status(400).json({ message: "Maximum booking limit reached" });
  }

  // Create and store the new booking
  const booking = await Booking.create({
    house,
    renterName,
    renterEmail,
    renterPhone,
  });

  // Populate the house field with the associated House document
  await booking.populate("house");

  if (booking) {
    // Created
    return res.status(201).json({ message: "New Booking created", booking });
  } else {
    return res.status(400).json({ message: "Invalid Booking data received" });
  }
});

// @desc Delete a booking
// @route DELETE /bookings/:id
// @access Private
const deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm booking exists to delete
  const booking = await Booking.findById(id).exec();

  if (!booking) {
    return res.status(400).json({ message: "Booking not found" });
  }

  // Check if the booking belongs to the authenticated House Renter
  if (booking.renterEmail !== req.user.email) {
    return res.status(403).json({ message: "Unauthorized access" });
  }

  const result = await booking.deleteOne();

  const reply = `Booking for House '${result.house.name}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllBooking,
  bookHouse,
  deleteBooking,
};
