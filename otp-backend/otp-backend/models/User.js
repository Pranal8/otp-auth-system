const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  otp: String,
  otpExpiry: Date,
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);