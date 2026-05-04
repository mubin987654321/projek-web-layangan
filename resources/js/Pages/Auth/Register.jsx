import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Star, User, Mail, Lock } from 'lucide-react';
import Logo from '@/Assets/logo.png';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', email: '', password: '', password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const formRef = useRef(null);

    useEffect(() => {
        const handleMouse = (e) => {
            const rect = formRef.current?.getBoundingClientRect();
            if (rect) {
                setMousePos({
                    x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
                    y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
                });
            }
        };
        window.addEventListener('mousemove', handleMouse);
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    const fields = [
        { key: 'name', icon: User, label: 'Full Name', type: 'text', placeholder: 'Enter your name' },
        { key: 'email', icon: Mail, label: 'Email', type: 'email', placeholder: 'your@email.com' },
        { key: 'password', icon: Lock, label: 'Password', type: 'password', placeholder: 'At least 8 characters' },
        { key: 'password_confirmation', icon: Lock, label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password' },
    ];

    return (
        <GuestLayout>
            <Head title="Website Layangan" />

            <div className="min-h-screen flex items-center justify-center p-4
                           bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950
                           relative overflow-hidden">

                {/* Animated Background */}
                <div className="absolute inset-0">
                    {/* Floating orbs */}
                    <motion.div className="absolute w-[300px] h-[300px] bg-purple-500/10 
                                          rounded-full top-20 left-10 blur-3xl" 
                        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 8, repeat: Infinity }} />
                    <motion.div className="absolute w-[400px] h-[400px] bg-indigo-500/5 
                                          rounded-full bottom-20 right-10 blur-3xl" 
                        animate={{ y: [0, 20, 0], scale: [1.1, 1, 1.1] }}
                        transition={{ duration: 10, repeat: Infinity, delay: 2 }} />
                    
                    {/* Grid pattern */}
                    <div className="absolute inset-0 opacity-20" 
                         style={{
                             backgroundImage: `linear-gradient(rgba(147,51,234,0.1) 1px, transparent 1px),
                                              linear-gradient(90deg, rgba(147,51,234,0.1) 1px, transparent 1px)`,
                             backgroundSize: '80px 80px',
                         }} />
                </div>

                {/* Main Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="relative z-20 w-full max-w-md mx-auto"
                    ref={formRef}>
                    
                    {/* 3D Floating Card */}
                    <motion.div 
                        style={{ x: mousePos.x, y: mousePos.y, rotateX: mousePos.y * 0.02, rotateY: mousePos.x * 0.02 }}
                        className="relative bg-white/5 backdrop-blur-3xl border border-white/20 
                                   shadow-2xl shadow-purple-500/20 rounded-3xl p-8 overflow-hidden
                                   transform-gpu perspective-1000"
                        whileHover={{ scale: 1.02, shadow: '0 30px 60px rgba(147,51,234,0.3)' }}>
                        
                        {/* Card Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 
                                       to-indigo-500/20 opacity-0 hover:opacity-100 transition-opacity 
                                       rounded-3xl blur" />
                        
                        {/* Top Gradient Bar */}
                        <div className="absolute top-0 left-0 right-0 h-2 
                                       bg-gradient-to-r from-purple-400 to-indigo-400 shadow-lg" />

                        {/* Logo */}
                        <div className="flex items-center justify-center mb-8">
                            <motion.div 
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 
                                          rounded-2xl flex items-center justify-center shadow-2xl 
                                          border-4 border-white/20">
                                <img src={Logo} className="w-10 h-10 object-contain" />
                            </motion.div>
                        </div>

                        <h2 className="text-center text-3xl font-black bg-gradient-to-r 
                                      from-white to-slate-200 bg-clip-text text-transparent 
                                      mb-2 drop-shadow-lg">
                            Buat Akun
                        </h2>
                        <p className="text-center text-slate-400 text-sm mb-8">
                            Mulai petualangan kompetisi layanganmu
                        </p>

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-6">
                            {fields.map(field => (
                                <motion.div key={field.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + field.key.charCodeAt(0) * 0.02 }}>
                                    
                                    <div className="relative">
                                        <InputLabel 
                                            htmlFor={field.key} 
                                            value={field.label}
                                            className="absolute -top-3 left-3 px-2 bg-white/90 backdrop-blur-sm 
                                                      text-xs font-bold text-gray-700 rounded-full shadow-sm" />
                                        
                                        <div className="relative">
                                            <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 
                                                                 w-4 h-4 text-purple-400 z-10 pointer-events-none" />
                                            <TextInput
                                                id={field.key}
                                                type={field.type}
                                                value={data[field.key]}
                                                className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-white/20
                                                          bg-white/10 backdrop-blur-xl text-white placeholder:text-slate-400
                                                          focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50
                                                          focus:bg-white/20 transition-all duration-300 shadow-lg
                                                          hover:border-white/30 hover:shadow-xl"
                                                placeholder={field.placeholder}
                                                onChange={e => setData(field.key, e.target.value)}
                                                required />
                                        </div>
                                        
                                        <InputError message={errors[field.key]} 
                                            className="mt-2 text-red-400 text-xs font-medium" />
                                    </div>
                                </motion.div>
                            ))}

                            {/* Submit Button */}
                            <motion.button 
                                type="submit" 
                                disabled={processing}
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full relative group overflow-hidden bg-gradient-to-r 
                                          from-purple-500 via-indigo-500 to-purple-600
                                          text-white font-black py-4 px-6 rounded-2xl shadow-2xl
                                          shadow-purple-500/40 hover:shadow-purple-500/60
                                          hover:from-purple-600 hover:to-indigo-600
                                          disabled:opacity-50 disabled:cursor-not-allowed
                                          disabled:hover:shadow-purple-500/20 transition-all duration-500">
                                
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                                               via-white/20 to-transparent -skew-x-12 transform -translate-x-full
                                               group-hover:translate-x-full transition-transform duration-1000" />
                                
                                <div className="relative flex items-center justify-center gap-2">
                                    {processing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white 
                                                           rounded-full animate-spin" />
                                            Membuat...
                                        </>
                                    ) : (
                                        <>
                                            <ShieldCheck className="w-5 h-5" />
                                            Daftar Gratis
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </motion.button>

                            {/* Login Link */}
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-center pt-4">
                                <span className="text-slate-400 text-sm">Sudah punya akun? </span>
                                <Link href={route('login')}
                                    className="text-purple-400 hover:text-purple-300 font-bold 
                                              bg-gradient-to-r from-purple-500/10 to-indigo-500/10
                                              px-4 py-2 rounded-xl backdrop-blur-sm border border-purple-400/30
                                              hover:border-purple-400/50 hover:shadow-lg transition-all">
                                    Masuk Sekarang
                                </Link>
                            </motion.p>
                        </form>
                    </motion.div>
                </motion.div>

                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div 
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-indigo-400 
                                  rounded-full shadow-lg opacity-60 pointer-events-none"
                        style={{ 
                            left: `${10 + i * 4}%`, 
                            top: `${20 + (i % 5) * 15}%`,
                            animationDelay: `${i * 0.1}s`
                        }}
                        animate={{ 
                            y: [0, -50, 0],
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{ 
                            duration: 4 + i * 0.2, 
                            repeat: Infinity, 
                            ease: 'easeInOut' 
                        }} />
                ))}
            </div>
        </GuestLayout>
    );
}