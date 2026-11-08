/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DesignArchetype } from '../../types/architecture';
import { CatalogEntry } from '../catalog/catalogTypes';
import { MASTER_STYLE_VOCABULARY, StyleVocabularyEntry } from './styleVocabularyData';

export type CanonicalStyleId = DesignArchetype;

export type StyleTaxonomyFamily =
  | 'luxury'
  | 'cinematic'
  | 'cyber'
  | 'clinical'
  | 'glass'
  | 'industrial'
  | 'brutalist'
  | 'editorial'
  | 'minimalist'
  | 'organic'
  | 'retro'
  | 'companion';

export interface ControlledStyleTaxonomy {
  canonicalStyleId: CanonicalStyleId;
  displayName: string;
  family: StyleTaxonomyFamily | string;
  mood: string;
  material: string;
  materialsList: string[];
  lighting: string;
  motionTendency: string;
  interactionTendency: string;
  typographyTendency: string;
  soundTendency: string;
  hapticTendency: string;
  bestFitComponents: { name: string; rationale: string }[];
  poorFitWarnings: { context: string; warningText: string; severity: 'critical' | 'high' | 'medium' }[];
  rawVocabularyEntry: StyleVocabularyEntry;
}

export const CANONICAL_STYLE_IDS: CanonicalStyleId[] = [
  'restrained-luxury',
  'cinematic-dark',
  'futuristic-cyber',
  'scientific-lab',
  'neumorphic-glass',
  'mechanical-tactile',
  'brutalist-grid',
  'editorial-serif',
  'minimal-monastic',
  'biomorphic-organic',
  'retro-computing',
  'ai-character',
];

/**
 * Resolves any visual style string or canonical id string to an authoritative CanonicalStyleId.
 */
export function resolveCanonicalStyleId(input?: string): CanonicalStyleId {
  if (!input) return 'cinematic-dark';
  const str = input.toLowerCase().trim().replace(/_/g, '-');

  // Direct match against one of the 12 canonical IDs
  if (CANONICAL_STYLE_IDS.includes(str as CanonicalStyleId)) {
    return str as CanonicalStyleId;
  }

  // Keyword / Substring mapping for free-form descriptions
  if (str.includes('luxury') || str.includes('gold') || str.includes('obsidian') || str.includes('vault') || str.includes('executive')) {
    return 'restrained-luxury';
  }
  if (str.includes('cinematic') || str.includes('slate') || str.includes('cyan lumines') || str.includes('dark room') || str.includes('media') || str.includes('mesh')) {
    return 'cinematic-dark';
  }
  if (str.includes('cyber') || str.includes('hud') || str.includes('terminal') || str.includes('scanline') || str.includes('notch') || str.includes('glitch') || str.includes('hazard')) {
    return 'futuristic-cyber';
  }
  if (str.includes('scientific') || str.includes('lab') || str.includes('clinical') || str.includes('cobalt') || str.includes('instrument') || str.includes('assay')) {
    return 'scientific-lab';
  }
  if (str.includes('glass') || str.includes('neumorphic') || str.includes('frosted') || str.includes('claymorphic') || str.includes('refractive') || str.includes('translucent')) {
    return 'neumorphic-glass';
  }
  if (str.includes('mechanical') || str.includes('tactile') || str.includes('switch') || str.includes('industrial') || str.includes('beveled') || str.includes('amber') || str.includes('knob')) {
    return 'mechanical-tactile';
  }
  if (str.includes('brutalist') || str.includes('grid') || str.includes('uncoated') || str.includes('block') || str.includes('raw ink') || str.includes('neo-brutalist')) {
    return 'brutalist-grid';
  }
  if (str.includes('editorial') || str.includes('serif') || str.includes('parchment') || str.includes('book') || str.includes('burgundy')) {
    return 'editorial-serif';
  }
  if (str.includes('minimal') || str.includes('monastic') || str.includes('zen') || str.includes('graphite') || str.includes('ghost') || str.includes('clean') || str.includes('unadorned')) {
    return 'minimal-monastic';
  }
  if (str.includes('organic') || str.includes('biomorphic') || str.includes('emerald') || str.includes('botanical') || str.includes('leaf') || str.includes('cell') || str.includes('membrane')) {
    return 'biomorphic-organic';
  }
  if (str.includes('retro') || str.includes('crt') || str.includes('phosphor') || str.includes('8-bit') || str.includes('pixel') || str.includes('chiptune') || str.includes('arcade')) {
    return 'retro-computing';
  }
  if (str.includes('ai') || str.includes('character') || str.includes('mascot') || str.includes('companion') || str.includes('neural') || str.includes('aurora') || str.includes('conversational')) {
    return 'ai-character';
  }

  return 'cinematic-dark';
}

/**
 * Retrieves the full controlled style taxonomy object for a given style ID or visual sentence.
 */
export function getStyleTaxonomy(inputStyleIdOrString?: string): ControlledStyleTaxonomy {
  const canonicalStyleId = resolveCanonicalStyleId(inputStyleIdOrString);
  const raw = MASTER_STYLE_VOCABULARY[canonicalStyleId];

  return {
    canonicalStyleId,
    displayName: raw.name,
    family: raw.family,
    mood: raw.mood,
    material: raw.materials.join(', '),
    materialsList: raw.materials,
    lighting: `${raw.lighting.description} (Ambient: ${raw.lighting.ambientGlow}, Edge: ${raw.lighting.specularEdge}, Shadow: ${raw.lighting.shadowType})`,
    motionTendency: `${raw.motionTendency.description} [Profile: ${raw.motionTendency.physicsProfile}, Easing: ${raw.motionTendency.easing}]`,
    interactionTendency: `${raw.interactionTendency.description} (Press: ${raw.interactionTendency.pressFeedback}, Hover: ${raw.interactionTendency.hoverTransform})`,
    typographyTendency: `${raw.typographyTendency.description} (Title: ${raw.typographyTendency.titleFont}, Body: ${raw.typographyTendency.bodyFont}, Scale: ${raw.typographyTendency.scale})`,
    soundTendency: `${raw.soundTendency.description} [Type: ${raw.soundTendency.toneType}, Freq: ${raw.soundTendency.frequency}]`,
    hapticTendency: `${raw.hapticTendency.description} [Pattern: ${raw.hapticTendency.patternName}, PatternMs: ${raw.hapticTendency.vibrationMs}]`,
    bestFitComponents: raw.bestComponentFits,
    poorFitWarnings: raw.poorFitWarnings,
    rawVocabularyEntry: raw,
  };
}

/**
 * Gets all 12 controlled style taxonomy definitions.
 */
export function getAllStyleTaxonomies(): ControlledStyleTaxonomy[] {
  return CANONICAL_STYLE_IDS.map((id) => getStyleTaxonomy(id));
}

/**
 * Ensures a CatalogEntry object has its authoritative canonicalStyleId property populated,
 * while preserving existing visualStyle text for human descriptions.
 */
export function ensureCanonicalStyleOnEntry(entry: CatalogEntry): CatalogEntry {
  const authoritativeId = entry.canonicalStyleId || resolveCanonicalStyleId(entry.visualStyle);
  return {
    ...entry,
    canonicalStyleId: authoritativeId,
  };
}
