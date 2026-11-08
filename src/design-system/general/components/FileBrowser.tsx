/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  Folder,
  FolderPlus,
  File,
  FileText,
  FileCode,
  FileArchive,
  Image as ImageIcon,
  Grid,
  List,
  Search,
  ChevronRight,
  Download,
  Trash2,
  MoreVertical,
  Info,
  Clock,
  HardDrive,
  CheckSquare,
  Square,
  Sparkles,
} from 'lucide-react';

export interface FileItem {
  id: string;
  name: string;
  isFolder: boolean;
  sizeBytes?: number;
  modified: string;
  type: 'folder' | 'code' | 'image' | 'archive' | 'data';
  itemsCount?: number;
  tags: string[];
}

export const FileBrowser: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPath, setCurrentPath] = useState<string[]>(['root', 'models', 'v2_quantized']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(['f-model-1']);
  const [activeDetailId, setActiveDetailId] = useState<string | null>('f-model-1');

  const files: FileItem[] = [
    {
      id: 'dir-checkpoints',
      name: 'checkpoints_fp16',
      isFolder: true,
      modified: '2026-08-27 14:22',
      type: 'folder',
      itemsCount: 14,
      tags: ['weights', 'fp16'],
    },
    {
      id: 'dir-telemetry',
      name: 'telemetry_logs',
      isFolder: true,
      modified: '2026-08-28 02:10',
      type: 'folder',
      itemsCount: 42,
      tags: ['audit', 'logs'],
    },
    {
      id: 'f-model-1',
      name: 'gemini_distill_base.safetensors',
      isFolder: false,
      sizeBytes: 1240000000, // 1.24 GB
      modified: '2026-08-28 04:30',
      type: 'code',
      tags: ['production', 'weights'],
    },
    {
      id: 'f-config',
      name: 'hyperparameters_config.json',
      isFolder: false,
      sizeBytes: 24500, // 24.5 KB
      modified: '2026-08-26 19:15',
      type: 'code',
      tags: ['config', 'json'],
    },
    {
      id: 'f-spec',
      name: 'loss_convergence_curve.png',
      isFolder: false,
      sizeBytes: 1850000, // 1.85 MB
      modified: '2026-08-27 09:40',
      type: 'image',
      tags: ['metric', 'eval'],
    },
    {
      id: 'f-dataset',
      name: 'synthetic_eval_dataset.parquet',
      isFolder: false,
      sizeBytes: 428000000, // 428 MB
      modified: '2026-08-25 11:05',
      type: 'data',
      tags: ['benchmark', 'raw'],
    },
  ];

  const formatSize = (bytes?: number) => {
    if (!bytes) return '--';
    if (bytes >= 1073741824) return `${(bytes / 1073741824).toFixed(2)} GB`;
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'folder':
        return <Folder className="w-5 h-5 text-indigo-400 fill-indigo-500/20" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-purple-400" />;
      case 'archive':
        return <FileArchive className="w-5 h-5 text-amber-400" />;
      case 'data':
        return <HardDrive className="w-5 h-5 text-emerald-400" />;
      default:
        return <FileCode className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const activeDetailFile = files.find((f) => f.id === activeDetailId);

  return (
    <div className={`rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl p-6 space-y-5 select-none`}>
      {/* Top Bar: Breadcrumb + Search + View Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs font-mono bg-black/40 px-3 py-2 rounded-xl border border-white/5 overflow-x-auto">
          {currentPath.map((segment, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
              <span
                onClick={() => setCurrentPath(currentPath.slice(0, idx + 1))}
                className={`cursor-pointer hover:underline ${
                  idx === currentPath.length - 1
                    ? `${recipeConfig.textPrimary} font-bold`
                    : `${recipeConfig.textSecondary}`
                }`}
              >
                {segment}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter current directory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-9 pr-3 py-1.5 text-xs rounded-xl border ${recipeConfig.inputBg} outline-none w-48 md:w-56`}
            />
          </div>

          <div className="flex items-center bg-black/40 p-0.5 rounded-xl border border-white/5">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg ${viewMode === 'list' ? `${recipeConfig.accentBg}` : 'text-slate-400 hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${viewMode === 'grid' ? `${recipeConfig.accentBg}` : 'text-slate-400 hover:text-white'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Selected Batch Action Bar */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2 bg-indigo-950/60 border border-indigo-800/80 rounded-2xl text-xs">
          <span className="font-mono text-indigo-300">
            <strong>{selectedIds.length}</strong> items selected
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg font-semibold flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Download ZIP</span>
            </button>
            <button className="p-1.5 text-rose-300 hover:bg-rose-950/80 rounded-lg">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area: Explorer Table or Grid + Details Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Files Explorer (2 Cols) */}
        <div className="lg:col-span-2 space-y-2">
          {viewMode === 'list' ? (
            <div className="border border-white/5 rounded-2xl overflow-hidden bg-black/30">
              <div className={`grid grid-cols-12 px-4 py-2.5 text-[11px] font-mono font-bold uppercase ${recipeConfig.textSecondary} border-b border-white/5 bg-black/40`}>
                <div className="col-span-1"></div>
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Size</div>
                <div className="col-span-2 text-right">Modified</div>
              </div>

              <div className="divide-y divide-white/5">
                {filtered.map((file) => {
                  const isSelected = selectedIds.includes(file.id);
                  const isDetailActive = activeDetailId === file.id;

                  return (
                    <div
                      key={file.id}
                      onClick={() => setActiveDetailId(file.id)}
                      className={`grid grid-cols-12 px-4 py-3 text-xs items-center cursor-pointer transition-colors ${
                        isDetailActive
                          ? 'bg-indigo-500/10 border-l-2 border-indigo-400'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <div
                        className="col-span-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelect(file.id);
                        }}
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-indigo-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600 hover:text-slate-400" />
                        )}
                      </div>

                      <div className="col-span-6 flex items-center gap-2.5 min-w-0 pr-2">
                        {getIcon(file.type)}
                        <span className={`font-semibold ${recipeConfig.textPrimary} truncate`}>
                          {file.name}
                        </span>
                      </div>

                      <div className={`col-span-3 font-mono text-[11px] ${recipeConfig.textSecondary}`}>
                        {file.isFolder ? `${file.itemsCount} items` : formatSize(file.sizeBytes)}
                      </div>

                      <div className={`col-span-2 font-mono text-[10px] ${recipeConfig.textSecondary} text-right`}>
                        {file.modified.split(' ')[0]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filtered.map((file) => {
                const isSelected = selectedIds.includes(file.id);
                const isDetailActive = activeDetailId === file.id;

                return (
                  <div
                    key={file.id}
                    onClick={() => setActiveDetailId(file.id)}
                    className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                      isDetailActive
                        ? 'border-indigo-400 bg-indigo-500/10 shadow-lg'
                        : `${recipeConfig.border} bg-black/30 hover:border-slate-600`
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                        {getIcon(file.type)}
                      </div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelect(file.id);
                        }}
                      >
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-indigo-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600" />
                        )}
                      </div>
                    </div>

                    <div>
                      <div className={`text-xs font-bold ${recipeConfig.textPrimary} truncate`}>
                        {file.name}
                      </div>
                      <div className={`text-[10px] font-mono ${recipeConfig.textSecondary} mt-0.5`}>
                        {file.isFolder ? `${file.itemsCount} items` : formatSize(file.sizeBytes)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected File Details Pane (1 Col) */}
        <div className={`rounded-2xl border ${recipeConfig.border} bg-black/40 p-4 space-y-4`}>
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <Info className={`w-4 h-4 ${recipeConfig.accentText}`} />
            <h5 className={`text-xs font-mono font-bold uppercase tracking-wider ${recipeConfig.textPrimary}`}>
              Asset Details
            </h5>
          </div>

          {activeDetailFile ? (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 flex flex-col items-center justify-center gap-2 text-center">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30">
                  {getIcon(activeDetailFile.type)}
                </div>
                <div className={`font-bold ${recipeConfig.textPrimary} break-all`}>
                  {activeDetailFile.name}
                </div>
              </div>

              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className={recipeConfig.textSecondary}>Size:</span>
                  <span className={recipeConfig.textPrimary}>{formatSize(activeDetailFile.sizeBytes)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className={recipeConfig.textSecondary}>Modified:</span>
                  <span className={recipeConfig.textPrimary}>{activeDetailFile.modified}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className={recipeConfig.textSecondary}>Type:</span>
                  <span className={`${recipeConfig.accentText} font-bold uppercase`}>{activeDetailFile.type}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-1.5">
                <span className={`text-[10px] font-mono uppercase ${recipeConfig.textSecondary}`}>Dataset Tags</span>
                <div className="flex flex-wrap gap-1">
                  {activeDetailFile.tags.map((t) => (
                    <span key={t} className={`px-2 py-0.5 rounded text-[10px] font-mono border ${recipeConfig.badgeBg}`}>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={`p-6 text-center text-xs ${recipeConfig.textSecondary}`}>
              Select a file or folder to view metadata.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
