const User = require("../models/User");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_API_KEY_SID,
  process.env.TWILIO_API_KEY_SECRET,
  {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
  }
);
// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// SEND OTP
exports.sendOTP = async (req, res) => {
  const { phone } = req.body;

  try {
    const otp = generateOTP();

    const formattedPhone = phone.startsWith("+")
      ? phone
      : `+91${phone}`;

    // Save OTP in DB (IMPORTANT)
    let user = await User.findOne({ phone: formattedPhone });

    if (!user) {
      user = new User({ phone: formattedPhone });
    }

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    user.isVerified = false;

    await user.save();

    // Send SMS
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE,
      to: formattedPhone,
    });

    res.json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("Twilio Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

// VERIFY OTP
exports.verifyOTP = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const formattedPhone = phone.startsWith("+")
      ? phone
      : `+91${phone}`;

    const user = await User.findOne({ phone: formattedPhone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Verified successfully",
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};