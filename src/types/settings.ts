export type GraphicsQuality = 'low' | 'medium' | 'high';
export type GameDifficulty = 'easy' | 'normal' | 'hard';
export type DialogueSpeed = 'slow' | 'normal' | 'fast' | 'instant';
export type TextSize = 'small' | 'medium' | 'large';

export interface KeyBindings {
  moveLeft: string;
  moveRight: string;
  jump: string;
  attackBasic: string;
  attackStaff: string;
  dodge: string;
  companionAbility: string;
  dominanceUltimate: string;
  pause: string;
  interact: string;
}

export interface SettingsData {
  audio: {
    masterVolume: number; // 0 to 100
    musicVolume: number;  // 0 to 100
    sfxVolume: number;    // 0 to 100
    muted: boolean;
  };
  display: {
    fullscreen: boolean;
    graphicsQuality: GraphicsQuality;
    particlesEnabled: boolean;
    screenShake: boolean;
    brightness: number; // 50 to 150 (percentage)
  };
  gameplay: {
    difficulty: GameDifficulty;
    dialogueSpeed: DialogueSpeed;
    autoSave: boolean;
    showDamageNumbers: boolean;
  };
  controls: {
    keyBindings: KeyBindings;
    touchControlsEnabled: boolean;
    joystickSensitivity: number; // 1 to 10
  };
  accessibility: {
    reduceMotion: boolean;
    highContrast: boolean;
    uiScale: number; // 80 to 120 (percentage)
    textSize: TextSize;
  };
}
