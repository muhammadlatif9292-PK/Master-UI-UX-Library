/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useScientific } from '../ScientificContext';
import { CheckSquare, Square, AlertTriangle, ShieldAlert, Timer, CheckCircle, UserCheck } from 'lucide-react';
import { ExperimentStep } from '../types';

export const ProceduralSteps: React.FC = () => {
  const { familyConfig } = useScientific();

  const [steps, setSteps] = useState<ExperimentStep[]>([
    {
      id: 1,
      title: 'Chassis Nitrogen Purge',
      action: 'Purge chamber with ultra-high-purity Nitrogen gas at 5 bar for 30 seconds.',
      hazardLevel: 'CAUTION',
      durationSeconds: 30,
      status: 'COMPLETED',
      requiredCheck: 'Pressure gauge < 0.1 mTorr verified',
    },
    {
      id: 2,
      title: 'Cryogenic Liquid Helium Injection',
      action: 'Initiate 4.2 K liquid Helium transfer line to outer cryostat jacket.',
      hazardLevel: 'DANGER',
      durationSeconds: 60,
      status: 'IN_PROGRESS',
      requiredCheck: 'Cryo-temperature sensor < 10 K verified',
    },
    {
      id: 3,
      title: 'Laser Alignment & Attenuation',
      action: 'Engage 532 nm optical pump laser at 10% attenuation power.',
      hazardLevel: 'BIOHAZARD',
      durationSeconds: 15,
      status: 'PENDING',
      requiredCheck: 'Safety goggles and beam curtain locked',
    },
    {
      id: 4,
      title: 'Data Collection & Spectrometry Run',
      action: 'Capture 10,000 spectral accumulation sweeps across 400 - 900 nm range.',
      hazardLevel: 'NONE',
      durationSeconds: 120,
      status: 'PENDING',
      requiredCheck: 'Detector signal SNR > 30 dB verified',
    },
  ]);

  const [signedBy, setSignedBy] = useState<string | null>(null);

  const toggleStep = (id: number) => {
    setSteps((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const completedCount = steps.filter((s) => s.status === 'COMPLETED').length;
  const isAllComplete = completedCount === steps.length;

  const handleSignOff = () => {
    setSignedBy('Dr. M. H. Latif (Lead Operator)');
  };

  const getHazardBadge = (lvl: ExperimentStep['hazardLevel']) => {
    switch (lvl) {
      case 'DANGER':
        return <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> HIGH HAZARD</span>;
      case 'BIOHAZARD':
        return <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> LASER / RADIATION</span>;
      case 'CAUTION':
        return <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> CAUTION</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-slate-500/20 text-slate-400">NOMINAL</span>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className={`text-lg font-bold ${familyConfig.textPrimary} flex items-center gap-2`}>
            <CheckSquare className={`w-5 h-5 ${familyConfig.accentText}`} />
            Procedural Steps & SOP Protocol Execution
          </h3>
          <p className={`text-xs ${familyConfig.textSecondary}`}>
            Sequential laboratory standard operating procedures (SOP), hold countdown timers, hazard warnings, and sign-offs.
          </p>
        </div>

        <div className="text-xs font-mono">
          <span className="opacity-60">SOP PROGRESS:</span>{' '}
          <span className="text-cyan-400 font-bold">{completedCount} / {steps.length} STEPS</span>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step) => {
          const isDone = step.status === 'COMPLETED';
          const isInProgress = step.status === 'IN_PROGRESS';

          return (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-800/50'
                  : isInProgress
                  ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                  : `${familyConfig.cardClass}`
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="mt-0.5 text-cyan-400 hover:text-cyan-300 transition-colors shrink-0"
                  >
                    {isDone ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5 text-white/40" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-white">
                        STEP {step.id}: {step.title}
                      </span>
                      {getHazardBadge(step.hazardLevel)}
                    </div>
                    <p className="text-xs text-slate-300">{step.action}</p>
                    <div className="text-[11px] font-mono text-cyan-400/90 pt-1">
                      🔍 Required Check: {step.requiredCheck}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono text-xs">
                  <span className="opacity-50 block text-[10px]">HOLD TIME</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1 justify-end">
                    <Timer className="w-3.5 h-3.5" /> {step.durationSeconds}s
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Digital Operator Sign-off Bar */}
      <div className={`p-4 rounded-xl ${familyConfig.cardClass} flex items-center justify-between font-mono text-xs`}>
        <div>
          <span className="opacity-50 block text-[10px]">OPERATOR VALIDATION SIGNATURE</span>
          <span className="font-bold text-white">
            {signedBy ? `VERIFIED: ${signedBy}` : 'PENDING OPERATOR SIGN-OFF'}
          </span>
        </div>

        {!signedBy ? (
          <button
            onClick={handleSignOff}
            className={`px-4 py-2 rounded text-xs font-bold flex items-center gap-1.5 ${familyConfig.accentClass}`}
          >
            <UserCheck className="w-4 h-4" /> SIGN OFF & LOCK PROCEDURE
          </button>
        ) : (
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> RECORDED ON BLOCKCHAIN LEDGER
          </span>
        )}
      </div>
    </div>
  );
};
