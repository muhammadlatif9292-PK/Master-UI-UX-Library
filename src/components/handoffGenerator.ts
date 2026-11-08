/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CatalogEntry } from '../design-system/catalog/catalogTypes';
import { getCanonicalRecipe } from '../design-system/catalog/canonicalRecipeRegistry';

export type TargetFramework = 'react' | 'nextjs' | 'vue' | 'svelte' | 'html';
export type AppContext = 'standalone' | 'tailwind-app' | 'mui-app' | 'custom-ds';
export type Language = 'typescript' | 'javascript';
export type CssStrategy = 'tailwind-v4' | 'tailwind-v3' | 'css-modules' | 'styled-components';
export type OutputMode = 'both' | 'prompt' | 'code';

export interface HandoffOptions {
  targetFramework: TargetFramework;
  appContext: AppContext;
  language: Language;
  cssStrategy: CssStrategy;
  outputMode: OutputMode;
}

/**
 * Generates the implementation-grade AI handoff specification directly from
 * the selected CatalogEntry's Single Canonical Identity Recipe object.
 */
export function generateImplementationGradeHandoff(entry: CatalogEntry, options: HandoffOptions): string {
  const { targetFramework, appContext, language, cssStrategy, outputMode } = options;
  const recipe = getCanonicalRecipe(entry);

  const frameworkLabel = {
    react: 'React 18+ (Functional Components with Hooks)',
    nextjs: 'Next.js 14+ (App Router Client Component)',
    vue: 'Vue 3 (Composition API <script setup>)',
    svelte: 'Svelte 5 / SvelteKit Component',
    html: 'Vanilla HTML5 + ES6 JavaScript Module',
  }[targetFramework];

  const contextLabel = {
    standalone: 'New Standalone Project from Scratch',
    'tailwind-app': 'Existing Tailwind CSS Application',
    'mui-app': 'Existing Material UI / Component Library Context',
    'custom-ds': 'Existing Custom Enterprise Design System (CSS Variables)',
  }[appContext];

  const langLabel = language === 'typescript' ? 'TypeScript (Strict mode, explicit interfaces)' : 'JavaScript (ESNext with JSDoc annotations)';

  const cssLabel = {
    'tailwind-v4': 'Tailwind CSS v4 (@import "tailwindcss";)',
    'tailwind-v3': 'Tailwind CSS v3 (tailwind.config.js configuration)',
    'css-modules': 'Scoped CSS Modules (.module.css)',
    'styled-components': 'Styled Components / CSS-in-JS',
  }[cssStrategy];

  const promptSpecification = `================================================================================
IMPLEMENTATION-GRADE AI HANDOFF SPECIFICATION: ${entry.name.toUpperCase()} (${entry.component})
PROJECT CONTEXT: ${contextLabel}
TARGET FRAMEWORK: ${frameworkLabel}
LANGUAGE: ${langLabel}
STYLING STRATEGY: ${cssLabel}
CATALOG FAMILY: ${entry.family.toUpperCase()} | VERSION: v${entry.version} | LICENSE: ${entry.license}
ARCHETYPE: ${recipe.archetype} | ACCESSIBILITY: WCAG ${entry.accessibility}
================================================================================

1. COMPONENT PURPOSE & SINGLE CANONICAL IDENTITY:
Construct an enterprise-grade, high-fidelity implementation of '${entry.name}' (${entry.component}).
${entry.description}
Primary functional goal: Deliver an uncompromised, accessible, interactive component specimen with full state handling, spring physics motion, and optional multi-sensory feedback hooks.

2. EXACT VISUAL LANGUAGE:
Archetype & Mood: ${entry.visualStyle} / ${entry.mood}.
Surface Finish: ${recipe.handoffRequirements.materialsAndSurfaces}
Color Tokens: ${recipe.handoffRequirements.colorTokens}
Lighting & Depth: ${recipe.handoffRequirements.lightingAndDepth}

3. COMPOSITION & LAYOUT:
Layout: ${recipe.handoffRequirements.layoutComposition}
Typography: ${recipe.handoffRequirements.typography}

4. SEMANTIC STATES HANDLED:
${recipe.supportedStates.map((s) => `- ${s.toUpperCase()}: Full interactive behavior implemented`).join('\n')}

5. MOTION, SOUND & HAPTICS:
Motion: ${recipe.handoffRequirements.motionPhysics}
Sound & Haptics: ${recipe.handoffRequirements.soundHapticBehavior}

6. RESPONSIVE & ACCESSIBILITY:
Breakpoints: ${recipe.handoffRequirements.responsiveBreakpoints}
WCAG Standard: WCAG ${entry.accessibility} contrast ratio and keyboard focus navigation.

7. DEPENDENCIES & MANIFEST:
Required Packages: ${(entry.dependencies || recipe.dependencies).join(', ')}

${recipe.aiSpecificationPrompt}`;

  const codeOutput = recipe.sourceCode;

  if (outputMode === 'prompt') {
    return promptSpecification;
  }
  if (outputMode === 'code') {
    return codeOutput;
  }

  return `${promptSpecification}\n\n================================================================================\nCANONICAL SOURCE CODE IMPLEMENTATION:\n================================================================================\n\n${codeOutput}`;
}
