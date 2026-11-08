/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useScientific } from '../ScientificContext';
import { Binary, RotateCcw, Award, CheckCircle, ArrowRightLeft } from 'lucide-react';

export const MeasurementDisplays: React.FC = () => {
  const { familyConfig, unitsSystem, setUnitsSystem, scientificNotation, setScientificNotation } =
    useScientific();

  const [rawValue, setRawValue] = useState(4815.23941);
  const [uncertainty, setUncertainty] = useState(0.00018);
  const [tareOffset, setTareOffset] = useState(0);
  const [peakValue, setPeakValue] = useState(4815.23941);
  const [unitMode, setUnitMode] = useState<'GHz' | 'MHz' | 'THz'>('GHz');

  // Real-time micro-fluctuation simulator
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.5) * 0.0008;
      setRawValue((prev) => {
        const next = prev + delta;
        setPeakValue((pk) => Math.max(pk, next));
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const displayVal = rawValue - tareOffset;

  const getScaledValue = (val: number) => {
    if (unitMode === 'MHz') return val * 1000;
    if (unitMode === 'THz') return val / 1000;
    return val;
  };

  const getScaledUncertainty = (unc: number) => {
    if (unitMode === 'MHz') return unc * 1000;
    if (unitMode === 'THz') return unc / 1000;
    return unc;
  };

  const formatNumber = (val: number) => {
    if (scientificNotation) {
      return val.toExponential(6);
    }
    return val.toFixed(5);
  };

  const handleTare = () => {
    setTareOffset(rawValue);
  };

  const handleResetTare = () => {
    setTareOffset(0);
  };

  const handleResetPeak = () => {
    setPeakValue(rawValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className={`text-lg font-bold ${familyConfig.textPrimary} flex items-center gap-2`}>
            <Binary className={`w-5 h-5 ${familyConfig.accentText}`} />
            High-Precision Measurement Displays
          </h3>
          <p className={`text-xs ${familyConfig.textSecondary}`}>
            Multi-decimal sub-atomic precision readouts with statistical uncertainty bounds (± σ), Tare offsets, and Peak Hold memory.
          </p>
        </div>

        {/* Global toggles */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setScientificNotation(!scientificNotation)}
            className={`px-2.5 py-1 rounded border transition-colors ${
              scientificNotation
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-white/5 border-white/10 text-white/70'
            }`}
          >
            Scientific (1.2e+N)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Display Console */}
        <div className={`lg:col-span-2 p-5 rounded-xl ${familyConfig.cardClass} relative overflow-hidden`}>
          {/* Top Info Header */}
          <div className="flex items-center justify-between text-xs font-mono mb-4">
            <span className="opacity-60">RESONANCE FREQUENCY SPECTROMETER</span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> STABLE SIGNAL
              </span>
              <span className="opacity-40">|</span>
              <span className="opacity-60">SAMPLES: 10,000/s</span>
            </div>
          </div>

          {/* Huge Number Readout */}
          <div className="p-6 rounded-lg bg-black/60 border border-white/10 shadow-inner my-2">
            <div className="flex justify-between items-start mb-2 text-xs font-mono opacity-50">
              <span>MEASUREMENT READOUT</span>
              <span>TARE OFFSET: {tareOffset > 0 ? tareOffset.toFixed(5) : '0.00000'}</span>
            </div>

            <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
              <span className={`text-4xl md:text-5xl font-mono font-bold tracking-tight ${familyConfig.textPrimary}`}>
                {formatNumber(getScaledValue(displayVal))}
              </span>
              <span className={`text-xl font-mono font-bold ${familyConfig.accentText}`}>
                {unitMode}
              </span>
            </div>

            {/* Uncertainty Bounds */}
            <div className="mt-3 text-sm font-mono text-cyan-400 flex items-center gap-2">
              <span>UNCERTAINTY BOUNDS:</span>
              <span className="font-bold">
                ± {formatNumber(getScaledUncertainty(uncertainty))} {unitMode} (99.7% CI)
              </span>
            </div>
          </div>

          {/* Control Strip */}
          <div className="mt-4 flex flex-wrap gap-2 justify-between items-center text-xs font-mono pt-3 border-t border-white/10">
            {/* Unit Toggle Buttons */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
              {(['MHz', 'GHz', 'THz'] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnitMode(u)}
                  className={`px-3 py-1 rounded font-bold transition-all ${
                    unitMode === u
                      ? `${familyConfig.accentClass}`
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>

            {/* Zero/Tare and Peak Hold Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleTare}
                className="px-3 py-1.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> TARE (ZERO)
              </button>
              {tareOffset > 0 && (
                <button
                  onClick={handleResetTare}
                  className="px-2 py-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  CLEAR TARE
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Peak Hold & Auxiliary Telemetry Card */}
        <div className={`p-5 rounded-xl ${familyConfig.cardClass} flex flex-col justify-between space-y-4`}>
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="font-bold opacity-80 flex items-center gap-1">
                <Award className="w-4 h-4 text-amber-400" /> PEAK HOLD MEMORY
              </span>
              <button
                onClick={handleResetPeak}
                className="text-[10px] text-amber-400 hover:underline"
              >
                RESET PEAK
              </button>
            </div>

            <div className="p-4 rounded-lg bg-black/50 border border-amber-500/20">
              <div className="text-[10px] font-mono opacity-50 mb-1">MAXIMUM RECORDED PEAK</div>
              <div className="text-2xl font-mono font-bold text-amber-300">
                {formatNumber(getScaledValue(peakValue))} <span className="text-sm">{unitMode}</span>
              </div>
            </div>
          </div>

          {/* Statistical Distribution Summary */}
          <div className="space-y-2 text-xs font-mono pt-3 border-t border-white/10">
            <div className="flex justify-between">
              <span className="opacity-60">SIGMA (σ) DRIFT:</span>
              <span className="text-cyan-400">0.000042</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">STD DEVIATION:</span>
              <span className={familyConfig.textPrimary}>0.000018</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">SIGNAL STABILITY:</span>
              <span className="text-emerald-400 font-bold">99.98%</span>
            </div>
          </div>

          <div className="p-2 rounded bg-cyan-950/40 border border-cyan-800/40 text-[10px] font-mono text-cyan-300">
            NIST Standard Reference Material #8421 Traceable Calibration.
          </div>
        </div>
      </div>
    </div>
  );
};
