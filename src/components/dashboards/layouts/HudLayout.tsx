/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';
import { GaugeMeterPrimitive } from '../data-components/GaugeMeterPrimitive';
import { MeterPrimitive } from '../data-components/MeterPrimitive';
import { LiveGraphPrimitive } from '../data-components/LiveGraphPrimitive';
import { TelemetryStreamPrimitive } from '../data-components/TelemetryStreamPrimitive';
import { WaveformPrimitive } from '../data-components/WaveformPrimitive';
import { Crosshair, Target, Shield, Radio } from 'lucide-react';

export function HudLayout({ recipe = VISUAL_RECIPES['neon'] }: { recipe?: VisualRecipeStyle }) {
  const hudRecipe = VISUAL_RECIPES['neon'];
  const [reticleLocked, setReticleLocked] = useState(true);

  return (
    <div className="relative p-6 rounded-2xl bg-[#040608] border-2 border-lime-400/40 font-mono shadow-[0_0_30px_rgba(163,230,53,0.15)] overflow-hidden">
      {/* HUD Corner Brackets */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-lime-400" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-lime-400" />
      <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-lime-400" />
      <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-lime-400" />

      {/* Crosshair Overlay In Center */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-80 h-80 rounded-full border border-lime-400 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-dashed border-lime-400" />
        </div>
      </div>

      {/* HUD Top Bar */}
      <div className="flex items-center justify-between border-b border-lime-400/30 pb-3 mb-6">
        <div className="flex items-center gap-3">
          <Crosshair className="w-5 h-5 text-lime-400 animate-spin" style={{ animationDuration: '10s' }} />
          <div>
            <div className="text-xs text-lime-400 font-bold tracking-widest uppercase">
              TACTICAL COMBAT AVIONICS HUD [V-90]
            </div>
            <div className="text-[10px] text-lime-200/70">
              TARGET LOCK: AZIMUTH 042° // ELEVATION +12° // VELOCITY MACH 3.2
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => setReticleLocked(!reticleLocked)}
            className={`px-2.5 py-1 rounded-xs border text-[11px] font-bold ${
              reticleLocked
                ? 'bg-lime-400/20 text-lime-300 border-lime-400'
                : 'bg-rose-500/20 text-rose-300 border-rose-500'
            }`}
          >
            {reticleLocked ? 'RETICLE: ENGAGED' : 'RETICLE: MANUAL'}
          </button>
          <span className="text-lime-400 text-xs font-bold">RADAR ACTIVE</span>
        </div>
      </div>

      {/* Main HUD Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <GaugeMeterPrimitive
            recipe={hudRecipe}
            value={89.4}
            title="Thrust Vectoring"
            unit="kN"
            size={180}
          />
          <MeterPrimitive recipe={hudRecipe} title="Plasma Ion Injector" />
        </div>

        <div className="space-y-6">
          <LiveGraphPrimitive recipe={hudRecipe} title="Active Jamming Signal" height={190} />
          <WaveformPrimitive recipe={hudRecipe} title="Target Sonar Return" />
        </div>

        <div className="space-y-6">
          <TelemetryStreamPrimitive recipe={hudRecipe} title="Telemetry Avionics Bus" />
        </div>
      </div>
    </div>
  );
}
