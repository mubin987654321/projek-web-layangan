import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ClipboardList, Filter, CheckCircle2, XCircle,
    ChevronLeft, ChevronRight, Users, Tag,
    CalendarDays, Info, X, AlertTriangle, Swords
} from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

const STATUS_CFG = {
    pending:  { label: 'Menunggu',  bg: 'rgba(245,158,11,0.12)',  text: '#b45309', dot: '#f59e0b'  },
    approved: { label: 'Disetujui', bg: 'rgba(16,185,129,0.12)', text: '#059669', dot: '#10b981'  },
    rejected: { label: 'Ditolak',  bg: 'rgba(239,68,68,0.12)',   text: '#dc2626', dot: '#ef4444'  },
};

const inputClass =
    "border rounded-2xl px-4 py-2.5 text-sm bg-white/80 " +
    "focus:outline-none focus:ring-2 transition-all duration-200 " +
    "border-indigo-100 focus:ring-indigo-400 focus:border-transparent";

export default function RegistrationsIndex({ registrations, events, filters }) {
    const [eventFilter,  setEventFilter]  = useState(filters?.event_id ?? '');
    const [statusFilter, setStatusFilter] = useState(filters?.status   ?? '');
    const [rejectModal,  setRejectModal]  = useState(null);

    function applyFilter() {
        router.get(
            route('admin.registrations.index'),
            { event_id: eventFilter, status: statusFilter },
            { preserveState: true, preserveScroll: true }
        );
    }

    function approve(id) {
        if (confirm('Setujui pendaftaran ini?')) {
            router.patch(route('admin.registrations.approve', id), {}, { preserveScroll: true });
        }
    }

    const total = registrations?.total ?? 0;

    return (
        <AdminLayout header="Manajemen Pendaftaran">
            <Head title="Pendaftaran" />

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
                            <pattern id="gridReg" width="32" height="32" patternUnits="userSpaceOnUse">
                                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#gridReg)" />
                    </svg>
                </div>

                <div className="relative z-10 flex justify-between items-center p-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full
                                            bg-white/10 backdrop-blur-sm border border-white/20">
                                <ClipboardList className="w-3.5 h-3.5 text-indigo-300" />
                                <span className="text-indigo-200 text-xs font-semibold tracking-wide uppercase">
                                    Panel Administrator
                                </span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-black text-white mb-1.5 tracking-tight"
                            style={{ textShadow: '0 0 40px rgba(129,140,248,0.6)' }}>
                            Manajemen Pendaftaran 📋
                        </h1>
                        <p className="text-indigo-200/80 text-sm">
                            Total{' '}
                            <span className="font-black text-white px-1.5 py-0.5 rounded-lg
                                             bg-white/10 border border-white/20">
                                {total}
                            </span>
                            {' '}data pendaftaran ditemukan.
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
                        📝
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Filter Card ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-3xl overflow-hidden mb-6"
                style={{
                    background: 'white',
                    boxShadow: '0 4px 24px -4px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(99,102,241,0.12)',
                }}
            >
                <div className="flex items-center gap-3 px-6 py-4"
                    style={{ borderBottom: '1px solid rgba(99,102,241,0.1)',
                             background: 'linear-gradient(to right, rgba(238,242,255,0.8), rgba(245,243,255,0.5))' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                                 boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>
                        <Filter className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800 text-sm">Filter Pendaftaran</h2>
                        <p className="text-xs text-gray-400">Saring berdasarkan event atau status</p>
                    </div>
                </div>
                <div className="p-6 flex gap-4 items-end flex-wrap">
                    <div className="flex-1 min-w-[180px]">
                        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                            style={{ color: '#6366f1' }}>Filter Event</label>
                        <select className={`w-full ${inputClass}`}
                            value={eventFilter} onChange={e => setEventFilter(e.target.value)}>
                            <option value="">Semua Event</option>
                            {events?.map(ev => (
                                <option key={ev.id} value={ev.id}>{ev.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 min-w-[160px]">
                        <label className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                            style={{ color: '#6366f1' }}>Status</label>
                        <select className={`w-full ${inputClass}`}
                            value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                            <option value="">Semua Status</option>
                            <option value="pending">Menunggu</option>
                            <option value="approved">Disetujui</option>
                            <option value="rejected">Ditolak</option>
                        </select>
                    </div>
                    <motion.button
                        onClick={applyFilter}
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 text-white px-5 py-2.5 rounded-2xl text-sm font-bold"
                        style={{
                            background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                            boxShadow: '0 6px 20px -4px rgba(99,102,241,0.5)',
                        }}
                    >
                        <Filter className="w-4 h-4" /> Terapkan
                    </motion.button>
                </div>
            </motion.div>

            {/* ── Table Card ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18 }}
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
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                                 boxShadow: '0 4px 12px rgba(124,58,237,0.4)' }}>
                        <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800 text-sm">Daftar Pendaftaran</h2>
                        <p className="text-xs text-gray-400">Kelola semua pendaftaran peserta</p>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr>
                                {['Peserta', 'Event', 'Kategori', 'Tim', 'Tanggal Daftar', 'Status', 'Aksi'].map(h => (
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
                            {registrations?.data?.length === 0 && (
                                <tr>
                                    <td colSpan={7}>
                                        <div className="flex flex-col items-center py-16 text-gray-400">
                                            <motion.div animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="text-5xl mb-3">📭</motion.div>
                                            <p className="text-sm font-medium">Tidak ada data pendaftaran.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            <AnimatePresence>
                                {registrations?.data?.map((reg, i) => (
                                    <RegRow key={reg.id} reg={reg} index={i}
                                        onApprove={approve}
                                        onReject={() => setRejectModal({ id: reg.id, name: reg.user?.name })} />
                                ))}
                            </AnimatePresence>
                        </motion.tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden p-4 space-y-3">
                    {registrations?.data?.length === 0 && (
                        <div className="flex flex-col items-center py-12 text-gray-400">
                            <div className="text-5xl mb-3">📭</div>
                            <p className="text-sm">Tidak ada data pendaftaran.</p>
                        </div>
                    )}
                    <AnimatePresence>
                        {registrations?.data?.map((reg, i) => (
                            <RegMobileCard key={reg.id} reg={reg} index={i}
                                onApprove={approve}
                                onReject={() => setRejectModal({ id: reg.id, name: reg.user?.name })} />
                        ))}
                    </AnimatePresence>
                </div>

                {/* Pagination */}
                {registrations?.last_page > 1 && (
                    <div className="px-6 py-4 flex justify-between items-center flex-wrap gap-3"
                        style={{ borderTop: '1px solid rgba(99,102,241,0.1)',
                                 background: 'linear-gradient(to right, rgba(238,242,255,0.4), rgba(245,243,255,0.3))' }}>
                        <span className="text-xs text-gray-400 font-medium">
                            Halaman{' '}
                            <span className="font-black" style={{ color: '#6366f1' }}>{registrations.current_page}</span>
                            {' '}dari{' '}
                            <span className="font-black" style={{ color: '#6366f1' }}>{registrations.last_page}</span>
                        </span>
                        <div className="flex gap-2">
                            {registrations.prev_page_url && (
                                <Link href={registrations.prev_page_url}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-2xl
                                               text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                                    style={{ border: '1px solid rgba(99,102,241,0.2)', color: '#6366f1',
                                             background: 'rgba(238,242,255,0.6)' }}>
                                    <ChevronLeft className="w-3.5 h-3.5" /> Sebelumnya
                                </Link>
                            )}
                            {registrations.next_page_url && (
                                <Link href={registrations.next_page_url}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-2xl
                                               text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                                    style={{ border: '1px solid rgba(99,102,241,0.2)', color: '#6366f1',
                                             background: 'rgba(238,242,255,0.6)' }}>
                                    Selanjutnya <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>

            {/* ── Reject Modal ── */}
            <AnimatePresence>
                {rejectModal && (
                    <RejectModal
                        name={rejectModal.name}
                        onConfirm={reason => {
                            router.patch(
                                route('admin.registrations.reject', rejectModal.id),
                                { reason },
                                { onSuccess: () => setRejectModal(null) }
                            );
                        }}
                        onClose={() => setRejectModal(null)}
                    />
                )}
            </AnimatePresence>
        </AdminLayout>
    );
}

/* ── Avatar ── */
function Avatar({ name, size = 'sm' }) {
    const colors = [
        ['#6366f1', '#818cf8'], ['#7c3aed', '#a78bfa'],
        ['#4f46e5', '#6366f1'], ['#6d28d9', '#8b5cf6'],
    ];
    const idx = (name?.charCodeAt(0) ?? 0) % colors.length;
    const [from, to] = colors[idx];
    const dim = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-9 h-9 text-sm';
    return (
        <div className={`${dim} rounded-xl flex items-center justify-center text-white font-black shrink-0`}
            style={{ background: `linear-gradient(135deg, ${from}, ${to})`,
                     boxShadow: `0 4px 10px -2px ${from}55` }}>
            {name?.charAt(0).toUpperCase() ?? '?'}
        </div>
    );
}

/* ── Desktop Row ── */
function RegRow({ reg, index, onApprove, onReject }) {
    return (
        <motion.tr variants={fadeUp}
            className="transition-colors duration-150"
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(238,242,255,0.4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

            <td className="px-5 py-4">
                <div className="flex items-center gap-2.5">
                    <Avatar name={reg.user?.name} />
                    <div>
                        <p className="font-semibold text-gray-800 text-sm">{reg.user?.name}</p>
                        <p className="text-xs text-gray-400">{reg.user?.email}</p>
                    </div>
                </div>
            </td>

            <td className="px-5 py-4">
                <p className="text-xs text-gray-600 font-medium max-w-[160px] truncate">
                    {reg.event?.title}
                </p>
            </td>

            <td className="px-5 py-4">
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: 'rgba(99,102,241,0.1)', color: '#4f46e5',
                             border: '1px solid rgba(99,102,241,0.2)' }}>
                    {reg.category?.name}
                </span>
            </td>

            <td className="px-5 py-4 text-xs text-gray-500">
                {reg.team_name ?? <span className="text-gray-300">—</span>}
            </td>

            <td className="px-5 py-4 text-xs text-gray-400 font-medium">
                {new Date(reg.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric',
                })}
            </td>

            <td className="px-5 py-4">
                <StatusBadge status={reg.status} />
            </td>

            <td className="px-5 py-4">
                <ActionCell reg={reg} onApprove={onApprove} onReject={onReject} />
            </td>
        </motion.tr>
    );
}

/* ── Mobile Card ── */
function RegMobileCard({ reg, index, onApprove, onReject }) {
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
            <div className="flex items-start gap-3 mb-3">
                <Avatar name={reg.user?.name} size="lg" />
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm">{reg.user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{reg.user?.email}</p>
                </div>
                <StatusBadge status={reg.status} />
            </div>

            <div className="flex flex-wrap gap-2 mb-3 text-xs">
                <span className="flex items-center gap-1 text-gray-500">
                    <CalendarDays className="w-3 h-3" />
                    {reg.event?.title}
                </span>
                <span className="flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(99,102,241,0.1)', color: '#4f46e5',
                             border: '1px solid rgba(99,102,241,0.2)' }}>
                    <Tag className="w-3 h-3" />
                    {reg.category?.name}
                </span>
                {reg.team_name && (
                    <span className="flex items-center gap-1 text-gray-500">
                        <Swords className="w-3 h-3" />
                        {reg.team_name}
                    </span>
                )}
            </div>

            <ActionCell reg={reg} onApprove={onApprove} onReject={onReject} mobile />
        </motion.div>
    );
}

/* ── Action Cell ── */
function ActionCell({ reg, onApprove, onReject, mobile }) {
    const base = mobile
        ? 'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5'
        : 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 hover:-translate-y-0.5';

    if (reg.status === 'pending') {
        return (
            <div className={`flex gap-2 ${mobile ? 'w-full' : ''}`}>
                <button onClick={() => onApprove(reg.id)} className={base}
                    style={{ background: 'rgba(16,185,129,0.1)', color: '#059669',
                             border: '1px solid rgba(16,185,129,0.2)' }}>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Setujui
                </button>
                <button onClick={onReject} className={base}
                    style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626',
                             border: '1px solid rgba(239,68,68,0.2)' }}>
                    <XCircle className="w-3.5 h-3.5" /> Tolak
                </button>
            </div>
        );
    }

    if (reg.status === 'rejected' && reg.rejection_reason) {
        return (
            <div className="flex items-start gap-1.5 text-xs max-w-[180px]"
                style={{ color: '#dc2626' }}>
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span className="italic truncate text-gray-400">{reg.rejection_reason}</span>
            </div>
        );
    }

    return null;
}

/* ── Status Badge ── */
function StatusBadge({ status }) {
    const cfg = STATUS_CFG[status] ?? STATUS_CFG.pending;
    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: cfg.bg, color: cfg.text }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
            {cfg.label}
        </span>
    );
}

/* ── Reject Modal ── */
function RejectModal({ name, onConfirm, onClose }) {
    const [reason, setReason] = useState('');

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            style={{ background: 'rgba(15,12,41,0.7)' }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl w-full max-w-md overflow-hidden"
                style={{ boxShadow: '0 32px 80px -16px rgba(79,70,229,0.4), 0 8px 32px rgba(0,0,0,0.2)' }}
            >
                <div className="flex items-center justify-between px-6 py-4"
                    style={{ borderBottom: '1px solid rgba(239,68,68,0.1)',
                             background: 'linear-gradient(to right, rgba(254,242,242,0.8), rgba(255,241,242,0.5))' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                                     boxShadow: '0 4px 12px rgba(239,68,68,0.4)' }}>
                            <AlertTriangle className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Tolak Pendaftaran</h3>
                            <p className="text-xs text-gray-400">Berikan alasan yang jelas</p>
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-xl
                                   text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                        Pendaftaran dari{' '}
                        <span className="font-bold text-gray-800">{name}</span>
                        {' '}akan ditolak dan peserta akan menerima notifikasi.
                    </p>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                        style={{ color: '#dc2626' }}>
                        Alasan Penolakan *
                    </label>
                    <textarea
                        className="w-full rounded-2xl px-4 py-3 text-sm resize-none
                                   placeholder:text-gray-300 focus:outline-none transition-all duration-200"
                        style={{ border: '1px solid rgba(239,68,68,0.2)' }}
                        rows={3} value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="Jelaskan alasan penolakan..."
                        autoFocus
                        onFocus={e => e.target.style.boxShadow = '0 0 0 3px rgba(239,68,68,0.15)'}
                        onBlur={e => e.target.style.boxShadow = 'none'}
                    />
                </div>

                <div className="flex gap-3 px-6 pb-6">
                    <button onClick={onClose}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl
                                   text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all duration-200"
                        style={{ border: '1px solid #e5e7eb' }}>
                        <X className="w-4 h-4" /> Batal
                    </button>
                    <motion.button
                        disabled={!reason.trim()}
                        onClick={() => reason.trim() && onConfirm(reason)}
                        whileHover={reason.trim() ? { y: -2 } : {}}
                        whileTap={reason.trim() ? { scale: 0.97 } : {}}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5
                                   rounded-2xl text-sm font-bold text-white
                                   disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        style={{
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            boxShadow: reason.trim() ? '0 6px 20px -4px rgba(239,68,68,0.5)' : 'none',
                        }}
                    >
                        <XCircle className="w-4 h-4" /> Konfirmasi Tolak
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}