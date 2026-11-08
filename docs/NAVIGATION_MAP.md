# Master UI/UX Library — Navigation & Information Architecture Map

This document establishes the canonical Navigation Map and Information Architecture for the Master UI/UX Library web application.

---

## 1. Primary 5-Destination Hierarchy

The top-level application navigation is strictly organized into 5 primary destinations:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   TOP BAR CONTROLS                                     │
│  [Logo/Identity]  [⌘K Search Trigger]  [Audio Synth: On/Off/Vol]  [Haptics]  [Rail]    │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
   ┌────────────────┬───────────────────────┼───────────────────────┬────────────────────┐
   ▼                ▼                       ▼                       ▼                    ▼
[ 1. HOME ]    [ 2. EXPLORE ]         [ 3. CUSTOMIZE ]       [ 4. COLLECTIONS ]    [ 5. LABS ]
- System Hero  - 18 Suite Hub         - Visual Mixer         - Starred Items       - 4 Goal Groups
- 5-Step Flow  - Multi-Token Search   - 12 Archetypes        - Project Sets        - 14 Utilities
- AI Prompts   - 5D Specimen Modal    - Motion & Sensory     - Side-by-Side        - Deep Dives
- Direct CTAs  - Live Filter Matrix   - Dynamic Export       - Diff Matrix
```

---

## 2. Destination Route & Parameter Specifications

### Destination 1: Home (`/` or `tab=home`)
- **Component**: `HomeCommandCenter.tsx`
- **Purpose**: Brand identity, system telemetry, 5-step interactive workflow, and "Just Ask Gemini" prompt triggers.
- **Deep Link Actions**:
  - `onExploreAll()` $\rightarrow$ Navigates to `EXPLORE` with reset filters.
  - `onOpenComposer()` $\rightarrow$ Navigates to `CUSTOMIZE`.
  - `onSearch(query)` $\rightarrow$ Opens Search / Command Palette.
  - `onCopyPrompt(text)` $\rightarrow$ Procedural audio feedback + clipboard copy.

### Destination 2: Explore (`tab=explore`)
- **Component**: `ExploreHub.tsx` & `CatalogDiscovery.tsx`
- **Sub-Views**:
  - **18 Component Suites**: `all`, `auth`, `navigation`, `buttons`, `inputs`, `cards`, `controls`, `overlays`, `feedback`, `dashboards`, `ai-interfaces`, `mascots`, `spatial`, `scientific`, `workflow`, `page-templates`, `general`, `onboarding`, `visual-styles`.
- **Display Modes**:
  - `grid`: Card grid with preview thumbnail, interactive tags, and quick-action buttons.
  - `table`: Dense data table showing Name, Family, Style, Accessibility Rating, Tier, and Action CTAs.
- **Specimen Preview Modal**:
  - Triggered by `selectedEntry` or URL query parameter `specimen=<id>`.
  - Mounts `ComponentPreviewEngine.tsx` with 5D state machine, responsive canvas viewport switch, and AI code generator.

### Destination 3: Customize (`tab=composer` or `tab=customize`)
- **Component**: `ExperienceComposerLab.tsx`
- **Purpose**: Real-time recipe builder for combining tokens, physics, procedural Web Audio, and vibration profiles into production components.

### Destination 4: Collections (`tab=collections` or `tab=favorites` or `tab=compare`)
- **Component**: `CollectionsHub.tsx`
- **Sub-Tabs**:
  - `favorites`: Starred catalog entries with 1-click launch to Preview Engine.
  - `projects`: Grouped project sets with developer notes and export bundles.
  - `compare`: 2-to-4 specimen Side-by-Side Comparison Matrix with live diffs across tokens, physics, and accessibility.

### Destination 5: Labs (`tab=labs` or legacy sub-tab keys)
- **Component**: `LabsHub.tsx`
- **4 Developer Goal Categories**:
  1. **Tune**:
     - `motion-lab`: 24 spring curves, duration, stiffness, damping, mass.
     - `sound-lab`: Procedural Web Audio synthesizer (440Hz press, 523Hz success, 220Hz error).
     - `haptics-lab`: Navigator Vibration API tactile pulses.
     - `performance`: Tiers 1-3 FPS governor and loop idle auto-sleep.
     - `accessibility`: WCAG 2.2 AAA 12-vector contrast and screen-reader audit.
     - `responsive`: 7-device simulator (Mobile, Foldable, Tablet, Desktop, Ultrawide).
  2. **Understand**:
     - `tokens`: Primitive and semantic design tokens visualizer.
     - `inspector`: Real-time UI event telemetry bus.
     - `provenance`: Architectural system contracts and structural rules.
  3. **Create**:
     - `variant-scaling`: Algorithmic variant matrix (52+ variations).
     - `states`: 5D interactive state machine inspector.
  4. **Curate & Export**:
     - `curator-review`: 10-vector quality scoring and review studio.
     - `license-provenance`: SPDX 2.3 open-source licensing metadata.
     - `ai-export`: Full React TypeScript and Tailwind AI prompt generator.

---

## 3. Global Modals & Overlays

1. **Command Palette (`CommandPaletteModal.tsx`)**:
   - Shortcut: `⌘K` or `/`.
   - ARIA: `role="dialog"`, `role="combobox"`, `role="listbox"`.
   - Actions: Jump to any tab, filter by family, search catalog, toggle sound/haptics.

2. **Full-Screen 5D Specimen Canvas (`ComponentPreviewEngine.tsx`)**:
   - Features: Interactive state cycling, viewport simulation, canvas background selector (`Obsidian Dark`, `Studio Light`, `Blueprint Grid`), props inspector, copyable code, and AI prompt brief.

3. **Live Inspector Tool Rail (`InspectorToolRail.tsx`)**:
   - Shortcut: `⌘B` or top bar button.
   - Live telemetry, active token values, frame rate (FPS), and sensory feedback status.
