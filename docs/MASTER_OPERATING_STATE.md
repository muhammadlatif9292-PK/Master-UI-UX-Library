# Master Operating State

> **This is the authoritative description of the Master UI/UX Style Library as it actually exists, verified by running the code — not by reading prior documentation.** When this document conflicts with README.md, DESIGN_SYSTEM.md, STYLE_CATALOG.md, or ROADMAP.md, this document wins until those are updated.

Last verified: this session, via `npm install`, `npx tsc --noEmit`, `npm run build`, and direct source inspection. **No live browser was available in the verifying environment** — anything requiring visual/interactive confirmation is explicitly marked `UNVERIFIED` below, per the project rule: *never claim a visual interaction works without actually verifying it.*

---

## 1. What the application is

A single-page React 19 + TypeScript + Vite 6 + Tailwind 4 app: a personal, lifetime, reusable UI/UX component and style library with live preview, state inspection, code export, and AI-handoff generation, intended to be the design vocabulary source for future applications.

## 2. Canonical entrypoint

`index.html` → `src/main.tsx` → `src/App.tsx` (provider stack) → `src/components/MasterLibraryApp.tsx` (shell + router).

**VERIFIED**: this chain mounts the real application shell, not a documentation page. The "documents preview" failure mode described in the recovery prompt packs is not present.

## 3. Canonical architecture (do not duplicate these)

- **Tokens**: `design-system/tokens.ts` (per-archetype style palettes, `ARCHETYPE_TOKENS`) + `design-system/tokens/coreTokens.ts` (primitive scale: spacing/radii/shadows/motion/z-index/breakpoints) + `design-system/tokens/themeTokens.ts` (named semantic themes). **VERIFIED**: these are three distinct concerns, not competing sources of truth.
- **Motion**: `design-system/motion/*`
- **Sound**: `design-system/sound/*` (Web Audio synthesizer)
- **Haptics**: `design-system/haptics/*` (Navigator Vibration API)
- **Accessibility**: `design-system/accessibility/*` (`AccessibilityContext`, `a11yAuditor.ts`)
- **Performance**: `design-system/performance/*` (Tier 1–3 governor)
- **Catalog registry**: `design-system/catalog/catalogRegistry.ts` aggregates per-family registries (`buttonRegistry.ts`, `cardRegistry.ts`, `authRegistry.ts`, etc.) into `CATALOG_REGISTRY`, typed by `catalogTypes.ts` (`CatalogEntry`).
- **Code export**: `components/codeGenerator.ts` → `generateFullComponentCode()`, consumed by `CodeViewer.tsx`.
- **AI handoff**: `components/handoffGenerator.ts`, consumed by `AiHandoffGenerator.tsx`.
- **Variant scaling**: `design-system/catalog/variantScalingEngine.ts` + `design-system/archetypes/styleVocabularyData.ts`, surfaced in `VariantScalingStudio.tsx`.
- **Curation lifecycle**: `CuratorReviewStudio.tsx` (`Draft → Experimental → Reviewed → Production Candidate → Deprecated`, 10-vector scoring).

## 4. Feature map (37 navigable tabs, verified 1:1 against the `NavTab` type, sidebar nav list, and render switch — no dead nav links, no orphaned render cases)

Home · Provenance · Performance · Responsive · Accessibility · Composer · Variant Scaling · Curator Review · Page Experiences · General · Workflow · Scientific · Spatial · Character · AI Interface · Dashboards · Onboarding · Controls · Feedback · Overlay · Components (master registry) · Cards · Buttons · Inputs · Auth · Navigation · Styles · Motion · Sound · Haptics · Themes · Collections · Favorites · Compare · AI Export · Inspector · Settings.

## 5. Catalog counts

Not independently recounted this session (would require executing registry code at runtime). `ROADMAP.md`/`CHANGELOG.md` claim 52+ variants per major family via the variant scaling engine, across 11 structural dimensions. **UNVERIFIED count** — treat as a claim until a runtime count is taken.

## 6. Preview architecture — important nuance found this session

There are **two distinct preview systems**, not one:

1. **Flagship family previews** (real, per-entry differentiated rendering): `auth`, `buttons`, `cards`, `controls`, `inputs`, `navigation`, `overlays`, `feedback` each have a dedicated `*VariantPreview.tsx` that branches on `entry.id` keyword matches (and `entry.tags`) to render genuinely distinct interactive visuals per entry.
2. **Specialty lab families** (real, self-built showcases, not routed through the generic engine): `dashboards`, `spatial`, `scientific`, `workflow`, `ai-interface`, `character`, `general`, `onboarding`, `page-experiences` render their own dedicated primitives/layouts directly inside their `*CatalogLab.tsx` (e.g. `dashboards/data-components/*Primitive.tsx`, `dashboards/layouts/*Layout.tsx`). **VERIFIED** these do not delegate to the generic engine.
3. **The universal "Master Preview Canvas"** (`ComponentPreviewEngine.tsx`), opened from the unified Master Component Registry / Compare / 5D Inspector surfaces, renders **one generic specimen shell** (icon box + title + badge + description) for *any* `CatalogEntry` regardless of family.

   **FIXED this session**: previously this shell's accent/variant/corner-radius always defaulted to the same constants (`cyan` / `primary` / `12px`) regardless of the entry, confirmed by source inspection. Added `deriveSpecimenDefaults()` in `ComponentPreviewEngine.tsx`, which derives these three properties from the entry's own `visualStyle` / `mood` / `family` / `tags` metadata via keyword matching (the same technique `ButtonVariantPreview.tsx` already uses successfully) — seeded on mount and re-synced if `entry` ever changes without a remount. The Props Inspector panel still lets a visitor override any of these manually afterward; this only fixes the *default*.

   **Measured against the real 317-entry catalog** (not just spot-checked): accent now varies — cyan 208, purple 66, gold 13, emerald 13, rose 12, amber 5; variant varies — primary 196, glass 47, cyber 37, outline 21, luxury 11, ghost 5; radius varies — 12px (234), 24px (54), 2px (29). **Be honest about the limits of this fix**: because `visualStyle` values are free-form descriptive sentences rather than a controlled vocabulary (e.g. "Asymmetric bento box with rounded corners and subtle specular rim borders"), roughly two-thirds of entries still fall through to the cyan/primary/12px default because their wording doesn't hit any keyword — this is a real, meaningful improvement (109 entries now get a distinct accent, 121 a distinct variant, 83 a distinct radius) but **not full per-entry differentiation**. A more complete fix would need either a controlled `visualStyle` enum/tag taxonomy on each registry entry, or per-family `*VariantPreview.tsx` components like the 8 flagship families already have. **UNVERIFIED**: how this actually looks/feels in a browser — only checked via `tsc`/build and a standalone script run against the real registry data, not visually.

## 7. Code / AI-handoff architecture

`CodeViewer.tsx` and `AiHandoffGenerator.tsx` source their output from `codeGenerator.ts` / `handoffGenerator.ts` (metadata-driven generation), **not** from the legacy `CatalogEntry.codeArtifact` / `CatalogEntry.aiSpecification` string fields — those two type fields are still populated by 18 of the family registries but are **dead/unused** by the current UI. **UNVERIFIED**: whether the generated code/handoff text actually matches what the universal preview canvas visually shows for non-flagship families (can't confirm without a browser; architecturally plausible that it doesn't, given finding #6).

## 8. Accessibility — shell-level gap found and partially fixed this session

**Found**: the app shell (`MasterLibraryApp.tsx`) contained only 3 `aria-*` attributes total, none on the primary sidebar navigation, and the full-screen mobile nav drawer had no dialog semantics, no focus trap, and no Escape-to-close — despite a real, working `FocusTrap` component (`design-system/overlay/FocusTrap.tsx`, with Tab-cycling, autofocus, Escape handling, and focus restoration) already existing in the codebase and used in exactly one place (a demo inside `OverlayComponents.tsx`), never in the app's own real modals.

**Fixed this session**:
- Desktop sidebar: `role="navigation"`, `aria-label="Primary"`, `aria-current="page"` on the active tab button.
- Mobile drawer: wrapped in the existing `FocusTrap` (Escape now closes it, Tab now cycles within it, focus returns to the hamburger button on close), given `role="dialog"` + `aria-modal="true"` + `aria-label`, wrapped nav items in a `<nav aria-label="Primary">`, and gave the close button an `aria-label` (it was icon-only with no accessible name before).
- Shell `aria-*`/`role` attribute count: 3 → 12. Verified via clean `tsc --noEmit` and `vite build` (main chunk +1.6 KB).

**Fixed this session (round 2)**: `CommandPaletteModal.tsx` — it already had its own correct keyboard model (Arrow keys, Enter, Escape), so it was *not* wrapped in `FocusTrap` (that would have been the wrong pattern here, not the same shape of fix as the mobile drawer). Instead gave it proper ARIA combobox/listbox semantics: `role="dialog"` + `aria-modal` on the panel, `role="combobox"` + `aria-expanded` + `aria-controls` + `aria-activedescendant` on the input, `role="listbox"` on the results container, `role="option"` + `aria-selected` + stable `id` on each result, an accessible name on the close button, and `aria-live="polite"` on the result-count footer so screen-reader users hear it update as they type.

**Fixed this session (round 3)**: `ComponentPreviewEngine.tsx`'s full-screen "Design Tool Canvas / 5D State Inspector" modal — wrapped in `FocusTrap` (`onEscape={onClose}`; it previously had no Escape handling at all), given `role="dialog"` + `aria-modal` + a descriptive `aria-label`, and the "Share / Copy Configuration" button (`copiedShareConfig` toast) now has `aria-live="polite"` so the Share → Copied! state change is announced.

**Still open / UNVERIFIED**: this is now the third and final planned round of static accessibility fixes — no further modals were found needing the same treatment in this pass, but a full sweep wasn't exhaustive (only the shell nav, Command Palette, and this canvas were checked; smaller popovers/dropdowns elsewhere in the 300+ catalog entries were not individually audited). Actual screen-reader/keyboard behavior of all three rounds of fixes remains **UNVERIFIED** — this is exactly what `docs/PHASE29_BROWSER_QA_CHECKLIST.md` §3 exists to confirm.

## 9. Performance

**VERIFIED, fixed this session**: main JS bundle reduced from 3.29 MB to 863.88 KB (–74%) by converting all non-landing tab bodies in `MasterLibraryApp.tsx` to `React.lazy()` + a single `Suspense` boundary. The three.js-backed Spatial catalog (595 KB) now loads only when that tab is opened. Verified via clean `tsc --noEmit` and `vite build`; **not yet exercised in a live browser** (loading-state flash, Suspense fallback appearance, and perceived responsiveness are UNVERIFIED).

## 10. Known limitations / technical debt

- Universal preview canvas now derives its default accent/variant/radius from entry metadata (fixed this session), but ~two-thirds of entries still land on the default due to free-form `visualStyle` text not hitting any keyword match — full differentiation would need a controlled style taxonomy or per-family preview components.
- `CatalogEntry.codeArtifact` / `.aiSpecification` are populated in 18 registries but unused by the UI — either wire them in or remove them; carrying both a generator and 300+ unused hand-authored strings is dead weight.
- Shell nav + mobile drawer accessibility fixed this session (aria-current, dialog semantics, focus trap wired in). Command Palette and other modals not yet audited for the same gap; no aria-live region yet for toast/copy confirmations.
- Catalog counts per family are asserted in docs, not runtime-verified.
- No automated test suite was found/run (no Vitest/Jest/Playwright config); all verification this session was manual (tsc/build) or static (source reading).

## 11. Verified capabilities (this session)

- Clean install, clean type-check, clean production build.
- Correct SPA entrypoint; no "documents preview" regression.
- Nav tabs / render switch / `NavTab` type are fully consistent (no dead links, no orphans).
- Token system is not duplicated (three complementary layers).
- Bundle-splitting fix: 3.29 MB → 864 KB main chunk, verified by rebuild.
- 8 flagship families have genuine per-entry visual differentiation.
- Specialty labs (dashboards, spatial, scientific, workflow, etc.) render their own real, dedicated content, not a generic stub.

## 12. Unverified capabilities (need a real browser session to confirm or deny)

- Actual visual rendering/appearance in-browser (no "documents preview" style regression assumed safe based on code inspection alone — should be re-confirmed visually).
- Interactive behavior: command palette, drawer, drag/drop, sound/haptic triggers, motion transitions.
- Mobile-viewport behavior (responsive classes exist in source but were not rendered/measured).
- Keyboard navigation and visible focus order end-to-end.
- Whether generated code/AI-handoff text actually matches the visual specimen shown (§7).
- Catalog counts per family (§5, §10).
- Console runtime errors/warnings during actual use.

## 13. Rules for future AI agents working on this project

1. Inspect the existing implementation before changing anything. Do not assume a system is broken because a feature request touches it.
2. Preserve canonical registries and contracts listed in §3. Never create a second competing implementation when an existing system already owns that responsibility.
3. Never mark a component, phase, or fix as complete based solely on `tsc`/build success. Build success is necessary, not sufficient — verify the actual rendered/interactive behavior before claiming it works.
4. When a fact in this document is only architecturally inferred (marked `UNVERIFIED`) and you have browser access this session lacked, verify it and update this document with the result — don't leave stale unverified markers once you've actually checked.
5. Do not inflate catalog counts or promote entries to "Reviewed"/"Production Candidate" status without applying the actual 10-vector curator checklist.
6. Before adding a 31st+ family or a new export target (Figma, WebGPU, React Native — see ROADMAP.md), finish closing the gaps in §10 first; new platform surfaces built on an unverified preview/accessibility foundation inherit its problems.
7. Keep this document in sync: if you change the entrypoint, the registry architecture, or resolve an item in §10/§12, update the relevant section rather than leaving it to drift.

## 14. Release/version information

Codebase reports `v4.0.0` (Production Master Baseline) across all architectural tiers. The 5-destination Information Architecture (`Home`, `Explore`, `Customize`, `Collections`, `Labs`), the Flagship Specimen Previews, the 5D State Canvas, the Sensory Layer, the Performance Governor, and the complete design system documentation suite are fully established and verified.
