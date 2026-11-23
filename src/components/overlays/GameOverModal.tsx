import React, { useState } from 'react';
import { FantasyButton } from '../common/FantasyButton';
import { useGameStore } from '../../stores/useGameStore';
import { useUIStore } from '../../stores/useUIStore';
import { gameEventBus } from '../../events/gameEventBus';
import { RotateCcw, Home, HeartCrack } from 'lucide-react';

interface GameOverModalProps {
  isOpen: boolean;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen }) => {
  const { currentCheckpointName, resetSession, saveCurrentProgress } = useGameStore();
  const { closeOverlay, setView } = useUIStore();
  const [confirmHome, setConfirmHome] = useState(false);

  if (!isOpen) return null;

  const handleRestart = () => {
    gameEventBus.emit('UI:RESTART_CHECKPOINT', undefined);
    closeOverlay();
  };

  const handleReturnHome = async () => {
    await saveCurrentProgress();
    resetSession();
    setView('main-menu');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#1f0d14] via-love-midnight to-black border-2 border-red-500/50 rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
        {/* Heart Broken Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-red-950/60 border border-red-500/60 flex items-center justify-center">
          <HeartCrack className="w-8 h-8 text-red-400 animate-pulse" />
        </div>

        <div>
          <h2 className="font-cinzel text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-200 to-red-500 tracking-widest">
            FATE SEVERED
          </h2>
          <p className="font-cinzel text-xs text-red-300 uppercase tracking-widest mt-1">
            The heroine was separated from her beloved princess
          </p>
        </div>

        <p className="text-xs text-love-cream/80 max-w-sm mx-auto">
          Whispers of manipulation clouded your vision, but true love cannot remain extinguished for long.
        </p>

        <div className="p-3 rounded-lg bg-love-midnight/80 border border-red-900/50 text-[11px] text-red-300">
          Last Checkpoint: <strong className="text-white">{currentCheckpointName}</strong>
        </div>

        {confirmHome ? (
          <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/60 text-xs space-y-2">
            <p className="text-red-200">Return to main menu? Progress up to the last shrine will be kept.</p>
            <div className="flex justify-center gap-2">
              <FantasyButton size="sm" variant="secondary" onClick={() => setConfirmHome(false)}>
                Cancel
              </FantasyButton>
              <FantasyButton size="sm" variant="danger" onClick={handleReturnHome}>
                Confirm Exit
              </FantasyButton>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <FantasyButton
              variant="primary"
              size="md"
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={handleRestart}
            >
              Restart Checkpoint
            </FantasyButton>

            <FantasyButton
              variant="secondary"
              size="md"
              icon={<Home className="w-4 h-4" />}
              onClick={() => setConfirmHome(true)}
            >
              Main Menu
            </FantasyButton>
          </div>
        )}
      </div>
    </div>
  );
};
