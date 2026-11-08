/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useScientific } from '../ScientificContext';
import { ShieldCheck, Cpu, RefreshCw, Lock, Unlock, AlertTriangle, Radio } from 'lucide-react';

export const InstrumentCards: React.FC = () => {
  const { familyConfig, unitsSystem, scientificNotation } = useScientific();

  const [instruments, setInstruments] = useState([
    {
      id: 'INS-802',
      name: 'Cryogenic Mass Spectrometer',
      model: 'Thermo-Cryo X90',
      serialNumber: 'SN-2026-9042',
      status: 'LOCKED',
      primaryValue: 14.825,
      unit: 'm/z',
      temp: 4.2, // Kelvin
      signal: 98.4,
      isLocked: true,
    },
    {
      id: 'INS-311',
      name: 'Atomic Force Microscope Probe',
      model: 'Nanotech AFM-V',
      serialNumber: 'SN-2025-1108',
      status: 'WARMING_UP',
      primaryValue: 0.0428,
      unit: 'nm',
      temp: 293.15,
      signal: 84.1,
      isLocked: false,
    },
    {
      id: 'INS-940',
      name: 'Interferometric Laser Interferometer',
      model: 'OptoBeam Alpha',
      serialNumber: 'SN-2026-0034',
      status: 'CALIBRATING',
      primaryValue: 632.84,
      unit: 'nm',
      temp: 298.0,
      signal: 99.9,
      isLocked: true,
    },
  ]);

  // Jitter primary values slightly to simulate live sensor feedback
  useEffect(() => {
    const interval = setInterval(() => {
      setInstruments((prev) =>
        prev.map((ins) => ({
          ...ins,
          primaryValue: Number((ins.primaryValue + (Math.random() * 0.004 - 0.002)).toFixed(4)),
          signal: Math.min(100, Math.max(70, Number((ins.signal + (Math.random() * 0.4 - 0.2)).toFixed(1)))),
        }))
      );
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const toggleLock = (id: string) => {
    setInstruments((prev) =>
      prev.map((ins) => (ins.id === id ? { ...ins, isLocked: !ins.isLocked } : ins))
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'LOCKED':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> LOCKED & CALIBRATED</span>;
      case 'WARMING_UP':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin" /> WARMING UP</span>;
      case 'CALIBRATING':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1"><Cpu className="w-3 h-3 animate-pulse" /> CALIBRATING</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-slate-500/20 text-slate-400 border border-slate-500/30">STANDBY</span>;
    }
  };

  const formatValue = (val: number) => {
    if (scientificNotation) {
      return val.toExponential(4);
    }
    return val.toFixed(4);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className={`text-lg font-bold ${familyConfig.textPrimary} flex items-center gap-2`}>
            <Radio className={`w-5 h-5 ${familyConfig.accentText}`} />
            Instrument Sensor Cards
          </h3>
          <p className={`text-xs ${familyConfig.textSecondary}`}>
            Precision hardware telemetry cards with lock states, thermal drift feedback, and hardware serial specs.
          </p>
        </div>
        <span className={`px-2.5 py-1 text-xs font-mono rounded ${familyConfig.badgeClass}`}>
          3 Active Probes
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {instruments.map((ins) => (
          <div
            key={ins.id}
            className={`p-4 rounded-xl ${familyConfig.cardClass} relative overflow-hidden transition-all duration-300 hover:border-cyan-500/40`}
          >
            {/* Top Bar */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <span className="text-[10px] font-mono tracking-wider opacity-60 uppercase block">
                  {ins.id} • {ins.model}
                </span>
                <h4 className={`text-sm font-bold ${familyConfig.textPrimary} leading-tight`}>
                  {ins.name}
                </h4>
              </div>
              <button
                onClick={() => toggleLock(ins.id)}
                className={`p-1.5 rounded-md text-xs transition-colors ${
                  ins.isLocked
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
                title={ins.isLocked ? 'Unlock Instrument Controls' : 'Lock Instrument Controls'}
              >
                {ins.isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Status Indicator */}
            <div className="mb-4">{getStatusBadge(ins.status)}</div>

            {/* Main Value Display */}
            <div className="p-3 rounded-lg bg-black/40 border border-white/5 mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] font-mono opacity-60">PRIMARY SIGNAL READOUT</span>
                <span className="text-[10px] font-mono text-cyan-400 animate-pulse">● LIVE</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-mono font-bold ${familyConfig.textPrimary}`}>
                  {formatValue(ins.primaryValue)}
                </span>
                <span className={`text-xs font-mono font-semibold ${familyConfig.accentText}`}>
                  {ins.unit}
                </span>
              </div>
            </div>

            {/* Secondary Hardware Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-white/10">
              <div>
                <span className="text-[10px] opacity-50 block">CHASSIS TEMP</span>
                <span className={familyConfig.textPrimary}>
                  {unitsSystem === 'SI'
                    ? `${ins.temp} K`
                    : `${(ins.temp - 273.15).toFixed(1)} °C`}
                </span>
              </div>
              <div>
                <span className="text-[10px] opacity-50 block">SIGNAL LOCK</span>
                <span className="text-emerald-400 font-bold">{ins.signal}%</span>
              </div>
            </div>

            {/* Hardware Serial Barcode representation */}
            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono opacity-50">
              <span>REF: {ins.serialNumber}</span>
              <span className="tracking-tighter">|||| ||||| |||| ||</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
