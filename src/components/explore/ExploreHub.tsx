/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import {
  Box,
  ShieldCheck,
  Compass,
  MousePointerClick,
  Keyboard,
  LayoutGrid,
  Palette,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { CatalogDiscovery } from '../CatalogDiscovery';

// Lazy load dedicated family studios for deep exploration when requested
const AuthFamilyCatalog = lazy(() => import('../auth/AuthFamilyCatalog').then((m) => ({ default: m.AuthFamilyCatalog })));
const NavigationFamilyCatalog = lazy(() => import('../navigation/NavigationFamilyCatalog').then((m) => ({ default: m.NavigationFamilyCatalog })));
const ButtonFamilyCatalog = lazy(() => import('../buttons/ButtonFamilyCatalog').then((m) => ({ default: m.ButtonFamilyCatalog })));
const InputFamilyCatalog = lazy(() => import('../inputs/InputFamilyCatalog').then((m) => ({ default: m.InputFamilyCatalog })));
const CardFamilyCatalog = lazy(() => import('../cards/CardFamilyCatalog').then((m) => ({ default: m.CardFamilyCatalog })));
const ControlsLab = lazy(() => import('../controls/ControlsLab').then((m) => ({ default: m.ControlsLab })));
const OverlayUtilityLab = lazy(() => import('../overlays/OverlayUtilityLab').then((m) => ({ default: m.OverlayUtilityLab })));
const FeedbackStateLab = lazy(() => import('../feedback/FeedbackStateLab').then((m) => ({ default: m.FeedbackStateLab })));
const DashboardCatalogLab = lazy(() => import('../dashboards/DashboardCatalogLab').then((m) => ({ default: m.DashboardCatalogLab })));
const AiInterfaceCatalogLab = lazy(() => import('../ai-interface/AiInterfaceCatalogLab').then((m) => ({ default: m.AiInterfaceCatalogLab })));
const CharacterLab = lazy(() => import('../character/CharacterLab').then((m) => ({ default: m.CharacterLab })));
const SpatialCatalogLab = lazy(() => import('../spatial/SpatialCatalogLab').then((m) => ({ default: m.SpatialCatalogLab })));
const ScientificCatalogLab = lazy(() => import('../scientific/ScientificCatalogLab').then((m) => ({ default: m.ScientificCatalogLab })));
const WorkflowCatalogLab = lazy(() => import('../workflow/WorkflowCatalogLab').then((m) => ({ default: m.WorkflowCatalogLab })));
const PageExperiencesLab = lazy(() => import('../pages/PageExperiencesLab').then((m) => ({ default: m.PageExperiencesLab })));
const GeneralCatalogLab = lazy(() => import('../general/GeneralCatalogLab').then((m) => ({ default: m.GeneralCatalogLab })));
const OnboardingGuidanceLab = lazy(() => import('../onboarding/OnboardingGuidanceLab').then((m) => ({ default: m.OnboardingGuidanceLab })));
const StyleExplorer = lazy(() => import('../StyleExplorer').then((m) => ({ default: m.StyleExplorer })));

export type ExploreCategory =
  | 'all'
  | 'auth'
  | 'navigation'
  | 'buttons'
  | 'inputs'
  | 'cards'
  | 'controls'
  | 'overlay'
  | 'feedback'
  | 'dashboards'
  | 'ai-interface'
  | 'character'
  | 'spatial'
  | 'scientific'
  | 'workflow'
  | 'pages'
  | 'general'
  | 'onboarding'
  | 'styles';

interface ExploreHubProps {
  initialCategory?: ExploreCategory;
  onSelectEntry?: (entry: CatalogEntry) => void;
  onNavigateToCustomize?: (specimenId?: string) => void;
  onNavigateToCompare?: (specimenId?: string) => void;
  onNavigateToCode?: (specimenId?: string) => void;
}

export function ExploreHub({
  initialCategory = 'all',
  onSelectEntry,
  onNavigateToCustomize,
  onNavigateToCompare,
  onNavigateToCode,
}: ExploreHubProps) {
  const [activeStudioView, setActiveStudioView] = useState<ExploreCategory | null>(
    initialCategory !== 'all' ? initialCategory : null
  );

  return (
    <div className="space-y-6">
      {/* If inside a dedicated deep-dive studio, offer a clean return banner */}
      {activeStudioView && activeStudioView !== 'all' && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-md">
          <button
            onClick={() => setActiveStudioView(null)}
            className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Master Catalog Discovery
          </button>
          <span className="text-xs font-mono text-zinc-400 capitalize">
            Dedicated Studio: <strong className="text-white">{activeStudioView}</strong>
          </span>
        </div>
      )}

      {/* Main Content Area */}
      {!activeStudioView || activeStudioView === 'all' ? (
        <CatalogDiscovery
          onSelectEntry={onSelectEntry}
          onNavigateToCategoryStudio={(catId) => setActiveStudioView(catId as ExploreCategory)}
        />
      ) : (
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20 text-zinc-500 font-mono text-xs gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-cyan-500/40 border-t-cyan-400 animate-spin" />
              Loading component studio...
            </div>
          }
        >
          {activeStudioView === 'auth' && <AuthFamilyCatalog onSelectEntry={onSelectEntry} />}
          {activeStudioView === 'navigation' && <NavigationFamilyCatalog onSelectEntry={onSelectEntry} />}
          {activeStudioView === 'buttons' && <ButtonFamilyCatalog onSelectEntry={onSelectEntry} />}
          {activeStudioView === 'inputs' && <InputFamilyCatalog onSelectEntry={onSelectEntry} />}
          {activeStudioView === 'cards' && <CardFamilyCatalog onSelectEntry={onSelectEntry} />}
          {activeStudioView === 'styles' && <StyleExplorer />}
          {activeStudioView === 'dashboards' && <DashboardCatalogLab />}
          {activeStudioView === 'controls' && <ControlsLab />}
          {activeStudioView === 'overlay' && <OverlayUtilityLab />}
          {activeStudioView === 'feedback' && <FeedbackStateLab />}
          {activeStudioView === 'ai-interface' && <AiInterfaceCatalogLab />}
          {activeStudioView === 'character' && <CharacterLab />}
          {activeStudioView === 'spatial' && <SpatialCatalogLab />}
          {activeStudioView === 'scientific' && <ScientificCatalogLab />}
          {activeStudioView === 'workflow' && <WorkflowCatalogLab />}
          {activeStudioView === 'pages' && <PageExperiencesLab />}
          {activeStudioView === 'general' && <GeneralCatalogLab />}
          {activeStudioView === 'onboarding' && <OnboardingGuidanceLab />}
        </Suspense>
      )}
    </div>
  );
}
