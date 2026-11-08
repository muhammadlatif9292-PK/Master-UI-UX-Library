/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  Sparkles,
  Search,
  Sliders,
  Shield,
  Eye,
  Zap,
  Check,
  ChevronRight,
  Maximize2,
  Command,
  HelpCircle,
  Activity,
  Terminal,
  Grid,
  Filter,
  ArrowUpRight,
  Code,
  Volume2,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Info,
} from 'lucide-react';
import { FEEDBACK_CATALOG } from '../../design-system/catalog/feedbackRegistry';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { FeedbackVisualLanguage, StateVariant, SuccessAnimationType } from '../../design-system/feedback/feedbackTypes';
import { useFeedback } from '../../design-system/feedback/FeedbackContext';
import { FeedbackVariantPreview } from './FeedbackVariantPreview';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';

interface FeedbackStateLabProps {
  onOpenAiHandoff?: (entry: CatalogEntry) => void;
}

export function FeedbackStateLab({ onOpenAiHandoff }: FeedbackStateLabProps) {
  const [selectedEntry, setSelectedEntry] = useState<CatalogEntry>(FEEDBACK_CATALOG[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const {
    activeLanguage,
    setActiveLanguage,
    preferredSuccessAnimation,
    setPreferredSuccessAnimation,
    showToast,
    showSnackbar,
    showBanner,
    triggerSuccess,
    triggerError,
  } = useFeedback();

  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const categories = [
    { id: 'all', label: 'All Components (15)' },
    { id: 'notification', label: 'Toasts & Snackbars' },
    { id: 'inline', label: 'Alerts & Tooltips' },
    { id: 'progress', label: 'Progress & Loaders' },
    { id: 'structural', label: 'Skeletons & States' },
    { id: 'action', label: 'Confirm & Undo' },
  ];

  const filteredEntries = useMemo(() => {
    return FEEDBACK_CATALOG.filter((entry) => {
      const matchesSearch =
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedCategory === 'all') return matchesSearch;

      if (selectedCategory === 'notification') {
        return matchesSearch && (entry.id === 'feedback-toast' || entry.id === 'feedback-snackbar' || entry.id === 'feedback-banner');
      }
      if (selectedCategory === 'inline') {
        return matchesSearch && (entry.id === 'feedback-alert' || entry.id === 'feedback-tooltip' || entry.id === 'feedback-badge');
      }
      if (selectedCategory === 'progress') {
        return matchesSearch && (entry.id === 'feedback-progress' || entry.id === 'feedback-loader' || entry.id === 'feedback-skeleton');
      }
      if (selectedCategory === 'structural') {
        return matchesSearch && (entry.id === 'feedback-empty' || entry.id === 'feedback-error' || entry.id === 'feedback-warning' || entry.id === 'feedback-success');
      }
      if (selectedCategory === 'action') {
        return matchesSearch && (entry.id === 'feedback-confirmation' || entry.id === 'feedback-undo');
      }

      return matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Laboratory Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-zinc-800 p-8 overflow-hidden shadow-2xl">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-emerald-400" />
              Feedback & State Architecture
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
              15 Essential Primitives
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-purple-950 text-purple-300 border border-purple-800">
              6 Visual Languages
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800">
              Restrained & Recoverable
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Feedback, Notification & State Catalog
          </h1>

          <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
            Enterprise feedback engine built around restrained positive reinforcement (subtle glow, spring confirmation, morphing vectors, harmonic chimes) and calm, recoverable error handling. Features 6 distinct visual languages without overwhelming users with loud celebration slop.
          </p>

          {/* Quick Trigger Action Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                triggerSuccess('Ledger state synchronized', 'Cryptographic proof hash generated.');
              }}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Trigger Restrained Success</span>
            </button>

            <button
              type="button"
              onClick={() => {
                triggerError(
                  'Unable to sync local state',
                  'Upstream gateway timed out after 3000ms. Your draft data is safely saved in local storage.',
                  () => triggerSuccess('Reconnection established', 'Synced 4 items.')
                );
              }}
              className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Trigger Recoverable Error</span>
            </button>

            <button
              type="button"
              onClick={() => {
                showSnackbar('Draft archived to storage.', 'Undo', () => {
                  triggerSuccess('Action reversed', 'Draft restored.');
                });
              }}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Trigger Undo Snackbar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Catalog View */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left: Component List */}
        <div className="xl:col-span-5 space-y-4">
          <div className="p-4 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Grid className="w-4 h-4 text-emerald-400" />
                <span>Components Catalog</span>
              </h3>
              <span className="text-xs font-mono text-zinc-400">{filteredEntries.length} variants</span>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search toast, alert, skeleton, undo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Filter Category Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    playSound('SWITCH');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-500 text-black font-bold shadow-md'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Component Item Buttons */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {filteredEntries.map((entry) => {
                const isSelected = selectedEntry.id === entry.id;
                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => {
                      setSelectedEntry(entry);
                      playSound('SWITCH');
                      triggerHaptic('light');
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-zinc-900 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30'
                        : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {entry.name}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-zinc-800 text-zinc-400 uppercase">
                          {entry.component}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">{entry.description}</p>
                    </div>

                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'text-emerald-400 translate-x-1' : 'text-zinc-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Sandbox Preview */}
        <div className="xl:col-span-7 space-y-6">
          <FeedbackVariantPreview entry={selectedEntry} onOpenAiHandoff={onOpenAiHandoff} />
        </div>
      </div>
    </div>
  );
}
