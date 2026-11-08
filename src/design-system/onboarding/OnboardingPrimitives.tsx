/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronRight,
  ChevronLeft,
  Check,
  HelpCircle,
  Sparkles,
  RotateCcw,
  Eye,
  EyeOff,
  Info,
  ArrowRight,
  Clock,
  Zap,
} from 'lucide-react';
import { useSound } from '../sound/SoundContext';
import { useHaptics } from '../haptics/HapticContext';
import { CoachMarkConfig, ContextualHintConfig, SpotlightTargetRect } from './onboardingTypes';

/**
 * 1. SPOTLIGHT COMPONENT
 * Focused cutout overlay isolating target UI elements with beacon pulse,
 * keyboard controls (Esc to skip, Arrows to navigate), and zero forced delays.
 */
interface SpotlightTourProps {
  isOpen: boolean;
  targetRect: SpotlightTargetRect | null;
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

export function SpotlightTour({
  isOpen,
  targetRect,
  currentStep,
  totalSteps,
  title,
  description,
  placement = 'bottom',
  onNext,
  onPrev,
  onSkip,
  onComplete,
}: SpotlightTourProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSkip();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentStep < totalSteps - 1) onNext();
        else onComplete();
      } else if (e.key === 'ArrowLeft') {
        if (currentStep > 0) onPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, totalSteps, onNext, onPrev, onSkip, onComplete]);

  if (!isOpen) return null;

  const isLastStep = currentStep === totalSteps - 1;

  // Calculate popover positioning relative to target or center fallback
  const pad = 12;
  let popoverStyle: React.CSSProperties = {
    position: 'fixed',
    zIndex: 9999,
  };

  if (targetRect) {
    if (placement === 'bottom') {
      popoverStyle = {
        position: 'fixed',
        top: targetRect.y + targetRect.height + pad,
        left: Math.max(16, targetRect.x + targetRect.width / 2 - 160),
        zIndex: 9999,
      };
    } else if (placement === 'top') {
      popoverStyle = {
        position: 'fixed',
        bottom: window.innerHeight - targetRect.y + pad,
        left: Math.max(16, targetRect.x + targetRect.width / 2 - 160),
        zIndex: 9999,
      };
    } else if (placement === 'right') {
      popoverStyle = {
        position: 'fixed',
        top: Math.max(16, targetRect.y),
        left: targetRect.x + targetRect.width + pad,
        zIndex: 9999,
      };
    } else {
      popoverStyle = {
        position: 'fixed',
        top: Math.max(16, targetRect.y),
        right: window.innerWidth - targetRect.x + pad,
        zIndex: 9999,
      };
    }
  } else {
    popoverStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 9999,
    };
  }

  return (
    <div className="fixed inset-0 z-[9990] pointer-events-auto" role="dialog" aria-modal="true">
      {/* SVG Cutout Mask Overlay */}
      <svg className="w-full h-full absolute inset-0 pointer-events-none transition-all duration-300 ease-out">
        <defs>
          <mask id="spotlight-mask">
            {/* White rectangle covers full screen */}
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {/* Black cutout over target rect */}
            {targetRect && (
              <rect
                x={targetRect.x - 6}
                y={targetRect.y - 6}
                width={targetRect.width + 12}
                height={targetRect.height + 12}
                rx={targetRect.borderRadius ?? 12}
                fill="black"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(9, 9, 11, 0.78)"
          mask="url(#spotlight-mask)"
          className="transition-colors duration-300"
        />
      </svg>

      {/* Target Focus Ring & Beacon Ring */}
      {targetRect && (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            top: targetRect.y - 6,
            left: targetRect.x - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
            borderRadius: (targetRect.borderRadius ?? 12) + 2,
            zIndex: 9995,
          }}
          className="pointer-events-none border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.5)] ring-4 ring-cyan-500/20"
        >
          {/* Animated beacon pip */}
          <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
          </span>
        </motion.div>
      )}

      {/* Popover Step Card */}
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 4, scale: 0.98 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={popoverStyle}
        className="w-80 sm:w-96 p-5 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 shadow-2xl text-white space-y-4"
      >
        {/* Header & Instant Skip */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-xs text-zinc-400 font-mono">Press Esc to exit</span>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('tap', 'MICRO');
              triggerHaptic('light');
              onSkip();
            }}
            aria-label="Skip walkthrough"
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white tracking-tight">{title}</h3>
          <p className="text-xs text-zinc-300 leading-relaxed">{description}</p>
        </div>

        {/* Segmented Progress Bars */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all duration-200 ${
                idx === currentStep
                  ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                  : idx < currentStep
                  ? 'bg-zinc-600'
                  : 'bg-zinc-800'
              }`}
            />
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => {
              playSound('tap', 'MICRO');
              triggerHaptic('light');
              onPrev();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed text-zinc-500'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playSound('tap', 'MICRO');
                onSkip();
              }}
              className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-1 transition-colors"
            >
              Skip All
            </button>

            <button
              type="button"
              onClick={() => {
                playSound(isLastStep ? 'SUCCESS' : 'SWITCH');
                triggerHaptic(isLastStep ? 'success' : 'medium');
                if (isLastStep) onComplete();
                else onNext();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-1 transition-all shadow-md active:scale-95"
            >
              <span>{isLastStep ? 'Got it' : 'Next'}</span>
              {isLastStep ? <Check className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * 2. COACH MARK COMPONENT
 * Non-blocking anchored contextual tip badge with arrow callout,
 * beacon indicator, step indicator, and dismiss behavior.
 */
interface CoachMarkProps {
  config: CoachMarkConfig;
  isOpen: boolean;
  onDismiss: () => void;
  onNext?: () => void;
  targetRect?: SpotlightTargetRect | null;
  children?: React.ReactNode;
}

export function CoachMark({
  config,
  isOpen,
  onDismiss,
  onNext,
  targetRect,
  children,
}: CoachMarkProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 6 }}
        transition={{ duration: 0.15 }}
        className="relative z-50 p-4 rounded-2xl bg-zinc-900 border border-cyan-500/40 shadow-[0_8px_30px_rgba(0,0,0,0.6)] text-white w-72 sm:w-80 space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
              {config.badge || 'PRO TIP'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('tap', 'MICRO');
              triggerHaptic('light');
              onDismiss();
            }}
            className="p-1 text-zinc-400 hover:text-white rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-1">
          <h4 className="text-xs font-bold text-white">{config.title}</h4>
          <p className="text-[11px] text-zinc-300 leading-relaxed">{config.description}</p>
        </div>

        {children}

        <div className="flex items-center justify-between pt-1 border-t border-zinc-800 text-[11px]">
          {config.stepIndex !== undefined && config.totalSteps !== undefined ? (
            <span className="text-zinc-500 font-mono">
              {config.stepIndex + 1}/{config.totalSteps}
            </span>
          ) : (
            <span className="text-zinc-500 font-mono">Dismissible</span>
          )}

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                playSound('tap', 'MICRO');
                onDismiss();
              }}
              className="px-2.5 py-1 rounded-lg text-zinc-400 hover:text-white transition-colors"
            >
              Dismiss
            </button>

            {onNext && (
              <button
                type="button"
                onClick={() => {
                  playSound('SWITCH');
                  triggerHaptic('light');
                  onNext();
                }}
                className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * 3. CONTEXTUAL HINT COMPONENT
 * Non-intrusive micro-tooltips, subtle discovery beacon pills,
 * and inline guidance notes that never obstruct workflow.
 */
interface ContextualHintProps {
  hint: ContextualHintConfig;
  onDismiss?: (id: string) => void;
}

export function ContextualHint({ hint, onDismiss }: ContextualHintProps) {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  if (dismissed) return null;

  if (hint.type === 'pill') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-300 text-xs font-mono">
        <Sparkles className="w-3 h-3 text-cyan-400" />
        <span>{hint.label}:</span>
        <span className="text-zinc-300 font-normal">{hint.content}</span>
        {hint.dismissible && (
          <button
            type="button"
            onClick={() => {
              setDismissed(true);
              onDismiss?.(hint.id);
            }}
            className="ml-1 text-cyan-400 hover:text-white"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  if (hint.type === 'beacon') {
    return (
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => {
            setExpanded(!expanded);
            playSound('tap', 'MICRO');
            triggerHaptic('light');
          }}
          className="relative p-1 rounded-full bg-zinc-800 border border-cyan-500/50 hover:bg-zinc-700 text-cyan-400 transition-all group"
          aria-label="View contextual guidance"
        >
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
          <HelpCircle className="w-3.5 h-3.5" />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 4 }}
              className="absolute left-0 top-full mt-2 z-40 w-64 p-3 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl text-white space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-cyan-400 font-mono uppercase">{hint.label}</span>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">{hint.content}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default Inline callout
  return (
    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-3 text-xs text-zinc-300">
      <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
      <div className="space-y-0.5 flex-1">
        <span className="font-bold text-white block">{hint.label}</span>
        <p className="text-zinc-400 leading-relaxed">{hint.content}</p>
      </div>
      {hint.dismissible && (
        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            onDismiss?.(hint.id);
          }}
          className="text-zinc-500 hover:text-white p-0.5 rounded transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

/**
 * 4. PROGRESS INDICATOR COMPONENT
 * Segmented progress bars, step dots with completion ticks, radial progress rings,
 * and estimated time to completion indicators.
 */
interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  variant?: 'segmented' | 'dots' | 'radial' | 'time-estimate';
  estimatedSecondsRemaining?: number;
  onStepClick?: (stepIndex: number) => void;
  allowStepJumping?: boolean;
}

export function OnboardingProgress({
  currentStep,
  totalSteps,
  variant = 'segmented',
  estimatedSecondsRemaining,
  onStepClick,
  allowStepJumping = true,
}: OnboardingProgressProps) {
  const percent = Math.round(((currentStep + 1) / totalSteps) * 100);

  if (variant === 'dots') {
    return (
      <div className="flex items-center gap-2" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemax={totalSteps}>
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;
          return (
            <button
              key={idx}
              type="button"
              disabled={!allowStepJumping}
              onClick={() => allowStepJumping && onStepClick?.(idx)}
              className={`flex items-center justify-center transition-all ${
                isCurrent
                  ? 'w-7 h-7 rounded-full bg-cyan-500 text-black font-bold text-xs ring-4 ring-cyan-500/30'
                  : isCompleted
                  ? 'w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700 text-xs'
                  : 'w-6 h-6 rounded-full bg-zinc-800 text-zinc-500 border border-zinc-700 text-xs hover:border-zinc-500'
              }`}
            >
              {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'radial') {
    const size = 48;
    const strokeWidth = 4;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - ((currentStep + 1) / totalSteps) * circumference;

    return (
      <div className="flex items-center gap-3">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="rotate-[-90deg]">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-zinc-800"
              fill="transparent"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="text-cyan-400 transition-all duration-300"
              fill="transparent"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold text-white">
            {percent}%
          </div>
        </div>

        <div className="space-y-0.5">
          <span className="text-xs font-bold text-white block">Step {currentStep + 1} of {totalSteps}</span>
          {estimatedSecondsRemaining && (
            <span className="text-[11px] text-zinc-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>~{estimatedSecondsRemaining}s left</span>
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default: Segmented bar
  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
        <span>Completion: {percent}%</span>
        <span>
          Step {currentStep + 1} / {totalSteps}
        </span>
      </div>
      <div className="flex items-center gap-1.5 w-full">
        {Array.from({ length: totalSteps }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            disabled={!allowStepJumping}
            onClick={() => allowStepJumping && onStepClick?.(idx)}
            className={`h-1.5 flex-1 rounded-full transition-all duration-200 ${
              idx === currentStep
                ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                : idx < currentStep
                ? 'bg-emerald-500'
                : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * 5. SKIP & REVISIT MANAGER
 * Persistent tray allowing users to dismiss once, restore any walkthrough,
 * restart guides, and manage guidance visibility preferences.
 */
interface SkipRevisitManagerProps {
  completedWalkthroughs: string[];
  dismissedHints: string[];
  onRestartWalkthrough: (id: string) => void;
  onRestoreHints: () => void;
}

export function SkipRevisitManager({
  completedWalkthroughs,
  dismissedHints,
  onRestartWalkthrough,
  onRestoreHints,
}: SkipRevisitManagerProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-cyan-400" />
          <h4 className="text-xs font-bold text-white tracking-tight">Guidance & Walkthrough Hub</h4>
        </div>
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            playSound('tap', 'MICRO');
          }}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-mono"
        >
          {isOpen ? 'Collapse' : 'Manage Revisit (History)'}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3 pt-2 border-t border-zinc-800 text-xs"
        >
          <div className="space-y-1.5">
            <span className="text-zinc-400 font-mono text-[10px] uppercase">Active & Completed Guides:</span>
            <div className="flex flex-wrap gap-2">
              {['workspace-tour', 'controls-primer', 'ai-copilot-guide'].map((guideId) => {
                const isDone = completedWalkthroughs.includes(guideId);
                return (
                  <button
                    key={guideId}
                    type="button"
                    onClick={() => {
                      playSound('SWITCH');
                      triggerHaptic('light');
                      onRestartWalkthrough(guideId);
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                      isDone
                        ? 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-cyan-500'
                        : 'bg-cyan-950/60 border-cyan-800 text-cyan-300 hover:bg-cyan-900'
                    }`}
                  >
                    <RotateCcw className="w-3 h-3 text-cyan-400" />
                    <span>{guideId}</span>
                    {isDone && <Check className="w-3 h-3 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-zinc-400 text-[11px]">
              Dismissed Contextual Hints: <span className="text-white font-mono">{dismissedHints.length}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                playSound('SUCCESS');
                triggerHaptic('success');
                onRestoreHints();
              }}
              className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition-colors"
            >
              Restore All Hints
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
