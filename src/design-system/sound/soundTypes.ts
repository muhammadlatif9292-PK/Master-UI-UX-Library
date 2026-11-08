/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SoundCategory = 'MICRO' | 'NAVIGATION' | 'STATE' | 'AMBIENT' | 'HERO';

export type SoundKey =
  // MICRO
  | 'tap'
  | 'press'
  | 'release'
  | 'focus'
  | 'selection'
  | 'toggle'
  | 'drag-start'
  | 'drag-end'
  | 'snap'
  | 'expand'
  | 'collapse'
  // NAVIGATION
  | 'screen-enter'
  | 'screen-exit'
  | 'tab-change'
  | 'drawer-open'
  | 'drawer-close'
  | 'search-activate'
  | 'back'
  | 'forward'
  // STATE
  | 'success'
  | 'error'
  | 'warning'
  | 'processing'
  | 'completion'
  | 'notification'
  // AMBIENT
  | 'laboratory'
  | 'observatory'
  | 'deep-space'
  | 'ai-environment'
  | 'simulation'
  // HERO
  | 'major-completion'
  | 'major-achievement'
  | 'major-scene-transition';

export interface SoundDefinition {
  key: SoundKey;
  category: SoundCategory;
  name: string;
  description: string;
  defaultVolume: number;
}
