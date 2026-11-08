/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useScientific } from '../ScientificContext';
import { Database, Download, AlertCircle, FileText, Share2, Check } from 'lucide-react';

export const ScientificDataCards: React.FC = () => {
  const { familyConfig } = useScientific();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const datasets = [
    {
      id: 'DS-2026-ALPHA',
      title: 'Quantum Well Photoluminescence Spectra',
      sampleId: 'SMP-GaAs-901',
      date: '2026-08-27 18:42:10 UTC',
      confidence: '99.82%',
      outlierCount: 0,
      spectralPeak: '850.4 nm',
      fwhm: '12.3 nm',
      purityRatio: '0.9994',
      temperature: '77 K',
      tags: ['Quantum Well', 'Gallium Arsenide', 'Cryogenic'],
    },
    {
      id: 'DS-2026-BETA',
      title: 'X-Ray Photoelectron Spectroscopy (XPS)',
      sampleId: 'SMP-TiO2-402',
      date: '2026-08-27 20:15:02 UTC',
      confidence: '94.10%',
      outlierCount: 2, // Anomaly detected
      spectralPeak: '458.8 eV',
      fwhm: '1.45 eV',
      purityRatio: '0.9240',
      temperature: '298 K',
      tags: ['XPS', 'Titanium Oxide', 'Surface Physics'],
    },
  ];

  const handleCopyJson = (id: string) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className={`text-lg font-bold ${familyConfig.textPrimary} flex items-center gap-2`}>
            <Database className={`w-5 h-5 ${familyConfig.accentText}`} />
            Scientific Dataset & Analysis Cards
          </h3>
          <p className={`text-xs ${familyConfig.textSecondary}`}>
            Multi-parameter spectral cards with confidence distribution bounds, outlier detection, and data export.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {datasets.map((ds) => (
          <div
            key={ds.id}
            className={`p-5 rounded-xl ${familyConfig.cardClass} relative overflow-hidden space-y-4`}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono opacity-60 tracking-wider">
                  DATASET ID: {ds.id}
                </span>
                <h4 className={`text-base font-bold ${familyConfig.textPrimary} leading-tight`}>
                  {ds.title}
                </h4>
                <div className="text-xs font-mono text-cyan-400 mt-0.5">
                  Sample: {ds.sampleId} • {ds.date}
                </div>
              </div>

              {ds.outlierCount > 0 ? (
                <span className="px-2 py-1 text-[10px] font-mono font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shrink-0">
                  <AlertCircle className="w-3 h-3" /> {ds.outlierCount} OUTLIERS
                </span>
              ) : (
                <span className="px-2 py-1 text-[10px] font-mono font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shrink-0">
                  ✓ VERIFIED
                </span>
              )}
            </div>

            {/* Metrics Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-xs">
              <div>
                <span className="text-[9px] opacity-50 block">SPECTRAL PEAK</span>
                <span className="font-bold text-white">{ds.spectralPeak}</span>
              </div>
              <div>
                <span className="text-[9px] opacity-50 block">FWHM BANDWIDTH</span>
                <span className="font-bold text-white">{ds.fwhm}</span>
              </div>
              <div>
                <span className="text-[9px] opacity-50 block">CONFIDENCE</span>
                <span className="font-bold text-emerald-400">{ds.confidence}</span>
              </div>
              <div>
                <span className="text-[9px] opacity-50 block">PURITY INDEX</span>
                <span className="font-bold text-cyan-400">{ds.purityRatio}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
              {ds.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/80"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
              <button
                onClick={() => handleCopyJson(ds.id)}
                className="px-3 py-1.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors flex items-center gap-1.5"
              >
                {copiedId === ds.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
                {copiedId === ds.id ? 'COPIED JSON' : 'EXPORT JSON'}
              </button>

              <button className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" /> RAW CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
