/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { PortDefinition } from '../types';
import { PORT_TYPE_COLORS } from '../styles';
import { useWorkflow } from '../WorkflowContext';

interface PortComponentProps {
  nodeId: string;
  port: PortDefinition;
  nodeX: number;
  nodeY: number;
}

export const PortComponent: React.FC<PortComponentProps> = ({ nodeId, port, nodeX, nodeY }) => {
  const {
    styleConfig,
    startDraftConnection,
    updateDraftConnection,
    endDraftConnection,
    draftConnection,
    magneticSnapping,
    accessibleNavActive,
    focusedPortId,
    setFocusedPortId,
    addConnection,
  } = useWorkflow();

  const portRef = useRef<HTMLDivElement>(null);
  const color = PORT_TYPE_COLORS[port.type] || PORT_TYPE_COLORS.string;
  const isInput = port.direction === 'input';

  const isSnapped =
    draftConnection?.snappedPort?.nodeId === nodeId && draftConnection?.snappedPort?.portId === port.id;

  const isFocused = focusedPortId === port.id;

  // Track cursor and trigger magnetic snapping check
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isInput) return; // Drag starts from output ports
    e.stopPropagation();

    if (!portRef.current) return;
    const rect = portRef.current.getBoundingClientRect();
    const startPos = {
      x: nodeX + (isInput ? 0 : 240),
      y: nodeY + 40,
    };

    startDraftConnection(nodeId, port.id, startPos);

    const onMouseMove = (moveEvent: MouseEvent) => {
      const canvasEl = document.getElementById('workflow-canvas-container');
      if (!canvasEl) return;
      const canvasRect = canvasEl.getBoundingClientRect();

      const currentX = moveEvent.clientX - canvasRect.left;
      const currentY = moveEvent.clientY - canvasRect.top;

      // Magnetic snap detection against candidate ports
      let candidate: { nodeId: string; portId: string; pos: { x: number; y: number } } | undefined = undefined;

      if (magneticSnapping) {
        const ports = document.querySelectorAll('[data-workflow-port="true"]');
        let minDistance = 40; // Magnetic snap radius

        ports.forEach(pEl => {
          const pNodeId = pEl.getAttribute('data-node-id');
          const pPortId = pEl.getAttribute('data-port-id');
          const pDirection = pEl.getAttribute('data-port-direction');

          if (pNodeId !== nodeId && pDirection === 'input') {
            const pRect = pEl.getBoundingClientRect();
            const px = pRect.left + pRect.width / 2 - canvasRect.left;
            const py = pRect.top + pRect.height / 2 - canvasRect.top;

            const dist = Math.hypot(currentX - px, currentY - py);
            if (dist < minDistance) {
              minDistance = dist;
              candidate = {
                nodeId: pNodeId!,
                portId: pPortId!,
                pos: { x: px, y: py },
              };
            }
          }
        });
      }

      updateDraftConnection({ x: currentX, y: currentY }, candidate);
    };

    const onMouseUp = () => {
      endDraftConnection();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={portRef}
      id={`port-${nodeId}-${port.id}`}
      data-workflow-port="true"
      data-node-id={nodeId}
      data-port-id={port.id}
      data-port-direction={port.direction}
      className={`group/port relative flex items-center gap-2 py-1 px-1 text-xs select-none ${
        isInput ? 'flex-row' : 'flex-row-reverse text-right'
      }`}
    >
      {/* Port Connector Dot */}
      <div
        onMouseDown={handleMouseDown}
        onClick={() => {
          if (accessibleNavActive) {
            setFocusedPortId(port.id);
          }
        }}
        className={`relative cursor-pointer z-10 w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all ${
          color.bg
        } ${styleConfig.portClass} ${
          isSnapped ? 'scale-150 ring-4 ring-cyan-400 animate-pulse' : ''
        } ${isFocused ? 'ring-2 ring-amber-400' : ''}`}
        title={`${port.name} (${port.type})`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />

        {/* Magnetic Snap Halo Indicator */}
        {isSnapped && (
          <span className="absolute -inset-2 rounded-full border-2 border-cyan-400 animate-ping opacity-75 pointer-events-none" />
        )}
      </div>

      {/* Label and Type Badge */}
      <div className="flex items-center gap-1.5 overflow-hidden">
        <span className={`font-medium truncate ${isInput ? 'text-slate-200' : 'text-slate-300'}`}>
          {port.name}
          {port.required && <span className="text-rose-400 ml-0.5">*</span>}
        </span>
        <span
          className={`text-[9px] font-mono px-1 py-0.2 rounded uppercase border ${color.text} ${color.border} bg-slate-950/60`}
        >
          {port.type}
        </span>
      </div>

      {/* Hover Tooltip Preview */}
      <div
        className={`absolute bottom-full mb-1 z-30 hidden group-hover/port:block px-2 py-1 bg-slate-950 text-slate-200 text-[10px] rounded shadow-xl border border-slate-700 whitespace-nowrap pointer-events-none ${
          isInput ? 'left-0' : 'right-0'
        }`}
      >
        <div className="font-semibold text-slate-100">{port.name}</div>
        <div className="text-slate-400">Type: <span className={color.text}>{port.type}</span></div>
        {port.description && <div className="text-slate-400 text-[9px] mt-0.5">{port.description}</div>}
      </div>
    </div>
  );
};
