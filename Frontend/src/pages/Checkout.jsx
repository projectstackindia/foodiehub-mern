import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { FiMapPin, FiTruck, FiShield, FiArrowRight } from 'react-icons/fi';

const Checkout = () => {
  const { cart, getCartTotal, fetchCart } = useCart();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    street: '', city: '', state: '', zipCode: '', phone: '',
  });

  const cartItems = cart.items || [];

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();


    // --- 1. City & State Validation (Only Alphabets & Spaces) ---
  const alphaRegex = /^[A-Za-z\s]+$/;
  if (!alphaRegex.test(formData.city)) {
    addToast('City must contain only alphabets', 'error');
    return;
  }
  if (!alphaRegex.test(formData.state)) {
    addToast('State must contain only alphabets', 'error');
    return;
  }

  // --- 2. Phone Validation (10 Digits starting with 6-9) ---
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(formData.phone)) {
    addToast('Phone must be 10 digits starts with 6-9', 'error');
    return;
  }

  // --- 3. Zip Code Validation (Exactly 6 Digits) ---
  const zipRegex = /^\d{6}$/;
  if (!zipRegex.test(formData.zipCode)) {
    addToast('Zip Code must be exactly 6 digits', 'error');
    return;
  }

    setLoading(true);
    try {
      await axios.post('/api/orders', { deliveryAddress: formData });
      addToast('Order successfully deployed.', 'success');
      await fetchCart();
      navigate('/orders');
    } catch (error) {
      addToast('Deployment failed. Check credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-[#121212] border border-white/10 p-6 rounded-2xl text-white placeholder:text-gray-700 placeholder:font-black placeholder:tracking-[0.2em] placeholder:uppercase focus:border-emerald-500 outline-none transition-all";

  return (
    <div className="container-custom py-24 min-h-screen">
      <div className="mb-20 space-y-4">
        <div className="flex items-center gap-3 text-emerald-500">
          <FiShield size={20} />
          <span className="text-[10px] font-black tracking-[0.6em] uppercase">Secure Deployment Protocol</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-[0.1em] uppercase text-white">
          CHECKOUT <span className="text-emerald-500">TERMINAL</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Delivery Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 shadow-2xl"
        >
          <div className="flex items-center gap-4 mb-10">
            <FiMapPin className="text-emerald-500" size={24} />
            <h2 className="text-2xl font-black tracking-[0.3em] uppercase text-white">Destination Data</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="street" required value={formData.street} onChange={handleChange} className={inputStyle} placeholder="ENTER STREET ADDRESS" />
            <div className="grid grid-cols-2 gap-6">
              <input type="text" name="city" required value={formData.city} onChange={handleChange} className={inputStyle} placeholder="ENTER CITY" />
              <input type="text" name="state" required value={formData.state} onChange={handleChange} className={inputStyle} placeholder="ENTER STATE" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleChange} className={inputStyle} placeholder="ENTER ZIP CODE" />
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={inputStyle} placeholder="ENTER PHONE NUMBER" />
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase text-[12px] tracking-[0.3em] rounded-2xl transition-all shadow-[0_15px_30px_rgba(16,185,129,0.3)] active:scale-95 cursor-pointer mt-4">
              {loading ? 'DEPLOYING...' : `CONFIRM DEPLOYMENT | $${getCartTotal().toFixed(2)}`}
            </button>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 h-fit sticky top-32"
        >
          <div className="flex items-center gap-4 mb-10">
            <FiTruck className="text-emerald-500" size={24} />
            <h2 className="text-2xl font-black tracking-[0.3em] uppercase text-white">Inventory Manifest</h2>
          </div>
          
          <div className="space-y-8 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar mb-8">
            {cartItems.map((item) => (
              <div key={item.food._id} className="flex justify-between items-center text-white">
                <div className="flex flex-col gap-2"> {/* Gap 2 se quantity thoda niche shift ho gaya */}
                  <span className="text-sm font-black tracking-[0.1em]">{item.food.title}</span>
                  <span className="text-[10px] text-emerald-500 tracking-[0.3em] uppercase border border-emerald-500/20 px-2 py-0.5 rounded-md w-fit">
                    Quantity: {item.quantity}
                  </span>
                </div>
                <span className="font-black tracking-[0.2em]">${(item.food.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10">
            <div className="flex justify-between items-center text-white">
              <span className="text-[12px] font-black tracking-[0.4em] uppercase">Total Cost</span>
              <span className="text-4xl font-black tracking-tighter text-emerald-500">${getCartTotal().toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;