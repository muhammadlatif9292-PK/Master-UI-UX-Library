/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { useMotion } from '../design-system/motion/MotionContext';
import { useSound } from '../design-system/sound/SoundContext';
import { useHaptics } from '../design-system/haptics/HapticContext';
import { useExperienceEvents } from '../design-system/events/ExperienceEventContext';
import { CatalogEntry } from '../design-system/catalog/catalogTypes';
import { CodeViewer } from './CodeViewer';
import { AiHandoffGenerator } from './AiHandoffGenerator';
import { ProvenanceBadge } from './provenance/ProvenanceBadge';
import { ReuseExportStudio } from './export/ReuseExportStudio';
import { StateInspector, ComponentState } from './StateInspector';
import { FocusTrap } from '../design-system/overlay/FocusTrap';
import {
  Play,
  Volume2,
  VolumeX,
  Vibrate,
  Smartphone,
  Monitor,
  Sparkles,
  Shield,
  ShieldCheck,
  Activity,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Maximize2,
  Minimize2,
  RefreshCw,
  FileCode,
  Eye,
  Cpu,
  Building,
  Scale,
  ExternalLink,
  Layers,
  FileText,
  Download,
  Grid,
  Ruler,
  Sun,
  Moon,
  Copy,
  Check,
  Share2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  SlidersHorizontal,
  Compass,
  Square,
  Crosshair,
} from 'lucide-react';

interface SpecimenDefaults {
  accent: 'cyan' | 'emerald' | 'amber' | 'rose' | 'purple' | 'gold';
  variant: 'primary' | 'secondary' | 'outline' | 'glass' | 'luxury' | 'cyber' | 'ghost';
  radius: number;
}

// Phase 29 fix: the universal preview canvas previously defaulted every entry to the same
// accent/variant/radius regardless of its declared style, so entries with very different
// visualStyle/family metadata looked visually identical here. This derives sensible defaults
// from the entry's own metadata (same keyword-matching approach already used in
// ButtonVariantPreview) so the canvas reflects the entry automatically. The Props Inspector
// panel still lets a visitor override any of these afterward — this only fixes the default.
function deriveSpecimenDefaults(entry: CatalogEntry): SpecimenDefaults {
  const signal = [entry.visualStyle, entry.mood, entry.family, entry.id, ...(entry.tags || [])]
    .join(' ')
    .toLowerCase();

  let accent: SpecimenDefaults['accent'] = 'cyan';
  if (/gold|luxury|amber|24k|champagne/.test(signal)) accent = 'gold';
  else if (/danger|error|destructive|warning|alert|critical/.test(signal)) accent = 'rose';
  else if (/success|positive|emerald|green|eco|botanical|organic/.test(signal)) accent = 'emerald';
  else if (/ai|cyber|neon|synth|holographic|purple|violet|magic|generative/.test(signal)) accent = 'purple';
  else if (/warm|amber|clay|terra|sunset|architectural/.test(signal)) accent = 'amber';

  let variant: SpecimenDefaults['variant'] = 'primary';
  if (/glass|liquid|frosted|translucent/.test(signal)) variant = 'glass';
  else if (/luxury|gold|premium|automotive|editorial/.test(signal)) variant = 'luxury';
  else if (/cyber|neon|hud|sci-fi|holographic|terminal/.test(signal)) variant = 'cyber';
  else if (/outline|minimal|swiss|blueprint|technical/.test(signal)) variant = 'outline';
  else if (/ghost|subtle|quiet/.test(signal)) variant = 'ghost';
  else if (/secondary|muted/.test(signal)) variant = 'secondary';

  let radius = 12;
  if (/brutalist|blueprint|technical|pixel|8-bit|arcade|tactical|industrial|mechanical/.test(signal)) radius = 2;
  else if (/glass|liquid|clay|neumorphic|soft|bento|organic|biomorphic|dreamscape/.test(signal)) radius = 24;

  return { accent, variant, radius };
}

interface ComponentPreviewEngineProps {
  entry: CatalogEntry;
  onClose: () => void;
}

export type CanvasEnvironment = 'obsidian' | 'studio-light' | 'cyber-grid' | 'high-contrast' | 'active-theme';
export type ViewportPreset = 'mobile' | 'mobile-lg' | 'tablet' | 'desktop' | 'ultrawide' | 'fluid';

export function ComponentPreviewEngine({ entry, onClose }: ComponentPreviewEngineProps) {
  const { theme, activeThemeId, setThemeId, allThemes } = useTheme();
  const { reducedMotion, setReducedMotion, intensity, setIntensity } = useMotion();
  const { soundEnabled, setSoundEnabled, playSound } = useSound();
  const { hapticsEnabled, setHapticsEnabled, triggerHaptic } = useHaptics();
  const { emit } = useExperienceEvents();

  // Primary Active View Mode
  const [activeView, setActiveView] = useState<'preview' | 'inspector' | 'code' | 'export' | 'handoff' | 'provenance'>('preview');

  // Preview Stage Environment & Viewport State
  const [currentState, setCurrentState] = useState<ComponentState>('idle');
  const [viewportPreset, setViewportPreset] = useState<ViewportPreset>('desktop');
  const [envMode, setEnvMode] = useState<CanvasEnvironment>('obsidian');
  const [canvasScale, setCanvasScale] = useState<number>(100);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Design Canvas Overlays
  const [showRulers, setShowRulers] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showCrosshairs, setShowCrosshairs] = useState<boolean>(false);
  const [showBaseline, setShowBaseline] = useState<boolean>(false);

  // Dynamic Component Props Inspector Controls — seeded from the entry's own metadata
  // (see deriveSpecimenDefaults) rather than fixed constants, so the canvas reflects
  // the selected entry automatically. Still fully overridable via the controls below.
  const [propLabel, setPropLabel] = useState<string>(entry.name);
  const [propVariant, setPropVariant] = useState<'primary' | 'secondary' | 'outline' | 'glass' | 'luxury' | 'cyber' | 'ghost'>(
    () => deriveSpecimenDefaults(entry).variant,
  );
  const [propSize, setPropSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [propElevation, setPropElevation] = useState<number>(2);
  const [propRadius, setPropRadius] = useState<number>(() => deriveSpecimenDefaults(entry).radius);
  const [propOpacity, setPropOpacity] = useState<number>(100);
  const [propDisabled, setPropDisabled] = useState<boolean>(false);
  const [propLoading, setPropLoading] = useState<boolean>(false);
  const [propShowIcon, setPropShowIcon] = useState<boolean>(true);
  const [propShowBadge, setPropShowBadge] = useState<boolean>(true);
  const [propAccent, setPropAccent] = useState<'cyan' | 'emerald' | 'amber' | 'rose' | 'purple' | 'gold'>(
    () => deriveSpecimenDefaults(entry).accent,
  );

  // Re-sync derived defaults if a parent ever swaps `entry` while this stays mounted
  // (current call sites remount per-selection, but this keeps the fix correct either way).
  useEffect(() => {
    const defaults = deriveSpecimenDefaults(entry);
    setPropLabel(entry.name);
    setPropVariant(defaults.variant);
    setPropRadius(defaults.radius);
    setPropAccent(defaults.accent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.id]);

  // Copy / Share Notification Toast State
  const [copiedShareConfig, setCopiedShareConfig] = useState<boolean>(false);

  const handleStateChange = (state: ComponentState) => {
    setCurrentState(state);
    if (state === 'success') {
      emit('state.success', entry.id, { state });
    } else if (state === 'error') {
      emit('state.error', entry.id, { state });
    } else if (state === 'pressed' || state === 'active') {
      emit('interaction.started', entry.id, { state });
    } else if (state === 'selected') {
      emit('selection.changed', entry.id, { state });
    } else {
      emit('interaction.confirmed', entry.id, { state });
    }
  };

  const resetAllControls = () => {
    setCurrentState('idle');
    setViewportPreset('desktop');
    setEnvMode('obsidian');
    setCanvasScale(100);
    setPropLabel(entry.name);
    setPropVariant('primary');
    setPropSize('md');
    setPropElevation(2);
    setPropRadius(12);
    setPropOpacity(100);
    setPropDisabled(false);
    setPropLoading(false);
    setPropShowIcon(true);
    setPropShowBadge(true);
    setPropAccent('cyan');
    emit('interaction.cancelled', entry.id, { action: 'reset' });
  };

  const copyShareConfiguration = () => {
    const configPayload = {
      componentId: entry.id,
      componentName: entry.name,
      version: entry.version,
      state: currentState,
      viewport: viewportPreset,
      theme: activeThemeId,
      envMode,
      canvasScale,
      props: {
        label: propLabel,
        variant: propVariant,
        size: propSize,
        elevation: propElevation,
        borderRadius: propRadius,
        opacity: propOpacity,
        disabled: propDisabled,
        loading: propLoading,
        showIcon: propShowIcon,
        showBadge: propShowBadge,
        accent: propAccent,
      },
      sensory: {
        soundEnabled,
        hapticsEnabled,
        intensity,
        reducedMotion,
      },
    };

    const shareString = JSON.stringify(configPayload, null, 2);
    navigator.clipboard.writeText(shareString);
    setCopiedShareConfig(true);
    emit('state.success', entry.id, { action: 'copyShareConfig' });
    setTimeout(() => setCopiedShareConfig(false), 2500);
  };

  // Viewport Container Width & Pixel Dimensions
  const viewportMeta = {
    mobile: { width: 'w-[375px]', label: '375 × 667px (Mobile Portrait)', ratio: '9:16' },
    'mobile-lg': { width: 'w-[428px]', label: '428 × 926px (Mobile Large)', ratio: '9:19.5' },
    tablet: { width: 'w-[768px]', label: '768 × 1024px (Tablet Portrait)', ratio: '3:4' },
    desktop: { width: 'w-[1024px]', label: '1024 × 768px (Desktop Baseline)', ratio: '4:3' },
    ultrawide: { width: 'w-[1440px]', label: '1440 × 900px (Ultrawide Display)', ratio: '16:10' },
    fluid: { width: 'w-full max-w-5xl', label: 'Fluid Responsive Canvas', ratio: 'Auto' },
  }[viewportPreset];

  // Environment Canvas Background Styles
  const envStyle = {
    obsidian: 'bg-zinc-950 text-white',
    'studio-light': 'bg-slate-100 text-slate-900',
    'cyber-grid': 'bg-black text-cyan-400',
    'high-contrast': 'bg-white text-black',
    'active-theme': `${theme.surface.primary} text-white`,
  }[envMode];

  // Accent Colors Mapping
  const accentClasses = {
    cyan: 'border-cyan-500/60 shadow-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    emerald: 'border-emerald-500/60 shadow-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    amber: 'border-amber-500/60 shadow-amber-500/30 text-amber-400 bg-amber-500/10',
    rose: 'border-rose-500/60 shadow-rose-500/30 text-rose-400 bg-rose-500/10',
    purple: 'border-purple-500/60 shadow-purple-500/30 text-purple-400 bg-purple-500/10',
    gold: 'border-amber-400/80 shadow-amber-400/30 text-amber-300 bg-amber-400/10',
  }[propAccent];

  return (
    <FocusTrap
      className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col overflow-hidden animate-modal-entry ${
        isFullscreen ? 'p-0' : 'p-2 md:p-4'
      }`}
      onEscape={onClose}
    >
    <div role="dialog" aria-modal="true" aria-label={`${entry.name} preview`} className="h-full flex flex-col overflow-hidden">
      {/* 1. Main Application Header Bar */}
      <div className={`p-4 md:px-6 border-b ${theme.border.default} ${theme.surface.primary} flex flex-wrap items-center justify-between gap-4 shrink-0 rounded-t-2xl`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-sm md:text-base text-white flex items-center gap-2">
              {entry.name} <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase font-bold">v{entry.version}</span>
            </h1>
            <p className="text-[11px] opacity-70">Design Tool Canvas &amp; 5D State Inspector System</p>
          </div>
        </div>

        {/* Global Navigation View Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveView('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeView === 'preview' ? 'bg-cyan-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Stage Canvas
            </button>
            <button
              onClick={() => setActiveView('inspector')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeView === 'inspector' ? 'bg-cyan-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> State Inspector (5D)
            </button>
            <button
              onClick={() => setActiveView('code')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeView === 'code' ? 'bg-cyan-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" /> Code Specs
            </button>
            <button
              onClick={() => setActiveView('export')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeView === 'export'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-zinc-950 shadow-lg shadow-cyan-500/20'
                  : 'text-cyan-400 hover:text-white'
              }`}
            >
              <Download className="w-3.5 h-3.5" /> Export Studio
            </button>
            <button
              onClick={() => setActiveView('handoff')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeView === 'handoff' ? 'bg-purple-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" /> AI Handoff
            </button>
            <button
              onClick={() => setActiveView('provenance')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeView === 'provenance' ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Provenance
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold font-mono hover:bg-rose-500/20 transition-all"
          >
            Close
          </button>
        </div>
      </div>

      {/* 2. Primary Sub-View Switcher Rendering */}
      {activeView === 'inspector' ? (
        <div className="flex-1 p-6 overflow-y-auto max-w-6xl mx-auto w-full">
          <StateInspector
            entry={entry}
            activeState={currentState}
            onSelectState={(st) => setCurrentState(st)}
          />
        </div>
      ) : activeView === 'code' ? (
        <div className="flex-1 p-6 md:p-12 overflow-y-auto max-w-5xl mx-auto w-full">
          <CodeViewer entry={entry} />
        </div>
      ) : activeView === 'export' ? (
        <div className="flex-1 p-6 md:p-12 overflow-y-auto max-w-6xl mx-auto w-full">
          <ReuseExportStudio entry={entry} onClose={onClose} />
        </div>
      ) : activeView === 'handoff' ? (
        <div className="flex-1 p-6 md:p-12 overflow-y-auto max-w-5xl mx-auto w-full">
          <AiHandoffGenerator entry={entry} />
        </div>
      ) : activeView === 'provenance' ? (
        <div className="flex-1 p-6 md:p-12 overflow-y-auto max-w-4xl mx-auto w-full space-y-6 font-mono">
          <div className="p-6 rounded-3xl bg-zinc-900/90 border border-white/10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Asset Provenance Record</span>
                <h2 className="text-xl font-bold text-white">{entry.name}</h2>
              </div>
              <ProvenanceBadge type={entry.provenanceType || 'original implementation'} size="lg" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Source Inspiration</span>
                <p className="text-white font-medium">{entry.sourceInspiration || 'In-House Core Library'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Author / Vendor</span>
                <p className="text-white font-medium">{entry.authorVendor || 'Project Design System Team'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">License</span>
                <p className="text-amber-300 font-bold">{entry.license}</p>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase font-bold block">Attribution</span>
                <p className="text-emerald-300 font-medium">{entry.attributionRequirement || 'Project Owned'}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 3. Design Tool Stage Canvas & Interactive Inspector Layout */
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          {/* Left/Center: Isolated Component Stage & Canvas Controls */}
          <div className="flex-1 flex flex-col overflow-hidden bg-black/60 relative">
            {/* Design Tool Top Toolbar */}
            <div className="p-2.5 px-4 bg-zinc-900/90 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs z-20">
              {/* Viewport Preset Switcher */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-zinc-500 uppercase font-bold mr-1">Viewport:</span>
                {(
                  [
                    { id: 'mobile', label: 'Mobile (375px)', icon: Smartphone },
                    { id: 'mobile-lg', label: 'Mobile Large (428px)', icon: Smartphone },
                    { id: 'tablet', label: 'Tablet (768px)', icon: Monitor },
                    { id: 'desktop', label: 'Desktop (1024px)', icon: Monitor },
                    { id: 'ultrawide', label: 'Ultrawide (1440px)', icon: Monitor },
                    { id: 'fluid', label: 'Fluid', icon: Maximize2 },
                  ] as const
                ).map((vp) => {
                  const Icon = vp.icon;
                  return (
                    <button
                      key={vp.id}
                      onClick={() => setViewportPreset(vp.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 transition-all ${
                        viewportPreset === vp.id
                          ? 'bg-cyan-500 text-zinc-950 shadow-md'
                          : 'bg-black/40 border border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3 h-3" /> {vp.id.toUpperCase()}
                    </button>
                  );
                })}
              </div>

              {/* Environment Backdrop Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-zinc-500 uppercase font-bold mr-1">Canvas:</span>
                <select
                  value={envMode}
                  onChange={(e) => setEnvMode(e.target.value as CanvasEnvironment)}
                  className="px-2.5 py-1 rounded-lg bg-black/40 border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-none focus:border-cyan-500"
                >
                  <option value="obsidian">Dark Obsidian</option>
                  <option value="studio-light">Light Studio</option>
                  <option value="cyber-grid">Cyber Dot Grid</option>
                  <option value="high-contrast">High Contrast White</option>
                  <option value="active-theme">Active Archetype Theme</option>
                </select>
              </div>

              {/* Canvas Overlay Controls & Scale */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-zinc-800">
                  <button
                    onClick={() => setShowRulers(!showRulers)}
                    title="Toggle Pixel Rulers"
                    className={`p-1 rounded text-xs ${showRulers ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
                  >
                    <Ruler className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    title="Toggle Visual Dot Matrix Grid"
                    className={`p-1 rounded text-xs ${showGrid ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setShowCrosshairs(!showCrosshairs)}
                    title="Toggle Center Alignment Crosshairs"
                    className={`p-1 rounded text-xs ${showCrosshairs ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'}`}
                  >
                    <Crosshair className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Scale Zoom Controls */}
                <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-lg border border-zinc-800 text-[11px]">
                  <button onClick={() => setCanvasScale(Math.max(50, canvasScale - 25))} className="text-zinc-400 hover:text-white">
                    <ZoomOut className="w-3 h-3" />
                  </button>
                  <span className="font-bold text-cyan-400 min-w-[36px] text-center">{canvasScale}%</span>
                  <button onClick={() => setCanvasScale(Math.min(150, canvasScale + 25))} className="text-zinc-400 hover:text-white">
                    <ZoomIn className="w-3 h-3" />
                  </button>
                </div>

                {/* Fullscreen Toggle */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title="Toggle Fullscreen Canvas"
                  className="p-1.5 rounded-lg bg-black/40 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Stage Canvas Body Area with Pixel Rulers & Grid Overlay */}
            <div className="flex-1 flex overflow-hidden relative justify-center items-center p-6 md:p-12">
              {/* Top Pixel Ruler Bar */}
              {showRulers && (
                <div className="absolute top-0 left-0 right-0 h-5 bg-zinc-900/90 border-b border-zinc-800 text-[9px] font-mono text-zinc-500 flex items-center justify-between px-4 pointer-events-none select-none z-10">
                  <span>0px</span>
                  <span>100px</span>
                  <span>200px</span>
                  <span>300px</span>
                  <span>400px</span>
                  <span>500px</span>
                  <span>600px</span>
                  <span>700px</span>
                  <span>800px</span>
                  <span>900px</span>
                  <span>1000px</span>
                </div>
              )}

              {/* Left Pixel Ruler Bar */}
              {showRulers && (
                <div className="absolute top-5 left-0 bottom-0 w-5 bg-zinc-900/90 border-r border-zinc-800 text-[9px] font-mono text-zinc-500 flex flex-col justify-between py-4 items-center pointer-events-none select-none z-10">
                  <span>0</span>
                  <span>200</span>
                  <span>400</span>
                  <span>600</span>
                </div>
              )}

              {/* Crosshair Overlay */}
              {showCrosshairs && (
                <>
                  <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/30 border-t border-dashed border-cyan-500/40 pointer-events-none z-10" />
                  <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/30 border-l border-dashed border-cyan-500/40 pointer-events-none z-10" />
                </>
              )}

              {/* Interactive Isolated Component Specimen Stage */}
              <div
                className={`transition-all duration-300 ${viewportMeta.width} mx-auto space-y-4 z-0`}
                style={{ transform: `scale(${canvasScale / 100})`, transformOrigin: 'center center' }}
              >
                {/* Viewport Meta Indicator Header */}
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400 bg-black/40 px-3 py-1 rounded-lg border border-zinc-800">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Compass className="w-3 h-3 text-cyan-400" /> {viewportMeta.label}
                  </span>
                  <span>Ratio: <strong className="text-cyan-400">{viewportMeta.ratio}</strong></span>
                </div>

                {/* Rendered Specimen Stage Surface */}
                <div
                  className={`p-8 md:p-12 rounded-3xl ${envStyle} border transition-all duration-300 shadow-2xl flex flex-col items-center justify-center min-h-[360px] relative overflow-hidden ${
                    showGrid ? 'bg-dot-grid' : ''
                  } ${
                    currentState === 'hover'
                      ? 'border-cyan-400 shadow-cyan-500/30 scale-[1.02]'
                      : currentState === 'focus'
                      ? 'ring-4 ring-indigo-500/40 border-indigo-500'
                      : currentState === 'pressed' || currentState === 'active'
                      ? 'scale-[0.97] opacity-90'
                      : currentState === 'error'
                      ? 'border-rose-500 animate-bounce shadow-rose-500/30'
                      : currentState === 'success'
                      ? 'border-emerald-500 shadow-emerald-500/30'
                      : currentState === 'disabled'
                      ? 'opacity-40 grayscale pointer-events-none'
                      : currentState === 'selected'
                      ? 'border-purple-500 shadow-purple-500/30'
                      : currentState === 'expanded'
                      ? 'border-amber-500 shadow-amber-500/30'
                      : currentState === 'dragging'
                      ? 'border-rose-400 border-dashed rotate-2 shadow-2xl'
                      : 'border-zinc-800'
                  }`}
                  style={{
                    borderRadius: `${propRadius}px`,
                    opacity: propOpacity / 100,
                  }}
                >
                  {/* Dynamic Specimen Card based on Props Inspector */}
                  <div className="text-center space-y-4 max-w-md w-full">
                    {/* Icon / Loader Status Box */}
                    {propShowIcon && (
                      <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto shadow-xl ${accentClasses}`}>
                        {propLoading || currentState === 'loading' ? (
                          <Loader2 className="w-8 h-8 animate-spin" />
                        ) : currentState === 'success' ? (
                          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                        ) : currentState === 'error' ? (
                          <XCircle className="w-8 h-8 text-rose-400" />
                        ) : (
                          <Sparkles className="w-8 h-8" />
                        )}
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <h3 className="font-bold text-lg md:text-xl text-current">{propLabel}</h3>
                        {propShowBadge && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${accentClasses}`}>
                            {propVariant}
                          </span>
                        )}
                      </div>
                      <p className="text-xs opacity-70 leading-relaxed max-w-xs mx-auto">{entry.description}</p>
                    </div>

                    {/* Interactive Controls inside Specimen */}
                    <div className="pt-4 flex items-center justify-center gap-3 flex-wrap">
                      <button
                        disabled={propDisabled || currentState === 'disabled'}
                        onClick={() => handleStateChange('success')}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all shadow-md flex items-center gap-2 ${
                          propDisabled || currentState === 'disabled'
                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                            : 'bg-cyan-500 text-zinc-950 hover:bg-cyan-400'
                        }`}
                      >
                        {propLoading || currentState === 'loading' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                        Trigger Action
                      </button>

                      <button
                        onClick={() => handleStateChange('error')}
                        className="px-4 py-2 rounded-xl bg-black/40 border border-zinc-700 text-xs font-mono font-bold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
                      >
                        Simulate Error
                      </button>
                    </div>

                    {/* Meta Spec Badges */}
                    <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-400 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-black/30 border border-zinc-800">State: <strong className="text-cyan-400 uppercase">{currentState}</strong></span>
                      <span className="px-2 py-0.5 rounded bg-black/30 border border-zinc-800">Size: <strong className="text-purple-400 uppercase">{propSize}</strong></span>
                      <span className="px-2 py-0.5 rounded bg-black/30 border border-zinc-800">Elev: <strong className="text-amber-400">{propElevation}</strong></span>
                    </div>
                  </div>
                </div>

                {/* State Trigger Bar underneath Canvas Stage */}
                <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-400 font-bold">
                    <span>Interactive State Selector</span>
                    <span>Active: <strong className="text-cyan-400">{currentState}</strong></span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(
                      [
                        'idle',
                        'hover',
                        'focus',
                        'pressed',
                        'active',
                        'loading',
                        'success',
                        'error',
                        'disabled',
                        'selected',
                        'expanded',
                        'dragging',
                        'offline',
                      ] as ComponentState[]
                    ).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStateChange(st)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase transition-all ${
                          currentState === st
                            ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md scale-105'
                            : 'bg-black/40 border border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Controls Inspector & Sensory Controls */}
          <div className={`w-full lg:w-96 border-l ${theme.border.default} ${theme.surface.primary} overflow-y-auto p-6 space-y-6 shrink-0`}>
            {/* Header Inspector Bar */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="font-bold text-sm text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" /> Controls &amp; Props Inspector
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={copyShareConfiguration}
                  title="Share / Copy Configuration JSON"
                  aria-live="polite"
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold hover:bg-cyan-500/20 transition-all flex items-center gap-1"
                >
                  {copiedShareConfig ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Share2 className="w-3.5 h-3.5" />}
                  {copiedShareConfig ? 'Copied!' : 'Share'}
                </button>
                <button
                  onClick={resetAllControls}
                  title="Reset All Inspector Settings"
                  className="p-1 rounded-lg bg-black/40 border border-zinc-800 text-zinc-400 hover:text-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Props Form */}
            <div className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-zinc-400 font-bold">Component Label / Title</label>
                <input
                  type="text"
                  value={propLabel}
                  onChange={(e) => setPropLabel(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-black/40 border border-zinc-800 text-white text-xs focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 font-bold">Variant</label>
                  <select
                    value={propVariant}
                    onChange={(e) => setPropVariant(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-black/40 border border-zinc-800 text-zinc-200 text-xs"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="outline">Outline</option>
                    <option value="glass">Glass</option>
                    <option value="luxury">Luxury Gold</option>
                    <option value="cyber">Cyber HUD</option>
                    <option value="ghost">Ghost</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 font-bold">Size</label>
                  <select
                    value={propSize}
                    onChange={(e) => setPropSize(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-black/40 border border-zinc-800 text-zinc-200 text-xs"
                  >
                    <option value="sm">Small (SM)</option>
                    <option value="md">Medium (MD)</option>
                    <option value="lg">Large (LG)</option>
                    <option value="xl">Extra (XL)</option>
                  </select>
                </div>
              </div>

              {/* Sliders Range */}
              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase text-zinc-400 font-bold">
                    <span>Border Radius</span>
                    <span className="text-cyan-400">{propRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="32"
                    value={propRadius}
                    onChange={(e) => setPropRadius(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] uppercase text-zinc-400 font-bold">
                    <span>Opacity Level</span>
                    <span className="text-cyan-400">{propOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={propOpacity}
                    onChange={(e) => setPropOpacity(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>

              {/* Accent Palette Chips */}
              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] uppercase text-zinc-400 font-bold block">Accent Theme Color</label>
                <div className="flex items-center gap-2">
                  {(['cyan', 'emerald', 'amber', 'rose', 'purple', 'gold'] as const).map((ac) => (
                    <button
                      key={ac}
                      onClick={() => setPropAccent(ac)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        ac === 'cyan'
                          ? 'bg-cyan-500 border-cyan-300'
                          : ac === 'emerald'
                          ? 'bg-emerald-500 border-emerald-300'
                          : ac === 'amber'
                          ? 'bg-amber-500 border-amber-300'
                          : ac === 'rose'
                          ? 'bg-rose-500 border-rose-300'
                          : ac === 'purple'
                          ? 'bg-purple-500 border-purple-300'
                          : 'bg-amber-400 border-yellow-200'
                      } ${propAccent === ac ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Boolean Toggles */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setPropDisabled(!propDisabled)}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
                    propDisabled ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' : 'bg-black/40 border-zinc-800 text-zinc-400'
                  }`}
                >
                  Disabled: {propDisabled ? 'YES' : 'NO'}
                </button>
                <button
                  onClick={() => setPropLoading(!propLoading)}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
                    propLoading ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-black/40 border-zinc-800 text-zinc-400'
                  }`}
                >
                  Loading: {propLoading ? 'YES' : 'NO'}
                </button>
                <button
                  onClick={() => setPropShowIcon(!propShowIcon)}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
                    propShowIcon ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' : 'bg-black/40 border-zinc-800 text-zinc-400'
                  }`}
                >
                  Icon: {propShowIcon ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setPropShowBadge(!propShowBadge)}
                  className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all ${
                    propShowBadge ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' : 'bg-black/40 border-zinc-800 text-zinc-400'
                  }`}
                >
                  Badge: {propShowBadge ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Multi-Sensory & Motion Preferences */}
            <div className={`p-5 rounded-2xl ${theme.surface.secondary} border ${theme.border.subtle} space-y-4`}>
              <h3 className="font-semibold text-xs font-mono uppercase tracking-wider opacity-75 flex items-center gap-1.5 text-cyan-400">
                <Sliders className="w-3.5 h-3.5" /> Motion &amp; Sensory Toggles
              </h3>

              <div className="space-y-3 text-xs font-mono">
                {/* Motion Intensity Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>Motion Intensity</span>
                    <span className="text-cyan-400 font-bold">{intensity}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    step="25"
                    value={intensity === 'off' ? 0 : intensity === 'subtle' ? 50 : intensity === 'normal' ? 100 : 150}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setIntensity(v === 0 ? 'off' : v <= 50 ? 'subtle' : v <= 100 ? 'normal' : 'dynamic');
                    }}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span>Sound Master</span>
                  <button
                    onClick={() => {
                      setSoundEnabled(!soundEnabled);
                      emit('selection.changed', 'sound-toggle', { soundEnabled: !soundEnabled });
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold ${
                      soundEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {soundEnabled ? 'ENABLED' : 'MUTED'}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span>Haptics Master</span>
                  <button
                    onClick={() => {
                      setHapticsEnabled(!hapticsEnabled);
                      emit('selection.changed', 'haptics-toggle', { hapticsEnabled: !hapticsEnabled });
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold ${
                      hapticsEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {hapticsEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </FocusTrap>
  );
}
