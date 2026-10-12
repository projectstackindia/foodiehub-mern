import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [rateLimitError, setRateLimitError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const { login } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) return 'EMAIL IS REQUIRED';
        if (!emailRegex.test(val)) return 'ENTER A VALID EMAIL ADDRESS';
        return '';
    };

    const validatePassword = (val) => {
        if (!val) return 'PASSWORD IS REQUIRED';
        if (val.length < 6) return 'PASSWORD MUST BE AT LEAST 6 CHARACTERS';
        return '';
    };

    const handleEmailChange = (e) => {
        const val = e.target.value;
        setEmail(val);
        setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
        setRateLimitError('');
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
        setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
        setRateLimitError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setRateLimitError('');

        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        setLoading(true);
        try {
            const success = await login(email, password);
            if (success) navigate('/');
        } catch (error) {
            if (error?.response?.status === 429) {
                setRateLimitError('TOO MANY ATTEMPTS. PLEASE TRY AGAIN AFTER 10 MINUTES.');
            } else if (error?.response?.data?.message) {
                setErrors({ general: error.response.data.message });
            } else {
                setErrors({ general: 'LOGIN FAILED. PLEASE TRY AGAIN.' });
            }
        } finally {
            setLoading(false);
        }
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
                    WELCOME <span className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">BACK</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <div className="relative group">
                            <FiMail className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl group-focus-within:text-emerald-400 transition-colors duration-300" />
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white font-black text-sm tracking-[0.2em] placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-black/80 transition-all duration-300 shadow-inner"
                                placeholder="EMAIL ADDRESS"
                                autoComplete="off"
                            />
                        </div>
                        {errors.email && (
                            <div className="mt-4 mx-1 bg-rose-950/40 border border-rose-500/30 rounded-xl px-5 py-4 flex items-center gap-3 shadow-[0_10px_20px_rgba(244,63,94,0.15)] backdrop-blur-md">
                                <FiAlertCircle className="text-rose-500 text-lg flex-shrink-0" />
                                <p className="text-[12px] font-black tracking-[0.15em] text-rose-400 uppercase leading-none">
                                    {errors.email}
                                </p>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="relative group">
                            <FiLock className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl group-focus-within:text-emerald-400 transition-colors duration-300" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 pl-16 pr-14 text-white font-black text-sm tracking-[0.2em] placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:bg-black/80 transition-all duration-300 shadow-inner"
                                placeholder="PASSWORD"
                                autoComplete="off"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                            </button>
                        </div>
                        {errors.password && (
                            <div className="mt-4 mx-1 bg-rose-950/40 border border-rose-500/30 rounded-xl px-5 py-4 flex items-center gap-3 shadow-[0_10px_20px_rgba(244,63,94,0.15)] backdrop-blur-md">
                                <FiAlertCircle className="text-rose-500 text-lg flex-shrink-0" />
                                <p className="text-[12px] font-black tracking-[0.15em] text-rose-400 uppercase leading-none">
                                    {errors.password}
                                </p>
                            </div>
                        )}
                    </div>

                    {rateLimitError && (
                        <div className="mt-2 mx-1 bg-amber-950/40 border border-amber-500/30 rounded-xl px-5 py-4 flex items-center gap-3 shadow-[0_10px_20px_rgba(245,158,11,0.15)] backdrop-blur-md">
                            <FiAlertCircle className="text-amber-500 text-lg flex-shrink-0" />
                            <p className="text-[12px] font-black tracking-[0.15em] text-amber-400 uppercase leading-none">
                                {rateLimitError}
                            </p>
                        </div>
                    )}

                    {errors.general && (
                        <div className="mt-2 mx-1 bg-rose-950/40 border border-rose-500/30 rounded-xl px-5 py-4 flex items-center gap-3 shadow-[0_10px_20px_rgba(244,63,94,0.15)] backdrop-blur-md">
                            <FiAlertCircle className="text-rose-500 text-lg flex-shrink-0" />
                            <p className="text-[12px] font-black tracking-[0.15em] text-rose-400 uppercase leading-none">
                                {errors.general}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="group/btn relative w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-6 px-4 rounded-2xl transition-all shadow-[0_20px_40px_rgba(16,185,129,0.25)] uppercase tracking-[0.5em] text-base cursor-pointer overflow-hidden disabled:opacity-40 transform active:scale-95"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {loading ? 'LOGGING IN...' : 'LOGIN'} <span className="text-2xl group-hover/btn:translate-x-2 transition-transform">→</span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                    </button>
                </form>

                <div className="mt-6">
                    <Link
                        to="/register"
                        className="w-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 font-black py-6 rounded-2xl text-center block text-sm uppercase tracking-[0.25em] transition-all duration-300 transform active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                    >
                        DON'T HAVE AN ACCOUNT? REGISTER
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;