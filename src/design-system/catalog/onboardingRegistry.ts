/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CatalogEntry } from './catalogTypes';

export const ONBOARDING_CATALOG: CatalogEntry[] = [
  {
    id: 'onboarding-spotlight',
    name: 'Spotlight Walkthrough Overlay',
    component: 'SpotlightTour',
    family: 'feedback',
    tags: ['spotlight', 'onboarding', 'walkthrough', 'tour', 'cutout', 'keyboard', 'zero-lag'],
    description: 'SVG cutout focus mask isolating targeted UI elements with smooth transitions, beacon rings, step navigation, instant skip, and full keyboard control (Esc/Arrows).',
    mood: 'Focused, clear, and respectful',
    visualStyle: 'Darkened backdrop with precise SVG element cutout, beacon pulse ring, and floating glass popover',
    motionStyle: 'Fast spring translation without blocking animation lag',
    interactionStyle: 'Step-by-step guided focus, keyboard Esc to dismiss, arrow keys to navigate',
    lightingStyle: 'Cyan beacon ring illumination and soft target drop shadow',
    soundStyle: 'Subtle micro-switch click on next step and soft completion chime',
    hapticStyle: 'Light selection tap per step with success vibration upon finish',
    states: ['active', 'transitioning', 'skipped', 'completed'],
    responsiveBehavior: 'Adaptive popover positioning (top/bottom/left/right/center) with viewport clamping',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Developer onboarding tours and high-productivity IDE first-run experiences',
    license: 'MIT',
    codeArtifact: `<SpotlightTour
  isOpen={tourActive}
  targetRect={activeTargetRect}
  currentStep={stepIndex}
  totalSteps={3}
  title="Component Workbench"
  description="Select any physical control to test its real-world interaction."
  onNext={() => setStepIndex((s) => s + 1)}
  onPrev={() => setStepIndex((s) => s - 1)}
  onSkip={() => setTourActive(false)}
  onComplete={() => setTourActive(false)}
/>`,
    aiSpecification: `SPECIFICATION: SpotlightTour
- Type: Guided Element Spotlight
- Cutout: Dynamic SVG mask calculating bounding rect of target elements
- Keyboard: Escape (instant dismiss), ArrowRight/Enter (next), ArrowLeft (prev)`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-coachmark',
    name: 'Contextual Coach Mark',
    component: 'CoachMark',
    family: 'feedback',
    tags: ['coachmark', 'tooltip', 'popover', 'beacon', 'pointer', 'guidance'],
    description: 'Anchored contextual tip badge with callout arrow, pulse beacon, step indicators, and dismissible actions.',
    mood: 'Helpful and unobtrusive',
    visualStyle: 'Compact dark glass container with cyan beacon pip and clean typography',
    motionStyle: 'Subtle entry scale with 150ms spring response',
    interactionStyle: 'Action buttons (Dismiss, Next, Got it) without trapping focus',
    lightingStyle: 'Cyan glow beacon and crisp border rim',
    soundStyle: 'Micro tap on dismiss/next',
    hapticStyle: 'Light haptic tap',
    states: ['open', 'dismissed', 'next'],
    responsiveBehavior: 'Auto-clamping popover width (w-72 sm:w-80)',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Figma and Notion non-intrusive feature callouts',
    license: 'MIT',
    codeArtifact: `<CoachMark
  config={{
    id: 'knob-tip',
    targetId: 'rotary-knob',
    title: 'Polar Angle Dragging',
    description: 'Click and drag around the center axis to test atan2 trigonometry.',
    badge: 'PRO TIP',
    stepIndex: 0,
    totalSteps: 3
  }}
  isOpen={showTip}
  onDismiss={() => setShowTip(false)}
  onNext={() => advanceTip()}
/>`,
    aiSpecification: `SPECIFICATION: CoachMark
- Type: Anchored Contextual Callout
- Placement: Relative to target element with beacon pulse indicator`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-hint',
    name: 'Contextual Micro-Hints & Beacons',
    component: 'ContextualHint',
    family: 'feedback',
    tags: ['hint', 'beacon', 'inline', 'pill', 'tooltip', 'subtle'],
    description: 'Non-intrusive micro-tooltips, subtle discovery beacon pills, and inline guidance notes that never obstruct user workflow.',
    mood: 'Quiet and non-blocking',
    visualStyle: 'Inline callout box, beacon pill, or floating question bubble',
    motionStyle: 'Instant or 100ms micro-fade',
    interactionStyle: 'Click or hover to reveal, persistent dismiss option',
    lightingStyle: 'Subtle cyan text accents on dark neutral ground',
    soundStyle: 'Micro tap',
    hapticStyle: 'None or micro tap',
    states: ['collapsed', 'expanded', 'dismissed'],
    responsiveBehavior: 'Inline fluid placement',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Stripe Dashboard contextual micro-hints',
    license: 'MIT',
    codeArtifact: `<ContextualHint
  hint={{
    id: 'haptic-note',
    label: 'Haptic Engine',
    content: 'Sub-millisecond vibrations fire for rotary detents and pressure dumps.',
    type: 'beacon',
    dismissible: true
  }}
/>`,
    aiSpecification: `SPECIFICATION: ContextualHint
- Type: Micro Guidance
- Modes: inline, beacon, pill
- Dismissal: Optional user dismiss with persistence memory`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-progress',
    name: 'Progress Indicators & Estimation',
    component: 'OnboardingProgress',
    family: 'feedback',
    tags: ['progress', 'stepper', 'segmented', 'dots', 'radial', 'time-estimate'],
    description: 'Multi-variant onboarding progress visualization: segmented bars, numbered step dots with completion checks, radial progress rings, and time-estimate pills.',
    mood: 'Affirmative and informative',
    visualStyle: 'High-contrast segmented cyan lines, checkmarked pill dots, and SVG radial gauge',
    motionStyle: 'Smooth 200ms width/offset transitions',
    interactionStyle: 'Interactive step jumping and live percent readout',
    lightingStyle: 'Cyan glow on active segment with emerald completion marks',
    soundStyle: 'None or micro-tap on jump',
    hapticStyle: 'Light selection tap',
    states: ['current', 'completed', 'upcoming'],
    responsiveBehavior: 'Full-width elastic scaling',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react'],
    sourceInspiration: 'Linear progress stepper and Apple Watch activity rings',
    license: 'MIT',
    codeArtifact: `<OnboardingProgress
  currentStep={activeStep}
  totalSteps={4}
  variant="segmented"
  estimatedSecondsRemaining={20}
  onStepClick={(step) => setActiveStep(step)}
/>`,
    aiSpecification: `SPECIFICATION: OnboardingProgress
- Type: Multi-Variant Progress Indicator
- Variants: segmented, dots, radial, time-estimate`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-cinematic',
    name: 'Cinematic Story Narrative',
    component: 'CinematicStoryPattern',
    family: 'feedback',
    tags: ['cinematic', 'story', 'narrative', 'widescreen', 'skip', 'intro'],
    description: 'Widescreen aspect narrative with atmospheric gradient transitions, key phrase reveals, and instant skip controls.',
    mood: 'Atmospheric and immersive',
    visualStyle: 'Widescreen card frame with deep gradient backdrops and typography contrast',
    motionStyle: 'Smooth 300ms narrative cross-fade',
    interactionStyle: 'Sequential story slide advance with instant skip',
    lightingStyle: 'Atmospheric ambient backlight gradients',
    soundStyle: 'Ambient tone and crisp transition switch',
    hapticStyle: 'Medium haptic pulse on slide change',
    states: ['slide-1', 'slide-2', 'slide-3', 'complete'],
    responsiveBehavior: 'Fluid aspect-ratio scaling (max-w-3xl)',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Apple product keynote intros and gaming cinematic launches',
    license: 'MIT',
    codeArtifact: `<CinematicStoryPattern
  onComplete={() => startMainApp()}
  onSkip={() => startMainApp()}
/>`,
    aiSpecification: `SPECIFICATION: CinematicStoryPattern
- Type: Multi-Act Narrative Introduction
- Skip: Instant skip button always available to respect user autonomy`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-carousel',
    name: 'Horizontal Card Carousel Deck',
    component: 'HorizontalCarouselPattern',
    family: 'feedback',
    tags: ['carousel', 'cards', 'horizontal', 'swipe', 'deck', 'dots'],
    description: 'Gesture-driven horizontal card deck with smooth drag snap, dot indicators, next/back navigation, and skip controls.',
    mood: 'Structured and agile',
    visualStyle: 'Elevated dark glass card deck with indicator dot bar',
    motionStyle: 'Spring slide transitions (x: 40 -> 0)',
    interactionStyle: 'Swipe, drag, or button click navigation',
    lightingStyle: 'Cyan active pill highlight',
    soundStyle: 'Micro-switch tap',
    hapticStyle: 'Light selection tap',
    states: ['active', 'transitioning', 'completed'],
    responsiveBehavior: 'Card width clamped to container',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Modern mobile app onboarding carousels',
    license: 'MIT',
    codeArtifact: `<HorizontalCarouselPattern
  onComplete={() => setOnboarded(true)}
  onSkip={() => setOnboarded(true)}
/>`,
    aiSpecification: `SPECIFICATION: HorizontalCarouselPattern
- Type: Card Deck Carousel
- Motion: AnimatePresence horizontal slide`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-vertical',
    name: 'Vertical Story Reels',
    component: 'VerticalStoryPattern',
    family: 'feedback',
    tags: ['vertical', 'story', 'reels', 'tiktok', 'tap-to-advance'],
    description: 'Reel-style vertical cards with auto-fill progress bars, tap-to-advance gesture, and quick skip.',
    mood: 'Modern and fast-paced',
    visualStyle: 'Tall vertical card with multi-segment top progress bar',
    motionStyle: 'Fast cross-fade on tap',
    interactionStyle: 'Tap anywhere to advance',
    lightingStyle: 'Subtle cyan highlight accents',
    soundStyle: 'Swift mode switch tone',
    hapticStyle: 'Light selection pulse',
    states: ['story-1', 'story-2', 'story-3'],
    responsiveBehavior: 'Mobile-first vertical proportion (max-w-md)',
    accessibility: 'AA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Instagram & TikTok story narrative pacing',
    license: 'MIT',
    codeArtifact: `<VerticalStoryPattern
  onComplete={() => setDone(true)}
  onSkip={() => setDone(true)}
/>`,
    aiSpecification: `SPECIFICATION: VerticalStoryPattern
- Type: Vertical Reel Story
- Timing: Tap-to-advance or auto-progress with segmented timeline`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-interactive-scene',
    name: 'Interactive Scene Calibration Stage',
    component: 'InteractiveScenePattern',
    family: 'feedback',
    tags: ['interactive', 'scene', 'stage', 'calibration', 'hands-on'],
    description: 'Mini interactive stage where users perform live actions (flip power switch, calibrate dial) to verify understanding before proceeding.',
    mood: 'Engaging and practical',
    visualStyle: 'Two-column instrument calibration bench',
    motionStyle: 'Live state reactive updates',
    interactionStyle: 'Hands-on hardware interaction with verification unlock',
    lightingStyle: 'Emerald active glow on success criteria',
    soundStyle: 'Heavy action throw and success confirmation chime',
    hapticStyle: 'Heavy detent snap & success vibration',
    states: ['awaiting', 'calibrated', 'completed'],
    responsiveBehavior: 'Grid adapting from single to dual column',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react'],
    sourceInspiration: 'Video game interactive tutorials and flight simulator checkouts',
    license: 'MIT',
    codeArtifact: `<InteractiveScenePattern
  onComplete={() => setCalibrated(true)}
/>`,
    aiSpecification: `SPECIFICATION: InteractiveScenePattern
- Type: Interactive Calibration Stage
- Requirement: User flips switch and drags dial above 70% threshold to unlock finish`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-character',
    name: 'Character Guide & AI Dialogue Mascot',
    component: 'CharacterGuidePattern',
    family: 'feedback',
    tags: ['character', 'mascot', 'avatar', 'dialogue', 'speech', 'ai'],
    description: 'Interactive AI Assistant mascot with expressive dialogue bubbles, reactive facial expressions, and rapid speech pacing.',
    mood: 'Friendly, intelligent, and helpful',
    visualStyle: 'Pulsing bot avatar paired with anchored speech bubble',
    motionStyle: 'Subtle avatar breathing pulse with dialogue step transitions',
    interactionStyle: 'Step dialogue advance with instant next action',
    lightingStyle: 'Cyan glow around bot avatar',
    soundStyle: 'Micro click tone',
    hapticStyle: 'Light selection tap',
    states: ['dialogue-1', 'dialogue-2', 'dialogue-3'],
    responsiveBehavior: 'Compact horizontal card',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react'],
    sourceInspiration: 'Duolingo mascot dialogue and AI coding copilot tutorials',
    license: 'MIT',
    codeArtifact: `<CharacterGuidePattern
  onComplete={() => startTour()}
/>`,
    aiSpecification: `SPECIFICATION: CharacterGuidePattern
- Type: Guided Mascot Dialogue
- Feature: Non-blocking dialogue sequence with instant continue buttons`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-progressive-reveal',
    name: 'Progressive Reveal Architecture',
    component: 'ProgressiveRevealPattern',
    family: 'feedback',
    tags: ['progressive-reveal', 'layers', 'hierarchy', 'architecture'],
    description: 'Stepwise unmasking of interface zones as the user unlocks foundational tokens, tactile controls, and compound layouts.',
    mood: 'Educational and systematic',
    visualStyle: 'Layered cards with locked/unlocked state badges',
    motionStyle: 'Height and opacity expansion on layer unlock',
    interactionStyle: 'Progressive layer unlock triggers',
    lightingStyle: 'Cyan border highlight on newly unlocked layer',
    soundStyle: 'Switch click on unlock',
    hapticStyle: 'Medium haptic pulse',
    states: ['layer-1', 'layer-2', 'layer-3'],
    responsiveBehavior: 'Vertical stack',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react'],
    sourceInspiration: 'Photoshop layer introductions and developer documentation progressive guides',
    license: 'MIT',
    codeArtifact: `<ProgressiveRevealPattern
  onComplete={() => setDone(true)}
/>`,
    aiSpecification: `SPECIFICATION: ProgressiveRevealPattern
- Type: Layer Unmasking Guidance
- Layers: Tokens -> Controls -> Dashboard Layouts`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-swipe',
    name: 'Swipe Narrative Card Stack',
    component: 'SwipeNarrativePattern',
    family: 'feedback',
    tags: ['swipe', 'narrative', 'cards', 'stack', 'discard'],
    description: 'Touch and pointer card stack with discard gesture mechanics and remaining card counters.',
    mood: 'Tactile and snappy',
    visualStyle: 'Layered card deck with discard animations',
    motionStyle: 'Exit translation (x: 200) with scale spring',
    interactionStyle: 'Discard click or swipe gesture',
    lightingStyle: 'Cyan top card border',
    soundStyle: 'Card discard action throw',
    hapticStyle: 'Light selection tap',
    states: ['stacking', 'discarding', 'finished'],
    responsiveBehavior: 'Centered container max-w-md',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react'],
    sourceInspiration: 'Tinder/Bumble card discard ergonomics applied to feature tutorials',
    license: 'MIT',
    codeArtifact: `<SwipeNarrativePattern
  onComplete={() => setReviewed(true)}
/>`,
    aiSpecification: `SPECIFICATION: SwipeNarrativePattern
- Type: Interactive Card Stack Discard
- Dismissal: Removes top card from queue with spring inertia`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-3d',
    name: '3D Spatial Object Introduction',
    component: 'ThreeDObjectIntroPattern',
    family: 'feedback',
    tags: ['3d', 'spatial', 'perspective', 'rotation', 'inspection'],
    description: 'Interactive 3D CSS perspective model with rotational drag inspection and angular angle telemetry readout.',
    mood: 'Futuristic and spatial',
    visualStyle: '3D isometric slab inside CSS perspective container',
    motionStyle: 'Real-time rotational angle response',
    interactionStyle: 'Slider angle scrub and pointer inspection',
    lightingStyle: 'Cyan-to-blue gradient surface illumination',
    soundStyle: 'Micro-tick clicks during angle scrub',
    hapticStyle: 'Continuous light drag haptics',
    states: ['idle', 'rotating', 'confirmed'],
    responsiveBehavior: 'Centered perspective stage',
    accessibility: 'AA',
    performanceTier: 'real-time',
    dependencies: ['lucide-react'],
    sourceInspiration: 'Apple Vision Pro spatial object showcases',
    license: 'MIT',
    codeArtifact: `<ThreeDObjectIntroPattern
  onComplete={() => setInspected(true)}
/>`,
    aiSpecification: `SPECIFICATION: ThreeDObjectIntroPattern
- Type: 3D Perspective Inspection Stage
- Transform: CSS rotateY and rotateX with preserve-3d`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-path',
    name: 'Choose-Your-Path Branching Tour',
    component: 'ChooseYourPathPattern',
    family: 'feedback',
    tags: ['path', 'branching', 'role-select', 'engineer', 'designer', 'architect'],
    description: 'Branching discipline selector (Frontend Engineer, Product Designer, Systems Architect) tailoring the walkthrough.',
    mood: 'Personalized and efficient',
    visualStyle: '3-column role selection cards with active ring states',
    motionStyle: 'Border and background highlight transition',
    interactionStyle: 'Exclusive single selection with start confirmation',
    lightingStyle: 'Cyan active ring glow',
    soundStyle: 'Switch click tone',
    hapticStyle: 'Light selection tap',
    states: ['unselected', 'selected', 'started'],
    responsiveBehavior: 'Adaptive 3-column to 1-column grid',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react'],
    sourceInspiration: 'Vercel, Stripe, and Figma role-based onboarding branching',
    license: 'MIT',
    codeArtifact: `<ChooseYourPathPattern
  onComplete={() => startPathTour()}
/>`,
    aiSpecification: `SPECIFICATION: ChooseYourPathPattern
- Type: Role-Based Branching Tour
- Roles: Engineer (code/APIs), Designer (tokens/haptics), Architect (bundles/compliance)`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-personalization',
    name: 'Personalization & Sensory Config',
    component: 'PersonalizationPattern',
    family: 'feedback',
    tags: ['personalization', 'sound', 'haptics', 'sensory', 'preferences'],
    description: 'Live interactive configuration toggles for sound effects, haptic engines, and workspace themes.',
    mood: 'Customizable and user-centric',
    visualStyle: 'Compact settings matrix with high-contrast toggle badges',
    motionStyle: 'Instant toggle response',
    interactionStyle: 'One-click sensory channel toggles',
    lightingStyle: 'Emerald enabled badges and cyan borders',
    soundStyle: 'Switch flip audio',
    hapticStyle: 'Medium haptic toggle',
    states: ['sound-on', 'sound-off', 'haptics-on', 'haptics-off'],
    responsiveBehavior: 'Full-width containment',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react'],
    sourceInspiration: 'Operating system accessibility & sensory setup screens',
    license: 'MIT',
    codeArtifact: `<PersonalizationPattern
  onComplete={() => savePreferences()}
/>`,
    aiSpecification: `SPECIFICATION: PersonalizationPattern
- Type: Workspace Sensory Preferences
- Toggles: Web Audio synthesizer synth, Navigator vibrate haptics, theme`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-progressive-setup',
    name: 'Progressive Setup Checklist',
    component: 'ProgressiveSetupPattern',
    family: 'feedback',
    tags: ['setup', 'checklist', 'verification', 'badges', 'stepwise'],
    description: 'Modular checklist setup with instant live check state, completion counter, and confirmation gating.',
    mood: 'Rigorous and reassuring',
    visualStyle: 'Interactive checklist rows with checkmark boxes and status badge',
    motionStyle: 'Checkmark spring scale',
    interactionStyle: 'Toggle item completion with live progress counter',
    lightingStyle: 'Cyan active check highlight',
    soundStyle: 'Micro-switch tap',
    hapticStyle: 'Light selection tap',
    states: ['incomplete', 'partial', 'complete'],
    responsiveBehavior: 'Vertical list',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react'],
    sourceInspiration: 'AWS / GCP deployment setup checklists and GitHub repository onboarding',
    license: 'MIT',
    codeArtifact: `<ProgressiveSetupPattern
  onComplete={() => setSetupDone(true)}
/>`,
    aiSpecification: `SPECIFICATION: ProgressiveSetupPattern
- Type: Stepwise Environment Checklist
- Checkpoints: Repository manifest, typography scale, Web Audio contexts`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-tutorial',
    name: 'Interactive Task Simulator',
    component: 'InteractiveTutorialPattern',
    family: 'feedback',
    tags: ['tutorial', 'simulator', 'terminal', 'sandbox', 'command'],
    description: 'Hands-on sandbox task simulator prompting the user to type and execute a verified verification command.',
    mood: 'Empowering and practical',
    visualStyle: 'Embedded dark terminal with prompt carrot and verification button',
    motionStyle: 'Prompt cursor blink',
    interactionStyle: 'Text input with live validation checking',
    lightingStyle: 'Cyan terminal prompt glow and emerald success button',
    soundStyle: 'Success confirmation chime on valid command execution',
    hapticStyle: 'Success haptic burst',
    states: ['awaiting-input', 'valid', 'executed'],
    responsiveBehavior: 'Full-width embedded terminal',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react'],
    sourceInspiration: 'GitHub Skills interactive learning labs and Codecademy task sandboxes',
    license: 'MIT',
    codeArtifact: `<InteractiveTutorialPattern
  onComplete={() => setCompleted(true)}
/>`,
    aiSpecification: `SPECIFICATION: InteractiveTutorialPattern
- Type: Interactive Command Task Sandbox
- Validation: Verifies correct keyword execution before completing`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-gesture',
    name: 'Gesture Demonstration Tutorial',
    component: 'GestureTutorialPattern',
    family: 'feedback',
    tags: ['gesture', 'drag', 'tap', 'hold', 'touch', 'animation'],
    description: 'Visual pointer animation demonstrating multi-touch drag, tap, and sustained press-and-hold gestures.',
    mood: 'Instructive and visual',
    visualStyle: 'Animated glowing hand cursor with gesture selector tabs',
    motionStyle: 'Continuous looping kinetic gesture animations',
    interactionStyle: 'Select gesture mode (drag, tap, hold) to inspect animation',
    lightingStyle: 'Cyan beacon ring on pointer focus',
    soundStyle: 'Micro-tap on mode switch',
    hapticStyle: 'Light selection tap',
    states: ['drag', 'tap', 'hold'],
    responsiveBehavior: 'Centered demo box',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'iOS Home indicator gesture tutorials and trackpad preference panes',
    license: 'MIT',
    codeArtifact: `<GestureTutorialPattern
  onComplete={() => setGesturesUnderstood(true)}
/>`,
    aiSpecification: `SPECIFICATION: GestureTutorialPattern
- Type: Animated Pointer Gesture Guide
- Modes: drag (horizontal swipe), tap (micro-scale pulse), hold (expansion loop)`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-achievement',
    name: 'Achievement Onboarding & XP Milestones',
    component: 'AchievementOnboardingPattern',
    family: 'feedback',
    tags: ['achievement', 'gamification', 'xp', 'milestones', 'trophy', 'reward'],
    description: 'Gamified milestone badges with dynamic XP progress bar, claimable discovery rewards, and celebratory sound.',
    mood: 'Celebratory and rewarding',
    visualStyle: 'Amber trophy badges with glowing gold XP progress bar',
    motionStyle: 'Smooth 500ms XP progress bar fill',
    interactionStyle: 'Claim reward button with immediate score increment',
    lightingStyle: 'Amber milestone glow',
    soundStyle: 'Trophy success chime',
    hapticStyle: 'Celebratory double-pulse haptic',
    states: ['in-progress', 'reward-claimed', 'complete'],
    responsiveBehavior: 'Card grid',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react'],
    sourceInspiration: 'Duolingo XP progression and gaming onboarding achievements',
    license: 'MIT',
    codeArtifact: `<AchievementOnboardingPattern
  onComplete={() => setOnboardingMastered(true)}
/>`,
    aiSpecification: `SPECIFICATION: AchievementOnboardingPattern
- Type: Gamified Onboarding Progression
- Rewards: Dynamic XP incrementation with celebratory sound and haptics`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'onboarding-revisit',
    name: 'Skip & Revisit History Hub',
    component: 'SkipRevisitManager',
    family: 'feedback',
    tags: ['revisit', 'history', 'skip', 'restore', 'guidance', 'settings'],
    description: 'Persistent tray allowing users to instantly dismiss tours, restart completed guides, and restore dismissed contextual hints.',
    mood: 'Respectful and persistent',
    visualStyle: 'Recessed tray with history pill tags and restoration buttons',
    motionStyle: 'Accordion height expansion',
    interactionStyle: 'One-click tour restart and hint restoration',
    lightingStyle: 'Cyan restore button highlights',
    soundStyle: 'Micro-tap and restoration confirmation chime',
    hapticStyle: 'Success vibration upon hint restoration',
    states: ['collapsed', 'expanded'],
    responsiveBehavior: 'Full-width modular component',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Slack / VS Code "Revisit Feature Tours" control panel',
    license: 'MIT',
    codeArtifact: `<SkipRevisitManager
  completedWalkthroughs={['workspace-tour']}
  dismissedHints={['hint-1']}
  onRestartWalkthrough={(id) => startGuide(id)}
  onRestoreHints={() => restoreAllHints()}
/>`,
    aiSpecification: `SPECIFICATION: SkipRevisitManager
- Type: Guidance Management Hub
- Capabilities: Restart any walkthrough, restore dismissed contextual hints, no locked traps`,
    version: '2.0.0',
    status: 'stable',
  },
];
