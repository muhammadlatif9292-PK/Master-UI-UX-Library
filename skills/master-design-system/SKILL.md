---
name: master-design-system
description: Complete architectural reference and code generation skill for the Master UI/UX Library. Use when generating, customizing, or consuming components, recipes, tokens, sound, haptics, motion, accessibility layers, or natural language design requests like 'Use the Master UI/UX Library's Cinematic Liquid Glass Login'.
---

# Master UI/UX Design System Skill & AI Coding Manual

This skill enables AI coding agents to precisely understand, assemble, and render components from the **Master UI/UX Library**.

## 1. Quick Resolution: Common User Prompts to Code

When a user provides natural language instructions referring to the Master UI/UX Library, map directly to the corresponding component architectures:

### "Use the Master UI/UX Library's Cinematic Liquid Glass Login"
- **Target Component**: `CinematicMascotAuth` (from `src/components/auth/AuthVariantPreview.tsx` / `authRegistry.ts`)
- **Key Archetypes**: `cinematic-dark`, `neumorphic-glass`, `ai-character`
- **Visuals**: `bg-zinc-950/80 backdrop-blur-2xl border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.2)]`
- **Companion Mascot Reaction**:
  - `idle`: Gentle breathing pulse (`🐱`)
  - `username-focus`: Attentive lean (`👀`)
  - `username-typing`: Energetic writing cadence (`✍️`)
  - `password-focus`: Hands covering eyes (`🫣`)
  - `password-visible`: Peeking through fingers (`👀`)
  - `submitting`: Orbital spin spinner (`💫`)
  - `success`: Joyful jump celebration with polyphonic C-E-G chime (`🥳`)
  - `error`: Head shake with dual-tone dissonance (`🤖`)
- **Sensory & Haptics**: Procedural 440Hz press audio, C5-E5-G5 success triad, `[15, 40, 25]` ms vibration.

---

## 2. The 12 Design Archetypes Matrix

| Archetype | Mood | Primary Surface | Title Font | Accent Color |
|---|---|---|---|---|
| `restrained-luxury` | Opulent, 24k Gold | `bg-[#121215]/80 backdrop-blur-xl` | Playfair Display | `#D4AF37` (Gold) |
| `cinematic-dark` | Deep Space, Cyan | `bg-[#0D0E15]/90 backdrop-blur-2xl` | Outfit | `#38BDF8` (Cyan) |
| `futuristic-cyber` | HUD, Tactical | `bg-[#090D16]/95 backdrop-blur-md` | Share Tech Mono | `#22D3EE` (Terminal Cyan) |
| `scientific-lab` | Rigorous, Sterile | `bg-white border-slate-200` | Inter | `#2563EB` (Cobalt) |
| `neumorphic-glass` | Translucent Liquid | `bg-white/10 backdrop-blur-2xl` | Outfit | `#C084FC` (Purple) |
| `mechanical-tactile` | Industrial Switchgear | `bg-[#27272A] border-t-zinc-600` | Space Grotesk | `#F59E0B` (Amber) |
| `brutalist-grid` | Raw Monospace | `bg-white border-2 border-black` | Syne | `#E11D48` (Rose) |
| `editorial-serif` | Archival Journal | `bg-[#F3EFEA] border-[#E5DFD7]` | Playfair Display | `#991B1B` (Burgundy) |
| `minimal-monastic` | Zen Graphite | `bg-[#181818] border-zinc-800` | Plus Jakarta Sans | `#D4D4D8` (Muted Zinc) |
| `biomorphic-organic` | Forest Canopy | `bg-[#13231B]/90 backdrop-blur-xl` | Outfit | `#10B981` (Emerald) |
| `retro-computing` | CRT Phosphor P1 | `bg-[#161B22] border-green-500/40` | VT323 / Mono | `#4ADE80` (Phosphor Green)|
| `ai-character` | Companion Glass | `bg-white/10 backdrop-blur-2xl` | Outfit | `#818CF8` (Indigo) |

---

## 3. Recipe-Driven Component Construction

To create or adapt any UI component, assemble it using the recipe pattern:

```typescript
import { createStyleRecipeFromArchetype, STANDARD_MOTION_RECIPES, STANDARD_SENSORY_RECIPES } from '../../design-system/recipes/recipeEngine';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';

export function ExampleCard() {
  const recipe = createStyleRecipeFromArchetype('card-example', 'Luxury Card', 'restrained-luxury');
  const motion = STANDARD_MOTION_RECIPES.luxuryFluid;
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const handleAction = () => {
    playSound('press', 'MICRO');
    triggerHaptic('press');
  };

  return (
    <div className={recipe.wrapperClasses}>
      <div className={recipe.surfaceClasses}>
        <h3 className={recipe.typography.titleClasses}>Curated Collection</h3>
        <p className={recipe.typography.bodyClasses}>Engineered with precision.</p>
        <button onClick={handleAction} className={recipe.buttonClasses.primary}>
          Execute Action
        </button>
      </div>
    </div>
  );
}
```

---

## 4. Mandatory Quality & Accessibility Checkpoints

1. **State Machine Completeness**: Implement all relevant states (`idle`, `hover`, `focus`, `submitting`, `success`, `error`, `disabled`).
2. **Touch Targets**: All clickable targets must have `min-h-[44px]` and `min-w-[44px]` on mobile.
3. **Reduced Motion**: Disables spring transforms when `prefers-reduced-motion` is active.
4. **Performance Governor**: Respect Performance Tiers 1-3 and activate Loop Idle Protection after 10s of inactivity.
5. **Labels & Chips**: Never wrap or truncate button text onto multiple lines (`whitespace-nowrap`).
6. **Provenance**: Maintain SPDX 2.3 licensing metadata headers.
