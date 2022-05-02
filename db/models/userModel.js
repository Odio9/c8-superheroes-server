const mongoose = require("../mongoose");
const bcrypt = require("bcryptjs");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAgent: { type: Boolean, default: false },
  superheroId: { type: String, default: "" },
});

const User = model("User", userSchema);

const createUser = async (user) => {
  // hash password with bcrypt

  const hashedPassword = bcrypt.hashSync(user.password);

  const newUser = await User.create({
    ...user,
    password: hashedPassword,
  });

  return newUser;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  console.log(`User is ${user}`);
  return user;
};

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username: username });
  return user;
};

const updateUser = async (id, updateData) => {
  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return updatedUser;
};

const verifyPassword = async (password, hashedPassword) => {
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);
  return passwordsMatch;
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  updateUser,
  verifyPassword,
};
