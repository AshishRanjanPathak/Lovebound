import { describe, it, expect, beforeEach } from 'vitest';
import { settingsService, DEFAULT_SETTINGS } from '../services/settingsService';

describe('SettingsService', () => {
  beforeEach(() => {
    localStorage.clear();
    settingsService.saveSettings(DEFAULT_SETTINGS);
  });

  it('initializes with default settings', () => {
    const settings = settingsService.getSettings();
    expect(settings.audio.masterVolume).toBe(80);
    expect(settings.display.graphicsQuality).toBe('high');
    expect(settings.gameplay.difficulty).toBe('normal');
  });

  it('updates audio volume and persists', () => {
    settingsService.updatePartial('audio', { masterVolume: 42, muted: true });
    const settings = settingsService.getSettings();
    expect(settings.audio.masterVolume).toBe(42);
    expect(settings.audio.muted).toBe(true);
  });

  it('updates key bindings', () => {
    settingsService.updatePartial('controls', {
      keyBindings: {
        ...DEFAULT_SETTINGS.controls.keyBindings,
        jump: 'KeyW',
      },
    });
    const settings = settingsService.getSettings();
    expect(settings.controls.keyBindings.jump).toBe('KeyW');
  });

  it('updates display brightness', () => {
    settingsService.updatePartial('display', { brightness: 120 });
    const settings = settingsService.getSettings();
    expect(settings.display.brightness).toBe(120);
  });
});
