import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const navLinks = [
    ...(user ? [{ name: 'MY ORDERS', path: '/orders' }] : []),
    ...(user?.role === 'admin' ? [{ name: 'ADMIN PANEL', path: '/admin' }] : []),
  ];

  return (
    /* NAVBAR SHELL: Full fluid width layout with zero gray bleed */
    <nav className="sticky top-0 z-50 bg-neutral-950/70 backdrop-blur-2xl border-b border-white/[0.05] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] w-full">
      {/* max-w-full aur kam padding karke left-right ki faltu badi space khatam kar di */}
      <div className="w-full mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-24">
          
          {/* BRAND LOGO CONTEXT: Styled Tech Logo Element */}
          <Link to="/" className="flex items-center gap-4 group cursor-pointer">
            <div className="border-2 border-emerald-500 bg-emerald-950/30 px-3 py-1.5 rounded-xl font-black text-sm tracking-widest text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-black">
              FH
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-[0.3em] text-white leading-none uppercase">
                FOODIE<span className="text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">HUB</span>
              </span>
              <span className="text-[9px] font-black tracking-[0.4em] text-gray-500 uppercase mt-1">
                TECH CORE ENGINE
              </span>
            </div>
          </Link>

          {/* DESKTOP ROUTING MATRIX */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-400 hover:text-white font-black text-xs tracking-[0.3em] uppercase transition-all duration-300 relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-400 transition-all duration-300 group-hover:w-full drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </Link>
            ))}
          </div>

          {/* INTERACTIVE ACTIONS HUB */}
          <div className="flex items-center space-x-5">
            
            {/* UPGRADED CART: Icon Size increased to 26 for heavy visibility */}
            <Link 
              to="/cart" 
              className="relative p-3 rounded-xl border border-white/5 bg-neutral-900/50 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300 shadow-inner group"
            >
              <FiShoppingCart size={26} className="transition-transform group-hover:scale-110" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-black font-black text-[11px] rounded-full h-5 w-5 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* CONDITIONAL AUTH STATE LOGIC */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="hidden sm:inline text-xs font-black tracking-[0.2em] text-emerald-400 uppercase bg-emerald-950/20 border border-emerald-500/10 px-5 py-3 rounded-xl shadow-inner">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="p-3.5 rounded-xl border border-rose-500/20 bg-rose-950/10 text-rose-400 hover:text-white hover:bg-rose-600 hover:border-rose-600 transition-all duration-300 cursor-pointer shadow-[0_10px_25px_rgba(244,63,94,0.1)]"
                >
                  <FiLogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* UPGRADED INTERACTIVE HIGH-GLOW LOGIN TRIGGER */}
                <Link
                  to="/login"
                  className="relative overflow-hidden bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-[0.25em] py-4 px-7 rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_15px_30px_rgba(16,185,129,0.25)] group"
                >
                  <span className="relative z-10">LOGIN</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>

                {/* UPGRADED OUTLINE CYBER-MATRIX REGISTER TRIGGER */}
                <Link
                  to="/register"
                  className="bg-transparent hover:bg-white/5 text-white border border-white/10 hover:border-white/30 text-xs font-black uppercase tracking-[0.25em] py-4 px-7 rounded-xl transition-all duration-300 transform active:scale-95"
                >
                  REGISTER
                </Link>
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-3.5 rounded-xl border border-white/5 bg-neutral-900/50 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROP MATRIX */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-white/[0.05] bg-neutral-950/95 backdrop-blur-2xl"
          >
            <div className="px-6 py-8 space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-5 py-4 text-gray-400 hover:text-emerald-400 hover:bg-white/5 font-black text-xs tracking-[0.2em] uppercase rounded-xl transition-all duration-200 border border-transparent hover:border-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;