/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Shield,
  Eye,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Key,
  CornerDownRight,
  RefreshCw,
  ListTree,
  Zap,
} from 'lucide-react';
import { useOverlay } from '../../design-system/overlay/OverlayContext';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';

export function OverlayStackInspector() {
  const {
    stack,
    activeOverlayCount,
    topOverlay,
    closeOverlay,
    closeTopOverlay,
    closeAllOverlays,
    openOverlay,
    screenReaderAnnouncement,
  } = useOverlay();

  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  // Multi-layer stress test sequence
  const handleLaunchStressTest = () => {
    closeAllOverlays();
    playSound('OPEN');
    triggerHaptic('medium');

    // Launch layers sequentially
    setTimeout(() => {
      openOverlay({
        id: 'stress-inspector-base',
        type: 'inspector',
        title: 'Layer 1: Telemetry Inspector',
        preventScroll: false,
      });
    }, 100);

    setTimeout(() => {
      openOverlay({
        id: 'stress-modal-mid',
        type: 'modal',
        title: 'Layer 2: Confirmation Modal',
        preventScroll: true,
      });
    }, 300);

    setTimeout(() => {
      openOverlay({
        id: 'stress-drawer-sub',
        type: 'drawer',
        title: 'Layer 3: Nested Resource Drawer',
        preventScroll: true,
      });
    }, 500);

    setTimeout(() => {
      openOverlay({
        id: 'stress-popover-top',
        type: 'popover',
        title: 'Layer 4: Filter Popover (Top Layer)',
        preventScroll: false,
      });
    }, 700);
  };

  return (
    <div className="w-full rounded-3xl bg-zinc-950 border border-zinc-800 p-6 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Shared Overlay Stacking Infrastructure
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                {activeOverlayCount} Active {activeOverlayCount === 1 ? 'Layer' : 'Layers'}
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              Deterministic LIFO stacking context, auto focus restoration, Esc key pipeline, and ARIA tree compliance.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLaunchStressTest}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-black hover:bg-cyan-400 flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Launch 4-Layer Stress Test</span>
          </button>

          {activeOverlayCount > 0 && (
            <>
              <button
                type="button"
                onClick={() => {
                  closeTopOverlay();
                  playSound('CLOSE');
                  triggerHaptic('light');
                }}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-1.5"
              >
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulate ESC Key</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  closeAllOverlays();
                  playSound('CLOSE');
                  triggerHaptic('warning');
                }}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Close All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Visual Stacking Hierarchy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Stacking List */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <ListTree className="w-3.5 h-3.5 text-cyan-400" />
              Z-Index Stacking Hierarchy (Top to Base)
            </span>
            <span className="font-mono text-[11px] text-zinc-500">LIFO Escape Route</span>
          </div>

          {stack.length === 0 ? (
            <div className="p-8 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/30 text-center space-y-2">
              <Layers className="w-8 h-8 text-zinc-600 mx-auto" />
              <p className="text-xs text-zinc-400 font-medium">No active overlay layers currently open.</p>
              <p className="text-[11px] text-zinc-500 max-w-sm mx-auto">
                Trigger any component or click the &ldquo;Launch 4-Layer Stress Test&rdquo; button above to inspect dynamic z-index layering and escape handling.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {[...stack].reverse().map((item, reverseIdx) => {
                  const isTop = item.id === topOverlay?.id;
                  const originalIdx = stack.length - 1 - reverseIdx;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                        isTop
                          ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30'
                          : 'bg-zinc-900/80 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-bold ${
                            isTop ? 'bg-cyan-500 text-black shadow-md' : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          Z-{item.zIndex}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{item.title}</span>
                            {isTop && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-400 text-black">
                                Esc Target
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-[10px] text-zinc-400 font-mono mt-0.5">
                            <span>Type: {item.type}</span>
                            <span>•</span>
                            <span>Model: {item.interactionModel}</span>
                            <span>•</span>
                            <span>Role: {item.ariaRole}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => closeOverlay(item.id)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Close this specific layer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Right: Accessibility & Security Matrix */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-400" />
              Overlay Governance Rules
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Strict Focus Trapping:</strong> Keyboard navigation cycles continuously within active layer boundary.
                </span>
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Deterministic Escape:</strong> Pressing Escape pops exclusively the top-most z-index overlay.
                </span>
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Focus Restoration:</strong> Closes and seamlessly restores focus to previous trigger node.
                </span>
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Body Scroll Lock:</strong> Dynamically locks root document viewport during heavy modal layers.
                </span>
              </div>
            </div>
          </div>

          {/* Screen Reader Live Region Status */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-cyan-400" />
                Screen Reader Live Region
              </span>
              <span className="text-[10px] font-mono text-emerald-400">aria-live=&quot;polite&quot;</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/60 border border-zinc-800 font-mono text-[11px] text-cyan-300 min-h-8 flex items-center">
              {screenReaderAnnouncement || 'Waiting for layer events...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
