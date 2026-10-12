const express = require('express');
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');
const { orderStatusLimiter } = require('../middleware/orderRateLimiter'); // <-- import rate limiter

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/', protect, admin, getAllOrders);
router.put('/:id', protect, admin, orderStatusLimiter, updateOrderStatus); // <-- rate limiter applied

module.exports = router;