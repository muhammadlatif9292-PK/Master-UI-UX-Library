/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, ErrorInfo, ReactNode } from 'react';
import { CatalogEntry } from '../design-system/catalog/catalogTypes';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { useMotion } from '../design-system/motion/MotionContext';
import { useSound } from '../design-system/sound/SoundContext';
import { useHaptics } from '../design-system/haptics/HapticContext';
import { ARCHETYPE_TOKENS } from '../design-system/tokens';
import { DesignArchetype } from '../types/architecture';
import {
  Sparkles,
  Shield,
  Lock,
  Search,
  ArrowRight,
  Activity,
  Cpu,
  Check,
  Terminal,
  Zap,
  Layers,
  Play,
  Eye,
  Sliders,
  Globe,
  Bot,
  Radio,
  Compass,
  BarChart2,
  MessageSquare,
  Workflow,
  Star,
  User,
  ChevronRight,
  AlertCircle,
  Clock,
  Send,
  Bell,
  Heart,
  MousePointer,
  Maximize2,
  Box,
  Flame,
  Gauge,
  SlidersHorizontal,
} from 'lucide-react';

// Error Boundary to catch any live preview errors gracefully
interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackStyle: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SpecimenErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public props!: ErrorBoundaryProps;
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Specimen preview caught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-zinc-400 bg-zinc-900/60 rounded-xl border border-zinc-800">
          <AlertCircle className="w-5 h-5 text-amber-400 mb-1" />
          <span className="text-xs font-mono text-zinc-300">Live Specimen</span>
          <span className="text-[10px] text-zinc-500 font-mono mt-0.5">{this.props.fallbackStyle}</span>
        </div>
      );
    }
    return this.props.children;
  }
}

// Helper to derive archetype and visual styling classes from entry metadata
export function resolveArchetypeFromEntry(entry: CatalogEntry): {
  archetype: DesignArchetype;
  canvasBg: string;
  surfaceBg: string;
  borderColor: string;
  accentText: string;
  accentGlow: string;
  fontTitle: string;
} {
  const signal = [
    entry.visualStyle,
    entry.mood,
    entry.family,
    entry.id,
    ...(entry.tags || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  let archetype: DesignArchetype = 'cinematic-dark';

  if (/luxury|gold|obsidian|24k|champagne|editorial|serif|royal/.test(signal)) {
    archetype = 'restrained-luxury';
  } else if (/cyber|hud|neon|terminal|sci-fi|holographic|matrix|glitch/.test(signal)) {
    archetype = 'futuristic-cyber';
  } else if (/brutalist|raw|neo-brutalist|grid|sharp/.test(signal)) {
    archetype = 'brutalist-grid';
  } else if (/glass|liquid|frosted|aurora|translucent|neumorphic/.test(signal)) {
    archetype = 'neumorphic-glass';
  } else if (/scientific|lab|sterile|clean|medical|data|cobalt/.test(signal)) {
    archetype = 'scientific-lab';
  } else if (/clay|claymorphism|volumetric|soft|bento/.test(signal)) {
    archetype = 'biomorphic-organic';
  } else if (/mechanical|tactile|switchgear|industrial|skeuomorphic/.test(signal)) {
    archetype = 'mechanical-tactile';
  } else if (/character|mascot|companion|ai|indigo/.test(signal)) {
    archetype = 'ai-character';
  } else if (/zen|monastic|minimal|graphite/.test(signal)) {
    archetype = 'minimal-monastic';
  } else if (/retro|computing|crt|8-bit|pixel/.test(signal)) {
    archetype = 'retro-computing';
  }

  const tokens = ARCHETYPE_TOKENS[archetype] || ARCHETYPE_TOKENS['cinematic-dark'];

  return {
    archetype,
    canvasBg: tokens.bgCanvas,
    surfaceBg: tokens.surfacePrimary,
    borderColor: tokens.borderDefault,
    accentText: tokens.accentPrimary,
    accentGlow: tokens.accentGlow,
    fontTitle: tokens.fontFamilyTitle,
  };
}

interface ShowroomSpecimenRendererProps {
  entry: CatalogEntry;
  isInteractive?: boolean;
}

export function ShowroomSpecimenRenderer({ entry, isInteractive = true }: ShowroomSpecimenRendererProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const { reducedMotion } = useMotion();
  const styleInfo = resolveArchetypeFromEntry(entry);

  const family = (entry.family || '').toLowerCase();
  const id = (entry.id || '').toLowerCase();

  return (
    <SpecimenErrorBoundary fallbackStyle={entry.visualStyle || 'Standard'}>
      <div className="w-full h-full flex items-center justify-center p-2 relative overflow-hidden select-none">
        {renderFamilySpecimen(family, id, entry, styleInfo, { playSound, triggerHaptic, reducedMotion, isInteractive })}
      </div>
    </SpecimenErrorBoundary>
  );
}

// Render family-specific live visual specimens
function renderFamilySpecimen(
  family: string,
  id: string,
  entry: CatalogEntry,
  style: ReturnType<typeof resolveArchetypeFromEntry>,
  ctx: { playSound: Function; triggerHaptic: Function; reducedMotion: boolean; isInteractive: boolean }
) {
  // 1. AUTH / SECURITY / LOGIN
  if (family === 'auth' || family === 'security' || family === 'identity' || id.startsWith('auth-')) {
    return <AuthMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 2. NAVIGATION / DOCK / RAIL
  if (family === 'navigation' || id.startsWith('nav-') || family === 'nav') {
    return <NavigationMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 3. BUTTON / ACTION
  if (family === 'action' || family === 'button' || id.startsWith('btn-') || id.startsWith('button-')) {
    return <ButtonMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 4. INPUT / FORM / CONTROL
  if (family === 'input' || id.startsWith('input-') || family === 'form') {
    return <InputMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 5. CARD / SURFACE / BENTO
  if (family === 'surface' || id.startsWith('card-') || family === 'card') {
    return <CardMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 6. DASHBOARD / ANALYTICS
  if (family === 'dashboard' || family === 'dashboards' || id.startsWith('dash-') || id.startsWith('dashboard-')) {
    return <DashboardMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 7. AI INTERFACE / CHAT
  if (family === 'ai' || family === 'ai-interface' || id.startsWith('ai-') || id.includes('companion')) {
    return <AiMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 8. WORKFLOW / NODE GRAPH
  if (family === 'workflow' || family === 'nodes' || id.includes('workflow') || id.includes('node')) {
    return <WorkflowMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 9. SCIENTIFIC / LAB
  if (family === 'scientific' || id.includes('scientific') || id.includes('lab')) {
    return <ScientificMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 10. SPATIAL / 3D
  if (family === 'spatial' || id.includes('spatial') || id.includes('holo')) {
    return <SpatialMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 11. CHARACTER / MASCOT
  if (family === 'character' || id.includes('mascot') || id.includes('character')) {
    return <CharacterMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 12. PAGE EXPERIENCES
  if (family === 'page' || family === 'page-experience' || id.startsWith('page-')) {
    return <PageMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 13. FEEDBACK / ALERT / TOAST
  if (family === 'feedback' || id.includes('feedback') || id.includes('alert') || id.includes('toast')) {
    return <FeedbackMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 14. OVERLAY / MODAL
  if (family === 'overlay' || id.includes('overlay') || id.includes('modal') || id.includes('drawer')) {
    return <OverlayMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 15. CONTROLS / TOGGLES
  if (family === 'control' || family === 'controls' || id.includes('control') || id.includes('toggle')) {
    return <ControlMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // 16. ONBOARDING
  if (family === 'onboarding' || id.includes('onboarding')) {
    return <OnboardingMiniSpecimen entry={entry} style={style} ctx={ctx} />;
  }

  // DEFAULT FALLBACK SPECIMEN
  return <DefaultMiniSpecimen entry={entry} style={style} ctx={ctx} />;
}

/* ============================================================================
   MINI SPECIMEN IMPLEMENTATIONS (STRICTLY STYLE-ACCURATE & HIGHLY VISUAL)
   ============================================================================ */

// 1. Auth Mini Specimen
function AuthMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  const [typed, setTyped] = useState('alex@design.io');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    ctx.playSound('success', 'CONFIRMATION');
    ctx.triggerHaptic('SUCCESS');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  };

  const isCyber = style.archetype === 'futuristic-cyber';
  const isLuxury = style.archetype === 'restrained-luxury';
  const isBrutalist = style.archetype === 'brutalist-grid';
  const isGlass = style.archetype === 'neumorphic-glass';

  return (
    <div
      className={`w-full max-w-[280px] sm:max-w-[300px] p-4 rounded-2xl border transition-all duration-300 shadow-xl ${
        isGlass
          ? 'bg-white/10 backdrop-blur-2xl border-white/20 shadow-purple-500/10'
          : isCyber
          ? 'bg-slate-950/90 border-cyan-500/50 shadow-cyan-500/20 font-mono'
          : isLuxury
          ? 'bg-[#121215] border-[#D4AF37]/40 shadow-amber-500/10'
          : isBrutalist
          ? 'bg-zinc-900 border-2 border-white shadow-[4px_4px_0_0_#fff]'
          : 'bg-zinc-900/90 border-zinc-800'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center ${
              isCyber
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                : isLuxury
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-cyan-500/20 text-cyan-400'
            }`}
          >
            {isCyber ? <Shield className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
          </div>
          <span className="text-xs font-bold text-white truncate max-w-[130px]">{entry.name}</span>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300 uppercase">
          {submitted ? 'VERIFIED' : 'SECURE'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <input
            type="email"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            className={`w-full px-3 py-1.5 rounded-lg text-xs border text-white placeholder-zinc-500 focus:outline-none transition-all ${
              isCyber
                ? 'bg-black/60 border-cyan-500/40 text-cyan-300'
                : isLuxury
                ? 'bg-zinc-900 border-amber-500/30 text-amber-200'
                : 'bg-black/40 border-zinc-700/60'
            }`}
            placeholder="Identity / Email"
          />
        </div>

        <button
          type="submit"
          onClick={(e) => e.stopPropagation()}
          className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md ${
            submitted
              ? 'bg-emerald-500 text-zinc-950'
              : isCyber
              ? 'bg-cyan-500 text-zinc-950 hover:bg-cyan-400'
              : isLuxury
              ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950'
              : 'bg-cyan-500 text-zinc-950 hover:bg-cyan-400'
          }`}
        >
          {submitted ? (
            <>
              <Check className="w-3.5 h-3.5" /> Authenticated
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-3 h-3" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// 2. Navigation Mini Specimen
function NavigationMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Home', icon: Globe },
    { label: 'Explore', icon: Search },
    { label: 'Pulse', icon: Zap },
    { label: 'System', icon: Cpu },
  ];

  const handleTabClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTab(idx);
    ctx.playSound('button-press', 'CLICK');
    ctx.triggerHaptic('SELECTION');
  };

  const isCyber = style.archetype === 'futuristic-cyber';
  const isGlass = style.archetype === 'neumorphic-glass';
  const isLuxury = style.archetype === 'restrained-luxury';

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3">
      <div
        className={`px-3 py-2 rounded-2xl border flex items-center gap-2 shadow-2xl transition-all ${
          isGlass
            ? 'bg-white/10 backdrop-blur-2xl border-white/20 shadow-purple-500/10'
            : isCyber
            ? 'bg-slate-950 border-cyan-500/50 shadow-cyan-500/20 font-mono'
            : isLuxury
            ? 'bg-[#121215] border-[#D4AF37]/40'
            : 'bg-zinc-900/90 border-zinc-800'
        }`}
      >
        {tabs.map((t, idx) => {
          const Icon = t.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={t.label}
              type="button"
              onClick={(e) => handleTabClick(idx, e)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                isActive
                  ? isCyber
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/30'
                    : isLuxury
                    ? 'bg-amber-400 text-zinc-950 font-bold'
                    : 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">{t.label}</span>
            </button>
          );
        })}
      </div>
      <span className="text-[10px] font-mono text-zinc-500">Active Node: {tabs[activeTab].label}</span>
    </div>
  );
}

// 3. Button Mini Specimen
function ButtonMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  const [pressed, setPressed] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    ctx.playSound('button-press', 'CLICK');
    ctx.triggerHaptic('LIGHT');
    setPressed(true);
    setTimeout(() => setPressed(false), 800);
  };

  const isCyber = style.archetype === 'futuristic-cyber';
  const isLuxury = style.archetype === 'restrained-luxury';
  const isBrutalist = style.archetype === 'brutalist-grid';
  const isGlass = style.archetype === 'neumorphic-glass';

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <button
        type="button"
        onClick={handleClick}
        className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 shadow-xl ${
          pressed ? 'scale-95' : 'hover:scale-105'
        } ${
          isGlass
            ? 'bg-purple-500/20 backdrop-blur-xl border border-purple-400/40 text-purple-200 shadow-purple-500/20'
            : isCyber
            ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono shadow-cyan-500/30'
            : isLuxury
            ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 shadow-amber-500/20'
            : isBrutalist
            ? 'bg-cyan-400 text-zinc-950 border-2 border-white shadow-[4px_4px_0_0_#fff]'
            : 'bg-cyan-500 text-zinc-950 hover:bg-cyan-400 shadow-cyan-500/20'
        }`}
      >
        {pressed ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
        <span>{pressed ? 'Triggered!' : entry.name}</span>
      </button>
      <span className="text-[10px] font-mono text-zinc-500">Interactive Click Specimen</span>
    </div>
  );
}

// 4. Input Mini Specimen
function InputMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  const [val, setVal] = useState(entry.name || 'Search tokens...');

  const isCyber = style.archetype === 'futuristic-cyber';

  return (
    <div className="w-full max-w-[260px] space-y-2">
      <div className="relative">
        <Search className={`absolute left-3 top-2.5 w-3.5 h-3.5 ${isCyber ? 'text-cyan-400' : 'text-zinc-400'}`} />
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border text-white focus:outline-none transition-all ${
            isCyber
              ? 'bg-slate-950 border-cyan-500/50 text-cyan-300 font-mono'
              : 'bg-zinc-900 border-zinc-700/80'
          }`}
        />
      </div>
      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 px-1">
        <span>State: Active Focus</span>
        <span>{val.length} chars</span>
      </div>
    </div>
  );
}

// 5. Card Mini Specimen
function CardMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  const isCyber = style.archetype === 'futuristic-cyber';
  const isLuxury = style.archetype === 'restrained-luxury';

  return (
    <div
      className={`w-full max-w-[260px] p-4 rounded-2xl border shadow-xl space-y-3 ${
        isCyber
          ? 'bg-slate-950/90 border-cyan-500/50 font-mono text-cyan-300'
          : isLuxury
          ? 'bg-[#121215] border-[#D4AF37]/40 text-amber-200'
          : 'bg-zinc-900/90 border-zinc-800 text-zinc-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold">{entry.name}</span>
        <Flame className="w-3.5 h-3.5 text-amber-400" />
      </div>
      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
        <div className="text-[10px] text-zinc-400 truncate">{entry.description || 'Surface Metric'}</div>
        <div className="text-sm font-semibold font-mono text-cyan-400 truncate">{entry.category || entry.id || '98.4%'}</div>
      </div>
    </div>
  );
}

// 6. Dashboard Mini Specimen
function DashboardMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  return (
    <div className="w-full max-w-[270px] p-3 rounded-2xl bg-zinc-950/90 border border-zinc-800 space-y-2 font-mono">
      <div className="flex items-center justify-between text-[10px] text-zinc-400">
        <span className="flex items-center gap-1 text-cyan-400 font-bold">
          <Activity className="w-3 h-3 animate-pulse" /> Telemetry
        </span>
        <span className="text-emerald-400">+14.2%</span>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-xl font-bold text-white">$124,850</span>
        <span className="text-[10px] text-zinc-500">Live Stream</span>
      </div>
      {/* SVG Sparkline */}
      <svg className="w-full h-8 text-cyan-400 stroke-current" fill="none" viewBox="0 0 100 25">
        <path d="M0 20 L20 12 L40 18 L60 8 L80 14 L100 4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// 7. AI Mini Specimen
function AiMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  return (
    <div className="w-full max-w-[270px] p-3 rounded-2xl bg-zinc-950 border border-purple-500/30 space-y-2 text-xs">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center">
          <Bot className="w-3 h-3" />
        </div>
        <span className="font-mono text-[10px] text-purple-300 font-bold">Gemini 3.7 Vision</span>
      </div>
      <div className="p-2 rounded-xl bg-purple-950/30 border border-purple-500/20 text-purple-200 text-[11px] leading-snug">
        "I analyzed the token palette and generated 12 responsive component specimens."
      </div>
    </div>
  );
}

// 8. Workflow Mini Specimen
function WorkflowMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  return (
    <div className="w-full max-w-[260px] flex items-center justify-between gap-2 p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
      <div className="p-2 rounded-xl bg-blue-950/50 border border-blue-500/40 text-blue-300 text-[10px] font-mono">
        Webhook
      </div>
      <Workflow className="w-4 h-4 text-cyan-400 animate-pulse" />
      <div className="p-2 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono">
        Dispatch
      </div>
    </div>
  );
}

// 9. Scientific Mini Specimen
function ScientificMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  return (
    <div className="w-full max-w-[260px] p-3 rounded-2xl bg-slate-950 border border-blue-500/30 space-y-2 font-mono text-xs">
      <div className="flex justify-between text-[10px] text-blue-400 font-bold">
        <span>Freq: 440.0 Hz</span>
        <span>Amp: -3.2 dB</span>
      </div>
      <div className="h-6 w-full rounded bg-blue-950/40 border border-blue-500/20 flex items-center justify-center">
        <svg className="w-full h-4 text-blue-400 stroke-current" fill="none" viewBox="0 0 100 20">
          <path d="M0 10 Q 25 0, 50 10 T 100 10" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}

// 10. Spatial Mini Specimen
function SpatialMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  return (
    <div className="w-full max-w-[240px] p-4 rounded-2xl bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-slate-900/60 border border-indigo-500/40 backdrop-blur-2xl shadow-2xl space-y-2 text-center transform hover:rotate-2 transition-transform">
      <Box className="w-6 h-6 text-indigo-400 mx-auto" />
      <div className="text-xs font-bold text-white">Spatial Hologram</div>
      <div className="text-[10px] font-mono text-indigo-300">3D Glass Surface</div>
    </div>
  );
}

// 11. Character Mini Specimen
function CharacterMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 flex items-center justify-center text-2xl shadow-xl animate-bounce">
        🐱
      </div>
      <span className="text-[10px] font-mono text-indigo-300 font-bold">Mascot Active Companion</span>
    </div>
  );
}

// 12. Page Mini Specimen
function PageMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  return (
    <div className="w-full max-w-[260px] p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
      <div className="h-2 w-full rounded bg-cyan-500/30" />
      <div className="h-8 w-full rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-mono text-zinc-400">
        Hero Experience Layout
      </div>
      <div className="grid grid-cols-3 gap-1">
        <div className="h-6 rounded bg-zinc-900/60" />
        <div className="h-6 rounded bg-zinc-900/60" />
        <div className="h-6 rounded bg-zinc-900/60" />
      </div>
    </div>
  );
}

// 13. Feedback Mini Specimen
function FeedbackMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  const isErr = /error|fail|alert|danger|critical/i.test(entry.name + ' ' + (entry.tags || []).join(' '));
  const isWarn = /warn|caution/i.test(entry.name + ' ' + (entry.tags || []).join(' '));
  const isInfo = /info|tip|note/i.test(entry.name + ' ' + (entry.tags || []).join(' '));

  const borderClass = isErr ? 'border-rose-500/40 bg-rose-950/40 text-rose-200' :
                      isWarn ? 'border-amber-500/40 bg-amber-950/40 text-amber-200' :
                      isInfo ? 'border-sky-500/40 bg-sky-950/40 text-sky-200' :
                      'border-emerald-500/40 bg-emerald-950/40 text-emerald-200';

  const iconClass = isErr ? 'text-rose-400' :
                    isWarn ? 'text-amber-400' :
                    isInfo ? 'text-sky-400' :
                    'text-emerald-400';

  return (
    <div className={`w-full max-w-[270px] p-3 rounded-2xl border flex items-center gap-2.5 shadow-xl ${borderClass}`}>
      <Bell className={`w-4 h-4 shrink-0 ${iconClass}`} />
      <div className="text-xs min-w-0">
        <div className="font-bold truncate">{entry.name || 'System Notification'}</div>
        <div className="text-[10px] opacity-80 truncate">{entry.description || 'Token recipe compiled cleanly'}</div>
      </div>
    </div>
  );
}

// 14. Overlay Mini Specimen
function OverlayMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  return (
    <div className="w-full max-w-[250px] p-3.5 rounded-2xl bg-zinc-900 border border-cyan-500/40 shadow-2xl space-y-2">
      <div className="text-xs font-bold text-white flex justify-between">
        <span>Modal Specimen</span>
        <span className="text-[10px] text-cyan-400 font-mono">ESC</span>
      </div>
      <div className="text-[10px] text-zinc-400 leading-snug">
        Interactive dialog overlay window frame.
      </div>
      <div className="flex justify-end gap-1.5 pt-1">
        <div className="px-2 py-1 rounded bg-cyan-500 text-zinc-950 text-[10px] font-bold">Confirm</div>
      </div>
    </div>
  );
}

// 15. Control Mini Specimen
function ControlMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  const [on, setOn] = useState(true);

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
      <span className="text-xs font-mono text-zinc-300">Toggle State</span>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOn(!on);
          ctx.playSound('button-press', 'TOGGLE');
          ctx.triggerHaptic('LIGHT');
        }}
        className={`w-10 h-5 rounded-full p-0.5 transition-colors ${on ? 'bg-cyan-500' : 'bg-zinc-700'}`}
      >
        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}

// 16. Onboarding Mini Specimen
function OnboardingMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  return (
    <div className="w-full max-w-[250px] p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-center">
      <div className="text-xs font-bold text-white">Step 2 of 4</div>
      <div className="text-[10px] text-zinc-400">Configure your workspace defaults</div>
      <div className="flex justify-center gap-1 pt-1">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
        <div className="w-3 h-1.5 rounded-full bg-cyan-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
      </div>
    </div>
  );
}

// Default Fallback Mini Specimen
function DefaultMiniSpecimen({ entry, style, ctx }: { entry: CatalogEntry; style: any; ctx: any }) {
  return (
    <div className="w-full max-w-[260px] p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3 text-center">
      <Sparkles className={`w-6 h-6 mx-auto ${style.accentText}`} />
      <div>
        <div className="text-xs font-bold text-white">{entry.name}</div>
        <div className="text-[10px] font-mono text-zinc-400 mt-0.5">{entry.visualStyle}</div>
      </div>
    </div>
  );
}
