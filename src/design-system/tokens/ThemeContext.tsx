/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeId, SemanticThemeTokens, THEMES } from './themeTokens';

interface ThemeContextType {
  activeThemeId: ThemeId;
  theme: SemanticThemeTokens;
  setThemeId: (id: ThemeId) => void;
  allThemes: Record<ThemeId, SemanticThemeTokens>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeThemeId, setActiveThemeId] = useState<ThemeId>('obsidian');

  const theme = THEMES[activeThemeId] || THEMES.obsidian;

  return (
    <ThemeContext.Provider value={{ activeThemeId, theme, setThemeId: setActiveThemeId, allThemes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
