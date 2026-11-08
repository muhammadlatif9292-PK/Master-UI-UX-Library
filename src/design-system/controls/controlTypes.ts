/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ControlStyle =
  | 'ios'
  | 'mechanical'
  | 'lightswitch'
  | 'liquid'
  | 'magnetic'
  | 'elastic'
  | 'orbit'
  | 'glass'
  | 'neon'
  | 'hud'
  | 'analog'
  | 'rotary'
  | 'scientific'
  | 'pressure'
  | 'waveform'
  | 'spring'
  | 'physics'
  | 'tactile'
  | 'cinematic';

export type ControlComponentType =
  | 'switch'
  | 'checkbox'
  | 'radio'
  | 'segmented'
  | 'slider'
  | 'range'
  | 'knob'
  | 'radial-dial'
  | 'meter'
  | 'gauge'
  | 'stepper'
  | 'drag-confirm'
  | 'slide-unlock';

export interface ControlTelemetry {
  id: string;
  name: string;
  value: any;
  unit?: string;
  normalizedValue: number; // 0 to 1
  timestamp: number;
  interactionStyle: ControlStyle;
}
