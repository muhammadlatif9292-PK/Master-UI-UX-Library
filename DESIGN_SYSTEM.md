# Design System Specification

> **Design Tokens, Typography Scales, Mathematical Border Radii, and Color System**

---

## 1. Mathematical Border Radius Rule

To ensure visual harmony, nested containers MUST follow the mathematical border radius formula:

$$\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$$

### Example Implementation:
- **Outer Card Container**: `borderRadius = 24px` (`rounded-3xl`), `padding = 16px` (`p-4`).
- **Inner Child Box**: `borderRadius = 24px - 16px = 8px` (`rounded-lg`).

---

## 2. Typographic Scale Ratios

The library uses modular step ratios to establish typographic hierarchy:

| Scale Name | Step Ratio | Typical Usage |
| :--- | :--- | :--- |
| **Major Second** | `1.125` | Dense UI dashboards, technical data tables, compact controls. |
| **Minor Third** | `1.200` | Standard web applications, forms, settings, settings modals. |
| **Major Third** | `1.250` | Documentation, blog posts, articles, reading views. |
| **Perfect Fourth** | `1.333` | High-impact marketing pages, hero headings, display titles. |

### Minimum Readability Rules:
- **Body Text**: Minimum `16px` (`text-base`), line-height `1.5 - 1.7`.
- **Line Width**: Max `65 - 75` characters (`max-w-prose` / `max-w-2xl`).
- **Control Labels**: Button, tab, badge, and pill labels sit on **one single line** (`white-space: nowrap`) — truncation or line-wrapping inside a pill label is strictly forbidden.

---

## 3. Color System & Contrast Standards

- **Neutral Canvas Saturation**: Neutrals (grays, blacks, whites) include `< 5%` HSB tinting using strictly warm or cool tones to eliminate flat, dead gray appearance.
- **Background Surface Contrast**: Brightness difference between background and container is constrained to `≤ 12%` in dark mode and `≤ 7%` in light mode.
- **WCAG 2.2 AAA Compliance**: Primary body text and interactive controls maintain `≥ 7:1` contrast against their background canvas (`≥ 4.5:1` for large text).
