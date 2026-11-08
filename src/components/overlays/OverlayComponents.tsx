/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Command,
  X,
  Check,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Settings,
  Shield,
  Activity,
  FileText,
  Copy,
  Trash2,
  Share2,
  Download,
  AlertTriangle,
  Info,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  Sliders,
  Terminal,
  Cpu,
  Play,
  RotateCw,
  ExternalLink,
  Code,
  Compass,
  ArrowRight,
  Eye,
  Lock,
  Globe,
  Bell,
  Palette,
} from 'lucide-react';
import { useOverlay } from '../../design-system/overlay/OverlayContext';
import { FocusTrap } from '../../design-system/overlay/FocusTrap';
import { InteractionModel, OverlayVisualTheme } from '../../design-system/overlay/overlayTypes';
import { getVisualThemeClasses } from '../../design-system/overlay/interactionModels';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';

// Helper to compute Motion Variants based on interaction model
export function getMotionVariants(model: InteractionModel) {
  switch (model) {
    case 'fade':
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.18, ease: 'linear' } },
        exit: { opacity: 0, transition: { duration: 0.12, ease: 'linear' } },
      };
    case 'slide':
      return {
        initial: { opacity: 0, y: 20, x: 0 },
        animate: { opacity: 1, y: 0, x: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, y: 15, transition: { duration: 0.18 } },
      };
    case 'spring':
      return {
        initial: { opacity: 0, scale: 0.94, y: 8 },
        animate: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 420, damping: 26 } },
        exit: { opacity: 0, scale: 0.95, y: 4, transition: { duration: 0.15 } },
      };
    case 'scale':
      return {
        initial: { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: [0.85, 1.04, 1.0], transition: { duration: 0.28, ease: [0.34, 1.56, 0.64, 1] } },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.15 } },
      };
    case 'spatial':
      return {
        initial: { opacity: 0, z: -50, rotateX: 8, scale: 0.92 },
        animate: { opacity: 1, z: 0, rotateX: 0, scale: 1, transition: { duration: 0.32, ease: [0.2, 0.9, 0.2, 1] } },
        exit: { opacity: 0, z: -30, rotateX: -6, scale: 0.94, transition: { duration: 0.2 } },
      };
    case 'liquid':
      return {
        initial: { opacity: 0, scaleY: 0.7, scaleX: 0.9, borderRadius: '40px' },
        animate: { opacity: 1, scaleY: 1, scaleX: 1, borderRadius: '16px', transition: { type: 'spring', stiffness: 350, damping: 20 } },
        exit: { opacity: 0, scaleY: 0.8, borderRadius: '32px', transition: { duration: 0.18 } },
      };
    case 'glass':
      return {
        initial: { opacity: 0, filter: 'blur(12px)', scale: 0.96 },
        animate: { opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 0.28, ease: [0.25, 1, 0.5, 1] } },
        exit: { opacity: 0, filter: 'blur(8px)', scale: 0.98, transition: { duration: 0.16 } },
      };
    case 'cinematic':
      return {
        initial: { opacity: 0, scale: 1.08, filter: 'brightness(1.5)' },
        animate: { opacity: 1, scale: 1.0, filter: 'brightness(1)', transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, scale: 0.96, transition: { duration: 0.2 } },
      };
    case 'mechanical':
      return {
        initial: { opacity: 0, y: -4 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.05, ease: 'linear' } },
        exit: { opacity: 0, y: -2, transition: { duration: 0.05 } },
      };
    case 'morph':
    case 'portal':
    default:
      return {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: [0.2, 0, 0, 1] } },
        exit: { opacity: 0, scale: 0.96, transition: { duration: 0.15 } },
      };
  }
}

// -------------------------------------------------------------
// 1. DROPDOWN COMPONENT
// -------------------------------------------------------------
export function DropdownDemo({
  visualTheme = 'glass',
  interactionModel = 'spring',
}: {
  visualTheme?: OverlayVisualTheme;
  interactionModel?: InteractionModel;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { openOverlay, closeOverlay } = useOverlay();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const themeClasses = getVisualThemeClasses(visualTheme);
  const variants = getMotionVariants(interactionModel);

  const menuItems = [
    { id: 'doc-new', label: 'Create New Document', icon: FileText, shortcut: '⌘N' },
    { id: 'share', label: 'Share & Permissions', icon: Share2, shortcut: '⌘S' },
    { id: 'export', label: 'Export Telemetry', icon: Download, shortcut: '⇧⌘E' },
    {
      id: 'settings',
      label: 'Security & Preferences',
      icon: Shield,
      hasSubmenu: true,
      subitems: ['Two-Factor Auth', 'Audit Logs', 'Encryption Keys'],
    },
    { id: 'delete', label: 'Archive Workspace', icon: Trash2, destructive: true, shortcut: '⌘⌫' },
  ];

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      closeOverlay('demo-dropdown');
      playSound('CLOSE');
    } else {
      setIsOpen(true);
      openOverlay({
        id: 'demo-dropdown',
        type: 'dropdown',
        title: 'Workspace Actions Dropdown',
        interactionModel,
        visualStyle: visualTheme,
        preventScroll: false,
        onClose: () => setIsOpen(false),
      });
      playSound('OPEN');
      triggerHaptic('tap');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % menuItems.length);
      playSound('HOVER');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
      playSound('HOVER');
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const current = menuItems[focusedIndex];
      if (current) {
        setSelectedAction(current.label);
        setIsOpen(false);
        closeOverlay('demo-dropdown');
        playSound('SUCCESS');
        triggerHaptic('success');
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      closeOverlay('demo-dropdown');
      playSound('CLOSE');
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        id="dropdown-trigger-btn"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="workspace-dropdown-menu"
        onClick={handleToggle}
        className={`px-4 py-2.5 rounded-xl border font-medium text-sm flex items-center gap-2.5 transition-all shadow-md active:scale-95 ${
          isOpen
            ? 'bg-cyan-500 text-black border-cyan-400 ring-2 ring-cyan-400/40'
            : 'bg-zinc-800/90 text-zinc-100 border-zinc-700 hover:bg-zinc-750 hover:border-zinc-600'
        }`}
      >
        <Layers className="w-4 h-4 text-cyan-400" />
        <span>Workspace Actions</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-black' : 'text-zinc-400'}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="workspace-dropdown-menu"
            role="menu"
            aria-label="Workspace Actions"
            tabIndex={-1}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`absolute left-0 mt-2 w-72 rounded-2xl p-1.5 z-50 ${themeClasses.surface} ${themeClasses.border}`}
          >
            <div className="px-3 py-2 border-b border-white/10 mb-1 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Command Menu</span>
              <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded border border-zinc-700 font-mono">↑↓ Enter</span>
            </div>

            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              const isFocused = focusedIndex === idx;
              return (
                <div key={item.id} className="relative">
                  <button
                    type="button"
                    role="menuitem"
                    id={`dropdown-item-${item.id}`}
                    tabIndex={isFocused ? 0 : -1}
                    onMouseEnter={() => {
                      setFocusedIndex(idx);
                      if (item.hasSubmenu) setActiveSubmenu(item.id);
                      else setActiveSubmenu(null);
                    }}
                    onClick={() => {
                      setSelectedAction(item.label);
                      setIsOpen(false);
                      closeOverlay('demo-dropdown');
                      playSound(item.destructive ? 'ALERT' : 'SUCCESS');
                      triggerHaptic('selection');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                      isFocused ? (item.destructive ? 'bg-red-500/20 text-red-300' : 'bg-white/15 text-white') : 'text-zinc-300 hover:text-white'
                    } ${item.destructive ? 'text-red-400' : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-3.5 h-3.5 ${item.destructive ? 'text-red-400' : 'text-cyan-400'}`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.shortcut && <span className="text-[10px] text-zinc-400 font-mono">{item.shortcut}</span>}
                    {item.hasSubmenu && <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />}
                  </button>

                  {/* Submenu cascade */}
                  {item.hasSubmenu && activeSubmenu === item.id && (
                    <motion.div
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`absolute left-full top-0 ml-1.5 w-48 rounded-xl p-1.5 shadow-2xl z-50 ${themeClasses.surface} ${themeClasses.border}`}
                    >
                      <div className="text-[10px] uppercase font-bold text-zinc-400 px-2 py-1">Security Submenu</div>
                      {item.subitems?.map((sub, sIdx) => (
                        <button
                          key={sIdx}
                          type="button"
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:bg-white/15 hover:text-white flex items-center justify-between"
                          onClick={() => {
                            setSelectedAction(`${item.label} → ${sub}`);
                            setIsOpen(false);
                            closeOverlay('demo-dropdown');
                            playSound('SUCCESS');
                          }}
                        >
                          <span>{sub}</span>
                          <Lock className="w-3 h-3 text-zinc-400" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}

            {selectedAction && (
              <div className="mt-2 pt-2 border-t border-white/10 px-2 py-1 text-[11px] text-cyan-300 flex items-center gap-1.5 font-mono">
                <Check className="w-3 h-3" /> Last selected: {selectedAction}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// 2. CONTEXT MENU COMPONENT
// -------------------------------------------------------------
export function ContextMenuDemo({
  visualTheme = 'glass',
  interactionModel = 'spring',
}: {
  visualTheme?: OverlayVisualTheme;
  interactionModel?: InteractionModel;
}) {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const { openOverlay, closeOverlay } = useOverlay();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const themeClasses = getVisualThemeClasses(visualTheme);
  const variants = getMotionVariants(interactionModel);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x: Math.min(x, rect.width - 220), y: Math.min(y, rect.height - 240) });
    openOverlay({
      id: 'demo-context-menu',
      type: 'contextmenu',
      title: 'Canvas Context Menu',
      interactionModel,
      visualStyle: visualTheme,
      preventScroll: false,
      onClose: () => setCoords(null),
    });
    playSound('OPEN');
    triggerHaptic('medium');
  };

  const handleAction = (label: string, isDestructive = false) => {
    setLastAction(label);
    setCoords(null);
    closeOverlay('demo-context-menu');
    playSound(isDestructive ? 'ALERT' : 'SUCCESS');
    triggerHaptic('selection');
  };

  return (
    <div
      ref={canvasRef}
      id="context-menu-canvas"
      onContextMenu={handleContextMenu}
      className="relative w-full h-56 rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-950/60 p-6 flex flex-col items-center justify-center cursor-context-menu overflow-hidden select-none group hover:border-cyan-500/50 transition-colors"
    >
      <div className="flex flex-col items-center text-center gap-2 pointer-events-none">
        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Terminal className="w-6 h-6 text-cyan-400" />
        </div>
        <p className="text-sm font-semibold text-zinc-200">Interactive Canvas Target</p>
        <p className="text-xs text-zinc-400 max-w-xs">
          Right-click (or long press on mobile) anywhere in this box to summon the volumetric context menu.
        </p>
        {lastAction && (
          <span className="mt-2 text-xs font-mono bg-cyan-950/80 border border-cyan-800 text-cyan-300 px-3 py-1 rounded-full">
            Executed: {lastAction}
          </span>
        )}
      </div>

      <AnimatePresence>
        {coords && (
          <motion.div
            id="context-menu-overlay"
            role="menu"
            aria-label="Context Actions"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ left: coords.x, top: coords.y }}
            className={`absolute w-56 rounded-2xl p-1.5 z-50 ${themeClasses.surface} ${themeClasses.border}`}
          >
            <div className="px-2.5 py-1.5 border-b border-white/10 text-[10px] font-mono text-zinc-400 flex items-center justify-between">
              <span>CANVAS CONTEXT</span>
              <span>X:{Math.round(coords.x)} Y:{Math.round(coords.y)}</span>
            </div>
            <div className="space-y-0.5 py-1">
              <button
                type="button"
                role="menuitem"
                onClick={() => handleAction('Inspect Node')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-zinc-200 hover:bg-white/15 hover:text-white flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Inspect Layer</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">⌥I</span>
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => handleAction('Duplicate Geometry')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-zinc-200 hover:bg-white/15 hover:text-white flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Copy className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Duplicate</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">⌘D</span>
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => handleAction('Export SVG Asset')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-zinc-200 hover:bg-white/15 hover:text-white flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export SVG</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">⇧⌘E</span>
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                type="button"
                role="menuitem"
                onClick={() => handleAction('Purge Selection', true)}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/20 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Purge Node</span>
                </div>
                <span className="text-[10px] text-red-400 font-mono">⌫</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// 3. COMMAND PALETTE COMPONENT (⌘K)
// -------------------------------------------------------------
export function CommandPaletteDemo({
  visualTheme = 'glass',
  interactionModel = 'spring',
}: {
  visualTheme?: OverlayVisualTheme;
  interactionModel?: InteractionModel;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lastExecuted, setLastExecuted] = useState<string | null>(null);

  const { openOverlay, closeOverlay } = useOverlay();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const themeClasses = getVisualThemeClasses(visualTheme);
  const variants = getMotionVariants(interactionModel);

  const commands = [
    { id: 'deploy-prod', title: 'Deploy Cluster to Production', category: 'DevOps', icon: Activity, hotkey: '⌘P' },
    { id: 'inspect-tokens', title: 'Inspect Design System Tokens', category: 'Design', icon: Palette, hotkey: '⌥T' },
    { id: 'security-audit', title: 'Trigger Automated Security Audit', category: 'Security', icon: Shield, hotkey: '⌘⇧S' },
    { id: 'ai-prompt', title: 'Run Gemini Multimodal Analysis', category: 'AI Tools', icon: Sparkles, hotkey: '⌘K' },
    { id: 'clear-cache', title: 'Purge Edge CDN Cache', category: 'DevOps', icon: RotateCw, hotkey: '⌘⇧R' },
    { id: 'export-schema', title: 'Export GraphQL Schema Blueprint', category: 'Architecture', icon: FileText, hotkey: '⌘E' },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpen = () => {
    setIsOpen(true);
    setSearchQuery('');
    setSelectedIndex(0);
    openOverlay({
      id: 'demo-command-palette',
      type: 'commandpalette',
      title: 'Universal Command Palette',
      interactionModel,
      visualStyle: visualTheme,
      preventScroll: true,
      onClose: () => setIsOpen(false),
    });
    playSound('OPEN');
    triggerHaptic('medium');
  };

  const handleExecute = (cmd: typeof commands[0]) => {
    setLastExecuted(cmd.title);
    setIsOpen(false);
    closeOverlay('demo-command-palette');
    playSound('SUCCESS');
    triggerHaptic('success');
  };

  // Global hotkey listener (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          setIsOpen(false);
          closeOverlay('demo-command-palette');
        } else {
          handleOpen();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handlePaletteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      playSound('HOVER');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      playSound('HOVER');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleExecute(filteredCommands[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      closeOverlay('demo-command-palette');
      playSound('CLOSE');
    }
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        type="button"
        id="command-palette-trigger-btn"
        onClick={handleOpen}
        className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900/90 text-zinc-200 hover:bg-zinc-800 hover:border-cyan-500/50 flex items-center gap-3 transition-all shadow-md group"
      >
        <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium">Quick Command Palette...</span>
        <kbd className="text-[10px] font-mono bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded text-zinc-400 group-hover:text-cyan-300">
          ⌘K
        </kbd>
      </button>

      {lastExecuted && (
        <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
          <Check className="w-3.5 h-3.5" /> Executed: {lastExecuted}
        </p>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsOpen(false);
                closeOverlay('demo-command-palette');
              }}
              className={`fixed inset-0 ${themeClasses.backdrop}`}
            />

            {/* Modal HUD */}
            <motion.div
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              onKeyDown={handlePaletteKeyDown}
              className={`relative w-full max-w-xl rounded-2xl overflow-hidden z-10 shadow-2xl ${themeClasses.surface} ${themeClasses.border}`}
            >
              <FocusTrap active={isOpen} onEscape={() => { setIsOpen(false); closeOverlay('demo-command-palette'); }}>
                {/* Search Header */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
                  <Search className="w-5 h-5 text-cyan-400 shrink-0" />
                  <input
                    type="text"
                    data-autofocus
                    placeholder="Type a command, action, or tool..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedIndex(0);
                    }}
                    className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
                    aria-label="Command search"
                    role="combobox"
                    aria-expanded={true}
                    aria-controls="command-listbox"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-zinc-400 hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <kbd className="text-[10px] font-mono bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-700">
                    ESC
                  </kbd>
                </div>

                {/* Commands list */}
                <div id="command-listbox" role="listbox" className="max-h-72 overflow-y-auto p-2 space-y-1">
                  {filteredCommands.length === 0 ? (
                    <div className="py-8 text-center text-xs text-zinc-400">
                      No matching commands found for &ldquo;{searchQuery}&rdquo;
                    </div>
                  ) : (
                    filteredCommands.map((cmd, idx) => {
                      const Icon = cmd.icon;
                      const isSelected = selectedIndex === idx;
                      return (
                        <div
                          key={cmd.id}
                          role="option"
                          aria-selected={isSelected}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          onClick={() => handleExecute(cmd)}
                          className={`w-full px-3 py-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-cyan-500/20 text-white border border-cyan-500/40 shadow-sm'
                              : 'text-zinc-300 hover:bg-white/10 hover:text-white border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-cyan-500 text-black' : 'bg-zinc-800 text-zinc-300'}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className="font-medium">{cmd.title}</p>
                              <p className="text-[10px] text-zinc-400">{cmd.category}</p>
                            </div>
                          </div>
                          <kbd className="text-[10px] font-mono bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700 text-zinc-400">
                            {cmd.hotkey}
                          </kbd>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer bar */}
                <div className="px-4 py-2 border-t border-white/10 bg-black/40 text-[11px] text-zinc-400 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span><kbd className="bg-zinc-800 px-1 rounded text-[9px]">↑</kbd> <kbd className="bg-zinc-800 px-1 rounded text-[9px]">↓</kbd> Navigate</span>
                    <span><kbd className="bg-zinc-800 px-1 rounded text-[9px]">↵</kbd> Select</span>
                  </div>
                  <span className="font-mono text-cyan-400">{filteredCommands.length} actions</span>
                </div>
              </FocusTrap>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// 4. ACCESSIBLE SEMANTIC TABS
// -------------------------------------------------------------
export function TabsDemo({
  visualTheme = 'glass',
}: {
  visualTheme?: OverlayVisualTheme;
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const tabsList = [
    { id: 'overview', label: 'Architecture', icon: Compass },
    { id: 'telemetry', label: 'Live Telemetry', icon: Activity },
    { id: 'security', label: 'Security Engine', icon: Shield },
    { id: 'logs', label: 'System Logs', icon: Terminal },
  ];

  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    playSound('SWITCH');
    triggerHaptic('light');
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = tabsList[(index + 1) % tabsList.length];
      handleTabChange(next.id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = tabsList[(index - 1 + tabsList.length) % tabsList.length];
      handleTabChange(prev.id);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Tab List */}
      <div
        role="tablist"
        aria-label="System Metrics Modules"
        className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-2xl w-fit"
      >
        {tabsList.map((tab, idx) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                isSelected
                  ? 'bg-cyan-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-zinc-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="relative min-h-32">
        {tabsList.map((tab) => {
          if (activeTab !== tab.id) return null;
          return (
            <motion.div
              key={tab.id}
              role="tabpanel"
              id={`tabpanel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-xs text-zinc-300 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-sm">{tab.label} Panel</span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">Active State</span>
              </div>
              <p className="text-zinc-400">
                Detailed real-time data visualizer and configuration controls for {tab.label}. Fully responsive and accessible via keyboard Arrow Left/Right keys.
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. ANIMATED TABS (MORPHING PILL & UNDERLINE)
// -------------------------------------------------------------
export function AnimatedTabsDemo() {
  const [activeTab, setActiveTab] = useState('deployment');
  const tabs = [
    { id: 'deployment', label: 'Deployments', count: '12' },
    { id: 'containers', label: 'Containers', count: '4' },
    { id: 'networking', label: 'Networking', count: '8' },
    { id: 'storage', label: 'Persistent Vol', count: '2' },
  ];

  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl relative">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                playSound('SWITCH');
                triggerHaptic('light');
              }}
              className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-colors z-10 flex items-center gap-2 ${
                isSelected ? 'text-cyan-300' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-cyan-500/30 text-cyan-200' : 'bg-zinc-800 text-zinc-500'}`}>
                {tab.count}
              </span>

              {/* Fluid LayoutId Pill Underlay */}
              {isSelected && (
                <motion.div
                  layoutId="animated-tab-pill"
                  className="absolute inset-0 bg-cyan-500/15 border border-cyan-400/40 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)] -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-300">
        <p className="font-semibold text-white mb-1">Morphing Indicator Active</p>
        <p className="text-zinc-400 text-xs">
          Demonstrates high-performance spring layout interpolation using hardware accelerated GPU transforms without canvas repaints.
        </p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. CENTERED MODAL WINDOW
// -------------------------------------------------------------
export function ModalDemo({
  visualTheme = 'glass',
  interactionModel = 'spring',
}: {
  visualTheme?: OverlayVisualTheme;
  interactionModel?: InteractionModel;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [keyName, setKeyName] = useState('production-read-worker');
  const [isGenerated, setIsGenerated] = useState(false);

  const { openOverlay, closeOverlay } = useOverlay();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const themeClasses = getVisualThemeClasses(visualTheme);
  const variants = getMotionVariants(interactionModel);

  const handleOpen = () => {
    setIsOpen(true);
    setIsGenerated(false);
    openOverlay({
      id: 'demo-modal',
      type: 'modal',
      title: 'Provision Access Token Modal',
      interactionModel,
      visualStyle: visualTheme,
      preventScroll: true,
      onClose: () => setIsOpen(false),
    });
    playSound('OPEN');
    triggerHaptic('medium');
  };

  const handleClose = () => {
    setIsOpen(false);
    closeOverlay('demo-modal');
    playSound('CLOSE');
  };

  const handleCreate = () => {
    setIsGenerated(true);
    playSound('SUCCESS');
    triggerHaptic('success');
  };

  return (
    <div>
      <button
        type="button"
        id="modal-trigger-btn"
        onClick={handleOpen}
        className="px-4 py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
      >
        <Lock className="w-4 h-4" />
        <span>Open Centered Modal</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className={`fixed inset-0 ${themeClasses.backdrop}`}
            />

            {/* Modal Box */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`relative w-full max-w-lg rounded-3xl p-6 z-10 shadow-2xl ${themeClasses.surface} ${themeClasses.border}`}
            >
              <FocusTrap active={isOpen} onEscape={handleClose}>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 id="modal-title" className="text-base font-bold text-white">
                        Generate Scoped API Key
                      </h3>
                      <p id="modal-desc" className="text-xs text-zinc-400">
                        Create a cryptographic secret for automated backend ingress.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="py-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Key Identifier
                    </label>
                    <input
                      type="text"
                      data-autofocus
                      value={keyName}
                      onChange={(e) => setKeyName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-xs space-y-2">
                    <div className="flex items-center justify-between text-zinc-300">
                      <span className="font-semibold">Security Clearance</span>
                      <span className="text-emerald-400 font-mono">ROLE_ADMIN_READ</span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-400">
                      <span>Rate Limit</span>
                      <span className="font-mono">10,000 req/min</span>
                    </div>
                  </div>

                  {isGenerated && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center justify-between font-mono"
                    >
                      <span>sk_live_9f829d...38b1</span>
                      <span className="text-[10px] bg-emerald-500 text-black font-bold px-2 py-0.5 rounded">Active</span>
                    </motion.div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    Dismiss
                  </button>
                  <button
                    type="button"
                    onClick={handleCreate}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-black hover:bg-cyan-400 transition-all shadow-md active:scale-95"
                  >
                    {isGenerated ? 'Done' : 'Provision Key'}
                  </button>
                </div>
              </FocusTrap>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// 7. CONFIRMATION & ALERT DIALOG
// -------------------------------------------------------------
export function AlertDialogDemo({
  visualTheme = 'glass',
  interactionModel = 'scale',
}: {
  visualTheme?: OverlayVisualTheme;
  interactionModel?: InteractionModel;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const { openOverlay, closeOverlay } = useOverlay();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const themeClasses = getVisualThemeClasses(visualTheme);
  const variants = getMotionVariants(interactionModel);

  const handleOpen = () => {
    setIsOpen(true);
    setConfirmed(false);
    openOverlay({
      id: 'demo-alert-dialog',
      type: 'dialog',
      title: 'Destructive Cluster Purge Confirmation',
      interactionModel,
      visualStyle: visualTheme,
      preventScroll: true,
      ariaRole: 'alertdialog',
      onClose: () => setIsOpen(false),
    });
    playSound('ALERT');
    triggerHaptic('warning');
  };

  const handleConfirm = () => {
    setConfirmed(true);
    setIsOpen(false);
    closeOverlay('demo-alert-dialog');
    playSound('SUCCESS');
    triggerHaptic('success');
  };

  return (
    <div>
      <button
        type="button"
        id="alert-dialog-trigger-btn"
        onClick={handleOpen}
        className="px-4 py-2.5 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
      >
        <AlertTriangle className="w-4 h-4 text-red-400" />
        <span>Trigger Destructive Dialog</span>
      </button>

      {confirmed && (
        <p className="mt-2 text-xs font-mono text-red-400 flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" /> Cluster decommission pipeline initialized.
        </p>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsOpen(false); closeOverlay('demo-alert-dialog'); }}
              className={`fixed inset-0 ${themeClasses.backdrop}`}
            />

            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="alert-title"
              aria-describedby="alert-desc"
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`relative w-full max-w-md rounded-3xl p-6 z-10 shadow-2xl border-red-500/40 ${themeClasses.surface} ${themeClasses.border}`}
            >
              <FocusTrap active={isOpen} onEscape={() => { setIsOpen(false); closeOverlay('demo-alert-dialog'); }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 shrink-0">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 id="alert-title" className="text-base font-bold text-white">
                      Decommission Database Cluster?
                    </h3>
                    <p id="alert-desc" className="text-xs text-zinc-400 mt-1">
                      This action will immediately tear down all 16 compute shards and wipe persistent volumes. This operation cannot be reversed.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                  {/* Default focus on non-destructive Cancel button */}
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => { setIsOpen(false); closeOverlay('demo-alert-dialog'); }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  >
                    Cancel Action
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 text-white hover:bg-red-500 transition-all shadow-lg active:scale-95"
                  >
                    Confirm Decommission
                  </button>
                </div>
              </FocusTrap>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// 8. SIDE DRAWER PANEL
// -------------------------------------------------------------
export function DrawerDemo({
  visualTheme = 'glass',
  interactionModel = 'slide',
}: {
  visualTheme?: OverlayVisualTheme;
  interactionModel?: InteractionModel;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { openOverlay, closeOverlay } = useOverlay();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const themeClasses = getVisualThemeClasses(visualTheme);

  const handleOpen = () => {
    setIsOpen(true);
    openOverlay({
      id: 'demo-drawer',
      type: 'drawer',
      title: 'Resource Drawer Panel',
      interactionModel,
      visualStyle: visualTheme,
      preventScroll: true,
      onClose: () => setIsOpen(false),
    });
    playSound('OPEN');
    triggerHaptic('medium');
  };

  const handleClose = () => {
    setIsOpen(false);
    closeOverlay('demo-drawer');
    playSound('CLOSE');
  };

  return (
    <div>
      <button
        type="button"
        id="drawer-trigger-btn"
        onClick={handleOpen}
        className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900/90 text-zinc-200 hover:bg-zinc-800 font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
      >
        <Layers className="w-4 h-4 text-purple-400" />
        <span>Open Side Drawer (Right)</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className={`fixed inset-0 ${themeClasses.backdrop}`}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Side Drawer Inspector"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className={`relative w-full max-w-md h-full p-6 z-10 flex flex-col justify-between shadow-2xl ${themeClasses.surface} ${themeClasses.border}`}
            >
              <FocusTrap active={isOpen} onEscape={handleClose}>
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-5 h-5 text-purple-400" />
                      <h3 className="text-base font-bold text-white">Cluster Resource Drawer</h3>
                    </div>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="py-6 space-y-4 text-xs text-zinc-300">
                    <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white">Kubernetes Pod Status</span>
                        <span className="text-emerald-400 font-mono">Running (3/3)</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full w-3/4 rounded-full" />
                      </div>
                      <span className="text-[11px] text-zinc-400">75% Memory Allocation Utilization</span>
                    </div>

                    <div className="space-y-2">
                      <span className="font-semibold text-white block">Active Edge Gateways</span>
                      {['gateway-us-east-1', 'gateway-eu-central-1', 'gateway-ap-southeast-1'].map((gw, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 font-mono text-[11px]">
                          <span className="text-zinc-300">{gw}</span>
                          <span className="text-cyan-400">99.99% SLA</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                  >
                    Close Drawer
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playSound('SUCCESS');
                      triggerHaptic('success');
                      handleClose();
                    }}
                    className="px-4 py-2 text-xs font-bold bg-purple-600 text-white rounded-xl hover:bg-purple-500"
                  >
                    Save Changes
                  </button>
                </div>
              </FocusTrap>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// 9. SIDE SHEET COMPONENT
// -------------------------------------------------------------
export function SideSheetDemo({
  visualTheme = 'glass',
}: {
  visualTheme?: OverlayVisualTheme;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<'stream' | 'env' | 'audit'>('stream');

  const { openOverlay, closeOverlay } = useOverlay();
  const { playSound } = useSound();
  const themeClasses = getVisualThemeClasses(visualTheme);

  const handleOpen = () => {
    setIsOpen(true);
    openOverlay({
      id: 'demo-side-sheet',
      type: 'sidesheet',
      title: 'Workspace Side Sheet',
      preventScroll: true,
      onClose: () => setIsOpen(false),
    });
    playSound('OPEN');
  };

  return (
    <div>
      <button
        type="button"
        id="side-sheet-trigger-btn"
        onClick={handleOpen}
        className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900/90 text-zinc-200 hover:bg-zinc-800 font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
      >
        <Terminal className="w-4 h-4 text-emerald-400" />
        <span>Open Side Sheet (Logs)</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsOpen(false); closeOverlay('demo-side-sheet'); }}
              className={`fixed inset-0 ${themeClasses.backdrop}`}
            />

            <motion.div
              role="complementary"
              aria-label="Logs Side Sheet"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full max-w-lg h-full p-6 z-10 flex flex-col justify-between shadow-2xl ${themeClasses.surface} ${themeClasses.border}`}
            >
              <FocusTrap active={isOpen} onEscape={() => { setIsOpen(false); closeOverlay('demo-side-sheet'); }}>
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-base font-bold text-white">Live Stream Side Sheet</h3>
                      <p className="text-xs text-zinc-400">Contextual multi-stage debug inspector</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setIsOpen(false); closeOverlay('demo-side-sheet'); }}
                      className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 my-4 border-b border-white/10 pb-2">
                    {(['stream', 'env', 'audit'] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => { setStage(st); playSound('SWITCH'); }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${
                          stage === st ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-black/80 rounded-2xl border border-zinc-800 font-mono text-[11px] text-zinc-300 space-y-1.5 max-h-80 overflow-y-auto">
                    <p className="text-zinc-500">[2026-08-27 19:58:01] Booting V8 worker sandbox...</p>
                    <p className="text-emerald-400">[2026-08-27 19:58:02] Connected to Postgres pool (10/10 active)</p>
                    <p className="text-cyan-400">[2026-08-27 19:58:03] Gemini 2.5 API token client initialized</p>
                    <p className="text-zinc-400">[2026-08-27 19:58:04] Ingress health probe returned 200 OK</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => { setIsOpen(false); closeOverlay('demo-side-sheet'); }}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-white"
                  >
                    Done Inspecting
                  </button>
                </div>
              </FocusTrap>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// 10. DRAG-TO-DISMISS BOTTOM SHEET
// -------------------------------------------------------------
export function BottomSheetDemo({
  visualTheme = 'glass',
}: {
  visualTheme?: OverlayVisualTheme;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { openOverlay, closeOverlay } = useOverlay();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const themeClasses = getVisualThemeClasses(visualTheme);

  const handleOpen = () => {
    setIsOpen(true);
    openOverlay({
      id: 'demo-bottom-sheet',
      type: 'bottomsheet',
      title: 'Mobile Queue Bottom Sheet',
      preventScroll: true,
      onClose: () => setIsOpen(false),
    });
    playSound('OPEN');
    triggerHaptic('medium');
  };

  return (
    <div>
      <button
        type="button"
        id="bottom-sheet-trigger-btn"
        onClick={handleOpen}
        className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900/90 text-zinc-200 hover:bg-zinc-800 font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
      >
        <ChevronDown className="w-4 h-4 text-cyan-400 rotate-180" />
        <span>Open Bottom Sheet</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsOpen(false); closeOverlay('demo-bottom-sheet'); }}
              className={`fixed inset-0 ${themeClasses.backdrop}`}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Bottom Sheet"
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100 || info.velocity.y > 500) {
                  setIsOpen(false);
                  closeOverlay('demo-bottom-sheet');
                  playSound('CLOSE');
                }
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className={`relative w-full max-w-lg rounded-t-3xl p-6 z-10 shadow-2xl border-t ${themeClasses.surface} ${themeClasses.border}`}
            >
              <FocusTrap active={isOpen} onEscape={() => { setIsOpen(false); closeOverlay('demo-bottom-sheet'); }}>
                {/* Drag Handle */}
                <div className="w-12 h-1.5 rounded-full bg-zinc-600 mx-auto mb-4 cursor-grab active:cursor-grabbing" />

                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="text-base font-bold text-white">Audio & Playback Queue</h3>
                  <button
                    type="button"
                    onClick={() => { setIsOpen(false); closeOverlay('demo-bottom-sheet'); }}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-4 space-y-2.5">
                  {['01. Ambient Sine Synthesis (Procedural)', '02. Glass Refraction Soundscapes', '03. Mechanical Tactile Clicks'].map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between text-xs text-zinc-200">
                      <div className="flex items-center gap-2.5">
                        <Play className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono">03:42</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => { setIsOpen(false); closeOverlay('demo-bottom-sheet'); }}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-black hover:bg-cyan-400"
                >
                  Dismiss Queue
                </button>
              </FocusTrap>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// 11. ANCHOR-POSITIONED POPOVER CARD
// -------------------------------------------------------------
export function PopoverDemo({
  visualTheme = 'glass',
}: {
  visualTheme?: OverlayVisualTheme;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All Traffic');

  const { openOverlay, closeOverlay } = useOverlay();
  const { playSound } = useSound();
  const themeClasses = getVisualThemeClasses(visualTheme);

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      closeOverlay('demo-popover');
    } else {
      setIsOpen(true);
      openOverlay({
        id: 'demo-popover',
        type: 'popover',
        title: 'Filter Metrics Popover',
        preventScroll: false,
        onClose: () => setIsOpen(false),
      });
      playSound('OPEN');
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        id="popover-trigger-btn"
        onClick={handleToggle}
        className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900/90 text-zinc-200 hover:bg-zinc-800 font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
      >
        <Sliders className="w-4 h-4 text-yellow-400" />
        <span>Filter: {selectedFilter}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Filter configuration"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            className={`absolute left-0 mt-2 w-64 rounded-2xl p-4 z-50 ${themeClasses.surface} ${themeClasses.border}`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
              <span className="text-xs font-bold text-white">Filter Parameters</span>
              <button type="button" onClick={handleToggle} className="text-zinc-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              {['All Traffic', 'Authenticated Users Only', 'Bot & Crawler Traffic', 'Error 5xx Spikes'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(opt);
                    setIsOpen(false);
                    closeOverlay('demo-popover');
                    playSound('SUCCESS');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    selectedFilter === opt ? 'bg-yellow-500/20 text-yellow-300 font-semibold' : 'text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  <span>{opt}</span>
                  {selectedFilter === opt && <Check className="w-3 h-3 text-yellow-400" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// 12. ACCESSIBLE TOOLTIP BADGE
// -------------------------------------------------------------
export function TooltipDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), 150);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        id="tooltip-trigger-btn"
        aria-describedby={isVisible ? 'demo-tooltip-badge' : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900/90 text-zinc-200 hover:bg-zinc-800 font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
      >
        <Info className="w-4 h-4 text-cyan-400" />
        <span>Hover for Accessible Tooltip</span>
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            id="demo-tooltip-badge"
            role="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-700 text-zinc-200 text-xs shadow-xl whitespace-nowrap z-50 flex items-center gap-2"
          >
            <span>SHA-256 Signature Verified</span>
            <kbd className="text-[10px] font-mono bg-zinc-800 px-1.5 py-0.5 rounded text-cyan-400 border border-zinc-700">
              ⌘V
            </kbd>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// 13. GUIDED WALKTHROUGH SPOTLIGHT
// -------------------------------------------------------------
export function SpotlightTourDemo() {
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const { openOverlay, closeOverlay } = useOverlay();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const steps = [
    { title: 'Step 1: Stacking Pipeline', desc: 'Manage z-index layers with deterministic LIFO escape resolution.' },
    { title: 'Step 2: Focus Containment', desc: 'Focus is strictly trapped within the active modal boundary.' },
    { title: 'Step 3: Screen Reader Matrix', desc: 'Automatic ARIA live region alerts dispatch upon every layer state change.' },
  ];

  const handleStart = () => {
    setCurrentStep(0);
    openOverlay({
      id: 'demo-spotlight-tour',
      type: 'spotlight',
      title: 'Guided Onboarding Spotlight',
      preventScroll: true,
      onClose: () => setCurrentStep(null),
    });
    playSound('OPEN');
    triggerHaptic('medium');
  };

  const handleNext = () => {
    if (currentStep === null) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      playSound('SWITCH');
      triggerHaptic('selection');
    } else {
      setCurrentStep(null);
      closeOverlay('demo-spotlight-tour');
      playSound('SUCCESS');
      triggerHaptic('success');
    }
  };

  return (
    <div>
      <button
        type="button"
        id="spotlight-trigger-btn"
        onClick={handleStart}
        className="px-4 py-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
      >
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Launch Guided Spotlight Tour</span>
      </button>

      <AnimatePresence>
        {currentStep !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Cinematic dark mask */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setCurrentStep(null); closeOverlay('demo-spotlight-tour'); }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Spotlight Card */}
            <motion.div
              key={currentStep}
              role="dialog"
              aria-label="Walkthrough Tour"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md p-6 rounded-3xl bg-zinc-900 border-2 border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.3)] z-10"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                  Tour Step {currentStep + 1} of {steps.length}
                </span>
                <button
                  type="button"
                  onClick={() => { setCurrentStep(null); closeOverlay('demo-spotlight-tour'); }}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4">
                <h4 className="text-base font-bold text-white mb-1.5">{steps[currentStep].title}</h4>
                <p className="text-xs text-zinc-300">{steps[currentStep].desc}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => { setCurrentStep(null); closeOverlay('demo-spotlight-tour'); }}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Skip Tour
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-black hover:bg-amber-300 flex items-center gap-1.5"
                >
                  <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next Milestone'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// 14. REFRACTIVE MEDIA LIGHTBOX
// -------------------------------------------------------------
export function LightboxDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const { openOverlay, closeOverlay } = useOverlay();
  const { playSound } = useSound();

  const handleOpen = () => {
    setIsOpen(true);
    setZoomLevel(1);
    openOverlay({
      id: 'demo-lightbox',
      type: 'lightbox',
      title: 'Media Lightbox Inspection',
      preventScroll: true,
      onClose: () => setIsOpen(false),
    });
    playSound('OPEN');
  };

  return (
    <div>
      <button
        type="button"
        id="lightbox-trigger-btn"
        onClick={handleOpen}
        className="px-4 py-2.5 rounded-xl border border-zinc-700 bg-zinc-900/90 text-zinc-200 hover:bg-zinc-800 font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
      >
        <Maximize2 className="w-4 h-4 text-cyan-400" />
        <span>Open Media Lightbox</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsOpen(false); closeOverlay('demo-lightbox'); }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl"
            />

            <motion.div
              role="dialog"
              aria-label="Image viewer"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 max-w-2xl w-full flex flex-col items-center gap-4"
            >
              {/* Media Container */}
              <div className="w-full h-80 rounded-3xl bg-zinc-900 border border-zinc-700 overflow-hidden flex items-center justify-center relative shadow-2xl">
                <div
                  style={{ transform: `scale(${zoomLevel})` }}
                  className="transition-transform duration-200 flex flex-col items-center justify-center text-center p-6"
                >
                  <Cpu className="w-16 h-16 text-cyan-400 mb-3 animate-pulse" />
                  <p className="text-sm font-bold text-white">Neural Processing Core Layout</p>
                  <p className="text-xs text-zinc-400 font-mono">EXIF: 4096x2160 • HDR10 • Color Space: DCI-P3</p>
                </div>

                {/* Floating zoom HUD */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/20">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                    className="p-1.5 rounded-lg text-zinc-300 hover:text-white"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-cyan-400 px-2">{Math.round(zoomLevel * 100)}%</span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(2, z + 0.25))}
                    className="p-1.5 rounded-lg text-zinc-300 hover:text-white"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => { setIsOpen(false); closeOverlay('demo-lightbox'); }}
                className="px-6 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white border border-zinc-600"
              >
                Close Lightbox (ESC)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// 15. FLOATING PROPERTY INSPECTOR HUD
// -------------------------------------------------------------
export function PropertyInspectorDemo({
  visualTheme = 'glass',
}: {
  visualTheme?: OverlayVisualTheme;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeProperty, setActiveProperty] = useState('contrast');

  const { openOverlay, closeOverlay } = useOverlay();
  const { playSound } = useSound();
  const themeClasses = getVisualThemeClasses(visualTheme);

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
      closeOverlay('demo-inspector');
    } else {
      setIsOpen(true);
      openOverlay({
        id: 'demo-inspector',
        type: 'inspector',
        title: 'Floating Property Inspector',
        preventScroll: false,
        onClose: () => setIsOpen(false),
      });
      playSound('OPEN');
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        id="inspector-trigger-btn"
        onClick={handleToggle}
        className="px-4 py-2.5 rounded-xl border border-cyan-500/40 bg-zinc-900 text-cyan-300 hover:bg-zinc-800 font-medium text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
      >
        <Sliders className="w-4 h-4 text-cyan-400" />
        <span>{isOpen ? 'Close Property Inspector' : 'Spawn Floating Inspector'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Floating Property Inspector"
            drag
            dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed top-32 right-8 w-72 rounded-2xl p-4 z-40 cursor-move ${themeClasses.surface} ${themeClasses.border}`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-bold text-white">Live HUD Inspector</span>
              </div>
              <button
                type="button"
                onClick={handleToggle}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase font-mono">Contrast Ratio</span>
                <div className="p-2 rounded-xl bg-black/60 border border-zinc-800 text-emerald-400 font-mono flex justify-between">
                  <span>WCAG Score</span>
                  <span className="font-bold">14.8:1 (AAA)</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 uppercase font-mono">Z-Index Stacking Order</span>
                <div className="p-2 rounded-xl bg-black/60 border border-zinc-800 text-cyan-400 font-mono flex justify-between">
                  <span>Layer Tier</span>
                  <span className="font-bold">z-40 (Floating)</span>
                </div>
              </div>

              <p className="text-[10px] text-zinc-400 italic">Drag titlebar to freely reposition anywhere on screen.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
