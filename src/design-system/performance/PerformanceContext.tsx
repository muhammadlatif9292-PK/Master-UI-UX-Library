/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { PerformanceTierId, PerformanceTierConfig, PerformanceTelemetry, TierFallbackProps } from './types';
import { PERFORMANCE_TIERS, DEFAULT_PERFORMANCE_TIER, getTierConfig } from './performanceTiers';
import { useExpensiveEffectsTelemetry } from './expensiveEffectsTracker';

interface PerformanceContextType {
  activeTier: PerformanceTierId;
  config: PerformanceTierConfig;
  setTier: (tier: PerformanceTierId) => void;
  isAutoAdaptive: boolean;
  setIsAutoAdaptive: (auto: boolean) => void;
  telemetry: PerformanceTelemetry;
  isLow: boolean;
  isStandard: boolean;
  isHigh: boolean;
  resetTelemetry: () => void;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

// Scoped Tier Override Context (allows rendering a component in Tier 1 while page is Tier 3)
const ScopedTierOverrideContext = createContext<PerformanceTierId | null>(null);

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTier, setActiveTier] = useState<PerformanceTierId>(DEFAULT_PERFORMANCE_TIER);
  const [isAutoAdaptive, setIsAutoAdaptive] = useState<boolean>(false);
  const [fps, setFps] = useState<number>(60);
  const [frameTimeMs, setFrameTimeMs] = useState<number>(16.6);
  const [droppedFrames, setDroppedFrames] = useState<number>(0);
  const [isTabHidden, setIsTabHidden] = useState<boolean>(false);
  const [isIdlePaused, setIsIdlePaused] = useState<boolean>(false);

  const expensiveEffects = useExpensiveEffectsTelemetry();

  // Reference trackers for FPS sampling
  const frameCountRef = useRef<number>(0);
  const lastSampleTimeRef = useRef<number>(performance.now());
  const rafIdRef = useRef<number | null>(null);
  const consecutiveLowFpsCountRef = useRef<number>(0);

  // Monitor Document Visibility
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabHidden(document.hidden);
      setIsIdlePaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Efficient FPS & Frame Time Monitor
  useEffect(() => {
    let active = true;

    const measureFps = (now: number) => {
      if (!active) return;

      if (!document.hidden) {
        frameCountRef.current++;
        const elapsed = now - lastSampleTimeRef.current;

        // Sample every 500ms
        if (elapsed >= 500) {
          const calculatedFps = Math.round((frameCountRef.current * 1000) / elapsed);
          const calculatedFrameTime = Number((elapsed / frameCountRef.current).toFixed(1));

          setFps(calculatedFps);
          setFrameTimeMs(calculatedFrameTime);

          if (calculatedFps < 45) {
            setDroppedFrames((prev) => prev + 1);
            consecutiveLowFpsCountRef.current++;
          } else {
            consecutiveLowFpsCountRef.current = Math.max(0, consecutiveLowFpsCountRef.current - 1);
          }

          // Auto Adaptive Tier Downgrade / Upgrade Logic
          if (isAutoAdaptive) {
            if (consecutiveLowFpsCountRef.current >= 4) {
              // Downgrade tier due to lag
              setActiveTier((current) => {
                if (current === 'tier3-high') return 'tier2-standard';
                if (current === 'tier2-standard') return 'tier1-low';
                return current;
              });
              consecutiveLowFpsCountRef.current = 0;
            }
          }

          frameCountRef.current = 0;
          lastSampleTimeRef.current = now;
        }
      }

      rafIdRef.current = requestAnimationFrame(measureFps);
    };

    rafIdRef.current = requestAnimationFrame(measureFps);

    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isAutoAdaptive]);

  const resetTelemetry = useCallback(() => {
    setDroppedFrames(0);
    frameCountRef.current = 0;
    consecutiveLowFpsCountRef.current = 0;
  }, []);

  const config = useMemo(() => getTierConfig(activeTier), [activeTier]);

  const telemetry: PerformanceTelemetry = useMemo(
    () => ({
      fps,
      frameTimeMs,
      droppedFramesCount: droppedFrames,
      isIdlePaused,
      isTabHidden,
      activeEffects: expensiveEffects,
      recommendedTier: fps < 45 ? 'tier1-low' : fps < 55 ? 'tier2-standard' : 'tier3-high',
    }),
    [fps, frameTimeMs, droppedFrames, isIdlePaused, isTabHidden, expensiveEffects]
  );

  const value = useMemo(
    () => ({
      activeTier,
      config,
      setTier: setActiveTier,
      isAutoAdaptive,
      setIsAutoAdaptive,
      telemetry,
      isLow: activeTier === 'tier1-low',
      isStandard: activeTier === 'tier2-standard',
      isHigh: activeTier === 'tier3-high',
      resetTelemetry,
    }),
    [activeTier, config, isAutoAdaptive, telemetry, resetTelemetry]
  );

  return <PerformanceContext.Provider value={value}>{children}</PerformanceContext.Provider>;
};

/**
 * Primary hook to access current Performance Tier and Configuration
 */
export function usePerformanceTier(): PerformanceContextType {
  const context = useContext(PerformanceContext);
  const scopedTier = useContext(ScopedTierOverrideContext);

  if (!context) {
    // Fallback if rendered outside provider
    const fallbackConfig = getTierConfig(scopedTier || DEFAULT_PERFORMANCE_TIER);
    return {
      activeTier: scopedTier || DEFAULT_PERFORMANCE_TIER,
      config: fallbackConfig,
      setTier: () => {},
      isAutoAdaptive: false,
      setIsAutoAdaptive: () => {},
      telemetry: {
        fps: 60,
        frameTimeMs: 16.6,
        droppedFramesCount: 0,
        isIdlePaused: false,
        isTabHidden: false,
        activeEffects: {
          backdropFiltersCount: 0,
          canvasRafLoopsCount: 0,
          active3DTransformsCount: 0,
          particleEnginesCount: 0,
          shadowFiltersCount: 0,
        },
        recommendedTier: 'tier2-standard',
      },
      isLow: (scopedTier || DEFAULT_PERFORMANCE_TIER) === 'tier1-low',
      isStandard: (scopedTier || DEFAULT_PERFORMANCE_TIER) === 'tier2-standard',
      isHigh: (scopedTier || DEFAULT_PERFORMANCE_TIER) === 'tier3-high',
      resetTelemetry: () => {},
    };
  }

  // If inside a Scoped Tier Override, replace activeTier with scopedTier
  if (scopedTier) {
    const scopedConfig = getTierConfig(scopedTier);
    return {
      ...context,
      activeTier: scopedTier,
      config: scopedConfig,
      isLow: scopedTier === 'tier1-low',
      isStandard: scopedTier === 'tier2-standard',
      isHigh: scopedTier === 'tier3-high',
    };
  }

  return context;
}

/**
 * Hook to select a value based on the active tier.
 * Example: const blurClass = useTierValue({ low: 'backdrop-blur-none', standard: 'backdrop-blur-md', high: 'backdrop-blur-2xl' })
 */
export function useTierValue<T>(options: TierFallbackProps<T>): T {
  const { activeTier } = usePerformanceTier();
  if (activeTier === 'tier1-low') return options.low;
  if (activeTier === 'tier2-standard') return options.standard !== undefined ? options.standard : options.low;
  if (activeTier === 'tier3-high') return options.high !== undefined ? options.high : options.standard !== undefined ? options.standard : options.low;
  return options.low;
}

/**
 * Scoped boundary component to force a specific tier inside a sub-tree
 */
export const TierBoundary: React.FC<{ tier: PerformanceTierId; children: React.ReactNode }> = ({
  tier,
  children,
}) => {
  return <ScopedTierOverrideContext.Provider value={tier}>{children}</ScopedTierOverrideContext.Provider>;
};
