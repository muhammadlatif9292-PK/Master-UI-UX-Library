/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CatalogEntry } from './catalogTypes';

export const CONTROLS_CATALOG: CatalogEntry[] = [
  {
    id: 'control-switch',
    name: 'Tactile & Mechanical Switches',
    component: 'InteractiveSwitch',
    family: 'input',
    tags: ['switch', 'toggle', 'mechanical', 'lever', 'lightswitch', 'liquid', 'neon', 'ios'],
    description: 'Universal bistable toggles with realistic physical metaphors: domestic rocker wall plates, metal toggle levers, liquid droplet morphs, and cyber neon tubes.',
    mood: 'Tactile, mechanical, and responsive',
    visualStyle: 'Skeuomorphic metal ribbing, 3D rocker tilt perspective, and neon glow tubes',
    motionStyle: 'Spring flip, liquid blob stretch, and mechanical detent latching',
    interactionStyle: 'Toggle with auditory latch and tactile haptic feedback',
    lightingStyle: 'Specular metallic ridges, amber/emerald LED indicator tips',
    soundStyle: 'Latching mechanical throw (ACTION) and crisp micro-toggle (MICRO)',
    hapticStyle: 'Heavy detent snap & soft viscous pulse',
    states: ['on', 'off', 'hover', 'focus-visible', 'disabled', 'latching'],
    responsiveBehavior: 'Self-contained adaptive touch target (min 44px)',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Industrial avionics, domestic electrical rocker switches, and Apple iOS toggles',
    license: 'MIT',
    codeArtifact: `<InteractiveSwitch
  checked={enabled}
  onChange={setEnabled}
  styleVariant="mechanical"
  label="Auxiliary Reactor Power"
  sublabel="Industrial toggle lever with latching feedback"
/>`,
    aiSpecification: `SPECIFICATION: InteractiveSwitch
- Type: Bistable Boolean Control
- Interaction Models: mechanical (lever), lightswitch (3D wall plate), liquid (fluid blob), neon (cyber tube), ios (smooth spring)
- Accessibility: role="switch", aria-checked, tabIndex=0, Space/Enter keyboard support`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'control-checkbox',
    name: 'Tactile & Morphing Checkbox',
    component: 'InteractiveCheckbox',
    family: 'input',
    tags: ['checkbox', 'multi-select', 'tactile', 'morph', 'neon'],
    description: 'Multi-selection check controls featuring spring-morphing vector checkmarks, tactile depress depth, and high-voltage neon borders.',
    mood: 'Precise and affirmative',
    visualStyle: 'Subtle inner depth, specular outline, high-contrast checkmark',
    motionStyle: 'Spring scale-in with rotational overshoot (damping: 25)',
    interactionStyle: 'Click/Tap with haptic detent',
    lightingStyle: 'Neon border bloom & emerald affirmative fills',
    soundStyle: 'Micro-tap and acoustic click',
    hapticStyle: 'Medium click haptic',
    states: ['checked', 'unchecked', 'indeterminate', 'hover', 'focus-visible'],
    responsiveBehavior: 'Fluid row alignment with wrap-safe labeling',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'High-precision audio mixing desks and tactical forms',
    license: 'MIT',
    codeArtifact: `<InteractiveCheckbox
  checked={accepted}
  onChange={setAccepted}
  styleVariant="neon"
  label="Hardware Interlock Arming"
  description="Enable multi-channel telemetry streaming"
/>`,
    aiSpecification: `SPECIFICATION: InteractiveCheckbox
- Type: Boolean Selection Control
- Variants: tactile, neon, minimal
- Accessibility: role="checkbox", aria-checked, full keyboard activation`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'control-radio',
    name: 'Orbit & Polar Radio Group',
    component: 'InteractiveRadioGroup',
    family: 'input',
    tags: ['radio', 'exclusive-select', 'orbit', 'magnetic', 'neon'],
    description: 'Mutually exclusive selection primitives with shared layout spring transition dots, satellite orbit indicators, and glowing rings.',
    mood: 'Focused and decisive',
    visualStyle: 'Radial concentric rings with shared layout spring indicators',
    motionStyle: 'Shared layoutId physics spring transition across options',
    interactionStyle: 'Exclusive single selection with magnetic lock',
    lightingStyle: 'Concentric halo glow and neon border highlights',
    soundStyle: 'Micro switch tap',
    hapticStyle: 'Light selection tap',
    states: ['selected', 'unselected', 'hover', 'focus-visible'],
    responsiveBehavior: 'Vertical and horizontal adaptive layout',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Satellite orbital mechanics and avionics selector banks',
    license: 'MIT',
    codeArtifact: `<InteractiveRadioGroup
  options={[
    { id: '1', label: 'Primary Cluster', desc: 'Active node' },
    { id: '2', label: 'Failover Replica', desc: 'Standby mode' }
  ]}
  value={selected}
  onChange={setSelected}
  styleVariant="orbit"
/>`,
    aiSpecification: `SPECIFICATION: InteractiveRadioGroup
- Type: Exclusive Selection
- Features: Framer Motion layoutId shared indicator, radio accessibility roles`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'control-segmented',
    name: 'Segmented Control Matrix',
    component: 'InteractiveSegmentedControl',
    family: 'input',
    tags: ['segmented', 'tabs', 'ios', 'hud', 'glass', 'switch'],
    description: 'Horizontal discrete state pickers with continuous spring-glide pill backdrops, cyberpunk HUD frames, and frosted glass refractions.',
    mood: 'Streamlined and tactile',
    visualStyle: 'Recessed channel track with elevated gliding pill',
    motionStyle: 'Spring glide (stiffness: 450, damping: 30)',
    interactionStyle: 'One-touch discrete state selection',
    lightingStyle: 'Specular glass highlights & HUD neon outlines',
    soundStyle: 'Swift mode switch tone',
    hapticStyle: 'Light selection pulse',
    states: ['active', 'inactive', 'hover', 'focus'],
    responsiveBehavior: 'Equal flex-proportional distribution',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Apple macOS system segmented bars and fighter jet HUD panels',
    license: 'MIT',
    codeArtifact: `<InteractiveSegmentedControl
  options={[
    { id: 'auto', label: 'Automatic' },
    { id: 'manual', label: 'Manual' },
    { id: 'override', label: 'Override' }
  ]}
  value={mode}
  onChange={setMode}
  styleVariant="hud"
/>`,
    aiSpecification: `SPECIFICATION: InteractiveSegmentedControl
- Type: Discrete Segment Selector
- Variants: ios, hud, glass, minimal
- Animation: Spring layoutId transition`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'control-slider',
    name: 'Elastic & Waveform Sliders',
    component: 'InteractiveSlider',
    family: 'input',
    tags: ['slider', 'fader', 'elastic', 'waveform', 'neon', 'spring'],
    description: 'Continuous and stepped numerical faders with elastic overshoot, neon laser fills, and audio frequency gradient tracks.',
    mood: 'Dynamic and analog',
    visualStyle: 'Gradient channel track with embossed metallic thumb',
    motionStyle: 'Elastic spring track fill with velocity awareness',
    interactionStyle: 'Continuous scrub & discrete step detents',
    lightingStyle: 'Laser neon glow and specular thumb rims',
    soundStyle: 'Discrete micro-tick bursts on step transitions',
    hapticStyle: 'Soft continuous drag feedback',
    states: ['dragging', 'idle', 'hover', 'focus-visible'],
    responsiveBehavior: '100% fluid container width scaling',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Studio audio faders, laboratory vernier sliders, and iOS sliders',
    license: 'MIT',
    codeArtifact: `<InteractiveSlider
  value={level}
  onChange={setLevel}
  min={0}
  max={100}
  label="Preamp Gain"
  unit="dB"
  styleVariant="waveform"
/>`,
    aiSpecification: `SPECIFICATION: InteractiveSlider
- Type: Continuous Value Scrub
- Features: Native accessible input[type=range] wrapped with custom visual canvas`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'control-range',
    name: 'Calibrated Dual-Range Selector',
    component: 'InteractiveRangeSelector',
    family: 'input',
    tags: ['range', 'bounds', 'min-max', 'interval', 'calibration'],
    description: 'Dual-thumb bounding interval selector with non-overlapping clamps, live distance calculation, and highlighted bounded track.',
    mood: 'Precise and scientific',
    visualStyle: 'Dual-thumb bounded highlighted channel with gradient fill',
    motionStyle: 'Real-time synchronized track expansion',
    interactionStyle: 'Independent minimum and maximum thumb positioning',
    lightingStyle: 'Emerald-to-cyan gradient bounding track',
    soundStyle: 'Boundary adjustment micro-ticks',
    hapticStyle: 'Soft bound drag haptics',
    states: ['min-drag', 'max-drag', 'idle', 'hover'],
    responsiveBehavior: 'Full-width elastic scaling',
    accessibility: 'AA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Spectrometry band filters and financial time-series range pickers',
    license: 'MIT',
    codeArtifact: `<InteractiveRangeSelector
  minVal={lowerBound}
  maxVal={upperBound}
  minLimit={0}
  maxLimit={500}
  onChange={(min, max) => {
    setLowerBound(min);
    setUpperBound(max);
  }}
  label="Frequency Passband"
  unit="Hz"
/>`,
    aiSpecification: `SPECIFICATION: InteractiveRangeSelector
- Type: Dual Interval Selector
- Clamping: Minimum delta protection between min/max bounds`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'control-knob',
    name: 'Polar Rotary Knobs & Encoders',
    component: 'InteractiveKnob',
    family: 'input',
    tags: ['knob', 'rotary', 'dial', 'polar', 'atan2', 'scientific', 'analog'],
    description: 'Real-world rotary dial with polar angle dragging (atan2), 270-degree calibrated sweep, tactile detent clicks, and scientific vernier ticks.',
    mood: 'Authentic analog instrument',
    visualStyle: 'Knurled aluminum outer rim with indicator pip and calibrated radial tick marks',
    motionStyle: 'Rotational spring inertia (stiffness: 600, damping: 35)',
    interactionStyle: 'Polar drag around center axis with pointer capture',
    lightingStyle: 'Metallic conical gradient specular reflection and glowing position pip',
    soundStyle: 'Mechanical detent click on angular increment',
    hapticStyle: 'Rigid tactile tick detents',
    states: ['dragging', 'idle', 'hover', 'stepped'],
    responsiveBehavior: 'Fixed circular aspect ratio with touch-optimized hit area',
    accessibility: 'AA',
    performanceTier: 'real-time',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Moog synthesizers, Tektronix oscilloscopes, and aerospace audio consoles',
    license: 'MIT',
    codeArtifact: `<InteractiveKnob
  value={gain}
  onChange={setGain}
  styleVariant="scientific"
  label="Oscillator Res"
  unit="kHz"
  stepped={false}
/>`,
    aiSpecification: `SPECIFICATION: InteractiveKnob
- Type: Polar Rotary Encoder
- Angle Math: atan2(dy, dx) with -135deg to +135deg 270-degree calibrated arc
- Touch: Pointer capture API for unbroken dragging`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'control-radial-dial',
    name: 'Radial Arc Gauge & Target Dial',
    component: 'InteractiveRadialDial',
    family: 'input',
    tags: ['radial', 'dial', 'gauge', 'arc', 'target', 'circular'],
    description: 'Circular progress dial with continuous SVG stroke-dashoffset interpolation, adjustable target pip, and center readout display.',
    mood: 'Futuristic and telemetry-rich',
    visualStyle: 'Gradient SVG circular arc with calibrated target threshold marker',
    motionStyle: 'Spring stroke-dashoffset physics (damping: 25)',
    interactionStyle: 'Rotational scrub and target comparison',
    lightingStyle: 'Bioluminescent cyan-to-emerald gradient stroke',
    soundStyle: 'Vector sweep audio tone',
    hapticStyle: 'Subtle pulse on target crossing',
    states: ['value-change', 'target-match', 'idle'],
    responsiveBehavior: 'Scalable SVG geometry',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react'],
    sourceInspiration: 'Electric vehicle battery telemetry and Apple Watch activity rings',
    license: 'MIT',
    codeArtifact: `<InteractiveRadialDial
  value={power}
  target={85}
  onChange={setPower}
  label="Core Power Vector"
  unit="MW"
/>`,
    aiSpecification: `SPECIFICATION: InteractiveRadialDial
- Type: Radial Arc Gauge
- Math: 2 * Math.PI * r circumference stroke interpolation`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'control-meter',
    name: 'Analog Galvanometer VU Meter',
    component: 'InteractiveAnalogMeter',
    family: 'feedback',
    tags: ['meter', 'vu', 'analog', 'galvanometer', 'needle', 'ballistic'],
    description: 'Authentic vintage galvanometer audio meter featuring ballistic needle dampening, scale markings, warm amber backlighting, and peak LED latching.',
    mood: 'Warm vintage analog',
    visualStyle: 'Beveled metal enclosure with warm amber faceplate, curved dB scale, and black needle',
    motionStyle: 'Ballistic needle inertia with overshoot damping (rise: 300ms)',
    interactionStyle: 'Dynamic live audio / telemetry level response',
    lightingStyle: 'Warm incandescent faceplate glow with red peak clip LED',
    soundStyle: 'Subtle mechanical pivot needle flutter',
    hapticStyle: 'Heavy vibration upon redline threshold breach',
    states: ['nominal', 'redline', 'peak-hold'],
    responsiveBehavior: 'Scalable vintage container box',
    accessibility: 'AA',
    performanceTier: 'real-time',
    dependencies: ['motion/react'],
    sourceInspiration: 'Vintage Neve / Studer recording consoles and Simpson analog meters',
    license: 'MIT',
    codeArtifact: `<InteractiveAnalogMeter
  value={audioLevel}
  peak={90}
  label="Master Output VU"
/>`,
    aiSpecification: `SPECIFICATION: InteractiveAnalogMeter
- Type: Ballistic Galvanometer VU Meter
- Sweep: -45deg to +45deg with scale calibration (-20dB to +6dB)
- Peak Indicator: Visual LED latch at specified threshold`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'control-gauge',
    name: 'Bourdon Tube Pressure Gauge',
    component: 'InteractivePressureGauge',
    family: 'feedback',
    tags: ['gauge', 'pressure', 'bourdon', 'steam', 'psi', 'needle', 'relief-valve'],
    description: 'Industrial steam/hydraulic pressure gauge implementing Bourdon tube mechanics: damping inertia, high-pressure needle jitter, safety redline, and manual relief valve.',
    mood: 'Industrial and high-stakes',
    visualStyle: 'Heavy brass bezel with white dial plate, graduation marks, and danger zone',
    motionStyle: 'Realistic needle flutter and pressure-release pneumatic dump animation',
    interactionStyle: 'Pressure accumulation and manual relief valve venting',
    lightingStyle: 'Deep industrial cast shadow and luminous danger redline',
    soundStyle: 'Pneumatic steam dump (ACTION) and gauge needle click',
    hapticStyle: 'Heavy steam shudder haptic',
    states: ['normal', 'warning', 'critical', 'venting'],
    responsiveBehavior: 'Centered industrial circular dial',
    accessibility: 'AA',
    performanceTier: 'real-time',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Steam locomotives, nuclear reactor pressure vessels, and diving gear',
    license: 'MIT',
    codeArtifact: `<InteractivePressureGauge
  pressure={boilerPressure}
  maxPressure={120}
  onReliefValve={() => setBoilerPressure(20)}
/>`,
    aiSpecification: `SPECIFICATION: InteractivePressureGauge
- Type: Mechanical Pressure Instrument
- Behavior: Needle angle sweeps 250 degrees with random jitter when exceeding 90 PSI threshold
- Action: Manual relief valve triggers pneumatic steam decompression sound and resets pressure`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'control-stepper',
    name: 'Hold-to-Accelerate Stepper',
    component: 'InteractiveStepper',
    family: 'input',
    tags: ['stepper', 'counter', 'hold-to-accelerate', 'batch', 'tactile'],
    description: 'Incremental value controller with hold-to-accelerate velocity curve, continuous auditory click bursts, and digital drum readout.',
    mood: 'Fast, precise, and tactile',
    visualStyle: 'Compact tactile button pair flanking a recessed digital readout',
    motionStyle: 'Exponential acceleration loop (speed decays from 200ms to 40ms)',
    interactionStyle: 'Single click or sustained press-and-hold to accelerate',
    lightingStyle: 'Subtle button press down-lighting and cyan numerical glow',
    soundStyle: 'Rapid machine gun micro-clicks during continuous acceleration',
    hapticStyle: 'Synchronized micro-haptic burst for every increment',
    states: ['idle', 'incrementing', 'accelerating', 'clamped'],
    responsiveBehavior: 'Compact inline placement',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react'],
    sourceInspiration: 'High-speed laboratory pipettes and currency counter machines',
    license: 'MIT',
    codeArtifact: `<InteractiveStepper
  value={batchCount}
  min={1}
  max={100}
  onChange={setBatchCount}
  label="Batch Compilation Replicas"
/>`,
    aiSpecification: `SPECIFICATION: InteractiveStepper
- Type: Numeric Incrementer
- Feature: Progressive hold-to-accelerate timer decay with auto-clamping at min/max limits`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'control-drag-confirm',
    name: 'Tactile Drag-to-Confirm Slider',
    component: 'InteractiveDragToConfirm',
    family: 'action',
    tags: ['drag-to-confirm', 'slider', 'confirmation', 'safety', 'spring'],
    description: 'High-friction confirmation slider preventing accidental critical operations. Features magnetic track latching, completion threshold, and spring rebound if abandoned.',
    mood: 'Secure and deliberate',
    visualStyle: 'Long safety track with highlighted shimmering guidance label and tactile thumb handle',
    motionStyle: 'Framer Motion horizontal drag constraint with spring snap-back physics',
    interactionStyle: '85% travel threshold drag-to-execute gesture',
    lightingStyle: 'Emerald safety transition bloom upon successful execution',
    soundStyle: 'Heavy success confirmation chime and magnetic latch sound',
    hapticStyle: 'Success confirmation haptic burst',
    states: ['idle', 'dragging', 'threshold-met', 'confirmed'],
    responsiveBehavior: 'Full-width horizontal containment (max-w-sm)',
    accessibility: 'AA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Emergency power-down levers and banking wire transfer confirmation bars',
    license: 'MIT',
    codeArtifact: `<InteractiveDragToConfirm
  label="Slide to Deploy Production Release"
  confirmedLabel="Release v3.4 Deployed"
  onConfirm={() => deployRelease()}
/>`,
    aiSpecification: `SPECIFICATION: InteractiveDragToConfirm
- Type: Critical Action Trigger
- Threshold: 85% track travel required; returns to 0 on release if below threshold`,
    version: '2.0.0',
    status: 'stable',
  },
  {
    id: 'control-slide-unlock',
    name: 'Cinematic Slide-to-Unlock',
    component: 'InteractiveSlideToUnlock',
    family: 'action',
    tags: ['slide-to-unlock', 'unlock', 'ios', 'shimmer', 'cinematic'],
    description: 'Iconic directional gesture track with shimmering linear gradient typography, directional velocity verification, and authentic unlock latching.',
    mood: 'Cinematic and satisfying',
    visualStyle: 'Capsule track with sweeping linear gradient shimmer text and circular sliding knob',
    motionStyle: 'Constrained horizontal spring physics with directional drag',
    interactionStyle: 'Linear slide across track to unlock interface state',
    lightingStyle: 'Luminous cyan terminal glow and unlocked status bloom',
    soundStyle: 'Satisfying mechanical tumbler unlock sound',
    hapticStyle: 'Success haptic pulse upon lock disengagement',
    states: ['locked', 'sliding', 'unlocked', 'relocking'],
    responsiveBehavior: 'Touch-friendly capsule layout (max-w-sm)',
    accessibility: 'AA',
    performanceTier: 'ultra-fast',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Classic iOS lock screen and secure biometric terminal interlocks',
    license: 'MIT',
    codeArtifact: `<InteractiveSlideToUnlock
  label="Slide to Unlock Terminal"
  onUnlock={() => setUnlocked(true)}
/>`,
    aiSpecification: `SPECIFICATION: InteractiveSlideToUnlock
- Type: Interface Unlock Mechanism
- Motion: Physics-based swipe with auto-relock capability and tactile audio feedback`,
    version: '2.0.0',
    status: 'stable',
  },
];
