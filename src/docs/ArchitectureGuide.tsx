/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Layers, Cpu, Palette, Volume2, Sparkles, Code, CheckCircle2 } from 'lucide-react';

export function ArchitectureGuide() {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-zinc-900/90 rounded-2xl border border-zinc-800 text-zinc-100 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 text-cyan-400">
          <Layers className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Master UI/UX Architecture Guide</h1>
          <p className="text-zinc-400 text-sm">Developer manual for extending component families and creating new visual recipes.</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Core Principle */}
        <section className="p-6 bg-black/40 rounded-xl border border-zinc-800">
          <h2 className="text-lg font-semibold text-cyan-400 flex items-center gap-2 mb-3">
            <Cpu className="w-5 h-5" /> 1. Separation of Behavior and Presentation
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed mb-4">
            The core architectural principle of this library is the strict decoupling of headless component behavior from visual recipes, motion physics, sensory feedback, and metadata. You <span className="text-red-400 font-semibold">never</span> duplicate component logic (such as form validation, keyboard handlers, or submission state machines) for different styles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <span className="text-cyan-400 font-bold block mb-1">Headless Logic</span>
              Manages state, validation, accessibility attributes, and event handlers.
            </div>
            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <span className="text-purple-400 font-bold block mb-1">Visual Recipe</span>
              Declarative Tailwind CSS classes, typography, lighting, and surface textures.
            </div>
            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <span className="text-amber-400 font-bold block mb-1">Sensory Recipe</span>
              Procedural Web Audio synthesizer cues and haptic vibration patterns.
            </div>
          </div>
        </section>

        {/* How to add a new visual variant */}
        <section className="p-6 bg-black/40 rounded-xl border border-zinc-800">
          <h2 className="text-lg font-semibold text-purple-400 flex items-center gap-2 mb-3">
            <Palette className="w-5 h-5" /> 2. How to Add a New Visual Variant (Zero Component Duplication)
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-sm text-zinc-300">
            <li className="pl-2">
              <strong className="text-white">Select the Component Family:</strong> Locate the target family (e.g., <code className="text-cyan-300">login</code>) in <code className="text-cyan-300">src/registry/components/</code>.
            </li>
            <li className="pl-2">
              <strong className="text-white">Define the Style Recipe:</strong> Call <code className="text-cyan-300">createStyleRecipeFromArchetype()</code> or write a custom <code className="text-cyan-300">StyleRecipe</code> object specifying your wrapper, surface, lighting, typography, inputs, and button classes.
            </li>
            <li className="pl-2">
              <strong className="text-white">Attach Motion & Sensory Profiles:</strong> Choose a standard motion spring preset and an acoustic feedback profile (e.g., <code className="text-cyan-300">glass-tap</code> or <code className="text-cyan-300">laser-beep</code>).
            </li>
            <li className="pl-2">
              <strong className="text-white">Register in the Registry:</strong> Add your new <code className="text-cyan-300">ComponentVariant</code> object to the family's variant array in <code className="text-cyan-300">componentRegistry.ts</code>. It immediately becomes browseable, testable in the live sandbox, exportable to standalone code, and convertible to an AI prompt.
            </li>
          </ol>
        </section>

        {/* How to add a new component family */}
        <section className="p-6 bg-black/40 rounded-xl border border-zinc-800">
          <h2 className="text-lg font-semibold text-amber-400 flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5" /> 3. How to Add a New Component Family
          </h2>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
              <span>Define the new family ID in <code className="text-cyan-300">ComponentFamilyId</code> inside <code className="text-cyan-300">src/types/architecture.ts</code>.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
              <span>Implement the headless controller hook (managing internal state, keyboard navigation, and aria landmarks).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
              <span>Create the polymorphic renderer that accepts the headless state and active <code className="text-cyan-300">StyleRecipe</code>, rendering the UI purely through declarative token classes.</span>
            </li>
          </ul>
        </section>

        {/* Code Export & AI Handoff */}
        <section className="p-6 bg-black/40 rounded-xl border border-zinc-800">
          <h2 className="text-lg font-semibold text-emerald-400 flex items-center gap-2 mb-3">
            <Code className="w-5 h-5" /> 4. Standalone Code Export & AI Vibe-Coder Handoff
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Every registered variant carries its own standalone code artifact and AI specification. When exported, the code is self-contained with zero reliance on the catalog infrastructure, ready to be dropped into any future application.
          </p>
        </section>
      </div>
    </div>
  );
}
