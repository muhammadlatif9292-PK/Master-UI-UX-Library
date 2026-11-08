/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useScientific } from '../ScientificContext';
import { Radio, Wifi, Server, RefreshCcw, Activity } from 'lucide-react';

export const LiveTelemetry: React.FC = () => {
  const { familyConfig } = useScientific();

  const [packets, setPackets] = useState(148209);
  const [dropped, setDropped] = useState(3);
  const [dataRate, setDataRate] = useState(1240); // kB/s
  const [snr, setSnr] = useState(42.8); // dB
  const [bufferDepth, setBufferDepth] = useState(18); // %

  const [sparklineHistory, setSparklineHistory] = useState<number[]>([
    40, 42, 41, 45, 43, 42, 46, 44, 42, 48, 45, 43, 44, 42, 46,
  ]);

  // Telemetry stream generator
  useEffect(() => {
    const interval = setInterval(() => {
      setPackets((p) => p + Math.floor(Math.random() * 20) + 10);
      setDataRate((r) => Math.min(2000, Math.max(800, r + Math.floor(Math.random() * 40 - 20))));
      setSnr((s) => Number((Math.min(60, Math.max(30, s + (Math.random() * 0.4 - 0.2))).toFixed(1))));
      setBufferDepth((b) => Math.min(100, Math.max(5, b + Math.floor(Math.random() * 4 - 2))));

      setSparklineHistory((prev) => {
        const nextVal = Math.min(60, Math.max(30, prev[prev.length - 1] + (Math.random() * 4 - 2)));
        return [...prev.slice(1), nextVal];
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className={`text-lg font-bold ${familyConfig.textPrimary} flex items-center gap-2`}>
            <Radio className={`w-5 h-5 ${familyConfig.accentText}`} />
            High-Frequency Streaming Live Telemetry
          </h3>
          <p className={`text-xs ${familyConfig.textSecondary}`}>
            Packet ingestion rates, ring buffer depth, signal-to-noise ratios (SNR), and live sparkline packet streams.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-emerald-400 font-bold">100,000 SAMPLES/SEC</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sparkline & Stream Metrics */}
        <div className={`lg:col-span-2 p-5 rounded-xl ${familyConfig.cardClass} space-y-4`}>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold opacity-80 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-cyan-400" /> REAL-TIME SIGNAL-TO-NOISE RATIO (SNR)
            </span>
            <span className="text-cyan-400 font-bold">{snr} dB</span>
          </div>

          {/* SVG Sparkline Graph */}
          <div className="h-28 w-full bg-black/60 rounded-lg border border-white/10 p-2 relative overflow-hidden flex items-end">
            <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <path
                d={sparklineHistory
                  .map((val, i) => {
                    const x = (i / (sparklineHistory.length - 1)) * 100;
                    const y = 40 - ((val - 20) / 40) * 40;
                    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                  })
                  .join(' ')}
                fill="none"
                stroke={familyConfig.accentColorHex || '#06b6d4'}
                strokeWidth="2"
              />
            </svg>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs pt-2">
            <div className="p-2 rounded bg-black/40">
              <span className="text-[10px] opacity-50 block">THROUGHPUT</span>
              <span className="font-bold text-white">{dataRate} kB/s</span>
            </div>
            <div className="p-2 rounded bg-black/40">
              <span className="text-[10px] opacity-50 block">TOTAL PACKETS</span>
              <span className="font-bold text-cyan-400">{packets.toLocaleString()}</span>
            </div>
            <div className="p-2 rounded bg-black/40">
              <span className="text-[10px] opacity-50 block">DROPPED PKTS</span>
              <span className="font-bold text-emerald-400">{dropped} (0.00%)</span>
            </div>
            <div className="p-2 rounded bg-black/40">
              <span className="text-[10px] opacity-50 block">RING BUFFER</span>
              <span className="font-bold text-amber-400">{bufferDepth}% DEPTH</span>
            </div>
          </div>
        </div>

        {/* UDP Channel Health */}
        <div className={`p-5 rounded-xl ${familyConfig.cardClass} flex flex-col justify-between space-y-3`}>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold opacity-80 flex items-center gap-1">
              <Server className="w-4 h-4 text-emerald-400" /> UDP FEED [PORT 9082]
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              CONNECTED
            </span>
          </div>

          <div className="p-3 rounded bg-black/50 border border-white/10 font-mono text-xs space-y-2">
            <div className="flex justify-between">
              <span className="opacity-60">BITRATE:</span>
              <span className="text-white font-bold">9.92 Mbps</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">JITTER:</span>
              <span className="text-emerald-400 font-bold">0.12 ms</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">LATENCY:</span>
              <span className="text-cyan-400 font-bold">1.4 ms</span>
            </div>
          </div>

          <div className="p-2 rounded bg-cyan-950/40 border border-cyan-800/40 text-[10px] font-mono text-cyan-300">
            ✓ Zero-copy DMA packet transfer active on optical fiber bus.
          </div>
        </div>
      </div>
    </div>
  );
};
