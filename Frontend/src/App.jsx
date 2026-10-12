import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Foods from './pages/Foods';
import FoodDetails from './pages/FoodDetails';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';

function AppContent() {
  const location = useLocation();
  const is404 = location.pathname === '/404' || !['/', '/login', '/register', '/foods', '/cart', '/checkout', '/orders', '/admin'].some(route => 
    location.pathname === route || location.pathname.startsWith('/foods/')
  );
  // Better: check if route matches any defined, else treat as 404
  // But we can just use a simpler condition: if the route is not one of the known paths (and not starting with /foods/), hide navbar/footer.
  // However React Router's "*" route will be used, so we can rely on a flag from NotFound component? No.
  // Simplest: use useLocation and a list of valid paths. If not valid, hide.

  const validPaths = ['/', '/login', '/register', '/foods', '/cart', '/checkout', '/orders', '/admin'];
  const isValidPath = validPaths.includes(location.pathname) || location.pathname.startsWith('/foods/');
  
  return (
    <div className="min-h-screen flex flex-col">
      {isValidPath && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/foods/:id" element={<FoodDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
<Route path="/privacy" element={<Privacy />} />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {isValidPath && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;