import { SettingsData } from '../types/settings';

const SETTINGS_KEY = 'lovebound_user_settings_v1';

export const DEFAULT_SETTINGS: SettingsData = {
  audio: {
    masterVolume: 80,
    musicVolume: 70,
    sfxVolume: 85,
    muted: false,
  },
  display: {
    fullscreen: false,
    graphicsQuality: 'high',
    particlesEnabled: true,
    screenShake: true,
    brightness: 100, // 100% normal
  },
  gameplay: {
    difficulty: 'normal',
    dialogueSpeed: 'normal',
    autoSave: true,
    showDamageNumbers: true,
  },
  controls: {
    keyBindings: {
      moveLeft: 'KeyA',
      moveRight: 'KeyD',
      jump: 'Space',
      attackBasic: 'KeyJ',
      attackStaff: 'KeyK',
      dodge: 'ShiftLeft',
      companionAbility: 'KeyE',
      dominanceUltimate: 'KeyQ',
      pause: 'Escape',
      interact: 'KeyF',
    },
    touchControlsEnabled: true,
    joystickSensitivity: 5,
  },
  accessibility: {
    reduceMotion: false,
    highContrast: false,
    uiScale: 100,
    textSize: 'medium',
  },
};

class SettingsService {
  private currentSettings: SettingsData;

  constructor() {
    this.currentSettings = this.loadSettings();
    this.applySettingsToDOM();
  }

  public getSettings(): SettingsData {
    return { ...this.currentSettings };
  }

  public saveSettings(newSettings: SettingsData): void {
    this.currentSettings = { ...newSettings };
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.currentSettings));
    } catch (e) {
      console.warn('[SettingsService] Failed to persist settings to localStorage:', e);
    }
    this.applySettingsToDOM();
  }

  public updatePartial<K extends keyof SettingsData>(
    category: K,
    values: Partial<SettingsData[K]>
  ): SettingsData {
    this.currentSettings[category] = {
      ...this.currentSettings[category],
      ...values,
    };
    this.saveSettings(this.currentSettings);
    return this.getSettings();
  }

  private loadSettings(): SettingsData {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          audio: { ...DEFAULT_SETTINGS.audio, ...parsed.audio },
          display: { ...DEFAULT_SETTINGS.display, ...parsed.display },
          gameplay: { ...DEFAULT_SETTINGS.gameplay, ...parsed.gameplay },
          controls: {
            ...DEFAULT_SETTINGS.controls,
            ...parsed.controls,
            keyBindings: {
              ...DEFAULT_SETTINGS.controls.keyBindings,
              ...(parsed.controls?.keyBindings || {}),
            },
          },
          accessibility: { ...DEFAULT_SETTINGS.accessibility, ...parsed.accessibility },
        };
      }
    } catch (e) {
      console.warn('[SettingsService] Could not parse stored settings:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
  }

  /**
   * Applies CSS variables and accessibility classes directly to DOM root
   */
  public applySettingsToDOM(): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // Brightness filter
    const brightnessVal = this.currentSettings.display.brightness / 100;
    root.style.setProperty('--app-brightness', `${brightnessVal}`);
    document.body.style.filter = `brightness(${brightnessVal})`;

    // High contrast
    if (this.currentSettings.accessibility.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduce motion
    if (this.currentSettings.accessibility.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // UI scale
    const scale = this.currentSettings.accessibility.uiScale / 100;
    root.style.setProperty('--ui-scale', `${scale}`);
  }
}

export const settingsService = new SettingsService();
