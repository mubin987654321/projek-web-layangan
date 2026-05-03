import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    FileImage, User, CalendarDays, Tag,
    Star, MessageSquare, ExternalLink,
    FileText, Video, ChevronLeft, BarChart3
} from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const STATUS_CFG = {
    draft:     { label: 'Draft',     bg: 'rgba(148,163,184,0.15)', text: '#64748b', dot: '#94a3b8' },
    submitted: { label: 'Dikirim',   bg: 'rgba(99,102,241,0.12)',  text: '#4f46e5', dot: '#6366f1' },
    approved:  { label: 'Disetujui', bg: 'rgba(16,185,129,0.12)', text: '#059669', dot: '#10b981' },
    rejected:  { label: 'Ditolak',  bg: 'rgba(239,68,68,0.12)',   text: '#dc2626', dot: '#ef4444' },
};

function StatusBadge({ status, large }) {
    const cfg = STATUS_CFG[status] ?? STATUS_CFG.draft;
    return (
        <span className={`inline-flex items-center gap-1.5 font-bold rounded-full
                          ${large ? 'text-sm px-4 py-1.5' : 'text-xs px-2.5 py-1'}`}
            style={{ background: cfg.bg, color: cfg.text }}>
            <span className={`rounded-full ${large ? 'w-2 h-2' : 'w-1.5 h-1.5'}`}
                style={{ background: cfg.dot }} />
            {cfg.label}
        </span>
    );
}

function SectionCard({ icon: Icon, gradient, title, subtitle, children, delay = 0 }) {
    return (
        <motion.div
            variants={fadeUp} initial="hidden" animate="show"
            transition={{ delay }}
            className="rounded-3xl overflow-hidden"
            style={{
                background: 'white',
                boxShadow: '0 4px 24px -4px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid rgba(99,102,241,0.12)',
            }}
        >
            <div className="flex items-center gap-3 px-6 py-4"
                style={{ borderBottom: '1px solid rgba(99,102,241,0.1)',
                         background: 'linear-gradient(to right, rgba(238,242,255,0.8), rgba(245,243,255,0.5))' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: gradient, boxShadow: '0 4px 12px rgba(99,102,241,0.35)' }}>
                    <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                    <h2 className="font-bold text-gray-800 text-sm">{title}</h2>
                    {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
                </div>
            </div>
            <div className="p-6">{children}</div>
        </motion.div>
    );
}

export default function SubmissionsShow({ submission }) {
    const reg    = submission.registration;
    const scores = submission.scores ?? [];

    const byKriteria = scores.reduce((acc, s) => {
        const name = s.criteria?.name ?? 'Lainnya';
        if (!acc[name]) acc[name] = [];
        acc[name].push(s);
        return acc;
    }, {});

    const totalAvg = Object.entries(byKriteria).length > 0
        ? (Object.entries(byKriteria).reduce((sum, [, list]) => {
            return sum + list.reduce((a, b) => a + b.score, 0) / list.length;
        }, 0) / Object.keys(byKriteria).length).toFixed(1)
        : null;

    return (
        <AdminLayout header="Detail Karya">
            <Head title="Detail Karya" />

            {/* ── Hero Banner ── */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl mb-8"
                style={{
                    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                    boxShadow: '0 25px 60px -10px rgba(79,70,229,0.5)',
                }}
            >
                {/* Decorative */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-25"
                        style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }} />
                    <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }} />
                    <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid3" width="32" height="32" patternUnits="userSpaceOnUse">
                                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid3)" />
                    </svg>
                </div>

                <div className="relative z-10 flex justify-between items-start p-8">
                    <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full
                                            bg-white/10 backdrop-blur-sm border border-white/20">
                                <FileImage className="w-3.5 h-3.5 text-indigo-300" />
                                <span className="text-indigo-200 text-xs font-semibold tracking-wide uppercase">
                                    Detail Karya
                                </span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2 tracking-tight truncate"
                            style={{ textShadow: '0 0 40px rgba(129,140,248,0.6)' }}>
                            {submission.title}
                        </h1>
                        <p className="text-indigo-200/80 text-sm">
                            oleh{' '}
                            <span className="font-black text-white px-1.5 py-0.5 rounded-lg
                                             bg-white/10 border border-white/20">
                                {submission.user.name}
                            </span>
                            {' '}— {reg?.event?.title}
                        </p>
                        <div className="mt-3 hidden md:block">
                            <StatusBadge status={submission.status} large />
                        </div>
                    </div>

                    <motion.div
                        animate={{ rotate: [0, 6, -4, 0], y: [0, -8, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="hidden md:flex items-center justify-center w-20 h-20 rounded-3xl text-4xl shrink-0"
                        style={{
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(124,58,237,0.2))',
                            boxShadow: '0 8px 32px rgba(99,102,241,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        🎨
                    </motion.div>
                </div>
            </motion.div>

            <div className="max-w-4xl space-y-6">

                {/* ── Info Karya ── */}
                <SectionCard
                    icon={FileImage}
                    gradient="linear-gradient(135deg, #7c3aed, #6d28d9)"
                    title="Informasi Karya"
                    subtitle="Detail lengkap karya yang dikirimkan"
                    delay={0.1}
                >
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Foto */}
                        {submission.photo_url && (
                            <a href={`/storage/${submission.photo_url}`}
                                target="_blank" rel="noreferrer"
                                className="shrink-0 group">
                                <div className="relative overflow-hidden rounded-2xl"
                                    style={{ border: '1px solid rgba(99,102,241,0.2)' }}>
                                    <img src={`/storage/${submission.photo_url}`} alt="Foto karya"
                                        className="w-full md:w-56 h-40 object-cover
                                                   group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-indigo-900/0
                                                    group-hover:bg-indigo-900/20 transition-all duration-300
                                                    flex items-center justify-center">
                                        <ExternalLink className="w-5 h-5 text-white opacity-0
                                                                  group-hover:opacity-100 transition-opacity duration-200" />
                                    </div>
                                </div>
                            </a>
                        )}
                        <div className="flex-1 space-y-3">
                            {/* Status mobile */}
                            <div className="md:hidden">
                                <StatusBadge status={submission.status} large />
                            </div>

                            {/* Meta chips */}
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { icon: User, label: submission.user.name, color: '#4f46e5', bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)' },
                                    { icon: CalendarDays, label: reg?.event?.title, color: '#7c3aed', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.2)' },
                                    { icon: Tag, label: reg?.category?.name, color: '#6d28d9', bg: 'rgba(109,40,217,0.1)', border: 'rgba(109,40,217,0.2)' },
                                ].map(({ icon: Ic, label, color, bg, border }) => (
                                    <span key={label}
                                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold"
                                        style={{ color, background: bg, border: `1px solid ${border}` }}>
                                        <Ic className="w-3 h-3" />
                                        {label}
                                    </span>
                                ))}
                            </div>

                            {/* Deskripsi */}
                            {submission.description && (
                                <p className="text-sm text-gray-600 leading-relaxed
                                              bg-indigo-50/50 rounded-2xl p-3"
                                    style={{ border: '1px solid rgba(99,102,241,0.1)' }}>
                                    {submission.description}
                                </p>
                            )}

                            {/* File links */}
                            <div className="flex flex-wrap gap-2 pt-1">
                                {submission.design_file && (
                                    <motion.a
                                        href={`/storage/${submission.design_file}`}
                                        target="_blank" rel="noreferrer"
                                        whileHover={{ y: -2 }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-2xl
                                                   text-xs font-bold transition-all duration-200"
                                        style={{ background: 'rgba(99,102,241,0.1)', color: '#4f46e5',
                                                 border: '1px solid rgba(99,102,241,0.2)' }}>
                                        <FileText className="w-3.5 h-3.5" />
                                        File Desain
                                        <ExternalLink className="w-3 h-3" />
                                    </motion.a>
                                )}
                                {submission.video_url && (
                                    <motion.a
                                        href={submission.video_url}
                                        target="_blank" rel="noreferrer"
                                        whileHover={{ y: -2 }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-2xl
                                                   text-xs font-bold transition-all duration-200"
                                        style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626',
                                                 border: '1px solid rgba(239,68,68,0.2)' }}>
                                        <Video className="w-3.5 h-3.5" />
                                        Lihat Video
                                        <ExternalLink className="w-3 h-3" />
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </div>
                </SectionCard>

                {/* ── Rekapitulasi Skor ── */}
                <SectionCard
                    icon={BarChart3}
                    gradient="linear-gradient(135deg, #f59e0b, #d97706)"
                    title={`Rekapitulasi Penilaian`}
                    subtitle={`${scores.length} penilaian dari juri`}
                    delay={0.18}
                >
                    {/* Rata-rata keseluruhan */}
                    {totalAvg && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center gap-4 mb-6 p-4 rounded-2xl"
                            style={{
                                background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(217,119,6,0.06))',
                                border: '1px solid rgba(245,158,11,0.2)',
                            }}
                        >
                            <div className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center
                                            text-white shrink-0"
                                style={{
                                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                    boxShadow: '0 8px 20px -4px rgba(245,158,11,0.5)',
                                }}>
                                <span className="text-2xl font-black leading-none">{totalAvg}</span>
                                <span className="text-xs opacity-80 font-medium">avg</span>
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">Rata-rata Keseluruhan</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Dari {Object.keys(byKriteria).length} kriteria penilaian
                                </p>
                                {/* Mini stars */}
                                <div className="flex gap-0.5 mt-1.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i}
                                            className="w-3 h-3"
                                            fill={i < Math.round(totalAvg / 20) ? '#f59e0b' : 'none'}
                                            stroke="#f59e0b"
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {Object.keys(byKriteria).length === 0 ? (
                        <div className="flex flex-col items-center py-10 text-gray-400">
                            <motion.div animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="text-4xl mb-3">⭐</motion.div>
                            <p className="text-sm font-medium">Belum ada penilaian dari juri.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {Object.entries(byKriteria).map(([kriteria, list], ki) => {
                                const avg = (
                                    list.reduce((a, b) => a + b.score, 0) / list.length
                                ).toFixed(1);
                                const pct = Math.min((avg / 100) * 100, 100);
                                const hue = pct > 70 ? '#6366f1' : pct > 40 ? '#f59e0b' : '#ef4444';
                                return (
                                    <motion.div
                                        key={kriteria}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + ki * 0.08 }}
                                        className="rounded-2xl p-4"
                                        style={{
                                            border: '1px solid rgba(99,102,241,0.12)',
                                            background: 'rgba(238,242,255,0.25)',
                                        }}
                                    >
                                        {/* Header */}
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-gray-800 text-sm flex items-center gap-2">
                                                <Star className="w-3.5 h-3.5 text-amber-400" fill="currentColor" />
                                                {kriteria}
                                            </span>
                                            <span className="font-black text-sm px-2.5 py-1 rounded-full"
                                                style={{ color: hue,
                                                         background: `${hue}15`,
                                                         border: `1px solid ${hue}30` }}>
                                                {avg} / 100
                                            </span>
                                        </div>
                                        {/* Progress bar */}
                                        <div className="w-full rounded-full h-2 mb-3 overflow-hidden"
                                            style={{ background: 'rgba(99,102,241,0.1)' }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${pct}%` }}
                                                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 + ki * 0.08 }}
                                                className="h-2 rounded-full"
                                                style={{
                                                    background: `linear-gradient(to right, ${hue}, ${hue}cc)`,
                                                    boxShadow: `0 0 8px ${hue}66`,
                                                }}
                                            />
                                        </div>
                                        {/* Per-jury scores */}
                                        <div className="space-y-1.5">
                                            {list.map((s, i) => (
                                                <div key={i}
                                                    className="flex items-center gap-3 text-xs px-3 py-2.5 rounded-xl"
                                                    style={{ background: 'rgba(238,242,255,0.6)',
                                                             border: '1px solid rgba(99,102,241,0.08)' }}>
                                                    <div className="w-6 h-6 rounded-lg flex items-center
                                                                    justify-center text-white font-black text-xs shrink-0"
                                                        style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }}>
                                                        {s.jury?.name?.charAt(0).toUpperCase() ?? 'J'}
                                                    </div>
                                                    <span className="font-semibold text-gray-600 flex-1 truncate">
                                                        {s.jury?.name ?? 'Juri'}
                                                    </span>
                                                    <span className="font-black shrink-0"
                                                        style={{ color: hue }}>
                                                        {s.score}
                                                    </span>
                                                    {s.comment && (
                                                        <span className="flex items-start gap-1 text-gray-400
                                                                         italic flex-1 min-w-0">
                                                            <MessageSquare className="w-3 h-3 shrink-0 mt-0.5" />
                                                            <span className="truncate">{s.comment}</span>
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </SectionCard>

                {/* ── Back Button ── */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                    <motion.div whileHover={{ x: -3 }} className="inline-block">
                        <Link href={route('admin.submissions.index')}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl
                                       text-sm font-bold transition-all duration-200"
                            style={{
                                background: 'rgba(238,242,255,0.8)',
                                color: '#4f46e5',
                                border: '1px solid rgba(99,102,241,0.2)',
                                boxShadow: '0 2px 8px rgba(99,102,241,0.1)',
                            }}>
                            <ChevronLeft className="w-4 h-4" />
                            Kembali ke Daftar Karya
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </AdminLayout>
    );
}