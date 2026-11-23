import { describe, it, expect, beforeEach } from 'vitest';
import { saveService } from '../services/saveService';

describe('SaveService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('reports three default slots', async () => {
    const slots = await saveService.getSlotMetadataList();
    expect(slots).toHaveLength(3);
    expect(slots[0].slotId).toBe(1);
    expect(slots[1].slotId).toBe(2);
    expect(slots[2].slotId).toBe(3);
  });

  it('creates a new save game in slot 1 and checks existence', async () => {
    const newSave = await saveService.createNewGame(1);
    expect(newSave.slotId).toBe(1);
    expect(newSave.heroineName).toBe('Astraea');
    expect(newSave.heroineLevel).toBe(1);
    expect(newSave.territoryId).toBe('gremlin-woods');

    const hasAny = await saveService.hasAnySave();
    expect(hasAny).toBe(true);

    const slot1 = await saveService.getSave(1);
    expect(slot1).not.toBeNull();
    expect(slot1?.currentHp).toBe(100);
  });

  it('updates save progress and timestamps', async () => {
    await saveService.createNewGame(2);
    const updated = await saveService.updateSave(2, {
      heroineLevel: 5,
      currentHp: 85,
      playtimeSeconds: 360,
    });

    expect(updated.heroineLevel).toBe(5);
    expect(updated.currentHp).toBe(85);
    expect(updated.playtimeSeconds).toBe(360);
  });

  it('deletes a save slot safely', async () => {
    await saveService.createNewGame(3);
    expect(await saveService.getSave(3)).not.toBeNull();

    await saveService.deleteSave(3);
    const deleted = await saveService.getSave(3);
    expect(deleted).toBeNull();
  });
});
