/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePerformanceTier, TierBoundary } from '../../design-system/performance/PerformanceContext';
import { PERFORMANCE_TIERS } from '../../design-system/performance/performanceTiers';
import { PerformanceTierId } from '../../design-system/performance/types';
import { TierBadge } from '../../design-system/performance/TierSwitch';
import { QuantumCoreSpecimen } from './specimens/QuantumCoreSpecimen';
import { TelemetryHudSpecimen } from './specimens/TelemetryHudSpecimen';
import { InteractiveControllerSpecimen } from './specimens/InteractiveControllerSpecimen';
import { SpatialSurfaceSpecimen } from './specimens/SpatialSurfaceSpecimen';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { useSound } from '../../design-system/sound/SoundContext';
import {
  Gauge,
  Zap,
  Activity,
  Cpu,
  Eye,
  Sliders,
  Layers,
  Sparkles,
  GitCompare,
  LayoutGrid,
  Shield,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Info,
  Code2,
  ChevronDown,
  RefreshCw,
  Pause,
  Play,
  Flame,
  BatteryCharging,
  Monitor,
  Box,
} from 'lucide-react';

type LabViewMode = 'tri-tier-compare' | 'single-tuning' | 'telemetry-monitor' | 'code-patterns';

export const PerformanceLab: React.FC = () => {
  const { triggerHaptic } = useHaptics();
  const { playSound } = useSound();

  const {
    activeTier,
    setTier,
    isAutoAdaptive,
    setIsAutoAdaptive,
    telemetry,
    resetTelemetry,
  } = usePerformanceTier();

  const [viewMode, setViewMode] = useState<LabViewMode>('tri-tier-compare');
  const [selectedSpecimen, setSelectedSpecimen] = useState<string>('quantum-core');
  const [stressTestActive, setStressTestActive] = useState<boolean>(false);
  const [simulatedIdlePaused, setSimulatedIdlePaused] = useState<boolean>(false);

  const specimenOptions = [
    { id: 'quantum-core', name: 'Quantum Core Engine (AI Processor)', icon: Cpu },
    { id: 'telemetry-hud', name: 'Scientific Telemetry & HUD (Data Streams)', icon: Activity },
    { id: 'action-controller', name: 'Action Controller (Tactile & Actuator)', icon: Sliders },
    { id: 'spatial-surface', name: 'Spatial Surface (3D Layer & Modals)', icon: Layers },
  ];

  const handleTierChange = (tier: PerformanceTierId) => {
    triggerHaptic('selection');
    playSound('selection', 'MICRO');
    setIsAutoAdaptive(false);
    setTier(tier);
  };

  const renderSpecimenComponent = (tierOverride?: PerformanceTierId) => {
    switch (selectedSpecimen) {
      case 'quantum-core':
        return <QuantumCoreSpecimen forceTier={tierOverride} />;
      case 'telemetry-hud':
        return <TelemetryHudSpecimen forceTier={tierOverride} />;
      case 'action-controller':
        return <InteractiveControllerSpecimen forceTier={tierOverride} />;
      case 'spatial-surface':
        return <SpatialSurfaceSpecimen forceTier={tierOverride} />;
      default:
        return <QuantumCoreSpecimen forceTier={tierOverride} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner & Global Performance Tier Switcher */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-zinc-900/80 to-purple-950/40 border border-amber-500/30 backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-lg shadow-amber-500/20">
                <Gauge className="w-5 h-5 animate-pulse" />
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Performance Engineering Lab & Tier Governor
              </h1>
            </div>
            <p className="text-xs text-zinc-300 max-w-3xl leading-relaxed">
              Experience the same component running across 3 distinct performance tiers (Tier 1 Low, Tier 2 Standard, Tier 3 High) with adaptive fallbacks for blur, particles, lighting, spatial 3D effects, and automatic animation loop idling.
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-black/50 border border-white/10 rounded-2xl shrink-0 flex-wrap">
            {[
              { id: 'tri-tier-compare', label: '3-Tier Side-by-Side', icon: GitCompare },
              { id: 'single-tuning', label: 'Interactive Tuning', icon: Sliders },
              { id: 'telemetry-monitor', label: 'Telemetry & Loops', icon: Activity },
              { id: 'code-patterns', label: 'Architecture Guide', icon: Code2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = viewMode === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    triggerHaptic('tap');
                    playSound('tap', 'MICRO');
                    setViewMode(tab.id as LabViewMode);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-amber-500 text-zinc-950 font-bold shadow-lg shadow-amber-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Global Tier Control Bar */}
      <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Tier Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-mono uppercase text-zinc-400 font-bold shrink-0">Global Tier:</span>
          {[
            { id: 'tier1-low', label: 'Tier 1 Low', tag: 'Eco / Minimal Blur', color: 'amber', icon: BatteryCharging },
            { id: 'tier2-standard', label: 'Tier 2 Standard', tag: 'Balanced / Normal Glass', color: 'cyan', icon: Monitor },
            { id: 'tier3-high', label: 'Tier 3 High', tag: 'Ultra / 3D & Particles', color: 'purple', icon: Sparkles },
          ].map((t) => {
            const isActive = !isAutoAdaptive && activeTier === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => handleTierChange(t.id as PerformanceTierId)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
                  isActive
                    ? t.id === 'tier1-low'
                      ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-500/30'
                      : t.id === 'tier2-standard'
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/30'
                      : 'bg-purple-500 text-zinc-950 font-bold shadow-md shadow-purple-500/30'
                    : 'bg-black/40 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
                <span className="text-[10px] opacity-70">({t.tag})</span>
              </button>
            );
          })}

          {/* Auto Adaptive Toggle */}
          <button
            onClick={() => {
              triggerHaptic('tap');
              setIsAutoAdaptive(!isAutoAdaptive);
            }}
            className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              isAutoAdaptive
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'bg-black/40 border border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAutoAdaptive ? 'animate-spin' : ''}`} />
            <span>Auto-Adaptive FPS</span>
          </button>
        </div>

        {/* Live Mini FPS Status Badge */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10">
            <span className="text-zinc-400">FPS:</span>
            <span className={`font-bold ${telemetry.fps >= 55 ? 'text-emerald-400' : telemetry.fps >= 40 ? 'text-amber-400' : 'text-rose-400'}`}>
              {telemetry.fps} Hz
            </span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-400">Frame:</span>
            <span className="text-cyan-300">{telemetry.frameTimeMs}ms</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-[11px] text-zinc-300">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Active Effects: <strong>{Object.values(telemetry.activeEffects).reduce((a, b) => a + b, 0)}</strong></span>
          </div>
        </div>
      </div>

      {/* Specimen Picker Bar (Shown in Compare & Tuning views) */}
      {(viewMode === 'tri-tier-compare' || viewMode === 'single-tuning') && (
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-xs font-mono uppercase text-zinc-400 font-bold shrink-0">Testing Specimen:</span>
            <div className="flex gap-2 flex-wrap flex-1">
              {specimenOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedSpecimen === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => {
                      triggerHaptic('selection');
                      playSound('selection', 'MICRO');
                      setSelectedSpecimen(opt.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                        : 'bg-white/5 border border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{opt.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODE 1: 3-TIER SYNCHRONIZED SIDE-BY-SIDE COMPARATOR
         ========================================================================= */}
      {viewMode === 'tri-tier-compare' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 text-xs text-zinc-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Synchronized Tri-Tier Rendering:</strong> The EXACT same component rendered simultaneously across all 3 performance budgets. Notice the distinct degradation and enhancement across Blur, Particles, Motion, Lighting, and 3D Perspective.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Tier 1 Low */}
            <div className="p-5 rounded-3xl bg-zinc-950/90 border border-amber-500/30 flex flex-col items-center space-y-4 shadow-xl relative">
              <div className="w-full flex items-center justify-between border-b border-amber-500/20 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold">
                  <BatteryCharging className="w-4 h-4" />
                  <span>Tier 1 Low (Eco)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold">
                  Minimal Blur / 0 Particles
                </span>
              </div>

              {/* Specimen Render */}
              <div className="w-full py-2 flex justify-center">
                <TierBoundary tier="tier1-low">
                  {renderSpecimenComponent('tier1-low')}
                </TierBoundary>
              </div>

              {/* Feature Checklist */}
              <div className="w-full pt-3 border-t border-white/5 space-y-1.5 text-[11px] font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span>Blur Level:</span>
                  <span className="text-white font-bold">0px (None)</span>
                </div>
                <div className="flex justify-between">
                  <span>Particle Physics:</span>
                  <span className="text-zinc-500">Disabled (0)</span>
                </div>
                <div className="flex justify-between">
                  <span>Transitions:</span>
                  <span className="text-white">CSS 150ms Ease</span>
                </div>
                <div className="flex justify-between">
                  <span>Continuous Loops:</span>
                  <span className="text-emerald-400 font-bold">0 (Zero Loop)</span>
                </div>
              </div>
            </div>

            {/* Column 2: Tier 2 Standard */}
            <div className="p-5 rounded-3xl bg-zinc-900/80 border border-cyan-500/30 flex flex-col items-center space-y-4 shadow-xl relative">
              <div className="w-full flex items-center justify-between border-b border-cyan-500/20 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
                  <Monitor className="w-4 h-4" />
                  <span>Tier 2 Standard (Balanced)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold">
                  Normal Glass / Spring Motion
                </span>
              </div>

              {/* Specimen Render */}
              <div className="w-full py-2 flex justify-center">
                <TierBoundary tier="tier2-standard">
                  {renderSpecimenComponent('tier2-standard')}
                </TierBoundary>
              </div>

              {/* Feature Checklist */}
              <div className="w-full pt-3 border-t border-white/5 space-y-1.5 text-[11px] font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span>Blur Level:</span>
                  <span className="text-cyan-300 font-bold">12px (Frosted Glass)</span>
                </div>
                <div className="flex justify-between">
                  <span>Particle Physics:</span>
                  <span className="text-cyan-300">12 Ambient Dust</span>
                </div>
                <div className="flex justify-between">
                  <span>Transitions:</span>
                  <span className="text-cyan-300">Spring Physics</span>
                </div>
                <div className="flex justify-between">
                  <span>Lighting:</span>
                  <span className="text-white">Subtle Ambient Glow</span>
                </div>
              </div>
            </div>

            {/* Column 3: Tier 3 High */}
            <div className="p-5 rounded-3xl bg-zinc-900/80 border border-purple-500/40 flex flex-col items-center space-y-4 shadow-2xl relative ring-1 ring-purple-500/30">
              <div className="w-full flex items-center justify-between border-b border-purple-500/20 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Tier 3 High (Ultra Fidelity)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold">
                  3D Spatial / 60 Particles / Bloom
                </span>
              </div>

              {/* Specimen Render */}
              <div className="w-full py-2 flex justify-center">
                <TierBoundary tier="tier3-high">
                  {renderSpecimenComponent('tier3-high')}
                </TierBoundary>
              </div>

              {/* Feature Checklist */}
              <div className="w-full pt-3 border-t border-white/5 space-y-1.5 text-[11px] font-mono text-zinc-400">
                <div className="flex justify-between">
                  <span>Blur Level:</span>
                  <span className="text-purple-300 font-bold">32px (Multi-Layer)</span>
                </div>
                <div className="flex justify-between">
                  <span>Particle Physics:</span>
                  <span className="text-purple-300 font-bold">60 Reactive Swarm</span>
                </div>
                <div className="flex justify-between">
                  <span>Spatial 3D:</span>
                  <span className="text-purple-300 font-bold">6-DOF Tilt + Geometry</span>
                </div>
                <div className="flex justify-between">
                  <span>Lighting:</span>
                  <span className="text-purple-300 font-bold">Spotlight + Volumetric</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODE 2: SINGLE INTERACTIVE TUNING SANDBOX
         ========================================================================= */}
      {viewMode === 'single-tuning' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stage */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-zinc-950/80 border border-white/10 flex flex-col items-center justify-center min-h-[500px] shadow-2xl relative">
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <TierBadge />
              <span className="text-xs font-mono text-zinc-400">Interactive Live Stage</span>
            </div>

            <div className="w-full max-w-md my-8 flex justify-center">
              {renderSpecimenComponent()}
            </div>
          </div>

          {/* Right Tuning Specs */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
              <h3 className="text-xs font-mono uppercase text-amber-400 font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4" /> Active Tier Tuning Profile
              </h3>

              <div className="space-y-2 text-xs font-mono text-zinc-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Tier Name:</span>
                  <span className="font-bold text-white uppercase">{PERFORMANCE_TIERS[activeTier].name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Backdrop Blur:</span>
                  <span className="text-cyan-300">{PERFORMANCE_TIERS[activeTier].blur.maxBlurPx}px ({PERFORMANCE_TIERS[activeTier].blur.level})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Max Particles:</span>
                  <span className="text-purple-300">{PERFORMANCE_TIERS[activeTier].particles.maxParticles} Physics Units</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Spatial 3D Tilt:</span>
                  <span className={PERFORMANCE_TIERS[activeTier].spatial3D.enabled ? 'text-emerald-400' : 'text-zinc-500'}>
                    {PERFORMANCE_TIERS[activeTier].spatial3D.enabled ? 'Enabled (6-DOF)' : 'Disabled (Flat)'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Transition Engine:</span>
                  <span className="text-zinc-300">{PERFORMANCE_TIERS[activeTier].motion.transitionType}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Target Display:</span>
                  <span className="text-amber-300 font-bold">{PERFORMANCE_TIERS[activeTier].budget.targetFps} FPS Target</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
              <h3 className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-2">
                <Box className="w-4 h-4" /> Fallback Implementation Pattern
              </h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                Component gracefully adapts with <code className="text-amber-300">&lt;TierSwitch /&gt;</code> or <code className="text-cyan-300">useTierValue()</code> to ensure high frame rates on low-end devices without sacrificing high-end visual fidelity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODE 3: TELEMETRY & ANIMATION LOOP IDLE GUARD MONITOR
         ========================================================================= */}
      {viewMode === 'telemetry-monitor' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* FPS Meter */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                <span>Real-Time FPS</span>
                <Gauge className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-bold font-mono text-white flex items-baseline gap-1">
                <span className={telemetry.fps >= 55 ? 'text-emerald-400' : 'text-amber-400'}>{telemetry.fps}</span>
                <span className="text-xs text-zinc-400 font-normal">Hz</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400">
                Frame Time: <strong className="text-cyan-300">{telemetry.frameTimeMs} ms</strong>
              </div>
            </div>

            {/* Active Backdrop Filters */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                <span>Backdrop Filters</span>
                <Layers className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold font-mono text-cyan-300">
                {telemetry.activeEffects.backdropFiltersCount}
              </div>
              <div className="text-[11px] font-mono text-zinc-400">
                Active Glass Layers
              </div>
            </div>

            {/* Active RAF Loops */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                <span>Continuous RAF Loops</span>
                <Activity className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-bold font-mono text-purple-300">
                {telemetry.activeEffects.canvasRafLoopsCount}
              </div>
              <div className="text-[11px] font-mono text-zinc-400">
                {telemetry.isIdlePaused ? 'PAUSED (Idle / Hidden)' : 'Active Physics Loops'}
              </div>
            </div>

            {/* 3D Perspective Transforms */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
                <span>3D Spatial Transforms</span>
                <Box className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-bold font-mono text-amber-300">
                {telemetry.activeEffects.active3DTransformsCount}
              </div>
              <div className="text-[11px] font-mono text-zinc-400">
                6-DOF Perspective Matrices
              </div>
            </div>
          </div>

          {/* Animation Loop Idle Guard Demonstration */}
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  Animation Loop Guard & CPU Throttling Prevention
                </h3>
                <p className="text-xs text-zinc-400">
                  Continuous <code className="text-cyan-300">requestAnimationFrame</code> loops automatically freeze when the browser tab is hidden, when components scroll out of view, or when downgraded to Tier 1.
                </p>
              </div>

              <button
                onClick={resetTelemetry}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 flex items-center gap-1.5 shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Telemetry Counters</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-zinc-400 font-bold uppercase text-[10px] block">Tab Visibility Guard</span>
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${document.hidden ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  <span className="text-white font-bold">{document.hidden ? 'Document Hidden (Paused)' : 'Document Visible (Active)'}</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  When switching browser tabs, all Tier 3 particle physics engines instantly pause execution.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-zinc-400 font-bold uppercase text-[10px] block">Offscreen Viewport Guard</span>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-white font-bold">IntersectionObserver Active</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Components scrolled off-screen halt canvas particle rendering to free GPU fill-rate.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-zinc-400 font-bold uppercase text-[10px] block">Tier 1 Loop Elimination</span>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="text-white font-bold">Zero-Loop Guarantee</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Selecting Tier 1 terminates all RAF animation loops entirely, replacing them with static CSS transitions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         MODE 4: ARCHITECTURE & DEVELOPER IMPLEMENTATION GUIDE
         ========================================================================= */}
      {viewMode === 'code-patterns' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-4">
            <h3 className="text-sm font-mono font-bold text-cyan-400 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Pattern 1: Declarative Component Fallbacks with &lt;TierSwitch /&gt;
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-mono">
              Use the declarative <code className="text-amber-300">&lt;TierSwitch /&gt;</code> component to provide distinct JSX trees for each performance tier:
            </p>

            <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-xs font-mono text-cyan-300 overflow-x-auto">
{`import { TierSwitch } from '../design-system/performance/TierSwitch';

export const AdaptiveCard = () => {
  return (
    <TierSwitch
      low={<FlatEcoCard />}
      standard={<FrostedGlassCard />}
      high={<Spatial3DVolumetricCard />}
    />
  );
};`}
            </pre>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-4">
            <h3 className="text-sm font-mono font-bold text-purple-400 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Pattern 2: Value Selection Hook with useTierValue()
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-mono">
              Use <code className="text-purple-300">useTierValue()</code> for granular CSS class or particle count selection:
            </p>

            <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-xs font-mono text-purple-300 overflow-x-auto">
{`import { useTierValue } from '../design-system/performance/PerformanceContext';

export const MyComponent = () => {
  const blurClass = useTierValue({
    low: 'backdrop-blur-none bg-zinc-900',
    standard: 'backdrop-blur-md bg-zinc-900/80',
    high: 'backdrop-blur-2xl bg-zinc-900/60 ring-1 ring-cyan-400/30'
  });

  const particleCount = useTierValue({ low: 0, standard: 12, high: 60 });

  return <div className={blurClass}>Particles: {particleCount}</div>;
};`}
            </pre>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-4">
            <h3 className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Pattern 3: Loop Protection with usePreventIdleLoop()
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-mono">
              Prevent battery drain by using the automatic idle/tab-hidden RAF guard:
            </p>

            <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-xs font-mono text-emerald-300 overflow-x-auto">
{`import { usePreventIdleLoop } from '../design-system/performance/expensiveEffectsTracker';

export const ParticleCanvas = ({ enabled }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  usePreventIdleLoop({
    enabled: enabled && isHighTier,
    elementRef: containerRef, // Pauses when scrolled out of view!
    onFrame: (timestamp, delta) => {
      // Runs only when tab is visible and element is on-screen
      renderParticles(delta);
    }
  });

  return <div ref={containerRef}><canvas /></div>;
};`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
