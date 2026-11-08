/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { useSound } from '../design-system/sound/SoundContext';
import { ARCHETYPE_TOKENS } from '../design-system/tokens';
import { DesignArchetype } from '../types/architecture';
import { CATALOG_REGISTRY } from '../design-system/catalog/catalogRegistry';
import {
  Search,
  Command,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Gauge,
  Smartphone,
  Wand2,
  Box,
  Compass,
  MousePointerClick,
  Keyboard,
  LayoutGrid,
  LayoutDashboard,
  BrainCircuit,
  Bot,
  Globe,
  FlaskConical,
  Workflow,
  MonitorCheck,
  Zap,
  Music,
  Vibrate,
  Palette,
  Clock,
  Star,
  Bookmark,
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Sliders,
  Layers,
  Flame,
  ArrowRight,
  SlidersHorizontal,
  FolderKanban,
  Download,
  Copy,
  Eye,
  Glasses,
  Scale,
} from 'lucide-react';

type NavTab = any;

interface HomeCommandCenterProps {
  onNavigate: (tab: NavTab) => void;
  onOpenCommandPalette: () => void;
  onSelectEntry?: (entry: typeof CATALOG_REGISTRY[0]) => void;
  recentTabs?: NavTab[];
  favoritesCount?: number;
  collectionsCount?: number;
}

export function HomeCommandCenter({
  onNavigate,
  onOpenCommandPalette,
  onSelectEntry,
  recentTabs = ['explore', 'auth', 'customize', 'motion'],
  favoritesCount = 3,
  collectionsCount = 2,
}: HomeCommandCenterProps) {
  const { theme, activeThemeId, setThemeId } = useTheme();
  const { playSound } = useSound();
  const [quickSearch, setQuickSearch] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  // Dynamic component counts by family
  const familyCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    CATALOG_REGISTRY.forEach((entry) => {
      counts[entry.family] = (counts[entry.family] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter registry entries for quick search on Home
  const searchResults = React.useMemo(() => {
    if (!quickSearch.trim()) return [];
    const q = quickSearch.toLowerCase();
    return CATALOG_REGISTRY.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q)) ||
        e.family.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [quickSearch]);

  const handleCopyPrompt = (promptText: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(promptText);
    playSound('success', 'MICRO');
    setTimeout(() => setCopiedPrompt(null), 2500);
  };

  // 1. Five Core Destination Cards for "How to Use This Library"
  const workflowDestinations = [
    {
      step: '01',
      title: 'Explore Catalog',
      desc: 'Browse 300+ production components & 12 style archetypes with interactive live states.',
      target: 'explore',
      icon: Compass,
      accent: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/30',
      btnLabel: 'Browse Components',
    },
    {
      step: '02',
      title: 'Customize Recipe',
      desc: 'Mix archetypes, spring physics, procedural audio, and haptics in the interactive composer.',
      target: 'customize',
      icon: Wand2,
      accent: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/30',
      btnLabel: 'Open Composer',
    },
    {
      step: '03',
      title: 'Compare & Collect',
      desc: 'Bookmark favorites, build multi-screen projects, and compare specimens side-by-side.',
      target: 'collections',
      icon: Bookmark,
      accent: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/30',
      btnLabel: 'View Collections',
    },
    {
      step: '04',
      title: 'Diagnostic Labs',
      desc: 'Audit WCAG AAA contrast, test 7 device viewports, tune 24 springs, and monitor GPU tiers.',
      target: 'labs',
      icon: FlaskConical,
      accent: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/30',
      btnLabel: 'Launch Labs',
    },
    {
      step: '05',
      title: 'Export to My App',
      desc: 'Generate ready-to-use TypeScript React components, Tailwind recipes, and AI prompts.',
      target: 'export',
      icon: Download,
      accent: 'text-pink-400',
      bg: 'bg-pink-500/10 border-pink-500/30',
      btnLabel: 'Export Code',
    },
  ];

  // 2. High-Intent Natural Language Prompts
  const naturalLanguagePrompts = [
    {
      title: 'Cinematic Liquid Glass Login',
      prompt: 'Use the Master UI/UX Library\'s Cinematic Liquid Glass Login with 8-state companion mascot, Web Audio sound synthesis, and WCAG AAA compliance.',
      archetype: 'Cinematic Dark',
      category: 'auth',
      tags: ['8-State Mascot', 'Web Audio', 'WCAG AAA'],
    },
    {
      title: 'Obsidian 24k Gold Luxury Card',
      prompt: 'Create a luxury financial card using Obsidian Luxury archetype with 24k gold borders, serif headings, and tactile micro-press haptics.',
      archetype: 'Restrained Luxury',
      category: 'cards',
      tags: ['Gold Trim', 'Serif', 'Obsidian'],
    },
    {
      title: 'Cyberpunk HUD Telemetry Dashboard',
      prompt: 'Build a Cyberpunk HUD telemetry dashboard with bracket notch borders, monospace telemetry, and performance Tier 1 GPU monitoring.',
      archetype: 'Futuristic Cyber',
      category: 'dashboards',
      tags: ['HUD Brackets', 'Monospace', 'GPU Monitored'],
    },
    {
      title: 'Scientific Node Graph Flow Canvas',
      prompt: 'Implement a scientific node graph workflow editor with clean sterile slate styling, interactive ports, and spring drag physics.',
      archetype: 'Scientific Lab',
      category: 'workflow',
      tags: ['Node Graph', 'Sterile Slate', 'Spring Drag'],
    },
  ];

  const componentFamilies = [
    { id: 'auth', name: 'Auth Family Catalog', count: familyCounts['auth'] || 120, icon: ShieldCheck, desc: 'Mascot state machines, biometrics, 2FA, luxury portals' },
    { id: 'navigation', name: 'Navigation & Dials', count: familyCounts['navigation'] || 58, icon: Compass, desc: 'Floating docks, radial dials, spatial 3D rails' },
    { id: 'buttons', name: 'Button & Action Suite', count: familyCounts['action'] || 51, icon: MousePointerClick, desc: 'Tactile switches, magnetic physics, hold-to-confirm' },
    { id: 'inputs', name: 'Input & Form Suite', count: familyCounts['input'] || 49, icon: Keyboard, desc: 'Matrix sliders, PIN fields, drag-drop dropzones' },
    { id: 'cards', name: 'Card & Bento Suite', count: familyCounts['surface'] || 35, icon: LayoutGrid, desc: 'Asymmetric bentos, spatial refraction, telemetry slabs' },
    { id: 'dashboards', name: 'Dashboards & Analytics', count: familyCounts['layout'] || 16, icon: LayoutDashboard, desc: 'Avionics telemetry, multi-column analytics grids' },
    { id: 'ai-interface', name: 'AI Interface Catalog', count: familyCounts['ai'] || 14, icon: BrainCircuit, desc: 'Prompt consoles, multi-modal audio visualizers' },
    { id: 'spatial', name: 'Spatial & 3D Objects', count: 12, icon: Globe, desc: '3D Holo cubes, tilt viewports, spatial containers' },
    { id: 'scientific', name: 'Scientific Catalog Lab', count: 10, icon: FlaskConical, desc: 'Oscilloscopes, sterile laboratory instrumentation' },
    { id: 'workflow', name: 'Workflow Node Editors', count: 8, icon: Workflow, desc: 'Interactive node graph editors & flow canvases' },
    { id: 'character', name: 'Character & Mascots', count: 5, icon: Bot, desc: '8-state interactive pet companion physics' },
    { id: 'pages', name: 'Page Experiences', count: 16, icon: MonitorCheck, desc: '16 complete full-page application viewports' },
  ];

  const archetypeList: { key: DesignArchetype; label: string; tag: string; bg: string; border: string; accent: string }[] = [
    { key: 'restrained-luxury', label: 'Restrained Luxury', tag: 'Obsidian & Gold', bg: 'bg-zinc-950', border: 'border-amber-500/40', accent: 'text-amber-400' },
    { key: 'cinematic-dark', label: 'Cinematic Dark', tag: 'Slate & Cyan Glass', bg: 'bg-slate-950', border: 'border-cyan-500/40', accent: 'text-cyan-400' },
    { key: 'futuristic-cyber', label: 'Futuristic Cyber', tag: 'HUD Monospace', bg: 'bg-black', border: 'border-emerald-500/40', accent: 'text-emerald-400' },
    { key: 'scientific-lab', label: 'Scientific Lab', tag: 'Clean Sterile Slate', bg: 'bg-slate-900', border: 'border-blue-500/40', accent: 'text-blue-400' },
    { key: 'neumorphic-glass', label: 'Neumorphic Glass', tag: 'Refractive Purple', bg: 'bg-purple-950/80', border: 'border-purple-500/40', accent: 'text-purple-400' },
    { key: 'mechanical-tactile', label: 'Mechanical Tactile', tag: 'Switchgear Amber', bg: 'bg-zinc-900', border: 'border-amber-600/40', accent: 'text-amber-500' },
    { key: 'brutalist-grid', label: 'Brutalist Grid', tag: 'High Density Red', bg: 'bg-stone-950', border: 'border-red-500/40', accent: 'text-red-400' },
    { key: 'editorial-serif', label: 'Editorial Serif', tag: 'Archival Warm', bg: 'bg-amber-950/50', border: 'border-amber-700/40', accent: 'text-amber-300' },
    { key: 'minimal-monastic', label: 'Minimal Monastic', tag: 'Zen Graphite', bg: 'bg-zinc-900', border: 'border-zinc-700/40', accent: 'text-zinc-300' },
    { key: 'biomorphic-organic', label: 'Biomorphic Organic', tag: 'Canopy Emerald', bg: 'bg-emerald-950/60', border: 'border-emerald-500/40', accent: 'text-emerald-300' },
    { key: 'retro-computing', label: 'Retro Computing', tag: 'CRT Phosphor P1', bg: 'bg-black', border: 'border-green-500/40', accent: 'text-green-400' },
    { key: 'ai-character', label: 'AI Character', tag: 'Companion Indigo', bg: 'bg-indigo-950/80', border: 'border-indigo-500/40', accent: 'text-indigo-400' },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* 1. Clear Product Hero & Elevator Pitch */}
      <div className={`p-6 md:p-10 rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border ${theme.border.default} shadow-2xl relative overflow-hidden space-y-8`}>
        {/* Ambient atmospheric backdrop */}
        <div className="absolute top-0 right-0 w-[32rem] h-[32rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold inline-flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Master UI/UX Design System
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> WCAG 2.2 AAA Verified
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Design, tune &amp; export production UI with zero friction.
            </h1>

            <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-sans">
              The unified creative developer suite featuring <strong className="text-white">{CATALOG_REGISTRY.length}+ interactive components</strong>, <strong className="text-white">12 design archetypes</strong>, Web Audio sound synthesis, tactile haptics, and automated performance tiers.
            </p>
          </div>

          {/* Primary Quick Start CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => {
                onNavigate('explore');
                playSound('selection', 'NAVIGATION');
              }}
              className="px-6 py-3.5 rounded-2xl bg-cyan-500 text-zinc-950 font-bold text-sm font-mono shadow-xl hover:bg-cyan-400 hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2.5 touch-press group"
            >
              <Compass className="w-4 h-4 text-zinc-950 group-hover:rotate-45 transition-transform" />
              <span>Explore All Components</span>
              <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                onNavigate('customize');
                playSound('selection', 'NAVIGATION');
              }}
              className="px-6 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-700 text-zinc-100 font-bold text-sm font-mono hover:bg-zinc-800 hover:border-zinc-600 transition-all flex items-center justify-center gap-2.5 touch-press"
            >
              <Wand2 className="w-4 h-4 text-purple-400" />
              <span>Launch Recipe Composer</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-800/80 font-mono text-xs">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800/60 flex items-center gap-3">
            <Box className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-zinc-500 text-[10px]">PRODUCTION SPECIMENS</div>
              <div className="text-white font-bold">{CATALOG_REGISTRY.length}+ Verified Components</div>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800/60 flex items-center gap-3">
            <Palette className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-zinc-500 text-[10px]">DESIGN ARCHETYPES</div>
              <div className="text-white font-bold">12 Unique Presets</div>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800/60 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-zinc-500 text-[10px]">ACCESSIBILITY STANDARD</div>
              <div className="text-white font-bold">12/12 WCAG AAA Vectors</div>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800/60 flex items-center gap-3">
            <Gauge className="w-5 h-5 text-purple-400 shrink-0" />
            <div>
              <div className="text-zinc-500 text-[10px]">PERFORMANCE GOVERNOR</div>
              <div className="text-white font-bold">Tiers 1-3 Monitored</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Step-by-Step Workflow Guide: How to Use This Library */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" /> How to Use This Design System
            </h2>
            <p className="text-xs md:text-sm text-zinc-400">
              Follow these 5 core workflow steps to discover, customize, validate, and integrate components.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {workflowDestinations.map((dest) => {
            const Icon = dest.icon;
            return (
              <div
                key={dest.step}
                onClick={() => {
                  onNavigate(dest.target);
                  playSound('selection', 'NAVIGATION');
                }}
                className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg hover:shadow-cyan-500/5 touch-press"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-400 group-hover:text-cyan-300 transition-colors">
                      STEP {dest.step}
                    </span>
                    <div className={`p-2 rounded-xl ${dest.bg} ${dest.accent}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {dest.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {dest.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400 group-hover:text-cyan-400 transition-colors">
                  <span>{dest.btnLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Inline Quick Search Bar */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search all 300+ components, styles, or labs (e.g. liquid glass login, pet mascot, bento card, 3d holo)..."
            value={quickSearch}
            onChange={(e) => setQuickSearch(e.target.value)}
            className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-xl transition-all font-sans"
          />
          <button
            onClick={onOpenCommandPalette}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1"
          >
            <Command className="w-3 h-3" /> K
          </button>
        </div>

        {/* Quick Search Dropdown Results */}
        {searchResults.length > 0 && (
          <div className="p-2 rounded-2xl bg-zinc-900 border border-zinc-700 shadow-2xl space-y-1 animate-page-entry">
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-zinc-500 font-bold">
              Matching Catalog Items ({searchResults.length})
            </div>
            {searchResults.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (onSelectEntry) {
                    onSelectEntry(item);
                  } else {
                    onNavigate('explore');
                  }
                  playSound('selection', 'MICRO');
                }}
                className="p-3 rounded-xl hover:bg-zinc-800/80 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-xs text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                    {item.name}
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400 uppercase">
                      {item.family}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 line-clamp-1">{item.description}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Natural Language Prompt Shortcuts: "Just Ask Gemini" */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-purple-400" /> Natural Language AI Prompts
            </h2>
            <p className="text-xs md:text-sm text-zinc-400">
              Copy ready-to-use prompts to generate these exact components and archetypes in your own project.
            </p>
          </div>
          <button
            onClick={() => onNavigate('export')}
            className="text-xs font-mono text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
          >
            Prompt Generator <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {naturalLanguagePrompts.map((nlp, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-purple-500/50 transition-all space-y-3.5 shadow-lg group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                    {nlp.title}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 font-bold">
                    {nlp.archetype}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-black/50 border border-zinc-800/80 text-xs font-mono text-zinc-300 leading-relaxed select-all">
                  &ldquo;{nlp.prompt}&rdquo;
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {nlp.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                <button
                  onClick={() => onNavigate(nlp.category)}
                  className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview Specimen
                </button>

                <button
                  onClick={(e) => handleCopyPrompt(nlp.prompt, e)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                    copiedPrompt === nlp.prompt
                      ? 'bg-emerald-500 text-zinc-950'
                      : 'bg-zinc-800 text-zinc-200 hover:bg-purple-600 hover:text-white'
                  }`}
                >
                  {copiedPrompt === nlp.prompt ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Prompt
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Component Family Explorer Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" /> Component Family Catalog
            </h2>
            <p className="text-xs md:text-sm text-zinc-400">
              Direct access to all 16+ production component suites with live interactive states.
            </p>
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
          >
            Explore All ({CATALOG_REGISTRY.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {componentFamilies.map((fam) => {
            const Icon = fam.icon;
            return (
              <div
                key={fam.id}
                onClick={() => {
                  onNavigate(fam.id);
                  playSound('selection', 'MICRO');
                }}
                className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-cyan-500/50 transition-all cursor-pointer group flex flex-col justify-between space-y-3 shadow-lg hover:shadow-cyan-500/5 touch-press"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-mono font-bold text-cyan-300">
                      {fam.count} entries
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      {fam.name}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {fam.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-500 group-hover:text-cyan-400 transition-colors">
                  <span>Explore Suite</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Style Family Strip (12 Design Archetypes) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-amber-400" /> Featured Design Archetypes (12 Presets)
            </h2>
            <p className="text-xs md:text-sm text-zinc-400">
              Click any archetype to preview and apply its system-wide visual tokens instantly.
            </p>
          </div>
          <button
            onClick={() => onNavigate('tokens')}
            className="text-xs font-mono text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
          >
            Manage Tokens <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {archetypeList.map((arch) => {
            const isActive = activeThemeId === arch.key;
            return (
              <button
                key={arch.key}
                onClick={() => {
                  setThemeId(arch.key);
                  playSound('selection', 'MICRO');
                }}
                className={`p-3.5 rounded-2xl ${arch.bg} border ${
                  isActive ? 'border-amber-400 ring-2 ring-amber-400/30' : arch.border
                } hover:scale-[1.02] transition-all text-left space-y-2 shadow-lg group relative overflow-hidden touch-press`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${arch.accent} uppercase tracking-wider`}>
                    {arch.label}
                  </span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                </div>
                <div className="text-[11px] font-bold text-white leading-tight">{arch.tag}</div>
                <div className="flex items-center gap-1 pt-1">
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-cyan-400/80" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Collections & Compare Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs font-mono uppercase text-zinc-300 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" /> Favorited Specimens ({favoritesCount})
            </h3>
            <button
              onClick={() => onNavigate('favorites')}
              className="text-[11px] font-mono text-cyan-400 hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-2 font-mono text-xs">
            {['Cinematic Mascot Auth', 'Frosted Glass Surface', 'Obsidian Luxury Auth'].map((item, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate('explore')}
                className="p-2.5 rounded-xl bg-black/30 border border-zinc-800 hover:border-amber-400/50 transition-colors cursor-pointer flex items-center justify-between text-zinc-300 hover:text-white"
              >
                <span>{item}</span>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs font-mono uppercase text-zinc-300 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-cyan-400" /> Saved Collections ({collectionsCount})
            </h3>
            <button
              onClick={() => onNavigate('collections')}
              className="text-[11px] font-mono text-cyan-400 hover:underline"
            >
              Manage Collections
            </button>
          </div>
          <div className="space-y-2 font-mono text-xs">
            {[
              { name: 'Primary Mobile Dashboard', count: '3 items' },
              { name: 'Immersive Dark Room', count: '3 items' },
            ].map((col, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate('collections')}
                className="p-2.5 rounded-xl bg-black/30 border border-zinc-800 hover:border-cyan-400/50 transition-colors cursor-pointer flex items-center justify-between text-zinc-300 hover:text-white"
              >
                <span>{col.name}</span>
                <span className="text-[10px] text-zinc-500">{col.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
