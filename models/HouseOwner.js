const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    roomSize: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    availabilityDate: {
      type: Date,
      required: true,
    },
    rentPerMonth: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Regex pattern for Bangladeshi phone numbers (starting with +880 or 0)
          return /^(?:\+880|0)1[3-9]\d{8}$/.test(value);
        },
        message: "Please enter a valid Bangladeshi phone number.",
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("House", houseSchema);
