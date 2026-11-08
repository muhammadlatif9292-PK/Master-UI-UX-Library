# Master UI/UX Library — UX Principles & Design System Laws

This document outlines the core visual, architectural, and interaction principles that govern all components and views in the Master UI/UX Library.

---

## 1. The "Anti-Slop" Visual Mandates

To ensure human craft and reject generic AI visual clichés:
- **No Arbitrary Glassmorphism or Glowing Shadows**: Blur and shadows must be physically motivated (reflecting elevation or illumination).
- **No Purple-to-Cyan Gradients on Text**: Text must maintain pristine high contrast against its direct background.
- **No Side-Tab Borders**: Do not use arbitrary thick left-border stripes on cards.
- **No Numbered Fake Markers**: Do not add '01', '02' badges unless the component represents an actual sequential stepped flow.
- **No Micro-Wrapping**: Text in badges, buttons, pills, chips, and tabs must fit on exactly ONE line without wrapping or clipping.

---

## 2. Mathematical Geometry & Border Radius Law

When nesting rounded containers inside other rounded containers:

$$\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$$

*Example*: If a parent card has an outer radius of `24px` (`rounded-3xl`) and internal padding of `8px` (`p-2`), the inner nested container MUST have a corner radius of $24 - 8 = 16\text{px}$ (`rounded-2xl`).

---

## 3. Sensory Layer Guidelines

1. **Web Audio Sound Synthesis (`useSound()`)**:
   - Sound is generated purely in the browser using the Web Audio API without external `.mp3` or `.wav` asset downloads.
   - Standard frequencies:
     - `CLICK` / `PRESS`: 440 Hz short exponential decay (30ms).
     - `SUCCESS` / `CONFIRM`: Polyphonic C-E-G major triad (523Hz $\rightarrow$ 659Hz $\rightarrow$ 784Hz).
     - `ERROR` / `REJECT`: Dissonant descending tone (220Hz $\rightarrow$ 180Hz).
     - `HOVER`: Gentle micro-sine pulse (880Hz, 15ms).
   - Global sound can be muted or scaled via the top bar volume slider.

2. **Tactile Vibration Haptics (`useHaptics()`)**:
   - Utilizes `navigator.vibrate` when running on supported mobile devices.
   - Profiles:
     - `LIGHT`: `10ms` single pulse.
     - `MEDIUM`: `25ms` single pulse.
     - `SUCCESS`: `[15ms, 40ms, 25ms]` rhythmic confirmation.
     - `ERROR`: `[40ms, 30ms, 40ms]` warning buzz.

---

## 4. Accessibility & Inclusivity (WCAG 2.2 AAA Target)

1. **Touch Targets**: Minimum $44\text{px} \times 44\text{px}$ on all interactive controls for mobile viewports.
2. **Focus Indicators**: 2px high-contrast focus rings with 2px offset (`focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2`).
3. **Modal & Dialog Semantics**:
   - Modals and drawers must be wrapped in `FocusTrap` with active Tab cycling.
   - Escape key must dismiss open overlays and return focus to the trigger button.
4. **Reduced Motion**: All spring physics transitions must respect `prefers-reduced-motion: reduce` by falling back to immediate 0ms state changes.

---

## 5. Performance Governance & Battery Preservation

1. **Performance Tiers**:
   - **Tier 1 (CSS Primitives)**: Zero JavaScript CPU overhead, pure GPU compositor transforms.
   - **Tier 2 (Motion Springs)**: Framer Motion spring physics with unmount transitions.
   - **Tier 3 (Canvas / WebGL / Three.js)**: GPU-accelerated spatial rendering with automatic render loop throttling.
2. **Loop Idle Protection (Auto-Sleep)**:
   - Any continuous animation loop or canvas render loop must pause after 10 seconds of user inactivity to prevent CPU/battery drain.
