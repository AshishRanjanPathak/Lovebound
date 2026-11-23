import React, { useState } from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { useUIStore } from '../../stores/useUIStore';
import { FantasyButton } from '../common/FantasyButton';
import { gameEventBus } from '../../events/gameEventBus';
import { Play, RotateCcw, Backpack, Map, Sliders, Home, AlertTriangle, Heart, Shield, Clock } from 'lucide-react';

export const PauseMenu: React.FC = () => {
  const {
    currentTerritoryName,
    currentCheckpointName,
    chapterName,
    playtimeSeconds,
    heroine,
    companion,
    setPaused,
    saveCurrentProgress,
    resetSession,
  } = useGameStore();

  const { openOverlay, closeOverlay, setView } = useUIStore();

  const [confirmRestart, setConfirmRestart] = useState(false);
  const [confirmMainMenu, setConfirmMainMenu] = useState(false);

  const formatPlaytime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResume = () => {
    setPaused(false);
    closeOverlay();
  };

  const handleRestartCheckpoint = () => {
    gameEventBus.emit('UI:RESTART_CHECKPOINT', undefined);
    setConfirmRestart(false);
    handleResume();
  };

  const handleExitToMainMenu = async () => {
    await saveCurrentProgress();
    resetSession();
    setView('main-menu');
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-love-midnight/90 backdrop-blur-md select-none animate-in fade-in duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-love-darkPurple via-love-midnight to-love-darkPurple border-2 border-love-pink/50 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Corner Ornaments */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-love-gold pointer-events-none" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-love-gold pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-love-gold pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-love-gold pointer-events-none" />

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-love-softPink via-white to-love-pink drop-shadow-love-glow">
            GAME PAUSED
          </h2>
          <p className="font-cinzel text-xs text-love-gold uppercase tracking-[0.2em] mt-1">
            Chronicles of Devotion Paused
          </p>
        </div>

        {/* Session Stats Briefing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-love-midnight/60 border border-love-secondaryPurple/40 mb-6 text-xs">
          <div className="space-y-1.5">
            <p className="font-cinzel text-love-gold font-bold">{currentTerritoryName}</p>
            <p className="text-love-cream/80 truncate">{currentCheckpointName}</p>
            <p className="text-love-softPink/60 text-[11px]">{chapterName}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-love-cream">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-love-softPink" />
                <span>Elapsed Time</span>
              </span>
              <span className="font-mono text-love-gold font-bold">{formatPlaytime(playtimeSeconds)}</span>
            </div>

            <div className="flex items-center justify-between text-love-cream">
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-love-pink" />
                <span>Heroine Vitality</span>
              </span>
              <span className="font-bold text-love-softPink">{heroine.hp} / {heroine.maxHp} HP</span>
            </div>

            <div className="flex items-center justify-between text-love-cream">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-love-gold" />
                <span>Princess Blessing</span>
              </span>
              <span className="font-bold text-love-gold">{companion.abilityReady ? 'Ready' : 'Recharging'}</span>
            </div>
          </div>
        </div>

        {/* Confirmation: Restart Checkpoint */}
        {confirmRestart && (
          <div className="p-4 mb-4 rounded-xl bg-red-950/70 border border-red-500/70 text-red-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-xs">Restart at the last ancient shrine checkpoint? Recent unsaved skirmish progress will reset.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <FantasyButton size="sm" variant="secondary" onClick={() => setConfirmRestart(false)}>
                Cancel
              </FantasyButton>
              <FantasyButton size="sm" variant="danger" onClick={handleRestartCheckpoint}>
                Restart
              </FantasyButton>
            </div>
          </div>
        )}

        {/* Confirmation: Exit to Main Menu */}
        {confirmMainMenu && (
          <div className="p-4 mb-4 rounded-xl bg-love-darkPurple/90 border border-love-pink/70 text-love-cream flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-love-pink shrink-0" />
              <p className="text-xs">Save progress and return to the main menu screen?</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <FantasyButton size="sm" variant="secondary" onClick={() => setConfirmMainMenu(false)}>
                Stay
              </FantasyButton>
              <FantasyButton size="sm" variant="primary" onClick={handleExitToMainMenu}>
                Save &amp; Exit
              </FantasyButton>
            </div>
          </div>
        )}

        {/* Menu Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FantasyButton
            variant="primary"
            size="md"
            fullWidth
            icon={<Play className="w-4 h-4 fill-current" />}
            onClick={handleResume}
          >
            Resume (ESC)
          </FantasyButton>

          <FantasyButton
            variant="secondary"
            size="md"
            fullWidth
            icon={<RotateCcw className="w-4 h-4" />}
            onClick={() => setConfirmRestart(true)}
          >
            Restart Checkpoint
          </FantasyButton>

          <FantasyButton
            variant="secondary"
            size="md"
            fullWidth
            icon={<Backpack className="w-4 h-4" />}
            onClick={() => openOverlay('inventory')}
          >
            Inventory
          </FantasyButton>

          <FantasyButton
            variant="secondary"
            size="md"
            fullWidth
            icon={<Map className="w-4 h-4" />}
            onClick={() => openOverlay('map')}
          >
            Kingdom Map
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
            variant="gold"
            size="md"
            fullWidth
            icon={<Home className="w-4 h-4" />}
            onClick={() => setConfirmMainMenu(true)}
          >
            Main Menu
          </FantasyButton>
        </div>
      </div>
    </div>
  );
};
