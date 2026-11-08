/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { ViewportPreset } from './types';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { useSound } from '../../design-system/sound/SoundContext';
import {
  Sparkles,
  Sliders,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  MoreVertical,
  Plus,
  Trash2,
  Star,
  Share2,
  Check,
  X,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Shield,
  Bot,
  BrainCircuit,
  Workflow,
  BarChart3,
  Calendar,
  Clock,
  Compass,
  FileText,
  Smartphone,
  Monitor,
  Tablet,
  MousePointer,
  Hand,
  Info,
  SlidersHorizontal,
} from 'lucide-react';

interface AdaptiveSpecimenRendererProps {
  entry: CatalogEntry;
  preset: ViewportPreset;
  interactiveSpecimenType?: 'catalog-specimen' | 'data-suite' | 'ai-workspace' | 'analytics-dashboard' | 'workflow-pipeline';
}

export const AdaptiveSpecimenRenderer: React.FC<AdaptiveSpecimenRendererProps> = ({
  entry,
  preset,
  interactiveSpecimenType = 'catalog-specimen',
}) => {
  const { width, height, category, orientation, hasTouch, hasHover } = preset;
  const isMobile = category === 'phone';
  const isTablet = category === 'tablet';
  const isLandscape = orientation === 'landscape';

  const { triggerHaptic } = useHaptics();
  const { playSound } = useSound();

  // Mobile-specific interactive states
  const [activeBottomNav, setActiveBottomNav] = useState<string>('explore');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [swipedItemId, setSwipedItemId] = useState<string | null>(null);
  const [selectedMobileCard, setSelectedMobileCard] = useState<string | null>(null);
  const [starredItems, setStarredItems] = useState<Record<string, boolean>>({ item1: true });
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const sampleRecords = [
    { id: 'rec-1', name: 'Neural Latency Index', category: 'Telemetry', status: 'Optimal', latency: '12ms', score: '99.4%', load: '14%' },
    { id: 'rec-2', name: 'Vector Embedding Stream', category: 'Cognitive', status: 'Processing', latency: '48ms', score: '94.2%', load: '68%' },
    { id: 'rec-3', name: 'Quantization Matrix', category: 'Inference', status: 'Optimal', latency: '8ms', score: '98.9%', load: '22%' },
    { id: 'rec-4', name: 'Kinetic Motion Solver', category: 'Physics', status: 'Standby', latency: '16ms', score: '96.1%', load: '35%' },
  ];

  const handleSwipeToggle = (id: string) => {
    if (!hasTouch) return;
    triggerHaptic('tap');
    playSound('tap', 'MICRO');
    setSwipedItemId(swipedItemId === id ? null : id);
  };

  const handleStarToggle = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    triggerHaptic('selection');
    playSound('selection', 'MICRO');
    setStarredItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full h-full flex flex-col bg-zinc-950 text-white select-none overflow-y-auto">
      {/* Dynamic Viewport Specimen Top App Bar */}
      <div className={`px-4 py-3 border-b border-white/10 flex items-center justify-between shrink-0 bg-zinc-900/90 backdrop-blur-md ${
        isLandscape && isMobile ? 'py-2 px-3' : ''
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-xs md:text-sm text-white tracking-tight">{entry.name}</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {preset.name} ({width}×{height})
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 hidden sm:block">
              {hasTouch ? 'Touch-Optimized Adaptive Architecture (No-Hover)' : 'Dense Desktop Pointer Architecture'}
            </p>
          </div>
        </div>

        {/* Header Action Tools */}
        <div className="flex items-center gap-2">
          {/* Desktop Search & Filter vs Mobile Filter Drawer Button */}
          {!isMobile ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-xs text-zinc-400">
                <Search className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">Quick search...</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono">⌘K</kbd>
              </div>
              <button
                className="px-3 py-1 rounded-lg bg-cyan-500 text-zinc-950 font-bold text-xs hover:bg-cyan-400 transition-all flex items-center gap-1"
                title="Desktop Hover Tooltip: Trigger Action"
              >
                <Plus className="w-3.5 h-3.5" /> Create
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                triggerHaptic('tap');
                playSound('tap', 'MICRO');
                setMobileDrawerOpen(true);
              }}
              className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Specimen Body */}
      <div className={`flex-1 p-4 md:p-6 overflow-y-auto space-y-4 ${isLandscape && isMobile ? 'p-3 space-y-3' : ''}`}>
        {/* Adaptive Layout Shift Demonstration */}

        {/* 1. Phone Landscape Viewport Adaptive Layout */}
        {isLandscape && isMobile ? (
          <div className="grid grid-cols-12 gap-3 h-full">
            {/* Left Pinned Compact Sidebar / Action Rail */}
            <div className="col-span-4 p-3 rounded-2xl bg-zinc-900 border border-white/10 flex flex-col justify-between space-y-2">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase text-cyan-400 block font-bold">Landscape Action Dock</span>
                <p className="text-[10px] text-zinc-400">390px vertical height budget</p>
                <div className="space-y-1 pt-1">
                  {['Overview', 'Parameters', 'Sensory Bus'].map((t, idx) => (
                    <button
                      key={t}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        idx === 0 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <button className="w-full py-1.5 rounded-lg bg-cyan-500 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1">
                <Plus className="w-3 h-3" /> Add Specimen
              </button>
            </div>

            {/* Right Scrollable Canvas */}
            <div className="col-span-8 space-y-2 overflow-y-auto pr-1">
              {sampleRecords.slice(0, 2).map((rec) => (
                <div key={rec.id} className="p-3 rounded-xl bg-zinc-900/90 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{rec.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">{rec.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                    <span>Latency: {rec.latency}</span>
                    <span>Score: {rec.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : isMobile ? (
          /* 2. Phone Portrait Viewport: Stacked Stream + Swipeable Touch Cards + FAB */
          <div className="space-y-4 pb-16">
            {/* Mobile Hero Header Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-zinc-900 to-zinc-900 border border-cyan-500/30 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Mobile Specimen Deck</span>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-mono">
                  {entry.family.toUpperCase()}
                </span>
              </div>
              <h4 className="font-bold text-sm text-white">{entry.name}</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">{entry.description}</p>

              <div className="pt-2 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                  Mood: {entry.mood}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-300">
                  Tier: {entry.performanceTier}
                </span>
              </div>
            </div>

            {/* Mobile Interaction Guide Banner */}
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold block">Touch Gestures Active:</span>
                <p className="text-[11px] text-cyan-200/90 leading-tight">
                  • <strong>Swipe Left</strong> on cards below to reveal actions. <br />
                  • <strong>Long-Press</strong> for 400ms to open inspection tray. <br />
                  • <strong>Pull Down</strong> from top to simulate refresh.
                </p>
              </div>
            </div>

            {/* Swipeable List Items (Transforms Desktop Table) */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono uppercase text-zinc-400 px-1 font-semibold">
                Adaptive Touch Card Stream ({sampleRecords.length})
              </span>

              {sampleRecords.map((rec) => {
                const isSwiped = swipedItemId === rec.id;
                const isStarred = starredItems[rec.id];

                return (
                  <div key={rec.id} className="relative overflow-hidden rounded-2xl">
                    {/* Hidden Behind-the-Card Action Tray */}
                    <div className="absolute inset-y-0 right-0 w-36 bg-zinc-900 border border-white/10 flex items-center justify-end px-3 gap-2">
                      <button
                        onClick={(e) => handleStarToggle(rec.id, e)}
                        className={`p-2.5 rounded-xl border ${
                          isStarred ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-white/10 text-zinc-300 border-white/10'
                        }`}
                        title="Star"
                      >
                        <Star className="w-4 h-4" fill={isStarred ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => {
                          triggerHaptic('error');
                          playSound('error', 'STATE');
                          setSwipedItemId(null);
                        }}
                        className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Foreground Card with Swipe Translation */}
                    <div
                      onClick={() => handleSwipeToggle(rec.id)}
                      className={`p-4 rounded-2xl bg-zinc-900/95 border transition-transform duration-200 cursor-pointer relative z-10 ${
                        isSwiped ? '-translate-x-32 border-cyan-500/40' : 'translate-x-0 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{rec.name}</span>
                          {isStarred && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                          {rec.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-zinc-400 pt-1 border-t border-white/5">
                        <div>
                          <span className="block text-[9px] text-zinc-500 uppercase">Category</span>
                          <span className="text-zinc-200">{rec.category}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-zinc-500 uppercase">Latency</span>
                          <span className="text-cyan-300 font-bold">{rec.latency}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-zinc-500 uppercase">Score</span>
                          <span className="text-emerald-300 font-bold">{rec.score}</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-500">
                        <span>Tap to toggle swipe actions</span>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : isTablet ? (
          /* 3. Tablet Viewport: 2-Column Bento Grid */
          <div className="grid grid-cols-2 gap-4">
            {sampleRecords.map((rec) => (
              <div key={rec.id} className="p-5 rounded-2xl bg-zinc-900 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">{rec.name}</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono">
                    {rec.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">Tablet dual-pane specimen tile with expanded touch hitbox.</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
                  <span className="text-zinc-400">Latency: <strong className="text-cyan-300">{rec.latency}</strong></span>
                  <span className="text-zinc-400">Score: <strong className="text-emerald-300">{rec.score}</strong></span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 4. Desktop / Laptop / Large Display: Multi-Column Sortable Table with Hover States */
          <div className="space-y-4">
            {/* Desktop Metrics Bar */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Total Telemetry Streams', value: '1,420 / sec', trend: '+14.2%' },
                { label: 'P99 Sensory Latency', value: '4.8 ms', trend: '-2.1ms' },
                { label: 'WCAG AAA Contrast Health', value: '100% Pass', trend: 'Strict' },
                { label: 'Performance Budget', value: '60 FPS Ultra', trend: 'Optimal' },
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-2xl bg-zinc-900/70 border border-white/10 space-y-1">
                  <span className="text-[11px] text-zinc-400 font-mono uppercase">{m.label}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white tracking-tight">{m.value}</span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">{m.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Data Table with Hover State Inspection */}
            <div className="rounded-2xl bg-zinc-900/80 border border-white/10 overflow-hidden shadow-2xl">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-xs font-mono uppercase text-cyan-300">Desktop High-Density Table</span>
                  <span className="text-xs text-zinc-500">Pointer Hover & Inline Controls Enabled</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-300 hover:bg-white/10">
                    Export CSV
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-cyan-500 text-zinc-950 font-bold text-xs hover:bg-cyan-400">
                    Bulk Actions
                  </button>
                </div>
              </div>

              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 font-mono text-zinc-400 text-[11px] uppercase">
                    <th className="p-3 pl-4">Specimen Record</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Latency</th>
                    <th className="p-3">Fidelity Score</th>
                    <th className="p-3">Load</th>
                    <th className="p-3 pr-4 text-right">Hover Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {sampleRecords.map((rec) => {
                    const isHovered = hoveredRowId === rec.id;
                    return (
                      <tr
                        key={rec.id}
                        onMouseEnter={() => setHoveredRowId(rec.id)}
                        onMouseLeave={() => setHoveredRowId(null)}
                        className={`transition-colors duration-150 ${
                          isHovered ? 'bg-cyan-500/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <td className="p-3 pl-4 font-bold text-white font-sans">{rec.name}</td>
                        <td className="p-3 text-zinc-400">{rec.category}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
                            {rec.status}
                          </span>
                        </td>
                        <td className="p-3 text-cyan-300">{rec.latency}</td>
                        <td className="p-3 text-emerald-300">{rec.score}</td>
                        <td className="p-3 text-zinc-300">{rec.load}</td>
                        <td className="p-3 pr-4 text-right">
                          <div className={`flex items-center justify-end gap-1.5 transition-opacity ${
                            isHovered ? 'opacity-100' : 'opacity-30'
                          }`}>
                            <button className="p-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300" title="Inspect">
                              <Search className="w-3.5 h-3.5" />
                            </button>
                            <button className="p-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300" title="Edit">
                              <Sliders className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-Only Bottom Navigation Bar (Docked to Safe Area) */}
      {isMobile && !isLandscape && (
        <div className="sticky bottom-0 inset-x-0 bg-zinc-950/95 border-t border-white/10 px-4 py-2 flex items-center justify-around z-40 backdrop-blur-2xl">
          {[
            { id: 'home', label: 'Home', icon: Smartphone },
            { id: 'explore', label: 'Specimen', icon: Sparkles },
            { id: 'activity', label: 'Stream', icon: Activity },
            { id: 'filters', label: 'Filters', icon: Filter },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeBottomNav === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  triggerHaptic('tap');
                  playSound('tap', 'MICRO');
                  setActiveBottomNav(tab.id);
                  if (tab.id === 'filters') setMobileDrawerOpen(true);
                }}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                  isActive ? 'text-cyan-400 font-bold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-mono">{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Mobile Draggable Filter Drawer (Bottom Sheet Replacement for Desktop Modals) */}
      {mobileDrawerOpen && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex flex-col justify-end animate-in fade-in duration-150">
          <div className="p-5 bg-zinc-900 border-t border-cyan-500/40 rounded-t-3xl space-y-4 max-h-[80%] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            {/* Grab Handle */}
            <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto" />

            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-cyan-400" />
                Mobile Filter Bottom Sheet
              </h4>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              Mobile replacement for desktop dropdown filters. Anchored to the natural thumb zone with high touch targets.
            </p>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-zinc-400 font-bold block">Filter by Category</span>
              <div className="grid grid-cols-2 gap-2">
                {['All Items', 'Telemetry', 'Cognitive', 'Physics'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      triggerHaptic('selection');
                      playSound('selection', 'MICRO');
                      setActiveFilter(cat);
                    }}
                    className={`p-3 rounded-xl text-xs font-mono text-left border transition-all ${
                      activeFilter === cat
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                        : 'bg-zinc-800 border-white/10 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                triggerHaptic('success');
                playSound('success', 'STATE');
                setMobileDrawerOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs uppercase font-mono shadow-lg shadow-cyan-500/20 mt-2"
            >
              Apply Filter Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
