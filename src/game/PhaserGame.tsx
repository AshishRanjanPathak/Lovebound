import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { createPhaserConfig } from './config/phaserConfig';
import { useGameStore } from '../stores/useGameStore';
import { useUIStore } from '../stores/useUIStore';
import { GameHUD } from '../components/hud/GameHUD';
import { PauseMenu } from '../components/overlays/PauseMenu';
import { InventoryModal } from '../components/overlays/InventoryModal';
import { MapModal } from '../components/overlays/MapModal';
import { SettingsModal } from '../components/menu/SettingsModal';
import { DialogueOverlay } from '../components/overlays/DialogueOverlay';
import { GameOverModal } from '../components/overlays/GameOverModal';
import { MissionCompleteModal } from '../components/overlays/MissionCompleteModal';
import { RotateCw } from 'lucide-react';

export const PhaserGame: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const { currentOverlay, openOverlay, closeOverlay } = useUIStore();
  const { isPaused, setPaused, incrementPlaytime } = useGameStore();

  const [isPortraitMobile, setIsPortraitMobile] = useState(false);

  // Playtime interval loop
  useEffect(() => {
    const timer = setInterval(() => {
      incrementPlaytime();
    }, 1000);
    return () => clearInterval(timer);
  }, [incrementPlaytime]);

  // Orientation and resize listener
  useEffect(() => {
    const checkOrientation = () => {
      const isPortrait = window.innerHeight > window.innerWidth && window.innerWidth < 850;
      setIsPortraitMobile(isPortrait);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Handle visibility changes (auto-pause when tab goes to background)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && !isPaused) {
        setPaused(true);
        openOverlay('pause');
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isPaused, openOverlay, setPaused]);

  // Mount Phaser Game Instance
  useEffect(() => {
    if (!containerRef.current) return;

    if (!gameRef.current) {
      const config = createPhaserConfig(containerRef.current);
      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-love-midnight">
      {/* Phaser Canvas Mount Container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden"
      />

      {/* React HUD Layer */}
      <GameHUD />

      {/* Friendly Mobile Rotate Banner (Non-blocking advice) */}
      {isPortraitMobile && (
        <div className="fixed top-4 left-4 right-4 z-50 p-3 rounded-xl bg-love-darkPurple/95 border border-love-gold/60 text-love-cream text-xs flex items-center justify-between shadow-2xl backdrop-blur-md animate-in slide-in-from-top">
          <div className="flex items-center gap-2.5">
            <RotateCw className="w-5 h-5 text-love-gold animate-spin" />
            <div>
              <p className="font-cinzel font-bold text-love-gold">Landscape Recommended</p>
              <p className="text-[11px] text-love-softPink/80">Rotate your device for the full combat arena</p>
            </div>
          </div>
          <button
            onClick={() => setIsPortraitMobile(false)}
            className="px-2 py-1 text-[10px] uppercase font-cinzel rounded bg-love-midnight/80 border border-white/20 text-love-cream"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Overlays */}
      {currentOverlay === 'pause' && <PauseMenu />}
      <InventoryModal isOpen={currentOverlay === 'inventory'} onClose={closeOverlay} />
      <MapModal isOpen={currentOverlay === 'map'} onClose={closeOverlay} />
      <SettingsModal isOpen={currentOverlay === 'settings'} onClose={closeOverlay} />
      <DialogueOverlay />
      <GameOverModal isOpen={currentOverlay === 'game-over'} />
      <MissionCompleteModal isOpen={currentOverlay === 'mission-complete'} />
    </div>
  );
};
