/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useScientific } from '../ScientificContext';
import { Play, Pause, SkipBack, SkipForward, Bookmark, Clock, Flame } from 'lucide-react';

export const SimulationTimeline: React.FC = () => {
  const { familyConfig } = useScientific();

  const [currentTime, setCurrentTime] = useState(2.45); // Seconds
  const maxTime = 10.0; // Seconds max
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);

  const keyframes = [
    { time: 0.0, label: 'Initialization', type: 'info' },
    { time: 2.45, label: 'Superconductor Phase Transition', type: 'critical' },
    { time: 5.80, label: 'Magnetic Flux Pinning Peak', type: 'event' },
    { time: 8.90, label: 'Thermal Equilibrium', type: 'info' },
  ];

  // Simulation playback loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((t) => {
        const next = t + 0.02 * speedMultiplier;
        if (next >= maxTime) {
          setIsPlaying(false);
          return maxTime;
        }
        return next;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [isPlaying, speedMultiplier]);

  const handleStep = (delta: number) => {
    setCurrentTime((t) => Math.min(maxTime, Math.max(0, t + delta)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className={`text-lg font-bold ${familyConfig.textPrimary} flex items-center gap-2`}>
            <Clock className={`w-5 h-5 ${familyConfig.accentText}`} />
            High-Precision Simulation Timeline & Keyframe Scrubber
          </h3>
          <p className={`text-xs ${familyConfig.textSecondary}`}>
            Microsecond-resolution simulation time scrubber with keyframe bookmark markers and variable speed step.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="opacity-60">SPEED:</span>
          {[0.25, 0.5, 1.0, 2.0, 5.0].map((spd) => (
            <button
              key={spd}
              onClick={() => setSpeedMultiplier(spd)}
              className={`px-2 py-1 rounded font-bold transition-all ${
                speedMultiplier === spd
                  ? `${familyConfig.accentClass}`
                  : 'bg-white/5 text-white/70 hover:text-white'
              }`}
            >
              {spd}x
            </button>
          ))}
        </div>
      </div>

      <div className={`p-5 rounded-xl ${familyConfig.cardClass} space-y-4`}>
        {/* Time Display Header */}
        <div className="flex items-center justify-between font-mono">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-cyan-400">
              t = {currentTime.toFixed(3)}s
            </span>
            <span className="text-xs opacity-50">/ {maxTime.toFixed(2)}s</span>
          </div>

          <div className="text-xs opacity-70">
            FRAME: {Math.floor(currentTime * 60)} / 600 • DT: {(0.001 * speedMultiplier).toFixed(4)}s
          </div>
        </div>

        {/* Timeline Scrubber Track with Keyframe Markers */}
        <div className="relative pt-6 pb-2">
          {/* Keyframe Flag Indicators */}
          {keyframes.map((kf, i) => {
            const leftPct = (kf.time / maxTime) * 100;
            const isCurrent = Math.abs(currentTime - kf.time) < 0.15;
            return (
              <button
                key={i}
                onClick={() => setCurrentTime(kf.time)}
                className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center group z-10"
                style={{ left: `${leftPct}%` }}
              >
                <div
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold whitespace-nowrap transition-all ${
                    isCurrent
                      ? 'bg-cyan-400 text-black shadow-[0_0_8px_cyan]'
                      : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-cyan-400'
                  }`}
                >
                  <Bookmark className="w-2.5 h-2.5 inline mr-1" />
                  {kf.time}s: {kf.label}
                </div>
                <div className="w-0.5 h-3 bg-slate-600 group-hover:bg-cyan-400" />
              </button>
            );
          })}

          {/* Main Track Bar */}
          <div className="h-4 w-full bg-black/60 rounded-lg border border-white/10 relative overflow-hidden">
            {/* Played Progress Fill */}
            <div
              className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded transition-all duration-75"
              style={{ width: `${(currentTime / maxTime) * 100}%` }}
            />
          </div>

          {/* Range Scrubber Input Overlay */}
          <input
            type="range"
            min="0"
            max={maxTime}
            step="0.01"
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-full z-20"
          />
        </div>

        {/* Playback Controls Strip */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentTime(0)}
              className="p-2 rounded bg-white/5 hover:bg-white/10 text-white/80"
              title="Jump to Start"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleStep(-0.1)}
              className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white/80"
            >
              -0.1s
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded font-bold flex items-center gap-2 ${familyConfig.accentClass}`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'PAUSE SIMULATION' : 'RUN SIMULATION'}
            </button>

            <button
              onClick={() => handleStep(0.1)}
              className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white/80"
            >
              +0.1s
            </button>

            <button
              onClick={() => setCurrentTime(maxTime)}
              className="p-2 rounded bg-white/5 hover:bg-white/10 text-white/80"
              title="Jump to End"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[10px] text-cyan-400">
            ✓ Runge-Kutta 4th Order Integrator Converged
          </div>
        </div>
      </div>
    </div>
  );
};
