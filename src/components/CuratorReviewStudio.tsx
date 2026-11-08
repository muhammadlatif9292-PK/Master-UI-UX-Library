/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { useSound } from '../design-system/sound/SoundContext';
import { useHaptics } from '../design-system/haptics/HapticContext';
import { getScaledMasterCatalog } from '../design-system/catalog/variantScalingEngine';
import {
  CatalogEntry,
  FormalReviewStage,
  TenVectorEvaluation,
  FormalReviewRecord,
} from '../design-system/catalog/catalogTypes';
import { ComponentPreviewEngine } from './ComponentPreviewEngine';
import { CanonicalIntegrityAuditPanel } from './detail/CanonicalIntegrityAuditPanel';
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Eye,
  Sliders,
  Filter,
  Search,
  FileSpreadsheet,
  Download,
  ThumbsUp,
  Check,
  Edit3,
  Layers,
  Zap,
  Target,
  ArrowRight,
  Maximize2,
  RotateCcw,
} from 'lucide-react';

export function CuratorReviewStudio() {
  const { theme } = useTheme();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const isDark = theme.palette.mode === 'dark';

  // Get master scaled entries
  const masterData = useMemo(() => getScaledMasterCatalog(), []);
  const initialEntries = useMemo(() => masterData.allEntries, [masterData]);

  // Local state for modified entries (persists in session)
  const [entries, setEntries] = useState<CatalogEntry[]>(initialEntries);

  // Filters
  const [selectedStage, setSelectedStage] = useState<FormalReviewStage | 'All'>('All');
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [minScoreFilter, setMinScoreFilter] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active Component under Evaluation
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  // Active entry being edited
  const activeEntry = useMemo(
    () => entries.find((e) => e.id === selectedEntryId) || entries[0] || null,
    [entries, selectedEntryId]
  );

  // Stage counts computation
  const stageCounts = useMemo(() => {
    const counts: Record<FormalReviewStage | 'All', number> = {
      All: entries.length,
      Draft: 0,
      Experimental: 0,
      Reviewed: 0,
      'Production Candidate': 0,
      Deprecated: 0,
    };

    entries.forEach((e) => {
      const stage = e.formalReview?.stage || e.reviewStage || 'Reviewed';
      if (counts[stage] !== undefined) {
        counts[stage]++;
      }
    });

    return counts;
  }, [entries]);

  // Filtered Entries List
  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      const stage = e.formalReview?.stage || e.reviewStage || 'Reviewed';
      if (selectedStage !== 'All' && stage !== selectedStage) return false;

      if (selectedFamily !== 'All' && e.family !== selectedFamily && !e.tags.includes(selectedFamily)) {
        return false;
      }

      const score = e.formalReview?.overallScore ?? e.variantMetadata?.candidateScore ?? 95;
      if (score < minScoreFilter) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          e.name.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [entries, selectedStage, selectedFamily, minScoreFilter, searchQuery]);

  // Helper to update active entry's 10-vector score
  const updateVectorScore = (vectorKey: keyof TenVectorEvaluation, newScore: number) => {
    if (!activeEntry) return;

    setEntries((prev) =>
      prev.map((item) => {
        if (item.id !== activeEntry.id) return item;

        const currentReview = item.formalReview || {
          stage: item.reviewStage || 'Reviewed',
          evaluations: {
            visualQuality: 95,
            uxClarity: 95,
            interactionQuality: 95,
            animationQuality: 95,
            sensoryQuality: 95,
            accessibilityScore: 98,
            responsiveBehaviorScore: 97,
            performanceScore: 96,
            codeQuality: 98,
            reuseQuality: 95,
          },
          overallScore: 96,
          curatorNotes: 'Evaluated',
          reviewerId: 'lead-curator',
          lastReviewedDate: '2026-08-29',
          signoffApproved: true,
        };

        const updatedEvals: TenVectorEvaluation = {
          ...currentReview.evaluations,
          [vectorKey]: newScore,
        };

        const vectorValues = Object.values(updatedEvals);
        const newOverall = Math.round(
          vectorValues.reduce((a, b) => a + b, 0) / vectorValues.length
        );

        const updatedReview: FormalReviewRecord = {
          ...currentReview,
          evaluations: updatedEvals,
          overallScore: newOverall,
          lastReviewedDate: new Date().toISOString().split('T')[0],
        };

        return {
          ...item,
          formalReview: updatedReview,
          variantMetadata: item.variantMetadata
            ? {
                ...item.variantMetadata,
                candidateScore: newOverall,
                formalReview: updatedReview,
              }
            : undefined,
        };
      })
    );

    playSound('selection', 'MICRO');
    triggerHaptic('LIGHT_CLICK');
  };

  // Helper to update active entry's review stage
  const updateReviewStage = (newStage: FormalReviewStage) => {
    if (!activeEntry) return;

    setEntries((prev) =>
      prev.map((item) => {
        if (item.id !== activeEntry.id) return item;

        const currentReview = item.formalReview || {
          stage: newStage,
          evaluations: {
            visualQuality: 95,
            uxClarity: 95,
            interactionQuality: 95,
            animationQuality: 95,
            sensoryQuality: 95,
            accessibilityScore: 98,
            responsiveBehaviorScore: 97,
            performanceScore: 96,
            codeQuality: 98,
            reuseQuality: 95,
          },
          overallScore: 96,
          curatorNotes: 'Stage updated by curator',
          reviewerId: 'lead-curator',
          lastReviewedDate: '2026-08-29',
          signoffApproved: newStage === 'Production Candidate' || newStage === 'Reviewed',
        };

        const updatedReview: FormalReviewRecord = {
          ...currentReview,
          stage: newStage,
          signoffApproved: newStage === 'Production Candidate' || newStage === 'Reviewed',
          lastReviewedDate: new Date().toISOString().split('T')[0],
        };

        return {
          ...item,
          reviewStage: newStage,
          formalReview: updatedReview,
        };
      })
    );

    playSound('success', 'STANDARD');
    triggerHaptic('DOUBLE_CONFIRM');
  };

  // Export formal curation manifest
  const exportCurationManifest = () => {
    const manifest = {
      title: 'Master UI/UX Library — Formal Curation & Review Manifest',
      generatedDate: new Date().toISOString(),
      auditedEntriesCount: entries.length,
      productionCandidatesCount: stageCounts['Production Candidate'],
      reviewedCount: stageCounts['Reviewed'],
      experimentalCount: stageCounts['Experimental'],
      draftCount: stageCounts['Draft'],
      deprecatedCount: stageCounts['Deprecated'],
      entries: entries.map((e) => ({
        id: e.id,
        name: e.name,
        family: e.family,
        stage: e.formalReview?.stage || e.reviewStage || 'Reviewed',
        overallScore: e.formalReview?.overallScore ?? 96,
        evaluations: e.formalReview?.evaluations,
        signoffApproved: e.formalReview?.signoffApproved ?? true,
        curatorNotes: e.formalReview?.curatorNotes || e.variantMetadata?.reviewNotes,
      })),
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `curation-manifest-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    playSound('success', 'STANDARD');
    triggerHaptic('DOUBLE_CONFIRM');
  };

  const vectorDefs: Array<{
    key: keyof TenVectorEvaluation;
    label: string;
    description: string;
    icon: any;
  }> = [
    {
      key: 'visualQuality',
      label: '1. Visual Quality',
      description: 'Aesthetic depth, contrast balance, and mathematical border radius alignment.',
      icon: Sparkles,
    },
    {
      key: 'uxClarity',
      label: '2. UX Clarity',
      description: 'Intuitive affordances, zero ambiguous controls, clear hierarchy.',
      icon: Eye,
    },
    {
      key: 'interactionQuality',
      label: '3. Interaction Quality',
      description: 'Press feedback, hover responsiveness, gesture ergonomics.',
      icon: Zap,
    },
    {
      key: 'animationQuality',
      label: '4. Motion & Animation',
      description: 'Fluid spring easing, zero frame drops, natural momentum.',
      icon: Clock,
    },
    {
      key: 'sensoryQuality',
      label: '5. Sensory Layer',
      description: 'Procedural sound chimes and tactile haptic vibration feedback.',
      icon: Target,
    },
    {
      key: 'accessibilityScore',
      label: '6. Accessibility (WCAG AAA)',
      description: 'Focus rings, aria-labels, high contrast 7:1+, non-color indicators.',
      icon: ShieldCheck,
    },
    {
      key: 'responsiveBehaviorScore',
      label: '7. Responsive Ergonomics',
      description: 'Fluid layout scaling across 7 device viewports (44px+ touch targets).',
      icon: Sliders,
    },
    {
      key: 'performanceScore',
      label: '8. Performance Tier',
      description: 'Zero memory leaks, idle governor protection, 60 FPS rendering.',
      icon: Award,
    },
    {
      key: 'codeQuality',
      label: '9. Code Quality',
      description: 'Clean TypeScript types, zero console errors, modular architecture.',
      icon: FileSpreadsheet,
    },
    {
      key: 'reuseQuality',
      label: '10. Reuse Quality',
      description: 'Zero hardcoded secrets, portable code artifacts, clean export API.',
      icon: Layers,
    },
  ];

  const currentEvals: TenVectorEvaluation = activeEntry?.formalReview?.evaluations || {
    visualQuality: 95,
    uxClarity: 95,
    interactionQuality: 95,
    animationQuality: 95,
    sensoryQuality: 95,
    accessibilityScore: 98,
    responsiveBehaviorScore: 97,
    performanceScore: 96,
    codeQuality: 98,
    reuseQuality: 95,
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4 md:p-6 lg:p-8">
      {/* Header Banner */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 md:p-8 border backdrop-blur-2xl transition-all shadow-2xl ${
          isDark
            ? 'bg-zinc-950/80 border-indigo-500/30 text-zinc-100 shadow-[0_0_50px_rgba(99,102,241,0.15)]'
            : 'bg-white/90 border-indigo-200 text-zinc-900 shadow-xl'
        }`}
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Prompt 26 — Curator & Review Studio</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight font-display">
              Formal Review Process & Curation Studio
            </h1>
            <p className={`text-sm md:text-base leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Formal evaluation pipeline across 5 lifecycle stages and 10 quality vectors. Audit, score, promote, and sign off production-ready component candidates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportCurationManifest}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25"
            >
              <Download className="w-4 h-4" />
              <span>Export Curation Manifest</span>
            </button>
          </div>
        </div>
      </div>

      {/* Formal Review Lifecycle Pipeline Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {(['All', 'Draft', 'Experimental', 'Reviewed', 'Production Candidate', 'Deprecated'] as const).map(
          (stageKey) => {
            const isSelected = selectedStage === stageKey;
            const count = stageCounts[stageKey];

            return (
              <button
                key={stageKey}
                onClick={() => {
                  setSelectedStage(stageKey);
                  playSound('selection', 'MICRO');
                  triggerHaptic('LIGHT_CLICK');
                }}
                className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between h-24 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-500/20 scale-[1.02]'
                    : isDark
                    ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/60'
                    : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
                }`}
              >
                <div className="text-xs font-bold tracking-wide uppercase font-mono">{stageKey}</div>
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xl font-bold font-mono ${
                      isSelected ? 'text-white' : 'text-indigo-400'
                    }`}
                  >
                    {count}
                  </span>
                  {stageKey === 'Production Candidate' && (
                    <Award className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-amber-400'}`} />
                  )}
                  {stageKey === 'Deprecated' && (
                    <XCircle className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-rose-400'}`} />
                  )}
                </div>
              </button>
            );
          }
        )}
      </div>

      {/* Main Curator Workplace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Filtered Candidates List */}
        <div
          className={`lg:col-span-5 p-5 rounded-3xl border space-y-4 ${
            isDark ? 'bg-zinc-950/80 border-zinc-800' : 'bg-white border-zinc-200'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-bold tracking-wider uppercase text-zinc-400 font-mono">
              Component Candidates ({filteredEntries.length})
            </h2>

            {/* Minimum Score Slider */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500">Min Score: {minScoreFilter}</span>
              <input
                type="range"
                min="0"
                max="95"
                step="5"
                value={minScoreFilter}
                onChange={(e) => setMinScoreFilter(Number(e.target.value))}
                className="w-20 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by candidate name or tag..."
              className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-100 placeholder-zinc-500'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'
              }`}
            />
          </div>

          {/* List of Entries */}
          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredEntries.slice(0, 40).map((entry) => {
              const isSelected = activeEntry?.id === entry.id;
              const stage = entry.formalReview?.stage || entry.reviewStage || 'Reviewed';
              const score = entry.formalReview?.overallScore ?? 96;

              return (
                <button
                  key={entry.id}
                  onClick={() => {
                    setSelectedEntryId(entry.id);
                    playSound('selection', 'MICRO');
                    triggerHaptic('LIGHT_CLICK');
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-indigo-600/15 border-indigo-500 text-white'
                      : isDark
                      ? 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900 text-zinc-300'
                      : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100 text-zinc-800'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="text-xs font-bold truncate">{entry.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono capitalize">
                      {entry.family} • {stage}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${
                        score >= 95
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : score >= 80
                          ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {score}
                    </span>
                    <ChevronRightIcon className="w-3.5 h-3.5 text-zinc-500" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: 10-Vector Evaluation Panel & Live Curator Controls */}
        {activeEntry && (
          <div
            className={`lg:col-span-7 p-6 rounded-3xl border space-y-6 ${
              isDark ? 'bg-zinc-950/80 border-zinc-800 text-zinc-100' : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            {/* Candidate Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold font-display">{activeEntry.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    {activeEntry.formalReview?.stage || activeEntry.reviewStage || 'Reviewed'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{activeEntry.description}</p>
              </div>

              <button
                onClick={() => setIsPreviewOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 transition-all"
              >
                <Eye className="w-4 h-4 text-indigo-400" />
                <span>Live Preview</span>
              </button>
            </div>

            {/* Stage Promotion Pipeline */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                Promote / Demote Review Lifecycle Stage
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(['Draft', 'Experimental', 'Reviewed', 'Production Candidate', 'Deprecated'] as const).map(
                  (st) => {
                    const isCurrent = (activeEntry.formalReview?.stage || activeEntry.reviewStage) === st;
                    return (
                      <button
                        key={st}
                        onClick={() => updateReviewStage(st)}
                        className={`p-2.5 rounded-xl text-center text-xs font-bold font-mono transition-all border ${
                          isCurrent
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                            : isDark
                            ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                            : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        {st}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* 10-Vector Evaluation Matrix Sliders */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                  10 Evaluation Vectors (0 - 100)
                </h4>
                <div className="text-xs font-mono font-bold text-emerald-400">
                  Overall Score:{' '}
                  {activeEntry.formalReview?.overallScore ?? 96}/100
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vectorDefs.map((def) => {
                  const val = currentEvals[def.key] ?? 95;
                  const VectorIcon = def.icon;

                  return (
                    <div
                      key={def.key}
                      className={`p-3 rounded-2xl border space-y-2 ${
                        isDark ? 'bg-zinc-900/50 border-zinc-800/80' : 'bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          <VectorIcon className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{def.label}</span>
                        </div>
                        <span className="text-xs font-mono font-bold text-indigo-400">{val}</span>
                      </div>

                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={val}
                        onChange={(e) => updateVectorScore(def.key, Number(e.target.value))}
                        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />

                      <p className="text-[10px] text-zinc-500 leading-tight">{def.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Curator Notes */}
            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">
                Curator Audit Notes & Sign-off Record
              </label>
              <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                <div>
                  <span className="text-zinc-500">Reviewer ID:</span>{' '}
                  {activeEntry.formalReview?.reviewerId || 'lead-design-ops-curator'}
                </div>
                <div>
                  <span className="text-zinc-500">Audit Date:</span>{' '}
                  {activeEntry.formalReview?.lastReviewedDate || '2026-08-29'}
                </div>
                <div>
                  <span className="text-zinc-500">Status:</span>{' '}
                  {activeEntry.formalReview?.signoffApproved ? (
                    <span className="text-emerald-400 font-bold">✓ Signed Off & Production Certified</span>
                  ) : (
                    <span className="text-amber-400 font-bold">Pending Formal Sign-off</span>
                  )}
                </div>
              </div>
            </div>

            {/* Canonical Identity Integrity Audit Panel */}
            <CanonicalIntegrityAuditPanel entry={activeEntry} />
          </div>
        )}
      </div>

      {/* Live Preview Modal */}
      {isPreviewOpen && activeEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div
            className={`w-full max-w-3xl rounded-3xl p-6 border shadow-2xl space-y-6 relative ${
              isDark ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-bold font-display">{activeEntry.name}</h3>
                <p className="text-xs text-zinc-400">{activeEntry.description}</p>
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
              >
                ✕
              </button>
            </div>

            <div className="p-2 rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden min-h-[240px]">
              <ComponentPreviewEngine entry={activeEntry} onClose={() => setIsPreviewOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChevronRightIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
}
