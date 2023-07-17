const User = require("../models/User");
const House = require("../models/HouseOwner");

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// get users
const getAllUsers = asyncHandler(async (req, res) => {
  // Get all users from MongoDB
  const users = await User.find().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
});

// post/create users
const createNewUser = asyncHandler(async (req, res) => {
  const { fullName, password, email, phone, roles } = req.body;

  // Confirm data
  if (
    !email ||
    !fullName ||
    !phone ||
    !password ||
    !Array.isArray(roles) ||
    !roles.length
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate user
  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "User Already Exist" });
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

  const userObject = { fullName, password: hashedPwd, roles, email, phone };

  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${fullName} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

module.exports = {
  getAllUsers,
  createNewUser,
};
