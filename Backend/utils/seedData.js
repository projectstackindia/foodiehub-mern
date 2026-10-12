const Food = require('../models/Food');
const User = require('../models/User');

const sampleFoods = [
  {
    title: 'Margherita Pizza',
    description: 'Fresh tomatoes, mozzarella, basil, and olive oil on crispy crust.',
    price: 12.99,
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500',
  },
  {
    title: 'Classic Cheeseburger',
    description: 'Beef patty, cheddar cheese, lettuce, tomato, onion, and special sauce.',
    price: 10.99,
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
  },
  {
    title: 'California Roll',
    description: 'Crab, avocado, cucumber, and sesame seeds wrapped in seaweed and rice.',
    price: 14.99,
    category: 'Sushi',
    image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=500',
  },
  {
    title: 'Caesar Salad',
    description: 'Romaine lettuce, parmesan cheese, croutons, and creamy caesar dressing.',
    price: 8.99,
    category: 'Salad',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54dd8a9?w=500',
  },
  {
    title: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.',
    price: 6.99,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500',
  },
];

exports.seedDefaultFoods = async () => {
  try {
    const count = await Food.countDocuments();
    if (count === 0) {
      await Food.insertMany(sampleFoods);
      console.log('✅ Default foods seeded');
    }
  } catch (error) {
    console.error('❌ Error seeding foods:', error);
  }
};

exports.createDefaultAdmin = async () => {
  try {
    // 🔥 Check if admin already exists – DO NOT delete
    const existingAdmin = await User.findOne({ email: 'admin@foodiehub.com' });
    if (existingAdmin) {
      console.log('✅ Admin already exists. Skipping creation.');
      return;
    }
    
    // Create new admin with plain password (pre-save hook will hash)
    await User.create({
      name: 'Admin User',
      email: 'admin@foodiehub.com',
      password: 'admin123',   // plain text – model will hash automatically
      role: 'admin',
    });
    console.log('✅ Default admin created: admin@foodiehub.com / admin123');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  }
};