require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;

// MongoDB connection (safe for serverless)
const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Mongo Error:", err.message);
  }
};

connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Local dev server
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
}

// Export for Lambda
module.exports.handler = serverless(app);