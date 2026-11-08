# Master UI/UX Design System Library — Canonical Architecture Map

This document establishes the single authoritative contract for every core design-system concern in the library to prevent architecture drift.

---

## 1. Canonical System Contracts

| Design System Concern | Authoritative Source / Contract File | Key Exports / APIs | Responsibility |
| :--- | :--- | :--- | :--- |
| **Style Recipes** | `/src/design-system/recipes/recipeEngine.ts` | `createStyleRecipeFromArchetype()`, `StyleRecipe` | Data/recipe-driven styling based on Archetype Token Palettes. Enforces the nested border radius formula: $\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$. |
| **Archetype Tokens** | `/src/design-system/tokens.ts` | `ARCHETYPE_TOKENS`, `ArchetypeTokenPalette` | 12 Design Archetypes (`restrained-luxury`, `cinematic-dark`, `futuristic-cyber`, `scientific-lab`, `neumorphic-glass`, `mechanical-tactile`, `brutalist-grid`, `editorial-serif`, `minimal-monastic`, `biomorphic-organic`, `retro-computing`, `ai-character`). |
| **Core Tokens** | `/src/design-system/tokens/coreTokens.ts` | `SPACING`, `RADII`, `BORDERS`, `SHADOWS`, `BLURS` | Primitive atomic token constants (spacing scales, border widths, elevation indices). |
| **Theme System** | `/src/design-system/tokens/ThemeContext.tsx` | `ThemeProvider`, `useTheme()`, `ThemeMode` | Dynamic runtime light/dark theme context and palette provider. |
| **Motion System** | `/src/design-system/recipes/recipeEngine.ts` & `/src/design-system/motion/motionSystem.ts` | `STANDARD_MOTION_RECIPES`, `SPRING_PRESETS`, `EASINGS`, `useMotion()` | Centralized Framer Motion spring physics presets and reduced-motion fallback controls (`MotionContext.tsx`). |
| **Sound System** | `/src/design-system/sound/soundEngine.ts` & `SoundContext.tsx` | `proceduralSoundEngine`, `useSound()`, `SoundKey`, `SoundCategory` | Single authoritative Web Audio procedural synthesizer engine. Zero external `.mp3`/`.wav` network assets. |
| **Haptic System** | `/src/design-system/haptics/hapticEngine.ts` & `HapticContext.tsx` | `hapticEngine`, `useHaptics()`, `HapticPatternKey` | Abstracted Navigator Vibration API haptic dispatcher (`MICRO`, `SELECTION`, `SUCCESS`, `ERROR`, `DRAG`). |
| **Catalog Metadata** | `/src/design-system/catalog/catalogTypes.ts` | `CatalogEntry`, `ComponentFamily`, `PerformanceTier`, `AccessibilityLevel` | Typed catalog entry metadata interface tracking code artifacts, AI specifications, provenance, and license details. |
| **Catalog Registries** | `/src/design-system/catalog/catalogRegistry.ts` | `CATALOG_REGISTRY` | Single aggregated catalog data source containing all 317 catalog items. |
| **Component Variant Manager** | `/src/registry/componentRegistry.ts` | `componentRegistry`, `ComponentRegistryManager` | Object-oriented manager for querying component definitions and variant recipes by family ID. |
| **Export Logic** | `/src/design-system/export/exportEngine.ts` & `ReuseExportStudio.tsx` | `generateExportArtifacts()` | Multi-target code artifact generator (React 18 TSX, Vue 3 SFC, Web Components, HTML5/Tailwind, Design Tokens JSON). |
| **AI Handoff Logic** | `/src/components/export/AiHandoffGenerator.tsx` | `AiHandoffGenerator` | Formatted prompt specification generator for Gemini, Antigravity, Claude, and ChatGPT models. |
| **Semantic Event Bus** | `/src/design-system/events/ExperienceEventContext.tsx` | `useExperienceEvents()`, `ExperienceEvent` | Global event queue for logging UI interactions, telemetry, and cross-component signals. |
| **Performance Governor** | `/src/design-system/performance/PerformanceContext.tsx` | `usePerformance()`, `PerformanceTier` | Tier 1–3 telemetry governor with FPS monitoring, dropped-frame detection, and **Loop Idle Protection**. |
| **Accessibility Auditor** | `/src/design-system/accessibility/AccessibilityContext.tsx` | `useAccessibility()`, `a11yValidator.ts` | 12-vector WCAG 2.2 AAA accessibility context, focus ring styles, and contrast ratio validation. |

---

## 2. Architecture Consolidation Safeguards

1. **Audio Single Source of Truth**: All procedural audio calls pass through `proceduralSoundEngine` (`src/design-system/sound/soundEngine.ts`) via `useSound()`. Legacy/secondary helper classes (`audioEngine.ts`) delegate directly to `proceduralSoundEngine`.
2. **Haptic Single Source of Truth**: All tactile vibration calls pass through `hapticEngine` (`src/design-system/haptics/hapticEngine.ts`) via `useHaptics()`.
3. **Recipe-Driven Styling**: Component files MUST NOT write inline style objects for colors, shadows, or borders; they MUST consume tokens from `ARCHETYPE_TOKENS` or use `createStyleRecipeFromArchetype()`.
4. **Metadata Typing**: Every new entry added to the design system MUST conform to `CatalogEntry` in `/src/design-system/catalog/catalogTypes.ts`.
