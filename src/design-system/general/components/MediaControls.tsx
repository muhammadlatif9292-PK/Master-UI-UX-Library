/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Music,
  Maximize2,
  ListMusic,
  Gauge,
  Sparkles,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverUrl?: string;
  format: string;
  bitrate: string;
}

export const MediaControls: React.FC = () => {
  const { recipeConfig, stateMode, isCompact } = useGeneral();

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(48);
  const [duration, setDuration] = useState(214);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const tracks: TrackItem[] = [
    {
      id: 'trk-1',
      title: 'Quantum Resonance Phase',
      artist: 'Aetheria Soundworks',
      album: 'Neural Waves Vol. 4',
      duration: 214,
      format: 'FLAC 24-bit',
      bitrate: '96.0 kHz',
    },
    {
      id: 'trk-2',
      title: 'Silicon Horizon',
      artist: 'Kroma Synth',
      album: 'Cybernetic Drift',
      duration: 182,
      format: 'WAV 32-bit',
      bitrate: '48.0 kHz',
    },
    {
      id: 'trk-3',
      title: 'Deep Matrix Ambient',
      artist: 'Solis Labs',
      album: 'Subsurface Echoes',
      duration: 295,
      format: 'AAC 320k',
      bitrate: '44.1 kHz',
    },
  ];

  const currentTrack = tracks[currentTrackIndex];

  // Simulated progress timer when playing
  useEffect(() => {
    let interval: any;
    if (isPlaying && stateMode !== 'disabled' && stateMode !== 'error' && stateMode !== 'loading') {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackSpeed, stateMode]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = Math.floor(secs % 60);
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  if (stateMode === 'loading') {
    return (
      <div className={`p-8 rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} flex flex-col items-center justify-center gap-3 text-center`}>
        <Loader2 className={`w-8 h-8 animate-spin ${recipeConfig.accentText}`} />
        <span className={`text-sm font-semibold ${recipeConfig.textPrimary}`}>Buffering Audio Stream...</span>
        <span className={`text-xs ${recipeConfig.textSecondary}`}>Decoding 24-bit lossless FLAC headers</span>
      </div>
    );
  }

  if (stateMode === 'error') {
    return (
      <div className="p-8 rounded-3xl border border-rose-800 bg-rose-950/40 flex flex-col items-center justify-center gap-3 text-center">
        <AlertCircle className="w-8 h-8 text-rose-400" />
        <span className="text-sm font-bold text-rose-200">Media Stream Decode Error (CODE: 0x8007)</span>
        <span className="text-xs text-rose-300">The remote audio buffer was interrupted during initialization.</span>
        <button onClick={() => setIsPlaying(false)} className="px-4 py-1.5 bg-rose-800 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold mt-2">
          Retry Audio Pipeline
        </button>
      </div>
    );
  }

  if (stateMode === 'empty') {
    return (
      <div className={`p-8 rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} flex flex-col items-center justify-center gap-3 text-center`}>
        <Music className={`w-8 h-8 ${recipeConfig.textSecondary}`} />
        <span className={`text-sm font-semibold ${recipeConfig.textPrimary}`}>No Media Track Loaded</span>
        <span className={`text-xs ${recipeConfig.textSecondary}`}>Select or drag an audio asset onto the player to start streaming</span>
      </div>
    );
  }

  const isDisabled = stateMode === 'disabled';

  return (
    <div className={`rounded-3xl border p-6 ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl transition-all space-y-6 ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Top Header: Track Meta & Audio Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl ${recipeConfig.accentBorder} border flex items-center justify-center bg-black/40 shadow-inner flex-shrink-0`}>
            <Music className={`w-7 h-7 ${recipeConfig.accentText} ${isPlaying ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-bold text-base md:text-lg ${recipeConfig.textPrimary} tracking-tight`}>
                {currentTrack.title}
              </h3>
              {isPlaying && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </div>
            <p className={`text-xs ${recipeConfig.textSecondary} mt-0.5`}>
              {currentTrack.artist} • <span className="opacity-80">{currentTrack.album}</span>
            </p>
          </div>
        </div>

        {/* Audio Quality Badges */}
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border ${recipeConfig.badgeBg}`}>
            {currentTrack.format}
          </span>
          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono text-xs border ${recipeConfig.border} bg-black/30 ${recipeConfig.textSecondary}`}>
            {currentTrack.bitrate}
          </span>
        </div>
      </div>

      {/* Simulated Waveform & Progress Scrubber */}
      <div className="space-y-2">
        <div className="flex items-end gap-1 h-12 px-2 bg-black/30 rounded-xl border border-white/5 overflow-hidden">
          {Array.from({ length: 48 }).map((_, idx) => {
            const progressRatio = currentTime / duration;
            const barRatio = idx / 48;
            const isPassed = barRatio <= progressRatio;
            const heightMultiplier = Math.sin(idx * 0.4) * 0.4 + 0.6;
            const dynamicHeight = Math.max(15, heightMultiplier * 100);

            return (
              <div
                key={idx}
                onClick={() => setCurrentTime((idx / 48) * duration)}
                style={{ height: `${dynamicHeight}%` }}
                className={`flex-1 rounded-full cursor-pointer transition-all duration-150 ${
                  isPassed
                    ? isPlaying
                      ? 'bg-gradient-to-t from-indigo-500 to-cyan-400'
                      : 'bg-indigo-500'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              />
            );
          })}
        </div>

        {/* Time Readout */}
        <div className={`flex items-center justify-between text-xs font-mono ${recipeConfig.textSecondary} px-1`}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Playback Deck */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-white/5">
        {/* Left: Speed & Shuffle/Loop */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`p-2 rounded-xl border transition-colors ${
              isShuffle ? `${recipeConfig.accentBg}` : `border-transparent hover:bg-white/5 ${recipeConfig.textSecondary}`
            }`}
            title="Toggle Shuffle"
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsLooping(!isLooping)}
            className={`p-2 rounded-xl border transition-colors ${
              isLooping ? `${recipeConfig.accentBg}` : `border-transparent hover:bg-white/5 ${recipeConfig.textSecondary}`
            }`}
            title="Toggle Loop"
          >
            <Repeat className="w-4 h-4" />
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
            <Gauge className="w-3.5 h-3.5 text-slate-500 ml-1" />
            {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-colors ${
                  playbackSpeed === spd
                    ? `${recipeConfig.accentBg}`
                    : `text-slate-400 hover:text-white`
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Center: Main Transport Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
              setCurrentTime(0);
            }}
            className={`p-2.5 rounded-2xl bg-black/40 hover:bg-white/10 border ${recipeConfig.border} ${recipeConfig.textPrimary} transition-all active:scale-95`}
            title="Previous Track"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-4 rounded-2xl ${recipeConfig.accentBg} shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            )}
          </button>

          <button
            onClick={() => {
              setCurrentTrackIndex((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
              setCurrentTime(0);
            }}
            className={`p-2.5 rounded-2xl bg-black/40 hover:bg-white/10 border ${recipeConfig.border} ${recipeConfig.textPrimary} transition-all active:scale-95`}
            title="Next Track"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Volume Deck */}
        <div className="flex items-center gap-3 w-full sm:w-48">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-xl hover:bg-white/10 ${recipeConfig.textSecondary}`}
          >
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-full accent-indigo-500 h-1.5 bg-black/50 rounded-lg cursor-pointer"
          />
          <span className={`text-[10px] font-mono w-7 text-right ${recipeConfig.textSecondary}`}>
            {isMuted ? 0 : volume}%
          </span>
        </div>
      </div>
    </div>
  );
};
