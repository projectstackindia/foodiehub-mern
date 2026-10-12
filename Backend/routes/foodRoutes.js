const express = require('express');
const {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
} = require('../controllers/foodController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { addFoodLimiter, editFoodLimiter, deleteFoodLimiter } = require('../middleware/adminRateLimiter');

const router = express.Router();

// Public routes (no rate limit)
router.get('/', getFoods);
router.get('/:id', getFoodById);

// Admin routes with rate limiting
router.post('/', protect, admin, addFoodLimiter, upload.single('image'), createFood);
router.put('/:id', protect, admin, editFoodLimiter, upload.single('image'), updateFood);
router.delete('/:id', protect, admin, deleteFoodLimiter, deleteFood);

module.exports = router;