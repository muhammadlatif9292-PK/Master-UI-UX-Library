/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import { DesignArchetype } from '../../types/architecture';
import {
  ProvenanceType,
  AttributionRequirement,
  AnimationProvenanceMetadata,
  ProvenanceRecord,
} from '../provenance/provenanceTypes';

export type {
  ProvenanceType,
  AttributionRequirement,
  AnimationProvenanceMetadata,
  ProvenanceRecord,
};

export type ComponentFamily = 'layout' | 'surface' | 'typography' | 'feedback' | 'navigation' | 'input' | 'ai' | 'auth' | 'action';

export type PerformanceTier = 'ultra-fast' | 'optimized' | 'heavy' | 'real-time';

export type AccessibilityLevel = 'AAA' | 'AA' | 'A';

export type FormalReviewStage = 'Draft' | 'Experimental' | 'Reviewed' | 'Production Candidate' | 'Deprecated';

export interface TenVectorEvaluation {
  visualQuality: number; // 0-100
  uxClarity: number; // 0-100
  interactionQuality: number; // 0-100
  animationQuality: number; // 0-100
  sensoryQuality: number; // 0-100
  accessibilityScore: number; // 0-100
  responsiveBehaviorScore: number; // 0-100
  performanceScore: number; // 0-100
  codeQuality: number; // 0-100
  reuseQuality: number; // 0-100
}

export interface FormalReviewRecord {
  stage: FormalReviewStage;
  evaluations: TenVectorEvaluation;
  overallScore: number;
  curatorNotes: string;
  reviewerId: string;
  lastReviewedDate: string;
  signoffApproved: boolean;
}

export interface VariantCandidateMetadata {
  reviewStatus: 'approved' | 'candidate' | 'pending_review' | 'rejected';
  candidateScore: number;
  auditDate: string;
  generatedFromBaseId: string;
  rejectionReason?: string;
  diversityDimensionsChanged: string[];
  reviewNotes: string;
  formalReview?: FormalReviewRecord;
  dimensions: {
    composition?: string;
    material?: string;
    informationHierarchy?: string;
    motion?: string;
    interaction?: string;
    lighting?: string;
    typography?: string;
    depth?: string;
    sound?: string;
    haptics?: string;
    characterBehavior?: string;
  };
}

export interface CatalogEntry {
  id: string;
  name: string;
  component: string;
  family: ComponentFamily;
  tags: string[];
  description: string;
  mood: string;
  canonicalStyleId?: DesignArchetype;
  visualStyle: string;
  motionStyle: string;
  interactionStyle: string;
  lightingStyle: string;
  soundStyle: string;
  hapticStyle: string;
  states: string[];
  responsiveBehavior: string;
  accessibility: AccessibilityLevel;
  performanceTier: PerformanceTier;
  dependencies: string[];
  sourceInspiration: string;
  license: string;
  authorVendor?: string;
  licenseUrl?: string;
  provenanceType?: ProvenanceType;
  attributionRequirement?: AttributionRequirement | string;
  provenanceNotes?: string;
  animationProvenance?: AnimationProvenanceMetadata;
  provenance?: ProvenanceRecord;
  codeArtifact: string;
  aiSpecification: string;
  version: string;
  status: 'stable' | 'experimental' | 'deprecated' | 'preview';
  reviewStage?: FormalReviewStage;
  formalReview?: FormalReviewRecord;
  favorite?: boolean;
  collection?: string;
  variantMetadata?: VariantCandidateMetadata;
}

