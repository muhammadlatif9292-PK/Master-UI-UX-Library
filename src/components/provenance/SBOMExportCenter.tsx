/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  generateSPDXManifest,
  generateAttributionMarkdown,
} from '../../design-system/provenance/provenanceRegistry';
import {
  Download,
  Copy,
  Check,
  FileCode2,
  FileText,
  FileSpreadsheet,
  Layers,
  Sparkles,
} from 'lucide-react';

export const SBOMExportCenter: React.FC = () => {
  const [activeFormat, setActiveFormat] = useState<'spdx' | 'markdown' | 'cyclonedx'>('spdx');
  const [copied, setCopied] = useState<boolean>(false);

  const spdxContent = generateSPDXManifest();
  const markdownContent = generateAttributionMarkdown();

  const cycloneDxContent = JSON.stringify(
    {
      bomFormat: 'CycloneDX',
      specVersion: '1.5',
      serialNumber: 'urn:uuid:7c9e6679-7425-40de-944b-e07fc1f90ae7',
      version: 1,
      metadata: {
        timestamp: '2026-08-28T21:10:00Z',
        tools: [
          {
            vendor: 'Project Architecture',
            name: 'Provenance Governor & SBOM Generator',
            version: '2.0.0',
          },
        ],
        component: {
          type: 'application',
          name: 'Master Design System & Catalog Library',
          version: '3.0.0',
          licenses: [{ license: { id: 'Apache-2.0' } }],
        },
      },
      components: JSON.parse(spdxContent).packages.map((pkg: any) => ({
        type: 'library',
        name: pkg.name,
        version: '1.0.0',
        licenses: [{ license: { id: pkg.licenseConcluded } }],
        purl: `pkg:generic/${pkg.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}@1.0.0`,
        description: pkg.licenseComments || pkg.comment,
      })),
    },
    null,
    2
  );

  const getCurrentContent = () => {
    switch (activeFormat) {
      case 'spdx':
        return spdxContent;
      case 'markdown':
        return markdownContent;
      case 'cyclonedx':
        return cycloneDxContent;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename =
      activeFormat === 'spdx'
        ? 'spdx-2.3-manifest.json'
        : activeFormat === 'markdown'
        ? 'THIRD-PARTY-NOTICES.md'
        : 'cyclonedx-sbom.json';

    const mime = activeFormat === 'markdown' ? 'text/markdown' : 'application/json';
    const blob = new Blob([getCurrentContent()], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs mb-2">
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Open Source Compliance & SBOM Export Engine</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">SPDX 2.3, CycloneDX & Attribution Manifests</h2>
          <p className="text-xs md:text-sm text-zinc-400 mt-1">
            Export machine-readable Software Bill of Materials (SBOM) and legal third-party notice documents ready for production compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition-all active:scale-95 border border-white/10"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download File</span>
          </button>
        </div>
      </div>

      {/* Format Selector Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-white/10 max-w-xl">
        <button
          onClick={() => setActiveFormat('spdx')}
          className={`flex-1 py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition-all ${
            activeFormat === 'spdx' ? 'bg-cyan-500 text-zinc-950 font-bold shadow' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>SPDX 2.3 JSON</span>
        </button>

        <button
          onClick={() => setActiveFormat('markdown')}
          className={`flex-1 py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition-all ${
            activeFormat === 'markdown' ? 'bg-cyan-500 text-zinc-950 font-bold shadow' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>ATTRIBUTION.md</span>
        </button>

        <button
          onClick={() => setActiveFormat('cyclonedx')}
          className={`flex-1 py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition-all ${
            activeFormat === 'cyclonedx' ? 'bg-cyan-500 text-zinc-950 font-bold shadow' : 'text-zinc-400 hover:text-white'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>CycloneDX 1.5 JSON</span>
        </button>
      </div>

      {/* Code / Markdown Preview Area */}
      <div className="rounded-3xl bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-4 bg-zinc-900/80 border-b border-white/10 flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>
              {activeFormat === 'spdx'
                ? 'SPDX 2.3 Standard Specification Output'
                : activeFormat === 'markdown'
                ? 'Human-Readable Third-Party Legal Notices & Attributions'
                : 'CycloneDX Standard Component BOM Representation'}
            </span>
          </span>
          <span className="text-[11px] text-zinc-500">
            {getCurrentContent().length.toLocaleString()} bytes &bull; UTF-8
          </span>
        </div>

        <pre className="p-6 text-xs text-cyan-300 font-mono overflow-x-auto max-h-[500px] overflow-y-auto leading-relaxed bg-black/60">
          {getCurrentContent()}
        </pre>
      </div>
    </div>
  );
};
