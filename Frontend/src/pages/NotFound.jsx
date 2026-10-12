import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiAlertTriangle, FiCpu } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030303] text-white font-mono overflow-hidden">
      
      {/* Background Grid Pattern for Technical Feel */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-10 max-w-3xl w-full mx-6 bg-[#050505] border border-white/10 rounded-3xl p-16 shadow-[0_0_80px_rgba(0,0,0,0.8)]"
      >
        {/* Top Header Badge */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <FiCpu className="text-emerald-500" size={24} />
          <span className="text-[10px] font-black tracking-[0.6em] text-emerald-500 uppercase">System Exception 404</span>
        </div>

        {/* The 404 Big Display - added tracking (letter-spacing) and removed horizontal line */}
        <div className="relative">
          <h1 className="text-[160px] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 tracking-[0.3em] leading-none mb-4">
            404
          </h1>
          {/* Horizontal line removed as requested */}
        </div>

        {/* Error Info Section */}
        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-black uppercase tracking-[0.5em] text-white">
            SIGNAL LOST
          </h2>
          <div className="h-px w-20 bg-emerald-500 mx-auto"></div>
          <p className="text-gray-400 font-bold text-[12px] tracking-[0.4em] uppercase max-w-md mx-auto leading-relaxed">
            CRITICAL ERROR: THE REQUESTED ASSET PATH NO LONGER EXISTS WITHIN THIS CLUSTER. RE-INITIALIZE CONNECTION OR RETURN TO BASE.
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-16">
          <Link
            to="/"
            className="group relative inline-flex items-center gap-4 border border-emerald-500/30 hover:border-emerald-500 text-white font-black uppercase text-[12px] tracking-[0.4em] px-16 py-7 rounded-2xl transition-all duration-500 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <FiHome size={18} />
            INITIATE HOMING
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;