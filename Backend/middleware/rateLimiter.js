const rateLimit = require('express-rate-limit');

// Global limiter for all other APIs (100 requests per 15 min)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});



const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { message: 'Too many login attempts. Your IP is blocked for 10 minutes. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false, // Count successful attempts too? Usually count only failures. But user wants total attempts. Let's count all.
});

// Register specific limiter (same as login)
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Too many registration attempts. Your IP is blocked for 10 minutes. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

module.exports = { globalLimiter, loginLimiter, registerLimiter };