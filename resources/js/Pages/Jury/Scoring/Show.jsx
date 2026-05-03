import JuryLayout from '@/Layouts/JuryLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Save, ChevronRight, Users, Award } from 'lucide-react';

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
    id: i, left: `${(i * 397) % 100}%`, top: `${(i * 331) % 100}%`,
    dur: 3 + (i % 5) * 0.3, delay: (i % 6) * 0.4, size: 2.5 + (i % 4),
    color: ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'][i % 5],
}));

/* ══ ENHANCED STAR RATING ══ */
function StarRating({ value = 0, max, onChange }) {
    const [hover, setHover] = useState(null);
    const pct = (hover ?? value) / max;

    return (
        <div className="space-y-3">
            <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                    <input
                        type="number"
                        min="0"
                        max={max}
                        value={value}
                        onMouseEnter={() => setHover(value)}
                        onMouseLeave={() => setHover(null)}
                        onChange={e => onChange(Math.min(max, Math.max(0, Number(e.target.value) || 0)))}
                        className="w-full border-2 border-purple-200/60 bg-gradient-to-r from-white/70 to-slate-50/70 backdrop-blur-sm rounded-2xl 
                                   px-5 py-3 text-lg font-bold text-center focus:outline-none 
                                   focus:border-purple-400 focus:ring-4 focus:ring-purple-100/60 
                                   focus:shadow-2xl hover:shadow-xl transition-all duration-400 shadow-lg"
                    />
                </div>
                <span className="text-sm font-bold text-slate-400 bg-gradient-to-r from-slate-800/60 to-purple-900/60 px-3 py-2 rounded-xl backdrop-blur-sm">/ {max}</span>

                <div className="flex-1">
                    <div className="h-3 bg-gradient-to-r from-slate-200/50 to-purple-200/30 rounded-2xl overflow-hidden shadow-inner">
                        <motion.div
                            animate={{ width: `${(value / max) * 100}%` }}
                            transition={{ duration: 0.4 }}
                            className="h-3 bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-600 
                                       rounded-2xl shadow-lg"
                        />
                    </div>
                </div>

                <div className={`text-lg font-black tabular-nums px-4 py-2 rounded-2xl bg-gradient-to-r from-slate-800/80 to-purple-900/80 backdrop-blur-sm shadow-lg
                                 ${pct >= 0.8 ? 'text-emerald-500 shadow-emerald-200/50'
                                    : pct >= 0.5 ? 'text-purple-400 shadow-purple-200/50'
                                    : 'text-amber-400 shadow-amber-200/50'}`}>
                    {Math.round(pct * 100)}%
                </div>
            </div>
        </div>
    );
}

/* ══ ENHANCED SUBMISSION CARD ══ */
function SubmissionCard({ sub, index, isSelected, onSelect }) {
    const isScored = sub.my_scores_count > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={onSelect}
            whileHover={{ x: 6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-3xl border-2 cursor-pointer transition-all duration-500 backdrop-blur-xl shadow-xl
                        group hover:shadow-3xl hover:shadow-purple-300/40
                        ${isSelected
                            ? 'border-purple-400/70 bg-gradient-to-br from-purple-500/10 to-indigo-600/10 shadow-3xl shadow-purple-300/50 ring-4 ring-purple-100/50'
                            : 'border-slate-700/40 bg-gradient-to-br from-slate-800/80 to-slate-900/60 hover:border-purple-400/50 hover:bg-purple-500/5'
                        }`}
        >
            <div className="flex items-start gap-5">
                <motion.div
                    animate={{
                        scale: isSelected ? [1, 1.1, 1] : 1,
                        rotate: isSelected ? [0, 180, 360] : 0
                    }}
                    transition={{ duration: isSelected ? 2 : 0, repeat: isSelected ? Infinity : 0 }}
                    className={`w-16 h-16 rounded-3xl flex items-center justify-center text-lg font-black 
                               text-white shrink-0 shadow-2xl ring-4 ring-white/30 backdrop-blur-xl
                               ${isSelected
                                   ? 'bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-600 shadow-purple-400/60'
                                   : 'bg-gradient-to-br from-slate-600 to-slate-700 shadow-slate-400/40 hover:shadow-purple-400/50'
                               }`}
                >
                    {sub.registration?.user?.name?.charAt(0)?.toUpperCase() ?? '?'}
                </motion.div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-black text-xl text-slate-100 leading-tight truncate drop-shadow-sm mb-2">
                        {sub.title || 'Untitled'}
                    </h4>
                    <p className="text-base text-slate-300 font-semibold truncate mb-3 backdrop-blur-sm">
                        {sub.registration?.user?.name || 'Unknown'}
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r 
                                        from-purple-500/20 to-indigo-600/20 text-purple-200 border-2 border-purple-400/40
                                        rounded-2xl font-bold backdrop-blur-xl shadow-lg">
                            <Users className="w-4 h-4" />
                            {sub.registration?.category?.name || 'Uncategorized'}
                        </span>
                    </div>
                </div>

                {isSelected && (
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl 
                                   flex items-center justify-center text-white shadow-2xl ring-4 ring-white/40 ml-auto"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </motion.div>
                )}
            </div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`mt-5 inline-flex items-center gap-2.5 text-base px-6 py-3 rounded-3xl font-bold 
                           border-2 shadow-xl backdrop-blur-xl transition-all duration-500
                           ${isScored
                               ? 'bg-gradient-to-r from-emerald-500/15 to-teal-600/15 text-emerald-300 border-emerald-400/40 shadow-emerald-300/40'
                               : 'bg-gradient-to-r from-amber-500/15 to-orange-600/15 text-amber-300 border-amber-400/40 shadow-amber-300/40'
                           }`}
            >
                <motion.span
                    animate={{ scale: isScored ? [1, 1.4, 1] : 1 }}
                    transition={{ duration: 1.5, repeat: isScored ? Infinity : 0 }}
                    className={`w-3 h-3 rounded-full shadow-lg
                               ${isScored ? 'bg-emerald-500 shadow-emerald-400/50' : 'bg-amber-500 shadow-amber-400/50'}`}
                />
                {isScored ? `Sudah Dinilai (${sub.my_scores_count})` : 'Belum Dinilai'}
            </motion.div>
        </motion.div>
    );
}

/* ══ PREMIUM SCORE FORM ══ */
function ScoreForm({ submission, criteria, event }) {
    const { data, setData, post, processing } = useForm({
        scores: criteria.map(c => ({
            criteria_id: c.id,
            score: 0,
            comment: '',
        })),
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('jury.submissions.score', submission.id));
    };

    const totalWeighted = criteria.reduce((sum, c, i) => {
        return sum + (Number(data.scores[i]?.score) || 0) * (c.weight || 1);
    }, 0);
    const maxWeighted = criteria.reduce((sum, c) => sum + (c.max_score || 10) * (c.weight || 1), 0);
    const overallPct = maxWeighted > 0 ? Math.round((totalWeighted / maxWeighted) * 100) : 0;

    return (
        <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-purple-900/80 backdrop-blur-2xl rounded-3xl shadow-4xl shadow-purple-500/30 
                       border border-purple-500/40 overflow-hidden h-full flex flex-col"
        >
            <div className="h-2 w-full bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-600 shadow-lg" />

            <div className="px-8 py-8 border-b border-slate-700/50 shadow-lg">
                <div className="flex items-start gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-600 
                                    rounded-3xl flex items-center justify-center text-white font-black text-2xl 
                                    shadow-3xl ring-8 ring-white/30 shrink-0 backdrop-blur-xl">
                        {submission.registration?.user?.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="font-black text-3xl text-slate-100 leading-tight truncate drop-shadow-2xl mb-3">
                            {submission.title || 'Untitled'}
                        </h2>
                        <p className="text-xl text-slate-300 font-semibold line-clamp-3 backdrop-blur-sm shadow-lg">
                            {submission.description || 'No description available'}
                        </p>
                    </div>
                </div>

                {submission.photo_url && (
                    <motion.img
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        src={`/storage/${submission.photo_url}`}
                        alt="Foto karya"
                        className="rounded-3xl mt-8 w-full object-cover h-64 shadow-2xl hover:shadow-3xl
                                   border-4 border-purple-500/40 hover:border-purple-400/60
                                   hover:scale-[1.02] transition-all duration-500 cursor-zoom-in bg-gradient-to-br 
                                   from-slate-800/70 to-purple-900/40 backdrop-blur-xl"
                    />
                )}

                <div className="mt-8 flex items-center gap-5 p-5 bg-gradient-to-r from-slate-800/60 to-purple-900/40 
                                rounded-3xl backdrop-blur-xl shadow-xl border border-purple-500/30">
                    <div className="flex-1">
                        <div className="h-4 bg-gradient-to-r from-slate-700/50 to-purple-700/30 rounded-2xl overflow-hidden shadow-inner">
                            <motion.div
                                animate={{ width: `${overallPct}%` }}
                                transition={{ duration: 0.6 }}
                                className={`h-4 rounded-2xl shadow-xl bg-gradient-to-r
                                            ${overallPct >= 80 ? 'from-emerald-500 via-teal-500 to-emerald-600 shadow-emerald-400/60'
                                               : 'from-purple-500 via-indigo-600 to-purple-600 shadow-purple-400/60'}`}
                            />
                        </div>
                    </div>
                    <div className={`text-2xl font-black tabular-nums px-6 py-3 rounded-3xl bg-gradient-to-r from-slate-800/90 to-purple-900/90 
                                    backdrop-blur-xl shadow-2xl ring-4 ring-white/30
                                    ${overallPct >= 80 ? 'text-emerald-400 shadow-emerald-300/50'
                                       : 'text-purple-300 shadow-purple-300/50'}`}>
                        {overallPct}%
                    </div>
                    <span className="text-lg font-bold text-slate-300 backdrop-blur-sm">skor tertimbang</span>
                </div>
            </div>

            <div className="flex-1 p-8 space-y-6 overflow-y-auto custom-scrollbar">
                <form onSubmit={submit}>
                    {criteria.map((criterion, i) => (
                        <motion.div
                            key={criterion.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.12 }}
                            className="p-8 rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br 
                                       from-slate-800/70 to-purple-900/40 backdrop-blur-xl shadow-2xl hover:shadow-3xl
                                       hover:border-purple-400/50 hover:shadow-purple-400/40 transition-all duration-500
                                       group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <label className="block text-xl font-black text-slate-100 uppercase tracking-wider 
                                                      drop-shadow-lg mb-2">
                                        {criterion.name}
                                    </label>
                                    <p className="text-lg text-slate-300 font-semibold backdrop-blur-sm">
                                        Maks: <span className="text-purple-400 font-black">{criterion.max_score || 10}</span>
                                        &nbsp;· Bobot: <span className="text-indigo-400 font-black">{criterion.weight || 1}×</span>
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 
                                                rounded-2xl flex items-center justify-center text-white font-bold 
                                                shadow-xl ring-4 ring-white/30 group-hover:scale-110 transition-all">
                                    {i + 1}
                                </div>
                            </div>

                            <StarRating
                                value={Number(data.scores[i]?.score) || 0}
                                max={criterion.max_score || 10}
                                onChange={(val) => {
                                    const scores = [...data.scores];
                                    scores[i] = { ...scores[i], score: val };
                                    setData('scores', scores);
                                }}
                            />

                            <textarea
                                placeholder="Tulis komentar detail untuk kriteria ini (opsional)..."
                                value={data.scores[i]?.comment || ''}
                                onChange={e => {
                                    const scores = [...data.scores];
                                    scores[i] = { ...scores[i], comment: e.target.value };
                                    setData('scores', scores);
                                }}
                                className="w-full border-2 border-purple-500/40 bg-gradient-to-r from-slate-800/80 to-purple-900/60 backdrop-blur-xl rounded-3xl 
                                           px-6 py-5 mt-6 text-lg font-semibold focus:ring-4 focus:ring-purple-100/50 
                                           focus:border-purple-400 focus:shadow-3xl hover:shadow-xl transition-all 
                                           duration-400 shadow-lg resize-vertical placeholder:text-slate-400 
                                           placeholder:italic min-h-[100px]"
                            />
                        </motion.div>
                    ))}

                    <motion.button
                        type="submit"
                        disabled={processing}
                        whileHover={!processing ? { scale: 1.05, y: -3 } : {}}
                        whileTap={!processing ? { scale: 0.95 } : {}}
                        className="w-full flex items-center justify-center gap-4 bg-gradient-to-r
                                   from-purple-600 via-indigo-700 to-purple-700 text-white py-6 rounded-3xl 
                                   font-black text-xl shadow-3xl shadow-purple-500/50 hover:shadow-4xl
                                   hover:shadow-purple-600/60 hover:from-purple-500 hover:via-indigo-600 
                                   hover:to-purple-600 transition-all duration-500 border-2 border-white/30
                                   backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed 
                                   disabled:transform-none mt-8"
                    >
                        {processing ? (
                            <>
                                <div className="w-7 h-7 border-2 border-white/40 border-t-white rounded-2xl animate-spin shadow-2xl" />
                                <span>Menyimpan Penilaian...</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-6 h-6" />
                                <span>Simpan Penilaian Final</span>
                            </>
                        )}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}

export default function ScoringShow({ event, submissions, criteria = [] }) {
    const [selected, setSelected] = useState(null);

    return (
        <JuryLayout header={`Penilaian: ${event?.title || 'Event'}`}>
            <Head title="Penilaian Karya" />

            <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative overflow-hidden rounded-3xl mb-10 shadow-3xl shadow-purple-950/60
                           bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
                           p-10 text-white border border-purple-800/50 backdrop-blur-xl"
            >
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />

                <motion.div
                    className="absolute w-80 h-80 rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, #8b5cf6 0%, #7c3aed 35%, transparent 70%)',
                        top: '-20%',
                        right: '-10%'
                    }}
                    animate={{ scale: [1, 1.6, 1], rotate: [0, 15, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />

                {PARTICLES.map(p => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full pointer-events-none shadow-xl"
                        style={{
                            width: p.size,
                            height: p.size,
                            background: p.color,
                            left: p.left,
                            top: p.top
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.4, 1, 0.4],
                            scale: [1, 1.4, 1]
                        }}
                        transition={{
                            duration: p.dur,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: 'easeInOut'
                        }}
                    />
                ))}

                <div className="relative z-10 flex justify-between items-center gap-8">
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 bg-purple-500/20 border-2 border-purple-400/50
                                       text-purple-200 text-base font-bold px-6 py-2.5 rounded-3xl backdrop-blur-2xl 
                                       shadow-2xl mb-5"
                        >
                            <Award className="w-5 h-5 text-purple-300 drop-shadow-lg" />
                            Mode Penilaian Aktif
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl font-black text-white tracking-tight drop-shadow-3xl leading-tight"
                        >
                            {event?.title || 'Event Title'}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-purple-200 text-xl font-semibold mt-3 backdrop-blur-xl shadow-lg"
                        >
                            {submissions?.length || 0} karya · {criteria.length} kriteria
                        </motion.p>
                    </div>
                    <motion.div
                        animate={{ rotate: [0, 20, -12, 0], y: [0, -16, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                        className="text-8xl shrink-0 drop-shadow-3xl"
                    >
                        ⚖️
                    </motion.div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="bg-gradient-to-br from-slate-900/95 to-purple-900/80 backdrop-blur-xl rounded-3xl shadow-3xl shadow-purple-500/40 
                               border border-purple-500/30 overflow-hidden max-h-[calc(100vh-200px)]"
                >
                    <div className="relative overflow-hidden px-8 py-7 border-b border-purple-500/30
                                    bg-gradient-to-r from-purple-600 via-indigo-700 to-purple-700 shadow-2xl">
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                                                  linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                                backgroundSize: '40px 40px',
                            }}
                        />
                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <motion.div
                                    animate={{ rotate: [0, 18, -12, 0] }}
                                    transition={{ duration: 6, repeat: Infinity }}
                                    className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl"
                                >
                                    <FileText className="w-6 h-6 text-white drop-shadow-lg" />
                                </motion.div>
                                <div>
                                    <h2 className="font-black text-white text-2xl drop-shadow-2xl">Karya Peserta</h2>
                                    <p className="text-purple-200 text-base font-semibold backdrop-blur-sm">Klik untuk dinilai</p>
                                </div>
                            </div>
                            <motion.span
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="bg-white/20 border-2 border-white/30 text-white text-lg font-black 
                                           px-6 py-3 rounded-3xl backdrop-blur-xl shadow-2xl"
                            >
                                {submissions?.filter(s => s.my_scores_count > 0).length || 0}/{submissions?.length || 0} dinilai
                            </motion.span>
                        </div>
                    </div>

                    <div className="p-8 space-y-4 overflow-y-auto custom-scrollbar max-h-[calc(100vh-340px)]">
                        <AnimatePresence>
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
                                <div className="text-center py-8 text-slate-400">Tidak ada karya</div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <div>
                    <AnimatePresence mode="wait">
                        {selected ? (
                            <motion.div
                                key={selected.id}
                                initial={{ opacity: 0, x: 30, scale: 0.97 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -30, scale: 0.97 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <ScoreForm submission={selected} criteria={criteria} event={event} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hidden xl:flex bg-gradient-to-br from-slate-900/70 to-purple-900/50 
                                           backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-dashed 
                                           border-purple-400/40 items-center justify-center text-center 
                                           p-16 h-full min-h-[400px] shadow-purple-500/30"
                            >
                                <div className="text-center">
                                    <motion.div
                                        animate={{ y: [0, -16, 0], rotate: [0, 8, -5, 0], scale: [1, 1.1, 1] }}
                                        transition={{ duration: 5, repeat: Infinity }}
                                        className="text-7xl mb-6 mx-auto w-32 h-32 
                                                   rounded-3xl flex items-center justify-center shadow-2xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 backdrop-blur-xl"
                                    >
                                        📝
                                    </motion.div>
                                    <h3 className="text-3xl font-black text-slate-100 mb-4 drop-shadow-lg">Pilih Karya</h3>
                                    <p className="text-xl text-slate-300 font-semibold backdrop-blur-sm max-w-md mx-auto">
                                        Pilih karya di sebelah kiri untuk mulai memberikan penilaian profesional
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: linear-gradient(to bottom, #1e293b, #334155);
                    border-radius: 12px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #8b5cf6, #7c3aed);
                    border-radius: 12px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #7c3aed, #6d28d9);
                }
            `}</style>
        </JuryLayout>
    );
}