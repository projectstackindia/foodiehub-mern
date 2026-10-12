import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheckCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 7000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 80 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`pointer-events-auto flex items-stretch rounded-2xl border bg-neutral-950/85 backdrop-blur-2xl transition-all duration-300 transform hover:-translate-y-1 ${
              toast.type === 'error'
                ? 'border-rose-500/30 shadow-[0_15px_30px_rgba(244,63,94,0.15)] hover:border-rose-500/60'
                : toast.type === 'success'
                ? 'border-emerald-500/30 shadow-[0_15px_30px_rgba(16,185,129,0.15)] hover:border-emerald-500/60'
                : 'border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:border-white/30'
            }`}
          >
            {/* Icon Area - Fixed width, no shrink */}
            <div className="pl-5 flex items-center justify-center shrink-0">
              {toast.type === 'error' && <FiAlertTriangle className="text-rose-400 text-2xl drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" />}
              {toast.type === 'success' && <FiCheckCircle className="text-emerald-400 text-2xl drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />}
              {toast.type === 'info' && <FiInfo className="text-gray-400 text-2xl" />}
            </div>

            {/* TEXT AREA - Takes remaining space, wraps, never pushes button */}
            <div className="pl-4 pr-3 py-4 flex-1 min-w-0">
              <p className="text-base font-bold tracking-wider text-white uppercase break-words whitespace-normal leading-relaxed">
                {toast.message}
              </p>
            </div>

            {/* CLOSE BUTTON - Fixed width, shrinks only if needed but never overflows */}
            <button
              onClick={() => removeToast(toast.id)}
              className={`flex items-center justify-center w-14 transition-all duration-300 rounded-r-2xl border-l cursor-pointer shrink-0 ${
                toast.type === 'error'
                  ? 'border-rose-500/10 hover:bg-rose-500/10 text-rose-400'
                  : toast.type === 'success'
                  ? 'border-emerald-500/10 hover:bg-emerald-500/10 text-emerald-400'
                  : 'border-white/5 hover:bg-white/10 text-gray-400 hover:text-white'
              }`}
              style={{ alignSelf: 'stretch' }}
            >
              <FiX size={20} className="transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};