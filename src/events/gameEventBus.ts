import { HeroineState, CompanionState, CheckpointInfo } from '../types/game';

type EventCallback<T = any> = (data: T) => void;

export interface GameEvents {
  // UI -> Game
  'UI:PAUSE_GAME': void;
  'UI:RESUME_GAME': void;
  'UI:RESTART_CHECKPOINT': void;
  'UI:MOVE_INPUT': { direction: 'left' | 'right' | 'stop' };
  'UI:JUMP_INPUT': void;
  'UI:ATTACK_BASIC_INPUT': void;
  'UI:ATTACK_STAFF_INPUT': void;
  'UI:DODGE_INPUT': void;
  'UI:COMPANION_ABILITY_INPUT': void;
  'UI:DOMINANCE_ULTIMATE_INPUT': void;
  'UI:UPDATE_GRAPHICS_SETTINGS': { screenShake: boolean; particlesEnabled: boolean };

  // Game -> UI
  'GAME:SCENE_READY': { territoryId: string; checkpointId: string };
  'GAME:REQUEST_PAUSE': void;
  'GAME:HEROINE_UPDATED': Partial<HeroineState>;
  'GAME:COMPANION_UPDATED': Partial<CompanionState>;
  'GAME:DOMINANCE_UPDATED': number; // 0 to 100
  'GAME:CHECKPOINT_REACHED': CheckpointInfo;
  'GAME:DAMAGE_DEALT': { amount: number; isCrit: boolean; type: 'love' | 'dominance' | 'physical' };
  'GAME:GAME_OVER': { cause: string };
  'GAME:MISSION_COMPLETE': { territoryId: string; bossName: string; rewards: string[] };
}

class GameEventBus {
  private listeners: Map<keyof GameEvents, Set<EventCallback>> = new Map();

  public on<K extends keyof GameEvents>(event: K, callback: EventCallback<GameEvents[K]>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return un-subscribe function
    return () => {
      const set = this.listeners.get(event);
      if (set) {
        set.delete(callback);
      }
    };
  }

  public emit<K extends keyof GameEvents>(event: K, data: GameEvents[K]): void {
    const set = this.listeners.get(event);
    if (set) {
      set.forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`[GameEventBus] Error in listener for event ${event}:`, err);
        }
      });
    }
  }

  public clear(): void {
    this.listeners.clear();
  }
}

export const gameEventBus = new GameEventBus();
