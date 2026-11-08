/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type WorkflowStyle =
  | 'laboratory'
  | 'command'
  | 'glass'
  | 'cybernetic'
  | 'minimal'
  | 'industrial'
  | 'neon'
  | 'paper'
  | 'tactile'
  | 'spatial'
  | 'ai-workflow';

export type PortDataType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'json'
  | 'array'
  | 'image'
  | 'audio'
  | 'tensor'
  | 'trigger'
  | 'model';

export type WireRouteType = 'bezier' | 'orthogonal' | 'straight' | 'step';

export type NodeExecutionStatus = 'idle' | 'queued' | 'running' | 'success' | 'error' | 'paused';

export interface PortDefinition {
  id: string;
  name: string;
  type: PortDataType;
  direction: 'input' | 'output';
  value?: any;
  required?: boolean;
  connected?: boolean;
  description?: string;
}

export interface NodePosition {
  x: number;
  y: number;
}

export interface NodeDimensions {
  width: number;
  height: number;
}

export interface NodeData {
  id: string;
  type: string;
  title: string;
  category: 'Input' | 'AI & LLM' | 'Transform' | 'Logic' | 'Output' | 'Group';
  iconName?: string;
  position: NodePosition;
  dimensions?: NodeDimensions;
  inputs: PortDefinition[];
  outputs: PortDefinition[];
  parameters: Record<string, any>;
  status: NodeExecutionStatus;
  executionTimeMs?: number;
  errorMessage?: string;
  errorCode?: string;
  collapsed?: boolean;
  groupId?: string;
  hasBreakpoint?: boolean;
  tokensUsed?: number;
}

export interface ConnectionData {
  id: string;
  fromNodeId: string;
  fromPortId: string;
  toNodeId: string;
  toPortId: string;
  dataType: PortDataType;
  status?: 'idle' | 'active' | 'error' | 'selected';
}

export interface NodeGroupData {
  id: string;
  title: string;
  color: string;
  bounds: { x: number; y: number; width: number; height: number };
  collapsed?: boolean;
  nodeIds: string[];
}

export interface ExecutionLog {
  id: string;
  timestamp: string;
  nodeId: string;
  nodeTitle: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
}

export interface WorkflowPreset {
  id: string;
  name: string;
  description: string;
  nodes: NodeData[];
  connections: ConnectionData[];
  groups?: NodeGroupData[];
}
