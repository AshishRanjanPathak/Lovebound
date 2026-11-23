import { create } from 'zustand';
import { SettingsData } from '../types/settings';
import { settingsService, DEFAULT_SETTINGS } from '../services/settingsService';
import { audioService } from '../services/audioService';

interface SettingsStoreState {
  settings: SettingsData;
  updateSetting: <K extends keyof SettingsData>(category: K, values: Partial<SettingsData[K]>) => void;
  resetToDefaults: () => void;
}

export const useSettingsStore = create<SettingsStoreState>((set) => ({
  settings: settingsService.getSettings(),

  updateSetting: (category, values) => {
    const updated = settingsService.updatePartial(category, values);
    audioService.updateVolumes();
    set({ settings: updated });
  },

  resetToDefaults: () => {
    settingsService.saveSettings(DEFAULT_SETTINGS);
    audioService.updateVolumes();
    set({ settings: DEFAULT_SETTINGS });
  },
}));
