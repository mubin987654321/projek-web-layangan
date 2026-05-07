import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users, Filter, Trash2, ChevronDown, Search, Calendar
} from 'lucide-react';

const ROLE_COLOR = {
    admin: { bg: 'bg-red-100',  text: 'text-red-700',  dot: 'bg-red-400'  },
    jury:  { bg: 'bg-teal-100', text: 'text-teal-700', dot: 'bg-teal-400' },
    user:  { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-400' },
};

const ROLE_LABEL = { admin: 'Admin', jury: 'Juri', user: 'User' };

export default function UsersIndex({ users, filters }) {
    const [search, setSearch]         = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role  || '');

    function applyFilter() {
        router.get(route('admin.users.index'),
            { search, role: roleFilter },
            { preserveState: true }
        );
    }

    function handleKey(e) {
        if (e.key === 'Enter') applyFilter();
    }

    function changeRole(userId, newRole) {
        if (confirm(`Ubah role menjadi "${newRole}"?`)) {
            router.patch(route('admin.users.role', userId), { role: newRole });
        }
    }

    function deleteUser(user) {
        if (confirm(`Hapus ${user.name}?`)) {
            router.delete(route('admin.users.destroy', user.id));
        }
    }

    return (
        <AdminLayout header="Manajemen Pengguna">
            <Head title="Pengguna" />

            {/* ── HERO ── */}
            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl
                           bg-gradient-to-br from-slate-800 via-indigo-900 to-blue-900
                           p-5 sm:p-6 mb-5 sm:mb-6 text-white"
            >
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),
                                          linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`,
                        backgroundSize: '32px 32px',
                    }} />

                <div className="relative z-10 flex justify-between items-center gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Users className="w-4 h-4 text-indigo-300" />
                            <span className="text-indigo-300 text-xs sm:text-sm font-medium">
                                Panel Administrator
                            </span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-black">
                            Manajemen Pengguna 👥
                        </h1>
                        <p className="text-slate-300 text-xs sm:text-sm mt-1">
                            Total{' '}
                            <span className="font-bold text-white">{users.total}</span>
                            {' '}pengguna terdaftar.
                        </p>
                    </div>
                    <div className="text-4xl sm:text-5xl hidden sm:block select-none">👤</div>
                </div>
            </motion.div>

            {/* ── FILTER ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 mb-5 sm:mb-6"
            >
                <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                        <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                    </div>
                    <h2 className="font-bold text-gray-800 text-sm sm:text-base">Filter Pengguna</h2>
                </div>

                <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-end">
                    {/* Search */}
                    <div className="flex-1">
                        <label className="text-xs font-bold text-gray-500 mb-1 block">Cari</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm
                                           bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400
                                           transition-all duration-200"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyDown={handleKey}
                                placeholder="Nama / email..."
                            />
                        </div>
                    </div>

                    {/* Role */}
                    <div className="sm:w-44">
                        <label className="text-xs font-bold text-gray-500 mb-1 block">Role</label>
                        <div className="relative">
                            <select
                                className="w-full appearance-none pl-4 pr-8 py-2.5 border border-gray-200 rounded-xl
                                           text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400
                                           transition-all duration-200"
                                value={roleFilter}
                                onChange={e => setRoleFilter(e.target.value)}
                            >
                                <option value="">Semua Role</option>
                                <option value="admin">Admin</option>
                                <option value="jury">Juri</option>
                                <option value="user">User</option>
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        onClick={applyFilter}
                        className="w-full sm:w-auto bg-gradient-to-br from-indigo-600 to-blue-600
                                   text-white px-5 py-2.5 rounded-xl text-sm font-bold
                                   hover:from-indigo-700 hover:to-blue-700 transition-all duration-200
                                   shadow-md shadow-indigo-200 active:scale-95"
                    >
                        Terapkan
                    </button>
                </div>
            </motion.div>

            {/* ── TABLE / CARDS ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
                {/* Header */}
                <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-gray-800 text-sm sm:text-base">
                        <Users className="w-4 h-4 text-indigo-600" />
                        Daftar Pengguna
                    </div>
                    <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                        {users.data.length} ditampilkan
                    </span>
                </div>

                {/* ── DESKTOP TABLE (md+) ── */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Pengguna</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Registrasi</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Karya</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Bergabung</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.data.map(user => {
                                const rc = ROLE_COLOR[user.role] ?? ROLE_COLOR.user;
                                return (
                                    <tr key={user.id} className="hover:bg-indigo-50/40 transition-colors duration-150">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                                                                  font-black text-white text-sm shrink-0
                                                                  bg-gradient-to-br from-indigo-500 to-blue-600`}>
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{user.name}</p>
                                                    <p className="text-xs text-gray-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="relative inline-block">
                                                <select
                                                    value={user.role}
                                                    onChange={e => changeRole(user.id, e.target.value)}
                                                    className={`appearance-none text-xs font-bold px-3 py-1.5 pr-7 rounded-full
                                                                cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-indigo-400
                                                                ${rc.bg} ${rc.text}`}
                                                >
                                                    <option value="admin">Admin</option>
                                                    <option value="jury">Juri</option>
                                                    <option value="user">User</option>
                                                </select>
                                                <ChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none ${rc.text}`} />
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl
                                                             bg-indigo-50 text-indigo-700 text-xs font-bold">
                                                {user.registrations_count}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl
                                                             bg-purple-50 text-purple-700 text-xs font-bold">
                                                {user.submissions_count}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                <Calendar className="w-3.5 h-3.5 text-gray-300" />
                                                {new Date(user.created_at).toLocaleDateString('id-ID')}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => deleteUser(user)}
                                                className="flex items-center gap-1.5 text-xs font-semibold
                                                           text-red-400 hover:text-white hover:bg-red-500
                                                           px-3 py-1.5 rounded-xl transition-all duration-200"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* ── MOBILE CARDS (< md) ── */}
                <div className="md:hidden divide-y divide-gray-100">
                    {users.data.map(user => {
                        const rc = ROLE_COLOR[user.role] ?? ROLE_COLOR.user;
                        return (
                            <div key={user.id} className="p-4 hover:bg-indigo-50/30 transition-colors">
                                {/* Top row: avatar + name + role selector */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center
                                                    font-black text-white text-sm shrink-0
                                                    bg-gradient-to-br from-indigo-500 to-blue-600">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-gray-800 text-sm truncate">{user.name}</p>
                                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                    </div>

                                    {/* Role select */}
                                    <div className="relative shrink-0">
                                        <select
                                            value={user.role}
                                            onChange={e => changeRole(user.id, e.target.value)}
                                            className={`appearance-none text-xs font-bold px-3 py-1.5 pr-6 rounded-full
                                                        cursor-pointer border-0 focus:outline-none
                                                        ${rc.bg} ${rc.text}`}
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="jury">Juri</option>
                                            <option value="user">User</option>
                                        </select>
                                        <ChevronDown className={`absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none ${rc.text}`} />
                                    </div>
                                </div>

                                {/* Bottom row: stats + date + delete */}
                                <div className="mt-3 flex items-center gap-2 flex-wrap">
                                    <span className="flex items-center gap-1 text-xs text-indigo-600
                                                     bg-indigo-50 px-2.5 py-1 rounded-full font-semibold">
                                        {user.registrations_count} Registrasi
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-purple-600
                                                     bg-purple-50 px-2.5 py-1 rounded-full font-semibold">
                                        {user.submissions_count} Karya
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(user.created_at).toLocaleDateString('id-ID')}
                                    </span>
                                    <button
                                        onClick={() => deleteUser(user)}
                                        className="flex items-center gap-1 text-xs font-semibold
                                                   text-red-400 hover:text-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty state */}
                {users.data.length === 0 && (
                    <div className="py-16 text-center">
                        <div className="text-4xl mb-3">🔍</div>
                        <p className="text-gray-500 font-semibold">Tidak ada pengguna ditemukan.</p>
                        <p className="text-gray-400 text-sm mt-1">Coba ubah filter pencarian.</p>
                    </div>
                )}

                {/* Pagination hint */}
                {users.total > users.per_page && (
                    <div className="px-4 sm:px-6 py-3 border-t border-gray-100 bg-gray-50
                                    text-xs text-gray-400 text-center">
                        Menampilkan {users.data.length} dari {users.total} pengguna
                    </div>
                )}
            </motion.div>
        </AdminLayout>
    );
}