const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  house: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "House",
    required: true,
  },
  renterName: {
    type: String,
    required: true,
  },
  renterEmail: {
    type: String,
    required: true,
  },
  renterPhone: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
