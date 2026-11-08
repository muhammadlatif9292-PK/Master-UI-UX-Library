/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useScientific } from '../ScientificContext';
import { Activity, Play, Pause, RefreshCw, Sliders } from 'lucide-react';

export const WaveformControls: React.FC = () => {
  const { familyConfig } = useScientific();

  const [waveType, setWaveType] = useState<'sine' | 'square' | 'triangle' | 'sawtooth' | 'chirp'>('sine');
  const [frequency, setFrequency] = useState(5.0); // Hz
  const [amplitude, setAmplitude] = useState(1.5); // V
  const [phase, setPhase] = useState(0); // Deg
  const [offset, setOffset] = useState(0.0); // V
  const [isPlaying, setIsPlaying] = useState(true);
  const [triggerMode, setTriggerMode] = useState<'AUTO' | 'NORM' | 'SINGLE'>('AUTO');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Draw real-time canvas oscilloscope
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Clear Canvas
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, width, height);

      // Draw Oscilloscope Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;

      // Vertical Grid Lines
      const gridXStep = width / 10;
      for (let x = 0; x <= width; x += gridXStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal Grid Lines
      const gridYStep = height / 8;
      for (let y = 0; y <= height; y += gridYStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center Axes
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Render Active Waveform Path
      ctx.strokeStyle = familyConfig.accentColorHex || '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = familyConfig.accentColorHex || '#06b6d4';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const phaseRad = (phase * Math.PI) / 180;
      const ampScale = (amplitude / 3) * (height / 2 - 20); // Scale 3V max to canvas half height
      const t = timeRef.current;

      for (let x = 0; x < width; x++) {
        const normX = x / width;
        const cycle = normX * frequency * Math.PI * 2 + t * frequency * 2 + phaseRad;

        let yVal = 0;
        if (waveType === 'sine') {
          yVal = Math.sin(cycle);
        } else if (waveType === 'square') {
          yVal = Math.sin(cycle) >= 0 ? 1 : -1;
        } else if (waveType === 'triangle') {
          yVal = Math.asin(Math.sin(cycle)) / (Math.PI / 2);
        } else if (waveType === 'sawtooth') {
          yVal = ((cycle / (Math.PI * 2)) % 1) * 2 - 1;
        } else if (waveType === 'chirp') {
          yVal = Math.sin(cycle * (1 + normX * 2)) + (Math.random() * 0.1 - 0.05);
        }

        const canvasY = centerY - yVal * ampScale - offset * 15;
        if (x === 0) {
          ctx.moveTo(x, canvasY);
        } else {
          ctx.lineTo(x, canvasY);
        }
      }

      ctx.stroke();
      ctx.shadowBlur = 0;

      if (isPlaying) {
        timeRef.current += 0.01;
      }
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [waveType, frequency, amplitude, phase, offset, isPlaying, familyConfig]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className={`text-lg font-bold ${familyConfig.textPrimary} flex items-center gap-2`}>
            <Activity className={`w-5 h-5 ${familyConfig.accentText}`} />
            Waveform Generator & Scope Controls
          </h3>
          <p className={`text-xs ${familyConfig.textSecondary}`}>
            Real-time interactive oscilloscope with wave function synthesis, frequency modulation, and trigger modes.
          </p>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 ${familyConfig.accentClass}`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isPlaying ? 'FREEZE WAVE' : 'RUN WAVE'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Canvas Display */}
        <div className={`lg:col-span-2 p-4 rounded-xl ${familyConfig.cardClass} flex flex-col justify-between`}>
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="font-bold opacity-80">CHANNEL 1 OSCILLOSCOPE [CH1]</span>
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-cyan-400 font-bold">Vpp: {(amplitude * 2).toFixed(2)} V</span>
              <span className="opacity-40">|</span>
              <span className="opacity-60">FREQ: {frequency.toFixed(2)} Hz</span>
            </div>
          </div>

          <div className="relative w-full overflow-hidden rounded-lg border border-white/10">
            <canvas
              ref={canvasRef}
              width={600}
              height={260}
              className="w-full h-auto block bg-slate-950"
            />

            {/* Scope Overlay Badges */}
            <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/30">
              {waveType.toUpperCase()} WAVE • {triggerMode} TRIGGER
            </div>
          </div>

          {/* Wave Selector Tabs */}
          <div className="mt-3 flex flex-wrap gap-1.5 justify-between items-center text-xs font-mono">
            <div className="flex gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
              {(['sine', 'square', 'triangle', 'sawtooth', 'chirp'] as const).map((wt) => (
                <button
                  key={wt}
                  onClick={() => setWaveType(wt)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold capitalize transition-all ${
                    waveType === wt
                      ? `${familyConfig.accentClass}`
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {wt}
                </button>
              ))}
            </div>

            {/* Trigger Mode */}
            <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 text-[10px]">
              <span className="px-2 opacity-50">TRIGGER:</span>
              {(['AUTO', 'NORM', 'SINGLE'] as const).map((tm) => (
                <button
                  key={tm}
                  onClick={() => setTriggerMode(tm)}
                  className={`px-2 py-0.5 rounded font-bold ${
                    triggerMode === tm ? 'bg-cyan-500/30 text-cyan-300' : 'text-white/40'
                  }`}
                >
                  {tm}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Signal Parameter Sliders */}
        <div className={`p-4 rounded-xl ${familyConfig.cardClass} space-y-4`}>
          <h4 className="text-xs font-mono font-bold opacity-80 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-cyan-400" /> SIGNAL SYNTHESIS PARAMETERS
          </h4>

          {/* Frequency Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="opacity-70">FREQUENCY (Hz):</span>
              <span className="text-cyan-400 font-bold">{frequency.toFixed(1)} Hz</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.1"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Amplitude Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="opacity-70">AMPLITUDE (V):</span>
              <span className="text-cyan-400 font-bold">{amplitude.toFixed(2)} V</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.05"
              value={amplitude}
              onChange={(e) => setAmplitude(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Phase Shift Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="opacity-70">PHASE SHIFT (°):</span>
              <span className="text-cyan-400 font-bold">{phase}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="5"
              value={phase}
              onChange={(e) => setPhase(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          {/* Offset Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="opacity-70">DC OFFSET (V):</span>
              <span className="text-cyan-400 font-bold">{offset.toFixed(2)} V</span>
            </div>
            <input
              type="range"
              min="-2.0"
              max="2.0"
              step="0.1"
              value={offset}
              onChange={(e) => setOffset(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="pt-2 border-t border-white/10 text-[10px] font-mono opacity-50">
            DAC Output Bandwidth: 100 MHz • Sample Depth: 16-Bit
          </div>
        </div>
      </div>
    </div>
  );
};
