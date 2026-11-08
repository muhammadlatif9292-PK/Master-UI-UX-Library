/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAccessibility, ACCESSIBILITY_PRESETS } from '../../design-system/accessibility/AccessibilityContext';
import { AccessibilitySettings, AccessibilityPresetId } from '../../design-system/accessibility/types';
import { ComponentPreviewRig } from './ComponentPreviewRig';
import { CatalogAuditReport } from './CatalogAuditReport';
import { ContrastCheckerWidget } from './ContrastCheckerWidget';
import { TouchTargetInspector } from './TouchTargetInspector';
import { ScreenReaderSimulator } from './ScreenReaderSimulator';
import {
  ShieldCheck,
  Zap,
  ZapOff,
  Eye,
  EyeOff,
  Sparkles,
  Volume2,
  VolumeX,
  Vibrate,
  Type,
  Keyboard,
  Target,
  Sliders,
  Radio,
  FileCheck,
  RotateCcw,
  Check,
  AlertTriangle,
  Flame,
  Info,
  Maximize2,
} from 'lucide-react';

export function AccessibilityLab() {
  const {
    settings,
    toggleSetting,
    updateSetting,
    applyPreset,
    activePresetId,
    resetToDefaults,
    announce,
  } = useAccessibility();

  const [activeTab, setActiveTab] = useState<
    'preview-rig' | 'catalog-audit' | 'contrast-calc' | 'touch-targets' | 'screen-reader'
  >('preview-rig');

  // Definitions for all 12 Accessibility Modality Controls
  const toggleItems: Array<{
    key: keyof AccessibilitySettings;
    label: string;
    description: string;
    icon: any;
    category: 'motion' | 'visual' | 'sensory' | 'keyboard' | 'semantics';
  }> = [
    // Motion & Physics
    {
      key: 'reducedMotion',
      label: 'Reduced Motion',
      description: 'Disables spring physics, halts continuous rotations, and sets transitions to 0s.',
      icon: ZapOff,
      category: 'motion',
    },
    // Visual & Surfaces
    {
      key: 'reducedTransparency',
      label: 'Reduced Transparency',
      description: 'Strips backdrop-blur filters and renders opaque 100% solid background surfaces.',
      icon: EyeOff,
      category: 'visual',
    },
    {
      key: 'reducedEffects',
      label: 'Reduced Effects',
      description: 'Removes glowing drop-shadows, 3D tilt tracking, and specular gradient sheens.',
      icon: Sparkles,
      category: 'visual',
    },
    {
      key: 'highContrast',
      label: 'High Contrast (7:1+ AAA)',
      description: 'Enforces pure black/white bases, 2px borders, and ultra-high luminance difference.',
      icon: Eye,
      category: 'visual',
    },
    {
      key: 'largeText',
      label: 'Large Typography',
      description: 'Scales base text size to 18px-24px with 1.75 line-height and expanded tracking.',
      icon: Type,
      category: 'visual',
    },
    {
      key: 'nonColorIndicators',
      label: 'Non-Color Indicators',
      description: 'Ensures state badges and errors always feature icons or text glyphs alongside color.',
      icon: ShieldCheck,
      category: 'visual',
    },
    // Sensory & Modalities
    {
      key: 'soundOff',
      label: 'Sound Off (Mute)',
      description: 'Silences all procedural Web Audio synthesizers and acoustic interaction chimes.',
      icon: VolumeX,
      category: 'sensory',
    },
    {
      key: 'hapticOff',
      label: 'Haptics Off',
      description: 'Disables tactile vibration pulses and hardware haptic trigger simulations.',
      icon: Vibrate,
      category: 'sensory',
    },
    // Keyboard & Focus
    {
      key: 'keyboardNavigation',
      label: 'Keyboard Navigation Mode',
      description: 'Activates roving tabindex, arrow navigation on grids, and spatial shortcuts.',
      icon: Keyboard,
      category: 'keyboard',
    },
    {
      key: 'visibleFocus',
      label: 'Ultra-Visible Focus Ring',
      description: 'Renders 3px high-contrast focus rings with 3px offset and high-visibility glow.',
      icon: Target,
      category: 'keyboard',
    },
    // Screen Reader & Semantics
    {
      key: 'screenReaderLabels',
      label: 'Screen Reader Badges',
      description: 'Overlays visual inspect badges for aria-label, aria-describedby, and role nodes.',
      icon: Radio,
      category: 'semantics',
    },
    {
      key: 'semanticStates',
      label: 'Semantic ARIA States',
      description: 'Enforces aria-pressed, aria-checked, aria-expanded, and aria-invalid synchronization.',
      icon: FileCheck,
      category: 'semantics',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
                Accessibility Validation Layer
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                  WCAG 2.2 Ready
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Architectural accessibility framework built directly into tokens, layout physics, audio engines, and interaction kinetics.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 z-10">
          <button
            onClick={resetToDefaults}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono font-bold text-zinc-300 border border-white/10 flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>

          <button
            onClick={() => applyPreset('wcag-aaa')}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4" /> Enforce Full WCAG AAA
          </button>
        </div>
      </div>

      {/* 2. One-Click Compliance Presets Bar */}
      <div className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span>Assistive Profiles & Quick Presets</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {ACCESSIBILITY_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between space-y-2 ${
                  isActive
                    ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-zinc-900/40 hover:bg-zinc-900/80 border-zinc-800 text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs font-mono text-white">{preset.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-cyan-400 text-black' : 'bg-white/10 text-zinc-400'
                    }`}
                  >
                    {preset.badge}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{preset.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. The 12-Vector Modality Matrix Switchboard */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" /> 12-Vector Accessibility Control Deck
            </h3>
            <p className="text-xs text-zinc-400">
              Live toggle switches modulating visual transparency, kinetic motion, audio synthesizers, high contrast, and focus systems.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {toggleItems.map((item) => {
            const isEnabled = Boolean(settings[item.key]);
            const Icon = item.icon;

            return (
              <div
                key={item.key}
                onClick={() => {
                  toggleSetting(item.key);
                  announce(`${item.label} set to ${!isEnabled ? 'enabled' : 'disabled'}`, 'polite');
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start justify-between gap-3 ${
                  isEnabled
                    ? 'bg-cyan-950/30 border-cyan-500/50 shadow-inner'
                    : 'bg-zinc-900/40 hover:bg-zinc-900/80 border-zinc-800/80'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1.5 rounded-lg text-xs ${
                        isEnabled ? 'bg-cyan-500 text-black font-bold' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-bold text-xs font-mono text-white">{item.label}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">{item.description}</p>
                </div>

                {/* Switch Thumb */}
                <div
                  className={`w-10 h-6 min-h-[24px] p-0.5 rounded-full transition-colors relative flex items-center shrink-0 ${
                    isEnabled ? 'bg-cyan-500' : 'bg-zinc-800 border border-zinc-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      isEnabled ? 'translate-x-4 bg-black shadow' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900/70 border border-zinc-800 overflow-x-auto">
        {[
          { id: 'preview-rig', label: '1. Component Preview Rig', icon: Maximize2 },
          { id: 'catalog-audit', label: '2. Catalog Diagnostic Audit', icon: ShieldCheck },
          { id: 'contrast-calc', label: '3. Contrast & Luminance Tool', icon: Eye },
          { id: 'touch-targets', label: '4. Touch Targets & Hitboxes', icon: Target },
          { id: 'screen-reader', label: '5. Screen Reader Stream', icon: Radio },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 5. Active Sub-View Section */}
      <div className="space-y-6">
        {activeTab === 'preview-rig' && <ComponentPreviewRig />}
        {activeTab === 'catalog-audit' && <CatalogAuditReport />}
        {activeTab === 'contrast-calc' && <ContrastCheckerWidget />}
        {activeTab === 'touch-targets' && <TouchTargetInspector />}
        {activeTab === 'screen-reader' && <ScreenReaderSimulator />}
      </div>
    </div>
  );
}
