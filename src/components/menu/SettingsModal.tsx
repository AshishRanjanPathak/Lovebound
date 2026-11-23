import React, { useState } from 'react';
import { ModalWrapper } from '../common/ModalWrapper';
import { FantasyButton } from '../common/FantasyButton';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { audioService } from '../../services/audioService';
import { Volume2, Monitor, Gamepad2, Accessibility, Sliders, RotateCcw } from 'lucide-react';
import { KeyBindings } from '../../types/settings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SettingsTab = 'audio' | 'display' | 'gameplay' | 'controls' | 'accessibility';

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('audio');
  const [rebindingAction, setRebindingAction] = useState<keyof KeyBindings | null>(null);
  const { settings, updateSetting, resetToDefaults } = useSettingsStore();

  const handleKeyRebind = (e: React.KeyboardEvent, action: keyof KeyBindings) => {
    e.preventDefault();
    e.stopPropagation();
    updateSetting('controls', {
      keyBindings: {
        ...settings.controls.keyBindings,
        [action]: e.code,
      },
    });
    setRebindingAction(null);
    audioService.playSound('button-click');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      updateSetting('display', { fullscreen: true });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      updateSetting('display', { fullscreen: false });
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="System Configurations"
      subtitle="Refine Your Magical Journey"
      maxWidth="max-w-4xl"
    >
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-4 mb-6 border-b border-love-secondaryPurple/30">
        {[
          { id: 'audio', label: 'Audio', icon: Volume2 },
          { id: 'display', label: 'Display', icon: Monitor },
          { id: 'gameplay', label: 'Gameplay', icon: Sliders },
          { id: 'controls', label: 'Controls', icon: Gamepad2 },
          { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                audioService.playSound('button-hover');
                setActiveTab(tab.id as SettingsTab);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-cinzel text-xs font-bold tracking-wider transition-all ${
                isActive
                  ? 'bg-love-pink text-love-midnight shadow-love-glow'
                  : 'bg-love-darkPurple/50 text-love-softPink hover:bg-love-secondaryPurple/40 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="space-y-6 min-h-[300px]">
        {/* AUDIO */}
        {activeTab === 'audio' && (
          <div className="space-y-5">
            {/* Mute Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <div>
                <span className="font-cinzel text-sm text-love-cream font-bold">Mute All Audio</span>
                <p className="text-xs text-love-softPink/70">Silences all background harmonies and magic sounds</p>
              </div>
              <input
                type="checkbox"
                checked={settings.audio.muted}
                onChange={(e) => updateSetting('audio', { muted: e.target.checked })}
                className="w-5 h-5 accent-love-pink cursor-pointer rounded"
              />
            </div>

            {/* Master Volume */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-cinzel">
                <span className="text-love-cream">Master Volume</span>
                <span className="text-love-gold font-bold">{settings.audio.masterVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.audio.masterVolume}
                onChange={(e) => updateSetting('audio', { masterVolume: Number(e.target.value) })}
                className="w-full accent-love-pink cursor-pointer"
              />
            </div>

            {/* Music Volume */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-cinzel">
                <span className="text-love-cream">Kingdom Harmonies (Music)</span>
                <span className="text-love-gold font-bold">{settings.audio.musicVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.audio.musicVolume}
                onChange={(e) => updateSetting('audio', { musicVolume: Number(e.target.value) })}
                className="w-full accent-love-pink cursor-pointer"
              />
            </div>

            {/* SFX Volume */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-cinzel">
                <span className="text-love-cream">Magic &amp; Combat SFX</span>
                <span className="text-love-gold font-bold">{settings.audio.sfxVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.audio.sfxVolume}
                onChange={(e) => updateSetting('audio', { sfxVolume: Number(e.target.value) })}
                className="w-full accent-love-pink cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* DISPLAY */}
        {activeTab === 'display' && (
          <div className="space-y-5">
            {/* Fullscreen Button */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <div>
                <span className="font-cinzel text-sm text-love-cream font-bold">Fullscreen Display</span>
                <p className="text-xs text-love-softPink/70">Maximize immersion across your entire display</p>
              </div>
              <FantasyButton size="sm" variant="secondary" onClick={toggleFullscreen}>
                Toggle Fullscreen
              </FantasyButton>
            </div>

            {/* Graphics Quality */}
            <div className="space-y-2">
              <span className="font-cinzel text-xs text-love-cream">Graphics Fidelity</span>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => updateSetting('display', { graphicsQuality: q })}
                    className={`py-2 px-3 rounded font-cinzel text-xs uppercase tracking-wider font-bold border transition-all ${
                      settings.display.graphicsQuality === q
                        ? 'bg-love-pink text-love-midnight border-love-pink shadow-love-glow'
                        : 'bg-love-midnight/60 text-love-cream/70 border-love-secondaryPurple/40 hover:bg-love-darkPurple'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Particles Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <div>
                <span className="font-cinzel text-sm text-love-cream font-bold">Magical Particles</span>
                <p className="text-xs text-love-softPink/70">Ambient glowing motes and combat sparks</p>
              </div>
              <input
                type="checkbox"
                checked={settings.display.particlesEnabled}
                onChange={(e) => updateSetting('display', { particlesEnabled: e.target.checked })}
                className="w-5 h-5 accent-love-pink cursor-pointer rounded"
              />
            </div>

            {/* Screen Shake */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <div>
                <span className="font-cinzel text-sm text-love-cream font-bold">Screen Shake</span>
                <p className="text-xs text-love-softPink/70">Impact tremors during dominance bursts &amp; boss hits</p>
              </div>
              <input
                type="checkbox"
                checked={settings.display.screenShake}
                onChange={(e) => updateSetting('display', { screenShake: e.target.checked })}
                className="w-5 h-5 accent-love-pink cursor-pointer rounded"
              />
            </div>

            {/* Brightness */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-cinzel">
                <span className="text-love-cream">Viewport Brightness</span>
                <span className="text-love-gold font-bold">{settings.display.brightness}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={settings.display.brightness}
                onChange={(e) => updateSetting('display', { brightness: Number(e.target.value) })}
                className="w-full accent-love-pink cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* GAMEPLAY */}
        {activeTab === 'gameplay' && (
          <div className="space-y-5">
            {/* Difficulty */}
            <div className="space-y-2">
              <span className="font-cinzel text-xs text-love-cream">Campaign Difficulty</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'easy', label: 'Story & Romance', desc: 'Lower enemy aggression' },
                  { id: 'normal', label: 'Balanced Fate', desc: 'Standard adventure challenge' },
                  { id: 'hard', label: 'Dominance Trial', desc: 'Fierce boss encounters' },
                ].map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => updateSetting('gameplay', { difficulty: diff.id as any })}
                    className={`p-3 rounded-lg font-cinzel text-left border transition-all ${
                      settings.gameplay.difficulty === diff.id
                        ? 'bg-love-pink/20 border-love-pink shadow-love-glow'
                        : 'bg-love-midnight/50 border-love-secondaryPurple/30 hover:bg-love-darkPurple'
                    }`}
                  >
                    <p className="text-xs font-bold text-love-cream">{diff.label}</p>
                    <p className="text-[10px] text-love-softPink/70 mt-0.5">{diff.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Dialogue Speed */}
            <div className="space-y-2">
              <span className="font-cinzel text-xs text-love-cream">Dialogue Speed</span>
              <div className="grid grid-cols-4 gap-2">
                {(['slow', 'normal', 'fast', 'instant'] as const).map((spd) => (
                  <button
                    key={spd}
                    onClick={() => updateSetting('gameplay', { dialogueSpeed: spd })}
                    className={`py-2 px-3 rounded font-cinzel text-xs uppercase tracking-wider font-bold border transition-all ${
                      settings.gameplay.dialogueSpeed === spd
                        ? 'bg-love-pink text-love-midnight border-love-pink shadow-love-glow'
                        : 'bg-love-midnight/60 text-love-cream/70 border-love-secondaryPurple/40 hover:bg-love-darkPurple'
                    }`}
                  >
                    {spd}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto-Save */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <div>
                <span className="font-cinzel text-sm text-love-cream font-bold">Shrine Auto-Save</span>
                <p className="text-xs text-love-softPink/70">Automatically record progress at ancient shrines</p>
              </div>
              <input
                type="checkbox"
                checked={settings.gameplay.autoSave}
                onChange={(e) => updateSetting('gameplay', { autoSave: e.target.checked })}
                className="w-5 h-5 accent-love-pink cursor-pointer rounded"
              />
            </div>

            {/* Damage Numbers */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <div>
                <span className="font-cinzel text-sm text-love-cream font-bold">Show Damage Floaters</span>
                <p className="text-xs text-love-softPink/70">Display floating love &amp; dominance numbers on impact</p>
              </div>
              <input
                type="checkbox"
                checked={settings.gameplay.showDamageNumbers}
                onChange={(e) => updateSetting('gameplay', { showDamageNumbers: e.target.checked })}
                className="w-5 h-5 accent-love-pink cursor-pointer rounded"
              />
            </div>
          </div>
        )}

        {/* CONTROLS */}
        {activeTab === 'controls' && (
          <div className="space-y-5">
            <p className="text-xs text-love-softPink/80">
              Click any key slot and press your desired keyboard button to rebind.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {[
                { action: 'moveLeft', label: 'Move Left' },
                { action: 'moveRight', label: 'Move Right' },
                { action: 'jump', label: 'Jump' },
                { action: 'attackBasic', label: 'Basic Attack' },
                { action: 'attackStaff', label: 'Staff Love Magic' },
                { action: 'dodge', label: 'Dodge Dash' },
                { action: 'companionAbility', label: 'Princess Blessing' },
                { action: 'dominanceUltimate', label: 'Dominance Ultimate' },
                { action: 'pause', label: 'Pause / Menu' },
              ].map(({ action, label }) => {
                const isRebinding = rebindingAction === action;
                const currentBinding = settings.controls.keyBindings[action as keyof KeyBindings];

                return (
                  <div
                    key={action}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-love-midnight/50 border border-love-secondaryPurple/30"
                  >
                    <span className="text-xs font-cinzel text-love-cream">{label}</span>
                    {isRebinding ? (
                      <input
                        type="text"
                        autoFocus
                        onKeyDown={(e) => handleKeyRebind(e, action as keyof KeyBindings)}
                        onBlur={() => setRebindingAction(null)}
                        placeholder="Press key..."
                        className="w-24 px-2 py-1 text-xs text-center bg-love-pink text-love-midnight font-bold rounded outline-none animate-pulse"
                      />
                    ) : (
                      <button
                        onClick={() => setRebindingAction(action as keyof KeyBindings)}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-love-darkPurple border border-love-pink/40 text-love-gold hover:border-love-pink transition-colors"
                      >
                        {currentBinding.replace('Key', '')}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Touch Controls Switch */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <div>
                <span className="font-cinzel text-sm text-love-cream font-bold">On-Screen Virtual Controls</span>
                <p className="text-xs text-love-softPink/70">Show touch joystick &amp; spell buttons on screen</p>
              </div>
              <input
                type="checkbox"
                checked={settings.controls.touchControlsEnabled}
                onChange={(e) => updateSetting('controls', { touchControlsEnabled: e.target.checked })}
                className="w-5 h-5 accent-love-pink cursor-pointer rounded"
              />
            </div>
          </div>
        )}

        {/* ACCESSIBILITY */}
        {activeTab === 'accessibility' && (
          <div className="space-y-5">
            {/* Reduce Motion */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <div>
                <span className="font-cinzel text-sm text-love-cream font-bold">Reduce Motion</span>
                <p className="text-xs text-love-softPink/70">Disables parallax drift and camera shakes</p>
              </div>
              <input
                type="checkbox"
                checked={settings.accessibility.reduceMotion}
                onChange={(e) => updateSetting('accessibility', { reduceMotion: e.target.checked })}
                className="w-5 h-5 accent-love-pink cursor-pointer rounded"
              />
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <div>
                <span className="font-cinzel text-sm text-love-cream font-bold">High Contrast Interface</span>
                <p className="text-xs text-love-softPink/70">Heightens text visibility and darkens transparent panels</p>
              </div>
              <input
                type="checkbox"
                checked={settings.accessibility.highContrast}
                onChange={(e) => updateSetting('accessibility', { highContrast: e.target.checked })}
                className="w-5 h-5 accent-love-pink cursor-pointer rounded"
              />
            </div>

            {/* UI Scaling */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-cinzel">
                <span className="text-love-cream">UI Scale</span>
                <span className="text-love-gold font-bold">{settings.accessibility.uiScale}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="120"
                value={settings.accessibility.uiScale}
                onChange={(e) => updateSetting('accessibility', { uiScale: Number(e.target.value) })}
                className="w-full accent-love-pink cursor-pointer"
              />
            </div>

            {/* Text Size */}
            <div className="space-y-2">
              <span className="font-cinzel text-xs text-love-cream">Dialogue Font Size</span>
              <div className="grid grid-cols-3 gap-2">
                {(['small', 'medium', 'large'] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => updateSetting('accessibility', { textSize: sz })}
                    className={`py-2 px-3 rounded font-cinzel text-xs uppercase tracking-wider font-bold border transition-all ${
                      settings.accessibility.textSize === sz
                        ? 'bg-love-pink text-love-midnight border-love-pink shadow-love-glow'
                        : 'bg-love-midnight/60 text-love-cream/70 border-love-secondaryPurple/40 hover:bg-love-darkPurple'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="pt-6 mt-6 border-t border-love-secondaryPurple/30 flex items-center justify-between">
        <button
          onClick={resetToDefaults}
          className="flex items-center gap-1.5 text-xs font-cinzel text-love-softPink/70 hover:text-love-cream transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>

        <FantasyButton size="sm" variant="primary" onClick={onClose}>
          Confirm &amp; Return
        </FantasyButton>
      </div>
    </ModalWrapper>
  );
};
