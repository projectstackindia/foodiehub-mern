const rateLimit = require('express-rate-limit');

// Order status update: 20 requests per 15 minutes
const orderStatusLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  message: { message: 'Too many order status update attempts. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { orderStatusLimiter };