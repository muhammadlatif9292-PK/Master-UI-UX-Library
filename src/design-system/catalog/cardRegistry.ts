/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CatalogEntry } from './catalogTypes';

export const CARD_REGISTRY: CatalogEntry[] = [
  {
    id: 'card-glass-frosted-depth',
    name: 'Frosted Glass Refraction Card',
    component: 'GlassCard',
    family: 'surface',
    tags: ['glass', 'frosted', 'refraction', 'blur', 'modern', 'translucent'],
    description: 'Multi-layer glass card with dynamic background blur, subtle noise grain texture, specular perimeter rim highlight, and high-contrast typography.',
    mood: 'Luminous & Spatial',
    visualStyle: 'Frosted Glass Refraction',
    motionStyle: 'Subtle Float & Rim Shimmer',
    interactionStyle: 'Specular Hover Glint & Click Depress',
    lightingStyle: 'Translucent Rim Light & Diffused Shadow',
    soundStyle: 'Glass Tap',
    hapticStyle: 'Light Crisp',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Adaptive blur radius scaling to preserve GPU memory on mobile devices',
    accessibility: 'AAA',
    performanceTier: 'optimized',
    dependencies: ['Tailwind CSS', 'lucide-react'],
    sourceInspiration: 'Apple macOS Sequoia Glass Windows & VisionOS Materials',
    license: 'Apache-2.0',
    codeArtifact: `<div className="relative p-6 rounded-3xl bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden group">
  <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />
  <div className="relative z-10 space-y-4">
    <div className="flex items-center justify-between">
      <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono">SURFACE // 01</span>
      <span className="text-xs text-white/60 font-mono">120 FPS</span>
    </div>
    <h3 className="text-xl font-bold text-white tracking-tight">Refractive Glass Workspace</h3>
    <p className="text-xs text-white/70 leading-relaxed">Precision frosted backdrop filter calibrated for maximum optical contrast.</p>
  </div>
</div>`,
    aiSpecification: 'Maintains minimum 4.5:1 text-to-background contrast ratio across variable backdrop colors.',
    version: '4.2.0',
    status: 'stable',
    favorite: true,
    collection: 'Surface & Glass Cards',
  },
  {
    id: 'card-bento-asymmetric-mosaic',
    name: 'Asymmetric Bento Modular Card',
    component: 'BentoCard',
    family: 'surface',
    tags: ['bento', 'grid', 'modular', 'dashboard', 'asymmetric', 'density'],
    description: 'High-density Bento grid module integrating primary status telemetry, inline sparklines, action pills, and status chips in a mathematically proportioned frame.',
    mood: 'Organized & Architectural',
    visualStyle: 'Bento Grid Cell',
    motionStyle: 'Staggered Cell Entrance Spring',
    interactionStyle: 'Quadrant Hover Focus & Expansion',
    lightingStyle: 'Subtle Inset Gradient Bevel',
    soundStyle: 'Subtle Click',
    hapticStyle: 'Medium Crisp',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Collapses from 2-column bento span to single stacked column on compact viewports',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['Tailwind CSS', 'lucide-react'],
    sourceInspiration: 'Apple Keynote Bento Grids & Linear.app Feature Modules',
    license: 'Apache-2.0',
    codeArtifact: `<div className="col-span-2 p-6 rounded-3xl bg-zinc-900/90 border border-white/10 hover:border-cyan-500/50 transition-all shadow-xl space-y-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
      <LayoutGrid className="w-4 h-4" /> BENTO TELEMETRY
    </div>
    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">+24.8% OPT</span>
  </div>
  <h3 className="text-lg font-bold text-white">Compute Pipeline Acceleration</h3>
  <div className="grid grid-cols-3 gap-2 pt-2">
    <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
      <div className="text-xs font-mono text-zinc-400">Latency</div>
      <div className="text-sm font-bold text-white font-mono">1.2ms</div>
    </div>
  </div>
</div>`,
    aiSpecification: 'Supports dynamic CSS grid spans (col-span-1, col-span-2, row-span-2) with auto-flow.',
    version: '4.5.0',
    status: 'stable',
    favorite: true,
    collection: 'Bento & Structural Cards',
  },
  {
    id: 'card-hero-focal-spotlight',
    name: 'Hero Focal Spotlight Card',
    component: 'HeroCard',
    family: 'surface',
    tags: ['hero', 'spotlight', 'callout', 'focal', 'featured', 'conversion'],
    description: 'Flagship hero announcement card designed for high visual weight, featuring multi-tone ambient lighting, prominent badge, focal typography, and primary CTA group.',
    mood: 'Commanding & Prestigious',
    visualStyle: 'Ambient Radial Spotlight',
    motionStyle: 'Gentle Radial Light Breathing',
    interactionStyle: 'Pointer-Following Specular Flare',
    lightingStyle: 'Cyan & Violet Multi-Point Bloom',
    soundStyle: 'Power Hum Low',
    hapticStyle: 'Heavy Thud',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Action buttons wrap vertically on mobile viewports',
    accessibility: 'AAA',
    performanceTier: 'optimized',
    dependencies: ['Tailwind CSS', 'lucide-react'],
    sourceInspiration: 'Stripe Product Hero Banners & GitHub Universe Announcements',
    license: 'Apache-2.0',
    codeArtifact: `<div className="relative p-8 md:p-10 rounded-3xl bg-zinc-950 border border-cyan-500/30 overflow-hidden shadow-2xl">
  <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
  <div className="relative z-10 space-y-4 max-w-xl">
    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">NEXT GENERATION 2026</span>
    <h2 className="text-3xl font-black text-white tracking-tight leading-tight">Quantum Token Engine Architecture</h2>
    <p className="text-sm text-zinc-300 leading-relaxed">Stream real-time generative UI state models with deterministic sub-millisecond execution.</p>
    <div className="flex gap-3 pt-2">
      <button className="px-5 py-2.5 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs hover:bg-cyan-400 transition-all">Launch Engine</button>
      <button className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs hover:bg-white/10">Read Whitepaper</button>
    </div>
  </div>
</div>`,
    aiSpecification: 'Emits user engagement telemetry triggers on CTA interaction.',
    version: '4.0.0',
    status: 'stable',
    favorite: true,
    collection: 'Editorial & Presentation Cards',
  },
  {
    id: 'card-floating-physics-elevation',
    name: 'Floating Anti-Gravity Card',
    component: 'FloatingCard',
    family: 'surface',
    tags: ['floating', 'elevation', 'physics', 'anti-gravity', 'depth', 'shadow'],
    description: 'Suspended surface hovering with smooth sine-wave vertical floating physics, ambient ground shadow dilation, and responsive hover lift.',
    mood: 'Weightless & Futuristic',
    visualStyle: 'Suspended Floating Surface',
    motionStyle: 'Continuous Sine Oscillation',
    interactionStyle: 'Hover Acceleration & Shadow Expansion',
    lightingStyle: 'Bottom Occlusion Ground Shadow',
    soundStyle: 'Whoosh Up Soft',
    hapticStyle: 'Light Selection',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Oscillation amplitude dampens automatically when reduced motion is requested',
    accessibility: 'AAA',
    performanceTier: 'real-time',
    dependencies: ['motion/react', 'Tailwind CSS'],
    sourceInspiration: 'VisionOS Spatial Floating Windows',
    license: 'Apache-2.0',
    codeArtifact: `<div className="relative group">
  <div className="p-6 rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-2">
    <h3 className="text-lg font-bold text-white">Suspended Core</h3>
    <p className="text-xs text-zinc-400 mt-1">Calibrated anti-gravity elevation matrix.</p>
  </div>
  <div className="w-3/4 h-3 mx-auto mt-4 bg-black/40 rounded-full blur-md group-hover:scale-90 group-hover:opacity-40 transition-all" />
</div>`,
    aiSpecification: 'Hardware-accelerated CSS translate3d transform with will-change.',
    version: '3.8.0',
    status: 'stable',
    favorite: false,
    collection: 'Kinetic & Spatial Cards',
  },
  {
    id: 'card-tilt-3d-gyroscope',
    name: '3D Gyroscope Perspective Tilt Card',
    component: 'TiltCard',
    family: 'surface',
    tags: ['tilt', '3d', 'gyroscope', 'perspective', 'parallax', 'specular'],
    description: 'True 3D perspective card calculated from mouse pointer offset with dynamic glare highlight sheen and multi-layer parallax depth separation.',
    mood: 'Tactile & Dimensional',
    visualStyle: '3D Parallax Perspective',
    motionStyle: 'Spring-Damper Angular Tilt',
    interactionStyle: 'Dynamic Pointer Angle Tracking & Glare Move',
    lightingStyle: 'Specular Glare Follower',
    soundStyle: 'Subtle Click',
    hapticStyle: 'Detent Micro Ticks',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Falls back to DeviceOrientation gyroscope API on mobile smartphones',
    accessibility: 'AAA',
    performanceTier: 'real-time',
    dependencies: ['Tailwind CSS', 'lucide-react'],
    sourceInspiration: 'Apple TV Card Hover Parallax & Atropos JS',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-8 rounded-3xl bg-zinc-900 border border-cyan-500/30 shadow-2xl relative overflow-hidden transition-transform duration-100 ease-out" style={{ transform: 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' }}>
  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100" />
  <div className="transform translate-z-8 space-y-2">
    <span className="text-xs font-mono text-cyan-400">3D PERSPECTIVE</span>
    <h3 className="text-xl font-bold text-white">Spatial Parallax Surface</h3>
  </div>
</div>`,
    aiSpecification: 'Calculates tilt matrix: rx = (y - cy) / cy * -15; ry = (x - cx) / cx * 15.',
    version: '4.1.0',
    status: 'stable',
    favorite: true,
    collection: 'Kinetic & Spatial Cards',
  },
  {
    id: 'card-magnetic-cursor-attractor',
    name: 'Magnetic Cursor Attractor Card',
    component: 'MagneticCard',
    family: 'surface',
    tags: ['magnetic', 'cursor', 'spring', 'attraction', 'gravity', 'kinetic'],
    description: 'Elastic surface that senses cursor proximity within an 80px radius and pulls its anchor point toward the pointer with soft rubberized damping.',
    mood: 'Organic & Responsive',
    visualStyle: 'Elastic Magnetic Anchor',
    motionStyle: 'Rubberband Spring Attractor',
    interactionStyle: 'Proximity Snap & Release Rebound',
    lightingStyle: 'Directional Proximity Glow',
    soundStyle: 'None',
    hapticStyle: 'Light Selection',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Gracefully disabled on touch devices to avoid viewport dragging collisions',
    accessibility: 'AAA',
    performanceTier: 'real-time',
    dependencies: ['motion/react', 'Tailwind CSS'],
    sourceInspiration: 'Awwwards Site of the Year Magnetic UI Patterns',
    license: 'Apache-2.0',
    codeArtifact: `<motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-3xl bg-zinc-900 border border-purple-500/30 shadow-xl space-y-3">
  <div className="text-purple-400 text-xs font-mono">MAGNETIC ANCHOR</div>
  <h4 className="text-base font-bold text-white">Dynamic Field Snapping</h4>
</motion.div>`,
    aiSpecification: 'Clamps maximum translation displacement to ±24px.',
    version: '3.0.0',
    status: 'stable',
    favorite: false,
    collection: 'Kinetic & Spatial Cards',
  },
  {
    id: 'card-expandable-drawer-accordion',
    name: 'Expandable Drawer Data Card',
    component: 'ExpandableCard',
    family: 'surface',
    tags: ['expandable', 'accordion', 'drawer', 'collapsible', 'details', 'hierarchy'],
    description: 'Compact summary card that smoothly springs open to reveal deep telemetry graphs, configuration parameters, and detailed audit logs with zero layout pop.',
    mood: 'Efficient & Revealing',
    visualStyle: 'Accordion Reveal Well',
    motionStyle: 'Height Auto Spring Interpolation',
    interactionStyle: 'Chevron Toggle & Escape Dismiss',
    lightingStyle: 'Expanded Perimeter Highlight',
    soundStyle: 'Pop Bubble High',
    hapticStyle: 'Medium Crisp',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Full width expansion on small screens with internal scroll pinning',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['Tailwind CSS', 'lucide-react'],
    sourceInspiration: 'Stripe Dashboard Transaction Rows & Linear Issue Details',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 transition-all space-y-4">
  <div className="flex items-center justify-between cursor-pointer">
    <div>
      <h4 className="font-bold text-white">Database Cluster Shard #04</h4>
      <p className="text-xs text-zinc-400">99.99% Health • Primary Replica</p>
    </div>
    <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400"><ChevronDown className="w-4 h-4" /></button>
  </div>
  {/* Expanded Content Drawer */}
</div>`,
    aiSpecification: 'Includes aria-expanded and aria-controls attributes for screen readers.',
    version: '4.0.0',
    status: 'stable',
    favorite: true,
    collection: 'Structural & Interactive Cards',
  },
  {
    id: 'card-morphing-layout-transition',
    name: 'Morphing Layout Geometry Card',
    component: 'MorphingCard',
    family: 'surface',
    tags: ['morphing', 'layout-transition', 'shared-layout', 'fluid', 'view-transition'],
    description: 'Continuous geometric shape and layout morphing between card thumbnail, compact bar, and full-screen detailed view without jarring re-renders.',
    mood: 'Seamless & Fluid',
    visualStyle: 'Shared Element Surface',
    motionStyle: 'FLIP Layout Morph Animation',
    interactionStyle: 'Click View Transition & Return Pinch',
    lightingStyle: 'Active Mode Border Surge',
    soundStyle: 'Subtle Click',
    hapticStyle: 'Double Tap Bump',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Adapts target coordinates to current viewport dimensions',
    accessibility: 'AAA',
    performanceTier: 'optimized',
    dependencies: ['motion/react', 'Tailwind CSS'],
    sourceInspiration: 'iOS App Store Today Card Expansion & Shared Element Transitions',
    license: 'Apache-2.0',
    codeArtifact: `<motion.div layoutId="morph-card" className="p-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 shadow-2xl">
  <motion.h3 layoutId="morph-title" className="text-lg font-bold text-white">Fluid Geometric Morph</motion.h3>
</motion.div>`,
    aiSpecification: 'Employs layoutId for shared layout animation matching.',
    version: '3.9.0',
    status: 'stable',
    favorite: true,
    collection: 'Structural & Interactive Cards',
  },
  {
    id: 'card-stack-cascading-deck',
    name: 'Stack Cascading Card Deck',
    component: 'StackCard',
    family: 'surface',
    tags: ['stack', 'deck', 'swipe', 'cascading', 'cards', 'queue'],
    description: 'Interactive layered deck with angled back cards, peek tabs, swipe-to-dismiss gesture support, and automatic next-card elevation.',
    mood: 'Tangible & Playful',
    visualStyle: 'Layered Deck Stratum',
    motionStyle: 'Swipe Toss Velocity & Return Spring',
    interactionStyle: 'Drag Swipe Left/Right & Card Shuffle',
    lightingStyle: 'Inter-Layer Shadow Occlusion',
    soundStyle: 'Card Shuffle',
    hapticStyle: 'Sharp Detent Click',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Touch drag thresholds optimized for mobile thumbs',
    accessibility: 'AAA',
    performanceTier: 'real-time',
    dependencies: ['lucide-react', 'Tailwind CSS'],
    sourceInspiration: 'Tinder Card Swiper & Apple Wallet Stacked Passes',
    license: 'Apache-2.0',
    codeArtifact: `<div className="relative w-full max-w-sm h-64 mx-auto">
  <div className="absolute top-4 left-4 right-4 h-56 rounded-3xl bg-zinc-800 border border-white/5 opacity-50 scale-90" />
  <div className="absolute top-2 left-2 right-2 h-56 rounded-3xl bg-zinc-850 border border-white/10 opacity-75 scale-95" />
  <div className="absolute top-0 inset-x-0 h-56 p-6 rounded-3xl bg-zinc-900 border border-white/20 shadow-2xl flex flex-col justify-between">
    <span className="text-xs font-mono text-cyan-400">CARD 01 OF 05</span>
    <h3 className="text-xl font-bold text-white">Quantum Token Shard</h3>
  </div>
</div>`,
    aiSpecification: 'Dispatches onDismiss callback with direction (left | right).',
    version: '3.5.0',
    status: 'stable',
    favorite: true,
    collection: 'Kinetic & Spatial Cards',
  },
  {
    id: 'card-layered-parallax-depth',
    name: 'Multi-Strata Layered Depth Card',
    component: 'LayeredCard',
    family: 'surface',
    tags: ['layered', 'strata', 'depth', 'parallax', 'sandwich', 'planes'],
    description: 'Exploded multi-plane sandwich card separating background texture, graphical assets, typography, and floating action chips across physical Z-layers.',
    mood: 'Deep & Intricate',
    visualStyle: 'Multi-Plane Strata',
    motionStyle: 'Differential Parallax Speed',
    interactionStyle: 'Hover Z-Separation Expansion',
    lightingStyle: 'Volumetric Depth Shadowing',
    soundStyle: 'Subtle Click',
    hapticStyle: 'Light Selection',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Layers flatten cleanly into unified 2D surface on low-power devices',
    accessibility: 'AAA',
    performanceTier: 'optimized',
    dependencies: ['Tailwind CSS', 'lucide-react'],
    sourceInspiration: 'Figma Dev Mode 3D Layer Visualizers & Spline Design',
    license: 'Apache-2.0',
    codeArtifact: `<div className="relative p-6 rounded-3xl bg-zinc-900 border border-white/15 group overflow-hidden shadow-2xl">
  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 transform group-hover:scale-110 transition-transform duration-500" />
  <div className="relative z-10 space-y-3 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
    <span className="px-2.5 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono">Z-INDEX // LEVEL 3</span>
    <h3 className="text-lg font-bold text-white">Multi-Strata Architecture</h3>
  </div>
</div>`,
    aiSpecification: 'Applies CSS transform-style: preserve-3d to children.',
    version: '3.2.0',
    status: 'stable',
    favorite: false,
    collection: 'Kinetic & Spatial Cards',
  },
  {
    id: 'card-spatial-vision-glass',
    name: 'Spatial VisionOS Refractive Glass Plate',
    component: 'SpatialCard',
    family: 'surface',
    tags: ['spatial', 'visionos', 'glass', 'refraction', 'specular', 'depth'],
    description: 'Next-generation spatial computing glass panel featuring thick optical acrylic refraction, dynamic specular rim highlight, and floating dimensional controls.',
    mood: 'Futuristic & Spatial',
    visualStyle: 'VisionOS Spatial Acrylic',
    motionStyle: 'Spatial Depth Float',
    interactionStyle: 'Gaze Focus Glow & Direct Pinch Feedback',
    lightingStyle: 'Omni-Directional Environmental Refraction',
    soundStyle: 'Glass Tap',
    hapticStyle: 'Light Crisp',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Calibrates internal backdrop-filter saturation for optimal legibility',
    accessibility: 'AAA',
    performanceTier: 'optimized',
    dependencies: ['Tailwind CSS', 'lucide-react'],
    sourceInspiration: 'Apple VisionOS Spatial UI Design System Guidelines',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-8 rounded-[32px] bg-white/[0.08] dark:bg-black/[0.35] backdrop-blur-2xl border border-white/[0.25] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] relative">
  <div className="space-y-4">
    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
      <Eye className="w-5 h-5 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-white tracking-tight">Spatial Environment Window</h3>
    <p className="text-xs text-white/80 leading-relaxed">Dynamic depth plane with volumetric specular acrylic edges.</p>
  </div>
</div>`,
    aiSpecification: 'Uses inset box-shadow to simulate optical glass bevel refraction.',
    version: '5.0.0',
    status: 'stable',
    favorite: true,
    collection: 'Surface & Glass Cards',
  },
  {
    id: 'card-3d-isometric-cube',
    name: 'Isometric Extruded 3D Surface Card',
    component: 'ThreeDimensionalCard',
    family: 'surface',
    tags: ['3d', 'isometric', 'extruded', 'cube', 'mechanical', 'slab'],
    description: 'Chunky 3D extruded physical slab card with beveled mechanical side walls, metallic top plate, and isometric depth perspective.',
    mood: 'Heavy & Industrial',
    visualStyle: 'Isometric Beveled Slab',
    motionStyle: 'Hydraulic Depress Spring',
    interactionStyle: 'Extrusion Depress Click',
    lightingStyle: 'Chiseled Rim Bevel Highlights',
    soundStyle: 'Cherry Blue Click',
    hapticStyle: 'Sharp Actuation Bump',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Extrusion height scales with element dimensions',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['Tailwind CSS', 'lucide-react'],
    sourceInspiration: 'Teenage Engineering Hardware & Cyberpunk UI Slabs',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-6 rounded-3xl bg-zinc-900 border-2 border-zinc-700 shadow-[0_8px_0_#18181b,0_15px_20px_rgba(0,0,0,0.6)] active:translate-y-2 active:shadow-[0_0_0_#18181b] transition-all">
  <h4 className="text-base font-bold text-cyan-400 font-mono">EXTRUDED SLAB // M-08</h4>
  <p className="text-xs text-zinc-400 mt-1">Physical actuation mechanical deck.</p>
</div>`,
    aiSpecification: 'CSS hard offset shadows generate zero GPU blur overhead.',
    version: '3.1.0',
    status: 'stable',
    favorite: false,
    collection: 'Tactile & Industrial Cards',
  },
  {
    id: 'card-editorial-magazine-spread',
    name: 'High-Fashion Editorial Magazine Card',
    component: 'EditorialCard',
    family: 'surface',
    tags: ['editorial', 'magazine', 'serif', 'minimal', 'typography', 'luxury'],
    description: 'Refined editorial card featuring classical serif display typography, expansive negative space, high-contrast monochrome dividers, and pull-quote accents.',
    mood: 'Poetic & Luxurious',
    visualStyle: 'Editorial Serif Column',
    motionStyle: 'Subtle Fade In on Scroll',
    interactionStyle: 'Underline Expand on Hover',
    lightingStyle: 'Pure Monochrome Flat',
    soundStyle: 'None',
    hapticStyle: 'Light Selection',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Scales typography fluidly using CSS clamp rules',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['Tailwind CSS'],
    sourceInspiration: 'Kinfolk, Vogue, and The New Yorker Digital Issues',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-8 rounded-3xl bg-zinc-950 border border-white/15 space-y-6">
  <div className="flex items-center justify-between border-b border-white/10 pb-4">
    <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">ESSAY // VOL. 28</span>
    <span className="text-[11px] font-mono text-zinc-500">AUG 2026</span>
  </div>
  <h2 className="text-2xl md:text-3xl font-serif italic text-white leading-tight">The Ephemeral Aesthetics of Digital Architecture</h2>
  <p className="text-xs font-sans text-zinc-300 leading-relaxed">Crafting digital interfaces that respect spatial rhythm and human attention.</p>
</div>`,
    aiSpecification: 'Zero layout shift ensures rock-solid typographic grid alignment.',
    version: '2.5.0',
    status: 'stable',
    favorite: true,
    collection: 'Editorial & Presentation Cards',
  },
  {
    id: 'card-data-telemetry-sparkline',
    name: 'Real-Time Telemetry & Sparkline Data Card',
    component: 'DataCard',
    family: 'surface',
    tags: ['data', 'telemetry', 'sparkline', 'analytics', 'charts', 'metrics'],
    description: 'Information-dense analytics card pairing primary quantitative readouts with live SVG sparkline micro-charts, min/max range indicators, and live timestamp badges.',
    mood: 'Precise & Analytical',
    visualStyle: 'Data Instrument Display',
    motionStyle: 'Live Sparkline Stroke Drawing',
    interactionStyle: 'Scrub Hover Data Point Inspector',
    lightingStyle: 'Data Wave Glow Accent',
    soundStyle: 'Geiger Counter Tick',
    hapticStyle: 'Detent Micro Ticks',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Sparkline automatically adapts to available container width via ResizeObserver',
    accessibility: 'AAA',
    performanceTier: 'real-time',
    dependencies: ['Tailwind CSS', 'lucide-react'],
    sourceInspiration: 'Grafana Telemetry Dashboards & Datadog Live APM',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 space-y-4">
  <div className="flex items-center justify-between">
    <span className="text-xs font-mono text-zinc-400">INGRESS THROUGHPUT</span>
    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-xs font-mono">LIVE</span>
  </div>
  <div className="flex items-baseline gap-2">
    <span className="text-3xl font-bold font-mono text-white">4.82</span>
    <span className="text-xs text-zinc-400 font-mono">GB/sec</span>
  </div>
  <div className="h-12 w-full flex items-end gap-1 pt-2">
    {[40, 65, 30, 85, 95, 75, 60, 90, 100].map((h, i) => (
      <div key={i} style={{ height: \`\${h}%\` }} className="flex-1 bg-cyan-500/30 hover:bg-cyan-400 rounded-t transition-all" />
    ))}
  </div>
</div>`,
    aiSpecification: 'Renders dynamic SVG path coordinate data from time-series buffer.',
    version: '4.3.0',
    status: 'stable',
    favorite: true,
    collection: 'Analytics & Data Cards',
  },
  {
    id: 'card-kpi-delta-progress-gauge',
    name: 'Executive KPI Gauge & Target Card',
    component: 'KPICard',
    family: 'surface',
    tags: ['kpi', 'target', 'progress', 'delta', 'executive', 'revenue'],
    description: 'High-visibility executive KPI card highlighting target goal completion percentages, positive/negative delta trend chips, and historical benchmark markers.',
    mood: 'Impactful & Goal-Oriented',
    visualStyle: 'Executive KPI Tile',
    motionStyle: 'Radial Gauge Fill Animation',
    interactionStyle: 'Hover Goal Breakdown Popover',
    lightingStyle: 'Emerald Delta Halo Glow',
    soundStyle: 'Subtle Click',
    hapticStyle: 'Progress Step Clicks',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Delta chip shifts below metric value on ultra-narrow viewports',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['Tailwind CSS', 'lucide-react'],
    sourceInspiration: 'Stripe Corporate Treasury & Baremetrics MRR Tiles',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 shadow-xl space-y-4">
  <div className="flex items-center justify-between">
    <span className="text-xs font-mono text-zinc-400 uppercase">Monthly Recurring Revenue</span>
    <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
      <TrendingUp className="w-3 h-3" /> +18.4%
    </span>
  </div>
  <div>
    <div className="text-3xl font-black font-mono text-white">$148,290</div>
    <div className="text-xs text-zinc-400 mt-1">Target: $160,000 (92.6% reached)</div>
  </div>
  <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
    <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 w-[92.6%]" />
  </div>
</div>`,
    aiSpecification: 'Emits target achievement celebration triggers when progress >= 100%.',
    version: '4.0.0',
    status: 'stable',
    favorite: true,
    collection: 'Analytics & Data Cards',
  },
  {
    id: 'card-media-audio-visualizer',
    name: 'Rich Media Player & Waveform Card',
    component: 'MediaCard',
    family: 'surface',
    tags: ['media', 'audio', 'player', 'waveform', 'video', 'artwork'],
    description: 'Interactive media card featuring high-resolution artwork thumbnail, animated audio waveform visualizer, time scrubber, play/pause controls, and volume slider.',
    mood: 'Immersive & Rhythmic',
    visualStyle: 'Media Player Deck',
    motionStyle: 'Waveform Equalizer Bounce',
    interactionStyle: 'Waveform Scrub & Play Toggle',
    lightingStyle: 'Artwork Dominant Color Backlight Glow',
    soundStyle: 'Pop Bubble High',
    hapticStyle: 'Light Crisp',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Waveform bars condense proportionally across mobile cards',
    accessibility: 'AAA',
    performanceTier: 'real-time',
    dependencies: ['lucide-react', 'Tailwind CSS'],
    sourceInspiration: 'Spotify Now Playing Deck & SoundCloud Waveform Player',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl space-y-4">
  <div className="flex gap-4 items-center">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center text-zinc-950 font-bold text-xl shadow-lg">
      <Music className="w-8 h-8 text-white" />
    </div>
    <div>
      <h4 className="font-bold text-white text-base">Atmospheric Resonance</h4>
      <p className="text-xs text-zinc-400">DeepMind Ambient Soundscape</p>
    </div>
  </div>
  <div className="flex items-center gap-2 pt-2">
    <button className="w-10 h-10 rounded-full bg-cyan-500 text-zinc-950 flex items-center justify-center font-bold hover:scale-105 transition-all"><Play className="w-4 h-4 ml-0.5" /></button>
    <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
      <div className="h-full bg-cyan-400 w-1/3" />
    </div>
    <span className="text-[10px] font-mono text-zinc-400">01:42 / 04:15</span>
  </div>
</div>`,
    aiSpecification: 'Connects to Web Audio API for real-time frequency analysis.',
    version: '3.6.0',
    status: 'stable',
    favorite: false,
    collection: 'Structural & Interactive Cards',
  },
  {
    id: 'card-profile-creator-badge',
    name: 'Verified Creator Profile & Identity Card',
    component: 'ProfileCard',
    family: 'surface',
    tags: ['profile', 'creator', 'avatar', 'identity', 'badge', 'social'],
    description: 'High-trust identity card with verified badge avatar, live online status ring, role tags, social action buttons, and follower count metrics.',
    mood: 'Personal & Credible',
    visualStyle: 'Identity Badge Card',
    motionStyle: 'Avatar Pulse & Tag Float',
    interactionStyle: 'Follow / Connect Button Feedback',
    lightingStyle: 'Online Status Emerald Beacon Glow',
    soundStyle: 'Subtle Click',
    hapticStyle: 'Medium Crisp',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Collapses action buttons to icon-only triggers on narrow layouts',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react', 'Tailwind CSS'],
    sourceInspiration: 'GitHub User Hovercards & Twitter Verified Profiles',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 shadow-xl space-y-4">
  <div className="flex items-center justify-between">
    <div className="relative">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center font-bold text-white text-lg">AV</div>
      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-900" />
    </div>
    <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all">Follow</button>
  </div>
  <div>
    <h3 className="text-lg font-bold text-white flex items-center gap-1.5">Dr. Alex Vance <CheckCircle2 className="w-4 h-4 text-cyan-400" /></h3>
    <p className="text-xs text-zinc-400 mt-0.5">Principal Design Systems Architect @ Google DeepMind</p>
  </div>
</div>`,
    aiSpecification: 'Generates vCard and social metadata schema tags.',
    version: '4.0.0',
    status: 'stable',
    favorite: false,
    collection: 'Structural & Interactive Cards',
  },
  {
    id: 'card-feature-showcase-matrix',
    name: 'Feature Capability Matrix Card',
    component: 'FeatureCard',
    family: 'surface',
    tags: ['feature', 'showcase', 'capabilities', 'product', 'matrix', 'benefit'],
    description: 'Product feature presentation card with distinctive icon container, benefit checklist, key metric badges, and interactive exploratory deep-link.',
    mood: 'Engaging & Value-Driven',
    visualStyle: 'Feature Capability Frame',
    motionStyle: 'Icon Hover Rotation & Color Shift',
    interactionStyle: 'Interactive Feature Pill Selection',
    lightingStyle: 'Feature Icon Ambient Flare',
    soundStyle: 'Subtle Click',
    hapticStyle: 'Light Selection',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Checklist wraps gracefully with vertical column flow',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react', 'Tailwind CSS'],
    sourceInspiration: 'Stripe Radar Feature Cards & Vercel Edge Middleware',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 hover:border-cyan-500/40 transition-all space-y-4 shadow-xl">
  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
    <Zap className="w-6 h-6" />
  </div>
  <h3 className="text-lg font-bold text-white">Sub-Millisecond Edge Routing</h3>
  <p className="text-xs text-zinc-400 leading-relaxed">Compute generative UI components globally across 300+ edge data centers.</p>
  <ul className="text-xs text-zinc-300 space-y-1.5 font-mono pt-1">
    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Zero Cold-Start Overheads</li>
    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Automatic Brotli & Zstd Compression</li>
  </ul>
</div>`,
    aiSpecification: 'Emits feature exploration tracking events to product analytics.',
    version: '3.7.0',
    status: 'stable',
    favorite: false,
    collection: 'Editorial & Presentation Cards',
  },
  {
    id: 'card-comparison-tier-pricing',
    name: 'Comparison Tier & Plan Pricing Card',
    component: 'ComparisonCard',
    family: 'surface',
    tags: ['comparison', 'pricing', 'tier', 'plan', 'matrix', 'features'],
    description: 'Tiered plan comparison card featuring highlighted "Most Popular" ribbon, billing interval toggle support, comprehensive feature checklists, and primary upgrade CTA.',
    mood: 'Transparent & Decisive',
    visualStyle: 'Tiered Pricing Pillar',
    motionStyle: 'Popular Card Scale Pulse',
    interactionStyle: 'Interval Switch & Checkout Trigger',
    lightingStyle: 'Popular Tier Cyan Rim Glow',
    soundStyle: 'Pop Bubble High',
    hapticStyle: 'Heavy Thud',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Stacked cards equalized in height across grid rows',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react', 'Tailwind CSS'],
    sourceInspiration: 'Vercel Pro Tier & Linear Enterprise Pricing Tables',
    license: 'Apache-2.0',
    codeArtifact: `<div className="relative p-8 rounded-3xl bg-zinc-900 border-2 border-cyan-500 shadow-2xl space-y-6">
  <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-cyan-500 text-zinc-950 font-bold font-mono text-[10px] uppercase">MOST POPULAR</div>
  <div>
    <h3 className="text-xl font-bold text-white">Enterprise Tier</h3>
    <p className="text-xs text-zinc-400 mt-1">For mission-critical production infrastructure</p>
  </div>
  <div className="flex items-baseline gap-1">
    <span className="text-4xl font-extrabold font-mono text-white">$49</span>
    <span className="text-xs text-zinc-400 font-mono">/ seat / month</span>
  </div>
  <button className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all">Get Started</button>
</div>`,
    aiSpecification: 'Emits stripe checkout session creation request payload.',
    version: '4.1.0',
    status: 'stable',
    favorite: true,
    collection: 'Editorial & Presentation Cards',
  },
  {
    id: 'card-action-quick-trigger',
    name: 'Interactive Action & Task Card',
    component: 'ActionCard',
    family: 'surface',
    tags: ['action', 'task', 'trigger', 'form', 'inline-action', 'workflow'],
    description: 'Action-oriented task card with immediate inline toggle switches, quick input fields, one-tap execution buttons, and live execution spinner states.',
    mood: 'Empowering & Swift',
    visualStyle: 'Action Command Unit',
    motionStyle: 'Execution Progress Ripple',
    interactionStyle: 'One-Tap Toggle & Confirmation Sheet',
    lightingStyle: 'Active Action Amber/Emerald Glow',
    soundStyle: 'Subtle Click',
    hapticStyle: 'Sharp Actuation Bump',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Buttons occupy full width on narrow mobile viewports',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react', 'Tailwind CSS'],
    sourceInspiration: 'Raycast Action Items & Home Assistant Quick Control Tiles',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 shadow-xl space-y-4">
  <div className="flex items-center justify-between">
    <div>
      <h4 className="font-bold text-white text-sm">Automated Backup Pipeline</h4>
      <p className="text-xs text-zinc-400">Runs daily snapshot at 03:00 UTC</p>
    </div>
    <input type="checkbox" className="w-5 h-5 accent-cyan-500 rounded" defaultChecked />
  </div>
  <div className="pt-2 border-t border-white/10 flex gap-2">
    <button className="flex-1 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold">Trigger Manual Snapshot</button>
  </div>
</div>`,
    aiSpecification: 'Dispatches task execution command over WebSocket event bus.',
    version: '3.4.0',
    status: 'stable',
    favorite: false,
    collection: 'Structural & Interactive Cards',
  },
  {
    id: 'card-instrument-telemetry-dial',
    name: 'Avionics Instrument & Dial Card',
    component: 'InstrumentCard',
    family: 'surface',
    tags: ['instrument', 'avionics', 'dial', 'telemetry', 'gauge', 'cybernetic'],
    description: 'Cybernetic avionics telemetry card rendering circular needle gauges, digital RPM indicators, safety alarm thresholds, and audio warning pings.',
    mood: 'Cockpit & Mission-Critical',
    visualStyle: 'Avionics Cockpit Gauge',
    motionStyle: 'Gauge Needle Smooth Damping',
    interactionStyle: 'Calibrated Dial Scrub & Threshold Setting',
    lightingStyle: 'Amber/Cyan Cockpit Instrument Backlight',
    soundStyle: 'Geiger Counter Tick',
    hapticStyle: 'Detent Micro Ticks',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Circular gauge scales with SVG viewBox preserves exact geometric center',
    accessibility: 'AAA',
    performanceTier: 'real-time',
    dependencies: ['Tailwind CSS', 'lucide-react'],
    sourceInspiration: 'SpaceX Dragon Cockpit Touchscreens & Fighter Jet MFDs',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-6 rounded-3xl bg-black border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)] font-mono space-y-4">
  <div className="flex items-center justify-between text-xs text-cyan-400">
    <span>SYSTEM TELEMETRY</span>
    <span className="animate-pulse">ONLINE</span>
  </div>
  <div className="flex items-center justify-center py-4">
    <div className="w-32 h-32 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 flex flex-col items-center justify-center rotate-45">
      <span className="text-2xl font-black text-cyan-300 font-mono -rotate-45">8,420</span>
      <span className="text-[9px] text-cyan-500 -rotate-45">RPM / CORE</span>
    </div>
  </div>
</div>`,
    aiSpecification: 'Emits visual and audio alarms if gauge exceeds warning bounds.',
    version: '4.2.0',
    status: 'stable',
    favorite: true,
    collection: 'Tactile & Industrial Cards',
  },
  {
    id: 'card-simulation-particle-sandbox',
    name: 'Interactive Physics Simulation Sandbox Card',
    component: 'SimulationCard',
    family: 'surface',
    tags: ['simulation', 'physics', 'particle', 'canvas', 'gravity', 'interactive'],
    description: 'Live embedded interactive physics sandbox card featuring bouncing particle nodes, gravity attractor controls, and collision impulse sound feedback.',
    mood: 'Experimental & Dynamic',
    visualStyle: 'Particle Sandbox Viewport',
    motionStyle: 'Physics Verlet Particle Engine',
    interactionStyle: 'Click to Spawn Nodes & Drag Gravity Attractor',
    lightingStyle: 'Particle Collision Flash Radiance',
    soundStyle: 'Liquid Bubble Pop',
    hapticStyle: 'Water Droplet Tap',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Adjusts particle quantity automatically based on device FPS',
    accessibility: 'AA',
    performanceTier: 'real-time',
    dependencies: ['motion/react', 'Tailwind CSS', 'lucide-react'],
    sourceInspiration: 'Chrome Experiments & WebGL Physics Sandboxes',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-6 rounded-3xl bg-zinc-950 border border-purple-500/40 shadow-2xl space-y-4">
  <div className="flex items-center justify-between">
    <span className="text-xs font-mono text-purple-400">PHYSICS ENGINE</span>
    <span className="text-xs font-mono text-zinc-500">60 FPS VERLET</span>
  </div>
  <div className="h-32 rounded-2xl bg-black/60 border border-white/5 flex items-center justify-center text-xs text-zinc-500 font-mono">
    Click to spawn particle impulses
  </div>
</div>`,
    aiSpecification: 'Maintains requestAnimationFrame physics simulation loop.',
    version: '3.0.0',
    status: 'stable',
    favorite: true,
    collection: 'Kinetic & Spatial Cards',
  },
  {
    id: 'card-ai-gemini-copilot-reasoning',
    name: 'AI Gemini Copilot & Reasoning Card',
    component: 'AICard',
    family: 'surface',
    tags: ['ai', 'gemini', 'copilot', 'reasoning', 'generative', 'streaming', 'tokens'],
    description: 'Next-gen AI assistant surface displaying live streaming token generation, expandable chain-of-thought reasoning traces, and one-click code insertion.',
    mood: 'Intelligent & Radiant',
    visualStyle: 'Gemini Spark Prismatic Halo',
    motionStyle: 'Token Streaming Pulse & Sparkle Shimmer',
    interactionStyle: 'Expand Reasoning Tree & Copy Answer',
    lightingStyle: 'Multi-Color Prismatic Edge Radiance',
    soundStyle: 'Subtle Click',
    hapticStyle: 'Magic Sparkle Taps',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Code snippets format with horizontal scroll protection',
    accessibility: 'AAA',
    performanceTier: 'optimized',
    dependencies: ['lucide-react', 'Tailwind CSS'],
    sourceInspiration: 'Google AI Studio & Gemini 2.5 Advanced Interface',
    license: 'Apache-2.0',
    codeArtifact: `<div className="relative p-6 rounded-3xl bg-gradient-to-br from-zinc-950 to-zinc-900 border border-purple-500/40 shadow-2xl space-y-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
      <Sparkles className="w-4 h-4 text-purple-400 animate-spin" /> GEMINI 2.5 FLASH
    </div>
    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">THINKING (1.4s)</span>
  </div>
  <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs text-zinc-300 font-mono leading-relaxed">
    Synthesizing responsive layout tokens with calibrated AAA contrast ratios...
  </div>
</div>`,
    aiSpecification: 'Renders Markdown response with syntax-highlighted code blocks.',
    version: '5.0.0',
    status: 'stable',
    favorite: true,
    collection: 'Editorial & Presentation Cards',
  },
  {
    id: 'card-timeline-audit-milestones',
    name: 'Timeline Milestone & Audit Log Card',
    component: 'TimelineCard',
    family: 'surface',
    tags: ['timeline', 'milestone', 'audit', 'chronological', 'history', 'steps'],
    description: 'Chronological timeline card connecting event milestones with vertical step guides, status badges, actor avatars, and precise relative timestamps.',
    mood: 'Orderly & Historical',
    visualStyle: 'Chronological Stepper Pillar',
    motionStyle: 'Step Highlight Pulse',
    interactionStyle: 'Milestone Node Expand & Diff Inspector',
    lightingStyle: 'Active Step Emerald Highlight',
    soundStyle: 'Subtle Click',
    hapticStyle: 'Light Selection',
    states: ['idle', 'hover', 'focus', 'pressed', 'expanded', 'selected', 'loading', 'success', 'error', 'disabled', 'dragging'],
    responsiveBehavior: 'Timestamps format as concise abbreviations on mobile',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react', 'Tailwind CSS'],
    sourceInspiration: 'GitHub Deployment Timelines & AWS CloudTrail Audit Feeds',
    license: 'Apache-2.0',
    codeArtifact: `<div className="p-6 rounded-3xl bg-zinc-900 border border-white/10 shadow-xl space-y-4">
  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">DEPLOYMENT AUDIT LOG</h4>
  <div className="space-y-3 relative pl-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
    <div className="relative flex items-start gap-2">
      <span className="absolute -left-4 top-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
      <div>
        <div className="text-xs font-bold text-white">Production Release v4.2.0</div>
        <div className="text-[10px] text-zinc-500 font-mono">12 minutes ago by Alex Vance</div>
      </div>
    </div>
  </div>
</div>`,
    aiSpecification: 'Calculates ISO timestamp offsets and relative humanized times.',
    version: '3.8.0',
    status: 'stable',
    favorite: false,
    collection: 'Analytics & Data Cards',
  },
];
