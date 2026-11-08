/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { AreaChartPrimitive } from '../data-components/AreaChartPrimitive';
import { GaugeMeterPrimitive } from '../data-components/GaugeMeterPrimitive';
import { LiveGraphPrimitive } from '../data-components/LiveGraphPrimitive';
import { ScatterPlotPrimitive } from '../data-components/ScatterPlotPrimitive';
import { Play, Pause, RotateCcw, Sliders, Dna } from 'lucide-react';

export function SimulationLayout({ recipe }: { recipe: VisualRecipeStyle }) {
  const [gravity, setGravity] = useState(9.81);
  const [damping, setDamping] = useState(0.05);
  const [particles, setParticles] = useState(5000);
  const [isSimRunning, setIsSimRunning] = useState(true);

  return (
    <div className="space-y-6">
      {/* Simulation Physics Controls Header */}
      <div className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} flex flex-wrap items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-sky-500/20 border border-sky-500/40">
            <Dna className="w-5 h-5 text-sky-300" />
          </div>
          <div>
            <h2 className={`text-base font-bold ${recipe.textPrimary}`}>
              Monte Carlo Multi-Body Orbital Mechanics Simulator
            </h2>
            <p className={`text-xs ${recipe.textMuted}`}>Run 10,000 parallel particle trajectory integrations</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSimRunning(!isSimRunning)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
              isSimRunning ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-white/5 text-zinc-300 border-white/10'
            }`}
          >
            {isSimRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isSimRunning ? 'PAUSE SIM' : 'RESUME SIM'}</span>
          </button>
        </div>
      </div>

      {/* Physics Parameter Sliders Bar */}
      <div className={`p-4 rounded-xl border ${recipe.borderClass} bg-black/40 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs`}>
        <div className="space-y-1.5">
          <div className="flex justify-between font-mono">
            <span className={recipe.textSecondary}>Gravitational Constant (G)</span>
            <span className="font-bold text-white">{gravity} m/s²</span>
          </div>
          <input
            type="range"
            min="1.0"
            max="25.0"
            step="0.1"
            value={gravity}
            onChange={(e) => setGravity(Number(e.target.value))}
            className="w-full accent-sky-400"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-mono">
            <span className={recipe.textSecondary}>Medium Viscous Damping</span>
            <span className="font-bold text-white">{damping}</span>
          </div>
          <input
            type="range"
            min="0.01"
            max="0.5"
            step="0.01"
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
            className="w-full accent-sky-400"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between font-mono">
            <span className={recipe.textSecondary}>Active Particle Swarm</span>
            <span className="font-bold text-white">{particles.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="1000"
            max="25000"
            step="1000"
            value={particles}
            onChange={(e) => setParticles(Number(e.target.value))}
            className="w-full accent-sky-400"
          />
        </div>
      </div>

      {/* Simulation Real-time Plots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartPrimitive
          recipe={recipe}
          title="Orbital Velocity vs. Gravitational Well Distance"
          series1Label="Simulated Trajectory"
          series2Label="Analytic Keplarian Ideal"
          unit="km/s"
          height={220}
        />
        <LiveGraphPrimitive
          recipe={recipe}
          title="Instantaneous Kinetic vs Potential Energy"
          height={220}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScatterPlotPrimitive
          recipe={recipe}
          title="Particle Dispersion Cloud & Cluster Collisions"
        />
        <GaugeMeterPrimitive
          recipe={recipe}
          value={76.4}
          title="Thermodynamic Entropy"
          unit="J/K"
          size={180}
        />
      </div>
    </div>
  );
}
