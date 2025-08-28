const connectDB = require("./config/db");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

connectDB(startServer);

// Simple API Route
app.get("/", (req, res) => {
  res.send("🚀 Node.js + MongoDB Backend Running!");
});

// Routes
app.use("/api/products", productRoutes);
