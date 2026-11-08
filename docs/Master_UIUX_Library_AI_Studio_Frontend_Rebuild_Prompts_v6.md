# MASTER UI/UX LIBRARY — FULL FRONTEND REBUILD PROMPT PACK
## Google AI Studio — Ease-of-Use, Information Architecture, Visual Polish & Productization

## WHY THESE PROMPTS EXIST

I am a **vibe coder**, not an expert software architect. I have been learning and building with AI for about six months. The current project contains a large amount of sophisticated infrastructure, but that sophistication has become a usability problem for me: there are too many destinations, too many developer-facing concepts, and too many separate labs. I can no longer quickly answer simple questions such as:

- Where do I go to find a login style?
- Where do I see every variation of a component?
- What is the difference between a Style, Theme, Recipe, Preset, Archetype, Lab, Composer, Inspector, and Variant Scaling screen?
- Which screen is the normal path for a beginner?
- Which tools are advanced tools and which are part of the everyday workflow?
- Where do I get the actual code for a selected design?
- Where do I get the AI prompt for my future Vibe Coder?
- Where do I compare two designs?
- How do I save a design for a future project?
- What should I click next?

The application has accumulated a lot of technically useful capabilities, but the **product frontend now needs a deliberate user-experience reset**.

This is why these prompts are not a normal feature roadmap. They are a **frontend product rebuild plan** whose purpose is to transform the current sophisticated system into a library that can be understood and comfortably used by:

**Beginner → Intermediate → Advanced → Grandmaster**

without removing the advanced power.

### The target product

The final app should feel like a combination of:

- a premium design library
- a creative playground
- a polished developer tool
- a visual component marketplace/catalog without commerce clutter
- an interactive design inspector
- an AI handoff workstation

It must feel **easy first, powerful second**.

### The single mental model

A user should understand the product through one simple flow:

**FIND → TRY → CHOOSE → CUSTOMIZE → SAVE → CODE / AI HANDOFF**

Everything else should support this flow.

### Very important: do not destroy the existing work

The current project already contains sophisticated systems and many catalog families. Do NOT throw them away merely because the frontend becomes simpler.

The rebuild should primarily change:

- information architecture
- navigation hierarchy
- discoverability
- screen composition
- terminology
- progressive disclosure
- visual consistency
- interaction clarity
- onboarding
- empty/loading/error states
- code/AI handoff discoverability

Preserve working domain engines unless an audit proves they are harmful or redundant.

---

# CURRENT PROJECT BASELINE

The current project is a React/TypeScript/Vite application with substantial existing infrastructure including:

- MasterLibraryApp
- HomeCommandCenter
- CatalogDiscovery
- ComponentPreviewEngine
- StateInspector
- StyleExplorer
- TokenPlayground
- MotionLab
- SoundLab
- HapticLab
- ExperienceComposerLab
- ComparisonMatrix
- PersonalOrganizer
- CuratorReviewStudio
- VariantScalingStudio
- AiHandoffGenerator
- CodeViewer
- ReuseExportStudio
- AccessibilityLab
- ResponsiveTestingLab
- PerformanceLab
- ProvenanceLab
- Authentication family
- Navigation family
- Button family
- Input family
- Card family
- Controls
- Overlay utilities
- Feedback states
- Onboarding
- Dashboard/data visualizations
- AI interface catalog
- Character system
- Spatial/3D system
- Scientific system
- Workflow system
- Page experiences
- general-purpose catalog

The current shell exposes a very large number of navigation tabs and advanced tools. That is the central UX problem this rebuild must solve.

---

# THE PRODUCT WE ARE BUILDING

## Primary navigation should become simple

The preferred mental model is approximately:

```text
HOME
  ↓
EXPLORE
  ↓
COMPONENT
  ↓
VARIANTS
  ↓
LIVE PREVIEW
  ↓
CUSTOMIZE
  ↓
COMPARE
  ↓
SAVE
  ↓
CODE / AI HANDOFF
```

Advanced systems should still exist, but live behind clear secondary locations such as:

- Labs
- Advanced
- Inspect
- Settings

Do not force a beginner to understand the architecture of the library before using it.

---

# DESIGN DIRECTION FOR THE LIBRARY APPLICATION ITSELF

The library's own frontend should use a coherent house style:

## Premium Creative DevTool / Cinematic Design Laboratory

Visual character:
- dark-first
- high-quality typography
- subtle luminous accents
- deep surfaces with restrained glass
- precise spacing
- clear hierarchy
- subtle atmospheric motion
- tactile controls
- beautiful preview canvas
- professional inspector
- refined empty/loading/error states
- optional sound, never noisy

The application shell should NOT look like a generic documentation site.

It should also NOT look like a chaotic cyberpunk dashboard.

The catalog contents may be wildly different — Liquid Glass, Brutalist, Retro, Scientific,
Mascot, Holographic, Neumorphic, Editorial, etc. — but the library shell that contains them
must remain visually coherent.

---

# TERMINOLOGY RULE

Use plain language first.

Instead of exposing technical vocabulary as the main UI:

- "Archetype" → **Style**
- "Recipe" → **Design Recipe**
- "Variant Scaling" → **Create More Variations**
- "Curator Review" → **Review & Quality**
- "State Inspector" → **States**
- "Experience Composer" → **Customize**
- "Reuse Export Studio" → **Use in My App**
- "Provenance" → **Source & License**
- "Performance Lab" → **Performance**
- "Responsive Lab" → **Devices**
- "AI Handoff" → **AI Prompt**

Technical names can appear in secondary/detail views, but the main UX should use language a beginner understands.

---

# BEGINNER → GRANDMASTER EXPERIENCE MODEL

## Beginner
Sees:
- Explore
- Search
- Categories
- Beautiful previews
- Simple style names
- "Try it"
- "Use it"

## Intermediate
Gets:
- states
- customization
- style combinations
- compare
- collections
- responsive previews

## Advanced
Gets:
- tokens
- motion
- sound
- haptics
- code
- dependencies
- performance

## Grandmaster
Gets:
- architecture
- event bus
- recipe internals
- provenance
- variant scaling
- quality curation
- advanced labs

The UI should reveal this complexity progressively instead of showing all levels at once.

---

# UNIVERSAL REBUILD RULES

1. Inspect before changing.
2. Preserve functioning infrastructure.
3. Prefer consolidation over duplication.
4. Prefer progressive disclosure over hiding features permanently.
5. Never make a user learn internal architecture to use the catalog.
6. Never make the main navigation expose every advanced tool.
7. Every major screen needs clear primary and secondary actions.
8. Every important component needs a real live preview.
9. Every mature entry needs code and AI handoff.
10. Animation must communicate state or spatial change.
11. Sound must be optional, short, semantic and non-annoying.
12. Accessibility, reduced motion and performance are part of the product.
13. The library app itself must look production-ready.
14. Do not add fake functionality.
15. Do not call something complete because it compiles.
16. Do not rewrite a stable system solely to make it prettier.
17. When uncertain, preserve the existing behavior and improve its presentation/discoverability.

---

# UNIVERSAL PHASE GATE

At the end of EVERY phase:

- run the app
- inspect the actual rendered result
- test desktop and narrow mobile
- test keyboard navigation where relevant
- inspect focus states
- check console/runtime errors
- verify existing routes/features used by the phase
- check for duplicate UI systems introduced by the phase
- update project docs
- note any limitations honestly
- create a checkpoint/commit when available
- stop at the phase boundary

Do not continue automatically into unrelated phases.

---

# PHASE 01 — FORENSIC FRONTEND AUDIT AND USER-PROBLEM MAP

### Prompt to Google AI Studio

```text
You are the lead product designer, UX architect, frontend architect, and usability specialist for this existing Master UI/UX Library.

This is a post-50-prompt project. Do NOT rebuild from scratch.

First inspect the actual repository, application shell, current navigation, routes/tabs,
component registries, preview engine, styles, themes, composer, code viewer, AI handoff,
collections, labs, advanced tools, and the current documentation.

My biggest problem is NOT lack of features. My biggest problem is that the product has
become difficult to understand and use. I am a vibe coder with about six months of coding
experience, not a specialist developer. I need the finished application to be intuitive
enough for a beginner while preserving deep power for advanced users.

Create a forensic UX report with:
1. current mental model of the product
2. all current user-facing destinations
3. duplicate or overlapping concepts
4. confusing terminology
5. screens that feel like developer internals instead of product features
6. tasks that currently require too many clicks
7. places where the user is forced to understand architecture
8. likely beginner failure points
9. likely expert power-user needs
10. screens that should be merged, nested, renamed, or moved to Advanced
11. missing guidance, breadcrumbs, context, empty states, or next-step actions
12. visual inconsistencies
13. areas where the app looks like documentation instead of a product
14. all places where code and AI handoff are difficult to discover

DO NOT change code in this phase except for harmless diagnostic instrumentation if needed.

Produce a proposed new information architecture based on one simple workflow:
FIND → TRY → CHOOSE → CUSTOMIZE → SAVE → CODE / AI HANDOFF.

Explicitly protect existing domain engines and identify what should remain underneath the
new UX rather than being deleted.

End with a prioritized rebuild plan and a list of UX invariants that must never regress.
```

### Acceptance
A clear before/after information architecture exists. No major code has been destructively rewritten.

---

# PHASE 02 — NEW INFORMATION ARCHITECTURE AND NAVIGATION HIERARCHY

### Prompt

```text
Implement the approved information architecture.

The default user should see a small number of understandable primary destinations.
Use a structure close to:

HOME
EXPLORE
COLLECTIONS
CUSTOMIZE
LABS / ADVANCED

Keep Settings accessible but secondary.

Do not expose every current technical lab as a first-level primary navigation item.
Nest advanced tools logically.

Create a clear secondary navigation model for component families:
Navigation, Auth, Buttons, Inputs, Cards, Controls, Overlays, Feedback, Dashboards,
AI, Spatial, Scientific, Workflow, Pages, and General.

The user should be able to reach any existing catalog family, but the hierarchy must not
feel like 37 competing applications.

Keep a global command/search launcher for power users, but do not make it the only way to
reach content.

Use human-readable labels and supporting descriptions.

Acceptance:
- beginner can understand the primary navigation
- every existing major feature remains reachable
- advanced tools are discoverable but not overwhelming
- no dead navigation
- mobile navigation is equally understandable
```

---

# PHASE 03 — REBUILD THE APPLICATION SHELL AS A PREMIUM DEVTOOL

### Prompt

```text
Rebuild the shell visually and spatially while preserving the underlying features.

The shell must feel like a premium creative developer tool.

Create a deliberate layout hierarchy:

TOP BAR
- product identity
- current context
- search/command entry
- optional status
- profile/settings

LEFT NAVIGATION
- concise primary groups
- clear icons + labels
- collapsible on desktop
- drawer on mobile

MAIN WORKSPACE
- page title
- one-line explanation
- primary action
- content

OPTIONAL RIGHT INSPECTOR
- contextual only
- closed by default for beginners
- opened when needed

Use:
- deep surfaces
- restrained glass
- crisp typography
- luminous accent used sparingly
- consistent spacing
- subtle depth
- fast, polished transitions

Do not create a giant dashboard full of metrics.
The user should always know what the current screen is for and what action is primary.

Acceptance: the shell itself looks like a finished product, not a component showcase or
technical documentation website.
```

---

# PHASE 04 — HOME: MAKE THE PRODUCT EXPLAIN ITSELF

### Prompt

```text
Rebuild the Home screen around user intent rather than technical features.

The primary Home questions should be:

"What are you building?"
"What do you want to find?"
"What did you use recently?"

Provide prominent paths such as:
- Find a component
- Browse styles
- Build a design
- Compare designs
- My collection

Add a large natural-language search field.

Create a small curated area of featured experiences without turning Home into an endless
feed.

Show recent/favorite items as useful shortcuts.

Include a simple 3-step explanation:
1. Find
2. Try
3. Use

For advanced users, expose an "Advanced Labs" entry without putting every lab on Home.

Acceptance: someone unfamiliar with the product can understand its purpose from Home in
under one minute.
```

---

# PHASE 05 — EXPLORE: THE HEART OF THE PRODUCT

### Prompt

```text
Rebuild Explore as the central discovery experience.

The user should be able to think in either direction:

I need a COMPONENT → show component families → variants

or

I want a STYLE → show styles → compatible components

Support both.

Create:
- search
- component categories
- style categories
- intent chips
- beginner-friendly filters
- advanced filters tucked behind "More filters"

Use large, visual preview tiles with:
- component name
- style name
- short purpose
- tags
- favorite
- quick preview

Do not overload the first screen with technical metadata.

Make filter selection understandable in plain language.

Acceptance: user can find an interactive login, button, navigation or card style quickly
without knowing internal library terminology.
```

---

# PHASE 06 — COMPONENT FAMILY EXPERIENCE

### Prompt

```text
Redesign every component family landing page to use the same mental model.

Pattern:

Title
Purpose
Popular styles
All variants
Filters
Preview grid

For each family show a friendly explanation of what the component is for.

Example for Login:
"Sign-in experiences for products that need authentication."

Then offer visual families such as:
- Luxury
- Glass
- Futuristic
- Interactive
- Minimal
- Retro
- Scientific
- Character

Keep technical details secondary.

Make the family UI reusable across Auth, Navigation, Buttons, Inputs, Cards, Controls,
Overlays, Feedback, Dashboard, AI and specialized catalog families.
```

---

# PHASE 07 — VARIANT DETAIL PAGE: THE MOST IMPORTANT SCREEN

### Prompt

```text
Create one canonical Variant Detail page used by every mature catalog entry.

It should answer in order:

1. What is this?
2. What does it look/feel like?
3. How does it behave?
4. What states does it have?
5. How does it work on mobile?
6. What does it sound/feel like?
7. Can I customize it?
8. Can I compare it?
9. Can I save it?
10. Can I use the code?
11. Can I give it to an AI coder?

Layout:
- hero preview canvas
- title/style/purpose
- prominent Try / Customize / Save actions
- states strip
- behavior summary
- responsive preview
- optional sensory preview
- code tab
- AI Prompt tab
- technical details collapsed

Do not make the page look like a documentation article.
Make it feel like an interactive product specimen.
```

---

# PHASE 08 — PREVIEW CANVAS AND STATES

### Prompt

```text
Redesign the ComponentPreviewEngine and StateInspector experience as one understandable
preview system.

Default view:
LIVE PREVIEW

Secondary controls:
- Device
- State
- Theme
- Intensity
- Sound
- More

Do not show 20 controls at once.
Use progressive disclosure.

The user must be able to trigger meaningful states visibly:
idle, hover, focus, press, loading, success, error, disabled, selected, expanded,
dragging when relevant.

Show a compact state timeline or state chips so users understand what they are testing.

Provide a "What changed?" explanation for advanced interaction where useful.

Acceptance: a beginner can preview a component without knowing what a state machine is.
```

---

# PHASE 09 — CODE VIEW: MAKE REUSE OBVIOUS

### Prompt

```text
Rebuild CodeViewer and code-related UI around one clear user goal:

"I want this component in my app."

Provide a simple hierarchy:
- Quick Start
- Component
- Dependencies
- Optional styles/assets
- Advanced internals

Buttons:
- Copy Code
- Copy Usage
- Copy AI Prompt
- Export

Clearly show what must be installed and what can be copied directly.

Never show a code sample that does not correspond to the actual preview implementation.

Add framework/stack context when necessary, but keep the default explanation simple.
```

---

# PHASE 10 — AI HANDOFF: TURN DESIGN INTO A VIBE-CODER BRIEF

### Prompt

```text
Rebuild the AI Handoff experience so a non-expert can use it confidently.

The primary question is:
"What should I tell my AI coder?"

Provide a generated brief with sections:
- component
- visual style
- layout
- interaction
- states
- motion
- sound
- haptic option
- responsive
- accessibility
- performance
- dependencies
- exact acceptance criteria

Provide:
- Copy Prompt
- Copy Recipe
- View Details

Use plain language first and technical detail second.

Add a note:
"This prompt describes the selected library design. Your target app may need integration
changes. Do not rewrite unrelated architecture."

Acceptance: a beginner can copy a prompt and understand what it is for.
```

---

# PHASE 11 — STYLE LIBRARY: MAKE STYLES VISUAL AND HUMAN

### Prompt

```text
Rebuild StyleExplorer so styles are experienced visually rather than presented as a
wall of technical labels.

Each style card should show:
- name
- mood
- a small multi-component sample
- best for
- avoid when
- compatible component families

Examples:
Liquid Glass
Luxury Minimal
Cinematic Dark
Scientific Lab
Cyber Neon
Neumorphic
Mechanical
Neo-Brutalist
Editorial
Organic
Retro Computing
AI Character
and more.

Allow selecting a style and seeing compatible components.

Do not make style discovery depend on technical knowledge.
```

---

# PHASE 12 — CUSTOMIZE / EXPERIENCE COMPOSER REBUILD

### Prompt

```text
Rebuild ExperienceComposerLab as a simple progressive customization tool.

Beginner view:
1. Choose Visual
2. Choose Motion
3. Choose Interaction
4. Optional Sound
5. Optional Haptics

Advanced view can expose:
- lighting
- typography
- theme palette
- intensity
- performance tier
- compatibility details

Show a live preview in the center.

Right side or bottom sheet:
"Your Design"

Provide:
- Save
- Favorite
- Compare
- Code
- AI Prompt

Add compatibility warnings only when real conflicts exist.
Explain conflicts in plain language.

Do not make the user manage internal object names or recipe IDs.
```

---

# PHASE 13 — COLLECTIONS / FAVORITES / RECENT

### Prompt

```text
Rebuild PersonalOrganizer as a useful personal workspace.

Primary views:
- Favorites
- My Collections
- Recently Viewed
- Saved Designs
- Saved Recipes

Allow a component to be saved from any preview screen.

Collections should support notes such as:
"Use for my AI app"
"Good mobile navigation"
"Need lighter motion"

Show thumbnails and the selected style, not only IDs.

Keep organization simple enough for beginners while allowing power users to maintain
large libraries.
```

---

# PHASE 14 — COMPARE: MAKE DECISION-MAKING EASY

### Prompt

```text
Rebuild ComparisonMatrix into an A/B design decision tool.

Allow 2–4 designs side by side.

Compare:
- visual
- interaction
- motion
- responsiveness
- accessibility
- performance
- code/dependency complexity

Keep the main comparison visual.
Put technical scoring behind "Details".

Provide a clear winner/save action for the user's selected choice.

The user should be able to click a component in the comparison and open its detail page.
```

---

# PHASE 15 — ADVANCED TOOLS: HIDE COMPLEXITY WITHOUT REMOVING POWER

### Prompt

```text
Reorganize all advanced systems into an Advanced/Labs area.

Group them by user goal:

UNDERSTAND
- Architecture
- Event Bus
- Tokens

TUNE
- Motion
- Sound
- Haptics
- Performance
- Accessibility
- Responsive

CREATE
- Variant Scaling
- Composer
- Spatial
- Scientific
- Workflow

CURATE
- Review
- Provenance
- License

Do not delete any working functionality.

Create clear descriptions for every advanced tool.

A beginner should never need to open these screens for ordinary catalog usage.
```

---

# PHASE 16 — ONBOARDING / FIRST-RUN EXPERIENCE

### Prompt

```text
Create a very short optional onboarding experience that explains the product in under
one minute.

Steps:
1. Find a component
2. Explore styles
3. Try it live
4. Customize it
5. Copy code or AI prompt

Offer:
- Skip
- Take the tour
- Don't show again

Do not force an interactive tutorial on every visit.

Use subtle motion and optional sound. The onboarding should itself demonstrate the
quality of the product.
```

---

# PHASE 17 — SEARCH AND COMMAND CENTER

### Prompt

```text
Unify global search and command behavior.

Natural searches should understand requests such as:
- interactive login
- glass login
- premium navigation
- scientific dashboard
- minimal dark card
- mascot input
- liquid button
- AI workspace

Return results grouped by:
Components
Styles
Saved Designs
Labs

For power users, support keyboard shortcuts and command actions.

Do not make the command palette the primary UX for beginners.
```

---

# PHASE 18 — REBUILD AUTH / NAV / BUTTON / INPUT / CARD PREVIEWS AS FLAGSHIP QUALITY

### Prompt

```text
Audit and visually rebuild the flagship family previews:
Authentication, Navigation, Buttons, Inputs, Cards.

Do not focus on quantity yet.
Select representative styles that clearly demonstrate the design-system range.

Each specimen must feel production-quality and must support real interaction states.

Authentication should include at least one original interactive mascot experience.
Navigation should include at least one fluid/liquid experience and one restrained minimal
experience.
Buttons should show tactile and expressive variants.
Inputs should show state-driven focus/validation.
Cards should show spatial/depth variants.

The goal is a showcase-quality benchmark that future catalog entries must match.
```

---

# PHASE 19 — FEEDBACK, OVERLAYS, CONTROLS AND ONBOARDING QUALITY PASS

### Prompt

```text
Bring the same premium quality to:
Feedback, Overlays, Controls and Onboarding.

Unify state behavior, spacing, typography, focus treatment, motion and sound behavior.

Use the same UX language across families.

Examples:
- success feels like success everywhere
- errors are recoverable everywhere
- dialogs behave consistently
- sheets feel related
- buttons and toggles share interaction physics when appropriate

Do not force identical visuals; unify behavior and quality, not aesthetics.
```

---

# PHASE 20 — DASHBOARD / AI / CHARACTER / SPECIALIZED EXPERIENCES

### Prompt

```text
Apply the new product UX model to Dashboard, AI, Character, Spatial, Scientific,
Workflow and Page Experience families.

Each family should have:
- a plain-language introduction
- curated featured examples
- browse all variants
- live preview
- detail page
- code/AI handoff

Do not expose specialized internal complexity before the user asks for it.

For scientific/workflow interfaces, preserve technical precision while making the outer
navigation and explanation approachable.
```

---

# PHASE 21 — SOUND, MOTION AND HAPTICS AS A SINGLE UX LAYER

### Prompt

```text
Unify motion, sound and haptics through the existing semantic event architecture.

The product should behave coherently:

PRESS
→ visual press
→ optional micro-sound
→ optional subtle haptic

SUCCESS
→ visual confirmation
→ optional harmonic cue
→ optional confirmation haptic

NAVIGATION
→ visual transition
→ very subtle navigation cue when enabled

Do not add sound everywhere.
Do not make ambience mandatory.
Create a simple sensory settings area with:
- Off
- Subtle
- Full

Respect reduced-motion and reduced-distraction settings.
```

---

# PHASE 22 — RESPONSIVE EXPERIENCE REBUILD

### Prompt

```text
Make the product mobile-first in behavior, not merely responsive in width.

Mobile must make it easy to:
- browse categories
- search
- inspect a preview
- change a state
- save a design
- compare designs
- copy code
- copy AI prompt

Use bottom sheets or adaptive panels where desktop inspectors are too dense.

Avoid tiny controls and horizontal overflow.

Desktop can use richer split-panel workflows; mobile should simplify them rather than
shrinking every desktop panel.
```

---

# PHASE 23 — ACCESSIBILITY AND COGNITIVE CLARITY

### Prompt

```text
Perform a UX accessibility pass focused not only on WCAG mechanics but cognitive clarity.

Check:
- headings
- landmarks
- focus
- labels
- keyboard order
- target sizes
- contrast
- motion
- sound dependence
- clear terminology
- error recovery
- predictable navigation

Every screen should answer:
Where am I?
What can I do?
What just happened?
What should I do next?

Do not rely on color or animation alone to communicate meaning.
```

---

# PHASE 24 — PERFORMANCE AND PERCEIVED PERFORMANCE

### Prompt

```text
Audit and improve performance without flattening the visual quality.

Preserve lazy loading already introduced.

Measure:
- initial load
- route transitions
- heavy spatial/3D features
- asset loading
- preview loading
- expensive effects
- unnecessary rerenders

Add graceful low-power fallbacks.

Also improve perceived performance:
- immediate interaction feedback
- no artificial waits
- useful loading states
- progressive loading for heavy previews
- stable layout during loading
```

---

# PHASE 25 — CATALOG QUALITY, 50+ VARIANTS AND STYLE-FIT CURATION

### Prompt

```text
Now audit catalog diversity.

Do not inflate counts through recolors.

For each major component family, ensure variants meaningfully differ in:
- composition
- material
- typography
- interaction model
- motion
- lighting
- depth
- sound behavior
- character behavior where appropriate

Use semantic fit. A style that works brilliantly for a login may be wrong for a scientific
instrument.

Mark entries:
Draft
Experimental
Reviewed
Production Candidate
Deprecated

Keep the catalog useful rather than merely large.
```

---

# PHASE 26 — CODE + AI + PREVIEW INTEGRITY

### Prompt

```text
Audit the relationship between:
LIVE PREVIEW
CODE
AI PROMPT
METADATA

For representative entries, verify that all four describe the same design.

A style change in the preview must not leave stale code or stale AI metadata.

A code export must not depend on undocumented files.

An AI prompt must not describe controls that the component does not actually implement.

Fix drift and create tests/checks where practical.
```

---

# PHASE 27 — PRODUCT LANGUAGE AND VISUAL POLISH PASS

### Prompt

```text
Perform a dedicated copywriting and UX-language pass.

Replace unnecessarily technical labels in primary views.

Use concise helper text.

Improve:
- button labels
- empty states
- section headings
- tooltips
- onboarding
- error messages
- confirmation messages
- filter names
- status names

Then perform a visual polish pass for:
- typography hierarchy
- spacing rhythm
- density
- panel alignment
- icon consistency
- border treatment
- shadows
- glass restraint
- animation restraint

The goal is to make the product feel authored by a mature design team.
```

---

# PHASE 28 — BEGINNER / ADVANCED MODES AND PROGRESSIVE DISCLOSURE

### Prompt

```text
Create a user-friendly complexity model.

Default mode:
BEGINNER / STANDARD

Optional:
ADVANCED

Do not create a childish beginner mode. It should simply hide implementation complexity.

Standard mode shows:
- Browse
- Preview
- Customize
- Save
- Code
- AI Prompt

Advanced mode reveals:
- token details
- event behavior
- motion details
- sensory details
- performance
- provenance
- internal architecture

Remember the user's mode preference.
```

---

# PHASE 29 — FULL REAL-WORLD USER JOURNEY QA

### Prompt

```text
Run a complete product journey as if you are a new user who knows nothing about the
architecture.

Scenario A:
"I need a beautiful login for an app."

Scenario B:
"I want a futuristic navigation."

Scenario C:
"I found a card I like. How do I get it into my application?"

Scenario D:
"I want to compare two versions."

Scenario E:
"I want to save a design for a future project."

Scenario F:
"I want to understand why a style behaves differently on mobile."

For each journey, record:
- clicks/taps
- confusing screens
- unclear labels
- dead ends
- redundant steps
- unnecessary technical concepts
- missing feedback
- places where the intended next action is unclear

Fix the discovered UX problems.

Do not add new feature categories during this QA phase.
```

---

# PHASE 30 — FINAL FRONTEND PRODUCTIZATION AND MASTER BASELINE

### Prompt

```text
This is the final frontend productization pass.

Treat the project as a product that will be used for years.

Verify the complete primary workflow:

FIND
→ TRY
→ CHOOSE
→ CUSTOMIZE
→ SAVE
→ COMPARE
→ CODE / AI HANDOFF

Then verify the library itself is polished:
- Home
- Explore
- Component families
- Variant detail
- Preview
- States
- Customize
- Compare
- Collections
- Code
- AI Prompt
- Advanced/Labs
- Settings

Verify desktop and mobile.
Verify beginner and advanced discoverability.
Verify accessibility, motion, sound, haptics and performance behavior.
Verify no existing major capability became unreachable.
Verify no dead routes or misleading labels remain.

Create/update:
- README.md
- docs/MASTER_OPERATING_STATE.md
- docs/OPERATING_MANUAL.md
- docs/UX_PRINCIPLES.md
- docs/NAVIGATION_MAP.md
- docs/CATALOG_ENTRY_CONTRACT.md

The final operating manual should explain the product in plain language first and
technical architecture second.

Do not declare success because the build compiles. Declare success only if the product
is genuinely easier to understand and use.
```

---

# FINAL UX DEFINITION OF DONE

The product is ready when a beginner can do this without understanding the architecture:

```text
Open library
   ↓
Search for a component
   ↓
See beautiful variants
   ↓
Open one
   ↓
Interact with it
   ↓
Try states
   ↓
Customize if needed
   ↓
Save or compare
   ↓
Copy code or AI prompt
```

And an expert can still go deeper:

```text
Preview
  ↓
States
  ↓
Tokens
  ↓
Motion
  ↓
Sound/Haptics
  ↓
Performance
  ↓
Provenance
  ↓
Architecture
```

That is the correct balance.

## The library's own UI should communicate this philosophy:

**Simple at first. Deep when requested. Beautiful throughout.**

## Master product promise

> **You do not need to understand how the library is built in order to use what it has built.**

> **The complexity belongs behind the experience, not in front of the user.**

> **The library should make choosing excellent UI easier than inventing it from scratch.**
