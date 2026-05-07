import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/Assets/logo.png';
import {
    LayoutDashboard, CalendarDays, ClipboardList,
    Trophy, User, LogOut, Menu, X, ChevronRight
} from 'lucide-react';

const navItems = [
    { label: 'Dashboard',   href: 'user.dashboard',           icon: LayoutDashboard },
    { label: 'Event',       href: 'events.index',             icon: CalendarDays    },
    { label: 'Pendaftaran', href: 'user.registrations.index', icon: ClipboardList   },
    { label: 'Hasil',       href: 'user.results.index',       icon: Trophy          },
];

export default function UserLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile]       = useState(true);   // default safe

    useEffect(() => {
        const check = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // Keep sidebar open on desktop by default, closed on mobile
            setSidebarOpen(!mobile);
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <div
            className="flex min-h-screen"
            style={{ background: '#f0f0f8', fontFamily: "'DM Sans', sans-serif" }}
        >
            {/* ── Mobile overlay ── */}
            <AnimatePresence>
                {isMobile && sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* ══════════════════════ SIDEBAR ══════════════════════ */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.aside
                        initial={{ x: -288, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -288, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        /* On desktop: sticky (takes up flow). On mobile: fixed drawer */
                        className={`w-72 flex flex-col h-screen z-50 overflow-hidden shrink-0
                                    ${isMobile ? 'fixed top-0 left-0' : 'sticky top-0'}`}
                        style={{
                            background: 'linear-gradient(170deg, #0f0c29 0%, #302b63 60%, #24243e 100%)',
                            boxShadow: '8px 0 40px rgba(79,70,229,0.25)',
                        }}
                    >
                        {/* Grid texture */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),
                                                  linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)`,
                                backgroundSize: '32px 32px',
                            }} />
                        {/* Purple glow orbs */}
                        <div className="absolute -top-20 -right-10 w-56 h-56 rounded-full pointer-events-none opacity-20"
                            style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }} />
                        <div className="absolute bottom-10 -left-10 w-40 h-40 rounded-full pointer-events-none opacity-15"
                            style={{ background: 'radial-gradient(circle, #a78bfa 0%, transparent 70%)' }} />

                        {/* ── Logo ── */}
                        <div className="relative z-10 flex items-center gap-3 px-6 py-5 shrink-0"
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <motion.div
                                whileHover={{ scale: 1.06, rotate: 3 }}
                                className="w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center p-1.5 shadow-xl"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                                    boxShadow: '0 8px 24px rgba(99,102,241,0.5)',
                                }}
                            >
                                <div className="w-full h-full bg-white/90 rounded-xl flex items-center justify-center">
                                    <img src={Logo} className="w-6 h-6 object-contain" alt="Logo" />
                                </div>
                            </motion.div>
                            <div className="flex-1 min-w-0">
                                <h1 className="font-black text-white text-sm leading-tight tracking-tight">
                                    Lomba Layangan
                                </h1>
                                <p className="text-indigo-300/70 text-xs font-medium mt-0.5">Portal Peserta</p>
                            </div>
                            {/* Close — mobile drawer */}
                            {isMobile && (
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-xl shrink-0"
                                    style={{ background: 'rgba(99,102,241,0.2)', color: '#c7d2fe' }}
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>

                        {/* ── Nav ── */}
                        <nav className="relative z-10 flex-1 px-3 py-5 space-y-1 overflow-y-auto">
                            <p className="text-indigo-400/50 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">
                                Menu Utama
                            </p>
                            {navItems.map((item, i) => {
                                const active = route().current(item.href);
                                return (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: -16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <Link
                                            href={route(item.href)}
                                            onClick={() => isMobile && setSidebarOpen(false)}
                                            className="relative flex items-center gap-3.5 px-4 py-3.5 rounded-2xl
                                                       text-sm font-semibold transition-all duration-200 group overflow-hidden"
                                            style={active ? {
                                                background: 'linear-gradient(135deg, rgba(99,102,241,0.35), rgba(124,58,237,0.25))',
                                                color: '#fff',
                                                boxShadow: 'inset 0 0 0 1px rgba(99,102,241,0.4)',
                                            } : { color: 'rgba(199,210,254,0.7)' }}
                                        >
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                style={{ background: 'rgba(99,102,241,0.12)' }}
                                            />
                                            <div className="relative z-10 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
                                                style={active ? {
                                                    background: 'rgba(99,102,241,0.5)',
                                                    boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                                                } : { background: 'rgba(255,255,255,0.06)' }}>
                                                <item.icon size={17} />
                                            </div>
                                            <span className="relative z-10">{item.label}</span>
                                            {active && (
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full"
                                                    style={{ background: '#818cf8' }}
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>

                        {/* ── User section ── */}
                        <div className="relative z-10 px-3 py-4 shrink-0"
                            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            {/* Profile card */}
                            <div className="flex items-center gap-3 px-3 py-3 rounded-2xl mb-2"
                                style={{ background: 'rgba(255,255,255,0.04)' }}>
                                <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center
                                                font-black text-white text-sm"
                                    style={{
                                        background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                                        boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                                    }}>
                                    {user?.name?.charAt(0)?.toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-white font-bold text-sm truncate">{user?.name}</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        <p className="text-emerald-400 text-[10px] font-semibold">Peserta Aktif</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-1">
                                <Link href={route('profile.edit')}
                                    onClick={() => isMobile && setSidebarOpen(false)}
                                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl
                                               text-sm font-medium transition-all duration-200"
                                    style={{ color: 'rgba(199,210,254,0.7)' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(199,210,254,0.7)'}
                                >
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                        style={{ background: 'rgba(255,255,255,0.06)' }}>
                                        <User size={14} />
                                    </div>
                                    Edit Profil
                                    <ChevronRight size={13} className="ml-auto opacity-40" />
                                </Link>

                                <button onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl
                                               text-sm font-medium transition-all duration-200"
                                    style={{ color: 'rgba(252,165,165,0.7)' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#fca5a5'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(252,165,165,0.7)'}
                                >
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                        style={{ background: 'rgba(239,68,68,0.12)' }}>
                                        <LogOut size={14} />
                                    </div>
                                    Keluar
                                </button>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* ══════════════════════ MAIN ══════════════════════ */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* ── Topbar ── */}
                <motion.header
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="sticky top-0 z-30 flex items-center gap-3 px-4 md:px-6 py-3"
                    style={{
                        background: 'rgba(240,240,248,0.92)',
                        backdropFilter: 'blur(20px)',
                        borderBottom: '1px solid rgba(99,102,241,0.1)',
                        boxShadow: '0 4px 24px rgba(79,70,229,0.06)',
                    }}
                >
                    {/* Toggle sidebar */}
                    <motion.button
                        onClick={() => setSidebarOpen(v => !v)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0 transition-all duration-200"
                        style={{
                            background: 'white',
                            border: '1px solid rgba(99,102,241,0.15)',
                            boxShadow: '0 2px 8px rgba(99,102,241,0.1)',
                            color: '#4f46e5',
                        }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={sidebarOpen ? 'x' : 'menu'}
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {sidebarOpen && !isMobile ? <X size={18} /> : <Menu size={18} />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>

                    {/* Breadcrumb */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full"
                                style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }} />
                            <span className="text-xs font-semibold hidden sm:block" style={{ color: '#6366f1' }}>
                                Portal Peserta
                            </span>
                        </div>
                        <p className="text-sm font-black text-gray-800 truncate leading-tight">
                            Halo, {user?.name?.split(' ')[0]} 👋
                        </p>
                    </div>

                    {/* Avatar */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm shrink-0 cursor-pointer"
                        style={{
                            background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                            boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                        }}
                        title={user?.name}
                    >
                        {user?.name?.charAt(0)?.toUpperCase()}
                    </motion.div>
                </motion.header>

                {/* ── Page content ── */}
                <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}