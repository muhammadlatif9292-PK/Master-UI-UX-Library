/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AiStyleFamily =
  | 'minimal-ai'
  | 'glass-ai'
  | 'cinematic-ai'
  | 'orb-ai'
  | 'companion-ai'
  | 'command-center-ai'
  | 'spatial-ai'
  | 'holographic-ai'
  | 'editorial-ai'
  | 'laboratory-ai'
  | 'terminal-ai';

export type AiComponentType =
  | 'chat-shell'
  | 'message-bubbles'
  | 'streaming-response'
  | 'thinking-state'
  | 'tool-execution'
  | 'citations'
  | 'attachments'
  | 'code-block'
  | 'command-input'
  | 'model-selector'
  | 'provider-selector'
  | 'status-indicator'
  | 'ai-orb'
  | 'ai-companion'
  | 'voice-state'
  | 'multimodal-panel'
  | 'artifact-viewer'
  | 'task-progress';

export interface StyleRecipe {
  id: AiStyleFamily;
  name: string;
  category: string;
  description: string;
  bgClass: string;
  cardClass: string;
  borderClass: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentClass: string;
  accentGlow: string;
  bubbleUser: string;
  bubbleAssistant: string;
  fontClass: string;
  badgeClass: string;
  inputBg: string;
  codeBg: string;
}

export interface MessageItem {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  tokenCount?: number;
  thinking?: {
    steps: string[];
    durationMs: number;
    tokensUsed: number;
  };
  tools?: ToolCallItem[];
  citations?: CitationItem[];
  attachments?: AttachmentItem[];
  artifacts?: ArtifactItem[];
}

export interface ToolCallItem {
  id: string;
  name: string;
  arguments: Record<string, any>;
  status: 'invoked' | 'running' | 'completed' | 'failed';
  durationMs?: number;
  output?: any;
  error?: string;
}

export interface CitationItem {
  id: string;
  index: number;
  title: string;
  url: string;
  domain: string;
  snippet: string;
  relevanceScore: number;
}

export interface AttachmentItem {
  id: string;
  name: string;
  type: 'image' | 'code' | 'pdf' | 'audio' | 'dataset';
  sizeBytes: number;
  url?: string;
  previewUrl?: string;
  tokenEstimate: number;
}

export interface ArtifactItem {
  id: string;
  title: string;
  language: string;
  code: string;
  version: number;
  type: 'code' | 'react' | 'html' | 'markdown' | 'svg';
}

export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  contextWindow: string;
  latencyTier: 'Ultra-Low' | 'Low' | 'Medium' | 'Deep-Reasoning';
  pricing: string;
  capabilities: ('multimodal' | 'reasoning' | 'fast' | 'function-calling' | 'code')[];
  description: string;
}

export interface ProviderInfo {
  id: string;
  name: string;
  endpoint: string;
  status: 'operational' | 'degraded' | 'maintenance';
  pingMs: number;
  availableModels: number;
}

export interface TaskStepItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt?: number;
  completedAt?: number;
  subTasks?: { id: string; title: string; done: boolean }[];
}
