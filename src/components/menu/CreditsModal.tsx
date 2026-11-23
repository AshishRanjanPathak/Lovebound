import React from 'react';
import { ModalWrapper } from '../common/ModalWrapper';
import { Heart, Sparkles, Code, Music, Palette } from 'lucide-react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Kingdom Chronicles &amp; Credits"
      subtitle="Creators of the LOVEBOUND Adventure"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6 text-center py-4">
        {/* Title tribute */}
        <div>
          <h3 className="font-cinzel text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-love-softPink via-love-pink to-love-violet">
            LOVEBOUND
          </h3>
          <p className="font-cinzel text-xs text-love-gold uppercase tracking-widest mt-1">
            An Anime Fantasy Action-Adventure
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="p-4 rounded-xl bg-love-midnight/50 border border-love-secondaryPurple/30">
            <div className="flex items-center gap-2 text-love-pink font-cinzel text-xs font-bold uppercase mb-1">
              <Heart className="w-3.5 h-3.5" />
              <span>Story &amp; Creative Direction</span>
            </div>
            <p className="font-cinzel text-sm font-semibold text-love-cream">The LOVEBOUND Guild</p>
            <p className="text-xs text-love-softPink/70 mt-1">
              A tale of unyielding devotion between Astraea and Princess Elinore against the manipulative bosses HATA, BUNNY, and RISHI.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-love-midnight/50 border border-love-secondaryPurple/30">
            <div className="flex items-center gap-2 text-love-gold font-cinzel text-xs font-bold uppercase mb-1">
              <Code className="w-3.5 h-3.5" />
              <span>Game Architecture &amp; Engineering</span>
            </div>
            <p className="font-cinzel text-sm font-semibold text-love-cream">Frontend &amp; Engine Core</p>
            <p className="text-xs text-love-softPink/70 mt-1">
              Powered by React, TypeScript, Phaser 3, Zustand, Tailwind CSS, and IndexedDB.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-love-midnight/50 border border-love-secondaryPurple/30">
            <div className="flex items-center gap-2 text-love-violet font-cinzel text-xs font-bold uppercase mb-1">
              <Palette className="w-3.5 h-3.5" />
              <span>Visual &amp; UI/UX Design System</span>
            </div>
            <p className="font-cinzel text-sm font-semibold text-love-cream">Anime Fantasy Studio</p>
            <p className="text-xs text-love-softPink/70 mt-1">
              Midnight Navy, Love Magic Pink, Dominance Violet, and Gilded Warm Gold design tokens.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-love-midnight/50 border border-love-secondaryPurple/30">
            <div className="flex items-center gap-2 text-love-softPink font-cinzel text-xs font-bold uppercase mb-1">
              <Music className="w-3.5 h-3.5" />
              <span>Audio Synthesis &amp; Soundscapes</span>
            </div>
            <p className="font-cinzel text-sm font-semibold text-love-cream">Ethereal Sound Engine</p>
            <p className="text-xs text-love-softPink/70 mt-1">
              Web Audio procedural synthesis, ambient crystal pads, and resonant bass impacts.
            </p>
          </div>
        </div>

        {/* Dev Note */}
        <div className="p-4 rounded-xl bg-love-darkPurple/50 border border-love-pink/30 flex items-center justify-center gap-3">
          <Sparkles className="w-5 h-5 text-love-gold shrink-0 animate-spin" />
          <p className="text-xs text-love-cream/90 font-cinzel">
            Dedicated to crafting unforgettable anime indie gameplay experiences.
          </p>
        </div>
      </div>
    </ModalWrapper>
  );
};
