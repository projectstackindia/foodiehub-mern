const express = require('express');
const { register, login, getUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { loginLimiter, registerLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', registerLimiter, register);
router.post('/login', loginLimiter, login);
router.get('/user', protect, getUser);

module.exports = router;