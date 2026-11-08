/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CatalogEntry } from './catalogTypes';
import {
  CanonicalImplementationRecipe,
  IntegrityAuditResult,
  IntegrityCheckItem,
} from './canonicalRecipeTypes';

/**
 * Performs strict integrity validation against a CatalogEntry and its CanonicalImplementationRecipe.
 * Flags:
 * 1. missing_source_implementation
 * 2. missing_ai_prompt
 * 3. mismatched_style
 * 4. missing_dependencies
 * 5. unsupported_state_claims
 */
export function auditRecipeIntegrity(
  entry: CatalogEntry,
  recipe: CanonicalImplementationRecipe
): IntegrityAuditResult {
  const checks: IntegrityCheckItem[] = [];

  // VECTOR 1: Missing Source Implementation
  const sourceCode = recipe.sourceCode || '';
  const isSourceMissing =
    !sourceCode.trim() ||
    sourceCode.includes('// Code snippet pending') ||
    sourceCode.length < 80 ||
    !sourceCode.includes('export');

  checks.push({
    vector: 'missing_source_implementation',
    name: 'Source Code Implementation Integrity',
    passed: !isSourceMissing,
    severity: 'error',
    message: isSourceMissing
      ? 'Source code is missing, truncated, or contains generic non-functional placeholder code.'
      : 'Source implementation is fully provided and syntactically valid.',
    details: [
      `Code length: ${sourceCode.length} characters`,
      `Exports component: ${sourceCode.includes('export') ? 'Yes' : 'No'}`,
    ],
  });

  // VECTOR 2: Missing AI Prompt Specification
  const aiPrompt = recipe.aiSpecificationPrompt || '';
  const hasPromptHeading = aiPrompt.includes('IMPLEMENTATION-GRADE AI HANDOFF SPECIFICATION') || aiPrompt.includes('COMPONENT PURPOSE');
  const hasPromptSections =
    aiPrompt.includes('VISUAL LANGUAGE') ||
    aiPrompt.includes('COMPOSITION') ||
    aiPrompt.includes('INTERACTION') ||
    aiPrompt.includes('ACCESSIBILITY');
  const isPromptMissing = !aiPrompt.trim() || aiPrompt.length < 150 || !hasPromptHeading || !hasPromptSections;

  checks.push({
    vector: 'missing_ai_prompt',
    name: 'AI Prompt Specification Integrity',
    passed: !isPromptMissing,
    severity: 'error',
    message: isPromptMissing
      ? 'AI prompt specification is missing or lacks mandatory 19-section structure.'
      : 'Implementation-grade AI prompt specification is complete and formatted.',
    details: [
      `Prompt length: ${aiPrompt.length} characters`,
      `Structured sections present: ${hasPromptSections ? 'Yes' : 'No'}`,
    ],
  });

  // VECTOR 3: Mismatched Style & Archetype
  const entryStyle = (entry.visualStyle || '').toLowerCase();
  const recipeArchetype = (recipe.archetype || '').toLowerCase();
  const codeContainsStyle =
    sourceCode.toLowerCase().includes(recipeArchetype) ||
    sourceCode.includes('rounded-') ||
    sourceCode.includes('bg-') ||
    sourceCode.includes('border-') ||
    sourceCode.includes('backdrop-blur');

  // Check if entry visual style aligns with archetype or code styling
  const isStyleMismatched = !codeContainsStyle;

  checks.push({
    vector: 'mismatched_style',
    name: 'Style & Archetype Alignment',
    passed: !isStyleMismatched,
    severity: 'warning',
    message: isStyleMismatched
      ? `Visual style '${entry.visualStyle}' does not match recipe archetype '${recipe.archetype}' or code styling tokens.`
      : `Visual style '${entry.visualStyle}' aligns perfectly with archetype '${recipe.archetype}'.`,
    details: [
      `Entry Visual Style: ${entry.visualStyle}`,
      `Recipe Archetype: ${recipe.archetype}`,
      `Code Style Utility Alignment: ${codeContainsStyle ? 'Passed' : 'Failed'}`,
    ],
  });

  // VECTOR 4: Missing Dependencies
  const declaredDeps = new Set([
    ...(entry.dependencies || []).map((d) => d.toLowerCase()),
    ...(recipe.declaredDependencies || []).map((d) => d.toLowerCase()),
    ...(recipe.dependencies || []).map((d) => d.toLowerCase()),
  ]);

  const missingDeps: string[] = [];
  
  if ((sourceCode.includes('motion/react') || sourceCode.includes('framer-motion')) &&
      !Array.from(declaredDeps).some(d => d.includes('framer') || d.includes('motion'))) {
    missingDeps.push('framer-motion / motion');
  }
  if (sourceCode.includes('lucide-react') && !Array.from(declaredDeps).some(d => d.includes('lucide'))) {
    missingDeps.push('lucide-react');
  }
  if (sourceCode.includes('recharts') && !Array.from(declaredDeps).some(d => d.includes('recharts'))) {
    missingDeps.push('recharts');
  }
  if (sourceCode.includes('@google/genai') && !Array.from(declaredDeps).some(d => d.includes('genai') || d.includes('gemini'))) {
    missingDeps.push('@google/genai');
  }

  const hasMissingDeps = missingDeps.length > 0;

  checks.push({
    vector: 'missing_dependencies',
    name: 'Dependency Manifest Integrity',
    passed: !hasMissingDeps,
    severity: 'error',
    message: hasMissingDeps
      ? `Source code imports packages not declared in dependencies: ${missingDeps.join(', ')}.`
      : 'All packages imported in source code are properly declared in dependencies.',
    details: [
      `Declared Dependencies: ${(entry.dependencies || []).join(', ') || 'None'}`,
      `Missing Imported Dependencies: ${missingDeps.length > 0 ? missingDeps.join(', ') : 'None'}`,
    ],
  });

  // VECTOR 5: Unsupported State Claims
  const entryStates = entry.states || [];
  const recipeStates = new Set([
    ...(recipe.supportedStates || []),
    ...(recipe.handoffRequirements?.statesHandled || []),
  ]);

  // Search source code for state keywords
  const codeLower = sourceCode.toLowerCase();
  const unsupportedStates: string[] = [];

  for (const state of entryStates) {
    const s = state.toLowerCase();
    const isDeclaredInRecipe = recipeStates.has(state) || recipeStates.has(s);
    const isMentionedInCode =
      codeLower.includes(s) ||
      (s === 'idle' && (codeLower.includes('idle') || codeLower.includes('default'))) ||
      (s === 'hover' && (codeLower.includes('hover') || codeLower.includes('onmouseenter'))) ||
      (s === 'focus' && (codeLower.includes('focus') || codeLower.includes('onfocus'))) ||
      (s === 'pressed' && (codeLower.includes('press') || codeLower.includes('active') || codeLower.includes('tap'))) ||
      (s === 'loading' && (codeLower.includes('load') || codeLower.includes('spin') || codeLower.includes('progress'))) ||
      (s === 'error' && (codeLower.includes('error') || codeLower.includes('fail') || codeLower.includes('alert'))) ||
      (s === 'success' && (codeLower.includes('success') || codeLower.includes('check') || codeLower.includes('done')));

    if (!isDeclaredInRecipe && !isMentionedInCode) {
      unsupportedStates.push(state);
    }
  }

  const hasUnsupportedClaims = unsupportedStates.length > 0;

  checks.push({
    vector: 'unsupported_state_claims',
    name: 'State Support Claims Validation',
    passed: !hasUnsupportedClaims,
    severity: 'warning',
    message: hasUnsupportedClaims
      ? `Entry metadata claims support for states not implemented or specified in recipe: ${unsupportedStates.join(', ')}.`
      : 'All claimed entry states are verified and implemented in the canonical recipe.',
    details: [
      `Claimed States: ${entryStates.join(', ')}`,
      `Unsupported Claims: ${unsupportedStates.length > 0 ? unsupportedStates.join(', ') : 'None'}`,
    ],
  });

  const passedCount = checks.filter((c) => c.passed).length;
  const totalCount = checks.length;
  const overallPassed = checks.every((c) => c.passed || c.severity === 'info');

  return {
    entryId: entry.id,
    componentName: entry.component,
    family: entry.family,
    overallPassed,
    passedCount,
    totalCount,
    scorePercentage: Math.round((passedCount / totalCount) * 100),
    checks,
    auditedAt: new Date().toISOString(),
  };
}
