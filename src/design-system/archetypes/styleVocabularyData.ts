/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DesignArchetype } from '../../types/architecture';

export interface StyleColorToken {
  name: string;
  hex: string;
  role: string;
  contrastRatio: string;
  cssVar: string;
}

export interface StyleVocabularyEntry {
  id: DesignArchetype;
  name: string;
  family: string;
  subtitle: string;
  mood: string;
  designIntent: string;
  materials: string[];
  colorsTokens: StyleColorToken[];
  typographyTendency: {
    titleFont: string;
    bodyFont: string;
    scale: string;
    tracking: string;
    caseRule: string;
    description: string;
  };
  lighting: {
    ambientGlow: string;
    specularEdge: string;
    shadowType: string;
    blurDepth: string;
    description: string;
  };
  motionTendency: {
    physicsProfile: string;
    springParams: string;
    duration: string;
    easing: string;
    description: string;
  };
  interactionTendency: {
    pressFeedback: string;
    cursorEffect: string;
    hoverTransform: string;
    activeState: string;
    description: string;
  };
  soundTendency: {
    toneType: string;
    frequency: string;
    waveform: string;
    description: string;
  };
  hapticTendency: {
    patternName: string;
    vibrationMs: string;
    description: string;
  };
  bestComponentFits: {
    name: string;
    rationale: string;
  }[];
  poorFitWarnings: {
    context: string;
    warningText: string;
    severity: 'critical' | 'high' | 'medium';
  }[];
}

export const MASTER_STYLE_VOCABULARY: Record<DesignArchetype, StyleVocabularyEntry> = {
  'restrained-luxury': {
    id: 'restrained-luxury',
    name: 'Restrained Luxury',
    family: 'luxury',
    subtitle: 'High-Net-Worth Obsidian & 24K Gold Elegance',
    mood: 'Refined, exclusive, quiet confidence, surgical restraint, timeless authority.',
    designIntent:
      'Designed for high-tier financial portals, executive vaults, bespoke luxury catalogs, and high-net-worth authentication surfaces. Prioritizes quiet elegance through generous negative space, warm obsidian tones, and delicate 24K gold foil hairline borders.',
    materials: ['Obsidian Matte Velvet', 'Brushed 24K Gold Alloy', 'Smoked Quartz Glass', 'Deep Charcoal Satin'],
    colorsTokens: [
      { name: 'Canvas Black', hex: '#0A0A0B', role: 'Primary Background Canvas', contrastRatio: '21:1', cssVar: '--color-luxury-bg' },
      { name: 'Obsidian Slate', hex: '#121215', role: 'Surface Primary Glass', contrastRatio: '18.4:1', cssVar: '--color-luxury-surface' },
      { name: '24K Gold Foil', hex: '#D4AF37', role: 'Primary Accent & Borders', contrastRatio: '9.2:1', cssVar: '--color-luxury-gold' },
      { name: 'Champagne Warm White', hex: '#F4F4F6', role: 'Primary Title Copy', contrastRatio: '17.8:1', cssVar: '--color-luxury-text' },
      { name: 'Muted Bronze', hex: '#A1A1AA', role: 'Secondary Label Text', contrastRatio: '7.4:1', cssVar: '--color-luxury-muted' },
    ],
    typographyTendency: {
      titleFont: 'Playfair Display / Serif',
      bodyFont: 'Plus Jakarta Sans',
      scale: 'Perfect Fourth (1.333) High Contrast',
      tracking: 'Expanded +0.05em for headlines, relaxed tracking for labels',
      caseRule: 'Uppercase for secondary eyebrows and badges',
      description: 'Pairs high-contrast editorial serifs for headings with ultra-legible geometric sans for body inputs and data values.',
    },
    lighting: {
      ambientGlow: 'Subtle 24K gold radial halo (shadow-[0_0_30px_rgba(212,175,55,0.15)])',
      specularEdge: '1px continuous gold border hairline (border-[#D4AF37]/30)',
      shadowType: 'Deep multi-stop obsidian shadow (shadow-2xl)',
      blurDepth: 'Backdrop blur 24px (backdrop-blur-xl)',
      description: 'Controlled specular highlights along top container edges without aggressive glowing neon effects.',
    },
    motionTendency: {
      physicsProfile: 'Heavy Dampened Spring (Stiffness: 220, Damping: 28)',
      springParams: 'Smooth deceleration with zero overshoot bounce',
      duration: '400ms smooth transition',
      easing: 'cubic-bezier(0.16, 1, 0.3, 1) ease-out-quint',
      description: 'Deliberate, regal transitions that feel weighty and expensive rather than playful or springy.',
    },
    interactionTendency: {
      pressFeedback: 'Soft 2px downward compression (scale: 0.98)',
      cursorEffect: 'Gentle golden border illumination on hover',
      hoverTransform: 'y-axis lift (-2px) with gold border opacity boost',
      activeState: 'Solid gold accent glow outline with golden focus ring',
      description: 'Micro-interactions respond with weighted tactile resistance and golden edge glow.',
    },
    soundTendency: {
      toneType: 'Crystal Sine Chime & Velvet Resonance',
      frequency: 'C5 (523.25 Hz) to G5 (783.99 Hz) soft triad',
      waveform: 'Pure Sine Wave with 120ms exponential decay',
      description: 'Ethereal, warm acoustic glass chime that provides understated tactile affirmation.',
    },
    hapticTendency: {
      patternName: 'Soft Velvet Tap',
      vibrationMs: '[12ms, 30ms, 18ms]',
      description: 'Subtle low-frequency pulse simulating a soft mechanical latch.',
    },
    bestComponentFits: [
      { name: 'Executive Vault Auth', rationale: 'Creates immediate confidence for high-security, high-wealth user logins.' },
      { name: 'Portfolio Valuation Card', rationale: 'Highlights major asset figures with serif prestige and gold accents.' },
      { name: 'Private Concierge Navigation', rationale: 'Understated dock layout with smooth gold indicator highlights.' },
    ],
    poorFitWarnings: [
      { context: 'High-Density Tabular Logs', warningText: 'Serif headings and spacious margins degrade scanning speed for thousands of log lines.', severity: 'critical' },
      { context: 'Gaming HUD / Esports', warningText: 'Golden luxury aesthetics clash with high-speed neon cyber environments.', severity: 'high' },
      { context: 'Playful Kids Companion', warningText: 'Too solemn and formal for informal or youth-oriented gamified flows.', severity: 'medium' },
    ],
  },

  'cinematic-dark': {
    id: 'cinematic-dark',
    name: 'Cinematic Dark',
    family: 'cinematic',
    subtitle: 'Deep Slate, Cyan Luminescence & Glass Depth',
    mood: 'Atmospheric, immersive, futuristic, pristine clarity, high production value.',
    designIntent:
      'Designed for media streaming dashboards, AI studio consoles, real-time analytics platforms, and immersive product showcases. Uses deep slate background layers, cyan rim light highlights, and multi-layered backdrop blur surfaces.',
    materials: ['Deep Slate Polymer', 'Anodized Cyan Metal', 'High-Refraction Smoked Glass', 'Luminescent Mesh'],
    colorsTokens: [
      { name: 'Midnight Canvas', hex: '#050508', role: 'Deep Void Background', contrastRatio: '21:1', cssVar: '--color-cinematic-bg' },
      { name: 'Slate Glass Surface', hex: '#0D0E15', role: 'Primary Card Container', contrastRatio: '19.2:1', cssVar: '--color-cinematic-surface' },
      { name: 'Cyan Luminescence', hex: '#38BDF8', role: 'Primary Accent & Focus', contrastRatio: '11.5:1', cssVar: '--color-cinematic-cyan' },
      { name: 'Pure White', hex: '#FFFFFF', role: 'Title & Value Typography', contrastRatio: '21:1', cssVar: '--color-cinematic-text' },
      { name: 'Cool Slate Gray', hex: '#94A3B8', role: 'Body Copy & Subtitles', contrastRatio: '8.2:1', cssVar: '--color-cinematic-muted' },
    ],
    typographyTendency: {
      titleFont: 'Outfit / Sans-Serif Display',
      bodyFont: 'Inter / Plus Jakarta Sans',
      scale: 'Major Third (1.25) Balanced Scale',
      tracking: 'Tight -0.02em for large display numbers and titles',
      caseRule: 'Sentence case titles, monospace uppercase badges',
      description: 'Modern geometric sans display with high x-height for maximum clarity on dark background layers.',
    },
    lighting: {
      ambientGlow: 'Volumetric cyan drop shadow (shadow-[0_0_40px_rgba(56,189,248,0.25)])',
      specularEdge: '1px gradient top highlight (from-transparent via-cyan-400/50 to-transparent)',
      shadowType: 'Deep multi-layer elevation shadow',
      blurDepth: 'Backdrop blur 32px (backdrop-blur-2xl)',
      description: 'Cinematic rim light reflections along top borders give cards three-dimensional depth on deep dark backdrops.',
    },
    motionTendency: {
      physicsProfile: 'Fluid Spring (Stiffness: 300, Damping: 24)',
      springParams: 'Responsive spring physics with subtle natural bounce',
      duration: '300ms fluid transition',
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      description: 'Smooth, responsive spatial motion that reflects modern OS desktop window management.',
    },
    interactionTendency: {
      pressFeedback: 'Spring press down (scale: 0.98) with cyan ripple glow',
      cursorEffect: 'Specular edge highlight activates on cursor focus',
      hoverTransform: 'Elevate -4px with cyan ambient glow shadow bloom',
      activeState: 'Cyan outline ring with active status pulse badge',
      description: 'Controls respond with dynamic cyan glow pulses and fluid spring compression.',
    },
    soundTendency: {
      toneType: 'Warm Pulse Oscillator',
      frequency: '440 Hz Sine Wave with subtle reverb tail',
      waveform: 'Sine wave with smooth attack envelope',
      description: 'Clean sonic tick that confirms button activations without acoustic clutter.',
    },
    hapticTendency: {
      patternName: 'Precision Click',
      vibrationMs: '[15ms]',
      description: 'Sharp 15ms single pulse providing crisp tactile confirmation.',
    },
    bestComponentFits: [
      { name: 'AI Studio Companion Card', rationale: 'Cinematic cyan luminescence frames generative AI outputs perfectly.' },
      { name: 'Analytics Telemetry Dashboard', rationale: 'High contrast white data metrics pop cleanly against deep slate surfaces.' },
      { name: 'Media Transport Controller', rationale: 'Refractive glass controls feel native in dark viewing environments.' },
    ],
    poorFitWarnings: [
      { context: 'Printed Document Preview', warningText: 'Dark theme backdrop masks print page boundaries and ink density previews.', severity: 'high' },
      { context: 'Bright Outdoor Mobile App', warningText: 'Requires maximum device screen brightness to maintain contrast outdoors.', severity: 'medium' },
      { context: 'Monochrome High-Readability Portal', warningText: 'Cyan glow reflections add unnecessary visual noise for plain text readers.', severity: 'medium' },
    ],
  },

  'futuristic-cyber': {
    id: 'futuristic-cyber',
    name: 'Futuristic Cyber HUD',
    family: 'cyber',
    subtitle: 'Tactical Monospace, Corner Brackets & Cyan Scanlines',
    mood: 'Tactical, high-tech, raw telemetry, military precision, cybernetic.',
    designIntent:
      'Designed for developer tooling, security command centers, server telemetry monitors, and cyberpunk game interfaces. Features notched corner bracket frames, monospace code typography, scanline overlays, and high-frequency telemetry counters.',
    materials: ['Carbon Composite Frame', 'Phosphor Glass Panel', 'Anodized Metallic Notch', 'Laser Cyan Filament'],
    colorsTokens: [
      { name: 'Void Black', hex: '#020617', role: 'Deep Command Canvas', contrastRatio: '21:1', cssVar: '--color-cyber-bg' },
      { name: 'HUD Terminal Surface', hex: '#090D16', role: 'Notched Card Panel', contrastRatio: '19.5:1', cssVar: '--color-cyber-surface' },
      { name: 'Laser Cyan', hex: '#06B6D4', role: 'Primary Telemetry & Wireframe', contrastRatio: '10.8:1', cssVar: '--color-cyber-cyan' },
      { name: 'Terminal Text Cyan', hex: '#22D3EE', role: 'Primary Monospace Data', contrastRatio: '12.4:1', cssVar: '--color-cyber-text' },
      { name: 'Slate Wireframe', hex: '#64748B', role: 'Grid Dividers & Brackets', contrastRatio: '6.5:1', cssVar: '--color-cyber-muted' },
    ],
    typographyTendency: {
      titleFont: 'Share Tech Mono / Monospace',
      bodyFont: 'JetBrains Mono / Fira Code',
      scale: 'Minor Second (1.125) Compact Telemetry',
      tracking: 'Tracking-wider (+0.08em) for code labels',
      caseRule: 'Strict ALL-CAPS for all field labels and status readouts',
      description: '100% Monospace typography enforcing column alignment, strict grid spacing, and raw terminal readouts.',
    },
    lighting: {
      ambientGlow: 'High-intensity cyan glow (shadow-[0_0_25px_rgba(6,182,212,0.4)])',
      specularEdge: 'Corner bracket notches with 1px laser wireframe line',
      shadowType: 'Sharp zero-blur hard offset shadow',
      blurDepth: 'Minimal blur with sharp CRT scanline grid filter',
      description: 'Sharp laser lines, corner bracket ticks, and subtle horizontal CRT scanlines.',
    },
    motionTendency: {
      physicsProfile: 'Instantaneous Snap (Zero Delay, 120ms Duration)',
      springParams: 'High stiffness (600), zero damping overshoot',
      duration: '100ms ultra-fast snap',
      easing: 'steps(4, jump-end) / linear snap',
      description: 'Digitized, stepped snap animations mimicking military radar sweeps and tactical HUD readouts.',
    },
    interactionTendency: {
      pressFeedback: 'Instant frame color inversion with glitch pulse',
      cursorEffect: 'Crosshair reticle locks onto button bounding box',
      hoverTransform: 'Corner bracket scale outward (+2px notch offset)',
      activeState: 'Rapid 100ms cyan glitch flash with double border',
      description: 'Controls feel like military switchgear and tactical terminal keys with instant visual feedback.',
    },
    soundTendency: {
      toneType: 'Digitized Square Wave Beep',
      frequency: '880 Hz (A5) Square Wave burst (20ms)',
      waveform: 'Square Wave with zero attack/decay',
      description: 'High-frequency digital bleep confirming command buffer input.',
    },
    hapticTendency: {
      patternName: 'Tactical Burst',
      vibrationMs: '[20ms, 10ms, 20ms]',
      description: 'Sharp double click simulating military trigger reset.',
    },
    bestComponentFits: [
      { name: 'Cyber HUD Card', rationale: 'Corner bracket notches and monospace code outputs are native to cyber HUD style.' },
      { name: 'Server Telemetry Monitor', rationale: 'Compact grid layout displays CPU, Memory, and Latency readouts clearly.' },
      { name: 'Node Graph Inspector', rationale: 'Laser wireframe lines connect data nodes logically.' },
    ],
    poorFitWarnings: [
      { context: 'E-commerce Fashion Boutique', warningText: 'Monospace all-caps readouts destroy soft luxury apparel storytelling.', severity: 'critical' },
      { context: 'Healthcare Patient Records', warningText: 'Glitch pulses and tactical scanlines induce anxiety for medical patients.', severity: 'critical' },
      { context: 'Childrens Educational App', warningText: 'Monospace density is difficult for early readers to process.', severity: 'high' },
    ],
  },

  'scientific-lab': {
    id: 'scientific-lab',
    name: 'Scientific Laboratory',
    family: 'clinical',
    subtitle: 'Sterile Slate, Medical Cobalt & High-Legibility Grid',
    mood: 'Sterile, precise, objective, trustworthy, clinical clarity.',
    designIntent:
      'Designed for medical diagnostics, lab instrument controllers, academic research tools, and enterprise data analysis. Uses sterile off-white canvas surfaces, crisp slate borders, cobalt blue focal accents, and high-contrast typography.',
    materials: ['Polished Lab Quartz', 'Medical Slate Polymer', 'Coated Anodized Aluminum', 'Clean Glass Slide'],
    colorsTokens: [
      { name: 'Sterile Canvas', hex: '#F8FAFC', role: 'Clean Laboratory Background', contrastRatio: '19.8:1', cssVar: '--color-lab-bg' },
      { name: 'Pure Quartz Surface', hex: '#FFFFFF', role: 'Primary Instrument Card', contrastRatio: '21:1', cssVar: '--color-lab-surface' },
      { name: 'Medical Cobalt', hex: '#2563EB', role: 'Primary Action & Focus', contrastRatio: '8.6:1', cssVar: '--color-lab-blue' },
      { name: 'Deep Slate Copy', hex: '#0F172A', role: 'Primary Technical Text', contrastRatio: '18.9:1', cssVar: '--color-lab-text' },
      { name: 'Muted Slate Gray', hex: '#64748B', role: 'Unit Labels & Grid Subtitles', contrastRatio: '7.1:1', cssVar: '--color-lab-muted' },
    ],
    typographyTendency: {
      titleFont: 'Inter / Plus Jakarta Sans',
      bodyFont: 'Inter / IBM Plex Mono for units',
      scale: 'Major Second (1.125) Dense Precision Scale',
      tracking: 'Normal tracking with strict vertical alignment grid',
      caseRule: 'Standard sentence case with SI unit annotations (e.g. mmol/L, ms)',
      description: 'Maximum legibility typography with explicit SI unit tags, numeric tabular lining, and zero decorative ornaments.',
    },
    lighting: {
      ambientGlow: 'Subtle cobalt drop shadow (shadow-[0_0_15px_rgba(37,99,235,0.1)])',
      specularEdge: '1px clean slate border (border-slate-300)',
      shadowType: 'Soft 2px elevation drop shadow (shadow-sm)',
      blurDepth: 'Zero blur; uses crisp opacity and solid white surfaces',
      description: 'High light-mode contrast with clean 1px slate divider borders and zero specular glare.',
    },
    motionTendency: {
      physicsProfile: 'Linear Precision Transition (180ms Duration)',
      springParams: 'Crisp linear dampening with zero bounce',
      duration: '180ms linear ease',
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
      description: 'Instant, clinical transitions that communicate accurate measurement and zero latency.',
    },
    interactionTendency: {
      pressFeedback: 'Micro 1px depression with cobalt highlight ring',
      cursorEffect: 'Cobalt border outline highlights target input cell',
      hoverTransform: 'Border color shifts to cobalt blue (border-blue-600)',
      activeState: 'Solid cobalt focus indicator with 2px ring offset',
      description: 'Input fields and switches respond with clear, high-contrast outline state changes.',
    },
    soundTendency: {
      toneType: 'Laboratory Meter Beep',
      frequency: '600 Hz Sine Wave (15ms micro beep)',
      waveform: 'Pure Sine Wave with clean gate',
      description: 'Soft lab instrument ping acknowledging diagnostic input.',
    },
    hapticTendency: {
      patternName: 'Meter Tick',
      vibrationMs: '[10ms]',
      description: 'Ultralight 10ms click simulating laboratory dial tick.',
    },
    bestComponentFits: [
      { name: 'Medical Lab Sample Inspector', rationale: 'Sterile white surfaces display patient metrics and assay readouts safely.' },
      { name: 'Scientific Data Chart', rationale: 'High contrast grid lines make multi-line data plotting precise.' },
      { name: 'Diagnostic Form Controls', rationale: 'Clear input boundaries eliminate data entry errors.' },
    ],
    poorFitWarnings: [
      { context: 'Late-Night Cinema Streaming App', warningText: 'Bright white canvas causes intense glare in dark home theaters.', severity: 'critical' },
      { context: 'Luxury Casino Game', warningText: 'Sterile clinical aesthetic removes excitement and entertainment atmosphere.', severity: 'critical' },
      { context: 'Ambient Mindfulness Meditation', warningText: 'Feels like a hospital room rather than a relaxed personal space.', severity: 'high' },
    ],
  },

  'neumorphic-glass': {
    id: 'neumorphic-glass',
    name: 'Neumorphic Glass',
    family: 'glass',
    subtitle: 'Refractive Frost, Soft Translucency & Purple Gradient',
    mood: 'Tactile, dreamy, futuristic, soft touch, ambient glow.',
    designIntent:
      'Designed for modern creative suites, audio synthesis controllers, ambient soundscapes, and translucent OS interfaces. Blends soft neumorphic extruded surfaces with frosted refractive backdrop blur and purple/indigo gradient ambient glow.',
    materials: ['Frosted Acrylic Glass', 'Refractive Liquid Lens', 'Soft Violet Polymer', 'Translucent Mesh'],
    colorsTokens: [
      { name: 'Indigo Gradient Void', hex: '#1E1B4B', role: 'Gradient Canvas Mesh', contrastRatio: '18.5:1', cssVar: '--color-glass-bg' },
      { name: 'Frosted Glass Surface', hex: 'rgba(255,255,255,0.10)', role: 'Translucent Card Body', contrastRatio: '15.2:1', cssVar: '--color-glass-surface' },
      { name: 'Refractive Purple', hex: '#A855F7', role: 'Accent Glow & Focal Points', contrastRatio: '9.4:1', cssVar: '--color-glass-purple' },
      { name: 'Pure White Text', hex: '#FFFFFF', role: 'Primary Typography', contrastRatio: '21:1', cssVar: '--color-glass-text' },
      { name: 'Translucent White', hex: 'rgba(255,255,255,0.70)', role: 'Secondary Label Text', contrastRatio: '11.8:1', cssVar: '--color-glass-muted' },
    ],
    typographyTendency: {
      titleFont: 'Outfit / Plus Jakarta Sans',
      bodyFont: 'Inter / System Sans',
      scale: 'Major Third (1.25) Smooth Scale',
      tracking: 'Normal tracking with soft rounded letterforms',
      caseRule: 'Mixed sentence case with rounded pill badges',
      description: 'Soft geometric typography with generous internal padding and smooth line heights.',
    },
    lighting: {
      ambientGlow: 'Refractive purple drop shadow (shadow-[0_8px_32px_0_rgba(0,0,0,0.37)])',
      specularEdge: '1px continuous frosted white border (border-white/20)',
      shadowType: 'Dual inner specular shadow and outer ambient blur shadow',
      blurDepth: 'Backdrop blur 24px (backdrop-blur-2xl) saturate-180',
      description: 'Simulates light passing through frosted glass lenses with soft extruded shadow depth.',
    },
    motionTendency: {
      physicsProfile: 'Bouncy Spring (Stiffness: 280, Damping: 18)',
      springParams: 'Playful spring physics with soft bounce overshoot',
      duration: '350ms spring response',
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      description: 'Soft, elastic spring motion that makes glass elements feel tangible and tactile.',
    },
    interactionTendency: {
      pressFeedback: 'Soft pill compression (scale: 0.96) with glass refraction bloom',
      cursorEffect: 'Cursor triggers interactive light lens glare across glass surface',
      hoverTransform: 'Elevate +6px with purple ambient radial glow expansion',
      activeState: 'Purple glowing border with white specular highlight ring',
      description: 'Pill controls and cards depress like soft rubbery glass buttons.',
    },
    soundTendency: {
      toneType: 'Soft Polyphonic Chime',
      frequency: 'E5 (659.25 Hz) Soft Sine Triad',
      waveform: 'Sine Wave with 200ms gentle exponential decay',
      description: 'Lush, ambient glass chime that provides soft acoustic feedback.',
    },
    hapticTendency: {
      patternName: 'Liquid Ripple',
      vibrationMs: '[15ms, 40ms, 25ms]',
      description: 'Smooth triple pulse mimicking a water drop ripple.',
    },
    bestComponentFits: [
      { name: 'Audio Synthesizer Deck', rationale: 'Frosted glass dials and sliders feel tactile and organic for music creation.' },
      { name: 'Ambient Weather Widget', rationale: 'Translucent glass blends seamlessly over dynamic sky video backgrounds.' },
      { name: 'Creative Studio Palette', rationale: 'Soft neumorphic buttons provide pleasant tactile satisfaction.' },
    ],
    poorFitWarnings: [
      { context: 'Legacy Browser / Low-GPU Devices', warningText: 'Heavy backdrop-blur filters cause severe FPS drops on integrated GPUs.', severity: 'critical' },
      { context: 'Strict WCAG AAA High Contrast Mode', warningText: 'Translucent backgrounds fail strict 7:1 contrast on complex backgrounds.', severity: 'high' },
      { context: 'Fast Financial Order Book', warningText: 'Soft bouncy springs delay fast multi-trade keyboard triggers.', severity: 'high' },
    ],
  },

  'mechanical-tactile': {
    id: 'mechanical-tactile',
    name: 'Mechanical Tactile',
    family: 'industrial',
    subtitle: 'Industrial Switchgear, Beveled Edge & Amber Phosphor',
    mood: 'Industrial, heavy-duty, tactile, mechanical, rugged.',
    designIntent:
      'Designed for industrial IoT dashboards, flight control panels, physical hardware simulators, and heavy Machinery controllers. Features extruded 3D bevel borders, mechanical keycap switches, amber LED indicators, and heavy click acoustics.',
    materials: ['Cast Iron Zinc', 'Anodized Amber Switch', 'Heavy Rubber Keycap', 'Milled Steel Frame'],
    colorsTokens: [
      { name: 'Heavy Industrial Zinc', hex: '#18181B', role: 'Machine Chassis Base', contrastRatio: '21:1', cssVar: '--color-[#18181B]' },
      { name: 'Beveled Keycap Surface', hex: '#27272A', role: 'Raised Switch Body', contrastRatio: '18.2:1', cssVar: '--color-mech-surface' },
      { name: 'Amber Indicator LED', hex: '#F59E0B', role: 'Active Switch & Status LED', contrastRatio: '9.8:1', cssVar: '--color-mech-amber' },
      { name: 'Chassis White Text', hex: '#F4F4F5', role: 'Engraved Label Copy', contrastRatio: '18.5:1', cssVar: '--color-mech-text' },
      { name: 'Machine Gray Labels', hex: '#A1A1AA', role: 'Secondary Engravings', contrastRatio: '7.8:1', cssVar: '--color-mech-muted' },
    ],
    typographyTendency: {
      titleFont: 'Chakra Petch / Rajdhani / Monospace',
      bodyFont: 'JetBrains Mono / Inter',
      scale: 'Major Second (1.125) Industrial Label Scale',
      tracking: 'Expanded +0.06em for engraved panel labels',
      caseRule: 'Strict ALL-CAPS for switch labels and status toggles',
      description: 'Heavy, blocky industrial typography styled like laser-engraved machine control panels.',
    },
    lighting: {
      ambientGlow: 'Amber LED point glow (shadow-[0_0_20px_rgba(245,158,11,0.3)])',
      specularEdge: 'Top-left white specular border, bottom-right dark shadow border',
      shadowType: 'Deep 3D inset/outset keycap shadow (shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.5)])',
      blurDepth: 'Zero blur; uses solid metallic textures and physical bevel lines',
      description: 'Physical light source casting highlight lines on top switch edges and dark drop shadows underneath.',
    },
    motionTendency: {
      physicsProfile: 'Heavy Mechanical Snap (Stiffness: 500, Damping: 35)',
      springParams: 'Immediate mechanical travel with zero spring rebound',
      duration: '120ms physical travel',
      easing: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
      description: 'Simulates physical keycap switch travel with a distinct click down and spring pushback.',
    },
    interactionTendency: {
      pressFeedback: 'Physical 3px inward depression into chassis (translate-y-1)',
      cursorEffect: 'Highlight on keycap top surface',
      hoverTransform: 'Keycap elevates +2px with amber LED standby glow',
      activeState: 'Switch toggles down with bright amber LED indicator light',
      description: 'Buttons visually depress into the metallic panel with mechanical tactile travel.',
    },
    soundTendency: {
      toneType: 'Mechanical Key Switch Click',
      frequency: '320 Hz Sub-Bass Thud + 2400 Hz Plastic Snap',
      waveform: 'Dual Impulse Square/Triangle Wave burst (25ms)',
      description: 'Heavy mechanical Cherry MX Blue switch click on downpress and release.',
    },
    hapticTendency: {
      patternName: 'Mechanical Switch Bump',
      vibrationMs: '[25ms, 10ms, 25ms]',
      description: 'Heavy double pulse simulating physical switch actuation and release bump.',
    },
    bestComponentFits: [
      { name: 'Industrial Emergency Stop Toggle', rationale: 'Heavy 3D keycaps prevent accidental clicks and convey physical weight.' },
      { name: 'Hardware Synthesizer Deck', rationale: 'Amber LEDs and physical switch toggles mirror analog music gear.' },
      { name: 'Power Grid Telemetry Controller', rationale: 'Physical switches give operators unmistakable confirmation.' },
    ],
    poorFitWarnings: [
      { context: 'Fluid Mobile News Reader', warningText: 'Heavy 3D keycaps clutter smooth vertical article scrolling flows.', severity: 'high' },
      { context: 'Minimalist Fashion Portfolio', warningText: 'Industrial cast iron aesthetics destroy clean photography showcases.', severity: 'critical' },
      { context: 'Soft Health Tracker', warningText: 'Rough industrial switches feel aggressive for personal wellness logging.', severity: 'medium' },
    ],
  },

  'brutalist-grid': {
    id: 'brutalist-grid',
    name: 'Brutalist Grid',
    family: 'brutalist',
    subtitle: 'Raw High-Density Monospace, Crimson Accent & Thick Black Borders',
    mood: 'Unfiltered, raw, high-density, provocative, unapologetic.',
    designIntent:
      'Designed for raw developer logs, avant-garde design archives, high-frequency trading terminals, and brutalist web art. Strips away soft shadows and gradients in favor of thick continuous 2px/3px black border grids, high-density monospace columns, and crimson focal accents.',
    materials: ['Uncoated Raw Paper', 'Solid Black Ink Frame', 'Crimson Vinyl Filament', 'Raw Canvas Slate'],
    colorsTokens: [
      { name: 'Raw Paper White', hex: '#FAFAFA', role: 'Uncoated High-Contrast Background', contrastRatio: '21:1', cssVar: '--color-brutalist-bg' },
      { name: 'Solid White Card', hex: '#FFFFFF', role: 'Primary Grid Panel', contrastRatio: '21:1', cssVar: '--color-brutalist-surface' },
      { name: 'Crimson Red Accent', hex: '#EF4444', role: 'Primary Focus & Alert Highlight', contrastRatio: '7.8:1', cssVar: '--color-brutalist-red' },
      { name: 'Solid Black Ink', hex: '#000000', role: 'Border Frame & Primary Copy', contrastRatio: '21:1', cssVar: '--color-brutalist-black' },
      { name: 'Dark Charcoal Muted', hex: '#52525B', role: 'Secondary Telemetry Notes', contrastRatio: '8.4:1', cssVar: '--color-brutalist-muted' },
    ],
    typographyTendency: {
      titleFont: 'Space Grotesk / JetBrains Mono',
      bodyFont: 'JetBrains Mono / Fira Code',
      scale: 'Major Second (1.125) Ultra-Dense Grid',
      tracking: 'Strict zero tracking with explicit character alignment',
      caseRule: 'Strict ALL-CAPS or raw unformatted code syntax',
      description: 'Raw monospace typography with zero decorative padding, tight line heights, and explicit section numbering (01, 02, 03).',
    },
    lighting: {
      ambientGlow: 'Zero ambient glow; raw high-contrast solid fill',
      specularEdge: 'Continuous 2px/3px solid black border (border-2 border-black)',
      shadowType: 'Hard offset 4px solid black shadow (shadow-[4px_4px_0px_0px_#000000])',
      blurDepth: 'Zero blur; 100% solid opacity throughout',
      description: 'Hard zero-blur offset block shadows and thick black ink outline borders.',
    },
    motionTendency: {
      physicsProfile: 'Zero-Delay Instant Shift (0ms Duration)',
      springParams: 'No animation transitions; immediate step state shift',
      duration: '0ms instant toggle',
      easing: 'steps(1, start)',
      description: 'Raw, unbuffered state shifts that change immediately on user action without smooth easing.',
    },
    interactionTendency: {
      pressFeedback: 'Hard 4px shadow collapse (translate-x-1 translate-y-1)',
      cursorEffect: 'Invert black/white canvas colors instantly on cursor focus',
      hoverTransform: 'Shadow expands from 4px to 6px offset with solid red background shift',
      activeState: 'Solid crimson red fill with thick black outline ring',
      description: 'Hard physical button displacement into the hard offset shadow layer.',
    },
    soundTendency: {
      toneType: 'Raw Square Wave Pop',
      frequency: '200 Hz Square Wave Impulse (10ms)',
      waveform: 'Raw Square Wave burst',
      description: 'Acoustic pop mimicking a typewriter key or mechanical punch card.',
    },
    hapticTendency: {
      patternName: 'Heavy Punch',
      vibrationMs: '[30ms]',
      description: 'Strong single pulse simulating a raw physical press.',
    },
    bestComponentFits: [
      { name: 'High-Density System Log Viewer', rationale: 'Thick black border grid maximizes screen space for thousands of raw log lines.' },
      { name: 'Raw Code Snippet Inspector', rationale: 'Monospace brutalist grid displays code syntax without distraction.' },
      { name: 'Avant-Garde Design Index', rationale: 'Hard black shadows give graphic art collections strong editorial presence.' },
    ],
    poorFitWarnings: [
      { context: 'Soft Wellness & Sleep App', warningText: 'Hard black offset shadows and crimson red fills induce visual stress.', severity: 'critical' },
      { context: 'Corporate Legal Document Vault', warningText: 'Raw brutalist grids appear unfinished to non-technical legal users.', severity: 'critical' },
      { context: 'Childrens Game Interface', warningText: 'Sharp black box corners feel harsh for young users.', severity: 'high' },
    ],
  },

  'editorial-serif': {
    id: 'editorial-serif',
    name: 'Editorial Serif',
    family: 'editorial',
    subtitle: 'Warm Archival Parchment, Burgundy Accent & Book Typography',
    mood: 'Intellectual, literary, warm, archival, thoughtful, narrative.',
    designIntent:
      'Designed for long-form publishing, research journals, historical archives, opinion essays, and literary publications. Uses warm parchment canvas backgrounds, deep charcoal text, burgundy wine accent lines, and generous literary margins.',
    materials: ['Warm Archival Parchment', 'Burgundy Leather Binding', 'Muted Copper Ink', 'Cotton Fiber Paper'],
    colorsTokens: [
      { name: 'Parchment Canvas', hex: '#FDFBF7', role: 'Warm Archival Background', contrastRatio: '19.4:1', cssVar: '--color-serif-bg' },
      { name: 'Cream Paper Surface', hex: '#F7F4EC', role: 'Primary Reader Container', contrastRatio: '18.1:1', cssVar: '--color-serif-surface' },
      { name: 'Burgundy Wine Accent', hex: '#881337', role: 'Primary Focal Line & Links', contrastRatio: '9.1:1', cssVar: '--color-serif-burgundy' },
      { name: 'Charcoal Ink Text', hex: '#1C1917', role: 'Primary Literary Body Copy', contrastRatio: '18.8:1', cssVar: '--color-serif-text' },
      { name: 'Muted Sepia Note', hex: '#78716C', role: 'Footnotes & Citation Labels', contrastRatio: '7.2:1', cssVar: '--color-serif-muted' },
    ],
    typographyTendency: {
      titleFont: 'Playfair Display / Lora / Merriweather',
      bodyFont: 'Georgia / Lora / Newsreader',
      scale: 'Perfect Fourth (1.333) Literary Hierarchy',
      tracking: 'Normal body tracking with generous line-height (1.75)',
      caseRule: 'Title case headings, italicized blockquotes, drop-cap lead paragraphs',
      description: 'Classic book typography optimized for continuous deep reading with maximum legibility and zero visual fatigue.',
    },
    lighting: {
      ambientGlow: 'Warm sepia ambient glow (shadow-[0_4px_20px_rgba(120,113,108,0.1)])',
      specularEdge: '1px delicate sepia border line (border-[#E7E5E4])',
      shadowType: 'Soft paper lift drop shadow',
      blurDepth: 'Zero glass blur; uses organic paper surfaces and subtle dividers',
      description: 'Natural ambient light reflecting off warm cotton paper surfaces.',
    },
    motionTendency: {
      physicsProfile: 'Gentle Page Turn (300ms Duration)',
      springParams: 'Soft dampening (Stiffness: 200, Damping: 26)',
      duration: '300ms smooth crossfade',
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      description: 'Smooth, literary transitions resembling the gentle turning of a book page.',
    },
    interactionTendency: {
      pressFeedback: 'Soft parchment compression with burgundy underline focus',
      cursorEffect: 'Text selection highlights with translucent sepia tint',
      hoverTransform: 'Subtle text color shift to burgundy red with 1px lift',
      activeState: 'Burgundy border highlight with serif footnote callout',
      description: 'Controls behave like subtle book footnotes and margin annotations.',
    },
    soundTendency: {
      toneType: 'Paper Page Turn Scratch',
      frequency: 'Soft Acoustic White Noise Burst (30ms)',
      waveform: 'Filtered Noise Burst with soft envelope',
      description: 'Subtle acoustic paper rustle confirming page turning or bookmarking.',
    },
    hapticTendency: {
      patternName: 'Paper Feather',
      vibrationMs: '[8ms, 15ms]',
      description: 'Ultralight feather pulse simulating paper contact.',
    },
    bestComponentFits: [
      { name: 'Long-Form Article Reader', rationale: 'Generous line height and Georgia body typography prevent reading eye strain.' },
      { name: 'Historical Archive Viewer', rationale: 'Warm parchment canvas presents vintage documents authentically.' },
      { name: 'Research Essay Collector', rationale: 'Burgundy citations and footnotes organize academic quotes.' },
    ],
    poorFitWarnings: [
      { context: 'Fast Real-Time Gaming HUD', warningText: 'Warm literary parchment and serif titles lack high-speed tactical urgency.', severity: 'critical' },
      { context: 'DevOps Server Telemetry', warningText: 'Serif fonts make dense code syntax and IP addresses harder to scan.', severity: 'critical' },
      { context: 'Neon Nightclub Event Ticket', warningText: 'Warm bookish parchment clashes with dark neon nightlife atmosphere.', severity: 'high' },
    ],
  },

  'minimal-monastic': {
    id: 'minimal-monastic',
    name: 'Minimal Monastic',
    family: 'minimalist',
    subtitle: 'Zen Graphite, Pure Negative Space & Unadorned Precision',
    mood: 'Zen, peaceful, distraction-free, contemplative, ultra-clean.',
    designIntent:
      'Designed for focused writing tools, mindfulness applications, minimalist code editors, and quiet productivity tools. Eliminates decorative borders, drop shadows, and complex color palettes in favor of maximum negative space, pure graphite typography, and subtle focus states.',
    materials: ['Monastic Slate Matte', 'Pure Graphite Linen', 'Smoothed Basalt Stone', 'Uncoated Mineral Felt'],
    colorsTokens: [
      { name: 'Quiet Graphite Void', hex: '#09090B', role: 'Distraction-Free Canvas', contrastRatio: '21:1', cssVar: '--color-zen-bg' },
      { name: 'Dark Basalt Surface', hex: '#18181B', role: 'Primary Minimal Container', contrastRatio: '18.9:1', cssVar: '--color-zen-surface' },
      { name: 'Monastic White Accent', hex: '#FAFAFA', role: 'Focus Highlight & Primary Copy', contrastRatio: '21:1', cssVar: '--color-zen-white' },
      { name: 'Muted Zinc Copy', hex: '#A1A1AA', role: 'Secondary Body Text', contrastRatio: '7.6:1', cssVar: '--color-zen-muted' },
      { name: 'Faint Slate Border', hex: '#27272A', role: 'Subtle Structural Divider', contrastRatio: '2.8:1', cssVar: '--color-zen-divider' },
    ],
    typographyTendency: {
      titleFont: 'Inter / Plus Jakarta Sans / System UI',
      bodyFont: 'Inter / System UI',
      scale: 'Major Second (1.125) Subtle Monastic Scale',
      tracking: 'Normal tracking with generous vertical margins',
      caseRule: 'Clean sentence case, zero loud uppercase badges',
      description: 'Ultra-clean, unadorned typography that prioritizes content clarity and calm reading focus.',
    },
    lighting: {
      ambientGlow: 'Zero ambient glow; pure flat negative space',
      specularEdge: 'Faint 1px zinc divider line (border-zinc-800)',
      shadowType: 'Zero drop shadow',
      blurDepth: 'Zero glass blur',
      description: 'Absolute flat surfaces with zero specular reflection, glowing halos, or decorative drop shadows.',
    },
    motionTendency: {
      physicsProfile: 'Whisper Fade (200ms Duration)',
      springParams: 'Gentle opacity crossfade with zero spatial translation',
      duration: '200ms soft fade',
      easing: 'ease-in-out',
      description: 'Subtle opacity fades that transition without drawing attention to animation effects.',
    },
    interactionTendency: {
      pressFeedback: 'Micro opacity pulse (0.80) with clean focus ring',
      cursorEffect: 'Faint border highlight on active element',
      hoverTransform: 'Text color brightens from zinc-400 to white with 0px shift',
      activeState: 'Solid white text focus indicator',
      description: 'Micro-interactions are quiet, instantaneous, and non-distracting.',
    },
    soundTendency: {
      toneType: 'Subtle Acoustic Tick',
      frequency: '500 Hz Low Sine Impulse (8ms)',
      waveform: 'Pure Sine Wave with ultra-fast decay',
      description: 'Barely audible acoustic tick providing subtle tactile feedback.',
    },
    hapticTendency: {
      patternName: 'Whisper Pulse',
      vibrationMs: '[8ms]',
      description: 'Ultralight 8ms pulse that gives quiet tactile confirmation.',
    },
    bestComponentFits: [
      { name: 'Distraction-Free Essay Draft Editor', rationale: 'Zero visual noise allows writers to focus on words.' },
      { name: 'Mindfulness Meditation Timer', rationale: 'Calm graphite background promotes relaxation.' },
      { name: 'Minimalist Todo Checklist', rationale: 'Clean list items focus purely on task text.' },
    ],
    poorFitWarnings: [
      { context: 'Esports Tournament Live Leaderboard', warningText: 'Monastic quietness fails to convey gaming excitement or rank urgency.', severity: 'critical' },
      { context: 'Complex Financial Trading Terminal', warningText: 'Absence of color status indicators obscures critical market fluctuations.', severity: 'critical' },
      { context: 'Interactive Childrens Game', warningText: 'Lack of playful colors and animations feels boring to kids.', severity: 'high' },
    ],
  },

  'biomorphic-organic': {
    id: 'biomorphic-organic',
    name: 'Biomorphic Organic',
    family: 'organic',
    subtitle: 'Canopy Emerald, Fluid Wave Curves & Botanical Harmony',
    mood: 'Organic, natural, harmonious, soothing, living flow.',
    designIntent:
      'Designed for environmental monitors, wellness apps, plant care platforms, and sustainability dashboards. Features smooth curved border radii (rounded-3xl), emerald canopy green accents, fluid wave animation paths, and natural acoustic feedback.',
    materials: ['Recycled Botanical Fiber', 'Canopy Emerald Glass', 'Living Moss Polymer', 'Polished River Stone'],
    colorsTokens: [
      { name: 'Deep Canopy Void', hex: '#022C22', role: 'Rich Forest Background', contrastRatio: '19.8:1', cssVar: '--color-bio-bg' },
      { name: 'Moss Emerald Surface', hex: '#064E3B', role: 'Primary Organic Container', contrastRatio: '16.5:1', cssVar: '--color-bio-surface' },
      { name: 'Vibrant Emerald Leaf', hex: '#10B981', role: 'Primary Focal Point & Badges', contrastRatio: '8.4:1', cssVar: '--color-bio-emerald' },
      { name: 'Fresh Cream Text', hex: '#ECFDF5', role: 'Primary Typography', contrastRatio: '18.2:1', cssVar: '--color-bio-text' },
      { name: 'Sage Green Muted', hex: '#6EE7B7', role: 'Secondary Botanical Copy', contrastRatio: '9.8:1', cssVar: '--color-bio-muted' },
    ],
    typographyTendency: {
      titleFont: 'Outfit / Plus Jakarta Sans',
      bodyFont: 'Plus Jakarta Sans / Inter',
      scale: 'Major Third (1.25) Fluid Scale',
      tracking: 'Normal tracking with soft rounded letterforms',
      caseRule: 'Mixed sentence case with organic leaf badges',
      description: 'Warm, approachable geometric sans typography with rounded terminal strokes.',
    },
    lighting: {
      ambientGlow: 'Emerald leaf drop shadow (shadow-[0_8px_30px_rgba(16,185,129,0.25)])',
      specularEdge: '1px continuous emerald border (border-emerald-500/40)',
      shadowType: 'Soft organic drop shadow with wide diffusion',
      blurDepth: 'Backdrop blur 16px with green saturation boost',
      description: 'Diffused sunlight passing through living forest canopy layers.',
    },
    motionTendency: {
      physicsProfile: 'Fluid Organic Wave (Stiffness: 180, Damping: 20)',
      springParams: 'Smooth fluid wave spring with organic follow-through',
      duration: '450ms fluid wave transition',
      easing: 'cubic-bezier(0.37, 0, 0.63, 1)',
      description: 'Fluid, organic wave motion that mimics natural water currents and swaying leaves.',
    },
    interactionTendency: {
      pressFeedback: 'Fluid squish compression (scale: 0.95) with leaf glow ripple',
      cursorEffect: 'Emerald canopy halo expands under cursor',
      hoverTransform: 'Organic 3D float (+4px) with leaf glow expansion',
      activeState: 'Vibrant emerald border ring with status leaf pulse',
      description: 'Controls respond with soft organic squish physics and emerald glow ripples.',
    },
    soundTendency: {
      toneType: 'Acoustic Wood & Water Droplet',
      frequency: 'A4 (440 Hz) Wood Block Impulse + Sine Droplet',
      waveform: 'Triangle Wave with acoustic dampening',
      description: 'Organic acoustic wood block tick or water drop ping.',
    },
    hapticTendency: {
      patternName: 'Botanical Ripple',
      vibrationMs: '[12ms, 30ms, 20ms]',
      description: 'Soft wave pulse mimicking water ripple impact.',
    },
    bestComponentFits: [
      { name: 'Smart Plant Moisture Monitor', rationale: 'Emerald canopy colors and leaf badges present soil metrics naturally.' },
      { name: 'Carbon Footprint Tracker', rationale: 'Organic botanical aesthetics reinforce environmental sustainability goals.' },
      { name: 'Outdoor Fitness Activity Card', rationale: 'Natural green accents match outdoor trail runs and park workouts.' },
    ],
    poorFitWarnings: [
      { context: 'Cyberpunk Esports HUD', warningText: 'Soft botanical leaves and emerald moss clash with aggressive neon cyber themes.', severity: 'critical' },
      { context: 'Corporate Accounting Ledger', warningText: 'Organic green backgrounds create confusion with financial profit/loss green highlights.', severity: 'high' },
      { context: 'Industrial Power Plant Controller', warningText: 'Fluid organic squish physics lack physical industrial precision.', severity: 'high' },
    ],
  },

  'retro-computing': {
    id: 'retro-computing',
    name: 'Retro Computing',
    family: 'retro',
    subtitle: 'Phosphor P1 Green CRT, Terminal Grid & Scanline Flicker',
    mood: 'Nostalgic, retro-tech, arcade, hacker terminal, authentic 80s CRT.',
    designIntent:
      'Designed for retro gaming emulators, vintage synth editors, hacker terminal simulators, and nostalgia projects. Features P1 phosphor green monochrome text on deep CRT black, scanline grid overlays, curved monitor bezels, and 8-bit audio synthesis.',
    materials: ['P1 Phosphor Green CRT Glass', 'Beige Molded Plastic Bezel', 'Magnetized Deflection Yoke', 'Raw Terminal Fiber'],
    colorsTokens: [
      { name: 'CRT Tube Void Black', hex: '#000800', role: 'Dark Cathode Void', contrastRatio: '21:1', cssVar: '--color-crt-bg' },
      { name: 'Phosphor Green Surface', hex: '#001A00', role: 'CRT Screen Panel', contrastRatio: '19.1:1', cssVar: '--color-crt-surface' },
      { name: 'P1 Phosphor Green', hex: '#22C55E', role: 'Primary Glowing Terminal Copy', contrastRatio: '11.8:1', cssVar: '--color-crt-green' },
      { name: 'Bright Phosphor Pulse', hex: '#4ADE80', role: 'Active Cursor & Highlight', contrastRatio: '14.2:1', cssVar: '--color-crt-bright' },
      { name: 'Dim Phosphor Green', hex: '#15803D', role: 'Terminal Grid Lines & Borders', contrastRatio: '6.2:1', cssVar: '--color-crt-dim' },
    ],
    typographyTendency: {
      titleFont: 'VT323 / Share Tech Mono / Monospace',
      bodyFont: 'Courier Prime / VT323',
      scale: 'Minor Second (1.125) Monospace Pixel Scale',
      tracking: 'Tracking-wider (+0.08em) for pixel matrix grid',
      caseRule: 'Strict ALL-CAPS terminal readouts with blinking block cursor (█)',
      description: 'Nostalgic 8-bit monochrome pixel typography styled like classic IBM PC 5150 and VT100 terminals.',
    },
    lighting: {
      ambientGlow: 'Phosphor green tube glow (shadow-[0_0_30px_rgba(34,197,94,0.35)])',
      specularEdge: '1px phosphor green border line (border-green-500/50)',
      shadowType: 'Curved CRT glass corner distortion shadow',
      blurDepth: 'Subtle CRT horizontal scanline blur filter',
      description: 'Glowing phosphor text projecting ambient green light onto dark CRT glass panels.',
    },
    motionTendency: {
      physicsProfile: 'Stepped CRT Flicker (100ms Step Duration)',
      springParams: 'Instant pixel refresh with subtle horizontal jitter',
      duration: '100ms stepped refresh',
      easing: 'steps(3, jump-end)',
      description: 'Simulates electron beam CRT raster scan refreshes and terminal cursor blinks.',
    },
    interactionTendency: {
      pressFeedback: 'Phosphor flash pulse with instant inverted green block fill',
      cursorEffect: 'Blinking block cursor (█) follows active field',
      hoverTransform: 'Green border brightness increases with scanline glow bloom',
      activeState: 'Inverted green box fill with solid black text copy',
      description: 'Controls respond like vintage terminal keyboard keys with green block highlight state shifts.',
    },
    soundTendency: {
      toneType: '8-Bit Retro Pulse Wave',
      frequency: '523.25 Hz (C5) Square Wave Chiptune (25ms)',
      waveform: 'Raw Square Wave with zero decay',
      description: 'Nostalgic 8-bit chiptune beep from vintage arcade sound chips.',
    },
    hapticTendency: {
      patternName: 'Chiptune Tick',
      vibrationMs: '[15ms, 10ms, 15ms]',
      description: 'Retro double click simulating vintage mechanical terminal keyboard.',
    },
    bestComponentFits: [
      { name: 'Retro Arcade Emulator Menu', rationale: 'P1 phosphor green CRT scanlines match classic 80s arcade cabinets perfectly.' },
      { name: 'Hacker Terminal Command Line', rationale: 'Blinking block cursors and VT323 monospace typography create authentic nostalgia.' },
      { name: 'Vintage Chiptune Synth Sequencer', rationale: 'Green pixel grids display music notes authentically.' },
    ],
    poorFitWarnings: [
      { context: 'Modern Real Estate Listing', warningText: 'Monochrome green CRT text distorts property photography colors.', severity: 'critical' },
      { context: 'Telehealth Medical Video Portal', warningText: '8-bit scanlines cause flickering that interferes with diagnostic video calls.', severity: 'critical' },
      { context: 'Corporate Banking Dashboard', warningText: 'Retro arcade aesthetics look unprofessional for corporate financial management.', severity: 'high' },
    ],
  },

  'ai-character': {
    id: 'ai-character',
    name: 'AI Companion Character',
    family: 'companion',
    subtitle: 'Indigo Luminescence, Interactive Mascot Engine & Emotion State',
    mood: 'Engaging, intelligent, friendly, responsive, empathetic.',
    designIntent:
      'Designed for AI assistants, conversational chatbots, customer onboarding mascots, and gamified tutors. Features an interactive 8-state companion mascot, reactive eye tracking, indigo/cyan gradient ambient lighting, and polyphonic emotional acoustic feedback.',
    materials: ['Reactive Holographic Mesh', 'Indigo Silicon Core', 'Luminescent Eye Lens', 'Soft Polyurethane Surface'],
    colorsTokens: [
      { name: 'Deep Cosmic Void', hex: '#0B0F19', role: 'Conversational Background', contrastRatio: '21:1', cssVar: '--color-ai-bg' },
      { name: 'Indigo Core Surface', hex: '#111827', role: 'Companion Card Frame', contrastRatio: '19.2:1', cssVar: '--color-ai-surface' },
      { name: 'Vibrant Indigo Glow', hex: '#6366F1', role: 'Companion Energy & Focus', contrastRatio: '9.2:1', cssVar: '--color-ai-indigo' },
      { name: 'Electric Cyan Accent', hex: '#06B6D4', role: 'Eye Lens & Active Thought', contrastRatio: '10.8:1', cssVar: '--color-ai-cyan' },
      { name: 'Pure White Text', hex: '#FFFFFF', role: 'Primary Conversation Copy', contrastRatio: '21:1', cssVar: '--color-ai-text' },
    ],
    typographyTendency: {
      titleFont: 'Plus Jakarta Sans / Outfit',
      bodyFont: 'Plus Jakarta Sans / Inter',
      scale: 'Major Third (1.25) Conversational Scale',
      tracking: 'Normal tracking with open letter spacing for conversational bubbles',
      caseRule: 'Warm sentence case with friendly avatar badges',
      description: 'Approachable geometric typography designed for natural conversational dialogue bubbles.',
    },
    lighting: {
      ambientGlow: 'Orbital indigo/cyan drop shadow (shadow-[0_0_50px_rgba(99,102,241,0.25)])',
      specularEdge: '1px glowing indigo border (border-indigo-500/30)',
      shadowType: 'Orbital multi-layer volumetric shadow',
      blurDepth: 'Backdrop blur 24px with indigo tint',
      description: 'Luminescent aura around companion character that pulses in rhythm with AI speech generation.',
    },
    motionTendency: {
      physicsProfile: 'Playful Companion Spring (Stiffness: 320, Damping: 22)',
      springParams: 'Responsive spring physics with mascot jump celebrations',
      duration: '300ms companion motion',
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      description: 'Expressive mascot animation loops (idle breathing, attentive lean, password hide, error headshake, success celebration).',
    },
    interactionTendency: {
      pressFeedback: 'Mascot reacts dynamically based on focused input field',
      cursorEffect: 'Mascot eyes track user cursor position across screen',
      hoverTransform: 'Mascot leans forward (+4px) with happy eye expression',
      activeState: 'Orbital spin spinner with dynamic status speech bubble',
      description: 'Mascot companion reacts to user form inputs in real time (e.g. peeking through fingers during password entry).',
    },
    soundTendency: {
      toneType: 'Polyphonic Emotional Chime',
      frequency: 'Ascending C5-E5-G5 Triad (Success) / Dual Square Dissonance (Error)',
      waveform: 'Sine/Triangle wave synth with acoustic envelope',
      description: 'Charming chiptune chords communicating AI emotional states (joy, curiosity, thinking, success, error).',
    },
    hapticTendency: {
      patternName: 'Companion Heartbeat',
      vibrationMs: '[15ms, 40ms, 25ms]',
      description: 'Rhythmic double pulse mimicking a friendly heartbeat.',
    },
    bestComponentFits: [
      { name: 'Cinematic Mascot Auth Card', rationale: 'Interactive 8-state mascot makes login delightful and prevents user error.' },
      { name: 'AI Tutor Onboarding Assistant', rationale: 'Companion mascot guides students through complex setup steps.' },
      { name: 'Conversational Voice Search Deck', rationale: 'Orbital indigo aura visualizes live AI voice processing.' },
    ],
    poorFitWarnings: [
      { context: 'High-Frequency Forex Order Book', warningText: 'Playful mascot animations distract traders from executing fast millisecond trades.', severity: 'critical' },
      { context: 'Emergency Medical Dispatch', warningText: 'Cute mascot character feels inappropriate during critical 911 emergency calls.', severity: 'critical' },
      { context: 'Strict Legal Contract Vault', warningText: 'Playful AI companion undermines formal legal document gravity.', severity: 'high' },
    ],
  },
};
