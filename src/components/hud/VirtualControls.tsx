import React, { useState } from 'react';
import { gameEventBus } from '../../events/gameEventBus';
import { useGameStore } from '../../stores/useGameStore';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { audioService } from '../../services/audioService';
import { Sparkles, Shield, Zap, ArrowUp, Sword } from 'lucide-react';

export const VirtualControls: React.FC = () => {
  const { settings } = useSettingsStore();
  const { heroine, companion, consumeDominance } = useGameStore();
  const [activeDirection, setActiveDirection] = useState<'left' | 'right' | null>(null);

  if (!settings.controls.touchControlsEnabled) return null;

  const handleMoveStart = (dir: 'left' | 'right') => {
    setActiveDirection(dir);
    gameEventBus.emit('UI:MOVE_INPUT', { direction: dir });
  };

  const handleMoveEnd = () => {
    setActiveDirection(null);
    gameEventBus.emit('UI:MOVE_INPUT', { direction: 'stop' });
  };

  const handleJump = () => {
    audioService.playSound('button-hover');
    gameEventBus.emit('UI:JUMP_INPUT', undefined);
  };

  const handleAttackBasic = () => {
    audioService.playSound('button-hover');
    gameEventBus.emit('UI:ATTACK_BASIC_INPUT', undefined);
  };

  const handleAttackStaff = () => {
    audioService.playSound('magic-cast');
    gameEventBus.emit('UI:ATTACK_STAFF_INPUT', undefined);
  };

  const handleDodge = () => {
    audioService.playSound('button-hover');
    gameEventBus.emit('UI:DODGE_INPUT', undefined);
  };

  const handleCompanion = () => {
    if (companion.abilityReady) {
      audioService.playSound('companion-assist');
      gameEventBus.emit('UI:COMPANION_ABILITY_INPUT', undefined);
    }
  };

  const handleDominance = () => {
    if (heroine.dominanceMeter >= 100) {
      audioService.playSound('dominance-burst');
      consumeDominance();
      gameEventBus.emit('UI:DOMINANCE_ULTIMATE_INPUT', undefined);
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex justify-between items-end p-4 sm:p-8 select-none">
      {/* Left: Directional Touch Pad */}
      <div className="pointer-events-auto flex items-center gap-3">
        <button
          onTouchStart={() => handleMoveStart('left')}
          onTouchEnd={handleMoveEnd}
          onMouseDown={() => handleMoveStart('left')}
          onMouseUp={handleMoveEnd}
          onMouseLeave={handleMoveEnd}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-love-pink/50 flex items-center justify-center font-bold text-lg text-love-cream backdrop-blur-md transition-all active:scale-95 ${
            activeDirection === 'left' ? 'bg-love-pink text-love-midnight shadow-love-glow' : 'bg-love-midnight/70'
          }`}
        >
          &larr;
        </button>

        <button
          onTouchStart={() => handleMoveStart('right')}
          onTouchEnd={handleMoveEnd}
          onMouseDown={() => handleMoveStart('right')}
          onMouseUp={handleMoveEnd}
          onMouseLeave={handleMoveEnd}
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-love-pink/50 flex items-center justify-center font-bold text-lg text-love-cream backdrop-blur-md transition-all active:scale-95 ${
            activeDirection === 'right' ? 'bg-love-pink text-love-midnight shadow-love-glow' : 'bg-love-midnight/70'
          }`}
        >
          &rarr;
        </button>
      </div>

      {/* Right: Combat Actions Pad */}
      <div className="pointer-events-auto flex flex-col items-end gap-2.5">
        {/* Upper Row: Companion & Ultimate */}
        <div className="flex items-center gap-2">
          {/* Dominance Ultimate Button */}
          <button
            onClick={handleDominance}
            disabled={heroine.dominanceMeter < 100}
            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 flex items-center justify-center transition-all ${
              heroine.dominanceMeter >= 100
                ? 'bg-love-deepViolet border-love-violet text-white shadow-violet-glow animate-pulse scale-105 active:scale-95'
                : 'bg-love-midnight/60 border-love-deepViolet/40 text-love-violet/40 cursor-not-allowed'
            }`}
            title="Q: Dominance Ultimate"
          >
            <Zap className="w-5 h-5 fill-current" />
          </button>

          {/* Princess Companion Ability */}
          <button
            onClick={handleCompanion}
            disabled={!companion.abilityReady}
            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full border-2 flex items-center justify-center transition-all ${
              companion.abilityReady
                ? 'bg-love-darkPurple border-love-gold text-love-gold shadow-gold-glow active:scale-95'
                : 'bg-love-midnight/60 border-love-secondaryPurple/40 text-love-gold/40 cursor-not-allowed'
            }`}
            title="E: Princess Blessing"
          >
            <Shield className="w-5 h-5" />
          </button>
        </div>

        {/* Lower Row: Dodge, Staff Magic, Melee, Jump */}
        <div className="flex items-center gap-2.5">
          {/* Melee Strike */}
          <button
            onClick={handleAttackBasic}
            className="w-12 h-12 rounded-full bg-love-midnight/70 border border-love-pink/50 text-love-cream flex items-center justify-center active:scale-95 backdrop-blur-md"
            title="J: Basic Strike"
          >
            <Sword className="w-5 h-5" />
          </button>

          {/* Dodge Dash */}
          <button
            onClick={handleDodge}
            className="w-12 h-12 rounded-full bg-love-midnight/70 border border-love-softPink/60 text-love-softPink flex items-center justify-center text-xs font-cinzel font-bold active:scale-95 backdrop-blur-md"
            title="Shift: Dodge"
          >
            Dodge
          </button>

          {/* Staff Magic Attack */}
          <button
            onClick={handleAttackStaff}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-love-darkPurple border-2 border-love-pink text-love-pink flex items-center justify-center shadow-love-glow active:scale-95 backdrop-blur-md"
            title="K: Staff Magic"
          >
            <Sparkles className="w-6 h-6" />
          </button>

          {/* Jump */}
          <button
            onClick={handleJump}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-love-pink to-love-softPink text-love-midnight flex items-center justify-center shadow-love-glow active:scale-95"
            title="Space: Jump"
          >
            <ArrowUp className="w-7 h-7 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
