/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  RotateCcw,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Check,
  Heart,
  Smile,
  Terminal,
  Loader2
} from 'lucide-react';
import { FeedbackVisualLanguage, StateVariant, ProgressMode, SuccessAnimationType } from './feedbackTypes';
import { useSound } from '../sound/SoundContext';
import { useHaptics } from '../haptics/HapticContext';

// ==========================================
// 1. TOAST COMPONENT (Direct Showcase)
// ==========================================
export interface ToastProps {
  title: string;
  message?: string;
  variant?: StateVariant;
  language?: FeedbackVisualLanguage;
  actionLabel?: string;
  undoable?: boolean;
  onAction?: () => void;
  onUndo?: () => void;
  onDismiss?: () => void;
}

export function Toast({
  title,
  message,
  variant = 'info',
  language = 'glass',
  actionLabel,
  undoable,
  onAction,
  onUndo,
  onDismiss,
}: ToastProps) {
  const getContainerStyle = () => {
    switch (language) {
      case 'cyber':
        return 'bg-zinc-950 border-l-4 font-mono text-xs ' + (
          variant === 'success' ? 'border-emerald-400 border-y border-r border-emerald-900/50 text-emerald-300' :
          variant === 'error' ? 'border-rose-500 border-y border-r border-rose-900/50 text-rose-300' :
          variant === 'warning' ? 'border-amber-400 border-y border-r border-amber-900/50 text-amber-300' :
          'border-cyan-400 border-y border-r border-cyan-900/50 text-cyan-300'
        );
      case 'brutalist':
        return 'bg-zinc-900 border-2 border-white rounded-none shadow-[4px_4px_0px_#ffffff] text-white';
      case 'minimal':
        return 'bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 shadow-lg';
      case 'companion':
        return 'bg-zinc-900/95 border border-zinc-700/60 rounded-3xl text-zinc-100 shadow-xl backdrop-blur-md';
      case 'editorial':
        return 'bg-zinc-950 border-t border-b border-zinc-800 rounded-none text-zinc-200 tracking-wide font-serif';
      case 'glass':
      default:
        return 'bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl text-white';
    }
  };

  return (
    <div className={`p-4 flex flex-col gap-2 max-w-sm w-full ${getContainerStyle()}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          {variant === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />}
          {variant === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />}
          {variant === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />}
          {variant === 'info' && <Info className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />}
          {variant === 'neutral' && <Info className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />}
          <div>
            <h4 className="text-xs font-bold leading-tight">{title}</h4>
            {message && <p className="text-[11px] text-zinc-400 mt-1">{message}</p>}
          </div>
        </div>
        {onDismiss && (
          <button type="button" onClick={onDismiss} className="text-zinc-500 hover:text-white transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      {(actionLabel || undoable) && (
        <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/5">
          {undoable && (
            <button
              type="button"
              onClick={onUndo}
              className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Undo
            </button>
          )}
          {actionLabel && (
            <button
              type="button"
              onClick={onAction}
              className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
            >
              {actionLabel} <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. SNACKBAR COMPONENT
// ==========================================
export interface SnackbarProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  language?: FeedbackVisualLanguage;
}

export function Snackbar({ message, actionLabel = 'Undo', onAction, language = 'glass' }: SnackbarProps) {
  const getStyle = () => {
    switch (language) {
      case 'cyber':
        return 'bg-black border border-cyan-500/50 rounded-none font-mono text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]';
      case 'brutalist':
        return 'bg-white text-black border-2 border-black rounded-none font-bold shadow-[3px_3px_0px_#ffffff]';
      case 'minimal':
        return 'bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-lg shadow-md';
      case 'companion':
        return 'bg-zinc-900 border border-emerald-500/30 rounded-full text-zinc-200 px-5 shadow-lg';
      case 'editorial':
        return 'bg-zinc-950 text-zinc-200 border-b border-zinc-700 font-serif';
      case 'glass':
      default:
        return 'bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-xl text-white shadow-2xl';
    }
  };

  return (
    <div className={`px-4 py-2.5 flex items-center justify-between gap-4 max-w-md w-full text-xs ${getStyle()}`}>
      <span className="truncate">{message}</span>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider shrink-0 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ==========================================
// 3. BANNER COMPONENT
// ==========================================
export interface BannerProps {
  title: string;
  message?: string;
  variant?: StateVariant;
  language?: FeedbackVisualLanguage;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  sticky?: boolean;
}

export function Banner({
  title,
  message,
  variant = 'warning',
  language = 'glass',
  actionLabel,
  onAction,
  onDismiss,
}: BannerProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'error':
        return 'bg-rose-950/40 border-rose-800/60 text-rose-200';
      case 'warning':
        return 'bg-amber-950/40 border-amber-800/60 text-amber-200';
      case 'success':
        return 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200';
      case 'info':
      default:
        return 'bg-cyan-950/40 border-cyan-800/60 text-cyan-200';
    }
  };

  const getLanguageRounding = () => {
    if (language === 'cyber' || language === 'brutalist' || language === 'editorial') return 'rounded-none';
    if (language === 'companion') return 'rounded-2xl';
    return 'rounded-xl';
  };

  return (
    <div className={`w-full p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${getVariantStyles()} ${getLanguageRounding()}`}>
      <div className="flex items-start gap-3">
        {variant === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
        {variant === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
        {variant === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
        {variant === 'info' && <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />}
        <div>
          <h4 className="text-xs font-bold">{title}</h4>
          {message && <p className="text-xs opacity-80 mt-0.5">{message}</p>}
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs font-semibold text-white transition-colors"
          >
            {actionLabel}
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss banner"
            className="p-1 text-white/60 hover:text-white rounded hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. INLINE ALERT COMPONENT
// ==========================================
export interface AlertProps {
  title: string;
  message?: string;
  variant?: StateVariant;
  language?: FeedbackVisualLanguage;
  icon?: boolean;
}

export function Alert({ title, message, variant = 'info', language = 'glass', icon = true }: AlertProps) {
  const getStyle = () => {
    switch (language) {
      case 'cyber':
        return 'bg-black border-l-2 p-3 font-mono text-xs ' + (
          variant === 'error' ? 'border-rose-500 text-rose-300' :
          variant === 'warning' ? 'border-amber-400 text-amber-300' :
          variant === 'success' ? 'border-emerald-400 text-emerald-300' :
          'border-cyan-400 text-cyan-300'
        );
      case 'brutalist':
        return 'bg-zinc-900 border-2 border-white p-3 shadow-[2px_2px_0px_#ffffff] text-white';
      case 'companion':
        return 'bg-zinc-900/60 border border-zinc-700/50 p-4 rounded-2xl text-zinc-200';
      case 'editorial':
        return 'border-l border-zinc-500 pl-4 py-2 font-serif text-zinc-300';
      case 'minimal':
      case 'glass':
      default:
        return 'bg-zinc-900/50 border border-zinc-800 p-3.5 rounded-xl text-zinc-200';
    }
  };

  return (
    <div className={`w-full flex items-start gap-3 ${getStyle()}`}>
      {icon && (
        <div className="shrink-0 mt-0.5">
          {variant === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
          {variant === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
          {variant === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          {variant === 'info' && <Info className="w-4 h-4 text-cyan-400" />}
          {variant === 'neutral' && <Info className="w-4 h-4 text-zinc-400" />}
        </div>
      )}
      <div className="space-y-0.5">
        <h5 className="text-xs font-bold leading-tight">{title}</h5>
        {message && <p className="text-xs text-zinc-400 leading-relaxed">{message}</p>}
      </div>
    </div>
  );
}

// ==========================================
// 5. TOOLTIP COMPONENT
// ==========================================
export interface TooltipProps {
  content: string;
  shortcut?: string;
  children: React.ReactNode;
  language?: FeedbackVisualLanguage;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, shortcut, children, language = 'glass', position = 'top' }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getTooltipStyle = () => {
    switch (language) {
      case 'cyber':
        return 'bg-black border border-cyan-500 text-cyan-300 font-mono text-[10px] rounded-none shadow-[0_0_10px_rgba(6,182,212,0.3)]';
      case 'brutalist':
        return 'bg-white text-black border border-black font-bold text-[11px] rounded-none shadow-[2px_2px_0px_#ffffff]';
      case 'companion':
        return 'bg-zinc-800/95 text-zinc-100 rounded-xl px-3 py-1.5 text-xs shadow-xl backdrop-blur-md';
      case 'editorial':
        return 'bg-zinc-950 text-zinc-200 border border-zinc-800 font-serif text-xs rounded-none';
      case 'minimal':
      case 'glass':
      default:
        return 'bg-zinc-900/90 text-white backdrop-blur-md border border-white/10 rounded-lg text-xs shadow-xl';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full mt-2 left-1/2 -translate-x-1/2';
      case 'left':
        return 'right-full mr-2 top-1/2 -translate-y-1/2';
      case 'right':
        return 'left-full ml-2 top-1/2 -translate-y-1/2';
      case 'top':
      default:
        return 'bottom-full mb-2 left-1/2 -translate-x-1/2';
    }
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 4 : -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 px-2.5 py-1 whitespace-nowrap pointer-events-none flex items-center gap-1.5 ${getPositionClasses()} ${getTooltipStyle()}`}
          >
            <span>{content}</span>
            {shortcut && (
              <kbd className="px-1 py-0.2 rounded bg-white/10 text-[9px] font-mono opacity-80">{shortcut}</kbd>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// 6. STATUS BADGE COMPONENT
// ==========================================
export interface StatusBadgeProps {
  label: string;
  variant?: StateVariant;
  language?: FeedbackVisualLanguage;
  pulse?: boolean;
  pill?: boolean;
}

export function StatusBadge({
  label,
  variant = 'neutral',
  language = 'glass',
  pulse = false,
  pill = true,
}: StatusBadgeProps) {
  const getBadgeStyle = () => {
    switch (language) {
      case 'cyber':
        return 'font-mono uppercase text-[10px] tracking-wider rounded-none border ' + (
          variant === 'success' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400' :
          variant === 'error' ? 'bg-rose-950/80 border-rose-500 text-rose-400' :
          variant === 'warning' ? 'bg-amber-950/80 border-amber-500 text-amber-400' :
          variant === 'info' ? 'bg-cyan-950/80 border-cyan-500 text-cyan-400' :
          'bg-zinc-900 border-zinc-700 text-zinc-400'
        );
      case 'brutalist':
        return 'border border-white bg-black text-white font-bold text-[10px] rounded-none';
      case 'companion':
        return 'rounded-full px-3 py-0.5 text-xs ' + (
          variant === 'success' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' :
          variant === 'error' ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20' :
          variant === 'warning' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' :
          'bg-zinc-800 text-zinc-300'
        );
      case 'editorial':
        return 'text-[11px] font-serif tracking-widest uppercase border-b border-zinc-700 text-zinc-300 rounded-none px-1';
      case 'minimal':
      case 'glass':
      default:
        return `${pill ? 'rounded-full' : 'rounded-md'} text-[11px] font-medium border ` + (
          variant === 'success' ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' :
          variant === 'error' ? 'bg-rose-500/15 border-rose-500/30 text-rose-300' :
          variant === 'warning' ? 'bg-amber-500/15 border-amber-500/30 text-amber-300' :
          variant === 'info' ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300' :
          'bg-zinc-800/80 border-zinc-700 text-zinc-400'
        );
    }
  };

  const getDotColor = () => {
    switch (variant) {
      case 'success': return 'bg-emerald-400';
      case 'error': return 'bg-rose-400';
      case 'warning': return 'bg-amber-400';
      case 'info': return 'bg-cyan-400';
      default: return 'bg-zinc-400';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 ${getBadgeStyle()}`}>
      <span className="relative flex h-1.5 w-1.5">
        {pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getDotColor()}`} />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${getDotColor()}`} />
      </span>
      <span>{label}</span>
    </span>
  );
}

// ==========================================
// 7. PROGRESS BAR COMPONENT
// ==========================================
export interface ProgressBarProps {
  value: number; // 0 to 100
  mode?: ProgressMode;
  segments?: number;
  label?: string;
  variant?: StateVariant;
  language?: FeedbackVisualLanguage;
}

export function ProgressBar({
  value,
  mode = 'determinate',
  segments = 5,
  label,
  variant = 'info',
  language = 'glass',
}: ProgressBarProps) {
  const getBarColor = () => {
    switch (variant) {
      case 'success': return 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]';
      case 'error': return 'bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]';
      case 'warning': return 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.4)]';
      default: return 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.4)]';
    }
  };

  if (mode === 'segmented') {
    const activeIndex = Math.floor((value / 100) * segments);
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <div className="flex justify-between text-xs text-zinc-400 font-mono">
            <span>{label}</span>
            <span>{Math.round(value)}%</span>
          </div>
        )}
        <div className="flex gap-1.5 w-full">
          {Array.from({ length: segments }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-sm transition-all duration-300 ${
                idx < activeIndex ? getBarColor() : 'bg-zinc-800'
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  if (mode === 'circular') {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="flex items-center gap-3">
        <div className="relative w-14 h-14 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r={radius} className="stroke-zinc-800 fill-none" strokeWidth="4" />
            <circle
              cx="30"
              cy="30"
              r={radius}
              className="stroke-cyan-400 fill-none transition-all duration-300"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-[11px] font-mono font-bold text-white">{Math.round(value)}%</span>
        </div>
        {label && <span className="text-xs text-zinc-300 font-medium">{label}</span>}
      </div>
    );
  }

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <div className="flex justify-between text-xs text-zinc-400 font-mono">
          <span>{label}</span>
          <span>{mode === 'indeterminate' ? 'Syncing...' : `${Math.round(value)}%`}</span>
        </div>
      )}
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden relative">
        {mode === 'indeterminate' ? (
          <motion.div
            className={`h-full w-1/3 rounded-full ${getBarColor()}`}
            animate={{ x: ['-100%', '400%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
        ) : (
          <motion.div
            className={`h-full rounded-full ${getBarColor()}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        )}
      </div>
    </div>
  );
}

// ==========================================
// 8. LOADER / SPINNER FAMILY
// ==========================================
export interface LoaderProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'radar' | 'orbit' | 'bars';
  size?: 'sm' | 'md' | 'lg';
  variant?: StateVariant;
  language?: FeedbackVisualLanguage;
}

export function Loader({ type = 'spinner', size = 'md', variant = 'info', language = 'glass' }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  }[size];

  const getColor = () => {
    switch (variant) {
      case 'success': return 'text-emerald-400';
      case 'error': return 'text-rose-500';
      case 'warning': return 'text-amber-400';
      default: return 'text-cyan-400';
    }
  };

  if (type === 'dots') {
    return (
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className={`w-2 h-2 rounded-full ${getColor()} bg-current`}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    );
  }

  if (type === 'radar') {
    return (
      <div className="relative w-8 h-8 flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-cyan-400" />
        <span className="absolute w-full h-full rounded-full border border-cyan-400/80 animate-ping" />
        <span className="absolute w-6 h-6 rounded-full border border-cyan-400/40" />
      </div>
    );
  }

  if (type === 'orbit') {
    return (
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-cyan-400" />
        <motion.div
          className="absolute w-full h-full rounded-full border border-transparent border-t-cyan-300 border-r-cyan-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        />
      </div>
    );
  }

  if (type === 'bars') {
    return (
      <div className="flex items-end gap-1 h-6">
        {[0.4, 0.8, 0.6, 1.0, 0.5].map((scale, i) => (
          <motion.div
            key={i}
            className={`w-1 bg-cyan-400 rounded-full`}
            animate={{ height: ['4px', '20px', '4px'] }}
            transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.12, ease: 'easeInOut' }}
          />
        ))}
      </div>
    );
  }

  return (
    <Loader2 className={`${sizeClasses} ${getColor()} animate-spin`} />
  );
}

// ==========================================
// 9. SKELETON COMPONENT
// ==========================================
export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'avatar-row';
  language?: FeedbackVisualLanguage;
}

export function Skeleton({ variant = 'rectangular', language = 'glass' }: SkeletonProps) {
  const shimmerClass = "relative overflow-hidden bg-zinc-800/60 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent";

  if (variant === 'circular') {
    return <div className={`w-10 h-10 rounded-full ${shimmerClass}`} />;
  }

  if (variant === 'text') {
    return (
      <div className="space-y-2 w-full">
        <div className={`h-4 w-3/4 rounded ${shimmerClass}`} />
        <div className={`h-4 w-1/2 rounded ${shimmerClass}`} />
      </div>
    );
  }

  if (variant === 'avatar-row') {
    return (
      <div className="flex items-center gap-3 w-full p-3 rounded-xl bg-zinc-900/40 border border-zinc-800">
        <div className={`w-10 h-10 rounded-full shrink-0 ${shimmerClass}`} />
        <div className="space-y-2 flex-1">
          <div className={`h-3.5 w-1/3 rounded ${shimmerClass}`} />
          <div className={`h-3 w-2/3 rounded ${shimmerClass}`} />
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="w-full p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
        <div className={`h-36 w-full rounded-xl ${shimmerClass}`} />
        <div className={`h-4 w-3/5 rounded ${shimmerClass}`} />
        <div className="space-y-2">
          <div className={`h-3 w-full rounded ${shimmerClass}`} />
          <div className={`h-3 w-4/5 rounded ${shimmerClass}`} />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className={`h-6 w-20 rounded-full ${shimmerClass}`} />
          <div className={`h-8 w-24 rounded-lg ${shimmerClass}`} />
        </div>
      </div>
    );
  }

  return <div className={`w-full h-24 rounded-xl ${shimmerClass}`} />;
}

// ==========================================
// 10. EMPTY STATE COMPONENT
// ==========================================
export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  language?: FeedbackVisualLanguage;
}

export function EmptyState({
  title = 'No items in this collection',
  description = 'Add your first component or synchronize your database to inspect records.',
  actionLabel = 'Create First Item',
  onAction,
  language = 'glass',
}: EmptyStateProps) {
  return (
    <div className="w-full p-8 text-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-zinc-800 text-zinc-500">
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="max-w-xs space-y-1">
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
      </div>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all shadow-md"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ==========================================
// 11. ERROR STATE (Restrained & Recoverable)
// ==========================================
export interface ErrorStateProps {
  code?: string;
  title?: string;
  message?: string;
  onRetry?: () => void;
  onDiagnose?: () => void;
  language?: FeedbackVisualLanguage;
}

export function ErrorState({
  code = 'ERR_NETWORK_TIMEOUT_408',
  title = 'Unable to establish secure telemetry channel',
  message = 'The upstream API handshake timed out after 3000ms. Your local state and credentials remain intact.',
  onRetry,
  onDiagnose,
  language = 'glass',
}: ErrorStateProps) {
  return (
    <div className="w-full p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-4">
      <div className="flex items-start gap-3.5">
        <div className="p-2 rounded-xl bg-rose-900/40 text-rose-400 border border-rose-700/50 shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-mono font-bold uppercase text-rose-400">{code}</h4>
          </div>
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-xl">{message}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-rose-900/30">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-black text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Connection
          </button>
        )}
        {onDiagnose && (
          <button
            type="button"
            onClick={onDiagnose}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-200 text-xs font-medium transition-colors"
          >
            Run Diagnostics
          </button>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 12. WARNING STATE
// ==========================================
export interface WarningStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  language?: FeedbackVisualLanguage;
}

export function WarningState({
  title = 'Approaching monthly quota limit (85%)',
  message = 'Storage bandwidth consumption reached 8.5 GB out of 10 GB limit. Automatic throttling activates at 100%.',
  actionLabel = 'Manage Resource Quotas',
  onAction,
}: WarningStateProps) {
  return (
    <div className="w-full p-5 rounded-2xl bg-amber-950/20 border border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-900/30 text-amber-400 border border-amber-800/40 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-amber-300">{title}</h4>
          <p className="text-xs text-zinc-400 max-w-lg leading-relaxed">{message}</p>
        </div>
      </div>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="px-3.5 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold self-end sm:self-auto shrink-0 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ==========================================
// 13. SUCCESS STATE (With 6 Subtle Archetypes)
// ==========================================
export interface SuccessStateProps {
  title?: string;
  message?: string;
  animationType?: SuccessAnimationType;
  language?: FeedbackVisualLanguage;
  onDone?: () => void;
}

export function SuccessState({
  title = 'Cryptographic signature verified',
  message = 'State synchronizer recorded snapshot into ledger hash #49821.',
  animationType = 'spring-confirm',
  language = 'glass',
  onDone,
}: SuccessStateProps) {
  return (
    <div className="w-full p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Subtle Glow Archetype */}
      {animationType === 'subtle-glow' && (
        <div className="absolute inset-0 bg-emerald-500/5 animate-pulse pointer-events-none" />
      )}

      <div className="flex items-start gap-3.5 relative z-10">
        {/* Animated Icon Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="p-2.5 rounded-xl bg-emerald-900/40 text-emerald-400 border border-emerald-700/50 shrink-0"
        >
          {animationType === 'character-reaction' ? (
            <Smile className="w-5 h-5 text-emerald-300" />
          ) : animationType === 'morph' ? (
            <motion.div
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Check className="w-5 h-5 text-emerald-300" />
            </motion.div>
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
        </motion.div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-emerald-400">{title}</h4>
            {animationType === 'restrained-particles' && (
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-lg">{message}</p>
        </div>
      </div>

      {onDone && (
        <button
          type="button"
          onClick={onDone}
          className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold self-end sm:self-auto shrink-0 transition-colors relative z-10"
        >
          Acknowledge
        </button>
      )}
    </div>
  );
}

// ==========================================
// 14. CONFIRMATION DIALOG (Micro-Surface)
// ==========================================
export interface ConfirmationProps {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  language?: FeedbackVisualLanguage;
}

export function Confirmation({
  title = 'Delete production deployment branch?',
  description = 'This will immediately disconnect live DNS routing for app-v2.staging. Production traffic will default to master.',
  confirmLabel = 'Delete Branch',
  cancelLabel = 'Keep Intact',
  destructive = true,
  onConfirm,
  onCancel,
}: ConfirmationProps) {
  return (
    <div className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 max-w-md">
      <div className="space-y-1.5">
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-800">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-300 hover:bg-zinc-800 transition-colors"
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md ${
            destructive
              ? 'bg-rose-500 hover:bg-rose-400 text-white'
              : 'bg-cyan-500 hover:bg-cyan-400 text-black'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 15. UNDO BAR / TOAST INTERACTION
// ==========================================
export interface UndoBarProps {
  message?: string;
  duration?: number; // seconds
  onUndo?: () => void;
  language?: FeedbackVisualLanguage;
}

export function UndoBar({
  message = 'Archived "Sprint 42 Retrospective"',
  duration = 5,
  onUndo,
  language = 'glass',
}: UndoBarProps) {
  return (
    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-700/80 shadow-2xl flex items-center justify-between gap-4 max-w-md w-full">
      <div className="flex items-center gap-2.5 min-w-0">
        <RotateCcw className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="text-xs text-zinc-200 truncate">{message}</span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <motion.div
          className="h-1 w-12 bg-zinc-800 rounded-full overflow-hidden"
          title="Undo timeout"
        >
          <motion.div
            className="h-full bg-cyan-400"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration, ease: 'linear' }}
          />
        </motion.div>
        <button
          type="button"
          onClick={onUndo}
          className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold uppercase transition-colors"
        >
          Undo
        </button>
      </div>
    </div>
  );
}
