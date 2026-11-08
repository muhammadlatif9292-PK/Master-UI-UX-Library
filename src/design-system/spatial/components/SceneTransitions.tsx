/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Compass, Layers, Sparkles, ChevronRight, Activity, Shield } from 'lucide-react';
import { useSpatial } from '../SpatialContext';

export interface SceneRoom {
  id: string;
  name: string;
  tagline: string;
  cameraPos: { rotX: number; rotY: number; zoom: number };
  color: string;
  widgets: { label: string; val: string }[];
}

const DEFAULT_SCENES: SceneRoom[] = [
  {
    id: 'deck',
    name: 'Command Deck 01',
    tagline: 'Primary Command Center & Tactical Flight Control',
    cameraPos: { rotX: 12, rotY: -15, zoom: 1 },
    color: '#0ea5e9',
    widgets: [
      { label: 'Core Temp', val: '312 K' },
      { label: 'Thrust', val: '88%' },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics Vault',
    tagline: 'Volumetric Data Mining & Clustering Matrix',
    cameraPos: { rotX: -8, rotY: 22, zoom: 1.15 },
    color: '#10b981',
    widgets: [
      { label: 'Vectors', val: '4.2M' },
      { label: 'Precision', val: '99.8%' },
    ],
  },
  {
    id: 'cybercore',
    name: 'Quantum Cyber Core',
    tagline: 'Deep Cryptographic Vault & Qubit Resonator',
    cameraPos: { rotX: 20, rotY: 0, zoom: 1.3 },
    color: '#8b5cf6',
    widgets: [
      { label: 'Qubit State', val: 'Coherent' },
      { label: 'Entropy', val: '0.002' },
    ],
  },
];

export const SceneTransitions: React.FC = () => {
  const { mode, reducedMotion } = useSpatial();
  const [activeSceneId, setActiveSceneId] = useState<string>('deck');

  const currentScene = DEFAULT_SCENES.find((s) => s.id === activeSceneId) || DEFAULT_SCENES[0];

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-sky-400">
            <Camera className="w-4 h-4" />
            <span className="font-bold text-white uppercase">Scene Transitions (2D Flat Mode)</span>
          </div>
          <span className="text-zinc-500">3 Virtual Environments</span>
        </div>

        <div className="flex gap-2">
          {DEFAULT_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => setActiveSceneId(scene.id)}
              className={`flex-1 p-3 rounded-2xl border text-xs font-mono transition-all cursor-pointer ${
                activeSceneId === scene.id
                  ? 'bg-sky-950 border-sky-400 text-white font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {scene.name}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
          <h4 className="font-bold text-white text-sm">{currentScene.name}</h4>
          <p className="text-xs text-zinc-400">{currentScene.tagline}</p>
        </div>
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  return (
    <div className="relative w-full h-[460px] p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 flex flex-col justify-between select-none [perspective:1200px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-sky-400">
          <Camera className="w-4 h-4" />
          <span className="font-bold text-white">SPATIAL CAMERA SCENE TRANSITION</span>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-zinc-800">
          {DEFAULT_SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => setActiveSceneId(scene.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeSceneId === scene.id
                  ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {scene.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Scene Viewport */}
      <div className="relative w-full h-80 my-auto flex items-center justify-center [transform-style:preserve-3d]">
        <motion.div
          key={currentScene.id}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, rotateX: 30 }}
          animate={
            reducedMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scale: currentScene.cameraPos.zoom,
                  rotateX: currentScene.cameraPos.rotX,
                  rotateY: currentScene.cameraPos.rotY,
                }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl p-8 rounded-3xl border-2 backdrop-blur-2xl shadow-2xl flex flex-col justify-between h-64 [transform-style:preserve-3d]"
          style={{
            borderColor: currentScene.color,
            backgroundColor: `${currentScene.color}11`,
            boxShadow: `0 24px 60px rgba(0,0,0,0.8), 0 0 40px ${currentScene.color}33`,
          }}
        >
          <div className="flex items-center justify-between font-mono text-xs">
            <span
              className="px-3 py-1 rounded-full text-white font-bold border text-[11px]"
              style={{ backgroundColor: `${currentScene.color}33`, borderColor: currentScene.color }}
            >
              {currentScene.id.toUpperCase()} SCENE
            </span>
            <span className="text-zinc-400">
              CAM: ({currentScene.cameraPos.rotX}°, {currentScene.cameraPos.rotY}°)
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              {currentScene.name}
            </h3>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
              {currentScene.tagline}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10 font-mono text-xs">
            {currentScene.widgets.map((w, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                <span className="text-[10px] text-zinc-400 block">{w.label}</span>
                <span className="text-white font-bold text-sm" style={{ color: currentScene.color }}>
                  {w.val}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
        <span>3D Perspective Camera Flight Active</span>
        <span className="text-sky-400 font-bold">{currentScene.name} Loaded</span>
      </div>
    </div>
  );
};
