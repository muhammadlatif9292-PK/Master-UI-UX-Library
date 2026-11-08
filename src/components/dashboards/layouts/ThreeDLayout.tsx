/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { RadialChartPrimitive } from '../data-components/RadialChartPrimitive';
import { GaugeMeterPrimitive } from '../data-components/GaugeMeterPrimitive';
import { LiveGraphPrimitive } from '../data-components/LiveGraphPrimitive';
import { Box, Rotate3d, Sliders } from 'lucide-react';

export function ThreeDLayout({ recipe }: { recipe: VisualRecipeStyle }) {
  const [rotateX, setRotateX] = useState(18);
  const [rotateY, setRotateY] = useState(-14);
  const [perspective, setPerspective] = useState(1200);

  return (
    <div className="space-y-6">
      {/* 3D Viewport Controls Bar */}
      <div className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} flex flex-wrap items-center justify-between gap-4`}>
        <div className="flex items-center gap-2">
          <Box className="w-5 h-5 text-violet-400 animate-spin" style={{ animationDuration: '15s' }} />
          <div>
            <h3 className={`text-sm font-bold ${recipe.textPrimary}`}>3D Isometric Perspective Matrix</h3>
            <p className={`text-xs ${recipe.textMuted}`}>Extruded depth planes with hardware-accelerated CSS 3D transforms</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Pitch (X):</span>
            <input
              type="range"
              min="0"
              max="45"
              value={rotateX}
              onChange={(e) => setRotateX(Number(e.target.value))}
              className="w-20 accent-violet-400"
            />
            <span className="text-white w-6">{rotateX}°</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Yaw (Y):</span>
            <input
              type="range"
              min="-45"
              max="45"
              value={rotateY}
              onChange={(e) => setRotateY(Number(e.target.value))}
              className="w-20 accent-violet-400"
            />
            <span className="text-white w-6">{rotateY}°</span>
          </div>

          <button
            onClick={() => {
              setRotateX(0);
              setRotateY(0);
            }}
            className="px-2.5 py-1 rounded-lg border border-white/10 text-zinc-300 hover:text-white bg-white/5"
          >
            Flatten 2D
          </button>
        </div>
      </div>

      {/* 3D Perspective Stage Container */}
      <div
        className="relative min-h-[580px] p-8 rounded-2xl bg-gradient-to-b from-[#080512] to-[#120a28] border border-violet-500/20 overflow-hidden flex items-center justify-center"
        style={{ perspective: `${perspective}px` }}
      >
        {/* Dynamic 3D Transform Wrapper */}
        <div
          className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Card 1 - Extruded Layer */}
          <div
            className="rounded-2xl transition-all duration-300"
            style={{
              transform: 'translateZ(40px)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8), 0 0 25px rgba(139,92,246,0.2)',
            }}
          >
            <LineChartPrimitive recipe={recipe} title="3D Plane Alpha: Vector Ingress" height={200} />
          </div>

          {/* Card 2 - Extruded Layer */}
          <div
            className="rounded-2xl transition-all duration-300"
            style={{
              transform: 'translateZ(60px)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.9), 0 0 30px rgba(56,189,248,0.2)',
            }}
          >
            <LiveGraphPrimitive recipe={recipe} title="3D Plane Beta: Oscilloscope" height={200} />
          </div>

          {/* Card 3 - Extruded Layer */}
          <div
            className="rounded-2xl transition-all duration-300"
            style={{
              transform: 'translateZ(30px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
            }}
          >
            <GaugeMeterPrimitive recipe={recipe} value={84.2} title="3D Plane Gamma: Pressure Core" size={170} />
          </div>

          {/* Card 4 - Extruded Layer */}
          <div
            className="rounded-2xl transition-all duration-300"
            style={{
              transform: 'translateZ(50px)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.85), 0 0 20px rgba(244,63,94,0.2)',
            }}
          >
            <RadialChartPrimitive recipe={recipe} title="3D Plane Delta: Ring Mesh" size={170} />
          </div>
        </div>
      </div>
    </div>
  );
}
