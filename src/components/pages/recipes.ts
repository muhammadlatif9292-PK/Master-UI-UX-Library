/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DesignRecipeId } from './types';

export interface PageStyleRecipe {
  id: DesignRecipeId;
  name: string;
  badge: string;
  bodyBg: string;
  headerBg: string;
  sidebarBg: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  inputBg: string;
  inputBorder: string;
  ringFocus: string;
  divider: string;
}

export const PAGE_RECIPES: Record<DesignRecipeId, PageStyleRecipe> = {
  'modern-slate': {
    id: 'modern-slate',
    name: 'Modern Slate & Indigo',
    badge: 'Standard Cloud SaaS',
    bodyBg: 'bg-slate-950 text-slate-100',
    headerBg: 'bg-slate-900/80 border-slate-800 backdrop-blur-md',
    sidebarBg: 'bg-slate-900/60 border-slate-800',
    cardBg: 'bg-slate-900/70',
    cardBorder: 'border-slate-800/80',
    cardHoverBorder: 'hover:border-indigo-500/50',
    accentBg: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    accentText: 'text-indigo-400',
    accentBorder: 'border-indigo-500/50',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-500',
    inputBg: 'bg-slate-950/80',
    inputBorder: 'border-slate-800 focus:border-indigo-500',
    ringFocus: 'focus:ring-2 focus:ring-indigo-500/30',
    divider: 'border-slate-800/80',
  },
  'tactical-dark': {
    id: 'tactical-dark',
    name: 'Tactical Command Dark',
    badge: 'Mission Critical Ops',
    bodyBg: 'bg-zinc-950 text-zinc-100',
    headerBg: 'bg-black/90 border-zinc-800 backdrop-blur-md',
    sidebarBg: 'bg-black/80 border-zinc-800',
    cardBg: 'bg-zinc-900/90',
    cardBorder: 'border-zinc-800/90',
    cardHoverBorder: 'hover:border-amber-500/50',
    accentBg: 'bg-amber-600 hover:bg-amber-500 text-black font-bold',
    accentText: 'text-amber-400',
    accentBorder: 'border-amber-500/60',
    textPrimary: 'text-zinc-100',
    textSecondary: 'text-zinc-400',
    textMuted: 'text-zinc-600',
    inputBg: 'bg-black/90',
    inputBorder: 'border-zinc-800 focus:border-amber-500',
    ringFocus: 'focus:ring-2 focus:ring-amber-500/30',
    divider: 'border-zinc-800',
  },
  'glass-acrylic': {
    id: 'glass-acrylic',
    name: 'Frosted Glass Acrylic',
    badge: 'Spatial & Immersive',
    bodyBg: 'bg-[#0b0f19] text-slate-100',
    headerBg: 'bg-slate-900/40 border-white/10 backdrop-blur-xl',
    sidebarBg: 'bg-slate-900/30 border-white/10 backdrop-blur-xl',
    cardBg: 'bg-white/[0.04] backdrop-blur-lg',
    cardBorder: 'border-white/10',
    cardHoverBorder: 'hover:border-cyan-400/40',
    accentBg: 'bg-cyan-500/80 hover:bg-cyan-400/90 text-slate-950 font-semibold',
    accentText: 'text-cyan-400',
    accentBorder: 'border-cyan-400/30',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    textMuted: 'text-slate-400/60',
    inputBg: 'bg-black/30 backdrop-blur-md',
    inputBorder: 'border-white/10 focus:border-cyan-400',
    ringFocus: 'focus:ring-2 focus:ring-cyan-400/30',
    divider: 'border-white/10',
  },
  'minimal-mono': {
    id: 'minimal-mono',
    name: 'Minimalist Monochrome',
    badge: 'Editorial & Clean',
    bodyBg: 'bg-neutral-950 text-neutral-200',
    headerBg: 'bg-neutral-900/90 border-neutral-800 backdrop-blur-sm',
    sidebarBg: 'bg-neutral-900/50 border-neutral-800',
    cardBg: 'bg-neutral-900/60',
    cardBorder: 'border-neutral-800',
    cardHoverBorder: 'hover:border-neutral-500',
    accentBg: 'bg-white hover:bg-neutral-200 text-black font-semibold',
    accentText: 'text-white',
    accentBorder: 'border-neutral-600',
    textPrimary: 'text-neutral-100',
    textSecondary: 'text-neutral-400',
    textMuted: 'text-neutral-600',
    inputBg: 'bg-neutral-900/80',
    inputBorder: 'border-neutral-800 focus:border-neutral-400',
    ringFocus: 'focus:ring-2 focus:ring-white/20',
    divider: 'border-neutral-800',
  },
  'cyber-emerald': {
    id: 'cyber-emerald',
    name: 'Cyber Emerald Telemetry',
    badge: 'Telemetry & Lab Instruments',
    bodyBg: 'bg-[#05110d] text-emerald-100',
    headerBg: 'bg-[#081a13]/80 border-emerald-900/50 backdrop-blur-md',
    sidebarBg: 'bg-[#06140e]/70 border-emerald-900/40',
    cardBg: 'bg-[#081f17]/60',
    cardBorder: 'border-emerald-900/40',
    cardHoverBorder: 'hover:border-emerald-400/60',
    accentBg: 'bg-emerald-500 hover:bg-emerald-400 text-black font-bold',
    accentText: 'text-emerald-400',
    accentBorder: 'border-emerald-500/50',
    textPrimary: 'text-emerald-50',
    textSecondary: 'text-emerald-300/80',
    textMuted: 'text-emerald-600',
    inputBg: 'bg-black/60',
    inputBorder: 'border-emerald-900/60 focus:border-emerald-400',
    ringFocus: 'focus:ring-2 focus:ring-emerald-500/30',
    divider: 'border-emerald-950',
  },
  'warm-editorial': {
    id: 'warm-editorial',
    name: 'Warm Editorial Academic',
    badge: 'Research & Knowledge Hub',
    bodyBg: 'bg-[#181512] text-amber-50',
    headerBg: 'bg-[#221e1a]/85 border-amber-900/30 backdrop-blur-md',
    sidebarBg: 'bg-[#1d1916]/70 border-amber-900/30',
    cardBg: 'bg-[#25201b]/60',
    cardBorder: 'border-amber-900/30',
    cardHoverBorder: 'hover:border-amber-500/50',
    accentBg: 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold',
    accentText: 'text-amber-400',
    accentBorder: 'border-amber-500/40',
    textPrimary: 'text-amber-100',
    textSecondary: 'text-amber-200/70',
    textMuted: 'text-stone-500',
    inputBg: 'bg-[#141210]/80',
    inputBorder: 'border-amber-900/40 focus:border-amber-400',
    ringFocus: 'focus:ring-2 focus:ring-amber-500/20',
    divider: 'border-stone-800',
  },
};
