/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ViewportPreset } from './types';
import { Wifi, Battery, Signal, Sparkles } from 'lucide-react';

interface DeviceFrameProps {
  preset: ViewportPreset;
  scale: number;
  showBezel: boolean;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  preset,
  scale,
  showBezel,
  children,
}) => {
  const { width, height, category, orientation, defaultBezel } = preset;

  if (!showBezel || defaultBezel === 'frameless') {
    return (
      <div
        className="relative transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-zinc-950"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {children}
      </div>
    );
  }

  // Mobile Phone Dynamic Island / Notch Bezel
  if (category === 'phone') {
    const isLandscape = orientation === 'landscape';

    return (
      <div
        className="relative transition-all duration-300"
        style={{
          width: `${width + (isLandscape ? 60 : 28)}px`,
          height: `${height + (isLandscape ? 28 : 50)}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        {/* Outer Phone Aluminum Frame */}
        <div className="w-full h-full rounded-[50px] p-[10px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_2px_rgba(255,255,255,0.15)] flex flex-col justify-between relative overflow-hidden">
          {/* Inner Screen Bezel */}
          <div className="w-full h-full rounded-[42px] bg-black overflow-hidden flex flex-col relative border border-white/5">
            {/* Phone Status Bar (Portrait) */}
            {!isLandscape && (
              <div className="h-[44px] px-7 flex items-center justify-between text-[11px] font-semibold text-white/90 shrink-0 z-40 bg-zinc-950/80 backdrop-blur-md select-none">
                <span>9:41</span>
                {/* Dynamic Island Pill */}
                <div className="w-[100px] h-[26px] bg-black rounded-full border border-white/10 flex items-center justify-between px-2.5 shadow-inner">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/80 animate-pulse" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-white/20" />
                </div>
                <div className="flex items-center gap-1.5 opacity-80">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {/* Inner Content Area */}
            <div className="flex-1 w-full overflow-y-auto relative bg-zinc-950">
              {children}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="h-[22px] flex items-center justify-center shrink-0 bg-zinc-950/90 select-none z-40">
              <div className="w-32 h-1 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tablet Bezel Frame (iPad / Galaxy Tab)
  if (category === 'tablet') {
    return (
      <div
        className="relative transition-all duration-300"
        style={{
          width: `${width + 36}px`,
          height: `${height + 36}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
      >
        <div className="w-full h-full rounded-[38px] p-[16px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_2px_rgba(255,255,255,0.15)] flex flex-col relative overflow-hidden">
          {/* Tablet Front Camera Pin */}
          <div className="absolute top-2 inset-x-0 flex justify-center pointer-events-none">
            <div className="w-2.5 h-2.5 rounded-full bg-black border border-white/20" />
          </div>

          <div className="w-full h-full rounded-[24px] bg-black overflow-hidden flex flex-col relative border border-white/10">
            {/* Tablet Status Header */}
            <div className="h-[24px] px-5 flex items-center justify-between text-[10px] font-mono text-white/70 shrink-0 z-40 bg-zinc-950/80 select-none">
              <span>iPadOS 18</span>
              <div className="flex items-center gap-2">
                <Wifi className="w-3 h-3" />
                <span>100%</span>
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex-1 w-full overflow-y-auto relative bg-zinc-950">
              {children}
            </div>

            {/* Home Bar */}
            <div className="h-[14px] flex items-center justify-center shrink-0 bg-zinc-950 select-none z-40">
              <div className="w-40 h-1 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Laptop Display Bezel (MacBook / Ultrabook)
  return (
    <div
      className="relative transition-all duration-300"
      style={{
        width: `${width + 24}px`,
        height: `${height + 34}px`,
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
    >
      <div className="w-full h-full rounded-[18px] p-[10px] bg-zinc-800 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_0_2px_rgba(255,255,255,0.1)] flex flex-col relative overflow-hidden border border-white/15">
        {/* Laptop Screen Bezel Top with Camera Notch */}
        <div className="h-[24px] px-3 flex items-center justify-between bg-zinc-900 border-b border-white/10 shrink-0 select-none text-[10px] text-zinc-400 font-mono">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="w-3 h-3 rounded-full bg-black border border-white/30" />
          <div className="flex items-center gap-2">
            <span>{width} × {height}</span>
          </div>
        </div>

        <div className="flex-1 w-full overflow-y-auto relative bg-zinc-950 rounded-b-lg">
          {children}
        </div>
      </div>
    </div>
  );
};
