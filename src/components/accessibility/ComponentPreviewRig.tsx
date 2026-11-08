/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAccessibility } from '../../design-system/accessibility/AccessibilityContext';
import {
  Check,
  AlertTriangle,
  Sparkles,
  Sliders,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Vibrate,
  Eye,
  Keyboard,
  Shield,
  Layers,
  Bot,
  Zap,
  Info,
  Maximize2,
} from 'lucide-react';

export function ComponentPreviewRig() {
  const { settings, toggleSetting, updateSetting, announce } = useAccessibility();

  const [activeComponentType, setActiveComponentType] = useState<
    'button-suite' | 'form-controls' | 'toggle-switches' | 'workflow-node' | 'ai-prompt' | 'scientific-gauge' | 'dialog-card'
  >('button-suite');

  // Interactive component local states
  const [toggleState, setToggleState] = useState<boolean>(true);
  const [sliderVal, setSliderVal] = useState<number>(65);
  const [inputValue, setInputValue] = useState<string>('accessibility@masterlab.dev');
  const [inputError, setInputError] = useState<boolean>(false);
  const [buttonPressed, setButtonPressed] = useState<boolean>(false);
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);

  const handleButtonClick = () => {
    setButtonPressed(!buttonPressed);
    if (!settings.soundOff) {
      announce('Action triggered successfully', 'polite');
    }
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-6">
      {/* Top Selector Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" /> Interactive Component Accessibility Preview Rig
          </h3>
          <p className="text-xs text-zinc-400">
            Preview, test, and actuate any UI primitive under current simulated accessibility constraints and lenses.
          </p>
        </div>

        {/* Component Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          {[
            { id: 'button-suite', label: 'Buttons & CTAs' },
            { id: 'form-controls', label: 'Inputs & Forms' },
            { id: 'toggle-switches', label: 'Switches & Radios' },
            { id: 'workflow-node', label: 'Workflow Node' },
            { id: 'ai-prompt', label: 'AI Prompt Stream' },
            { id: 'scientific-gauge', label: 'Scientific Gauge' },
            { id: 'dialog-card', label: 'Dialog / Card' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveComponentType(c.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                activeComponentType === c.id
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulation Diagnostic Lenses Ribbon */}
      <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-zinc-300">Color Vision Simulation:</span>
          <select
            value={settings.colorVisionFilter}
            onChange={(e) => updateSetting('colorVisionFilter', e.target.value as any)}
            className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-white text-xs font-mono focus:outline-none"
          >
            <option value="none">Normal Trichromatic Vision</option>
            <option value="protanopia">Protanopia (Red-Blind 1% males)</option>
            <option value="deuteranopia">Deuteranopia (Green-Blind 5% males)</option>
            <option value="tritanopia">Tritanopia (Blue-Blind 0.01%)</option>
            <option value="achromatopsia">Achromatopsia (Total Monochrome)</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => toggleSetting('showTouchTargetBoundaries')}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all ${
              settings.showTouchTargetBoundaries
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            Touch Target 44px Grid: {settings.showTouchTargetBoundaries ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => toggleSetting('showFocusOrderOverlay')}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all ${
              settings.showFocusOrderOverlay
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            Tab Order Path: {settings.showFocusOrderOverlay ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => toggleSetting('showContrastRatios')}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-all ${
              settings.showContrastRatios
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            Contrast Badges: {settings.showContrastRatios ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* The Live Rendering Canvas */}
      <div className="p-8 rounded-3xl bg-black/60 border border-zinc-800 relative overflow-hidden min-h-[320px] flex items-center justify-center">
        {/* Visual Focus Order Sequence Indicators */}
        {settings.showFocusOrderOverlay && (
          <div className="absolute top-4 left-4 p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
            <span>Tab sequence: [1] → [2] → [3] → [4]</span>
          </div>
        )}

        {/* 1. BUTTON SUITE */}
        {activeComponentType === 'button-suite' && (
          <div className="flex flex-wrap items-center justify-center gap-6 max-w-2xl">
            {/* Primary Action Button */}
            <div className="relative group">
              {settings.showTouchTargetBoundaries && (
                <div className="absolute -inset-1 border-2 border-emerald-500/40 rounded-2xl pointer-events-none" />
              )}
              {settings.showFocusOrderOverlay && (
                <span className="absolute -top-3 -left-3 w-5 h-5 rounded-full bg-cyan-500 text-black font-mono font-black text-[10px] flex items-center justify-center shadow">
                  1
                </span>
              )}
              <button
                tabIndex={1}
                aria-pressed={buttonPressed}
                aria-label="Synthesize experience recipe action button"
                onClick={handleButtonClick}
                className={`min-h-[44px] px-6 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  settings.highContrast
                    ? 'bg-white text-black border-2 border-black hover:bg-zinc-200'
                    : buttonPressed
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                }`}
              >
                {settings.nonColorIndicators && (
                  <span>{buttonPressed ? '✓' : '⚡'}</span>
                )}
                <span>{buttonPressed ? 'State: Active' : 'Execute Action'}</span>
              </button>
              {settings.screenReaderLabels && (
                <div className="mt-1 text-[9px] font-mono text-cyan-400 bg-black/60 px-2 py-0.5 rounded border border-cyan-900">
                  role="button" aria-pressed="{String(buttonPressed)}"
                </div>
              )}
              {settings.showContrastRatios && (
                <div className="mt-1 text-[9px] font-mono text-emerald-400">Contrast: 14.8:1 (AAA)</div>
              )}
            </div>

            {/* Secondary Outlined Action */}
            <div className="relative group">
              {settings.showTouchTargetBoundaries && (
                <div className="absolute -inset-1 border-2 border-emerald-500/40 rounded-2xl pointer-events-none" />
              )}
              {settings.showFocusOrderOverlay && (
                <span className="absolute -top-3 -left-3 w-5 h-5 rounded-full bg-cyan-500 text-black font-mono font-black text-[10px] flex items-center justify-center shadow">
                  2
                </span>
              )}
              <button
                tabIndex={2}
                aria-label="Cancel or reset current operation"
                onClick={() => setButtonPressed(false)}
                className={`min-h-[44px] px-6 py-3 rounded-2xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                  settings.highContrast
                    ? 'bg-black text-white border-2 border-white hover:bg-zinc-900'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-200 border border-white/15'
                }`}
              >
                {settings.nonColorIndicators && <span>✕</span>}
                <span>Reset Parameter</span>
              </button>
              {settings.screenReaderLabels && (
                <div className="mt-1 text-[9px] font-mono text-cyan-400 bg-black/60 px-2 py-0.5 rounded border border-cyan-900">
                  role="button"
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. FORM CONTROLS */}
        {activeComponentType === 'form-controls' && (
          <div className="w-full max-w-md space-y-4">
            <div className="space-y-1.5 relative">
              {settings.showFocusOrderOverlay && (
                <span className="absolute -top-2 -left-3 w-5 h-5 rounded-full bg-cyan-500 text-black font-mono font-black text-[10px] flex items-center justify-center shadow">
                  1
                </span>
              )}
              <label
                htmlFor="preview-input-field"
                className="text-xs font-mono font-bold text-zinc-300 flex items-center justify-between"
              >
                <span>Email Address Authorization</span>
                <span className="text-[10px] text-zinc-500">*Required</span>
              </label>
              <input
                id="preview-input-field"
                type="email"
                tabIndex={1}
                value={inputValue}
                aria-invalid={inputError}
                aria-describedby="input-error-desc"
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setInputError(!e.target.value.includes('@'));
                }}
                className={`w-full min-h-[44px] px-4 py-2.5 rounded-2xl text-xs font-mono transition-all ${
                  inputError
                    ? 'bg-red-950/30 border-2 border-red-500 text-red-200 focus:outline-red-400'
                    : settings.highContrast
                      ? 'bg-black text-white border-2 border-white'
                      : 'bg-zinc-900 border border-zinc-700 text-white'
                }`}
              />
              {inputError && (
                <div id="input-error-desc" className="text-xs text-red-400 font-mono flex items-center gap-1.5 mt-1">
                  {settings.nonColorIndicators && <AlertTriangle className="w-3.5 h-3.5" />}
                  <span>Invalid format: email must contain "@" domain</span>
                </div>
              )}
            </div>

            {/* Slider Control */}
            <div className="space-y-2 relative pt-2">
              {settings.showFocusOrderOverlay && (
                <span className="absolute -top-1 -left-3 w-5 h-5 rounded-full bg-cyan-500 text-black font-mono font-black text-[10px] flex items-center justify-center shadow">
                  2
                </span>
              )}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-300">Kinetic Spring Damping</span>
                <span className="text-cyan-400 font-bold">{sliderVal} Ns/m</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                tabIndex={2}
                value={sliderVal}
                aria-label="Kinetic Spring Damping Slider"
                aria-valuemin={10}
                aria-valuemax={100}
                aria-valuenow={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full min-h-[44px] cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        )}

        {/* 3. TOGGLE SWITCHES */}
        {activeComponentType === 'toggle-switches' && (
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4 max-w-md w-full">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-white font-mono">High-Frequency Telemetry</div>
                <div className="text-xs text-zinc-400">Stream 120Hz sensor frames to audio bus</div>
              </div>

              <button
                role="switch"
                tabIndex={1}
                aria-checked={toggleState}
                aria-label="Toggle High-Frequency Telemetry"
                onClick={() => setToggleState(!toggleState)}
                className={`w-14 h-8 min-h-[44px] p-1 rounded-full transition-colors relative flex items-center ${
                  toggleState
                    ? settings.highContrast
                      ? 'bg-white border-2 border-white'
                      : 'bg-cyan-500'
                    : 'bg-zinc-800 border border-zinc-700'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full transition-transform flex items-center justify-center text-[10px] font-bold ${
                    toggleState
                      ? settings.highContrast
                        ? 'translate-x-6 bg-black text-white'
                        : 'translate-x-6 bg-black text-cyan-400'
                      : 'translate-x-0 bg-zinc-400 text-black'
                  }`}
                >
                  {settings.nonColorIndicators && (toggleState ? 'ON' : 'OFF')}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* 4. WORKFLOW GRAPH NODE */}
        {activeComponentType === 'workflow-node' && (
          <div
            tabIndex={1}
            role="region"
            aria-label="AI Transformer Workflow Node: Text Embeddings Generator"
            className={`p-5 rounded-3xl max-w-sm w-full transition-all ${
              settings.highContrast
                ? 'bg-black border-2 border-white text-white'
                : 'bg-zinc-900/90 border border-zinc-700 text-zinc-100 shadow-2xl'
            }`}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 font-mono text-xs">AI</span>
                <span className="font-bold text-xs font-mono">Embeddings Model Node</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                READY
              </span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed font-sans mb-4">
              Processes 768-dimensional token vectors with zero latency and fallback streaming.
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>Input: Text</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <span>Output: Vector</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>
        )}

        {/* 5. AI PROMPT STREAM */}
        {activeComponentType === 'ai-prompt' && (
          <div className="w-full max-w-lg space-y-3">
            <div
              role="log"
              aria-live="polite"
              className={`p-5 rounded-2xl font-mono text-xs space-y-2 ${
                settings.highContrast ? 'bg-black border-2 border-white text-white' : 'bg-zinc-900/80 border border-zinc-800 text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Bot className="w-4 h-4" />
                <span>AI Cognitive Assistant:</span>
              </div>
              <p className="leading-relaxed font-sans text-sm">
                All 10 sensory dimensions are currently harmonized. Screen reader live regions and keyboard shortcuts are active.
              </p>
            </div>
          </div>
        )}

        {/* 6. SCIENTIFIC GAUGE */}
        {activeComponentType === 'scientific-gauge' && (
          <div
            role="meter"
            aria-valuenow={78}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Core Chamber Pressure Gauge"
            className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 max-w-xs w-full text-center space-y-3"
          >
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Chamber Pressure</div>
            <div className="text-4xl font-mono font-black text-cyan-400">78.4 kPa</div>
            <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden border border-zinc-700">
              <div className="bg-cyan-500 h-full rounded-full transition-all" style={{ width: '78%' }} />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>0 kPa</span>
              <span className="text-emerald-400 font-bold">OPTIMAL (70-85)</span>
              <span>100 kPa</span>
            </div>
          </div>
        )}

        {/* 7. DIALOG CARD */}
        {activeComponentType === 'dialog-card' && (
          <div
            role="dialog"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-desc"
            className="p-6 rounded-3xl bg-zinc-900 border border-zinc-700 max-w-sm w-full space-y-4 shadow-2xl"
          >
            <h4 id="dialog-title" className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" /> Confirm Preset Application
            </h4>
            <p id="dialog-desc" className="text-xs text-zinc-300 leading-relaxed font-sans">
              Applying the WCAG AAA Preset will enforce high-contrast borders and calibrate minimum font scale.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                tabIndex={1}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300"
              >
                Cancel
              </button>
              <button
                tabIndex={2}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold text-xs font-mono"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
