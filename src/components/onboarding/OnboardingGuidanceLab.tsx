/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Sparkles,
  Target,
  HelpCircle,
  Clock,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Eye,
  FileCode,
  Layers,
  Zap,
  Activity,
  Play,
  Volume2,
  Vibrate,
  Shield,
  Box,
  Palette,
  Terminal,
  Trophy,
  Hand,
  Check,
  X,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { ONBOARDING_CATALOG } from '../../design-system/catalog/onboardingRegistry';
import {
  SpotlightTour,
  CoachMark,
  ContextualHint,
  OnboardingProgress,
  SkipRevisitManager,
} from '../../design-system/onboarding/OnboardingPrimitives';
import {
  CinematicStoryPattern,
  HorizontalCarouselPattern,
  VerticalStoryPattern,
  InteractiveScenePattern,
  CharacterGuidePattern,
  ProgressiveRevealPattern,
  SwipeNarrativePattern,
  AnimatedIllustrationPattern,
  ThreeDObjectIntroPattern,
  ChooseYourPathPattern,
  PersonalizationPattern,
  ProgressiveSetupPattern,
  InteractiveTutorialPattern,
  SpotlightWalkthroughPattern,
  GestureTutorialPattern,
  AchievementOnboardingPattern,
} from '../../design-system/onboarding/OnboardingPatterns';

export function OnboardingGuidanceLab() {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  // Pattern Selector State
  const [selectedPatternId, setSelectedPatternId] = useState<string>('cinematic-story');
  const [codeModalOpen, setCodeModalOpen] = useState(false);

  // Spotlight Live Interactive Tour State
  const [spotlightTourOpen, setSpotlightTourOpen] = useState(false);
  const [spotlightStep, setSpotlightStep] = useState(0);

  // Coach Mark Live State
  const [coachMarkOpen, setCoachMarkOpen] = useState(true);
  const [coachMarkStep, setCoachMarkStep] = useState(0);

  // Progress Component State
  const [activeProgressStep, setActiveProgressStep] = useState(1);
  const [progressVariant, setProgressVariant] = useState<'segmented' | 'dots' | 'radial'>('segmented');

  // Revisit & Dismissal State
  const [completedGuides, setCompletedGuides] = useState<string[]>(['workspace-tour']);
  const [dismissedHints, setDismissedHints] = useState<string[]>([]);

  // Refs for element spotlight targeting
  const benchHeaderRef = useRef<HTMLDivElement>(null);
  const patternSelectRef = useRef<HTMLDivElement>(null);
  const previewStageRef = useRef<HTMLDivElement>(null);

  const getTargetRect = (step: number) => {
    let el: HTMLElement | null = null;
    if (step === 0) el = benchHeaderRef.current;
    else if (step === 1) el = patternSelectRef.current;
    else if (step === 2) el = previewStageRef.current;

    if (el) {
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        borderRadius: 16,
      };
    }
    return null;
  };

  const spotlightStepsData = [
    {
      title: 'Guidance & Onboarding Laboratory',
      description: 'Zero-delay, accessible guidance primitives built for swift orientation without friction.',
      placement: 'bottom' as const,
    },
    {
      title: '16 Guidance Patterns Gallery',
      description: 'Select between Cinematic Stories, Interactive Scenes, 3D Object Intros, and Progressive Setups.',
      placement: 'bottom' as const,
    },
    {
      title: 'Live Interactive Stage',
      description: 'Interact with real-time state, tactile controls, and verify code artifacts.',
      placement: 'top' as const,
    },
  ];

  const patternsList = [
    { id: 'cinematic-story', label: 'Cinematic Story', icon: Sparkles, category: 'Narrative' },
    { id: 'horizontal-carousel', label: 'Horizontal Carousel', icon: Sliders, category: 'Deck' },
    { id: 'vertical-story', label: 'Vertical Story', icon: Play, category: 'Narrative' },
    { id: 'interactive-scene', label: 'Interactive Scene', icon: Activity, category: 'Hands-on' },
    { id: 'character-guide', label: 'Character Guide', icon: HelpCircle, category: 'Agent' },
    { id: 'progressive-reveal', label: 'Progressive Reveal', icon: Layers, category: 'Structure' },
    { id: 'swipe-narrative', label: 'Swipe Narrative', icon: Hand, category: 'Deck' },
    { id: 'animated-illustration', label: 'Animated Illustration', icon: Zap, category: 'Visual' },
    { id: '3d-object-intro', label: '3D Object Intro', icon: Box, category: 'Spatial' },
    { id: 'choose-your-path', label: 'Choose-Your-Path', icon: Compass, category: 'Branching' },
    { id: 'personalization', label: 'Personalization', icon: Palette, category: 'Sensory' },
    { id: 'progressive-setup', label: 'Progressive Setup', icon: CheckCircle2, category: 'Verification' },
    { id: 'interactive-tutorial', label: 'Interactive Tutorial', icon: Terminal, category: 'Hands-on' },
    { id: 'spotlight-walkthrough', label: 'Spotlight Walkthrough', icon: Target, category: 'Guided' },
    { id: 'gesture-tutorial', label: 'Gesture Tutorial', icon: Hand, category: 'Input' },
    { id: 'achievement-onboarding', label: 'Achievement Onboarding', icon: Trophy, category: 'Gamified' },
  ];

  const activeCatalogEntry =
    ONBOARDING_CATALOG.find((e) => e.id.includes(selectedPatternId.replace('-story', '').replace('-intro', ''))) ||
    ONBOARDING_CATALOG[0];

  const handleRestartGuide = (guideId: string) => {
    setSpotlightStep(0);
    setSpotlightTourOpen(true);
    playSound('SWITCH');
  };

  const handleRestoreHints = () => {
    setDismissedHints([]);
    setCoachMarkOpen(true);
    playSound('SUCCESS');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Top Banner / Header */}
      <div
        ref={benchHeaderRef}
        className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 relative overflow-hidden shadow-2xl space-y-4"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Compass className="w-48 h-48 text-cyan-400" />
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-cyan-950/80 border border-cyan-800 text-cyan-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Onboarding & Guidance System</span>
          </span>
          <span className="px-2.5 py-0.5 rounded text-[11px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
            Zero Forced Delay • Full Keyboard Support
          </span>
        </div>

        <div className="space-y-2 max-w-3xl">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Guidance, Spotlights & Orientation Catalog
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
            16 interactive onboarding patterns and 5 core primitives (Spotlight cutouts, coach marks, contextual hints, multi-variant progress indicators, and skip/revisit managers) engineered to respect user autonomy without unnecessary animation lag.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSpotlightStep(0);
              setSpotlightTourOpen(true);
              playSound('ACTION');
              triggerHaptic('medium');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold font-mono flex items-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <Target className="w-4 h-4" />
            <span>Launch Spotlight Tour (Live Cutout)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCoachMarkOpen(true);
              playSound('SWITCH');
              triggerHaptic('light');
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono flex items-center gap-2 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Trigger Coach Mark</span>
          </button>
        </div>
      </div>

      {/* 5 Core Primitives Testbench Slabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Slab 1: Coach Mark & Anchor */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Anchored Coach Mark</span>
              </h2>
              <span className="text-[10px] font-mono text-zinc-500">Primitive 01</span>
            </div>
            <p className="text-xs text-zinc-400">
              Non-blocking callout beacon providing actionable micro-guidance.
            </p>
          </div>

          <div className="relative py-2 flex justify-center">
            <CoachMark
              config={{
                id: 'cm-demo',
                targetId: 'target-btn',
                title: 'Rotary Detent Calibration',
                description: 'Drag dials clockwise to engage hardware detents with acoustic feedback.',
                badge: 'PRO TIP',
                stepIndex: coachMarkStep,
                totalSteps: 3,
              }}
              isOpen={coachMarkOpen}
              onDismiss={() => setCoachMarkOpen(false)}
              onNext={() => setCoachMarkStep((s) => (s + 1) % 3)}
            />
            {!coachMarkOpen && (
              <button
                type="button"
                onClick={() => setCoachMarkOpen(true)}
                className="text-xs text-cyan-400 hover:underline font-mono"
              >
                Re-open Coach Mark
              </button>
            )}
          </div>

          <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-800">
            Status: {coachMarkOpen ? 'Active Popover' : 'Dismissed'}
          </div>
        </div>

        {/* Slab 2: Contextual Hints & Beacons */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Contextual Hints & Beacons</span>
            </h2>
            <span className="text-[10px] font-mono text-zinc-500">Primitive 02</span>
          </div>

          <div className="space-y-3">
            {/* Inline Hint */}
            <ContextualHint
              hint={{
                id: 'hint-inline-1',
                label: 'Acoustic Synthesis',
                content: 'Web Audio synthesizers generate real-time detent clicks on user touch.',
                type: 'inline',
                dismissible: true,
              }}
              onDismiss={(id) => setDismissedHints([...dismissedHints, id])}
            />

            {/* Pill Hint */}
            <div className="flex items-center gap-2 flex-wrap">
              <ContextualHint
                hint={{
                  id: 'hint-pill-1',
                  label: 'WCAG AAA',
                  content: 'Passing 7:1 contrast ratio',
                  type: 'pill',
                  dismissible: true,
                }}
                onDismiss={(id) => setDismissedHints([...dismissedHints, id])}
              />
              <ContextualHint
                hint={{
                  id: 'hint-beacon-1',
                  label: 'Touch Detents',
                  content: 'Sub-millisecond vibration pulses synchronize with slider detents.',
                  type: 'beacon',
                }}
              />
            </div>
          </div>
        </div>

        {/* Slab 3: Multi-Variant Progress Indicators */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Progress & Time Estimates</span>
            </h2>
            <span className="text-[10px] font-mono text-zinc-500">Primitive 03</span>
          </div>

          {/* Variant Selector */}
          <div className="flex gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
            {(['segmented', 'dots', 'radial'] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => {
                  setProgressVariant(v);
                  playSound('tap', 'MICRO');
                }}
                className={`flex-1 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                  progressVariant === v
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="py-2">
            <OnboardingProgress
              currentStep={activeProgressStep}
              totalSteps={4}
              variant={progressVariant}
              estimatedSecondsRemaining={15}
              onStepClick={(s) => setActiveProgressStep(s)}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-zinc-400">
            <button
              type="button"
              onClick={() => setActiveProgressStep((s) => Math.max(0, s - 1))}
              className="hover:text-white"
            >
              Prev Step
            </button>
            <button
              type="button"
              onClick={() => setActiveProgressStep((s) => Math.min(3, s + 1))}
              className="hover:text-white text-cyan-400 font-bold"
            >
              Next Step
            </button>
          </div>
        </div>
      </div>

      {/* 16 Onboarding Patterns Interactive Matrix */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
        <div ref={patternSelectRef} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <span>16 Onboarding & Guidance Patterns</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Select any pattern to test its live interactive mechanics, ergonomics, and export code.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCodeModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <FileCode className="w-4 h-4" />
              <span>View Pattern Code</span>
            </button>
          </div>
        </div>

        {/* Pattern Pills Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {patternsList.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedPatternId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelectedPatternId(p.id);
                  playSound('SWITCH');
                  triggerHaptic('light');
                }}
                className={`p-3 rounded-2xl text-left border flex flex-col justify-between min-h-[84px] transition-all ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-md ring-1 ring-cyan-500/30'
                    : 'bg-zinc-900/70 border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-zinc-500'}`} />
                  <span className="text-[8px] font-mono uppercase px-1 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {p.category}
                  </span>
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-2 mt-2">{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pattern Interactive Stage */}
        <div ref={previewStageRef} className="pt-4">
          <div className="p-1 rounded-3xl bg-zinc-900/40 border border-zinc-800/80">
            {selectedPatternId === 'cinematic-story' && (
              <CinematicStoryPattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'horizontal-carousel' && (
              <HorizontalCarouselPattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'vertical-story' && (
              <VerticalStoryPattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'interactive-scene' && (
              <InteractiveScenePattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'character-guide' && (
              <CharacterGuidePattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'progressive-reveal' && (
              <ProgressiveRevealPattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'swipe-narrative' && (
              <SwipeNarrativePattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'animated-illustration' && (
              <AnimatedIllustrationPattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === '3d-object-intro' && (
              <ThreeDObjectIntroPattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'choose-your-path' && (
              <ChooseYourPathPattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'personalization' && (
              <PersonalizationPattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'progressive-setup' && (
              <ProgressiveSetupPattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'interactive-tutorial' && (
              <InteractiveTutorialPattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'spotlight-walkthrough' && (
              <SpotlightWalkthroughPattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'gesture-tutorial' && (
              <GestureTutorialPattern onComplete={() => playSound('SUCCESS')} />
            )}
            {selectedPatternId === 'achievement-onboarding' && (
              <AchievementOnboardingPattern onComplete={() => playSound('SUCCESS')} />
            )}
          </div>
        </div>
      </div>

      {/* Skip & Revisit Manager Hub */}
      <SkipRevisitManager
        completedWalkthroughs={completedGuides}
        dismissedHints={dismissedHints}
        onRestartWalkthrough={handleRestartGuide}
        onRestoreHints={handleRestoreHints}
      />

      {/* Spotlight Tour Cutout Overlay (Dynamic SVG Mask) */}
      <SpotlightTour
        isOpen={spotlightTourOpen}
        targetRect={getTargetRect(spotlightStep)}
        currentStep={spotlightStep}
        totalSteps={spotlightStepsData.length}
        title={spotlightStepsData[spotlightStep]?.title || 'Orientation Tour'}
        description={spotlightStepsData[spotlightStep]?.description || ''}
        placement={spotlightStepsData[spotlightStep]?.placement || 'bottom'}
        onNext={() => setSpotlightStep((s) => s + 1)}
        onPrev={() => setSpotlightStep((s) => s - 1)}
        onSkip={() => setSpotlightTourOpen(false)}
        onComplete={() => {
          setSpotlightTourOpen(false);
          playSound('SUCCESS');
          triggerHaptic('success');
        }}
      />

      {/* Code Export Modal */}
      {codeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl p-6 rounded-3xl bg-zinc-900 border border-zinc-700 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <span>{activeCatalogEntry.name} Component Code</span>
              </h3>
              <button
                type="button"
                onClick={() => setCodeModalOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-black border border-zinc-800 text-xs font-mono text-cyan-300 overflow-x-auto max-h-80">
              {activeCatalogEntry.codeArtifact}
            </pre>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(activeCatalogEntry.codeArtifact);
                  playSound('SUCCESS');
                  setCodeModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
              >
                Copy Component Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
