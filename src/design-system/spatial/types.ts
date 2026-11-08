/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SpatialDisplayMode = '3d-spatial' | '2d-flat' | 'low-perf' | 'reduced-motion';

export type PerformanceTier = 'high' | 'medium' | 'low' | 'fallback';

export interface SpatialContextState {
  mode: SpatialDisplayMode;
  setMode: (mode: SpatialDisplayMode) => void;
  performanceTier: PerformanceTier;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  isMobile: boolean;
  isWebGLSupported: boolean;
  fps: number;
  toggle2DFlatMode: () => void;
}

export interface SpatialPanelData {
  id: string;
  title: string;
  subtitle?: string;
  depthZ: number; // In px or spatial units
  rotationY?: number;
  rotationX?: number;
  scale?: number;
  status?: string;
  content: string;
  metrics?: { label: string; value: string; delta?: string }[];
}

export interface GlobeMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'hub' | 'node' | 'server' | 'event';
  value?: string;
  status?: 'active' | 'warning' | 'idle';
}

export interface FlightWaypoint {
  id: string;
  title: string;
  description: string;
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  fov?: number;
  tag: string;
}

export interface InstrumentTelemetry {
  pitch: number; // degrees -90 to +90
  roll: number;  // degrees -185 to +185
  heading: number; // degrees 0 to 360
  altitude: number; // feet
  airspeed: number; // knots
  gForce: number;
  systemStatus: 'NOMINAL' | 'WARNING' | 'ALERT';
}
