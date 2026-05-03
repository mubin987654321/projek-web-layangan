import UserLayout from '@/Layouts/UserLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
    CheckCircle2, Clock, Upload, Trophy,
    Megaphone, AlertTriangle, Info, ArrowRight,
    Calendar, Sparkles, Bell, CalendarPlus,
    UserCheck, FileUp, Star, Gift,
    ChevronRight, ChevronDown, Zap
} from 'lucide-react';

const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };

/* ── Flow steps config ── */
const FLOW_STEPS = [
    { step: 1, icon: CalendarPlus, label: 'Daftar Event',       desc: 'Pilih event & kategori favoritmu',    grad: 'from-[#6366f1] to-[#818cf8]', glow: 'rgba(99,102,241,0.35)',  userAction: true,  actionLabel: 'Daftar',  actionRoute: 'events.index',             emoji: '🎯' },
    { step: 2, icon: UserCheck,    label: 'Admin Verifikasi',    desc: 'Tunggu konfirmasi admin (1–2 hari)',  grad: 'from-[#7c3aed] to-[#a78bfa]', glow: 'rgba(124,58,237,0.35)', waiting: true,                                                                      emoji: '⏳' },
    { step: 3, icon: FileUp,       label: 'Upload Karya',        desc: 'Unggah karya terbaikmu!',            grad: 'from-[#ec4899] to-[#f472b6]', glow: 'rgba(236,72,153,0.35)', userAction: true,  actionLabel: 'Upload',  actionRoute: 'user.registrations.index', emoji: '🎨' },
    { step: 4, icon: Star,         label: 'Juri Menilai',        desc: 'Juri profesional menilai karyamu',   grad: 'from-[#f59e0b] to-[#fbbf24]', glow: 'rgba(245,158,11,0.35)', waiting: true,                                                                      emoji: '⭐' },
    { step: 5, icon: Trophy,       label: 'Pengumuman',          desc: 'Pantau hasilnya di dashboard!',      grad: 'from-[#10b981] to-[#34d399]', glow: 'rgba(16,185,129,0.35)', highlight: true,                                                                    emoji: '🏆' },
    { step: 6, icon: Gift,         label: 'Hadiah & Sertifikat', desc: 'Pemenang dapat hadiah & sertifikat', grad: 'from-[#f59e0b] to-[#d97706]', glow: 'rgba(245,158,11,0.35)', highlight: true,                                                                    emoji: '🎁' },
];

export default function Dashboard({ registrations, announcements }) {
    const stats = [
        { label: 'Pendaftaran',  value: registrations.length,                                  icon: Calendar,     grad: 'from-[#6366f1] to-[#818cf8]', glow: 'rgba(99,102,241,0.3)'  },
        { label: 'Disetujui',    value: registrations.filter(r => r.status === 'approved').length, icon: CheckCircle2, grad: 'from-[#10b981] to-[#34d399]', glow: 'rgba(16,185,129,0.3)'  },
        { label: 'Sudah Upload', value: registrations.filter(r => r.submission).length,        icon: Upload,       grad: 'from-[#7c3aed] to-[#a78bfa]', glow: 'rgba(124,58,237,0.3)'  },
        { label: 'Pengumuman',   value: announcements.length,                                   icon: Bell,         grad: 'from-[#f59e0b] to-[#fbbf24]', glow: 'rgba(245,158,11,0.3)'  },
    ];

    return (
        <UserLayout header="Dashboard">
            <Head title="Dashboard" />

            {/* ── HERO ── */}
            <motion.div
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl mb-7 text-white"
                style={{
                    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 55%, #24243e 100%)',
                    boxShadow: '0 24px 60px -12px rgba(79,70,229,0.5)',
                }}
            >
                {/* Grid overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.9) 1px,transparent 1px),
                                          linear-gradient(90deg,rgba(255,255,255,0.9) 1px,transparent 1px)`,
                        backgroundSize: '36px 36px',
                    }} />

                {/* Glow orbs */}
                <motion.div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }}
                    animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
                <motion.div className="absolute -bottom-12 left-8 w-48 h-48 rounded-full opacity-15 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
                    animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />

                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 p-7">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full mb-3"
                            style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.35)', color: '#a5b4fc' }}>
                            <Sparkles className="w-3 h-3 text-yellow-300" />
                            Selamat Datang Kembali!
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                            className="text-2xl font-black tracking-tight" style={{ textShadow: '0 0 40px rgba(129,140,248,0.5)' }}>
                            Dashboard Peserta 🪁
                        </motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                            className="text-sm mt-1.5" style={{ color: 'rgba(199,210,254,0.75)' }}>
                            Pantau semua pendaftaran dan karya kamu di sini.
                        </motion.p>
                    </div>

                    {/* Kite SVG */}
                    <motion.div
                        animate={{ rotate: [0, 6, -4, 0], y: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className="hidden sm:block shrink-0"
                    >
                        <svg width="76" height="92" viewBox="0 0 100 120" fill="none">
                            <defs>
                                <linearGradient id="kg" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#818cf8"/>
                                    <stop offset="100%" stopColor="#60a5fa"/>
                                </linearGradient>
                                <filter id="ks"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#6366f1" floodOpacity="0.5"/></filter>
                            </defs>
                            <polygon points="50,5 95,50 50,85 5,50" fill="url(#kg)" filter="url(#ks)"/>
                            <line x1="50" y1="5" x2="50" y2="85" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                            <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                            <polygon points="50,5 95,50 50,50 5,50" fill="rgba(255,255,255,0.08)"/>
                            <path d="M50 85 Q45 97 50 108 Q55 117 50 120" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                            {[93,101,109].map((y,i) => <circle key={i} cx={50+(i%2===0?-4:4)} cy={y} r="2.5" fill="#818cf8" opacity="0.7"/>)}
                        </svg>
                    </motion.div>
                </div>
            </motion.div>

            {/* ── STAT CARDS ── */}
            <motion.div initial="hidden" animate="show" variants={stagger}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
                {stats.map((s, i) => (
                    <motion.div key={i} variants={fadeUp}
                        whileHover={{ y: -5, scale: 1.025 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="relative overflow-hidden rounded-2xl bg-white"
                        style={{
                            border: '1px solid rgba(99,102,241,0.1)',
                            boxShadow: `0 6px 24px -4px ${s.glow}, 0 2px 8px rgba(0,0,0,0.04)`,
                        }}>
                        {/* Top accent */}
                        <div className={`h-0.5 w-full bg-gradient-to-r ${s.grad}`} />
                        <div className="p-5">
                            <div className={`w-10 h-10 bg-gradient-to-br ${s.grad} rounded-xl
                                             flex items-center justify-center shadow-md mb-3`}
                                style={{ boxShadow: `0 6px 14px -2px ${s.glow}` }}>
                                <s.icon className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
                            </div>
                            <p className="text-2xl font-black text-gray-900 tabular-nums">{s.value}</p>
                            <p className="text-xs text-gray-500 mt-0.5 font-medium">{s.label}</p>
                        </div>
                        {/* Corner glow */}
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-10"
                            style={{ background: `radial-gradient(circle, ${s.glow}, transparent)` }} />
                    </motion.div>
                ))}
            </motion.div>

            {/* ── COMPETITION FLOW ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-3xl overflow-hidden mb-7"
                style={{
                    background: 'white',
                    border: '1px solid rgba(99,102,241,0.1)',
                    boxShadow: '0 4px 24px -4px rgba(99,102,241,0.1)',
                }}
            >
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-4"
                    style={{
                        borderBottom: '1px solid rgba(99,102,241,0.08)',
                        background: 'linear-gradient(to right, rgba(238,242,255,0.8), rgba(245,243,255,0.4))',
                    }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800 text-sm">Alur Kompetisi</h2>
                        <p className="text-xs text-gray-400">6 langkah menuju podium 🏆</p>
                    </div>
                    <motion.span animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                        className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full"
                        style={{ background: 'rgba(99,102,241,0.1)', color: '#4f46e5', border: '1px solid rgba(99,102,241,0.2)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Panduan Peserta
                    </motion.span>
                </div>

                {/* Steps */}
                <div className="p-6">
                    {/* Desktop */}
                    <div className="hidden md:grid grid-cols-6 gap-3">
                        {FLOW_STEPS.map((s, i) => (
                            <FlowStep key={s.step} step={s} index={i} />
                        ))}
                    </div>
                    {/* Mobile */}
                    <div className="md:hidden space-y-2">
                        {FLOW_STEPS.map((s, i) => (
                            <FlowStepMobile key={s.step} step={s} index={i} isLast={i === FLOW_STEPS.length - 1} />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ── BOTTOM GRID ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* PENDAFTARAN */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.2 }}
                    className="rounded-3xl overflow-hidden"
                    style={{
                        background: 'white',
                        border: '1px solid rgba(99,102,241,0.1)',
                        boxShadow: '0 4px 24px -4px rgba(99,102,241,0.1)',
                    }}>
                    <div className="flex items-center justify-between px-6 py-4"
                        style={{ borderBottom: '1px solid rgba(99,102,241,0.08)',
                                 background: 'linear-gradient(to right, rgba(238,242,255,0.8), rgba(245,243,255,0.4))' }}>
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 4px 10px rgba(99,102,241,0.35)' }}>
                                <Calendar className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-800 text-sm">Pendaftaran Saya</h2>
                                <p className="text-xs text-gray-400">{registrations.length} total pendaftaran</p>
                            </div>
                        </div>
                        <Link href={route('user.registrations.index')}
                            className="flex items-center gap-1 text-xs font-semibold transition-all duration-200"
                            style={{ color: '#6366f1' }}>
                            Lihat Semua <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="p-5">
                        {registrations.length === 0 ? (
                            <div className="text-center py-10">
                                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                                    className="text-4xl mb-3">📋</motion.div>
                                <p className="text-gray-500 text-sm mb-4 font-medium">Belum ada pendaftaran. Yuk mulai!</p>
                                <Link href={route('events.index')}
                                    className="inline-flex items-center gap-1.5 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200"
                                    style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', boxShadow: '0 6px 20px -4px rgba(99,102,241,0.5)' }}>
                                    Lihat Event <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2.5">
                                {registrations.slice(0, 4).map((reg, i) => (
                                    <RegistrationItem key={reg.id} reg={reg} index={i} />
                                ))}
                                {registrations.length > 4 && (
                                    <Link href={route('user.registrations.index')}
                                        className="block text-center text-xs font-semibold pt-2 transition-all duration-200"
                                        style={{ color: '#6366f1' }}>
                                        +{registrations.length - 4} pendaftaran lainnya →
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* PENGUMUMAN */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.25 }}
                    className="rounded-3xl overflow-hidden flex flex-col"
                    style={{
                        background: 'white',
                        border: '1px solid rgba(99,102,241,0.1)',
                        boxShadow: '0 4px 24px -4px rgba(99,102,241,0.1)',
                    }}>
                    <div className="flex items-center justify-between px-6 py-4"
                        style={{ borderBottom: '1px solid rgba(99,102,241,0.08)',
                                 background: 'linear-gradient(to right, rgba(238,242,255,0.8), rgba(245,243,255,0.4))' }}>
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 4px 10px rgba(245,158,11,0.35)' }}>
                                <Megaphone className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-800 text-sm">Pengumuman Terbaru</h2>
                                <p className="text-xs text-gray-400">Klik untuk lihat detail</p>
                            </div>
                        </div>
                        {announcements.length > 0 && (
                            <motion.span animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-white text-xs font-black px-2.5 py-1 rounded-full"
                                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 4px 10px rgba(239,68,68,0.35)' }}>
                                {announcements.length} baru
                            </motion.span>
                        )}
                    </div>

                    <div className="p-4 flex-1 overflow-y-auto" style={{ maxHeight: 420 }}>
                        {announcements.length === 0 ? (
                            <div className="text-center py-10">
                                <motion.div animate={{ rotate: [0, 12, -6, 0] }} transition={{ duration: 4, repeat: Infinity }}
                                    className="text-4xl mb-3">📢</motion.div>
                                <p className="text-gray-400 text-sm">Belum ada pengumuman terbaru.</p>
                            </div>
                        ) : (
                            <div className="space-y-2.5">
                                {announcements.map((a, i) => (
                                    <AnnouncementItem key={a.id} ann={a} index={i} />
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </UserLayout>
    );
}

/* ─────────────────── FLOW STEP (Desktop) ─────────────────── */
function FlowStep({ step, index }) {
    const Icon = step.icon;
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="relative flex flex-col items-center text-center px-2 py-4 rounded-2xl
                           transition-all duration-200 cursor-default overflow-hidden"
                style={hovered ? {
                    background: 'rgba(238,242,255,0.7)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    boxShadow: `0 8px 24px -4px ${step.glow}`,
                } : {
                    background: 'rgba(248,249,255,0.8)',
                    border: '1px solid rgba(99,102,241,0.08)',
                }}
            >
                {/* Floating emoji */}
                <AnimatePresence>
                    {hovered && (
                        <motion.span className="absolute top-1.5 right-2.5 text-base pointer-events-none"
                            initial={{ opacity: 0, y: 4, scale: 0.5 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}>
                            {step.emoji}
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Icon */}
                <div className="relative mb-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.grad} rounded-2xl
                                     flex items-center justify-center shadow-md`}
                        style={{ boxShadow: `0 6px 16px -2px ${step.glow}` }}>
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 w-[18px] h-[18px] bg-white rounded-full
                                     text-[9px] font-black text-gray-600 flex items-center justify-center shadow-sm"
                        style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
                        {step.step}
                    </span>
                    {step.waiting && (
                        <motion.span className="absolute inset-0 rounded-2xl border-2"
                            style={{ borderColor: 'rgba(124,58,237,0.4)' }}
                            animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }} />
                    )}
                </div>

                <p className="text-[11px] font-black text-gray-800 leading-tight mb-1">{step.label}</p>
                <p className="text-[10px] text-gray-400 leading-tight mb-2">{step.desc}</p>

                {step.userAction && (
                    <Link href={route(step.actionRoute)}
                        className="inline-flex items-center gap-1 text-white text-[10px] font-bold
                                   px-2.5 py-1 rounded-lg transition-all duration-200"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', boxShadow: '0 4px 10px rgba(99,102,241,0.35)' }}>
                        {step.actionLabel} <ChevronRight className="w-2.5 h-2.5" />
                    </Link>
                )}
                {step.waiting && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1' }}>
                        <Clock className="w-2.5 h-2.5" /> Menunggu
                    </span>
                )}
                {step.highlight && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg"
                        style={{ background: 'rgba(245,158,11,0.1)', color: '#b45309', border: '1px solid rgba(245,158,11,0.2)' }}>
                        <Trophy className="w-2.5 h-2.5" /> Hasil!
                    </span>
                )}
            </motion.div>
        </motion.div>
    );
}

/* ─────────────────── FLOW STEP (Mobile) ─────────────────── */
function FlowStepMobile({ step, index, isLast }) {
    const Icon = step.icon;
    return (
        <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-4">
            <div className="flex flex-col items-center shrink-0">
                <div className={`relative w-10 h-10 bg-gradient-to-br ${step.grad} rounded-xl
                                 flex items-center justify-center shadow-md`}
                    style={{ boxShadow: `0 4px 12px -2px ${step.glow}` }}>
                    <Icon className="w-4 h-4 text-white" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full
                                     text-[9px] font-black text-gray-600 flex items-center justify-center"
                        style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
                        {step.step}
                    </span>
                </div>
                {!isLast && (
                    <div className="w-px mt-1" style={{ height: 24, background: 'linear-gradient(to bottom, rgba(99,102,241,0.2), transparent)' }} />
                )}
            </div>
            <div className="flex-1 pb-1 pt-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-gray-800 text-sm">{step.label}</p>
                    <span className="text-sm">{step.emoji}</span>
                    {step.userAction && (
                        <Link href={route(step.actionRoute)}
                            className="inline-flex items-center gap-1 text-white text-[10px] font-bold px-2 py-0.5 rounded-lg"
                            style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }}>
                            {step.actionLabel} <ChevronRight className="w-2.5 h-2.5" />
                        </Link>
                    )}
                    {step.waiting && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-lg"
                            style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1' }}>
                            <Clock className="w-2.5 h-2.5" /> Menunggu
                        </span>
                    )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
            </div>
        </motion.div>
    );
}

/* ─────────────────── REGISTRATION ITEM ─────────────────── */
function RegistrationItem({ reg, index }) {
    const hasSubmission = !!reg.submission;
    const isApproved    = reg.status === 'approved';

    const statusCfg = {
        pending:  { label: 'Menunggu',  bg: 'rgba(245,158,11,0.1)',  text: '#b45309', dot: '#f59e0b' },
        approved: { label: 'Disetujui', bg: 'rgba(16,185,129,0.1)',  text: '#059669', dot: '#10b981' },
        rejected: { label: 'Ditolak',   bg: 'rgba(239,68,68,0.1)',   text: '#dc2626', dot: '#ef4444' },
    };
    const cfg = statusCfg[reg.status] ?? statusCfg.pending;

    return (
        <motion.div
            initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ x: 3 }}
            className="flex items-center gap-3 p-3.5 rounded-2xl transition-all duration-200"
            style={{
                background: 'rgba(248,249,255,0.8)',
                border: '1px solid rgba(99,102,241,0.08)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.08)'}
        >
            <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cfg.dot }} />
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm truncate">{reg.event.title}</p>
                <p className="text-xs text-gray-400 truncate">{reg.category.name}</p>
            </div>
            <div className="shrink-0">
                {isApproved && !hasSubmission ? (
                    <Link href={route('user.submissions.create', reg.id)}
                        className="flex items-center gap-1 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', boxShadow: '0 4px 10px rgba(99,102,241,0.3)' }}>
                        <Upload className="w-3 h-3" /> Upload
                    </Link>
                ) : isApproved && hasSubmission ? (
                    <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg"
                        style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', border: '1px solid rgba(16,185,129,0.2)' }}>
                        ✅ Uploaded
                    </span>
                ) : (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: cfg.bg, color: cfg.text }}>
                        {cfg.label}
                    </span>
                )}
            </div>
        </motion.div>
    );
}

/* ─────────────────── ANNOUNCEMENT ITEM ─────────────────── */
function AnnouncementItem({ ann, index }) {
    const [expanded, setExpanded] = useState(false);

    const typeCfg = {
        winner:  { icon: Trophy,         borderColor: '#f59e0b', bg: 'rgba(245,158,11,0.08)',  text: '#b45309', label: 'Pemenang 🏆'   },
        warning: { icon: AlertTriangle,  borderColor: '#ef4444', bg: 'rgba(239,68,68,0.08)',   text: '#dc2626', label: 'Peringatan ⚠️' },
        update:  { icon: Info,           borderColor: '#3b82f6', bg: 'rgba(59,130,246,0.08)',  text: '#1d4ed8', label: 'Update 🔄'     },
        info:    { icon: Info,           borderColor: '#6366f1', bg: 'rgba(99,102,241,0.08)',  text: '#4f46e5', label: 'Info ℹ️'       },
    };
    const cfg  = typeCfg[ann.type] ?? typeCfg.info;
    const Icon = cfg.icon;

    return (
        <motion.div
            initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            layout
            onClick={() => setExpanded(v => !v)}
            className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
            style={{
                background: expanded ? `${cfg.bg.replace('0.08', '0.14')}` : cfg.bg,
                border: `1px solid ${cfg.borderColor}30`,
                borderLeft: `3px solid ${cfg.borderColor}`,
            }}
        >
            <div className="flex items-start gap-3 p-3.5">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${cfg.borderColor}18`, color: cfg.text }}>
                    <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[10px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                            style={{ background: `${cfg.borderColor}15`, color: cfg.text }}>
                            {cfg.label}
                        </span>
                        {ann.event?.title && (
                            <span className="text-[10px] text-gray-400 truncate max-w-[100px]">{ann.event.title}</span>
                        )}
                    </div>
                    <p className={`font-bold text-gray-800 text-sm leading-snug ${expanded ? '' : 'truncate'}`}>
                        {ann.title}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                        {new Date(ann.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>
                <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.28 }}
                    className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${cfg.borderColor}15`, color: cfg.text }}>
                    <ChevronDown className="w-3 h-3" />
                </motion.div>
            </div>

            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden">
                        <div className="px-3.5 pb-3.5 pt-0">
                            <div className="h-px mb-3" style={{ background: `${cfg.borderColor}20` }} />
                            {ann.content ? (
                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{ann.content}</p>
                            ) : (
                                <p className="text-sm text-gray-400 italic">Tidak ada detail tambahan.</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}