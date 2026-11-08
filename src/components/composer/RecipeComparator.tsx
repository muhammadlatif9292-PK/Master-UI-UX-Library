/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ExperienceRecipe } from './types';
import { InteractiveLiveStage } from './InteractiveLiveStage';
import { PRESET_RECIPES } from './composerData';
import { GitCompare, ArrowRightLeft, Sparkles, Check, Layers } from 'lucide-react';

interface RecipeComparatorProps {
  currentRecipe: ExperienceRecipe;
  savedRecipes: ExperienceRecipe[];
  onSelectRecipeA?: (recipe: ExperienceRecipe) => void;
  onSelectRecipeB?: (recipe: ExperienceRecipe) => void;
}

export function RecipeComparator({
  currentRecipe,
  savedRecipes,
}: RecipeComparatorProps) {
  const allAvailable = [...savedRecipes, ...PRESET_RECIPES.filter((p) => !savedRecipes.some((s) => s.id === p.id))];

  const [recipeAId, setRecipeAId] = useState<string>(currentRecipe.id);
  const [recipeBId, setRecipeBId] = useState<string>(allAvailable[1]?.id || PRESET_RECIPES[1].id);

  const recipeA = allAvailable.find((r) => r.id === recipeAId) || currentRecipe;
  const recipeB = allAvailable.find((r) => r.id === recipeBId) || PRESET_RECIPES[1];

  const dimensions: Array<{ label: string; key: keyof ExperienceRecipe }> = [
    { label: '1. Visual Material', key: 'visual' },
    { label: '2. Motion Profile', key: 'motion' },
    { label: '3. Interaction Physics', key: 'interaction' },
    { label: '4. Lighting Engine', key: 'lighting' },
    { label: '5. Sound Synthesizer', key: 'sound' },
    { label: '6. Haptic Feedback', key: 'haptic' },
    { label: '7. Typography System', key: 'typography' },
    { label: '8. Theme Palette', key: 'theme' },
    { label: '9. Intensity Level', key: 'intensity' },
    { label: '10. Performance Tier', key: 'performanceTier' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <GitCompare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Side-by-Side Experience Comparator</h2>
            <p className="text-xs text-zinc-400">
              Audit sensory and physical differences between two synthesized experience recipes in real time.
            </p>
          </div>
        </div>

        {/* Quick Swap Trigger */}
        <button
          onClick={() => {
            const temp = recipeAId;
            setRecipeAId(recipeBId);
            setRecipeBId(temp);
          }}
          className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono font-semibold text-zinc-200 flex items-center gap-2 transition-all self-start md:self-auto"
        >
          <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
          Swap Positions
        </button>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selector A */}
        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">
            Recipe Slot A (Primary)
          </label>
          <select
            value={recipeAId}
            onChange={(e) => setRecipeAId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-zinc-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
          >
            {allAvailable.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.visual} + {r.motion} + {r.sound})
              </option>
            ))}
          </select>
        </div>

        {/* Selector B */}
        <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-violet-400 font-bold block">
            Recipe Slot B (Comparative)
          </label>
          <select
            value={recipeBId}
            onChange={(e) => setRecipeBId(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-zinc-700 text-xs font-mono text-white focus:outline-none focus:border-violet-400"
          >
            {allAvailable.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.visual} + {r.motion} + {r.sound})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Side-by-Side Stages */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Slot A: {recipeA.name}
            </span>
          </div>
          <InteractiveLiveStage recipe={recipeA} stageTitle="Slot A" isCompact />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-mono font-bold text-violet-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Slot B: {recipeB.name}
            </span>
          </div>
          <InteractiveLiveStage recipe={recipeB} stageTitle="Slot B" isCompact />
        </div>
      </div>

      {/* Side-by-Side Dimension Diff Table */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white font-mono">10-Dimension Architectural Comparison Matrix</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th className="py-3 px-4 uppercase">Experience Dimension</th>
                <th className="py-3 px-4 uppercase text-cyan-400">Slot A: {recipeA.name}</th>
                <th className="py-3 px-4 uppercase text-violet-400">Slot B: {recipeB.name}</th>
                <th className="py-3 px-4 uppercase text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {dimensions.map(({ label, key }) => {
                const valA = String(recipeA[key]);
                const valB = String(recipeB[key]);
                const isMatch = valA === valB;

                return (
                  <tr key={key} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 font-bold text-zinc-300">{label}</td>
                    <td className="py-3 px-4 text-cyan-300 font-semibold">{valA}</td>
                    <td className="py-3 px-4 text-violet-300 font-semibold">{valB}</td>
                    <td className="py-3 px-4 text-center">
                      {isMatch ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          IDENTICAL
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                          DIVERGENT
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
