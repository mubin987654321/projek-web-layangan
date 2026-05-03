import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CalendarDays, Users, Clock, FileUp,
    CheckCircle2, XCircle, ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1, y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Dashboard({ stats, recentEvents, pendingRegistrations }) {
    const statCards = [
        {
            label: 'Total Event',
            value: stats.events,
            icon: CalendarDays,
            accent: '#6366f1',        // indigo
            bg: 'from-[#6366f1] to-[#818cf8]',
            glow: 'rgba(99,102,241,0.35)',
            ring: 'ring-indigo-400/30',
            badge: 'bg-indigo-100/60 text-indigo-700',
        },
        {
            label: 'Total Peserta',
            value: stats.users,
            icon: Users,
            accent: '#7c3aed',        // violet
            bg: 'from-[#7c3aed] to-[#a78bfa]',
            glow: 'rgba(124,58,237,0.35)',
            ring: 'ring-violet-400/30',
            badge: 'bg-violet-100/60 text-violet-700',
        },
        {
            label: 'Menunggu Approve',
            value: stats.pending,
            icon: Clock,
            accent: '#4f46e5',        // deeper indigo
            bg: 'from-[#4f46e5] to-[#6366f1]',
            glow: 'rgba(79,70,229,0.35)',
            ring: 'ring-indigo-500/30',
            badge: 'bg-indigo-100/60 text-indigo-700',
        },
        {
            label: 'Karya Dikirim',
            value: stats.submissions,
            icon: FileUp,
            accent: '#6d28d9',        // purple
            bg: 'from-[#6d28d9] to-[#8b5cf6]',
            glow: 'rgba(109,40,217,0.35)',
            ring: 'ring-purple-400/30',
            badge: 'bg-purple-100/60 text-purple-700',
        },
    ];

    return (
        <AdminLayout header="Dashboard Admin">
            <Head title="Admin Dashboard" />

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
                {/* Decorative blobs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-25"
                        style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }}
                    />
                    <div
                        className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 opacity-10"
                        style={{ background: 'radial-gradient(ellipse, #6366f1 0%, transparent 70%)' }}
                    />
                    {/* Grid lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative z-10 flex justify-between items-center p-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full
                                            bg-white/10 backdrop-blur-sm border border-white/20">
                                <ShieldCheck className="w-3.5 h-3.5 text-indigo-300" />
                                <span className="text-indigo-200 text-xs font-semibold tracking-wide uppercase">
                                    Panel Administrator
                                </span>
                            </div>
                        </div>
                        <h1
                            className="text-3xl font-black text-white mb-1.5 tracking-tight"
                            style={{ textShadow: '0 0 40px rgba(129,140,248,0.6)' }}
                        >
                            Dashboard Admin ⚡
                        </h1>
                        <p className="text-indigo-200/80 text-sm">
                            Kelola event, peserta, dan karya dari satu tempat.
                        </p>

                        {/* Live badge */}
                        <div className="flex items-center gap-2 mt-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                            </span>
                            <span className="text-emerald-300 text-xs font-medium">Sistem aktif</span>
                        </div>
                    </div>

                    <motion.div
                        animate={{ rotate: [0, 6, -4, 0], y: [0, -8, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="hidden md:flex items-center justify-center w-24 h-24 rounded-3xl
                                   text-5xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(124,58,237,0.2))',
                            boxShadow: '0 8px 32px rgba(99,102,241,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        🛡️
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Stat Cards ── */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={stagger}
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
                {statCards.map((s, i) => (
                    <motion.div
                        key={i}
                        variants={fadeUp}
                        whileHover={{ y: -6, scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="relative overflow-hidden rounded-2xl bg-white border border-gray-100/80"
                        style={{
                            boxShadow: `0 8px 32px -4px ${s.glow}, 0 2px 8px rgba(0,0,0,0.06)`,
                        }}
                    >
                        {/* Top accent bar */}
                        <div className={`h-1 w-full bg-gradient-to-r ${s.bg}`} />

                        <div className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className={`w-11 h-11 bg-gradient-to-br ${s.bg} rounded-xl
                                               flex items-center justify-center shadow-lg`}
                                    style={{ boxShadow: `0 6px 16px -2px ${s.glow}` }}
                                >
                                    <s.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.badge}`}>
                                    ↑ live
                                </div>
                            </div>

                            <p className="text-3xl font-black text-gray-900 tabular-nums">
                                {s.value}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 font-medium">{s.label}</p>
                        </div>

                        {/* Corner glow */}
                        <div
                            className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10"
                            style={{ background: `radial-gradient(circle, ${s.accent}, transparent)` }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* ── Pending Registrations ── */}
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden"
                style={{
                    boxShadow: '0 4px 32px -4px rgba(99,102,241,0.15), 0 2px 8px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(99,102,241,0.12)',
                }}
            >
                {/* Card Header */}
                <div
                    className="flex items-center justify-between px-6 py-4"
                    style={{
                        borderBottom: '1px solid rgba(99,102,241,0.1)',
                        background: 'linear-gradient(to right, rgba(238,242,255,0.8), rgba(245,243,255,0.5))',
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                                boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                            }}
                        >
                            <Clock className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-800 text-sm">
                                Menunggu Persetujuan Pendaftaran
                            </h2>
                            <p className="text-xs text-gray-400">Tinjau dan ambil tindakan</p>
                        </div>
                    </div>

                    {pendingRegistrations.length > 0 && (
                        <motion.span
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5
                                       rounded-full text-white"
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                                boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                            {pendingRegistrations.length} menunggu
                        </motion.span>
                    )}
                </div>

                <div className="p-6">
                    {pendingRegistrations.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-16"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="text-5xl mb-4"
                            >
                                
                            </motion.div>
                            <p className="text-gray-900 font-semibold text-sm">Tidak Ada Pendaftaran</p>
                            <p className="text-gray-600 text-xs mt-1">
                                Semua Pendaftaran Telah Disetujui
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-4 py-3 text-left text-xs font-bold
                                                           text-indigo-600/80 uppercase tracking-wider
                                                           rounded-l-xl"
                                                style={{ background: 'rgba(238,242,255,0.7)' }}
                                            >
                                                Peserta
                                            </th>
                                            <th
                                                className="px-4 py-3 text-left text-xs font-bold
                                                           text-indigo-600/80 uppercase tracking-wider"
                                                style={{ background: 'rgba(238,242,255,0.7)' }}
                                            >
                                                Event
                                            </th>
                                            <th
                                                className="px-4 py-3 text-left text-xs font-bold
                                                           text-indigo-600/80 uppercase tracking-wider"
                                                style={{ background: 'rgba(238,242,255,0.7)' }}
                                            >
                                                Kategori
                                            </th>
                                            <th
                                                className="px-4 py-3 text-left text-xs font-bold
                                                           text-indigo-600/80 uppercase tracking-wider"
                                                style={{ background: 'rgba(238,242,255,0.7)' }}
                                            >
                                                Tanggal Daftar
                                            </th>
                                            <th
                                                className="px-4 py-3 text-left text-xs font-bold
                                                           text-indigo-600/80 uppercase tracking-wider
                                                           rounded-r-xl"
                                                style={{ background: 'rgba(238,242,255,0.7)' }}
                                            >
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-indigo-50/60">
                                        <AnimatePresence>
                                            {pendingRegistrations.map((reg, i) => (
                                                <TableRow key={reg.id} reg={reg} index={i} />
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden space-y-3">
                                {pendingRegistrations.map((reg, i) => (
                                    <MobileRegCard key={reg.id} reg={reg} index={i} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </AdminLayout>
    );
}

/* ── Avatar ── */
function Avatar({ name, size = 'md' }) {
    const colors = [
        ['#6366f1', '#818cf8'],
        ['#7c3aed', '#a78bfa'],
        ['#4f46e5', '#6366f1'],
        ['#6d28d9', '#8b5cf6'],
    ];
    const idx = name.charCodeAt(0) % colors.length;
    const [from, to] = colors[idx];
    const dim = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-9 h-9 text-sm';

    return (
        <div
            className={`${dim} rounded-xl flex items-center justify-center
                        text-white font-black shrink-0`}
            style={{
                background: `linear-gradient(135deg, ${from}, ${to})`,
                boxShadow: `0 4px 12px -2px ${from}66`,
            }}
        >
            {name.charAt(0).toUpperCase()}
        </div>
    );
}

/* ── Table Row (Desktop) ── */
function TableRow({ reg, index }) {
    const [loading, setLoading] = useState(null);

    function approve() {
        setLoading('approve');
        router.patch(route('admin.registrations.approve', reg.id), {}, {
            onFinish: () => setLoading(null),
        });
    }

    function reject() {
        const reason = prompt('Alasan penolakan?');
        if (!reason) return;
        setLoading('reject');
        router.patch(route('admin.registrations.reject', reg.id), { reason }, {
            onFinish: () => setLoading(null),
        });
    }

    return (
        <motion.tr
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="group hover:bg-indigo-50/40 transition-colors duration-150"
        >
            <td className="px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                    <Avatar name={reg.user.name} size="sm" />
                    <span className="font-semibold text-gray-800 text-sm">{reg.user.name}</span>
                </div>
            </td>
            <td className="px-4 py-3.5">
                <p className="text-gray-700 text-sm font-medium truncate max-w-[180px]">
                    {reg.event.title}
                </p>
            </td>
            <td className="px-4 py-3.5">
                <span
                    className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{
                        background: 'rgba(99,102,241,0.1)',
                        color: '#4f46e5',
                        border: '1px solid rgba(99,102,241,0.2)',
                    }}
                >
                    {reg.category.name}
                </span>
            </td>
            <td className="px-4 py-3.5 text-gray-400 text-xs font-medium">
                {new Date(reg.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric',
                })}
            </td>
            <td className="px-4 py-3.5">
                <div className="flex items-center gap-2">
                    <ActionButton onClick={approve} loading={loading === 'approve'}
                        variant="approve" label="Approve" icon={CheckCircle2} />
                    <ActionButton onClick={reject} loading={loading === 'reject'}
                        variant="reject" label="Reject" icon={XCircle} />
                </div>
            </td>
        </motion.tr>
    );
}

/* ── Mobile Card ── */
function MobileRegCard({ reg, index }) {
    const [loading, setLoading] = useState(null);

    function approve() {
        setLoading('approve');
        router.patch(route('admin.registrations.approve', reg.id), {}, {
            onFinish: () => setLoading(null),
        });
    }

    function reject() {
        const reason = prompt('Alasan penolakan?');
        if (!reason) return;
        setLoading('reject');
        router.patch(route('admin.registrations.reject', reg.id), { reason }, {
            onFinish: () => setLoading(null),
        });
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="p-4 rounded-2xl transition-colors duration-200"
            style={{
                background: 'linear-gradient(135deg, rgba(238,242,255,0.6), rgba(245,243,255,0.4))',
                border: '1px solid rgba(99,102,241,0.15)',
            }}
        >
            <div className="flex items-center gap-3 mb-3">
                <Avatar name={reg.user.name} />
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm">{reg.user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{reg.event.title}</p>
                </div>
                <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold shrink-0"
                    style={{
                        background: 'rgba(99,102,241,0.1)',
                        color: '#4f46e5',
                        border: '1px solid rgba(99,102,241,0.2)',
                    }}
                >
                    {reg.category.name}
                </span>
            </div>

            <p className="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
                <CalendarDays className="w-3 h-3" />
                {new Date(reg.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric',
                })}
            </p>

            <div className="flex gap-2">
                <ActionButton onClick={approve} loading={loading === 'approve'}
                    variant="approve" label="Approve" icon={CheckCircle2} full />
                <ActionButton onClick={reject} loading={loading === 'reject'}
                    variant="reject" label="Reject" icon={XCircle} full />
            </div>
        </motion.div>
    );
}

/* ── Reusable Action Button ── */
function ActionButton({ onClick, loading, variant, label, icon: Icon, full }) {
    const styles = {
        approve: {
            bg: 'linear-gradient(135deg, #059669, #10b981)',
            shadow: 'rgba(5,150,105,0.4)',
            pulse: 'bg-emerald-400',
        },
        reject: {
            bg: 'linear-gradient(135deg, #dc2626, #ef4444)',
            shadow: 'rgba(220,38,38,0.4)',
            pulse: 'bg-red-400',
        },
    };
    const s = styles[variant];

    return (
        <motion.button
            onClick={onClick}
            disabled={!!loading}
            whileHover={!loading ? { y: -2, scale: 1.04 } : {}}
            whileTap={!loading ? { scale: 0.96 } : {}}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl
                        text-white text-xs font-bold transition-opacity duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed ${full ? 'flex-1' : ''}`}
            style={{
                background: s.bg,
                boxShadow: `0 4px 14px -2px ${s.shadow}`,
            }}
        >
            {loading ? (
                <span className={`w-3 h-3 rounded-full ${s.pulse} animate-ping`} />
            ) : (
                <Icon className="w-3.5 h-3.5" />
            )}
            {label}
        </motion.button>
    );
}