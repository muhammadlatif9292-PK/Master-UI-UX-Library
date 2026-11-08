/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { RadialChartPrimitive } from '../data-components/RadialChartPrimitive';
import { SparklinePrimitive } from '../data-components/SparklinePrimitive';
import { ScatterPlotPrimitive } from '../data-components/ScatterPlotPrimitive';
import { Eye, Layers, Compass, Maximize2 } from 'lucide-react';

export function SpatialLayout({ recipe }: { recipe: VisualRecipeStyle }) {
  const [depthElevation, setDepthElevation] = useState(25);

  return (
    <div className="relative min-h-[600px] p-6 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-white/10 overflow-hidden">
      {/* Ambient Spatial Background Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(96,165,250,0.15) 0%, transparent 70%), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px',
        }}
      />

      {/* Spatial Controls Header */}
      <div className="relative z-10 flex items-center justify-between mb-8 backdrop-blur-xl bg-white/5 p-3 rounded-xl border border-white/10">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-sky-400" />
          <h3 className="text-sm font-semibold text-white">Spatial Depth Projection System</h3>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-zinc-400">Z-Axis Depth:</span>
          <input
            type="range"
            min="0"
            max="60"
            value={depthElevation}
            onChange={(e) => setDepthElevation(Number(e.target.value))}
            className="w-28 accent-sky-400"
          />
          <span className="font-mono text-sky-300 font-bold">{depthElevation}px</span>
        </div>
      </div>

      {/* Floating Spatial Panels with Parallax & Z Elevation */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Layer 1 - Floating High */}
        <div
          className="transition-all duration-300 transform rounded-2xl"
          style={{
            transform: `translateY(-${depthElevation * 0.4}px) translateZ(${depthElevation}px)`,
            boxShadow: `0 ${depthElevation + 10}px ${depthElevation * 2}px rgba(0,0,0,0.6), 0 0 20px rgba(56,189,248,0.15)`,
          }}
        >
          <LineChartPrimitive recipe={recipe} title="Volumetric Flow" height={210} />
        </div>

        {/* Layer 2 - Center High Radial */}
        <div
          className="transition-all duration-300 transform rounded-2xl"
          style={{
            transform: `translateY(${depthElevation * 0.2}px) translateZ(${depthElevation * 1.5}px)`,
            boxShadow: `0 ${depthElevation + 15}px ${depthElevation * 2.5}px rgba(0,0,0,0.7), 0 0 25px rgba(139,92,246,0.15)`,
          }}
        >
          <RadialChartPrimitive recipe={recipe} title="Spatial Convergence" size={190} />
        </div>

        {/* Layer 3 - Scatter Points */}
        <div
          className="transition-all duration-300 transform rounded-2xl"
          style={{
            transform: `translateY(-${depthElevation * 0.3}px) translateZ(${depthElevation * 0.8}px)`,
            boxShadow: `0 ${depthElevation + 8}px ${depthElevation * 1.8}px rgba(0,0,0,0.5)`,
          }}
        >
          <ScatterPlotPrimitive recipe={recipe} title="Coordinate Cloud" height={210} />
        </div>
      </div>

      {/* Floating Bottom Dock */}
      <div
        className="mt-6 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        style={{
          transform: `translateY(${depthElevation * 0.15}px)`,
        }}
      >
        <SparklinePrimitive label="Spatial FPS" value="120 fps" delta="+0.0%" isPositive={true} recipe={recipe} />
        <SparklinePrimitive label="Foveated Render" value="98.2%" delta="+1.4%" isPositive={true} recipe={recipe} />
        <SparklinePrimitive label="Motion-to-Photon" value="7.4 ms" delta="-1.2 ms" isPositive={true} recipe={recipe} />
      </div>
    </div>
  );
}
