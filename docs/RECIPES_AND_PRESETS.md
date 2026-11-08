# Master UI/UX Design System: Recipes & Presets Reference

This document defines the recipe-based architecture used to assemble new visual styles without duplicating component business logic.

---

## 1. Recipe Architecture

The Master UI/UX Library decouples components into three recipe contracts:
1. `StyleRecipe`: Declarative Tailwind class maps, surface lighting parameters, and typography classes.
2. `MotionRecipe`: Spring physics constants, easing curves, scale factors, and entrance animations.
3. `InteractionRecipe`: Sensory feedback specifications (Web Audio sound profiles and Navigator Vibration haptic arrays).

---

## 2. Style Recipe Interface & Generation

```typescript
import { DesignArchetype } from '../types/architecture';

export interface StyleRecipe {
  id: string;
  name: string;
  archetype: DesignArchetype;
  wrapperClasses: string;
  surfaceClasses: string;
  lighting: {
    specularHighlight: boolean;
    ambientGlow: string;
    shadowDepth: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'cinematic' | 'brutalist';
    blurLevel: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'backdrop-xl';
  };
  borderClasses: string;
  typography: {
    fontFamily: string;
    titleClasses: string;
    bodyClasses: string;
    labelClasses: string;
    monoClasses: string;
  };
  inputClasses: {
    base: string;
    focus: string;
    error: string;
    success: string;
    placeholder: string;
  };
  buttonClasses: {
    primary: string;
    secondary: string;
    ghost: string;
  };
  badgeClasses: string;
  customDecorations?: string;
}
```

### Factory Helper: `createStyleRecipeFromArchetype()`
```typescript
import { createStyleRecipeFromArchetype } from '../design-system/recipes/recipeEngine';

export const myCustomLoginRecipe = createStyleRecipeFromArchetype(
  'login-bespoke-cyber',
  'Bespoke Cyber Login',
  'futuristic-cyber',
  {
    wrapperClasses: 'w-full max-w-lg p-10 bg-slate-950 border border-cyan-500/40 shadow-2xl rounded-3xl',
  }
);
```

---

## 3. Standard Motion Presets (`STANDARD_MOTION_RECIPES`)

```typescript
export const STANDARD_MOTION_RECIPES = {
  // 1. Smooth Organic Spring (Default)
  smoothSpring: {
    id: 'motion-smooth-spring',
    name: 'Smooth Organic Spring',
    spring: { stiffness: 300, damping: 25, mass: 1 },
    transitions: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    hoverScale: 1.02,
    tapScale: 0.97,
    layoutAnimation: true,
    entranceAnimation: 'slide-up',
  },

  // 2. Cyber HUD Snap (High Frequency, Fast)
  cyberGlitch: {
    id: 'motion-cyber-glitch',
    name: 'Cyber HUD Snap',
    spring: { stiffness: 500, damping: 15, mass: 0.5 },
    transitions: { duration: 0.15, ease: 'easeOut' },
    hoverScale: 1.04,
    tapScale: 0.95,
    layoutAnimation: true,
    entranceAnimation: 'glitch',
  },

  // 3. Restrained Luxury Glide (Heavy, Elegant)
  luxuryFluid: {
    id: 'motion-luxury-fluid',
    name: 'Restrained Luxury Glide',
    spring: { stiffness: 180, damping: 30, mass: 1.2 },
    transitions: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    hoverScale: 1.01,
    tapScale: 0.99,
    layoutAnimation: true,
    entranceAnimation: 'luxury-wipe',
  },
};
```

---

## 4. Standard Sensory Presets (`STANDARD_SENSORY_RECIPES`)

```typescript
export const STANDARD_SENSORY_RECIPES = {
  // Glass Tap & Light Haptic
  subtleGlass: {
    sound: { enabled: true, soundType: 'glass-tap', volume: 0.2 },
    haptic: { enabled: true, pattern: [10], intensity: 'light' },
  },

  // Tactical Cyber Beep & Crisp Pulse
  tacticalCyber: {
    sound: { enabled: true, soundType: 'laser-beep', volume: 0.35 },
    haptic: { enabled: true, pattern: [25, 40, 25], intensity: 'medium' },
  },

  // Deep Resonance & Luxury Weight
  luxuryResonance: {
    sound: { enabled: true, soundType: 'deep-chime', volume: 0.25 },
    haptic: { enabled: true, pattern: [35], intensity: 'heavy' },
  },
};
```
