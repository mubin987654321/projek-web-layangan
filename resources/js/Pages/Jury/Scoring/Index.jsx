import JuryLayout from '@/Layouts/JuryLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { ChevronRight, TrendingUp, Zap, Shield, Users } from 'lucide-react';

/* ══ 3D TILT CARD BLUE THEME ══ */
function TiltCard({ children, className = '', intensity = 12 }) {
    const ref   = useRef(null);
    const rotX  = useSpring(0, { stiffness: 280, damping: 30 });
    const rotY  = useSpring(0, { stiffness: 280, damping: 30 });
    const shine = useMotionValue(50);
    
    const onMove = useCallback((e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        rotX.set(-((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * intensity);
        rotY.set( ((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) * intensity);
        shine.set(((e.clientX - r.left) / r.width) * 100);
    }, [intensity, rotX, rotY, shine]);
    
    const onLeave = useCallback(() => { 
        rotX.set(0); 
        rotY.set(0); 
    }, [rotX, rotY]);
    
    const shimmerBg = useTransform(shine, [0, 100], [
        'rgba(99, 102, 241, 0)', 
        'rgba(99, 102, 241, 0.12)'
    ]);
    
    return (
        <motion.div 
            ref={ref} 
            onMouseMove={onMove} 
            onMouseLeave={onLeave}
            style={{ 
                rotateX: rotX, 
                rotateY: rotY, 
                transformStyle: 'preserve-3d', 
                perspective: 800 
            }}
            className={`relative ${className}`}>
            <motion.div 
                style={{ background: shimmerBg }}
                className="absolute inset-0 rounded-3xl pointer-events-none z-10
                           opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            {children}
        </motion.div>
    );
}

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
    id: i, 
    left: `${(i * 397) % 100}%`, 
    top: `${(i * 331) % 100}%`,
    dur: 3 + (i % 5) * 0.3, 
    delay: (i % 6) * 0.4, 
    size: 2.5 + (i % 4),
    color: ['#6366f1','#3b82f6','#06b6d4','#10b981','#8b5cf6'][i % 5],
}));

const fadeUp = { 
    hidden: { opacity: 0, y: 20 }, 
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } 
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

export default function Index({ assignments }) {
    return (
        <JuryLayout header="Penilaian Juri">
            <Head title="Penilaian Juri" />

            {/* ── HERO BANNER ── */}
            <motion.div 
                initial={{ opacity: 0, y: -25 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden rounded-3xl mb-10 shadow-3xl shadow-indigo-950/40
                           bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900
                           p-10 text-white border border-indigo-800/40 backdrop-blur-xl">
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: `linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }} />
                
                {/* Floating Orb */}
                <motion.div 
                    className="absolute w-72 h-72 rounded-full pointer-events-none"
                    style={{ 
                        background: 'radial-gradient(circle at 30% 30%, #6366f1 0%, #3b82f6 30%, transparent 70%)', 
                        top: '-15%', 
                        right: '-10%' 
                    }}
                    animate={{ scale: [1, 1.5, 1], rotate: [0, 10, 0] }} 
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} 
                />
                
                {/* Particles */}
                {PARTICLES.map(p => (
                    <motion.div 
                        key={p.id} 
                        className="absolute rounded-full pointer-events-none shadow-lg"
                        style={{ 
                            width: p.size, 
                            height: p.size, 
                            background: p.color, 
                            left: p.left, 
                            top: p.top 
                        }}
                        animate={{ 
                            y: [0, -25, 0], 
                            opacity: [0.3, 0.9, 0.3],
                            scale: [1, 1.3, 1]
                        }}
                        transition={{ 
                            duration: p.dur, 
                            repeat: Infinity, 
                            delay: p.delay,
                            ease: 'easeInOut'
                        }} 
                    />
                ))}
                
                <div className="relative z-10 flex justify-between items-center gap-6">
                    <div className="flex-1">
                        <motion.div 
                            initial={{ opacity: 0, x: -16 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2.5 bg-indigo-500/30 border-2 border-indigo-400/50
                                       text-indigo-200 text-sm font-bold px-4 py-2 rounded-2xl backdrop-blur-xl mb-4 shadow-xl">
                            <Shield className="w-4 h-4 text-blue-300 drop-shadow-lg" />
                            Panel Juri Aktif
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, x: -16 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ delay: 0.3 }}
                            className="text-4xl font-black text-white tracking-tight drop-shadow-2xl leading-tight">
                            Event Penilaian 📊
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.4 }}
                            className="text-blue-200 text-lg font-medium mt-2 backdrop-blur-sm">
                            Pilih event untuk memberikan penilaian karya peserta
                        </motion.p>
                    </div>
                    <motion.div 
                        animate={{ rotate: [0, 15, -8, 0], y: [0, -12, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-7xl shrink-0 drop-shadow-2xl">⚖️
                    </motion.div>
                </div>
            </motion.div>

            {/* ── LIST CARD ── */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-3xl shadow-blue-100/60 
                           border border-blue-100/70 overflow-hidden">

                <div className="relative overflow-hidden px-8 py-7 border-b border-blue-100/50
                                bg-gradient-to-r from-indigo-600 via-blue-700 to-cyan-600 shadow-2xl">
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                        backgroundSize: '35px 35px',
                    }} />
                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <motion.div 
                                animate={{ rotate: [0, 15, -10, 0] }} 
                                transition={{ duration: 5, repeat: Infinity }}
                                className="w-12 h-12 bg-white/30 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl">
                                <TrendingUp className="w-5 h-5 text-white drop-shadow-lg" />
                            </motion.div>
                            <div>
                                <h2 className="font-black text-white text-xl drop-shadow-xl">Event Penugasan</h2>
                                <p className="text-blue-100 text-sm font-medium backdrop-blur-sm">Klik untuk masuk halaman penilaian</p>
                            </div>
                        </div>
                        <motion.span 
                            animate={{ scale: [1, 1.08, 1] }} 
                            transition={{ duration: 2.5, repeat: Infinity }}
                            className="inline-flex items-center gap-2 bg-white/30 border-2 border-white/40
                                       text-white text-base font-bold px-5 py-2.5 rounded-2xl backdrop-blur-xl shadow-2xl">
                            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 animate-pulse shadow-lg" />
                            {assignments.length} Event
                        </motion.span>
                    </div>
                </div>

                <div className="p-8">
                    {assignments.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center py-20 text-gray-400">
                            <motion.div 
                                animate={{ y: [0, -12, 0], rotate: [0, 5, -5, 0] }} 
                                transition={{ duration: 4, repeat: Infinity }}
                                className="text-8xl mb-6 drop-shadow-2xl">⚖️
                            </motion.div>
                            <h3 className="text-3xl font-black text-gray-500 mb-3 drop-shadow-lg">Belum Ada Penugasan</h3>
                            <p className="text-xl text-gray-400 font-semibold backdrop-blur-sm">Admin belum menugaskan event untuk Anda</p>
                        </motion.div>
                    ) : (
                        <motion.div initial="hidden" animate="show" variants={stagger} className="space-y-6">
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
        <TiltCard className="group cursor-pointer" intensity={12}>
            <motion.div
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 320, damping: 25 }}
                className={`relative rounded-3xl border-2 overflow-hidden transition-all duration-500 bg-white/90 backdrop-blur-xl
                            shadow-2xl shadow-blue-100/50
                            ${hovered 
                                ? 'border-indigo-200/70 shadow-3xl shadow-indigo-200/60 ring-4 ring-indigo-100/60' 
                                : 'border-blue-100/70 shadow-xl shadow-blue-50/50'
                            }`}>

                {/* Progress Bar Top */}
                <div className={`h-2 w-full bg-gradient-to-r transition-all duration-700 overflow-hidden
                                 ${isComplete 
                                    ? 'from-emerald-500 via-teal-500 to-emerald-600' 
                                    : 'from-indigo-400 via-blue-500 to-cyan-500'
                                 }`} 
                     style={{ width: `${Math.min(pct, 100)}%` }} />

                <div className="p-8">
                    <div className="flex justify-between items-start gap-6 mb-6">
                        <div className="flex-1 min-w-0">
                            {/* Hover Sparkle */}
                            <AnimatePresence>
                                {hovered && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, y: 8 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        className="inline-block text-2xl mb-3 drop-shadow-lg">
                                        ✨
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            
                            <h3 className="font-black text-2xl text-gray-800 leading-tight drop-shadow-lg mb-3">
                                {a.event?.title}
                            </h3>
                            
                            {a.category && (
                                <motion.span 
                                    initial={{ scale: 0.95, opacity: 0.8 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-indigo-100/80 to-blue-100/80 
                                               text-indigo-800 border-2 border-indigo-200/70 px-5 py-2.5 rounded-2xl font-bold 
                                               backdrop-blur-xl shadow-lg hover:shadow-xl transition-all">
                                    <Users className="w-4 h-4" />
                                    {a.category.name}
                                </motion.span>
                            )}
                        </div>

                        <motion.div 
                            whileHover={{ scale: 1.1, y: -3 }} 
                            whileTap={{ scale: 0.95 }}
                            className="shrink-0">
                            <Link 
                                href={route('jury.submissions.index', a.event.id)}
                                className="flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 via-blue-700 to-cyan-600
                                           text-white text-lg font-black px-8 py-4 rounded-2xl shadow-2xl shadow-indigo-200/60
                                           hover:from-indigo-500 hover:via-blue-600 hover:to-cyan-500
                                           hover:shadow-3xl hover:shadow-indigo-300/70 hover:-translate-y-1
                                           transition-all duration-400 border border-white/30 backdrop-blur-xl">
                                Mulai Nilai
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Progress Section */}
                    {a.progress && (
                        <div className="pt-6 border-t border-blue-100/50">
                            <div className="flex justify-between items-center text-sm text-gray-600 mb-4 font-semibold">
                                <span>📊 Progres Penilaian</span>
                                <span className={`text-lg font-black 
                                                 ${isComplete ? 'text-emerald-600 drop-shadow-lg' : 'text-indigo-600 drop-shadow-lg'}`}>
                                    {a.progress.scored_submissions}/{a.progress.total_submissions} · {pct}%
                                </span>
                            </div>
                            <div className="w-full bg-gradient-to-r from-gray-100 to-blue-100/50 rounded-2xl h-4 overflow-hidden shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 1, delay: index * 0.15, ease: 'easeOut' }}
                                    className={`h-4 rounded-2xl shadow-lg bg-gradient-to-r transition-all duration-700
                                                ${isComplete 
                                                    ? 'from-emerald-500 via-teal-500 to-emerald-600 shadow-emerald-300/50' 
                                                    : 'from-indigo-500 via-blue-600 to-cyan-500 shadow-indigo-300/50'
                                                }`} />
                            </div>
                            
                            {/* Completion Badge */}
                            <AnimatePresence>
                                {isComplete && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 8, scale: 0.9 }} 
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="flex items-center gap-3 mt-5 p-4 bg-gradient-to-r from-emerald-500/10 
                                                   to-teal-500/10 border-2 border-emerald-200/50 rounded-2xl backdrop-blur-xl
                                                   text-emerald-700 font-bold text-lg shadow-xl">
                                        <motion.span 
                                            animate={{ 
                                                scale: [1, 1.3, 1], 
                                                rotate: [0, 180, 360] 
                                            }} 
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 
                                                       rounded-2xl flex items-center justify-center text-white 
                                                       text-xl font-black shadow-2xl">
                                            ✓
                                        </motion.span>
                                        Penilaian Selesai! 🎉
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </motion.div>
        </TiltCard>
    );
}