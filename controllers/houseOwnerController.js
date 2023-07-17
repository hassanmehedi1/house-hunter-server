const House = require("../models/HouseOwner");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc Get all houses
// @route GET /houses
// @access Private

const getAllHouse = asyncHandler(async (req, res) => {
  // Get all house from MongoDB
  const houses = await House.find().lean();

  // If no houses
  if (!houses?.length) {
    return res.status(400).json({ message: "No houses found" });
  }

  // Add email to each house before sending the response
  const housesWithUser = await Promise.all(
    houses.map(async (house) => {
      const user = await User.findById(house.user).lean().exec();
      return { ...house, email: user.email };
    })
  );

  res.json(housesWithUser);
});

// @desc Create new house
// @route POST /houses
// @access Private
const createNewHouse = asyncHandler(async (req, res) => {
  const {
    user,
    name,
    address,
    city,
    bedrooms,
    bathrooms,
    roomSize,
    picture,
    availabilityDate,
    rentPerMonth,
    phoneNumber,
    description,
  } = req.body;

  // Confirm data
  if (
    !user ||
    !name ||
    !address ||
    !city ||
    !bedrooms ||
    !bathrooms ||
    !roomSize ||
    !picture ||
    !availabilityDate ||
    !rentPerMonth ||
    !phoneNumber ||
    !description
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Create and store the new user
  const house = await House.create({
    user,
    name,
    address,
    city,
    bedrooms,
    bathrooms,
    roomSize,
    picture,
    availabilityDate,
    rentPerMonth,
    phoneNumber,
    description,
  });

  // Populate the user field with the associated User document
  await house.populate("user");

  if (house) {
    // Created
    return res.status(201).json({ message: "New House created", house });
  } else {
    return res.status(400).json({ message: "Invalid House data received" });
  }
});

// @desc Update a house
// @route PATCH /houses
// @access Private
const updateHouse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    address,
    city,
    bedrooms,
    bathrooms,
    roomSize,
    picture,
    availabilityDate,
    rentPerMonth,
    phoneNumber,
    description,
  } = req.body;

  // Confirm data
  if (
    !name ||
    !address ||
    !city ||
    !bedrooms ||
    !bathrooms ||
    !roomSize ||
    !picture ||
    !availabilityDate ||
    !rentPerMonth ||
    !phoneNumber ||
    !description
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm house exists to update
  const house = await House.findById(id).exec();

  if (!house) {
    return res.status(400).json({ message: "House not found" });
  }

  house.name = name;
  house.description = description;
  house.address = address;
  house.city = city;
  house.bedrooms = bedrooms;
  house.bathrooms = bathrooms;
  house.roomSize = roomSize;
  house.picture = picture;
  house.availabilityDate = availabilityDate;
  house.rentPerMonth = rentPerMonth;
  house.phoneNumber = phoneNumber;

  const updatedHouse = await house.save();

  res.json(`'${updatedHouse.name}' updated`);
});

// @desc Delete a house
// @route DELETE /houses
// @access Private
const deleteHouse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm house exists to delete
  const house = await Note.findById(id).exec();

  if (!house) {
    return res.status(400).json({ message: "House not found" });
  }

  const result = await house.deleteOne();

  const reply = `House '${result.name}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllHouse,
  createNewHouse,
  updateHouse,
  deleteHouse,
};
