/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ScientificProvider,
  useScientific,
  VISUAL_FAMILIES,
  VisualFamily,
  InstrumentCards,
  Gauges,
  MeasurementDisplays,
  WaveformControls,
  LabPanels,
  ScientificDataCards,
  ProcessControls,
  SimulationTimeline,
  VariableControls,
  LiveTelemetry,
  ExperimentStatus,
  ProceduralSteps,
} from '../../design-system/scientific';

import {
  FlaskConical,
  Radio,
  Gauge as GaugeIcon,
  Binary,
  Activity,
  Cpu,
  Database,
  Settings2,
  Clock,
  SlidersHorizontal,
  Terminal,
  CheckSquare,
  Sparkles,
  Layers,
  Globe2,
  Zap,
} from 'lucide-react';

type ComponentTab =
  | 'all'
  | 'instruments'
  | 'gauges'
  | 'measurements'
  | 'waveforms'
  | 'lab-panels'
  | 'data-cards'
  | 'process'
  | 'timeline'
  | 'variables'
  | 'telemetry'
  | 'status'
  | 'procedural';

const ScientificCatalogLabContent: React.FC = () => {
  const {
    family,
    setFamily,
    familyConfig,
    unitsSystem,
    setUnitsSystem,
    scientificNotation,
    setScientificNotation,
  } = useScientific();

  const [activeTab, setActiveTab] = useState<ComponentTab>('all');

  const componentTabs: { id: ComponentTab; label: string; icon: any }[] = [
    { id: 'all', label: 'All 12 Components', icon: Layers },
    { id: 'instruments', label: 'Instrument Cards', icon: Radio },
    { id: 'gauges', label: 'Gauges & Meters', icon: GaugeIcon },
    { id: 'measurements', label: 'Measurement Displays', icon: Binary },
    { id: 'waveforms', label: 'Waveform Controls', icon: Activity },
    { id: 'lab-panels', label: 'Lab Panels', icon: Cpu },
    { id: 'data-cards', label: 'Scientific Data Cards', icon: Database },
    { id: 'process', label: 'Process Controls', icon: Settings2 },
    { id: 'timeline', label: 'Simulation Timeline', icon: Clock },
    { id: 'variables', label: 'Variable Controls', icon: SlidersHorizontal },
    { id: 'telemetry', label: 'Live Telemetry', icon: Zap },
    { id: 'status', label: 'Experiment Status', icon: Terminal },
    { id: 'procedural', label: 'Procedural Steps', icon: CheckSquare },
  ];

  const presets: { id: string; name: string; family: VisualFamily; desc: string }[] = [
    {
      id: 'quantum-cryo',
      name: 'Quantum Cryogenic Rig',
      family: 'quantum',
      desc: 'Superconducting Qubit & Cryostats',
    },
    {
      id: 'stellar-obs',
      name: 'Stellar Observatory',
      family: 'observatory',
      desc: 'Interferometry & Photometry',
    },
    {
      id: 'clinical-lab',
      name: 'Clinical Laboratory',
      family: 'laboratory',
      desc: 'Sterile Mass Spectrometry & XPS',
    },
    {
      id: 'mission-cmd',
      name: 'Mission Command Deck',
      family: 'command-center',
      desc: 'High-Density Telemetry & Radar',
    },
    {
      id: 'retro-crt',
      name: 'Retro CRT Vector Terminal',
      family: 'retro-scientific',
      desc: '1980s Phosphor Green Oscilloscope',
    },
  ];

  return (
    <div className={`min-h-screen ${familyConfig.bgClass} p-4 md:p-8 transition-colors duration-500`}>
      {/* Header Section */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <FlaskConical className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest">
                  SPECIALIZED SCIENTIFIC INTERFACE CATALOG
                </span>
                <h1 className={`text-2xl md:text-3xl font-extrabold ${familyConfig.textPrimary}`}>
                  Precision Laboratory & Research Systems
                </h1>
              </div>
            </div>
            <p className={`text-sm ${familyConfig.textSecondary} mt-2 max-w-3xl`}>
              A comprehensive catalog of 12 high-precision scientific components built across 10 visual families with mathematical accuracy, statistical confidence bounds, microsecond scrubbers, and strict safety state machines.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-col gap-1.5 font-mono text-xs">
            <span className="opacity-60 text-[10px] uppercase tracking-wider">ENVIRONMENT PRESETS:</span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setFamily(p.family)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-all ${
                    family === p.family
                      ? `${familyConfig.accentClass}`
                      : 'bg-white/5 border-white/10 hover:border-white/30 text-white/80'
                  }`}
                  title={p.desc}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Global Controls & Family Selector */}
        <div className={`p-5 rounded-2xl ${familyConfig.cardClass} space-y-4`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" /> ACTIVE VISUAL FAMILY (10 FAMILIES)
              </h2>
              <p className="text-xs opacity-60">
                Current: <span className="font-bold text-cyan-400">{familyConfig.name}</span> — {familyConfig.description}
              </p>
            </div>

            {/* Units & Scientific Notation Toggles */}
            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                <span className="px-2 opacity-50 text-[10px]">UNITS:</span>
                {(['SI', 'Imperial', 'Atomic'] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnitsSystem(u)}
                    className={`px-2.5 py-1 rounded font-bold ${
                      unitsSystem === u ? `${familyConfig.accentClass}` : 'text-white/60'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setScientificNotation(!scientificNotation)}
                className={`px-3 py-1.5 rounded font-bold border transition-colors ${
                  scientificNotation
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                    : 'bg-white/5 border-white/10 text-white/60'
                }`}
              >
                Scientific Notation
              </button>
            </div>
          </div>

          {/* Visual Family Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs pt-2">
            {(Object.keys(VISUAL_FAMILIES) as VisualFamily[]).map((f) => {
              const cfg = VISUAL_FAMILIES[f];
              const isSelected = family === f;
              return (
                <button
                  key={f}
                  onClick={() => setFamily(f)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'bg-black/30 border-white/5 hover:border-white/20 text-white/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold opacity-50 uppercase">{f}</span>
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cfg.accentColorHex }}
                    />
                  </div>
                  <div className="font-bold truncate text-[11px]">{cfg.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
          {componentTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? `${familyConfig.accentClass}`
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 text-white/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Component Showcase Render Area */}
        <div className="space-y-10 pt-4">
          {(activeTab === 'all' || activeTab === 'instruments') && <InstrumentCards />}
          {(activeTab === 'all' || activeTab === 'gauges') && <Gauges />}
          {(activeTab === 'all' || activeTab === 'measurements') && <MeasurementDisplays />}
          {(activeTab === 'all' || activeTab === 'waveforms') && <WaveformControls />}
          {(activeTab === 'all' || activeTab === 'lab-panels') && <LabPanels />}
          {(activeTab === 'all' || activeTab === 'data-cards') && <ScientificDataCards />}
          {(activeTab === 'all' || activeTab === 'process') && <ProcessControls />}
          {(activeTab === 'all' || activeTab === 'timeline') && <SimulationTimeline />}
          {(activeTab === 'all' || activeTab === 'variables') && <VariableControls />}
          {(activeTab === 'all' || activeTab === 'telemetry') && <LiveTelemetry />}
          {(activeTab === 'all' || activeTab === 'status') && <ExperimentStatus />}
          {(activeTab === 'all' || activeTab === 'procedural') && <ProceduralSteps />}
        </div>
      </div>
    </div>
  );
};

export const ScientificCatalogLab: React.FC = () => {
  return (
    <ScientificProvider>
      <ScientificCatalogLabContent />
    </ScientificProvider>
  );
};
