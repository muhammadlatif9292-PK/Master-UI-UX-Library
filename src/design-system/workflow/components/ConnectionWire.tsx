/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ConnectionData, WireRouteType } from '../types';
import { PORT_TYPE_COLORS } from '../styles';
import { useWorkflow } from '../WorkflowContext';

interface ConnectionWireProps {
  connection: ConnectionData;
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
}

export const ConnectionWire: React.FC<ConnectionWireProps> = ({ connection, fromPos, toPos }) => {
  const {
    styleConfig,
    routeType,
    selectedConnectionIds,
    selectConnection,
    deleteConnection,
    isExecuting,
  } = useWorkflow();

  const isSelected = selectedConnectionIds.includes(connection.id);
  const isError = connection.status === 'error';
  const isActive = connection.status === 'active' || isExecuting;

  const color = PORT_TYPE_COLORS[connection.dataType]?.hex || styleConfig.wireColor;

  // Calculate path based on route type
  const dx = toPos.x - fromPos.x;
  const dy = toPos.y - fromPos.y;

  let pathString = '';

  if (routeType === 'bezier') {
    const controlX = Math.max(Math.abs(dx) * 0.5, 40);
    pathString = `M ${fromPos.x} ${fromPos.y} C ${fromPos.x + controlX} ${fromPos.y}, ${toPos.x - controlX} ${toPos.y}, ${toPos.x} ${toPos.y}`;
  } else if (routeType === 'orthogonal') {
    const midX = fromPos.x + dx / 2;
    pathString = `M ${fromPos.x} ${fromPos.y} L ${midX} ${fromPos.y} L ${midX} ${toPos.y} L ${toPos.x} ${toPos.y}`;
  } else if (routeType === 'straight') {
    pathString = `M ${fromPos.x} ${fromPos.y} L ${toPos.x} ${toPos.y}`;
  } else {
    // step
    pathString = `M ${fromPos.x} ${fromPos.y} L ${fromPos.x + 30} ${fromPos.y} L ${fromPos.x + 30} ${toPos.y} L ${toPos.x} ${toPos.y}`;
  }

  const strokeColor = isError
    ? styleConfig.wireErrorColor
    : isSelected
    ? styleConfig.wireSelectedColor
    : isActive
    ? styleConfig.wireActiveColor
    : color;

  return (
    <g className="group/wire cursor-pointer" onClick={(e) => { e.stopPropagation(); selectConnection(connection.id, e.shiftKey); }}>
      {/* Outer Click Detection / Hover Target Stroke */}
      <path
        d={pathString}
        fill="none"
        stroke="transparent"
        strokeWidth={16}
        className="hover:stroke-white/20 transition-colors"
      />

      {/* Outer Glow Line for Selected / Error / Active */}
      {(isSelected || isError || isActive) && (
        <path
          d={pathString}
          fill="none"
          stroke={strokeColor}
          strokeWidth={6}
          strokeOpacity={0.4}
          className="blur-sm transition-all"
        />
      )}

      {/* Main Connection Cable Path */}
      <path
        d={pathString}
        fill="none"
        stroke={strokeColor}
        strokeWidth={isSelected ? 3 : 2}
        strokeDasharray={isError ? '6 4' : 'none'}
        className="transition-all duration-200"
      />

      {/* Animated Data Flow Particles when Active */}
      {isActive && !isError && (
        <>
          <path
            d={pathString}
            fill="none"
            stroke="#ffffff"
            strokeWidth={2.5}
            strokeDasharray="8 12"
            className="animate-[dash_1s_linear_infinite]"
          />
          <circle r={4} fill={strokeColor} className="shadow-lg">
            <animateMotion path={pathString} dur="2s" repeatCount="indefinite" />
          </circle>
        </>
      )}

      {/* Source & Target Pin Endpoint Caps */}
      <circle cx={fromPos.x} cy={fromPos.y} r={3} fill={strokeColor} />
      <circle cx={toPos.x} cy={toPos.y} r={3} fill={strokeColor} />

      {/* Inline Delete Button on Connection Hover */}
      <g
        transform={`translate(${(fromPos.x + toPos.x) / 2}, ${(fromPos.y + toPos.y) / 2})`}
        className="opacity-0 group-hover/wire:opacity-100 transition-opacity"
        onClick={(e) => { e.stopPropagation(); deleteConnection(connection.id); }}
      >
        <circle r={10} fill="#0f172a" stroke={strokeColor} strokeWidth={1.5} className="hover:fill-rose-950" />
        <text textAnchor="middle" dy="3.5" fill="#ef4444" fontSize="10" fontWeight="bold">×</text>
      </g>
    </g>
  );
};
