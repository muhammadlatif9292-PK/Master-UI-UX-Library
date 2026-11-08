/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Zap,
  Lock,
  Unlock,
  Check,
  ChevronRight,
  Shield,
  Gauge as GaugeIcon,
  Sliders,
  RotateCw,
  Power,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Radio,
  Flame,
  Activity,
  ArrowRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { ControlStyle } from './controlTypes';
import { useSound } from '../sound/SoundContext';
import { useHaptics } from '../haptics/HapticContext';

// ============================================================================
// 1. INTERACTIVE SWITCH
// ============================================================================

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  styleVariant?: ControlStyle;
  label?: string;
  sublabel?: string;
  disabled?: boolean;
  id?: string;
}

export function InteractiveSwitch({
  checked,
  onChange,
  styleVariant = 'ios',
  label,
  sublabel,
  disabled = false,
  id = 'interactive-switch',
}: SwitchProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const handleToggle = () => {
    if (disabled) return;
    const next = !checked;
    onChange(next);

    switch (styleVariant) {
      case 'mechanical':
        playSound('action_heavy', 'ACTION');
        triggerHaptic('heavy');
        break;
      case 'lightswitch':
        playSound('toggle', 'MICRO');
        triggerHaptic('medium');
        break;
      case 'neon':
        playSound('laser', 'ACTION');
        triggerHaptic('light');
        break;
      case 'liquid':
        playSound('water_drop', 'MICRO');
        triggerHaptic('soft');
        break;
      case 'magnetic':
        playSound('magnetic_snap', 'ACTION');
        triggerHaptic('rigid');
        break;
      default:
        playSound('toggle', 'MICRO');
        triggerHaptic('light');
        break;
    }
  };

  // --- Style: MECHANICAL LEVER ---
  if (styleVariant === 'mechanical') {
    return (
      <div className="flex items-center gap-3 select-none" id={id}>
        <div
          role="switch"
          aria-checked={checked}
          tabIndex={disabled ? -1 : 0}
          onClick={handleToggle}
          onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleToggle()}
          className={`relative w-20 h-12 rounded-xl bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 p-1.5 border-2 border-zinc-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_4px_10px_rgba(0,0,0,0.5)] cursor-pointer transition-all ${
            disabled ? 'opacity-40 cursor-not-allowed' : 'hover:border-zinc-500'
          }`}
        >
          {/* Metallic switch plate texture & screws */}
          <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-zinc-600 shadow-inner" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-zinc-600 shadow-inner" />
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 rounded-full bg-zinc-600 shadow-inner" />
          <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-zinc-600 shadow-inner" />

          {/* Switch slot */}
          <div className="w-full h-full rounded-lg bg-zinc-950 flex items-center justify-between px-2 overflow-hidden border border-zinc-900 shadow-inner">
            <span className={`text-[9px] font-mono font-black ${checked ? 'text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]' : 'text-zinc-700'}`}>
              ON
            </span>
            <span className={`text-[9px] font-mono font-black ${!checked ? 'text-rose-400 drop-shadow-[0_0_6px_rgba(251,113,133,0.8)]' : 'text-zinc-700'}`}>
              OFF
            </span>
          </div>

          {/* Lever Arm Handle */}
          <motion.div
            animate={{
              x: checked ? 34 : 0,
              rotateZ: checked ? 8 : -8,
            }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            className="absolute top-1.5 left-2 w-7 h-9 rounded-md bg-gradient-to-b from-zinc-200 via-zinc-400 to-zinc-600 border border-white/60 shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.8)] flex items-center justify-center"
          >
            {/* Grip ribbing */}
            <div className="flex flex-col gap-1">
              <div className="w-4 h-0.5 bg-zinc-700/80 rounded-full" />
              <div className="w-4 h-0.5 bg-zinc-700/80 rounded-full" />
              <div className="w-4 h-0.5 bg-zinc-700/80 rounded-full" />
            </div>
            {/* Indicator tip LED */}
            <div
              className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full transition-colors ${
                checked ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-zinc-700'
              }`}
            />
          </motion.div>
        </div>

        {label && (
          <div className="space-y-0.5">
            <label className="text-sm font-semibold text-zinc-100 cursor-pointer" onClick={handleToggle}>
              {label}
            </label>
            {sublabel && <p className="text-xs text-zinc-400">{sublabel}</p>}
          </div>
        )}
      </div>
    );
  }

  // --- Style: LIGHT SWITCH (Domestic Rocker Wall Plate) ---
  if (styleVariant === 'lightswitch') {
    return (
      <div className="flex items-center gap-3 select-none" id={id}>
        <div
          role="switch"
          aria-checked={checked}
          tabIndex={disabled ? -1 : 0}
          onClick={handleToggle}
          onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleToggle()}
          className={`relative w-14 h-20 rounded-2xl bg-zinc-900 border-2 border-zinc-700 p-2 shadow-2xl cursor-pointer flex flex-col items-center justify-center transition-all ${
            disabled ? 'opacity-40 cursor-not-allowed' : 'hover:border-zinc-500'
          }`}
          style={{ perspective: 400 }}
        >
          {/* Wall plate beveled frame */}
          <div className="absolute inset-1 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-zinc-700/50 shadow-inner" />

          {/* 3D Rocker Paddle */}
          <motion.div
            animate={{
              rotateX: checked ? -20 : 20,
              y: checked ? -2 : 2,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className={`relative z-10 w-9 h-14 rounded-lg border flex flex-col items-center justify-between p-1.5 shadow-lg transition-colors ${
              checked
                ? 'bg-gradient-to-b from-zinc-200 to-zinc-400 border-white text-zinc-900 shadow-[0_-4px_12px_rgba(255,255,255,0.2)]'
                : 'bg-gradient-to-b from-zinc-800 to-zinc-900 border-zinc-700 text-zinc-500 shadow-[0_4px_12px_rgba(0,0,0,0.6)]'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${checked ? 'bg-amber-500 shadow-[0_0_6px_#f59e0b]' : 'bg-zinc-700'}`} />
            <div className="w-4 h-0.5 bg-current opacity-30 rounded-full" />
            <span className="text-[8px] font-mono font-bold tracking-tighter uppercase">{checked ? 'ON' : 'OFF'}</span>
          </motion.div>
        </div>

        {label && (
          <div className="space-y-0.5">
            <label className="text-sm font-semibold text-zinc-100 cursor-pointer" onClick={handleToggle}>
              {label}
            </label>
            {sublabel && <p className="text-xs text-zinc-400">{sublabel}</p>}
          </div>
        )}
      </div>
    );
  }

  // --- Style: LIQUID MORPH ---
  if (styleVariant === 'liquid') {
    return (
      <div className="flex items-center gap-3 select-none" id={id}>
        <div
          role="switch"
          aria-checked={checked}
          tabIndex={disabled ? -1 : 0}
          onClick={handleToggle}
          onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleToggle()}
          className={`relative w-16 h-9 rounded-full bg-zinc-950 p-1 border border-zinc-800 shadow-inner cursor-pointer overflow-hidden transition-all ${
            disabled ? 'opacity-40 cursor-not-allowed' : 'hover:border-cyan-500/50'
          }`}
        >
          {/* Liquid pool fill */}
          <motion.div
            animate={{
              width: checked ? '100%' : '30%',
              backgroundColor: checked ? '#06b6d4' : '#27272a',
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="absolute inset-0 rounded-full opacity-60 blur-[1px]"
          />

          {/* Morphing Droplet Thumb */}
          <motion.div
            animate={{
              x: checked ? 28 : 0,
              scaleX: [1, 1.35, 1],
              scaleY: [1, 0.75, 1],
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 16 }}
            className="relative z-10 w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-300 via-cyan-100 to-white shadow-[0_2px_8px_rgba(6,182,212,0.6)] flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-600/40 blur-[0.5px]" />
          </motion.div>
        </div>

        {label && (
          <div className="space-y-0.5">
            <label className="text-sm font-semibold text-zinc-100 cursor-pointer" onClick={handleToggle}>
              {label}
            </label>
            {sublabel && <p className="text-xs text-zinc-400">{sublabel}</p>}
          </div>
        )}
      </div>
    );
  }

  // --- Style: NEON CYBER ---
  if (styleVariant === 'neon') {
    return (
      <div className="flex items-center gap-3 select-none" id={id}>
        <div
          role="switch"
          aria-checked={checked}
          tabIndex={disabled ? -1 : 0}
          onClick={handleToggle}
          onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleToggle()}
          className={`relative w-16 h-8 rounded-lg bg-black border-2 cursor-pointer p-0.5 transition-all ${
            checked
              ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5),inset_0_0_10px_rgba(34,211,238,0.3)]'
              : 'border-zinc-800 shadow-none'
          } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <motion.div
            animate={{
              x: checked ? 32 : 0,
              backgroundColor: checked ? '#22d3ee' : '#3f3f46',
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="w-6 h-6 rounded-md shadow-md flex items-center justify-center"
          >
            <Zap className={`w-3.5 h-3.5 ${checked ? 'text-black fill-black' : 'text-zinc-600'}`} />
          </motion.div>
        </div>

        {label && (
          <div className="space-y-0.5">
            <label className={`text-sm font-mono font-bold uppercase ${checked ? 'text-cyan-400' : 'text-zinc-400'}`}>
              {label}
            </label>
            {sublabel && <p className="text-xs text-zinc-500 font-mono">{sublabel}</p>}
          </div>
        )}
      </div>
    );
  }

  // --- Style: SPATIAL GLASS ---
  if (styleVariant === 'glass') {
    return (
      <div className="flex items-center gap-3 select-none" id={id}>
        <div
          role="switch"
          aria-checked={checked}
          tabIndex={disabled ? -1 : 0}
          onClick={handleToggle}
          onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleToggle()}
          className={`relative w-14 h-8 rounded-full p-1 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] cursor-pointer transition-all ${
            checked ? 'bg-indigo-600/40 border-indigo-400/50' : 'bg-white/10'
          } ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <motion.div
            animate={{
              x: checked ? 24 : 0,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="w-6 h-6 rounded-full bg-gradient-to-b from-white to-zinc-200 shadow-md border border-white flex items-center justify-center"
          />
        </div>

        {label && (
          <div className="space-y-0.5">
            <label className="text-sm font-medium text-zinc-200 cursor-pointer" onClick={handleToggle}>
              {label}
            </label>
            {sublabel && <p className="text-xs text-zinc-400">{sublabel}</p>}
          </div>
        )}
      </div>
    );
  }

  // --- Default: iOS-LIKE REFINED SWITCH ---
  return (
    <div className="flex items-center gap-3 select-none" id={id}>
      <div
        role="switch"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onClick={handleToggle}
        onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleToggle()}
        className={`relative w-13 h-7.5 rounded-full p-0.5 cursor-pointer transition-colors duration-200 ease-in-out ${
          checked ? 'bg-emerald-500' : 'bg-zinc-800'
        } ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-95'}`}
      >
        <motion.div
          animate={{
            x: checked ? 22 : 0,
            scale: checked ? 1 : 0.96,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="w-6.5 h-6.5 rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.3)] flex items-center justify-center"
        />
      </div>

      {label && (
        <div className="space-y-0.5">
          <label className="text-sm font-semibold text-zinc-100 cursor-pointer" onClick={handleToggle}>
            {label}
          </label>
          {sublabel && <p className="text-xs text-zinc-400">{sublabel}</p>}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 2. INTERACTIVE CHECKBOX
// ============================================================================

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  styleVariant?: ControlStyle;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
}

export function InteractiveCheckbox({
  checked,
  onChange,
  styleVariant = 'tactile',
  label,
  description,
  disabled = false,
  id = 'interactive-checkbox',
}: CheckboxProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const handleToggle = () => {
    if (disabled) return;
    const next = !checked;
    onChange(next);

    if (styleVariant === 'neon') {
      playSound('laser', 'MICRO');
      triggerHaptic('light');
    } else if (styleVariant === 'tactile') {
      playSound('tap', 'MICRO');
      triggerHaptic('medium');
    } else {
      playSound('toggle', 'MICRO');
      triggerHaptic('light');
    }
  };

  return (
    <div
      id={id}
      onClick={handleToggle}
      role="checkbox"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleToggle()}
      className={`group flex items-start gap-3 p-2 rounded-xl cursor-pointer select-none transition-colors ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-zinc-900/60'
      }`}
    >
      <div
        className={`relative w-5.5 h-5.5 rounded-lg border-2 flex items-center justify-center transition-all ${
          checked
            ? styleVariant === 'neon'
              ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]'
              : 'bg-emerald-500 border-emerald-500 text-black shadow-md'
            : 'bg-zinc-900 border-zinc-700 group-hover:border-zinc-500'
        }`}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 20 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <Check className={`w-3.5 h-3.5 stroke-[3] ${styleVariant === 'neon' ? 'text-cyan-300' : 'text-black'}`} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {(label || description) && (
        <div className="space-y-0.5 pt-0.5">
          {label && <p className="text-sm font-semibold text-zinc-200">{label}</p>}
          {description && <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 3. INTERACTIVE RADIO GROUP
// ============================================================================

export interface RadioOption {
  id: string;
  label: string;
  desc?: string;
  badge?: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  styleVariant?: ControlStyle;
  name?: string;
  id?: string;
}

export function InteractiveRadioGroup({
  options,
  value,
  onChange,
  styleVariant = 'orbit',
  name = 'radio-group',
  id = 'interactive-radio-group',
}: RadioGroupProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const handleSelect = (val: string) => {
    if (val === value) return;
    onChange(val);
    playSound('tap', 'MICRO');
    triggerHaptic('light');
  };

  return (
    <div className="space-y-2 select-none" id={id} role="radiogroup">
      {options.map((opt) => {
        const isSelected = opt.id === value;

        return (
          <div
            key={opt.id}
            onClick={() => handleSelect(opt.id)}
            role="radio"
            aria-checked={isSelected}
            tabIndex={0}
            onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleSelect(opt.id)}
            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
              isSelected
                ? styleVariant === 'neon'
                  ? 'bg-cyan-950/30 border-cyan-500/80 shadow-[0_0_15px_rgba(34,211,238,0.2)] ring-1 ring-cyan-500/30'
                  : 'bg-zinc-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Radio Indicator */}
              <div
                className={`relative w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? styleVariant === 'neon'
                      ? 'border-cyan-400 bg-cyan-950/80 shadow-[0_0_8px_#22d3ee]'
                      : 'border-emerald-500 bg-emerald-950/40'
                    : 'border-zinc-700 bg-zinc-900 group-hover:border-zinc-600'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId={`radio-dot-${name}`}
                    className={`w-2.5 h-2.5 rounded-full ${
                      styleVariant === 'neon' ? 'bg-cyan-300' : 'bg-emerald-400'
                    }`}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>

              <div>
                <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                  {opt.label}
                </span>
                {opt.desc && <p className="text-[11px] text-zinc-400 mt-0.5">{opt.desc}</p>}
              </div>
            </div>

            {opt.badge && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase bg-zinc-800 text-zinc-400 border border-zinc-700">
                {opt.badge}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// 4. INTERACTIVE SEGMENTED CONTROL
// ============================================================================

export interface SegmentedOption {
  id: string;
  label: string;
  icon?: any;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value: string;
  onChange: (val: string) => void;
  styleVariant?: ControlStyle;
  id?: string;
}

export function InteractiveSegmentedControl({
  options,
  value,
  onChange,
  styleVariant = 'ios',
  id = 'interactive-segmented',
}: SegmentedControlProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const handleSelect = (optId: string) => {
    if (optId === value) return;
    onChange(optId);
    playSound('SWITCH');
    triggerHaptic('light');
  };

  return (
    <div
      id={id}
      className={`relative p-1 rounded-2xl flex items-center gap-1 select-none ${
        styleVariant === 'hud'
          ? 'bg-black border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] font-mono'
          : styleVariant === 'glass'
          ? 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg'
          : 'bg-zinc-900/90 border border-zinc-800 shadow-inner'
      }`}
    >
      {options.map((opt) => {
        const isSelected = opt.id === value;

        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => handleSelect(opt.id)}
            className={`relative z-10 flex-1 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              isSelected
                ? styleVariant === 'hud'
                  ? 'text-cyan-300 font-bold'
                  : 'text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId={`segment-pill-${id}`}
                className={`absolute inset-0 rounded-xl shadow-md ${
                  styleVariant === 'hud'
                    ? 'bg-cyan-950/70 border border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : styleVariant === 'glass'
                    ? 'bg-white/15 border border-white/25 shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
                    : 'bg-zinc-800 border border-zinc-700 shadow-[0_2px_8px_rgba(0,0,0,0.5)]'
                }`}
                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-1.5">
              {opt.icon && <opt.icon className="w-3.5 h-3.5" />}
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// 5. INTERACTIVE SLIDER
// ============================================================================

export interface SliderProps {
  value: number; // 0 to 100
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  styleVariant?: ControlStyle;
  label?: string;
  unit?: string;
  id?: string;
}

export function InteractiveSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  styleVariant = 'spring',
  label,
  unit = '%',
  id = 'interactive-slider',
}: SliderProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = Number(e.target.value);
    onChange(next);

    // Light tick on discrete steps
    if (Math.abs(next - value) >= 5) {
      playSound('tap', 'MICRO');
      triggerHaptic('soft');
    }
  };

  return (
    <div className="space-y-2 select-none" id={id}>
      <div className="flex items-center justify-between text-xs">
        {label && <span className="font-semibold text-zinc-300">{label}</span>}
        <span className="font-mono font-bold text-cyan-400">
          {value}
          {unit}
        </span>
      </div>

      <div className="relative py-2 flex items-center">
        {/* Track background */}
        <div
          className={`w-full h-2.5 rounded-full overflow-hidden ${
            styleVariant === 'neon'
              ? 'bg-zinc-950 border border-cyan-900/60'
              : 'bg-zinc-900 border border-zinc-800'
          }`}
        >
          {/* Active fill track */}
          <motion.div
            className={`h-full ${
              styleVariant === 'neon'
                ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_12px_#22d3ee]'
                : styleVariant === 'waveform'
                ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
                : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
            }`}
            style={{ width: `${percentage}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        </div>

        {/* Real Native Range Input overlay */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />

        {/* Custom Visual Thumb */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.6)] border-2 border-zinc-300 pointer-events-none flex items-center justify-center z-10"
          style={{ left: `calc(${percentage}% - 12px)` }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-2 h-2 rounded-full bg-zinc-800" />
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. INTERACTIVE RANGE SELECTOR (Dual Thumb)
// ============================================================================

export interface RangeSelectorProps {
  minVal: number;
  maxVal: number;
  minLimit?: number;
  maxLimit?: number;
  onChange: (min: number, max: number) => void;
  label?: string;
  unit?: string;
  id?: string;
}

export function InteractiveRangeSelector({
  minVal,
  maxVal,
  minLimit = 0,
  maxLimit = 100,
  onChange,
  label = 'Dual Bounds',
  unit = 'ms',
  id = 'range-selector',
}: RangeSelectorProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), maxVal - 5);
    onChange(val, maxVal);
    playSound('tap', 'MICRO');
    triggerHaptic('soft');
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), minVal + 5);
    onChange(minVal, val);
    playSound('tap', 'MICRO');
    triggerHaptic('soft');
  };

  const minPercent = ((minVal - minLimit) / (maxLimit - minLimit)) * 100;
  const maxPercent = ((maxVal - minLimit) / (maxLimit - minLimit)) * 100;

  return (
    <div className="space-y-3 select-none" id={id}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-zinc-300">{label}</span>
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="text-emerald-400 font-bold">{minVal}{unit}</span>
          <span className="text-zinc-600">→</span>
          <span className="text-cyan-400 font-bold">{maxVal}{unit}</span>
        </div>
      </div>

      <div className="relative h-6 flex items-center">
        {/* Base Track */}
        <div className="w-full h-2.5 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden relative">
          <div
            className="absolute top-0 bottom-0 bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-md"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        </div>

        {/* Left Thumb Input */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={minVal}
          onChange={handleMinChange}
          className="absolute inset-0 w-full opacity-0 cursor-pointer pointer-events-auto z-30"
        />

        {/* Right Thumb Input */}
        <input
          type="range"
          min={minLimit}
          max={maxLimit}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute inset-0 w-full opacity-0 cursor-pointer pointer-events-auto z-30"
        />

        {/* Left Visual Thumb */}
        <div
          className="absolute w-5 h-5 rounded-full bg-white border-2 border-emerald-500 shadow-lg pointer-events-none z-20 flex items-center justify-center"
          style={{ left: `calc(${minPercent}% - 10px)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        </div>

        {/* Right Visual Thumb */}
        <div
          className="absolute w-5 h-5 rounded-full bg-white border-2 border-cyan-500 shadow-lg pointer-events-none z-20 flex items-center justify-center"
          style={{ left: `calc(${maxPercent}% - 10px)` }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 7. INTERACTIVE ROTARY KNOB (Angle Drag with Polar Atan2)
// ============================================================================

export interface KnobProps {
  value: number; // 0 to 100
  onChange: (val: number) => void;
  styleVariant?: ControlStyle;
  label?: string;
  unit?: string;
  stepped?: boolean;
  steps?: number;
  id?: string;
}

export function InteractiveKnob({
  value,
  onChange,
  styleVariant = 'analog',
  label = 'Gain',
  unit = 'dB',
  stepped = false,
  steps = 11,
  id = 'interactive-knob',
}: KnobProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const knobRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Map 0..100 to angle range: -135deg to +135deg (270deg total sweep)
  const angle = (value / 100) * 270 - 135;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    playSound('tap', 'MICRO');
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !knobRef.current) return;
    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    // calculate angle in radians from positive Y axis
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;

    // Clamp sweep to 225 deg (bottom-left) to 135 deg (bottom-right)
    // Map deg to 0..100
    let normalized = 0;
    if (deg >= 225) {
      normalized = (deg - 225) / 270;
    } else if (deg <= 135) {
      normalized = (deg + 135) / 270;
    } else {
      // dead zone at bottom
      normalized = deg > 180 ? 0 : 1;
    }

    let nextVal = Math.round(Math.min(100, Math.max(0, normalized * 100)));

    if (stepped) {
      const stepSize = 100 / (steps - 1);
      nextVal = Math.round(nextVal / stepSize) * stepSize;
    }

    if (nextVal !== value) {
      onChange(nextVal);
      playSound('tap', 'MICRO');
      triggerHaptic('soft');
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div className="flex flex-col items-center gap-2 select-none" id={id}>
      <div className="text-center">
        <span className="text-xs font-semibold text-zinc-300">{label}</span>
      </div>

      <div
        ref={knobRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-24 h-24 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing p-1 touch-none"
      >
        {/* Calibrated Ticks */}
        <div className="absolute inset-0 rounded-full">
          {Array.from({ length: 11 }).map((_, i) => {
            const tickAngle = (i / 10) * 270 - 135;
            const active = (i / 10) * 100 <= value;
            return (
              <div
                key={i}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 origin-bottom transition-colors"
                style={{
                  height: '46px',
                  transform: `rotate(${tickAngle}deg)`,
                }}
              >
                <div
                  className={`w-0.5 h-1.5 rounded-full ${
                    active ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-zinc-800'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Knob Core Body */}
        <motion.div
          animate={{ rotate: angle }}
          transition={{ type: 'spring', stiffness: 600, damping: 35 }}
          className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-xl ${
            styleVariant === 'scientific'
              ? 'bg-gradient-to-b from-zinc-800 via-zinc-900 to-black border-cyan-600/60 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
              : 'bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 border-zinc-600'
          }`}
        >
          {/* Metal Top Ridge & Knurling */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-700 shadow-inner flex items-center justify-center">
            {/* Position Marker Pip */}
            <div className="absolute top-1.5 w-1 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          </div>
        </motion.div>
      </div>

      {/* Value Readout */}
      <span className="font-mono text-xs font-bold text-cyan-400">
        {value} {unit}
      </span>
    </div>
  );
}

// ============================================================================
// 8. INTERACTIVE RADIAL DIAL
// ============================================================================

export interface RadialDialProps {
  value: number; // 0 to 100
  target?: number;
  onChange: (val: number) => void;
  label?: string;
  unit?: string;
  id?: string;
}

export function InteractiveRadialDial({
  value,
  target = 75,
  onChange,
  label = 'Power Vector',
  unit = 'kW',
  id = 'radial-dial',
}: RadialDialProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 select-none" id={id}>
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background Ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#27272a"
            strokeWidth="8"
          />
          {/* Target Pip */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#f59e0b"
            strokeWidth="8"
            strokeDasharray={`2 ${circumference}`}
            strokeDashoffset={circumference - (target / 100) * circumference}
          />
          {/* Active Value Arc */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="url(#radialGradient)"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
          <defs>
            <linearGradient id="radialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs font-mono font-bold text-white">{value}</span>
          <span className="text-[9px] font-mono text-zinc-500 uppercase">{unit}</span>
        </div>
      </div>

      <span className="text-xs font-semibold text-zinc-400">{label}</span>
    </div>
  );
}

// ============================================================================
// 9. INTERACTIVE ANALOG METER (Galvanometer VU Meter)
// ============================================================================

export interface MeterProps {
  value: number; // 0 to 100 (dB or Signal)
  peak?: number;
  label?: string;
  id?: string;
}

export function InteractiveAnalogMeter({
  value,
  peak = 85,
  label = 'Master Output VU',
  id = 'analog-vu-meter',
}: MeterProps) {
  // Needle sweep angle: -45deg to +45deg
  const needleAngle = (value / 100) * 90 - 45;
  const isRedline = value > 80;

  return (
    <div
      id={id}
      className="relative w-64 h-36 rounded-2xl bg-gradient-to-b from-amber-50/90 via-amber-100/90 to-amber-200/90 border-4 border-zinc-800 shadow-[inset_0_4px_12px_rgba(0,0,0,0.5),0_10px_25px_rgba(0,0,0,0.6)] p-3 overflow-hidden select-none"
    >
      {/* Vintage Meter Warm Amber Glow & Glass Specular Reflection */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />

      {/* Meter Scale Arc */}
      <div className="relative w-full h-full flex flex-col justify-between">
        {/* Scale Markings */}
        <div className="flex justify-between items-center px-4 pt-1 font-mono text-[9px] font-bold text-zinc-800">
          <span>-20</span>
          <span>-10</span>
          <span>-5</span>
          <span>0 dB</span>
          <span className="text-rose-600 font-extrabold">+3</span>
          <span className="text-rose-700 font-extrabold">+6</span>
        </div>

        {/* Curved Scale Line graphic */}
        <div className="w-full h-1.5 rounded-full bg-gradient-to-r from-zinc-700 via-zinc-700 70% to-rose-600 opacity-80" />

        {/* Center Label */}
        <div className="text-center">
          <p className="text-[10px] font-mono font-bold tracking-widest text-zinc-800 uppercase">{label}</p>
        </div>

        {/* Galvanometer Needle & Ballistic Pivot */}
        <div className="relative w-full flex justify-center">
          {/* Needle stick */}
          <motion.div
            animate={{ rotate: needleAngle }}
            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
            className="absolute bottom-0 w-0.5 h-24 bg-zinc-900 origin-bottom shadow-sm"
          >
            {/* Needle tip indicator */}
            <div className={`w-1 h-3 -ml-0.25 rounded-t-full ${isRedline ? 'bg-rose-600' : 'bg-zinc-900'}`} />
          </motion.div>

          {/* Pivot cap */}
          <div className="relative z-10 w-8 h-4 bg-zinc-900 rounded-t-full border-2 border-zinc-700 shadow-md" />
        </div>
      </div>

      {/* Peak LED indicator */}
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <span className="text-[8px] font-mono text-zinc-700 font-bold">PEAK</span>
        <div
          className={`w-2 h-2 rounded-full transition-colors ${
            value >= peak ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e]' : 'bg-zinc-400'
          }`}
        />
      </div>
    </div>
  );
}

// ============================================================================
// 10. INTERACTIVE PRESSURE GAUGE (Bourdon Tube Metaphor)
// ============================================================================

export interface PressureGaugeProps {
  pressure: number; // 0 to 120 PSI
  maxPressure?: number;
  onReliefValve?: () => void;
  id?: string;
}

export function InteractivePressureGauge({
  pressure,
  maxPressure = 120,
  onReliefValve,
  id = 'pressure-gauge',
}: PressureGaugeProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const percentage = Math.min(1, Math.max(0, pressure / maxPressure));
  // Sweep from -125deg to +125deg (250deg total)
  const needleAngle = percentage * 250 - 125;
  const inDangerZone = pressure > 90;

  const handleRelief = () => {
    playSound('steam', 'ACTION');
    triggerHaptic('heavy');
    if (onReliefValve) onReliefValve();
  };

  return (
    <div className="flex flex-col items-center gap-3 select-none" id={id}>
      <div className="relative w-44 h-44 rounded-full bg-gradient-to-b from-zinc-800 via-zinc-900 to-black p-2 border-4 border-zinc-600 shadow-[0_12px_32px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center">
        {/* Dial Face Plate */}
        <div className="relative w-full h-full rounded-full bg-zinc-950 border border-zinc-800 flex flex-col items-center justify-between p-3 overflow-hidden">
          {/* Pressure scale graduation marks */}
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 13 }).map((_, i) => {
              const markAngle = (i / 12) * 250 - 125;
              const isRed = i >= 9;
              return (
                <div
                  key={i}
                  className="absolute w-0.5 origin-bottom"
                  style={{
                    height: '68px',
                    transform: `rotate(${markAngle}deg)`,
                  }}
                >
                  <div className={`w-0.5 h-2.5 ${isRed ? 'bg-rose-500' : 'bg-zinc-400'}`} />
                </div>
              );
            })}
          </div>

          {/* Dial Typography */}
          <div className="relative z-10 pt-2 text-center">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
              PRESSURE
            </span>
            <p className="text-[8px] font-mono text-zinc-600">BOURDON INSTRUMENTS</p>
          </div>

          <div className="relative z-10 text-center pb-2">
            <span
              className={`text-sm font-mono font-extrabold ${
                inDangerZone ? 'text-rose-400 drop-shadow-[0_0_8px_#f43f5e]' : 'text-cyan-400'
              }`}
            >
              {pressure} PSI
            </span>
          </div>

          {/* Needle with Inertia & Jitter */}
          <motion.div
            animate={{
              rotate: needleAngle + (inDangerZone ? (Math.random() - 0.5) * 4 : 0),
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 16 }}
            className="absolute w-0.5 h-16 bg-rose-500 origin-bottom shadow-lg z-20"
            style={{ bottom: '50%' }}
          >
            <div className="w-1.5 h-4 -ml-0.5 rounded-t-full bg-rose-400" />
          </motion.div>

          {/* Center Brass Cap */}
          <div className="absolute z-30 w-5 h-5 rounded-full bg-gradient-to-tr from-amber-700 to-amber-400 border border-amber-300 shadow-md" />
        </div>
      </div>

      {/* Manual Pressure Relief Valve Trigger */}
      {onReliefValve && (
        <button
          type="button"
          onClick={handleRelief}
          className="px-3.5 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-bold font-mono transition-colors flex items-center gap-1.5 shadow-md"
        >
          <Flame className="w-3.5 h-3.5 text-rose-400" />
          <span>Release Valve</span>
        </button>
      )}
    </div>
  );
}

// ============================================================================
// 11. INTERACTIVE STEPPER (Hold-to-Accelerate)
// ============================================================================

export interface StepperProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (val: number) => void;
  label?: string;
  id?: string;
}

export function InteractiveStepper({
  value,
  min = 0,
  max = 999,
  step = 1,
  onChange,
  label = 'Batch Size',
  id = 'interactive-stepper',
}: StepperProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const increment = () => {
    if (value + step <= max) {
      onChange(value + step);
      playSound('tap', 'MICRO');
      triggerHaptic('light');
    }
  };

  const decrement = () => {
    if (value - step >= min) {
      onChange(value - step);
      playSound('tap', 'MICRO');
      triggerHaptic('light');
    }
  };

  const handleHold = (action: 'inc' | 'dec') => {
    action === 'inc' ? increment() : decrement();
    let speed = 200;

    const loop = () => {
      timerRef.current = setTimeout(() => {
        action === 'inc' ? increment() : decrement();
        speed = Math.max(40, speed * 0.85); // Accelerate
        loop();
      }, speed);
    };

    loop();
  };

  const clearHold = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="space-y-1.5 select-none" id={id}>
      {label && <span className="text-xs font-semibold text-zinc-400">{label}</span>}

      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800 w-fit">
        {/* Decrement Button */}
        <button
          type="button"
          onMouseDown={() => handleHold('dec')}
          onMouseUp={clearHold}
          onMouseLeave={clearHold}
          onTouchStart={() => handleHold('dec')}
          onTouchEnd={clearHold}
          disabled={value <= min}
          className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Digital Value Drum */}
        <div className="w-16 text-center">
          <span className="font-mono text-sm font-bold text-cyan-400">{value}</span>
        </div>

        {/* Increment Button */}
        <button
          type="button"
          onMouseDown={() => handleHold('inc')}
          onMouseUp={clearHold}
          onMouseLeave={clearHold}
          onTouchStart={() => handleHold('inc')}
          onTouchEnd={clearHold}
          disabled={value >= max}
          className="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors shadow-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 12. INTERACTIVE DRAG-TO-CONFIRM
// ============================================================================

export interface DragToConfirmProps {
  onConfirm: () => void;
  label?: string;
  confirmedLabel?: string;
  disabled?: boolean;
  id?: string;
}

export function InteractiveDragToConfirm({
  onConfirm,
  label = 'Drag to Confirm Action',
  confirmedLabel = 'Confirmed & Executed',
  disabled = false,
  id = 'drag-to-confirm',
}: DragToConfirmProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const [confirmed, setConfirmed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  const handleDragEnd = () => {
    if (!containerRef.current || confirmed) return;
    const maxDrag = containerRef.current.clientWidth - 56;

    if (dragX.get() >= maxDrag * 0.85) {
      setConfirmed(true);
      playSound('success', 'ACTION');
      triggerHaptic('success');
      onConfirm();
    } else {
      dragX.set(0);
      playSound('collapse', 'MICRO');
      triggerHaptic('light');
    }
  };

  const handleReset = () => {
    setConfirmed(false);
    dragX.set(0);
    playSound('toggle', 'MICRO');
  };

  return (
    <div className="space-y-2 select-none w-full max-w-sm" id={id}>
      <div
        ref={containerRef}
        className={`relative h-14 rounded-2xl p-1.5 flex items-center overflow-hidden border transition-all ${
          confirmed
            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
            : 'bg-zinc-900/90 border-zinc-800 text-zinc-400'
        }`}
      >
        {/* Shimmering Guidance Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-semibold uppercase tracking-wider">
          {confirmed ? confirmedLabel : label}
        </div>

        {/* Interactive Drag Handle */}
        {!confirmed ? (
          <motion.div
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.05}
            dragMomentum={false}
            style={{ x: dragX }}
            onDragEnd={handleDragEnd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 text-black flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg"
          >
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </motion.div>
        ) : (
          <div className="relative z-10 w-11 h-11 rounded-xl bg-emerald-500 text-black flex items-center justify-center shadow-lg ml-auto">
            <Check className="w-5 h-5 stroke-[3]" />
          </div>
        )}
      </div>

      {confirmed && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Slider</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 13. INTERACTIVE SLIDE-TO-UNLOCK
// ============================================================================

export interface SlideToUnlockProps {
  onUnlock: () => void;
  label?: string;
  id?: string;
}

export function InteractiveSlideToUnlock({
  onUnlock,
  label = 'Slide to Unlock Terminal',
  id = 'slide-to-unlock',
}: SlideToUnlockProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const [unlocked, setUnlocked] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const handleDragEnd = () => {
    if (!trackRef.current || unlocked) return;
    const max = trackRef.current.clientWidth - 56;

    if (x.get() >= max * 0.85) {
      setUnlocked(true);
      playSound('unlock', 'ACTION');
      triggerHaptic('success');
      onUnlock();
    } else {
      x.set(0);
      playSound('collapse', 'MICRO');
    }
  };

  return (
    <div className="space-y-2 select-none w-full max-w-sm" id={id}>
      <div
        ref={trackRef}
        className={`relative h-14 rounded-full p-1.5 flex items-center overflow-hidden border transition-all ${
          unlocked
            ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
            : 'bg-black/90 border-zinc-800 text-zinc-300'
        }`}
      >
        {/* Shimmering Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-xs font-mono uppercase tracking-widest">
          {unlocked ? 'Terminal Unlocked' : label}
        </div>

        {!unlocked ? (
          <motion.div
            drag="x"
            dragConstraints={trackRef}
            dragElastic={0.05}
            dragMomentum={false}
            style={{ x }}
            onDragEnd={handleDragEnd}
            className="relative z-10 w-11 h-11 rounded-full bg-white text-zinc-900 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </motion.div>
        ) : (
          <div className="relative z-10 w-11 h-11 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-lg ml-auto">
            <Unlock className="w-5 h-5" />
          </div>
        )}
      </div>

      {unlocked && (
        <button
          type="button"
          onClick={() => {
            setUnlocked(false);
            x.set(0);
            playSound('lock', 'MICRO');
          }}
          className="text-[11px] font-mono text-zinc-400 hover:text-white flex items-center gap-1 mx-auto transition-colors"
        >
          <Lock className="w-3 h-3" />
          <span>Relock Terminal</span>
        </button>
      )}
    </div>
  );
}
