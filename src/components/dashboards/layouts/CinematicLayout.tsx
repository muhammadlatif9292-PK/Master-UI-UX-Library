/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VisualRecipeStyle } from '../types';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { AreaChartPrimitive } from '../data-components/AreaChartPrimitive';
import { LiveGraphPrimitive } from '../data-components/LiveGraphPrimitive';
import { SparklinePrimitive } from '../data-components/SparklinePrimitive';
import { WaveformPrimitive } from '../data-components/WaveformPrimitive';
import { Film, Clapperboard, Sparkles } from 'lucide-react';

export function CinematicLayout({ recipe }: { recipe: VisualRecipeStyle }) {
  return (
    <div className="space-y-6 bg-black p-6 rounded-2xl border border-zinc-800 shadow-2xl">
      {/* 21:9 Widescreen Letterbox Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
            <Film className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose-400 font-mono">
                CINEMATIC ULTRA-WIDE 2.39:1
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Mission Horizon Trajectory</h2>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <div>REC TIME <strong className="text-white">01:42:19:04</strong></div>
          <div className="text-rose-400 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            4K DCI 60FPS
          </div>
        </div>
      </div>

      {/* Hero Ultra-Wide Dual Display */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AreaChartPrimitive
            recipe={recipe}
            title="Luminance Dynamic Range Distribution"
            height={260}
          />
        </div>
        <div className="lg:col-span-1">
          <LiveGraphPrimitive
            recipe={recipe}
            title="Sensor Bitrate Ingress"
            height={260}
          />
        </div>
      </div>

      {/* Secondary Audio & Stats Ribbon */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WaveformPrimitive recipe={recipe} title="Stereo Master Reference Waveform" />
        <div className="grid grid-cols-2 gap-4">
          <SparklinePrimitive label="Color Grading Gamut" value="100% DCI-P3" delta="Calibrated" isPositive={true} recipe={recipe} />
          <SparklinePrimitive label="Frame Drop Ratio" value="0.000%" delta="0 frames" isPositive={true} recipe={recipe} />
          <SparklinePrimitive label="ProRes 4444 XQ" value="1.42 GB/s" delta="Stable" isPositive={true} recipe={recipe} />
          <SparklinePrimitive label="Thermal Core" value="48.5 °C" delta="Nominal" isPositive={true} recipe={recipe} />
        </div>
      </div>
    </div>
  );
}
