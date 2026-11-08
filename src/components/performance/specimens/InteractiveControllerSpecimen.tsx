/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { usePerformanceTier } from '../../../design-system/performance/PerformanceContext';
import { useRegisterExpensiveEffect } from '../../../design-system/performance/expensiveEffectsTracker';
import { TierBadge } from '../../../design-system/performance/TierSwitch';
import {
  Sliders,
  Sparkles,
  Zap,
  Volume2,
  Lock,
  Play,
  RotateCcw,
  MousePointer,
  Layers,
} from 'lucide-react';

export const InteractiveControllerSpecimen: React.FC<{ forceTier?: 'tier1-low' | 'tier2-standard' | 'tier3-high' }> = ({
  forceTier,
}) => {
  const { activeTier: contextTier } = usePerformanceTier();
  const activeTier = forceTier || contextTier;

  const [intensity, setIntensity] = useState<number>(64);
  const [isEngaged, setIsEngaged] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const [mouseCoord, setMouseCoord] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  useRegisterExpensiveEffect('backdropFiltersCount', activeTier !== 'tier1-low');
  useRegisterExpensiveEffect('active3DTransformsCount', activeTier === 'tier3-high');

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (activeTier !== 'tier3-high') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseCoord({ x, y });
  };

  const handleToggleEngage = () => {
    setIsEngaged(!isEngaged);
    setClickCount((c) => c + 1);
  };

  /* =========================================================================
     TIER 1 (LOW): Minimal blur, crisp solid colors, instant CSS active scale
     ========================================================================= */
  if (activeTier === 'tier1-low') {
    return (
      <div className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-zinc-900 border border-zinc-700 text-zinc-100 space-y-4 shadow-none">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-zinc-800 text-purple-400">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-mono font-bold text-white">Action Controller</h4>
              <p className="text-[10px] text-zinc-400 font-mono">Tier 1 Solid Tactile</p>
            </div>
          </div>
          <TierBadge tier="tier1-low" />
        </div>

        {/* Flat Slider */}
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex justify-between text-zinc-400">
            <span>Actuator Level:</span>
            <span className="text-purple-400 font-bold">{intensity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* High-Contrast Solid Trigger Button */}
        <button
          onClick={handleToggleEngage}
          className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold transition-transform duration-100 active:scale-95 flex items-center justify-center gap-2 ${
            isEngaged
              ? 'bg-purple-600 hover:bg-purple-500 text-white'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{isEngaged ? 'ENGAGED (DISENGAGE)' : 'ENGAGE ACTUATOR'}</span>
        </button>

        <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-[11px] font-mono text-zinc-400 flex justify-between">
          <span>Activation Count: <strong className="text-white">{clickCount}</strong></span>
          <span>Latency: <strong className="text-emerald-400">0ms</strong></span>
        </div>
      </div>
    );
  }

  /* =========================================================================
     TIER 2 (STANDARD): Frosted glass, spring micro-press, soft colored glow
     ========================================================================= */
  if (activeTier === 'tier2-standard') {
    return (
      <div className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/15 text-zinc-100 space-y-4 shadow-xl shadow-purple-950/20 transition-all duration-300">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-mono font-bold text-white">Action Controller</h4>
              <p className="text-[10px] text-zinc-400 font-mono">Tier 2 Glass Tactile</p>
            </div>
          </div>
          <TierBadge tier="tier2-standard" />
        </div>

        {/* Glass Slider with Spring Micro-Feedback */}
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex justify-between text-zinc-300">
            <span>Actuator Level:</span>
            <span className="text-purple-300 font-bold">{intensity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-purple-400 border border-white/10"
          />
        </div>

        {/* Glassmorphic Action Button with Spring Hover */}
        <button
          onClick={handleToggleEngage}
          className={`w-full py-3.5 px-4 rounded-xl font-mono text-xs font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] flex items-center justify-center gap-2 relative overflow-hidden shadow-lg ${
            isEngaged
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-purple-500/30 border border-purple-400/40'
              : 'bg-white/10 hover:bg-white/15 text-zinc-200 border border-white/15 backdrop-blur-sm'
          }`}
        >
          <Zap className="w-4 h-4 text-purple-300" />
          <span>{isEngaged ? 'ENGAGED (DISENGAGE)' : 'ENGAGE ACTUATOR'}</span>
        </button>

        <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-[11px] font-mono text-zinc-300 flex justify-between">
          <span>Glass Filter: <strong className="text-purple-300">12px Blur</strong></span>
          <span>Engage State: <strong className={isEngaged ? 'text-emerald-400' : 'text-zinc-400'}>{isEngaged ? 'ACTIVE' : 'IDLE'}</strong></span>
        </div>
      </div>
    );
  }

  /* =========================================================================
     TIER 3 (HIGH): Volumetric crystal button, mouse spotlight tracker,
     chromatic dispersion, 3D button depression, continuous laser particle glow
     ========================================================================= */
  return (
    <div
      className="w-full max-w-sm mx-auto p-5 rounded-3xl bg-zinc-900/60 backdrop-blur-2xl border border-purple-500/40 text-zinc-100 space-y-4 shadow-2xl shadow-purple-500/30 ring-1 ring-purple-400/30 transition-all duration-300 relative overflow-hidden"
      style={{
        transform: 'perspective(1000px) rotateX(3deg) translateZ(10px)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Background Volumetric Glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-purple-500/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-cyan-500/25 blur-3xl pointer-events-none" />

      {/* Tier 3 Header */}
      <div
        className="flex items-center justify-between border-b border-purple-500/30 pb-3 relative z-10"
        style={{ transform: 'translateZ(15px)' }}
      >
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-purple-500/30 text-purple-200 border border-purple-400/50 shadow-lg shadow-purple-500/40">
            <Sparkles className="w-4 h-4 text-purple-300 animate-spin" />
          </span>
          <div>
            <h4 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              Quantum Controller
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            </h4>
            <p className="text-[10px] text-purple-300/80 font-mono">Tier 3 Volumetric Crystal</p>
          </div>
        </div>
        <TierBadge tier="tier3-high" />
      </div>

      {/* 3D Actuator Slider with Ambient Shimmer */}
      <div className="space-y-1.5 font-mono text-xs relative z-10" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex justify-between text-zinc-200">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            Volumetric Actuator:
          </span>
          <span className="text-purple-300 font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
            {intensity}%
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full h-3 bg-black/60 rounded-xl appearance-none cursor-pointer accent-purple-400 border border-purple-500/40 shadow-inner"
        />
      </div>

      {/* Volumetric Crystal Button with Dynamic Spotlight Tracking */}
      <button
        onMouseMove={handleMouseMove}
        onClick={handleToggleEngage}
        className={`w-full py-4 px-5 rounded-2xl font-mono text-xs font-bold transition-all duration-150 hover:scale-[1.03] active:scale-[0.96] flex items-center justify-center gap-2 relative overflow-hidden shadow-2xl z-10 ${
          isEngaged
            ? 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-600 text-white shadow-purple-500/50 border border-purple-300/60 ring-2 ring-purple-400/40'
            : 'bg-zinc-800/80 hover:bg-zinc-700/80 text-purple-200 border border-purple-500/40 backdrop-blur-xl'
        }`}
        style={{ transform: 'translateZ(30px)' }}
      >
        {/* Dynamic Specular Spotlight Following Cursor */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 bg-radial from-white via-transparent to-transparent"
          style={{
            background: `radial-gradient(circle at ${mouseCoord.x}% ${mouseCoord.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          }}
        />

        <Zap className="w-4 h-4 animate-bounce text-yellow-300" />
        <span>{isEngaged ? 'OVERCHARGED (DEACTIVATE)' : 'ENGAGE VOLUMETRIC ACTUATOR'}</span>
      </button>

      <div
        className="p-3 rounded-2xl bg-black/60 border border-purple-500/30 text-[11px] font-mono text-purple-200 flex justify-between relative z-10 backdrop-blur-md"
        style={{ transform: 'translateZ(20px)' }}
      >
        <span>Spatial Depth: <strong className="text-white">30px Z-Layer</strong></span>
        <span>Spotlight: <strong className="text-purple-300">Live 60Hz Track</strong></span>
      </div>
    </div>
  );
};
