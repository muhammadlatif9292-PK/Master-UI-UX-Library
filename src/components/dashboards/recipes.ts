/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VisualRecipeStyle, VisualRecipeType } from './types';

export const VISUAL_RECIPES: Record<VisualRecipeType, VisualRecipeStyle> = {
  'glass-data': {
    id: 'glass-data',
    name: 'Glass Data',
    description: 'Frosted crystal surfaces with subtle specular reflections, backdrop blur, and crisp high-contrast data vectors.',
    containerClass: 'bg-slate-950/90 backdrop-blur-xl',
    cardClass: 'bg-slate-900/60 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/40 hover:border-white/20 transition-all',
    headerClass: 'border-b border-white/10 bg-slate-900/40 backdrop-blur-md',
    textPrimary: 'text-white font-medium',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400',
    borderClass: 'border-white/10',
    accentColor: '#38bdf8', // sky-400
    secondaryColor: '#818cf8', // indigo-400
    tertiaryColor: '#34d399', // emerald-400
    gridLineColor: 'rgba(255, 255, 255, 0.07)',
    chartBackground: 'rgba(15, 23, 42, 0.4)',
    glowEffect: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.35))',
    badgeClass: 'bg-sky-500/15 text-sky-300 border border-sky-500/30',
    tooltipBg: 'rgba(15, 23, 42, 0.95)',
  },
  'luminous-data': {
    id: 'luminous-data',
    name: 'Luminous Data',
    description: 'Deep obsidian void with brilliant phosphor-emitting chart series, glowing nodes, and high-visibility luminescence.',
    containerClass: 'bg-zinc-950',
    cardClass: 'bg-zinc-900/90 border border-cyan-500/25 shadow-[0_0_25px_rgba(6,182,212,0.12)] hover:border-cyan-400/50 transition-all',
    headerClass: 'border-b border-cyan-500/20 bg-zinc-950/80',
    textPrimary: 'text-cyan-50 font-semibold tracking-wide',
    textSecondary: 'text-cyan-200/80',
    textMuted: 'text-zinc-400',
    borderClass: 'border-cyan-500/30',
    accentColor: '#06b6d4', // cyan-500
    secondaryColor: '#a855f7', // purple-500
    tertiaryColor: '#10b981', // emerald-500
    gridLineColor: 'rgba(6, 182, 212, 0.12)',
    chartBackground: 'rgba(24, 24, 27, 0.8)',
    glowEffect: 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))',
    badgeClass: 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]',
    tooltipBg: 'rgba(9, 9, 11, 0.98)',
  },
  'scientific': {
    id: 'scientific',
    name: 'Scientific',
    description: 'Precision laboratory instrumentation aesthetic with clean Cartesian coordinates, high-density ticks, and analytical contrast.',
    containerClass: 'bg-slate-900',
    cardClass: 'bg-slate-950 border border-slate-700/60 shadow-lg',
    headerClass: 'border-b border-slate-800 bg-slate-900/90',
    textPrimary: 'text-slate-100 font-mono font-medium',
    textSecondary: 'text-slate-300 font-mono text-xs',
    textMuted: 'text-slate-400 font-mono',
    borderClass: 'border-slate-700/80',
    accentColor: '#0ea5e9', // ocean-500
    secondaryColor: '#f59e0b', // amber-500
    tertiaryColor: '#10b981', // emerald-500
    gridLineColor: 'rgba(148, 163, 184, 0.15)',
    chartBackground: 'rgba(2, 6, 23, 0.95)',
    glowEffect: 'none',
    badgeClass: 'bg-slate-800 text-slate-200 border border-slate-600 font-mono',
    tooltipBg: 'rgba(2, 6, 23, 0.98)',
  },
  'laboratory': {
    id: 'laboratory',
    name: 'Laboratory',
    description: 'Cleanroom research aesthetic with titanium white contrast, calibrated amber/cobalt accents, and strict data telemetry.',
    containerClass: 'bg-neutral-900',
    cardClass: 'bg-neutral-950 border border-neutral-700/80 shadow-md',
    headerClass: 'border-b border-neutral-700 bg-neutral-900',
    textPrimary: 'text-neutral-100 font-semibold',
    textSecondary: 'text-neutral-300',
    textMuted: 'text-neutral-400',
    borderClass: 'border-neutral-700',
    accentColor: '#f97316', // orange-500 / amber
    secondaryColor: '#3b82f6', // blue-500
    tertiaryColor: '#14b8a6', // teal-500
    gridLineColor: 'rgba(212, 212, 216, 0.12)',
    chartBackground: 'rgba(10, 10, 10, 0.95)',
    glowEffect: 'drop-shadow(0 0 6px rgba(249, 115, 22, 0.4))',
    badgeClass: 'bg-orange-500/15 text-orange-300 border border-orange-500/40 font-mono',
    tooltipBg: 'rgba(10, 10, 10, 0.98)',
  },
  'quantum': {
    id: 'quantum',
    name: 'Quantum',
    description: 'Hyper-dimensional particle field aesthetic with violet-indigo resonance, quantum spin states, and particle density graphs.',
    containerClass: 'bg-[#090514]',
    cardClass: 'bg-[#120a26]/90 border border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:border-violet-400/50 transition-all',
    headerClass: 'border-b border-violet-500/20 bg-[#0d071c]/90',
    textPrimary: 'text-violet-50 font-medium',
    textSecondary: 'text-violet-200/80',
    textMuted: 'text-violet-400/60',
    borderClass: 'border-violet-500/30',
    accentColor: '#8b5cf6', // violet-500
    secondaryColor: '#ec4899', // pink-500
    tertiaryColor: '#06b6d4', // cyan-500
    gridLineColor: 'rgba(139, 92, 246, 0.15)',
    chartBackground: 'rgba(18, 10, 38, 0.8)',
    glowEffect: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))',
    badgeClass: 'bg-violet-500/20 text-violet-200 border border-violet-400/40',
    tooltipBg: 'rgba(9, 5, 20, 0.98)',
  },
  'editorial': {
    id: 'editorial',
    name: 'Editorial',
    description: 'High-craft financial publication format with elegant serif headings, warm slate dividers, and bespoke data journalism accents.',
    containerClass: 'bg-stone-950',
    cardClass: 'bg-stone-900 border border-stone-800 shadow-md',
    headerClass: 'border-b border-stone-800 bg-stone-900',
    textPrimary: 'text-stone-100 font-serif font-bold text-lg',
    textSecondary: 'text-stone-300 font-sans',
    textMuted: 'text-stone-400 font-sans',
    borderClass: 'border-stone-800',
    accentColor: '#d97706', // amber-600
    secondaryColor: '#059669', // emerald-600
    tertiaryColor: '#2563eb', // blue-600
    gridLineColor: 'rgba(214, 211, 209, 0.1)',
    chartBackground: 'rgba(28, 25, 23, 0.9)',
    glowEffect: 'none',
    badgeClass: 'bg-stone-800 text-stone-200 border border-stone-700 font-serif',
    tooltipBg: 'rgba(28, 25, 23, 0.98)',
  },
  'minimal': {
    id: 'minimal',
    name: 'Minimal',
    description: 'Pure functional reduction eliminating decorative ornament in favor of maximum chart data-ink ratio and high typography contrast.',
    containerClass: 'bg-black',
    cardClass: 'bg-zinc-950 border border-zinc-800/80 hover:border-zinc-700 transition-all',
    headerClass: 'border-b border-zinc-800 bg-zinc-950',
    textPrimary: 'text-zinc-100 font-medium',
    textSecondary: 'text-zinc-300 text-sm',
    textMuted: 'text-zinc-400 text-xs',
    borderClass: 'border-zinc-800',
    accentColor: '#f43f5e', // rose-500
    secondaryColor: '#38bdf8', // sky-400
    tertiaryColor: '#a1a1aa', // zinc-400
    gridLineColor: 'rgba(255, 255, 255, 0.05)',
    chartBackground: 'rgba(9, 9, 11, 0.95)',
    glowEffect: 'none',
    badgeClass: 'bg-zinc-900 text-zinc-300 border border-zinc-700',
    tooltipBg: 'rgba(9, 9, 11, 0.98)',
  },
  'neon': {
    id: 'neon',
    name: 'Neon Cyberpunk',
    description: 'High-voltage electric cyberpunk telemetry with vibrant lime green, hot pink, and hyper-saturated laser scanlines.',
    containerClass: 'bg-[#040608]',
    cardClass: 'bg-[#090d12] border border-lime-400/40 shadow-[0_0_20px_rgba(163,230,53,0.15)] hover:border-lime-300/70 transition-all',
    headerClass: 'border-b border-lime-400/30 bg-[#06090d]',
    textPrimary: 'text-lime-300 font-mono font-bold tracking-wider',
    textSecondary: 'text-lime-100/90 font-mono',
    textMuted: 'text-zinc-400 font-mono',
    borderClass: 'border-lime-400/40',
    accentColor: '#a3e635', // lime-400
    secondaryColor: '#f43f5e', // rose-500
    tertiaryColor: '#22d3ee', // cyan-400
    gridLineColor: 'rgba(163, 230, 53, 0.15)',
    chartBackground: 'rgba(9, 13, 18, 0.9)',
    glowEffect: 'drop-shadow(0 0 10px rgba(163, 230, 53, 0.7))',
    badgeClass: 'bg-lime-400/20 text-lime-300 border border-lime-400/50 font-mono shadow-[0_0_10px_rgba(163,230,53,0.3)]',
    tooltipBg: 'rgba(4, 6, 8, 0.98)',
  },
  'spatial': {
    id: 'spatial',
    name: 'Spatial Reality',
    description: 'Spatial computing glass prisms with 3D elevation vectors, directional light reflection, and floating depth layers.',
    containerClass: 'bg-slate-950',
    cardClass: 'bg-slate-900/80 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl',
    headerClass: 'border-b border-white/15 bg-slate-900/50 rounded-t-2xl',
    textPrimary: 'text-white font-medium tracking-tight',
    textSecondary: 'text-slate-200',
    textMuted: 'text-slate-400',
    borderClass: 'border-white/20',
    accentColor: '#60a5fa', // blue-400
    secondaryColor: '#c084fc', // purple-400
    tertiaryColor: '#34d399', // emerald-400
    gridLineColor: 'rgba(255, 255, 255, 0.08)',
    chartBackground: 'rgba(15, 23, 42, 0.5)',
    glowEffect: 'drop-shadow(0 8px 16px rgba(96, 165, 250, 0.35))',
    badgeClass: 'bg-white/15 text-white border border-white/30 backdrop-blur-md rounded-full',
    tooltipBg: 'rgba(15, 23, 42, 0.95)',
  },
};
