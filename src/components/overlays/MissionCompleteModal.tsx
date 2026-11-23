import React from 'react';
import { FantasyButton } from '../common/FantasyButton';
import { useUIStore } from '../../stores/useUIStore';
import { useGameStore } from '../../stores/useGameStore';
import { Trophy, Sparkles, CheckCircle2, Award } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface MissionCompleteModalProps {
  isOpen: boolean;
  bossName?: string;
  rewards?: string[];
}

export const MissionCompleteModal: React.FC<MissionCompleteModalProps> = ({
  isOpen,
  bossName = 'HATA the Deceiver',
  rewards = ['150 Star Shards', 'Ancient Love Talisman', 'Access to Enchanted District'],
}) => {
  const { currentTerritoryName, saveCurrentProgress } = useGameStore();
  const { closeOverlay } = useUIStore();

  if (!isOpen) return null;

  const handleContinue = async () => {
    audioService.playSound('button-click');
    await saveCurrentProgress();
    closeOverlay();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-love-midnight/85 backdrop-blur-md select-none animate-in zoom-in-95 duration-500">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-love-darkPurple via-love-midnight to-love-darkPurple border-2 border-love-gold rounded-2xl p-6 sm:p-8 text-center space-y-6 shadow-gold-glow overflow-hidden">
        {/* Floating Celebratory Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-6 w-3 h-3 rounded-full bg-love-gold animate-ping opacity-80" />
          <div className="absolute bottom-6 right-8 w-2 h-2 rounded-full bg-love-pink animate-ping opacity-80" />
          <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-love-violet animate-pulse-glow" />
        </div>

        {/* Victory Trophy */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-love-gold to-amber-700 flex items-center justify-center shadow-gold-glow">
          <Trophy className="w-8 h-8 text-love-midnight" />
        </div>

        <div>
          <h2 className="font-cinzel text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-love-gold via-white to-love-gold tracking-widest">
            REALM LIBERATED
          </h2>
          <p className="font-cinzel text-xs text-love-softPink uppercase tracking-[0.2em] mt-1">
            {currentTerritoryName} &bull; Vows Upheld
          </p>
        </div>

        <div className="p-3 rounded-lg bg-love-midnight/70 border border-love-secondaryPurple/40 text-xs text-love-cream">
          Vanquished Nemesis: <strong className="text-love-gold">{bossName}</strong>
        </div>

        {/* Rewards Unlocked */}
        <div className="space-y-2 text-left p-4 rounded-xl bg-love-darkPurple/60 border border-love-pink/30">
          <span className="font-cinzel text-xs font-bold text-love-gold uppercase flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>Spoils &amp; Unlocks</span>
          </span>
          <div className="space-y-1.5 text-xs text-love-cream">
            {rewards.map((r, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-love-pink shrink-0" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>

        <FantasyButton
          variant="gold"
          size="lg"
          fullWidth
          icon={<Sparkles className="w-4 h-4" />}
          onClick={handleContinue}
        >
          Continue Journey
        </FantasyButton>
      </div>
    </div>
  );
};
