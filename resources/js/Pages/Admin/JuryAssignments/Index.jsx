import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PlusCircle, Trash2, ToggleLeft,
    ToggleRight, ShieldCheck, Users
} from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0 }
};

const slideIn = {
    hidden: { opacity: 0, x: -25 },
    show: { opacity: 1, x: 0 }
};

export default function JuryAssignmentsIndex({ event, availableJury }) {
    const assignments = event.jury_assignments ?? [];

    const { data, setData, post, processing, reset } = useForm({
        user_id: '',
        category_id: '',
    });

    function assign(e) {
        e.preventDefault();
        post(route('admin.jury.assign', event.id), {
            onSuccess: () => reset()
        });
    }

    function remove(id) {
        if (confirm('Hapus juri?')) {
            router.delete(route('admin.jury.destroy', id));
        }
    }

    function toggle(id) {
        router.patch(route('admin.jury.toggle', id));
    }

    return (
        <AdminLayout header="Manajemen Juri">
            <Head title="Juri" />

            {/* HERO */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-12 p-10 rounded-3xl text-white relative overflow-hidden
                bg-gradient-to-r from-blue-600 via-indigo-700 to-cyan-600 shadow-xl">

                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Users size={22} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black">Penugasan Juri</h1>
                        <p className="text-blue-100">{event.title}</p>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <span className="bg-white/20 px-4 py-2 rounded-xl text-sm font-bold">
                        {assignments.length} Juri
                    </span>
                    <span className="bg-white/10 px-4 py-2 rounded-xl text-sm">
                        {availableJury.length} Tersedia
                    </span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* FORM */}
                <motion.div
                    variants={slideIn}
                    initial="hidden"
                    animate="show"
                    className="xl:col-span-2 bg-white rounded-3xl p-8 shadow border">

                    <div className="flex items-center gap-3 mb-6">
                        <PlusCircle className="text-blue-600" />
                        <h2 className="text-xl font-bold">Tambah Juri</h2>
                    </div>

                    <form onSubmit={assign} className="grid md:grid-cols-2 gap-6">

                        <select
                            className="p-4 rounded-xl border"
                            value={data.user_id}
                            onChange={e => setData('user_id', e.target.value)}>
                            <option value="">Pilih Juri</option>
                            {availableJury.map(j => (
                                <option key={j.id} value={j.id}>{j.name}</option>
                            ))}
                        </select>

                        <select
                            className="p-4 rounded-xl border"
                            value={data.category_id}
                            onChange={e => setData('category_id', e.target.value)}>
                            <option value="">Semua Kategori</option>
                            {event.categories?.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>

                        <button
                            disabled={!data.user_id || processing}
                            className="md:col-span-2 py-4 rounded-xl bg-blue-600 text-white font-bold
                            hover:bg-blue-700 transition disabled:opacity-40">
                            {processing ? 'Loading...' : 'Tambah Juri'}
                        </button>

                    </form>
                </motion.div>

                {/* LIST */}
                <motion.div
                    variants={slideIn}
                    initial="hidden"
                    animate="show"
                    className="bg-white rounded-3xl p-6 shadow border">

                    <div className="flex items-center gap-3 mb-6">
                        <ShieldCheck className="text-blue-600" />
                        <h2 className="font-bold">Daftar Juri</h2>
                    </div>

                    {assignments.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                            Belum ada juri
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[500px] overflow-y-auto">
                            <AnimatePresence>
                                {assignments.map(a => (
                                    <motion.div
                                        key={a.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="p-4 rounded-xl border flex justify-between items-center">

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-lg font-bold">
                                                {a.jury?.name?.charAt(0)}
                                            </div>

                                            <div>
                                                <p className="font-bold">{a.jury?.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {a.category?.name ?? 'Semua'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">

                                            <button onClick={() => toggle(a.id)}
                                                className="p-2 bg-green-100 rounded-lg">
                                                {a.is_active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                                            </button>

                                            <button onClick={() => remove(a.id)}
                                                className="p-2 bg-red-100 rounded-lg">
                                                <Trash2 size={18} />
                                            </button>

                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}

                </motion.div>
            </div>
        </AdminLayout>
    );
}