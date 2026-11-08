/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProvenanceType =
  | 'original implementation'
  | 'adapted implementation'
  | 'third-party dependency'
  | 'inspiration/reference'
  | 'licensed asset'
  | 'generated asset';

export type AttributionRequirement =
  | 'Required (Notice & License)'
  | 'Required by License (Attribution)'
  | 'Permissive / Optional Notice'
  | 'Generated Asset (AI Disclosure)'
  | 'Proprietary / Project Owned'
  | 'Public Domain / Zero Requirement';

export type AssetCategory =
  | 'component'
  | 'animation'
  | 'dependency'
  | 'sound'
  | 'haptic'
  | 'token'
  | 'icon'
  | 'recipe'
  | 'ai-template';

export type AuditComplianceStatus = 'verified' | 'flagged' | 'exempt' | 'requires-review';

export interface AnimationProvenanceMetadata {
  animationType: string; // e.g. 'Spring Dynamics', 'Keyframe Morphing', 'Canvas RAF Physics', 'Bézier Flow'
  engine: string; // e.g. 'motion/react', 'CSS Transitions', 'HTML5 Canvas 2D', 'SVG SMIL'
  timingSpec?: string; // e.g. 'stiffness: 300, damping: 24, mass: 1'
  fpsTarget?: number; // e.g. 60, 120
  provenanceType: ProvenanceType;
  source: string;
  authorVendor?: string;
  license: string;
  licenseUrl?: string;
  attributionRequirement: AttributionRequirement | string;
  notes: string;
}

export interface ProvenanceRecord {
  id: string;
  targetId: string; // Catalog entry ID, animation primitive ID, or dependency name
  targetName: string;
  category: AssetCategory;
  provenanceType: ProvenanceType;
  source: string;
  authorVendor?: string;
  license: string;
  licenseUrl?: string;
  dependencies: string[];
  attributionRequirement: AttributionRequirement | string;
  attributionNotice?: string;
  notes: string;
  auditStatus: AuditComplianceStatus;
  verifiedDate: string;
  isOriginal: boolean;
  isThirdParty: boolean;
  isLicensed: boolean;
  isAdapted: boolean;
  isGenerated: boolean;
  isInspiration: boolean;
  animationMetadata?: AnimationProvenanceMetadata;
}

export interface ProvenanceFilterState {
  search: string;
  provenanceType: string;
  category: string;
  license: string;
  attributionRequirement: string;
  auditStatus: string;
}

export interface ComplianceAuditRule {
  id: string;
  name: string;
  category: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  evaluate: (record: ProvenanceRecord) => { passed: boolean; message: string; remediation?: string };
}

export interface SPDXPackageInfo {
  SPDXID: string;
  name: string;
  versionInfo?: string;
  downloadLocation: string;
  licenseConcluded: string;
  licenseDeclared: string;
  licenseComments?: string;
  copyrightText: string;
  originator?: string;
  supplier?: string;
}
