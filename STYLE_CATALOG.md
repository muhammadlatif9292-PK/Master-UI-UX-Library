# Style Catalog & Recipe Presets

> **Visual Style Matrix, Glassmorphism Presets, and Surface Material Specifications**

---

## 🎨 Visual Style Matrix

### 1. Liquid Glass & Crystal (`neumorphic-glass` / `cinematic-dark`)
- **Backdrop Filter**: `backdrop-blur-2xl backdrop-saturate-150`
- **Border**: `1px solid rgba(255, 255, 255, 0.12)`
- **Background**: `rgba(15, 23, 42, 0.75)`
- **Shadow**: `0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)`

### 2. Obsidian Gold Luxury (`restrained-luxury`)
- **Border**: `1px solid rgba(234, 179, 8, 0.3)`
- **Background**: `#09090b` (Deep Charcoal Obsidian)
- **Typography**: Cormorant Garamond / Serif Display
- **Accent**: 24k Gold Hairline Highlights (`#eab308`)

### 3. Cyber Terminal & HUD (`futuristic-cyber`)
- **Border**: `1px solid rgba(6, 182, 212, 0.4)`
- **Corners**: Notched 45-degree corner brackets (`clip-path: polygon(...)`)
- **Background**: `#040711` with 1px animated scanlines
- **Typography**: JetBrains Mono / Monospace

### 4. Laboratory Slate (`scientific-lab`)
- **Border**: `1px solid #cbd5e1`
- **Background**: `#f8fafc` (Sterile Laboratory Slate)
- **Grid Overlay**: Subtle 20px isometric grid background pattern
- **Accent**: Precision Cobalt Blue (`#2563eb`)

---

## 🎭 Motion Style Recipes

- **`fluidSpring`**: `type: "spring", stiffness: 380, damping: 28, mass: 0.8` — Fluid, organic spring bounce for interactive cards and modals.
- **`magneticProximity`**: Mouse cursor tracking with spatial displacement vectors for buttons and floating docks.
- **`inertialGlide`**: Kinetic drag friction with smooth deceleration for carousels and viewports.
- **`vernierSnapping`**: Discrete magnetic step snapping for rotary knobs and range sliders.
