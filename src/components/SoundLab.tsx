/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSound } from '../design-system/sound/SoundContext';
import { SoundKey, SoundCategory, SoundDefinition } from '../design-system/sound/soundTypes';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { Volume2, VolumeX, Radio, Play, Sliders, Shield, Sparkles, Music, Activity } from 'lucide-react';

const SOUND_LIBRARY: SoundDefinition[] = [
  // MICRO
  { key: 'tap', category: 'MICRO', name: 'Tap', description: 'Quick tactile press sound', defaultVolume: 0.2 },
  { key: 'press', category: 'MICRO', name: 'Press', description: 'Downward touch feedback', defaultVolume: 0.2 },
  { key: 'release', category: 'MICRO', name: 'Release', description: 'Upward lift feedback', defaultVolume: 0.2 },
  { key: 'focus', category: 'MICRO', name: 'Focus', description: 'Keyboard or pointer focus', defaultVolume: 0.15 },
  { key: 'selection', category: 'MICRO', name: 'Selection', description: 'Item picked or checked', defaultVolume: 0.25 },
  { key: 'toggle', category: 'MICRO', name: 'Toggle', description: 'Switch state changed', defaultVolume: 0.25 },
  { key: 'drag-start', category: 'MICRO', name: 'Drag Start', description: 'Draggable grab feedback', defaultVolume: 0.2 },
  { key: 'drag-end', category: 'MICRO', name: 'Drag End', description: 'Draggable drop feedback', defaultVolume: 0.2 },
  { key: 'snap', category: 'MICRO', name: 'Snap', description: 'Magnetic grid alignment', defaultVolume: 0.25 },
  { key: 'expand', category: 'MICRO', name: 'Expand', description: 'Accordion or drawer open', defaultVolume: 0.2 },
  { key: 'collapse', category: 'MICRO', name: 'Collapse', description: 'Accordion or drawer close', defaultVolume: 0.2 },

  // NAVIGATION
  { key: 'screen-enter', category: 'NAVIGATION', name: 'Screen Enter', description: 'View loaded or transitioned in', defaultVolume: 0.2 },
  { key: 'screen-exit', category: 'NAVIGATION', name: 'Screen Exit', description: 'View left or transitioned out', defaultVolume: 0.2 },
  { key: 'tab-change', category: 'NAVIGATION', name: 'Tab Change', description: 'Navigation tab switched', defaultVolume: 0.2 },
  { key: 'drawer-open', category: 'NAVIGATION', name: 'Drawer Open', description: 'Side panel opened', defaultVolume: 0.2 },
  { key: 'drawer-close', category: 'NAVIGATION', name: 'Drawer Close', description: 'Side panel closed', defaultVolume: 0.2 },
  { key: 'search-activate', category: 'NAVIGATION', name: 'Search Activate', description: 'Command palette invoked', defaultVolume: 0.2 },
  { key: 'back', category: 'NAVIGATION', name: 'Back', description: 'Previous navigation step', defaultVolume: 0.2 },
  { key: 'forward', category: 'NAVIGATION', name: 'Forward', description: 'Next navigation step', defaultVolume: 0.2 },

  // STATE
  { key: 'success', category: 'STATE', name: 'Success', description: 'Action completed successfully', defaultVolume: 0.3 },
  { key: 'error', category: 'STATE', name: 'Error', description: 'Operation failure alert', defaultVolume: 0.3 },
  { key: 'warning', category: 'STATE', name: 'Warning', description: 'Cautionary notification', defaultVolume: 0.25 },
  { key: 'processing', category: 'STATE', name: 'Processing', description: 'Background task executing', defaultVolume: 0.15 },
  { key: 'completion', category: 'STATE', name: 'Completion', description: 'Task finished successfully', defaultVolume: 0.3 },
  { key: 'notification', category: 'STATE', name: 'Notification', description: 'Incoming alert ping', defaultVolume: 0.2 },

  // AMBIENT
  { key: 'laboratory', category: 'AMBIENT', name: 'Laboratory Ambient', description: 'Clinical white noise drone', defaultVolume: 0.15 },
  { key: 'observatory', category: 'AMBIENT', name: 'Observatory Ambient', description: 'Deep space telemetry hum', defaultVolume: 0.15 },
  { key: 'deep-space', category: 'AMBIENT', name: 'Deep Space Ambient', description: 'Abyss dark drone soundscape', defaultVolume: 0.15 },
  { key: 'ai-environment', category: 'AMBIENT', name: 'AI Environment', description: 'Neural network pulse drone', defaultVolume: 0.15 },
  { key: 'simulation', category: 'AMBIENT', name: 'Simulation Ambient', description: 'Active computation drone', defaultVolume: 0.15 },

  // HERO
  { key: 'major-completion', category: 'HERO', name: 'Major Completion', description: 'Milestone achieved chord', defaultVolume: 0.35 },
  { key: 'major-achievement', category: 'HERO', name: 'Major Achievement', description: 'Rank up or award unlocked', defaultVolume: 0.35 },
  { key: 'major-scene-transition', category: 'HERO', name: 'Major Scene Transition', description: 'Cinematic layout shift', defaultVolume: 0.35 },
];

export function SoundLab() {
  const {
    soundEnabled,
    setSoundEnabled,
    uiVolume,
    setUiVolume,
    ambientVolume,
    setAmbientVolume,
    reducedSensory,
    setReducedSensory,
    playSound,
    stopAmbient,
  } = useSound();
  const { theme } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState<SoundCategory | 'ALL'>('ALL');

  const filteredSounds = selectedCategory === 'ALL'
    ? SOUND_LIBRARY
    : SOUND_LIBRARY.filter((s) => s.category === selectedCategory);

  return (
    <div className={`min-h-screen ${theme.bg.canvas} ${theme.text.primary} p-6 md:p-8 space-y-8 font-sans`}>
      {/* Header & Global Controls */}
      <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} shadow-xl flex flex-wrap items-center justify-between gap-6 backdrop-blur-xl`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-current shadow-lg">
            <Music className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Sonic Experience Laboratory</h1>
            <p className="text-xs opacity-70">Procedural Web Audio synthesizer, abstract sound provider, and multi-category acoustic testing.</p>
          </div>
        </div>

        {/* Global Sound Toggles */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
              soundEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>Sound Master: {soundEnabled ? 'ON' : 'MUTED'}</span>
          </button>

          <button
            onClick={() => setReducedSensory(!reducedSensory)}
            className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
              reducedSensory
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Reduced Sensory: {reducedSensory ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Volume Sliders Bar */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default}`}>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="opacity-75">UI Interaction Volume</span>
            <span className="text-cyan-400">{Math.round(uiVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={uiVolume}
            onChange={(e) => setUiVolume(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="opacity-75">Ambient Soundscape Volume</span>
            <span className="text-purple-400">{Math.round(ambientVolume * 100)}%</span>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={ambientVolume}
              onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
            <button
              onClick={stopAmbient}
              className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg hover:bg-red-500/20 transition-all shrink-0 font-mono"
            >
              Stop Ambient
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        {['ALL', 'MICRO', 'NAVIGATION', 'STATE', 'AMBIENT', 'HERO'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as any)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                : 'bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sound Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSounds.map((sound) => (
          <div
            key={sound.key}
            onClick={() => playSound(sound.key, sound.category)}
            className={`p-5 rounded-2xl ${theme.surface.primary} border ${theme.border.default} hover:border-cyan-500/50 transition-all cursor-pointer group space-y-3 shadow-md hover:shadow-cyan-500/10`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-wider text-cyan-400">
                {sound.category}
              </span>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-all text-zinc-300">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>

            <div>
              <h2 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                {sound.name}
              </h2>
              <p className="text-xs opacity-70 mt-1">{sound.description}</p>
            </div>

            <div className="pt-2 flex items-center justify-between text-[10px] font-mono opacity-50">
              <span>Key: {sound.key}</span>
              <span>Procedural Synthesized</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

