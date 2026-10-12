import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiEye, FiZap, FiClock, FiActivity } from 'react-icons/fi';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(food._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-emerald-500/40 transition-all duration-500 isolate transform-gpu shadow-2xl"
    >
      {/* 1. IMAGE ENGINE: FIXED WHITE LINE & JITTER */}
      <Link 
        to={`/foods/${food._id}`} 
        className="relative h-80 overflow-hidden bg-neutral-900 block"
        style={{ 
          WebkitMaskImage: '-webkit-radial-gradient(white, black)', // Fix for Safari/Chrome overflow
          marginBottom: '-2px' // Negative margin niche ki white line ko daba dega
        }}
      >
        <div className="w-full h-full overflow-hidden pointer-events-none">
           <img
            src={food.image}
            alt={food.title}
            className="w-full h-full object-cover object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-110 display-block"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          />
        </div>

        {/* Stronger Gradient to blend with bottom section */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-100 pointer-events-none z-10" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <div className="bg-emerald-500 text-black font-black text-xs tracking-[0.3em] uppercase py-4 px-10 rounded-xl shadow-[0_0_40px_rgba(16,185,129,0.4)] transform translate-y-8 group-hover:translate-y-0 transition-transform">
            OPEN SPECIFICATIONS
          </div>
        </div>
      </Link>

      {/* 2. DATA MATRIX: No Comma, Clean & Bold */}
      <div className="p-10 space-y-8 relative z-20 bg-[#0a0a0a]">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-[12px] font-black tracking-[0.4em] text-emerald-500 uppercase bg-emerald-500/10 px-4 py-2 border border-emerald-500/20 rounded-lg">
              {food.category}
            </span>
            <div className="h-[1px] flex-grow bg-white/10"></div>
          </div>
          <h3 className="text-3xl font-black tracking-widest text-white uppercase leading-none group-hover:text-emerald-400 transition-colors">
            {food.title}
          </h3>
        </div>

        <p className="text-gray-400 text-sm md:text-base font-bold leading-relaxed tracking-[0.1em] uppercase">
          {food.description?.split(',').join(' ')}
        </p>

        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="flex items-center gap-3 p-5 bg-white/5 rounded-2xl border border-white/5">
            <FiClock size={24} className="text-emerald-500" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-600 tracking-widest uppercase">Delivery Time</span>
              <span className="text-sm font-black text-white tracking-widest">25 MINS</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-5 bg-white/5 rounded-2xl border border-white/5">
            <FiActivity size={24} className="text-emerald-500" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-600 tracking-widest uppercase">Unit Type</span>
              <span className="text-sm font-black text-white tracking-widest">BIO CORE</span>
            </div>
          </div>
        </div>

        <div className="pt-8 flex justify-between items-center border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-[11px] font-black tracking-[0.4em] text-gray-700 uppercase mb-2">Cost Per Unit</span>
            <div className="flex items-baseline gap-1">
              <span className="text-emerald-500 text-xl font-black">$</span>
              <span className="text-4xl font-black text-white tracking-tighter">
                {food.price}
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="group/btn relative h-20 w-20 bg-emerald-600 hover:bg-emerald-500 text-black flex items-center justify-center rounded-[1.5rem] transition-all duration-300 active:scale-95 shadow-[0_20px_40px_rgba(16,185,129,0.25)] cursor-pointer z-30"
          >
            <FiShoppingCart size={28} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-[4px] h-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors duration-500 z-40" />
    </motion.div>
  );
};

export default FoodCard;