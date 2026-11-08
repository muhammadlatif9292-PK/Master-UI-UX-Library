/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useWorkflow } from '../WorkflowContext';
import { Map, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export const Minimap: React.FC = () => {
  const { nodes, pan, zoom, setPan, showMinimap, setShowMinimap, styleConfig } = useWorkflow();

  if (!showMinimap) return null;

  // Mini canvas scale factor
  const mapWidth = 180;
  const mapHeight = 120;
  const scale = 0.08;

  const handleMinimapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Convert map coordinates back to canvas pan offset
    const canvasX = (clickX / mapWidth) * 1600;
    const canvasY = (clickY / mapHeight) * 1200;

    setPan({ x: -canvasX * zoom + 300, y: -canvasY * zoom + 200 });
  };

  return (
    <div className={`absolute bottom-16 right-4 z-30 w-48 bg-slate-900/95 border border-slate-700/80 rounded-xl shadow-2xl p-2 text-slate-200 select-none backdrop-blur-md`}>
      {/* Minimap Header */}
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-800 text-[10px] font-semibold text-slate-400">
        <div className="flex items-center gap-1.5">
          <Map className="w-3 h-3 text-cyan-400" />
          <span>CANVAS MINIMAP</span>
        </div>
        <button
          onClick={() => setShowMinimap(false)}
          className="text-slate-500 hover:text-slate-300 text-xs"
        >
          ×
        </button>
      </div>

      {/* Mini Map Canvas Box */}
      <div
        onClick={handleMinimapClick}
        className="relative w-full h-24 bg-slate-950 rounded border border-slate-800 overflow-hidden cursor-crosshair"
      >
        {/* Render Mini Node Rectangles */}
        {nodes.map((node) => (
          <div
            key={node.id}
            style={{
              left: Math.max(0, node.position.x * scale),
              top: Math.max(0, node.position.y * scale),
              width: Math.max(8, (node.dimensions?.width || 240) * scale),
              height: Math.max(6, (node.dimensions?.height || 160) * scale),
            }}
            className={`absolute rounded-xs ${
              node.status === 'error'
                ? 'bg-rose-500'
                : node.status === 'running'
                ? 'bg-cyan-400 animate-pulse'
                : 'bg-slate-600'
            }`}
          />
        ))}

        {/* Viewport Frustum Box */}
        <div
          style={{
            left: Math.max(0, -pan.x * scale * (1 / zoom)),
            top: Math.max(0, -pan.y * scale * (1 / zoom)),
            width: Math.min(mapWidth, 120 * (1 / zoom)),
            height: Math.min(mapHeight, 80 * (1 / zoom)),
          }}
          className="absolute border-2 border-cyan-400 bg-cyan-400/10 pointer-events-none rounded-xs"
        />
      </div>

      <div className="pt-1.5 text-[9px] font-mono text-slate-500 flex justify-between">
        <span>Nodes: {nodes.length}</span>
        <span>Zoom: {Math.round(zoom * 100)}%</span>
      </div>
    </div>
  );
};
