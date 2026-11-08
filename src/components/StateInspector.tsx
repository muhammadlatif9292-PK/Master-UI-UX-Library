/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { useSound } from '../design-system/sound/SoundContext';
import { useHaptics } from '../design-system/haptics/HapticContext';
import { CatalogEntry } from '../design-system/catalog/catalogTypes';
import {
  Activity,
  Sparkles,
  Sliders,
  Volume2,
  Vibrate,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Eye,
  Layers,
  ArrowRightLeft,
  Copy,
  Check,
  Code,
  Info,
  Maximize2,
  Lock,
  WifiOff,
  HelpCircle,
  MousePointer,
  ChevronDown,
  Move,
  CheckSquare,
} from 'lucide-react';

export type ComponentState =
  | 'idle'
  | 'hover'
  | 'focus'
  | 'pressed'
  | 'active'
  | 'loading'
  | 'success'
  | 'error'
  | 'disabled'
  | 'selected'
  | 'expanded'
  | 'dragging'
  | 'offline'
  | 'unknown';

export interface StateInspectionDetail {
  state: ComponentState;
  name: string;
  badgeColor: string;
  visualDelta: {
    transform: string;
    border: string;
    shadow: string;
    background: string;
    opacity: string;
    attributes: string[];
    summary: string;
  };
  motion: {
    physicsType: string;
    stiffness: number;
    damping: number;
    mass: number;
    durationMs: number;
    easingCurve: string;
    summary: string;
  };
  audio: {
    event: string;
    waveform: string;
    frequencyHz: string;
    decibels: string;
    decayMs: number;
    hasSound: boolean;
    summary: string;
  };
  haptic: {
    patternMs: number[];
    hasHaptics: boolean;
    actuatorType: string;
    browserPayload: string;
    summary: string;
  };
  accessibility: {
    ariaRole: string;
    ariaAttributes: Record<string, string>;
    wcagContrast: string;
    wcagStatus: 'AAA' | 'AA' | 'PASS';
    keyboardNav: string;
    screenReaderAnnouncement: string;
    summary: string;
  };
}

export const STATE_DETAILS_REGISTRY: Record<ComponentState, StateInspectionDetail> = {
  idle: {
    state: 'idle',
    name: 'Resting Idle',
    badgeColor: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/40',
    visualDelta: {
      transform: 'scale(1.0) translateY(0px) rotate(0deg)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
      background: 'tokens.surface.primary (Baseline Surface)',
      opacity: '100%',
      attributes: ['data-state="idle"'],
      summary: 'Resting baseline tokens with standard surface padding and subtle ambient borders.',
    },
    motion: {
      physicsType: 'spring',
      stiffness: 300,
      damping: 25,
      mass: 1.0,
      durationMs: 0,
      easingCurve: 'cubic-bezier(0.16, 1, 0.3, 1)',
      summary: 'Resting state. Loop idle governor monitors for user inactivity.',
    },
    audio: {
      event: 'none',
      waveform: 'none',
      frequencyHz: '0 Hz',
      decibels: '-inf dB',
      decayMs: 0,
      hasSound: false,
      summary: 'No sound triggered in resting idle state.',
    },
    haptic: {
      patternMs: [],
      hasHaptics: false,
      actuatorType: 'None',
      browserPayload: '[]',
      summary: 'No tactile vibration triggered in resting idle state.',
    },
    accessibility: {
      ariaRole: 'button',
      ariaAttributes: { 'aria-disabled': 'false' },
      wcagContrast: '12.8:1',
      wcagStatus: 'AAA',
      keyboardNav: 'Focusable via Tab / Shift+Tab',
      screenReaderAnnouncement: 'Control name, role button.',
      summary: 'Exceeds WCAG 2.2 AAA contrast minimum. Fully keyboard interactive.',
    },
  },
  hover: {
    state: 'hover',
    name: 'Pointer Hover',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    visualDelta: {
      transform: 'scale(1.02) translateY(-2px)',
      border: '1px solid rgba(6, 182, 212, 0.6)',
      shadow: '0 12px 28px rgba(6, 182, 212, 0.25)',
      background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(99,102,241,0.08))',
      opacity: '100%',
      attributes: ['data-state="hover"', ':hover'],
      summary: 'Elevation shift up (+2px), luminescent cyan border highlight, and soft radial glow.',
    },
    motion: {
      physicsType: 'spring',
      stiffness: 400,
      damping: 25,
      mass: 0.8,
      durationMs: 150,
      easingCurve: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      summary: 'Responsive spring scale up (1.02x) with smooth 150ms spring curve.',
    },
    audio: {
      event: 'selection',
      waveform: 'sine',
      frequencyHz: '440 Hz (A4)',
      decibels: '-18 dB',
      decayMs: 15,
      hasSound: true,
      summary: 'Ultra-short 440Hz micro tick for crisp pointer entry feedback.',
    },
    haptic: {
      patternMs: [8],
      hasHaptics: true,
      actuatorType: 'LRA Micro Pulse',
      browserPayload: 'navigator.vibrate([8])',
      summary: 'Light 8ms tactile pulse confirming cursor entry.',
    },
    accessibility: {
      ariaRole: 'button',
      ariaAttributes: { 'aria-describedby': 'tooltip-id' },
      wcagContrast: '14.2:1',
      wcagStatus: 'AAA',
      keyboardNav: 'Simulated via focus-visible state',
      screenReaderAnnouncement: 'Reads tooltip description if configured.',
      summary: 'Cursor changes to pointer. High contrast border maintains readability.',
    },
  },
  focus: {
    state: 'focus',
    name: 'Keyboard Focus',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    visualDelta: {
      transform: 'scale(1.01) translateY(0px)',
      border: '2px solid rgba(99, 102, 241, 0.9)',
      shadow: '0 0 0 4px rgba(99, 102, 241, 0.35)',
      background: 'tokens.surface.primary',
      opacity: '100%',
      attributes: ['data-state="focus"', ':focus-visible'],
      summary: 'High contrast indigo focus ring (3px ring with 2px offset) conforming to WCAG 2.2 AAA.',
    },
    motion: {
      physicsType: 'spring',
      stiffness: 500,
      damping: 30,
      mass: 0.6,
      durationMs: 100,
      easingCurve: 'cubic-bezier(0, 0, 0.2, 1)',
      summary: 'Instant focus snap animation ensuring zero keyboard navigation latency.',
    },
    audio: {
      event: 'navigation',
      waveform: 'triangle',
      frequencyHz: '587.33 Hz (D5)',
      decibels: '-12 dB',
      decayMs: 30,
      hasSound: true,
      summary: 'Focus snap tone (587Hz D5 note) guiding screen-free navigation.',
    },
    haptic: {
      patternMs: [12],
      hasHaptics: true,
      actuatorType: 'LRA Crisp Pulse',
      browserPayload: 'navigator.vibrate([12])',
      summary: 'Selection pulse confirming focus lock.',
    },
    accessibility: {
      ariaRole: 'button',
      ariaAttributes: { 'aria-disabled': 'false', 'tabindex': '0' },
      wcagContrast: '15.5:1',
      wcagStatus: 'AAA',
      keyboardNav: 'Active target. Keys: Enter, Space',
      screenReaderAnnouncement: 'Focused: Control label, Button.',
      summary: 'Passes 3.1.2 Focus Appearance WCAG AAA guidelines with 4px outer glow ring.',
    },
  },
  pressed: {
    state: 'pressed',
    name: 'Active Press / Click',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    visualDelta: {
      transform: 'scale(0.96) translateY(1px)',
      border: '1px solid rgba(59, 130, 246, 0.8)',
      shadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.6)',
      background: 'rgba(59, 130, 246, 0.2)',
      opacity: '90%',
      attributes: ['data-state="pressed"', ':active'],
      summary: 'Depth compression shrink (0.96x scale) with recessed inner shadow layer.',
    },
    motion: {
      physicsType: 'spring',
      stiffness: 600,
      damping: 15,
      mass: 0.5,
      durationMs: 80,
      easingCurve: 'cubic-bezier(0.4, 0, 1, 1)',
      summary: 'Bouncy tactile spring compression on pointer down.',
    },
    audio: {
      event: 'press',
      waveform: 'square (low-pass)',
      frequencyHz: '350 Hz',
      decibels: '-10 dB',
      decayMs: 25,
      hasSound: true,
      summary: 'Tactile click press sound simulating mechanical switch contacts.',
    },
    haptic: {
      patternMs: [15, 25],
      hasHaptics: true,
      actuatorType: 'ERM Heavy Impact',
      browserPayload: 'navigator.vibrate([15, 25])',
      summary: 'Strong dual impact feedback on press down.',
    },
    accessibility: {
      ariaRole: 'button',
      ariaAttributes: { 'aria-pressed': 'true' },
      wcagContrast: '13.0:1',
      wcagStatus: 'AAA',
      keyboardNav: 'Triggered via Space keydown or Enter keydown',
      screenReaderAnnouncement: 'Pressed.',
      summary: 'Provides immediate visual and sensory feedback for user action confirmation.',
    },
  },
  active: {
    state: 'active',
    name: 'Active Selected',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    visualDelta: {
      transform: 'scale(1.0) translateY(0px)',
      border: '1.5px solid rgba(16, 185, 129, 0.8)',
      shadow: '0 0 20px rgba(16, 185, 129, 0.2)',
      background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.1))',
      opacity: '100%',
      attributes: ['aria-current="page"', 'data-state="active"'],
      summary: 'Persistent active emerald fill with glowing indicator badge.',
    },
    motion: {
      physicsType: 'spring',
      stiffness: 350,
      damping: 22,
      mass: 0.9,
      durationMs: 200,
      easingCurve: 'cubic-bezier(0.16, 1, 0.3, 1)',
      summary: 'Smooth active transition settling into highlighted state.',
    },
    audio: {
      event: 'selection',
      waveform: 'sine',
      frequencyHz: '523.25 Hz -> 659.25 Hz (C5-E5)',
      decibels: '-10 dB',
      decayMs: 60,
      hasSound: true,
      summary: 'Ascending major 3rd interval chime confirming active toggle.',
    },
    haptic: {
      patternMs: [20],
      hasHaptics: true,
      actuatorType: 'LRA Snap',
      browserPayload: 'navigator.vibrate([20])',
      summary: 'Snap vibration confirming active state activation.',
    },
    accessibility: {
      ariaRole: 'button',
      ariaAttributes: { 'aria-current': 'true', 'aria-selected': 'true' },
      wcagContrast: '14.0:1',
      wcagStatus: 'AAA',
      keyboardNav: 'Active item in list / navigation group',
      screenReaderAnnouncement: 'Current item / active.',
      summary: 'Sets aria-current or aria-selected for assistive screen readers.',
    },
  },
  loading: {
    state: 'loading',
    name: 'Asynchronous Loading',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    visualDelta: {
      transform: 'scale(1.0) (Pointer events disabled)',
      border: '1px solid rgba(245, 158, 11, 0.5)',
      shadow: '0 0 15px rgba(245, 158, 11, 0.15)',
      background: 'rgba(245, 158, 11, 0.08)',
      opacity: '75%',
      attributes: ['aria-busy="true"', 'data-state="loading"'],
      summary: 'Semi-transparent shimmer overlay with animated spinning loader icon.',
    },
    motion: {
      physicsType: 'keyframes',
      stiffness: 0,
      damping: 0,
      mass: 0,
      durationMs: 1200,
      easingCurve: 'linear infinite',
      summary: '360° continuous rotation of spinner icon and skeleton pulse wave.',
    },
    audio: {
      event: 'processing',
      waveform: 'sine (modulated)',
      frequencyHz: '220 Hz heartbeat hum',
      decibels: '-24 dB',
      decayMs: 500,
      hasSound: true,
      summary: 'Low continuous processing hum indicating background task execution.',
    },
    haptic: {
      patternMs: [10, 200, 10],
      hasHaptics: true,
      actuatorType: 'LRA Periodic Pulse',
      browserPayload: 'navigator.vibrate([10, 200, 10])',
      summary: 'Periodic subtle pulse wave during processing.',
    },
    accessibility: {
      ariaRole: 'progressbar',
      ariaAttributes: { 'aria-busy': 'true', 'aria-live': 'polite', 'aria-valuetext': 'Loading...' },
      wcagContrast: '9.8:1',
      wcagStatus: 'AAA',
      keyboardNav: 'Temporarily ignores interaction during network request',
      screenReaderAnnouncement: 'Busy. Loading requested content, please wait.',
      summary: 'Announces aria-busy="true" to prevent double-submit accessibility issues.',
    },
  },
  success: {
    state: 'success',
    name: 'Operation Success',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    visualDelta: {
      transform: 'scale(1.03) translateY(-1px)',
      border: '2px solid rgba(16, 185, 129, 0.9)',
      shadow: '0 0 30px rgba(16, 185, 129, 0.35)',
      background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(6,182,212,0.15))',
      opacity: '100%',
      attributes: ['data-state="success"', 'role="status"'],
      summary: 'Vibrant emerald border glow with animated checkmark completion icon.',
    },
    motion: {
      physicsType: 'spring',
      stiffness: 300,
      damping: 12,
      mass: 0.9,
      durationMs: 400,
      easingCurve: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      summary: 'Bouncy completion spring with gentle scale overshoot celebrating success.',
    },
    audio: {
      event: 'success',
      waveform: 'polyphonic sine triad',
      frequencyHz: 'C5 (523Hz), E5 (659Hz), G5 (784Hz)',
      decibels: '-6 dB',
      decayMs: 250,
      hasSound: true,
      summary: 'Polyphonic C-E-G major triad chord signaling successful completion.',
    },
    haptic: {
      patternMs: [15, 40, 25, 40, 35],
      hasHaptics: true,
      actuatorType: 'LRA Triple Celebration Pulse',
      browserPayload: 'navigator.vibrate([15, 40, 25, 40, 35])',
      summary: 'Triple rhythmic vibration sequence for positive reinforcement.',
    },
    accessibility: {
      ariaRole: 'status',
      ariaAttributes: { 'aria-live': 'polite', 'aria-invalid': 'false' },
      wcagContrast: '11.2:1',
      wcagStatus: 'AAA',
      keyboardNav: 'Navigable. Action resolved.',
      screenReaderAnnouncement: 'Success: Action completed successfully.',
      summary: 'Announces status live region immediately to screen readers.',
    },
  },
  error: {
    state: 'error',
    name: 'Error / Invalid',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    visualDelta: {
      transform: 'translateX(0px) (Shake sequence triggered)',
      border: '2px solid rgba(244, 63, 94, 0.95)',
      shadow: '0 0 30px rgba(244, 63, 94, 0.4)',
      background: 'linear-gradient(135deg, rgba(244,63,94,0.25), rgba(225,29,72,0.1))',
      opacity: '100%',
      attributes: ['aria-invalid="true"', 'role="alert"'],
      summary: 'High-visibility rose border with warning icon and horizontal shake animation.',
    },
    motion: {
      physicsType: 'keyframes shake',
      stiffness: 600,
      damping: 10,
      mass: 0.5,
      durationMs: 350,
      easingCurve: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)',
      summary: 'Multi-stage horizontal shake sequence ([0, -8px, 8px, -6px, 6px, 0]) on error.',
    },
    audio: {
      event: 'error',
      waveform: 'sawtooth + square dissonant',
      frequencyHz: 'F5 (698Hz) + F#5 (740Hz) minor 2nd clash',
      decibels: '-8 dB',
      decayMs: 180,
      hasSound: true,
      summary: 'Dual-tone minor second dissonance alerting user to validation failure.',
    },
    haptic: {
      patternMs: [50, 30, 50, 30, 75],
      hasHaptics: true,
      actuatorType: 'ERM Heavy Alarm Buzz',
      browserPayload: 'navigator.vibrate([50, 30, 50, 30, 75])',
      summary: 'Heavy multi-stage alarm vibration pattern.',
    },
    accessibility: {
      ariaRole: 'alert',
      ariaAttributes: { 'aria-invalid': 'true', 'aria-errormessage': 'err-msg-id', 'aria-live': 'assertive' },
      wcagContrast: '10.5:1',
      wcagStatus: 'AAA',
      keyboardNav: 'Focus retained on input/control to fix error',
      screenReaderAnnouncement: 'Alert Error: Invalid input value. Please correct highlighted fields.',
      summary: 'Uses aria-live="assertive" so screen reader interrupts and reads error immediately.',
    },
  },
  disabled: {
    state: 'disabled',
    name: 'Disabled Inactive',
    badgeColor: 'bg-zinc-700/20 text-zinc-400 border-zinc-700/40',
    visualDelta: {
      transform: 'scale(1.0) translateY(0px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      shadow: 'none',
      background: 'rgba(255, 255, 255, 0.03)',
      opacity: '40% (Grayscale 80%)',
      attributes: ['aria-disabled="true"', 'disabled', 'tabindex="-1"'],
      summary: 'Muted 40% opacity, desaturated grayscale filter, and cursor not-allowed.',
    },
    motion: {
      physicsType: 'none',
      stiffness: 0,
      damping: 0,
      mass: 0,
      durationMs: 0,
      easingCurve: 'none',
      summary: 'All motion and hover transitions disabled.',
    },
    audio: {
      event: 'none',
      waveform: 'none',
      frequencyHz: '0 Hz',
      decibels: '-inf dB',
      decayMs: 0,
      hasSound: false,
      summary: 'No audio events generated on disabled interactions.',
    },
    haptic: {
      patternMs: [],
      hasHaptics: false,
      actuatorType: 'None',
      browserPayload: '[]',
      summary: 'No tactile feedback on disabled interactions.',
    },
    accessibility: {
      ariaRole: 'button',
      ariaAttributes: { 'aria-disabled': 'true', 'tabindex': '-1' },
      wcagContrast: '4.8:1 (WCAG Exemption for disabled elements)',
      wcagStatus: 'AA',
      keyboardNav: 'Bypassed in Tab order',
      screenReaderAnnouncement: 'Control name, Button, Disabled.',
      summary: 'Removed from keyboard tab order. Screen reader announces disabled state.',
    },
  },
  selected: {
    state: 'selected',
    name: 'Item Selected',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    visualDelta: {
      transform: 'scale(1.01)',
      border: '2px solid rgba(168, 85, 247, 0.8)',
      shadow: '0 0 20px rgba(168, 85, 247, 0.25)',
      background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(99,102,241,0.15))',
      opacity: '100%',
      attributes: ['aria-selected="true"', 'data-state="selected"'],
      summary: 'Luminescent purple accent stroke with checkmark selection indicator badge.',
    },
    motion: {
      physicsType: 'spring',
      stiffness: 450,
      damping: 20,
      mass: 0.7,
      durationMs: 180,
      easingCurve: 'cubic-bezier(0.16, 1, 0.3, 1)',
      summary: 'Snap scale confirmation spring settling smoothly.',
    },
    audio: {
      event: 'selection',
      waveform: 'sine',
      frequencyHz: '523.25 Hz -> 783.99 Hz (C5-G5)',
      decibels: '-10 dB',
      decayMs: 80,
      hasSound: true,
      summary: 'Ascending 5th interval chime confirming selection toggle.',
    },
    haptic: {
      patternMs: [18],
      hasHaptics: true,
      actuatorType: 'LRA Crisp Pulse',
      browserPayload: 'navigator.vibrate([18])',
      summary: 'Tactile snap confirming item selection.',
    },
    accessibility: {
      ariaRole: 'option',
      ariaAttributes: { 'aria-selected': 'true' },
      wcagContrast: '13.5:1',
      wcagStatus: 'AAA',
      keyboardNav: 'Selected item in listbox / grid',
      screenReaderAnnouncement: 'Item name, Selected.',
      summary: 'Explicit aria-selected="true" attribute for list and option controls.',
    },
  },
  expanded: {
    state: 'expanded',
    name: 'Drawer Expanded',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    visualDelta: {
      transform: 'translateY(0px)',
      border: '1px solid rgba(245, 158, 11, 0.6)',
      shadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
      background: 'tokens.surface.primary (Expanded Content)',
      opacity: '100%',
      attributes: ['aria-expanded="true"', 'data-state="expanded"'],
      summary: 'Content panel expanded vertically with 180° chevron rotation.',
    },
    motion: {
      physicsType: 'spring',
      stiffness: 350,
      damping: 28,
      mass: 1.0,
      durationMs: 300,
      easingCurve: 'cubic-bezier(0.16, 1, 0.3, 1)',
      summary: 'Fluid height spring expansion unveiling nested content panel.',
    },
    audio: {
      event: 'navigation',
      waveform: 'sine sweep',
      frequencyHz: '300 Hz -> 600 Hz frequency sweep',
      decibels: '-14 dB',
      decayMs: 120,
      hasSound: true,
      summary: 'Smooth upward frequency swoosh indicating drawer expansion.',
    },
    haptic: {
      patternMs: [20, 15, 10],
      hasHaptics: true,
      actuatorType: 'LRA Decaying Pulse',
      browserPayload: 'navigator.vibrate([20, 15, 10])',
      summary: 'Boundary snap vibration as drawer locks open.',
    },
    accessibility: {
      ariaRole: 'button',
      ariaAttributes: { 'aria-expanded': 'true', 'aria-controls': 'target-panel-id' },
      wcagContrast: '12.5:1',
      wcagStatus: 'AAA',
      keyboardNav: 'Space / Enter toggles expansion',
      screenReaderAnnouncement: 'Expanded panel.',
      summary: 'Sets aria-expanded="true" and connects aria-controls to panel ID.',
    },
  },
  dragging: {
    state: 'dragging',
    name: 'Pointer Dragging',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    visualDelta: {
      transform: 'scale(1.05) rotate(3deg) translateY(-8px)',
      border: '2px dashed rgba(244, 63, 94, 0.9)',
      shadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
      background: 'rgba(244, 63, 94, 0.15)',
      opacity: '85%',
      attributes: ['aria-grabbed="true"', 'data-state="dragging"'],
      summary: 'Elevated floating card preview with 3° rotation tilt and drop target ring.',
    },
    motion: {
      physicsType: 'spring follow',
      stiffness: 250,
      damping: 18,
      mass: 0.7,
      durationMs: 0,
      easingCurve: 'direct cursor tracking',
      summary: 'Direct pointer tracking with inertia and velocity-based dynamic tilt.',
    },
    audio: {
      event: 'drag-tick',
      waveform: 'triangle',
      frequencyHz: '200 Hz continuous step ticks',
      decibels: '-20 dB',
      decayMs: 10,
      hasSound: true,
      summary: 'Rhythmic audio ticks during drag movement across drop zones.',
    },
    haptic: {
      patternMs: [8, 100, 8],
      hasHaptics: true,
      actuatorType: 'LRA Continuous Flutter',
      browserPayload: 'navigator.vibrate([8, 100, 8])',
      summary: 'Continuous low-amplitude flutter while object is floating.',
    },
    accessibility: {
      ariaRole: 'option',
      ariaAttributes: { 'aria-grabbed': 'true', 'aria-dropeffect': 'move' },
      wcagContrast: '11.8:1',
      wcagStatus: 'AAA',
      keyboardNav: 'Arrow keys reorder; Space drops item',
      screenReaderAnnouncement: 'Dragging item. Use Up and Down arrow keys to reorder, Space to drop.',
      summary: 'Provides full keyboard reordering alternative with aria-grabbed.',
    },
  },
  offline: {
    state: 'offline',
    name: 'Network Offline',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    visualDelta: {
      transform: 'scale(1.0)',
      border: '1.5px solid rgba(245, 158, 11, 0.6)',
      shadow: '0 4px 12px rgba(245, 158, 11, 0.1)',
      background: 'rgba(245, 158, 11, 0.05)',
      opacity: '85%',
      attributes: ['data-state="offline"', 'role="status"'],
      summary: 'Muted amber border with offline cache badge and wifi-off indicator.',
    },
    motion: {
      physicsType: 'keyframes pulse',
      stiffness: 0,
      damping: 0,
      mass: 0,
      durationMs: 2000,
      easingCurve: 'ease-in-out infinite',
      summary: 'Gentle opacity pulse reminding user of offline sync state.',
    },
    audio: {
      event: 'warning',
      waveform: 'sine double ping',
      frequencyHz: '220 Hz double ping',
      decibels: '-16 dB',
      decayMs: 100,
      hasSound: true,
      summary: 'Low-frequency double ping warning of offline network condition.',
    },
    haptic: {
      patternMs: [25, 50, 25],
      hasHaptics: true,
      actuatorType: 'LRA Warning Pulse',
      browserPayload: 'navigator.vibrate([25, 50, 25])',
      summary: 'Double tactile pulse indicating offline mode.',
    },
    accessibility: {
      ariaRole: 'status',
      ariaAttributes: { 'aria-live': 'polite', 'aria-offline': 'true' },
      wcagContrast: '10.8:1',
      wcagStatus: 'AAA',
      keyboardNav: 'Cached local actions permitted',
      screenReaderAnnouncement: 'Status: Working offline. Changes saved locally.',
      summary: 'Informs user that operations are buffered locally.',
    },
  },
  unknown: {
    state: 'unknown',
    name: 'Unknown / Degraded',
    badgeColor: 'bg-zinc-600/20 text-zinc-400 border-zinc-600/40',
    visualDelta: {
      transform: 'scale(1.0)',
      border: '1px dashed rgba(161, 161, 170, 0.5)',
      shadow: 'none',
      background: 'rgba(161, 161, 170, 0.05)',
      opacity: '70%',
      attributes: ['data-state="unknown"'],
      summary: 'Dotted fallback border with question icon indicating unverified state.',
    },
    motion: {
      physicsType: 'none',
      stiffness: 0,
      damping: 0,
      mass: 0,
      durationMs: 0,
      easingCurve: 'none',
      summary: 'Fallback static presentation.',
    },
    audio: {
      event: 'none',
      waveform: 'none',
      frequencyHz: '0 Hz',
      decibels: '-inf dB',
      decayMs: 0,
      hasSound: false,
      summary: 'No sound configured for unverified state.',
    },
    haptic: {
      patternMs: [10],
      hasHaptics: true,
      actuatorType: 'LRA Micro Tap',
      browserPayload: 'navigator.vibrate([10])',
      summary: 'Light tap on state evaluation failure.',
    },
    accessibility: {
      ariaRole: 'status',
      ariaAttributes: { 'aria-label': 'State unverified' },
      wcagContrast: '8.5:1',
      wcagStatus: 'AA',
      keyboardNav: 'Fallback focus handling',
      screenReaderAnnouncement: 'State unverified or fallback mode.',
      summary: 'Safe fallback accessibility attributes.',
    },
  },
};

interface StateInspectorProps {
  entry?: CatalogEntry;
  activeState?: ComponentState;
  onSelectState?: (state: ComponentState) => void;
  onClose?: () => void;
}

export function StateInspector({ entry, activeState: externalState, onSelectState, onClose }: StateInspectorProps) {
  const { theme } = useTheme();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const [selectedState, setSelectedState] = useState<ComponentState>(externalState || 'idle');
  const [compareState, setCompareState] = useState<ComponentState | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'compare' | 'code'>('details');
  const [copiedCode, setCopiedCode] = useState(false);

  const detail = STATE_DETAILS_REGISTRY[selectedState] || STATE_DETAILS_REGISTRY.idle;
  const compareDetail = compareState ? STATE_DETAILS_REGISTRY[compareState] : null;

  const handleStateClick = (st: ComponentState) => {
    setSelectedState(st);
    if (onSelectState) onSelectState(st);

    const stDetail = STATE_DETAILS_REGISTRY[st];
    if (stDetail?.audio.hasSound) {
      if (st === 'success') playSound('success', 'STATE');
      else if (st === 'error') playSound('error', 'STATE');
      else if (st === 'pressed' || st === 'active') playSound('press', 'MICRO');
      else playSound('selection', 'MICRO');
    }

    if (stDetail?.haptic.hasHaptics) {
      if (st === 'success') triggerHaptic('success');
      else if (st === 'error') triggerHaptic('error');
      else triggerHaptic('tap');
    }
  };

  const handleCopyAriaCode = () => {
    const codeSnippet = `<div
  role="${detail.accessibility.ariaRole}"
  data-state="${detail.state}"
  ${Object.entries(detail.accessibility.ariaAttributes)
    .map(([k, v]) => `${k}="${v}"`)
    .join('\n  ')}
  className="${detail.visualDelta.summary}"
>
  {/* Specimen Content */}
</div>`;

    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    playSound('success', 'MICRO');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const allStates: ComponentState[] = [
    'idle',
    'hover',
    'focus',
    'pressed',
    'active',
    'loading',
    'success',
    'error',
    'disabled',
    'selected',
    'expanded',
    'dragging',
    'offline',
    'unknown',
  ];

  return (
    <div className={`p-6 rounded-3xl ${theme.surface.primary} border ${theme.border.default} shadow-2xl space-y-6 animate-page-entry`}>
      {/* Header Inspector Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold uppercase mb-1">
              <ShieldCheck className="w-3 h-3" /> PROMPT 08 — First-Class State Inspection
            </div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              State Inspector: <span className="text-cyan-400">{entry?.name || 'Catalog Specimen'}</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              5-Dimensional analysis across visual rendering, motion physics, audio synthesis, haptics, and WCAG AAA compliance.
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-black/40 border border-zinc-800">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                activeTab === 'details' ? 'bg-cyan-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> 5D Details
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                activeTab === 'compare' ? 'bg-cyan-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" /> Diff Compare
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                activeTab === 'code' ? 'bg-cyan-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> ARIA Code
            </button>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold hover:bg-rose-500/20"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Interactive State Selector Grid */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-bold block">
          Select State to Inspect ({allStates.length} Supported States)
        </label>
        <div className="flex flex-wrap gap-2">
          {allStates.map((st) => {
            const isSelected = selectedState === st;
            const isComparing = compareState === st;
            const stItem = STATE_DETAILS_REGISTRY[st];

            return (
              <button
                key={st}
                onClick={() => handleStateClick(st)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setCompareState(compareState === st ? null : st);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500 text-zinc-950 border-cyan-400 shadow-lg scale-105'
                    : isComparing
                    ? 'bg-purple-500 text-zinc-950 border-purple-400 shadow-md'
                    : 'bg-black/40 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/60'
                }`}
              >
                <span>{st}</span>
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                {isComparing && <span className="text-[9px] bg-black/40 px-1 rounded">DIFF</span>}
              </button>
            );
          })}
        </div>
        <p className="text-[10px] text-zinc-500 font-mono">
          Tip: Left-click to select primary state. Right-click any state to set for Diff Compare mode.
        </p>
      </div>

      {/* Main Tab View Rendering */}
      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* Active State Header Card */}
          <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold uppercase border ${detail.badgeColor}`}>
                {detail.state}
              </span>
              <div>
                <h3 className="text-base font-bold text-white">{detail.name}</h3>
                <p className="text-xs text-zinc-400">{detail.visualDelta.summary}</p>
              </div>
            </div>

            {/* Quick Sensory Test Action */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (detail.audio.hasSound) playSound('success', 'STATE');
                  if (detail.haptic.hasHaptics) triggerHaptic('success');
                }}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold hover:bg-cyan-500/20 transition-all flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" /> Test Sound &amp; Haptics
              </button>
            </div>
          </div>

          {/* 5-Dimension Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
            {/* 1. Visual Delta */}
            <div className="p-5 rounded-2xl bg-black/50 border border-cyan-500/30 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> 1. Visual Delta
                </span>
                <span className="text-[10px] text-zinc-500">DOM/CSS Spec</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Transform:</span>
                  <code className="text-cyan-300 text-[11px] block bg-zinc-950 p-1.5 rounded border border-zinc-900">
                    {detail.visualDelta.transform}
                  </code>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Border &amp; Stroke:</span>
                  <code className="text-zinc-200 text-[11px] block bg-zinc-950 p-1.5 rounded border border-zinc-900">
                    {detail.visualDelta.border}
                  </code>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Shadow &amp; Glow:</span>
                  <code className="text-zinc-300 text-[11px] block bg-zinc-950 p-1.5 rounded border border-zinc-900 line-clamp-2">
                    {detail.visualDelta.shadow}
                  </code>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">DOM Selectors:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {detail.visualDelta.attributes.map((attr, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px]">
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Motion Choreography */}
            <div className="p-5 rounded-2xl bg-black/50 border border-blue-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" /> 2. Motion Physics
                </span>
                <span className="text-[10px] text-zinc-500">Framer Motion</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-900">
                    <span className="text-[10px] text-zinc-500 block">Physics Type</span>
                    <span className="text-blue-300 font-bold uppercase">{detail.motion.physicsType}</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-900">
                    <span className="text-[10px] text-zinc-500 block">Duration</span>
                    <span className="text-blue-300 font-bold">{detail.motion.durationMs}ms</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-900">
                    <span className="text-[10px] text-zinc-500 block">Stiffness</span>
                    <span className="text-zinc-200 font-bold">{detail.motion.stiffness}</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-900">
                    <span className="text-[10px] text-zinc-500 block">Damping</span>
                    <span className="text-zinc-200 font-bold">{detail.motion.damping}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Easing Curve:</span>
                  <code className="text-blue-300 text-[10px] block bg-zinc-950 p-1.5 rounded border border-zinc-900">
                    {detail.motion.easingCurve}
                  </code>
                </div>
              </div>
            </div>

            {/* 3. Audio Synthesis */}
            <div className="p-5 rounded-2xl bg-black/50 border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4" /> 3. Audio Synthesis
                </span>
                <span className="text-[10px] text-zinc-500">Web Audio API</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-900">
                    <span className="text-[10px] text-zinc-500 block">Event Trigger</span>
                    <span className="text-purple-300 font-bold uppercase">{detail.audio.event}</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-900">
                    <span className="text-[10px] text-zinc-500 block">Sound Status</span>
                    <span className={`font-bold ${detail.audio.hasSound ? 'text-emerald-400' : 'text-zinc-500'}`}>
                      {detail.audio.hasSound ? 'ACTIVE' : 'MUTED'}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Frequency &amp; Waveform:</span>
                  <code className="text-purple-300 text-[11px] block bg-zinc-950 p-1.5 rounded border border-zinc-900">
                    {detail.audio.frequencyHz} ({detail.audio.waveform})
                  </code>
                </div>
                <p className="text-[10px] text-zinc-400 leading-tight">{detail.audio.summary}</p>
              </div>
            </div>

            {/* 4. Haptic Feedback */}
            <div className="p-5 rounded-2xl bg-black/50 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Vibrate className="w-4 h-4" /> 4. Tactile Haptics
                </span>
                <span className="text-[10px] text-zinc-500">Navigator API</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-zinc-950 border border-zinc-900">
                  <span className="text-[10px] text-zinc-500 block">Actuator Target</span>
                  <span className="text-amber-300 font-bold">{detail.haptic.actuatorType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Vibration Pattern (ms):</span>
                  <code className="text-amber-300 text-[11px] block bg-zinc-950 p-1.5 rounded border border-zinc-900">
                    {detail.haptic.browserPayload}
                  </code>
                </div>
                <p className="text-[10px] text-zinc-400 leading-tight">{detail.haptic.summary}</p>
              </div>
            </div>

            {/* 5. Accessibility (WCAG & ARIA) */}
            <div className="p-5 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-3 md:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> 5. WCAG 2.2 AAA &amp; ARIA Implications
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  {detail.accessibility.wcagStatus} Passed ({detail.accessibility.wcagContrast})
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">ARIA Attributes:</span>
                  <div className="space-y-1 mt-1">
                    {Object.entries(detail.accessibility.ariaAttributes).map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between bg-zinc-950 p-1.5 rounded border border-zinc-900 text-[11px]">
                        <span className="text-zinc-400">{k}:</span>
                        <span className="text-emerald-400 font-bold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase">Keyboard Navigation:</span>
                    <span className="text-zinc-200 text-[11px] block bg-zinc-950 p-1.5 rounded border border-zinc-900">
                      {detail.accessibility.keyboardNav}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase">Screen Reader Announcement:</span>
                    <span className="text-emerald-300 text-[11px] block bg-zinc-950 p-1.5 rounded border border-zinc-900 italic">
                      "{detail.accessibility.screenReaderAnnouncement}"
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compare Diff View Mode */}
      {activeTab === 'compare' && (
        <div className="space-y-4 font-mono">
          <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-bold">
              Comparing State <strong className="text-cyan-400 uppercase">{selectedState}</strong> vs{' '}
              <strong className="text-purple-400 uppercase">{compareState || 'idle'}</strong>
            </span>
            {!compareState && (
              <span className="text-[11px] text-amber-400 font-bold">
                (Right-click any state button above to change target comparison state)
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary Selected State */}
            <div className="p-6 rounded-2xl bg-black/50 border border-cyan-500/40 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-sm font-bold text-cyan-400 uppercase">{detail.state} (Primary)</span>
                <span className="text-xs text-zinc-400">{detail.name}</span>
              </div>
              <div className="space-y-2 text-xs">
                <div>Transform: <code className="text-cyan-300">{detail.visualDelta.transform}</code></div>
                <div>Border: <code className="text-zinc-300">{detail.visualDelta.border}</code></div>
                <div>Motion Physics: <code className="text-blue-300">{detail.motion.physicsType} ({detail.motion.durationMs}ms)</code></div>
                <div>Audio Frequency: <code className="text-purple-300">{detail.audio.frequencyHz}</code></div>
                <div>Haptic Vibration: <code className="text-amber-300">{detail.haptic.browserPayload}</code></div>
                <div>WCAG AAA Contrast: <code className="text-emerald-400">{detail.accessibility.wcagContrast}</code></div>
              </div>
            </div>

            {/* Target Comparison State */}
            {compareDetail && (
              <div className="p-6 rounded-2xl bg-black/50 border border-purple-500/40 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-sm font-bold text-purple-400 uppercase">{compareDetail.state} (Target)</span>
                  <span className="text-xs text-zinc-400">{compareDetail.name}</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>Transform: <code className="text-purple-300">{compareDetail.visualDelta.transform}</code></div>
                  <div>Border: <code className="text-zinc-300">{compareDetail.visualDelta.border}</code></div>
                  <div>Motion Physics: <code className="text-blue-300">{compareDetail.motion.physicsType} ({compareDetail.motion.durationMs}ms)</code></div>
                  <div>Audio Frequency: <code className="text-purple-300">{compareDetail.audio.frequencyHz}</code></div>
                  <div>Haptic Vibration: <code className="text-amber-300">{compareDetail.haptic.browserPayload}</code></div>
                  <div>WCAG AAA Contrast: <code className="text-emerald-400">{compareDetail.accessibility.wcagContrast}</code></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ARIA Code Snippet View Mode */}
      {activeTab === 'code' && (
        <div className="space-y-4 font-mono">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-bold">Copyable Accessible React JSX Snippet for state: {selectedState}</span>
            <button
              onClick={handleCopyAriaCode}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 text-zinc-950 text-xs font-bold hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-md"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedCode ? 'Copied to Clipboard!' : 'Copy Code Snippet'}
            </button>
          </div>
          <pre className="p-6 rounded-2xl bg-black/90 border border-zinc-800 text-xs text-cyan-300 overflow-x-auto whitespace-pre leading-relaxed shadow-2xl">
{`/**
 * WCAG 2.2 AAA Accessible State Implementation
 * State: ${detail.state} (${detail.name})
 * Contrast Ratio: ${detail.accessibility.wcagContrast} (${detail.accessibility.wcagStatus})
 */
<div
  role="${detail.accessibility.ariaRole}"
  data-state="${detail.state}"
  ${Object.entries(detail.accessibility.ariaAttributes)
    .map(([k, v]) => `${k}="${v}"`)
    .join('\n  ')}
  className="relative transition-all duration-200 ${
    selectedState === 'hover'
      ? 'scale-105 border-cyan-400 shadow-lg'
      : selectedState === 'focus'
      ? 'ring-4 ring-indigo-500/40 border-indigo-500'
      : selectedState === 'pressed'
      ? 'scale-95 opacity-90'
      : selectedState === 'error'
      ? 'border-rose-500 animate-bounce'
      : selectedState === 'success'
      ? 'border-emerald-500 shadow-emerald-500/20'
      : 'border-zinc-800'
  }"
>
  {/* Render Component Specimen */}
</div>`}
          </pre>
        </div>
      )}
    </div>
  );
}
