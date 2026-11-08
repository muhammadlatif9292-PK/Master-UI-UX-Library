/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProvenanceType } from '../../design-system/provenance/provenanceTypes';
import {
  Sparkles,
  GitFork,
  PackageCheck,
  Compass,
  FileCheck,
  Bot,
  Shield,
  ExternalLink,
} from 'lucide-react';

interface ProvenanceBadgeProps {
  type?: ProvenanceType | string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({
  type = 'original implementation',
  size = 'md',
  showLabel = true,
  showIcon = true,
  className = '',
  onClick,
}) => {
  const getBadgeConfig = () => {
    switch (type) {
      case 'original implementation':
        return {
          label: 'Original Implementation',
          shortLabel: 'Original',
          icon: Sparkles,
          bg: 'bg-emerald-500/15',
          border: 'border-emerald-500/30',
          text: 'text-emerald-300',
          dot: 'bg-emerald-400',
          desc: 'Engineered in-house under project Apache-2.0 license.',
        };
      case 'adapted implementation':
        return {
          label: 'Adapted Implementation',
          shortLabel: 'Adapted',
          icon: GitFork,
          bg: 'bg-blue-500/15',
          border: 'border-blue-500/30',
          text: 'text-blue-300',
          dot: 'bg-blue-400',
          desc: 'Re-engineered from upstream algorithm or pattern with modifications.',
        };
      case 'third-party dependency':
        return {
          label: 'Third-Party Dependency',
          shortLabel: 'Third-Party',
          icon: PackageCheck,
          bg: 'bg-purple-500/15',
          border: 'border-purple-500/30',
          text: 'text-purple-300',
          dot: 'bg-purple-400',
          desc: 'External library/package maintained upstream under its native license.',
        };
      case 'inspiration/reference':
        return {
          label: 'Inspiration / Reference',
          shortLabel: 'Inspiration',
          icon: Compass,
          bg: 'bg-amber-500/15',
          border: 'border-amber-500/30',
          text: 'text-amber-300',
          dot: 'bg-amber-400',
          desc: 'Architectural reference or visual paradigm inspiration.',
        };
      case 'licensed asset':
        return {
          label: 'Licensed Asset',
          shortLabel: 'Licensed',
          icon: FileCheck,
          bg: 'bg-cyan-500/15',
          border: 'border-cyan-500/30',
          text: 'text-cyan-300',
          dot: 'bg-cyan-400',
          desc: 'External asset licensed under specific open font / permissive terms.',
        };
      case 'generated asset':
        return {
          label: 'Generated Asset',
          shortLabel: 'AI Generated',
          icon: Bot,
          bg: 'bg-rose-500/15',
          border: 'border-rose-500/30',
          text: 'text-rose-300',
          dot: 'bg-rose-400',
          desc: 'Synthesized via AI models with documented prompts and disclosure.',
        };
      default:
        return {
          label: type,
          shortLabel: type,
          icon: Shield,
          bg: 'bg-zinc-800',
          border: 'border-zinc-700',
          text: 'text-zinc-300',
          dot: 'bg-zinc-400',
          desc: 'Asset provenance record.',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3.5 py-1.5 text-sm gap-2',
  }[size];

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size];

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center rounded-xl font-mono font-medium border transition-all ${config.bg} ${config.border} ${config.text} ${sizeClasses} ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95 shadow-sm' : ''
      } ${className}`}
      title={`${config.label}: ${config.desc}`}
    >
      {showIcon && <Icon className={`${iconSizes} shrink-0`} />}
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};
