/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePerformanceTier } from './PerformanceContext';
import { PerformanceTierId } from './types';

export interface TierSwitchProps {
  low: React.ReactNode;
  standard?: React.ReactNode;
  high?: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Declarative component that conditionally renders different implementations
 * based on the active Performance Tier (Tier 1 Low, Tier 2 Standard, Tier 3 High).
 *
 * Example:
 * <TierSwitch
 *   low={<LowSpecimen />}
 *   standard={<StandardSpecimen />}
 *   high={<HighFidelitySpecimen />}
 * />
 */
export const TierSwitch: React.FC<TierSwitchProps> = ({ low, standard, high, fallback }) => {
  const { activeTier } = usePerformanceTier();

  if (activeTier === 'tier1-low') {
    return <>{low}</>;
  }

  if (activeTier === 'tier2-standard') {
    if (standard !== undefined) return <>{standard}</>;
    return <>{low}</>;
  }

  if (activeTier === 'tier3-high') {
    if (high !== undefined) return <>{high}</>;
    if (standard !== undefined) return <>{standard}</>;
    return <>{low}</>;
  }

  return <>{fallback || low}</>;
};

/**
 * Higher-order component / wrapper that adds a badge showing the active tier of the rendered sub-tree
 */
export const TierBadge: React.FC<{ tier?: PerformanceTierId; className?: string }> = ({
  tier,
  className = '',
}) => {
  const context = usePerformanceTier();
  const currentTier = tier || context.activeTier;

  if (currentTier === 'tier1-low') {
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1 ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        Tier 1 Low
      </span>
    );
  }

  if (currentTier === 'tier2-standard') {
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 inline-flex items-center gap-1 ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
        Tier 2 Standard
      </span>
    );
  }

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 inline-flex items-center gap-1 shadow-sm shadow-purple-500/30 ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
      Tier 3 High
    </span>
  );
};
