/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VisualRecipeStyle } from '../types';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { AreaChartPrimitive } from '../data-components/AreaChartPrimitive';
import { GaugeMeterPrimitive } from '../data-components/GaugeMeterPrimitive';
import { RadialChartPrimitive } from '../data-components/RadialChartPrimitive';
import { SparklinePrimitive } from '../data-components/SparklinePrimitive';
import { LiveGraphPrimitive } from '../data-components/LiveGraphPrimitive';
import { TelemetryStreamPrimitive } from '../data-components/TelemetryStreamPrimitive';

export function BentoLayout({ recipe }: { recipe: VisualRecipeStyle }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Hero Span Card (Col Span 2, Row Span 2) */}
      <div className="md:col-span-2 lg:col-span-2">
        <LineChartPrimitive
          recipe={recipe}
          title="Master Cluster Resonance"
          height={240}
        />
      </div>

      {/* Hero Live Graph (Col Span 2) */}
      <div className="md:col-span-1 lg:col-span-2">
        <LiveGraphPrimitive
          recipe={recipe}
          title="Real-Time Signal Scope"
          height={240}
        />
      </div>

      {/* Square Gauge Accent */}
      <div className="col-span-1">
        <GaugeMeterPrimitive
          recipe={recipe}
          value={82.6}
          title="Core Pressure"
          size={180}
        />
      </div>

      {/* Square Radial Accent */}
      <div className="col-span-1">
        <RadialChartPrimitive
          recipe={recipe}
          title="Mesh Health"
          size={180}
        />
      </div>

      {/* Sparkline Accent Block */}
      <div className="col-span-1 md:col-span-1 lg:col-span-2">
        <SparklinePrimitive
          label="Edge Cache Hit Rate"
          value="99.4%"
          delta="+0.8%"
          isPositive={true}
          recipe={recipe}
        />
      </div>

      {/* Wide Span Area Chart */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2">
        <AreaChartPrimitive
          recipe={recipe}
          title="Spectral Density Distribution"
          height={180}
        />
      </div>

      {/* Telemetry Stream Log Span */}
      <div className="col-span-1 md:col-span-3 lg:col-span-2">
        <TelemetryStreamPrimitive
          recipe={recipe}
          title="Bus Feed"
        />
      </div>
    </div>
  );
}
