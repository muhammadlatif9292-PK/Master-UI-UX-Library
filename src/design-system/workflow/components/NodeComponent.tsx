/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NodeData } from '../types';
import { useWorkflow } from '../WorkflowContext';
import { PortComponent } from './PortComponent';
import {
  GripHorizontal,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Copy,
  Trash2,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Play,
  Pause,
  OctagonAlert,
  Disc3,
  Bot,
  Database,
  Sliders,
  Code2,
  Terminal,
  FileText,
  Workflow,
} from 'lucide-react';

interface NodeComponentProps {
  node: NodeData;
}

const CATEGORY_ICONS: Record<string, any> = {
  Input: FileText,
  'AI & LLM': Bot,
  Transform: Sliders,
  Logic: Workflow,
  Output: Terminal,
  Group: Database,
};

export const NodeComponent: React.FC<NodeComponentProps> = ({ node }) => {
  const {
    styleConfig,
    selectedNodeIds,
    selectNode,
    moveNode,
    deleteNode,
    duplicateNode,
    toggleNodeCollapse,
    toggleBreakpoint,
    updateNode,
    accessibleNavActive,
    focusedNodeId,
    setFocusedNodeId,
  } = useWorkflow();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isSelected = selectedNodeIds.includes(node.id);
  const isFocused = focusedNodeId === node.id;
  const isError = node.status === 'error';
  const isRunning = node.status === 'running';

  const CategoryIcon = CATEGORY_ICONS[node.category] || Code2;

  // Dragging node on canvas
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input, select, textarea, [data-workflow-port="true"]')) {
      return;
    }
    e.stopPropagation();
    selectNode(node.id, e.shiftKey);

    if (accessibleNavActive) {
      setFocusedNodeId(node.id);
    }

    const startX = e.clientX;
    const startY = e.clientY;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      moveNode(node.id, deltaX, deltaY);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      id={`node-${node.id}`}
      style={{
        transform: `translate(${node.position.x}px, ${node.position.y}px)`,
        width: node.dimensions?.width || 250,
      }}
      onMouseDown={handleMouseDown}
      className={`absolute top-0 left-0 select-none z-10 transition-shadow duration-150 ${
        styleConfig.nodeCardClass
      } ${
        isError
          ? styleConfig.nodeErrorBorderClass
          : isSelected
          ? styleConfig.nodeSelectedBorderClass
          : 'hover:border-slate-500/80'
      } ${isFocused ? 'ring-2 ring-amber-400' : ''}`}
    >
      {/* Node Header */}
      <div
        className={`flex items-center justify-between px-3 py-2 cursor-grab active:cursor-grabbing rounded-t-xl ${styleConfig.nodeHeaderClass}`}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Drag Handle Grip */}
          <GripHorizontal className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />

          {/* Category Icon */}
          <CategoryIcon className="w-4 h-4 text-cyan-400 flex-shrink-0" />

          {/* Title and Category Tag */}
          <div className="truncate">
            <div className="font-semibold text-xs truncate leading-tight">{node.title}</div>
            <div className="text-[10px] opacity-75 font-mono leading-none flex items-center gap-1 mt-0.5">
              <span>{node.category}</span>
              {node.tokensUsed && (
                <span className="bg-purple-950/80 text-purple-300 px-1 py-0.2 rounded text-[9px] border border-purple-700/50 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                  {node.tokensUsed} tokens
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Breakpoint Badge */}
          {node.hasBreakpoint && (
            <span
              onClick={() => toggleBreakpoint(node.id)}
              className="w-3.5 h-3.5 rounded-full bg-rose-500 text-white font-bold text-[8px] flex items-center justify-center cursor-pointer shadow-md"
              title="Breakpoint Enabled"
            >
              BP
            </span>
          )}

          {/* Execution Status Badge */}
          {isRunning && <Disc3 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />}
          {node.status === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          {isError && <OctagonAlert className="w-3.5 h-3.5 text-rose-400 animate-bounce" />}

          {/* Collapse/Expand Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleNodeCollapse(node.id);
            }}
            className="p-1 hover:bg-slate-700/60 rounded text-slate-300 transition-colors"
          >
            {node.collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Menu Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="p-1 hover:bg-slate-700/60 rounded text-slate-300 transition-colors"
            >
              <MoreVertical className="w-3.5 h-3.5" />
            </button>

            {isMenuOpen && (
              <div
                className="absolute right-0 top-full mt-1 z-50 w-40 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl py-1 text-xs text-slate-200"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {
                    duplicateNode(node.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-slate-800 text-left"
                >
                  <Copy className="w-3.5 h-3.5" /> Duplicate Node
                </button>
                <button
                  onClick={() => {
                    toggleBreakpoint(node.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-slate-800 text-left"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  {node.hasBreakpoint ? 'Remove Breakpoint' : 'Set Breakpoint'}
                </button>
                <div className="my-1 border-t border-slate-800" />
                <button
                  onClick={() => {
                    deleteNode(node.id);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-3 py-1.5 flex items-center gap-2 hover:bg-rose-950 text-rose-400 text-left"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Node
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Callout Banner if Node Failed */}
      {isError && node.errorMessage && (
        <div className="bg-rose-950/90 border-b border-rose-800/80 px-3 py-1.5 text-[10px] text-rose-200 flex items-start gap-1.5">
          <OctagonAlert className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="leading-snug">
            <span className="font-semibold font-mono text-rose-300">{node.errorCode || 'E_RUN_FAIL'}: </span>
            {node.errorMessage}
          </div>
        </div>
      )}

      {/* Node Body & Ports */}
      {!node.collapsed && (
        <div className="p-2 space-y-2">
          {/* Parameters / Input Form Summary */}
          {Object.keys(node.parameters || {}).length > 0 && (
            <div className="bg-slate-950/60 rounded p-1.5 border border-slate-800/80 space-y-1 text-[11px]">
              {Object.entries(node.parameters).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-mono">{key}:</span>
                  <input
                    type="text"
                    value={String(val)}
                    onChange={(e) => {
                      updateNode(node.id, {
                        parameters: { ...node.parameters, [key]: e.target.value },
                      });
                    }}
                    className="bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-slate-100 text-[10px] font-mono w-28 text-right focus:border-cyan-400 outline-none"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Ports Container */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/60">
            {/* Input Ports Column */}
            <div className="space-y-1">
              <div className="text-[9px] font-mono uppercase text-slate-500 font-bold px-1">Inputs</div>
              {node.inputs.map((port) => (
                <PortComponent
                  key={port.id}
                  nodeId={node.id}
                  port={port}
                  nodeX={node.position.x}
                  nodeY={node.position.y}
                />
              ))}
            </div>

            {/* Output Ports Column */}
            <div className="space-y-1 text-right">
              <div className="text-[9px] font-mono uppercase text-slate-500 font-bold px-1">Outputs</div>
              {node.outputs.map((port) => (
                <PortComponent
                  key={port.id}
                  nodeId={node.id}
                  port={port}
                  nodeX={node.position.x}
                  nodeY={node.position.y}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Execution Duration Footer */}
      {node.executionTimeMs && (
        <div className="px-3 py-1 bg-slate-950/80 border-t border-slate-800/80 text-[9px] text-slate-400 font-mono flex items-center justify-between rounded-b-xl">
          <span>Latency:</span>
          <span className="text-cyan-400 font-semibold">{node.executionTimeMs} ms</span>
        </div>
      )}
    </div>
  );
};
