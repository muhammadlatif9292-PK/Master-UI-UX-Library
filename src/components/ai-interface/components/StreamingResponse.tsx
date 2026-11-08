/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StyleRecipe } from '../types';
import { Pause, Play, RotateCcw, Sparkles, Copy, Check, Terminal } from 'lucide-react';

interface StreamingResponseProps {
  recipe: StyleRecipe;
  fullText?: string;
  speedMs?: number;
  tokensPerSec?: number;
}

export function StreamingResponse({
  recipe,
  fullText = `I have analyzed the system architecture and designed a modular, high-contrast AI interface engine. 

Key architectural attributes:
1. **Authentic System Telemetry**: Thinking states reflect exact phase timings and AST verification without fake delays.
2. **Zero-Lag Event Bus**: Streaming tokens are buffered with requestAnimationFrame for smooth 60fps rendering.
3. **Multi-Model Grounding**: Citations link directly to indexed workspace nodes and external documentation sources.

The synthesized components are structured for direct production deployment.`,
  speedMs = 25,
  tokensPerSec = 86.4,
}: StreamingResponseProps) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isStreaming, setIsStreaming] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isStreaming || isPaused) return;

    if (displayedLength < fullText.length) {
      const timer = setTimeout(() => {
        // Stream 1-3 characters at a time for natural velocity
        const step = Math.min(3, fullText.length - displayedLength);
        setDisplayedLength((prev) => prev + step);
      }, speedMs);
      return () => clearTimeout(timer);
    } else {
      setIsStreaming(false);
    }
  }, [displayedLength, isStreaming, isPaused, fullText, speedMs]);

  const restartStream = () => {
    setDisplayedLength(0);
    setIsStreaming(true);
    setIsPaused(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(fullText.slice(0, displayedLength));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentContent = fullText.slice(0, displayedLength);

  return (
    <div className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} space-y-3`}>
      {/* Streaming Header Bar */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono">
            <span
              className={`w-2 h-2 rounded-full ${
                isStreaming && !isPaused
                  ? 'bg-emerald-400 animate-ping'
                  : isPaused
                  ? 'bg-amber-400'
                  : 'bg-zinc-500'
              }`}
            />
            <span className={recipe.textPrimary}>
              {isStreaming ? (isPaused ? 'STREAM PAUSED' : 'STREAMING LIVE') : 'SYNTHESIS COMPLETE'}
            </span>
          </div>
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${recipe.badgeClass}`}>
            {tokensPerSec} t/s
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isStreaming ? (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
              title={isPaused ? 'Resume Stream' : 'Pause Stream'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          ) : (
            <button
              onClick={restartStream}
              className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
              title="Restart Stream"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={copyText}
            className="p-1 rounded text-zinc-400 hover:text-white transition-colors"
            title="Copy Output"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Rendered Text with Live Blinking Cursor */}
      <div className={`text-xs md:text-sm ${recipe.textPrimary} leading-relaxed whitespace-pre-wrap ${recipe.fontClass}`}>
        {currentContent}
        {isStreaming && (
          <span className="inline-block w-1.5 h-4 ml-0.5 align-middle bg-sky-400 animate-pulse" />
        )}
      </div>

      {/* Progress Footer */}
      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
        <div>
          Rendered: {displayedLength} / {fullText.length} bytes
        </div>
        <div className="flex items-center gap-2">
          <span>Buffer: 0 dropped frames</span>
          <span className="text-emerald-400">FPS: 60</span>
        </div>
      </div>
    </div>
  );
}
