/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ExperienceRecipe,
  VisualStyleId,
  MotionProfileId,
  InteractionPhysicsId,
  LightingGlowId,
  SoundSynthesizerId,
  HapticFeedbackId,
  TypographySystemId,
  ThemePaletteId,
  IntensityLevel,
  PerformanceTier,
} from './types';
import {
  VISUAL_OPTIONS,
  MOTION_OPTIONS,
  INTERACTION_OPTIONS,
  LIGHTING_OPTIONS,
  SOUND_OPTIONS,
  HAPTIC_OPTIONS,
  TYPOGRAPHY_OPTIONS,
  THEME_OPTIONS,
  PRESET_RECIPES,
} from './composerData';
import { analyzeRecipeConflicts } from './conflictEngine';
import { InteractiveLiveStage } from './InteractiveLiveStage';
import { RecipeComparator } from './RecipeComparator';
import { CodeExporterModal } from './CodeExporterModal';
import { soundSynthesizer } from './soundEngine';
import { triggerHaptic } from './hapticEngine';
import { experienceEventBus } from '../../design-system/events/experienceEventBus';
import {
  Sparkles,
  Save,
  Copy,
  Star,
  GitCompare,
  Download,
  Upload,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Palette,
  Zap,
  Volume2,
  Vibrate,
  Type,
  Sun,
  Layers,
  Check,
  Plus,
  Trash2,
  FileCode,
  Compass,
  ArrowRight,
  Maximize2,
  Radio,
  Clock,
  Wand2,
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'master_library_experience_recipes_v1';

export function ExperienceComposerLab() {
  // Saved Recipes Collection
  const [savedRecipes, setSavedRecipes] = useState<ExperienceRecipe[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (item) return JSON.parse(item);
      } catch (e) {
        console.error('Failed to parse saved recipes:', e);
      }
    }
    return PRESET_RECIPES;
  });

  // Active Working Recipe (Defaults to user signature recipe: Obsidian + Spring + Magnetic + Reactive Edge + Crystal Sound + Soft Haptic + Cinematic)
  const [activeRecipe, setActiveRecipe] = useState<ExperienceRecipe>(PRESET_RECIPES[0]);

  // UI Modes
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'composer' | 'presets' | 'saved'>('composer');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Dimension Category Focus in Composer
  const [activeDimension, setActiveDimension] = useState<
    'visual' | 'motion' | 'interaction' | 'lighting' | 'sound' | 'haptic' | 'typography' | 'theme' | 'intensity' | 'perf'
  >('visual');

  // Conflict Diagnostics
  const conflicts = analyzeRecipeConflicts(activeRecipe);

  // Save to LocalStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedRecipes));
    }
  }, [savedRecipes]);

  const showNotification = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Recipe Modifications
  const updateRecipeDimension = <K extends keyof ExperienceRecipe>(key: K, value: ExperienceRecipe[K]) => {
    const updatedRecipe = {
      ...activeRecipe,
      [key]: value,
      updatedAt: new Date().toISOString(),
    };
    setActiveRecipe(updatedRecipe);

    experienceEventBus.emit('selection.changed', 'composer-dimension-picker', {
      dimension: key,
      value,
      composerRecipe: updatedRecipe,
      intensity: activeRecipe.intensity,
    });
  };

  const handleSaveRecipe = () => {
    const existingIndex = savedRecipes.findIndex((r) => r.id === activeRecipe.id);
    if (existingIndex >= 0) {
      const updated = [...savedRecipes];
      updated[existingIndex] = { ...activeRecipe, updatedAt: new Date().toISOString() };
      setSavedRecipes(updated);
      showNotification(`Saved changes to "${activeRecipe.name}"`);
    } else {
      const newRecipe: ExperienceRecipe = {
        ...activeRecipe,
        id: `recipe-custom-${Date.now()}`,
        name: activeRecipe.name.includes('Custom') ? activeRecipe.name : `${activeRecipe.name} (Custom)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setSavedRecipes([newRecipe, ...savedRecipes]);
      setActiveRecipe(newRecipe);
      showNotification(`Created and saved "${newRecipe.name}"`);
    }
  };

  const handleDuplicateRecipe = () => {
    const duplicated: ExperienceRecipe = {
      ...activeRecipe,
      id: `recipe-copy-${Date.now()}`,
      name: `${activeRecipe.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isFavorite: false,
    };
    setSavedRecipes([duplicated, ...savedRecipes]);
    setActiveRecipe(duplicated);
    showNotification(`Duplicated as "${duplicated.name}"`);
  };

  const handleToggleFavorite = () => {
    const nextFavorite = !activeRecipe.isFavorite;
    const updated = { ...activeRecipe, isFavorite: nextFavorite };
    setActiveRecipe(updated);

    const index = savedRecipes.findIndex((r) => r.id === activeRecipe.id);
    if (index >= 0) {
      const list = [...savedRecipes];
      list[index] = updated;
      setSavedRecipes(list);
    }
    showNotification(nextFavorite ? 'Marked as Favorite' : 'Removed from Favorites');
  };

  const handleDeleteRecipe = (id: string) => {
    setSavedRecipes(savedRecipes.filter((r) => r.id !== id));
    if (activeRecipe.id === id) {
      setActiveRecipe(PRESET_RECIPES[0]);
    }
    showNotification('Recipe removed');
  };

  const handleApplyAutoFix = (patch: Partial<ExperienceRecipe>) => {
    setActiveRecipe((prev) => ({ ...prev, ...patch, updatedAt: new Date().toISOString() }));
    showNotification('Auto-Harmonized experience combination');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.visual && parsed.motion && parsed.sound) {
          const importedRecipe: ExperienceRecipe = {
            ...parsed,
            id: `imported-${Date.now()}`,
            name: parsed.name || 'Imported Recipe',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setSavedRecipes([importedRecipe, ...savedRecipes]);
          setActiveRecipe(importedRecipe);
          showNotification(`Successfully imported "${importedRecipe.name}"`);
        } else {
          alert('Invalid recipe JSON format');
        }
      } catch (err) {
        alert('Failed to parse JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* 1. Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Wand2 className="w-5 h-5 animate-pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              Visual Experience Composer
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                Live Synthesizer
              </span>
            </h1>
          </div>
          <p className="text-xs md:text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Combine 10 sensory and physical dimensions: <strong>Visual</strong>, <strong>Motion</strong>,{' '}
            <strong>Interaction</strong>, <strong>Lighting</strong>, <strong>Sound</strong>, <strong>Haptic</strong>,{' '}
            <strong>Typography</strong>, <strong>Theme</strong>, <strong>Intensity</strong>, and{' '}
            <strong>Performance Tier</strong> with real-time rendering.
          </p>
        </div>

        {/* Global Header Action Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsCompareMode(!isCompareMode)}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all border ${
              isCompareMode
                ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/20'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            {isCompareMode ? 'Exit Compare' : 'Side-by-Side Compare'}
          </button>

          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            Export Recipe
          </button>
        </div>
      </div>

      {/* Status Toast Alert */}
      {statusMessage && (
        <div className="p-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* If in Side-by-Side Compare Mode */}
      {isCompareMode ? (
        <RecipeComparator currentRecipe={activeRecipe} savedRecipes={savedRecipes} />
      ) : (
        <div className="space-y-8">
          {/* Top Recipe Management Bar */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-[280px]">
              <input
                type="text"
                value={activeRecipe.name}
                onChange={(e) => setActiveRecipe({ ...activeRecipe, name: e.target.value })}
                className="px-4 py-2 rounded-xl bg-black/40 border border-zinc-700 text-sm font-bold text-white font-mono focus:outline-none focus:border-cyan-400 flex-1 max-w-sm"
                placeholder="Recipe Name..."
              />
              <button
                onClick={handleToggleFavorite}
                className={`p-2.5 rounded-xl border transition-all ${
                  activeRecipe.isFavorite
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                }`}
                title="Favorite Recipe"
              >
                <Star className={`w-4 h-4 ${activeRecipe.isFavorite ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Actions: Save, Duplicate, Reset, Import */}
            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={handleSaveRecipe}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1.5 transition-all"
              >
                <Save className="w-3.5 h-3.5" /> Save Recipe
              </button>

              <button
                onClick={handleDuplicateRecipe}
                className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-medium flex items-center gap-1.5 transition-all"
              >
                <Copy className="w-3.5 h-3.5" /> Duplicate
              </button>

              <label className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-medium flex items-center gap-1.5 transition-all cursor-pointer">
                <Upload className="w-3.5 h-3.5" /> Import JSON
                <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
              </label>

              <button
                onClick={() => {
                  setActiveRecipe(PRESET_RECIPES[0]);
                  showNotification('Reset to Signature Obsidian Cinema recipe');
                }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all"
                title="Reset to Signature Recipe"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Validation & Conflict Diagnostic Warning Banner */}
          {conflicts.length > 0 && (
            <div className="space-y-3">
              {conflicts.map((warning) => (
                <div
                  key={warning.id}
                  className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    warning.severity === 'warning'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold font-mono">{warning.title}</div>
                      <div className="text-xs opacity-80 mt-0.5">{warning.message}</div>
                    </div>
                  </div>

                  {warning.autoFixProposal && (
                    <button
                      onClick={() => handleApplyAutoFix(warning.autoFixProposal!.patch)}
                      className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition-all shrink-0 self-start md:self-auto"
                    >
                      {warning.autoFixProposal.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 2. Interactive Live Rendering Stage */}
          <InteractiveLiveStage
            recipe={activeRecipe}
            onUpdateRecipe={(patch) => setActiveRecipe((prev) => ({ ...prev, ...patch }))}
            stageTitle={activeRecipe.name}
          />

          {/* 3. Dimension Selector Matrix */}
          <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
            {/* Dimension Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800">
              {[
                { id: 'visual', label: '1. Visual', icon: Palette, activeVal: activeRecipe.visual },
                { id: 'motion', label: '2. Motion', icon: Zap, activeVal: activeRecipe.motion },
                { id: 'interaction', label: '3. Interaction', icon: Compass, activeVal: activeRecipe.interaction },
                { id: 'lighting', label: '4. Lighting', icon: Sun, activeVal: activeRecipe.lighting },
                { id: 'sound', label: '5. Sound', icon: Volume2, activeVal: activeRecipe.sound },
                { id: 'haptic', label: '6. Haptic', icon: Vibrate, activeVal: activeRecipe.haptic },
                { id: 'typography', label: '7. Typography', icon: Type, activeVal: activeRecipe.typography },
                { id: 'theme', label: '8. Theme', icon: Layers, activeVal: activeRecipe.theme },
                { id: 'intensity', label: '9. Intensity', icon: Sliders, activeVal: activeRecipe.intensity },
                { id: 'perf', label: '10. Perf Tier', icon: Radio, activeVal: activeRecipe.performanceTier },
              ].map((dim) => {
                const Icon = dim.icon;
                const isSelected = activeDimension === dim.id;
                return (
                  <button
                    key={dim.id}
                    onClick={() => setActiveDimension(dim.id as any)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 scale-[1.02]'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{dim.label}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-black/20 text-black' : 'bg-black/40 text-cyan-400'
                      }`}
                    >
                      {dim.activeVal}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dimension Selection Grid Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 1. VISUAL OPTIONS */}
              {activeDimension === 'visual' &&
                VISUAL_OPTIONS.map((opt) => {
                  const isSelected = activeRecipe.visual === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => updateRecipeDimension('visual', opt.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white font-mono">{opt.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <div
                        className={`h-12 rounded-xl bg-gradient-to-r ${opt.previewGradient} border border-white/10 flex items-center justify-center`}
                      >
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                          Refraction: {opt.refractionIndex}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{opt.description}</p>
                    </div>
                  );
                })}

              {/* 2. MOTION OPTIONS */}
              {activeDimension === 'motion' &&
                MOTION_OPTIONS.map((opt) => {
                  const isSelected = activeRecipe.motion === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => updateRecipeDimension('motion', opt.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white font-mono">{opt.name}</span>
                        <span className="text-[10px] font-mono text-cyan-400">{opt.badge}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs font-mono">
                        <div className="flex justify-between text-zinc-400">
                          <span>Stiffness:</span>
                          <span className="text-white">{opt.stiffness} N/m</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Damping:</span>
                          <span className="text-white">{opt.damping} Ns/m</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Duration:</span>
                          <span className="text-white">{opt.duration}s</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{opt.description}</p>
                    </div>
                  );
                })}

              {/* 3. INTERACTION OPTIONS */}
              {activeDimension === 'interaction' &&
                INTERACTION_OPTIONS.map((opt) => {
                  const isSelected = activeRecipe.interaction === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => updateRecipeDimension('interaction', opt.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white font-mono">{opt.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs font-mono">
                        <div className="flex justify-between text-zinc-400">
                          <span>Magnetism:</span>
                          <span className="text-white">{opt.magneticStrength * 100}%</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Max 3D Tilt:</span>
                          <span className="text-white">{opt.tiltMaxAngle}°</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{opt.description}</p>
                    </div>
                  );
                })}

              {/* 4. LIGHTING OPTIONS */}
              {activeDimension === 'lighting' &&
                LIGHTING_OPTIONS.map((opt) => {
                  const isSelected = activeRecipe.lighting === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => updateRecipeDimension('lighting', opt.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white font-mono">{opt.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs font-mono">
                        <div className="flex justify-between text-zinc-400">
                          <span>Glow Spread:</span>
                          <span className="text-white">{opt.glowSpread}</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Edge Tracing:</span>
                          <span className="text-white">{opt.edgeTracing ? 'Yes' : 'No'}</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{opt.description}</p>
                    </div>
                  );
                })}

              {/* 5. SOUND OPTIONS */}
              {activeDimension === 'sound' &&
                SOUND_OPTIONS.map((opt) => {
                  const isSelected = activeRecipe.sound === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => updateRecipeDimension('sound', opt.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white font-mono">{opt.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundSynthesizer.playSound(opt.id, 'click', activeRecipe.intensity);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-mono text-cyan-300"
                        >
                          Audition
                        </button>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs font-mono">
                        <div className="flex justify-between text-zinc-400">
                          <span>Tone Freq:</span>
                          <span className="text-white">{opt.baseFreq > 0 ? `${opt.baseFreq} Hz` : 'Silent'}</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Decay:</span>
                          <span className="text-white">{opt.decayTime}s</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{opt.description}</p>
                    </div>
                  );
                })}

              {/* 6. HAPTIC OPTIONS */}
              {activeDimension === 'haptic' &&
                HAPTIC_OPTIONS.map((opt) => {
                  const isSelected = activeRecipe.haptic === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => updateRecipeDimension('haptic', opt.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white font-mono">{opt.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerHaptic(opt.id, activeRecipe.intensity);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-mono text-amber-300"
                        >
                          Pulse
                        </button>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs font-mono">
                        <div className="flex justify-between text-zinc-400">
                          <span>Pattern:</span>
                          <span className="text-white">{opt.vibratePattern.join(', ') || 'None'} ms</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Strength:</span>
                          <span className="text-white">{Math.round(opt.intensityStrength * 100)}%</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{opt.description}</p>
                    </div>
                  );
                })}

              {/* 7. TYPOGRAPHY OPTIONS */}
              {activeDimension === 'typography' &&
                TYPOGRAPHY_OPTIONS.map((opt) => {
                  const isSelected = activeRecipe.typography === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => updateRecipeDimension('typography', opt.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white font-mono">{opt.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs font-mono">
                        <div className="flex justify-between text-zinc-400">
                          <span>Title Font:</span>
                          <span className="text-white">{opt.titleFont}</span>
                        </div>
                        <div className="flex justify-between text-zinc-400">
                          <span>Tracking:</span>
                          <span className="text-white">{opt.titleTracking}</span>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{opt.description}</p>
                    </div>
                  );
                })}

              {/* 8. THEME OPTIONS */}
              {activeDimension === 'theme' &&
                THEME_OPTIONS.map((opt) => {
                  const isSelected = activeRecipe.theme === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => updateRecipeDimension('theme', opt.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white font-mono">{opt.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: opt.accentHex }} />
                          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: opt.secondaryHex }} />
                        </div>
                      </div>
                      <div className={`h-8 rounded-xl bg-gradient-to-r ${opt.previewSwatch} border border-white/10`} />
                      <p className="text-xs text-zinc-400 leading-relaxed">{opt.description}</p>
                    </div>
                  );
                })}

              {/* 9. INTENSITY LEVELS */}
              {activeDimension === 'intensity' &&
                [
                  { id: 'subtle', name: 'Subtle (20%)', desc: 'Whisper-quiet micro-animations, faint lighting, 10% volume. Ideal for dense financial dashboards.' },
                  { id: 'balanced', name: 'Balanced (50%)', desc: 'Standard production grade: crisp 0.3s springs, optimal contrast, balanced sensory feedback.' },
                  { id: 'expressive', name: 'Expressive (80%)', desc: 'Rich particle effects, prominent rim lights, full resonant audio, pronounced 3D tilt.' },
                  { id: 'extreme', name: 'Overclocked Extreme (100%)', desc: 'Maximum bloom, high kinetic recoil, intense tactile buzz, multi-octave chord chimes.' },
                ].map((lvl) => {
                  const isSelected = activeRecipe.intensity === lvl.id;
                  return (
                    <div
                      key={lvl.id}
                      onClick={() => updateRecipeDimension('intensity', lvl.id as IntensityLevel)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white font-mono">{lvl.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{lvl.desc}</p>
                    </div>
                  );
                })}

              {/* 10. PERFORMANCE TIER */}
              {activeDimension === 'perf' &&
                [
                  { id: 'ultra', name: 'Ultra / 120 FPS WebGL+Filters', desc: 'Full multi-pass blur, particle emitters, reactive laser edge light tracking, and Web Audio.' },
                  { id: 'balanced', name: 'Balanced / 60 FPS Hardware-Accelerated', desc: 'Hardware-accelerated CSS transforms, single-pass backdrop blur, and optimized sound.' },
                  { id: 'eco', name: 'Eco / Low-Power Reduced-Motion', desc: 'Zero backdrop-filter overhead, static lighting, minimal battery impact, and WCAG accessibility.' },
                ].map((tier) => {
                  const isSelected = activeRecipe.performanceTier === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => updateRecipeDimension('performanceTier', tier.id as PerformanceTier)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        isSelected
                          ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white font-mono">{tier.name}</span>
                        {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed">{tier.desc}</p>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* 4. Curated Master Presets & Saved Recipes Collection */}
          <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Curated Master Presets & Saved Recipes
                </h3>
                <p className="text-xs text-zinc-400">
                  Select any recipe to load and render it live on the synthesizer stage.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {savedRecipes.map((r) => {
                const isActive = activeRecipe.id === r.id;
                return (
                  <div
                    key={r.id}
                    onClick={() => {
                      setActiveRecipe(r);
                      showNotification(`Loaded "${r.name}"`);
                    }}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 relative group ${
                      isActive
                        ? 'bg-cyan-500/15 border-cyan-400 shadow-xl'
                        : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-sm text-white font-mono leading-tight">{r.name}</div>
                      {r.isFavorite && <Star className="w-3.5 h-3.5 text-amber-400 fill-current shrink-0" />}
                    </div>

                    <div className="text-[11px] text-zinc-400 font-mono space-y-1">
                      <div>
                        {r.visual} + {r.motion}
                      </div>
                      <div>
                        {r.sound} + {r.haptic}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {r.tags?.map((t) => (
                        <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Delete Custom Recipe Trigger */}
                    {r.id.startsWith('recipe-') && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRecipe(r.id);
                        }}
                        className="absolute top-3 right-3 p-1 rounded-lg text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Recipe"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 5. Code, AI Prompt & JSON Exporter Modal */}
      {showExportModal && (
        <CodeExporterModal recipe={activeRecipe} onClose={() => setShowExportModal(false)} />
      )}
    </div>
  );
}
