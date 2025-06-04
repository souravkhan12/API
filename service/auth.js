const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
}

async function getUser(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById(decoded._id);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
