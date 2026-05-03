import { Link, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    ArrowRight, Sparkles, Trophy, Users, Shield, Zap,
    ChevronDown, Calendar, Play, Award
} from "lucide-react";
import Logo from '@/Assets/logo.png';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
    show: { transition: { staggerChildren: 0.1 } }
};

export default function Welcome({ auth = { user: null } }) {

    const [activeFeature, setActiveFeature] = useState(0);

    const [count] = useState({
        events: 48,
        participants: 1200,
        winners: 144
    });

    const colorMap = {
        blue: "from-blue-500 to-cyan-500",
        cyan: "from-cyan-500 to-sky-500",
        emerald: "from-emerald-500 to-green-500"
    };

    const features = [
        {
            icon: Trophy,
            title: "Kompetisi Bergengsi",
            desc: "Ikuti lomba dengan standar nasional dan sistem penilaian profesional yang adil.",
            stats: "Kategori Lengkap"
        },
        {
            icon: Zap,
            title: "Realtime Scoring",
            desc: "Nilai langsung muncul saat juri menilai — transparan & tanpa manipulasi.",
            stats: "Live Update"
        },
        {
            icon: Shield,
            title: "Aman & Terpercaya",
            desc: "Data peserta terlindungi dan sistem terjamin keamanannya.",
            stats: "Secure System"
        },
        {
            icon: Users,
            title: "Komunitas Nasional",
            desc: "Terhubung dengan peserta dari berbagai daerah di Indonesia.",
            stats: "All Region"
        }
    ];

    return (
        <>
            <Head title="Lomba Layangan" />

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">

                {/* NAVBAR */}
                <nav className="fixed w-full top-0 z-50 backdrop-blur-xl bg-white/10 border-b border-white/10">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <img src={Logo} className="w-10 h-10 rounded-xl shadow-lg" />
                            <span className="font-bold text-lg">Lomba Layang-Layang</span>
                        </div>

                        <div className="flex gap-3">
                            {auth.user ? (
                                <Link href="/dashboard"
                                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg hover:scale-105 transition">
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login"
                                        className="px-5 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition">
                                        Masuk
                                    </Link>
                                    <Link href="/register"
                                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg hover:scale-105 transition">
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* HERO */}
                <section className="pt-32 pb-24">
                    <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

                        <motion.div variants={stagger} initial="hidden" animate="show">

                            <motion.div variants={fadeUp}
                                className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6 backdrop-blur">
                                <Sparkles className="w-4 h-4 text-yellow-300" />
                                Platform #1 Layangan
                            </motion.div>

                            <motion.h1 variants={fadeUp}
                                className="text-5xl font-black mb-6 leading-tight">
                                Terbangkan <br />
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    Kreativitasmu
                                </span>
                            </motion.h1>

                            <motion.p variants={fadeUp}
                                className="text-white/80 mb-8">
                                Kompetisi layangan modern dengan sistem penilaian realtime,
                                transparan, dan profesional.
                            </motion.p>

                            <motion.div variants={fadeUp} className="flex gap-4">
                                <Link href="/register"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-xl hover:scale-105 transition">
                                    <Play size={16} />
                                    Mulai
                                </Link>

                                <a href="#features"
                                    className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
                                    Lihat Fitur
                                </a>
                            </motion.div>

                            {/* STATS */}
                            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 mt-12">

                                {[
                                    { icon: Shield, text: "Penilaian Transparan" },
                                    { icon: Trophy, text: "Juri Profesional" },
                                    { icon: Zap, text: "Realtime System" },
                                    { icon: Users, text: "Terbuka Nasional" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                            <item.icon size={18} />
                                        </div>
                                        <span className="text-sm">{item.text}</span>
                                    </div>
                                ))}

                            </motion.div>

                        </motion.div>

                        {/* VISUAL */}
                        <div className="flex justify-center relative">

                            {/* Glow background */}
                            <div className="absolute w-72 h-72 bg-blue-500/30 blur-3xl rounded-full" />

                            <motion.img
                                src={Logo}
                                alt="Logo"
                                animate={{ y: [0, -12, 0], rotate: [0, 4, -4, 0] }}
                                transition={{ repeat: Infinity, duration: 6 }}
                                className="w-64 relative z-10 drop-shadow-2xl"
                            />
                        </div>

                    </div>

                    <div className="text-center mt-10 animate-bounce text-white/60">
                        <ChevronDown />
                    </div>
                </section>

                {/* FEATURES */}
                <section id="features" className="py-20 bg-white text-gray-900">
                    <div className="max-w-6xl mx-auto px-6">

                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold">Fitur Unggulan</h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {features.map((f, i) => (
                                <div key={i}
                                    onMouseEnter={() => setActiveFeature(i)}
                                    className={`p-6 rounded-2xl border transition-all duration-300
                                    ${activeFeature === i
                                            ? 'shadow-2xl scale-105 border-blue-400 bg-blue-50'
                                            : 'hover:shadow-xl'
                                        }`}>

                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white mb-4">
                                        <f.icon />
                                    </div>

                                    <h3 className="font-bold mb-1">{f.title}</h3>
                                    <p className="text-sm text-gray-500">{f.desc}</p>
                                    <p className="text-xs mt-2 text-blue-500 font-semibold">{f.stats}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

            </div>
        </>
    );
}