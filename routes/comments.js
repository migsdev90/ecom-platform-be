const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Comment.find({});
    console.log("comment", products);
    console.log("no. of comments", products.length);

    // Format the response to include both _id and id
    const formattedComments = products.map((product) => ({
      id: product._id,
      name: product.name,
      _id: product._id, // Include both if needed
    }));

    res.json({
      success: true,
      count: formattedComments.length,
      data: formattedComments,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Comment.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: {
        id: product._id,
        name: product.name,
        _id: product._id,
      },
    });
  } catch (error) {
    console.error("Error fetching product:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
