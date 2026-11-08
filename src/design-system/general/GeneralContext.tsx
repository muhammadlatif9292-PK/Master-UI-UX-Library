/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { GeneralContextState, GeneralStyleRecipe, ComponentStateMode } from './types';
import { GENERAL_RECIPES } from './styleRecipes';

const GeneralContext = createContext<GeneralContextState | undefined>(undefined);

export const GeneralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipe, setRecipe] = useState<GeneralStyleRecipe>('modern-slate');
  const [stateMode, setStateMode] = useState<ComponentStateMode>('interactive');
  const [isCompact, setIsCompact] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const recipeConfig = GENERAL_RECIPES[recipe] || GENERAL_RECIPES['modern-slate'];

  return (
    <GeneralContext.Provider
      value={{
        recipe,
        setRecipe,
        recipeConfig,
        stateMode,
        setStateMode,
        isCompact,
        setIsCompact,
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneral = (): GeneralContextState => {
  const ctx = useContext(GeneralContext);
  if (!ctx) {
    throw new Error('useGeneral must be used within a GeneralProvider');
  }
  return ctx;
};
