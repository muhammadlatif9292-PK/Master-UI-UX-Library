/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NodeGroupData } from '../types';
import { useWorkflow } from '../WorkflowContext';
import { Folder, ChevronDown, ChevronRight, Layers } from 'lucide-react';

interface GroupingFrameProps {
  group: NodeGroupData;
}

export const GroupingFrame: React.FC<GroupingFrameProps> = ({ group }) => {
  const { moveNode, nodes, updateNode } = useWorkflow();

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input')) return;
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      // Move all child nodes assigned to this group
      group.nodeIds.forEach(nodeId => {
        moveNode(nodeId, deltaX, deltaY);
      });
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
      style={{
        transform: `translate(${group.bounds.x}px, ${group.bounds.y}px)`,
        width: group.bounds.width,
        height: group.collapsed ? 48 : group.bounds.height,
        borderColor: group.color,
      }}
      className="absolute top-0 left-0 border-2 border-dashed rounded-2xl bg-slate-950/40 backdrop-blur-xs select-none z-0 transition-all duration-200 pointer-events-auto"
    >
      {/* Group Header Tag */}
      <div
        onMouseDown={handleMouseDown}
        style={{ backgroundColor: `${group.color}25`, borderColor: group.color }}
        className="flex items-center justify-between px-3 py-2 border-b rounded-t-xl cursor-grab active:cursor-grabbing text-xs text-slate-100 font-semibold"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4" style={{ color: group.color }} />
          <span>{group.title}</span>
          <span className="text-[10px] font-mono text-slate-400 font-normal">
            ({group.nodeIds.length} nodes)
          </span>
        </div>

        <button
          onClick={() => {
            // toggle group collapse
          }}
          className="p-0.5 hover:bg-slate-800/60 rounded text-slate-300"
        >
          {group.collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
