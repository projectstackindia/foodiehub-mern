const Food = require('../models/Food');
const path = require('path');
const fs = require('fs');

// Validation helpers
const validateTitle = (title) => {
  if (!title || title.trim().length < 3) return 'Title must be at least 3 characters';
  return null;
};

const validateDescription = (desc) => {
  if (!desc) return 'Description is required';
  const len = desc.trim().length;
  if (len < 20) return 'Description must be at least 20 characters';
  if (len > 100) return 'Description must not exceed 100 characters';
  return null;
};

const validatePrice = (price) => {
  const num = parseFloat(price);
  if (isNaN(num) || num <= 0) return 'Price must be a positive number';
  return null;
};

exports.getFoods = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const foods = await Food.find(query).sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFood = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const titleError = validateTitle(title);
    if (titleError) return res.status(400).json({ message: titleError });

    const descError = validateDescription(description);
    if (descError) return res.status(400).json({ message: descError });

    const priceError = validatePrice(price);
    if (priceError) return res.status(400).json({ message: priceError });

    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const food = await Food.create({
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category,
      image,
    });

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    const { title, description, price, category } = req.body;
    let image = food.image;

    if (title !== undefined) {
      const titleError = validateTitle(title);
      if (titleError) return res.status(400).json({ message: titleError });
    }
    if (description !== undefined) {
      const descError = validateDescription(description);
      if (descError) return res.status(400).json({ message: descError });
    }
    if (price !== undefined) {
      const priceError = validatePrice(price);
      if (priceError) return res.status(400).json({ message: priceError });
    }

    if (req.file) {
      // 🔥 FIX: Only delete old image if it's a local file (starts with /uploads/)
      if (food.image && food.image.startsWith('/uploads/')) {
        const oldImagePath = path.join(__dirname, '..', food.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      image = `/uploads/${req.file.filename}`;
    }

    food.title = title !== undefined ? title.trim() : food.title;
    food.description = description !== undefined ? description.trim() : food.description;
    food.price = price !== undefined ? parseFloat(price) : food.price;
    food.category = category || food.category;
    food.image = image;

    const updatedFood = await food.save();
    res.json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    // 🔥 FIX: Only delete image file if it's a local upload (starts with /uploads/)
    if (food.image && food.image.startsWith('/uploads/')) {
      const imagePath = path.join(__dirname, '..', food.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await food.deleteOne();
    res.json({ message: 'Food removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};