/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { useSound } from '../design-system/sound/SoundContext';
import { useHaptics } from '../design-system/haptics/HapticContext';
import { useExperienceEvents } from '../design-system/events/ExperienceEventContext';
import { useOrganization } from '../design-system/catalog/OrganizationContext';
import { CATALOG_REGISTRY } from '../design-system/catalog/catalogRegistry';
import { CatalogEntry } from '../design-system/catalog/catalogTypes';
import { ARCHETYPE_TOKENS } from '../design-system/tokens';
import { DesignArchetype } from '../types/architecture';
import { motion, AnimatePresence } from 'motion/react';
import {
  GitCompare,
  Star,
  Sparkles,
  Check,
  X,
  Sliders,
  Shield,
  Zap,
  Music,
  Vibrate,
  Activity,
  Layers,
  ChevronRight,
  Code2,
  Gauge,
  Cpu,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  Maximize2,
  RotateCcw,
} from 'lucide-react';

type ComponentState =
  | 'idle'
  | 'hover'
  | 'focus'
  | 'pressed'
  | 'loading'
  | 'success'
  | 'error'
  | 'disabled';

export function ComparisonMatrix() {
  const { theme } = useTheme();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const { emit } = useExperienceEvents();
  const { isFavorite, toggleFavorite } = useOrganization();

  const [selectedIds, setSelectedIds] = useState<string[]>([
    'container-fluid',
    'glass-surface',
    'cyber-hud',
    'auth-cinematic-mascot',
  ]);
  const [synchronizedState, setSynchronizedState] = useState<ComponentState>('idle');
  const [activeDecisionFilter, setActiveDecisionFilter] = useState<'all' | 'perf' | 'a11y' | 'visual'>('all');

  const selectedEntries = CATALOG_REGISTRY.filter((item) => selectedIds.includes(item.id));

  const handleToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter((i) => i !== id));
        emit('selection.changed', 'comparison-matrix', { id, action: 'remove' });
      }
    } else {
      if (selectedIds.length < 6) {
        setSelectedIds([...selectedIds, id]);
        emit('selection.changed', 'comparison-matrix', { id, action: 'add' });
      }
    }
  };

  const handleTriggerAll = (state: ComponentState) => {
    setSynchronizedState(state);
    if (state === 'success') {
      emit('state.success', 'comparison-matrix', { state });
    } else if (state === 'error') {
      emit('state.error', 'comparison-matrix', { state });
    } else {
      emit('interaction.confirmed', 'comparison-matrix', { state });
    }
  };

  // Helper to map catalog archetype to token palette
  const getArchetypeTokens = (visualStyle: string) => {
    const key = (visualStyle.toLowerCase().replace(/\s+/g, '-') as DesignArchetype) || 'restrained-luxury';
    return ARCHETYPE_TOKENS[key] || ARCHETYPE_TOKENS['restrained-luxury'];
  };

  return (
    <div className={`p-6 md:p-10 space-y-8 max-w-7xl mx-auto min-h-screen ${theme.bg.canvas} ${theme.text.primary}`}>
      {/* Header & Control Station */}
      <div className={`p-6 md:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} shadow-2xl space-y-6 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
              <GitCompare className="w-3.5 h-3.5 animate-pulse" /> A/B Design Laboratory (2–6 Variants)
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Component Comparison Lab</h1>
            <p className="text-xs md:text-sm opacity-75 mt-1 max-w-2xl leading-relaxed">
              Compare 2 to 6 components across 10 decision vectors: Visuals, Hierarchy, Motion, Interaction, Sound, Haptics, Accessibility, Performance, Dependencies, and Implementation Complexity with synchronized real-time state testing.
            </p>
          </div>

          {/* Synchronized State Toolbar */}
          <div className="flex flex-wrap items-center gap-2 bg-black/40 p-2.5 rounded-2xl border border-white/10 shrink-0">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 px-2 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> Sync State:
            </span>
            {(['idle', 'hover', 'pressed', 'loading', 'success', 'error', 'disabled'] as ComponentState[]).map((st) => (
              <button
                key={st}
                onClick={() => handleTriggerAll(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                  synchronizedState === st
                    ? 'bg-cyan-500 text-zinc-950 shadow-lg scale-105 ring-2 ring-cyan-400/50'
                    : 'bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Variant Picker Selector Bar */}
        <div className="space-y-3 pt-4 border-t border-white/10 relative z-10">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-zinc-300 font-bold">Select 2 to 6 Variants ({selectedIds.length}/6 Selected):</span>
            <span className="text-zinc-500 text-[10px]">Click pill to add/remove from matrix</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATALOG_REGISTRY.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleToggleSelect(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all border ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-md'
                      : 'bg-black/30 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{item.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side-by-Side Horizontal Comparison Laboratory Grid */}
      <div className="overflow-x-auto pb-8">
        <div className="inline-flex gap-6 min-w-full">
          {selectedEntries.map((entry) => {
            const isFav = isFavorite(entry.id);
            const tokens = getArchetypeTokens(entry.visualStyle);

            return (
              <div
                key={entry.id}
                className={`w-80 md:w-96 shrink-0 rounded-3xl ${theme.surface.primary} border ${
                  synchronizedState === 'success'
                    ? 'border-emerald-500 shadow-emerald-500/20'
                    : synchronizedState === 'error'
                    ? 'border-rose-500 shadow-rose-500/20'
                    : theme.border.default
                } p-6 space-y-6 shadow-2xl flex flex-col justify-between transition-all duration-300`}
              >
                {/* Variant Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-[10px] text-cyan-400 uppercase font-bold">
                      {entry.family}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-60">v{entry.version}</span>
                      <button
                        onClick={() => toggleFavorite(entry.id)}
                        className="p-1.5 rounded-xl bg-black/40 hover:bg-white/10 border border-white/10 transition-colors"
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'text-amber-400 fill-amber-400' : 'opacity-40'}`} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-xl text-white tracking-tight">{entry.name}</h3>
                    <p className="text-xs opacity-75 mt-1 leading-relaxed font-sans">{entry.description}</p>
                  </div>
                </div>

                {/* Live Synchronized Component Specimen Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                    <span className="uppercase font-bold text-cyan-400">Live Rendered Specimen</span>
                    <span>State: {synchronizedState}</span>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-5 rounded-2xl ${tokens.surfacePrimary} border ${tokens.borderDefault} ${tokens.accentGlow} flex flex-col items-center justify-center min-h-[180px] relative transition-all ${
                      synchronizedState === 'disabled' ? 'opacity-40 grayscale pointer-events-none' : ''
                    }`}
                  >
                    <div className="text-center space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="text-xs font-mono font-bold text-white">{entry.component}</div>

                      {/* State Feedback Indicator */}
                      {synchronizedState === 'loading' && (
                        <div className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 animate-pulse">
                          Synchronized Processing...
                        </div>
                      )}

                      {synchronizedState === 'success' && (
                        <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> State Validated
                        </div>
                      )}

                      {synchronizedState === 'error' && (
                        <div className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-[10px] font-mono text-rose-300 flex items-center justify-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Parameter Fault
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Comparative 10-Vector Attribute Breakdown */}
                <div className="space-y-2.5 text-xs font-mono border-t border-b border-white/10 py-4">
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-2">
                    10-Vector Decision Metrics
                  </div>

                  {[
                    { label: '1. Visual Archetype', val: entry.visualStyle, icon: Layers },
                    { label: '2. Hierarchy Scale', val: `${entry.family} Scale`, icon: Code2 },
                    { label: '3. Motion Physics', val: entry.motionStyle, icon: Zap },
                    { label: '4. Interaction Gesture', val: entry.interactionStyle, icon: Sliders },
                    { label: '5. Sound Synthesis', val: entry.soundStyle, icon: Volume2 },
                    { label: '6. Haptic Feedback', val: entry.hapticStyle, icon: Vibrate },
                    { label: '7. Accessibility Level', val: `WCAG ${entry.accessibility}`, icon: Shield },
                    { label: '8. Performance Tier', val: entry.performanceTier, icon: Gauge },
                    { label: '9. Dependencies', val: entry.dependencies.slice(0, 2).join(', ') || 'Zero External', icon: Cpu },
                    { label: '10. Implementation Status', val: entry.status, icon: Trophy },
                  ].map((attr, idx) => {
                    const Icon = attr.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                        <span className="opacity-60 text-[10px] flex items-center gap-1.5">
                          <Icon className="w-3 h-3 text-cyan-400 shrink-0" />
                          <span>{attr.label}:</span>
                        </span>
                        <span className="font-bold text-white text-[11px] text-right truncate max-w-[150px]">
                          {attr.val}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Best Use Case Recommendation */}
                <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-xs space-y-1">
                  <strong className="font-mono text-[10px] uppercase block text-cyan-400 font-bold">
                    Primary Design Decision Fit:
                  </strong>
                  <p className="font-sans text-[11px] leading-relaxed opacity-90">{entry.mood}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
