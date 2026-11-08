/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MotionIntensityLevel, MotionPreset } from './motionTypes';

interface MotionContextType {
  intensity: MotionIntensityLevel;
  setIntensity: (level: MotionIntensityLevel) => void;
  defaultPreset: MotionPreset;
  setDefaultPreset: (preset: MotionPreset) => void;
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
}

const MotionContext = createContext<MotionContextType | undefined>(undefined);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [intensity, setIntensity] = useState<MotionIntensityLevel>(2); // Normal
  const [defaultPreset, setDefaultPreset] = useState<MotionPreset>('fluid');
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Check system prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  return (
    <MotionContext.Provider
      value={{
        intensity,
        setIntensity,
        defaultPreset,
        setDefaultPreset,
        reducedMotion,
        setReducedMotion,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const context = useContext(MotionContext);
  if (!context) {
    throw new Error('useMotion must be used within a MotionProvider');
  }
  return context;
}
