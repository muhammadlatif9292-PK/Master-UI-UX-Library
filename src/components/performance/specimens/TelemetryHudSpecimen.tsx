/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { usePerformanceTier } from '../../../design-system/performance/PerformanceContext';
import { usePreventIdleLoop, useRegisterExpensiveEffect } from '../../../design-system/performance/expensiveEffectsTracker';
import { TierBadge } from '../../../design-system/performance/TierSwitch';
import {
  Activity,
  BarChart3,
  TrendingUp,
  Server,
  Wifi,
  Sparkles,
  RefreshCw,
  Radio,
  Layers,
} from 'lucide-react';

export const TelemetryHudSpecimen: React.FC<{ forceTier?: 'tier1-low' | 'tier2-standard' | 'tier3-high' }> = ({
  forceTier,
}) => {
  const { activeTier: contextTier } = usePerformanceTier();
  const activeTier = forceTier || contextTier;

  const [activeMetricTab, setActiveMetricTab] = useState<'latency' | 'throughput' | 'bandwidth'>('latency');
  const [dataPoints, setDataPoints] = useState<number[]>([42, 58, 65, 48, 72, 85, 91, 74, 88, 95]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Expensive Effects registration
  useRegisterExpensiveEffect('backdropFiltersCount', activeTier !== 'tier1-low');
  useRegisterExpensiveEffect('active3DTransformsCount', activeTier === 'tier3-high');
  useRegisterExpensiveEffect('canvasRafLoopsCount', activeTier === 'tier3-high');

  // Simulated live telemetry stream (only when in Tier 2 or 3)
  useEffect(() => {
    if (activeTier === 'tier1-low') return; // Tier 1 disables continuous data poll loops

    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const nextVal = Math.floor(Math.random() * 40) + 55;
        return [...prev.slice(1), nextVal];
      });
    }, activeTier === 'tier3-high' ? 800 : 1600);

    return () => clearInterval(interval);
  }, [activeTier]);

  const handleManualRefresh = () => {
    setDataPoints((prev) => {
      const nextVal = Math.floor(Math.random() * 40) + 55;
      return [...prev.slice(1), nextVal];
    });
  };

  /* =========================================================================
     TIER 1 (LOW): Minimal blur, crisp SVG lines, no continuous loops, flat
     ========================================================================= */
  if (activeTier === 'tier1-low') {
    return (
      <div className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-zinc-900 border border-zinc-700 text-zinc-100 shadow-none">
        {/* Tier 1 Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-zinc-800 text-emerald-400">
              <Server className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-mono font-bold text-white">Telemetry & HUD</h4>
              <p className="text-[10px] text-zinc-400 font-mono">Tier 1 Static Eco Chart</p>
            </div>
          </div>
          <TierBadge tier="tier1-low" />
        </div>

        {/* Tab Selection */}
        <div className="flex gap-1 my-3 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
          {(['latency', 'throughput', 'bandwidth'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMetricTab(tab)}
              className={`flex-1 py-1 text-[11px] font-mono rounded capitalize transition-colors duration-100 ${
                activeMetricTab === tab ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Static Flat SVG Sparkline (No canvas loops, no glow filters) */}
        <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-zinc-400">Current Stream:</span>
            <span className="text-emerald-400 font-bold">{dataPoints[dataPoints.length - 1]} ms</span>
          </div>

          <svg viewBox="0 0 300 80" className="w-full h-20 overflow-visible">
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              points={dataPoints
                .map((val, idx) => `${idx * 30 + 15},${80 - (val / 100) * 70}`)
                .join(' ')}
            />
            {dataPoints.map((val, idx) => (
              <circle
                key={idx}
                cx={idx * 30 + 15}
                cy={80 - (val / 100) * 70}
                r="3"
                className="fill-emerald-500"
              />
            ))}
          </svg>

          <div className="flex justify-between text-[10px] font-mono text-zinc-500 pt-1">
            <span>T-10s</span>
            <span>Manual Refresh Mode</span>
            <span>Now</span>
          </div>
        </div>

        <button
          onClick={handleManualRefresh}
          className="mt-4 w-full py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-white font-mono text-xs transition-colors duration-150 flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Manual Query Update</span>
        </button>
      </div>
    );
  }

  /* =========================================================================
     TIER 2 (STANDARD): Normal glass, smooth spring curves, ambient glow
     ========================================================================= */
  if (activeTier === 'tier2-standard') {
    return (
      <div className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/15 text-zinc-100 shadow-xl shadow-emerald-950/20 transition-all duration-300">
        {/* Tier 2 Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Server className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                Telemetry & HUD
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h4>
              <p className="text-[10px] text-zinc-400 font-mono">Tier 2 Glass Stream</p>
            </div>
          </div>
          <TierBadge tier="tier2-standard" />
        </div>

        {/* Tab Selection with Spring Transitions */}
        <div className="flex gap-1 my-3 bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-sm">
          {(['latency', 'throughput', 'bandwidth'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMetricTab(tab)}
              className={`flex-1 py-1.5 text-[11px] font-mono rounded-lg capitalize transition-all duration-200 ${
                activeMetricTab === tab
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Glass Chart with Spring Interpolation */}
        <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-2 backdrop-blur-sm shadow-inner">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-zinc-300">Live Pulse Rate:</span>
            <span className="text-emerald-300 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              {dataPoints[dataPoints.length - 1]} ms (Live)
            </span>
          </div>

          <svg viewBox="0 0 300 80" className="w-full h-20 overflow-visible">
            {/* Area Fill Gradient */}
            <defs>
              <linearGradient id="streamGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <polygon
              fill="url(#streamGrad)"
              points={`15,80 ${dataPoints
                .map((val, idx) => `${idx * 30 + 15},${80 - (val / 100) * 70}`)
                .join(' ')} 285,80`}
            />

            <polyline
              fill="none"
              stroke="#34d399"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={dataPoints
                .map((val, idx) => `${idx * 30 + 15},${80 - (val / 100) * 70}`)
                .join(' ')}
            />

            {dataPoints.map((val, idx) => (
              <circle
                key={idx}
                cx={idx * 30 + 15}
                cy={80 - (val / 100) * 70}
                r="3.5"
                className="fill-emerald-400 stroke-zinc-950 stroke-2 hover:r-5 transition-all cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}
          </svg>

          <div className="flex justify-between text-[10px] font-mono text-zinc-400 pt-1">
            <span>T-10s</span>
            <span className="text-emerald-400 font-bold">1.6s Auto-Poll</span>
            <span>Live Node</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs font-mono text-zinc-400 p-2 rounded-xl bg-white/5 border border-white/5">
          <span>Glass Filter: <strong className="text-emerald-300">12px Frosted</strong></span>
          <span>FPS Target: <strong className="text-white">60 Hz</strong></span>
        </div>
      </div>
    );
  }

  /* =========================================================================
     TIER 3 (HIGH): Volumetric HUD, 3D isometric tilt, continuous glow caustics,
     data particle packets, 120Hz smooth wave interpolation
     ========================================================================= */
  return (
    <div
      ref={containerRef}
      className="w-full max-w-sm mx-auto p-5 rounded-3xl bg-zinc-900/60 backdrop-blur-2xl border border-emerald-500/40 text-zinc-100 shadow-2xl shadow-emerald-500/25 relative overflow-hidden ring-1 ring-emerald-400/30 transition-all duration-300"
      style={{
        transform: 'perspective(1000px) rotateX(4deg) translateZ(8px)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Background Volumetric Bloom */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-cyan-500/20 blur-2xl pointer-events-none" />

      {/* Tier 3 Header with 3D Depth */}
      <div
        className="flex items-center justify-between border-b border-emerald-500/30 pb-3 relative z-10"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/40">
            <Radio className="w-4 h-4 text-emerald-300 animate-pulse" />
          </span>
          <div>
            <h4 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              Quantum Telemetry
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h4>
            <p className="text-[10px] text-emerald-300/80 font-mono">Tier 3 Ultra Holographic HUD</p>
          </div>
        </div>
        <TierBadge tier="tier3-high" />
      </div>

      {/* Tab Selection */}
      <div
        className="flex gap-1 my-3 bg-black/60 p-1.5 rounded-2xl border border-emerald-500/30 backdrop-blur-md relative z-10"
        style={{ transform: 'translateZ(25px)' }}
      >
        {(['latency', 'throughput', 'bandwidth'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveMetricTab(tab)}
            className={`flex-1 py-1.5 text-[11px] font-mono rounded-xl capitalize transition-all duration-200 ${
              activeMetricTab === tab
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-bold shadow-lg shadow-emerald-500/30 scale-105'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 3D Holographic Waveform & Particle Stream */}
      <div
        className="p-4 rounded-2xl bg-black/70 border border-emerald-500/40 space-y-2 relative z-10 backdrop-blur-xl shadow-2xl"
        style={{ transform: 'translateZ(30px)' }}
      >
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-zinc-300 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            Quantum Flux Stream:
          </span>
          <span className="text-emerald-300 font-bold drop-shadow-[0_0_10px_rgba(16,185,129,0.8)] text-sm">
            {dataPoints[dataPoints.length - 1]} ms (800ms Stream)
          </span>
        </div>

        <svg viewBox="0 0 300 90" className="w-full h-24 overflow-visible">
          <defs>
            <linearGradient id="ultraGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
            <filter id="glowGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Area Fill */}
          <polygon
            fill="url(#ultraGrad)"
            points={`15,90 ${dataPoints
              .map((val, idx) => `${idx * 30 + 15},${90 - (val / 100) * 75}`)
              .join(' ')} 285,90`}
          />

          {/* Glowing Waveform Polyline */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glowGlow)"
            points={dataPoints
              .map((val, idx) => `${idx * 30 + 15},${90 - (val / 100) * 75}`)
              .join(' ')}
          />

          {/* Animated Data Packets / Nodes */}
          {dataPoints.map((val, idx) => (
            <g key={idx} className="cursor-pointer">
              <circle
                cx={idx * 30 + 15}
                cy={90 - (val / 100) * 75}
                r="4.5"
                className="fill-emerald-300 stroke-zinc-950 stroke-2"
              />
              <circle
                cx={idx * 30 + 15}
                cy={90 - (val / 100) * 75}
                r="8"
                className="fill-emerald-400/30 animate-ping"
              />
            </g>
          ))}
        </svg>

        <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-mono">
          <div className="p-2 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-emerald-200">
            <span className="block text-zinc-400">REFRESH RATE</span>
            <span className="font-bold text-white">120 Hz ProMotion</span>
          </div>
          <div className="p-2 bg-cyan-950/40 rounded-xl border border-cyan-500/30 text-cyan-200">
            <span className="block text-zinc-400">PARTICLE PACKETS</span>
            <span className="font-bold text-white">Continuous Stream</span>
          </div>
        </div>
      </div>
    </div>
  );
};
