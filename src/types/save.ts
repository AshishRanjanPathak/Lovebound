import { TerritoryId } from './game';

export interface SaveSlotMetadata {
  slotId: number; // 1, 2, 3
  exists: boolean;
  heroineName: string;
  heroineLevel: number;
  currentHp: number;
  maxHp: number;
  currentMagic: number;
  maxMagic: number;
  territoryId: TerritoryId;
  territoryName: string;
  checkpointId: string;
  checkpointName: string;
  chapter: string;
  playtimeSeconds: number;
  completionPercentage: number;
  lastPlayed: string; // ISO date string
  thumbnailUrl?: string;
}

export interface SaveData extends SaveSlotMetadata {
  dominanceMeter: number;
  equippedWeaponId: string;
  inventoryItemIds: string[];
  unlockedTerritories: TerritoryId[];
  activatedCheckpoints: string[];
  storyFlags: Record<string, boolean>;
  coins: number;
  shards: number;
}
