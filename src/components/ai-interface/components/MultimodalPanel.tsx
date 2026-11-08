/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StyleRecipe } from '../types';
import { Layers, Scan, Eye, Image as ImageIcon, FileCode, CheckCircle2, Crosshair, Sparkles } from 'lucide-react';

interface MultimodalPanelProps {
  recipe: StyleRecipe;
}

export function MultimodalPanel({ recipe }: MultimodalPanelProps) {
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [selectedBox, setSelectedBox] = useState<string | null>(null);

  const detectedObjects = [
    {
      id: 'box-1',
      label: 'Primary CTA Button',
      confidence: 0.98,
      bbox: { top: '35%', left: '20%', width: '28%', height: '14%' },
      color: 'border-emerald-400 text-emerald-400 bg-emerald-500/10',
    },
    {
      id: 'box-2',
      label: 'Metric Telemetry Card',
      confidence: 0.94,
      bbox: { top: '55%', left: '55%', width: '38%', height: '32%' },
      color: 'border-sky-400 text-sky-400 bg-sky-500/10',
    },
    {
      id: 'box-3',
      label: 'Interactive Orb Visualizer',
      confidence: 0.99,
      bbox: { top: '15%', left: '60%', width: '30%', height: '34%' },
      color: 'border-violet-400 text-violet-400 bg-violet-500/10',
    },
  ];

  return (
    <div className={`p-5 rounded-2xl border space-y-4 ${recipe.borderClass} ${recipe.cardClass}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Scan className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">MULTIMODAL VISION & OCR INSPECTOR</h4>
            <p className="text-[11px] text-zinc-400">Object localization & token spatial grounding</p>
          </div>
        </div>

        <button
          onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
          className={`px-2.5 py-1 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
            showBoundingBoxes
              ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
              : 'bg-white/5 border-white/10 text-zinc-400'
          }`}
        >
          <Crosshair className="w-3.5 h-3.5" />
          <span>{showBoundingBoxes ? 'Bounding Boxes ON' : 'Boxes Hidden'}</span>
        </button>
      </div>

      {/* Multimodal Viewport Canvas */}
      <div className="relative w-full h-72 rounded-xl overflow-hidden border border-white/10 bg-black flex items-center justify-center">
        {/* Background Sample UI Image */}
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"
          alt="Visual Inspector Target"
          className="w-full h-full object-cover opacity-60"
        />

        {/* Bounding Box Overlays */}
        {showBoundingBoxes &&
          detectedObjects.map((obj) => (
            <div
              key={obj.id}
              onClick={() => setSelectedBox(obj.id === selectedBox ? null : obj.id)}
              className={`absolute border-2 rounded-lg cursor-pointer transition-all ${obj.color} ${
                selectedBox === obj.id ? 'ring-4 ring-white/50 scale-105 z-20' : 'hover:opacity-100 z-10'
              }`}
              style={{
                top: obj.bbox.top,
                left: obj.bbox.left,
                width: obj.bbox.width,
                height: obj.bbox.height,
              }}
            >
              <div className="absolute -top-5 left-0 px-1.5 py-0.2 rounded bg-black/90 font-mono text-[9px] font-bold text-white border border-white/20 whitespace-nowrap">
                {obj.label} ({(obj.confidence * 100).toFixed(0)}%)
              </div>
            </div>
          ))}
      </div>

      {/* Detected Object List */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {detectedObjects.map((obj) => (
          <div
            key={obj.id}
            onClick={() => setSelectedBox(obj.id === selectedBox ? null : obj.id)}
            className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
              selectedBox === obj.id
                ? 'bg-sky-500/20 border-sky-400 text-white'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10'
            }`}
          >
            <div className="font-semibold truncate">{obj.label}</div>
            <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono mt-1">
              <span>Confidence:</span>
              <span className="text-emerald-400">{(obj.confidence * 100).toFixed(0)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
