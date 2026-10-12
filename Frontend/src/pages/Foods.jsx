import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLayers } from 'react-icons/fi';

const categories = ['all', 'pizza', 'burger', 'sushi', 'salad', 'dessert'];

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchFoods = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/api/foods?';
      if (selectedCategory !== 'all') url += `category=${selectedCategory}&`;
      if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
      const { data } = await axios.get(url);
      setFoods(data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="container-custom py-20 min-h-screen">
      <div className="flex flex-col items-center text-center mb-16 space-y-6">
        <div className="flex items-center gap-3 text-emerald-500">
          <FiLayers size={18} />
          <span className="text-[10px] font-black tracking-[0.6em] uppercase">Tactical Selection</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-[0.2em] text-white uppercase">
          Select <span className="text-emerald-500">Asset</span>
        </h1>
        <div className="w-full max-w-lg pt-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-8 py-3 font-black uppercase text-[10px] tracking-[0.25em] transition-all duration-300 border ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-black border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-[#0a0a0a] text-white/60 border-white/10 hover:border-emerald-500/50 hover:text-white'
            } rounded-xl cursor-pointer`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : foods.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-gray-600">Null result detected</p>
          <h2 className="text-xl font-black text-white uppercase">No assets found</h2>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {foods.map((food) => (
              <motion.div
                key={food._id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <FoodCard food={food} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default Foods;