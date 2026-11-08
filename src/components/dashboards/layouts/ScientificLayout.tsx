/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { ScatterPlotPrimitive } from '../data-components/ScatterPlotPrimitive';
import { GaugeMeterPrimitive } from '../data-components/GaugeMeterPrimitive';
import { HeatmapPrimitive } from '../data-components/HeatmapPrimitive';
import { Download, Microscope, Binary, FileText } from 'lucide-react';

export function ScientificLayout({ recipe = VISUAL_RECIPES['scientific'] }: { recipe?: VisualRecipeStyle }) {
  const sciRecipe = VISUAL_RECIPES['scientific'];
  const [lambdaWavelength, setLambdaWavelength] = useState(532);

  return (
    <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-700/80 font-mono text-slate-200">
      {/* Scientific Instrument Header */}
      <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20">
            <Microscope className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider">
              QUANTUM SPECTROSCOPY & INTERFEROMETRY LAB [C-9]
            </h2>
            <p className="text-xs text-slate-400">Cryostat Temperature: 4.21 K | Vacuum Pressure: 1.2e-9 Torr</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <span className="text-slate-400">λ Emission:</span>
            <span className="font-bold text-sky-400">{lambdaWavelength} nm</span>
          </div>
          <button
            onClick={() => alert('Exporting Raw HDF5 / CSV spectral matrix...')}
            className="px-3 py-1.5 rounded-lg bg-sky-500/20 border border-sky-500/40 text-sky-300 hover:bg-sky-500/30 flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT HDF5</span>
          </button>
        </div>
      </div>

      {/* Main Spectrometry Plot and Scatter Quad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChartPrimitive
          recipe={sciRecipe}
          title="Spectral Absorption Intensity vs. Wavelength"
          series1Label="Observed Photons"
          series2Label="Lorentzian Fit"
          unit="a.u."
          height={220}
        />
        <ScatterPlotPrimitive
          recipe={sciRecipe}
          title="Bragg Diffraction Pattern Scatter"
          xLabel="Scattering Angle (2θ)"
          yLabel="Intensity Count"
        />
      </div>

      {/* Gauges & Crystallography Heatmap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GaugeMeterPrimitive
          recipe={sciRecipe}
          value={99.8}
          title="Beamline Polarization"
          unit="%"
          size={180}
        />
        <div className="md:col-span-2">
          <HeatmapPrimitive
            recipe={sciRecipe}
            title="CCD Sensor Pixel Coincidence Array"
          />
        </div>
      </div>
    </div>
  );
}
