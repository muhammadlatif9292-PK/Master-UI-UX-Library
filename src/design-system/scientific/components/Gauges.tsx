/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useScientific } from '../ScientificContext';
import { Gauge, Sliders, AlertOctagon } from 'lucide-react';

export const Gauges: React.FC = () => {
  const { familyConfig } = useScientific();

  const [pressure, setPressure] = useState(74.5); // 0 - 100 PSI
  const [temperature, setTemperature] = useState(412); // 0 - 600 K
  const [flowRate, setFlowRate] = useState(12.8); // 0 - 20 L/min
  const [targetVal, setTargetVal] = useState(85); // 0 - 100

  // Jitter slightly for realistic sensor dynamics
  useEffect(() => {
    const interval = setInterval(() => {
      setPressure((p) => Math.min(100, Math.max(0, p + (Math.random() * 1.2 - 0.6))));
      setTemperature((t) => Math.min(600, Math.max(0, t + (Math.random() * 2 - 1))));
      setFlowRate((f) => Math.min(20, Math.max(0, f + (Math.random() * 0.2 - 0.1))));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // SVG Radial Dial calculations
  const calculateNeedleAngle = (value: number, min: number, max: number) => {
    const startAngle = -120; // Deg
    const endAngle = 120; // Deg
    const pct = Math.min(1, Math.max(0, (value - min) / (max - min)));
    return startAngle + pct * (endAngle - startAngle);
  };

  const needleAngle = calculateNeedleAngle(pressure, 0, 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className={`text-lg font-bold ${familyConfig.textPrimary} flex items-center gap-2`}>
            <Gauge className={`w-5 h-5 ${familyConfig.accentText}`} />
            Precision Precision Gauges
          </h3>
          <p className={`text-xs ${familyConfig.textSecondary}`}>
            Radial dials, segmented LED arc meters, linear level bars, and target-range boundary gauges.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-mono opacity-70">Simulate Input:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={pressure}
            onChange={(e) => setPressure(Number(e.target.value))}
            className="w-24 accent-cyan-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gauge 1: Precision Radial Dial Gauge */}
        <div className={`p-4 rounded-xl ${familyConfig.cardClass} flex flex-col items-center justify-between`}>
          <div className="w-full flex justify-between items-center text-xs font-mono mb-2">
            <span className="font-bold opacity-80">RADIAL DIAL</span>
            <span className="text-cyan-400">PSI</span>
          </div>

          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Outer Dial Track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
                strokeDasharray="188.4"
                strokeDashoffset="62.8" // 240 deg arc
                strokeLinecap="round"
              />
              {/* Warning zone arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(239, 68, 68, 0.5)"
                strokeWidth="8"
                strokeDasharray="188.4"
                strokeDashoffset="170"
                strokeLinecap="round"
              />
              {/* Tick Marks */}
              {[...Array(11)].map((_, i) => {
                const angle = ((-120 + i * 24) * Math.PI) / 180;
                const x1 = 50 + 32 * Math.cos(angle);
                const y1 = 50 + 32 * Math.sin(angle);
                const x2 = 50 + 37 * Math.cos(angle);
                const y2 = 50 + 37 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>

            {/* Needle */}
            <div
              className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              <div className="w-1 h-20 bg-gradient-to-t from-transparent via-cyan-400 to-cyan-300 origin-bottom transform -translate-y-10 rounded-full shadow-[0_0_8px_cyan]" />
            </div>

            {/* Hub */}
            <div className="absolute w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-md flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
            </div>
          </div>

          <div className="text-center mt-2 font-mono">
            <span className={`text-2xl font-bold ${familyConfig.textPrimary}`}>
              {pressure.toFixed(1)}
            </span>
            <span className="text-xs opacity-60 ml-1">PSI</span>
            <div className="text-[10px] text-cyan-400">NORMAL OPERATING</div>
          </div>
        </div>

        {/* Gauge 2: Segmented Arc Gauge */}
        <div className={`p-4 rounded-xl ${familyConfig.cardClass} flex flex-col justify-between`}>
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="font-bold opacity-80">SEGMENTED ARC</span>
            <span className="text-amber-400">KELVIN</span>
          </div>

          <div className="py-2 flex flex-col items-center">
            {/* LED Arc Segments */}
            <div className="flex gap-1 items-end h-24 my-2">
              {[...Array(16)].map((_, i) => {
                const pct = ((i + 1) / 16) * 600;
                const isActive = temperature >= pct;
                const isWarning = i >= 13;
                return (
                  <div
                    key={i}
                    className={`w-3 rounded-sm transition-all duration-300 ${
                      isActive
                        ? isWarning
                          ? 'bg-red-500 shadow-[0_0_6px_red]'
                          : 'bg-amber-400 shadow-[0_0_6px_amber]'
                        : 'bg-white/10'
                    }`}
                    style={{ height: `${20 + i * 5}px` }}
                  />
                );
              })}
            </div>
          </div>

          <div className="text-center font-mono">
            <span className={`text-2xl font-bold ${familyConfig.textPrimary}`}>
              {temperature.toFixed(0)}
            </span>
            <span className="text-xs opacity-60 ml-1">K</span>
            <div className="text-[10px] text-amber-400">THERMAL EXCURSION OK</div>
          </div>
        </div>

        {/* Gauge 3: Linear Precision Bar Meter */}
        <div className={`p-4 rounded-xl ${familyConfig.cardClass} flex flex-col justify-between`}>
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="font-bold opacity-80">LINEAR LEVEL BAR</span>
            <span className="text-emerald-400">L/min</span>
          </div>

          <div className="space-y-3 my-auto">
            <div className="flex justify-between text-[10px] font-mono opacity-60">
              <span>0.0</span>
              <span>10.0</span>
              <span>20.0</span>
            </div>

            {/* Meter Bar Container */}
            <div className="h-6 w-full bg-black/60 rounded-lg border border-white/10 relative overflow-hidden p-1">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                style={{ width: `${(flowRate / 20) * 100}%` }}
              />
              {/* Grid Tick lines overlay */}
              <div className="absolute inset-0 flex justify-between px-2 pointer-events-none opacity-30">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-px h-full bg-white" />
                ))}
              </div>
            </div>

            <div className="flex justify-between text-[11px] font-mono">
              <span className="opacity-60">FLOW RATE:</span>
              <span className="text-emerald-400 font-bold">{flowRate.toFixed(2)} L/m</span>
            </div>
          </div>

          <div className="text-center font-mono pt-2 border-t border-white/5">
            <span className="text-[10px] text-emerald-400">LAMINAR FLOW LOCKED</span>
          </div>
        </div>

        {/* Gauge 4: Digital Target Range Gauge */}
        <div className={`p-4 rounded-xl ${familyConfig.cardClass} flex flex-col justify-between`}>
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="font-bold opacity-80">TARGET BOUNDARY</span>
            <span className="text-fuchsia-400">% RATIO</span>
          </div>

          <div className="space-y-3 my-auto">
            {/* Range Bar with min/max markers */}
            <div className="relative pt-4 pb-2">
              {/* Target Corridor */}
              <div className="absolute top-1 left-[70%] w-[20%] h-6 bg-fuchsia-500/20 border-x border-fuchsia-400/60 text-[8px] font-mono text-fuchsia-300 flex items-center justify-center">
                TARGET [70-90%]
              </div>

              <div className="h-4 w-full bg-black/60 rounded border border-white/10 relative overflow-hidden">
                <div
                  className="h-full bg-fuchsia-500 transition-all duration-300"
                  style={{ width: `${targetVal}%` }}
                />
              </div>
            </div>

            <div className="flex justify-between text-xs font-mono">
              <span className="opacity-60">CURRENT:</span>
              <span className="text-fuchsia-300 font-bold">{targetVal}%</span>
            </div>
          </div>

          <div className="text-center font-mono pt-2 border-t border-white/5">
            <span className="text-[10px] text-fuchsia-400">
              {targetVal >= 70 && targetVal <= 90 ? '✓ WITHIN CONVERGENCE' : '⚠️ DEVIATION DETECTED'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
