const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { getDB } = require("../db");

// GET all products
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const db = getDB();
    const product = await db.collection("products").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new product
router.post("/", async (req, res) => {
  try {
    const db = getDB();
    const { name, price, description, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    const result = await db.collection("products").insertOne({
      name,
      price: parseFloat(price),
      description: description || "",
      category: category || "uncategorized",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      _id: result.insertedId,
      ...req.body,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update product
router.put("/:id", async (req, res) => {
  try {
    const db = getDB();
    const updates = {
      ...req.body,
      updatedAt: new Date(),
    };

    // Remove _id if present in body to prevent changing it
    delete updates._id;

    if (updates.price) {
      updates.price = parseFloat(updates.price);
    }

    const result = await db
      .collection("products")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("products").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
