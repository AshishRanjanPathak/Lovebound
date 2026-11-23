import { create } from 'zustand';
import { HeroineState, CompanionState, TerritoryId, CheckpointInfo } from '../types/game';
import { SaveData } from '../types/save';
import { saveService } from '../services/saveService';
import { gameEventBus } from '../events/gameEventBus';

interface GameStoreState {
  activeSlotId: number | null;
  activeSave: SaveData | null;
  currentTerritoryId: TerritoryId;
  currentTerritoryName: string;
  currentCheckpointId: string;
  currentCheckpointName: string;
  chapterName: string;
  playtimeSeconds: number;
  isPaused: boolean;

  heroine: HeroineState;
  companion: CompanionState;

  // Actions
  initializeSession: (slotId: number, save: SaveData) => void;
  setPaused: (paused: boolean) => void;
  updateHeroine: (partial: Partial<HeroineState>) => void;
  updateCompanion: (partial: Partial<CompanionState>) => void;
  addDominance: (amount: number) => void;
  consumeDominance: () => boolean;
  reachCheckpoint: (checkpoint: CheckpointInfo) => void;
  incrementPlaytime: () => void;
  saveCurrentProgress: () => Promise<void>;
  resetSession: () => void;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  activeSlotId: null,
  activeSave: null,
  currentTerritoryId: 'gremlin-woods',
  currentTerritoryName: 'Gremlin Woods',
  currentCheckpointId: 'whispering-grove',
  currentCheckpointName: 'Whispering Grove Ancient Shrine',
  chapterName: 'Prologue: Whispers in the Mist',
  playtimeSeconds: 0,
  isPaused: false,

  heroine: {
    name: 'Astraea',
    title: 'Maiden of the Staff of Love',
    level: 1,
    hp: 100,
    maxHp: 100,
    magic: 80,
    maxMagic: 80,
    dominanceMeter: 20,
    isDominanceMode: false,
    isAttacking: false,
    isDodging: false,
    facing: 'right',
    x: 200,
    y: 700,
  },

  companion: {
    name: 'Princess Elinore',
    title: 'Beloved Star of the Kingdom',
    affinity: 85,
    abilityReady: true,
    abilityCooldown: 0,
    maxAbilityCooldown: 12,
    statusText: 'Standing faithfully beside you',
    x: 140,
    y: 660,
  },

  initializeSession: (slotId, save) => {
    set({
      activeSlotId: slotId,
      activeSave: save,
      currentTerritoryId: save.territoryId,
      currentTerritoryName: save.territoryName,
      currentCheckpointId: save.checkpointId,
      currentCheckpointName: save.checkpointName,
      chapterName: save.chapter,
      playtimeSeconds: save.playtimeSeconds,
      isPaused: false,
      heroine: {
        name: save.heroineName,
        title: 'Maiden of the Staff of Love',
        level: save.heroineLevel,
        hp: save.currentHp,
        maxHp: save.maxHp,
        magic: save.currentMagic,
        maxMagic: save.maxMagic,
        dominanceMeter: save.dominanceMeter,
        isDominanceMode: false,
        isAttacking: false,
        isDodging: false,
        facing: 'right',
        x: 200,
        y: 700,
      },
    });
  },

  setPaused: (paused) => {
    set({ isPaused: paused });
    if (paused) {
      gameEventBus.emit('UI:PAUSE_GAME', undefined);
    } else {
      gameEventBus.emit('UI:RESUME_GAME', undefined);
    }
  },

  updateHeroine: (partial) => {
    set(state => ({
      heroine: { ...state.heroine, ...partial },
    }));
  },

  updateCompanion: (partial) => {
    set(state => ({
      companion: { ...state.companion, ...partial },
    }));
  },

  addDominance: (amount) => {
    set(state => {
      const next = Math.min(100, Math.max(0, state.heroine.dominanceMeter + amount));
      return {
        heroine: { ...state.heroine, dominanceMeter: next },
      };
    });
  },

  consumeDominance: () => {
    const current = get().heroine.dominanceMeter;
    if (current >= 100) {
      set(state => ({
        heroine: {
          ...state.heroine,
          dominanceMeter: 0,
          isDominanceMode: true,
        },
      }));
      // Dominance lasts for 10 seconds
      setTimeout(() => {
        set(state => ({
          heroine: { ...state.heroine, isDominanceMode: false },
        }));
      }, 10000);
      return true;
    }
    return false;
  },

  reachCheckpoint: (checkpoint) => {
    set({
      currentCheckpointId: checkpoint.id,
      currentCheckpointName: checkpoint.name,
      currentTerritoryId: checkpoint.territoryId,
    });
    get().saveCurrentProgress();
  },

  incrementPlaytime: () => {
    if (!get().isPaused) {
      set(state => ({ playtimeSeconds: state.playtimeSeconds + 1 }));
    }
  },

  saveCurrentProgress: async () => {
    const { activeSlotId, heroine, currentTerritoryId, currentTerritoryName, currentCheckpointId, currentCheckpointName, chapterName, playtimeSeconds } = get();
    if (activeSlotId === null) return;

    await saveService.updateSave(activeSlotId, {
      heroineLevel: heroine.level,
      currentHp: heroine.hp,
      maxHp: heroine.maxHp,
      currentMagic: heroine.magic,
      maxMagic: heroine.maxMagic,
      dominanceMeter: heroine.dominanceMeter,
      territoryId: currentTerritoryId,
      territoryName: currentTerritoryName,
      checkpointId: currentCheckpointId,
      checkpointName: currentCheckpointName,
      chapter: chapterName,
      playtimeSeconds,
    });
  },

  resetSession: () => {
    set({
      activeSlotId: null,
      activeSave: null,
      isPaused: false,
    });
  },
}));
