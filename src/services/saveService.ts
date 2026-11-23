import { openDB, IDBPDatabase } from 'idb';
import { SaveData, SaveSlotMetadata } from '../types/save';

const DB_NAME = 'lovebound_save_database';
const DB_VERSION = 1;
const STORE_NAME = 'save_slots';

const DEFAULT_SLOTS: SaveSlotMetadata[] = [
  {
    slotId: 1,
    exists: false,
    heroineName: 'Astraea',
    heroineLevel: 1,
    currentHp: 100,
    maxHp: 100,
    currentMagic: 80,
    maxMagic: 80,
    territoryId: 'gremlin-woods',
    territoryName: 'Gremlin Woods',
    checkpointId: 'whispering-grove',
    checkpointName: 'Whispering Grove Ancient Shrine',
    chapter: 'Prologue: Whispers in the Mist',
    playtimeSeconds: 0,
    completionPercentage: 0,
    lastPlayed: new Date().toISOString()
  },
  {
    slotId: 2,
    exists: false,
    heroineName: 'Astraea',
    heroineLevel: 1,
    currentHp: 100,
    maxHp: 100,
    currentMagic: 80,
    maxMagic: 80,
    territoryId: 'gremlin-woods',
    territoryName: 'Gremlin Woods',
    checkpointId: 'whispering-grove',
    checkpointName: 'Whispering Grove Ancient Shrine',
    chapter: 'Prologue: Whispers in the Mist',
    playtimeSeconds: 0,
    completionPercentage: 0,
    lastPlayed: new Date().toISOString()
  },
  {
    slotId: 3,
    exists: false,
    heroineName: 'Astraea',
    heroineLevel: 1,
    currentHp: 100,
    maxHp: 100,
    currentMagic: 80,
    maxMagic: 80,
    territoryId: 'gremlin-woods',
    territoryName: 'Gremlin Woods',
    checkpointId: 'whispering-grove',
    checkpointName: 'Whispering Grove Ancient Shrine',
    chapter: 'Prologue: Whispers in the Mist',
    playtimeSeconds: 0,
    completionPercentage: 0,
    lastPlayed: new Date().toISOString()
  }
];

class SaveService {
  private dbPromise: Promise<IDBPDatabase> | null = null;
  private memoryFallback: Map<number, SaveData> = new Map();

  private getDB(): Promise<IDBPDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'slotId' });
          }
        }
      }).catch(err => {
        console.warn('[SaveService] IndexedDB unavailable, falling back to memory/localStorage:', err);
        throw err;
      });
    }
    return this.dbPromise;
  }

  public async getSlotMetadataList(): Promise<SaveSlotMetadata[]> {
    try {
      const db = await this.getDB();
      const allSaves: SaveData[] = await db.getAll(STORE_NAME);

      return DEFAULT_SLOTS.map(defaultSlot => {
        const found = allSaves.find(s => s.slotId === defaultSlot.slotId);
        if (found) {
          return {
            slotId: found.slotId,
            exists: true,
            heroineName: found.heroineName,
            heroineLevel: found.heroineLevel,
            currentHp: found.currentHp,
            maxHp: found.maxHp,
            currentMagic: found.currentMagic,
            maxMagic: found.maxMagic,
            territoryId: found.territoryId,
            territoryName: found.territoryName,
            checkpointId: found.checkpointId,
            checkpointName: found.checkpointName,
            chapter: found.chapter,
            playtimeSeconds: found.playtimeSeconds,
            completionPercentage: found.completionPercentage,
            lastPlayed: found.lastPlayed,
            thumbnailUrl: found.thumbnailUrl
          };
        }
        return { ...defaultSlot };
      });
    } catch {
      // LocalStorage / Memory fallback
      return DEFAULT_SLOTS.map(defaultSlot => {
        const key = `lovebound_save_${defaultSlot.slotId}`;
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            const data: SaveData = JSON.parse(raw);
            return {
              slotId: data.slotId,
              exists: true,
              heroineName: data.heroineName,
              heroineLevel: data.heroineLevel,
              currentHp: data.currentHp,
              maxHp: data.maxHp,
              currentMagic: data.currentMagic,
              maxMagic: data.maxMagic,
              territoryId: data.territoryId,
              territoryName: data.territoryName,
              checkpointId: data.checkpointId,
              checkpointName: data.checkpointName,
              chapter: data.chapter,
              playtimeSeconds: data.playtimeSeconds,
              completionPercentage: data.completionPercentage,
              lastPlayed: data.lastPlayed
            };
          } catch {
            return defaultSlot;
          }
        }
        return defaultSlot;
      });
    }
  }

  public async getSave(slotId: number): Promise<SaveData | null> {
    try {
      const db = await this.getDB();
      const save = await db.get(STORE_NAME, slotId);
      return save || null;
    } catch {
      const key = `lovebound_save_${slotId}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          return JSON.parse(raw);
        } catch {
          return null;
        }
      }
      return this.memoryFallback.get(slotId) || null;
    }
  }

  public async createNewGame(slotId: number): Promise<SaveData> {
    const newSave: SaveData = {
      slotId,
      exists: true,
      heroineName: 'Astraea',
      heroineLevel: 1,
      currentHp: 100,
      maxHp: 100,
      currentMagic: 80,
      maxMagic: 80,
      dominanceMeter: 0,
      territoryId: 'gremlin-woods',
      territoryName: 'Gremlin Woods',
      checkpointId: 'whispering-grove',
      checkpointName: 'Whispering Grove Ancient Shrine',
      chapter: 'Prologue: Whispers in the Mist',
      playtimeSeconds: 0,
      completionPercentage: 5,
      lastPlayed: new Date().toISOString(),
      equippedWeaponId: 'staff-of-love',
      inventoryItemIds: ['staff-of-love', 'heart-potion-sm', 'princess-ribbon'],
      unlockedTerritories: ['gremlin-woods'],
      activatedCheckpoints: ['whispering-grove'],
      storyFlags: { intro_dialogue_seen: true },
      coins: 150,
      shards: 12
    };

    try {
      const db = await this.getDB();
      await db.put(STORE_NAME, newSave);
    } catch {
      localStorage.setItem(`lovebound_save_${slotId}`, JSON.stringify(newSave));
      this.memoryFallback.set(slotId, newSave);
    }

    return newSave;
  }

  public async updateSave(slotId: number, partialData: Partial<SaveData>): Promise<SaveData> {
    const existing = await this.getSave(slotId);
    const updated: SaveData = {
      ...(existing || (await this.createNewGame(slotId))),
      ...partialData,
      slotId,
      exists: true,
      lastPlayed: new Date().toISOString()
    };

    try {
      const db = await this.getDB();
      await db.put(STORE_NAME, updated);
    } catch {
      localStorage.setItem(`lovebound_save_${slotId}`, JSON.stringify(updated));
      this.memoryFallback.set(slotId, updated);
    }

    return updated;
  }

  public async deleteSave(slotId: number): Promise<void> {
    try {
      const db = await this.getDB();
      await db.delete(STORE_NAME, slotId);
    } catch {
      localStorage.removeItem(`lovebound_save_${slotId}`);
      this.memoryFallback.delete(slotId);
    }
  }

  public async hasAnySave(): Promise<boolean> {
    const slots = await this.getSlotMetadataList();
    return slots.some(s => s.exists);
  }

  public async getLatestSaveSlot(): Promise<number | null> {
    const slots = await this.getSlotMetadataList();
    const existing = slots.filter(s => s.exists);
    if (existing.length === 0) return null;
    existing.sort((a, b) => new Date(b.lastPlayed).getTime() - new Date(a.lastPlayed).getTime());
    return existing[0].slotId;
  }
}

export const saveService = new SaveService();
