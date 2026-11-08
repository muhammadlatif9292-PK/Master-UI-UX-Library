/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { ScientificContextState, VisualFamily } from './types';
import { VISUAL_FAMILIES } from './visualFamilies';

const ScientificContext = createContext<ScientificContextState | undefined>(undefined);

export const ScientificProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [family, setFamily] = useState<VisualFamily>('laboratory');
  const [unitsSystem, setUnitsSystem] = useState<'SI' | 'Imperial' | 'Atomic'>('SI');
  const [scientificNotation, setScientificNotation] = useState(false);
  const [soundFeedback, setSoundFeedback] = useState(true);

  const familyConfig = VISUAL_FAMILIES[family] || VISUAL_FAMILIES.laboratory;

  return (
    <ScientificContext.Provider
      value={{
        family,
        setFamily,
        familyConfig,
        unitsSystem,
        setUnitsSystem,
        scientificNotation,
        setScientificNotation,
        soundFeedback,
        setSoundFeedback,
      }}
    >
      {children}
    </ScientificContext.Provider>
  );
};

export const useScientific = () => {
  const ctx = useContext(ScientificContext);
  if (!ctx) {
    throw new Error('useScientific must be used within a ScientificProvider');
  }
  return ctx;
};
