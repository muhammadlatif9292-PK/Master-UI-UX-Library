/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { useWorkflow } from '../WorkflowContext';
import { NodeComponent } from './NodeComponent';
import { ConnectionWire } from './ConnectionWire';
import { GroupingFrame } from './GroupingFrame';
import { NodeToolbar } from './NodeToolbar';
import { InspectorPanel } from './InspectorPanel';
import { Minimap } from './Minimap';
import { CommandPalette } from './CommandPalette';
import { TimelineControls } from './TimelineControls';
import { AccessibleControls } from './AccessibleControls';
import { PORT_TYPE_COLORS } from '../styles';

export const WorkflowCanvas: React.FC = () => {
  const {
    styleConfig,
    pan,
    setPan,
    zoom,
    setZoom,
    nodes,
    connections,
    groups,
    draftConnection,
    selectionMarquee,
    setSelectionMarquee,
    clearSelection,
    showGrid,
  } = useWorkflow();

  const containerRef = useRef<HTMLDivElement>(null);
  const isPanningRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });

  // Canvas Pan Engine (Mouse Drag or Space+Drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    // Canvas background click -> clear selection or start marquee drag
    if (e.target === containerRef.current || (e.target as HTMLElement).id === 'workflow-grid-bg') {
      if (e.shiftKey) {
        // Start marquee selection box
        const rect = containerRef.current!.getBoundingClientRect();
        const startX = (e.clientX - rect.left - pan.x) / zoom;
        const startY = (e.clientY - rect.top - pan.y) / zoom;
        setSelectionMarquee({ startX, startY, endX: startX, endY: startY });
      } else {
        clearSelection();
        isPanningRef.current = true;
        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanningRef.current) {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    }

    if (selectionMarquee) {
      const rect = containerRef.current!.getBoundingClientRect();
      const currentX = (e.clientX - rect.left - pan.x) / zoom;
      const currentY = (e.clientY - rect.top - pan.y) / zoom;
      setSelectionMarquee(prev => prev ? { ...prev, endX: currentX, endY: currentY } : null);
    }
  };

  const handleMouseUp = () => {
    isPanningRef.current = false;
    setSelectionMarquee(null);
  };

  // Wheel Zoom Engine
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom(prev => Math.min(2.0, Math.max(0.4, prev * zoomFactor)));
  };

  // Calculate Port Coordinates helper for connection wires
  const getPortCoordinates = (nodeId: string, portId: string, isOutput: boolean) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };

    const width = node.dimensions?.width || 250;
    // Compute port Y offset dynamically
    const portsList = isOutput ? node.outputs : node.inputs;
    const index = portsList.findIndex(p => p.id === portId);
    const portOffset = 50 + (index >= 0 ? index : 0) * 28;

    return {
      x: node.position.x + (isOutput ? width : 0),
      y: node.position.y + portOffset,
    };
  };

  return (
    <div
      ref={containerRef}
      id="workflow-canvas-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      className={`relative w-full h-[85vh] overflow-hidden select-none cursor-grab active:cursor-grabbing ${styleConfig.bgCanvasClass} ${styleConfig.fontFamilyClass}`}
    >
      {/* Background Grid Pattern */}
      {showGrid && (
        <div
          id="workflow-grid-bg"
          className={`absolute inset-0 pointer-events-auto ${styleConfig.gridPatternClass}`}
        />
      )}

      {/* Main Pan / Zoom Transform Canvas Layer */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Layer 0: Grouping Frames */}
        {groups.map(group => (
          <GroupingFrame key={group.id} group={group} />
        ))}

        {/* Layer 1: Connection Wires SVG Layer */}
        <svg className="absolute inset-0 w-[5000px] h-[5000px] pointer-events-none z-10 overflow-visible">
          {connections.map(conn => {
            const fromPos = getPortCoordinates(conn.fromNodeId, conn.fromPortId, true);
            const toPos = getPortCoordinates(conn.toNodeId, conn.toPortId, false);
            return (
              <ConnectionWire
                key={conn.id}
                connection={conn}
                fromPos={fromPos}
                toPos={toPos}
              />
            );
          })}

          {/* Live Preview Wire while dragging port */}
          {draftConnection && (
            <path
              d={`M ${draftConnection.fromPos.x} ${draftConnection.fromPos.y} C ${draftConnection.fromPos.x + 80} ${
                draftConnection.fromPos.y
              }, ${
                (draftConnection.snappedPort ? draftConnection.snappedPort.pos.x : draftConnection.currentPos.x) - 80
              } ${
                draftConnection.snappedPort ? draftConnection.snappedPort.pos.y : draftConnection.currentPos.y
              }, ${
                draftConnection.snappedPort ? draftConnection.snappedPort.pos.x : draftConnection.currentPos.x
              } ${
                draftConnection.snappedPort ? draftConnection.snappedPort.pos.y : draftConnection.currentPos.y
              }`}
              fill="none"
              stroke={draftConnection.snappedPort ? '#22d3ee' : '#38bdf8'}
              strokeWidth={3}
              strokeDasharray="6 4"
              className="animate-pulse"
            />
          )}
        </svg>

        {/* Layer 2: Interactive Nodes Layer */}
        <div className="relative pointer-events-auto z-20">
          {nodes.map(node => (
            <NodeComponent key={node.id} node={node} />
          ))}
        </div>

        {/* Layer 3: Selection Marquee Box */}
        {selectionMarquee && (
          <div
            style={{
              left: Math.min(selectionMarquee.startX, selectionMarquee.endX),
              top: Math.min(selectionMarquee.startY, selectionMarquee.endY),
              width: Math.abs(selectionMarquee.endX - selectionMarquee.startX),
              height: Math.abs(selectionMarquee.endY - selectionMarquee.startY),
            }}
            className="absolute border-2 border-cyan-400 bg-cyan-400/10 rounded-md pointer-events-none z-40"
          />
        )}
      </div>

      {/* Floating Canvas UI Overlays */}
      <NodeToolbar />
      <InspectorPanel />
      <Minimap />
      <CommandPalette />
      <TimelineControls />
      <AccessibleControls />
    </div>
  );
};
