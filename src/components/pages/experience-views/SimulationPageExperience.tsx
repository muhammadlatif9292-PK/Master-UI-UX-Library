/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Orbit,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Sliders,
  Layers,
  Sparkles,
  Maximize2,
  Share2,
  Download,
  Activity,
  Cpu,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';

interface Props {
  recipe: PageStyleRecipe;
}

export const SimulationPageExperience: React.FC<Props> = ({ recipe }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [particleCount, setParticleCount] = useState(5000);
  const [viscosity, setViscosity] = useState(0.042);
  const [stepIteration, setStepIteration] = useState(1480);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2 | 4>(1);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setStepIteration((prev) => prev + 1 * playbackSpeed);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col font-sans`}>
      {/* Simulation Header */}
      <header className={`px-6 py-4 border-b ${recipe.divider} ${recipe.headerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Orbit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-extrabold text-lg ${recipe.textPrimary}`}>
                Navier-Stokes Particle & Thermal Fluid Solver
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
                RUNGE-KUTTA 4TH ORDER
              </span>
            </div>
            <p className={`text-xs ${recipe.textSecondary}`}>
              High-performance grid-free Smoothed Particle Hydrodynamics (SPH) engine
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStepIteration(0)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
              isPlaying ? 'bg-amber-600 text-black' : 'bg-cyan-500 text-black'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Resume'}</span>
          </button>
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            {([1, 2, 4] as const).map((s) => (
              <button
                key={s}
                onClick={() => setPlaybackSpeed(s)}
                className={`px-2.5 py-1 rounded-lg ${playbackSpeed === s ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400'}`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Simulation Workspace (Canvas on Left, Telemetry & Knobs on Right) */}
      <main className="max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left Column: Physical Particle Simulation Stage (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          <div className="h-[460px] w-full bg-black/90 rounded-3xl border border-cyan-900/40 relative overflow-hidden flex items-center justify-center p-4 shadow-2xl">
            {/* Ambient Nebula Canvas Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-indigo-950/20 pointer-events-none" />

            {/* Particle Swarm Representation */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-64 h-64 rounded-full border border-cyan-500/30 animate-spin flex items-center justify-center" style={{ animationDuration: '12s' }}>
                <div className="w-48 h-48 rounded-full border border-indigo-500/40 animate-pulse flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-cyan-400/10 blur-md" />
                </div>
              </div>

              {/* Dynamic Telemetry Overlay in HUD */}
              <div className="absolute top-3 left-3 p-3 rounded-2xl bg-black/70 backdrop-blur-md border border-slate-800 text-[11px] font-mono space-y-1">
                <div className="text-cyan-400 font-bold">TIMESTEP DT: 0.0016s</div>
                <div className="text-slate-300">ITERATION: {stepIteration}</div>
                <div className="text-emerald-400">PARTICLES: {particleCount.toLocaleString()}</div>
              </div>

              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl bg-black/70 border border-slate-800 text-[10px] font-mono text-slate-300">
                  ENERGY DRIFT: 0.0002% (CONSERVED)
                </span>
              </div>
            </div>
          </div>

          {/* Scrubber Timeline */}
          <div className={`p-4 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-2`}>
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>0.00s (T0)</span>
              <span className="text-cyan-400 font-bold">Current Frame: {(stepIteration * 0.0016).toFixed(3)}s</span>
              <span>10.00s (Max)</span>
            </div>
            <input
              type="range"
              min={0}
              max={6250}
              value={stepIteration}
              onChange={(e) => setStepIteration(parseInt(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>
        </div>

        {/* Right Column: Parameters & Solver Knobs (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-4`}>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Fluid Kinematic Parameters</span>
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Particle Grid Count:</span>
                  <span className="text-cyan-400 font-bold">{particleCount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={20000}
                  step={500}
                  value={particleCount}
                  onChange={(e) => setParticleCount(parseInt(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Dynamic Viscosity (Pa·s):</span>
                  <span className="text-indigo-400 font-bold">{viscosity}</span>
                </div>
                <input
                  type="range"
                  min={0.001}
                  max={0.2}
                  step={0.001}
                  value={viscosity}
                  onChange={(e) => setViscosity(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-3 font-mono text-xs`}>
            <div className="text-slate-400 font-bold uppercase text-[10px]">Compute Backend</div>
            <div className="flex items-center justify-between text-slate-200">
              <span>GPU Parallel Shaders</span>
              <span className="text-emerald-400 font-bold">ACTIVE (WebGPU)</span>
            </div>
            <div className="flex items-center justify-between text-slate-200">
              <span>Frame Rate</span>
              <span className="text-cyan-400 font-bold">120 FPS</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
