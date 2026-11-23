import React, { useState, useEffect } from 'react';
import { useUIStore } from '../../stores/useUIStore';
import { useGameStore } from '../../stores/useGameStore';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { saveService } from '../../services/saveService';
import { FantasyButton } from '../common/FantasyButton';
import { MissingAssetPlaceholder } from '../common/MissingAssetPlaceholder';
import { SaveSlotModal } from './SaveSlotModal';
import { SettingsModal } from './SettingsModal';
import { ControlsModal } from './ControlsModal';
import { CreditsModal } from './CreditsModal';
import { AssetReportModal } from './AssetReportModal';
import { Volume2, VolumeX, Maximize2, Minimize2, Play, PlusCircle, Sliders, Gamepad2, Info, FileCheck } from 'lucide-react';

export const MainMenu: React.FC = () => {
  const { currentOverlay, openOverlay, closeOverlay, setView } = useUIStore();
  const { initializeSession } = useGameStore();
  const { settings, updateSetting } = useSettingsStore();

  const [hasSaves, setHasSaves] = useState(false);
  const [saveSlotMode, setSaveSlotMode] = useState<'select' | 'new-game'>('select');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    saveService.hasAnySave().then(setHasSaves);

    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, [currentOverlay]);

  const handleContinue = async () => {
    const latestSlot = await saveService.getLatestSaveSlot();
    if (latestSlot !== null) {
      const data = await saveService.getSave(latestSlot);
      if (data) {
        initializeSession(latestSlot, data);
        setView('gameplay');
      }
    } else {
      setSaveSlotMode('select');
      openOverlay('save-selection');
    }
  };

  const handleNewGame = () => {
    setSaveSlotMode('new-game');
    openOverlay('save-selection');
  };

  const toggleSound = () => {
    updateSetting('audio', { muted: !settings.audio.muted });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-love-midnight text-love-cream">
      {/* Background Layer: Deep Fantasy Woods Gradient & Parallax Atmosphere */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-love-midnight via-[#181126] to-[#0d0f1c]">
        {/* Soft magical forest nebula glow */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-love-secondaryPurple/30 via-love-pink/15 to-transparent blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-love-deepViolet/30 via-love-violet/20 to-transparent blur-[100px] rounded-full pointer-events-none" />
        
        {/* Enchanted tree silhouettes at the bottom */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-love-midnight via-love-midnight/80 to-transparent pointer-events-none" />
      </div>

      {/* Header Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-love-pink animate-pulse-glow" />
          <span className="font-cinzel text-xs tracking-widest text-love-softPink uppercase">
            Gremlin Woods Realm
          </span>
        </div>

        {/* Quick Utilities */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openOverlay('asset-report')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-love-darkPurple/60 border border-love-pink/30 text-[11px] font-cinzel text-love-softPink hover:text-white hover:border-love-pink transition-all"
            title="Inspect Asset Manifest &amp; Fallbacks"
          >
            <FileCheck className="w-3.5 h-3.5 text-love-gold" />
            <span className="hidden sm:inline">Asset Pipeline</span>
          </button>

          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-love-darkPurple/60 border border-love-secondaryPurple/40 text-love-softPink hover:text-white hover:border-love-pink transition-all"
            title={settings.audio.muted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {settings.audio.muted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-love-gold" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-love-darkPurple/60 border border-love-secondaryPurple/40 text-love-softPink hover:text-white hover:border-love-pink transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Center Stage: Logo, Menu & Character Composition */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 py-4 max-w-7xl mx-auto w-full gap-8">
        {/* Left Side: Title & Menu Navigation */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md w-full">
          {/* Logo Composition */}
          <div className="mb-8">
            <MissingAssetPlaceholder assetId="branding-logo-main" type="logo" className="w-full max-w-md" />
          </div>

          {/* Navigation Buttons Stack */}
          <div className="w-full max-w-xs space-y-3">
            <FantasyButton
              variant="primary"
              size="lg"
              fullWidth
              icon={<Play className="w-4 h-4 fill-current" />}
              disabled={!hasSaves}
              onClick={handleContinue}
            >
              Continue
            </FantasyButton>

            <FantasyButton
              variant="gold"
              size="lg"
              fullWidth
              icon={<PlusCircle className="w-4 h-4" />}
              onClick={handleNewGame}
            >
              New Game
            </FantasyButton>

            <FantasyButton
              variant="secondary"
              size="md"
              fullWidth
              icon={<Sliders className="w-4 h-4" />}
              onClick={() => openOverlay('settings')}
            >
              Settings
            </FantasyButton>

            <FantasyButton
              variant="secondary"
              size="md"
              fullWidth
              icon={<Gamepad2 className="w-4 h-4" />}
              onClick={() => openOverlay('controls')}
            >
              Controls
            </FantasyButton>

            <FantasyButton
              variant="secondary"
              size="md"
              fullWidth
              icon={<Info className="w-4 h-4" />}
              onClick={() => openOverlay('credits')}
            >
              Credits
            </FantasyButton>
          </div>
        </div>

        {/* Right Side: Heroine & Princess Companion Composition */}
        <div className="relative flex-1 w-full h-[360px] sm:h-[480px] lg:h-[620px] flex items-end justify-center lg:justify-end">
          {/* Princess Companion (Positioned beside heroine) */}
          <div className="absolute right-36 sm:right-56 lg:right-72 bottom-4 w-44 sm:w-64 h-[75%] z-10">
            <MissingAssetPlaceholder
              assetId="princess-menu-illustration"
              type="princess"
              className="w-full h-full"
            />
          </div>

          {/* Magical Heroine with Staff (Primary focal point) */}
          <div className="relative z-20 w-64 sm:w-80 lg:w-96 h-full flex items-end justify-center">
            <MissingAssetPlaceholder
              assetId="heroine-menu-illustration"
              type="heroine"
              className="w-full h-full"
            />
          </div>
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="relative z-20 px-6 sm:px-10 py-4 border-t border-love-secondaryPurple/20 flex flex-col sm:flex-row items-center justify-between text-xs font-cinzel text-love-softPink/60 gap-2">
        <div className="flex items-center gap-4">
          <span>LOVEBOUND v0.1.0-alpha</span>
          <span className="hidden sm:inline">&bull;</span>
          <span>Phaser 3 &bull; React &bull; TypeScript</span>
        </div>

        <div>
          <span>&copy; 2026 LOVEBOUND Guild. All Rights Reserved.</span>
        </div>
      </footer>

      {/* Active Modals */}
      <SaveSlotModal
        isOpen={currentOverlay === 'save-selection'}
        onClose={closeOverlay}
        mode={saveSlotMode}
      />

      <SettingsModal
        isOpen={currentOverlay === 'settings'}
        onClose={closeOverlay}
      />

      <ControlsModal
        isOpen={currentOverlay === 'controls'}
        onClose={closeOverlay}
      />

      <CreditsModal
        isOpen={currentOverlay === 'credits'}
        onClose={closeOverlay}
      />

      <AssetReportModal
        isOpen={currentOverlay === 'asset-report'}
        onClose={closeOverlay}
      />
    </div>
  );
};
