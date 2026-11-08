/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DashboardLayoutType =
  | 'classic-grid'
  | 'bento'
  | 'command-center'
  | 'spatial'
  | 'cinematic'
  | 'glass'
  | 'hud'
  | 'editorial'
  | 'modular'
  | 'adaptive'
  | 'ai'
  | 'simulation'
  | 'scientific'
  | 'personal-workspace'
  | 'canvas'
  | 'floating'
  | '3d';

export type DataComponentType =
  | 'line'
  | 'area'
  | 'bar'
  | 'radial'
  | 'gauge'
  | 'meter'
  | 'progress'
  | 'sparkline'
  | 'heatmap'
  | 'scatter'
  | 'waveform'
  | 'timeline'
  | 'telemetry'
  | 'live-graph'
  | 'comparison-graph';

export type VisualRecipeType =
  | 'glass-data'
  | 'luminous-data'
  | 'scientific'
  | 'laboratory'
  | 'quantum'
  | 'editorial'
  | 'minimal'
  | 'neon'
  | 'spatial';

export interface VisualRecipeStyle {
  id: VisualRecipeType;
  name: string;
  description: string;
  containerClass: string;
  cardClass: string;
  headerClass: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  borderClass: string;
  accentColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  gridLineColor: string;
  chartBackground: string;
  glowEffect: string;
  badgeClass: string;
  tooltipBg: string;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  secondaryValue?: string;
  sparklineData?: number[];
  unit?: string;
}

export interface ChartDataPoint {
  x: string | number;
  y: number;
  y2?: number;
  y3?: number;
  label?: string;
  category?: string;
  meta?: Record<string, any>;
}

export interface HeatmapCell {
  x: number; // e.g. day 0-6
  y: number; // e.g. hour 0-23
  value: number; // 0-100
  label?: string;
}

export interface ScatterPoint {
  x: number;
  y: number;
  size?: number;
  label: string;
  category: string;
}

export interface TelemetryPacket {
  id: string;
  timestamp: string;
  node: string;
  metric: string;
  value: number;
  status: 'optimal' | 'warning' | 'critical' | 'syncing';
}
