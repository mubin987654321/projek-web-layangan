import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Megaphone, CalendarDays, FileText, Tag,
    Save, X, Info, Trophy, RefreshCw,
    AlertTriangle, PlusCircle
} from 'lucide-react';

const inputClass =
    "w-full rounded-2xl px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-300 focus:outline-none";

const labelClass = "block text-xs font-bold uppercase tracking-wider mb-1.5";

const TYPE_OPTS = [
    { value: 'info', label: 'Info', icon: Info, color: '#4f46e5', bg: 'rgba(99,102,241,0.12)', active: 'rgba(99,102,241,0.2)', border: 'rgba(99,102,241,0.4)' },
    { value: 'winner', label: 'Pemenang', icon: Trophy, color: '#b45309', bg: 'rgba(245,158,11,0.12)', active: 'rgba(245,158,11,0.2)', border: 'rgba(245,158,11,0.4)' },
    { value: 'update', label: 'Update', icon: RefreshCw, color: '#1d4ed8', bg: 'rgba(59,130,246,0.12)', active: 'rgba(59,130,246,0.2)', border: 'rgba(59,130,246,0.4)' },
    { value: 'warning', label: 'Peringatan', icon: AlertTriangle, color: '#dc2626', bg: 'rgba(239,68,68,0.12)', active: 'rgba(239,68,68,0.2)', border: 'rgba(239,68,68,0.4)' },
];

function FieldError({ msg }) {
    if (!msg) return null;
    return (
        <p className="flex items-center gap-1 text-red-500 text-xs mt-1.5 font-medium">
            <Info className="w-3 h-3 shrink-0" /> {msg}
        </p>
    );
}

export default function AnnouncementsCreate({ events }) {
    const { data, setData, post, processing, errors } = useForm({
        event_id: '',
        title: '',
        content: '',
        type: 'info',
        is_published: false,
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.announcements.store'));
    }

    return (
        <AdminLayout header="Buat Pengumuman">
            <Head title="Buat Pengumuman" />

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
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
                        style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }} />
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-15"
                        style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }} />
                    <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                        <defs><pattern id="gridCreate" width="32" height="32" patternUnits="userSpaceOnUse">
                            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern></defs>
                        <rect width="100%" height="100%" fill="url(#gridCreate)" />
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                <PlusCircle className="w-3.5 h-3.5 text-indigo-300" />
                                <span className="text-indigo-200 text-xs font-semibold tracking-wide uppercase">Panel Administrator</span>
                            </div>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                            style={{ textShadow: '0 0 40px rgba(129,140,248,0.6)' }}>
                            Buat Pengumuman 📢
                        </h1>
                        <p className="text-indigo-200/80 text-sm mt-1">
                            Isi detail pengumuman yang akan ditampilkan kepada peserta.
                        </p>
                    </div>

                    <motion.div
                        animate={{ rotate: [0, 6, -4, 0], y: [0, -8, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="hidden md:flex items-center justify-center w-20 h-20 rounded-3xl text-4xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(124,58,237,0.2))',
                            boxShadow: '0 8px 32px rgba(99,102,241,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        📢
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Form ── */}
            <form onSubmit={submit} className="max-w-2xl space-y-5">

                {/* Section Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-3xl overflow-hidden"
                    style={{
                        background: 'white',
                        boxShadow: '0 4px 24px -4px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(99,102,241,0.12)',
                    }}
                >
                    {/* Card Header */}
                    <div className="flex items-center gap-3 px-4 sm:px-6 py-4"
                        style={{
                            borderBottom: '1px solid rgba(99,102,241,0.1)',
                            background: 'linear-gradient(to right, rgba(238,242,255,0.8), rgba(245,243,255,0.5))',
                        }}>
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>
                            <Megaphone className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-800 text-sm">Detail Pengumuman</h2>
                            <p className="text-xs text-gray-400">Lengkapi semua informasi pengumuman</p>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-5">

                        {/* Event */}
                        <div>
                            <label className={labelClass} style={{ color: '#6366f1' }}>
                                <span className="flex items-center gap-1">
                                    <CalendarDays className="w-3 h-3" /> Event
                                </span>
                            </label>
                            <select
                                className={inputClass}
                                value={data.event_id}
                                onChange={e => setData('event_id', e.target.value)}
                                style={{ border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(248,249,255,0.8)' }}
                                onFocus={e => e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'}
                                onBlur={e => e.target.style.boxShadow = 'none'}
                            >
                                <option value="">-- Pilih Event --</option>
                                {events.map(ev => (
                                    <option key={ev.id} value={ev.id}>{ev.title}</option>
                                ))}
                            </select>
                            <FieldError msg={errors.event_id} />
                        </div>

                        {/* Judul */}
                        <div>
                            <label className={labelClass} style={{ color: '#6366f1' }}>
                                <span className="flex items-center gap-1">
                                    <FileText className="w-3 h-3" /> Judul Pengumuman *
                                </span>
                            </label>
                            <input
                                className={inputClass}
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Contoh: Pengumuman Pemenang Lomba Layangan 2025"
                                style={{ border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(248,249,255,0.8)' }}
                                onFocus={e => e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'}
                                onBlur={e => e.target.style.boxShadow = 'none'}
                            />
                            <FieldError msg={errors.title} />
                        </div>

                        {/* Isi */}
                        <div>
                            <label className={labelClass} style={{ color: '#6366f1' }}>
                                <span className="flex items-center gap-1">
                                    <FileText className="w-3 h-3" /> Isi Pengumuman *
                                </span>
                            </label>
                            <textarea
                                className={inputClass}
                                rows={5}
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                placeholder="Tulis isi pengumuman di sini..."
                                style={{ border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(248,249,255,0.8)', resize: 'vertical' }}
                                onFocus={e => e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'}
                                onBlur={e => e.target.style.boxShadow = 'none'}
                            />
                            <FieldError msg={errors.content} />
                        </div>

                        {/* Tipe */}
                        <div>
                            <label className={labelClass} style={{ color: '#6366f1' }}>
                                <span className="flex items-center gap-1">
                                    <Tag className="w-3 h-3" /> Tipe Pengumuman *
                                </span>
                            </label>
                            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
                                {TYPE_OPTS.map(opt => {
                                    const Icon = opt.icon;
                                    const isActive = data.type === opt.value;
                                    return (
                                        <motion.label
                                            key={opt.value}
                                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                            className="flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2.5
                                                       rounded-2xl border-2 cursor-pointer text-xs sm:text-sm font-bold transition-all duration-200"
                                            style={{
                                                background: isActive ? opt.active : 'transparent',
                                                borderColor: isActive ? opt.border : 'rgba(99,102,241,0.12)',
                                                color: isActive ? opt.color : '#9ca3af',
                                            }}
                                        >
                                            <input type="radio" name="type" value={opt.value}
                                                checked={isActive}
                                                onChange={() => setData('type', opt.value)}
                                                className="hidden" />
                                            <Icon className="w-3.5 h-3.5 shrink-0" />
                                            {opt.label}
                                        </motion.label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Publish toggle */}
                        <div className="flex items-center gap-4 pt-4"
                            style={{ borderTop: '1px solid rgba(99,102,241,0.08)' }}>
                            <button
                                type="button"
                                onClick={() => setData('is_published', !data.is_published)}
                                className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 focus:outline-none shrink-0"
                                style={{ background: data.is_published ? '#6366f1' : '#d1d5db' }}
                            >
                                <motion.span
                                    layout
                                    className="inline-block h-5 w-5 rounded-full bg-white shadow-md"
                                    animate={{ x: data.is_published ? 22 : 4 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            </button>
                            <div>
                                <p className="text-sm font-bold text-gray-700">
                                    {data.is_published ? '✅ Langsung tayangkan' : 'Simpan sebagai draft'}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                                    {data.is_published
                                        ? 'Peserta akan langsung melihat pengumuman ini'
                                        : 'Pengumuman tidak akan terlihat oleh peserta'}
                                </p>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* ── Action Buttons ── */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-3 pb-6 sm:pb-8"
                >
                    <motion.button
                        type="submit" disabled={processing}
                        whileHover={!processing ? { y: -2 } : {}}
                        whileTap={!processing ? { scale: 0.97 } : {}}
                        className="flex items-center justify-center gap-2 text-white px-6 py-3 rounded-2xl
                                   font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed
                                   transition-all duration-200 w-full sm:w-auto"
                        style={{
                            background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                            boxShadow: processing ? 'none' : '0 6px 20px -4px rgba(99,102,241,0.5)',
                        }}
                    >
                        {processing ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Simpan Pengumuman
                            </>
                        )}
                    </motion.button>

                    <Link
                        href={route('admin.announcements.index')}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm
                                   font-bold text-gray-500 bg-white hover:-translate-y-0.5 transition-all
                                   duration-200 w-full sm:w-auto"
                        style={{ border: '1px solid rgba(99,102,241,0.15)' }}
                    >
                        <X className="w-4 h-4" /> Batal
                    </Link>
                </motion.div>

            </form>
        </AdminLayout>
    );
}