import { motion } from 'framer-motion';
import { FiUsers, FiGlobe, FiAward, FiCpu, FiZap, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  
  const cards = [
    { icon: <FiGlobe />, title: 'Global Vision', desc: 'Redefining the digital culinary ecosystem with precision.' },
    { icon: <FiAward />, title: 'Purity Standard', desc: 'Uncompromising quality control at every stage of delivery.' },
    { icon: <FiCpu />, title: 'Smart Tech', desc: 'AI-driven logistics for real-time order optimization.' },
    { icon: <FiZap />, title: 'Velocity', desc: 'Zero-latency processing from kitchen to doorstep.' }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white py-32 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button - Larger, prominent on left */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-4 text-white/60 hover:text-emerald-500 transition-all duration-300 mb-16 group"
        >
          <div className="p-3 border-2 border-white/20 rounded-2xl group-hover:border-emerald-500/70 group-hover:bg-emerald-500/10 transition-all">
            <FiArrowLeft size={28} />
          </div>
          <span className="text-sm font-black uppercase tracking-[0.4em] group-hover:tracking-[0.5em] transition-all">BACK</span>
        </button>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="mb-32"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-emerald-500"></div>
            <span className="text-[10px] font-black tracking-[0.6em] uppercase text-emerald-500">About FoodieHub</span>
          </div>
          <h1 className="text-[clamp(3rem,8vw,7rem)] font-black uppercase tracking-tighter leading-[1.4]">
            <span className="block tracking-[0.2em]">System</span>
            <span className="block text-white/20 tracking-[0.2em]">Architecture</span>
          </h1>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden mb-32">
          {cards.map((card, i) => (
            <div key={i} className="bg-[#050505] p-12 hover:bg-[#0a0a0a] transition-colors">
              <div className="text-emerald-500 text-2xl mb-6">{card.icon}</div>
              <h2 className="text-xl font-black uppercase tracking-[0.3em] mb-4">{card.title}</h2>
              <p className="text-gray-500 text-xs uppercase tracking-[0.2em] leading-relaxed max-w-xs">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Human Infrastructure Section */}
        <div className="relative p-20 border border-white/10 rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 bg-emerald-950/5"></div>
          <div className="relative flex flex-col items-center text-center">
            <FiUsers className="text-emerald-500 text-4xl mb-8" />
            <h2 className="text-4xl font-black uppercase tracking-[0.4em] mb-8">Human Infrastructure</h2>
            <p className="text-gray-400 text-xs uppercase tracking-[0.3em] max-w-xl mx-auto leading-loose">
              We are a collective of engineers and culinary artists obsessed with the intersection of flavor and technology.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;