/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { SpeechMessage, CharacterPalette } from '../types';

interface CharacterSpeechBubbleProps {
  speech: SpeechMessage | null;
  palette: CharacterPalette;
  onDismiss?: () => void;
  onActionClick?: (actionId: string) => void;
  position?: 'top' | 'top-right' | 'top-left' | 'right';
  reducedMotion?: boolean;
}

export const CharacterSpeechBubble: React.FC<CharacterSpeechBubbleProps> = ({
  speech,
  palette,
  onDismiss,
  onActionClick,
  position = 'top',
  reducedMotion = false,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (!speech) {
      setDisplayedText('');
      setIsTypingDone(false);
      return;
    }

    if (reducedMotion || !speech.isTyping) {
      setDisplayedText(speech.text);
      setIsTypingDone(true);
      return;
    }

    let i = 0;
    setDisplayedText('');
    setIsTypingDone(false);

    const interval = setInterval(() => {
      i++;
      setDisplayedText(speech.text.slice(0, i));
      if (i >= speech.text.length) {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [speech, reducedMotion]);

  if (!speech) return null;

  const isAlert = speech.emotion === 'worried';
  const isHappy = speech.emotion === 'happy' || speech.emotion === 'excited';

  return (
    <AnimatePresence>
      <motion.div
        key={speech.id}
        initial={{ opacity: 0, y: 12, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.96 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative z-30 max-w-xs md:max-w-sm rounded-2xl p-4 shadow-2xl backdrop-blur-xl border select-none text-left"
        style={{
          backgroundColor: 'rgba(12, 17, 29, 0.95)',
          borderColor: isAlert ? '#f43f5e' : isHappy ? palette.secondary : palette.primary,
          boxShadow: `0 12px 36px -4px rgba(0,0,0,0.6), 0 0 20px -2px ${palette.glow}`,
        }}
        role="status"
        aria-live="polite"
      >
        {/* Directional Balloon Tail */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b"
          style={{
            backgroundColor: 'rgba(12, 17, 29, 0.95)',
            borderColor: isAlert ? '#f43f5e' : isHappy ? palette.secondary : palette.primary,
          }}
        />

        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10 text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            {isAlert ? (
              <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            ) : isHappy ? (
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-sky-400" />
            )}
            <span className="font-bold text-zinc-200">
              {isAlert ? 'SYSTEM_ALERT' : isHappy ? 'CHEER_MOOD' : 'COMPANION'}
            </span>
          </div>

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Message Body */}
        <p className="text-xs md:text-sm text-zinc-100 font-sans leading-relaxed tracking-normal">
          {displayedText}
          {!isTypingDone && (
            <span
              className="inline-block w-1.5 h-3.5 ml-1 align-middle bg-sky-400 animate-pulse"
              style={{ backgroundColor: palette.secondary }}
            />
          )}
        </p>

        {/* Interactive Action Chips */}
        {speech.actions && speech.actions.length > 0 && isTypingDone && (
          <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-2">
            {speech.actions.map((act) => (
              <button
                key={act.actionId}
                onClick={() => onActionClick?.(act.actionId)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  act.variant === 'danger'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                    : act.variant === 'primary'
                    ? 'bg-sky-500 text-white shadow-md hover:bg-sky-400'
                    : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700'
                }`}
              >
                {act.label}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
