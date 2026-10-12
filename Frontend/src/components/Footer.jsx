import { Link } from 'react-router-dom';
import { FiHeart, FiGithub, FiTwitter, FiInstagram, FiArrowUpRight } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/[0.05] text-white mt-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-emerald-500/20 shadow-[0_0_50px_20px_rgba(16,185,129,0.1)] pointer-events-none" />

      <div className="w-full mx-auto px-4 md:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          {/* BRAND SECTION */}
          <div className="md:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="border-2 border-emerald-500 bg-emerald-950/30 px-3 py-1.5 rounded-xl font-black text-sm tracking-widest text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                FH
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-[0.3em] text-white uppercase leading-none">
                  FOODIE<span className="text-emerald-500">HUB</span>
                </span>
                <span className="text-[9px] font-black tracking-[0.4em] text-gray-500 uppercase mt-1">
                  TECH CORE ENGINE
                </span>
              </div>
            </Link>
            <p className="text-gray-500 text-xs font-bold leading-loose tracking-[0.1em] uppercase max-w-sm">
              Delivering high-performance nutrition through our decentralized culinary network. Experience the future of food ordering.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[11px] font-black tracking-[0.4em] text-emerald-500 uppercase">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-2 group">
                  HOME <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                </Link>
              </li>
              <li>
                <Link to="/foods" className="text-gray-400 hover:text-white text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-2 group">
                  FOODS <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-xs font-black tracking-widest uppercase transition-all duration-300 flex items-center gap-2 group">
                  ABOUT US <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[11px] font-black tracking-[0.4em] text-emerald-500 uppercase">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white text-xs font-black tracking-widest uppercase transition-all duration-300">
                  FAQS
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-xs font-black tracking-widest uppercase transition-all duration-300">
                  PRIVACY
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL - with working links */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-[11px] font-black tracking-[0.4em] text-emerald-500 uppercase text-left md:text-right">Social Frequency</h4>
            <div className="flex md:justify-end space-x-4">
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-white/5 bg-neutral-900/50 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300"
              >
                <FiInstagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-white/5 bg-neutral-900/50 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300"
              >
                <FiTwitter size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-white/5 bg-neutral-900/50 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all duration-300"
              >
                <FiGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="border-t border-white/[0.05] mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black tracking-[0.3em] text-gray-600 uppercase">
            © 2026 FOODIEHUB SYSTEM CORE. ALL RIGHTS RESERVED.
          </p>
          <p className="flex items-center gap-3 text-[10px] font-black tracking-[0.3em] text-gray-400 uppercase bg-white/5 px-6 py-3 rounded-full border border-white/5">
            BUILT WITH <FiHeart className="text-emerald-500 animate-pulse" /> FOR THE ELITE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;