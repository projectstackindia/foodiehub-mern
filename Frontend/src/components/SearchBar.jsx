import { useState, useEffect } from 'react';
import { FiSearch, FiZap, FiX } from 'react-icons/fi';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);

  // Live search: trigger on every keystroke (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto group">
      <div className="relative flex items-center">
        <div className="absolute left-6 text-gray-500 group-focus-within:text-emerald-500 transition-colors duration-300 pointer-events-none">
          <FiSearch size={22} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="SEARCH SYSTEM FOR DATA"
          autoComplete="off"
          className="w-full bg-neutral-950/40 border border-white/10 rounded-2xl py-6 pl-16 pr-40 text-white font-black uppercase text-sm tracking-[0.25em] placeholder-gray-600 outline-none transition-all duration-300 
          cursor-text
          focus:border-emerald-500/60 
          hover:border-white/20 
          focus:shadow-[0_0_25px_rgba(16,185,129,0.1)] shadow-inner"
        />

        {/* Clear button (shows only when there is text) */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-24 text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={20} />
          </button>
        )}

        <button
          type="submit"
          className="absolute right-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase text-[10px] tracking-[0.2em] px-6 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-2 active:scale-95 shadow-[0_10px_20px_rgba(16,185,129,0.2)] cursor-pointer z-10"
        >
          <span className="hidden sm:inline">INITIALIZE</span>
          <FiZap size={14} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;