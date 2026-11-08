/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FlaskConical,
  Activity,
  Zap,
  Gauge,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  CheckCircle2,
  AlertOctagon,
  Layers,
  Sparkles,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';

interface Props {
  recipe: PageStyleRecipe;
}

export const ScientificLabPageExperience: React.FC<Props> = ({ recipe }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [laserPower, setLaserPower] = useState(84.2);
  const [frequency, setFrequency] = useState(640.5);
  const [chamberTemp, setChamberTemp] = useState(4.2); // Kelvin
  const [magneticField, setMagneticField] = useState(3.8); // Tesla

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col font-sans`}>
      {/* Top Instrument Header */}
      <header className={`px-6 py-4 border-b ${recipe.divider} ${recipe.headerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-extrabold text-lg ${recipe.textPrimary}`}>
                Quantum Spectroscopy & Cryogenic Lab Bench
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                EXPERIMENT RUNNING: Q-SPEC-84
              </span>
            </div>
            <p className={`text-xs ${recipe.textSecondary}`}>
              Sub-Kelvin dilution refrigerator with laser excitation spectrometer
            </p>
          </div>
        </div>

        {/* Transport & Emergency Stop */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              isRunning ? 'bg-amber-600 hover:bg-amber-500 text-black' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Halt Acquisition' : 'Start Laser Sweep'}</span>
          </button>
          <button className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">E-Stop</span>
          </button>
        </div>
      </header>

      {/* Main Bench Layout */}
      <main className="p-6 max-w-7xl mx-auto w-full space-y-6 flex-1">
        {/* Real-time Environmental Gauge Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-5 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-2`}>
            <span className="text-xs text-slate-400 font-mono flex items-center justify-between">
              <span>CRYO CHAMBER TEMP</span>
              <span className="text-cyan-400 font-bold">mK LEVEL</span>
            </span>
            <div className="text-3xl font-extrabold text-cyan-400 font-mono">{chamberTemp} mK</div>
            <p className="text-[11px] text-slate-400">Dilution stage stability: ±0.02 mK</p>
          </div>

          <div className={`p-5 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-2`}>
            <span className="text-xs text-slate-400 font-mono flex items-center justify-between">
              <span>SOLENOID B-FIELD</span>
              <span className="text-emerald-400 font-bold">SUPERCONDUCTING</span>
            </span>
            <div className="text-3xl font-extrabold text-emerald-400 font-mono">{magneticField} T</div>
            <p className="text-[11px] text-slate-400">Vector magnet alignment: Nominal</p>
          </div>

          <div className={`p-5 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-2`}>
            <span className="text-xs text-slate-400 font-mono flex items-center justify-between">
              <span>EXCITATION LASER</span>
              <span className="text-indigo-400 font-bold">PULSED</span>
            </span>
            <div className="text-3xl font-extrabold text-indigo-400 font-mono">{laserPower} mW</div>
            <p className="text-[11px] text-slate-400">Wavelength: {frequency} nm</p>
          </div>

          <div className={`p-5 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-2`}>
            <span className="text-xs text-slate-400 font-mono flex items-center justify-between">
              <span>PHOTON COUNT RATE</span>
              <span className="text-amber-400 font-bold">SNSPD</span>
            </span>
            <div className="text-3xl font-extrabold text-amber-400 font-mono">1.84 MHz</div>
            <p className="text-[11px] text-slate-400">Dark count rate: &lt; 10 cps</p>
          </div>
        </div>

        {/* Live Oscilloscope & Spectrogram Canvas */}
        <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-4`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">
                Quantum State Interference Waveform & Fluorescence Decay
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">64.0 GS/s DIGITIZER</span>
          </div>

          {/* Oscilloscope Grid Display */}
          <div className="h-64 w-full bg-black/80 rounded-2xl border border-emerald-900/50 relative overflow-hidden flex items-center justify-center p-4">
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)`,
                backgroundSize: '32px 32px',
              }}
            />

            {/* Live Waveform SVG Curve */}
            <svg className="w-full h-full relative z-10" preserveAspectRatio="none" viewBox="0 0 800 200">
              <path
                d="M 0 100 Q 100 20, 200 100 T 400 100 T 600 100 T 800 100"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                className="animate-pulse"
              />
              <path
                d="M 0 100 Q 100 160, 200 100 T 400 100 T 600 100 T 800 100"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="1.5"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>

        {/* Interactive Parameter Tuners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-4`}>
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Laser Attenuator & Optical Polarization</span>
            </h4>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Laser Output:</span>
                  <span className="text-emerald-400 font-bold">{laserPower} mW</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={150}
                  step={0.5}
                  value={laserPower}
                  onChange={(e) => setLaserPower(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Excitation Wavelength:</span>
                  <span className="text-cyan-400 font-bold">{frequency} nm</span>
                </div>
                <input
                  type="range"
                  min={400}
                  max={800}
                  step={0.5}
                  value={frequency}
                  onChange={(e) => setFrequency(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-4`}>
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>Superconducting Magnet Vector</span>
            </h4>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Magnetic Field Strength (Z-Axis):</span>
                  <span className="text-indigo-400 font-bold">{magneticField} T</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={12}
                  step={0.1}
                  value={magneticField}
                  onChange={(e) => setMagneticField(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="p-3 rounded-2xl bg-black/40 border border-slate-800 text-slate-300">
                <span className="text-[10px] text-slate-500 block">LARMOR PRECESSION FREQUENCY</span>
                <span className="font-bold text-white">162.4 MHz / Tesla</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
