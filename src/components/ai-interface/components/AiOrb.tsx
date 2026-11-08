/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StyleRecipe } from '../types';
import { Mic, Volume2, Sparkles, BrainCircuit, AlertCircle, RefreshCw } from 'lucide-react';

export type OrbState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

interface AiOrbProps {
  recipe: StyleRecipe;
  state?: OrbState;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showControls?: boolean;
}

export function AiOrb({
  recipe,
  state = 'idle',
  size = 'lg',
  showControls = true,
}: AiOrbProps) {
  const [orbState, setOrbState] = useState<OrbState>(state);
  const [amplitude, setAmplitude] = useState(0.5);

  useEffect(() => {
    setOrbState(state);
  }, [state]);

  // Simulate subtle breathing fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setAmplitude(0.3 + Math.random() * 0.7);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    hero: 'w-64 h-64 md:w-80 md:h-80',
  };

  const getOrbGradient = () => {
    switch (orbState) {
      case 'idle':
        return 'from-sky-500 via-indigo-500 to-purple-600';
      case 'listening':
        return 'from-emerald-400 via-teal-500 to-cyan-600';
      case 'thinking':
        return 'from-violet-600 via-fuchsia-600 to-pink-500';
      case 'speaking':
        return 'from-amber-400 via-rose-500 to-orange-600';
      case 'error':
        return 'from-red-600 via-rose-600 to-amber-700';
    }
  };

  const getOrbGlow = () => {
    switch (orbState) {
      case 'idle':
        return 'shadow-[0_0_50px_rgba(56,189,248,0.35)]';
      case 'listening':
        return 'shadow-[0_0_60px_rgba(16,185,129,0.45)]';
      case 'thinking':
        return 'shadow-[0_0_70px_rgba(168,85,247,0.5)]';
      case 'speaking':
        return 'shadow-[0_0_60px_rgba(245,158,11,0.45)]';
      case 'error':
        return 'shadow-[0_0_50px_rgba(239,68,68,0.5)]';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6">
      {/* Orb Stage Canvas */}
      <div className="relative flex items-center justify-center">
        {/* Outer Halo Rings */}
        <div
          className={`absolute rounded-full transition-all duration-700 ${
            orbState === 'thinking' ? 'animate-spin' : 'animate-pulse'
          } opacity-40 border border-white/20`}
          style={{
            width: size === 'hero' ? '320px' : '220px',
            height: size === 'hero' ? '320px' : '220px',
          }}
        />

        <div
          className={`absolute rounded-full transition-all duration-500 opacity-20 border border-dashed border-sky-400`}
          style={{
            width: size === 'hero' ? '380px' : '260px',
            height: size === 'hero' ? '380px' : '260px',
            transform: `scale(${1 + amplitude * 0.1})`,
          }}
        />

        {/* Primary Pulsating Energy Core */}
        <div
          className={`relative rounded-full bg-gradient-to-tr ${getOrbGradient()} ${getOrbGlow()} ${sizeClasses[size]} flex items-center justify-center transition-all duration-500`}
          style={{
            transform:
              orbState === 'speaking' || orbState === 'listening'
                ? `scale(${0.95 + amplitude * 0.1})`
                : 'scale(1)',
          }}
        >
          {/* Inner Specular Flare */}
          <div className="absolute top-4 left-6 w-1/3 h-1/3 rounded-full bg-white/40 blur-xs pointer-events-none" />

          {/* Internal Plasma Layer */}
          <div className="w-4/5 h-4/5 rounded-full bg-black/20 backdrop-blur-xs flex items-center justify-center">
            {orbState === 'listening' && <Mic className="w-8 h-8 text-white animate-bounce" />}
            {orbState === 'thinking' && <BrainCircuit className="w-8 h-8 text-white animate-spin" />}
            {orbState === 'speaking' && <Volume2 className="w-8 h-8 text-white animate-pulse" />}
            {orbState === 'error' && <AlertCircle className="w-8 h-8 text-white" />}
            {orbState === 'idle' && <Sparkles className="w-8 h-8 text-white/80" />}
          </div>
        </div>
      </div>

      {/* State Label */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
            ORB STATE: {orbState}
          </span>
        </div>
        <p className="text-xs text-zinc-400 font-sans">
          {orbState === 'idle' && 'Ambient listening on standby'}
          {orbState === 'listening' && 'Recording audio stream buffer (48kHz)'}
          {orbState === 'thinking' && 'Synthesizing contextual embeddings'}
          {orbState === 'speaking' && 'Streaming neural audio playback (24kbps)'}
          {orbState === 'error' && 'Inference exception encountered'}
        </p>
      </div>

      {/* Interactive State Toggle Buttons */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl bg-black/40 border border-white/10 text-xs">
          {(['idle', 'listening', 'thinking', 'speaking', 'error'] as OrbState[]).map((s) => (
            <button
              key={s}
              onClick={() => setOrbState(s)}
              className={`px-3 py-1 rounded-lg font-mono text-[11px] uppercase transition-all cursor-pointer ${
                orbState === s
                  ? 'bg-sky-500 text-white font-bold shadow-xs'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
