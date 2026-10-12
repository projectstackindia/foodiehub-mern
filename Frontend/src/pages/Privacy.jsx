import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEye, FiDatabase, FiArrowLeft, FiShieldOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const navigate = useNavigate();

  const policies = [
    { icon: <FiLock />, title: 'Information Collection', desc: 'We capture only essential data—name, email, and location—required to facilitate your order and maintain service integrity.' },
    { icon: <FiEye />, title: 'Data Utilization', desc: 'Your information is strictly utilized for order fulfillment and personalization. We operate with a zero-tolerance policy toward selling data to third parties.' },
    { icon: <FiDatabase />, title: 'Security Protocol', desc: 'Industry-grade encryption and secure server architecture protect your sensitive information from unauthorized access.' },
    { icon: <FiShieldOff />, title: 'Your Rights', desc: 'You retain full control over your digital footprint. Access, rectification, and deletion requests are processed upon contact at privacy@foodiehub.com.' }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto bg-[#050505] border border-white/10 rounded-[2rem] p-12 md:p-20 shadow-2xl">
        
        {/* Back Button - The exact requested design */}
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-emerald-500"></div>
            <span className="text-[10px] font-black tracking-[0.6em] uppercase text-emerald-500">Data Security</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[1.2]">
            <span className="block tracking-[0.2em]">Privacy</span>
            <span className="block text-white/20 tracking-[0.2em]">Policy</span>
          </h1>
        </motion.div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policies.map((item, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-10 hover:border-emerald-500/30 transition-all">
              <div className="text-emerald-500 text-3xl mb-6">{item.icon}</div>
              <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4">{item.title}</h2>
              <p className="text-gray-500 text-xs uppercase tracking-[0.1em] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Privacy;