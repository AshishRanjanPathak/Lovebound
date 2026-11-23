export type TerritoryId = 'gremlin-woods' | 'enchanted-district' | 'greedlands';

export interface TerritoryInfo {
  id: TerritoryId;
  name: string;
  subtitle: string;
  description: string;
  bossName: string;
  bossTitle: string;
  status: 'unlocked' | 'current' | 'locked';
  recommendedLevel: number;
}

export interface CheckpointInfo {
  id: string;
  territoryId: TerritoryId;
  name: string;
  description: string;
  x: number;
  y: number;
  activated: boolean;
}

export interface HeroineState {
  name: string;
  title: string;
  level: number;
  hp: number;
  maxHp: number;
  magic: number;
  maxMagic: number;
  dominanceMeter: number; // 0 - 100
  isDominanceMode: boolean;
  isAttacking: boolean;
  isDodging: boolean;
  facing: 'left' | 'right';
  x: number;
  y: number;
}

export interface CompanionState {
  name: string;
  title: string;
  affinity: number; // 0 - 100
  abilityReady: boolean;
  abilityCooldown: number; // seconds remaining
  maxAbilityCooldown: number;
  statusText: string;
  x: number;
  y: number;
}

export type GameView = 
  | 'splash'
  | 'main-menu'
  | 'save-selection'
  | 'settings'
  | 'controls'
  | 'credits'
  | 'gameplay'
  | 'game-over'
  | 'mission-complete';
