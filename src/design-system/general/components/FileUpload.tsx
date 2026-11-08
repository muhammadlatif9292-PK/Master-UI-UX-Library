/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  UploadCloud,
  File,
  FileText,
  FileCode,
  FileArchive,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  X,
  RotateCcw,
  Loader2,
  FolderOpen,
} from 'lucide-react';

export interface UploadFileItem {
  id: string;
  name: string;
  sizeBytes: number;
  progress: number;
  status: 'queued' | 'uploading' | 'completed' | 'error';
  errorMessage?: string;
  type: 'image' | 'pdf' | 'code' | 'archive' | 'other';
}

export const FileUpload: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<UploadFileItem[]>([
    {
      id: 'f-1',
      name: 'quantum_simulation_v4.tar.gz',
      sizeBytes: 14200000, // 14.2 MB
      progress: 100,
      status: 'completed',
      type: 'archive',
    },
    {
      id: 'f-2',
      name: 'neural_weights_checkpoint.safetensors',
      sizeBytes: 84500000, // 84.5 MB
      progress: 68,
      status: 'uploading',
      type: 'code',
    },
    {
      id: 'f-3',
      name: 'spectrogram_density_map.png',
      sizeBytes: 3200000, // 3.2 MB
      progress: 42,
      status: 'error',
      errorMessage: 'CRC32 checksum verification mismatch',
      type: 'image',
    },
  ]);

  const formatSize = (bytes: number) => {
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-5 h-5 text-purple-400" />;
      case 'archive':
        return <FileArchive className="w-5 h-5 text-amber-400" />;
      case 'code':
        return <FileCode className="w-5 h-5 text-cyan-400" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-400" />;
      default:
        return <File className="w-5 h-5 text-slate-400" />;
    }
  };

  const handleSimulateAddFile = () => {
    const newFile: UploadFileItem = {
      id: `f-${Date.now()}`,
      name: `telemetry_export_${Math.floor(Math.random() * 900 + 100)}.json`,
      sizeBytes: 1840000,
      progress: 0,
      status: 'uploading',
      type: 'code',
    };
    setFiles((prev) => [newFile, ...prev]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const retryFile = (id: string) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: 'uploading', progress: 10, errorMessage: undefined } : f
      )
    );
  };

  if (stateMode === 'loading') {
    return (
      <div className={`p-8 rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} flex flex-col items-center justify-center gap-3 text-center`}>
        <Loader2 className={`w-8 h-8 animate-spin ${recipeConfig.accentText}`} />
        <span className={`text-sm font-semibold ${recipeConfig.textPrimary}`}>Connecting to Storage Ingress...</span>
        <span className={`text-xs ${recipeConfig.textSecondary}`}>Allocating resilient multi-part S3 bucket chunks</span>
      </div>
    );
  }

  if (stateMode === 'error') {
    return (
      <div className="p-8 rounded-3xl border border-rose-800 bg-rose-950/40 flex flex-col items-center justify-center gap-3 text-center">
        <AlertTriangle className="w-8 h-8 text-rose-400" />
        <span className="text-sm font-bold text-rose-200">Storage Ingress Gateway Rejected (413 Payload Too Large)</span>
        <span className="text-xs text-rose-300">File batch exceeded max 500MB session quota.</span>
      </div>
    );
  }

  if (stateMode === 'empty') {
    return (
      <div className={`p-8 rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} flex flex-col items-center justify-center gap-3 text-center`}>
        <FolderOpen className={`w-8 h-8 ${recipeConfig.textSecondary}`} />
        <span className={`text-sm font-semibold ${recipeConfig.textPrimary}`}>Upload Queue Clean</span>
        <span className={`text-xs ${recipeConfig.textSecondary}`}>All files have been uploaded and finalized to cluster storage.</span>
      </div>
    );
  }

  const isDisabled = stateMode === 'disabled';

  return (
    <div className={`rounded-3xl border p-6 ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl transition-all space-y-6 ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {/* Dropzone Container */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleSimulateAddFile();
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
          isDragOver
            ? 'border-indigo-400 bg-indigo-500/10 scale-[1.01]'
            : `border-slate-700/80 hover:border-slate-500 bg-black/20 hover:bg-black/30`
        }`}
      >
        <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleSimulateAddFile} />
        <div className={`w-14 h-14 rounded-2xl ${recipeConfig.accentBorder} border flex items-center justify-center bg-black/40 shadow-inner`}>
          <UploadCloud className={`w-7 h-7 ${recipeConfig.accentText}`} />
        </div>
        <div className="space-y-1">
          <h4 className={`font-bold text-sm md:text-base ${recipeConfig.textPrimary}`}>
            Drag & drop dataset files here, or <span className={recipeConfig.accentText}>browse files</span>
          </h4>
          <p className={`text-xs ${recipeConfig.textSecondary}`}>
            Supports JSON, H5, Parquet, Safetensors, PNG, WAV, MP4 up to 500MB each
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {['.safetensors', '.h5', '.json', '.parquet', '.zip', '.png'].map((fmt) => (
            <span key={fmt} className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${recipeConfig.badgeBg}`}>
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Upload Queue Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h5 className={`text-xs font-mono font-bold uppercase tracking-wider ${recipeConfig.textSecondary}`}>
            Upload Batch Queue ({files.length})
          </h5>
          <button
            onClick={handleSimulateAddFile}
            className={`px-3 py-1 rounded-xl text-xs font-semibold border ${recipeConfig.accentBorder} ${recipeConfig.textPrimary} hover:bg-white/5 transition-all`}
          >
            + Add Sample File
          </button>
        </div>

        <div className="space-y-2.5">
          {files.map((file) => (
            <div
              key={file.id}
              className={`p-3.5 rounded-2xl border ${recipeConfig.border} bg-black/30 flex flex-col gap-2 transition-all hover:border-slate-600`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-xl bg-black/50 border border-white/5 flex-shrink-0">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs font-bold ${recipeConfig.textPrimary} truncate`}>{file.name}</div>
                    <div className={`text-[10px] font-mono ${recipeConfig.textSecondary} flex items-center gap-2 mt-0.5`}>
                      <span>{formatSize(file.sizeBytes)}</span>
                      <span>•</span>
                      <span
                        className={
                          file.status === 'completed'
                            ? 'text-emerald-400 font-bold'
                            : file.status === 'error'
                            ? 'text-rose-400 font-bold'
                            : 'text-indigo-400'
                        }
                      >
                        {file.status === 'completed'
                          ? 'Uploaded'
                          : file.status === 'error'
                          ? 'Failed'
                          : `${file.progress}%`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* File Status & Actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {file.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {file.status === 'error' && (
                    <button
                      onClick={() => retryFile(file.id)}
                      className="p-1 text-rose-400 hover:bg-rose-950/60 rounded-lg"
                      title="Retry Upload"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-lg"
                    title="Remove from Queue"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress Bar or Error message */}
              {file.status === 'uploading' && (
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/5">
                  <div
                    style={{ width: `${file.progress}%` }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300"
                  />
                </div>
              )}

              {file.status === 'error' && file.errorMessage && (
                <div className="text-[10px] text-rose-400 font-mono flex items-center gap-1 bg-rose-950/40 p-1.5 rounded-lg border border-rose-900/60">
                  <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                  <span>{file.errorMessage}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
