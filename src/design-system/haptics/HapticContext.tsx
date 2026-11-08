/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HapticEvent, HapticIntensity } from './hapticTypes';
import { hapticEngine } from './hapticEngine';
import { useAccessibility } from '../accessibility/AccessibilityContext';

interface HapticContextType {
  hapticsEnabled: boolean;
  setHapticsEnabled: (enabled: boolean) => void;
  intensity: HapticIntensity;
  setIntensity: (intensity: HapticIntensity) => void;
  simulatedUnsupported: boolean;
  setSimulatedUnsupported: (unsupported: boolean) => void;
  triggerHaptic: (event: HapticEvent) => void;
  isDeviceSupported: boolean;
}

const HapticContext = createContext<HapticContextType | undefined>(undefined);

export function HapticProvider({ children }: { children: ReactNode }) {
  const [hapticsEnabled, setHapticsEnabled] = useState<boolean>(true);
  const [intensity, setIntensity] = useState<HapticIntensity>('normal');
  const [simulatedUnsupported, setSimulatedUnsupported] = useState<boolean>(false);
  const { settings } = useAccessibility();

  const isDeviceSupported = hapticEngine.isSupported();
  const effectiveHapticsEnabled = hapticsEnabled && !settings.hapticOff;

  const triggerHaptic = (event: HapticEvent) => {
    if (!effectiveHapticsEnabled) return;
    hapticEngine.trigger(event, intensity, effectiveHapticsEnabled, simulatedUnsupported);
  };

  return (
    <HapticContext.Provider
      value={{
        hapticsEnabled: effectiveHapticsEnabled,
        setHapticsEnabled,
        intensity,
        setIntensity,
        simulatedUnsupported,
        setSimulatedUnsupported,
        triggerHaptic,
        isDeviceSupported,
      }}
    >
      {children}
    </HapticContext.Provider>
  );
}


export function useHaptics() {
  const context = useContext(HapticContext);
  if (!context) {
    throw new Error('useHaptics must be used within a HapticProvider');
  }
  return context;
}
