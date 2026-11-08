/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StyleRecipe } from '../types';
import { Mic, MicOff, Volume2, VolumeX, Activity, Sparkles, Radio, Zap } from 'lucide-react';

interface VoiceStateProps {
  recipe: StyleRecipe;
  isListeningDefault?: boolean;
  transcription?: string;
  latencyMs?: number;
}

export function VoiceState({
  recipe,
  isListeningDefault = true,
  transcription = "Let's inspect the multimodal token throughput and verify audio buffer synchronization.",
  latencyMs = 48,
}: VoiceStateProps) {
  const [isListening, setIsListening] = useState(isListeningDefault);
  const [isMuted, setIsMuted] = useState(false);
  const [audioBars, setAudioBars] = useState<number[]>([15, 30, 60, 80, 45, 90, 75, 40, 20, 65, 85, 30]);

  // Audio waveform animation simulation when active
  useEffect(() => {
    if (!isListening || isMuted) {
      setAudioBars(new Array(12).fill(10));
      return;
    }

    const interval = setInterval(() => {
      setAudioBars(
        Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 15)
      );
    }, 120);

    return () => clearInterval(interval);
  }, [isListening, isMuted]);

  return (
    <div className={`p-5 rounded-2xl border space-y-4 ${recipe.borderClass} ${recipe.cardClass}`}>
      {/* Top Header Telemetry */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg border ${
            isListening && !isMuted
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 animate-pulse'
              : 'bg-zinc-800 text-zinc-500 border-zinc-700'
          }`}>
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs text-white">LIVE BI-DIRECTIONAL VOICE SESSION</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                PCM 24kHz / Opus
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">Gemini 2.5 Flash Live API WebSocket Stream</p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400">
          <div className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            <span>{latencyMs}ms voice RTT</span>
          </div>
        </div>
      </div>

      {/* Real-time Waveform Canvas Visualizer */}
      <div className="py-6 px-4 rounded-xl bg-black/60 border border-white/10 flex flex-col items-center justify-center space-y-4">
        {/* Equalizer Frequency Bars */}
        <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-sm">
          {audioBars.map((height, idx) => (
            <div
              key={idx}
              className={`w-2.5 rounded-full transition-all duration-100 ${
                isListening && !isMuted
                  ? 'bg-gradient-to-t from-sky-500 to-emerald-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                  : 'bg-zinc-800'
              }`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        {/* Live Audio Transcription Text Stream */}
        <div className="w-full text-center max-w-md">
          <p className="text-xs text-zinc-300 font-mono italic">
            "{transcription}"
          </p>
        </div>
      </div>

      {/* Voice Session Controls */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsListening(!isListening)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              isListening
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>{isListening ? 'End Voice Call' : 'Start Voice Call'}</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isMuted
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
            }`}
            title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
          <span>VAD: Ultra-Sensitive</span>
          <span>•</span>
          <span>AEC: Active</span>
        </div>
      </div>
    </div>
  );
}
