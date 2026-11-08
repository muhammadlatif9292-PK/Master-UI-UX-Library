/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageExperienceId =
  | 'login'
  | 'signup'
  | 'dashboard'
  | 'ai-workspace'
  | 'settings'
  | 'profile'
  | 'search'
  | 'analytics'
  | 'scientific-lab'
  | 'simulation'
  | 'education'
  | 'command-center'
  | 'onboarding'
  | 'empty-state'
  | 'error'
  | 'success';

export type PageCategory =
  | 'all'
  | 'auth-access'
  | 'productivity-ai'
  | 'data-analytics'
  | 'science-simulation'
  | 'status-system';

export type DesignRecipeId =
  | 'modern-slate'
  | 'tactical-dark'
  | 'glass-acrylic'
  | 'minimal-mono'
  | 'cyber-emerald'
  | 'warm-editorial';

export interface PageMetadata {
  id: PageExperienceId;
  title: string;
  category: PageCategory;
  recipeId: DesignRecipeId;
  description: string;
  targetDomain: string;
  keyComponentsUsed: string[];
  tags: string[];
}
