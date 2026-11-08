/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  User,
  ShieldCheck,
  MapPin,
  Building2,
  Mail,
  Github,
  Globe,
  Award,
  Sparkles,
  Edit3,
  MessageSquare,
  UserPlus,
  Check,
  Activity,
} from 'lucide-react';

export const ProfileCard: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();
  const [isFollowing, setIsFollowing] = useState(false);
  const [presenceStatus, setPresenceStatus] = useState<'online' | 'busy' | 'away'>('online');

  const skills = ['Distributed Systems', 'LLM Alignment', 'Quantum Computing', 'Rust', 'PyTorch', 'eBPF'];

  const stats = [
    { label: 'Citations', value: '4,820' },
    { label: 'Models Deployed', value: '38' },
    { label: 'Verification Trust', value: '99.4%' },
    { label: 'Reviews', value: '412' },
  ];

  return (
    <div className={`rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl overflow-hidden select-none max-w-2xl`}>
      {/* Banner / Cover Header */}
      <div className="h-28 bg-gradient-to-r from-indigo-900 via-purple-950 to-slate-900 relative p-4 flex items-end justify-end">
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Verified Principal Researcher
          </span>
        </div>
      </div>

      {/* Main Profile Info Body */}
      <div className="px-6 pb-6 pt-0 space-y-6">
        {/* Avatar + Actions Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12">
          {/* Avatar with Presence Indicator */}
          <div className="relative">
            <div className={`w-24 h-24 rounded-3xl bg-slate-950 border-4 ${recipeConfig.cardBg} flex items-center justify-center text-indigo-400 shadow-xl font-bold text-2xl border-white/10 overflow-hidden`}>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
            {/* Status dot */}
            <div
              className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-slate-950 flex items-center justify-center ${
                presenceStatus === 'online'
                  ? 'bg-emerald-500'
                  : presenceStatus === 'busy'
                  ? 'bg-rose-500'
                  : 'bg-amber-500'
              }`}
              title={`Status: ${presenceStatus}`}
            >
              <div className="w-2 h-2 rounded-full bg-white/80" />
            </div>
          </div>

          {/* Connect & Message Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg ${
                isFollowing
                  ? 'bg-slate-800 border border-slate-700 text-slate-200'
                  : `${recipeConfig.accentBg}`
              }`}
            >
              {isFollowing ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <UserPlus className="w-3.5 h-3.5" />}
              <span>{isFollowing ? 'Connected' : 'Connect'}</span>
            </button>

            <button className={`p-2 rounded-xl bg-black/40 hover:bg-white/10 border ${recipeConfig.border} ${recipeConfig.textPrimary} transition-all`}>
              <MessageSquare className="w-4 h-4" />
            </button>
            <button className={`p-2 rounded-xl bg-black/40 hover:bg-white/10 border ${recipeConfig.border} ${recipeConfig.textPrimary} transition-all`}>
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bio & Identifiers */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className={`text-xl font-extrabold ${recipeConfig.textPrimary} tracking-tight`}>
              Dr. Elena Vance-Kovalev
            </h3>
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
          </div>
          <p className={`text-xs font-mono ${recipeConfig.accentText} font-semibold`}>
            @elena.vance • AI Architecture & Quantum Systems Lead
          </p>
          <p className={`text-xs ${recipeConfig.textSecondary} leading-relaxed pt-1`}>
            Leading generative alignment architectures and neural tokenizer research. Author of 14 published papers on transformer parameter efficiency and quantum annealing topologies.
          </p>
        </div>

        {/* Metadata Badges */}
        <div className={`flex flex-wrap items-center gap-4 text-xs font-mono ${recipeConfig.textSecondary} pt-1`}>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-500" />
            <span>DeepMind / Studio Lab</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>Geneva, Switzerland</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>e.vance@quantum.ai</span>
          </div>
        </div>

        {/* Numeric Telemetry Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          {stats.map((s, idx) => (
            <div key={idx} className="p-3 rounded-2xl bg-black/30 border border-white/5 text-center space-y-0.5">
              <div className={`text-sm md:text-base font-extrabold font-mono ${recipeConfig.textPrimary}`}>
                {s.value}
              </div>
              <div className={`text-[10px] font-mono uppercase ${recipeConfig.textSecondary}`}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Competencies Tags */}
        <div className="space-y-2 pt-1 border-t border-white/5">
          <span className={`text-[10px] font-mono uppercase font-bold ${recipeConfig.textSecondary}`}>
            Specialized Domains & Toolchains
          </span>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span key={skill} className={`px-2.5 py-1 rounded-xl text-xs font-mono border ${recipeConfig.badgeBg}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
