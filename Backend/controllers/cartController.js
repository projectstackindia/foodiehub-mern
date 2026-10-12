const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id }).populate('items.food');
    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.food.toString() === foodId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ food: foodId, quantity });
    }

    await cart.save();
    await cart.populate('items.food');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { foodId } = req.params;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => item.food.toString() !== foodId);
    await cart.save();
    await cart.populate('items.food');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { foodId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex((item) => item.food.toString() === foodId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }

    await cart.save();
    await cart.populate('items.food');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};