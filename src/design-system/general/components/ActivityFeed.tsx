/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  Activity,
  GitCommit,
  Rocket,
  MessageSquare,
  Sparkles,
  Send,
  Heart,
  Flame,
  ThumbsUp,
  Filter,
} from 'lucide-react';

export interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar: string;
    handle: string;
  };
  action: string;
  target: string;
  timestamp: string;
  type: 'commit' | 'deploy' | 'comment' | 'ai';
  content?: string;
  reactions: { emoji: string; count: number; active?: boolean }[];
}

export const ActivityFeed: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();
  const [commentInput, setCommentInput] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'deploy' | 'commit' | 'comment'>('all');

  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 'act-1',
      user: {
        name: 'Dr. Elena Vance',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        handle: '@elena.vance',
      },
      action: 'promoted model weights to production',
      target: 'gemini-distill-v4.safetensors',
      timestamp: '12m ago',
      type: 'deploy',
      content: 'Passed all safety and latency benchmarks with 99.8% precision score across 500k queries.',
      reactions: [
        { emoji: '🚀', count: 14, active: true },
        { emoji: '🔥', count: 8 },
      ],
    },
    {
      id: 'act-2',
      user: {
        name: 'Marcus Thorne',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        handle: '@m.thorne',
      },
      action: 'committed distributed scheduler fix',
      target: 'commit #8f92acb',
      timestamp: '45m ago',
      type: 'commit',
      content: 'fix(engine): resolve race condition in worker node heartbeat reconciliation loop.',
      reactions: [
        { emoji: '👍', count: 6 },
      ],
    },
    {
      id: 'act-3',
      user: {
        name: 'Aria Chen',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
        handle: '@aria.chen',
      },
      action: 'commented on evaluation report',
      target: 'Run #4820 - TPU v5e',
      timestamp: '2h ago',
      type: 'comment',
      content: 'The perplexity curve flattened significantly earlier than baseline. Outstanding convergence speed!',
      reactions: [
        { emoji: '❤️', count: 11, active: true },
        { emoji: '✨', count: 5 },
      ],
    },
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      user: {
        name: 'You (Current User)',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        handle: '@researcher.current',
      },
      action: 'posted a workspace note',
      target: 'General Telemetry Stream',
      timestamp: 'Just now',
      type: 'comment',
      content: commentInput,
      reactions: [{ emoji: '💬', count: 1, active: true }],
    };

    setActivities([newActivity, ...activities]);
    setCommentInput('');
  };

  const toggleReaction = (activityId: string, emoji: string) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id !== activityId) return act;
        const updatedReactions = act.reactions.map((r) => {
          if (r.emoji === emoji) {
            return {
              ...r,
              count: r.active ? r.count - 1 : r.count + 1,
              active: !r.active,
            };
          }
          return r;
        });
        return { ...act, reactions: updatedReactions };
      })
    );
  };

  const filtered = activities.filter((a) => {
    if (filterType === 'all') return true;
    return a.type === filterType;
  });

  const getActionBadge = (type: ActivityItem['type']) => {
    switch (type) {
      case 'deploy':
        return <Rocket className="w-3.5 h-3.5 text-emerald-400" />;
      case 'commit':
        return <GitCommit className="w-3.5 h-3.5 text-indigo-400" />;
      default:
        return <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className={`rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl p-6 space-y-5 select-none max-w-2xl`}>
      {/* Feed Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-black/40 border border-white/10 text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`font-bold text-base ${recipeConfig.textPrimary}`}>Collaborative Team Stream</h3>
            <p className={`text-xs ${recipeConfig.textSecondary}`}>
              Live team actions, deployments, and benchmark updates
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 text-xs">
          {(['all', 'deploy', 'commit', 'comment'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded-xl capitalize font-mono text-[11px] transition-all ${
                filterType === t
                  ? `${recipeConfig.accentBg}`
                  : 'bg-black/30 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Comment Input Box */}
      <form onSubmit={handleAddComment} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Share an update or note with the cluster team..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          className={`flex-1 px-4 py-2.5 rounded-xl border text-xs ${recipeConfig.inputBg} outline-none`}
        />
        <button
          type="submit"
          className={`px-4 py-2.5 rounded-xl font-bold text-xs ${recipeConfig.accentBg} flex items-center gap-1.5 shadow-lg flex-shrink-0`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Post</span>
        </button>
      </form>

      {/* Activity Items */}
      <div className="space-y-3.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border ${recipeConfig.border} bg-black/30 space-y-2.5 transition-all hover:border-slate-700`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="w-8 h-8 rounded-full object-cover border border-white/10"
                  crossOrigin="anonymous"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className={`font-bold ${recipeConfig.textPrimary}`}>{item.user.name}</span>
                    <span className={`text-[10px] font-mono ${recipeConfig.textSecondary}`}>{item.user.handle}</span>
                  </div>
                  <div className={`text-[11px] ${recipeConfig.textSecondary} flex items-center gap-1 mt-0.5`}>
                    {getActionBadge(item.type)}
                    <span>{item.action}</span>
                    <span className={`font-mono ${recipeConfig.accentText} font-semibold`}>{item.target}</span>
                  </div>
                </div>
              </div>

              <span className={`text-[10px] font-mono ${recipeConfig.textSecondary}`}>{item.timestamp}</span>
            </div>

            {item.content && (
              <p className={`text-xs ${recipeConfig.textPrimary} bg-black/40 p-3 rounded-xl border border-white/5 leading-relaxed`}>
                {item.content}
              </p>
            )}

            {/* Reaction Chips */}
            <div className="flex items-center gap-2 pt-1">
              {item.reactions.map((r, rIdx) => (
                <button
                  key={rIdx}
                  onClick={() => toggleReaction(item.id, r.emoji)}
                  className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 transition-all border ${
                    r.active
                      ? 'bg-indigo-950/80 border-indigo-500/60 text-indigo-300'
                      : 'bg-black/40 border-white/5 text-slate-400 hover:bg-white/5'
                  }`}
                >
                  <span>{r.emoji}</span>
                  <span className="font-mono text-[11px] font-bold">{r.count}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
