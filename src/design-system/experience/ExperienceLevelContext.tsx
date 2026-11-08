/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type ExperienceLevel = 'standard' | 'advanced';

export interface ExperienceLevelContextType {
  experienceLevel: ExperienceLevel;
  setExperienceLevel: (level: ExperienceLevel) => void;
  toggleExperienceLevel: () => void;
  isAdvanced: boolean;
  isStandard: boolean;
}

const ExperienceLevelContext = createContext<ExperienceLevelContextType | undefined>(undefined);

const STORAGE_KEY = 'ai_studio_master_library_experience_level_v1';

export function ExperienceLevelProvider({ children }: { children: ReactNode }) {
  const [experienceLevel, setExperienceLevelState] = useState<ExperienceLevel>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'advanced' || saved === 'standard') {
        return saved;
      }
    } catch (e) {
      console.warn('Unable to read experience level from localStorage:', e);
    }
    // Default to Standard mode per mandate (hide complexity by default)
    return 'standard';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, experienceLevel);
    } catch (e) {
      console.warn('Unable to persist experience level to localStorage:', e);
    }
  }, [experienceLevel]);

  const setExperienceLevel = useCallback((level: ExperienceLevel) => {
    setExperienceLevelState(level);
  }, []);

  const toggleExperienceLevel = useCallback(() => {
    setExperienceLevelState((prev) => (prev === 'standard' ? 'advanced' : 'standard'));
  }, []);

  const isAdvanced = experienceLevel === 'advanced';
  const isStandard = experienceLevel === 'standard';

  return (
    <ExperienceLevelContext.Provider
      value={{
        experienceLevel,
        setExperienceLevel,
        toggleExperienceLevel,
        isAdvanced,
        isStandard,
      }}
    >
      {children}
    </ExperienceLevelContext.Provider>
  );
}

export function useExperienceLevel() {
  const context = useContext(ExperienceLevelContext);
  if (!context) {
    throw new Error('useExperienceLevel must be used within an ExperienceLevelProvider');
  }
  return context;
}
