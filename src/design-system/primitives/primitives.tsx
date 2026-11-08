/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode, HTMLAttributes } from 'react';
import { useTheme } from '../tokens/ThemeContext';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
  className?: string;
}

export function Container({ children, maxWidth = 'xl', padding = true, className = '', ...props }: ContainerProps) {
  const maxWidthClass = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  }[maxWidth];

  return (
    <div className={`w-full ${maxWidthClass} mx-auto ${padding ? 'px-4 md:px-8' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: 'row' | 'col';
  spacing?: number;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'between';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  className?: string;
}

export function Stack({
  children,
  direction = 'col',
  spacing = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
  ...props
}: StackProps) {
  const alignClass = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    between: 'items-center',
  }[align];

  const justifyClass = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }[justify];

  const gapClass = `gap-${spacing}`;

  return (
    <div
      className={`flex ${direction === 'row' ? 'flex-row' : 'flex-col'} ${gapClass} ${alignClass} ${justifyClass} ${
        wrap ? 'flex-wrap' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: number;
  className?: string;
}

export function Grid({ children, cols = 3, gap = 6, className = '', ...props }: GridProps) {
  const colsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12',
  }[cols];

  return (
    <div className={`grid ${colsClass} gap-${gap} ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function Flex({ children, className = '', ...props }: FlexProps) {
  return (
    <div className={`flex items-center ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface LayerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  elevation?: 'flat' | 'raised' | 'overlay' | 'modal';
  className?: string;
}

export function Layer({ children, elevation = 'raised', className = '', ...props }: LayerProps) {
  const { theme } = useTheme();
  const shadowClass =
    elevation === 'modal'
      ? theme.shadow.deep
      : elevation === 'overlay'
      ? theme.shadow.soft
      : elevation === 'raised'
      ? 'shadow-sm'
      : '';

  return (
    <div className={`${theme.surface.primary} border ${theme.border.default} ${shadowClass} rounded-2xl p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'elevated';
  className?: string;
}

export function Surface({ children, variant = 'primary', className = '', ...props }: SurfaceProps) {
  const { theme } = useTheme();
  const bgClass =
    variant === 'elevated'
      ? theme.surface.elevated
      : variant === 'secondary'
      ? theme.surface.secondary
      : theme.surface.primary;

  return (
    <div className={`${bgClass} border ${theme.border.default} rounded-2xl p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface GlassSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function GlassSurface({ children, className = '', ...props }: GlassSurfaceProps) {
  return (
    <div className={`bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface GlowSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export function GlowSurface({ children, className = '', ...props }: GlowSurfaceProps) {
  const { theme } = useTheme();
  return (
    <div className={`${theme.surface.primary} border ${theme.border.active} ${theme.shadow.glowPrimary} rounded-2xl p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Divider({ className = '' }: { className?: string }) {
  const { theme } = useTheme();
  return <hr className={`w-full border-t ${theme.border.subtle} my-4 ${className}`} />;
}

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'muted';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  mono?: boolean;
  className?: string;
}

export function Text({ children, variant = 'primary', size = 'base', mono = false, className = '', ...props }: TextProps) {
  const { theme } = useTheme();
  const colorClass =
    variant === 'muted' ? theme.text.muted : variant === 'secondary' ? theme.text.secondary : theme.text.primary;
  const sizeClass = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }[size];

  return (
    <p className={`${colorClass} ${sizeClass} ${mono ? 'font-mono' : ''} leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}

export function Heading({ children, level = 1, className = '', ...props }: HeadingProps) {
  const { theme } = useTheme();
  const sizeClass = {
    1: 'text-3xl md:text-4xl font-bold tracking-tight',
    2: 'text-2xl font-bold tracking-tight',
    3: 'text-xl font-semibold',
    4: 'text-lg font-semibold',
  }[level];

  const style = { fontFamily: theme.typography.fontFamilyTitle };
  const combinedClassName = `${theme.text.primary} ${sizeClass} ${className}`;

  if (level === 1) return <h1 className={combinedClassName} style={style} {...props}>{children}</h1>;
  if (level === 2) return <h2 className={combinedClassName} style={style} {...props}>{children}</h2>;
  if (level === 3) return <h3 className={combinedClassName} style={style} {...props}>{children}</h3>;
  return <h4 className={combinedClassName} style={style} {...props}>{children}</h4>;
}

export function Badge({ children, variant = 'primary' }: { children: ReactNode; variant?: 'primary' | 'success' | 'warning' | 'error' }) {
  const { theme } = useTheme();
  const colorClass =
    variant === 'success'
      ? theme.state.success
      : variant === 'warning'
      ? theme.state.warning
      : variant === 'error'
      ? theme.state.error
      : theme.accent.primary;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/5 border ${theme.border.subtle} ${colorClass}`}>
      {children}
    </span>
  );
}

export function Status({ status, label }: { status: 'success' | 'warning' | 'error' | 'info'; label: string }) {
  const { theme } = useTheme();
  const dotColor =
    status === 'success' ? 'bg-emerald-400' : status === 'warning' ? 'bg-amber-400' : status === 'error' ? 'bg-rose-400' : 'bg-sky-400';

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-white/5 border ${theme.border.subtle}`}>
      <span className={`w-2 h-2 rounded-full ${dotColor} animate-pulse`} />
      <span className={theme.text.primary}>{label}</span>
    </div>
  );
}

export function FocusRing({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return <div className={`focus-within:${theme.focus.ring} rounded-xl transition-all`}>{children}</div>;
}

export function TooltipAnchor({ children, label }: { children: ReactNode; label: string }) {
  const { theme } = useTheme();
  return (
    <div className="relative group inline-block">
      {children}
      <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg text-xs font-mono ${theme.surface.elevated} border ${theme.border.default} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg`}>
        {label}
      </div>
    </div>
  );
}

export function Portal({ children }: { children: ReactNode }) {
  return <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">{children}</div>;
}

export function Scene({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { theme } = useTheme();
  return <div className={`min-h-screen ${theme.bg.canvas} ${theme.text.primary} p-6 md:p-12 space-y-8 ${className}`}>{children}</div>;
}

export function Environment({ children }: { children: ReactNode }) {
  const { theme } = useTheme();
  return <div className={`relative overflow-hidden p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} ${theme.shadow.deep}`}>{children}</div>;
}

export function DepthLayer({ children, depth = 1 }: { children: ReactNode; depth?: number }) {
  const shadow = depth === 2 ? 'shadow-2xl translate-y-[-4px]' : depth === 1 ? 'shadow-lg' : 'shadow-sm';
  return <div className={`transition-transform duration-300 ${shadow} rounded-2xl`}>{children}</div>;
}
