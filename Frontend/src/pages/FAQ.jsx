import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHelpCircle, FiChevronDown, FiChevronUp, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const faqs = [
  { q: "How do I place an order?", a: "Simply browse the menu add items to your cart proceed to checkout enter your delivery address and confirm your order." },
  { q: "What payment methods are accepted?", a: "We accept credit/debit cards digital wallets and cash on delivery (COD) in selected areas." },
  { q: "How long does delivery take?", a: "Standard delivery takes 25-35 minutes depending on your location and traffic conditions." },
  { q: "Can I track my order?", a: "Yes you can track your order in real-time from the My Orders section after logging in." },
  { q: "What if I receive a wrong item?", a: "Contact our support team immediately and we will arrange a replacement or refund." },
  { q: "How do I become a restaurant partner?", a: "Email us at partners@foodiehub.com with your restaurant details and our team will reach out." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#030303] text-white py-20 px-6">
      {/* Container Box */}
      <div className="max-w-5xl mx-auto bg-[#050505] border border-white/10 rounded-[2rem] p-12 md:p-20 shadow-2xl">
        
        {/* Back Button */}
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-20 text-center">
          <div className="flex items-center justify-center gap-3 text-emerald-500 mb-8">
            <FiHelpCircle size={20} />
            <span className="text-[10px] font-black tracking-[0.6em] uppercase">Knowledge Base</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[1.2]">
            <span className="block tracking-[0.2em]">Frequently Asked</span>
            <span className="block text-white/20 tracking-[0.2em]">Questions</span>
          </h1>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center p-8 text-left"
              >
                <span className="text-sm font-black uppercase tracking-[0.2em]">{faq.q}</span>
                {openIndex === idx ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-white/5 px-8 pb-8"
                  >
                    <p className="text-gray-500 text-xs uppercase tracking-[0.1em] leading-relaxed pt-6">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FAQ;