import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Logo from '@/Assets/logo.png';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const formRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    useEffect(() => {
        const handleMouse = (e) => {
            const rect = formRef.current?.getBoundingClientRect();
            if (rect) {
                setMousePos({
                    x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
                    y: ((e.clientY - rect.top) / rect.height - 0.5) * 15,
                });
            }
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    return (
        <GuestLayout>
            <Head title="Website Layangan" />

            <div className="min-h-screen flex items-center justify-center p-4
                           bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950
                           relative overflow-hidden">

                {/* Animated Background */}
                <div className="absolute inset-0">
                    <motion.div className="absolute w-[350px] h-[350px] bg-purple-500/8 
                                          rounded-full top-10 left-10 blur-3xl" 
                        animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
                        transition={{ duration: 7, repeat: Infinity }} />
                    <motion.div className="absolute w-[450px] h-[450px] bg-indigo-500/4 
                                          rounded-full bottom-10 right-10 blur-3xl" 
                        animate={{ y: [0, 15, 0], scale: [1.05, 1, 1.05] }}
                        transition={{ duration: 9, repeat: Infinity, delay: 1 }} />
                    
                    {/* Subtle grid */}
                    <div className="absolute inset-0 opacity-10" 
                         style={{
                             backgroundImage: `linear-gradient(rgba(168,85,247,0.08) 1px, transparent 1px),
                                              linear-gradient(90deg, rgba(168,85,247,0.08) 1px, transparent 1px)`,
                             backgroundSize: '100px 100px',
                         }} />
                </div>

                {/* Main Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.92, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="relative z-20 w-full max-w-sm mx-auto"
                    ref={formRef}>
                    
                    <motion.div 
                        style={{ x: mousePos.x, y: mousePos.y, rotateX: mousePos.y * 0.015, rotateY: mousePos.x * 0.015 }}
                        className="relative bg-white/4 backdrop-blur-3xl border border-white/15 
                                   shadow-2xl shadow-purple-500/15 rounded-3xl p-10 overflow-hidden
                                   transform-gpu perspective-1200"
                        whileHover={{ scale: 1.015, shadow: '0 25px 50px rgba(168,85,247,0.25)' }}>
                        
                        {/* Inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 
                                       to-indigo-500/10 opacity-0 hover:opacity-100 transition-opacity 
                                       rounded-3xl blur" />
                        
                        {/* Top accent */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 
                                       bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 
                                       shadow-lg rounded-b-3xl" />

                        {/* Logo */}
                        <div className="flex items-center justify-center mb-10">
                            <motion.div 
                                animate={{ rotate: [0, -5, 5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-20 h-20 bg-gradient-to-br from-purple-500 via-indigo-500 to-cyan-500 
                                          rounded-3xl flex items-center justify-center shadow-2xl 
                                          border-4 border-white/30 backdrop-blur-sm">
                                <img src={Logo} className="w-14 h-14 object-contain drop-shadow-lg" />
                            </motion.div>
                        </div>

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black bg-gradient-to-r 
                                          from-white via-slate-100 to-purple-100 bg-clip-text 
                                          text-transparent drop-shadow-2xl mb-2">
                                Selamat Datang Kembali
                            </h2>
                            <p className="text-slate-400 text-lg font-medium">
                                Masuk ke akun kompetisimu
                            </p>
                        </div>

                        {status && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-6 p-4 bg-gradient-to-r from-emerald-500/15 to-teal-500/15
                                          border border-emerald-400/30 text-emerald-300 rounded-2xl 
                                          backdrop-blur-xl shadow-lg font-medium text-sm">
                                <ShieldCheck className="w-5 h-5 inline mr-2 mb-1" />
                                {status}
                            </motion.div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email Field */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}>
                                <div className="relative">
                                    <InputLabel htmlFor="email" value="Email Address"
                                        className="absolute -top-3 left-4 px-2.5 bg-white/95 backdrop-blur-sm 
                                                  text-xs font-bold text-gray-800 rounded-full shadow-sm z-10" />
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 
                                                       w-5 h-5 text-purple-400 z-10 pointer-events-none" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-white/20
                                                      bg-white/5 backdrop-blur-xl text-white placeholder:text-slate-400
                                                      focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50
                                                      focus:bg-white/10 transition-all duration-400 shadow-xl
                                                      hover:border-white/30 hover:shadow-2xl"
                                            placeholder="Masukkan email kamu"
                                            onChange={e => setData('email', e.target.value)}
                                            required />
                                    </div>
                                    <InputError message={errors.email} className="mt-2 text-red-400 text-xs font-medium" />
                                </div>
                            </motion.div>

                            {/* Password Field */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}>
                                <div className="relative">
                                    <InputLabel htmlFor="password" value="Password"
                                        className="absolute -top-3 left-4 px-2.5 bg-white/95 backdrop-blur-sm 
                                                  text-xs font-bold text-gray-800 rounded-full shadow-sm z-10" />
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 
                                                       w-5 h-5 text-purple-400 z-10 pointer-events-none" />
                                        <TextInput
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={data.password}
                                            className="w-full pl-14 pr-12 py-4 rounded-2xl border-2 border-white/20
                                                      bg-white/5 backdrop-blur-xl text-white placeholder:text-slate-400
                                                      focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50
                                                      focus:bg-white/10 transition-all duration-400 shadow-xl
                                                      hover:border-white/30 hover:shadow-2xl"
                                            placeholder="Masukkan password"
                                            onChange={e => setData('password', e.target.value)}
                                            required />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 
                                                      hover:bg-white/10 rounded-xl transition-all">
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5 text-slate-400 hover:text-white" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-slate-400 hover:text-white" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} className="mt-2 text-red-400 text-xs font-medium" />
                                </div>
                            </motion.div>

                            {/* Remember Me */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex items-center">
                                <Checkbox
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-purple-600 
                                              focus:ring-purple-500 w-5 h-5"
                                />
                                <span className="ml-3 text-sm text-slate-400 font-medium">
                                    Ingat saya
                                </span>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.button 
                                type="submit" 
                                disabled={processing}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full relative group overflow-hidden bg-gradient-to-r 
                                          from-purple-500 via-indigo-500 to-purple-600 hover:from-purple-600
                                          hover:via-indigo-600 hover:to-purple-700 text-white font-black 
                                          py-5 px-6 rounded-2xl shadow-2xl shadow-purple-500/40
                                          hover:shadow-purple-500/60 focus:shadow-purple-500/70
                                          disabled:opacity-50 disabled:cursor-not-allowed
                                          disabled:hover:shadow-purple-500/20 transition-all duration-500">
                                
                                {/* Shimmer */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                                               via-white/30 to-transparent -skew-x-12 -translate-x-full
                                               group-hover:translate-x-full transition-transform duration-700" />
                                
                                <div className="relative flex items-center justify-center gap-3">
                                    {processing ? (
                                        <>
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white 
                                                           rounded-full animate-spin shrink-0" />
                                            Memproses...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-5 h-5 shrink-0" />
                                            Masuk Sekarang
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </motion.button>

                            {/* Links */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col sm:flex-row justify-between items-center 
                                           gap-4 pt-6 border-t border-white/10">
                                
                                {canResetPassword && (
                                    <Link href={route('password.request')}
                                        className="text-purple-400 hover:text-purple-300 text-sm 
                                                  font-bold bg-gradient-to-r from-purple-500/5 to-indigo-500/5
                                                  px-4 py-2 rounded-xl backdrop-blur-sm border border-purple-400/20
                                                  hover:border-purple-400/40 hover:shadow-md transition-all">
                                        Lupa Password?
                                    </Link>
                                )}
                                
                                <Link href={route('register')}
                                    className="text-indigo-400 hover:text-indigo-300 text-sm 
                                              font-bold bg-gradient-to-r from-indigo-500/5 to-purple-500/5
                                              px-4 py-2 rounded-xl backdrop-blur-sm border border-indigo-400/20
                                              hover:border-indigo-400/40 hover:shadow-md transition-all">
                                        Buat Akun Baru
                                    </Link>
                            </motion.div>
                        </form>
                    </motion.div>
                </motion.div>

                {/* Floating Elements */}
                {[...Array(15)].map((_, i) => (
                    <motion.div 
                        key={`particle-${i}`}
                        className="absolute w-[6px] h-[6px] bg-gradient-to-r from-purple-400 
                                  to-indigo-400 rounded-full shadow-lg opacity-70 pointer-events-none"
                        style={{ 
                            left: `${15 + i * 5.5}%`, 
                            top: `${25 + (i % 4) * 20}%`,
                            animationDelay: `${i * 0.15}s`
                        }}
                        animate={{ 
                            y: [0, -40, 0],
                            opacity: [0.7, 1, 0.7],
                            scale: [1, 1.4, 1]
                        }}
                        transition={{ 
                            duration: 5 + i * 0.3, 
                            repeat: Infinity, 
                            ease: 'easeInOut' 
                        }} />
                ))}
            </div>
        </GuestLayout>
    );
}