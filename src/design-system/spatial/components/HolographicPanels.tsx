/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, Radio, Sparkles, Zap, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { useSpatial } from '../SpatialContext';

export const HolographicPanels: React.FC = () => {
  const { mode, reducedMotion } = useSpatial();
  const [glitchActive, setGlitchActive] = useState(false);

  const triggerFlicker = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 600);
  };

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-400">
            <Radio className="w-4 h-4" />
            <span className="font-bold text-white uppercase">Holographic Panel (2D Dark Mode)</span>
          </div>
          <span className="text-zinc-500">Static Dark Mode</span>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/80 border border-cyan-500/30 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between text-cyan-300 font-bold">
            <span>HOLO DATA FEED #084</span>
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 text-[10px]">STABLE</span>
          </div>
          <p className="text-zinc-300 leading-relaxed">
            High-density volumetric hologram rendering operational parameters without spatial projection beams.
          </p>
        </div>
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  return (
    <div className="relative w-full h-[460px] p-6 rounded-3xl bg-zinc-950/95 border border-zinc-800 flex flex-col justify-between select-none overflow-hidden [perspective:1000px]">
      {/* Volumetric Projection Emitter Base */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-t from-cyan-500/40 via-cyan-500/10 to-transparent blur-xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400">
          <Radio className="w-4 h-4 animate-pulse" />
          <span className="font-bold text-white">VOLUMETRIC HOLOGRAPHIC PROJECTION</span>
        </div>

        <button
          onClick={triggerFlicker}
          className="px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-900 text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Trigger Pulse</span>
        </button>
      </div>

      {/* Holographic Projection Floating Stage */}
      <div className="relative w-full max-w-lg mx-auto h-72 my-auto flex items-center justify-center [transform-style:preserve-3d]">
        {/* Hologram Card */}
        <motion.div
          animate={
            glitchActive
              ? { x: [0, -8, 8, -4, 0], opacity: [1, 0.4, 1, 0.6, 1] }
              : reducedMotion
              ? {}
              : { rotateY: [ -6, 6, -6 ], rotateX: [ 4, -4, 4 ] }
          }
          transition={{
            duration: glitchActive ? 0.4 : 8,
            repeat: glitchActive ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          className="relative w-full p-6 rounded-3xl border-2 border-cyan-400/80 bg-cyan-950/20 backdrop-blur-md shadow-[0_0_50px_rgba(6,182,212,0.3)] text-white font-mono space-y-4 overflow-hidden [transform-style:preserve-3d]"
        >
          {/* Scanline texture */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(6,182,212,0.15)_50%)] bg-[length:100%_4px] pointer-events-none opacity-60" />

          {/* Card Top */}
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>HOLO MATRIX PROJECTION</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] border border-cyan-400/50 animate-pulse">
              ACTIVE BEAM
            </span>
          </div>

          {/* Card Content */}
          <p className="text-xs md:text-sm text-cyan-100 leading-relaxed">
            Volumetric beam emitter pulsing at 240Hz with chromatic spatial interference and neural telemetry HUD overlay.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cyan-500/30 text-xs">
            <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30">
              <span className="text-[10px] text-cyan-400/80 block">BEAM FREQUENCY</span>
              <span className="text-cyan-300 font-bold text-sm">240.4 GHz</span>
            </div>
            <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30">
              <span className="text-[10px] text-cyan-400/80 block">CHROMATIC RES</span>
              <span className="text-cyan-300 font-bold text-sm">8K Hologram</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
        <span>Emitter: Laser Array Alpha</span>
        <span className="text-cyan-400">Coherence: 99.9%</span>
      </div>
    </div>
  );
};
