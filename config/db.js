require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB Atlas
const connectDB = (starServer) => {
  return mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("✅ Connected to MongoDB Atlas");
      // Start Server
      starServer();
    })
    .catch((err) => console.log("❌ MongoDB Error:", err));
};

module.exports = connectDB;
