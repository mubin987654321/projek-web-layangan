import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart3, CalendarDays, CheckCircle2,
    Trophy, Users, UserCog, MapPin, TrendingUp
} from 'lucide-react';

const fadeUp  = {
    hidden: { opacity: 0, y: 16 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.07 } } };

const STATUS_CFG = {
    draft:    { label: 'Draft',    bg: 'rgba(148,163,184,0.15)', text: '#64748b', dot: '#94a3b8' },
    open:     { label: 'Open',     bg: 'rgba(16,185,129,0.12)', text: '#059669', dot: '#10b981' },
    closed:   { label: 'Closed',   bg: 'rgba(245,158,11,0.12)', text: '#b45309', dot: '#f59e0b' },
    ongoing:  { label: 'Ongoing',  bg: 'rgba(99,102,241,0.12)', text: '#4f46e5', dot: '#6366f1' },
    finished: { label: 'Finished', bg: 'rgba(124,58,237,0.12)', text: '#6d28d9', dot: '#7c3aed' },
};

export default function ReportsIndex({ events }) {
    const totalActive   = events.filter(e => e.status === 'open').length;
    const totalFinished = events.filter(e => e.status === 'finished').length;

    const statCards = [
        {
            label: 'Total Event',   value: events.length,
            icon: CalendarDays,
            bg: 'from-[#6366f1] to-[#818cf8]', glow: 'rgba(99,102,241,0.35)',
            badge: 'bg-indigo-100/60 text-indigo-700',
        },
        {
            label: 'Event Aktif',   value: totalActive,
            icon: TrendingUp,
            bg: 'from-[#10b981] to-[#34d399]', glow: 'rgba(16,185,129,0.35)',
            badge: 'bg-emerald-100/60 text-emerald-700',
        },
        {
            label: 'Event Selesai', value: totalFinished,
            icon: CheckCircle2,
            bg: 'from-[#7c3aed] to-[#a78bfa]', glow: 'rgba(124,58,237,0.35)',
            badge: 'bg-violet-100/60 text-violet-700',
        },
    ];

    return (
        <AdminLayout header="Laporan & Statistik">
            <Head title="Laporan" />

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
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-25"
                        style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }} />
                    <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }} />
                    <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="gridRep" width="32" height="32" patternUnits="userSpaceOnUse">
                                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#gridRep)" />
                    </svg>
                </div>

                <div className="relative z-10 flex justify-between items-center p-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full
                                            bg-white/10 backdrop-blur-sm border border-white/20">
                                <BarChart3 className="w-3.5 h-3.5 text-indigo-300" />
                                <span className="text-indigo-200 text-xs font-semibold tracking-wide uppercase">
                                    Panel Administrator
                                </span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-black text-white mb-1.5 tracking-tight"
                            style={{ textShadow: '0 0 40px rgba(129,140,248,0.6)' }}>
                            Laporan & Statistik 📊
                        </h1>
                        <p className="text-indigo-200/80 text-sm">
                            Pantau performa semua event dalam satu tampilan.
                        </p>
                    </div>

                    <motion.div
                        animate={{ rotate: [0, 6, -4, 0], y: [0, -8, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="hidden md:flex items-center justify-center w-24 h-24 rounded-3xl text-5xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(124,58,237,0.2))',
                            boxShadow: '0 8px 32px rgba(99,102,241,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        📊
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Stat Cards ── */}
            <motion.div
                initial="hidden" animate="show" variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {statCards.map((s, i) => (
                    <motion.div key={i} variants={fadeUp}
                        whileHover={{ y: -6, scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="relative overflow-hidden rounded-2xl bg-white border border-gray-100/80"
                        style={{ boxShadow: `0 8px 32px -4px ${s.glow}, 0 2px 8px rgba(0,0,0,0.06)` }}>
                        <div className={`h-1 w-full bg-gradient-to-r ${s.bg}`} />
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-11 h-11 bg-gradient-to-br ${s.bg} rounded-xl
                                               flex items-center justify-center shadow-lg`}
                                    style={{ boxShadow: `0 6px 16px -2px ${s.glow}` }}>
                                    <s.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.badge}`}>
                                    ↑ live
                                </div>
                            </div>
                            <p className="text-3xl font-black text-gray-900 tabular-nums">{s.value}</p>
                            <p className="text-xs text-gray-500 mt-1 font-medium">{s.label}</p>
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10"
                            style={{ background: `radial-gradient(circle, ${s.glow}, transparent)` }} />
                    </motion.div>
                ))}
            </motion.div>

            {/* ── Events Table ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-3xl overflow-hidden"
                style={{
                    background: 'white',
                    boxShadow: '0 4px 32px -4px rgba(99,102,241,0.15), 0 2px 8px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(99,102,241,0.12)',
                }}
            >
                <div className="flex items-center gap-3 px-6 py-4"
                    style={{ borderBottom: '1px solid rgba(99,102,241,0.1)',
                             background: 'linear-gradient(to right, rgba(238,242,255,0.8), rgba(245,243,255,0.5))' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                                 boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>
                        <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800 text-sm">Daftar Event & Statistik</h2>
                        <p className="text-xs text-gray-400">Ringkasan performa per event</p>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                {['Event', 'Status', 'Peserta', 'Juri', 'Periode', 'Aksi'].map(h => (
                                    <th key={h}
                                        className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider"
                                        style={{ background: 'rgba(238,242,255,0.7)', color: 'rgba(99,102,241,0.8)' }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <motion.tbody
                            initial="hidden" animate="show" variants={stagger}
                            className="divide-y"
                            style={{ borderColor: 'rgba(99,102,241,0.06)' }}>
                            {events.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="flex flex-col items-center py-16 text-gray-400">
                                            <motion.div animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="text-5xl mb-3">📭</motion.div>
                                            <p className="text-sm font-medium">Belum ada event.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <AnimatePresence>
                                    {events.map(event => (
                                        <EventRow key={event.id} event={event} />
                                    ))}
                                </AnimatePresence>
                            )}
                        </motion.tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden p-4 space-y-3">
                    {events.length === 0 ? (
                        <div className="flex flex-col items-center py-12 text-gray-400">
                            <div className="text-5xl mb-3">📭</div>
                            <p className="text-sm">Belum ada event.</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {events.map((event, i) => (
                                <EventMobileCard key={event.id} event={event} index={i} />
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </motion.div>
        </AdminLayout>
    );
}

/* ── Status Badge ── */
function StatusBadge({ status }) {
    const cfg = STATUS_CFG[status] ?? STATUS_CFG.draft;
    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: cfg.bg, color: cfg.text }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
            {cfg.label}
        </span>
    );
}

/* ── Desktop Row ── */
function EventRow({ event }) {
    return (
        <motion.tr variants={fadeUp}
            className="transition-colors duration-150"
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(238,242,255,0.4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

            <td className="px-5 py-4">
                <p className="font-bold text-gray-800 text-sm">{event.title}</p>
                <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {event.location ?? 'Lokasi belum ditentukan'}
                </p>
            </td>

            <td className="px-5 py-4">
                <StatusBadge status={event.status} />
            </td>

            <td className="px-5 py-4">
                <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(99,102,241,0.1)' }}>
                        <Users className="w-3 h-3" style={{ color: '#6366f1' }} />
                    </div>
                    <span className="font-bold text-gray-800 text-sm">{event.registrations_count}</span>
                    {event.max_participants && (
                        <span className="text-xs text-gray-400">/ {event.max_participants}</span>
                    )}
                </div>
            </td>

            <td className="px-5 py-4">
                <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(124,58,237,0.1)' }}>
                        <UserCog className="w-3 h-3" style={{ color: '#7c3aed' }} />
                    </div>
                    <span className="font-bold text-gray-800 text-sm">{event.jury_assignments_count}</span>
                </div>
            </td>

            <td className="px-5 py-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <CalendarDays className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{event.event_start}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 pl-5">s/d {event.event_end}</p>
            </td>

            <td className="px-5 py-4">
                <motion.div whileHover={{ y: -2 }} className="inline-block">
                    <Link href={route('admin.reports.leaderboard', event.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold
                                   transition-all duration-200 whitespace-nowrap"
                        style={{
                            background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(217,119,6,0.08))',
                            color: '#b45309',
                            border: '1px solid rgba(245,158,11,0.25)',
                        }}>
                        <Trophy className="w-3.5 h-3.5" />
                        Leaderboard
                    </Link>
                </motion.div>
            </td>
        </motion.tr>
    );
}

/* ── Mobile Card ── */
function EventMobileCard({ event, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="p-4 rounded-2xl transition-colors duration-200"
            style={{
                background: 'linear-gradient(135deg, rgba(238,242,255,0.6), rgba(245,243,255,0.4))',
                border: '1px solid rgba(99,102,241,0.15)',
            }}
        >
            <div className="flex justify-between items-start gap-2 mb-3">
                <div>
                    <p className="font-bold text-gray-800 text-sm">{event.title}</p>
                    <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {event.location ?? 'Lokasi belum ditentukan'}
                    </p>
                </div>
                <StatusBadge status={event.status} />
            </div>

            <div className="flex flex-wrap gap-3 text-xs mb-3">
                <span className="flex items-center gap-1 font-medium" style={{ color: '#4f46e5' }}>
                    <Users className="w-3 h-3" />
                    {event.registrations_count}
                    {event.max_participants ? `/${event.max_participants}` : ''} peserta
                </span>
                <span className="flex items-center gap-1 font-medium" style={{ color: '#7c3aed' }}>
                    <UserCog className="w-3 h-3" />
                    {event.jury_assignments_count} juri
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                    <CalendarDays className="w-3 h-3" />
                    {event.event_start} – {event.event_end}
                </span>
            </div>

            <motion.div whileHover={{ y: -2 }}>
                <Link href={route('admin.reports.leaderboard', event.id)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl
                               text-xs font-bold transition-all duration-200"
                    style={{
                        background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(217,119,6,0.08))',
                        color: '#b45309',
                        border: '1px solid rgba(245,158,11,0.25)',
                    }}>
                    <Trophy className="w-3.5 h-3.5" />
                    Lihat Leaderboard
                </Link>
            </motion.div>
        </motion.div>
    );
}