# Master UI/UX Design System: AI Agent Master Specification

This document is the master architectural and operational guide for AI coding agents building, modifying, or integrating interfaces using the **Master UI/UX Library**.

---

## 1. System Overview & Core Philosophy

The **Master UI/UX Library** is a multi-archetype, enterprise-grade design system built in React 18, TypeScript, Tailwind CSS, and Framer Motion (`motion/react`). It incorporates procedural Web Audio acoustic feedback, Navigator Vibration haptics, a 12-vector WCAG 2.2 AAA accessibility validation suite, a 7-device responsive testing simulator, and a Tiers 1–3 Performance Governor with Loop Idle Protection.

### The Golden Rule: Separation of Behavior from Presentation
Component logic (form state machines, keyboard navigation, validation routines, event bus emissions) is **strictly decoupled** from presentation:
1. **Headless State & Behavior**: Encapsulates state transitions, focus management, ARIA landmarks, and accessibility compliance.
2. **Visual Recipe (StyleRecipe)**: Encapsulates Tailwind utility class sequences, surface lighting, specular highlights, border gradients, and typography pairings.
3. **Motion Recipe (MotionRecipe)**: Encapsulates spring physics (`stiffness`, `damping`, `mass`), easing arrays, and entrance/exit choreographies.
4. **Sensory Recipe (InteractionRecipe)**: Encapsulates procedural Web Audio frequency spectra and tactile vibration millisecond sequences.
5. **Performance & Device Guard**: Adapts rendering complexity across Tier 1 (Low), Tier 2 (Standard), and Tier 3 (High) environments.

---

## 2. Natural Language AI Prompt Mapping

When a user requests a specific component pattern, map their query directly to the following canonical catalog entries:

| Natural Language Request | Target Catalog ID | Component / Recipe | Key Archetype | Sensory / Motion Profile |
|---|---|---|---|---|
| **"Use the Master UI/UX Library's Cinematic Liquid Glass Login"** | `auth-cinematic-mascot` | `CinematicMascotAuth` / `AuthVariantPreview` | `cinematic-dark` + `neumorphic-glass` | `Spring Mascot Reactions`, `Procedural Chime & Ticks`, multi-pulse haptic |
| **"Obsidian Luxury Auth / Gold Login"** | `auth-obsidian-luxury` | `ObsidianLuxuryAuth` | `restrained-luxury` | `Deep Resonance`, `Heavy Crisp`, gold border foil |
| **"Aurora Glass Login / Northern Lights Auth"** | `auth-aurora-glass` | `AuroraGlassAuth` | `cinematic-dark` | `Ambient Synth Chime`, `Fluid Mesh Drift` |
| **"Cyberpunk HUD Card / Cyber Glitch"** | `card-cyber-hud` | `CyberHudCard` | `futuristic-cyber` | `Cyber Glitch Snap`, `Laser Beep`, `Sharp Pulse` |
| **"Scientific Lab Workspace / Data Node"** | `scientific-node-editor` | `ScientificNodeGraph` | `scientific-lab` | `Subtle Glass Click`, `Spring Smooth` |
| **"Obsidian Precision Slider / Stepper"** | `control-obsidian-slider` | `ObsidianSlider` | `restrained-luxury` | `Subtle Tick`, `Micro Click` |
| **"Spatial 3D Tilt Card / Holographic HUD"** | `spatial-holo-cube` | `SpatialHoloCard` | `futuristic-cyber` | 3D Perspective Tilt, rim lighting, 60fps GPU acceleration |
| **"AI Cognitive Stream / Neural Dialogue"** | `ai-cognitive-stream` | `AiCognitiveStream` | `cinematic-dark` | Real-time token streaming, particle wave, markdown render |

---

## 3. Directory & File Reference

```
/
├── AGENTS.md                               # System instructions for AI coding agents
├── GEMINI.md                               # AI Studio Gemini system instructions
├── skills/
│   └── master-design-system/
│       └── SKILL.md                        # Formal AI Studio Skill definition
├── docs/
│   ├── DESIGN_SYSTEM_GUIDE.md              # This overview
│   ├── TOKENS_AND_THEMES.md                # 12 Design Archetypes & complete token matrix
│   ├── COMPONENTS_AND_CATALOG.md           # All 16+ component families and props APIs
│   ├── RECIPES_AND_PRESETS.md              # Style, Motion, and Sensory Recipe engines
│   ├── SENSORY_AND_MOTION.md               # Web Audio synth frequencies & Haptics specs
│   ├── ACCESSIBILITY_AND_RESPONSIVE.md     # 12-vector WCAG 2.2 AAA & 7 Viewports
│   ├── PERFORMANCE_TIERS.md                # Tiers 1-3 Governor & Loop Idle Protection
│   ├── AI_HANDOFF_FORMAT.md                # Machine-readable specs & prompt translation
│   └── ANTI_PATTERNS_AND_CRITERIA.md       # Banned clichés, math radius, QA criteria
└── src/
    ├── design-system/
    │   ├── tokens.ts                       # ARCHETYPE_TOKENS dictionary
    │   ├── tokens/                         # ThemeContext & token utilities
    │   ├── recipes/recipeEngine.ts         # StyleRecipe & motion helper factories
    │   ├── sound/                          # Procedural Web Audio synthesizer
    │   ├── haptics/                        # Navigator Vibration API provider
    │   ├── accessibility/                  # 12-vector AccessibilityContext & WCAG auditor
    │   ├── performance/                    # Performance Tiers Governor & Loop Idle Guard
    │   ├── provenance/                     # Asset Provenance & License Registry (SPDX 2.3)
    │   └── catalog/                        # 16 component family registries & metadata
    ├── components/                         # React UI implementations & Sandbox engines
    └── types/architecture.ts               # Core TypeScript interfaces & schemas
```

---

## 4. Key Rules for Future AI Coding Agents

1. **Never Invent Ad-hoc Styles**: Always pull color classes, font families, and border rules from `ARCHETYPE_TOKENS` or `createStyleRecipeFromArchetype()`.
2. **Always Implement Interactive States**: Every interactive component must handle `idle`, `hover`, `focus`, `active`, `submitting`, `success`, `error`, and `disabled`.
3. **Respect Reduced Motion & Accessibility**: Always check `useAccessibility()` or `prefers-reduced-motion` before firing animated springs or looping particle shaders.
4. **Enforce Touch Target Minimums**: All clickable controls must be at least `44px` by `44px` on mobile/touch viewports (`min-h-[44px] min-w-[44px]`).
5. **Pass WCAG AA/AAA Contrast**: Ensure text has ≥4.5:1 contrast against light/dark background surfaces.
6. **Include SPDX Provenance**: When creating or exporting components, attach standard JSDoc provenance headers with license, origin, author, and version.
