/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DifferenceItem } from './types';
import {
  GitCompare,
  Monitor,
  Smartphone,
  AlertTriangle,
  CheckCircle2,
  Layers,
  MousePointer,
  Hand,
  Sliders,
  Maximize2,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  Eye,
  Info,
} from 'lucide-react';

export const DIFFERENCE_ITEMS: DifferenceItem[] = [
  {
    category: 'interaction',
    title: 'Hover State Elimination & Tactile Replacement',
    desktopBehavior: 'Pointer hover triggers tooltip overlays, subtle 3D elevations, preview popups, and quick-action icon buttons on table rows.',
    mobileBehavior: 'Hover pseudo-class disabled. Replaced with Tap-to-Inspect badges, 400ms Long-Press context trays with haptic vibration, and swipeable row action reveals.',
    whyAdaptive: 'Touchscreens lack a pointer pre-contact state. Forcing hover causes double-tap friction, sticky hover states, and invisible essential actions.',
    antiPatternWarning: 'Shrinking hover dropdowns onto mobile leaves users unable to open submenus or discover critical action buttons.',
  },
  {
    category: 'layout',
    title: 'Multi-Pane Split vs. Sequential Bottom Sheet Stack',
    desktopBehavior: '3-column side-by-side master-detail-inspector panels with simultaneous real-time data visibility across 1920px+ width.',
    mobileBehavior: 'Transforms into a single-column prioritized stream with bottom navigation tabs, slide-over detail pages, and draggable bottom sheets.',
    whyAdaptive: 'Phone widths (360px–430px) cannot render 3 columns simultaneously without crushing content to illegible line widths (<20ch).',
    antiPatternWarning: 'Horizontal scroll traps and tiny pinched multi-column tables cause cognitive overload and frequent mis-taps.',
  },
  {
    category: 'reachability',
    title: 'Top-Heavy Controls vs. Natural Thumb Arc Anchor',
    desktopBehavior: 'Primary action buttons, global navigation, and search bars reside comfortably in the top header and top-right corner.',
    mobileBehavior: 'Primary CTAs, floating action buttons (FAB), and primary tab navigation are anchored to the bottom 40% (Thumb Safe Zone).',
    whyAdaptive: 'Single-handed smartphone grip cannot comfortably reach top corners without hand readjustment and drop risk.',
    antiPatternWarning: 'Placing critical confirm/save actions at top-left or top-right on tall screens (844px+) forces two-handed strain.',
  },
  {
    category: 'density',
    title: 'Tabular Dense Data vs. Touch Card Decks',
    desktopBehavior: 'High-density multi-column data tables with sortable column headers, bulk checkboxes, inline editing, and 32px row heights.',
    mobileBehavior: 'Transforms into vertical card decks with key metric badges, expandable accordions for secondary fields, and swipe-to-delete actions.',
    whyAdaptive: 'Touch interaction requires minimum 44×44px (WCAG 2.2 SC 2.5.8) or 48×48px tap targets, precluding dense 24px desktop table rows.',
    antiPatternWarning: 'Shrinking 8-column desktop tables onto mobile forces horizontal scroll bars or squishes text into single-character wraps.',
  },
  {
    category: 'navigation',
    title: 'Expanded Sidebar vs. Bottom Nav Bar + Drawer',
    desktopBehavior: '240px persistent left sidebar with nested folder trees, search bar, and user profile drawer always visible.',
    mobileBehavior: 'Transforms into a 56px bottom navigation bar for top 4 views, with a hamburger modal drawer for deep secondary settings.',
    whyAdaptive: 'Maximizes precious vertical viewport canvas while keeping top destinations instantly accessible with one tap.',
    antiPatternWarning: 'Hiding all desktop navigation inside a buried 4th-level hamburger menu creates severe navigation friction.',
  },
];

export const DifferenceInspector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);

  const filteredItems = selectedCategory === 'all'
    ? DIFFERENCE_ITEMS
    : DIFFERENCE_ITEMS.filter((i) => i.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-zinc-900/60 to-purple-950/40 border border-cyan-500/30 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <GitCompare className="w-4 h-4" />
              </span>
              <h2 className="text-lg font-bold text-white">Desktop vs. Mobile Architectural Difference Matrix</h2>
            </div>
            <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
              True responsive craftsmanship requires fundamentally adapting interaction paradigms, density budgets, and ergonomics — never simply compressing desktop pixels into a smaller viewport.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Zero Desktop Shrinking Allowed
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2">
          {['all', 'interaction', 'layout', 'reachability', 'density', 'navigation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Difference Comparison Cards */}
      <div className="grid grid-cols-1 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-6 hover:border-cyan-500/40 transition-all shadow-xl"
          >
            {/* Title & Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                  0{idx + 1}
                </span>
                <h3 className="font-bold text-white text-base">{item.title}</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-300 uppercase">
                {item.category}
              </span>
            </div>

            {/* Side-by-side Desktop vs Mobile Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Desktop Column */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 font-bold">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <span>Desktop Paradigm (Mouse & Keyboard)</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{item.desktopBehavior}</p>
              </div>

              {/* Mobile Column */}
              <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span>Mobile Paradigm (Direct Touch & Thumb Arc)</span>
                </div>
                <p className="text-xs text-cyan-100 leading-relaxed">{item.mobileBehavior}</p>
              </div>
            </div>

            {/* Why Adaptive & Anti-Pattern Warnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-300 block mb-1">Architectural Rationale:</span>
                  <p className="text-emerald-100/90 leading-relaxed">{item.whyAdaptive}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-300 block mb-1">Anti-Pattern (Shrink Failure):</span>
                  <p className="text-rose-100/90 leading-relaxed">{item.antiPatternWarning}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
