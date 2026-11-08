/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const SPACING = {
  px: '1px',
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
};

export const RADII = {
  none: '0px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  '3xl': '32px',
  full: '9999px',
};

export const BORDERS = {
  widths: {
    none: '0px',
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },
  styles: {
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted',
  },
};

export const SHADOWS = {
  none: 'none',
  soft: '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
  medium: '0 10px 30px -4px rgba(0, 0, 0, 0.15)',
  deep: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  elevated: '0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 0 1px 1px rgba(255, 255, 255, 0.05) inset',
  brutalist: '6px 6px 0px 0px #000',
  inset: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)',
};

export const BLURS = {
  none: 'blur(0px)',
  sm: 'blur(4px)',
  md: 'blur(8px)',
  lg: 'blur(16px)',
  xl: 'blur(24px)',
  '2xl': 'blur(40px)',
};

export const OPACITY = {
  0: '0',
  25: '0.25',
  50: '0.5',
  75: '0.75',
  90: '0.9',
  100: '1',
};

export const ELEVATION = {
  flat: 0,
  raised: 10,
  overlay: 20,
  modal: 30,
  popover: 40,
  toast: 50,
  tooltip: 60,
};

export const Z_INDEX = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
};

export const MOTION_DURATIONS = {
  instant: '0.1s',
  fast: '0.2s',
  normal: '0.3s',
  slow: '0.5s',
  deliberate: '0.8s',
};

export const MOTION_EASINGS = {
  standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
  snappy: 'cubic-bezier(0, 0, 0.2, 1)',
  bouncy: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  smooth: 'cubic-bezier(0.25, 1, 0.5, 1)',
  linear: 'linear',
};

export const INTERACTION_INTENSITIES = {
  subtle: { scaleOnHover: 1.01, scaleOnTap: 0.98 },
  standard: { scaleOnHover: 1.02, scaleOnTap: 0.97 },
  expressive: { scaleOnHover: 1.05, scaleOnTap: 0.94 },
};

export const SENSORY_INTENSITIES = {
  muted: { volume: 0.05, hapticDuration: 5 },
  balanced: { volume: 0.15, hapticDuration: 15 },
  vivid: { volume: 0.30, hapticDuration: 30 },
};

export const RESPONSIVE_BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
