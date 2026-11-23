import React, { useState } from 'react';
import { ModalWrapper } from '../common/ModalWrapper';
import { TERRITORIES_DATA } from '../../data/territories';
import { TerritoryInfo } from '../../types/game';
import { MapPin, Lock, Skull, CheckCircle2, Compass } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose }) => {
  const [selectedTerritory, setSelectedTerritory] = useState<TerritoryInfo>(TERRITORIES_DATA[0]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Realm Cartography"
      subtitle="The Three Kingdoms of Deception &amp; Greed"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Territories Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TERRITORIES_DATA.map((terr) => {
            const isSelected = selectedTerritory.id === terr.id;
            const isCurrent = terr.status === 'current';
            const isLocked = terr.status === 'locked';

            return (
              <div
                key={terr.id}
                onClick={() => {
                  audioService.playSound('button-hover');
                  setSelectedTerritory(terr);
                }}
                className={`relative p-5 rounded-xl border flex flex-col justify-between cursor-pointer transition-all duration-200 overflow-hidden ${
                  isSelected
                    ? 'bg-love-darkPurple border-love-pink shadow-card-active scale-[1.02]'
                    : isLocked
                    ? 'bg-love-midnight/40 border-love-secondaryPurple/20 opacity-70'
                    : 'bg-love-midnight/60 border-love-secondaryPurple/40 hover:border-love-softPink/60'
                }`}
              >
                {/* Territory Status Tag */}
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    {isCurrent && <MapPin className="w-4 h-4 text-love-pink animate-bounce" />}
                    {isLocked && <Lock className="w-4 h-4 text-love-cream/40" />}
                    <span className="font-cinzel text-xs font-bold text-love-cream">
                      {isCurrent ? 'Current Realm' : isLocked ? 'Locked Realm' : 'Unlocked'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-love-gold">
                    Lv. {terr.recommendedLevel}+
                  </span>
                </div>

                {/* Territory Info */}
                <div className="py-4 space-y-1.5">
                  <h3 className="font-cinzel text-lg font-bold text-love-cream">{terr.name}</h3>
                  <p className="font-cinzel text-xs text-love-gold/90">{terr.subtitle}</p>
                </div>

                {/* Boss Badge */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-love-softPink/70 text-[11px] flex items-center gap-1">
                    <Skull className="w-3.5 h-3.5 text-love-violet" />
                    <span>Boss: {terr.bossName}</span>
                  </span>
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-love-pink animate-ping" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Territory Intel Card */}
        <div className="p-5 rounded-xl bg-love-midnight/70 border border-love-secondaryPurple/40 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-love-secondaryPurple/30 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-love-gold" />
                <h3 className="font-cinzel text-base font-bold text-love-cream">
                  {selectedTerritory.name} &bull; {selectedTerritory.subtitle}
                </h3>
              </div>
              <p className="text-xs text-love-softPink/80 mt-0.5">
                Arch-Nemesis: <strong className="text-love-gold">{selectedTerritory.bossName}</strong> — {selectedTerritory.bossTitle}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-cinzel font-bold border ${
                selectedTerritory.status === 'current'
                  ? 'bg-love-pink/20 text-love-softPink border-love-pink'
                  : 'bg-white/5 text-love-cream/50 border-white/10'
              }`}
            >
              {selectedTerritory.status === 'current' ? 'Astraea Is Here' : 'Path Sealed'}
            </span>
          </div>

          <p className="text-xs text-love-cream/90 leading-relaxed">
            {selectedTerritory.description}
          </p>

          {/* Checkpoint Markers */}
          {selectedTerritory.id === 'gremlin-woods' && (
            <div className="p-3.5 rounded-lg bg-love-darkPurple/50 border border-love-pink/30 space-y-2">
              <span className="font-cinzel text-xs font-bold text-love-gold uppercase tracking-wider">
                Sanctuary Checkpoints In Territory
              </span>
              <div className="flex items-center gap-2 text-xs text-love-cream">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Whispering Grove Ancient Shrine (Active Checkpoint)</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};
