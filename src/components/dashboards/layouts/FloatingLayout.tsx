/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { GaugeMeterPrimitive } from '../data-components/GaugeMeterPrimitive';
import { LiveGraphPrimitive } from '../data-components/LiveGraphPrimitive';
import { SparklinePrimitive } from '../data-components/SparklinePrimitive';
import { Layers, Minimize2, Maximize2, X, Move } from 'lucide-react';

export function FloatingLayout({ recipe }: { recipe: VisualRecipeStyle }) {
  const [pip1Open, setPip1Open] = useState(true);
  const [pip2Open, setPip2Open] = useState(true);
  const [minimized1, setMinimized1] = useState(false);
  const [minimized2, setMinimized2] = useState(false);

  return (
    <div className="relative min-h-[580px] p-6 rounded-2xl bg-slate-950 border border-white/10 overflow-hidden">
      {/* Background Main Host Dashboard */}
      <div className="space-y-6 opacity-75">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Underlying Operational Work Plane</h2>
            <p className="text-xs text-zinc-400">Host workspace background running background workflows</p>
          </div>
          <span className="text-xs text-sky-400 font-mono">HOST PLANE ACTIVE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LineChartPrimitive recipe={recipe} title="Host Ingress Baseline" height={200} />
          <div className="grid grid-cols-2 gap-4">
            <SparklinePrimitive label="Host CPU" value="38%" delta="-2%" isPositive={true} recipe={recipe} />
            <SparklinePrimitive label="Host RAM" value="12.4 GB" delta="+0.4 GB" isPositive={true} recipe={recipe} />
            <SparklinePrimitive label="Host IOPS" value="14.2k" delta="+1.2k" isPositive={true} recipe={recipe} />
            <SparklinePrimitive label="Host Swap" value="0.0%" delta="0%" isPositive={true} recipe={recipe} />
          </div>
        </div>
      </div>

      {/* Floating Picture-in-Picture Widget 1 (Top Right) */}
      {pip1Open && (
        <div
          className={`absolute top-8 right-8 z-30 transition-all duration-300 rounded-2xl shadow-2xl backdrop-blur-xl border border-sky-400/40 bg-slate-900/90 overflow-hidden ${
            minimized1 ? 'w-64 h-12' : 'w-80 md:w-96'
          }`}
          style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(56,189,248,0.2)' }}
        >
          {/* PiP Header */}
          <div className="p-3 bg-white/5 border-b border-white/10 flex items-center justify-between cursor-move">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-white font-mono">PiP Oscilloscope</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <button
                onClick={() => setMinimized1(!minimized1)}
                className="hover:text-white p-1 rounded"
              >
                {minimized1 ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button onClick={() => setPip1Open(false)} className="hover:text-rose-400 p-1 rounded">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          {!minimized1 && (
            <div className="p-3">
              <LiveGraphPrimitive recipe={recipe} title="Floating Live Stream" height={160} />
            </div>
          )}
        </div>
      )}

      {/* Floating Picture-in-Picture Widget 2 (Bottom Right) */}
      {pip2Open && (
        <div
          className={`absolute bottom-8 right-8 z-20 transition-all duration-300 rounded-2xl shadow-2xl backdrop-blur-xl border border-violet-400/40 bg-slate-900/90 overflow-hidden ${
            minimized2 ? 'w-64 h-12' : 'w-72 md:w-80'
          }`}
          style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(139,92,246,0.2)' }}
        >
          {/* PiP Header */}
          <div className="p-3 bg-white/5 border-b border-white/10 flex items-center justify-between cursor-move">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              <span className="text-xs font-bold text-white font-mono">PiP Pressure Dial</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <button
                onClick={() => setMinimized2(!minimized2)}
                className="hover:text-white p-1 rounded"
              >
                {minimized2 ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button onClick={() => setPip2Open(false)} className="hover:text-rose-400 p-1 rounded">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          {!minimized2 && (
            <div className="p-3 flex justify-center">
              <GaugeMeterPrimitive recipe={recipe} value={88.2} title="Active Valve Core" size={160} />
            </div>
          )}
        </div>
      )}

      {/* Restore Button if closed */}
      {(!pip1Open || !pip2Open) && (
        <div className="absolute bottom-4 left-4 z-40">
          <button
            onClick={() => {
              setPip1Open(true);
              setPip2Open(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-bold shadow-lg flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Restore Floating Widgets</span>
          </button>
        </div>
      )}
    </div>
  );
}
