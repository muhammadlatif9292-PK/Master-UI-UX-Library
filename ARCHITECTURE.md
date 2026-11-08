# Architecture & Design System Engine

> **System Architecture, Recipe Engines, State Machines, and Multi-Tier Performance Foundations**

---

## 1. Core Architectural Separation

The Master UI/UX Library strictly enforces the **Separation of Behavior, Presentation, and Sensory Output**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          COMPONENT BEHAVIOR                             │
│       State Machines (idle, focus, typing, submitting, success)         │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
         ┌───────────────────────────┴───────────────────────────┐
         ▼                                                       ▼
┌─────────────────────────────────┐             ┌─────────────────────────────────┐
│      RECIPE PRESENTATION        │             │        SENSORY ENGINE           │
│ Archetype Tokens & Style Engine │             │  Procedural Audio & Haptics     │
└─────────────────────────────────┘             └─────────────────────────────────┘
```

1. **State Engines (`/src/components/`)**:
   Component logic handles pure user interaction state, validation, focus states, and async lifecycle flows without hardcoding visual tokens.

2. **Recipe Engine (`/src/design-system/recipes/recipeEngine.ts`)**:
   Translates archetype design system tokens (`ARCHETYPE_TOKENS`) into Tailwind class compositions, glass filters, gradient meshes, and motion parameters.

3. **Sensory Layer (`/src/design-system/sound/` & `/src/design-system/haptics/`)**:
   Provides non-visual feedback using zero-asset procedural Web Audio oscillator synthesis (440Hz - 880Hz sine/triangle waves) and navigator vibration pattern triggers.

---

## 2. The 12 Design Archetypes

| Archetype | Primary Palette | Key Typography | Visual Signature |
| :--- | :--- | :--- | :--- |
| `restrained-luxury` | Gold / Obsidian / Zinc | Cormorant Garamond / Serif | 24k gold hairline borders, deep charcoal obsidian backdrops, archival elegance. |
| `cinematic-dark` | Cosmic Slate / Indigo / Cyan | Plus Jakarta Sans | High-contrast dark canvases, deep glowing shadows, liquid glass refraction. |
| `futuristic-cyber` | Neon Cyan / Emerald / Black | JetBrains Mono | Corner bracket notches, scanline telemetry grids, terminal monospace headers. |
| `scientific-lab` | Sterile Slate / Cobalt / White | Space Grotesk / Mono | High-density grid overlays, precise measurement ticks, clean laboratory slate. |
| `neumorphic-glass` | Purple / Crystal / Translucent | Inter / Plus Jakarta | Soft refractive drop shadows, high backdrop-blur, liquid glass depth. |
| `mechanical-tactile` | Amber / Industrial Dark | IBM Plex Mono | Switchgear bevels, tactile relay buttons, heavy physical toggle switches. |
| `brutalist-grid` | Red / High-Contrast Black | Monospace Bold | 2px solid black borders, zero border radius, high-density raw layout grids. |
| `editorial-serif` | Burgundy / Warm Ivory | Playfair Display / Serif | Serif display typography, archival paper textures, generous negative space. |
| `minimal-monastic` | Graphite / Pure Zinc | Inter / Neue Haas | Zen minimalism, ultra-subtle 1px hairlines, zero visual clutter. |
| `biomorphic-organic` | Emerald / Canopy / Dark Moss | Plus Jakarta Sans | Organic fluid curves, leafy canopy gradients, soft natural motion. |
| `retro-computing` | Phosphor Green P1 / Dark CRT | Courier / Monospace | Scanlines, CRT phosphor glow, retro terminal command layouts. |
| `ai-character` | Electric Indigo / Violet | Plus Jakarta Sans | Interactive companion mascot, emotional facial expressions, orbital spinners. |

---

## 3. Performance Tier Governor & Idle Safeguard

The library includes an adaptive **Performance Tier Governor** (`/src/design-system/performance/PerformanceContext.tsx`):

- **Tier 3 (High Performance)**: Full 60 FPS rendering, liquid glass blur filters (`backdrop-blur-2xl`), particle constellations, 3D CSS perspective transforms, and polyphonic audio chimes.
- **Tier 2 (Balanced Performance)**: Standard CSS transitions, simplified drop shadows, reduced particle density, and mono audio chimes.
- **Tier 1 (Low Power / Saver)**: Completely disables heavy backdrop blurs, strips continuous CSS 3D rotations, converts 3D cards into clean 2D flat slates, and stops particle simulation loops.
- **Loop Idle Protection**: Automatically halts idle continuous animation loops after **10 seconds** of user inactivity or browser tab blur, preserving CPU/GPU resources and battery life.

---

## 4. 10-Vector Formal Curation Matrix

Every catalog candidate is formally evaluated and scored across 10 quality vectors:

1. **Visual Quality (0-100)**: Contrast balance, typographic rhythm, mathematical border radius alignment.
2. **UX Clarity (0-100)**: Intuitive affordances, clear hierarchy, zero ambiguous controls.
3. **Interaction Quality (0-100)**: Immediate press feedback, smooth hover states, gesture ergonomics.
4. **Animation Quality (0-100)**: Fluid spring easing, zero frame drops, natural momentum.
5. **Sensory Layer (0-100)**: Procedural Web Audio chimes and navigator vibration feedback.
6. **Accessibility (WCAG AAA) (0-100)**: Keyboard navigation, 7:1+ contrast, visible focus rings, ARIA roles.
7. **Responsive Ergonomics (0-100)**: Fluid layout scaling across 7 device viewports (44px+ touch targets).
8. **Performance Tier (0-100)**: Memory cleanup, zero memory leaks, idle governor protection.
9. **Code Quality (0-100)**: Clean TypeScript interfaces, zero console errors, modular imports.
10. **Reuse Quality (0-100)**: Zero hardcoded secrets, portable code artifacts, clean export API.
