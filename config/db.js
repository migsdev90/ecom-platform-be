// require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://sample123:sample123@phfloodwatch.aknndmt.mongodb.net/ecom-platform?retryWrites=true&w=majority&appName=PHFloodWatch";

// Connect to MongoDB Atlas
const connectDB = (starServer) => {
  return (
    mongoose
      // .connect(process.env.MONGODB_URI)
      .connect(MONGODB_URI)
      .then(() => {
        console.log("✅ Connected to MongoDB Atlas");
        // Start Server
        starServer();
      })
      .catch((err) => console.log("❌ MongoDB Error:", err))
  );
};

module.exports = connectDB;
