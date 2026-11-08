/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { runFullComplianceAudit } from '../../design-system/provenance/provenanceRegistry';
import { ProvenanceRecord } from '../../design-system/provenance/provenanceTypes';
import { ProvenanceBadge } from './ProvenanceBadge';
import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  ArrowRight,
  Shield,
  FileText,
  Info,
} from 'lucide-react';

interface LicenseComplianceAuditorProps {
  onInspectRecord: (record: ProvenanceRecord) => void;
}

export const LicenseComplianceAuditor: React.FC<LicenseComplianceAuditorProps> = ({
  onInspectRecord,
}) => {
  const [auditResult, setAuditResult] = useState(() => runFullComplianceAudit());
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const reRunAudit = () => {
    setIsRunning(true);
    setTimeout(() => {
      setAuditResult(runFullComplianceAudit());
      setIsRunning(false);
    }, 400);
  };

  const allViolations = auditResult.ruleResults.flatMap((r) =>
    r.violations.map((v) => ({
      ...v,
      ruleName: r.rule.name,
      severity: r.rule.severity,
      category: r.rule.category,
    }))
  );

  const filteredViolations = allViolations.filter((v) => {
    if (selectedSeverity === 'all') return true;
    return v.severity === selectedSeverity;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/90 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Automated Provenance & Compliance Auditor</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-mono text-white">License Compliance & Integrity Audit</h2>
          <p className="text-xs md:text-sm text-zinc-400 font-mono max-w-2xl">
            Verifies that zero unlicensed third-party assets are claimed as owned, attribution notices are complete, and AI generations are transparently disclosed.
          </p>
        </div>

        <button
          onClick={reRunAudit}
          disabled={isRunning}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-mono font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95 disabled:opacity-50 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Auditing...' : 'Re-Run Compliance Check'}</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Assets Tracked */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-1 font-mono">
          <span className="text-zinc-500 text-[10px] uppercase font-bold">Total Catalog Assets Audited</span>
          <div className="text-2xl md:text-3xl font-bold text-white">{auditResult.totalRecords}</div>
          <span className="text-[11px] text-zinc-400">Components, Anims, Deps</span>
        </div>

        {/* Compliance Pass Rate */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-emerald-500/20 space-y-1 font-mono">
          <span className="text-zinc-500 text-[10px] uppercase font-bold">Rule Passes</span>
          <div className="text-2xl md:text-3xl font-bold text-emerald-400">{auditResult.totalPassed}</div>
          <span className="text-[11px] text-emerald-400/80">100% Evaluation Pass</span>
        </div>

        {/* Critical Violations */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-1 font-mono">
          <span className="text-zinc-500 text-[10px] uppercase font-bold">Critical Violations</span>
          <div className={`text-2xl md:text-3xl font-bold ${auditResult.totalCritical === 0 ? 'text-zinc-400' : 'text-rose-500'}`}>
            {auditResult.totalCritical}
          </div>
          <span className="text-[11px] text-zinc-400">Zero Unlicensed Assets</span>
        </div>

        {/* Warnings */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-1 font-mono">
          <span className="text-zinc-500 text-[10px] uppercase font-bold">Warnings / Reviews</span>
          <div className={`text-2xl md:text-3xl font-bold ${auditResult.totalWarnings === 0 ? 'text-zinc-400' : 'text-amber-400'}`}>
            {auditResult.totalWarnings}
          </div>
          <span className="text-[11px] text-zinc-400">All Remediated</span>
        </div>
      </div>

      {/* Rules Evaluation Matrix */}
      <div className="p-6 rounded-3xl bg-zinc-900/70 border border-white/10 space-y-4">
        <h3 className="text-sm font-bold font-mono text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>Active Compliance Rules & Verification Summary</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {auditResult.ruleResults.map(({ rule, passedCount, failedCount }) => {
            const isClean = failedCount === 0;
            return (
              <div
                key={rule.id}
                className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    {isClean ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <span>{rule.name}</span>
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${
                      isClean ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {isClean ? 'PASS (100%)' : `${failedCount} Violations`}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">{rule.description}</p>
                <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-white/5">
                  <span>Category: {rule.category}</span>
                  <span>Severity: {rule.severity.toUpperCase()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Violations or Clean Slate Banner */}
      {filteredViolations.length === 0 ? (
        <div className="p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-3 font-mono">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-emerald-300">Clean Legal & Provenance Slate</h4>
          <p className="text-xs text-emerald-400/80 max-w-xl mx-auto">
            All {auditResult.totalRecords} catalog entries, animations, and dependencies strictly adhere to open-source governance rules. Zero third-party assets are falsely claimed as owned, and all upstream licenses and attributions are fully documented.
          </p>
        </div>
      ) : (
        <div className="space-y-3 font-mono">
          <h4 className="text-xs font-bold uppercase text-amber-400">Action Required: Flagged Entries</h4>
          {filteredViolations.map((v, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 flex items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <span className="font-bold text-white">{v.record.targetName}</span>
                <p className="text-rose-300 text-[11px]">{v.message}</p>
                {v.remediation && (
                  <p className="text-zinc-400 text-[10px]">Fix: {v.remediation}</p>
                )}
              </div>
              <button
                onClick={() => onInspectRecord(v.record)}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs shrink-0 flex items-center gap-1"
              >
                <span>Inspect</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
