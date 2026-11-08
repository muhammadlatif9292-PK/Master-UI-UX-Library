/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Layers, Shield, Eye, Activity, Sparkles, ChevronRight } from 'lucide-react';
import { useSpatial } from '../SpatialContext';
import { SpatialPanelData } from '../types';

interface FloatingPanelsProps {
  panels?: SpatialPanelData[];
  onPanelSelect?: (panelId: string) => void;
}

const DEFAULT_PANELS: SpatialPanelData[] = [
  {
    id: 'bg-grid',
    title: 'Background Data Layer',
    subtitle: 'Z: -120px Depth Plane',
    depthZ: -120,
    rotationY: -10,
    content: 'Global spatial grid indexing telemetry and raw sensor streams across 24 cloud nodes.',
    status: 'OPTIMIZED',
    metrics: [
      { label: 'Latency', value: '1.2ms' },
      { label: 'Bandwidth', value: '48 GB/s' },
    ],
  },
  {
    id: 'main-core',
    title: 'Primary Control Vessel',
    subtitle: 'Z: 0px Surface Plane',
    depthZ: 0,
    rotationY: 0,
    content: 'Main operational canvas housing real-time system metrics, active session tokens, and threat monitors.',
    status: 'ACTIVE',
    metrics: [
      { label: 'Load', value: '18%' },
      { label: 'Uptime', value: '99.99%' },
    ],
  },
  {
    id: 'fg-hud',
    title: 'Foreground Spatial HUD',
    subtitle: 'Z: +90px Floating Focus',
    depthZ: 90,
    rotationY: 8,
    content: 'High-priority alert overlays, interactive holographic prompts, and cognitive assistant widgets.',
    status: 'READY',
    metrics: [
      { label: 'Attention', value: '100%' },
      { label: 'Gaze Focus', value: 'Lock' },
    ],
  },
];

export const FloatingPanels: React.FC<FloatingPanelsProps> = ({
  panels = DEFAULT_PANELS,
  onPanelSelect,
}) => {
  const { mode, reducedMotion } = useSpatial();
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [activePanelId, setActivePanelId] = useState<string>('main-core');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode === '2d-flat' || mode === 'reduced-motion' || reducedMotion) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setRotateX((-y / rect.height) * 22);
    setRotateY((x / rect.width) * 26);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-sky-400">
            <Layers className="w-4 h-4" />
            <span className="font-bold text-white uppercase">Floating Panels (2D Flat Mode)</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
            Fallback Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {panels.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setActivePanelId(p.id);
                onPanelSelect?.(p.id);
              }}
              className={`p-5 rounded-2xl border text-xs cursor-pointer transition-all ${
                activePanelId === p.id
                  ? 'bg-sky-950/60 border-sky-500 text-white shadow-lg shadow-sky-500/10'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">{p.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  {p.status}
                </span>
              </div>
              <p className="text-zinc-400 mb-3 leading-relaxed">{p.content}</p>
              {p.metrics && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/80 font-mono text-[11px]">
                  {p.metrics.map((m, i) => (
                    <div key={i}>
                      <span className="text-zinc-500 block text-[10px]">{m.label}</span>
                      <span className="text-sky-400 font-bold">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[420px] rounded-3xl bg-zinc-950/90 border border-zinc-800/80 p-6 flex items-center justify-center overflow-hidden select-none [perspective:1000px]"
    >
      {/* Perspective Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* 3D Depth Container Stage */}
      <div
        className="relative w-full max-w-2xl h-72 transition-transform duration-200 ease-out [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
      >
        {panels.map((p) => {
          const isSelected = activePanelId === p.id;
          return (
            <motion.div
              key={p.id}
              onClick={() => {
                setActivePanelId(p.id);
                onPanelSelect?.(p.id);
              }}
              animate={
                reducedMotion
                  ? {}
                  : {
                      translateZ: isSelected ? p.depthZ + 30 : p.depthZ,
                    }
              }
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`absolute inset-0 rounded-2xl p-6 backdrop-blur-xl border-2 shadow-2xl transition-all cursor-pointer flex flex-col justify-between [transform-style:preserve-3d] ${
                isSelected
                  ? 'border-sky-400 shadow-sky-500/30 bg-slate-900/90 text-white'
                  : 'border-white/10 shadow-black/80 bg-zinc-950/80 text-zinc-300 hover:border-white/30'
              }`}
              style={{
                transform: `translateZ(${p.depthZ}px) rotateY(${p.rotationY || 0}deg)`,
                boxShadow: isSelected
                  ? '0 20px 50px rgba(14, 165, 233, 0.3), inset 0 0 20px rgba(56, 189, 248, 0.2)'
                  : '0 16px 40px rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-400" />
                  <span className="font-bold text-sm">{p.title}</span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  {p.subtitle}
                </span>
              </div>

              {/* Body */}
              <p className="text-xs md:text-sm text-zinc-300 my-2 leading-relaxed">
                {p.content}
              </p>

              {/* Metrics Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 font-mono text-xs">
                {p.metrics?.map((m, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-zinc-500">{m.label}:</span>
                    <span className="text-sky-300 font-bold">{m.value}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1 text-sky-400 font-semibold text-[11px]">
                  <span>Focus</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
