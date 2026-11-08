/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VisualRecipeStyle } from '../types';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { BarChartPrimitive } from '../data-components/BarChartPrimitive';
import { RadialChartPrimitive } from '../data-components/RadialChartPrimitive';
import { SparklinePrimitive } from '../data-components/SparklinePrimitive';
import { ProgressPrimitive } from '../data-components/ProgressPrimitive';
import { HeatmapPrimitive } from '../data-components/HeatmapPrimitive';

export function ClassicGridLayout({ recipe }: { recipe: VisualRecipeStyle }) {
  return (
    <div className="space-y-6">
      {/* Metric Stat Cards in 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SparklinePrimitive
          label="Total Ingress"
          value="4.82 TB"
          delta="+12.4%"
          isPositive={true}
          recipe={recipe}
        />
        <SparklinePrimitive
          label="Active Sessions"
          value="48,290"
          delta="+5.8%"
          isPositive={true}
          recipe={recipe}
        />
        <SparklinePrimitive
          label="P99 Response"
          value="18.2 ms"
          delta="-4.1%"
          isPositive={true}
          recipe={recipe}
        />
        <SparklinePrimitive
          label="Error Rate"
          value="0.003%"
          delta="-0.001%"
          isPositive={true}
          recipe={recipe}
        />
      </div>

      {/* Main 2-Column Balanced Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartPrimitive
          recipe={recipe}
          title="Network Throughput (Dual WAN)"
          series1Label="Primary WAN"
          series2Label="Failover Mesh"
        />
        <BarChartPrimitive
          recipe={recipe}
          title="Compute Cluster Allocation"
        />
      </div>

      {/* 3-Column Balanced Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RadialChartPrimitive recipe={recipe} />
        <ProgressPrimitive recipe={recipe} />
        <HeatmapPrimitive recipe={recipe} />
      </div>
    </div>
  );
}
