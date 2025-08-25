require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const URI =
  "mongodb+srv://sample123:sample123@phfloodwatch.aknndmt.mongodb.net/ecom-platform?retryWrites=true&w=majority&appName=PHFloodWatch";

// Connect to MongoDB Atlas
mongoose
  .connect(URI)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    // Start Server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Simple API Route
app.get("/", (req, res) => {
  res.send("🚀 Node.js + MongoDB Backend Running!");
});
