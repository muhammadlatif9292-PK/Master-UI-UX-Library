/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StyleRecipe, AttachmentItem } from '../types';
import { FileCode, FileText, Image as ImageIcon, Music, Database, X, Eye, UploadCloud, Check } from 'lucide-react';

interface AttachmentsProps {
  recipe: StyleRecipe;
  attachments?: AttachmentItem[];
  onRemove?: (id: string) => void;
  onAdd?: (item: AttachmentItem) => void;
  interactive?: boolean;
}

export function Attachments({
  recipe,
  attachments = [
    {
      id: 'att-1',
      name: 'system_architecture_diagram.png',
      type: 'image',
      sizeBytes: 1048576, // 1 MB
      previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80',
      tokenEstimate: 258,
    },
    {
      id: 'att-2',
      name: 'gemini_client_orchestrator.ts',
      type: 'code',
      sizeBytes: 8192,
      tokenEstimate: 1840,
    },
    {
      id: 'att-3',
      name: 'q1_inference_telemetry.parquet',
      type: 'dataset',
      sizeBytes: 524288,
      tokenEstimate: 920,
    },
  ],
  onRemove,
  interactive = true,
}: AttachmentsProps) {
  const [items, setItems] = useState<AttachmentItem[]>(attachments);
  const [previewingItem, setPreviewingItem] = useState<AttachmentItem | null>(null);

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (onRemove) onRemove(id);
  };

  const getIcon = (type: AttachmentItem['type']) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-3.5 h-3.5 text-pink-400" />;
      case 'code':
        return <FileCode className="w-3.5 h-3.5 text-sky-400" />;
      case 'pdf':
        return <FileText className="w-3.5 h-3.5 text-amber-400" />;
      case 'audio':
        return <Music className="w-3.5 h-3.5 text-purple-400" />;
      case 'dataset':
        return <Database className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={`group flex items-center gap-2 pl-2.5 pr-1.5 py-1.5 rounded-lg border text-xs transition-all ${
              recipe.borderClass
            } ${recipe.cardClass} hover:border-white/30`}
          >
            {getIcon(item.type)}
            <div className="min-w-0">
              <span className="font-mono font-medium text-white truncate max-w-[140px] block">
                {item.name}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-mono">
                <span>{formatSize(item.sizeBytes)}</span>
                <span>•</span>
                <span>~{item.tokenEstimate} tok</span>
              </div>
            </div>

            <div className="flex items-center gap-0.5 ml-1">
              {item.type === 'image' && item.previewUrl && (
                <button
                  onClick={() => setPreviewingItem(item)}
                  className="p-1 rounded text-zinc-400 hover:text-sky-400 transition-colors"
                  title="Preview"
                >
                  <Eye className="w-3 h-3" />
                </button>
              )}
              {interactive && (
                <button
                  onClick={() => handleRemove(item.id)}
                  className="p-1 rounded text-zinc-400 hover:text-rose-400 transition-colors"
                  title="Remove attachment"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {previewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className={`max-w-lg w-full p-4 rounded-2xl border ${recipe.borderClass} ${recipe.cardClass} space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getIcon(previewingItem.type)}
                <span className="font-mono text-xs font-bold text-white">{previewingItem.name}</span>
              </div>
              <button
                onClick={() => setPreviewingItem(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {previewingItem.previewUrl && (
              <img
                src={previewingItem.previewUrl}
                alt={previewingItem.name}
                className="w-full max-h-64 object-cover rounded-xl border border-white/10"
              />
            )}

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Size: {formatSize(previewingItem.sizeBytes)}</span>
              <span>Vision Tokens: {previewingItem.tokenEstimate}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
