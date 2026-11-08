# Master UI/UX Design System: Anti-Patterns & Acceptance Criteria

This document defines the strict quality assurance (QA) standards, banned design clichés, and acceptance criteria for all interfaces built with the Master UI/UX Library.

---

## 1. Banned "AI Slop" Anti-Patterns

Any implementation exhibiting any of the following anti-patterns is considered a defective build:

1. **The Purple-Cyan Dark Mode Cliché**: Never use ungrounded, saturated purple-to-cyan linear gradients across large blocks with random neon glowing shadows. Use intentional archetypal palettes (e.g. `restrained-luxury` obsidian/gold, `cinematic-dark` deep slate/cyan, `scientific-lab` crisp white/cobalt).
2. **Nested Ghost Cards**: Never place rounded cards inside rounded cards with identical borders and identical 1px hairline drop shadows. Flatten depth using background contrast, subtle hairline dividers, or typography hierarchy.
3. **Hyphenated or Truncated Button Labels**: Never allow button text, pill chips, or tab badges to break onto two lines or truncate with an ellipsis (e.g., "Real-" / "time" is a critical defect). Controls must size to fit their labels with `whitespace-nowrap` and `2x` horizontal-to-vertical padding math.
4. **Side-Tab Accent Borders**: Never slap an arbitrary thick vertical colored bar on just the left side of an otherwise rounded card.
5. **Hero Eyebrow Abuse**: Never sprinkle tracked-out, tiny uppercase 10px eyebrow tags ("WELCOME TO THE FUTURE") above every single heading without structural meaning.
6. **Unconstrained Ultra-Wide Canvas**: Never let forms or text lines stretch infinitely across a 1920px+ monitor. Always bind content within `max-w-md`, `max-w-4xl`, or `max-w-7xl` with `mx-auto`.

---

## 2. Mathematical Spacing & Border Radius Rules

- **Outer vs Inner Padding Rule**: Outer container padding must always equal or exceed internal child gap spacing:
  $$\text{Container Padding} \ge \text{Child Spacing}$$
- **Nested Corner Radius Rule**:
  $$\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$$
  - Example: A container with `rounded-3xl` (24px) and `p-4` (16px) requires inner items to have `rounded-lg` (8px).
- **Button Padding Ratio**: Horizontal padding must equal exactly $2\times$ vertical padding (e.g. `py-2.5 px-5`, `py-3 px-6`).

---

## 3. QA Acceptance Criteria Checklist

Before any component or page is approved:

- [ ] **State Machine Completeness**: Handles all 8 states (`idle`, `hover`, `focus`, `active`, `submitting`, `success`, `error`, `disabled`).
- [ ] **Contrast Compliance**: Meets WCAG 2.2 AAA (7:1 for text, 4.5:1 for UI elements) or minimum AA (4.5:1 text, 3:1 UI).
- [ ] **Touch Target Integrity**: Minimum $44\text{px} \times 44\text{px}$ touch target on mobile viewports.
- [ ] **Reduced Motion Guard**: Disables spring physics and continuous rotation when `prefers-reduced-motion` is active.
- [ ] **Loop Idle Protection**: Suspends background particle emitters after 10 seconds of user inactivity.
- [ ] **Zero Unsolicited Noise**: Audio cues are non-blocking, synthesized procedurally, and respect mute toggles.
- [ ] **SPDX & Provenance Header**: Includes clean JSDoc licensing metadata.
