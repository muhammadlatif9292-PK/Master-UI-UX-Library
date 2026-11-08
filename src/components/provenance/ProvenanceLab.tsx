/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { MASTER_PROVENANCE_REGISTRY } from '../../design-system/provenance/provenanceRegistry';
import {
  ProvenanceRecord,
  ProvenanceType,
  AssetCategory,
} from '../../design-system/provenance/provenanceTypes';
import { ProvenanceBadge } from './ProvenanceBadge';
import { ProvenanceDetailModal } from './ProvenanceDetailModal';
import { AnimationAssetInspector } from './AnimationAssetInspector';
import { LicenseComplianceAuditor } from './LicenseComplianceAuditor';
import { SBOMExportCenter } from './SBOMExportCenter';
import {
  ShieldCheck,
  Search,
  Filter,
  Layers,
  Sparkles,
  GitFork,
  PackageCheck,
  Compass,
  FileCheck,
  Bot,
  Activity,
  FileCode2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal,
  Info,
  Scale,
  Building,
} from 'lucide-react';

export const ProvenanceLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'animations' | 'compliance' | 'sbom'>('matrix');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProvenanceType, setSelectedProvenanceType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLicense, setSelectedLicense] = useState<string>('all');
  const [selectedAttribution, setSelectedAttribution] = useState<string>('all');
  const [selectedRecord, setSelectedRecord] = useState<ProvenanceRecord | null>(null);

  // Extract unique license types
  const allLicenses = useMemo(() => {
    const set = new Set<string>();
    MASTER_PROVENANCE_REGISTRY.forEach((r) => set.add(r.license));
    return Array.from(set);
  }, []);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return MASTER_PROVENANCE_REGISTRY.filter((record) => {
      const matchesSearch =
        record.targetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.targetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (record.authorVendor && record.authorVendor.toLowerCase().includes(searchQuery.toLowerCase())) ||
        record.notes.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedProvenanceType === 'all' || record.provenanceType === selectedProvenanceType;

      const matchesCategory =
        selectedCategory === 'all' || record.category === selectedCategory;

      const matchesLicense =
        selectedLicense === 'all' || record.license === selectedLicense;

      const matchesAttribution =
        selectedAttribution === 'all' || record.attributionRequirement.includes(selectedAttribution);

      return matchesSearch && matchesType && matchesCategory && matchesLicense && matchesAttribution;
    });
  }, [searchQuery, selectedProvenanceType, selectedCategory, selectedLicense, selectedAttribution]);

  // Provenance Counts
  const counts = useMemo(() => {
    const map = {
      original: 0,
      adapted: 0,
      thirdParty: 0,
      inspiration: 0,
      licensed: 0,
      generated: 0,
      total: MASTER_PROVENANCE_REGISTRY.length,
    };
    MASTER_PROVENANCE_REGISTRY.forEach((r) => {
      if (r.isOriginal) map.original++;
      else if (r.isAdapted) map.adapted++;
      else if (r.isThirdParty) map.thirdParty++;
      else if (r.isInspiration) map.inspiration++;
      else if (r.isLicensed) map.licensed++;
      else if (r.isGenerated) map.generated++;
    });
    return map;
  }, []);

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-7xl mx-auto font-mono">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/90 border border-white/10 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Asset Provenance & License Registry</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
              Catalog Asset Provenance System
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Every catalog component, animation primitive, token, and external dependency strictly tracks upstream source, author/vendor, license, attribution requirements, and adaptation history.
            </p>
          </div>

          {/* Quick Compliance Seal */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-black/40 border border-emerald-500/30 text-emerald-300 shrink-0">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold block text-white">SPDX 2.3 & License Audited</span>
              <span className="text-[11px] text-emerald-400/90">0 Unlicensed Assets Claimed</span>
            </div>
          </div>
        </div>

        {/* 6-Way Provenance Type Breakdown Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          {/* Original */}
          <button
            onClick={() => setSelectedProvenanceType(selectedProvenanceType === 'original implementation' ? 'all' : 'original implementation')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedProvenanceType === 'original implementation'
                ? 'bg-emerald-500/20 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                : 'bg-black/40 border-white/10 hover:border-emerald-500/30'
            }`}
          >
            <div className="flex items-center justify-between text-emerald-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-base font-bold">{counts.original}</span>
            </div>
            <span className="text-[11px] font-bold text-white block">Original</span>
            <span className="text-[10px] text-zinc-500">In-house Apache-2.0</span>
          </button>

          {/* Adapted */}
          <button
            onClick={() => setSelectedProvenanceType(selectedProvenanceType === 'adapted implementation' ? 'all' : 'adapted implementation')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedProvenanceType === 'adapted implementation'
                ? 'bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/10'
                : 'bg-black/40 border-white/10 hover:border-blue-500/30'
            }`}
          >
            <div className="flex items-center justify-between text-blue-400 mb-1">
              <GitFork className="w-4 h-4" />
              <span className="text-base font-bold">{counts.adapted}</span>
            </div>
            <span className="text-[11px] font-bold text-white block">Adapted</span>
            <span className="text-[10px] text-zinc-500">Re-engineered code</span>
          </button>

          {/* Third-Party */}
          <button
            onClick={() => setSelectedProvenanceType(selectedProvenanceType === 'third-party dependency' ? 'all' : 'third-party dependency')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedProvenanceType === 'third-party dependency'
                ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/10'
                : 'bg-black/40 border-white/10 hover:border-purple-500/30'
            }`}
          >
            <div className="flex items-center justify-between text-purple-400 mb-1">
              <PackageCheck className="w-4 h-4" />
              <span className="text-base font-bold">{counts.thirdParty}</span>
            </div>
            <span className="text-[11px] font-bold text-white block">Third-Party</span>
            <span className="text-[10px] text-zinc-500">External Packages</span>
          </button>

          {/* Inspiration */}
          <button
            onClick={() => setSelectedProvenanceType(selectedProvenanceType === 'inspiration/reference' ? 'all' : 'inspiration/reference')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedProvenanceType === 'inspiration/reference'
                ? 'bg-amber-500/20 border-amber-500/50 shadow-lg shadow-amber-500/10'
                : 'bg-black/40 border-white/10 hover:border-amber-500/30'
            }`}
          >
            <div className="flex items-center justify-between text-amber-400 mb-1">
              <Compass className="w-4 h-4" />
              <span className="text-base font-bold">{counts.inspiration}</span>
            </div>
            <span className="text-[11px] font-bold text-white block">Inspiration</span>
            <span className="text-[10px] text-zinc-500">Concept References</span>
          </button>

          {/* Licensed */}
          <button
            onClick={() => setSelectedProvenanceType(selectedProvenanceType === 'licensed asset' ? 'all' : 'licensed asset')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedProvenanceType === 'licensed asset'
                ? 'bg-cyan-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                : 'bg-black/40 border-white/10 hover:border-cyan-500/30'
            }`}
          >
            <div className="flex items-center justify-between text-cyan-400 mb-1">
              <FileCheck className="w-4 h-4" />
              <span className="text-base font-bold">{counts.licensed}</span>
            </div>
            <span className="text-[11px] font-bold text-white block">Licensed</span>
            <span className="text-[10px] text-zinc-500">Fonts & Assets</span>
          </button>

          {/* Generated */}
          <button
            onClick={() => setSelectedProvenanceType(selectedProvenanceType === 'generated asset' ? 'all' : 'generated asset')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedProvenanceType === 'generated asset'
                ? 'bg-rose-500/20 border-rose-500/50 shadow-lg shadow-rose-500/10'
                : 'bg-black/40 border-white/10 hover:border-rose-500/30'
            }`}
          >
            <div className="flex items-center justify-between text-rose-400 mb-1">
              <Bot className="w-4 h-4" />
              <span className="text-base font-bold">{counts.generated}</span>
            </div>
            <span className="text-[11px] font-bold text-white block">AI Generated</span>
            <span className="text-[10px] text-zinc-500">Disclosed Prompts</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-white/10 overflow-x-auto">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
            activeTab === 'matrix' ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Master Provenance Explorer ({filteredRecords.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('animations')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
            activeTab === 'animations' ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Animation Assets & Physics Engine Registry</span>
        </button>

        <button
          onClick={() => setActiveTab('compliance')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
            activeTab === 'compliance' ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>License Compliance & Rule Auditor</span>
        </button>

        <button
          onClick={() => setActiveTab('sbom')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
            activeTab === 'sbom' ? 'bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/20' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <FileCode2 className="w-4 h-4" />
          <span>SPDX 2.3 & SBOM Export Center</span>
        </button>
      </div>

      {/* VIEW TAB 1: MASTER PROVENANCE MATRIX & FILTER EXPLORER */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          {/* Multi-Dimensional Filter Bar */}
          <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search assets, authors, notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Provenance Type */}
              <select
                value={selectedProvenanceType}
                onChange={(e) => setSelectedProvenanceType(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Provenance Classifications</option>
                <option value="original implementation">Original Implementation</option>
                <option value="adapted implementation">Adapted Implementation</option>
                <option value="third-party dependency">Third-Party Dependency</option>
                <option value="inspiration/reference">Inspiration / Reference</option>
                <option value="licensed asset">Licensed Asset</option>
                <option value="generated asset">Generated Asset (AI)</option>
              </select>

              {/* Category */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Asset Categories</option>
                <option value="component">Components</option>
                <option value="animation">Animations & Physics</option>
                <option value="dependency">Dependencies & Libraries</option>
                <option value="sound">Acoustic Synthesizers</option>
                <option value="haptic">Haptic Drivers</option>
                <option value="token">Tokens & Fonts</option>
                <option value="icon">Iconography</option>
                <option value="ai-template">AI Templates</option>
              </select>

              {/* License */}
              <select
                value={selectedLicense}
                onChange={(e) => setSelectedLicense(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-zinc-300 focus:outline-none focus:border-cyan-400"
              >
                <option value="all">All Governing Licenses</option>
                {allLicenses.map((lic) => (
                  <option key={lic} value={lic}>
                    {lic}
                  </option>
                ))}
              </select>
            </div>

            {/* Active Filter Reset */}
            {(selectedProvenanceType !== 'all' || selectedCategory !== 'all' || selectedLicense !== 'all' || searchQuery) && (
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/5">
                <span>Showing {filteredRecords.length} of {MASTER_PROVENANCE_REGISTRY.length} registered assets</span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedProvenanceType('all');
                    setSelectedCategory('all');
                    setSelectedLicense('all');
                  }}
                  className="text-cyan-400 hover:underline"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>

          {/* Provenance Records Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                onClick={() => setSelectedRecord(record)}
                className="p-5 rounded-3xl bg-zinc-900/70 hover:bg-zinc-800/80 border border-white/10 hover:border-cyan-500/40 transition-all duration-200 cursor-pointer shadow-lg space-y-4 flex flex-col justify-between group"
              >
                {/* Card Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {record.category}
                    </span>
                    <ProvenanceBadge type={record.provenanceType} size="sm" />
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {record.targetName}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {record.notes}
                  </p>
                </div>

                {/* Card Metadata Footer */}
                <div className="space-y-3 pt-3 border-t border-white/5 text-[11px]">
                  <div className="grid grid-cols-2 gap-2 text-zinc-400">
                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase font-bold">Author/Vendor</span>
                      <span className="text-zinc-300 truncate block">{record.authorVendor || 'Project Team'}</span>
                    </div>

                    <div>
                      <span className="text-zinc-500 block text-[9px] uppercase font-bold">License</span>
                      <span className="text-amber-300 font-bold truncate block">{record.license}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-zinc-500 pt-1">
                    <span className="truncate max-w-[180px] text-[10px]">
                      Src: {record.source}
                    </span>
                    <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform text-xs font-bold flex items-center gap-1">
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRecords.length === 0 && (
            <div className="p-12 text-center rounded-3xl bg-zinc-900/40 border border-white/10 space-y-3">
              <Compass className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-sm text-zinc-400">No provenance entries match the selected filters.</p>
            </div>
          )}
        </div>
      )}

      {/* VIEW TAB 2: ANIMATION ASSETS & PHYSICS REGISTRY */}
      {activeTab === 'animations' && <AnimationAssetInspector />}

      {/* VIEW TAB 3: LICENSE COMPLIANCE & RULE AUDITOR */}
      {activeTab === 'compliance' && (
        <LicenseComplianceAuditor onInspectRecord={(rec) => setSelectedRecord(rec)} />
      )}

      {/* VIEW TAB 4: SPDX 2.3 & SBOM EXPORT CENTER */}
      {activeTab === 'sbom' && <SBOMExportCenter />}

      {/* Detail Modal */}
      {selectedRecord && (
        <ProvenanceDetailModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </div>
  );
};
