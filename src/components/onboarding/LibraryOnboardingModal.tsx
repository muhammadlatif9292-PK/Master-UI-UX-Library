/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Eye,
  Wand2,
  Bookmark,
  Code2,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  HelpCircle,
  Square,
  CheckSquare,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { useLibraryOnboarding, OnboardingStepItem } from '../../design-system/onboarding/LibraryOnboardingContext';
import { useSound } from '../../design-system/sound/SoundContext';

// Helper icon mapper
function StepIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case 'Search':
      return <Search className={className} />;
    case 'Eye':
      return <Eye className={className} />;
    case 'Wand2':
      return <Wand2 className={className} />;
    case 'Bookmark':
      return <Bookmark className={className} />;
    case 'Code2':
      return <Code2 className={className} />;
    default:
      return <Sparkles className={className} />;
  }
}

export function LibraryOnboardingModal() {
  const {
    isOpen,
    isFirstRunPromptOpen,
    currentStepIndex,
    dontShowAgain,
    steps,
    closeTour,
    startTour,
    skipTour,
    nextStep,
    prevStep,
    goToStep,
    setDontShowAgain,
  } = useLibraryOnboarding();

  const { playSound } = useSound();

  const currentStep: OnboardingStepItem | undefined = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  if (!isOpen && !isFirstRunPromptOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {/* 1. FIRST-RUN PROMPT CARD (UNOBTRUSIVE BANNER / FLOATING CARD) */}
      {isFirstRunPromptOpen && !isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-md w-full p-5 rounded-2xl bg-zinc-950/95 border border-cyan-500/40 shadow-[0_10px_40px_rgba(6,182,212,0.15)] backdrop-blur-xl text-white space-y-4"
          role="dialog"
          aria-label="Welcome Tour Invitation"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white tracking-tight font-mono">
                  Welcome to Master UI/UX Library
                </h3>
                <p className="text-xs text-zinc-400">
                  Take a 1-minute tour to get up to speed fast.
                </p>
              </div>
            </div>

            <button
              onClick={skipTour}
              className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close invitation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-300 space-y-1.5 font-sans">
            <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Learn 5 core workflows in 60 seconds:</span>
            </div>
            <ul className="text-[11px] text-zinc-400 space-y-1 pl-4 list-disc">
              <li>Find canonical components &amp; design archetypes</li>
              <li>Test live 5D preview canvases &amp; state engines</li>
              <li>Mix recipes, tune radii, export React &amp; Gemini AI prompts</li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none">
              <button
                type="button"
                onClick={() => setDontShowAgain(!dontShowAgain)}
                className="text-cyan-400 focus:outline-none"
              >
                {dontShowAgain ? (
                  <CheckSquare className="w-4 h-4 text-cyan-400" />
                ) : (
                  <Square className="w-4 h-4 text-zinc-600" />
                )}
              </button>
              <span className="text-[11px]">Don't show again</span>
            </label>

            <div className="flex items-center gap-2">
              <button
                onClick={skipTour}
                className="px-3 py-1.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
              >
                Skip
              </button>
              <button
                onClick={() => {
                  playSound('selection', 'MICRO');
                  startTour();
                }}
                className="px-4 py-1.5 rounded-xl bg-cyan-500 text-zinc-950 hover:bg-cyan-400 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all font-mono"
              >
                <span>Take the tour</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. FULL TOUR MODAL STEPPER */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-xl rounded-3xl bg-zinc-950 border border-zinc-800 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white overflow-hidden flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Library Guided Onboarding Tour"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  {currentStep && <StepIcon name={currentStep.iconName} className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                      Step {currentStepIndex + 1} of {steps.length}
                    </span>
                    {currentStep?.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 font-semibold">
                        {currentStep.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mt-1 font-mono">
                    {currentStep?.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={closeTour}
                className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="Close tour"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Body */}
            <div className="p-6 sm:p-8 space-y-6 flex-1">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-cyan-400 font-mono">
                  {currentStep?.subtitle}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {currentStep?.description}
                </p>
              </div>

              {/* Key Features List */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2.5">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold tracking-wider">
                  Key Capabilities
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {currentStep?.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-200">
                      <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick tip box */}
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
                <span>
                  Tip: Reopen this tour anytime from <strong>Settings</strong> or by searching <strong>⌘K</strong>.
                </span>
              </div>
            </div>

            {/* Footer & Stepper Controls */}
            <div className="p-5 sm:p-6 border-t border-zinc-800/80 bg-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Step Progress Dots */}
              <div className="flex items-center gap-2">
                {steps.map((st, idx) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      playSound('selection', 'MICRO');
                      goToStep(idx);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentStepIndex
                        ? 'w-6 bg-cyan-400'
                        : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                    aria-label={`Go to step ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none">
                  <button
                    type="button"
                    onClick={() => setDontShowAgain(!dontShowAgain)}
                    className="text-cyan-400 focus:outline-none"
                  >
                    {dontShowAgain ? (
                      <CheckSquare className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <Square className="w-4 h-4 text-zinc-600" />
                    )}
                  </button>
                  <span className="text-[11px] font-mono">Don't show again</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    onClick={skipTour}
                    className="px-3 py-1.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
                  >
                    Skip
                  </button>

                  {currentStepIndex > 0 && (
                    <button
                      onClick={() => {
                        playSound('selection', 'MICRO');
                        prevStep();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      playSound('selection', 'MICRO');
                      if (isLastStep) {
                        closeTour();
                      } else {
                        nextStep();
                      }
                    }}
                    className="px-4 py-1.5 rounded-xl bg-cyan-500 text-zinc-950 hover:bg-cyan-400 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all font-mono"
                  >
                    <span>{isLastStep ? 'Finish Tour' : 'Next Step'}</span>
                    {!isLastStep && <ChevronRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
