/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SoundKey, SoundCategory } from './soundTypes';
import { proceduralSoundEngine } from './soundEngine';
import { useAccessibility } from '../accessibility/AccessibilityContext';

interface SoundContextType {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  uiVolume: number;
  setUiVolume: (vol: number) => void;
  ambientVolume: number;
  setAmbientVolume: (vol: number) => void;
  reducedSensory: boolean;
  setReducedSensory: (reduced: boolean) => void;
  playSound: (key: SoundKey, category?: SoundCategory) => void;
  stopAmbient: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [uiVolume, setUiVolume] = useState<number>(0.25);
  const [ambientVolume, setAmbientVolume] = useState<number>(0.15);
  const [reducedSensory, setReducedSensory] = useState<boolean>(false);
  const { settings } = useAccessibility();

  const effectiveSoundEnabled = soundEnabled && !settings.soundOff;

  const playSound = (key: SoundKey, category: SoundCategory = 'MICRO') => {
    if (!effectiveSoundEnabled || reducedSensory) return;
    proceduralSoundEngine.playSound(key, category, uiVolume, ambientVolume, effectiveSoundEnabled);
  };

  const stopAmbient = () => {
    proceduralSoundEngine.stopAmbient();
  };

  return (
    <SoundContext.Provider
      value={{
        soundEnabled: effectiveSoundEnabled,
        setSoundEnabled,
        uiVolume,
        setUiVolume,
        ambientVolume,
        setAmbientVolume,
        reducedSensory,
        setReducedSensory,
        playSound,
        stopAmbient,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}


export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
