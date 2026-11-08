/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sliders,
  Sparkles,
  Code,
  Copy,
  Check,
  Zap,
  Volume2,
  Vibrate,
  RotateCw,
  Power,
  Shield,
  Activity,
  Maximize2,
  Layers,
  Radio,
  Gauge as GaugeIcon,
  Flame,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { ControlStyle } from '../../design-system/controls/controlTypes';
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
import { useExperienceEvents } from '../../design-system/events/ExperienceEventContext';

interface ControlVariantPreviewProps {
  entry: CatalogEntry;
  onOpenAiHandoff?: (entry: CatalogEntry) => void;
}

export function ControlVariantPreview({ entry, onOpenAiHandoff }: ControlVariantPreviewProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const { emit } = useExperienceEvents();

  // Local state for controls
  const [activeStyle, setActiveStyle] = useState<ControlStyle>('mechanical');
  const [switchState, setSwitchState] = useState<boolean>(true);
  const [checkboxState, setCheckboxState] = useState<boolean>(true);
  const [radioValue, setRadioValue] = useState<string>('opt1');
  const [segmentValue, setSegmentValue] = useState<string>('auto');
  const [sliderValue, setSliderValue] = useState<number>(68);
  const [rangeMin, setRangeMin] = useState<number>(25);
  const [rangeMax, setRangeMax] = useState<number>(85);
  const [knobValue, setKnobValue] = useState<number>(54);
  const [dialValue, setDialValue] = useState<number>(78);
  const [meterValue, setMeterValue] = useState<number>(62);
  const [pressureValue, setPressureValue] = useState<number>(65);
  const [stepperValue, setStepperValue] = useState<number>(12);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [confirmedCount, setConfirmedCount] = useState<number>(0);
  const [unlockStatus, setUnlockStatus] = useState<string>('Locked');

  // Simulated live fluctuating audio/pressure signals when in meter/gauge mode
  useEffect(() => {
    if (entry.id === 'control-meter') {
      const interval = setInterval(() => {
        setMeterValue((prev) => {
          const delta = (Math.random() - 0.48) * 20;
          return Math.round(Math.min(100, Math.max(10, prev + delta)));
        });
      }, 350);
      return () => clearInterval(interval);
    }
  }, [entry.id]);

  const styleOptions: { id: ControlStyle; label: string; desc: string; category: string }[] = [
    { id: 'ios', label: 'iOS-like', desc: 'Fluid spring physics & balanced curves', category: 'Modern Digital' },
    { id: 'mechanical', label: 'Mechanical Lever', desc: 'Heavy industrial metal switch & latch detents', category: 'Tactile Physical' },
    { id: 'lightswitch', label: 'Light Switch', desc: '3D wall plate rocker snap & specular bevel', category: 'Tactile Physical' },
    { id: 'liquid', label: 'Liquid Morph', desc: 'Viscous fluid droplet tension & organic stretch', category: 'Organic Physics' },
    { id: 'magnetic', label: 'Magnetic Lock', desc: 'Sticky attraction zones & snappy lock', category: 'Organic Physics' },
    { id: 'elastic', label: 'Elastic Spring', desc: 'Mass-spring overshoot & velocity damping', category: 'Organic Physics' },
    { id: 'orbit', label: 'Orbit Satellite', desc: 'Concentric gravitational rings & orbital pips', category: 'Sci-Fi Telemetry' },
    { id: 'glass', label: 'Spatial Glass', desc: 'Translucent refraction & specular rim lighting', category: 'Modern Digital' },
    { id: 'neon', label: 'Cyber Neon', desc: 'High-voltage phosphor glow & laser tracks', category: 'Sci-Fi Telemetry' },
    { id: 'hud', label: 'Avionics HUD', desc: 'Tactical vector crosshairs & telemetry readouts', category: 'Sci-Fi Telemetry' },
    { id: 'analog', label: 'Analog Vintage', desc: 'Bakelite dials, warm meters & needle inertia', category: 'Classic Instrument' },
    { id: 'rotary', label: 'Rotary Encoder', desc: 'Continuous 360° angular scrub & notched detents', category: 'Classic Instrument' },
    { id: 'scientific', label: 'Scientific Vernier', desc: 'Calibrated micro-fine adjustment scales', category: 'Precision Instrument' },
    { id: 'pressure', label: 'Pressure Gauge', desc: 'Bourdon tube needle flutter & safety dump', category: 'Precision Instrument' },
    { id: 'waveform', label: 'Audio Waveform', desc: 'Frequency peak gradient track & audio bars', category: 'Precision Instrument' },
    { id: 'spring', label: 'Physics Spring', desc: 'Mass-spring-damper kinematic dynamics', category: 'Organic Physics' },
    { id: 'physics', label: 'Kinetic Inertia', desc: 'Friction momentum & boundary collision', category: 'Organic Physics' },
    { id: 'tactile', label: 'Tactile Depress', desc: 'Heavy embossed stroke & click resistance', category: 'Tactile Physical' },
    { id: 'cinematic', label: 'Cinematic Amber', desc: 'Luminous vacuum fluorescent display', category: 'Sci-Fi Telemetry' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(entry.codeArtifact);
    setCopiedCode(true);
    emit('interaction.confirmed', 'control-copy-code', { codeArtifact: entry.id });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const renderActiveControl = () => {
    switch (entry.id) {
      case 'control-switch':
        return (
          <div className="space-y-6 flex flex-col items-center">
            <InteractiveSwitch
              checked={switchState}
              onChange={setSwitchState}
              styleVariant={activeStyle}
              label="Turbine Interlock Switch"
              sublabel={`Active Style: ${activeStyle.toUpperCase()}`}
            />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">State:</span>
              <span
                className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  switchState ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}
              >
                {switchState ? 'ACTIVE (TRUE)' : 'DISENGAGED (FALSE)'}
              </span>
            </div>
          </div>
        );

      case 'control-checkbox':
        return (
          <div className="space-y-4 max-w-sm">
            <InteractiveCheckbox
              checked={checkboxState}
              onChange={setCheckboxState}
              styleVariant={activeStyle === 'neon' ? 'neon' : 'tactile'}
              label="Telemetry Uplink Active"
              description="Stream full resolution sensor frames to edge analytics node."
            />
            <InteractiveCheckbox
              checked={!checkboxState}
              onChange={(val) => setCheckboxState(!val)}
              styleVariant={activeStyle === 'neon' ? 'neon' : 'tactile'}
              label="Hardware Watchdog Arming"
              description="Auto-reboot if process heartbeat drops for 500ms."
            />
          </div>
        );

      case 'control-radio':
        return (
          <div className="max-w-md w-full">
            <InteractiveRadioGroup
              options={[
                { id: 'opt1', label: 'Quantum Telemetry Stream', desc: 'Direct bus connection with low-latency polling', badge: '128 Mbps' },
                { id: 'opt2', label: 'Differential Snapshot Backup', desc: 'Periodic encrypted local snapshots', badge: 'Standby' },
                { id: 'opt3', label: 'Air-Gapped Isolation Mode', desc: 'Sever external network interfaces', badge: 'Safe' },
              ]}
              value={radioValue}
              onChange={setRadioValue}
              styleVariant={activeStyle === 'neon' ? 'neon' : 'orbit'}
            />
          </div>
        );

      case 'control-segmented':
        return (
          <div className="space-y-4 max-w-lg w-full">
            <InteractiveSegmentedControl
              options={[
                { id: 'auto', label: 'Automatic' },
                { id: 'manual', label: 'Manual Control' },
                { id: 'override', label: 'Safety Override' },
              ]}
              value={segmentValue}
              onChange={setSegmentValue}
              styleVariant={activeStyle === 'hud' ? 'hud' : activeStyle === 'glass' ? 'glass' : 'ios'}
            />
            <p className="text-xs font-mono text-center text-zinc-400">
              Active Mode Selected: <span className="text-cyan-400 font-bold uppercase">{segmentValue}</span>
            </p>
          </div>
        );

      case 'control-slider':
        return (
          <div className="space-y-6 max-w-md w-full">
            <InteractiveSlider
              value={sliderValue}
              onChange={setSliderValue}
              min={0}
              max={100}
              label="Master Gain Level"
              unit="dB"
              styleVariant={activeStyle === 'neon' ? 'neon' : 'spring'}
            />
            <InteractiveSlider
              value={Math.round(sliderValue * 0.75)}
              onChange={(v) => setSliderValue(Math.round(v / 0.75))}
              min={0}
              max={100}
              label="Harmonic Saturation"
              unit="%"
              styleVariant="waveform"
            />
          </div>
        );

      case 'control-range':
        return (
          <div className="space-y-6 max-w-md w-full">
            <InteractiveRangeSelector
              minVal={rangeMin}
              maxVal={rangeMax}
              minLimit={0}
              maxLimit={100}
              onChange={(min, max) => {
                setRangeMin(min);
                setRangeMax(max);
              }}
              label="Calibrated Bandwidth Window"
              unit="MHz"
            />
            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400 flex justify-between">
              <span>Passband Window Width:</span>
              <span className="text-cyan-400 font-bold">{rangeMax - rangeMin} MHz</span>
            </div>
          </div>
        );

      case 'control-knob':
        return (
          <div className="flex flex-wrap items-center justify-center gap-8">
            <InteractiveKnob
              value={knobValue}
              onChange={setKnobValue}
              styleVariant={activeStyle === 'scientific' ? 'scientific' : 'analog'}
              label="Filter Cutoff"
              unit="kHz"
            />
            <InteractiveKnob
              value={Math.round(knobValue * 0.5)}
              onChange={(v) => setKnobValue(v * 2)}
              styleVariant="scientific"
              label="Resonance"
              unit="Q"
              stepped
              steps={11}
            />
          </div>
        );

      case 'control-radial-dial':
        return (
          <div className="flex flex-wrap items-center justify-center gap-8">
            <InteractiveRadialDial
              value={dialValue}
              target={80}
              onChange={setDialValue}
              label="Core Vector"
              unit="MW"
            />
            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-400">Scrub Power Dial:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={dialValue}
                onChange={(e) => setDialValue(Number(e.target.value))}
                className="w-48 accent-cyan-400"
              />
            </div>
          </div>
        );

      case 'control-meter':
        return (
          <div className="flex flex-col items-center gap-4">
            <InteractiveAnalogMeter value={meterValue} peak={85} label="Stereo Master Bus" />
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-400">Simulated Audio Flux:</span>
              <button
                type="button"
                onClick={() => setMeterValue(Math.floor(Math.random() * 95) + 5)}
                className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors"
              >
                Pulse Signal
              </button>
            </div>
          </div>
        );

      case 'control-gauge':
        return (
          <div className="flex flex-col items-center gap-4">
            <InteractivePressureGauge
              pressure={pressureValue}
              maxPressure={120}
              onReliefValve={() => {
                setPressureValue(18);
              }}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPressureValue((p) => Math.min(120, p + 15))}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-mono transition-all"
              >
                + Inject Pressure
              </button>
              <button
                type="button"
                onClick={() => setPressureValue((p) => Math.max(0, p - 20))}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono transition-colors"
              >
                - Bleed Pressure
              </button>
            </div>
          </div>
        );

      case 'control-stepper':
        return (
          <div className="space-y-4 flex flex-col items-center">
            <InteractiveStepper
              value={stepperValue}
              min={0}
              max={100}
              step={1}
              onChange={setStepperValue}
              label="Worker Thread Concurrency"
            />
            <p className="text-xs font-mono text-zinc-400">
              Hold buttons to test <span className="text-cyan-400 font-bold">continuous acceleration curve</span>.
            </p>
          </div>
        );

      case 'control-drag-confirm':
        return (
          <div className="space-y-4 flex flex-col items-center w-full">
            <InteractiveDragToConfirm
              label="Drag to Deploy Cluster"
              confirmedLabel="Cluster Deploy Initiated"
              onConfirm={() => {
                setConfirmedCount((c) => c + 1);
              }}
            />
            <span className="text-xs font-mono text-zinc-400">
              Total Executions: <span className="text-emerald-400 font-bold">{confirmedCount}</span>
            </span>
          </div>
        );

      case 'control-slide-unlock':
        return (
          <div className="space-y-4 flex flex-col items-center w-full">
            <InteractiveSlideToUnlock
              label="Slide to Authorize Terminal"
              onUnlock={() => {
                setUnlockStatus('Authorized');
              }}
            />
            <span className="text-xs font-mono text-zinc-400">
              Terminal State: <span className="text-cyan-400 font-bold">{unlockStatus}</span>
            </span>
          </div>
        );

      default:
        return <InteractiveSwitch checked={switchState} onChange={setSwitchState} label={entry.name} />;
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      {/* Top Header Information */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">{entry.name}</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
              {entry.component}
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-xl">{entry.description}</p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAiHandoff && (
            <button
              type="button"
              onClick={() => onOpenAiHandoff(entry)}
              className="px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Spec</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Copy JSX'}</span>
          </button>
        </div>
      </div>

      {/* Style Switcher Bar for Controls with multiple stylistic skins */}
      {(entry.id === 'control-switch' || entry.id === 'control-segmented' || entry.id === 'control-slider' || entry.id === 'control-knob' || entry.id === 'control-checkbox' || entry.id === 'control-radio') && (
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-zinc-400 flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-cyan-400" />
              <span>19 Interaction Metaphors & Styles:</span>
            </span>
            <span className="text-xs font-bold text-cyan-400 uppercase font-mono px-2 py-0.5 bg-cyan-950/80 rounded border border-cyan-800">
              Active: {activeStyle}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
            {styleOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setActiveStyle(opt.id);
                  emit('selection.changed', 'control-style-picker', { style: opt.id });
                }}
                className={`p-2 rounded-xl text-left border transition-all ${
                  activeStyle === opt.id
                    ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-md ring-1 ring-cyan-500/30'
                    : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold">{opt.label}</p>
                  <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-zinc-800 text-zinc-400">
                    {opt.category.split(' ')[0]}
                  </span>
                </div>
                <p className="text-[9px] text-zinc-500 line-clamp-1 mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Sandbox Canvas */}
      <div className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 min-h-[260px] flex items-center justify-center">
        {renderActiveControl()}
      </div>

      {/* Physical Instrument Telemetry Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400">Tactile Sound</span>
          <p className="text-xs font-bold text-cyan-400 truncate">{entry.soundStyle}</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400">Physics Motion</span>
          <p className="text-xs font-bold text-emerald-400 truncate">{entry.motionStyle}</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400">Haptic Curve</span>
          <p className="text-xs font-bold text-purple-400 truncate">{entry.hapticStyle}</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400">Accessibility</span>
          <p className="text-xs font-bold text-amber-400">WCAG {entry.accessibility}</p>
        </div>
      </div>
    </div>
  );
}
