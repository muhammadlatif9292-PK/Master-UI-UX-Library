/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Maximize2, Minimize2, Check, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useSpatial } from '../SpatialContext';

export interface DepthCardItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  timestamp: string;
  badgeColor: string;
  accent: string;
}

const DEFAULT_STACK_CARDS: DepthCardItem[] = [
  {
    id: 'card-1',
    title: 'Quantum Neural Model Weights',
    tag: 'MODEL_LAYER_0',
    description: 'Transformer attention matrices with 8-bit quantized FP16 weights.',
    timestamp: '10:42 AM',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    accent: '#10b981',
  },
  {
    id: 'card-2',
    title: 'Cognitive Vector Embedding Space',
    tag: 'EMBEDDING_02',
    description: '1536-dimensional semantic clustering graph with real-time cosine distance.',
    timestamp: '10:39 AM',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    accent: '#0ea5e9',
  },
  {
    id: 'card-3',
    title: 'Memory Context Cache Pipeline',
    tag: 'CACHE_LAYER_03',
    description: 'Hot-tier sliding buffer storing conversational state and turn history.',
    timestamp: '10:31 AM',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    accent: '#6366f1',
  },
  {
    id: 'card-4',
    title: 'Security Audit & RBAC Tokens',
    tag: 'SECURITY_04',
    description: 'Cryptographic authorization signatures and session nonce validation.',
    timestamp: '10:15 AM',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    accent: '#f59e0b',
  },
];

export const DepthStacks: React.FC = () => {
  const { mode, reducedMotion } = useSpatial();
  const [isExploded, setIsExploded] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>('card-1');

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-indigo-400">
            <Layers className="w-4 h-4" />
            <span className="font-bold text-white uppercase">Depth Stack (2D Accordion Mode)</span>
          </div>
          <span className="text-zinc-500">4 Items Stacked</span>
        </div>

        <div className="space-y-3">
          {DEFAULT_STACK_CARDS.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelectedCardId(card.id)}
              className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                selectedCardId === card.id
                  ? 'bg-indigo-950/60 border-indigo-500 text-white'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-white">{card.title}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${card.badgeColor}`}>
                  {card.tag}
                </span>
              </div>
              <p className="text-zinc-400 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  return (
    <div className="relative w-full min-h-[440px] p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 flex flex-col justify-between select-none [perspective:1200px]">
      {/* Header Bar */}
      <div className="flex items-center justify-between z-20 pb-4 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-indigo-400">
          <Layers className="w-4 h-4" />
          <span className="font-bold text-white">SPATIAL Z-AXIS DEPTH STACK</span>
        </div>

        <button
          onClick={() => setIsExploded(!isExploded)}
          className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
            isExploded
              ? 'bg-indigo-500 text-white border-indigo-400 shadow-md shadow-indigo-500/20'
              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
          }`}
        >
          {isExploded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          <span>{isExploded ? 'Collapse Stack' : 'Explode Z-Depth'}</span>
        </button>
      </div>

      {/* 3D Stack Stage */}
      <div className="relative w-full max-w-xl mx-auto h-72 my-6 flex items-center justify-center [transform-style:preserve-3d]">
        {DEFAULT_STACK_CARDS.map((card, index) => {
          const isSelected = selectedCardId === card.id;

          // Spatial Offset Calculations
          const depthZ = isExploded ? (index - 1.5) * 80 : index * -28;
          const offsetY = isExploded ? 0 : index * -18;
          const rotX = isExploded ? 12 : 24;
          const rotY = isExploded ? (index - 1.5) * -12 : -8;

          return (
            <motion.div
              key={card.id}
              onClick={() => setSelectedCardId(card.id)}
              animate={
                reducedMotion
                  ? { y: offsetY }
                  : {
                      translateZ: depthZ,
                      translateY: offsetY,
                      rotateX: rotX,
                      rotateY: rotY,
                    }
              }
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute inset-x-0 mx-auto w-full max-w-lg h-44 rounded-2xl p-5 border-2 backdrop-blur-xl shadow-2xl cursor-pointer transition-all flex flex-col justify-between [transform-style:preserve-3d] ${
                isSelected
                  ? 'border-indigo-400 bg-slate-900/95 text-white ring-2 ring-indigo-500/50'
                  : 'border-white/10 bg-zinc-950/85 text-zinc-300 hover:border-white/30'
              }`}
              style={{
                boxShadow: isSelected
                  ? `0 20px 50px rgba(99, 102, 241, 0.35), 0 0 24px ${card.accent}44`
                  : '0 12px 32px rgba(0, 0, 0, 0.8)',
              }}
            >
              {/* Card Top */}
              <div className="flex items-center justify-between font-mono text-xs">
                <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${card.badgeColor}`}>
                  {card.tag}
                </span>
                <span className="text-zinc-500">{card.timestamp}</span>
              </div>

              {/* Card Title & Desc */}
              <div>
                <h4 className="font-bold text-sm text-white mb-1 flex items-center gap-2">
                  <span>{card.title}</span>
                  {isSelected && <ShieldCheck className="w-4 h-4 text-emerald-400" />}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-mono text-zinc-400">
                <span>Z-INDEX: {index + 1}</span>
                <span className={isSelected ? 'text-indigo-400 font-bold' : 'text-zinc-500'}>
                  {isSelected ? 'ACTIVE FOCUS' : 'CLICK TO ELEVATE'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
        <span>Click any card to elevate focus in 3D scene</span>
        <span className="text-indigo-400 font-semibold">
          {isExploded ? 'Mode: Exploded Spatial Array' : 'Mode: Stacked Z-Perspective'}
        </span>
      </div>
    </div>
  );
};
