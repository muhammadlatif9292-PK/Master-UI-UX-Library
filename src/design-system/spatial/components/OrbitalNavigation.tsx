/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, RotateCw, RotateCcw, Activity, Shield, Cpu, Database, Eye, Terminal } from 'lucide-react';
import { useSpatial } from '../SpatialContext';

export interface OrbitNode {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
}

const DEFAULT_ORBIT_NODES: OrbitNode[] = [
  { id: 'node-ai', title: 'Neural Engine', subtitle: 'AI Model Core', icon: Cpu, color: '#38bdf8' },
  { id: 'node-db', title: 'Spatial Store', subtitle: 'Vector DB', icon: Database, color: '#10b981' },
  { id: 'node-sec', title: 'Shield RBAC', subtitle: 'Security Core', icon: Shield, color: '#f59e0b' },
  { id: 'node-mon', title: 'Telemetry', subtitle: 'Stream Sensor', icon: Activity, color: '#ec4899' },
  { id: 'node-gaze', title: 'Eye Tracker', subtitle: 'Gaze Focus', icon: Eye, color: '#8b5cf6' },
  { id: 'node-cmd', title: 'Terminal', subtitle: 'CLI Vessel', icon: Terminal, color: '#06b6d4' },
];

export const OrbitalNavigation: React.FC = () => {
  const { mode, reducedMotion } = useSpatial();
  const [rotationAngle, setRotationAngle] = useState(0);
  const [activeNodeId, setActiveNodeId] = useState('node-ai');

  const rotate = (deltaDeg: number) => {
    setRotationAngle((prev) => prev + deltaDeg);
  };

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-cyan-400">
            <Compass className="w-4 h-4" />
            <span className="font-bold text-white uppercase">Orbital Navigation (2D Tab Bar)</span>
          </div>
          <span className="text-zinc-500">6 Orbit Nodes</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {DEFAULT_ORBIT_NODES.map((node) => {
            const Icon = node.icon;
            const isActive = activeNodeId === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`px-4 py-3 rounded-2xl border flex items-center gap-3 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-950/80 border-cyan-400 text-white font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" style={{ color: node.color }} />
                <div className="text-left">
                  <span className="block text-xs">{node.title}</span>
                  <span className="block text-[10px] text-zinc-500 font-mono">{node.subtitle}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  const radius = 160; // px
  const totalNodes = DEFAULT_ORBIT_NODES.length;

  return (
    <div className="relative w-full h-[460px] p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 flex flex-col justify-between select-none [perspective:1000px] overflow-hidden">
      {/* Background Orbital Glow Halo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-96 h-96 rounded-full border border-dashed border-cyan-500/50 animate-[spin_40s_linear_infinite]" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400">
          <Compass className="w-4 h-4" />
          <span className="font-bold text-white uppercase">3D ORBITAL RING NAVIGATION</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => rotate(-60)}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors cursor-pointer"
            title="Rotate Counter-Clockwise"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => rotate(60)}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors cursor-pointer"
            title="Rotate Clockwise"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Orbit Ring Stage */}
      <div className="relative w-full h-80 my-auto flex items-center justify-center [transform-style:preserve-3d]">
        {/* Central Hub Core */}
        <div className="absolute w-28 h-28 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center text-center z-10 p-2">
          <Compass className="w-6 h-6 text-cyan-400 mb-1 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-white uppercase">ORBIT CORE</span>
          <span className="text-[9px] text-zinc-400 font-mono">360° Ring</span>
        </div>

        {/* Orbit Node Items */}
        {DEFAULT_ORBIT_NODES.map((node, index) => {
          const baseAngle = (index / totalNodes) * 360;
          const currentAngleRad = ((baseAngle + rotationAngle) * Math.PI) / 180;

          // 3D Trigonometric Spatial Coordinates
          const x = Math.sin(currentAngleRad) * radius;
          const z = Math.cos(currentAngleRad) * radius;
          const y = Math.sin(currentAngleRad * 2) * 16; // subtle spatial wave bounce

          // Scale & Opacity based on Z depth
          const scale = 0.75 + ((z + radius) / (2 * radius)) * 0.45;
          const opacity = 0.4 + ((z + radius) / (2 * radius)) * 0.6;
          const isFront = z > radius * 0.4;
          const isActive = activeNodeId === node.id;
          const Icon = node.icon;

          return (
            <motion.div
              key={node.id}
              onClick={() => {
                setActiveNodeId(node.id);
                // Auto rotate to front facing
                setRotationAngle(-baseAngle);
              }}
              animate={
                reducedMotion
                  ? { x, y: 0 }
                  : {
                      x,
                      y,
                      translateZ: z,
                      scale: isActive ? scale * 1.15 : scale,
                      opacity,
                    }
              }
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute rounded-2xl p-4 border-2 backdrop-blur-xl shadow-2xl cursor-pointer transition-all flex flex-col items-center justify-center text-center w-36 h-28 [transform-style:preserve-3d] ${
                isActive
                  ? 'border-cyan-400 bg-slate-900/95 text-white ring-2 ring-cyan-500/50 shadow-cyan-500/40 z-30'
                  : isFront
                  ? 'border-white/20 bg-zinc-950/90 text-zinc-200 hover:border-white/50 z-20'
                  : 'border-white/5 bg-zinc-950/60 text-zinc-500 z-0'
              }`}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center mb-1 shadow-md"
                style={{ backgroundColor: `${node.color}22`, border: `1px solid ${node.color}66` }}
              >
                <Icon className="w-4 h-4" style={{ color: node.color }} />
              </div>
              <span className="font-bold text-xs text-white block">{node.title}</span>
              <span className="text-[10px] text-zinc-400 font-mono block">{node.subtitle}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
        <span>Active Node: {DEFAULT_ORBIT_NODES.find((n) => n.id === activeNodeId)?.title}</span>
        <span className="text-cyan-400">Angle: {Math.round(rotationAngle % 360)}°</span>
      </div>
    </div>
  );
};
