const rateLimit = require('express-rate-limit');

// Add Food: 5 requests per 15 minutes
const addFoodLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { message: 'Too many food addition attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Edit Food: 10 requests per 15 minutes
const editFoodLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { message: 'Too many food edit attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Delete Food: 10 requests per 15 minutes
const deleteFoodLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many food deletion attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { addFoodLimiter, editFoodLimiter, deleteFoodLimiter };