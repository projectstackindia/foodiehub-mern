import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiArrowRight, FiActivity, FiLayers } from 'react-icons/fi';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { user } = useAuth();

  const cartItems = cart.items || [];

  // --- EMPTY STATE ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 p-12 bg-[#0a0a0a] border border-white/5 rounded-[3rem]"
        >
          <div className="relative inline-block">
            <FiShoppingBag className="w-24 h-24 mx-auto text-neutral-800" />
            <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full"></div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-[0.4em] uppercase text-white">Inventory Empty</h2>
            <p className="text-gray-500 font-bold tracking-[0.4em] uppercase text-xs">No assets detected in your current session</p>
          </div>
          <Link to="/foods" className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-black font-black uppercase text-sm tracking-[0.3em] px-12 py-6 rounded-2xl transition-all shadow-[0_20px_40px_rgba(16,185,129,0.2)] cursor-pointer">
            Initialize Menu <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-custom py-20 min-h-screen">
      {/* Page Header */}
      <div className="mb-20 space-y-4">
        <div className="flex items-center gap-3 text-emerald-500">
          <FiLayers size={22} />
          <span className="text-[12px] font-black tracking-[0.8em] uppercase">Logistics Unit</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-[0.1em] uppercase text-white">
          YOUR <span className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">INVENTORY</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Left: Cart Items List */}
        <div className="lg:col-span-2 space-y-8">
          {cartItems.map((item, index) => (
            <motion.div
              key={item.food._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              // Note: Make sure your CartItem component passes cursor-pointer to its buttons
              className="cursor-default"
            >
              <CartItem
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            </motion.div>
          ))}
        </div>

        {/* Right: Order Summary Dashboard */}
        <div className="lg:col-span-1 sticky top-32">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl space-y-10">
            <div className="flex items-center gap-4">
              <FiActivity className="text-emerald-500" size={24} />
              <h2 className="text-lg font-black tracking-[0.3em] uppercase text-white">Checkout Summary</h2>
            </div>

            {/* Micro-Itemized List */}
            <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {cartItems.map((item) => (
                <div key={item.food._id} className="flex justify-between items-center group">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-black tracking-[0.2em] text-gray-300 uppercase">
                      {item.food.title}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Qty: {item.quantity}</span>
                  </div>
                  <span className="text-sm font-black text-white tracking-[0.1em]">
                    ${(item.food.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Section */}
            <div className="space-y-6 pt-8 border-t border-white/10">
              <div className="flex justify-between text-[11px] font-bold tracking-[0.3em] text-gray-500 uppercase">
                <span>Logistic Fees</span>
                <span className="text-white">$0.00</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold tracking-[0.3em] text-gray-500 uppercase">
                <span>Platform Tax</span>
                <span className="text-white">INCLUDED</span>
              </div>
              
              <div className="pt-8 border-t-2 border-dashed border-white/10">
                <div className="flex justify-between items-end">
                  <span className="text-[11px] font-black tracking-[0.4em] text-emerald-500 uppercase">Grand Total</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-emerald-500 text-sm font-black">$</span>
                    <span className="text-5xl font-black text-white tracking-tighter">
                      {getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="group relative w-full h-20 bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center rounded-2xl transition-all duration-500 overflow-hidden shadow-[0_15px_30px_rgba(16,185,129,0.2)] cursor-pointer"
            >
              <div className="relative z-10 flex items-center gap-4 text-black font-black uppercase text-xs tracking-[0.3em]">
                Proceed to Checkout <FiArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </Link>

            <p className="text-[9px] text-center font-bold text-gray-600 tracking-[0.3em] uppercase">
              Secure Encrypted Transaction System v2.6
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;