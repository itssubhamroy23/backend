const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product_model");
require("dotenv").config(); // Load environment variables from .env file
const MONGODB_URL = process.env.MONGODB_URL; // Get MongoDB URL from environment variables

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("this is the homepage");
});

// About Page
app.get("/about", (req, res) => {
  res.send(
    "https://drive.google.com/file/d/0B-Bn8BSb6ghDc3BuTlFiSF9xZ09TekVrcm9mLWw5anpRRGNV/view?usp=sharing&resourcekey=0-lKwU6HZ_h4l6MvR2RJgNlQ"
  );
});

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });
