/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useScientific } from '../ScientificContext';
import { Settings2, RefreshCw, Flame, Wind, CheckCircle2 } from 'lucide-react';

export const ProcessControls: React.FC = () => {
  const { familyConfig } = useScientific();

  const [setPoint, setSetPoint] = useState(350.0); // °C target
  const [processVar, setProcessVar] = useState(348.2); // °C actual
  const [autoPID, setAutoPID] = useState(true);
  const [pGain, setPGain] = useState(2.5);
  const [iGain, setIGain] = useState(0.8);
  const [dGain, setDGain] = useState(0.15);

  const [valveOpenPct, setValveOpenPct] = useState(45); // %

  // PID Loop simulation convergence
  useEffect(() => {
    const interval = setInterval(() => {
      setProcessVar((pv) => {
        const error = setPoint - pv;
        const correction = error * 0.15 + (Math.random() - 0.5) * 0.2;
        return Number((pv + correction).toFixed(2));
      });
    }, 400);
    return () => clearInterval(interval);
  }, [setPoint]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className={`text-lg font-bold ${familyConfig.textPrimary} flex items-center gap-2`}>
            <Settings2 className={`w-5 h-5 ${familyConfig.accentText}`} />
            Chemical Reaction & Thermal Process Controls
          </h3>
          <p className={`text-xs ${familyConfig.textSecondary}`}>
            Closed-loop PID thermal regulators, set-point convergence feedback, and mass flow valves.
          </p>
        </div>

        <button
          onClick={() => setAutoPID(!autoPID)}
          className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 border ${
            autoPID
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${autoPID ? 'animate-spin' : ''}`} />
          PID AUTO-TUNE: {autoPID ? 'ACTIVE' : 'MANUAL OVERRIDE'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* PID Loop Controller */}
        <div className={`p-4 rounded-xl ${familyConfig.cardClass} space-y-3`}>
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="font-bold opacity-80 flex items-center gap-1">
              <Flame className="w-4 h-4 text-amber-400" /> THERMAL HEATER PID
            </span>
            <span className="text-emerald-400 font-bold">CONVERGING</span>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono">
            <div className="p-2.5 rounded bg-black/40 border border-white/5">
              <span className="text-[10px] opacity-50 block">TARGET SETPOINT (SP)</span>
              <span className="text-lg font-bold text-amber-400">{setPoint.toFixed(1)} °C</span>
            </div>
            <div className="p-2.5 rounded bg-black/40 border border-white/5">
              <span className="text-[10px] opacity-50 block">PROCESS VALUE (PV)</span>
              <span className="text-lg font-bold text-cyan-400">{processVar.toFixed(1)} °C</span>
            </div>
          </div>

          {/* SP Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="opacity-60">ADJUST TARGET TEMP:</span>
              <span className="text-amber-400 font-bold">{setPoint} °C</span>
            </div>
            <input
              type="range"
              min="100"
              max="600"
              step="5"
              value={setPoint}
              onChange={(e) => setSetPoint(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          {/* Gain Coefficients */}
          <div className="grid grid-cols-3 gap-2 text-[10px] font-mono pt-2 border-t border-white/10">
            <div>
              <span className="opacity-50 block">P (PROPORTIONAL)</span>
              <span className="text-white font-bold">{pGain}</span>
            </div>
            <div>
              <span className="opacity-50 block">I (INTEGRAL)</span>
              <span className="text-white font-bold">{iGain}</span>
            </div>
            <div>
              <span className="opacity-50 block">D (DERIVATIVE)</span>
              <span className="text-white font-bold">{dGain}</span>
            </div>
          </div>
        </div>

        {/* Mass Flow Valve Controller */}
        <div className={`p-4 rounded-xl ${familyConfig.cardClass} space-y-3`}>
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="font-bold opacity-80 flex items-center gap-1">
              <Wind className="w-4 h-4 text-cyan-400" /> MASS FLOW VALVE [VALVE-04]
            </span>
            <span className="text-cyan-400 font-bold">{valveOpenPct}% OPEN</span>
          </div>

          <div className="p-3 rounded bg-black/40 border border-white/5 font-mono text-xs space-y-2">
            <div className="flex justify-between">
              <span className="opacity-60">ARGON CARRIER GAS:</span>
              <span className="text-cyan-400 font-bold">{(valveOpenPct * 0.82).toFixed(1)} sccm</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">CHAMBER PRESSURE:</span>
              <span className="text-white font-bold">10.4 mTorr</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="opacity-60">VALVE APERTURE:</span>
              <span className="text-cyan-400 font-bold">{valveOpenPct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={valveOpenPct}
              onChange={(e) => setValveOpenPct(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>

        {/* Reaction Safety Interlock Status */}
        <div className={`p-4 rounded-xl ${familyConfig.cardClass} flex flex-col justify-between space-y-2`}>
          <span className="text-xs font-mono font-bold opacity-80">AUTOMATED SAFETY INTERLOCKS</span>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-black/40">
              <span className="opacity-80">OVER-PRESSURE SHUTOFF</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ARMED
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-black/40">
              <span className="opacity-80">THERMAL RUNAWAY CUTOFF</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ARMED
              </span>
            </div>
          </div>

          <div className="p-2 rounded bg-emerald-950/40 border border-emerald-800/40 text-[10px] font-mono text-emerald-300">
            ✓ Reaction chamber parameters locked within nominal safe tolerance.
          </div>
        </div>
      </div>
    </div>
  );
};
