/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GeneralStyleRecipe =
  | 'modern-slate'
  | 'tactical-dark'
  | 'glass-acrylic'
  | 'minimal-monochrome'
  | 'cyber-emerald'
  | 'warm-editorial';

export interface StyleRecipeConfig {
  id: GeneralStyleRecipe;
  name: string;
  description: string;
  cardBg: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  inputBg: string;
  badgeBg: string;
  fontFamily: string;
}

export type ComponentStateMode = 'default' | 'interactive' | 'loading' | 'disabled' | 'error' | 'empty';

export interface GeneralContextState {
  recipe: GeneralStyleRecipe;
  setRecipe: (recipe: GeneralStyleRecipe) => void;
  recipeConfig: StyleRecipeConfig;
  stateMode: ComponentStateMode;
  setStateMode: (mode: ComponentStateMode) => void;
  isCompact: boolean;
  setIsCompact: (compact: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}
