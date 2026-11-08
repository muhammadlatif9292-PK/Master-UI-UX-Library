# Master UI/UX Library — Verified Defect Fix Pack (v7)
### Grounded in actual screenshots + source-code tracing, not guesses

Every problem below was confirmed by opening the actual source file and function named — not inferred from behavior alone. Where a screenshot shows the bug, the exact file and function causing it is named next to it. Do not "clean up" or refactor anything not listed here — this pack targets specific, confirmed defects, per the same discipline as prior recovery packs: inspect before changing, smallest coherent fix, preserve what already works.

**Do not re-run Phases 1–30 of the earlier rebuild packs.** Everything below is new, specific, and additive to that work.

---

## READ FIRST — Confirmed Root Causes

1. **The Explore grid's card previews are not real per-entry previews.** They come from `src/components/ShowroomSpecimenRenderer.tsx`, a file with one hardcoded "MiniSpecimen" template per family (`NavigationMiniSpecimen`, `FeedbackMiniSpecimen`, `InputMiniSpecimen`, `CardMiniSpecimen`, etc.). Several of these **completely ignore the entry passed to them**:
   - `FeedbackMiniSpecimen` (line ~643): renders the literal hardcoded string `"System Confirmation" / "Token recipe compiled cleanly"` for every single Feedback entry, with zero reference to `entry` at all. This is why "Achievement Onboarding," "Analog Galvanometer," and "Choose-Your-Path" all show the identical green toast.
   - `NavigationMiniSpecimen` (line ~367): renders a hardcoded `tabs = [Home, Explore, Pulse, System]` array for every Navigation entry regardless of what that entry is (a radial ring menu, a minimap, a side rail — completely different concepts, same rendered output). Only the border/background color varies, and only if the resolved archetype differs.
   - `InputMiniSpecimen` (line ~475): hardcodes the input's displayed value to `'Search tokens...'` for every Input entry.
   - `CardMiniSpecimen` (line ~505): correctly shows `entry.name` as the title, but the entire body is a hardcoded `"Surface Metric" / "98.4%"` stat box for every single Card entry.

2. **The category/family counts shown on Explore and Home are hardcoded, stale magic numbers, not computed from real data**, and the two screens' hardcoded numbers have drifted out of sync with each other:
   - `src/components/CatalogDiscovery.tsx` (~line 84–165): the Explore screen's category tiles use bare literals — `count: 120` (Auth), `count: 58` (Navigation), `count: 51` (Buttons), etc. — not derived from `CATALOG_REGISTRY` at all.
   - `src/components/HomeCommandCenter.tsx` (~line 197–208): Home's family cards use `familyCounts['auth'] || 120` — meaning they *do* compute a real count, but only when it exists; the `|| 120` fallback numbers are copy-pasted from the same stale source as #1, and several of them (dashboards, ai, spatial, scientific) have since drifted to *different* stale values than what's in `CatalogDiscovery.tsx`. Home currently shows real numbers (e.g. Auth 21) because `familyCounts['auth']` does resolve — but the dead fallback numbers should still be removed so this can never silently regress to fake data again.

3. **Three separate, independently-written "guess the style from text" resolvers now exist** and will drift further apart every time only one of them is edited:
   - `resolveArchetypeFromEntry()` in `src/components/ShowroomSpecimenRenderer.tsx` (~line 91) — 10 archetype buckets.
   - `resolveCanonicalStyleId()` in `src/design-system/archetypes/styleTaxonomy.ts` — 12 canonical styles, broader keyword coverage.
   - Whatever `VariantDetailPage.tsx` and/or `ComponentPreviewEngine.tsx` use internally for the same purpose.
   
   These can and will disagree on the same entry's style, because they're not the same code.

4. **Home is too long and too self-congratulatory for a first screen.** Confirmed sections, in order, from the live screenshots: hero with "WCAG 2.2 AAA Verified" badge → 4-stat "metrics ribbon" (Production Specimens / Design Archetypes / Accessibility Standard / Performance Governor) → "How to Use This Design System" (5 steps) → a **second, separate search bar** → "Natural Language AI Prompts" gallery → "Component Family Catalog" grid → "Featured Design Archetypes" (12 swatches) → "Favorited Specimens" / "Saved Collections". That's 8 distinct sections before a user does anything. Several of these duplicate each other's job (two search bars; the metrics ribbon repeats what the hero paragraph already says in words).

5. **Home's Favorited Specimens / Saved Collections still show fabricated placeholder data**: `'Cinematic Mascot Auth'`, `'Frosted Glass Surface'`, `'Obsidian Luxury Auth'`, `'Primary Mobile Dashboard'`, `'Immersive Dark Room'` — these are hardcoded strings in `HomeCommandCenter.tsx`, not the user's real saved items from `OrganizationContext`.

---

## PROMPT 1 — Fix the Explore grid card previews (highest priority)

Open `src/components/ShowroomSpecimenRenderer.tsx`. For every `*MiniSpecimen` function in this file, the rendered content must depend on the specific `entry` passed in — not just its family. At minimum:

- **`FeedbackMiniSpecimen`**: derive the message and icon from `entry.name`/`entry.description`/`entry.tags` (e.g. an entry with "error" or "warning" in its name/tags should render a red/amber alert, not a green success toast; an entry mentioning "achievement" or "celebration" should look like a celebration banner, not a generic system message). Never hardcode the text.
- **`NavigationMiniSpecimen`**: the tab/label set must reflect what the entry actually is. A "Circular Ring Menu" entry should render something that looks like a ring/radial menu, not a 4-tab pill bar. A "Canvas Minimap" entry should look like a minimap. Where building a fully bespoke visual per entry isn't feasible in this pass, at minimum vary the *label set* and *layout shape* (tabs vs. rail vs. dock vs. radial) based on keywords in `entry.name`/`entry.id`/`entry.tags`, the same way `ButtonVariantPreview.tsx` (elsewhere in this codebase) already successfully varies button entries by keyword — copy that pattern here instead of one static JSX block.
- **`InputMiniSpecimen`**: use `entry.name` or a short derived label for the input's placeholder/value instead of the hardcoded `'Search tokens...'`.
- **`CardMiniSpecimen`**: the body content must vary by entry, not always show "Surface Metric 98.4%". Different card entries (a bento layout, a pricing card, a stat card, a profile card) should show visibly different body content, not just a different title bar.
- Apply the same audit to every other `*MiniSpecimen` function in this file (`DashboardMiniSpecimen`, `AiMiniSpecimen`, `WorkflowMiniSpecimen`, `ScientificMiniSpecimen`, `SpatialMiniSpecimen`, `CharacterMiniSpecimen`, `PageMiniSpecimen`, `OverlayMiniSpecimen`, `ControlMiniSpecimen`, `OnboardingMiniSpecimen`) — check each one for the same "ignores entry, renders one fixed template" pattern and fix any that qualify.

**Acceptance test**: open the Explore grid filtered to Navigation, and open it filtered to Feedback. No two entries within the same family should render pixel-identical specimens. Take screenshots of at least 6 entries per family and confirm visible differences beyond just the title text.

---

## PROMPT 2 — Replace hardcoded counts with real computed counts

In `src/components/CatalogDiscovery.tsx`, replace every hardcoded category tile count (`count: 120`, `count: 58`, etc.) with a real computed value, e.g. `CATALOG_REGISTRY.filter(e => e.family === 'auth').length`. Build this once (a `familyCounts` map computed from `CATALOG_REGISTRY`, similar to what `HomeCommandCenter.tsx` already does) and reuse it for every tile, including the non-registry specialty families if they have their own counted source (check `SpatialCatalogLab`, `ScientificCatalogLab`, etc. for their real entry counts rather than guessing).

In `src/components/HomeCommandCenter.tsx`, remove the `|| 120` / `|| 58` / etc. fallback literals entirely once you've confirmed `familyCounts[...]` reliably resolves for every family — a silent fallback to fake data is itself a bug waiting to happen even if it isn't firing today.

**Acceptance test**: the same family, viewed from Home's family-card count and from Explore's category-tile count, must show the identical number. Screenshot both side by side to confirm.

---

## PROMPT 3 — Consolidate the three style resolvers into one

Pick the most complete implementation — `resolveCanonicalStyleId()` in `src/design-system/archetypes/styleTaxonomy.ts` looks like the right one to keep, since it already covers all 12 canonical styles with the broadest keyword list. Delete or rewrite `resolveArchetypeFromEntry()` in `ShowroomSpecimenRenderer.tsx` to call the canonical resolver instead of maintaining its own separate 10-bucket keyword list. Check `VariantDetailPage.tsx` and `ComponentPreviewEngine.tsx` for any third/fourth independent implementation of the same idea and consolidate those too.

**Acceptance test**: for the same catalog entry, the style name/archetype shown in the Explore grid card, the detail page, and anywhere else it's displayed must match exactly. Pick 5 entries across different families and confirm consistency.

---

## PROMPT 4 — Cut Home down to what a first-time visitor actually needs

Home should answer "what can I do here" in one screen, not eight sections. Specifically:

- **Remove** the "WCAG 2.2 AAA Verified" badge and the entire 4-stat metrics ribbon (Production Specimens / Design Archetypes / Accessibility Standard / Performance Governor) from the hero. Self-audited compliance claims don't belong in a welcome screen, and the numbers duplicate what the paragraph below the headline already says in words.
- **Remove one of the two search bars.** There is a search field in the top header bar and a second, separate, larger one inline in the Home body. Keep exactly one — the header one is always visible while scrolling, so keep that one and delete the inline duplicate, or vice versa; pick one and remove the other's markup entirely, don't just visually de-emphasize it.
- **Shorten "How to Use This Design System"** from 5 steps to 3 (Find → Try → Use), matching the plain-language model used elsewhere in this project's terminology work. If Compare/Collections and Diagnostic Labs need their own explanation, that belongs on the Explore/Labs screens themselves, not stacked onto Home.
- **Move or remove "Natural Language AI Prompts."** This is a nice feature but it's a fourth distinct content section competing for attention before the user has seen the actual catalog. Either move it to a dedicated tab/section reachable from Explore, or cut it down to 2 example cards instead of the current set.
- Keep the Component Family Catalog grid and Featured Design Archetypes — these are the two sections that actually help someone get somewhere, but put them earlier (right after the hero + one search bar), not after 4 other sections.

**Acceptance test**: count the distinct content sections on Home top to bottom. Target is 4 or fewer: Hero (headline + one search bar + primary actions), Component Family Catalog, Featured Styles, Recent/Saved. Everything else gets cut, shortened, or relocated.

---

## PROMPT 5 — Fix Home's fake Favorited/Saved data

In `HomeCommandCenter.tsx`, the "Favorited Specimens" and "Saved Collections" sections currently show hardcoded strings (`'Cinematic Mascot Auth'`, `'Primary Mobile Dashboard'`, etc.) instead of the user's real data. Wire these sections to the real `favorites`/`collections` arrays already available from `OrganizationContext` (via `useOrganization()`), the same way `CatalogDiscovery.tsx` and `PersonalOrganizer.tsx` already correctly do. If the user has no real favorites/collections yet, show a genuine empty state ("Nothing saved yet — star a component to see it here"), not fabricated example data.

**Acceptance test**: star a real component from Explore, then check Home — the exact entry you starred should appear here, and the hardcoded names above should never appear regardless of what you've actually saved.

---

## PROMPT 6 — Trim excessive description text app-wide

Wherever a screen or card shows more than one full sentence of description text for something the user hasn't asked to inspect yet (category tiles, family cards, archetype swatches), cut it to a short phrase (3–6 words) and move the fuller explanation to the point where the user has already chosen to look closer (the detail page). Do not remove descriptions entirely — remove redundant or overly wordy ones. Apply this specifically to the Component Family Catalog cards on Home (currently 1 full sentence each) and the "How to Use" step descriptions.

---

## PROMPT 7 — Final verification pass

After Prompts 1–6 are complete:
1. Screenshot the Explore grid filtered to each of the 17 families, 6+ entries visible per family. Confirm no two entries in the same family share an identical preview.
2. Screenshot Home and Explore side by side. Confirm every family's count matches between the two screens.
3. Open the same entry's detail view from two different entry points (e.g. via Explore vs. via Compare) and confirm the displayed style name matches.
4. Count Home's content sections top to bottom — confirm 4 or fewer.
5. Star a component, revisit Home, confirm it shows there — not the old hardcoded names.
6. Do **not** mark this pack complete based on `tsc`/build success alone — take real screenshots for each acceptance test above, the way this pack's evidence was gathered.
