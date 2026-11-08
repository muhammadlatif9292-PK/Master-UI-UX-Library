/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  WorkflowStyle,
  WireRouteType,
  NodeData,
  ConnectionData,
  NodeGroupData,
  ExecutionLog,
  WorkflowPreset,
  NodeExecutionStatus,
  PortDataType,
} from './types';
import { WORKFLOW_STYLES, StyleThemeConfig } from './styles';

interface DraftConnection {
  fromNodeId: string;
  fromPortId: string;
  fromPos: { x: number; y: number };
  currentPos: { x: number; y: number };
  snappedPort?: { nodeId: string; portId: string; pos: { x: number; y: number } };
}

interface SelectionMarquee {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface WorkflowContextType {
  style: WorkflowStyle;
  setStyle: (style: WorkflowStyle) => void;
  styleConfig: StyleThemeConfig;
  routeType: WireRouteType;
  setRouteType: (routeType: WireRouteType) => void;
  snapToGrid: boolean;
  setSnapToGrid: (snap: boolean) => void;
  gridSize: number;
  magneticSnapping: boolean;
  setMagneticSnapping: (magnetic: boolean) => void;
  showMinimap: boolean;
  setShowMinimap: (show: boolean) => void;
  showInspector: boolean;
  setShowInspector: (show: boolean) => void;
  showTimeline: boolean;
  setShowTimeline: (show: boolean) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;

  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  pan: { x: number; y: number };
  setPan: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  fitView: () => void;
  autoLayout: () => void;

  nodes: NodeData[];
  connections: ConnectionData[];
  groups: NodeGroupData[];
  logs: ExecutionLog[];
  
  selectedNodeIds: string[];
  selectedConnectionIds: string[];
  selectNode: (id: string, multiSelect?: boolean) => void;
  selectConnection: (id: string, multiSelect?: boolean) => void;
  clearSelection: () => void;

  addNode: (node: Partial<NodeData> & { title: string; category: NodeData['category'] }) => void;
  updateNode: (id: string, updates: Partial<NodeData>) => void;
  deleteNode: (id: string) => void;
  duplicateNode: (id: string) => void;
  moveNode: (id: string, deltaX: number, deltaY: number) => void;
  toggleNodeCollapse: (id: string) => void;
  toggleBreakpoint: (id: string) => void;

  addConnection: (fromNodeId: string, fromPortId: string, toNodeId: string, toPortId: string) => boolean;
  deleteConnection: (id: string) => void;

  draftConnection: DraftConnection | null;
  startDraftConnection: (fromNodeId: string, fromPortId: string, pos: { x: number; y: number }) => void;
  updateDraftConnection: (pos: { x: number; y: number }, candidatePort?: { nodeId: string; portId: string; pos: { x: number; y: number } }) => void;
  endDraftConnection: () => void;

  selectionMarquee: SelectionMarquee | null;
  setSelectionMarquee: React.Dispatch<React.SetStateAction<SelectionMarquee | null>>;

  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;

  isExecuting: boolean;
  executionStep: number;
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  runGraph: () => void;
  pauseGraph: () => void;
  resetExecution: () => void;
  stepForward: () => void;
  stepBack: () => void;

  loadPreset: (presetId: string) => void;
  exportGraphJSON: () => string;
  clearAll: () => void;

  // Accessible keyboard mode
  accessibleNavActive: boolean;
  setAccessibleNavActive: (active: boolean) => void;
  focusedNodeId: string | null;
  setFocusedNodeId: (id: string | null) => void;
  focusedPortId: string | null;
  setFocusedPortId: (id: string | null) => void;
}

const DEFAULT_PRESET: WorkflowPreset = {
  id: 'ai-pipeline',
  name: 'AI Agentic Processing Pipeline',
  description: 'Multi-modal LLM reasoning flow with input prompt, vector search, conditional guardrail, and markdown generator.',
  nodes: [
    {
      id: 'node-1',
      type: 'input-prompt',
      title: 'User Prompt Stream',
      category: 'Input',
      position: { x: 50, y: 120 },
      status: 'idle',
      inputs: [],
      outputs: [
        { id: 'p1-out-1', name: 'Prompt Text', type: 'string', direction: 'output' },
        { id: 'p1-out-2', name: 'User Meta', type: 'json', direction: 'output' },
      ],
      parameters: {
        rawText: 'Analyze quantum coherence loss in 7-qubit array and summarize anomalies.',
        temperature: 0.7,
      },
    },
    {
      id: 'node-2',
      type: 'vector-db',
      title: 'Pinecone Vector Search',
      category: 'Input',
      position: { x: 50, y: 380 },
      status: 'idle',
      inputs: [
        { id: 'p2-in-1', name: 'Query String', type: 'string', direction: 'input', required: true },
      ],
      outputs: [
        { id: 'p2-out-1', name: 'Embeddings', type: 'tensor', direction: 'output' },
        { id: 'p2-out-2', name: 'Matches (JSON)', type: 'json', direction: 'output' },
      ],
      parameters: {
        topK: 5,
        namespace: 'cryo-telemetry-v2',
      },
      groupId: 'group-1',
    },
    {
      id: 'node-3',
      type: 'llm-reasoner',
      title: 'Gemini 1.5 Pro Reasoner',
      category: 'AI & LLM',
      position: { x: 420, y: 160 },
      status: 'idle',
      inputs: [
        { id: 'p3-in-1', name: 'System Prompt', type: 'string', direction: 'input', required: true },
        { id: 'p3-in-2', name: 'Context Docs', type: 'json', direction: 'input' },
      ],
      outputs: [
        { id: 'p3-out-1', name: 'Reasoning Payload', type: 'string', direction: 'output' },
        { id: 'p3-out-2', name: 'Token Stats', type: 'json', direction: 'output' },
      ],
      parameters: {
        model: 'gemini-1.5-pro',
        maxTokens: 2048,
        thinkingBudget: 1024,
      },
      tokensUsed: 1420,
    },
    {
      id: 'node-4',
      type: 'safety-guardrail',
      title: 'Safety & Policy Evaluator',
      category: 'Logic',
      position: { x: 780, y: 100 },
      status: 'idle',
      inputs: [
        { id: 'p4-in-1', name: 'Response Text', type: 'string', direction: 'input', required: true },
      ],
      outputs: [
        { id: 'p4-out-1', name: 'Passed Output', type: 'string', direction: 'output' },
        { id: 'p4-out-2', name: 'Pass/Fail', type: 'boolean', direction: 'output' },
      ],
      parameters: {
        strictMode: true,
        threshold: 0.95,
      },
      hasBreakpoint: true,
    },
    {
      id: 'node-5',
      type: 'error-node',
      title: 'Anomalous Data Filter',
      category: 'Transform',
      position: { x: 780, y: 380 },
      status: 'error',
      errorMessage: 'E_VAL_OVERFLOW: Variance exceeds 3.5 σ threshold in cryogenic sensor 4.',
      errorCode: 'ERR_308_QUANTUM_VARIANCE',
      inputs: [
        { id: 'p5-in-1', name: 'Raw Vector', type: 'json', direction: 'input' },
      ],
      outputs: [
        { id: 'p5-out-1', name: 'Filtered Json', type: 'json', direction: 'output' },
      ],
      parameters: {
        maxSigma: 3.5,
      },
    },
    {
      id: 'node-6',
      type: 'markdown-sink',
      title: 'Report Markdown Renderer',
      category: 'Output',
      position: { x: 1140, y: 180 },
      status: 'idle',
      inputs: [
        { id: 'p6-in-1', name: 'Markdown Content', type: 'string', direction: 'input', required: true },
        { id: 'p6-in-2', name: 'Status Gate', type: 'boolean', direction: 'input' },
      ],
      outputs: [
        { id: 'p6-out-1', name: 'Render Trigger', type: 'trigger', direction: 'output' },
      ],
      parameters: {
        theme: 'dark-cyber',
        autoSave: true,
      },
    },
  ],
  connections: [
    { id: 'conn-1', fromNodeId: 'node-1', fromPortId: 'p1-out-1', toNodeId: 'node-2', toPortId: 'p2-in-1', dataType: 'string' },
    { id: 'conn-2', fromNodeId: 'node-1', fromPortId: 'p1-out-1', toNodeId: 'node-3', toPortId: 'p3-in-1', dataType: 'string' },
    { id: 'conn-3', fromNodeId: 'node-2', fromPortId: 'p2-out-2', toNodeId: 'node-3', toPortId: 'p3-in-2', dataType: 'json' },
    { id: 'conn-4', fromNodeId: 'node-3', fromPortId: 'p3-out-1', toNodeId: 'node-4', toPortId: 'p4-in-1', dataType: 'string' },
    { id: 'conn-5', fromNodeId: 'node-2', fromPortId: 'p2-out-2', toNodeId: 'node-5', toPortId: 'p5-in-1', dataType: 'json', status: 'error' },
    { id: 'conn-6', fromNodeId: 'node-4', fromPortId: 'p4-out-1', toNodeId: 'node-6', toPortId: 'p6-in-1', dataType: 'string' },
    { id: 'conn-7', fromNodeId: 'node-4', fromPortId: 'p4-out-2', toNodeId: 'node-6', toPortId: 'p6-in-2', dataType: 'boolean' },
  ],
  groups: [
    {
      id: 'group-1',
      title: 'Context Retrieval & Vector Search',
      color: '#3b82f6',
      bounds: { x: 30, y: 340, width: 330, height: 200 },
      nodeIds: ['node-2'],
    },
  ],
};

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [style, setStyle] = useState<WorkflowStyle>('laboratory');
  const [routeType, setRouteType] = useState<WireRouteType>('bezier');
  const [snapToGrid, setSnapToGrid] = useState<boolean>(true);
  const gridSize = 20;
  const [magneticSnapping, setMagneticSnapping] = useState<boolean>(true);
  const [showMinimap, setShowMinimap] = useState<boolean>(true);
  const [showInspector, setShowInspector] = useState<boolean>(true);
  const [showTimeline, setShowTimeline] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);

  const [zoom, setZoom] = useState<number>(1.0);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 60, y: 40 });

  const [nodes, setNodes] = useState<NodeData[]>(DEFAULT_PRESET.nodes);
  const [connections, setConnections] = useState<ConnectionData[]>(DEFAULT_PRESET.connections);
  const [groups, setGroups] = useState<NodeGroupData[]>(DEFAULT_PRESET.groups || []);
  const [logs, setLogs] = useState<ExecutionLog[]>([
    { id: 'log-1', timestamp: '21:30:00.100', nodeId: 'node-1', nodeTitle: 'User Prompt Stream', level: 'info', message: 'Initialized prompt source stream.' },
    { id: 'log-2', timestamp: '21:30:00.250', nodeId: 'node-5', nodeTitle: 'Anomalous Data Filter', level: 'error', message: 'Validation Exception: Sensor variance overflow (3.5 sigma).' },
  ]);

  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>(['node-3']);
  const [selectedConnectionIds, setSelectedConnectionIds] = useState<string[]>([]);

  const [draftConnection, setDraftConnection] = useState<DraftConnection | null>(null);
  const [selectionMarquee, setSelectionMarquee] = useState<SelectionMarquee | null>(null);

  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);

  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [executionStep, setExecutionStep] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const [accessibleNavActive, setAccessibleNavActive] = useState<boolean>(false);
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>('node-1');
  const [focusedPortId, setFocusedPortId] = useState<string | null>(null);

  const styleConfig = WORKFLOW_STYLES[style];

  // Selection handlers
  const selectNode = useCallback((id: string, multiSelect = false) => {
    setSelectedConnectionIds([]);
    if (multiSelect) {
      setSelectedNodeIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    } else {
      setSelectedNodeIds([id]);
    }
  }, []);

  const selectConnection = useCallback((id: string, multiSelect = false) => {
    setSelectedNodeIds([]);
    if (multiSelect) {
      setSelectedConnectionIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    } else {
      setSelectedConnectionIds([id]);
    }
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNodeIds([]);
    setSelectedConnectionIds([]);
  }, []);

  // Node Mutations
  const addNode = useCallback((nodeInput: Partial<NodeData> & { title: string; category: NodeData['category'] }) => {
    const newId = `node-${Date.now()}`;
    const newNode: NodeData = {
      id: newId,
      type: nodeInput.type || 'generic-node',
      title: nodeInput.title,
      category: nodeInput.category,
      position: nodeInput.position || { x: 200 + Math.random() * 100, y: 150 + Math.random() * 100 },
      status: 'idle',
      inputs: nodeInput.inputs || [
        { id: `${newId}-in-1`, name: 'In Payload', type: 'string', direction: 'input' }
      ],
      outputs: nodeInput.outputs || [
        { id: `${newId}-out-1`, name: 'Out Result', type: 'string', direction: 'output' }
      ],
      parameters: nodeInput.parameters || { enabled: true },
    };
    setNodes(prev => [...prev, newNode]);
    setSelectedNodeIds([newId]);
    setLogs(prev => [{
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      nodeId: newId,
      nodeTitle: newNode.title,
      level: 'info',
      message: `Added node [${newNode.title}] to workspace canvas.`,
    }, ...prev]);
  }, []);

  const updateNode = useCallback((id: string, updates: Partial<NodeData>) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
  }, []);

  const deleteNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    setConnections(prev => prev.filter(c => c.fromNodeId !== id && c.toNodeId !== id));
    setSelectedNodeIds(prev => prev.filter(i => i !== id));
  }, []);

  const duplicateNode = useCallback((id: string) => {
    const source = nodes.find(n => n.id === id);
    if (!source) return;
    const newId = `node-${Date.now()}`;
    const duplicated: NodeData = {
      ...source,
      id: newId,
      title: `${source.title} (Copy)`,
      position: { x: source.position.x + 30, y: source.position.y + 30 },
      inputs: source.inputs.map(p => ({ ...p, id: `${newId}-${p.id.split('-').pop()}` })),
      outputs: source.outputs.map(p => ({ ...p, id: `${newId}-${p.id.split('-').pop()}` })),
      status: 'idle',
    };
    setNodes(prev => [...prev, duplicated]);
    setSelectedNodeIds([newId]);
  }, [nodes]);

  const moveNode = useCallback((id: string, deltaX: number, deltaY: number) => {
    setNodes(prev => prev.map(node => {
      if (node.id === id || selectedNodeIds.includes(node.id)) {
        let newX = node.position.x + deltaX;
        let newY = node.position.y + deltaY;
        if (snapToGrid) {
          newX = Math.round(newX / gridSize) * gridSize;
          newY = Math.round(newY / gridSize) * gridSize;
        }
        return { ...node, position: { x: Math.max(0, newX), y: Math.max(0, newY) } };
      }
      return node;
    }));
  }, [selectedNodeIds, snapToGrid, gridSize]);

  const toggleNodeCollapse = useCallback((id: string) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, collapsed: !n.collapsed } : n));
  }, []);

  const toggleBreakpoint = useCallback((id: string) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, hasBreakpoint: !n.hasBreakpoint } : n));
  }, []);

  // Connection Operations
  const addConnection = useCallback((fromNodeId: string, fromPortId: string, toNodeId: string, toPortId: string): boolean => {
    if (fromNodeId === toNodeId) return false;
    const existing = connections.find(c => c.fromNodeId === fromNodeId && c.fromPortId === fromPortId && c.toNodeId === toNodeId && c.toPortId === toPortId);
    if (existing) return false;

    const sourceNode = nodes.find(n => n.id === fromNodeId);
    const sourcePort = sourceNode?.outputs.find(p => p.id === fromPortId);

    const newConn: ConnectionData = {
      id: `conn-${Date.now()}`,
      fromNodeId,
      fromPortId,
      toNodeId,
      toPortId,
      dataType: sourcePort?.type || 'string',
      status: 'idle',
    };

    setConnections(prev => [...prev, newConn]);

    // Update port connected state
    setNodes(prev => prev.map(node => {
      if (node.id === fromNodeId) {
        return { ...node, outputs: node.outputs.map(p => p.id === fromPortId ? { ...p, connected: true } : p) };
      }
      if (node.id === toNodeId) {
        return { ...node, inputs: node.inputs.map(p => p.id === toPortId ? { ...p, connected: true } : p) };
      }
      return node;
    }));

    setLogs(prev => [{
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      nodeId: fromNodeId,
      nodeTitle: sourceNode?.title || 'Node',
      level: 'info',
      message: `Created connection [${fromPortId}] ➔ [${toPortId}].`,
    }, ...prev]);

    return true;
  }, [connections, nodes]);

  const deleteConnection = useCallback((id: string) => {
    setConnections(prev => prev.filter(c => c.id !== id));
    setSelectedConnectionIds(prev => prev.filter(i => i !== id));
  }, []);

  // Draft Connection handlers
  const startDraftConnection = useCallback((fromNodeId: string, fromPortId: string, pos: { x: number; y: number }) => {
    setDraftConnection({
      fromNodeId,
      fromPortId,
      fromPos: pos,
      currentPos: pos,
    });
  }, []);

  const updateDraftConnection = useCallback((pos: { x: number; y: number }, candidatePort?: { nodeId: string; portId: string; pos: { x: number; y: number } }) => {
    setDraftConnection(prev => prev ? { ...prev, currentPos: pos, snappedPort: candidatePort } : null);
  }, []);

  const endDraftConnection = useCallback(() => {
    if (draftConnection && draftConnection.snappedPort) {
      addConnection(
        draftConnection.fromNodeId,
        draftConnection.fromPortId,
        draftConnection.snappedPort.nodeId,
        draftConnection.snappedPort.portId
      );
    }
    setDraftConnection(null);
  }, [draftConnection, addConnection]);

  // Layout and Canvas Helpers
  const fitView = useCallback(() => {
    if (nodes.length === 0) {
      setPan({ x: 50, y: 50 });
      setZoom(1.0);
      return;
    }
    const minX = Math.min(...nodes.map(n => n.position.x));
    const maxX = Math.max(...nodes.map(n => n.position.x + (n.dimensions?.width || 240)));
    const minY = Math.min(...nodes.map(n => n.position.y));
    const maxY = Math.max(...nodes.map(n => n.position.y + (n.dimensions?.height || 180)));

    const width = maxX - minX + 200;
    const height = maxY - minY + 200;

    const newZoom = Math.min(1.2, Math.max(0.5, 800 / width));
    setZoom(newZoom);
    setPan({ x: -minX * newZoom + 80, y: -minY * newZoom + 80 });
  }, [nodes]);

  const autoLayout = useCallback(() => {
    // Topological auto-alignment
    const stepX = 320;
    const stepY = 220;
    const cols: Record<number, number> = {};

    setNodes(prev => prev.map((node, i) => {
      let col = 0;
      if (node.category === 'Input') col = 0;
      else if (node.category === 'AI & LLM' || node.category === 'Transform') col = 1;
      else if (node.category === 'Logic') col = 2;
      else col = 3;

      cols[col] = (cols[col] || 0) + 1;
      const row = cols[col] - 1;

      return {
        ...node,
        position: {
          x: 50 + col * stepX,
          y: 80 + row * stepY,
        },
      };
    }));

    setLogs(prev => [{
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      nodeId: 'system',
      nodeTitle: 'Canvas Engine',
      level: 'info',
      message: 'Applied DAG Topological Auto-Layout.',
    }, ...prev]);
  }, []);

  // Execution Simulator
  const runGraph = useCallback(() => {
    setIsExecuting(true);
    setExecutionStep(0);

    // Reset all statuses
    setNodes(prev => prev.map(n => ({ ...n, status: 'queued' as NodeExecutionStatus })));
    setConnections(prev => prev.map(c => ({ ...c, status: 'idle' })));

    setLogs(prev => [{
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      nodeId: 'engine',
      nodeTitle: 'Graph Runner',
      level: 'info',
      message: 'Starting Directed Acyclic Graph execution run...',
    }, ...prev]);
  }, []);

  const pauseGraph = useCallback(() => {
    setIsExecuting(false);
    setNodes(prev => prev.map(n => n.status === 'running' ? { ...n, status: 'paused' } : n));
  }, []);

  const resetExecution = useCallback(() => {
    setIsExecuting(false);
    setExecutionStep(0);
    setNodes(prev => prev.map((n, i) => i === 4 ? { ...n, status: 'error' } : { ...n, status: 'idle' }));
    setConnections(prev => prev.map(c => c.id === 'conn-5' ? { ...c, status: 'error' } : { ...c, status: 'idle' }));
  }, []);

  const stepForward = useCallback(() => {
    setExecutionStep(prev => prev + 1);
  }, []);

  const stepBack = useCallback(() => {
    setExecutionStep(prev => Math.max(0, prev - 1));
  }, []);

  // Execution loop timer
  useEffect(() => {
    if (!isExecuting) return;

    const interval = setInterval(() => {
      setExecutionStep(prevStep => {
        const nextStep = prevStep + 1;
        
        // Step 1: Input nodes
        if (nextStep === 1) {
          setNodes(prev => prev.map(n => n.category === 'Input' ? { ...n, status: 'running', executionTimeMs: 45 } : n));
          setConnections(prev => prev.map(c => (c.fromNodeId === 'node-1' || c.fromNodeId === 'node-2') ? { ...c, status: 'active' } : c));
        } 
        // Step 2: Input completed, Transform & AI running
        else if (nextStep === 2) {
          setNodes(prev => prev.map(n => {
            if (n.category === 'Input') return { ...n, status: 'success' };
            if (n.id === 'node-3') return { ...n, status: 'running', executionTimeMs: 1280 };
            if (n.id === 'node-5') return { ...n, status: 'running', executionTimeMs: 320 };
            return n;
          }));
        } 
        // Step 3: Node-5 hits error, Node-3 finishes
        else if (nextStep === 3) {
          setNodes(prev => prev.map(n => {
            if (n.id === 'node-3') return { ...n, status: 'success' };
            if (n.id === 'node-5') return { ...n, status: 'error' };
            if (n.id === 'node-4') return { ...n, status: 'running', executionTimeMs: 120 };
            return n;
          }));
          setConnections(prev => prev.map(c => c.id === 'conn-4' ? { ...c, status: 'active' } : c.id === 'conn-5' ? { ...c, status: 'error' } : c));
        } 
        // Step 4: Logic success, Output running
        else if (nextStep === 4) {
          setNodes(prev => prev.map(n => {
            if (n.id === 'node-4') return { ...n, status: 'success' };
            if (n.category === 'Output') return { ...n, status: 'running', executionTimeMs: 80 };
            return n;
          }));
          setConnections(prev => prev.map(c => (c.id === 'conn-6' || c.id === 'conn-7') ? { ...c, status: 'active' } : c));
        } 
        // Step 5: Final completion
        else if (nextStep >= 5) {
          setIsExecuting(false);
          setNodes(prev => prev.map(n => n.id === 'node-5' ? n : { ...n, status: 'success' }));
          setLogs(prev => [{
            id: `log-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            nodeId: 'engine',
            nodeTitle: 'Graph Runner',
            level: 'success',
            message: 'Graph execution cycle completed with 1 handled error branch.',
          }, ...prev]);
        }

        return nextStep;
      });
    }, 1200 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isExecuting, playbackSpeed]);

  const loadPreset = useCallback((presetId: string) => {
    setNodes(DEFAULT_PRESET.nodes);
    setConnections(DEFAULT_PRESET.connections);
    setGroups(DEFAULT_PRESET.groups || []);
    setSelectedNodeIds(['node-3']);
  }, []);

  const exportGraphJSON = useCallback(() => {
    return JSON.stringify({ nodes, connections, groups, style }, null, 2);
  }, [nodes, connections, groups, style]);

  const clearAll = useCallback(() => {
    setNodes([]);
    setConnections([]);
    setGroups([]);
    setSelectedNodeIds([]);
    setSelectedConnectionIds([]);
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K -> Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
        return;
      }

      // Delete or Backspace -> Delete selected nodes or connections
      if ((e.key === 'Delete' || e.key === 'Backspace') && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        if (selectedNodeIds.length > 0) {
          e.preventDefault();
          selectedNodeIds.forEach(id => deleteNode(id));
        } else if (selectedConnectionIds.length > 0) {
          e.preventDefault();
          selectedConnectionIds.forEach(id => deleteConnection(id));
        }
        return;
      }

      // Cmd/Ctrl + A -> Select All
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'a' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setSelectedNodeIds(nodes.map(n => n.id));
        return;
      }

      // Space -> Toggle Play/Pause Execution
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        if (isExecuting) pauseGraph();
        else runGraph();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodeIds, selectedConnectionIds, nodes, deleteNode, deleteConnection, isExecuting, runGraph, pauseGraph]);

  return (
    <WorkflowContext.Provider
      value={{
        style,
        setStyle,
        styleConfig,
        routeType,
        setRouteType,
        snapToGrid,
        setSnapToGrid,
        gridSize,
        magneticSnapping,
        setMagneticSnapping,
        showMinimap,
        setShowMinimap,
        showInspector,
        setShowInspector,
        showTimeline,
        setShowTimeline,
        showGrid,
        setShowGrid,
        zoom,
        setZoom,
        pan,
        setPan,
        fitView,
        autoLayout,
        nodes,
        connections,
        groups,
        logs,
        selectedNodeIds,
        selectedConnectionIds,
        selectNode,
        selectConnection,
        clearSelection,
        addNode,
        updateNode,
        deleteNode,
        duplicateNode,
        moveNode,
        toggleNodeCollapse,
        toggleBreakpoint,
        addConnection,
        deleteConnection,
        draftConnection,
        startDraftConnection,
        updateDraftConnection,
        endDraftConnection,
        selectionMarquee,
        setSelectionMarquee,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        isExecuting,
        executionStep,
        playbackSpeed,
        setPlaybackSpeed,
        runGraph,
        pauseGraph,
        resetExecution,
        stepForward,
        stepBack,
        loadPreset,
        exportGraphJSON,
        clearAll,
        accessibleNavActive,
        setAccessibleNavActive,
        focusedNodeId,
        setFocusedNodeId,
        focusedPortId,
        setFocusedPortId,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const ctx = useContext(WorkflowContext);
  if (!ctx) throw new Error('useWorkflow must be used within WorkflowProvider');
  return ctx;
};
