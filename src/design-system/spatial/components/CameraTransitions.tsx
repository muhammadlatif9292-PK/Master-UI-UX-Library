/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Compass, Navigation, Play, Pause, ChevronRight, Activity } from 'lucide-react';
import { useSpatial } from '../SpatialContext';
import { FlightWaypoint } from '../types';

const WAYPOINTS: FlightWaypoint[] = [
  {
    id: 'wp-origin',
    title: 'Waypoint Alpha: Command Port',
    description: 'Initial entry point overseeing high-level orbital infrastructure and main telemetry bus.',
    posX: 0,
    posY: 0,
    posZ: 0,
    rotX: 10,
    rotY: -15,
    rotZ: 0,
    fov: 60,
    tag: 'ORIGIN_01',
  },
  {
    id: 'wp-node-beta',
    title: 'Waypoint Beta: Quantum Core',
    description: 'Dolly zoom pan focusing directly on the central processing array and qubit state buffers.',
    posX: 120,
    posY: -40,
    posZ: 250,
    rotX: -12,
    rotY: 30,
    rotZ: 5,
    fov: 45,
    tag: 'CORE_02',
  },
  {
    id: 'wp-perimeter',
    title: 'Waypoint Gamma: Shield Perimeter',
    description: 'Wide-angle orbital camera inspection validating crypto RBAC tokens and boundary status.',
    posX: -150,
    posY: 80,
    posZ: -100,
    rotX: 25,
    rotY: -45,
    rotZ: -10,
    fov: 80,
    tag: 'SHIELD_03',
  },
];

export const CameraTransitions: React.FC = () => {
  const { mode, reducedMotion } = useSpatial();
  const [activeWpId, setActiveWpId] = useState<string>('wp-origin');

  const currentWp = WAYPOINTS.find((w) => w.id === activeWpId) || WAYPOINTS[0];

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-sky-400">
            <Navigation className="w-4 h-4" />
            <span className="font-bold text-white uppercase">Camera Waypoints (2D Step Card)</span>
          </div>
          <span className="text-zinc-500">Flat Waypoint Navigation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {WAYPOINTS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setActiveWpId(wp.id)}
              className={`p-4 rounded-2xl border text-left text-xs font-mono transition-all cursor-pointer ${
                activeWpId === wp.id
                  ? 'bg-sky-950 border-sky-400 text-white font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <span className="text-[10px] text-sky-400 block mb-1">{wp.tag}</span>
              <span className="font-bold block text-sm mb-1">{wp.title}</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed">{wp.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  return (
    <div className="relative w-full h-[460px] p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 flex flex-col justify-between select-none overflow-hidden [perspective:1000px]">
      {/* Header */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-sky-400">
          <Camera className="w-4 h-4" />
          <span className="font-bold text-white uppercase">CINEMATIC CAMERA FLIGHT WAYPOINTS</span>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-zinc-800">
          {WAYPOINTS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setActiveWpId(wp.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                activeWpId === wp.id
                  ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {wp.tag}
            </button>
          ))}
        </div>
      </div>

      {/* Camera Flight Stage */}
      <div className="relative w-full h-80 my-auto flex items-center justify-center [transform-style:preserve-3d]">
        <motion.div
          key={currentWp.id}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, rotateY: -30 }}
          animate={
            reducedMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  rotateX: currentWp.rotX,
                  rotateY: currentWp.rotY,
                  translateZ: currentWp.posZ * 0.3,
                }
          }
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-lg p-7 rounded-3xl bg-slate-900/90 border-2 border-sky-400 backdrop-blur-2xl shadow-[0_20px_50px_rgba(14,165,233,0.3)] text-white space-y-4 font-mono [transform-style:preserve-3d]"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-bold border border-sky-500/40">
              {currentWp.tag}
            </span>
            <span className="text-zinc-400 text-xs">FOV: {currentWp.fov}°</span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-sky-400" />
              <span>{currentWp.title}</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">{currentWp.description}</p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-[11px]">
            <div className="p-2 rounded-xl bg-black/50 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-500 block">POS (X,Y,Z)</span>
              <span className="text-sky-300 font-bold">
                {currentWp.posX},{currentWp.posY},{currentWp.posZ}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-black/50 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-500 block">ROT (X,Y)</span>
              <span className="text-sky-300 font-bold">
                {currentWp.rotX}°, {currentWp.rotY}°
              </span>
            </div>
            <div className="p-2 rounded-xl bg-black/50 border border-white/10 text-center">
              <span className="text-[10px] text-zinc-500 block">DOLLY ZOOM</span>
              <span className="text-emerald-400 font-bold">LOCKED</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
        <span>Active Camera Lock: {currentWp.tag}</span>
        <span className="text-sky-400 font-bold">Flight Status: In Target Position</span>
      </div>
    </div>
  );
};
