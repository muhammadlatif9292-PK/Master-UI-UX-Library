/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { useSound } from '../../design-system/sound/SoundContext';
import {
  Hand,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowDown,
  Info,
  Check,
  X,
  Smartphone,
  Eye,
  Sliders,
  ChevronDown,
} from 'lucide-react';

interface TouchSimulationOverlayProps {
  enabled: boolean;
  viewportWidth: number;
  viewportHeight: number;
  isTouchDevice: boolean;
  showThumbZone: boolean;
  showTouchHitboxes: boolean;
  onGesture?: (gestureName: string) => void;
  children: React.ReactNode;
}

export const TouchSimulationOverlay: React.FC<TouchSimulationOverlayProps> = ({
  enabled,
  viewportWidth,
  viewportHeight,
  isTouchDevice,
  showThumbZone,
  showTouchHitboxes,
  onGesture,
  children,
}) => {
  const { triggerHaptic } = useHaptics();
  const { playSound } = useSound();

  const [pullDistance, setPullDistance] = useState<number>(0);
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [longPressProgress, setLongPressProgress] = useState<number>(0);
  const [touchCoords, setTouchCoords] = useState<{ x: number; y: number } | null>(null);
  const [activeGestureToast, setActiveGestureToast] = useState<string | null>(null);
  const [selectedMobileInfo, setSelectedMobileInfo] = useState<{ title: string; content: string } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const pullStartY = useRef<number>(0);
  const longPressTimer = useRef<any>(null);
  const longPressInterval = useRef<any>(null);

  const triggerToast = (msg: string) => {
    setActiveGestureToast(msg);
    onGesture?.(msg);
    setTimeout(() => {
      setActiveGestureToast(null);
    }, 2400);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isTouchDevice) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTouchCoords({ x, y });
    pullStartY.current = e.clientY;

    // Start Long-Press detection (400ms)
    let progress = 0;
    setLongPressProgress(0);
    clearInterval(longPressInterval.current);
    clearTimeout(longPressTimer.current);

    longPressInterval.current = setInterval(() => {
      progress += 10;
      setLongPressProgress(Math.min(100, (progress / 400) * 100));
    }, 40);

    longPressTimer.current = setTimeout(() => {
      clearInterval(longPressInterval.current);
      setLongPressProgress(100);
      triggerHaptic('press');
      playSound('selection', 'MICRO');
      triggerToast('Long-Press Haptic Trigger: Context Tray Activated (No Hover Required)');
      setSelectedMobileInfo({
        title: 'Mobile Long-Press Action Tray',
        content: 'On touch interfaces where hover is unavailable, pressing & holding for 400ms reveals contextual quick actions, item inspection, and sensory haptic confirmation.',
      });
    }, 400);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isTouchDevice) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTouchCoords({ x, y });

    // Cancel long press if moved significantly
    if (Math.abs(e.clientY - pullStartY.current) > 15) {
      clearTimeout(longPressTimer.current);
      clearInterval(longPressInterval.current);
      setLongPressProgress(0);
    }

    // Pull to refresh simulation (if near top of container and dragging down)
    if (pullStartY.current && e.clientY > pullStartY.current && y < 200) {
      const dist = Math.min(80, (e.clientY - pullStartY.current) * 0.45);
      setPullDistance(dist);
      setIsPulling(true);
    }
  };

  const handlePointerUp = () => {
    clearTimeout(longPressTimer.current);
    clearInterval(longPressInterval.current);
    setLongPressProgress(0);

    if (pullDistance > 45 && !isRefreshing) {
      setIsRefreshing(true);
      triggerHaptic('boundary');
      playSound('tap', 'MICRO');
      triggerToast('Pull-to-Refresh: Elastic State Reload Triggered');
      setTimeout(() => {
        setIsRefreshing(false);
        setPullDistance(0);
        setIsPulling(false);
        triggerHaptic('success');
        playSound('success', 'STATE');
      }, 1200);
    } else {
      setPullDistance(0);
      setIsPulling(false);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className={`relative w-full h-full select-none overflow-hidden ${
        isTouchDevice ? 'cursor-default' : 'cursor-auto'
      }`}
    >
      {/* Pull to refresh visual indicator */}
      {isTouchDevice && (pullDistance > 0 || isRefreshing) && (
        <div
          className="absolute top-0 inset-x-0 z-40 flex items-center justify-center pointer-events-none transition-transform duration-100"
          style={{ transform: `translateY(${pullDistance}px)` }}
        >
          <div className="px-4 py-2 rounded-full bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2 shadow-xl backdrop-blur-md">
            <RotateCcw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isRefreshing ? 'Refreshing Specimen...' : pullDistance > 45 ? 'Release to Refresh' : 'Pull down to refresh'}</span>
          </div>
        </div>
      )}

      {/* Main Specimen Container with Pull Transform */}
      <div
        className="w-full h-full transition-transform duration-200"
        style={{
          transform: isTouchDevice && (pullDistance > 0 || isRefreshing) ? `translateY(${pullDistance * 0.7}px)` : 'none',
        }}
      >
        {children}
      </div>

      {/* Long-Press Progress Ring around touch point */}
      {isTouchDevice && longPressProgress > 0 && touchCoords && (
        <div
          className="absolute pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: touchCoords.x, top: touchCoords.y }}
        >
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="22"
                className="stroke-cyan-500/30 fill-cyan-500/10"
                strokeWidth="3"
              />
              <circle
                cx="28"
                cy="28"
                r="22"
                className="stroke-cyan-400 fill-transparent"
                strokeWidth="3"
                strokeDasharray="138"
                strokeDashoffset={138 - (138 * longPressProgress) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-[9px] font-mono font-bold text-cyan-300">
              {Math.round(longPressProgress)}%
            </div>
          </div>
        </div>
      )}

      {/* Gesture Trigger Notification Toast */}
      {activeGestureToast && (
        <div className="absolute top-4 inset-x-4 z-50 flex justify-center pointer-events-none animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-2 rounded-xl bg-zinc-950/95 border border-cyan-500/50 text-cyan-300 text-xs font-mono shadow-2xl flex items-center gap-2.5 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="font-semibold">{activeGestureToast}</span>
          </div>
        </div>
      )}

      {/* Touch Target 44px/48px Hitbox Inspector Overlay */}
      {showTouchHitboxes && isTouchDevice && (
        <div className="absolute inset-0 z-30 pointer-events-none bg-emerald-500/5 border border-emerald-500/20">
          <div className="absolute top-2 right-2 px-2 py-1 rounded bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono">
            Touch Target Guide: Min 44×44px Active
          </div>
        </div>
      )}

      {/* Thumb-Zone Reachability Overlay (Mobile Ergonomics) */}
      {showThumbZone && isTouchDevice && viewportHeight > 500 && (
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between overflow-hidden">
          {/* Top Hard-to-Reach Zone */}
          <div className="h-1/4 bg-rose-500/10 border-b border-rose-500/20 p-2 text-[10px] font-mono text-rose-300 flex items-start justify-between">
            <span>⚠️ Awkward Thumb Zone (Avoid Primary Actions)</span>
            <span className="opacity-70">Top 25%</span>
          </div>
          {/* Middle Stretch Zone */}
          <div className="h-1/3 bg-amber-500/10 border-y border-amber-500/20 p-2 text-[10px] font-mono text-amber-300 flex items-center justify-between">
            <span>⚡ Stretch Thumb Zone (Secondary Navigation / Scroll)</span>
            <span className="opacity-70">Middle 33%</span>
          </div>
          {/* Bottom Natural Arc Zone */}
          <div className="h-2/5 bg-emerald-500/15 border-t border-emerald-500/30 p-3 text-[10px] font-mono text-emerald-300 flex flex-col justify-end">
            <div className="flex items-center justify-between font-bold">
              <span>🎯 Natural Thumb Arc (Primary CTAs & Navigation Trays)</span>
              <span>Bottom 40%</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Long-Press / Tap-to-Inspect Bottom Sheet */}
      {selectedMobileInfo && (
        <div className="absolute inset-x-0 bottom-0 z-50 p-4 bg-zinc-950/95 border-t border-cyan-500/40 backdrop-blur-2xl animate-in slide-in-from-bottom duration-200">
          <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-3" />
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                {selectedMobileInfo.title}
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">{selectedMobileInfo.content}</p>
            </div>
            <button
              onClick={() => setSelectedMobileInfo(null)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
