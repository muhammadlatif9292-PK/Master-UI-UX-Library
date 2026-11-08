/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Info,
  CheckCheck,
  Trash2,
  Clock,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'warning' | 'critical' | 'success';
  read: boolean;
  actionLabel?: string;
}

export const NotificationCenter: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Quantum Decoherence Threshold Exceeded',
      message: 'Sub-system B-12 recorded 4.8% phase drift exceeding baseline SLA tolerance.',
      timestamp: '2m ago',
      type: 'critical',
      read: false,
      actionLabel: 'Inspect Telemetry',
    },
    {
      id: 'notif-2',
      title: 'Distributed Model Compilation Completed',
      message: 'Checkpoint v4.2.0 is compiled and ready for TPU v5e pod inference deployment.',
      timestamp: '18m ago',
      type: 'success',
      read: false,
      actionLabel: 'Deploy to Prod',
    },
    {
      id: 'notif-3',
      title: 'API Rate Limit Warning (85% Capacity)',
      message: 'Workspace ingress processed 85,000 queries in the last rolling 60-minute window.',
      timestamp: '1h ago',
      type: 'warning',
      read: true,
    },
    {
      id: 'notif-4',
      title: 'Security Audit Token Rotation',
      message: 'Primary OAuth2 signing key scheduled for autonomous 30-day rotation in 48 hours.',
      timestamp: '3h ago',
      type: 'info',
      read: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'critical') return n.type === 'critical' || n.type === 'warning';
    return true;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'critical':
        return <AlertOctagon className="w-5 h-5 text-rose-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Info className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className={`rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl p-6 space-y-4 select-none max-w-xl`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`p-2 rounded-2xl bg-black/40 border border-white/10 text-slate-300`}>
              <Bell className="w-5 h-5" />
            </div>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h3 className={`font-bold text-base ${recipeConfig.textPrimary}`}>System Notifications</h3>
            <p className={`text-xs ${recipeConfig.textSecondary}`}>
              {unreadCount > 0 ? `${unreadCount} unread system events` : 'All alerts acknowledged'}
            </p>
          </div>
        </div>

        {/* Header Actions */}
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        {(['all', 'unread', 'critical'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-xl capitalize font-mono text-xs transition-all ${
              filter === f ? `${recipeConfig.accentBg}` : 'bg-black/30 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            {f} {f === 'unread' && unreadCount > 0 && `(${unreadCount})`}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className={`p-8 text-center text-xs ${recipeConfig.textSecondary}`}>
            No notifications matching this filter.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => markAsRead(item.id)}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3 relative group ${
                !item.read
                  ? `${recipeConfig.border} bg-black/40 border-l-4 border-l-indigo-400`
                  : 'border-white/5 bg-black/20 opacity-75'
              }`}
            >
              <div className="p-2 rounded-xl bg-black/50 border border-white/5 flex-shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-xs font-bold ${recipeConfig.textPrimary} truncate`}>
                    {item.title}
                  </h4>
                  <span className={`text-[10px] font-mono ${recipeConfig.textSecondary} flex-shrink-0`}>
                    {item.timestamp}
                  </span>
                </div>

                <p className={`text-xs leading-relaxed ${recipeConfig.textSecondary}`}>
                  {item.message}
                </p>

                {item.actionLabel && (
                  <button className={`mt-2 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border ${recipeConfig.accentBorder} ${recipeConfig.accentText} bg-white/5 hover:bg-white/10 transition-all`}>
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(item.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 transition-opacity"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
