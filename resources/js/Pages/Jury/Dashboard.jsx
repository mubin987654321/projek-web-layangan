import JuryLayout from '@/Layouts/JuryLayout';
import { Head, Link } from '@inertiajs/react';
import { ClipboardCheck, Star, Zap, Trophy, ChevronRight, TrendingUp } from 'lucide-react';
import {
    motion, AnimatePresence,
    useMotionValue, useSpring, useTransform
} from 'framer-motion';
import { useRef, useState, useCallback } from 'react';

/* ══ 3D TILT CARD ══ */
function TiltCard({ children, className = '', intensity = 12 }) {
    const ref   = useRef(null);
    const rotX  = useSpring(0, { stiffness: 250, damping: 28 });
    const rotY  = useSpring(0, { stiffness: 250, damping: 28 });
    const shine = useMotionValue(50);
    const onMove = useCallback((e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        rotX.set(-((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * intensity);
        rotY.set( ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) * intensity);
        shine.set(((e.clientX - r.left) / r.width) * 100);
    }, [intensity]);
    const onLeave = useCallback(() => { rotX.set(0); rotY.set(0); }, []);
    const shimmerBg = useTransform(shine, [0, 100],
        ['rgba(168,85,247,0)', 'rgba(168,85,247,0.12)']);
    return (
        <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d', perspective: 700 }}
            className={`relative ${className}`}>
            <motion.div style={{ background: shimmerBg }}
                className="absolute inset-0 rounded-2xl pointer-events-none z-10
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {children}
        </motion.div>
    );
}

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
    id: i, left: `${(i * 337) % 100}%`, top: `${(i * 271) % 100}%`,
    dur: 2.5 + (i % 4), delay: (i % 5) * 0.6, size: 2 + (i % 3),
    color: ['#a855f7','#c084fc','#8b5cf6','#a78bfa','#c4b5fd'][i % 5],
}));

const stagger = { show: { transition: { staggerChildren: 0.08 } } };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

export default function JuryDashboard({ assignments, scoredThisMonth, totalScores }) {
    const [hoveredCard, setHoveredCard] = useState(null);

    const stats = [
        {
            label: 'Karya Dinilai Bulan Ini', value: scoredThisMonth,
            icon: ClipboardCheck, grad: 'from-purple-500 to-indigo-600',
            shadow: 'shadow-purple-200/50', glow: 'rgba(168,85,247,0.25)',
            emoji: '📋',
        },
        {
            label: 'Total Penilaian Diberikan', value: totalScores,
            icon: Star, grad: 'from-indigo-500 to-purple-600',
            shadow: 'shadow-indigo-200/50', glow: 'rgba(192,132,252,0.25)',
            emoji: '⭐',
        },
    ];

    return (
        <JuryLayout header="Dashboard Juri">
            <Head title="Jury Dashboard" />

            {/* ── HERO BANNER ── */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative overflow-hidden rounded-3xl mb-8
                           bg-gradient-to-br from-slate-900 via-purple-950 to-indigo-950
                           p-7 text-white shadow-2xl shadow-purple-950/40 border border-purple-800/30">

                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: `linear-gradient(rgba(168,85,247,0.4) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(168,85,247,0.4) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }} />

                {/* Orbs */}
                <motion.div className="absolute w-72 h-72 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)', top: '-20%', right: '-5%', opacity: 0.2 }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
                <motion.div className="absolute w-48 h-48 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #c084fc 0%, transparent 70%)', bottom: '-15%', left: '5%', opacity: 0.18 }}
                    animate={{ scale: [1.2, 1, 1.2] }}
                    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />

                {/* Particles */}
                {PARTICLES.map(p => (
                    <motion.div key={p.id} className="absolute rounded-full pointer-events-none shadow-lg"
                        style={{ width: p.size, height: p.size, background: p.color, left: p.left, top: p.top }}
                        animate={{ y: [0, -18, 0], opacity: [0.3, 0.9, 0.3] }}
                        transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }} />
                ))}

                <div className="relative z-10 flex justify-between items-center gap-5">
                    <div>
                        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/40
                                       text-purple-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-3 backdrop-blur-sm">
                            <Zap className="w-3 h-3 text-purple-300" />
                            Panel Juri
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                            className="text-2xl font-black text-white tracking-tight drop-shadow-lg">
                            Dashboard Juri ⚖️
                        </motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                            className="text-slate-300 text-sm mt-1 backdrop-blur-sm">
                            Nilai karya peserta dengan adil dan profesional.
                        </motion.p>
                    </div>

                    {/* SVG Scale / Balance decoration */}
                    <motion.div
                        animate={{ rotate: [0, 5, -3, 0], y: [0, -8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className="hidden sm:block shrink-0 text-6xl drop-shadow-2xl">
                        ⚖️
                    </motion.div>
                </div>
            </motion.div>

            {/* ── STAT CARDS ── */}
            <motion.div initial="hidden" animate="show" variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {stats.map((s, i) => (
                    <motion.div key={i} variants={fadeUp}>
                        <TiltCard className="group" intensity={14}>
                            <motion.div
                                onHoverStart={() => setHoveredCard(i)}
                                onHoverEnd={() => setHoveredCard(null)}
                                whileHover={{ y: -6 }}
                                className={`relative bg-gradient-to-br from-slate-900/80 to-purple-900/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl ${s.shadow}
                                            border border-purple-500/30 flex items-center gap-5 overflow-hidden ring-1 ring-purple-500/20`}>

                                {/* Glow */}
                                <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
                                    animate={{ opacity: hoveredCard === i ? 1 : 0 }}
                                    style={{ background: `radial-gradient(circle at 50% 50%, ${s.glow} 0%, transparent 70%)` }}
                                    transition={{ duration: 0.3 }} />

                                <motion.div
                                    whileHover={{ rotateY: 360 }}
                                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                    className={`w-14 h-14 bg-gradient-to-br ${s.grad} rounded-2xl
                                                flex items-center justify-center shadow-2xl ring-2 ring-white/30 shrink-0 backdrop-blur-xl`}>
                                    <s.icon size={24} className="text-white drop-shadow-lg" />
                                </motion.div>

                                <div>
                                    <motion.p className="text-3xl font-black text-slate-100 tabular-nums drop-shadow-lg"
                                        key={s.value}
                                        initial={{ scale: 1.3, color: '#a855f7' }}
                                        animate={{ scale: 1, color: '#f8fafc' }}
                                        transition={{ duration: 0.4 }}>
                                        {s.value}
                                    </motion.p>
                                    <p className="text-sm text-slate-300 mt-0.5 font-semibold drop-shadow-sm">{s.label}</p>
                                </div>

                                {/* Corner emoji */}
                                <motion.span
                                    animate={hoveredCard === i
                                        ? { opacity: 1, scale: 1, rotate: 10 }
                                        : { opacity: 0, scale: 0.6, rotate: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="absolute top-3 right-3 text-2xl pointer-events-none drop-shadow-lg">
                                    {s.emoji}
                                </motion.span>

                                {/* Corner decoration */}
                                <div className={`absolute -bottom-4 -right-4 w-20 h-20
                                                 bg-gradient-to-br ${s.grad} opacity-10 rounded-full blur-xl`} />
                            </motion.div>
                        </TiltCard>
                    </motion.div>
                ))}
            </motion.div>

            {/* ── EVENT LIST ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="bg-gradient-to-br from-slate-900/95 to-purple-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-purple-500/30 
                           border border-purple-500/30 overflow-hidden">

                {/* Card Header */}
                <div className="relative overflow-hidden px-6 py-5 border-b border-purple-500/30
                                bg-gradient-to-r from-purple-600 via-indigo-700 to-purple-700 shadow-xl">
                    <div className="absolute inset-0 opacity-15" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
                        backgroundSize: '28px 28px',
                    }} />
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.div animate={{ rotate: [0, 10, -8, 0] }} transition={{ duration: 4, repeat: Infinity }}
                                className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                                <TrendingUp className="w-4 h-4 text-white drop-shadow-sm" />
                            </motion.div>
                            <div>
                                <h2 className="font-black text-white text-base drop-shadow-lg">Event yang Anda Tangani</h2>
                                <p className="text-purple-200 text-xs backdrop-blur-sm">Klik tombol Nilai untuk mulai penilaian</p>
                            </div>
                        </div>
                        <motion.span animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2, repeat: Infinity }}
                            className="inline-flex items-center gap-1.5 bg-white/20 border border-white/30
                                       text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                            {assignments.length} Event
                        </motion.span>
                    </div>
                </div>

                <div className="p-6">
                    {assignments.length === 0 ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="flex flex-col items-center py-16 text-slate-400">
                            <motion.div animate={{ y: [0, -8, 0], rotate: [0, 5, -3, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="text-6xl mb-4 drop-shadow-2xl">⚖️</motion.div>
                            <p className="font-semibold text-slate-300 mb-1 drop-shadow-sm">Belum Ada Penugasan</p>
                            <p className="text-sm text-slate-400 backdrop-blur-sm">Admin belum menugaskan event untuk Anda.</p>
                        </motion.div>
                    ) : (
                        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-4">
                            {assignments.map((a, i) => (
                                <AssignmentCard key={a.id} assignment={a} index={i} />
                            ))}
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </JuryLayout>
    );
}

function AssignmentCard({ assignment: a, index }) {
    const [hovered, setHovered] = useState(false);
    const pct = a.progress?.percentage ?? 0;
    const isComplete = a.progress?.is_complete ?? false;

    return (
        <motion.div
            variants={fadeUp}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ y: -3 }}
            className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-300 backdrop-blur-xl shadow-lg
                        ${hovered ? 'border-purple-400/60 shadow-2xl shadow-purple-300/40 ring-2 ring-purple-400/30' 
                                  : 'border-purple-500/20 shadow-xl shadow-purple-200/20 ring-1 ring-purple-500/20'}`}>

            {/* Top accent */}
            <div className={`h-1 w-full bg-gradient-to-r transition-all duration-500
                             ${isComplete
                                 ? 'from-emerald-500 to-emerald-600'
                                 : 'from-purple-500 to-indigo-600'}`} />

            <div className="p-5 bg-gradient-to-br from-slate-900/80 to-purple-900/50 backdrop-blur-xl">
                <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-100 text-sm leading-tight drop-shadow-sm">{a.event?.title}</p>
                        {a.category && (
                            <span className="inline-flex items-center gap-1 mt-1.5 text-xs
                                             bg-gradient-to-r from-purple-500/20 to-indigo-600/20 text-purple-300 border border-purple-400/40
                                             px-2.5 py-0.5 rounded-full font-semibold backdrop-blur-sm shadow-lg">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                {a.category.name}
                            </span>
                        )}
                    </div>

                    <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.96 }}>
                        <Link href={route('jury.submissions.index', a.event.id)}
                            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600
                                       to-indigo-600 text-white text-xs font-bold px-4 py-2.5
                                       rounded-xl shadow-xl shadow-purple-300/40 hover:shadow-2xl hover:shadow-purple-400/50
                                       transition-all duration-200 shrink-0 backdrop-blur-xl border border-white/20">
                            Nilai
                            <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </motion.div>
                </div>

                {/* Progress */}
                {a.progress && (
                    <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                            <span className="font-medium">Progres Penilaian</span>
                            <span className={`font-bold ${isComplete ? 'text-emerald-400' : 'text-purple-300'}`}>
                                {a.progress.scored_submissions}/{a.progress.total_submissions} karya
                                &nbsp;· {pct}%
                            </span>
                        </div>

                        <div className="w-full bg-gradient-to-r from-slate-800/50 to-purple-800/30 rounded-full h-2.5 overflow-hidden border border-purple-500/30">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                                className={`h-2.5 rounded-full bg-gradient-to-r shadow-lg
                                            ${isComplete
                                                ? 'from-emerald-500 to-emerald-600 shadow-emerald-400/50'
                                                : 'from-purple-500 to-indigo-600 shadow-purple-400/50'}`} />
                        </div>

                        <AnimatePresence>
                            {isComplete && (
                                <motion.p
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-1.5 text-xs text-emerald-400
                                               font-bold mt-2 backdrop-blur-sm drop-shadow-sm">
                                    <motion.span
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="w-4 h-4 bg-emerald-500 rounded-full flex items-center
                                                   justify-center text-white text-[10px] shadow-lg">
                                        ✓
                                    </motion.span>
                                    Semua karya sudah dinilai! 🎉
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </motion.div>
    );
}