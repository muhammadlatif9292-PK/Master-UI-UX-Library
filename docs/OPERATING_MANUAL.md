# Master UI/UX Design System Library — Master Operating Manual

This manual is the definitive operational blueprint for extending, maintaining, and scaling the **Master UI/UX Design System Library**. It guarantees zero architecture drift, strict structural variant quality, and seamless downstream integration into future applications.

---

## 1. Core Architecture Philosophy

The library is engineered on three immutable principles:
1. **Behavior-Presentation Separation**: Visual archetypes and motion curves are generated via mathematical recipe engines (`recipeEngine.ts`), never duplicated within component logic.
2. **Zero Fake Asset Dependencies**: Sound is procedurally synthesized via the Web Audio API (`soundEngine.ts`), haptics use the Navigator Vibration API (`hapticsEngine.ts`), and visuals rely on modern Tailwind CSS and SVG primitives.
3. **Meaningful Structural Diversity**: Quality over inflated numbers. A variant must differ in at least one structural dimension: **Layout, Material, Interaction Model, Motion Model, Information Hierarchy, Lighting, Depth, Typography, Character Behavior, or Sensory Profile**.

---

## 2. Step-by-Step Maintenance & Expansion Workflows

### A. How to Add a New Component
1. **Create Component File**: Place the file under `/src/components/<family>/<ComponentName>.tsx`.
2. **Integrate Sensory & Motion Hooks**:
   ```tsx
   import { useSound } from '../../design-system/sound/SoundContext';
   import { useHaptics } from '../../design-system/haptics/HapticContext';
   
   export const MyComponent: React.FC = () => {
     const { playSound } = useSound();
     const { triggerHaptic } = useHaptics();
     
     const handleClick = () => {
       playSound('selection', 'MICRO');
       triggerHaptic('SELECTION');
     };
     return <button onClick={handleClick} className="touch-press font-bold text-xs py-2 px-4 rounded-xl bg-cyan-500 text-black">Click</button>;
   };
   ```
3. **Register in Component Registry**: Open `src/registry/componentRegistry.tsx` and map the string key:
   ```tsx
   import { MyComponent } from '../components/myfamily/MyComponent';
   export const componentRegistry = {
     // ...
     MyComponent,
   };
   ```
4. **Add Catalog Entry Metadata**: Open `src/design-system/catalog/<family>Registry.ts` (or `catalogRegistry.ts`) and append a complete `CatalogEntry` object.

---

### B. How to Add 10 Variants
When building a set of 10 variants (e.g., 10 distinct action button paradigms):
1. **Define 10 Distinct Layouts/Materials**: Do NOT vary just colors. Define 10 distinct interaction or visual material paradigms (e.g., `Liquid Morph`, `Neumorphic Dual Shadow`, `Magnetic Gravitational`, `Hold to Confirm Fill Barrier`, `3D Parallax Tilt`, `Cherry MX Switch`, `Terminal Monospace Kbd`, `Holographic Sci-Fi HUD`, `24K Gold Leaf Specular`, `Claymorphic Inflatable`).
2. **Assign Unique `id`s and `visualStyle`s**: Ensure each item in the catalog array has a distinct `id` (e.g., `btn-liquid-fluid-morph`, `btn-magnetic-cursor-gravity`).
3. **Map Properties to Props or Dedicated Components**: If using a single base component, pass variant props (e.g., `variant="magnetic" | "hold-to-confirm"`). If structural logic differs significantly, create specialized sub-components.

---

### C. How to Add 50 Variants
When creating a large suite of 50 variants (e.g., a complete Navigation or Form family):
1. **Run the Taxonomy Audit First**: Execute an automated check using `npx tsx` on your registry array to verify that all 50 entries have 100% complete metadata fields (`id`, `name`, `component`, `family`, `states`, `codeArtifact`, `aiSpecification`, `responsiveBehavior`, `accessibility`, `performanceTier`, `license`).
2. **Enforce Structural Variance**: Group the 50 items into 5–6 sub-archetypes (e.g., Docks, Rails, Dials, Command Palettes, Circular Wheels, Dynamic Islands).
3. **Verify Zero Duplicates**: Check that no two entries share identical layouts with merely color or border-radius tweaks.

---

### D. How to Create a New Style Family / Archetype
1. **Open Token Specs**: Edit `src/design-system/tokens.ts`.
2. **Add Key to `ArchetypeType`**:
   ```ts
   export type ArchetypeType = 
     | 'restrained-luxury'
     | 'cinematic-dark'
     | 'my-new-archetype';
   ```
3. **Define Token Properties in `ARCHETYPE_TOKENS`**: Specify `bg`, `surface`, `border`, `text`, `accent`, `font`, `radius`, `shadow`, and `blur`.
4. **Update Recipe Engine**: In `src/design-system/recipes/recipeEngine.ts`, ensure `createStyleRecipeFromArchetype()` recognizes the new key and applies the nested border radius formula: $\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$.

---

### E. How to Create a Theme
1. **Open Theme Context**: Edit `src/design-system/tokens/ThemeContext.tsx`.
2. **Define Theme Palette**: Add color mappings for background, surface, text, border, and focus ring states.
3. **Expose Selection Key**: Add the theme identifier to the `ThemeMode` union type and provider controls.

---

### F. How to Create a Motion Recipe
1. **Open Motion Presets**: Edit `src/design-system/recipes/recipeEngine.ts`.
2. **Add Motion Recipe**: Define standard spring physics configurations:
   ```ts
   export const MY_CUSTOM_SPRING = {
     type: 'spring',
     stiffness: 400,
     damping: 25,
     mass: 0.8,
   };
   ```
3. **Expose in `STANDARD_MOTION_RECIPES`**: Ensure Framer Motion components can consume the preset directly via `transition={STANDARD_MOTION_RECIPES.bouncySpring}`.

---

### G. How to Create a Sound Recipe
1. **Open Sound Engine**: Edit `src/design-system/sound/soundEngine.ts`.
2. **Add Sound Key**: Add key to `SoundEffectType` (e.g., `'quantum-warp'`).
3. **Write Web Audio Node Synthesis**:
   ```ts
   case 'quantum-warp': {
     const osc = ctx.createOscillator();
     const gain = ctx.createGain();
     osc.type = 'sawtooth';
     osc.frequency.setValueAtTime(300, now);
     osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
     gain.gain.setValueAtTime(0.2, now);
     gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
     osc.connect(gain);
     gain.connect(ctx.destination);
     osc.start(now);
     osc.stop(now + 0.15);
     break;
   }
   ```

---

### H. How to Add a Character (State-Machine Driven Mascot)
1. **Define State Enum**: Specify states (e.g., `idle`, `username-focus`, `username-typing`, `password-focus`, `password-visible`, `submitting`, `success`, `error`).
2. **Create Avatar Renderer**: Render expression variations using animated vectors or reactive emojis wrapped in Framer Motion spring containers.
3. **Bind to Form Context**: Pass input focus and submit progress events into the mascot state controller (see `CinematicMascotAuth.tsx` for canonical example).

---

### I. How to Add a Rive / dotLottie Animation
1. **Install Package**: `install_applet_package` with `@rive-app/react-canvas` or `@dotlottie/react-player`.
2. **Create Wrapper Component**: Create a responsive canvas wrapper with fallback loading state.
3. **Register in Catalog**: Add entry to `src/design-system/catalog/` with performance tier set to `optimized` or `heavy`.

---

### J. How to Register Licensing (SPDX & CycloneDX SBOM)
1. **Set `license` Field**: In every `CatalogEntry`, assign a valid SPDX 2.3 identifier (e.g., `Apache-2.0`, `MIT`, `BSD-3-Clause`).
2. **Update Dependencies**: Fill out the `dependencies` array with accurate package version references.
3. **Audit via Provenance View**: Open the **License & Provenance** tab in the library app to confirm 100% compliance.

---

### K. How to Create the AI Prompt Specification
1. **Define Specification String**: In `CatalogEntry.aiSpecification`, write a clear prompt instruction describing:
   - Target archetype tokens
   - Component state transitions
   - Required sensory bindings (sound & haptics)
   - Accessibility requirements
2. **Test Generation**: Open `AiHandoffGenerator.tsx` in the app to inspect the formatted markdown prompt generated for Gemini, Antigravity, Claude, and ChatGPT models.

---

### L. How to Export Code
Use `ReuseExportStudio.tsx` inside the specimen inspector modal to export in 5 formats:
- **React 18 + TypeScript**
- **Vue 3 SFC (`<script setup>`)**
- **Web Components (Custom Elements)**
- **HTML5 + Tailwind CSS**
- **Design Tokens (JSON)**

---

### M. How to Test & Verify Changes
1. **Type Check**: Run `lint_applet` (or `npm run lint`) to verify zero TypeScript errors.
2. **Build Check**: Run `compile_applet` to confirm the production bundle builds without errors.
3. **Interactive Inspection**: Open the Specimen Inspector, switch device frames, test interactive states, and verify audio/haptic responses.

---

### N. How to Create a Checkpoint & Rollback Safely
1. **Run Full Verification**: Confirm `lint_applet` and `compile_applet` pass.
2. **Verify File Trees**: Ensure all newly created component files are referenced in `componentRegistry.tsx`.
3. **Rollback Strategy**: If a build breaks, revert recent edits to `componentRegistry.tsx` and the corresponding catalog file.

---

### O. How to Audit Quality (Anti-Slop Criteria)
Ensure no new component violates the anti-slop rules:
- **No arbitrary purple/cyan gradient text on dark backgrounds.**
- **No side-tab left accent borders on rounded cards.**
- **No nested cards inside identical cards.**
- **No plain Inter font as a lazy default.**
- **No raw gray text on colored backgrounds.**

---

### P. How to Avoid Architecture Drift
- **Never inline raw hex values** inside component style props; use `ARCHETYPE_TOKENS` or Tailwind classes.
- **Never hardcode sound synthesis** inside component files; use `useSound().playSound(key, profile)`.
- **Never hardcode haptic vibration arrays** inside component files; use `useHaptics().triggerHaptic(pattern)`.

---

## 3. "When I Start a New Future App" Workflow

Follow this 10-step protocol whenever launching a new application using the Master UI/UX Library:

```
[1. Browse Library] ──► [2. Select Component] ──► [3. Select Style Archetype]
                                                               │
[6. Sensory Recipe] ◄── [5. Motion Model]    ◄── [4. Interaction Model]
        │
        ▼
[7. Review Responsive] ──► [8. Copy Code / AI Prompt] ──► [9. Implement in App]
                                                               │
[10. Refine Style in Library] ◄────────────────────────────────┘
```

1. **Browse Library**: Open the Catalog Discovery grid (`⌘K` to search) and filter by family or mood.
2. **Select Component**: Choose the target specimen (e.g., `CinematicMascotAuth`, `FloatingGlassDock`, `CyberHudCard`).
3. **Select Style Archetype**: Choose from 12 visual archetypes (`restrained-luxury`, `cinematic-dark`, `neumorphic-glass`, `futuristic-cyber`, etc.).
4. **Select Interaction Model**: Configure component state props (`mascotState`, `dockExpansion`, `tiltAngle`).
5. **Select Motion Model**: Choose spring parameters (`bouncySpring`, `gentleSpring`, `stiffSpring`).
6. **Select Sensory Recipe**: Enable matching sound synthesizer profile (`CHIME`, `TICK`, `SHIMMER`) and haptic pulse pattern (`MICRO`, `SUCCESS`).
7. **Review Responsive Behavior**: Test live rendering across 7 device frames (Mobile 390px, Tablet 834px, Desktop 1440px, Ultrawide 2560px, Smartwatch, Foldable, HUD).
8. **Copy Code or AI Prompt**: Click **"Copy Code Artifact"** for React/Vue/HTML source, OR click **"Copy AI Prompt Spec"** to hand off directly to Gemini / Antigravity AI agents.
9. **Implement in Future App**: Paste code or prompt into the target codebase.
10. **Refine Style in Library**: If custom visual adjustments are required, return to the library to tweak token presets and export the updated specification.
