# Master UI/UX Library: Gemini AI Agent Guidelines

This file is automatically ingested into the context of Google Gemini AI models working on this project.

## Core Directives for Gemini:

1. **Recognize Natural Language Component Intent**:
   - `"Use the Master UI/UX Library's Cinematic Liquid Glass Login"` $\rightarrow$ Implement `CinematicMascotAuth` (`auth-cinematic-mascot`) with `cinematic-dark` / `neumorphic-glass` tokens, 8-state interactive companion mascot (`idle`, `username-focus`, `username-typing`, `password-focus`, `password-visible`, `submitting`, `success`, `error`), procedural audio synthesis, and WCAG AAA compliance.
   - For all other archetypal components, refer to `/docs/COMPONENTS_AND_CATALOG.md` and `/docs/AI_HANDOFF_FORMAT.md`.

2. **Always Use Established Token Presets**:
   - Use `ARCHETYPE_TOKENS` from `src/design-system/tokens.ts`.
   - Never generate random inline styles or arbitrary purple/cyan gradient text.
   - Apply the mathematical border radius formula: $\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$.

3. **Incorporate Motion & Sensory Layer**:
   - Import `motion` from `motion/react`.
   - Integrate `useSound()` from `src/design-system/sound/SoundContext`.
   - Integrate `useHaptics()` from `src/design-system/haptics/HapticContext`.

4. **Reference Files**:
   - Skill Reference: `/skills/master-design-system/SKILL.md`
   - Complete Docs: `/docs/`
   - Architecture & Recipes: `src/design-system/recipes/recipeEngine.ts`
