/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, Activity, Cpu, Shield, Zap, Radio, Database } from 'lucide-react';
import { useSpatial } from '../SpatialContext';

export const SpatialDashboard: React.FC = () => {
  const { mode, reducedMotion } = useSpatial();

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-sky-400">
            <LayoutDashboard className="w-4 h-4" />
            <span className="font-bold text-white uppercase">Spatial Dashboard (2D Grid Mode)</span>
          </div>
          <span className="text-zinc-500">Standard Grid View</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span className="text-zinc-400 block text-[10px]">CPU COMPUTE CORE</span>
            <span className="text-2xl font-bold text-sky-400">94.2%</span>
            <span className="text-zinc-500 text-[10px] block">16 Threads Active</span>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span className="text-zinc-400 block text-[10px]">VECTOR STREAM</span>
            <span className="text-2xl font-bold text-emerald-400">12.4K req/s</span>
            <span className="text-zinc-500 text-[10px] block">Zero Packet Loss</span>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
            <span className="text-zinc-400 block text-[10px]">ENCRYPTION VAULT</span>
            <span className="text-2xl font-bold text-violet-400">AES-256</span>
            <span className="text-zinc-500 text-[10px] block">Hardware Key Verified</span>
          </div>
        </div>
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  return (
    <div className="relative w-full h-[460px] p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 flex flex-col justify-between select-none [perspective:1000px] overflow-hidden">
      {/* Background HUD Visor Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-sky-400">
          <LayoutDashboard className="w-4 h-4" />
          <span className="font-bold text-white uppercase">CURVED SPATIAL HUD DASHBOARD</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
          PANORAMIC VISOR ACTIVE
        </span>
      </div>

      {/* Curved Cylindrical HUD Stage */}
      <div className="relative w-full h-80 my-auto flex items-center justify-center [transform-style:preserve-3d]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl [transform-style:preserve-3d]">
          {/* Left Curved Panel */}
          <motion.div
            animate={reducedMotion ? {} : { rotateY: 16, translateZ: -20 }}
            transition={{ duration: 0.5 }}
            className="p-5 rounded-2xl bg-slate-950/85 border-2 border-sky-500/40 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-3 font-mono text-xs [transform-style:preserve-3d]"
            style={{ boxShadow: '0 12px 36px rgba(0,0,0,0.8), inset 0 0 16px rgba(14,165,233,0.15)' }}
          >
            <div className="flex items-center justify-between text-sky-400 font-bold border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                <span>CPU TELEMETRY</span>
              </span>
              <span className="text-[10px] text-zinc-500">Z: -20px</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-white block">94.8%</span>
              <span className="text-zinc-400 text-[11px]">16 Cores Occupied</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div className="bg-sky-400 h-full w-[94%]" />
            </div>
          </motion.div>

          {/* Center Main Panel (Elevated Forward) */}
          <motion.div
            animate={reducedMotion ? {} : { rotateY: 0, translateZ: 30 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-slate-900/95 border-2 border-sky-400 backdrop-blur-2xl shadow-2xl flex flex-col justify-between space-y-3 font-mono text-xs [transform-style:preserve-3d]"
            style={{ boxShadow: '0 20px 50px rgba(14,165,233,0.3), inset 0 0 20px rgba(56,189,248,0.2)' }}
          >
            <div className="flex items-center justify-between text-white font-bold border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>NEURAL STREAM</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] border border-emerald-500/40">
                OPTIMAL
              </span>
            </div>
            <div>
              <span className="text-4xl font-bold text-white block">14.8K</span>
              <span className="text-zinc-300 text-[11px]">Vector Inferences / sec</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/10">
              <span>Latency: 1.1ms</span>
              <span className="text-emerald-400 font-bold">100% Sync</span>
            </div>
          </motion.div>

          {/* Right Curved Panel */}
          <motion.div
            animate={reducedMotion ? {} : { rotateY: -16, translateZ: -20 }}
            transition={{ duration: 0.5 }}
            className="p-5 rounded-2xl bg-slate-950/85 border-2 border-indigo-500/40 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-3 font-mono text-xs [transform-style:preserve-3d]"
            style={{ boxShadow: '0 12px 36px rgba(0,0,0,0.8), inset 0 0 16px rgba(99,102,241,0.15)' }}
          >
            <div className="flex items-center justify-between text-indigo-400 font-bold border-b border-white/10 pb-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                <span>RBAC SECURITY</span>
              </span>
              <span className="text-[10px] text-zinc-500">Z: -20px</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-white block">AES-256</span>
              <span className="text-zinc-400 text-[11px]">Zero Breach Events</span>
            </div>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-400 h-full w-[100%]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
        <span>Panoramic Cylindrical Visor View</span>
        <span className="text-sky-400 font-bold">Spatial Field: 120° FOV</span>
      </div>
    </div>
  );
};
