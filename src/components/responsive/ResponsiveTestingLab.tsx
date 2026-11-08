/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CATALOG_REGISTRY } from '../../design-system/catalog/catalogRegistry';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { VIEWPORT_PRESETS, REQUIRED_PRESETS } from './viewportPresets';
import { ViewportPreset, ExtendedViewportPresetId, TestingViewMode } from './types';
import { DeviceFrame } from './DeviceFrame';
import { TouchSimulationOverlay } from './TouchSimulationOverlay';
import { AdaptiveSpecimenRenderer } from './AdaptiveSpecimenRenderer';
import { DifferenceInspector } from './DifferenceInspector';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { useSound } from '../../design-system/sound/SoundContext';
import {
  Smartphone,
  Tablet,
  Monitor,
  Tv,
  Laptop,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Sliders,
  Search,
  Filter,
  Layers,
  Sparkles,
  GitCompare,
  LayoutGrid,
  Shield,
  ShieldAlert,
  Hand,
  MousePointer,
  CheckCircle2,
  AlertTriangle,
  Info,
  Cpu,
  Code2,
  ChevronDown,
  Eye,
} from 'lucide-react';

export const ResponsiveTestingLab: React.FC = () => {
  const { triggerHaptic } = useHaptics();
  const { playSound } = useSound();

  // State Management
  const [selectedEntryId, setSelectedEntryId] = useState<string>(CATALOG_REGISTRY[0]?.id || 'container-fluid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [activePresetId, setActivePresetId] = useState<ExtendedViewportPresetId>('phone-portrait');
  const [customWidth, setCustomWidth] = useState<number>(390);
  const [customHeight, setCustomHeight] = useState<number>(844);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(0.85);
  const [viewMode, setViewMode] = useState<TestingViewMode>('single-device');
  const [showBezel, setShowBezel] = useState<boolean>(true);
  const [showThumbZone, setShowThumbZone] = useState<boolean>(false);
  const [showTouchHitboxes, setShowTouchHitboxes] = useState<boolean>(false);
  const [activeGestureLog, setActiveGestureLog] = useState<string[]>([]);

  // Selected Catalog Entry
  const selectedEntry = useMemo(() => {
    return CATALOG_REGISTRY.find((e) => e.id === selectedEntryId) || CATALOG_REGISTRY[0];
  }, [selectedEntryId]);

  // Active Viewport Preset
  const activePreset: ViewportPreset = useMemo(() => {
    if (isCustomMode) {
      return {
        id: 'custom',
        name: 'Custom Viewport',
        category: customWidth < 600 ? 'phone' : customWidth < 1024 ? 'tablet' : 'desktop',
        width: customWidth,
        height: customHeight,
        aspectRatio: `${customWidth}:${customHeight}`,
        dpi: 2,
        orientation: customWidth > customHeight ? 'landscape' : 'portrait',
        deviceModel: `Custom Dimension (${customWidth} × ${customHeight})`,
        hasTouch: customWidth < 1024,
        hasHover: customWidth >= 1024,
        safeAreaInsets: { top: 20, right: 0, bottom: 20, left: 0 },
        description: 'User-configured custom test dimensions.',
        iconName: 'Sliders',
        defaultBezel: 'frameless',
      };
    }
    return VIEWPORT_PRESETS.find((p) => p.id === activePresetId) || VIEWPORT_PRESETS[0];
  }, [activePresetId, isCustomMode, customWidth, customHeight]);

  // Filtered Catalog Entries for Selection
  const filteredCatalog = useMemo(() => {
    return CATALOG_REGISTRY.filter((entry) => {
      const matchesSearch = entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFamily = selectedFamily === 'all' || entry.family === selectedFamily;
      return matchesSearch && matchesFamily;
    });
  }, [searchQuery, selectedFamily]);

  const handlePresetSelect = (presetId: ExtendedViewportPresetId) => {
    triggerHaptic('selection');
    playSound('selection', 'MICRO');
    setIsCustomMode(false);
    setActivePresetId(presetId);
    const p = VIEWPORT_PRESETS.find((x) => x.id === presetId);
    if (p) {
      setCustomWidth(p.width);
      setCustomHeight(p.height);
      // Auto-adjust scale to fit comfortable canvas
      if (p.width >= 1920) setScale(0.45);
      else if (p.width >= 1280) setScale(0.6);
      else if (p.width >= 768) setScale(0.75);
      else setScale(0.85);
    }
  };

  const handleRotateOrientation = () => {
    triggerHaptic('tap');
    playSound('tap', 'MICRO');
    if (activePreset.orientation === 'portrait') {
      if (activePreset.id === 'phone-portrait') handlePresetSelect('phone-landscape');
      else if (activePreset.id === 'tablet-portrait') handlePresetSelect('tablet-landscape');
      else {
        setIsCustomMode(true);
        setCustomWidth(activePreset.height);
        setCustomHeight(activePreset.width);
      }
    } else {
      if (activePreset.id === 'phone-landscape') handlePresetSelect('phone-portrait');
      else if (activePreset.id === 'tablet-landscape') handlePresetSelect('tablet-portrait');
      else {
        setIsCustomMode(true);
        setCustomWidth(activePreset.height);
        setCustomHeight(activePreset.width);
      }
    }
  };

  const handleGestureEvent = (gestureName: string) => {
    setActiveGestureLog((prev) => [
      `[${new Date().toLocaleTimeString()}] ${gestureName}`,
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Banner & Mode Switcher */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-zinc-900/80 to-purple-950/40 border border-cyan-500/30 backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/20">
                <Smartphone className="w-5 h-5 animate-pulse" />
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Responsive Testing Environment & Device Simulator
              </h1>
            </div>
            <p className="text-xs text-zinc-300 max-w-3xl leading-relaxed">
              Test every catalog entry across 7 distinct physical viewports with true adaptive layout morphing, no-hover touch physics, thumb-zone reachability validation, and side-by-side desktop difference auditing.
            </p>
          </div>

          {/* View Mode Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-black/50 border border-white/10 rounded-2xl shrink-0 flex-wrap">
            {[
              { id: 'single-device', label: 'Device Simulator', icon: Smartphone },
              { id: 'side-by-side-diff', label: 'Desktop vs Mobile Split', icon: GitCompare },
              { id: 'multi-device-matrix', label: '4-Up Multi-Matrix', icon: LayoutGrid },
              { id: 'touch-lab', label: 'Diff Matrix & Rationale', icon: Layers },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = viewMode === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    triggerHaptic('tap');
                    playSound('tap', 'MICRO');
                    setViewMode(tab.id as TestingViewMode);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/30'
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

      {/* Catalog Entry Selector & Preset Bar (Shown in Device & Split Modes) */}
      {viewMode !== 'touch-lab' && (
        <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-4">
          {/* Row 1: Specimen Entry Picker */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <span className="text-xs font-mono uppercase text-zinc-400 font-bold shrink-0">Testing Specimen:</span>
              <div className="relative flex-1">
                <select
                  value={selectedEntryId}
                  onChange={(e) => {
                    setSelectedEntryId(e.target.value);
                    triggerHaptic('selection');
                    playSound('selection', 'MICRO');
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-cyan-500 pr-8"
                >
                  {CATALOG_REGISTRY.map((entry) => (
                    <option key={entry.id} value={entry.id} className="bg-zinc-900 text-white">
                      [{entry.family.toUpperCase()}] {entry.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Quick Family Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {['all', 'layout', 'navigation', 'action', 'input', 'surface', 'feedback', 'ai'].map((fam) => (
                <button
                  key={fam}
                  onClick={() => setSelectedFamily(fam)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono uppercase transition-all ${
                    selectedFamily === fam
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'bg-white/5 text-zinc-400 hover:text-white'
                  }`}
                >
                  {fam}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: 7 Viewport Presets Selector (Phone Portrait, Phone Landscape, Tablet Portrait, Tablet Landscape, Laptop, Desktop, Large Display) */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase text-zinc-400 font-bold shrink-0">Viewport Presets (7):</span>
              {REQUIRED_PRESETS.map((preset) => {
                const isActive = !isCustomMode && activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                        : 'bg-black/40 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {preset.category === 'phone' ? (
                      <Smartphone className="w-3.5 h-3.5" />
                    ) : preset.category === 'tablet' ? (
                      <Tablet className="w-3.5 h-3.5" />
                    ) : preset.category === 'laptop' ? (
                      <Laptop className="w-3.5 h-3.5" />
                    ) : preset.category === 'desktop' ? (
                      <Monitor className="w-3.5 h-3.5" />
                    ) : (
                      <Tv className="w-3.5 h-3.5" />
                    )}
                    <span>{preset.name}</span>
                    <span className="text-[10px] opacity-70">({preset.width}×{preset.height})</span>
                  </button>
                );
              })}
            </div>

            {/* Stage Tools & Controls (Rotate, Zoom, Thumb Zone, Hitboxes, Bezel) */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Rotate 90 deg */}
              <button
                onClick={handleRotateOrientation}
                className="p-2 rounded-xl bg-black/40 border border-white/10 hover:bg-white/10 text-zinc-300 text-xs flex items-center gap-1"
                title="Rotate Orientation (90°)"
              >
                <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline font-mono">Rotate</span>
              </button>

              {/* Thumb Zone Toggle */}
              <button
                onClick={() => {
                  triggerHaptic('tap');
                  setShowThumbZone(!showThumbZone);
                }}
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                  showThumbZone
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                }`}
                title="Toggle One-Handed Thumb Zone Reachability Heatmap"
              >
                <Hand className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Thumb Zone</span>
              </button>

              {/* Touch 44px Hitboxes Toggle */}
              <button
                onClick={() => {
                  triggerHaptic('tap');
                  setShowTouchHitboxes(!showTouchHitboxes);
                }}
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                  showTouchHitboxes
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                }`}
                title="Inspect WCAG 2.2 44px/48px Touch Target Hitboxes"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">44px Hitbox</span>
              </button>

              {/* Hardware Bezel Toggle */}
              <button
                onClick={() => setShowBezel(!showBezel)}
                className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                  showBezel
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                    : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                }`}
                title="Toggle Physical Device Hardware Bezel"
              >
                <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Bezel</span>
              </button>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setScale((s) => Math.max(0.3, s - 0.1))}
                  className="p-1 rounded hover:bg-white/10 text-zinc-300"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono px-1.5 text-cyan-300">{Math.round(scale * 100)}%</span>
                <button
                  onClick={() => setScale((s) => Math.min(1.5, s + 0.1))}
                  className="p-1 rounded hover:bg-white/10 text-zinc-300"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Viewport Testing Stage */}
      {viewMode === 'single-device' && (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Center Stage: Device Simulator Canvas */}
          <div className="flex-1 min-h-[750px] p-8 rounded-3xl bg-zinc-950/80 border border-white/10 flex flex-col items-center justify-start overflow-auto relative shadow-2xl">
            {/* Viewport Info Pill */}
            <div className="mb-6 px-4 py-2 rounded-full bg-zinc-900/90 border border-white/10 text-xs font-mono flex items-center gap-3 shadow-xl backdrop-blur-md">
              <span className="text-cyan-300 font-bold">{activePreset.name}</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-300">{activePreset.width} × {activePreset.height} px</span>
              <span className="text-zinc-500">|</span>
              <span className="text-emerald-400">{activePreset.hasTouch ? 'Touch-Mode (No Hover)' : 'Pointer Hover'}</span>
            </div>

            {/* Device Hardware Shell & Interactive Specimen */}
            <div className="transition-all duration-300 flex justify-center">
              <DeviceFrame preset={activePreset} scale={scale} showBezel={showBezel}>
                <TouchSimulationOverlay
                  enabled={true}
                  viewportWidth={activePreset.width}
                  viewportHeight={activePreset.height}
                  isTouchDevice={activePreset.hasTouch}
                  showThumbZone={showThumbZone}
                  showTouchHitboxes={showTouchHitboxes}
                  onGesture={handleGestureEvent}
                >
                  <AdaptiveSpecimenRenderer entry={selectedEntry} preset={activePreset} />
                </TouchSimulationOverlay>
              </DeviceFrame>
            </div>
          </div>

          {/* Right Sidebar: Interaction Inspector & Telemetry Log */}
          <div className="w-full lg:w-80 space-y-4 shrink-0">
            {/* Device Profile Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
              <h3 className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Device Hardware Profile
              </h3>
              <div className="space-y-2 text-xs font-mono text-zinc-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Form Factor:</span>
                  <span className="font-bold text-white uppercase">{activePreset.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Resolution:</span>
                  <span>{activePreset.width} × {activePreset.height} px</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Aspect Ratio:</span>
                  <span>{activePreset.aspectRatio}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Pixel Density:</span>
                  <span>{activePreset.dpi}x Retina</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-zinc-500">Input Modality:</span>
                  <span className={activePreset.hasTouch ? 'text-cyan-300 font-bold' : 'text-zinc-300'}>
                    {activePreset.hasTouch ? 'Direct Touch Only' : 'Mouse Pointer'}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Hover Support:</span>
                  <span className={activePreset.hasHover ? 'text-emerald-400' : 'text-rose-400 font-bold'}>
                    {activePreset.hasHover ? 'Native Hover' : 'None (No-Hover)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Live Gesture Stream */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-3">
              <h3 className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-2">
                <Hand className="w-4 h-4" /> Live Touch Gesture Stream
              </h3>
              <p className="text-[11px] text-zinc-400">
                Directly interact with the specimen to trigger gestures (Pull-to-refresh, Swipe cards, 400ms Long-press).
              </p>
              <div className="space-y-1.5 font-mono text-[11px]">
                {activeGestureLog.length === 0 ? (
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-zinc-500 text-center">
                    Awaiting touch interaction...
                  </div>
                ) : (
                  activeGestureLog.map((log, i) => (
                    <div key={i} className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-cyan-200">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Specimen Adaptive Architecture Notes */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/30 to-zinc-900 border border-purple-500/20 space-y-2 text-xs">
              <span className="font-mono text-purple-300 font-bold uppercase block text-[10px]">Adaptive Behavior</span>
              <p className="text-zinc-300 leading-relaxed">
                {selectedEntry.responsiveBehavior}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode B: Side-by-Side Split Compare (Desktop 1920px vs Phone 390px) */}
      {viewMode === 'side-by-side-diff' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong>Side-by-Side Live Comparison:</strong> Desktop Full HD (1920px) on left vs. Phone Portrait (390px) on right. Observe structural layout shifts, density budgets, and hover elimination in real time.
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold text-[11px]">
              Zero Shrink Verification
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Desktop Specimen View */}
            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
                  <Monitor className="w-4 h-4" />
                  <span>Desktop Viewport (1920 × 1080)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-zinc-300">
                  Mouse Hover & Multi-Col Grid
                </span>
              </div>
              <div className="h-[560px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <AdaptiveSpecimenRenderer
                  entry={selectedEntry}
                  preset={VIEWPORT_PRESETS.find((p) => p.id === 'desktop') || VIEWPORT_PRESETS[5]}
                />
              </div>
            </div>

            {/* Mobile Specimen View */}
            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-4 shadow-xl flex flex-col items-center">
              <div className="w-full flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile Viewport (390 × 844)</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-[10px] font-mono text-cyan-300">
                  Touch Cards, Swipe & Bottom Sheet
                </span>
              </div>
              <div className="flex justify-center w-full">
                <DeviceFrame
                  preset={VIEWPORT_PRESETS.find((p) => p.id === 'phone-portrait') || VIEWPORT_PRESETS[0]}
                  scale={0.68}
                  showBezel={true}
                >
                  <TouchSimulationOverlay
                    enabled={true}
                    viewportWidth={390}
                    viewportHeight={844}
                    isTouchDevice={true}
                    showThumbZone={showThumbZone}
                    showTouchHitboxes={showTouchHitboxes}
                    onGesture={handleGestureEvent}
                  >
                    <AdaptiveSpecimenRenderer
                      entry={selectedEntry}
                      preset={VIEWPORT_PRESETS.find((p) => p.id === 'phone-portrait') || VIEWPORT_PRESETS[0]}
                    />
                  </TouchSimulationOverlay>
                </DeviceFrame>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mode C: 4-Up Multi-Device Matrix */}
      {viewMode === 'multi-device-matrix' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { id: 'phone-portrait', title: 'Phone Portrait (390×844)', scale: 0.55 },
              { id: 'phone-landscape', title: 'Phone Landscape (844×390)', scale: 0.55 },
              { id: 'tablet-portrait', title: 'Tablet Portrait (768×1024)', scale: 0.45 },
              { id: 'desktop', title: 'Desktop (1920×1080)', scale: 0.35 },
            ].map((item) => {
              const preset = VIEWPORT_PRESETS.find((p) => p.id === item.id) || VIEWPORT_PRESETS[0];
              return (
                <div key={item.id} className="p-4 rounded-3xl bg-zinc-900/80 border border-white/10 space-y-3 flex flex-col items-center shadow-xl">
                  <div className="w-full flex items-center justify-between border-b border-white/10 pb-2 text-xs font-mono">
                    <span className="font-bold text-white">{item.title}</span>
                    <span className="text-[10px] text-cyan-400">{preset.hasTouch ? 'Touch' : 'Pointer'}</span>
                  </div>
                  <div className="flex justify-center w-full py-2">
                    <DeviceFrame preset={preset} scale={item.scale} showBezel={true}>
                      <AdaptiveSpecimenRenderer entry={selectedEntry} preset={preset} />
                    </DeviceFrame>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode D: Architectural Difference Inspector Matrix */}
      {viewMode === 'touch-lab' && <DifferenceInspector />}
    </div>
  );
};
