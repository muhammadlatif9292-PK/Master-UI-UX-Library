/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CatalogEntry } from '../design-system/catalog/catalogTypes';
import { getCanonicalRecipe } from '../design-system/catalog/canonicalRecipeRegistry';

export interface CodeGeneratorResult {
  sourceCode: string;
  usageCode: string;
  recipeCode: string;
  stylesAndAssets: string;
  accessibilityAndResponsiveNotes: string;
  dependencies: string[];
}

/**
 * Generates the full component source code using the Single Canonical Identity Recipe model.
 * Guarantees that codeGenerator does NOT invent a generic family implementation
 * that visibly differs from the preview.
 */
export function generateFullComponentCode(entry: CatalogEntry): CodeGeneratorResult {
  const recipe = getCanonicalRecipe(entry);

  return {
    sourceCode: recipe.sourceCode,
    usageCode: recipe.usageCode,
    recipeCode: recipe.recipeCode,
    stylesAndAssets: recipe.stylesAndAssets,
    accessibilityAndResponsiveNotes: recipe.accessibilityAndResponsiveNotes,
    dependencies: recipe.dependencies,
  };
}
