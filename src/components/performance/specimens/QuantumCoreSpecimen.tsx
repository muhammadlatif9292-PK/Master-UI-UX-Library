/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { usePerformanceTier } from '../../../design-system/performance/PerformanceContext';
import { usePreventIdleLoop, useRegisterExpensiveEffect } from '../../../design-system/performance/expensiveEffectsTracker';
import { TierBadge } from '../../../design-system/performance/TierSwitch';
import {
  Cpu,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Shield,
  RefreshCw,
  Box,
  Eye,
  Sliders,
} from 'lucide-react';

interface QuantumParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export const QuantumCoreSpecimen: React.FC<{ forceTier?: 'tier1-low' | 'tier2-standard' | 'tier3-high' }> = ({
  forceTier,
}) => {
  const { activeTier: contextTier } = usePerformanceTier();
  const activeTier = forceTier || contextTier;

  const [corePower, setCorePower] = useState<number>(78);
  const [pulseActive, setPulseActive] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particles state for Tier 3
  const particlesRef = useRef<QuantumParticle[]>([]);

  // Register expensive effects when Tier 2 or 3 is active
  useRegisterExpensiveEffect('backdropFiltersCount', activeTier !== 'tier1-low');
  useRegisterExpensiveEffect('active3DTransformsCount', activeTier === 'tier3-high');
  useRegisterExpensiveEffect('particleEnginesCount', activeTier === 'tier3-high');

  // Initialize Particles for Tier 3
  useEffect(() => {
    if (activeTier === 'tier3-high') {
      const count = 55;
      const pts: QuantumParticle[] = [];
      const colors = ['#22d3ee', '#a855f7', '#38bdf8', '#c084fc', '#67e8f9'];
      for (let i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * 320,
          y: Math.random() * 380,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 2.5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.7 + 0.3,
        });
      }
      particlesRef.current = pts;
    } else {
      particlesRef.current = [];
    }
  }, [activeTier]);

  // Safe RequestAnimationFrame loop that pauses when idle, hidden, or in Tier 1
  const handleFrame = (timestamp: number, delta: number) => {
    if (activeTier !== 'tier3-high') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Quantum Particle Swarm with velocity trails and cursor gravity
    const targetX = mousePos.x * canvas.width;
    const targetY = mousePos.y * canvas.height;

    particlesRef.current.forEach((p) => {
      // Gentle attraction to cursor
      const dx = targetX - p.x;
      const dy = targetY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140 && dist > 5) {
        p.vx += (dx / dist) * 0.06;
        p.vy += (dy / dist) * 0.06;
      }

      // Physics integration & friction
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.98;
      p.vy *= 0.98;

      // Bounds bounce
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Render particle with glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ctx.globalAlpha = 1.0;
  };

  // Prevent Unnecessary Loops Hook
  usePreventIdleLoop({
    enabled: activeTier === 'tier3-high',
    onFrame: handleFrame,
    elementRef: containerRef,
  });

  // Mouse Move Handler for 3D Tilt and Spotlight (Tier 2 & 3)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTier === 'tier1-low' || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    setMousePos({ x: nx, y: ny });

    if (activeTier === 'tier3-high') {
      const rx = (ny - 0.5) * -22; // Tilt up to 22 deg
      const ry = (nx - 0.5) * 22;
      setTilt({ rx, ry });
    } else if (activeTier === 'tier2-standard') {
      const rx = (ny - 0.5) * -6; // Subtle 6 deg tilt
      const ry = (nx - 0.5) * 6;
      setTilt({ rx, ry });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setMousePos({ x: 0.5, y: 0.5 });
  };

  const handleTriggerPulse = () => {
    setPulseActive(true);
    setCorePower((prev) => (prev >= 95 ? 65 : prev + 10));
    setTimeout(() => setPulseActive(false), 600);
  };

  /* =========================================================================
     TIER 1 (LOW): Minimal blur, zero particles, simple CSS transitions, flat
     ========================================================================= */
  if (activeTier === 'tier1-low') {
    return (
      <div
        ref={containerRef}
        className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-zinc-900 border border-zinc-700 text-zinc-100 shadow-none transition-colors duration-150"
      >
        {/* Tier Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-zinc-800 text-cyan-400">
              <Cpu className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-mono font-bold text-white">Quantum Core Engine</h4>
              <p className="text-[10px] text-zinc-400 font-mono">Tier 1 Eco Flat Fallback</p>
            </div>
          </div>
          <TierBadge tier="tier1-low" />
        </div>

        {/* Core Metric Display */}
        <div className="my-5 p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-zinc-400">Compute Load:</span>
            <span className="text-cyan-400 font-bold">{corePower}%</span>
          </div>
          {/* Simple CSS Progress Bar (Zero Animation loops) */}
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all duration-150"
              style={{ width: `${corePower}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono text-zinc-400">
            <div className="p-2 bg-zinc-900 rounded border border-zinc-800">
              <span className="block text-[9px] text-zinc-500">BLUR</span>
              <span className="text-white font-bold">0px (None)</span>
            </div>
            <div className="p-2 bg-zinc-900 rounded border border-zinc-800">
              <span className="block text-[9px] text-zinc-500">PARTICLES</span>
              <span className="text-white font-bold">0 (Disabled)</span>
            </div>
          </div>
        </div>

        {/* Action Trigger Button */}
        <button
          onClick={handleTriggerPulse}
          className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-zinc-950 font-mono font-bold text-xs transition-colors duration-150 flex items-center justify-center gap-2"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Pulse Core Engine (+10%)</span>
        </button>
      </div>
    );
  }

  /* =========================================================================
     TIER 2 (STANDARD): Normal glass, moderate effects, standard spring motion
     ========================================================================= */
  if (activeTier === 'tier2-standard') {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-sm mx-auto p-5 rounded-2xl bg-zinc-900/80 backdrop-blur-md border border-white/15 text-zinc-100 shadow-xl shadow-cyan-950/20 transition-all duration-300 relative overflow-hidden"
        style={{
          transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute -inset-2 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 pointer-events-none rounded-2xl"
          style={{ opacity: pulseActive ? 0.8 : 0.3, transition: 'opacity 0.3s ease' }}
        />

        {/* Tier Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Cpu className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-mono font-bold text-white">Quantum Core Engine</h4>
              <p className="text-[10px] text-zinc-400 font-mono">Tier 2 Frosted Glass</p>
            </div>
          </div>
          <TierBadge tier="tier2-standard" />
        </div>

        {/* Ambient Decorative Dust (12 static/gentle particles) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-400/40 animate-pulse"
              style={{
                width: `${(i % 3) + 2}px`,
                height: `${(i % 3) + 2}px`,
                left: `${(i * 14 + 10) % 90}%`,
                top: `${(i * 19 + 15) % 85}%`,
                animationDuration: `${2 + (i % 3)}s`,
              }}
            />
          ))}
        </div>

        {/* Core Metric Display with Spring Curves */}
        <div className="my-5 p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 relative z-10 backdrop-blur-sm">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-zinc-300">Compute Load:</span>
            <span className="text-cyan-300 font-bold flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
              {corePower}%
            </span>
          </div>

          <div className="w-full h-2 bg-zinc-800/80 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_rgba(6,182,212,0.4)]"
              style={{ width: `${corePower}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono text-zinc-300">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
              <span className="block text-[9px] text-zinc-400">BLUR</span>
              <span className="text-cyan-300 font-bold">12px (Frosted)</span>
            </div>
            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
              <span className="block text-[9px] text-zinc-400">PARTICLES</span>
              <span className="text-cyan-300 font-bold">8 Ambient Dots</span>
            </div>
          </div>
        </div>

        {/* Interactive Action Button */}
        <button
          onClick={handleTriggerPulse}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-zinc-950 font-mono font-bold text-xs transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 relative z-10"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Pulse Core Engine (+10%)</span>
        </button>
      </div>
    );
  }

  /* =========================================================================
     TIER 3 (HIGH): Advanced lighting, 60 physics particles, 3D parallax tilt,
     specular highlight tracker, volumetric bloom, rotating 3D wireframe mesh
     ========================================================================= */
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-sm mx-auto p-5 rounded-3xl bg-zinc-900/60 backdrop-blur-2xl border border-cyan-500/40 text-zinc-100 shadow-2xl shadow-cyan-500/30 transition-transform duration-100 ease-out relative overflow-hidden ring-1 ring-cyan-400/30"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(10px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 1. Volumetric Bloom & Spotlight Follower */}
      <div
        className="absolute w-64 h-64 rounded-full bg-cyan-500/25 blur-3xl pointer-events-none transition-transform duration-75"
        style={{
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute w-48 h-48 rounded-full bg-purple-500/20 blur-2xl pointer-events-none"
        style={{
          right: '10%',
          bottom: '10%',
          opacity: pulseActive ? 0.9 : 0.4,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* 2. Particle Swarm Canvas (55 Live Reactive Physics Particles) */}
      <canvas
        ref={canvasRef}
        width={340}
        height={400}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* 3. Header Layer with 3D Z-Separation */}
      <div
        className="flex items-center justify-between border-b border-cyan-500/30 pb-3 relative z-10"
        style={{ transform: 'translateZ(25px)' }}
      >
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-2xl bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 shadow-lg shadow-cyan-500/40 animate-pulse">
            <Sparkles className="w-4 h-4 text-cyan-300" />
          </span>
          <div>
            <h4 className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              Quantum Core Engine
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </h4>
            <p className="text-[10px] text-cyan-300/80 font-mono">Tier 3 Ultra Spatial 3D</p>
          </div>
        </div>
        <TierBadge tier="tier3-high" />
      </div>

      {/* 4. 3D Wireframe Quantum Orb / Mesh Visualizer */}
      <div
        className="my-4 p-4 rounded-2xl bg-black/60 border border-cyan-500/30 relative z-10 backdrop-blur-md shadow-inner flex flex-col items-center justify-center space-y-3"
        style={{ transform: 'translateZ(35px)' }}
      >
        {/* Animated 3D Isometric Rotating Ring Mesh */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/50 animate-[spin_6s_linear_infinite]"
            style={{ transform: `rotateX(${tilt.rx * 2}deg) rotateY(${tilt.ry * 2}deg)` }}
          />
          <div
            className="absolute inset-2 rounded-full border-2 border-purple-500/60 animate-[spin_4s_linear_infinite_reverse]"
            style={{ transform: `rotateY(${tilt.ry * 2}deg) rotateX(${tilt.rx * 2}deg)` }}
          />
          <div className="p-3 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.6)]">
            <Box className="w-6 h-6 animate-bounce" />
          </div>
        </div>

        <div className="w-full space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-zinc-300">Quantum Fusion Load:</span>
            <span className="text-cyan-300 font-bold drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
              {corePower}%
            </span>
          </div>

          {/* Glowing Animated Progress Bar */}
          <div className="w-full h-2.5 bg-black/80 rounded-full overflow-hidden p-0.5 border border-cyan-500/40">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              style={{ width: `${corePower}%` }}
            ></div>
          </div>
        </div>

        {/* Tier 3 Spec Stats Grid */}
        <div className="grid grid-cols-2 gap-2 w-full pt-1 text-[10px] font-mono">
          <div className="p-1.5 bg-cyan-950/40 rounded-xl border border-cyan-500/30 text-cyan-200">
            <span className="block text-[9px] text-zinc-400 uppercase">Blur Depth</span>
            <span className="font-bold text-white">32px (Multi-Layer)</span>
          </div>
          <div className="p-1.5 bg-purple-950/40 rounded-xl border border-purple-500/30 text-purple-200">
            <span className="block text-[9px] text-zinc-400 uppercase">Particles</span>
            <span className="font-bold text-white">55 Live Physics</span>
          </div>
        </div>
      </div>

      {/* 5. Spatial 3D Interactive Action Button */}
      <button
        onClick={handleTriggerPulse}
        className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-purple-600 hover:from-cyan-300 hover:to-purple-500 text-zinc-950 font-mono font-bold text-xs transition-all duration-150 hover:scale-[1.03] active:scale-[0.97] shadow-xl shadow-cyan-500/40 flex items-center justify-center gap-2 relative z-10"
        style={{ transform: 'translateZ(40px)' }}
      >
        <Zap className="w-4 h-4 animate-bounce" />
        <span>Quantum Overcharge Pulse (+10%)</span>
      </button>
    </div>
  );
};
