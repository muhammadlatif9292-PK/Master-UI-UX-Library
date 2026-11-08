/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  X,
  Palette,
  Zap,
  Music,
  Vibrate,
  Sliders,
  Check,
  RotateCcw,
  Gauge,
} from 'lucide-react';
import { useTheme } from '../../design-system/tokens/ThemeContext';
import { useMotion } from '../../design-system/motion/MotionContext';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { usePerformanceTier } from '../../design-system/performance/PerformanceContext';
import { PerformanceTierId } from '../../design-system/performance/types';

interface InspectorToolRailProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InspectorToolRail({ isOpen, onClose }: InspectorToolRailProps) {
  const { theme, activeThemeId, setThemeId, allThemes } = useTheme();
  const { intensity, setIntensity, reducedMotion, setReducedMotion } = useMotion();
  const { soundEnabled, setSoundEnabled, uiVolume, setUiVolume, playSound } = useSound();
  const { hapticsEnabled, setHapticsEnabled, triggerHaptic } = useHaptics();
  const { activeTier, setTier, telemetry } = usePerformanceTier();

  if (!isOpen) return null;

  const tiers: { id: PerformanceTierId; label: string; num: number; desc: string }[] = [
    { id: 'tier3-high', label: 'Tier 1 (High)', num: 1, desc: '60fps GPU, multi-layer blur' },
    { id: 'tier2-standard', label: 'Tier 2 (Balanced)', num: 2, desc: 'Optimized shadows & springs' },
    { id: 'tier1-low', label: 'Tier 3 (Low Power)', num: 3, desc: 'Flat surfaces & zero particle load' },
  ];

  return (
    <aside
      className="w-80 md:w-88 border-l border-zinc-800/90 bg-zinc-950/95 backdrop-blur-2xl flex flex-col shrink-0 overflow-y-auto p-4 space-y-5 z-40 shadow-2xl animate-page-entry"
      aria-label="Live Inspector Panel"
    >
      {/* 1. Header with Reset & Close */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Sliders className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="font-bold text-xs uppercase tracking-wider text-zinc-100 font-mono">
              Live Inspector
            </h2>
            <p className="text-[10px] text-zinc-400">Real-time design token &amp; sensory tuning</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setThemeId('cinematic-dark');
              setIntensity(2);
              setSoundEnabled(false);
              setHapticsEnabled(false);
              setTier('tier3-high');
            }}
            title="Reset to Library Defaults"
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close Inspector"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Active Archetype Style Overview */}
      <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
          <span className="flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-cyan-400" /> Active Style Archetype
          </span>
          <span className="text-[10px] font-mono text-cyan-300 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
            {theme.name}
          </span>
        </div>

        {/* Archetype Quick Switcher Grid */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {Object.keys(allThemes).map((id) => {
            const isSelected = activeThemeId === id;
            const t = allThemes[id as keyof typeof allThemes];
            return (
              <button
                key={id}
                onClick={() => {
                  setThemeId(id as any);
                  playSound('select', 'MICRO');
                  triggerHaptic('SELECTION');
                }}
                className={`p-2 rounded-lg text-left border text-[11px] font-mono transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-bold shadow-sm'
                    : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <span className="truncate">{t.name.split(' ')[0]}</span>
                {isSelected && <Check className="w-3 h-3 text-cyan-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Motion Physics Intensity */}
      <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Motion Physics
          </span>
          <span className="text-[10px] font-mono text-amber-400 font-bold">
            {intensity === 0 ? 'OFF' : `Level ${intensity}`}
          </span>
        </div>

        <div className="flex gap-1.5">
          {[0, 1, 2, 3, 4].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setIntensity(lvl as any);
                playSound('press', 'MICRO');
                triggerHaptic('SELECTION');
              }}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all ${
                intensity === lvl
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'bg-zinc-950/60 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {lvl === 0 ? '0' : lvl}
            </button>
          ))}
        </div>

        <label className="flex items-center justify-between pt-1 cursor-pointer text-xs text-zinc-400">
          <span>Reduced Motion Mode</span>
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(e) => setReducedMotion(e.target.checked)}
            className="rounded border-zinc-700 bg-zinc-950 text-cyan-500 focus:ring-cyan-400 h-4 w-4"
          />
        </label>
      </div>

      {/* 4. Sensory Feedback: Web Audio Synthesizer */}
      <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
          <span className="flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-purple-400" /> Audio Synthesizer
          </span>
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playSound('success', 'MICRO');
            }}
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-colors ${
              soundEnabled
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'bg-zinc-950 border border-zinc-800 text-zinc-500'
            }`}
          >
            {soundEnabled ? 'ACTIVE' : 'MUTED'}
          </button>
        </div>

        {soundEnabled && (
          <div className="space-y-2 pt-1">
            <div className="flex justify-between text-[11px] font-mono text-zinc-400">
              <span>Master Volume</span>
              <span className="text-purple-300 font-bold">{Math.round(uiVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={uiVolume}
              onChange={(e) => setUiVolume(parseFloat(e.target.value))}
              className="w-full accent-purple-400 bg-zinc-950 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* 5. Sensory Feedback: Tactile Haptics */}
      <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-2 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
          <span className="flex items-center gap-1.5">
            <Vibrate className="w-3.5 h-3.5 text-emerald-400" /> Tactile Haptics
          </span>
          <button
            onClick={() => {
              setHapticsEnabled(!hapticsEnabled);
              if (!hapticsEnabled) triggerHaptic('SUCCESS');
            }}
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded transition-colors ${
              hapticsEnabled
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-zinc-950 border border-zinc-800 text-zinc-500'
            }`}
          >
            {hapticsEnabled ? 'ACTIVE' : 'OFF'}
          </button>
        </div>
        <p className="text-[10px] text-zinc-500">
          Triggers navigator vibration patterns for clicks, success chords, and errors.
        </p>
      </div>

      {/* 6. Performance Governor Tier */}
      <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800/90 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
          <span className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" /> Performance Tier
          </span>
          <span className="text-[10px] font-mono text-cyan-300 font-bold">
            {activeTier === 'tier3-high' ? 'Tier 1' : activeTier === 'tier2-standard' ? 'Tier 2' : 'Tier 3'}
          </span>
        </div>

        <div className="flex gap-1.5">
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTier(t.id);
                playSound('press', 'MICRO');
              }}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all ${
                activeTier === t.id
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-zinc-950/60 border border-zinc-800/80 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Tier {t.num}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-[10px] font-mono text-zinc-500">
          <span>FPS: ~{telemetry.fps || 60}</span>
          <span>GPU: {activeTier === 'tier3-high' ? 'High (60fps)' : activeTier === 'tier2-standard' ? 'Balanced' : 'Low Power'}</span>
        </div>
      </div>
    </aside>
  );
}
