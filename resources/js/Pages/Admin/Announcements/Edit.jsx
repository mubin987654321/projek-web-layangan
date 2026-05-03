import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Megaphone, CalendarDays, FileText, Tag,
    Save, X, Info, Trophy, RefreshCw,
    AlertTriangle, Pencil
} from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

const inputClass =
    "w-full border border-slate-200 rounded-2xl px-4 py-2.5 text-sm bg-slate-50 " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white " +
    "placeholder:text-slate-400 transition-all";

const labelClass =
    "text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1";

const TYPE_OPTS = [
    { value: 'info', label: 'Info', icon: Info, active: 'bg-indigo-100 text-indigo-700 border-indigo-300' },
    { value: 'winner', label: 'Pemenang', icon: Trophy, active: 'bg-amber-100 text-amber-700 border-amber-300' },
    { value: 'update', label: 'Update', icon: RefreshCw, active: 'bg-blue-100 text-blue-700 border-blue-300' },
    { value: 'warning', label: 'Peringatan', icon: AlertTriangle, active: 'bg-red-100 text-red-700 border-red-300' },
];

function FieldError({ msg }) {
    if (!msg) return null;
    return (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
            <Info className="w-3 h-3" /> {msg}
        </p>
    );
}

function SectionCard({ icon: Icon, title, children }) {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden"
        >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50">
                <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-4 h-4 text-indigo-600" />
                </div>
                <h2 className="font-bold text-slate-800">{title}</h2>
            </div>
            <div className="p-6">{children}</div>
        </motion.div>
    );
}

export default function AnnouncementsEdit({ announcement, events = [] }) {

    const { data, setData, patch, processing, errors } = useForm({
        event_id: announcement.event_id || '',
        title: announcement.title || '',
        content: announcement.content || '',
        type: announcement.type || 'info',
        is_published: announcement.is_published || false,
    });

    function submit(e) {
        e.preventDefault();
        patch(route('admin.announcements.update', announcement.id));
    }

    return (
        <AdminLayout header="Edit Pengumuman">
            <Head title="Edit Pengumuman" />

            {/* HERO */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white 
                           rounded-3xl p-6 mb-8 shadow-lg"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-indigo-200 text-sm flex items-center gap-1">
                            <Pencil className="w-4 h-4" />
                            Panel Admin
                        </p>
                        <h1 className="text-2xl font-black mt-1">
                            Edit Pengumuman ✏️
                        </h1>
                        <p className="text-sm text-indigo-200 mt-1 truncate max-w-md">
                            {announcement.title}
                        </p>
                    </div>

                    <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold
                        ${data.is_published ? 'bg-emerald-500/20 text-emerald-200' : 'bg-white/20 text-white'}`}>
                        <span className={`w-2 h-2 rounded-full ${data.is_published ? 'bg-emerald-400' : 'bg-gray-300'}`} />
                        {data.is_published ? 'Published' : 'Draft'}
                    </div>
                </div>
            </motion.div>

            <form onSubmit={submit} className="max-w-2xl space-y-6">

                <SectionCard icon={Megaphone} title="Detail Pengumuman">

                    <div className="space-y-5">

                        {/* EVENT */}
                        <div>
                            <label className={labelClass}>
                                <CalendarDays className="w-3 h-3" />
                                Event
                            </label>

                            <select
                                className={inputClass}
                                value={data.event_id}
                                onChange={e => setData('event_id', e.target.value)}
                            >
                                <option value="">Pilih Event</option>
                                {events.map(ev => (
                                    <option key={ev.id} value={ev.id}>{ev.title}</option>
                                ))}
                            </select>

                            <FieldError msg={errors.event_id} />
                        </div>

                        {/* TITLE */}
                        <div>
                            <label className={labelClass}>
                                <FileText className="w-3 h-3" />
                                Judul
                            </label>

                            <input
                                className={inputClass}
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Judul pengumuman..."
                            />

                            <FieldError msg={errors.title} />
                        </div>

                        {/* CONTENT */}
                        <div>
                            <label className={labelClass}>
                                <FileText className="w-3 h-3" />
                                Isi
                            </label>

                            <textarea
                                rows={5}
                                className={inputClass}
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                placeholder="Isi pengumuman..."
                            />

                            <FieldError msg={errors.content} />
                        </div>

                        {/* TYPE */}
                        <div>
                            <label className={labelClass}>
                                <Tag className="w-3 h-3" />
                                Tipe
                            </label>

                            <div className="flex gap-2 flex-wrap">
                                {TYPE_OPTS.map(opt => {
                                    const Icon = opt.icon;
                                    const active = data.type === opt.value;

                                    return (
                                        <label key={opt.value}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold cursor-pointer
                                            ${active ? opt.active : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                                            
                                            <input
                                                type="radio"
                                                value={opt.value}
                                                checked={active}
                                                onChange={() => setData('type', opt.value)}
                                                className="hidden"
                                            />

                                            <Icon className="w-3.5 h-3.5" />
                                            {opt.label}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* PUBLISH */}
                        <div className="flex items-center gap-4 pt-4 border-t">

                            <button
                                type="button"
                                onClick={() => setData('is_published', !data.is_published)}
                                className={`w-12 h-6 rounded-full flex items-center px-1 transition
                                    ${data.is_published ? 'bg-indigo-600' : 'bg-gray-300'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full shadow transition
                                    ${data.is_published ? 'translate-x-6' : ''}`} />
                            </button>

                            <span className="text-sm font-semibold text-slate-600">
                                {data.is_published ? 'Dipublikasikan' : 'Draft'}
                            </span>

                        </div>

                    </div>
                </SectionCard>

                {/* ACTION */}
                <div className="flex gap-3">

                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-700 transition"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                        <Save className="w-4 h-4" />
                    </button>

                    <Link
                        href={route('admin.announcements.index')}
                        className="px-6 py-3 border rounded-2xl text-sm font-semibold text-slate-600 hover:text-red-500"
                    >
                        Batal
                    </Link>

                </div>

            </form>
        </AdminLayout>
    );
}