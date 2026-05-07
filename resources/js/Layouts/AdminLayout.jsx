import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/Assets/logo.png';
import {
    LayoutDashboard, CalendarDays, Users, ClipboardList, Image, Megaphone,
    BarChart3, LogOut, ChevronLeft, ChevronRight, Clock, CheckCircle,
    AlertCircle, Menu, X
} from "lucide-react";

const navItems = [
    { label: 'Dashboard',    href: 'admin.dashboard',            icon: LayoutDashboard },
    { label: 'Event',        href: 'admin.events.index',         icon: CalendarDays    },
    { label: 'Pengguna',     href: 'admin.users.index',          icon: Users           },
    { label: 'Pendaftaran',  href: 'admin.registrations.index',  icon: ClipboardList   },
    { label: 'Karya',        href: 'admin.submissions.index',    icon: Image           },
    { label: 'Pengumuman',   href: 'admin.announcements.index',  icon: Megaphone       },
    { label: 'Laporan',      href: 'admin.reports.index',        icon: BarChart3       },
];

export default function AdminLayout({ children, header }) {
    const { auth = {}, flash = {} } = usePage().props;

    const [isMobile, setIsMobile]   = useState(false);
    const [collapsed, setCollapsed] = useState(false);   // desktop only
    const [drawerOpen, setDrawer]   = useState(false);   // mobile only
    const [time, setTime]           = useState(new Date());
    const [showFlash, setShowFlash] = useState(false);

    /* ── Detect mobile ── */
    useEffect(() => {
        const check = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) setDrawer(false);
        };
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    /* ── Clock ── */
    useEffect(() => {
        const i = setInterval(() => setTime(new Date()), 30000);
        return () => clearInterval(i);
    }, []);

    /* ── Flash ── */
    useEffect(() => {
        if (flash.success || flash.error) {
            setShowFlash(true);
            const t = setTimeout(() => setShowFlash(false), 5000);
            return () => clearTimeout(t);
        }
    }, [flash.success, flash.error]);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    /* ── Shared sidebar width (desktop) ── */
    const desktopWidth = collapsed ? 72 : 260;

    /* ══════════════════════════════════════
       SIDEBAR CONTENT (shared between
       desktop aside & mobile drawer)
    ══════════════════════════════════════ */
    const SidebarContent = ({ isDrawer = false }) => (
        <>
            {/* Ambient glow top */}
            <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% -20%, rgba(99,102,241,0.2) 0%, transparent 70%)' }} />
            {/* Grid texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),
                                      linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`,
                    backgroundSize: '32px 32px',
                }} />

            {/* ── Logo ── */}
            <div className="relative z-10 flex items-center px-5 py-5 shrink-0"
                style={{ borderBottom: '1px solid rgba(99,102,241,0.1)' }}>
                <motion.div
                    whileHover={{ scale: 1.06 }}
                    className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center p-1.5"
                    style={{
                        background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                        boxShadow: '0 0 20px rgba(99,102,241,0.6)',
                    }}
                >
                    <div className="w-full h-full bg-white/90 rounded-lg flex items-center justify-center">
                        <img src={Logo} className="w-5 h-5 object-contain" alt="Logo" />
                    </div>
                </motion.div>

                <AnimatePresence>
                    {(isDrawer || !collapsed) && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="ml-3 min-w-0 flex-1"
                        >
                            <p className="font-black text-white text-sm leading-tight tracking-tight">Admin Panel</p>
                            <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'rgba(99,102,241,0.7)' }}>Management System</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Close button — mobile drawer only */}
                {isDrawer && (
                    <button
                        onClick={() => setDrawer(false)}
                        className="ml-auto w-8 h-8 flex items-center justify-center rounded-xl shrink-0 transition-colors"
                        style={{ background: 'rgba(99,102,241,0.15)', color: '#c7d2fe' }}
                    >
                        <X size={15} />
                    </button>
                )}
            </div>

            {/* ── Nav ── */}
            <nav className="relative z-10 flex-1 px-3 py-4 space-y-0.5 overflow-y-auto overflow-x-hidden">
                <AnimatePresence>
                    {(isDrawer || !collapsed) && (
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="text-[10px] font-bold uppercase tracking-widest px-3 mb-3"
                            style={{ color: 'rgba(99,102,241,0.4)' }}>
                            Navigasi
                        </motion.p>
                    )}
                </AnimatePresence>

                {navItems.map((item, i) => {
                    const active = route().current(item.href);
                    return (
                        <motion.div key={item.href}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                            <Link href={route(item.href)}
                                onClick={() => isDrawer && setDrawer(false)}
                                className={`relative flex items-center rounded-xl transition-all duration-200 group overflow-hidden
                                            ${(!isDrawer && collapsed) ? 'justify-center px-0 py-3.5' : 'gap-3.5 px-4 py-3'}`}
                                style={active ? {
                                    background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(124,58,237,0.15))',
                                    boxShadow: 'inset 0 0 0 1px rgba(99,102,241,0.35), 0 4px 16px rgba(99,102,241,0.15)',
                                    color: '#c7d2fe',
                                } : { color: 'rgba(148,163,184,0.7)' }}
                                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; e.currentTarget.style.color = '#c7d2fe'; } }}
                                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(148,163,184,0.7)'; } }}
                            >
                                {active && (
                                    <motion.div layoutId="adminActiveNav"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full"
                                        style={{ background: 'linear-gradient(to bottom, #818cf8, #a78bfa)' }} />
                                )}

                                <div className={`relative shrink-0 flex items-center justify-center rounded-lg transition-all duration-200
                                                  ${(!isDrawer && collapsed) ? 'w-9 h-9 rounded-xl' : 'w-8 h-8'}`}
                                    style={active ? {
                                        background: 'rgba(99,102,241,0.3)',
                                        boxShadow: '0 0 12px rgba(99,102,241,0.3)',
                                    } : { background: 'rgba(255,255,255,0.04)' }}>
                                    <item.icon size={16} />
                                    {active && (
                                        <motion.div className="absolute inset-0 rounded-lg"
                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            style={{ background: 'rgba(99,102,241,0.2)' }} />
                                    )}
                                </div>

                                <AnimatePresence>
                                    {(isDrawer || !collapsed) && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.2 }}
                                            className="text-sm font-semibold tracking-wide truncate">
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {active && (isDrawer || !collapsed) && (
                                    <motion.div className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{ background: '#818cf8' }} />
                                )}
                            </Link>
                        </motion.div>
                    );
                })}
            </nav>

            {/* ── Logout ── */}
            <div className="relative z-10 px-3 py-4 shrink-0"
                style={{ borderTop: '1px solid rgba(99,102,241,0.08)' }}>
                <button onClick={handleLogout} className="w-full">
                    <div className={`flex items-center rounded-xl transition-all duration-200 cursor-pointer
                                      ${(!isDrawer && collapsed) ? 'justify-center py-3.5 px-0' : 'gap-3.5 px-4 py-3'}`}
                        style={{ color: 'rgba(252,165,165,0.6)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#fca5a5'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(252,165,165,0.6)'; }}
                    >
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg shrink-0"
                            style={{ background: 'rgba(239,68,68,0.1)' }}>
                            <LogOut size={15} />
                        </div>
                        <AnimatePresence>
                            {(isDrawer || !collapsed) && (
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="text-sm font-semibold">Keluar</motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </button>
            </div>
        </>
    );

    return (
        <div className="h-screen flex overflow-hidden" style={{ background: '#070714', fontFamily: "'DM Sans', sans-serif" }}>

            {/* ══════════ MOBILE OVERLAY ══════════ */}
            <AnimatePresence>
                {isMobile && drawerOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                        onClick={() => setDrawer(false)}
                    />
                )}
            </AnimatePresence>

            {/* ══════════ MOBILE DRAWER ══════════ */}
            <AnimatePresence>
                {isMobile && drawerOpen && (
                    <motion.aside
                        initial={{ x: -280, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -280, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-0 left-0 w-72 h-screen flex flex-col z-50 overflow-hidden"
                        style={{
                            background: 'linear-gradient(170deg, #0d0b2b 0%, #120e3a 50%, #0d0b2b 100%)',
                            borderRight: '1px solid rgba(99,102,241,0.12)',
                            boxShadow: '8px 0 40px rgba(79,70,229,0.3)',
                        }}
                    >
                        <SidebarContent isDrawer={true} />
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* ══════════ DESKTOP SIDEBAR ══════════ */}
            {!isMobile && (
                <motion.aside
                    animate={{ width: desktopWidth }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-col h-screen shrink-0 overflow-hidden z-40"
                    style={{
                        background: 'linear-gradient(170deg, #0d0b2b 0%, #120e3a 50%, #0d0b2b 100%)',
                        borderRight: '1px solid rgba(99,102,241,0.12)',
                        boxShadow: '4px 0 32px rgba(79,70,229,0.15)',
                    }}
                >
                    <SidebarContent isDrawer={false} />

                    {/* Collapse toggle — desktop only */}
                    <motion.button
                        onClick={() => setCollapsed(v => !v)}
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
                        className="absolute top-[76px] -right-3.5 w-7 h-7 rounded-full flex items-center justify-center z-50 transition-all duration-200"
                        style={{
                            background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                            boxShadow: '0 0 16px rgba(99,102,241,0.5)',
                            border: '2px solid rgba(255,255,255,0.15)',
                        }}>
                        <AnimatePresence mode="wait">
                            <motion.div key={collapsed ? 'r' : 'l'}
                                initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
                                {collapsed
                                    ? <ChevronRight size={12} className="text-white" />
                                    : <ChevronLeft size={12} className="text-white" />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.button>
                </motion.aside>
            )}

            {/* ══════════════════ MAIN ══════════════════ */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0"
                style={{ background: 'linear-gradient(145deg, #0b0920 0%, #0f0d2e 50%, #080720 100%)' }}>

                {/* ── Topbar ── */}
                <motion.header
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-3 px-4 sm:px-6 md:px-8 py-3 md:py-4 shrink-0"
                    style={{
                        background: 'rgba(13,11,43,0.85)',
                        backdropFilter: 'blur(24px)',
                        borderBottom: '1px solid rgba(99,102,241,0.1)',
                        boxShadow: '0 4px 32px rgba(0,0,0,0.3)',
                    }}
                >
                    {/* Hamburger — mobile only */}
                    {isMobile && (
                        <motion.button
                            onClick={() => setDrawer(true)}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0"
                            style={{
                                background: 'rgba(99,102,241,0.15)',
                                border: '1px solid rgba(99,102,241,0.25)',
                                color: '#c7d2fe',
                            }}
                        >
                            <Menu size={18} />
                        </motion.button>
                    )}

                    {/* Page title */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-1 h-8 rounded-full shrink-0"
                            style={{ background: 'linear-gradient(to bottom, #6366f1, #7c3aed)' }} />
                        <div className="min-w-0">
                            <h1 className="text-base md:text-lg font-black text-white tracking-tight truncate">{header}</h1>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <Clock size={10} style={{ color: 'rgba(99,102,241,0.6)' }} />
                                <span className="text-[10px] font-medium hidden sm:block" style={{ color: 'rgba(99,102,241,0.6)' }}>
                                    {time.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </span>
                                <span className="text-[10px] font-medium sm:hidden" style={{ color: 'rgba(99,102,241,0.6)' }}>
                                    {time.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* User info */}
                    <div className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 md:py-2.5 rounded-xl shrink-0"
                        style={{
                            background: 'rgba(99,102,241,0.08)',
                            border: '1px solid rgba(99,102,241,0.15)',
                        }}>
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
                            style={{
                                background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                                boxShadow: '0 0 12px rgba(99,102,241,0.4)',
                            }}>
                            {auth.user?.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-sm font-bold text-white leading-none">{auth.user?.name}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <p className="text-[10px] font-semibold text-emerald-400">Administrator</p>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* ── Flash messages ── */}
                <AnimatePresence>
                    {showFlash && (flash.success || flash.error) && (
                        <motion.div
                            initial={{ opacity: 0, y: -16, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -16, scale: 0.97 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="mx-4 sm:mx-6 md:mx-8 mt-3 md:mt-4 shrink-0"
                        >
                            <div className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-4 rounded-2xl"
                                style={flash.success ? {
                                    background: 'rgba(16,185,129,0.1)',
                                    border: '1px solid rgba(16,185,129,0.25)',
                                    boxShadow: '0 4px 24px rgba(16,185,129,0.1)',
                                } : {
                                    background: 'rgba(239,68,68,0.1)',
                                    border: '1px solid rgba(239,68,68,0.25)',
                                    boxShadow: '0 4px 24px rgba(239,68,68,0.1)',
                                }}>
                                {flash.success
                                    ? <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                                    : <AlertCircle size={16} className="text-red-400 shrink-0" />}
                                <p className="text-xs md:text-sm font-semibold" style={{ color: flash.success ? '#6ee7b7' : '#fca5a5' }}>
                                    {flash.success || flash.error}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Content ── */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pb-10">
                    <motion.div
                        key={header}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}