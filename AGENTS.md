# Master UI/UX Library: AI Coding Agent Instructions & System Contract

This project contains the **Master UI/UX Library**, a comprehensive design system featuring 12 Design Archetypes, 16+ Component Families, Procedural Web Audio Sound Synthesis, Navigator Vibration Haptics, 12-Vector WCAG 2.2 AAA Accessibility Validation, 7-Device Responsive Simulation, Performance Tiers 1-3 Governor with Loop Idle Protection, and SPDX 2.3 Asset Provenance.

---

## 1. Natural Language Intent & Prompt Mapping

When asked to use or build specific design system components, map user phrases directly to canonical components:

- **"Use the Master UI/UX Library's Cinematic Liquid Glass Login"**
  - **Component**: `CinematicMascotAuth` (see `src/components/auth/AuthVariantPreview.tsx` / `authRegistry.ts` item `auth-cinematic-mascot`)
  - **Archetype**: `cinematic-dark` / `neumorphic-glass` / `ai-character`
  - **Visual Surface**: `bg-zinc-950/80 backdrop-blur-2xl border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.2)]`
  - **Mascot Reactivity Engine**:
    - `idle`: Gentle breathing pulse (`🐱`)
    - `username-focus`: Attentive lean (`👀`)
    - `username-typing`: Interactive writing motion (`✍️`)
    - `password-focus`: Hands covering eyes (`🫣`)
    - `password-visible`: Peeking through fingers (`👀`)
    - `submitting`: Orbital spin spinner (`💫`)
    - `success`: Joyful jump celebration with polyphonic C-E-G chime (`🥳`)
    - `error`: Head shake with dual-tone dissonance (`🤖`)
  - **Audio & Haptics**: Procedural 440Hz press tone, ascending C5-E5-G5 success triad, `[15ms, 40ms, 25ms]` vibration pattern.
  - **Accessibility**: WCAG AAA 14.5:1 contrast, explicit ARIA attributes, visible indigo focus ring.

- **"Obsidian Luxury Auth / Gold Login"** $\rightarrow$ `auth-obsidian-luxury` (`ObsidianLuxuryAuth`, `restrained-luxury` archetype, 24k gold borders, serif headings).
- **"Aurora Glass Login / Northern Lights Auth"** $\rightarrow$ `auth-aurora-glass` (`AuroraGlassAuth`, dynamic northern lights mesh gradient backdrop).
- **"Cyberpunk HUD Card / Cyber Glitch"** $\rightarrow$ `card-cyber-hud` (`CyberHudCard`, `futuristic-cyber` archetype, corner bracket notches, scanline effects).
- **"Scientific Node Graph / Node Editor"** $\rightarrow$ `scientific-node-editor` (`scientific-lab` archetype, clean sterile slate, cobalt accents).
- **"Spatial 3D Holographic Card"** $\rightarrow$ `spatial-holo-cube` (`spatial` family, 3D perspective tilt, GPU accelerated).

---

## 2. Architectural Rules & Recipes

1. **Separation of Behavior and Presentation**: Never duplicate component logic for visual variations. Use `createStyleRecipeFromArchetype()` and `STANDARD_MOTION_RECIPES` from `src/design-system/recipes/recipeEngine.ts`.
2. **The 12 Design Archetypes**:
   - `restrained-luxury` (Obsidian / Gold / Serif)
   - `cinematic-dark` (Cosmic / Slate / Cyan)
   - `futuristic-cyber` (HUD / Terminal / Monospace)
   - `scientific-lab` (Clean / Sterile / Cobalt)
   - `neumorphic-glass` (Refractive / Translucent / Purple)
   - `mechanical-tactile` (Switchgear / Industrial / Amber)
   - `brutalist-grid` (Monospace / High Density / Red)
   - `editorial-serif` (Archival / Warm / Burgundy)
   - `minimal-monastic` (Zen / Graphite / Zinc)
   - `biomorphic-organic` (Canopy / Botanical / Emerald)
   - `retro-computing` (CRT / Phosphor P1 / Green)
   - `ai-character` (Companion / Emotion / Indigo)
3. **Accessibility**: Pass all 12 vectors in `src/design-system/accessibility/`. Ensure touch targets $\ge 44\text{px}$, visible focus rings, and reduced-motion fallback.
4. **Sensory Feedback**: Use `useSound()` from `src/design-system/sound/` and `useHaptics()` from `src/design-system/haptics/`.
5. **Performance Governor**: Ensure zero infinite animation loops run while idle (Loop Idle Protection triggers at 10s inactivity).
6. **Detailed Documentation**: Consult `/docs/` for deep dive specs on tokens, components, recipes, accessibility, motion, and anti-patterns.
