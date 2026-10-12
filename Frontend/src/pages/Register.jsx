import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateName = (name) => {
    if (!name) return 'NAME IS REQUIRED';
    if (name.length < 2) return 'NAME MUST BE AT LEAST 2 CHARACTERS';
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'EMAIL IS REQUIRED';
    if (!emailRegex.test(email)) return 'ENTER A VALID EMAIL ADDRESS';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'PASSWORD IS REQUIRED';
    if (password.length < 6) return 'PASSWORD MUST BE AT LEAST 6 CHARACTERS';
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!hasUpper) return 'MUST CONTAIN AT LEAST ONE UPPERCASE LETTER';
    if (!hasLower) return 'MUST CONTAIN AT LEAST ONE LOWERCASE LETTER';
    if (!hasNumber) return 'MUST CONTAIN AT LEAST ONE NUMBER';
    if (!hasSymbol) return 'MUST CONTAIN AT LEAST ONE SYMBOL';
    return '';
  };

  const validateConfirmPassword = (confirm, password) => {
    if (!confirm) return 'PLEASE CONFIRM YOUR PASSWORD';
    if (confirm !== password) return 'PASSWORDS DO NOT MATCH';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    let error = '';
    if (name === 'name') error = validateName(value);
    if (name === 'email') error = validateEmail(value);
    if (name === 'password') error = validatePassword(value);
    if (name === 'confirmPassword') error = validateConfirmPassword(value, formData.password);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmError = validateConfirmPassword(formData.confirmPassword, formData.password);
    
    const newErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmError,
    };
    setErrors(newErrors);
    
    if (nameError || emailError || passwordError || confirmError) return;
    
    setLoading(true);
    const success = await register(formData.name, formData.email, formData.password);
    setLoading(false);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-6 bg-gradient-to-br from-stone-900 via-[#030303] to-black relative overflow-hidden">
      <div className="absolute top-1/12 left-1/3 w-[35rem] h-[35rem] bg-white/[0.01] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/12 right-1/3 w-[35rem] h-[35rem] bg-slate-500/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl w-full bg-black/70 backdrop-blur-3xl rounded-[3rem] border border-white/5 p-10 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative z-10"
      >
        <h2 className="text-4xl font-black text-center text-white tracking-[0.25em] uppercase mb-12">
          CREATE <span className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">ACCOUNT</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* FULL NAME */}
          <div className="group relative">
            <div className="relative">
              <FiUser className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl group-focus-within:text-emerald-400 transition-colors duration-300" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white font-black uppercase text-sm tracking-[0.2em] placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-black/80 transition-all duration-300 shadow-inner"
                placeholder="FULL NAME"
                autoComplete="off"
              />
            </div>
            {errors.name && (
              <div className="mt-4 mx-1 bg-rose-950/40 border border-rose-500/30 rounded-xl px-5 py-4 flex items-center gap-3 shadow-[0_10px_20px_rgba(244,63,94,0.15)] backdrop-blur-md">
                <FiAlertCircle className="text-rose-500 text-lg flex-shrink-0" />
                <p className="text-[12px] font-black tracking-[0.15em] text-rose-400 uppercase leading-none">{errors.name}</p>
              </div>
            )}
          </div>

          {/* EMAIL */}
          <div className="group relative">
            <div className="relative">
              <FiMail className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl group-focus-within:text-emerald-400 transition-colors duration-300" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white font-black uppercase text-sm tracking-[0.2em] placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-black/80 transition-all duration-300 shadow-inner"
                placeholder="EMAIL ADDRESS"
                autoComplete="off"
              />
            </div>
            {errors.email && (
              <div className="mt-4 mx-1 bg-rose-950/40 border border-rose-500/30 rounded-xl px-5 py-4 flex items-center gap-3 shadow-[0_10px_20px_rgba(244,63,94,0.15)] backdrop-blur-md">
                <FiAlertCircle className="text-rose-500 text-lg flex-shrink-0" />
                <p className="text-[12px] font-black tracking-[0.15em] text-rose-400 uppercase leading-none">{errors.email}</p>
              </div>
            )}
          </div>

          {/* PASSWORD with Eye Icon */}
          <div className="group relative">
            <div className="relative">
              <FiLock className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl group-focus-within:text-emerald-400 transition-colors duration-300" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-16 pr-14 text-white font-black uppercase text-sm tracking-[0.2em] placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-black/80 transition-all duration-300 shadow-inner"
                placeholder="PASSWORD"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors"
              >
                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </button>
            </div>
            {errors.password && (
              <div className="mt-4 mx-1 bg-rose-950/40 border border-rose-500/30 rounded-xl px-5 py-4 flex items-center gap-3 shadow-[0_10px_20px_rgba(244,63,94,0.15)] backdrop-blur-md">
                <FiAlertCircle className="text-rose-500 text-lg flex-shrink-0" />
                <p className="text-[12px] font-black tracking-[0.15em] text-rose-400 uppercase leading-normal">{errors.password}</p>
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD with Eye Icon */}
          <div className="group relative">
            <div className="relative">
              <FiLock className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl group-focus-within:text-emerald-400 transition-colors duration-300" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-16 pr-14 text-white font-black uppercase text-sm tracking-[0.2em] placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-black/80 transition-all duration-300 shadow-inner"
                placeholder="CONFIRM PASSWORD"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors"
              >
                {showConfirmPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="mt-4 mx-1 bg-rose-950/40 border border-rose-500/30 rounded-xl px-5 py-4 flex items-center gap-3 shadow-[0_10px_20px_rgba(244,63,94,0.15)] backdrop-blur-md">
                <FiAlertCircle className="text-rose-500 text-lg flex-shrink-0" />
                <p className="text-[12px] font-black tracking-[0.15em] text-rose-400 uppercase leading-none">{errors.confirmPassword}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group/btn relative w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-6 px-4 rounded-2xl transition-all shadow-[0_20px_40px_rgba(16,185,129,0.25)] uppercase tracking-[0.5em] text-base cursor-pointer overflow-hidden disabled:opacity-40 transform active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {loading ? 'CREATING...' : 'REGISTER'} <span className="text-2xl group-hover/btn:translate-x-2 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
          </button>
        </form>
        
        <div className="mt-6">
          <Link
            to="/login"
            className="w-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 font-black py-6 rounded-2xl text-center block text-sm uppercase tracking-[0.25em] transition-all duration-300 transform active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            ALREADY HAVE AN ACCOUNT? LOGIN
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;