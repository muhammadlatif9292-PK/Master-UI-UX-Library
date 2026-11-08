/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CatalogEntry } from './catalogTypes';

export const OVERLAY_CATALOG: CatalogEntry[] = [
  {
    id: 'overlay-dropdown',
    name: 'Hierarchical Dropdown Menu',
    component: 'DropdownMenu',
    family: 'navigation',
    tags: ['overlay', 'dropdown', 'menu', 'keyboard-nav', 'aria', 'submenus'],
    description: 'Accessible action menu with sub-navigation cascading, keyboard arrow navigation, search filter, and floating anchor attachment.',
    mood: 'Sleek, responsive, and tactile',
    visualStyle: 'Glass refraction with rim lighting and smooth submenu cascader',
    motionStyle: 'Spring entry with directional hover slide',
    interactionStyle: 'Click/hover trigger, Arrow key cycling, Enter to select, Escape to dismiss',
    lightingStyle: 'Specular edge glow on open with subtle ambient drop shadow',
    soundStyle: 'Tactile tick on item hover, soft click on actuation',
    hapticStyle: 'Micro light click on selection',
    states: ['closed', 'open', 'focused', 'submenu-open', 'disabled'],
    responsiveBehavior: 'Auto-flipping collision detection against viewport boundaries',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'macOS Menubar & Linear Quick Actions',
    license: 'Apache-2.0',
    codeArtifact: `<DropdownMenu
  trigger={<Button>Workspace Actions</Button>}
  items={[
    { id: 'new-doc', label: 'New Document', icon: FileText, shortcut: '⌘N' },
    { id: 'share', label: 'Share Project', icon: Share2, shortcut: '⌘S' },
    { id: 'settings', label: 'Preferences', icon: Settings, submenu: [
      { id: 'dark-mode', label: 'Dark Mode', toggle: true },
      { id: 'telemetry', label: 'Telemetry', toggle: false },
    ]},
    { id: 'delete', label: 'Archive Workspace', icon: Trash2, destructive: true }
  ]}
  onSelect={(id) => handleAction(id)}
/>`,
    aiSpecification: 'Prompt for AI agents: Generate high-contrast keyboard-accessible dropdown menu adhering to WAI-ARIA Menu button design pattern with aria-expanded, aria-haspopup="menu", and role="menuitem".',
    version: '2.4.0',
    status: 'stable',
    favorite: true,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-context-menu',
    name: 'Volumetric Context Menu',
    component: 'ContextMenu',
    family: 'navigation',
    tags: ['overlay', 'contextmenu', 'right-click', 'long-press', 'gestures'],
    description: 'Pointer position-anchored context menu triggered via right-click or mobile long-press with smart collision detection.',
    mood: 'Precise, desktop-grade, authoritative',
    visualStyle: 'Deep glass blur with high-contrast text and keyboard shortcut badges',
    motionStyle: 'Radial scale spring expansion from cursor coordinates',
    interactionStyle: 'Right-click or touch-hold trigger, pointer tracking, outside click dismiss',
    lightingStyle: 'Focal cursor bloom with specular rim',
    soundStyle: 'Crisp pop sound on cursor spawn',
    hapticStyle: 'Medium haptic pop on trigger',
    states: ['idle', 'active', 'hovering', 'item-selected'],
    responsiveBehavior: 'Flips quadrant automatically if spawning near screen borders',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'Figma Canvas & VS Code Context Engine',
    license: 'Apache-2.0',
    codeArtifact: `<ContextMenu
  onAction={(action) => runAction(action)}
  items={[
    { id: 'inspect', label: 'Inspect Element', icon: Eye },
    { id: 'duplicate', label: 'Duplicate Layer', icon: Copy, shortcut: '⌘D' },
    { id: 'export', label: 'Export Asset', icon: Download, shortcut: '⇧⌘E' },
    { id: 'delete', label: 'Delete', icon: Trash2, destructive: true }
  ]}
>
  <div className="canvas-item">Right click anywhere on this canvas</div>
</ContextMenu>`,
    aiSpecification: 'AI Prompt: Render an overlay context menu listening to onContextMenu event, preventing default browser menu, and clamping x,y position inside viewport.',
    version: '2.2.0',
    status: 'stable',
    favorite: true,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-command-palette',
    name: 'Universal Command Palette (⌘K)',
    component: 'CommandPalette',
    family: 'navigation',
    tags: ['command', 'palette', 'search', 'spotlight', 'keyboard-first', 'fuzzy'],
    description: 'Instant fuzzy-search command palette with category grouping, recent actions, live hotkeys, and nested drill-down workflows.',
    mood: 'Pro-grade, rapid, frictionless',
    visualStyle: 'Centered floating HUD with search glyph and keyboard breadcrumbs',
    motionStyle: 'Morphing height transition with spring-loaded result cards',
    interactionStyle: '⌘K or Ctrl+K shortcut, Arrow Up/Down navigation, Enter actuation',
    lightingStyle: 'Top-down ambient spotlight with dark letterboxed backdrop',
    soundStyle: 'Typewriter click on typing, warp chime on command execute',
    hapticStyle: 'Light tick on navigation, success burst on execution',
    states: ['hidden', 'open', 'searching', 'executing', 'empty'],
    responsiveBehavior: 'Full screen on mobile, 640px centered floating HUD on desktop',
    accessibility: 'AAA',
    performanceTier: 'real-time',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'Raycast, Linear, macOS Spotlight',
    license: 'Apache-2.0',
    codeArtifact: `<CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  placeholder="Type a command or search..."
  categories={[
    { name: 'Navigation', commands: [...] },
    { name: 'Actions', commands: [...] },
    { name: 'Settings', commands: [...] }
  ]}
  onExecute={(cmd) => execute(cmd)}
/>`,
    aiSpecification: 'AI Prompt: Implement a keyboard-driven command palette dialog with role="combobox", aria-autocomplete="list", and auto-scrolling active listbox options.',
    version: '3.0.0',
    status: 'stable',
    favorite: true,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-tabs',
    name: 'Accessible Semantic Tabs',
    component: 'Tabs',
    family: 'navigation',
    tags: ['tabs', 'navigation', 'tablist', 'aria', 'panels'],
    description: 'W3C ARIA-compliant tab strip with keyboard arrow switching, manual or automatic activation, and synchronized panels.',
    mood: 'Clear, structured, dependable',
    visualStyle: 'Segmented pill or border-tab track with high-contrast active indicator',
    motionStyle: 'Zero-latency panel cross-fade',
    interactionStyle: 'Left/Right or Up/Down arrow cycling, Home/End jump keys',
    lightingStyle: 'Backdrop surface contrast with active tab highlight',
    soundStyle: 'Subtle snap on tab selection',
    hapticStyle: 'Light tactile tap on change',
    states: ['idle', 'focused', 'selected', 'disabled'],
    responsiveBehavior: 'Scrollable overflow with fading gradient edges on narrow screens',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'Radix UI & GitHub Workspace Tabs',
    license: 'Apache-2.0',
    codeArtifact: `<Tabs defaultValue="overview">
  <TabList aria-label="Project Management">
    <Tab value="overview">Overview</Tab>
    <Tab value="analytics">Analytics</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>
  <TabPanel value="overview">Overview Content</TabPanel>
  <TabPanel value="analytics">Analytics Content</TabPanel>
  <TabPanel value="settings">Settings Content</TabPanel>
</Tabs>`,
    aiSpecification: 'AI Prompt: Construct accessible tabs utilizing role="tablist", role="tab", aria-selected, and aria-controls linking to role="tabpanel".',
    version: '2.1.0',
    status: 'stable',
    favorite: false,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-animated-tabs',
    name: 'Fluid Morphing Underline Tabs',
    component: 'AnimatedTabs',
    family: 'navigation',
    tags: ['tabs', 'animated', 'morph', 'layoutId', 'framer-motion'],
    description: 'Dynamic tab strip with synchronized animated pill indicator and sliding layoutId underbar.',
    mood: 'Playful, modern, engaging',
    visualStyle: 'Frosted floating pill track with neon/glow underbar highlight',
    motionStyle: 'Physics spring layout morphing with zero bounce distortion',
    interactionStyle: 'Hover preview glow, click or keyboard switch',
    lightingStyle: 'Internal glowing neon pill underlay',
    soundStyle: 'Smooth fluid glide audio cue',
    hapticStyle: 'Soft elastic feedback on switch',
    states: ['idle', 'hovering', 'transitioning', 'selected'],
    responsiveBehavior: 'Adaptive elastic width fitting tab label text bounding box',
    accessibility: 'AAA',
    performanceTier: 'optimized',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'Apple iPadOS Control Center & Dynamic Island',
    license: 'Apache-2.0',
    codeArtifact: `<AnimatedTabs
  tabs={['Overview', 'Deployments', 'Telemetry', 'Security', 'Billing']}
  activeTab={currentTab}
  onChange={(tab) => setCurrentTab(tab)}
  variant="pill" // or 'underline' | 'neon'
/>`,
    aiSpecification: 'AI Prompt: Create animated tabs with motion/react layoutId="active-tab-indicator" ensuring keyboard arrow accessibility is fully maintained.',
    version: '2.5.0',
    status: 'stable',
    favorite: true,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-modal',
    name: 'Centered Floating Modal Window',
    component: 'Modal',
    family: 'surface',
    tags: ['modal', 'dialog', 'overlay', 'window', 'focus-trap', 'backdrop'],
    description: 'High-craft centered modal surface with backdrop blur, focus trapping, escape key dismissal, and scroll lock.',
    mood: 'Focused, serene, authoritative',
    visualStyle: 'Glass or solid elevated slab with crisp header dividers and action footers',
    motionStyle: 'Spring scale up (0.95 -> 1.0) with synchronized backdrop alpha fade',
    interactionStyle: 'Click trigger, Escape or backdrop click to dismiss, Tab key trapped',
    lightingStyle: 'Diffused ambient shadow with perimeter specular highlight',
    soundStyle: 'Deep resonance whoosh on open, soft close thud',
    hapticStyle: 'Medium haptic impact on open',
    states: ['opening', 'idle', 'scrolling-content', 'closing'],
    responsiveBehavior: 'Full screen sheet on mobile (<640px), centered dialog on tablet/desktop',
    accessibility: 'AAA',
    performanceTier: 'optimized',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'VisionOS Spatial Windows & macOS Sheets',
    license: 'Apache-2.0',
    codeArtifact: `<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Create API Key"
  description="Generate a secure scoped secret key for backend access."
>
  <div className="space-y-4">
    <Input label="Key Name" placeholder="production-worker-1" />
    <Select label="Permission Scope" options={['Read Only', 'Admin']} />
  </div>
  <ModalFooter>
    <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="primary">Generate Key</Button>
  </ModalFooter>
</Modal>`,
    aiSpecification: 'AI Prompt: Render an accessible modal using role="dialog", aria-modal="true", aria-labelledby, and FocusTrap with body scroll lock.',
    version: '3.1.0',
    status: 'stable',
    favorite: true,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-dialog',
    name: 'Action & Confirmation Dialog',
    component: 'AlertDialog',
    family: 'feedback',
    tags: ['dialog', 'alert', 'destructive', 'confirmation', 'modal'],
    description: 'Focused alert dialog for destructive actions or critical user confirmations with explicit keyboard traps.',
    mood: 'Urgent, deliberate, protective',
    visualStyle: 'Compact high-contrast card with warning/destructive accent badges',
    motionStyle: 'Impactful pop spring scale with rapid snap',
    interactionStyle: 'Default focus on Cancel button for safety, Escape key closes',
    lightingStyle: 'Warning amber or crimson glow border refraction',
    soundStyle: 'Warning alert chime on open, confirm snap',
    hapticStyle: 'Warning double-buzz haptic',
    states: ['prompt', 'confirming', 'cancelled', 'loading-action'],
    responsiveBehavior: 'Centered floating compact window across all screen sizes',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'iOS Action Sheet & macOS Destructive Alerts',
    license: 'Apache-2.0',
    codeArtifact: `<AlertDialog
  isOpen={showDialog}
  onClose={() => setShowDialog(false)}
  onConfirm={handleDelete}
  title="Delete Database Cluster?"
  description="This action cannot be undone. All 4,820 customer records will be permanently erased."
  confirmLabel="Permanently Delete"
  variant="destructive"
/>`,
    aiSpecification: 'AI Prompt: Implement alertdialog with role="alertdialog", aria-describedby, and initial focus on safest non-destructive action.',
    version: '2.3.0',
    status: 'stable',
    favorite: false,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-drawer',
    name: 'Edge Sliding Drawer Panel',
    component: 'Drawer',
    family: 'layout',
    tags: ['drawer', 'slide-out', 'navigation', 'panel', 'sidebar'],
    description: 'Full-height edge drawer sliding smoothly from left or right with gesture support and backdrop dimming.',
    mood: 'Expansive, structured, accessible',
    visualStyle: 'Vertical frosted column with sticky navigation header and action footer',
    motionStyle: 'Linear translation slide with spring deceleration damping',
    interactionStyle: 'Swipe edge gesture, click trigger, backdrop dismiss',
    lightingStyle: 'Deep edge shadow separating drawer from primary canvas',
    soundStyle: 'Smooth sliding whoosh audio feedback',
    hapticStyle: 'Light tactile thump upon edge docking',
    states: ['docked', 'sliding', 'fully-open', 'closing'],
    responsiveBehavior: 'Takes 85vw on mobile, 420px on desktop',
    accessibility: 'AAA',
    performanceTier: 'optimized',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'Linear Project Drawer & Slack Workspace Sidebar',
    license: 'Apache-2.0',
    codeArtifact: `<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="right" // 'left' | 'right'
  title="Resource Inspector"
>
  <DrawerContent>
    <PropertyInspector data={selectedNode} />
  </DrawerContent>
</Drawer>`,
    aiSpecification: 'AI Prompt: Build an edge drawer using CSS transforms, pointer drag gestures, and ARIA dialog properties with focus containment.',
    version: '2.6.0',
    status: 'stable',
    favorite: true,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-side-sheet',
    name: 'Multi-Stage Workspace Side Sheet',
    component: 'SideSheet',
    family: 'layout',
    tags: ['side-sheet', 'sheet', 'workspace', 'resizable', 'split-view'],
    description: 'Contextual side panel that embeds alongside active content without fully occluding background canvas interactions.',
    mood: 'Productive, multi-tasking, elegant',
    visualStyle: 'Semi-translucent panel with resizable drag handle and stage tabs',
    motionStyle: 'Smooth slide-in with canvas compression push effect',
    interactionStyle: 'Toggle button, drag edge to resize, keyboard shortcuts',
    lightingStyle: 'Subtle left border rim light and elevation gradient',
    soundStyle: 'Clean mechanical click on toggle',
    hapticStyle: 'Subtle click on resize detent',
    states: ['collapsed', 'expanded', 'fullscreen', 'docked'],
    responsiveBehavior: 'Overlays on mobile, pushes layout grid on wide desktop screens',
    accessibility: 'AAA',
    performanceTier: 'optimized',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'Notion Page Peek & VS Code Secondary Sidebar',
    license: 'Apache-2.0',
    codeArtifact: `<SideSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Deployment Logs"
  stages={['Live Stream', 'Env Variables', 'Audit Trail']}
>
  <LogViewer streamId="prod-east" />
</SideSheet>`,
    aiSpecification: 'AI Prompt: Construct a side-sheet supporting non-blocking background interaction modes, ARIA landmark complementaries, and resize handles.',
    version: '2.0.0',
    status: 'stable',
    favorite: false,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-bottom-sheet',
    name: 'Drag-to-Dismiss Bottom Sheet',
    component: 'BottomSheet',
    family: 'layout',
    tags: ['bottom-sheet', 'sheet', 'mobile', 'gestures', 'drag', 'detents'],
    description: 'Touch-optimized bottom sheet with multi-level snap detents (collapsed, half, full) and rubberband drag physics.',
    mood: 'Tactile, fluid, mobile-native',
    visualStyle: 'Rounded top corners (24px) with frosted glass and central grab handle',
    motionStyle: 'Inertial spring drag following finger velocity and snapping to detents',
    interactionStyle: 'Touch/drag pull handle down to dismiss, flick up to expand',
    lightingStyle: 'Top edge bevel highlight and dark backdrop occlusion',
    soundStyle: 'Satisfying magnetic snap sound on detent capture',
    hapticStyle: 'Haptic detent click when crossing snap thresholds',
    states: ['hidden', 'peeking', 'half-expanded', 'full-expanded', 'dragging'],
    responsiveBehavior: 'Bottom sheet on mobile/tablet, converts to floating popover on large screens',
    accessibility: 'AAA',
    performanceTier: 'real-time',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'Apple Maps Sheets & Spotify Player Sheet',
    license: 'Apache-2.0',
    codeArtifact: `<BottomSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  snapPoints={[0.3, 0.6, 0.95]}
  defaultSnap={1}
>
  <MusicPlayerQueue tracks={queue} />
</BottomSheet>`,
    aiSpecification: 'AI Prompt: Implement a touch-friendly bottom sheet using pointer capture, velocity calculations, and accessible expand/collapse buttons.',
    version: '3.0.0',
    status: 'stable',
    favorite: true,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-popover',
    name: 'Anchor-Positioned Popover Card',
    component: 'Popover',
    family: 'surface',
    tags: ['popover', 'anchor', 'floating', 'tooltip', 'card'],
    description: 'Rich interactive overlay positioned dynamically relative to an anchor element with collision detection and pointer arrow.',
    mood: 'Contextual, informative, elegant',
    visualStyle: 'Card with pointed geometric arrow anchor and subtle refraction',
    motionStyle: 'Micro scale and directional slide from anchor vector',
    interactionStyle: 'Click or focus trigger, interactable inner inputs, escape dismiss',
    lightingStyle: 'Specular edge rim glow with dark ambient drop shadow',
    soundStyle: 'Light crisp snap on open',
    hapticStyle: 'Light tactile pulse',
    states: ['closed', 'open', 'interactive', 'repositioning'],
    responsiveBehavior: 'Calculates placement (top, bottom, left, right) based on available viewport space',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'GitHub User Card Popover & Stripe Dashboard Filters',
    license: 'Apache-2.0',
    codeArtifact: `<Popover
  trigger={<Button variant="outline">Filter Date Range</Button>}
  placement="bottom-start"
>
  <DatePicker onSelectDate={(range) => applyFilter(range)} />
</Popover>`,
    aiSpecification: 'AI Prompt: Build an anchor popover supporting click-outside detection, keyboard focus navigation, and aria-haspopup="dialog".',
    version: '2.4.0',
    status: 'stable',
    favorite: false,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-tooltip',
    name: 'Accessible Tooltip Badge',
    component: 'Tooltip',
    family: 'feedback',
    tags: ['tooltip', 'hint', 'accessible', 'hover', 'focus'],
    description: 'Fast, accessible micro-overlay providing supplementary context on pointer hover or keyboard focus with configurable delay.',
    mood: 'Crisp, unobtrusive, helpful',
    visualStyle: 'Compact dark pill with high-contrast micro-typography and shortcut hint',
    motionStyle: 'Micro 2px slide and instant alpha fade',
    interactionStyle: 'Hover with 200ms delay, instant on keyboard focus, dismissed on Escape',
    lightingStyle: 'High contrast black surface with sharp white text',
    soundStyle: 'Silent by default to avoid auditory fatigue',
    hapticStyle: 'None',
    states: ['hidden', 'delay-timer', 'visible'],
    responsiveBehavior: 'Suppressed on pure touch screens; accessible via long-press or tap-to-inspect',
    accessibility: 'AAA',
    performanceTier: 'ultra-fast',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'Linear Shortcuts & Figma Tooltips',
    license: 'Apache-2.0',
    codeArtifact: `<Tooltip content="Copy commit hash to clipboard" shortcut="⌘C" placement="top">
  <Button variant="ghost" icon={Copy} />
</Tooltip>`,
    aiSpecification: 'AI Prompt: Create an accessible tooltip utilizing role="tooltip", aria-describedby on trigger, and proper delay/clear timers.',
    version: '2.2.0',
    status: 'stable',
    favorite: false,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-spotlight',
    name: 'Interactive Guided Spotlight',
    component: 'SpotlightTour',
    family: 'ai',
    tags: ['spotlight', 'onboarding', 'tour', 'walkthrough', 'focus'],
    description: 'Anamorphic spotlight mask isolating target UI elements for guided onboarding walkthroughs with animated tooltips.',
    mood: 'Illuminating, educational, cinematic',
    visualStyle: 'Darkened canvas cutout with animated pulsing neon spotlight perimeter',
    motionStyle: 'Smooth camera pan and morphing mask coordinates transitioning between targets',
    interactionStyle: 'Next/Previous step buttons, keyboard arrow progression, Escape to exit',
    lightingStyle: 'Inverse mask cutout with radiant focal bloom',
    soundStyle: 'Warm synth chord on step progression',
    hapticStyle: 'Double pulse on new milestone',
    states: ['idle', 'animating-to-target', 'highlighted', 'completed'],
    responsiveBehavior: 'Re-calculates target element bounding rect dynamically on window resize',
    accessibility: 'AAA',
    performanceTier: 'optimized',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'Superhuman Onboarding & Apple Product Tours',
    license: 'Apache-2.0',
    codeArtifact: `<SpotlightTour
  steps={[
    { targetId: 'step-deploy', title: 'Deploy Cluster', body: 'Click here to deploy.' },
    { targetId: 'step-metrics', title: 'Real-time Metrics', body: 'Monitor telemetry here.' }
  ]}
  onComplete={() => alert('Tour Finished')}
/>`,
    aiSpecification: 'AI Prompt: Render an interactive SVG clip-path spotlight overlay highlighting target DOM elements with step navigation controls and ARIA live regions.',
    version: '3.0.0',
    status: 'stable',
    favorite: true,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-lightbox',
    name: 'Refractive Media Lightbox',
    component: 'Lightbox',
    family: 'surface',
    tags: ['lightbox', 'gallery', 'zoom', 'image-viewer', 'fullscreen'],
    description: 'Full-screen high-fidelity media previewer with pinch-to-zoom, pan gestures, EXIF metadata inspector, and keyboard gallery navigation.',
    mood: 'Cinematic, immersive, crystal-clear',
    visualStyle: 'Deep black velvet backdrop with floating glass toolbars and zoom HUD',
    motionStyle: 'Fluid zoom-in expansion from thumbnail origin to fullscreen viewport',
    interactionStyle: 'Click thumbnail, arrow keys for next/prev, scroll wheel to zoom, drag to pan',
    lightingStyle: 'Ambient back-glow echoing dominant colors of displayed asset',
    soundStyle: 'Camera shutter click on open, swipe whoosh on change',
    hapticStyle: 'Medium haptic click on zoom snap',
    states: ['thumbnail', 'expanding', 'fullscreen-inspect', 'zoomed-in', 'closing'],
    responsiveBehavior: 'Full responsive fit with maximum aspect ratio preservation',
    accessibility: 'AAA',
    performanceTier: 'heavy',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'Apple Photos macOS & Unsplash Gallery Viewer',
    license: 'Apache-2.0',
    codeArtifact: `<Lightbox
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  images={galleryImages}
  initialIndex={0}
/>`,
    aiSpecification: 'AI Prompt: Implement full-viewport accessible lightbox with keyboard navigation (Arrows/Escape), zoom level scaling, and aria-roledescription="image viewer".',
    version: '2.8.0',
    status: 'stable',
    favorite: true,
    collection: 'Overlay & Navigation Lab',
  },
  {
    id: 'overlay-inspector',
    name: 'Floating HUD Property Inspector',
    component: 'PropertyInspector',
    family: 'ai',
    tags: ['inspector', 'hud', 'developer', 'properties', 'floating', 'draggable'],
    description: 'Draggable floating overlay window for live property inspection, token debugging, state editing, and live code inspection.',
    mood: 'High-tech, surgical, empowering',
    visualStyle: 'Cyberpunk or dark glass compact HUD with collapsible tree views',
    motionStyle: 'Draggable spring physics with magnetic snap-to-edge docking',
    interactionStyle: 'Drag titlebar to move, click toggles, live property edits',
    lightingStyle: 'Cyan telemetry border glow and subtle scanline texture',
    soundStyle: 'Avionics beep on inspect toggle, switch clicks',
    hapticStyle: 'Light tactile buzz on edge dock',
    states: ['floating', 'dragging', 'docked-left', 'docked-right', 'minimized'],
    responsiveBehavior: 'Free floating with boundary clamping on desktop, bottom sheet on mobile',
    accessibility: 'AAA',
    performanceTier: 'real-time',
    dependencies: ['lucide-react', 'motion'],
    sourceInspiration: 'Chrome DevTools HUD & Unreal Engine Live Inspector',
    license: 'Apache-2.0',
    codeArtifact: `<PropertyInspector
  isOpen={showInspector}
  onClose={() => setShowInspector(false)}
  targetName="HeroButtonComponent"
  properties={{
    variant: 'neon-glow',
    padding: '16px 32px',
    borderRadius: '12px',
    contrastRatio: '14.2:1 (AAA)'
  }}
  onUpdateProperty={(key, value) => update(key, value)}
/>`,
    aiSpecification: 'AI Prompt: Create a draggable floating inspector dialog with role="dialog", aria-label="Properties Inspector", supporting live input controls.',
    version: '3.2.0',
    status: 'stable',
    favorite: true,
    collection: 'Overlay & Navigation Lab',
  },
];
