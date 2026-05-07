import JuryLayout from '@/Layouts/JuryLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Save, ChevronRight, Award, ArrowLeft } from 'lucide-react';

/* ════════════════════════════════════════
   SCORE INPUT
════════════════════════════════════════ */
function ScoreInput({ value = 0, max, onChange }) {
    // raw = string yang tampil di input; boleh kosong saat user sedang mengetik
    const [raw, setRaw] = useState(value === 0 ? '' : String(value));

    // Reset saat parent mengganti submission (value kembali ke 0)
    useEffect(() => {
        setRaw(value === 0 ? '' : String(value));
    }, [value]);

    function handleChange(e) {
        const str = e.target.value;

        // Izinkan string kosong (user sedang menghapus)
        if (str === '') {
            setRaw('');
            onChange(0);
            return;
        }

        // Buang karakter non-angka & leading zeros
        const cleaned = str.replace(/[^0-9]/g, '').replace(/^0+(\d)/, '$1');
        if (cleaned === '') {
            setRaw('');
            onChange(0);
            return;
        }

        const num = Math.min(max, Math.max(0, Number(cleaned)));
        setRaw(String(num));
        onChange(num);
    }

    function handleBlur(e) {
        // Saat user meninggalkan input kosong → tampilkan 0
        if (raw === '') setRaw('0');
        e.target.style.boxShadow = '0 2px 8px rgba(99,102,241,0.1)';
    }

    function handleFocus(e) {
        // Saat difokus, select semua teks agar mudah diganti
        e.target.select();
        e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.2)';
    }

    const displayNum = raw === '' ? 0 : Number(raw);
    const pct = max > 0 ? Math.round((displayNum / max) * 100) : 0;
    const isHigh = displayNum / max >= 0.8;

    return (
        <div className="flex items-center gap-2 sm:gap-3">
            <input
                type="text"          /* text bukan number → tidak ada spinner & kontrol lebih penuh */
                inputMode="numeric"  /* keyboard angka di mobile */
                pattern="[0-9]*"
                data-score-input="true"
                value={raw}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="0"
                className="w-20 sm:w-24 text-center rounded-xl px-2 py-2 sm:py-2.5 text-base sm:text-lg
                           font-black focus:outline-none transition-all duration-200"
                style={{
                    border: '2px solid rgba(99,102,241,0.25)',
                    background: 'rgba(238,242,255,0.6)',
                    color: raw === '' ? '#a5b4fc' : '#4f46e5',   /* placeholder-like saat kosong */
                    boxShadow: '0 2px 8px rgba(99,102,241,0.1)',
                }}
            />
            <span className="text-xs text-gray-400 font-semibold shrink-0">/ {max}</span>

            <div className="flex-1 rounded-full overflow-hidden h-2"
                style={{ background: 'rgba(99,102,241,0.1)' }}>
                <motion.div
                    animate={{ width: `${Math.min(pct, 100)}%` }}
                    transition={{ duration: 0.35 }}
                    className="h-full rounded-full"
                    style={{
                        background: isHigh
                            ? 'linear-gradient(to right, #10b981, #34d399)'
                            : 'linear-gradient(to right, #6366f1, #818cf8)',
                    }} />
            </div>

            <span className="text-xs font-black tabular-nums shrink-0 w-9 text-right"
                style={{ color: isHigh ? '#059669' : '#4f46e5' }}>
                {pct}%
            </span>
        </div>
    );
}

/* ════════════════════════════════════════
   SUBMISSION CARD
════════════════════════════════════════ */
function SubmissionCard({ sub, index, isSelected, onSelect }) {
    const isScored = sub.my_scores_count > 0;
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={onSelect}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-200"
            style={isSelected ? {
                background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(124,58,237,0.08))',
                border: '1.5px solid rgba(99,102,241,0.35)',
                boxShadow: '0 4px 16px rgba(99,102,241,0.15)',
            } : {
                background: 'rgba(248,249,255,0.8)',
                border: '1px solid rgba(99,102,241,0.08)',
            }}
            onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; }}
            onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.08)'; }}
        >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center
                            font-black text-white text-sm shrink-0"
                style={{
                    background: isSelected
                        ? 'linear-gradient(135deg, #6366f1, #7c3aed)'
                        : 'linear-gradient(135deg, #94a3b8, #64748b)',
                    boxShadow: isSelected ? '0 4px 12px rgba(99,102,241,0.4)' : 'none',
                }}>
                {sub.registration?.user?.name?.charAt(0)?.toUpperCase() ?? '?'}
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-800 text-sm truncate leading-tight">
                    {sub.title || 'Untitled'}
                </p>
                <p className="text-xs text-gray-400 truncate mt-0.5">
                    {sub.registration?.user?.name || 'Unknown'}
                    {sub.registration?.category?.name && (
                        <span className="ml-1.5 text-indigo-500 font-semibold">
                            · {sub.registration.category.name}
                        </span>
                    )}
                </p>
            </div>

            <div className="shrink-0 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full"
                    style={{ background: isScored ? '#10b981' : '#f59e0b' }} />
                <span className="text-[10px] font-bold hidden sm:block"
                    style={{ color: isScored ? '#059669' : '#b45309' }}>
                    {isScored ? 'Dinilai' : 'Belum'}
                </span>
                {isSelected && <ChevronRight className="w-4 h-4 text-indigo-400 ml-1" />}
            </div>
        </motion.div>
    );
}

/* ════════════════════════════════════════
   SCORE FORM
════════════════════════════════════════ */
function ScoreForm({ submission, criteria, onClose }) {
    const { data, setData, post, processing } = useForm({
        scores: criteria.map(c => ({
            criteria_id: c.id,
            score: 0,
            comment: '',
        })),
    });

    const totalWeighted = criteria.reduce((sum, c, i) =>
        sum + (Number(data.scores[i]?.score) || 0) * (c.weight || 1), 0);
    const maxWeighted = criteria.reduce((sum, c) =>
        sum + (c.max_score || 10) * (c.weight || 1), 0);
    const overallPct = maxWeighted > 0 ? Math.round((totalWeighted / maxWeighted) * 100) : 0;

    function submit(e) {
        e.preventDefault();
        post(route('jury.submissions.score', submission.id));
    }

    return (
        /* Wrapper: full height, flex column — TIDAK ada overflow di sini */
        <div className="flex flex-col h-full">

            {/* ── Sticky header ─────────────────────── */}
            <div className="shrink-0 flex items-start gap-3 p-4 sm:p-5"
                style={{
                    borderBottom: '1px solid rgba(99,102,241,0.1)',
                    background: 'linear-gradient(to right, rgba(238,242,255,0.9), rgba(245,243,255,0.7))',
                }}>

                {/* Tombol kembali — hanya mobile */}
                {onClose && (
                    <button onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg shrink-0 lg:hidden"
                        style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                )}

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center
                                font-black text-white text-sm sm:text-base shrink-0"
                    style={{
                        background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                        boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
                    }}>
                    {submission.registration?.user?.name?.charAt(0)?.toUpperCase() || '?'}
                </div>

                <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-800 text-sm sm:text-base leading-tight truncate">
                        {submission.title || 'Untitled'}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                        {submission.registration?.user?.name}
                    </p>
                </div>

                <div className="shrink-0 text-center px-3 py-1.5 rounded-xl"
                    style={{
                        background: overallPct >= 80 ? 'rgba(16,185,129,0.12)' : 'rgba(99,102,241,0.12)',
                        border: `1px solid ${overallPct >= 80 ? 'rgba(16,185,129,0.25)' : 'rgba(99,102,241,0.25)'}`,
                    }}>
                    <p className="text-base sm:text-lg font-black tabular-nums"
                        style={{ color: overallPct >= 80 ? '#059669' : '#4f46e5' }}>
                        {overallPct}%
                    </p>
                    <p className="text-[9px] text-gray-400 font-medium leading-none mt-0.5">total</p>
                </div>
            </div>

            {/* ── Scrollable body ───────────────────────
                  flex-1 + overflow-y-auto = area ini yang scroll,
                  bukan parent-nya                              */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">

                {/* Foto karya */}
                {submission.photo_url && (
                    <div className="mb-4 sm:mb-5 rounded-xl sm:rounded-2xl overflow-hidden"
                        style={{ border: '1px solid rgba(99,102,241,0.15)' }}>
                        <img
                            src={`/storage/${submission.photo_url}`}
                            alt="Foto karya"
                            className="w-full object-cover"
                            style={{ maxHeight: 200 }}
                        />
                    </div>
                )}

                {/* Deskripsi */}
                {submission.description && (
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-5 p-3 rounded-xl"
                        style={{ background: 'rgba(238,242,255,0.5)', border: '1px solid rgba(99,102,241,0.08)' }}>
                        {submission.description}
                    </p>
                )}

                {/* Progress keseluruhan */}
                <div className="mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl"
                    style={{ background: 'rgba(238,242,255,0.6)', border: '1px solid rgba(99,102,241,0.1)' }}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-600">Skor Tertimbang</span>
                        <span className="text-xs font-black"
                            style={{ color: overallPct >= 80 ? '#059669' : '#4f46e5' }}>
                            {overallPct}%
                        </span>
                    </div>
                    <div className="w-full rounded-full h-2 overflow-hidden"
                        style={{ background: 'rgba(99,102,241,0.1)' }}>
                        <motion.div
                            animate={{ width: `${overallPct}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full rounded-full"
                            style={{
                                background: overallPct >= 80
                                    ? 'linear-gradient(to right, #10b981, #34d399)'
                                    : 'linear-gradient(to right, #6366f1, #818cf8)',
                            }} />
                    </div>
                </div>

                {/* Form kriteria */}
                <form onSubmit={submit} className="space-y-4 sm:space-y-5">
                    {criteria.map((criterion, i) => (
                        <motion.div
                            key={criterion.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl"
                            style={{
                                background: 'white',
                                border: '1px solid rgba(99,102,241,0.1)',
                                boxShadow: '0 2px 8px rgba(99,102,241,0.06)',
                            }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="min-w-0 flex-1 pr-2">
                                    <p className="font-bold text-gray-800 text-sm leading-tight">
                                        {criterion.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Maks:{' '}
                                        <span className="font-bold" style={{ color: '#6366f1' }}>
                                            {criterion.max_score || 10}
                                        </span>
                                        {' '}· Bobot:{' '}
                                        <span className="font-bold" style={{ color: '#7c3aed' }}>
                                            {criterion.weight || 1}×
                                        </span>
                                    </p>
                                </div>
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center
                                                text-white text-xs font-black shrink-0"
                                    style={{
                                        background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                                        boxShadow: '0 2px 8px rgba(99,102,241,0.3)',
                                    }}>
                                    {i + 1}
                                </div>
                            </div>

                            <ScoreInput
                                value={Number(data.scores[i]?.score) || 0}
                                max={criterion.max_score || 10}
                                onChange={val => {
                                    const scores = [...data.scores];
                                    scores[i] = { ...scores[i], score: val };
                                    setData('scores', scores);
                                }}
                            />

                            <textarea
                                placeholder="Komentar (opsional)..."
                                value={data.scores[i]?.comment || ''}
                                onChange={e => {
                                    const scores = [...data.scores];
                                    scores[i] = { ...scores[i], comment: e.target.value };
                                    setData('scores', scores);
                                }}
                                rows={2}
                                className="w-full mt-3 rounded-xl px-3 py-2.5 text-xs sm:text-sm
                                           focus:outline-none transition-all duration-200 resize-none
                                           placeholder:text-gray-300"
                                style={{
                                    border: '1px solid rgba(99,102,241,0.15)',
                                    background: 'rgba(248,249,255,0.8)',
                                }}
                                onFocus={e => (e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)')}
                                onBlur={e  => (e.target.style.boxShadow = 'none')}
                            />
                        </motion.div>
                    ))}

                    {/* Tombol simpan */}
                    <motion.button
                        type="submit"
                        disabled={processing}
                        whileHover={!processing ? { y: -2 } : {}}
                        whileTap={!processing ? { scale: 0.97 } : {}}
                        className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5
                                   rounded-xl sm:rounded-2xl text-white font-bold text-sm sm:text-base
                                   disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                                <Save className="w-4 h-4 shrink-0" />
                                Simpan Penilaian
                            </>
                        )}
                    </motion.button>

                    {/* Spacer agar tombol tidak tertutup navbar di iOS */}
                    <div className="h-4" />
                </form>
            </div>
        </div>
    );
}

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */
export default function ScoringShow({ event, submissions, criteria = [] }) {
    const [selected, setSelected] = useState(null);
    const showFormMobile = selected !== null;

    const scored = submissions?.filter(s => s.my_scores_count > 0).length ?? 0;
    const total  = submissions?.length ?? 0;

    /*
     * Strategi tinggi panel:
     *   - Kita TIDAK pakai maxHeight fixed di sini.
     *   - Sebaliknya, root halaman dibuat "full viewport minus topbar JuryLayout"
     *     dengan h-[calc(100vh-Npx)], lalu setiap panel pakai overflow-y-auto sendiri.
     *   - Dengan begitu scroll terjadi di dalam panel, bukan di halaman.
     */

    return (
        <JuryLayout header={`Penilaian: ${event?.title || 'Event'}`}>
            <Head title="Penilaian Karya" />

            {/* ── Hero ── */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl mb-4 sm:mb-5 text-white"
                style={{
                    background: 'linear-gradient(135deg, #0d0b2b 0%, #1e1060 50%, #0d0b2b 100%)',
                    boxShadow: '0 20px 60px -10px rgba(99,102,241,0.45)',
                    border: '1px solid rgba(99,102,241,0.15)',
                }}
            >
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(139,92,246,0.8) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(139,92,246,0.8) 1px, transparent 1px)`,
                        backgroundSize: '32px 32px',
                    }} />
                <div className="absolute -top-16 -right-16 w-48 sm:w-72 h-48 sm:h-72 rounded-full pointer-events-none opacity-20"
                    style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }} />

                <div className="relative z-10 flex items-center justify-between gap-3 p-5 sm:p-7 md:p-8">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full
                                            bg-white/10 backdrop-blur-sm border border-white/15">
                                <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-300 shrink-0" />
                                <span className="text-purple-200 text-[10px] sm:text-xs font-semibold tracking-wide uppercase">
                                    Mode Penilaian
                                </span>
                            </div>
                        </div>
                        <h1 className="text-base sm:text-2xl md:text-3xl font-black tracking-tight leading-tight line-clamp-2"
                            style={{ textShadow: '0 0 30px rgba(139,92,246,0.5)' }}>
                            {event?.title || 'Event'}
                        </h1>
                        <p className="text-purple-200/70 text-xs sm:text-sm mt-1">
                            {total} karya · {criteria.length} kriteria
                        </p>

                        <div className="flex items-center gap-2 mt-2 sm:mt-3">
                            <div className="flex-1 max-w-[120px] sm:max-w-[200px] rounded-full h-1.5 overflow-hidden"
                                style={{ background: 'rgba(255,255,255,0.15)' }}>
                                <div className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: total > 0 ? `${(scored / total) * 100}%` : '0%',
                                        background: 'linear-gradient(to right, #10b981, #34d399)',
                                    }} />
                            </div>
                            <span className="text-[10px] sm:text-xs font-bold text-emerald-300">
                                {scored}/{total} dinilai
                            </span>
                        </div>
                    </div>

                    <motion.div
                        animate={{ rotate: [0, 10, -6, 0], y: [0, -8, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-3xl sm:text-5xl md:text-6xl shrink-0 ml-2">
                        ⚖️
                    </motion.div>
                </div>
            </motion.div>

            {/* ── Dua panel ──────────────────────────────────────────────
                Kunci: grid dengan tinggi eksplisit.
                - Topbar JuryLayout ≈ 64px, hero ≈ 140px, padding ≈ 32px
                  → sisa ≈ calc(100dvh - 268px)
                - Setiap panel internal pakai overflow-y-auto
            ─────────────────────────────────────────────────────────── */}
            <div
                className="lg:grid lg:grid-cols-2 lg:gap-5 xl:gap-6 flex flex-col gap-4"
                /* Tinggi area dua panel agar bisa scroll di dalam, bukan di luar */
                style={{ height: 'calc(100dvh - 268px)', minHeight: 400 }}
            >
                {/* ── Panel kiri: Daftar karya ── */}
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    /* Mobile: sembunyikan saat form dibuka */
                    className={`rounded-2xl sm:rounded-3xl flex flex-col overflow-hidden
                                ${showFormMobile ? 'hidden lg:flex' : 'flex'}`}
                    style={{
                        background: 'white',
                        boxShadow: '0 4px 24px -4px rgba(99,102,241,0.12)',
                        border: '1px solid rgba(99,102,241,0.12)',
                        /* Penuh tinggi grid-row agar scroll bekerja di dalam */
                        minHeight: 0,
                    }}
                >
                    {/* Header panel */}
                    <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 shrink-0"
                        style={{
                            borderBottom: '1px solid rgba(99,102,241,0.1)',
                            background: 'linear-gradient(to right, rgba(238,242,255,0.8), rgba(245,243,255,0.5))',
                        }}>
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{
                                    background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
                                    boxShadow: '0 3px 10px rgba(99,102,241,0.4)',
                                }}>
                                <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-800 text-sm">Karya Peserta</h2>
                                <p className="text-[10px] text-gray-400">Klik untuk dinilai</p>
                            </div>
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shrink-0"
                            style={{ background: 'rgba(99,102,241,0.1)', color: '#4f46e5' }}>
                            {scored}/{total}
                        </span>
                    </div>

                    {/* Scrollable list — flex-1 + overflow-y-auto */}
                    <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-2">
                        {submissions?.length ? (
                            submissions.map((sub, i) => (
                                <SubmissionCard
                                    key={sub.id}
                                    sub={sub}
                                    index={i}
                                    isSelected={selected?.id === sub.id}
                                    onSelect={() => setSelected(sub)}
                                />
                            ))
                        ) : (
                            <div className="flex flex-col items-center py-10 text-gray-400">
                                <div className="text-4xl mb-3">📝</div>
                                <p className="text-sm font-medium">Tidak ada karya</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* ── Panel kanan: Form penilaian ── */}
                <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.15 }}
                    /* Mobile: sembunyikan saat tidak ada yang dipilih */
                    className={`rounded-2xl sm:rounded-3xl flex flex-col overflow-hidden
                                ${!showFormMobile ? 'hidden lg:flex' : 'flex'}`}
                    style={{
                        background: 'white',
                        boxShadow: '0 4px 24px -4px rgba(99,102,241,0.12)',
                        border: '1px solid rgba(99,102,241,0.12)',
                        minHeight: 0,   /* ← kunci: izinkan flex child menyusut */
                    }}
                >
                    <AnimatePresence mode="wait">
                        {selected ? (
                            <motion.div
                                key={selected.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                /* flex col + min-h-0 agar ScoreForm bisa scroll di dalamnya */
                                className="flex flex-col min-h-0 h-full"
                            >
                                <ScoreForm
                                    submission={selected}
                                    criteria={criteria}
                                    onClose={() => setSelected(null)}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                    className="text-5xl sm:text-6xl mb-4">
                                    📝
                                </motion.div>
                                <h3 className="font-black text-gray-700 text-base sm:text-lg mb-2">
                                    Pilih Karya
                                </h3>
                                <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
                                    Pilih karya dari daftar untuk mulai memberikan penilaian
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </JuryLayout>
    );
}