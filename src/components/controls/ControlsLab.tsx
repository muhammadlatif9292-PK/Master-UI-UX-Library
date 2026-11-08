/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sliders,
  Sparkles,
  Search,
  Zap,
  Grid,
  ChevronRight,
  Activity,
  Gauge as GaugeIcon,
  Volume2,
  Lock,
  Unlock,
  Radio,
  Power,
  RotateCw,
  Flame,
  Terminal,
  Shield,
  Layers,
  CheckCircle2,
  RefreshCw,
  Compass,
  Cpu,
} from 'lucide-react';
import { CONTROLS_CATALOG } from '../../design-system/catalog/controlsRegistry';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { ControlStyle } from '../../design-system/controls/controlTypes';
import { ControlVariantPreview } from './ControlVariantPreview';
import {
  InteractiveSwitch,
  InteractiveCheckbox,
  InteractiveRadioGroup,
  InteractiveSegmentedControl,
  InteractiveSlider,
  InteractiveRangeSelector,
  InteractiveKnob,
  InteractiveRadialDial,
  InteractiveAnalogMeter,
  InteractivePressureGauge,
  InteractiveStepper,
  InteractiveDragToConfirm,
  InteractiveSlideToUnlock,
} from '../../design-system/controls/ControlComponents';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';

interface ControlsLabProps {
  onOpenAiHandoff?: (entry: CatalogEntry) => void;
}

export function ControlsLab({ onOpenAiHandoff }: ControlsLabProps) {
  const [selectedEntry, setSelectedEntry] = useState<CatalogEntry>(CONTROLS_CATALOG[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeRack, setActiveRack] = useState<'catalog' | 'cockpit' | 'audio' | 'industrial' | 'cyber'>('catalog');

  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  // Board live states
  const [avionicsPower, setAvionicsPower] = useState(true);
  const [thrusterMode, setThrusterMode] = useState('auto');
  const [pressureVal, setPressureVal] = useState(72);
  const [vuLevel, setVuLevel] = useState(58);
  const [eqCutoff, setEqCutoff] = useState(65);
  const [batchThreads, setBatchThreads] = useState(16);
  const [unlocked, setUnlocked] = useState(false);
  const [confirmedDeploy, setConfirmedDeploy] = useState(false);
  const [activeRadioMode, setActiveRadioMode] = useState('opt1');

  const categories = [
    { id: 'all', label: 'All Controls (13)' },
    { id: 'switches', label: 'Switches & Toggles' },
    { id: 'sliders', label: 'Sliders & Ranges' },
    { id: 'rotary', label: 'Knobs & Dials' },
    { id: 'meters', label: 'Meters & Gauges' },
    { id: 'actions', label: 'Drag & Unlock' },
  ];

  const filteredEntries = useMemo(() => {
    return CONTROLS_CATALOG.filter((entry) => {
      const matchesSearch =
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedCategory === 'all') return matchesSearch;

      if (selectedCategory === 'switches') {
        return matchesSearch && (entry.id === 'control-switch' || entry.id === 'control-checkbox' || entry.id === 'control-radio' || entry.id === 'control-segmented');
      }
      if (selectedCategory === 'sliders') {
        return matchesSearch && (entry.id === 'control-slider' || entry.id === 'control-range');
      }
      if (selectedCategory === 'rotary') {
        return matchesSearch && (entry.id === 'control-knob' || entry.id === 'control-radial-dial');
      }
      if (selectedCategory === 'meters') {
        return matchesSearch && (entry.id === 'control-meter' || entry.id === 'control-gauge');
      }
      if (selectedCategory === 'actions') {
        return matchesSearch && (entry.id === 'control-stepper' || entry.id === 'control-drag-confirm' || entry.id === 'control-slide-unlock');
      }

      return matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Laboratory Hero Header */}
      <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-zinc-800 p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              Controls Laboratory
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
              13 Physical Primitives
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-purple-950 text-purple-300 border border-purple-800">
              19 Interaction Styles
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800">
              Real-World Metaphors
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tactile Controls & Real-World Instrument Suite
          </h1>

          <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
            A comprehensive physical controls laboratory where visual and interaction behavior communicate authentic real-world instruments: Bourdon pressure gauges with needle damping and safety relief, galvanometer analog VU meters with ballistic inertia, knurled rotary encoders with polar trigonometry, and mechanical latching levers.
          </p>

          {/* Workbench Mode Selector */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {[
              { id: 'catalog', label: 'Component Catalog', icon: Grid },
              { id: 'cockpit', label: 'Cockpit Avionics Rig', icon: Compass },
              { id: 'audio', label: 'Studio Audio Console', icon: Volume2 },
              { id: 'industrial', label: 'Industrial Boiler Board', icon: Flame },
              { id: 'cyber', label: 'Cyberpunk Telemetry Deck', icon: Cpu },
            ].map((rack) => (
              <button
                key={rack.id}
                type="button"
                onClick={() => {
                  setActiveRack(rack.id as any);
                  playSound('SWITCH');
                  triggerHaptic('light');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  activeRack === rack.id
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-md ring-1 ring-cyan-400/30'
                    : 'bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
              >
                <rack.icon className="w-3.5 h-3.5" />
                <span>{rack.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RACK 1: CATALOG EXPLORATION VIEW */}
      {activeRack === 'catalog' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left: Component List */}
          <div className="xl:col-span-5 space-y-4">
            <div className="p-4 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Grid className="w-4 h-4 text-cyan-400" />
                  <span>Control Primitives</span>
                </h3>
                <span className="text-xs font-mono text-zinc-400">{filteredEntries.length} items</span>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search knob, meter, gauge, switch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      playSound('SWITCH');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-cyan-500 text-black font-bold shadow-md'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Component Item List */}
              <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
                {filteredEntries.map((entry) => {
                  const isSelected = selectedEntry.id === entry.id;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => {
                        setSelectedEntry(entry);
                        playSound('SWITCH');
                        triggerHaptic('light');
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'bg-zinc-900 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                          : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {entry.name}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-zinc-800 text-zinc-400 uppercase">
                            {entry.component}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 line-clamp-1">{entry.description}</p>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? 'text-cyan-400 translate-x-1' : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Interactive Testing Bench */}
          <div className="xl:col-span-7 space-y-6">
            <ControlVariantPreview entry={selectedEntry} onOpenAiHandoff={onOpenAiHandoff} />
          </div>
        </div>
      )}

      {/* RACK 2: COCKPIT AVIONICS RIG */}
      {activeRack === 'cockpit' && (
        <div className="p-8 rounded-3xl bg-zinc-950 border-2 border-zinc-800 space-y-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                <span>Aerospace Avionics Console</span>
              </h2>
              <p className="text-xs text-zinc-400">Tactical HUD controls, mechanical interlock levers, and telemetry vectors.</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
              SYS STAT: NOMINAL
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Power Lever */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col items-center justify-between space-y-4">
              <span className="text-xs font-mono uppercase text-zinc-400">Primary Bus Interlock</span>
              <InteractiveSwitch
                checked={avionicsPower}
                onChange={setAvionicsPower}
                styleVariant="mechanical"
                label="Reactor Igniter"
              />
              <span className="text-[10px] font-mono text-zinc-500">Physical Detent Sound: ACTION</span>
            </div>

            {/* Thruster HUD Mode */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between space-y-4">
              <span className="text-xs font-mono uppercase text-zinc-400">Thruster Vector Mode</span>
              <InteractiveSegmentedControl
                options={[
                  { id: 'auto', label: 'AUTONAV' },
                  { id: 'manual', label: 'MANUAL' },
                  { id: 'dock', label: 'DOCKING' },
                ]}
                value={thrusterMode}
                onChange={setThrusterMode}
                styleVariant="hud"
              />
              <span className="text-[10px] font-mono text-cyan-400">Active Guidance: {thrusterMode.toUpperCase()}</span>
            </div>

            {/* Vector Dial */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col items-center justify-between space-y-4">
              <span className="text-xs font-mono uppercase text-zinc-400">Core Thrust Vector</span>
              <InteractiveRadialDial value={84} target={90} onChange={() => {}} label="Thrust" unit="kN" />
            </div>
          </div>

          {/* Critical Deploy Slider */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 max-w-md">
              <h4 className="text-sm font-bold text-white">Emergency Atmospheric De-orbit</h4>
              <p className="text-xs text-zinc-400">Requires deliberate 85% travel drag to engage high-friction pneumatic actuators.</p>
            </div>
            <InteractiveDragToConfirm
              label="Drag to Fire Retrorockets"
              confirmedLabel="Retrorockets Fired"
              onConfirm={() => setConfirmedDeploy(true)}
            />
          </div>
        </div>
      )}

      {/* RACK 3: STUDIO AUDIO CONSOLE */}
      {activeRack === 'audio' && (
        <div className="p-8 rounded-3xl bg-zinc-950 border-2 border-zinc-800 space-y-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-amber-400" />
                <span>Vintage Recording Console (Neve / Studer Model)</span>
              </h2>
              <p className="text-xs text-zinc-400">Galvanometer ballistic meters, knurled rotary filter dials, and wave faders.</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
              48kHz / 24-BIT MASTER
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Analog Meter */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col items-center justify-center space-y-4">
              <InteractiveAnalogMeter value={vuLevel} peak={82} label="Stereo Master Bus" />
              <button
                type="button"
                onClick={() => setVuLevel(Math.floor(Math.random() * 85) + 15)}
                className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors"
              >
                Send Audio Transient Spike
              </button>
            </div>

            {/* Knobs Rack */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-wrap items-center justify-center gap-6">
              <InteractiveKnob
                value={eqCutoff}
                onChange={setEqCutoff}
                styleVariant="scientific"
                label="High-Pass EQ"
                unit="Hz"
              />
              <InteractiveKnob
                value={Math.round(eqCutoff * 0.4)}
                onChange={(v) => setEqCutoff(v * 2.5)}
                styleVariant="analog"
                label="Preamp Drive"
                unit="dB"
              />
            </div>

            {/* Dual Range passband */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-center space-y-6">
              <InteractiveRangeSelector
                minVal={20}
                maxVal={80}
                minLimit={0}
                maxLimit={100}
                onChange={() => {}}
                label="Dynamic Compressor Window"
                unit="ms"
              />
              <InteractiveSlider
                value={74}
                onChange={() => {}}
                label="Master Fader Output"
                unit="%"
                styleVariant="waveform"
              />
            </div>
          </div>
        </div>
      )}

      {/* RACK 4: INDUSTRIAL BOILER & PNEUMATIC RIG */}
      {activeRack === 'industrial' && (
        <div className="p-8 rounded-3xl bg-zinc-950 border-2 border-zinc-800 space-y-8 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-500" />
                <span>Pneumatic Pressure Rig & Boiler</span>
              </h2>
              <p className="text-xs text-zinc-400">Bourdon tube mechanical pressure gauge with flutter, danger redline, and steam release valve.</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800">
              SAFETY INTERLOCK: ENGAGED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pressure Gauge & Controls */}
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col items-center justify-center space-y-6">
              <InteractivePressureGauge
                pressure={pressureVal}
                maxPressure={120}
                onReliefValve={() => {
                  setPressureVal(15);
                }}
              />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPressureVal((p) => Math.min(120, p + 20))}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono transition-all shadow-md"
                >
                  + Inject Boiler Steam (+20 PSI)
                </button>
              </div>
            </div>

            {/* Heavy Switches & Stepper Controls */}
            <div className="p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white">Manual Hydraulic Valve Feed</h3>
                <InteractiveSwitch
                  checked={true}
                  onChange={() => {}}
                  styleVariant="lightswitch"
                  label="Recirculation Pump"
                  sublabel="3D Rocker Wall Plate switch"
                />
              </div>

              <div className="space-y-2">
                <InteractiveStepper
                  value={batchThreads}
                  min={1}
                  max={64}
                  step={1}
                  onChange={setBatchThreads}
                  label="Coolant Injection Nozzles"
                />
                <p className="text-[11px] text-zinc-500 font-mono">Continuous acceleration active on hold.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RACK 5: CYBERPUNK TELEMETRY DECK */}
      {activeRack === 'cyber' && (
        <div className="p-8 rounded-3xl bg-black border-2 border-cyan-500/50 space-y-8 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
          <div className="flex items-center justify-between border-b border-cyan-900/60 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span>Cyberpunk Telemetry & Terminal Deck</span>
              </h2>
              <p className="text-xs text-zinc-400">High-voltage neon tubes, biometric slide unlock, and orbital radio selectors.</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
              TERMINAL: ROOT ACCESS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Neon Switch & Check */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-cyan-900/60 space-y-6">
              <InteractiveSwitch
                checked={true}
                onChange={() => {}}
                styleVariant="neon"
                label="Neural Firewall"
              />
              <InteractiveCheckbox
                checked={true}
                onChange={() => {}}
                styleVariant="neon"
                label="Quantum Cryptography"
              />
            </div>

            {/* Orbit Radio Group */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-cyan-900/60">
              <InteractiveRadioGroup
                options={[
                  { id: 'opt1', label: 'Darknet Gateway', desc: 'Tor-routed tunnel' },
                  { id: 'opt2', label: 'Satellite Mesh', desc: 'LEO Constellation' },
                ]}
                value={activeRadioMode}
                onChange={setActiveRadioMode}
                styleVariant="neon"
              />
            </div>

            {/* Slide to Unlock */}
            <div className="p-6 rounded-2xl bg-zinc-950 border border-cyan-900/60 flex flex-col items-center justify-center space-y-4">
              <InteractiveSlideToUnlock
                label="Slide to Decrypt Vault"
                onUnlock={() => setUnlocked(true)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
