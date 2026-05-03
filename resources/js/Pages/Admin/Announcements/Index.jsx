import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Megaphone, PlusCircle, Pencil, Trash2, Eye, EyeOff,
    Trophy, RefreshCw, AlertTriangle, Info,
    ChevronLeft, ChevronRight, CalendarDays, Sparkles
} from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = { show: { transition: { staggerChildren: 0.1 } } };

const TYPE_CFG = {
    winner: { 
        label: 'Pemenang', 
        icon: Trophy, 
        bg: 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10', 
        text: 'text-purple-600', 
        ring: 'ring-purple-200/50'
    },
    update: { 
        label: 'Update', 
        icon: RefreshCw, 
        bg: 'bg-gradient-to-r from-indigo-500/10 to-blue-500/10', 
        text: 'text-indigo-600', 
        ring: 'ring-indigo-200/50'
    },
    warning: { 
        label: 'Peringatan', 
        icon: AlertTriangle, 
        bg: 'bg-gradient-to-r from-orange-500/10 to-amber-500/10', 
        text: 'text-orange-600', 
        ring: 'ring-orange-200/50'
    },
    info: { 
        label: 'Info', 
        icon: Info, 
        bg: 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10', 
        text: 'text-blue-600', 
        ring: 'ring-blue-200/50'
    },
};

const GRADIENT_BG = "bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50";

export default function AnnouncementsIndex({ announcements = { data: [] } }) {

    function togglePublish(ann) {
        if (confirm('Ubah status pengumuman ini?')) {
            router.patch(
                ann.is_published
                    ? route('admin.announcements.unpublish', ann.id)
                    : route('admin.announcements.publish', ann.id)
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

            {/* HERO */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${GRADIENT_BG} rounded-3xl p-8 mb-8 shadow-2xl border border-white/50 backdrop-blur-sm`}>
                
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg">
                            <Megaphone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                                Manajemen Pengumuman
                            </h1>
                            <p className="text-purple-600/80 text-lg font-medium mt-1">
                                Total <span className="font-black text-2xl text-indigo-600">{announcements?.total ?? 0}</span> pengumuman
                            </p>
                        </div>
                    </div>

                    <Link 
                        href={route('admin.announcements.create')}
                        className="group flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg">
                        <PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Tambah Pengumuman
                    </Link>
                </div>
            </motion.div>

            {/* TABLE CARD */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`${GRADIENT_BG} rounded-3xl shadow-2xl border border-white/50 backdrop-blur-sm overflow-hidden`}>
                
                <div className="p-1">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gradient-to-r from-purple-600/10 to-indigo-600/10 backdrop-blur-sm">
                                <th className="p-6 text-left font-semibold text-gray-700 tracking-wide">Judul</th>
                                <th className="p-6 text-left font-semibold text-gray-700 tracking-wide">Event</th>
                                <th className="p-6 text-left font-semibold text-gray-700 tracking-wide">Tipe</th>
                                <th className="p-6 text-left font-semibold text-gray-700 tracking-wide">Status</th>
                                <th className="p-6 text-left font-semibold text-gray-700 tracking-wide">Tanggal</th>
                                <th className="p-6 text-left font-semibold text-gray-700 tracking-wide">Aksi</th>
                            </tr>
                        </thead>

                        <motion.tbody variants={stagger} initial="hidden" animate="show">
                            {announcements?.data?.length === 0 ? (
                                <EmptyState />
                            ) : (
                                announcements?.data?.map((ann, index) => (
                                    <AnnouncementRow
                                        key={ann.id}
                                        ann={ann}
                                        index={index}
                                        onToggle={() => togglePublish(ann)}
                                        onDelete={() => destroy(ann.id)}
                                    />
                                ))
                            )}
                        </motion.tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                {announcements?.last_page > 1 && (
                    <PaginationFooter announcements={announcements} />
                )}
            </motion.div>
        </AdminLayout>
    );
}

/* EMPTY STATE */
function EmptyState() {
    return (
        <tr>
            <td colSpan={6} className="text-center p-20">
                <div className="flex flex-col items-center gap-4">
                    <div className="p-8 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl shadow-xl">
                        <Megaphone className="w-16 h-16 text-purple-500 mx-auto" />
                    </div>
                    <div className="max-w-md mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum ada pengumuman</h3>
                        <p className="text-gray-500 text-lg">Mulai buat pengumuman pertama Anda untuk memulai</p>
                    </div>
                </div>
            </td>
        </tr>
    );
}

/* ANNOUNCEMENT ROW */
function AnnouncementRow({ ann, index, onToggle, onDelete }) {
    return (
        <motion.tr
            variants={fadeUp}
            className="border-b border-purple-100/50 hover:bg-white/60 backdrop-blur-sm transition-all duration-300 group">
            
            {/* Judul */}
            <td className="p-6">
                <div className="space-y-2">
                    <h4 className="font-bold text-lg text-gray-800 group-hover:text-purple-700 transition-colors line-clamp-1">
                        {ann.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 max-w-md">
                        {ann.content}
                    </p>
                </div>
            </td>

            {/* Event */}
            <td className="p-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-100/50 text-indigo-700 rounded-full text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    {ann.event?.title ?? 'Umum'}
                </span>
            </td>

            {/* Tipe */}
            <td className="p-6">
                <TypeBadge type={ann.type} />
            </td>

            {/* Status */}
            <td className="p-6">
                <PublishStatus published={ann.is_published} />
            </td>

            {/* Tanggal */}
            <td className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <CalendarDays className="w-4 h-4 text-purple-400" />
                    {ann.published_at
                        ? new Date(ann.published_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })
                        : 'Draft'}
                </div>
            </td>

            {/* Aksi */}
            <td className="p-6">
                <ActionButtons
                    ann={ann}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            </td>
        </motion.tr>
    );
}

/* BADGE */
function TypeBadge({ type }) {
    const cfg = TYPE_CFG[type] || TYPE_CFG.info;
    const Icon = cfg.icon;

    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold shadow-sm ${cfg.bg} ${cfg.text} ${cfg.ring} backdrop-blur-sm border border-white/50 hover:scale-105 transition-all duration-200`}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {cfg.label}
        </div>
    );
}

/* STATUS */
function PublishStatus({ published }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-bold shadow-sm backdrop-blur-sm border border-white/50 transform transition-all duration-200 hover:scale-105
            ${published 
                ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 ring-2 ring-emerald-200/50' 
                : 'bg-gradient-to-r from-slate-100/50 to-gray-100/50 text-gray-600 ring-2 ring-gray-200/50'
            }`}>
            {published ? (
                <>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Dipublikasikan
                </>
            ) : (
                <>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    Draft
                </>
            )}
        </span>
    );
}

/* ACTION */
function ActionButtons({ ann, onToggle, onDelete }) {
    return (
        <div className="flex items-center gap-2">
            <Link 
                href={route('admin.announcements.edit', ann.id)}
                className="p-3 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 hover:from-blue-500/20 hover:to-indigo-500/20 text-blue-700 rounded-2xl shadow-sm hover:shadow-md border border-blue-200/50 backdrop-blur-sm transition-all duration-300 hover:scale-110 group">
                <Pencil className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </Link>

            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggle}
                className="p-3 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 hover:from-yellow-500/20 hover:to-orange-500/20 text-yellow-700 rounded-2xl shadow-sm hover:shadow-md border border-yellow-200/50 backdrop-blur-sm transition-all duration-300 group">
                {ann.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </motion.button>

            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDelete}
                className="p-3 bg-gradient-to-br from-red-500/10 to-rose-500/10 hover:from-red-500/20 hover:to-rose-500/20 text-red-700 rounded-2xl shadow-sm hover:shadow-md border border-red-200/50 backdrop-blur-sm transition-all duration-300 group">
                <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </motion.button>
        </div>
    );
}

/* PAGINATION */
function PaginationFooter({ announcements }) {
    return (
        <div className="px-8 py-6 bg-gradient-to-r from-purple-600/5 to-indigo-600/5 border-t border-purple-200/30 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-sm font-medium text-gray-600">
                    Halaman <span className="font-black text-purple-600">{announcements.current_page}</span> 
                    dari <span className="font-black text-indigo-600">{announcements.last_page}</span>
                </span>

                <div className="flex items-center gap-2">
                    {announcements.prev_page_url && (
                        <Link 
                            href={announcements.prev_page_url}
                            className="flex items-center justify-center w-12 h-12 bg-white/70 hover:bg-white shadow-lg hover:shadow-xl rounded-2xl border border-purple-200/50 backdrop-blur-sm transition-all duration-300 hover:-translate-x-1 group">
                            <ChevronLeft className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
                        </Link>
                    )}
                    
                    {announcements.next_page_url && (
                        <Link 
                            href={announcements.next_page_url}
                            className="flex items-center justify-center w-12 h-12 bg-white/70 hover:bg-white shadow-lg hover:shadow-xl rounded-2xl border border-purple-200/50 backdrop-blur-sm transition-all duration-300 hover:translate-x-1 group">
                            <ChevronRight className="w-5 h-5 text-gray-700 group-hover:text-purple-600 transition-colors" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}