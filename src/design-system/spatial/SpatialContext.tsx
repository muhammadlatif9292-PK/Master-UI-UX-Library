/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SpatialDisplayMode, PerformanceTier, SpatialContextState } from './types';

const SpatialContext = createContext<SpatialContextState | null>(null);

interface SpatialProviderProps {
  children: ReactNode;
  initialMode?: SpatialDisplayMode;
}

export const SpatialProvider: React.FC<SpatialProviderProps> = ({
  children,
  initialMode = '3d-spatial',
}) => {
  const [mode, setMode] = useState<SpatialDisplayMode>(initialMode);
  const [performanceTier, setPerformanceTier] = useState<PerformanceTier>('high');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean>(true);
  const [fps, setFps] = useState<number>(60);

  // Check prefers-reduced-motion & mobile screen on mount
  useEffect(() => {
    // 1. Reduced Motion Query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      if (mode === '3d-spatial') setMode('reduced-motion');
    }

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setMode('reduced-motion');
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // 2. Mobile Detection
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && performanceTier === 'high') {
        setPerformanceTier('medium');
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 3. WebGL Support Test
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLSupported(false);
        setMode('2d-flat');
      }
    } catch (e) {
      setIsWebGLSupported(false);
      setMode('2d-flat');
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Simple FPS Monitor
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFPS = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / (now - lastTime));
        setFps(currentFps);

        // Auto fallback if FPS drops dangerously low (< 22 fps)
        if (currentFps < 22 && performanceTier === 'high') {
          setPerformanceTier('low');
        }

        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFPS);
    };

    animId = requestAnimationFrame(calcFPS);
    return () => cancelAnimationFrame(animId);
  }, [performanceTier]);

  const toggle2DFlatMode = () => {
    setMode((prev) => (prev === '2d-flat' ? '3d-spatial' : '2d-flat'));
  };

  return (
    <SpatialContext.Provider
      value={{
        mode,
        setMode,
        performanceTier,
        reducedMotion,
        setReducedMotion,
        isMobile,
        isWebGLSupported,
        fps,
        toggle2DFlatMode,
      }}
    >
      {children}
    </SpatialContext.Provider>
  );
};

export function useSpatial() {
  const ctx = useContext(SpatialContext);
  if (!ctx) {
    // Return safe fallback defaults if hook used outside provider
    return {
      mode: '3d-spatial' as SpatialDisplayMode,
      setMode: () => {},
      performanceTier: 'high' as PerformanceTier,
      reducedMotion: false,
      setReducedMotion: () => {},
      isMobile: false,
      isWebGLSupported: true,
      fps: 60,
      toggle2DFlatMode: () => {},
    };
  }
  return ctx;
}
