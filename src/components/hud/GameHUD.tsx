import React from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { useUIStore } from '../../stores/useUIStore';
import { MissingAssetPlaceholder } from '../common/MissingAssetPlaceholder';
import { VirtualControls } from './VirtualControls';
import { Pause, Zap, Sparkles, MapPin } from 'lucide-react';
import { SAMPLE_INTRO_DIALOGUE } from '../../data/dialogues';

export const GameHUD: React.FC = () => {
  const {
    heroine,
    companion,
    currentTerritoryName,
    currentCheckpointName,
    setPaused,
    addDominance,
  } = useGameStore();

  const { openOverlay, setDialogue } = useUIStore();

  const handlePauseClick = () => {
    setPaused(true);
    openOverlay('pause');
  };

  const hpPercent = Math.max(0, Math.min(100, (heroine.hp / heroine.maxHp) * 100));
  const mpPercent = Math.max(0, Math.min(100, (heroine.magic / heroine.maxMagic) * 100));
  const domPercent = Math.max(0, Math.min(100, heroine.dominanceMeter));

  return (
    <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-3 sm:p-6 select-none overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex items-start justify-between w-full">
        {/* Top-Left: Heroine Vitality & Magic */}
        <div className="pointer-events-auto flex items-center gap-3 p-2.5 rounded-2xl bg-love-midnight/70 backdrop-blur-md border border-love-pink/40 shadow-card-soft">
          {/* Portrait */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-love-pink bg-love-darkPurple shadow-love-glow shrink-0">
            <MissingAssetPlaceholder
              assetId={heroine.isDominanceMode ? 'heroine-portrait-enraged' : 'heroine-portrait-normal'}
              type="portrait"
              className="w-full h-full"
            />
            {/* Level Badge */}
            <span className="absolute bottom-0 inset-x-0 bg-love-midnight/90 text-center font-cinzel text-[9px] font-bold text-love-gold py-0.5">
              Lv. {heroine.level}
            </span>
          </div>

          {/* Vitals Bars */}
          <div className="w-36 sm:w-48 space-y-1.5">
            {/* Name */}
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold text-love-cream tracking-wider">
                {heroine.name}
              </span>
              {heroine.isDominanceMode && (
                <span className="font-cinzel text-[9px] font-bold text-love-violet animate-pulse">
                  DOMINANCE
                </span>
              )}
            </div>

            {/* Health Bar */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-[9px] font-mono text-love-softPink">
                <span>HP</span>
                <span>{heroine.hp}/{heroine.maxHp}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-love-darkPurple border border-love-pink/30 p-[1px] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-love-pink via-rose-400 to-red-400 transition-all duration-300"
                  style={{ width: `${hpPercent}%` }}
                />
              </div>
            </div>

            {/* Magic Energy Bar */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-[9px] font-mono text-love-gold">
                <span>MP</span>
                <span>{heroine.magic}/{heroine.maxMagic}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-love-darkPurple border border-love-gold/30 p-[1px] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-love-gold via-amber-300 to-yellow-200 transition-all duration-300"
                  style={{ width: `${mpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top-Right: Territory, Checkpoint, Story Dialogue Trigger & Pause Button */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Test Dialogue Button (allows user to preview anime dialogue overlay in-game anytime) */}
          <button
            onClick={() => setDialogue(SAMPLE_INTRO_DIALOGUE)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-love-midnight/70 backdrop-blur-md border border-love-gold/50 text-xs font-cinzel font-bold text-love-gold hover:bg-love-darkPurple transition-all"
            title="Trigger Sample Story Dialogue"
          >
            <Sparkles className="w-3.5 h-3.5 text-love-gold" />
            <span>Story Dialogue</span>
          </button>

          {/* Territory Badge */}
          <div className="hidden sm:flex flex-col items-end px-3 py-1.5 rounded-xl bg-love-midnight/70 backdrop-blur-md border border-love-secondaryPurple/40">
            <span className="font-cinzel text-xs font-bold text-love-cream flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-love-pink" />
              <span>{currentTerritoryName}</span>
            </span>
            <span className="font-cinzel text-[10px] text-love-gold/80">
              {currentCheckpointName}
            </span>
          </div>

          {/* Pause Button */}
          <button
            onClick={handlePauseClick}
            className="p-3 rounded-xl bg-love-midnight/80 backdrop-blur-md border-2 border-love-pink/50 text-love-cream hover:border-love-pink hover:shadow-love-glow transition-all active:scale-95"
            title="Pause Game (ESC)"
          >
            <Pause className="w-5 h-5 fill-current" />
          </button>
        </div>
      </div>

      {/* Objective Strip (Center Top) */}
      <div className="self-center pointer-events-auto px-4 py-1.5 rounded-full bg-love-midnight/80 backdrop-blur-md border border-love-pink/30 text-xs font-cinzel text-love-cream flex items-center gap-2 shadow-card-soft">
        <span className="w-2 h-2 rounded-full bg-love-gold animate-ping" />
        <span className="text-love-gold font-bold">Objective:</span>
        <span>Explore the Whispering Grove and break HATA's illusions</span>
      </div>

      {/* Bottom Center: Dominance Gauge & Companion Status */}
      <div className="self-center pointer-events-auto flex items-center gap-4 p-2.5 rounded-2xl bg-love-midnight/80 backdrop-blur-md border border-love-secondaryPurple/50 shadow-2xl mb-1 sm:mb-2">
        {/* Princess Companion Widget */}
        <div className="flex items-center gap-2 pr-3 border-r border-love-secondaryPurple/40">
          <div className="relative w-10 h-10 rounded-full border-2 border-love-gold overflow-hidden bg-love-darkPurple shadow-gold-glow shrink-0">
            <MissingAssetPlaceholder
              assetId="princess-portrait"
              type="princess"
              className="w-full h-full"
            />
          </div>
          <div className="text-left hidden sm:block">
            <p className="font-cinzel text-xs font-bold text-love-gold">{companion.name}</p>
            <p className="text-[10px] text-love-softPink/80">
              {companion.abilityReady ? 'Blessing Ready (E)' : 'Recharging'}
            </p>
          </div>
        </div>

        {/* Dominance Gauge */}
        <div className="w-40 sm:w-64 space-y-1">
          <div className="flex justify-between text-[10px] font-cinzel font-bold">
            <span className="text-love-violet flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Dominance Surge (Q)</span>
            </span>
            <span className={domPercent >= 100 ? 'text-love-violet font-bold animate-pulse' : 'text-love-cream/70'}>
              {domPercent >= 100 ? 'READY!' : `${domPercent}%`}
            </span>
          </div>

          <div
            onClick={() => addDominance(25)}
            className="w-full h-2.5 rounded-full bg-love-darkPurple border border-love-violet/50 p-[1px] overflow-hidden cursor-pointer"
            title="Click to test charging Dominance Meter (+25%)"
          >
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                domPercent >= 100
                  ? 'bg-gradient-to-r from-love-violet via-fuchsia-400 to-white shadow-violet-glow animate-pulse'
                  : 'bg-gradient-to-r from-love-deepViolet to-love-violet'
              }`}
              style={{ width: `${domPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Virtual On-Screen Controls for Touch / Mobile */}
      <VirtualControls />
    </div>
  );
};
