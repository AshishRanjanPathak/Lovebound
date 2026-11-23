import { create } from 'zustand';
import { GameView } from '../types/game';
import { DialogueSequence } from '../types/dialogue';
import { audioService } from '../services/audioService';

export type OverlayType = 
  | 'save-selection'
  | 'settings'
  | 'controls'
  | 'credits'
  | 'pause'
  | 'inventory'
  | 'map'
  | 'dialogue'
  | 'game-over'
  | 'mission-complete'
  | 'asset-report'
  | null;

interface UIStoreState {
  view: GameView;
  currentOverlay: OverlayType;
  overlayStack: OverlayType[];
  activeDialogue: DialogueSequence | null;
  activeDialogueIndex: number;
  isMobile: boolean;
  isPortrait: boolean;

  // Actions
  setView: (view: GameView) => void;
  openOverlay: (overlay: NonNullable<OverlayType>) => void;
  closeOverlay: () => void;
  closeAllOverlays: () => void;
  setDialogue: (dialogue: DialogueSequence | null) => void;
  nextDialogue: () => boolean; // returns false if dialogue ended
  setIsMobile: (isMobile: boolean) => void;
  setIsPortrait: (isPortrait: boolean) => void;
}

export const useUIStore = create<UIStoreState>((set, get) => ({
  view: 'splash',
  currentOverlay: null,
  overlayStack: [],
  activeDialogue: null,
  activeDialogueIndex: 0,
  isMobile: false,
  isPortrait: false,

  setView: (view) => {
    set({ view, currentOverlay: null, overlayStack: [] });
    if (view === 'main-menu') {
      audioService.playMusic('menu');
    } else if (view === 'gameplay') {
      audioService.playMusic('gremlin-woods');
    } else {
      audioService.stopMusic();
    }
  },

  openOverlay: (overlay) => {
    audioService.playSound('menu-open');
    set(state => ({
      currentOverlay: overlay,
      overlayStack: state.currentOverlay ? [...state.overlayStack, state.currentOverlay] : state.overlayStack,
    }));
  },

  closeOverlay: () => {
    audioService.playSound('menu-close');
    set(state => {
      const prevStack = [...state.overlayStack];
      const prevOverlay = prevStack.pop() || null;
      return {
        currentOverlay: prevOverlay,
        overlayStack: prevStack,
      };
    });
  },

  closeAllOverlays: () => {
    audioService.playSound('menu-close');
    set({ currentOverlay: null, overlayStack: [] });
  },

  setDialogue: (dialogue) => {
    set({
      activeDialogue: dialogue,
      activeDialogueIndex: 0,
      currentOverlay: dialogue ? 'dialogue' : null,
    });
  },

  nextDialogue: () => {
    const { activeDialogue, activeDialogueIndex } = get();
    if (!activeDialogue) return false;

    if (activeDialogueIndex + 1 < activeDialogue.nodes.length) {
      set({ activeDialogueIndex: activeDialogueIndex + 1 });
      return true;
    } else {
      set({ activeDialogue: null, activeDialogueIndex: 0, currentOverlay: null });
      return false;
    }
  },

  setIsMobile: (isMobile) => set({ isMobile }),
  setIsPortrait: (isPortrait) => set({ isPortrait }),
}));
