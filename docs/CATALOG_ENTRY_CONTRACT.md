# Master UI/UX Library — Catalog Entry Contract & Data Schema

This document specifies the strict schema, validation rules, and quality gates required for any component or pattern registered in the Master UI/UX Library.

---

## 1. Canonical TypeScript Interface

Every catalog entry registered in `src/design-system/catalog/` must conform to the `CatalogEntry` interface (`catalogTypes.ts`):

```typescript
export interface CatalogEntry {
  id: string;                         // Unique hyphen-separated ID: '<family>-<archetype>-<descriptor>'
  name: string;                       // Human-readable title: 'Cinematic Liquid Glass Login'
  component: string;                  // Component function name: 'CinematicMascotAuth'
  family: ComponentFamily;            // Canonical family name
  archetype?: ArchetypeType;          // One of the 12 canonical design archetypes
  category: string;                   // Sub-category grouping
  description: string;                // Concise functional and visual description
  tags: string[];                     // Minimum 3 descriptive search tokens
  states: string[];                   // Tested state names (e.g. ['idle', 'hover', 'focus', 'active'])
  codeArtifact: string;               // Self-contained, runnable React/TypeScript source code
  aiSpecification: string;            // Structured prompt specification for AI coding models
  responsiveBehavior: string;         // Explicit description of mobile, tablet, and desktop behavior
  accessibility: {
    wcagLevel: 'A' | 'AA' | 'AAA';    // Tested WCAG 2.2 rating
    contrastRatio: string;            // Measured contrast ratio (e.g. '14.5:1')
    keyboardSupport: string;          // Keyboard navigation details (e.g. 'Tab, Enter, Escape')
    screenReaderNotes: string;        // ARIA attributes and live region announcements
  };
  performanceTier: 1 | 2 | 3;         // 1: Ultra-light (CSS), 2: Standard (Motion), 3: Heavy (Canvas/3D)
  license: string;                    // SPDX 2.3 license identifier (e.g. 'MIT')
  provenance: {
    author: string;
    origin: string;
    verifiedDate: string;
  };
}
```

---

## 2. The 12 Canonical Design Archetypes

All visual components must align to one of the 12 archetypes defined in `src/design-system/tokens.ts`:

1. **`restrained-luxury`**: Deep obsidian `#050505`, 24k polished gold `#D4AF37`, serif display headings, subtle specular rim highlights.
2. **`cinematic-dark`**: Cosmic slate `#090D16`, cyan accents `#06B6D4`, liquid glass translucent layers, high-contrast glow.
3. **`futuristic-cyber`**: Dark terminal `#0A0E17`, neon green `#10B981` / yellow, monospace typography, corner bracket notches, scanline effects.
4. **`scientific-lab`**: Clean sterile slate `#0F172A`, cobalt blue `#2563EB`, precision metric readouts, mathematical grid backdrops.
5. **`neumorphic-glass`**: Soft debossed/embossed shadows, translucent violet/indigo glass, dual specular highlights.
6. **`mechanical-tactile`**: Switchgear bevels, industrial amber `#F59E0B`, tactile keycaps, physically weighted press states.
7. **`brutalist-grid`**: High-density stark black/white, safety red `#EF4444`, monospace text, thick high-contrast borders.
8. **`editorial-serif`**: Archival warm off-white `#FDFBF7`, burgundy accents `#881337`, literary serif typography, generous column tracking.
9. **`minimal-monastic`**: Zen graphite `#18181B`, monochrome zinc scale, razor-thin borders, strict negative space.
10. **`biomorphic-organic`**: Canopy greens `#059669`, flowing curvature, organic leaf-like silhouettes, nature-inspired palette.
11. **`retro-computing`**: CRT terminal curvature, P1 phosphor green `#22C55E`, scanlines, monospace bitmap feel.
12. **`ai-character`**: Companion indigo `#6366F1`, animated vector expressions, 8-state reactive emotional mascot feedback.

---

## 3. Structural Variance Rule (Anti-Duplication)

> **Rule**: An entry is NOT considered a valid new variant if it differs only in background color or border-radius.

A new variant must introduce variation across at least **one** of the following structural dimensions:
1. **Layout & Grid Structure** (e.g. Inline vs. Stacked vs. Split-Screen vs. Bento Box)
2. **Materiality & Surface Optics** (e.g. Matte vs. Frosted Glass vs. Beveled Steel vs. 24k Gold)
3. **Interaction Model** (e.g. Standard Click vs. Hold-to-Confirm vs. Radial Dial vs. Drag Slider)
4. **Motion Dynamics** (e.g. Rigid 0ms vs. Heavy Damped Spring vs. Elastic Overshoot)
5. **Information Density** (e.g. Minimalist Zen vs. Dense Telemetry HUD)
6. **Sensory Synthesis** (e.g. High-frequency click vs. Sub-bass chime vs. Silent)

---

## 4. 10-Vector Quality Gate (Curator Studio)

Before any component is marked as `Production Candidate` or `Reviewed`, it must score $\ge 90\%$ across the 10 vectors:
1. **Layout Precision**: Fluid responsive scaling with no text wrapping in badges/buttons.
2. **Typography Scale**: Adherence to standard step ratios ($\ge 1.125$) with minimum 16px body font.
3. **Color & Contrast**: WCAG AA compliance (4.5:1 minimum, 7:1+ for AAA).
4. **State Completeness**: Explicit visual treatment for all states (idle, hover, active, focus, disabled).
5. **Motion Physics**: Uses spring curves from `STANDARD_MOTION_RECIPES`, no linear transitions.
6. **Sensory Feedback**: Web Audio sound hook and tactile haptic pulse attached.
7. **Keyboard Navigation**: Complete focus ring visibility and standard Tab/Enter/Escape support.
8. **Screen Reader ARIA**: Meaningful `aria-label`, `role`, and `aria-live` where applicable.
9. **Performance Tier**: FPS $\ge 60$, with Loop Idle Protection activating after 10s of inactivity.
10. **Code Quality**: Clean TypeScript props interface, self-contained dependencies, and no inline styles.
