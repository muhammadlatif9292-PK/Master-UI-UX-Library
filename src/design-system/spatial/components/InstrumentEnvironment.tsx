/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, Activity, Navigation, ArrowUp, ArrowDown, RotateCcw, ShieldCheck } from 'lucide-react';
import { useSpatial } from '../SpatialContext';
import { InstrumentTelemetry } from '../types';

export const InstrumentEnvironment: React.FC = () => {
  const { mode, reducedMotion } = useSpatial();

  const [telemetry, setTelemetry] = useState<InstrumentTelemetry>({
    pitch: 5,
    roll: -12,
    heading: 284,
    altitude: 12450,
    airspeed: 320,
    gForce: 1.05,
    systemStatus: 'NOMINAL',
  });

  const adjustPitch = (delta: number) => {
    setTelemetry((prev) => ({
      ...prev,
      pitch: Math.max(-45, Math.min(45, prev.pitch + delta)),
    }));
  };

  const adjustRoll = (delta: number) => {
    setTelemetry((prev) => ({
      ...prev,
      roll: ((prev.roll + delta + 180) % 360) - 180,
    }));
  };

  const resetAttitude = () => {
    setTelemetry({
      pitch: 0,
      roll: 0,
      heading: 270,
      altitude: 10000,
      airspeed: 300,
      gForce: 1.0,
      systemStatus: 'NOMINAL',
    });
  };

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-emerald-400">
            <Compass className="w-4 h-4" />
            <span className="font-bold text-white uppercase">Avionics Instruments (2D Flat Digital Gauges)</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
            {telemetry.systemStatus}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">PITCH / ROLL</span>
            <span className="text-white font-bold text-sm">
              {telemetry.pitch}° / {telemetry.roll}°
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">HEADING</span>
            <span className="text-emerald-400 font-bold text-sm">{telemetry.heading}° HDG</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">ALTITUDE</span>
            <span className="text-sky-400 font-bold text-sm">{telemetry.altitude} FT</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-500 block text-[10px]">AIRSPEED</span>
            <span className="text-amber-400 font-bold text-sm">{telemetry.airspeed} KTS</span>
          </div>
        </div>
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  return (
    <div className="relative w-full h-[480px] p-6 rounded-3xl bg-zinc-950/95 border border-zinc-800 flex flex-col justify-between select-none overflow-hidden [perspective:1000px]">
      {/* Header */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-emerald-400">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span className="font-bold text-white uppercase">3D AVIONICS ARTIFICIAL HORIZON COCKPIT</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => adjustPitch(5)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 cursor-pointer"
            title="Pitch Up"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => adjustPitch(-5)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 cursor-pointer"
            title="Pitch Down"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetAttitude}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 cursor-pointer"
            title="Reset Horizon"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3D Cockpit Horizon Gyro Viewport */}
      <div className="relative w-full max-w-lg mx-auto h-72 my-auto flex items-center justify-center rounded-3xl border-2 border-emerald-500/50 bg-black overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.25)] font-mono">
        {/* Pitch/Roll Dynamic Horizon Plane */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  rotate: -telemetry.roll,
                  y: telemetry.pitch * 3,
                }
          }
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute inset-x-[-50%] top-[-50%] bottom-[-50%] flex flex-col pointer-events-none"
        >
          {/* Sky (Blue) */}
          <div className="h-1/2 bg-sky-900/80 border-b-2 border-emerald-400" />
          {/* Ground (Dark Amber/Brown) */}
          <div className="h-1/2 bg-amber-950/80" />
        </motion.div>

        {/* Static Aircraft Reticle Cursor Overlay */}
        <div className="absolute z-20 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-0.5 bg-emerald-400 shadow-[0_0_10px_#10b981]" />
          <div className="absolute w-4 h-4 border-2 border-emerald-400 rounded-full bg-emerald-950" />
        </div>

        {/* Pitch Ladder Indicators */}
        <div className="absolute z-10 text-emerald-400 text-[10px] space-y-8 pointer-events-none text-center font-bold">
          <div>+20° ————</div>
          <div>+10° ————</div>
          <div>-10° ————</div>
          <div>-20° ————</div>
        </div>

        {/* Left Tape: Airspeed */}
        <div className="absolute left-3 inset-y-6 w-14 bg-black/80 border border-emerald-500/40 rounded-xl p-2 z-20 text-[10px] text-emerald-300 flex flex-col justify-between items-center">
          <span className="text-[9px] text-zinc-400">SPEED</span>
          <span className="font-bold text-sm text-white">{telemetry.airspeed}</span>
          <span className="text-[9px]">KTS</span>
        </div>

        {/* Right Tape: Altitude */}
        <div className="absolute right-3 inset-y-6 w-16 bg-black/80 border border-emerald-500/40 rounded-xl p-2 z-20 text-[10px] text-emerald-300 flex flex-col justify-between items-center">
          <span className="text-[9px] text-zinc-400">ALT</span>
          <span className="font-bold text-sm text-white">{telemetry.altitude}</span>
          <span className="text-[9px]">FT</span>
        </div>
      </div>

      {/* Footer Readouts */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
        <span>Attitude: P({telemetry.pitch}°) R({telemetry.roll}°)</span>
        <span className="text-emerald-400 font-bold">G-FORCE: {telemetry.gForce}G</span>
      </div>
    </div>
  );
};
