# FOODIEHUB MERN FULL STACK FOOD DELIVERY PLATFORM

# 📌 PROJECT OVERVIEW

**A complete MERN stack food ordering platform designed for a smooth real world    restaurant experience.**

---

**It provides secure authentication using JWT for safe login, registration, and protected user access.** 

---

**Users can manage their cart with add, remove, and quantity update features along with real time price calculation.** 

---

**The system supports full order management including checkout, order history, and live order status tracking.** 

---

**An advanced admin dashboard allows efficient management of foods, orders, and overall platform control.**  

----

**The project is fully responsive, scalable, and built with modern UI, clean architecture, and optimized performance.**  

---

**A complete MERN stack food ordering platform designed for a smooth real world restaurant experience.**

---

**It provides secure authentication using JWT for safe login, registration, and protected user access.**

---

**Users can manage their cart with add, remove, and quantity update features along with real time price calculation.**

---

**The system supports full order management including checkout, order history, and live order status tracking.**

---

**An advanced admin dashboard allows efficient management of foods, orders, and overall platform control.**

---

**The project is fully responsive, scalable, and built with modern UI, clean architecture, and optimized performance.**

---

## TECHNOLOGY STACK

**Frontend**
- React 19 with Vite
- Tailwind CSS
- Framer Motion for animations
- React Router DOM
- Axios
- React Icons

**Backend**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- multer for image uploads
- express-rate-limit for security

---

## USER FEATURES

### Authentication
- Register new account with name, email and strong password
- Password must be at least 6 characters with uppercase, lowercase, number and special symbol
- Login with JWT token
- Logout clears token
- Protected routes for cart, checkout and orders

### Food Browsing
- Browse all dishes on Foods page
- Live search with debounce - results update as you type
- Filter by categories Pizza, Burger, Sushi, Salad, Dessert
- Food details page with image, description, price and quantity selector

### Shopping Cart
- Add items to cart with desired quantity
- Increase or decrease quantity inside cart
- Remove items completely
- Cart total calculation
- Cart count badge on navbar

### Checkout and Orders
- Fill delivery address street, city, state, zip code and phone
- Place order automatically clears cart and saves to database
- View order history in My Orders page
- Each order shows date in DD-MM-YYYY format, time in HH:MM AM/PM, items, total price and status
- Order status values pending, confirmed, preparing, out for delivery, delivered, cancelled

---

## ADMIN FEATURES

### Admin Dashboard
- Overview cards showing total foods, total orders, total revenue and pending orders
- Cards have hover scale and glow effects

### Food Management
- Add new food with title, description, price, category and image upload
- Edit existing food - all fields changeable, image optional
- Delete food with custom confirmation modal
- Backend validation
  - Title must be at least 3 characters
  - Description must be between 20 and 100 characters
  - Price must be positive number
  - Image required when adding new food

### Order Management
- View all customer orders with complete details
- Change order status using custom dropdown (no native select)
- Orders show customer name, email, items, total, delivery address and timestamp

### Rate Limiting for Admin Actions
- Add food - 15 attempts per 15 minutes
- Edit food - 15 attempts per 15 minutes
- Delete food - 10 attempts per 15 minutes
- Order status update - 25 attempts per 15 minutes

---

## SECURITY FEATURES

- Passwords hashed with bcryptjs
- JWT tokens for all authenticated requests
- Global rate limit - 100 requests per 15 minutes on all API routes
- Login and register rate limit - 5 attempts per 15 minutes
- Input validation on both frontend and backend
- Image uploads stored in server uploads folder
- Only local images deleted on update or delete - external URLs preserved
- Case-insensitive category and search queries

---

## UI AND UX HIGHLIGHTS

- Dark theme with emerald green accents
- Glassmorphic cards with backdrop blur
- Framer Motion animations for page transitions, card hovers and button effects
- Custom toast notifications
  - Bottom-right corner
  - Auto dismiss after 7 seconds
  - Close with large X button
  - Different colors for success and error messages
- Error messages styled as red glass boxes with alert icon
- Consistent uppercase typography and wide letter spacing
- Mobile responsive with hamburger menu
- Footer with navigation, support links and social icons that open in new tabs
- Additional pages About, FAQ, Privacy Policy, 404 Not Found

---

## SETUP INSTRUCTIONS

Requirements
- Node.js version 16 or higher
- MongoDB local or Atlas account

Steps

1. Open terminal in project root folder

2. Install root dependencies
   npm install

3. Install client dependencies
   cd client
   npm install

4. Install server dependencies
   cd ../server
   npm install

5. Go back to root folder
   cd ..

6. Inside server folder create .env file with
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=development

7. Create empty folder named uploads inside server folder

8. From root folder start both client and server
   npm run dev

9. Frontend runs on http://localhost:5173
   Backend runs on http://localhost:5000

10. On first start database seeds with 5 sample foods and admin user
    Admin email admin@foodiehub.com
    Admin password admin123

---

## HOW TO USE

Regular User
- Register new account or login
- Browse foods on Home or Foods page
- Use search bar for live filtering
- Click food card to see details
- Select quantity and add to cart
- Go to Cart page adjust quantities or remove items
- Proceed to checkout
- Fill delivery address and place order
- View order history in My Orders page

Admin User
- Login with admin credentials
- Admin link appears in navbar
- In Admin Dashboard add, edit or delete foods
- Switch to Orders tab to see all customer orders
- Update order status using dropdown

---

## ADDITIONAL PAGES

About Page - explains system architecture mission and values

FAQ Page - collapsible questions and answers about ordering payment delivery and more

Privacy Policy Page - details about data collection usage and security

404 Not Found Page - full screen error page with button to return home

---

## TROUBLESHOOTING

Missing uploads folder error
- Create folder named uploads inside server directory

Images not loading
- Ensure backend serves static files correctly

Login always invalid
- Delete existing admin from users collection and restart server to recreate

Rate limit error 429
- Wait for time window to pass before trying again

Any unexpected behavior
- Check browser console and backend terminal for error messages

---

## FINAL NOTES

FoodieHub demonstrates a complete MERN application with real world functionality including authentication cart orders admin panel image uploads validation and rate limiting. Code is well organized and ready for extensions like payment integration or real time tracking.

Enjoy using FoodieHub