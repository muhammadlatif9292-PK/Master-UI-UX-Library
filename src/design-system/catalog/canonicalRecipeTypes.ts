/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentType } from 'react';
import { CatalogEntry } from './catalogTypes';

export interface CanonicalHandoffRequirements {
  visualLanguage: string;
  layoutComposition: string;
  typography: string;
  materialsAndSurfaces: string;
  colorTokens: string;
  lightingAndDepth: string;
  interactionBehavior: string;
  statesHandled: string[];
  motionPhysics: string;
  soundHapticBehavior: string;
  responsiveBreakpoints: string;
  accessibilityWCAG: string;
  performanceTier: string;
  dependenciesAndAssets: string[];
  integrationRules: string[];
  doNotChangeRules: string[];
  acceptanceCriteria: string[];
}

export interface CanonicalImplementationRecipe {
  entryId: string;
  componentName: string;
  recipeName: string;
  family: string;
  archetype: string;
  
  // 1. LIVE PREVIEW BINDING / RENDERER
  previewRenderer?: ComponentType<{ entry: CatalogEntry; state?: string; [key: string]: any }>;
  
  // 2. CODE ARTIFACTS (Exact matching implementation)
  sourceCode: string;
  usageCode: string;
  recipeCode: string;
  stylesAndAssets: string;
  accessibilityAndResponsiveNotes: string;
  dependencies: string[];
  
  // 3. AI PROMPT SPECIFICATION
  aiSpecificationPrompt: string;
  handoffRequirements: CanonicalHandoffRequirements;
  
  // 4. METADATA & INTEGRITY VALIDATION CLAIMS
  supportedStates: string[];
  declaredDependencies: string[];
  claimedAccessibilityLevel: 'AAA' | 'AA' | 'A';
  claimedPerformanceTier: string;
  
  // Versioning & Provenance
  version: string;
  license: string;
}

export type IntegrityCheckVector =
  | 'missing_source_implementation'
  | 'missing_ai_prompt'
  | 'mismatched_style'
  | 'missing_dependencies'
  | 'unsupported_state_claims';

export interface IntegrityCheckItem {
  vector: IntegrityCheckVector;
  name: string;
  passed: boolean;
  severity: 'error' | 'warning' | 'info';
  message: string;
  details?: string[];
}

export interface IntegrityAuditResult {
  entryId: string;
  componentName: string;
  family: string;
  overallPassed: boolean;
  passedCount: number;
  totalCount: number;
  scorePercentage: number;
  checks: IntegrityCheckItem[];
  auditedAt: string;
}
