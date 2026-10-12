const express = require('express');
const {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.delete('/remove/:foodId', protect, removeFromCart);
router.put('/update', protect, updateQuantity);

module.exports = router;