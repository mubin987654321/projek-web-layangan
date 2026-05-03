import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/Assets/logo.png';
import {
    LayoutDashboard, ClipboardCheck, LogOut,
    PanelLeftClose, PanelLeftOpen, CheckCircle, AlertCircle,
    Star
} from "lucide-react";

const navItems = [
    { label: 'Dashboard', href: 'jury.dashboard',    icon: LayoutDashboard },
    { label: 'Penilaian', href: 'jury.events.index', icon: ClipboardCheck  },
];

// Animated scanning line
function ScanLine() {
    return (
        <motion.div
            className="absolute left-0 right-0 h-px pointer-events-none z-0"
            style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.4), transparent)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
        />
    );
}

export default function JuryLayout({ children, header }) {
    const { auth = { user: null }, flash = {} } = usePage().props;
    const [collapsed, setCollapsed]   = useState(false);
    const [flashVisible, setFlash]    = useState(false);
    const [activePulse, setActivePulse] = useState(null);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setFlash(true);
            const t = setTimeout(() => setFlash(false), 4500);
            return () => clearTimeout(t);
        }
    }, [flash?.success, flash?.error]);

    // Find active nav for pulse animation
    useEffect(() => {
        const active = navItems.find(item => route().current(item.href));
        setActivePulse(active?.href ?? null);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden" style={{ background: '#060614', fontFamily: "'DM Sans', sans-serif" }}>

            {/* ══════════════════ SIDEBAR ══════════════════ */}
            <div className="relative shrink-0 flex" style={{ zIndex: 40 }}>
                <motion.aside
                    animate={{ width: collapsed ? 68 : 256 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex flex-col h-screen overflow-hidden"
                    style={{
                        background: 'linear-gradient(170deg, #080618 0%, #0e0c2e 40%, #080618 100%)',
                        borderRight: '1px solid rgba(59,130,246,0.12)',
                        boxShadow: '4px 0 40px rgba(59,130,246,0.08)',
                    }}
                >
                    {/* Scan line animation */}
                    <ScanLine />

                    {/* Top glow */}
                    <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(59,130,246,0.18) 0%, transparent 70%)' }} />
                    {/* Grid */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),
                                              linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`,
                            backgroundSize: '28px 28px',
                        }} />

                    {/* ── Logo ── */}
                    <div className={`relative z-10 flex items-center py-5 shrink-0 transition-all duration-300
                                     ${collapsed ? 'px-4 justify-center' : 'px-5 gap-3.5'}`}
                        style={{ borderBottom: '1px solid rgba(59,130,246,0.1)' }}>
                        <motion.div
                            whileHover={{ scale: 1.06 }}
                            className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center p-1.5"
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                boxShadow: '0 0 20px rgba(59,130,246,0.5)',
                            }}>
                            <div className="w-full h-full bg-white/90 rounded-lg flex items-center justify-center">
                                <img src={Logo} className="w-5 h-5 object-contain" alt="Logo" />
                            </div>
                        </motion.div>

                        <AnimatePresence>
                            {!collapsed && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}
                                    className="min-w-0">
                                    <p className="font-black text-white text-sm leading-tight tracking-tight">Lomba Layangan</p>
                                    <div className="flex items-center gap-1 mt-0.5">
                                        <Star size={9} style={{ color: '#60a5fa' }} />
                                        <p className="text-[10px] font-bold" style={{ color: '#60a5fa' }}>Panel Juri</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ── Nav ── */}
                    <nav className="relative z-10 flex-1 px-3 py-5 space-y-1 overflow-hidden">
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="text-[10px] font-bold uppercase tracking-widest px-3 mb-3"
                                    style={{ color: 'rgba(59,130,246,0.4)' }}>Menu</motion.p>
                            )}
                        </AnimatePresence>

                        {navItems.map((item, i) => {
                            const active = route().current(item.href);
                            return (
                                <motion.div key={item.href}
                                    initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.35 }}>
                                    <Link href={route(item.href)}
                                        className={`relative flex items-center rounded-xl transition-all duration-200 overflow-hidden
                                                    ${collapsed ? 'justify-center py-3.5 px-0' : 'gap-3.5 px-4 py-3.5'}`}
                                        style={active ? {
                                            background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(99,102,241,0.15))',
                                            boxShadow: 'inset 0 0 0 1px rgba(59,130,246,0.3)',
                                            color: '#bfdbfe',
                                        } : { color: 'rgba(148,163,184,0.65)' }}
                                        onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(59,130,246,0.08)'; e.currentTarget.style.color = '#bfdbfe'; } }}
                                        onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(148,163,184,0.65)'; } }}
                                    >
                                        {active && (
                                            <motion.div layoutId="juryActiveBar"
                                                className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full"
                                                style={{ background: 'linear-gradient(to bottom, #60a5fa, #818cf8)' }} />
                                        )}

                                        <div className="relative w-8 h-8 flex items-center justify-center rounded-lg shrink-0"
                                            style={active ? {
                                                background: 'rgba(59,130,246,0.25)',
                                                boxShadow: '0 0 14px rgba(59,130,246,0.25)',
                                            } : { background: 'rgba(255,255,255,0.04)' }}>
                                            <item.icon size={16} />
                                            {active && (
                                                <motion.div className="absolute inset-0 rounded-lg"
                                                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    style={{ background: 'rgba(59,130,246,0.2)' }} />
                                            )}
                                        </div>

                                        <AnimatePresence>
                                            {!collapsed && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.18 }}
                                                    className="text-sm font-semibold whitespace-nowrap">
                                                    {item.label}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </nav>

                    {/* ── User + Logout ── */}
                    <div className="relative z-10 px-3 py-4 space-y-2 shrink-0"
                        style={{ borderTop: '1px solid rgba(59,130,246,0.08)' }}>

                        <AnimatePresence>
                            {!collapsed && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
                                    className="overflow-hidden">
                                    <div className="flex items-center gap-3 px-3 py-3 rounded-xl mb-2"
                                        style={{
                                            background: 'rgba(59,130,246,0.06)',
                                            border: '1px solid rgba(59,130,246,0.12)',
                                        }}>
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm shrink-0"
                                            style={{
                                                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                                boxShadow: '0 0 12px rgba(59,130,246,0.4)',
                                            }}>
                                            {auth.user?.name?.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-white text-sm font-bold truncate">{auth.user?.name}</p>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                <p className="text-[10px] font-semibold text-blue-400">Juri Senior</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Link href={route('logout')} method="post" as="button" className="w-full">
                            <div className={`flex items-center rounded-xl transition-all duration-200 cursor-pointer
                                              ${collapsed ? 'justify-center py-3.5 px-0' : 'gap-3.5 px-4 py-3'}`}
                                style={{ color: 'rgba(252,165,165,0.55)' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#fca5a5'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(252,165,165,0.55)'; }}>
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg shrink-0"
                                    style={{ background: 'rgba(239,68,68,0.1)' }}>
                                    <LogOut size={15} />
                                </div>
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="text-sm font-semibold">Keluar</motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                        </Link>
                    </div>
                </motion.aside>

                {/* Collapse button */}
                <motion.button
                    onClick={() => setCollapsed(v => !v)}
                    whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
                    className="absolute top-[72px] -right-3.5 w-7 h-7 rounded-full flex items-center justify-center z-50"
                    style={{
                        background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                        boxShadow: '0 0 16px rgba(59,130,246,0.55)',
                        border: '2px solid rgba(255,255,255,0.12)',
                    }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={collapsed ? 'open' : 'close'}
                            initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
                            {collapsed
                                ? <PanelLeftOpen size={12} className="text-white" />
                                : <PanelLeftClose size={12} className="text-white" />}
                        </motion.div>
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* ══════════════════ MAIN ══════════════════ */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0"
                style={{ background: 'linear-gradient(145deg, #080618 0%, #0c0a24 50%, #060614 100%)' }}>

                {/* Topbar */}
                <motion.header
                    initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center justify-between px-8 py-4 shrink-0"
                    style={{
                        background: 'rgba(8,6,24,0.85)',
                        backdropFilter: 'blur(24px)',
                        borderBottom: '1px solid rgba(59,130,246,0.1)',
                        boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
                    }}>
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-8 rounded-full"
                            style={{ background: 'linear-gradient(to bottom, #3b82f6, #6366f1)' }} />
                        <div>
                            <h1 className="text-lg font-black text-white tracking-tight">{header}</h1>
                            <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'rgba(59,130,246,0.6)' }}>
                                Panel Penilaian Juri
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                        style={{
                            background: 'rgba(59,130,246,0.08)',
                            border: '1px solid rgba(59,130,246,0.15)',
                        }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                boxShadow: '0 0 12px rgba(59,130,246,0.4)',
                            }}>
                            {auth.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-sm font-bold text-white leading-none">{auth.user?.name}</p>
                            <div className="flex items-center gap-1 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                <p className="text-[10px] font-semibold text-blue-400">Juri Senior</p>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* Flash */}
                <AnimatePresence>
                    {flashVisible && (flash?.success || flash?.error) && (
                        <motion.div
                            initial={{ opacity: 0, y: -14, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -14, scale: 0.97 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="mx-8 mt-4 shrink-0">
                            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl"
                                style={flash?.success ? {
                                    background: 'rgba(16,185,129,0.1)',
                                    border: '1px solid rgba(16,185,129,0.25)',
                                } : {
                                    background: 'rgba(239,68,68,0.1)',
                                    border: '1px solid rgba(239,68,68,0.25)',
                                }}>
                                {flash?.success
                                    ? <CheckCircle size={17} className="text-emerald-400 shrink-0" />
                                    : <AlertCircle size={17} className="text-red-400 shrink-0" />}
                                <p className="text-sm font-semibold" style={{ color: flash?.success ? '#6ee7b7' : '#fca5a5' }}>
                                    {flash?.success || flash?.error}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <motion.div
                        key={header}
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}