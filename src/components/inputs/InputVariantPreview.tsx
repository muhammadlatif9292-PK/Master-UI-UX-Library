/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../design-system/tokens/ThemeContext';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { useExperienceEvents } from '../../design-system/events/ExperienceEventContext';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { CodeViewer } from '../CodeViewer';
import { AiHandoffGenerator } from '../AiHandoffGenerator';
import {
  Eye,
  EyeOff,
  FileCode,
  Cpu,
  Volume2,
  Vibrate,
  Shield,
  CheckCircle2,
  AlertCircle,
  Search,
  Terminal,
  CreditCard,
  ChevronDown,
  Calendar,
  UploadCloud,
  Mic,
  Sparkles,
  RefreshCw,
  X,
  Lock,
  Plus,
  Minus,
  Check,
} from 'lucide-react';

interface InputVariantPreviewProps {
  entry: CatalogEntry;
  onClose?: () => void;
}

export function InputVariantPreview({ entry, onClose }: InputVariantPreviewProps) {
  const { theme } = useTheme();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const { emit } = useExperienceEvents();

  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'handoff'>('preview');
  const [forcedState, setForcedState] = useState<'interactive' | 'idle' | 'focused' | 'filled' | 'valid' | 'invalid' | 'disabled'>('interactive');
  
  // Interactive sub-states
  const [textValue, setTextValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [numberVal, setNumberVal] = useState(42);
  const [selectedTags, setSelectedTags] = useState(['design-system', 'tokens', 'react-18']);
  const [tagInput, setTagInput] = useState('');
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#06B6D4');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Dark Velvet Obsidian');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Sound handler for meaningful input feedback via Semantic Event Bus
  const handleKeystroke = (e?: React.KeyboardEvent | React.ChangeEvent) => {
    emit('interaction.confirmed', entry.id, {
      soundStyle: entry.soundStyle,
      hapticStyle: entry.hapticStyle,
      action: 'keystroke',
    });

    // Spawn typing sparks for particle variants
    if (entry.tags.includes('typing-particles') || entry.tags.includes('particles')) {
      const newParticle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 - 40,
        y: Math.random() * 40 - 20,
        color: ['#06b6d4', '#a855f7', '#ec4899', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
      };
      setParticles((prev) => [...prev.slice(-15), newParticle]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 600);
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const next = [...otpDigits];
    next[index] = val;
    setOtpDigits(next);
    handleKeystroke();

    if (val && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
    if (next.every((d) => d !== '')) {
      emit('state.success', entry.id, { action: 'otp-complete' });
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className={`p-6 md:p-12 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-8 shadow-2xl max-w-5xl mx-auto`}>
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
              Input Family • {entry.component}
            </span>
            <span className="text-xs font-mono opacity-60">v{entry.version}</span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-zinc-400 uppercase">
              {entry.visualStyle}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">{entry.name}</h2>
          <p className="text-xs opacity-70 max-w-2xl">{entry.description}</p>
        </div>

        <div className="flex items-center gap-2 bg-black/30 p-1.5 rounded-2xl border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === 'preview' ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" /> Live Interactive
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === 'code' ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" /> Code
          </button>
          <button
            onClick={() => setActiveTab('handoff')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === 'handoff' ? 'bg-purple-500 text-zinc-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" /> AI Handoff
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {activeTab === 'code' ? (
        <CodeViewer entry={entry} />
      ) : activeTab === 'handoff' ? (
        <AiHandoffGenerator entry={entry} />
      ) : (
        <div className="space-y-6">
          {/* State Controller Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-black/40 p-3.5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">State Simulator:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {(['interactive', 'idle', 'focused', 'filled', 'valid', 'invalid', 'disabled'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setForcedState(st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                      forcedState === st
                        ? 'bg-cyan-500 text-zinc-950 font-bold shadow-sm'
                        : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1 text-cyan-400">
                <Volume2 className="w-3.5 h-3.5" /> Sound: {entry.soundStyle}
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <Vibrate className="w-3.5 h-3.5" /> Haptic: {entry.hapticStyle}
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Shield className="w-3.5 h-3.5" /> A11y: {entry.accessibility}
              </span>
            </div>
          </div>

          {/* Interactive Live Input Sandbox */}
          <div className="min-h-[380px] p-8 md:p-12 rounded-3xl bg-zinc-950 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

            <div className="w-full max-w-md relative z-10 space-y-4">
              
              {/* Floating Label Transform Input */}
              {entry.id.includes('floating-label') ? (
                <div className="relative">
                  <input
                    id="floating-input"
                    value={forcedState === 'filled' ? 'alex.vance@studio.ai' : textValue}
                    onChange={(e) => {
                      setTextValue(e.target.value);
                      handleKeystroke(e);
                    }}
                    disabled={forcedState === 'disabled'}
                    placeholder=" "
                    className={`peer w-full px-4 py-3.5 rounded-2xl bg-zinc-900 border text-white text-sm focus:outline-none transition-all ${
                      forcedState === 'invalid'
                        ? 'border-red-500 focus:border-red-400'
                        : forcedState === 'valid'
                        ? 'border-emerald-500 focus:border-emerald-400'
                        : 'border-white/20 focus:border-cyan-400'
                    } ${forcedState === 'disabled' ? 'opacity-40 cursor-not-allowed' : ''}`}
                  />
                  <label
                    htmlFor="floating-input"
                    className="absolute left-4 top-3.5 text-sm text-zinc-400 pointer-events-none peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-cyan-400 peer-focus:bg-zinc-900 peer-focus:px-2 peer-focus:rounded peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-zinc-300 peer-[:not(:placeholder-shown)]:bg-zinc-900 peer-[:not(:placeholder-shown)]:px-2 transition-all duration-200"
                  >
                    User Account Identifier
                  </label>
                </div>
              ) : entry.id.includes('mascot') || entry.component === 'PasswordInput' ? (
                /* Password Field with Mascot Peek Tracking */
                <div className="space-y-3">
                  {/* Mascot Character Avatar */}
                  <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-zinc-900 border-2 border-cyan-500/40 flex items-center justify-center shadow-lg relative overflow-hidden">
                      <div className="text-2xl transition-transform duration-300">
                        {showPassword ? '👀' : textValue ? '🙈' : '🦉'}
                      </div>
                    </div>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={forcedState === 'filled' ? 'SuperSecretPass123!' : textValue}
                      onChange={(e) => {
                        setTextValue(e.target.value);
                        handleKeystroke(e);
                      }}
                      disabled={forcedState === 'disabled'}
                      placeholder="Enter master password..."
                      className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-zinc-900 border border-white/20 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(!showPassword);
                        playSound('press', 'MICRO');
                        triggerHaptic('press');
                      }}
                      className="absolute right-3.5 text-zinc-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              ) : entry.id.includes('otp') || entry.component === 'OTPInput' ? (
                /* Segmented 6-Digit OTP Auth Field */
                <div className="space-y-4 text-center">
                  <span className="text-xs font-mono text-zinc-400">ENTER 6-DIGIT VERIFICATION CODE</span>
                  <div className="flex gap-2 justify-center">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={otpRefs[idx]}
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-12 h-14 rounded-2xl bg-zinc-900 border-2 border-white/20 text-center font-mono font-bold text-xl text-cyan-400 focus:border-cyan-400 focus:outline-none shadow-md transition-all"
                      />
                    ))}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500">Auto-advances focus & auto-submits on completion</div>
                </div>
              ) : entry.id.includes('search') || entry.component === 'SearchInput' ? (
                /* Search with Animated Cycling Placeholders */
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-4 h-4 text-cyan-400" />
                  <input
                    value={textValue}
                    onChange={(e) => {
                      setTextValue(e.target.value);
                      handleKeystroke(e);
                    }}
                    placeholder="Search 50+ components, tokens, or styles..."
                    className="w-full pl-11 pr-10 py-3 rounded-2xl bg-black/50 border border-white/20 text-xs text-white focus:border-cyan-400 focus:outline-none shadow-inner"
                  />
                  {textValue && (
                    <button
                      onClick={() => setTextValue('')}
                      className="absolute right-3.5 text-zinc-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ) : entry.id.includes('command') || entry.component === 'CommandInput' ? (
                /* Command Palette Omnibar */
                <div className="p-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-xl">
                  <div className="flex items-center gap-3 px-4 py-3 bg-zinc-950 rounded-[14px] text-cyan-400 font-mono text-sm">
                    <Terminal className="w-4 h-4" />
                    <input
                      value={textValue}
                      onChange={(e) => {
                        setTextValue(e.target.value);
                        handleKeystroke(e);
                      }}
                      placeholder="Type a command or query (/deploy, /test)..."
                      className="bg-transparent w-full text-white focus:outline-none text-xs"
                    />
                    <kbd className="px-2 py-0.5 rounded bg-zinc-900 text-[10px] text-zinc-400 border border-zinc-800">⌘K</kbd>
                  </div>
                </div>
              ) : entry.id.includes('numeric') || entry.component === 'NumericInput' ? (
                /* Numeric Stepper & Scrubber */
                <div className="flex items-center justify-between p-2 rounded-2xl bg-zinc-900 border border-white/20">
                  <button
                    onClick={() => {
                      setNumberVal((v) => v - 1);
                      playSound('press', 'MICRO');
                    }}
                    className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center active:scale-95 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="text-center font-mono">
                    <span className="text-2xl font-bold text-cyan-400">{numberVal}</span>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Units (px)</div>
                  </div>
                  <button
                    onClick={() => {
                      setNumberVal((v) => v + 1);
                      playSound('press', 'MICRO');
                    }}
                    className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center active:scale-95 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : entry.id.includes('credit-card') || entry.component === 'MaskedInput' ? (
                /* Masked Credit Card Input */
                <div className="relative flex items-center">
                  <CreditCard className="absolute left-4 w-5 h-5 text-cyan-400" />
                  <input
                    defaultValue="4242 •••• •••• 4242"
                    className="w-full pl-12 pr-16 py-3.5 rounded-2xl bg-zinc-900 border border-white/20 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <span className="absolute right-4 px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold text-[10px]">VISA</span>
                </div>
              ) : entry.id.includes('multi-select') || entry.component === 'MultiSelect' ? (
                /* Multi-Select Token Tagger */
                <div className="p-3 rounded-2xl bg-zinc-900 border border-white/20 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-mono"
                      >
                        #{tag}
                        <button
                          onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && tagInput.trim()) {
                        setSelectedTags([...selectedTags, tagInput.trim()]);
                        setTagInput('');
                        playSound('pop', 'MICRO');
                      }
                    }}
                    placeholder="Type tag and press Enter..."
                    className="w-full bg-transparent text-xs text-white focus:outline-none pt-1"
                  />
                </div>
              ) : entry.id.includes('select') || entry.component === 'Select' ? (
                /* Bespoke Custom Select */
                <div className="relative">
                  <button
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl bg-zinc-900 border border-white/20 text-white text-sm hover:border-cyan-400 transition-all"
                  >
                    <span>{selectedOption}</span>
                    <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isSelectOpen && (
                    <div className="absolute top-full mt-2 left-0 right-0 p-2 rounded-2xl bg-zinc-900/95 backdrop-blur-xl border border-white/20 shadow-2xl z-30 space-y-1">
                      {['Dark Velvet Obsidian', 'Cyberpunk Neon Glow', 'Nordic Frosted Glass', 'Minimalist Porcelain'].map((opt) => (
                        <div
                          key={opt}
                          onClick={() => {
                            setSelectedOption(opt);
                            setIsSelectOpen(false);
                            playSound('press', 'MICRO');
                          }}
                          className={`px-3 py-2 rounded-xl text-xs flex items-center justify-between cursor-pointer ${
                            selectedOption === opt ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-300 hover:bg-white/10'
                          }`}
                        >
                          <span>{opt}</span>
                          {selectedOption === opt && <Check className="w-4 h-4" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : entry.id.includes('date') || entry.component === 'DatePicker' ? (
                /* Dual Date Time Picker */
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/20 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold">
                      <Calendar className="w-4 h-4" />
                      <span>August 2026</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400">11:45 AM UTC</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                      <span key={i} className="text-zinc-500 text-[10px]">{d}</span>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <button
                        key={day}
                        onClick={() => playSound('press', 'MICRO')}
                        className={`py-1.5 rounded-lg transition-all ${
                          day === 27 ? 'bg-cyan-500 text-zinc-950 font-bold' : 'hover:bg-white/10 text-zinc-300'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              ) : entry.id.includes('color') || entry.component === 'ColorInput' ? (
                /* Color Spectrogram Picker */
                <div className="p-4 rounded-2xl bg-zinc-900 border border-white/20 space-y-3">
                  <div className="h-20 rounded-xl bg-gradient-to-r from-red-500 via-green-500 via-cyan-500 via-blue-500 to-purple-500 shadow-inner" />
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl border border-white/20 shadow-md"
                      style={{ backgroundColor: selectedColor }}
                    />
                    <input
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="bg-transparent font-mono text-sm text-white focus:outline-none flex-1 uppercase"
                    />
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/20">Contrast: 12.4:1 AAA</span>
                  </div>
                </div>
              ) : entry.id.includes('file') || entry.component === 'FileInput' ? (
                /* Drag & Drop File Upload Zone */
                <div className="p-8 rounded-3xl border-2 border-dashed border-cyan-500/40 bg-cyan-500/5 hover:bg-cyan-500/10 text-center cursor-pointer transition-all">
                  <UploadCloud className="w-10 h-10 text-cyan-400 mx-auto mb-2 animate-bounce" />
                  <div className="text-sm font-bold text-white">Drag & drop files or click to browse</div>
                  <div className="text-xs text-zinc-400 mt-1 font-mono">PNG, SVG, JSON up to 50MB</div>
                </div>
              ) : entry.id.includes('voice') ? (
                /* Voice Dictation Field */
                <div className="relative flex items-center">
                  <input
                    value={isVoiceRecording ? 'Listening: "Synthesize liquid glass tokens..."' : textValue}
                    onChange={(e) => {
                      setTextValue(e.target.value);
                      handleKeystroke(e);
                    }}
                    placeholder="Click microphone to start voice dictation..."
                    className="w-full pl-4 pr-14 py-3.5 rounded-2xl bg-zinc-900 border border-white/20 text-white text-sm focus:border-red-500 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setIsVoiceRecording(!isVoiceRecording);
                      playSound('pop', 'MICRO');
                      triggerHaptic('heavy');
                    }}
                    className={`absolute right-3.5 p-2 rounded-xl transition-all ${
                      isVoiceRecording ? 'bg-red-500 text-white animate-pulse' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Mic className="w-5 h-5" />
                  </button>
                </div>
              ) : entry.id.includes('ai') ? (
                /* AI Prompt Box */
                <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-2xl">
                  <div className="flex items-center gap-3 px-4 py-3.5 bg-zinc-950 rounded-[15px]">
                    <Sparkles className="w-5 h-5 text-purple-400 animate-spin" />
                    <input
                      value={textValue}
                      onChange={(e) => {
                        setTextValue(e.target.value);
                        handleKeystroke(e);
                      }}
                      placeholder="Ask Gemini to generate or transform design tokens..."
                      className="bg-transparent w-full text-white text-sm focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        playSound('chime', 'NOTIFICATION');
                        triggerHaptic('success');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-purple-500 text-zinc-950 font-bold text-xs hover:bg-purple-400"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              ) : (
                /* Default Standard Field */
                <div className="relative">
                  <input
                    value={forcedState === 'filled' ? 'Interactive token input' : textValue}
                    onChange={(e) => {
                      setTextValue(e.target.value);
                      handleKeystroke(e);
                    }}
                    disabled={forcedState === 'disabled'}
                    placeholder={`Enter ${entry.name.toLowerCase()}...`}
                    className={`w-full px-4 py-3.5 rounded-2xl bg-zinc-900 border text-white text-sm focus:outline-none transition-all ${
                      forcedState === 'invalid'
                        ? 'border-red-500 focus:border-red-400'
                        : forcedState === 'valid'
                        ? 'border-emerald-500 focus:border-emerald-400'
                        : 'border-white/20 focus:border-cyan-400'
                    } ${forcedState === 'disabled' ? 'opacity-40 cursor-not-allowed' : ''}`}
                  />
                </div>
              )}

              {/* Sparks Particles Container */}
              {particles.map((p) => (
                <div
                  key={p.id}
                  style={{
                    transform: `translate(${p.x}px, ${p.y}px)`,
                    backgroundColor: p.color,
                  }}
                  className="absolute w-2 h-2 rounded-full pointer-events-none animate-ping"
                />
              ))}

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2">
                <span>Keyboard Nav: <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400">Tab</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400">Enter</kbd></span>
                <span className="text-cyan-400 font-bold uppercase">{forcedState} STATE</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
