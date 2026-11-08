# Master UI/UX Design System: Accessibility & Responsive Rules

This document specifies the **12-Vector WCAG 2.2 AAA Validation Framework** and **7-Device Responsive Testing Environment**.

---

## 1. The 12-Vector Accessibility Framework

Every component in the library must pass all 12 vectors of accessibility:

| Vector | Requirement | Standard / Threshold |
|---|---|---|
| 1. **Reduced Motion** | Honor `prefers-reduced-motion: reduce` | Disables spring physics, parallax, and rotating meshes; uses subtle opacity transitions (≤150ms). |
| 2. **Reduced Transparency** | Honor `prefers-reduced-transparency` | Removes `backdrop-filter: blur()` and transparent alphas; renders opaque solid surfaces (`bg-zinc-900`). |
| 3. **Reduced Effects** | Low GPU / low distraction | Disables particle emitters, volumetric glows, and scanlines. |
| 4. **Sound Off by Default / Muted Mode** | Zero audio distraction | Audio synthesis is muted by default or respects explicit user toggle; never auto-plays unsolicited sound. |
| 5. **Haptic Mute & Controls** | Tactile accessibility | Vibration calls are guarded and optional. |
| 6. **High Contrast Mode** | Strict color separation | Minimum 7:1 contrast for regular text (WCAG AAA) and 4.5:1 for UI borders and icons. |
| 7. **Large & Scalable Typography** | Optical scalability | Scales body text from 16px to 20px+ without clipping, line wrapping corruption, or container overflow. |
| 8. **Full Keyboard Navigation** | Zero mouse dependency | Complete Tab, Shift+Tab, Arrow Key, Enter, and Spacebar navigation with natural DOM order. |
| 9. **Visible Focus Rings** | Clear focus indication | Unambiguous focus rings: `focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black`. |
| 10. **ARIA Landmarks & Labels** | Screen reader context | Explicit `aria-label`, `aria-describedby`, `aria-live="polite"`, `role="region"`, `role="status"`. |
| 11. **Semantic HTML & State** | Proper element primitives | Uses `<button>`, `<input>`, `<dialog>`, `<nav>`, `<main>`, `<article>` with correct disabled states. |
| 12. **Non-Color Indicators** | Colorblind safety | Never convey state solely through color; pair color with icons (checkmarks, warning triangles, text labels). |

---

## 2. The 7 Device Viewport Rules

The responsive engine validates all layouts across 7 physical viewport envelopes:

| Device Viewport | Dimensions (WxH) | Layout Morphing Rule | Touch Physics |
|---|---|---|---|
| 1. **Phone Portrait** | 390px × 844px | Full 1-column stack; bottom navigation bar; thumb zone primary controls. | ≥44px touch targets; no-hover click behavior. |
| 2. **Phone Landscape** | 844px × 390px | Horizontal split screen (left: branding/summary, right: scrolling form/content). | Compact vertical padding (`py-2`), accessible scrolling. |
| 3. **Tablet Portrait** | 820px × 1180px | 2-column bento grid; collapsible side navigation; adaptive cards. | Touch + stylus friendly padding (`p-6`). |
| 4. **Tablet Landscape** | 1180px × 820px | 3-column expanded layout; persistent slim sidebar. | Hybrid pointer/touch support. |
| 5. **Laptop Standard** | 1366px × 768px | Standard desktop grid; max container width 1280px. | Mouse hover elevations and cursor pointers. |
| 6. **Desktop FHD** | 1920px × 1080px | Multi-panel workspace; max container width 1536px; negative space balance. | Rich hover specular highlights and 3D parallax. |
| 7. **Ultra-Wide / Large Display**| 2560px × 1440px | Centered canvas bounded by `max-w-7xl` or bento-grid multi-monitor layouts. | Zero layout stretching or distorted typography. |

### Zero-Shrink & Text Overflow Rule
Buttons, chips, and badges must **never truncate or wrap onto multiple lines**. If text exceeds width, use responsive padding or adapt container layouts rather than breaking words into hyphenated stubs.
