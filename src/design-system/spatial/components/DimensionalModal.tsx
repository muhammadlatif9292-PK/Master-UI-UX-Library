/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, X, Shield, CheckCircle2, Sparkles, ArrowUpRight } from 'lucide-react';
import { useSpatial } from '../SpatialContext';

export const DimensionalModal: React.FC = () => {
  const { mode, reducedMotion } = useSpatial();
  const [isOpen, setIsOpen] = useState(false);

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-indigo-400">
            <Layers className="w-4 h-4" />
            <span className="font-bold text-white uppercase">Dimensional Modal (2D Standard Overlay)</span>
          </div>
          <span className="text-zinc-500">2D Flat Mode</span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono transition-all cursor-pointer"
        >
          Open Standard Modal
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 rounded-3xl bg-zinc-900 border border-zinc-800 text-white space-y-4 font-mono">
              <div className="flex items-center justify-between">
                <span className="font-bold text-base">Standard Modal View</span>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:text-zinc-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-zinc-300">
                In 2D Flat Mode, the background remains stationary while the overlay renders on top.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
              >
                Dismiss Modal
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  return (
    <div className="relative w-full h-[460px] rounded-3xl bg-zinc-950/95 border border-zinc-800 flex items-center justify-center p-6 select-none overflow-hidden [perspective:1200px]">
      {/* Background App Stage (Pushed Back when Modal Opens) */}
      <motion.div
        animate={
          isOpen && !reducedMotion
            ? { scale: 0.88, translateZ: -160, rotateX: 10, filter: 'blur(4px) brightness(0.4)' }
            : { scale: 1, translateZ: 0, rotateX: 0, filter: 'blur(0px) brightness(1)' }
        }
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl p-8 rounded-3xl bg-slate-900/80 border border-zinc-800 text-white font-mono space-y-4 [transform-style:preserve-3d]"
      >
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <span>PRIMARY APP STAGE</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px]">Z-PLANE: 0px</span>
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          When the dimensional modal is triggered, this entire background stage recedes -160px into 3D spatial z-depth with vignette blur, providing true perspective depth.
        </p>

        <button
          onClick={() => setIsOpen(true)}
          className="px-5 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-500/20 cursor-pointer flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Trigger 3D Spatial Modal</span>
        </button>
      </motion.div>

      {/* Floating 3D Foreground Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm [perspective:1000px]">
            <motion.div
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, translateZ: 200 }}
              animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, translateZ: 100 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, translateZ: -100 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md p-7 rounded-3xl bg-slate-900/95 border-2 border-indigo-400 shadow-[0_30px_70px_rgba(99,102,241,0.4)] text-white font-mono space-y-5 [transform-style:preserve-3d]"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <Shield className="w-4 h-4" />
                  <span>3D SPATIAL DIMENSIONAL MODAL</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Elevated Z-Axis Focal Plane</span>
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Notice how the modal floats at +100px Z-depth while the main background recedes back into spatial perspective.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-black/50 border border-indigo-500/30 text-xs text-indigo-300">
                <span>Z-Depth: +100px Elevation</span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Close Modal & Restore Stage
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
