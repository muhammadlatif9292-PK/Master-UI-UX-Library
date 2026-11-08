/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VisualFamily =
  | 'laboratory'
  | 'observatory'
  | 'command-center'
  | 'instrument-panel'
  | 'machined'
  | 'glass-laboratory'
  | 'quantum'
  | 'scientific-minimal'
  | 'retro-scientific'
  | 'cinematic-science';

export interface VisualFamilyConfig {
  id: VisualFamily;
  name: string;
  description: string;
  bgClass: string;
  cardClass: string;
  borderClass: string;
  textPrimary: string;
  textSecondary: string;
  accentClass: string;
  accentText: string;
  accentColorHex: string;
  fontClass: string;
  badgeClass: string;
}

export interface ScientificContextState {
  family: VisualFamily;
  setFamily: (family: VisualFamily) => void;
  familyConfig: VisualFamilyConfig;
  unitsSystem: 'SI' | 'Imperial' | 'Atomic';
  setUnitsSystem: (units: 'SI' | 'Imperial' | 'Atomic') => void;
  scientificNotation: boolean;
  setScientificNotation: (val: boolean) => void;
  soundFeedback: boolean;
  setSoundFeedback: (val: boolean) => void;
}

export interface InstrumentData {
  id: string;
  serialNumber: string;
  name: string;
  model: string;
  calibrationDate: string;
  status: 'LOCKED' | 'WARMING_UP' | 'CALIBRATING' | 'STANDBY' | 'FAULT';
  primaryValue: number;
  unit: string;
  precision: number;
  rangeMin: number;
  rangeMax: number;
  temperature: number;
  signalStrength: number; // 0 - 100%
}

export interface GaugeData {
  id: string;
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  warningLow?: number;
  warningHigh?: number;
  criticalHigh?: number;
  targetRange?: [number, number];
  ticksCount?: number;
}

export interface ExperimentStep {
  id: number;
  title: string;
  action: string;
  hazardLevel: 'NONE' | 'CAUTION' | 'DANGER' | 'BIOHAZARD';
  durationSeconds: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED';
  requiredCheck: string;
  operatorNotes?: string;
}
