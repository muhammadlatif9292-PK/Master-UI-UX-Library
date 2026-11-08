/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X, RotateCcw, ArrowRight } from 'lucide-react';
import { FeedbackVisualLanguage, StateVariant, SuccessAnimationType } from './feedbackTypes';
import { useFeedback, ToastItem } from './FeedbackContext';
import { useSound } from '../sound/SoundContext';

interface ToastHostProps {
  language?: FeedbackVisualLanguage;
}

export function ToastHost({ language: overrideLanguage }: ToastHostProps) {
  const { toasts, dismissToast, activeLanguage, preferredSuccessAnimation } = useFeedback();
  const { playSound } = useSound();
  const currentLanguage = overrideLanguage || activeLanguage;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col-reverse gap-3 max-w-sm w-full pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            language={currentLanguage}
            successType={preferredSuccessAnimation}
            onDismiss={() => {
              dismissToast(toast.id);
              playSound('collapse', 'MICRO');
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastCardProps {
  key?: React.Key;
  toast: ToastItem;
  language: FeedbackVisualLanguage;
  successType: SuccessAnimationType;
  onDismiss: () => void;
}

function ToastCard({ toast, language, successType, onDismiss }: ToastCardProps) {
  const isSuccess = toast.variant === 'success';
  const isError = toast.variant === 'error';
  const isWarning = toast.variant === 'warning';

  // Language-based container classes
  const getLanguageStyles = () => {
    switch (language) {
      case 'cyber':
        return 'bg-black/90 border-l-4 rounded-none font-mono text-xs ' + (
          isSuccess ? 'border-l-emerald-400 border-y border-r border-emerald-900/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]' :
          isError ? 'border-l-rose-500 border-y border-r border-rose-900/40 shadow-[0_0_20px_rgba(244,63,94,0.2)]' :
          isWarning ? 'border-l-amber-400 border-y border-r border-amber-900/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]' :
          'border-l-cyan-400 border-y border-r border-cyan-900/40 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
        );
      case 'brutalist':
        return 'bg-zinc-900 border-2 border-white rounded-none shadow-[4px_4px_0px_#ffffff] text-white';
      case 'minimal':
        return 'bg-zinc-900 border border-zinc-700/80 rounded-xl text-zinc-100 shadow-xl';
      case 'companion':
        return 'bg-zinc-900/95 border border-zinc-700/60 rounded-3xl text-zinc-100 shadow-xl backdrop-blur-md';
      case 'editorial':
        return 'bg-zinc-950 border-t border-b border-zinc-800 rounded-none text-zinc-200 tracking-wide font-serif';
      case 'glass':
      default:
        return 'bg-zinc-900/85 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] text-white';
    }
  };

  const getIcon = () => {
    if (isSuccess) {
      return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
    }
    if (isError) {
      return <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
    }
    if (isWarning) {
      return <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
    }
    return <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
      className={`pointer-events-auto p-4 flex flex-col gap-2 relative overflow-hidden ${getLanguageStyles()}`}
    >
      {/* Success Subtle Glow or Particle Indicator */}
      {isSuccess && successType === 'subtle-glow' && (
        <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none animate-pulse rounded-inherit" />
      )}

      {isSuccess && successType === 'restrained-particles' && (
        <div className="absolute top-2 right-8 flex gap-1 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-1 h-1 rounded-full bg-teal-300 animate-pulse delay-100" />
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="mt-0.5">{getIcon()}</div>
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-sm font-semibold leading-tight text-white">{toast.title}</p>
          {toast.message && (
            <p className="text-xs text-zinc-300 mt-1 leading-normal break-words">{toast.message}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Action / Undo Button */}
      {(toast.actionLabel || toast.undoable) && (
        <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/5">
          {toast.undoable && (
            <button
              type="button"
              onClick={() => {
                toast.onUndo?.();
                onDismiss();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Undo
            </button>
          )}
          {toast.actionLabel && (
            <button
              type="button"
              onClick={() => {
                toast.onAction?.();
                onDismiss();
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>{toast.actionLabel}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}
