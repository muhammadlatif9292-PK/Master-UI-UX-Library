/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Cpu, ArrowUpRight } from 'lucide-react';
import { useSpatial } from '../SpatialContext';

export interface ThreeDCardProps {
  title?: string;
  category?: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
  imageBg?: string;
  stats?: { label: string; value: string }[];
  onAction?: () => void;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({
  title = 'Cognitive Spatial Matrix',
  category = 'NEURAL ARCHITECTURE',
  description = 'Volumetric 3D spatial interface card reacting dynamically to pointer inclination, specular raycasting, and depth displacement.',
  badge = 'VERIFIED',
  badgeColor = 'text-emerald-400 bg-emerald-950/80 border-emerald-800',
  stats = [
    { label: 'FLOPS', value: '1.4 PFLOPS' },
    { label: 'SPECTRUM', value: 'Holographic' },
  ],
  onAction,
}) => {
  const { mode, reducedMotion } = useSpatial();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode === '2d-flat' || mode === 'reduced-motion' || reducedMotion) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 20; // max 20deg tilt
    const rotY = ((x - centerX) / centerX) * 20;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full max-w-md p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
          <span>{category}</span>
          <span className={`px-2 py-0.5 rounded text-[10px] border ${badgeColor}`}>
            {badge}
          </span>
        </div>
        <h3 className="font-bold text-lg text-white">{title}</h3>
        <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800 font-mono text-xs">
          {stats.map((s, i) => (
            <div key={i}>
              <span className="text-zinc-500 block text-[10px]">{s.label}</span>
              <span className="text-sky-400 font-bold">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  return (
    <div className="w-full max-w-md flex items-center justify-center [perspective:1000px] select-none">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onAction}
        className="relative w-full rounded-3xl p-6 border-2 border-white/10 bg-slate-950/90 text-white shadow-2xl transition-transform duration-150 ease-out cursor-pointer overflow-hidden [transform-style:preserve-3d]"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          boxShadow: `0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(14, 165, 233, 0.25)`,
        }}
      >
        {/* Holographic Specular Reflection Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.8), rgba(56,189,248,0.3) 40%, transparent 80%)`,
            opacity: glarePos.opacity,
          }}
        />

        {/* Floating Foreground Layer 1: Header */}
        <div className="flex items-center justify-between mb-4 font-mono text-xs [transform:translateZ(30px)]">
          <div className="flex items-center gap-1.5 text-sky-400 font-bold">
            <Cpu className="w-4 h-4" />
            <span>{category}</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${badgeColor}`}>
            {badge}
          </span>
        </div>

        {/* Floating Layer 2: Title */}
        <div className="my-4 [transform:translateZ(40px)]">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center justify-between">
            <span>{title}</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </h3>
          <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Floating Layer 3: Stats Grid & Action */}
        <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 font-mono text-xs [transform:translateZ(25px)]">
          {stats.map((s, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-white/10">
              <span className="text-[10px] text-zinc-400 block">{s.label}</span>
              <span className="text-sky-300 font-bold text-sm">{s.value}</span>
            </div>
          ))}
        </div>

        {/* Bottom Interactive Arrow */}
        <div className="mt-4 pt-2 flex items-center justify-between text-xs font-mono text-sky-400 [transform:translateZ(20px)]">
          <span>Interact to inspect 3D mesh</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
