import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { FiArrowRight, FiZap } from 'react-icons/fi';

const categories = ['All', 'Pizza', 'Burger', 'Sushi', 'Salad', 'Dessert'];

const Home = () => {
  const [allFoods, setAllFoods] = useState([]);      // store all fetched foods
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllFoods();
  }, []);

  const fetchAllFoods = async () => {
    try {
      const { data } = await axios.get('/api/foods');
      setAllFoods(data);
      setFilteredFoods(data.slice(0, 6)); // initial 6 items
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setLoading(false);
    }
  };

  // Live filter on search query
  useEffect(() => {
    if (!allFoods.length) return;
    if (!searchQuery.trim()) {
      // no query – show first 6 items
      setFilteredFoods(allFoods.slice(0, 6));
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = allFoods.filter(food =>
        food.title.toLowerCase().includes(lowerQuery)
      );
      setFilteredFoods(filtered.slice(0, 6)); // show max 6 results
    }
  }, [searchQuery, allFoods]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-[1px] w-8 bg-emerald-500"></span>
              <span className="text-emerald-500 text-[10px] font-black tracking-[0.5em] uppercase">
                Premium Delivery System
              </span>
              <span className="h-[1px] w-8 bg-emerald-500"></span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-[-0.02em] uppercase">
              DELICIOUS FOOD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                DELIVERED FAST
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-500 text-sm md:text-base font-medium leading-relaxed tracking-[0.15em] uppercase px-4">
              Experience the next generation of culinary logistics. High-performance nutrition synchronized with your lifestyle.
            </p>

            <div className="pt-10 flex justify-center w-full">
              <SearchBar onSearch={handleSearch} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES SECTION (unchanged) */}
      <section className="py-24 container-custom">
        <div className="flex flex-col items-center mb-16 space-y-4">
          <h2 className="text-2xl md:text-4xl font-black tracking-[0.3em] uppercase">
            BROWSE <span className="text-emerald-500">MODULES</span>
          </h2>
          <div className="h-1 w-20 bg-emerald-500/20 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.slice(1).map((cat) => (
            <Link
              key={cat}
              to={`/foods?category=${cat.toLowerCase()}`}
              className="group relative overflow-hidden bg-neutral-900/40 border border-white/5 rounded-2xl p-8 transition-all duration-500 hover:border-emerald-500/40 hover:bg-emerald-500/5"
            >
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
                  <FiZap size={20} />
                </div>
                <span className="text-xs font-black tracking-[0.25em] uppercase text-gray-400 group-hover:text-white transition-colors">
                  {cat}
                </span>
              </div>
              <div className="absolute -bottom-4 -right-4 text-6xl opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                {cat === 'Pizza' ? '🍕' : cat === 'Burger' ? '🍔' : cat === 'Sushi' ? '🍣' : cat === 'Salad' ? '🥗' : '🍰'}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* POPULAR DISHES – now supports live search */}
      <section className="py-24 bg-neutral-950/50 border-y border-white/[0.03]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl font-black tracking-[0.3em] uppercase">
                POPULAR <span className="text-emerald-500">DISHES</span>
              </h2>
              <p className="text-[10px] text-gray-500 font-bold tracking-[0.3em] uppercase">
                Top Rated Culinary Assets Currently In Transit
              </p>
            </div>
            <Link 
              to="/foods" 
              className="group flex items-center gap-3 bg-white/5 hover:bg-emerald-600 border border-white/10 hover:border-emerald-500 px-8 py-4 rounded-xl transition-all duration-500"
            >
              <span className="text-[10px] font-black tracking-[0.3em] uppercase group-hover:text-white">Initialize All Foods</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader />
            </div>
          ) : filteredFoods.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-sm uppercase tracking-wider">No dishes match your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredFoods.map((food) => (
                <motion.div
                  whileHover={{ y: -10 }}
                  key={food._id}
                  className="relative group"
                >
                  <FoodCard food={food} />
                  <div className="absolute inset-0 bg-emerald-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;