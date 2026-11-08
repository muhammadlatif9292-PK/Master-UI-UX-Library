# Master UI/UX Library

> **The Definitive Design System, Interactive Component Engine, and AI Studio Handoff Suite for Production Web Applications.**

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC.svg)](https://tailwindcss.com/)
[![WCAG](https://img.shields.io/badge/WCAG-2.2_AAA-emerald.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)

The **Master UI/UX Library** is a production-grade, state-driven design system and component architecture. It bridges human design craftsmanship and AI agent code generation by pairing **12 Design Archetypes**, **18 Component Suites (300+ Specimens)**, **Procedural Web Audio Sound Synthesis**, **Navigator Vibration Haptics**, **10-Vector Formal Curation Engine**, **7-Device Responsive Ergonomics**, **Tier 1-3 Performance Governor**, and **SPDX 2.3 Asset Provenance**.

---

## 🎯 The Core Mental Model

The library is designed around one intuitive flow:

$$\mathbf{FIND} \longrightarrow \mathbf{TRY} \longrightarrow \mathbf{CHOOSE} \longrightarrow \mathbf{CUSTOMIZE} \longrightarrow \mathbf{SAVE} \longrightarrow \mathbf{CODE\ /\ AI\ HANDOFF}$$

### Universal Progression:
- **Beginner**: Explore the catalog, search in plain language, try live interaction states, and copy ready-to-use React code or Gemini AI prompts.
- **Intermediate**: Customize design recipes, test 7 responsive device viewports, compare specimens side-by-side, and save favorites to project sets.
- **Advanced**: Fine-tune 24 spring motion physics, procedural Web Audio frequencies, tactile haptics, and verify WCAG 2.2 AAA accessibility contrast.
- **Grandmaster**: Inspect runtime event telemetry, explore algorithmic variant scaling (52+ permutations), audit SPDX 2.3 licensing provenance, and review 10-vector curator scorecards.

---

## 🗺️ Application Architecture: The 5 Primary Destinations

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   TOP BAR CONTROLS                                     │
│  [Logo/Identity]  [⌘K Search Trigger]  [Audio Synth: On/Off/Vol]  [Haptics]  [Rail]    │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
   ┌────────────────┬───────────────────────┼───────────────────────┬────────────────────┐
   ▼                ▼                       ▼                       ▼                    ▼
[ 1. HOME ]    [ 2. EXPLORE ]         [ 3. CUSTOMIZE ]       [ 4. COLLECTIONS ]    [ 5. LABS ]
- Value Pitch  - 18 Suites Hub        - Visual Mixer         - Starred Library     - 4 Goal Groups:
- 5-Step Flow  - Multi-Token Search   - 12 Archetypes        - Project Sets          • Tune (6)
- AI Prompts   - 5D Specimen Modal    - Motion & Sensory     - Side-by-Side          • Understand (3)
- Direct CTAs  - Live Filter Matrix   - Dynamic Export       - Diff Matrix           • Create (2)
                                                                                     • Curate/Export (3)
```

1. **`HOME`**: The intent and onboarding command center with live system telemetry ribbons, a 5-step workflow guide, and instant 1-click "Just Ask Gemini" AI prompt triggers.
2. **`EXPLORE`**: The discovery hub covering 18 component families with multi-token fuzzy search, Grid/Table views, and the full-screen 5D Specimen Preview Canvas (`ComponentPreviewEngine.tsx`).
3. **`CUSTOMIZE`**: The interactive visual recipe composer (`ExperienceComposerLab.tsx`) allowing real-time mixing of tokens, motion physics, procedural audio, and haptics.
4. **`COLLECTIONS`**: Starred items, categorized project boards with developer notes, and the 2-4 specimen Side-by-Side Comparison Matrix.
5. **`LABS`**: 14 developer diagnostic utilities organized into 4 goals: **Tune**, **Understand**, **Create**, and **Curate & Export**.

---

## 📖 End-to-End Workflow: Using This Library in a Future App

When building a new application using the Master UI/UX Library, follow this streamlined process:

1. **FIND COMPONENT**:
   - Open **Explore** or press `Cmd + K` to launch the Omnibar Command Palette. Search by component type, visual style, or natural phrase (*e.g. "cinematic liquid glass login"*, *"minimal dark card"*).

2. **TEST 5D INTERACTION STATES**:
   - Open the specimen in the **5D Preview Canvas** to test live states: `idle`, `hover`, `focus`, `typing`, `active/pressed`, `submitting/loading`, `success`, `error`, and `disabled`.

3. **CUSTOMIZE DESIGN RECIPE**:
   - Mix design tokens across the 12 archetypes, tune 24-spring motion curves, and configure optional procedural audio and vibration profiles in the **Composer**.

4. **VERIFY ACCESSIBILITY & RESPONSIVENESS**:
   - Check WCAG 2.2 AAA contrast (7:1+), keyboard focus rings, screen reader semantics, and 7 responsive device viewports in the **Labs**.

5. **EXPORT CODE OR AI PROMPT**:
   - Switch to the Code / AI Handoff view to copy self-contained TypeScript/React components, Tailwind utility classes, or structured AI prompt briefs for Gemini / Claude.

---

## 🛠️ Repository & Architecture Map

```
src/
├── design-system/
│   ├── tokens.ts                   # 12 Design Archetypes & Color Tokens
│   ├── recipes/
│   │   └── recipeEngine.ts         # Style Recipes & 24 Motion Spring Presets
│   ├── sound/
│   │   └── SoundContext.tsx        # Procedural Web Audio Sound Synthesizer
│   ├── haptics/
│   │   └── HapticContext.tsx       # Navigator Vibration API Engine
│   ├── accessibility/
│   │   └── AccessibilityContext.tsx# 12-Vector WCAG 2.2 AAA Audit Engine
│   ├── performance/
│   │   └── PerformanceContext.tsx  # Tier 1-3 Performance Governor & Loop Idle Auto-Sleep
│   ├── provenance/
│   │   └── ProvenanceContext.tsx   # SPDX 2.3 & Asset Licensing Tracker
│   └── catalog/
│       ├── catalogRegistry.ts      # Master Catalog Registry Index
│       ├── variantScalingEngine.ts # 11-Dimensional Scaling Engine (52+ Permutations)
│       └── catalogTypes.ts         # TypeScript Interfaces & Schemas
├── components/
│   ├── MasterLibraryApp.tsx        # Top-Level Application Shell & 5-Destination Router
│   ├── HomeCommandCenter.tsx       # Home Destination & Gemini Prompt Cards
│   ├── ComponentPreviewEngine.tsx  # 5D State Canvas & Specimen Modal
│   ├── explore/
│   │   └── ExploreHub.tsx          # 18 Component Suites Discovery Hub
│   ├── composer/
│   │   └── ExperienceComposerLab.tsx# Visual Recipe Mixer & Token Composer
│   ├── collections/
│   │   └── CollectionsHub.tsx      # Favorites, Project Boards & Comparison Matrix
│   ├── labs/
│   │   └── LabsHub.tsx             # 14 Diagnostic & Developer Tuning Labs
│   ├── shell/
│   │   ├── CommandPaletteModal.tsx # Omnibar Search Modal (⌘K / /)
│   │   └── InspectorToolRail.tsx   # Slide-Out Live Telemetry Rail (⌘B)
│   ├── auth/                       # Flagship Auth & Reactive Mascot Portals
│   ├── navigation/                 # Fluid & Minimal Navigation Bars
│   ├── dashboard/                  # Bento Grids & Analytical HUDs
│   ├── character/                  # Interactive AI Companions & Mascots
│   ├── spatial/                    # 3D Spatial Holographic Cards
│   ├── scientific/                 # Spectrometers & Node Telemetry Canvas
│   ├── workflow/                   # Node Graph Visualizer & State Engines
│   └── export/
│       └── ReuseExportStudio.tsx   # React Code & AI Handoff Exporter
docs/
├── MASTER_OPERATING_STATE.md       # Master State & Architectural Baselines
├── OPERATING_MANUAL.md             # Complete User & Developer Manual
├── UX_PRINCIPLES.md                # Design System Laws & Geometric Rules
├── NAVIGATION_MAP.md               # Information Architecture & Route Specs
├── CATALOG_ENTRY_CONTRACT.md       # Data Schemas & 10-Vector Quality Gate
├── TOKENS_AND_THEMES.md            # Token Presets & Archetype Definitions
└── SENSORY_AND_MOTION.md           # Sound Frequencies & Spring Physics Specs
```

---

## ⚡ Quick Start & Verification

```bash
# Install dependencies
npm install

# Launch development server on http://localhost:3000
npm run dev

# Run TypeScript linter
npm run lint

# Build production bundle
npm run build
```

---

## 📄 License & Attribution

Distributed under the **Apache 2.0 License**. See `LICENSE` for full terms. Third-party assets (Lucide React, Motion, Web Audio API) are credited under their respective open licenses in `docs/` and the Provenance Registry.
