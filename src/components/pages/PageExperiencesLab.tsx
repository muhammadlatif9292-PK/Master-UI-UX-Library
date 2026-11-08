/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Layers,
  Palette,
  Eye,
  Code2,
  Sparkles,
  Info,
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  Shield,
  UserPlus,
  LayoutDashboard,
  BrainCircuit,
  Settings,
  User,
  Search,
  BarChart3,
  FlaskConical,
  Orbit,
  GraduationCap,
  Radio,
  Target,
  Inbox,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Box,
  ChevronRight,
  Filter,
} from 'lucide-react';

import { PageExperienceId, PageCategory, DesignRecipeId } from './types';
import { PAGE_RECIPES } from './recipes';
import { PAGE_EXPERIENCES_METADATA } from './experienceMetadata';

// Experience Views
import { LoginPageExperience } from './experience-views/LoginPageExperience';
import { SignupPageExperience } from './experience-views/SignupPageExperience';
import { DashboardPageExperience } from './experience-views/DashboardPageExperience';
import { AiWorkspacePageExperience } from './experience-views/AiWorkspacePageExperience';
import { SettingsPageExperience } from './experience-views/SettingsPageExperience';
import { ProfilePageExperience } from './experience-views/ProfilePageExperience';
import { SearchPageExperience } from './experience-views/SearchPageExperience';
import { AnalyticsPageExperience } from './experience-views/AnalyticsPageExperience';
import { ScientificLabPageExperience } from './experience-views/ScientificLabPageExperience';
import { SimulationPageExperience } from './experience-views/SimulationPageExperience';
import { EducationPageExperience } from './experience-views/EducationPageExperience';
import { CommandCenterPageExperience } from './experience-views/CommandCenterPageExperience';
import { OnboardingPageExperience } from './experience-views/OnboardingPageExperience';
import { EmptyStatePageExperience } from './experience-views/EmptyStatePageExperience';
import { ErrorPageExperience } from './experience-views/ErrorPageExperience';
import { SuccessPageExperience } from './experience-views/SuccessPageExperience';

export const PageExperiencesLab: React.FC = () => {
  const [activePageId, setActivePageId] = useState<PageExperienceId>('dashboard');
  const [activeCategory, setActiveCategory] = useState<PageCategory>('all');
  const [activeRecipeId, setActiveRecipeId] = useState<DesignRecipeId>('modern-slate');
  const [viewportMode, setViewportMode] = useState<'full' | 'desktop' | 'tablet' | 'mobile'>('full');
  const [showComponentBlueprint, setShowComponentBlueprint] = useState(true);

  const activeMetadata = PAGE_EXPERIENCES_METADATA.find((p) => p.id === activePageId) || PAGE_EXPERIENCES_METADATA[0];
  const activeRecipe = PAGE_RECIPES[activeRecipeId] || PAGE_RECIPES['modern-slate'];

  const categoryTabs: { id: PageCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All 16 Page Experiences', count: 16 },
    { id: 'auth-access', label: 'Auth & Access (2)', count: 2 },
    { id: 'productivity-ai', label: 'Productivity & AI (4)', count: 4 },
    { id: 'data-analytics', label: 'Data & Analytics (2)', count: 2 },
    { id: 'science-simulation', label: 'Science & Simulation (3)', count: 3 },
    { id: 'status-system', label: 'Status & System (5)', count: 5 },
  ];

  const filteredPages = activeCategory === 'all'
    ? PAGE_EXPERIENCES_METADATA
    : PAGE_EXPERIENCES_METADATA.filter((p) => p.category === activeCategory);

  const getPageIcon = (id: PageExperienceId) => {
    switch (id) {
      case 'login': return Shield;
      case 'signup': return UserPlus;
      case 'dashboard': return LayoutDashboard;
      case 'ai-workspace': return BrainCircuit;
      case 'settings': return Settings;
      case 'profile': return User;
      case 'search': return Search;
      case 'analytics': return BarChart3;
      case 'scientific-lab': return FlaskConical;
      case 'simulation': return Orbit;
      case 'education': return GraduationCap;
      case 'command-center': return Radio;
      case 'onboarding': return Target;
      case 'empty-state': return Inbox;
      case 'error': return AlertTriangle;
      case 'success': return CheckCircle2;
      default: return Layers;
    }
  };

  const renderActiveExperience = () => {
    switch (activePageId) {
      case 'login': return <LoginPageExperience recipe={activeRecipe} />;
      case 'signup': return <SignupPageExperience recipe={activeRecipe} />;
      case 'dashboard': return <DashboardPageExperience recipe={activeRecipe} />;
      case 'ai-workspace': return <AiWorkspacePageExperience recipe={activeRecipe} />;
      case 'settings': return <SettingsPageExperience recipe={activeRecipe} />;
      case 'profile': return <ProfilePageExperience recipe={activeRecipe} />;
      case 'search': return <SearchPageExperience recipe={activeRecipe} />;
      case 'analytics': return <AnalyticsPageExperience recipe={activeRecipe} />;
      case 'scientific-lab': return <ScientificLabPageExperience recipe={activeRecipe} />;
      case 'simulation': return <SimulationPageExperience recipe={activeRecipe} />;
      case 'education': return <EducationPageExperience recipe={activeRecipe} />;
      case 'command-center': return <CommandCenterPageExperience recipe={activeRecipe} />;
      case 'onboarding': return <OnboardingPageExperience recipe={activeRecipe} />;
      case 'empty-state': return <EmptyStatePageExperience recipe={activeRecipe} />;
      case 'error': return <ErrorPageExperience recipe={activeRecipe} />;
      case 'success': return <SuccessPageExperience recipe={activeRecipe} />;
      default: return <DashboardPageExperience recipe={activeRecipe} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Studio Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/20 border border-indigo-500/40 text-indigo-400 shadow-inner">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg md:text-xl text-white tracking-tight">
                  Complete Page-Level Experiences Suite
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-950 border border-indigo-700 text-indigo-300">
                  16 Full Pages
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Full-page production workflows combining our component library with coherent design recipes
              </p>
            </div>
          </div>

          {/* Recipe Selector & Viewport Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Design Recipe Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
              <Palette className="w-3.5 h-3.5 text-slate-400 ml-2" />
              <select
                value={activeRecipeId}
                onChange={(e) => setActiveRecipeId(e.target.value as DesignRecipeId)}
                className="bg-transparent text-xs font-semibold text-slate-200 outline-none pr-3 py-1 cursor-pointer"
              >
                {Object.values(PAGE_RECIPES).map((r) => (
                  <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                    {r.name} ({r.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* Viewport Frame Mode */}
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-2xl border border-slate-800 text-xs">
              <button
                onClick={() => setViewportMode('full')}
                title="Full Responsive Width"
                className={`p-1.5 rounded-xl transition-all ${viewportMode === 'full' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('desktop')}
                title="Desktop Viewport (1440px)"
                className={`p-1.5 rounded-xl transition-all ${viewportMode === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('tablet')}
                title="Tablet Viewport (1024px)"
                className={`p-1.5 rounded-xl transition-all ${viewportMode === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Tablet className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewportMode('mobile')}
                title="Mobile Viewport (420px)"
                className={`p-1.5 rounded-xl transition-all ${viewportMode === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Tabs Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 px-6 overflow-x-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto flex items-center gap-1 py-2">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600/30 border border-indigo-500/60 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Page Experience Card Selector Strip */}
      <div className="border-b border-slate-800/60 bg-slate-950/60 px-6 overflow-x-auto scrollbar-thin py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          {filteredPages.map((page) => {
            const Icon = getPageIcon(page.id);
            const isSelected = activePageId === page.id;
            return (
              <button
                key={page.id}
                onClick={() => {
                  setActivePageId(page.id);
                  setActiveRecipeId(page.recipeId);
                }}
                className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{page.title.split(' ')[0]} {page.title.split(' ')[1] || ''}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Component Blueprint & Metadata Banner */}
      <div className="bg-slate-900/40 border-b border-slate-800/60 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white text-sm">{activeMetadata.title}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">{activeMetadata.description}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-mono text-[11px]">Recipe:</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-mono text-[10px] font-bold">
              {activeRecipe.name}
            </span>
            <button
              onClick={() => setShowComponentBlueprint(!showComponentBlueprint)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold underline ml-2"
            >
              {showComponentBlueprint ? 'Hide Blueprint' : 'View Blueprint'}
            </button>
          </div>
        </div>

        {/* Blueprint Drawer */}
        {showComponentBlueprint && (
          <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-black/40 border border-slate-800">
              <span className="text-slate-500 uppercase text-[10px] font-mono block">Domain Application</span>
              <span className="text-slate-200 font-semibold">{activeMetadata.targetDomain}</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-slate-800 sm:col-span-2">
              <span className="text-slate-500 uppercase text-[10px] font-mono block">Design System Components Combined</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {activeMetadata.keyComponentsUsed.map((comp, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-lg bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 font-mono text-[11px]">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Experience Render Stage */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-slate-950 overflow-x-hidden">
        <div
          className={`w-full transition-all duration-300 rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden ${
            viewportMode === 'mobile'
              ? 'max-w-[420px]'
              : viewportMode === 'tablet'
              ? 'max-w-[1024px]'
              : viewportMode === 'desktop'
              ? 'max-w-[1440px]'
              : 'max-w-7xl'
          }`}
        >
          {renderActiveExperience()}
        </div>
      </main>
    </div>
  );
};
