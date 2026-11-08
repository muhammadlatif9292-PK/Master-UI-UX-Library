/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RequiredViewportPresetId =
  | 'phone-portrait'
  | 'phone-landscape'
  | 'tablet-portrait'
  | 'tablet-landscape'
  | 'laptop'
  | 'desktop'
  | 'large-display';

export type ExtendedViewportPresetId =
  | RequiredViewportPresetId
  | 'compact-phone'
  | 'iphone-pro-max'
  | 'foldable-unfolded'
  | 'ultrawide-4k'
  | 'custom';

export type DeviceCategory = 'phone' | 'tablet' | 'laptop' | 'desktop' | 'large-display';

export interface ViewportPreset {
  id: ExtendedViewportPresetId;
  name: string;
  category: DeviceCategory;
  width: number;
  height: number;
  aspectRatio: string;
  dpi: number;
  orientation: 'portrait' | 'landscape';
  deviceModel: string;
  hasTouch: boolean;
  hasHover: boolean;
  safeAreaInsets: { top: number; right: number; bottom: number; left: number };
  description: string;
  iconName: string;
  defaultBezel: 'dynamic-island' | 'notch' | 'tablet-bezel' | 'laptop-bezel' | 'frameless';
}

export type TestingViewMode = 'single-device' | 'side-by-side-diff' | 'multi-device-matrix' | 'touch-lab';

export interface DifferenceItem {
  category: 'layout' | 'navigation' | 'density' | 'interaction' | 'reachability';
  title: string;
  desktopBehavior: string;
  mobileBehavior: string;
  whyAdaptive: string;
  wcagReference?: string;
  antiPatternWarning: string;
}

export interface TouchGestureEvent {
  type: 'tap' | 'double-tap' | 'long-press' | 'swipe-left' | 'swipe-right' | 'pull-down' | 'pinch';
  targetElement?: string;
  timestamp: number;
  coordinates: { x: number; y: number };
}
