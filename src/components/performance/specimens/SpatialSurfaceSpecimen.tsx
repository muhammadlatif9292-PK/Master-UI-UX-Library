/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { usePerformanceTier } from '../../../design-system/performance/PerformanceContext';
import { useRegisterExpensiveEffect } from '../../../design-system/performance/expensiveEffectsTracker';
import { TierBadge } from '../../../design-system/performance/TierSwitch';
import {
  Layers,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  Lock,
  Box,
  Compass,
} from 'lucide-react';

export const SpatialSurfaceSpecimen: React.FC<{ forceTier?: 'tier1-low' | 'tier2-standard' | 'tier3-high' }> = ({
  forceTier,
}) => {
  const { activeTier: contextTier } = usePerformanceTier();
  const activeTier = forceTier || contextTier;

  const [activeStep, setActiveStep] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useRegisterExpensiveEffect('backdropFiltersCount', activeTier !== 'tier1-low');
  useRegisterExpensiveEffect('active3DTransformsCount', activeTier === 'tier3-high');

  /* =========================================================================
     TIER 1 (LOW): Flat crisp modal surface, zero backdrop blur, solid borders
     ========================================================================= */
  if (activeTier === 'tier1-low') {
    return (
      <div className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-zinc-900 border border-zinc-700 text-zinc-100 space-y-4 shadow-none">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-zinc-800 text-blue-400">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-mono font-bold text-white">Spatial Surface</h4>
              <p className="text-[10px] text-zinc-400 font-mono">Tier 1 Solid Overlay</p>
            </div>
          </div>
          <TierBadge tier="tier1-low" />
        </div>

        {/* Step Indicator */}
        <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-2">
          <div className="flex justify-between text-xs font-mono text-zinc-400">
            <span>Security Layer State:</span>
            <span className="text-blue-400 font-bold">Step {activeStep} of 3</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full ${
                  s <= activeStep ? 'bg-blue-500' : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-xs text-zinc-300 font-mono leading-relaxed">
          Tier 1 eliminates expensive GPU multi-pass gaussian blur calculations and renders with solid contrast borders for high FPS throughput.
        </p>

        <button
          onClick={() => setActiveStep((s) => (s >= 3 ? 1 : s + 1))}
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-colors duration-100 flex items-center justify-center gap-1.5"
        >
          <span>Advance Surface Phase</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  /* =========================================================================
     TIER 2 (STANDARD): Frosted glassmorphism, spring scale, soft ambient depth
     ========================================================================= */
  if (activeTier === 'tier2-standard') {
    return (
      <div className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/15 text-zinc-100 space-y-4 shadow-xl shadow-blue-950/20 transition-all duration-300">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-mono font-bold text-white">Spatial Surface</h4>
              <p className="text-[10px] text-zinc-400 font-mono">Tier 2 Frosted Panel</p>
            </div>
          </div>
          <TierBadge tier="tier2-standard" />
        </div>

        {/* Step Indicator with Spring Pills */}
        <div className="p-3.5 bg-black/40 rounded-xl border border-white/10 space-y-2 backdrop-blur-sm">
          <div className="flex justify-between text-xs font-mono text-zinc-300">
            <span>Security Layer State:</span>
            <span className="text-blue-300 font-bold">Phase {activeStep}/3</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s <= activeStep
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                    : 'bg-zinc-800/60'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          Tier 2 provides smooth frosted glass filtering with responsive spring curves for comfortable standard performance.
        </p>

        <button
          onClick={() => setActiveStep((s) => (s >= 3 ? 1 : s + 1))}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono text-xs font-bold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/20"
        >
          <span>Advance Surface Phase</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  /* =========================================================================
     TIER 3 (HIGH): 3D perspective floating planes, chromatic dispersion,
     dynamic ambient caustics, multi-layer depth shadows
     ========================================================================= */
  return (
    <div
      className="w-full max-w-sm mx-auto p-5 rounded-3xl bg-zinc-900/60 backdrop-blur-2xl border border-blue-500/40 text-zinc-100 space-y-4 shadow-2xl shadow-blue-500/30 ring-1 ring-blue-400/30 transition-all duration-300 relative overflow-hidden"
      style={{
        transform: 'perspective(1000px) rotateX(4deg) rotateY(-2deg) translateZ(10px)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Background Caustic Glow */}
      <div className="absolute top-0 left-1/4 w-48 h-48 rounded-full bg-blue-500/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none" />

      {/* Tier 3 Header */}
      <div
        className="flex items-center justify-between border-b border-blue-500/30 pb-3 relative z-10"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-blue-500/30 text-blue-200 border border-blue-400/50 shadow-lg shadow-blue-500/40 animate-pulse">
            <Compass className="w-4 h-4 text-cyan-300" />
          </span>
          <div>
            <h4 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              Spatial Hologram
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </h4>
            <p className="text-[10px] text-blue-300/80 font-mono">Tier 3 6-DOF Perspective Plane</p>
          </div>
        </div>
        <TierBadge tier="tier3-high" />
      </div>

      {/* Floating 3D Sub-Card */}
      <div
        className="p-4 bg-black/60 rounded-2xl border border-blue-500/30 space-y-3 backdrop-blur-xl relative z-10 shadow-2xl"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="flex justify-between text-xs font-mono text-zinc-200">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
            Spatial Z-Depth Index:
          </span>
          <span className="text-cyan-300 font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            Layer {activeStep} (30px Elevated)
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                s <= activeStep
                  ? 'bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]'
                  : 'bg-zinc-800/80'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] font-mono">
          <div className="p-1.5 bg-blue-950/40 rounded-xl border border-blue-500/30 text-blue-200">
            <span className="block text-zinc-400">BLUR FILTER</span>
            <span className="font-bold text-white">32px Multi-Pass</span>
          </div>
          <div className="p-1.5 bg-cyan-950/40 rounded-xl border border-cyan-500/30 text-cyan-200">
            <span className="block text-zinc-400">3D PERSPECTIVE</span>
            <span className="font-bold text-white">1000px Matrix</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => setActiveStep((s) => (s >= 3 ? 1 : s + 1))}
        className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-zinc-950 font-mono text-xs font-bold transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-1.5 shadow-2xl shadow-blue-500/40 relative z-10"
        style={{ transform: 'translateZ(40px)' }}
      >
        <span>Advance Spatial Phase</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
