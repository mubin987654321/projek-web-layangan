import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Megaphone, PlusCircle, Pencil, Trash2, Eye, EyeOff,
    Trophy, RefreshCw, AlertTriangle, Info,
    ChevronLeft, ChevronRight, CalendarDays
} from 'lucide-react';

const fadeUp  = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { show: { transition: { staggerChildren: 0.06 } } };

const TYPE_CFG = {
    winner:  { label: 'Pemenang',  icon: Trophy,         bg: 'rgba(245,158,11,0.12)',  text: '#b45309', dot: '#f59e0b'  },
    update:  { label: 'Update',    icon: RefreshCw,      bg: 'rgba(59,130,246,0.12)',  text: '#1d4ed8', dot: '#3b82f6'  },
    warning: { label: 'Peringatan',icon: AlertTriangle,  bg: 'rgba(239,68,68,0.12)',   text: '#dc2626', dot: '#ef4444'  },
    info:    { label: 'Info',      icon: Info,           bg: 'rgba(99,102,241,0.12)',  text: '#4f46e5', dot: '#6366f1'  },
};

export default function AnnouncementsIndex({ announcements = { data: [] } }) {

    function togglePublish(ann) {
        if (confirm('Ubah status pengumuman ini?')) {
            router.patch(
                ann.is_published
                    ? route('admin.announcements.unpublish', ann.id)
                    : route('admin.announcements.publish',   ann.id)
            );
        }
    }

    function destroy(id) {
        if (confirm('Hapus pengumuman ini?')) {
            router.delete(route('admin.announcements.destroy', id));
        }
    }

    return (
        <AdminLayout header="Pengumuman">
            <Head title="Pengumuman" />

            {/* ── Hero Banner ── */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl mb-6 sm:mb-8"
                style={{
                    background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
                    boxShadow: '0 25px 60px -10px rgba(79,70,229,0.5)',
                }}
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }} />
                    <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-15"
                        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }} />
                    <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                        <defs><pattern id="gridAnn" width="32" height="32" patternUnits="userSpaceOnUse">
                            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5"/>
                        </pattern></defs>
                        <rect width="100%" height="100%" fill="url(#gridAnn)"/>
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                <Megaphone className="w-3.5 h-3.5 text-indigo-300" />
                                <span className="text-indigo-200 text-xs font-semibold tracking-wide uppercase">Panel Administrator</span>
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                            style={{ textShadow: '0 0 40px rgba(129,140,248,0.6)' }}>
                            Manajemen Pengumuman 📢
                        </h1>
                        <p className="text-indigo-200/80 text-sm mt-1">
                            Total{' '}
                            <span className="font-black text-white px-1.5 py-0.5 rounded-lg bg-white/10 border border-white/20">
                                {announcements?.total ?? 0}
                            </span>
                            {' '}pengumuman dalam sistem.
                        </p>
                    </div>

                    <Link href={route('admin.announcements.create')}>
                        <motion.div
                            whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white text-sm font-bold whitespace-nowrap"
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                                boxShadow: '0 6px 20px rgba(99,102,241,0.45)',
                            }}>
                            <PlusCircle className="w-4 h-4" />
                            Tambah Pengumuman
                        </motion.div>
                    </Link>
                </div>
            </motion.div>

            {/* ── Table Card ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-3xl overflow-hidden"
                style={{
                    background: 'white',
                    boxShadow: '0 4px 32px -4px rgba(99,102,241,0.15), 0 2px 8px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(99,102,241,0.12)',
                }}
            >
                {/* Card header */}
                <div className="flex items-center gap-3 px-4 sm:px-6 py-4"
                    style={{ borderBottom: '1px solid rgba(99,102,241,0.1)',
                             background: 'linear-gradient(to right, rgba(238,242,255,0.8), rgba(245,243,255,0.5))' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>
                        <Megaphone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className="font-bold text-gray-800 text-sm">Daftar Pengumuman</h2>
                        <p className="text-xs text-gray-400">Kelola semua pengumuman yang aktif</p>
                    </div>
                </div>

                {announcements?.data?.length === 0 ? (
                    <div className="flex flex-col items-center py-16 sm:py-20 text-gray-400 px-4">
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                            className="text-5xl mb-4">📢</motion.div>
                        <p className="font-semibold text-gray-500 text-sm">Belum ada pengumuman.</p>
                        <p className="text-xs text-gray-400 mt-1 text-center">Klik "Tambah Pengumuman" untuk membuat yang pertama.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr>
                                        {['Judul & Konten', 'Event', 'Tipe', 'Status', 'Tanggal', 'Aksi'].map(h => (
                                            <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider"
                                                style={{ background: 'rgba(238,242,255,0.7)', color: 'rgba(99,102,241,0.8)' }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <motion.tbody initial="hidden" animate="show" variants={stagger}
                                    className="divide-y" style={{ borderColor: 'rgba(99,102,241,0.06)' }}>
                                    <AnimatePresence>
                                        {announcements.data.map((ann, i) => (
                                            <AnnRow key={ann.id} ann={ann} index={i}
                                                onToggle={() => togglePublish(ann)}
                                                onDelete={() => destroy(ann.id)} />
                                        ))}
                                    </AnimatePresence>
                                </motion.tbody>
                            </table>
                        </div>

                        {/* Tablet Table (medium) */}
                        <div className="hidden sm:block lg:hidden overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr>
                                        {['Judul', 'Tipe', 'Status', 'Aksi'].map(h => (
                                            <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider"
                                                style={{ background: 'rgba(238,242,255,0.7)', color: 'rgba(99,102,241,0.8)' }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <motion.tbody initial="hidden" animate="show" variants={stagger}
                                    className="divide-y" style={{ borderColor: 'rgba(99,102,241,0.06)' }}>
                                    {announcements.data.map((ann, i) => (
                                        <AnnRowTablet key={ann.id} ann={ann} index={i}
                                            onToggle={() => togglePublish(ann)}
                                            onDelete={() => destroy(ann.id)} />
                                    ))}
                                </motion.tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="sm:hidden p-3 space-y-3">
                            {announcements.data.map((ann, i) => (
                                <AnnMobileCard key={ann.id} ann={ann} index={i}
                                    onToggle={() => togglePublish(ann)}
                                    onDelete={() => destroy(ann.id)} />
                            ))}
                        </div>
                    </>
                )}

                {/* Pagination */}
                {announcements?.last_page > 1 && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-4"
                        style={{ borderTop: '1px solid rgba(99,102,241,0.1)',
                                 background: 'linear-gradient(to right, rgba(238,242,255,0.4), rgba(245,243,255,0.3))' }}>
                        <span className="text-xs text-gray-400 font-medium">
                            Halaman{' '}
                            <span className="font-black" style={{ color: '#6366f1' }}>{announcements.current_page}</span>
                            {' '}dari{' '}
                            <span className="font-black" style={{ color: '#6366f1' }}>{announcements.last_page}</span>
                        </span>
                        <div className="flex gap-2">
                            {announcements.prev_page_url && (
                                <Link href={announcements.prev_page_url}
                                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                                    style={{ border: '1px solid rgba(99,102,241,0.2)', color: '#6366f1', background: 'rgba(238,242,255,0.6)' }}>
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                    <span className="hidden sm:inline">Sebelumnya</span>
                                </Link>
                            )}
                            {announcements.next_page_url && (
                                <Link href={announcements.next_page_url}
                                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                                    style={{ border: '1px solid rgba(99,102,241,0.2)', color: '#6366f1', background: 'rgba(238,242,255,0.6)' }}>
                                    <span className="hidden sm:inline">Selanjutnya</span>
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </AdminLayout>
    );
}

/* ── Shared components ── */
function TypeBadge({ type }) {
    const cfg = TYPE_CFG[type] ?? TYPE_CFG.info;
    const Icon = cfg.icon;
    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{ background: cfg.bg, color: cfg.text }}>
            <Icon className="w-3 h-3 shrink-0" />
            {cfg.label}
        </span>
    );
}

function StatusBadge({ published }) {
    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
            style={published
                ? { background: 'rgba(16,185,129,0.12)', color: '#059669' }
                : { background: 'rgba(148,163,184,0.15)', color: '#64748b' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: published ? '#10b981' : '#94a3b8' }} />
            {published ? 'Tayang' : 'Draft'}
        </span>
    );
}

function ActionBtns({ ann, onToggle, onDelete, row = false }) {
    const wrap = row ? 'flex items-center gap-1.5' : 'flex gap-2 w-full';
    return (
        <div className={wrap}>
            <motion.div whileHover={{ y: -1 }} className={row ? '' : 'flex-1'}>
                <Link href={route('admin.announcements.edit', ann.id)}
                    className={`flex items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${row ? 'w-8 h-8' : 'py-2 w-full'}`}
                    style={{ background: 'rgba(99,102,241,0.1)', color: '#4f46e5', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <Pencil className="w-3.5 h-3.5" />
                    {!row && 'Edit'}
                </Link>
            </motion.div>
            <motion.button whileHover={{ y: -1 }} onClick={onToggle}
                className={`flex items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${row ? 'w-8 h-8' : 'flex-1 py-2'}`}
                style={{ background: 'rgba(245,158,11,0.1)', color: '#b45309', border: '1px solid rgba(245,158,11,0.2)' }}>
                {ann.is_published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {!row && (ann.is_published ? 'Sembunyikan' : 'Tayangkan')}
            </motion.button>
            <motion.button whileHover={{ y: -1 }} onClick={onDelete}
                className={`flex items-center justify-center gap-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${row ? 'w-8 h-8' : 'flex-1 py-2'}`}
                style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626', border: '1px solid rgba(239,68,68,0.2)' }}>
                <Trash2 className="w-3.5 h-3.5" />
                {!row && 'Hapus'}
            </motion.button>
        </div>
    );
}

/* ── Desktop Row ── */
function AnnRow({ ann, index, onToggle, onDelete }) {
    return (
        <motion.tr variants={fadeUp} className="transition-colors duration-150"
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(238,242,255,0.4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <td className="px-5 py-4 max-w-xs">
                <p className="font-bold text-gray-800 text-sm truncate">{ann.title}</p>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{ann.content}</p>
            </td>
            <td className="px-5 py-4">
                <span className="text-xs text-gray-600 font-medium truncate max-w-[120px] block">
                    {ann.event?.title ?? <span className="text-gray-300">—</span>}
                </span>
            </td>
            <td className="px-5 py-4"><TypeBadge type={ann.type} /></td>
            <td className="px-5 py-4"><StatusBadge published={ann.is_published} /></td>
            <td className="px-5 py-4 text-xs text-gray-400 font-medium whitespace-nowrap">
                <div className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    {ann.published_at
                        ? new Date(ann.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                        : 'Draft'}
                </div>
            </td>
            <td className="px-5 py-4">
                <ActionBtns ann={ann} onToggle={onToggle} onDelete={onDelete} row />
            </td>
        </motion.tr>
    );
}

/* ── Tablet Row ── */
function AnnRowTablet({ ann, index, onToggle, onDelete }) {
    return (
        <motion.tr variants={fadeUp} className="transition-colors duration-150"
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(238,242,255,0.4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <td className="px-4 py-3.5 max-w-[200px]">
                <p className="font-bold text-gray-800 text-sm truncate">{ann.title}</p>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{ann.event?.title ?? '—'}</p>
            </td>
            <td className="px-4 py-3.5"><TypeBadge type={ann.type} /></td>
            <td className="px-4 py-3.5"><StatusBadge published={ann.is_published} /></td>
            <td className="px-4 py-3.5">
                <ActionBtns ann={ann} onToggle={onToggle} onDelete={onDelete} row />
            </td>
        </motion.tr>
    );
}

/* ── Mobile Card ── */
function AnnMobileCard({ ann, index, onToggle, onDelete }) {
    const cfg = TYPE_CFG[ann.type] ?? TYPE_CFG.info;
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="p-4 rounded-2xl"
            style={{
                background: 'linear-gradient(135deg, rgba(238,242,255,0.6), rgba(245,243,255,0.4))',
                border: '1px solid rgba(99,102,241,0.15)',
            }}>
            {/* Header */}
            <div className="flex items-start gap-2 mb-3">
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-sm leading-tight">{ann.title}</p>
                    {ann.event?.title && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{ann.event.title}</p>
                    )}
                    {ann.content && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{ann.content}</p>
                    )}
                </div>
                <StatusBadge published={ann.is_published} />
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
                <TypeBadge type={ann.type} />
                <span className="flex items-center gap-1 text-xs text-gray-400">
                    <CalendarDays className="w-3 h-3" />
                    {ann.published_at
                        ? new Date(ann.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                        : 'Draft'}
                </span>
            </div>

            {/* Actions */}
            <ActionBtns ann={ann} onToggle={onToggle} onDelete={onDelete} />
        </motion.div>
    );
}