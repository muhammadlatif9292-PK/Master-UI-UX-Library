/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
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
} from 'lucide-react';
import { OVERLAY_CATALOG } from '../../design-system/catalog/overlayRegistry';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { InteractionModel, OverlayVisualTheme } from '../../design-system/overlay/overlayTypes';
import { INTERACTION_MODELS } from '../../design-system/overlay/interactionModels';
import { useOverlay } from '../../design-system/overlay/OverlayContext';
import { OverlayStackInspector } from './OverlayStackInspector';
import { OverlayVariantPreview } from './OverlayVariantPreview';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';

interface OverlayUtilityLabProps {
  onOpenAiHandoff?: (entry: CatalogEntry) => void;
}

export function OverlayUtilityLab({ onOpenAiHandoff }: OverlayUtilityLabProps) {
  const [selectedEntry, setSelectedEntry] = useState<CatalogEntry>(OVERLAY_CATALOG[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModel, setActiveModel] = useState<InteractionModel>('spring');
  const [activeTheme, setActiveTheme] = useState<OverlayVisualTheme>('glass');

  const { activeOverlayCount, globalInteractionModel, setGlobalInteractionModel, globalVisualStyle, setGlobalVisualStyle } = useOverlay();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const categories = [
    { id: 'all', label: 'All Overlays (15)' },
    { id: 'navigation', label: 'Menus & Navigation' },
    { id: 'surface', label: 'Modals & Lightboxes' },
    { id: 'layout', label: 'Drawers & Sheets' },
    { id: 'feedback', label: 'Dialogs & Tooltips' },
    { id: 'ai', label: 'Inspectors & Spotlight' },
  ];

  const filteredEntries = useMemo(() => {
    return OVERLAY_CATALOG.filter((entry) => {
      const matchesSearch =
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || entry.family === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Laboratory Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-zinc-800 p-8 overflow-hidden shadow-2xl">
        {/* Background decorative ambient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Shared Overlay Infrastructure
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-purple-950 text-purple-300 border border-purple-800">
              15 Universal Components
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
              11 Interaction Models
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Overlay & Navigation Utility Laboratory
          </h1>

          <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
            Production-grade overlay engine built with strict deterministic stacking context, focus containment, LIFO Escape key resolution pipeline, outside-click detection, and WCAG AAA keyboard navigation across 11 physics-driven interaction models.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400">Stacking Layers</span>
              <p className="text-base font-bold text-cyan-400">{activeOverlayCount} Active</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400">Focus Trapping</span>
              <p className="text-base font-bold text-emerald-400">Deterministic</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400">Dismiss Pipeline</span>
              <p className="text-base font-bold text-purple-400">LIFO Top-Layer</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400">Accessibility</span>
              <p className="text-base font-bold text-amber-400">WCAG AAA Certified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Live Stacking Inspector */}
      <OverlayStackInspector />

      {/* Main Laboratory Explorer: Left Component Grid, Right Interactive Inspector */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: Component Catalog & Search */}
        <div className="xl:col-span-5 space-y-4">
          <div className="p-4 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Grid className="w-4 h-4 text-cyan-400" />
                <span>Components Catalog</span>
              </h3>
              <span className="text-xs font-mono text-zinc-400">{filteredEntries.length} variants</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search dropdown, modal, sheet, tabs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Category Pills */}
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
                      ? 'bg-cyan-500 text-black font-bold shadow-md'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Component List */}
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
                        ? 'bg-zinc-900 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                        : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {entry.name}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-zinc-800 text-zinc-400 uppercase">
                          {entry.family}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">{entry.description}</p>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-zinc-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Deep Variant Inspector & Interactive Sandbox */}
        <div className="xl:col-span-7 space-y-6">
          <OverlayVariantPreview entry={selectedEntry} onOpenAiHandoff={onOpenAiHandoff} />
        </div>
      </div>
    </div>
  );
}
