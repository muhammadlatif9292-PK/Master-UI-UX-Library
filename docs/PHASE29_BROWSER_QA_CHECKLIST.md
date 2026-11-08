# Phase 29 — Browser QA Checklist

Paste this into AI Studio (or run it yourself) against the current build. Everything here is something static analysis in this session **could not** verify — it needs an actual browser. Check items off; for anything that fails, note the tab/entry name so it can be traced back to source.

Do not mark Phase 29 complete until every section below has been actually run, not assumed.

---

## 0. Setup
- [ ] `npm install && npm run dev` (or `vite preview` on a fresh `npm run build`)
- [ ] Open browser devtools console before doing anything else — watch it for the entire session, not just at load

## 1. The 5-minute stranger test
Pretend you've never seen this project. Without reading any docs:
- [ ] Can you find a component, preview it, change its style, inspect its states, get the code, and generate an AI handoff — armed with nothing but the UI itself?
- [ ] Where did you get stuck, if anywhere? That's a real UX gap regardless of what caused it.

## 2. Priority target — the preview/style fix from this session
This is the one thing that was code-changed without a browser, so it's the highest-priority thing to actually look at:
- [ ] Open the Master Component Registry ("Components" tab) and click through 5–6 entries from **different, non-flagship families** (e.g. one from `dashboards`, one from `spatial`, one from `general`, one from `page-experiences`). Confirm the specimen's accent color / corner style now visibly differs between them, not just in the underlying prop values.
- [ ] Manually change the Accent/Variant/Radius controls in the Props Inspector and confirm they still override correctly (this was existing behavior — confirm the fix didn't break it).
- [ ] Note which entries still look generic/identical (expected — the fix covers roughly a third of entries; this just confirms it's the *right* third and not silently broken elsewhere).

## 3. Priority target — the accessibility fix from this session
- [ ] Tab through the desktop sidebar with keyboard only — confirm visible focus ring on each nav item, and that the active tab is distinguishable via more than color alone (screen reader or DevTools accessibility tree: confirm `aria-current="page"` is actually announced).
- [ ] On a narrow/mobile viewport, open the hamburger menu. Confirm:
  - [ ] Focus moves into the drawer automatically
  - [ ] Tab and Shift+Tab cycle only within the drawer (don't escape to the page behind it)
  - [ ] Escape key closes it
  - [ ] Focus returns to the hamburger button after closing
- [ ] Open the Command Palette (⌘K or its trigger button) and repeat the same 4 checks above — this modal was **not** part of this session's fix, so it's the most likely place to still find the old bug.

## 4. Full navigation sweep
Walk every one of the 37 tabs in order (Home → Provenance → … → Settings):
- [ ] No blank screens
- [ ] No console errors/warnings on entry
- [ ] Page doesn't visibly jank or flash unstyled content when a lazily-loaded tab (everything except Home) loads for the first time — this is new behavior from the Phase 24 code-splitting fix, worth specifically confirming it feels smooth rather than janky

## 5. Component-family depth pass
For each of the 8 "flagship" families (Auth, Buttons, Cards, Controls, Inputs, Navigation, Overlays, Feedback):
- [ ] Confirm at least 5 different entries render visibly distinct variants (not just color swaps)
- [ ] Trigger each interactive state where available (hover, active, loading, error, disabled) and confirm each looks different, not just labeled differently

## 6. Cross-surface consistency
Pick 3 catalog entries and for each:
- [ ] Compare what's shown in the live preview vs. the Code Viewer output vs. the AI Handoff output — do they describe the same component? (This checks the code/handoff-generator-vs-preview gap noted in `MASTER_OPERATING_STATE.md` §7.)
- [ ] Copy the generated code and sanity-check it's plausible, runnable-looking code, not a mismatched stub

## 7. Sensory & motion
- [ ] Sound: trigger a few interactions with sound enabled — confirm audio actually plays, doesn't error, and matches the interaction (success sound on success, etc.)
- [ ] Haptics: on a touch device, confirm vibration triggers feel matched to the action, not just present
- [ ] Motion: toggle "reduced motion" (OS-level or in-app) and confirm animations respect it

## 8. Responsive pass
- [ ] Resize through mobile / tablet / desktop / ultrawide. Look for overflow, cut-off text, overlapping elements, or controls that become unreachable
- [ ] Specifically re-check the sidebar collapse/expand toggle and the mobile drawer at each breakpoint

## 9. 3D / WebGL
- [ ] Open the Spatial catalog tab. Confirm it renders (not blank), confirm the fallback path if WebGL is unavailable/disabled in the browser
- [ ] Check console for WebGL context warnings/errors

## 10. Sign-off
Only after all sections above are actually checked (not assumed), update `docs/MASTER_OPERATING_STATE.md` §12 to move confirmed items from "Unverified" to "Verified," and note anything that failed as a new entry in §10 (Known limitations).
