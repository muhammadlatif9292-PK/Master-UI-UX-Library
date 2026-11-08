/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface OnboardingStepItem {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  primaryActionLabel?: string;
  badge?: string;
  keyFeatures: string[];
}

export const LIBRARY_ONBOARDING_STEPS: OnboardingStepItem[] = [
  {
    id: 'step-1-find',
    stepNumber: 1,
    title: '1. Find a component',
    subtitle: 'Search 16+ Component Families & Design Archetypes',
    description: 'Quickly find what you need using global search (⌘K) or the Explore hub. Filter by category, interaction intent, or accessibility compliance.',
    iconName: 'Search',
    badge: '16+ Families',
    keyFeatures: [
      'Global ⌘K Command Palette',
      'Filter by Intent & WCAG Compliance',
      '12 Design System Archetypes',
    ],
  },
  {
    id: 'step-2-preview',
    stepNumber: 2,
    title: '2. Try a live preview',
    subtitle: 'Interactive Specimen Canvas & 5D State Machine',
    description: 'Test responsive viewports, toggle dark/light canvases, and interact with live state engines (hover, active, focus, loading, disabled, error).',
    iconName: 'Eye',
    badge: 'Live Sandbox',
    keyFeatures: [
      '5D Interactive State Machine',
      'Multi-Device Responsive Simulator',
      'Real-time Theme & Contrast Audit',
    ],
  },
  {
    id: 'step-3-customize',
    stepNumber: 3,
    title: '3. Customize it',
    subtitle: 'Design Archetypes & Recipe Mixer',
    description: 'Mix design recipes, tune border radii, change color palettes, and adjust motion physics or procedural web audio sound feedback live.',
    iconName: 'Wand2',
    badge: 'Recipe Composer',
    keyFeatures: [
      'Archetype Token Swapping',
      'Live Geometry & Radius Formula Tuning',
      'Procedural Web Audio Synthesizer',
    ],
  },
  {
    id: 'step-4-save',
    stepNumber: 4,
    title: '4. Save or compare',
    subtitle: 'Personal Collections & Side-by-Side Matrix',
    description: 'Bookmark components to your persistent collections or compare up to 4 specimens side-by-side to evaluate accessibility and visual density.',
    iconName: 'Bookmark',
    badge: 'Collections & Matrix',
    keyFeatures: [
      'Persistent Local & Cloud Collections',
      'Side-by-Side Specimen Comparison Matrix',
      'Personal Design Notes & Metadata',
    ],
  },
  {
    id: 'step-5-code',
    stepNumber: 5,
    title: '5. Copy code or AI prompt',
    subtitle: 'Production React/TSX & AI Handoff Briefs',
    description: 'Copy production-ready React TypeScript code with Tailwind styling, or generate structured Gemini/Claude AI prompt briefs for instant handoff.',
    iconName: 'Code2',
    badge: 'React & Gemini AI',
    keyFeatures: [
      'Clean Production TypeScript Export',
      'Structured Gemini AI Prompt Generator',
      'Zero-dependency Copy to Clipboard',
    ],
  },
];

const DISMISSED_STORAGE_KEY = 'master_library_onboarding_dismissed_v1';
const FIRST_RUN_STORAGE_KEY = 'master_library_onboarding_has_run_v1';

export interface LibraryOnboardingContextType {
  isOpen: boolean;
  isFirstRunPromptOpen: boolean;
  currentStepIndex: number;
  dontShowAgain: boolean;
  steps: OnboardingStepItem[];
  openTour: (stepIndex?: number) => void;
  closeTour: () => void;
  startTour: () => void;
  skipTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  setDontShowAgain: (value: boolean) => void;
  toggleDontShowAgain: () => void;
  reopenTour: () => void;
}

const LibraryOnboardingContext = createContext<LibraryOnboardingContextType | undefined>(undefined);

export function LibraryOnboardingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstRunPromptOpen, setIsFirstRunPromptOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [dontShowAgain, setDontShowAgainState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(DISMISSED_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Check first run on mount
  useEffect(() => {
    try {
      const isDismissed = localStorage.getItem(DISMISSED_STORAGE_KEY) === 'true';
      const hasRun = localStorage.getItem(FIRST_RUN_STORAGE_KEY) === 'true';

      if (!isDismissed && !hasRun) {
        // Show gentle first-run prompt
        const timer = setTimeout(() => {
          setIsFirstRunPromptOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('Unable to access localStorage for onboarding:', e);
    }
  }, []);

  const setDontShowAgain = useCallback((value: boolean) => {
    setDontShowAgainState(value);
    try {
      if (value) {
        localStorage.setItem(DISMISSED_STORAGE_KEY, 'true');
      } else {
        localStorage.removeItem(DISMISSED_STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Unable to persist onboarding preference:', e);
    }
  }, []);

  const toggleDontShowAgain = useCallback(() => {
    setDontShowAgain(!dontShowAgain);
  }, [dontShowAgain, setDontShowAgain]);

  const markHasRun = useCallback(() => {
    try {
      localStorage.setItem(FIRST_RUN_STORAGE_KEY, 'true');
    } catch (e) {
      console.warn('Unable to write first run flag:', e);
    }
  }, []);

  const openTour = useCallback((stepIndex: number = 0) => {
    setIsFirstRunPromptOpen(false);
    setCurrentStepIndex(Math.max(0, Math.min(stepIndex, LIBRARY_ONBOARDING_STEPS.length - 1)));
    setIsOpen(true);
    markHasRun();
  }, [markHasRun]);

  const startTour = useCallback(() => {
    openTour(0);
  }, [openTour]);

  const closeTour = useCallback(() => {
    setIsOpen(false);
    setIsFirstRunPromptOpen(false);
  }, []);

  const skipTour = useCallback(() => {
    closeTour();
    markHasRun();
  }, [closeTour, markHasRun]);

  const nextStep = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev >= LIBRARY_ONBOARDING_STEPS.length - 1) {
        closeTour();
        return prev;
      }
      return prev + 1;
    });
  }, [closeTour]);

  const prevStep = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToStep = useCallback((index: number) => {
    if (index >= 0 && index < LIBRARY_ONBOARDING_STEPS.length) {
      setCurrentStepIndex(index);
    }
  }, []);

  const reopenTour = useCallback(() => {
    setDontShowAgain(false);
    openTour(0);
  }, [openTour, setDontShowAgain]);

  return (
    <LibraryOnboardingContext.Provider
      value={{
        isOpen,
        isFirstRunPromptOpen,
        currentStepIndex,
        dontShowAgain,
        steps: LIBRARY_ONBOARDING_STEPS,
        openTour,
        closeTour,
        startTour,
        skipTour,
        nextStep,
        prevStep,
        goToStep,
        setDontShowAgain,
        toggleDontShowAgain,
        reopenTour,
      }}
    >
      {children}
    </LibraryOnboardingContext.Provider>
  );
}

export function useLibraryOnboarding() {
  const context = useContext(LibraryOnboardingContext);
  if (!context) {
    throw new Error('useLibraryOnboarding must be used within a LibraryOnboardingProvider');
  }
  return context;
}
