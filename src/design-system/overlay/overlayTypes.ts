/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type OverlayType =
  | 'dropdown'
  | 'contextmenu'
  | 'commandpalette'
  | 'tabs'
  | 'animatedtabs'
  | 'modal'
  | 'dialog'
  | 'drawer'
  | 'sidesheet'
  | 'bottomsheet'
  | 'popover'
  | 'tooltip'
  | 'spotlight'
  | 'lightbox'
  | 'inspector';

export type InteractionModel =
  | 'fade'
  | 'slide'
  | 'spring'
  | 'morph'
  | 'portal'
  | 'scale'
  | 'spatial'
  | 'liquid'
  | 'glass'
  | 'cinematic'
  | 'mechanical';

export type OverlayVisualTheme =
  | 'glass'
  | 'cyberpunk'
  | 'minimalist'
  | 'brutalist'
  | 'ambient';

export interface OverlayItem {
  id: string;
  type: OverlayType;
  title: string;
  zIndex: number;
  interactionModel: InteractionModel;
  visualStyle: OverlayVisualTheme;
  dismissOnEscape?: boolean;
  dismissOnOutsideClick?: boolean;
  preventScroll?: boolean;
  trapFocus?: boolean;
  ariaRole?: string;
  createdAt: number;
  restoreFocusElement?: HTMLElement | null;
  onClose?: () => void;
}

export interface InteractionModelInfo {
  id: InteractionModel;
  name: string;
  description: string;
  physicsTag: string;
  curve: string;
  recommendedUse: string;
}
