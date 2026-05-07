import JuryLayout from '@/Layouts/JuryLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, TrendingUp, Shield, Users, CheckCircle2 } from 'lucide-react';

const fadeUp  = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { show: { transition: { staggerChildren: 0.07 } } };

/* ── tiny floating particles, only on md+ ── */
const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
    id: i, left: `${(i * 397) % 100}%`, top: `${(i * 331) % 100}%`,
    dur: 3 + (i % 4) * 0.4, delay: (i % 5) * 0.5, size: 2.5 + (i % 3),
    color: ['#6366f1','#3b82f6','#06b6d4','#10b981','#8b5cf6'][i % 5],
}));

export default function Index({ assignments }) {
    return (
        <JuryLayout header="Penilaian Juri">
            <Head title="Penilaian Juri" />

            {/* ── Hero Banner ── */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl mb-5 sm:mb-8 text-white"
                style={{
                    background: 'linear-gradient(135deg, #0d0b2b 0%, #1a1650 50%, #0d0b2b 100%)',
                    boxShadow: '0 20px 60px -10px rgba(59,130,246,0.4)',
                    border: '1px solid rgba(59,130,246,0.15)',
                }}
            >
                {/* Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)`,
                        backgroundSize: '36px 36px',
                    }} />
                {/* Orbs */}
                <div className="absolute -top-16 -right-16 w-48 sm:w-72 h-48 sm:h-72 rounded-full pointer-events-none opacity-20"
                    style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />
                <div className="absolute -bottom-10 -left-10 w-36 sm:w-48 h-36 sm:h-48 rounded-full pointer-events-none opacity-15"
                    style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
                {/* Particles — hidden on mobile to avoid clutter */}
                {PARTICLES.map(p => (
                    <motion.div key={p.id} className="absolute rounded-full pointer-events-none hidden md:block"
                        style={{ width: p.size, height: p.size, background: p.color, left: p.left, top: p.top }}
                        animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: p.dur, repeat: Infinity, delay: p.delay }} />
                ))}

                <div className="relative z-10 flex items-center justify-between gap-4 p-5 sm:p-8 md:p-10">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 sm:mb-3">
                            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15">
                                <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-300 shrink-0" />
                                <span className="text-blue-200 text-[10px] sm:text-xs font-semibold tracking-wide uppercase">Panel Juri Aktif</span>
                            </div>
                        </div>
                        <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight"
                            style={{ textShadow: '0 0 40px rgba(99,102,241,0.5)' }}>
                            Event Penilaian 📊
                        </h1>
                        <p className="text-blue-200/80 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
                            Pilih event untuk memberikan penilaian karya peserta
                        </p>
                    </div>

                    <motion.div
                        animate={{ rotate: [0, 10, -6, 0], y: [0, -8, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-3xl sm:text-5xl md:text-6xl shrink-0 ml-2"
                    >
                        ⚖️
                    </motion.div>
                </div>
            </motion.div>

            {/* ── List Card ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="rounded-2xl sm:rounded-3xl overflow-hidden"
                style={{
                    background: 'rgba(255,255,255,0.97)',
                    boxShadow: '0 4px 32px -4px rgba(59,130,246,0.15), 0 2px 8px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(59,130,246,0.12)',
                }}
            >
                {/* Card header */}
                <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-5"
                    style={{
                        borderBottom: '1px solid rgba(59,130,246,0.1)',
                        background: 'linear-gradient(to right, rgba(59,130,246,0.08), rgba(99,102,241,0.06))',
                    }}>
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 12px rgba(59,130,246,0.4)' }}>
                            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="font-bold text-gray-800 text-sm sm:text-base leading-tight">Event Penugasan</h2>
                            <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">Klik untuk masuk halaman penilaian</p>
                        </div>
                    </div>

                    <motion.span
                        animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2.5, repeat: Infinity }}
                        className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-white shrink-0 ml-2"
                        style={{ background: 'linear-gradient(135deg, #3b82f6, #6366f1)', boxShadow: '0 4px 12px rgba(59,130,246,0.4)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                        {assignments.length}
                        <span className="hidden sm:inline">Event</span>
                    </motion.span>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-5 md:p-6">
                    {assignments.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center py-12 sm:py-16 md:py-20 text-gray-400">
                            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
                                className="text-5xl sm:text-6xl mb-4">⚖️</motion.div>
                            <h3 className="text-lg sm:text-xl font-black text-gray-500 mb-2">Belum Ada Penugasan</h3>
                            <p className="text-sm text-gray-400 text-center max-w-xs">Admin belum menugaskan event untuk Anda</p>
                        </motion.div>
                    ) : (
                        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-3 sm:space-y-4">
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
    const pct        = a.progress?.percentage ?? 0;
    const isComplete = a.progress?.is_complete ?? false;
    const scored     = a.progress?.scored_submissions ?? 0;
    const total      = a.progress?.total_submissions ?? 0;

    return (
        <motion.div
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className="relative overflow-hidden rounded-xl sm:rounded-2xl"
            style={{
                background: 'white',
                border: '1px solid rgba(59,130,246,0.12)',
                boxShadow: `0 4px 20px -4px rgba(59,130,246,0.12)`,
            }}
        >
            {/* Top progress accent */}
            <div className="h-0.5 sm:h-1 w-full"
                style={{
                    background: isComplete
                        ? 'linear-gradient(to right, #10b981, #34d399)'
                        : `linear-gradient(to right, #3b82f6 ${pct}%, rgba(59,130,246,0.1) ${pct}%)`,
                }} />

            <div className="p-3.5 sm:p-5 md:p-6">
                {/* Top row: title + button */}
                <div className="flex items-start gap-3 mb-3 sm:mb-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="font-black text-gray-800 text-sm sm:text-base md:text-lg leading-tight mb-1.5 sm:mb-2">
                            {a.event?.title}
                        </h3>
                        {a.category && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 rounded-full"
                                style={{
                                    background: 'rgba(59,130,246,0.1)',
                                    color: '#1d4ed8',
                                    border: '1px solid rgba(59,130,246,0.2)',
                                }}>
                                <Users className="w-3 h-3 shrink-0" />
                                {a.category.name}
                            </span>
                        )}
                    </div>

                    {/* Action button */}
                    <Link href={route('jury.submissions.index', a.event.id)} className="shrink-0">
                        <motion.div
                            whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-white
                                       text-xs sm:text-sm font-bold transition-all duration-200"
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                boxShadow: '0 4px 16px rgba(59,130,246,0.4)',
                            }}>
                            Nilai
                            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        </motion.div>
                    </Link>
                </div>

                {/* Progress section */}
                {a.progress && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-medium">
                            <span className="text-gray-500">Progres Penilaian</span>
                            <span className="font-black tabular-nums" style={{ color: isComplete ? '#059669' : '#3b82f6' }}>
                                {scored}/{total} · {pct}%
                            </span>
                        </div>

                        <div className="w-full rounded-full h-1.5 sm:h-2 overflow-hidden"
                            style={{ background: 'rgba(59,130,246,0.1)' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.9, delay: index * 0.1, ease: 'easeOut' }}
                                className="h-full rounded-full"
                                style={{
                                    background: isComplete
                                        ? 'linear-gradient(to right, #10b981, #34d399)'
                                        : 'linear-gradient(to right, #3b82f6, #6366f1)',
                                    boxShadow: isComplete ? '0 0 8px rgba(16,185,129,0.4)' : '0 0 8px rgba(59,130,246,0.4)',
                                }} />
                        </div>

                        {/* Complete badge */}
                        <AnimatePresence>
                            {isComplete && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2 mt-1 px-3 py-2 rounded-xl text-xs font-bold"
                                    style={{
                                        background: 'rgba(16,185,129,0.1)',
                                        color: '#059669',
                                        border: '1px solid rgba(16,185,129,0.2)',
                                    }}>
                                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                    Penilaian Selesai! 🎉
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </motion.div>
    );
}