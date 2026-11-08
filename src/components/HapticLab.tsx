/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useHaptics } from '../design-system/haptics/HapticContext';
import { HapticEvent, HapticIntensity } from '../design-system/haptics/hapticTypes';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { Vibrate, Smartphone, ShieldAlert, CheckCircle2, Sliders, Play, Info } from 'lucide-react';

const HAPTIC_EVENTS: { event: HapticEvent; name: string; description: string }[] = [
  { event: 'tap', name: 'Tap', description: 'Quick tactile confirmation on button press' },
  { event: 'press', name: 'Press', description: 'Downward touch engagement' },
  { event: 'selection', name: 'Selection', description: 'List or tab item selected' },
  { event: 'toggle', name: 'Toggle', description: 'Switch or checkbox state changed' },
  { event: 'snap', name: 'Snap', description: 'Magnetic grid alignment or slider stop' },
  { event: 'drag', name: 'Drag', description: 'Subtle continuous touch feedback while dragging' },
  { event: 'boundary', name: 'Boundary', description: 'Reached scroll or pan limit' },
  { event: 'success', name: 'Success', description: 'Operation completed successfully' },
  { event: 'warning', name: 'Warning', description: 'Cautionary system alert' },
  { event: 'error', name: 'Error', description: 'Operation failure or strict restriction' },
  { event: 'completion', name: 'Completion', description: 'Milestone reached or workflow finished' },
];

export function HapticLab() {
  const {
    hapticsEnabled,
    setHapticsEnabled,
    intensity,
    setIntensity,
    simulatedUnsupported,
    setSimulatedUnsupported,
    triggerHaptic,
    isDeviceSupported,
  } = useHaptics();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme.bg.canvas} ${theme.text.primary} p-6 md:p-8 space-y-8 font-sans`}>
      {/* Header */}
      <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} shadow-xl flex flex-wrap items-center justify-between gap-6 backdrop-blur-xl`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-current shadow-lg">
            <Vibrate className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Haptic Feedback Laboratory</h1>
            <p className="text-xs opacity-70">Optional haptic abstraction layer with graceful hardware degradation and semantic event testing.</p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => setHapticsEnabled(!hapticsEnabled)}
            className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
              hapticsEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}
          >
            <Vibrate className="w-4 h-4" />
            <span>Haptics: {hapticsEnabled ? 'ENABLED' : 'DISABLED'}</span>
          </button>

          <button
            onClick={() => setSimulatedUnsupported(!simulatedUnsupported)}
            className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 ${
              simulatedUnsupported
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Simulate Unsupported: {simulatedUnsupported ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Status Bar & Intensity Selection */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default}`}>
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider opacity-75">Hardware Capability Status</span>
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isDeviceSupported && !simulatedUnsupported ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-xs font-mono">
              {simulatedUnsupported
                ? 'Simulating Unsupported Device (Graceful Fallback Active)'
                : isDeviceSupported
                ? 'Native Hardware Vibrate Supported'
                : 'Device Hardware Vibrate Not Supported (Graceful Fallback Active)'}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider opacity-75">Haptic Intensity</span>
          <div className="flex items-center gap-2">
            {(['subtle', 'normal', 'vivid', 'off'] as HapticIntensity[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setIntensity(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all ${
                  intensity === lvl
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                    : 'bg-zinc-950/40 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Documentation Card */}
      <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} space-y-4`}>
        <h2 className="font-semibold text-sm flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" /> Haptic Design & Usage Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs opacity-80 leading-relaxed">
          <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px] text-emerald-400">Where Haptics Are Appropriate</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>Direct physical engagement (buttons, toggles, sliders).</li>
              <li>Completing significant milestones or achievements.</li>
              <li>Hitting scroll boundaries or snapping to grid items.</li>
              <li>Critical alerts or validation errors requiring user attention.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-2">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px] text-rose-400">Where Haptics Should Remain Silent</h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>Decorative animations or background transitions.</li>
              <li>Rapid continuous events (e.g. fast scrolling or freehand drawing).</li>
              <li>Passive status indicators or background polling.</li>
              <li>When global master haptic toggle or reduced sensory mode is active.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Haptic Event Test Grid */}
      <div className="space-y-4">
        <h2 className="font-semibold text-sm flex items-center gap-2">
          <Sliders className="w-4 h-4 text-purple-400" /> Semantic Haptic Event Tester
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HAPTIC_EVENTS.map((item) => (
            <div
              key={item.event}
              onClick={() => triggerHaptic(item.event)}
              className={`p-5 rounded-2xl ${theme.surface.primary} border ${theme.border.default} hover:border-cyan-500/50 transition-all cursor-pointer group space-y-3 shadow-md hover:shadow-cyan-500/10`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 uppercase tracking-wider text-cyan-400">
                  Event: {item.event}
                </span>
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-zinc-950 transition-all text-zinc-300">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs opacity-70 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
