/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type HapticEvent =
  | 'tap'
  | 'press'
  | 'selection'
  | 'toggle'
  | 'snap'
  | 'drag'
  | 'boundary'
  | 'success'
  | 'warning'
  | 'error'
  | 'completion';

export type HapticIntensity = 'subtle' | 'normal' | 'vivid' | 'off';

export interface HapticPattern {
  duration: number | number[];
}
