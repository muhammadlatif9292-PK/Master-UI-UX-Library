/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { GaugeMeterPrimitive } from '../data-components/GaugeMeterPrimitive';
import { LiveGraphPrimitive } from '../data-components/LiveGraphPrimitive';
import { RadialChartPrimitive } from '../data-components/RadialChartPrimitive';
import { Move, ZoomIn, ZoomOut, Maximize, RotateCcw } from 'lucide-react';

export function CanvasLayout({ recipe }: { recipe: VisualRecipeStyle }) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  return (
    <div className="space-y-4">
      {/* Infinite Canvas Toolbar */}
      <div className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} flex flex-wrap items-center justify-between gap-4`}>
        <div className="flex items-center gap-2">
          <Move className="w-5 h-5 text-sky-400" />
          <div>
            <h3 className={`text-sm font-bold ${recipe.textPrimary}`}>Freeform Spatial Canvas Plane</h3>
            <p className={`text-xs ${recipe.textMuted}`}>Pan and zoom across unbounded multi-node analytics space</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 text-xs">
            <button
              onClick={() => setZoom(Math.max(0.6, zoom - 0.1))}
              className="p-1.5 rounded-md hover:bg-white/10 text-zinc-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono px-2 text-zinc-300 font-bold">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(Math.min(1.4, zoom + 0.1))}
              className="p-1.5 rounded-md hover:bg-white/10 text-zinc-300"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white bg-white/5"
            title="Reset Canvas View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Infinite Canvas Stage */}
      <div
        className="relative min-h-[550px] w-full rounded-2xl border border-white/10 bg-[#07090e] overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      >
        <div
          className="transition-transform duration-200 ease-out grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-4xl"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
          }}
        >
          <div className="w-[360px]">
            <LineChartPrimitive recipe={recipe} title="Canvas Node 01: Vector Trace" height={190} />
          </div>
          <div className="w-[360px]">
            <LiveGraphPrimitive recipe={recipe} title="Canvas Node 02: Realtime Frequency" height={190} />
          </div>
          <div className="w-[360px]">
            <GaugeMeterPrimitive recipe={recipe} value={82.1} title="Canvas Node 03: Pressure Core" size={170} />
          </div>
          <div className="w-[360px]">
            <RadialChartPrimitive recipe={recipe} title="Canvas Node 04: Mesh Ring" size={170} />
          </div>
        </div>
      </div>
    </div>
  );
}
