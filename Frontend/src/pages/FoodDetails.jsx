import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';
import { FiShoppingCart, FiClock, FiShield, FiPlus, FiMinus, FiActivity } from 'react-icons/fi';

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFood();
  }, [id]);

  const fetchFood = async () => {
    try {
      const { data } = await axios.get(`/api/foods/${id}`);
      setFood(data);
    } catch (error) {
      console.error('Error fetching food:', error);
      navigate('/foods');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    await addToCart(food._id, quantity);
  };

  if (loading) return <Loader />;
  if (!food) return null;

  return (
    <div className="container-custom py-24 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* --- LEFT: VISUAL ENGINE --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group rounded-[3.5rem] overflow-hidden border border-white/5 bg-[#0a0a0a] shadow-2xl"
        >
          <img 
            src={food.image} 
            alt={food.title} 
            className="w-full h-[650px] object-cover transform-gpu group-hover:scale-110 transition-transform duration-1000"
            style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-10 left-10">
            <div className="bg-emerald-500 text-black font-black tracking-[0.4em] uppercase text-[10px] px-8 py-3 rounded-full">
              Authenticated Asset
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT: DATA CORE --- */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[12px] font-black tracking-[0.5em] text-emerald-500 uppercase bg-emerald-500/10 px-5 py-2 border border-emerald-500/20 rounded-lg">
                {food.category}
              </span>
              <div className="h-[1px] flex-grow bg-white/10"></div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
              {food.title}
            </h1>
          </div>

          {/* Description (Straight, No Italic) */}
          <p className="text-gray-400 text-lg md:text-xl font-bold leading-relaxed tracking-[0.1em] uppercase max-w-xl">
            {food.description?.split(',').join(' ')}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-6 bg-white/5 rounded-[2rem] border border-white/5">
              <FiClock size={28} className="text-emerald-500" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-600 tracking-widest uppercase">Delivery Time</span>
                <span className="text-lg font-black text-white tracking-widest">25 MINS</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white/5 rounded-[2rem] border border-white/5">
              <FiActivity size={28} className="text-emerald-500" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-600 tracking-widest uppercase">Unit Type</span>
                <span className="text-lg font-black text-white tracking-widest">BIO CORE</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="pt-10 border-t border-white/10">
            <span className="text-[11px] font-black tracking-[0.5em] text-gray-700 uppercase mb-4 block">Cost Per Unit</span>
            <div className="flex items-baseline gap-2">
              <span className="text-emerald-500 text-3xl font-black">$</span>
              <span className="text-7xl font-black text-white tracking-tighter">
                {food.price}
              </span>
            </div>
          </div>

          {/* Interaction Hub */}
          <div className="flex flex-wrap items-center gap-10 pt-6">
            {/* Quantity Selector */}
            <div className="flex items-center bg-neutral-900 border border-white/10 p-2 rounded-[1.5rem]">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-14 h-14 flex items-center justify-center rounded-xl bg-black text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all border border-white/5 active:scale-90 cursor-pointer"
              >
                <FiMinus size={20} />
              </button>
              <span className="w-20 text-center text-white font-black text-2xl tracking-tighter">
                {quantity.toString().padStart(2, '0')}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-14 h-14 flex items-center justify-center rounded-xl bg-black text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all border border-white/5 active:scale-90 cursor-pointer"
              >
                <FiPlus size={20} />
              </button>
            </div>

            {/* Deploy Button */}
            <button
              onClick={handleAddToCart}
              className="flex-grow group relative h-20 px-16 bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center rounded-[1.5rem] transition-all duration-500 shadow-[0_25px_50px_rgba(16,185,129,0.3)] active:scale-95 cursor-pointer"
            >
              <div className="flex items-center gap-4 text-black font-black uppercase text-sm tracking-[0.4em]">
                <FiShoppingCart size={24} /> Deploy to Cart
              </div>
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default FoodDetails;