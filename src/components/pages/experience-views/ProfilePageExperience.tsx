/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Award,
  BookOpen,
  GitBranch,
  Activity,
  Share2,
  Mail,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';
import { ProfileCard } from '../../../design-system/general/components/ProfileCard';
import { TimelineView } from '../../../design-system/general/components/TimelineView';

interface Props {
  recipe: PageStyleRecipe;
}

export const ProfilePageExperience: React.FC<Props> = ({ recipe }) => {
  const [activeTab, setActiveTab] = useState<'contributions' | 'models' | 'publications' | 'timeline'>('contributions');

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col font-sans`}>
      {/* Header */}
      <header className={`px-6 py-4 border-b ${recipe.divider} ${recipe.headerBg} flex items-center justify-between sticky top-0 z-20`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`font-extrabold text-lg ${recipe.textPrimary}`}>
              Researcher & Principal Investigator Profile
            </h1>
            <p className={`text-xs ${recipe.textSecondary}`}>
              Cryptographic verification, telemetry citations, and model artifacts
            </p>
          </div>
        </div>

        <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2">
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Profile</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="p-6 max-w-7xl mx-auto w-full space-y-6 flex-1">
        {/* Profile Card Deck */}
        <ProfileCard />

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-semibold">
          {[
            { id: 'contributions', label: 'Research Trajectory', icon: Activity },
            { id: 'models', label: 'Published Models (14)', icon: GitBranch },
            { id: 'publications', label: 'Peer-Reviewed Papers (32)', icon: BookOpen },
            { id: 'timeline', label: 'Milestone Timeline', icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-indigo-600/30 border border-indigo-500/50 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 text-indigo-400" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        {activeTab === 'contributions' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-3">
              <span className="text-xs text-slate-400 uppercase font-mono">H-Index Citation Rate</span>
              <div className="text-3xl font-extrabold text-white font-mono">48.6</div>
              <p className="text-xs text-emerald-400">+12% citation velocity year-over-year</p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-3">
              <span className="text-xs text-slate-400 uppercase font-mono">Quantum Patents</span>
              <div className="text-3xl font-extrabold text-cyan-400 font-mono">8 Approved</div>
              <p className="text-xs text-slate-400">Zero-copy ring buffer topology algorithms</p>
            </div>

            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-3">
              <span className="text-xs text-slate-400 uppercase font-mono">Verified Commits</span>
              <div className="text-3xl font-extrabold text-indigo-400 font-mono">1,842</div>
              <p className="text-xs text-slate-400">Signed with GPG Hardware Subkey</p>
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <TimelineView />
          </div>
        )}

        {(activeTab === 'models' || activeTab === 'publications') && (
          <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/40 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
            <h4 className="font-bold text-white text-sm">Indexed Academic & Model Repositories</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              All artifacts are cryptographically signed and mirror-synced to ArXiv and HuggingFace.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
