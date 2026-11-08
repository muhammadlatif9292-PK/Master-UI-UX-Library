/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProvenanceRecord } from '../../design-system/provenance/provenanceTypes';
import { ProvenanceBadge } from './ProvenanceBadge';
import {
  X,
  Shield,
  FileText,
  ExternalLink,
  Copy,
  Check,
  Building,
  Scale,
  Layers,
  Info,
  Activity,
  Calendar,
  Sparkles,
  Bot,
  PackageCheck,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';

interface ProvenanceDetailModalProps {
  record: ProvenanceRecord | null;
  onClose: () => void;
}

export const ProvenanceDetailModal: React.FC<ProvenanceDetailModalProps> = ({
  record,
  onClose,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!record) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formattedAttributionBlock = `/**
 * @license ${record.license}
 * @provenance ${record.provenanceType}
 * @source ${record.source}
 * @author ${record.authorVendor || 'Project Team'}
 * @attribution ${record.attributionRequirement}
${record.licenseUrl ? ` * @licenseUrl ${record.licenseUrl}\n` : ''} * @notes ${record.notes}
 */`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-2xl bg-zinc-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-zinc-950/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-zinc-800 border border-white/10 text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-mono">{record.targetName}</h3>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Asset ID: <code className="text-cyan-300">{record.targetId}</code> &bull; Category: <span className="capitalize text-zinc-300">{record.category}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Provenance Badge & Audit Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-black/40 border border-white/10">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">Provenance Classification</span>
              <ProvenanceBadge type={record.provenanceType} size="lg" />
            </div>

            <div className="space-y-1 text-right">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">Compliance Status</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Audited & Verified</span>
              </span>
            </div>
          </div>

          {/* Core Provenance Attributes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Source & Upstream Origin */}
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-[10px]">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Source Origin</span>
              </div>
              <p className="text-white font-medium break-words">{record.source}</p>
            </div>

            {/* Author / Vendor */}
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-[10px]">
                <Building className="w-3.5 h-3.5 text-purple-400" />
                <span>Author / Vendor</span>
              </div>
              <p className="text-white font-medium">{record.authorVendor || 'Project Team'}</p>
            </div>

            {/* License & Terms */}
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-[10px]">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Governing License</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-amber-300 font-bold text-sm">{record.license}</span>
                {record.licenseUrl && (
                  <a
                    href={record.licenseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 underline"
                  >
                    <span>License URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Attribution Requirement */}
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase text-[10px]">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Attribution Requirement</span>
              </div>
              <p className="text-emerald-300 font-medium">{record.attributionRequirement}</p>
            </div>
          </div>

          {/* Dependencies */}
          {record.dependencies && record.dependencies.length > 0 && (
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">Package & Runtime Dependencies</span>
              <div className="flex flex-wrap gap-2">
                {record.dependencies.map((dep, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 flex items-center gap-1"
                  >
                    <PackageCheck className="w-3 h-3 text-cyan-400" />
                    <span>{dep}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Animation Metadata if applicable */}
          {record.animationMetadata && (
            <div className="p-4 rounded-2xl bg-zinc-950/60 border border-purple-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-bold">
                <Activity className="w-4 h-4 text-purple-400" />
                <span>Animation Asset & Physics Specification</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-zinc-300">
                <div>
                  <span className="text-zinc-500 block">Math Model:</span>
                  <span className="font-bold text-white">{record.animationMetadata.animationType}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Engine:</span>
                  <span className="font-bold text-white">{record.animationMetadata.engine}</span>
                </div>
                {record.animationMetadata.timingSpec && (
                  <div className="col-span-2 pt-1 border-t border-white/5">
                    <span className="text-zinc-500 block">Timing / Physics Parameter:</span>
                    <code className="text-cyan-300 text-[10px]">{record.animationMetadata.timingSpec}</code>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Attribution Notice */}
          {record.attributionNotice && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="font-bold uppercase text-[10px]">Legal Attribution Notice</span>
                <button
                  onClick={() => handleCopy(record.attributionNotice!, 'notice')}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-[11px]"
                >
                  {copiedField === 'notice' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedField === 'notice' ? 'Copied' : 'Copy Notice'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-2xl bg-black/70 border border-white/10 text-xs font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {record.attributionNotice}
              </pre>
            </div>
          )}

          {/* Notes & Adaptations */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase text-zinc-400 block font-bold">Implementation & Architecture Notes</span>
            <p className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-zinc-300 leading-relaxed font-mono">
              {record.notes}
            </p>
          </div>

          {/* Copyable Legal Code Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="font-bold uppercase text-[10px]">TypeScript Code Header (JSDoc)</span>
              <button
                onClick={() => handleCopy(formattedAttributionBlock, 'header')}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-[11px]"
              >
                {copiedField === 'header' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'header' ? 'Copied Header' : 'Copy JSDoc'}</span>
              </button>
            </div>
            <pre className="p-3.5 rounded-2xl bg-black/80 border border-white/10 text-[11px] font-mono text-cyan-300 whitespace-pre overflow-x-auto">
              {formattedAttributionBlock}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-950/60 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500">
            Verified Date: {record.verifiedDate} &bull; Master SPDX 2.3 Compliant
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
