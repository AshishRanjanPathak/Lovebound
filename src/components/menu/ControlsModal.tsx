import React, { useState } from 'react';
import { ModalWrapper } from '../common/ModalWrapper';
import { Keyboard, Smartphone, Sparkles, Heart } from 'lucide-react';
import { useSettingsStore } from '../../stores/useSettingsStore';

interface ControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ControlsModal: React.FC<ControlsModalProps> = ({ isOpen, onClose }) => {
  const [platform, setPlatform] = useState<'desktop' | 'mobile'>('desktop');
  const { settings } = useSettingsStore();
  const keys = settings.controls.keyBindings;

  const formatKey = (key: string) => {
    return key.replace('Key', '').replace('Left', '').replace('Right', '');
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title="Controls &amp; Combat Guide"
      subtitle="Master the Staff of Love and Dominance Magic"
      maxWidth="max-w-4xl"
    >
      {/* Platform Switcher */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => setPlatform('desktop')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-cinzel text-xs font-bold tracking-widest uppercase transition-all ${
            platform === 'desktop'
              ? 'bg-love-pink text-love-midnight shadow-love-glow'
              : 'bg-love-darkPurple/60 text-love-softPink hover:bg-love-secondaryPurple/50'
          }`}
        >
          <Keyboard className="w-4 h-4" />
          <span>Desktop (Keyboard)</span>
        </button>

        <button
          onClick={() => setPlatform('mobile')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-cinzel text-xs font-bold tracking-widest uppercase transition-all ${
            platform === 'mobile'
              ? 'bg-love-pink text-love-midnight shadow-love-glow'
              : 'bg-love-darkPurple/60 text-love-softPink hover:bg-love-secondaryPurple/50'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Mobile (Touch)</span>
        </button>
      </div>

      {platform === 'desktop' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Movement & Evasion */}
          <div className="p-4 rounded-xl bg-love-midnight/50 border border-love-secondaryPurple/30 space-y-3">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-love-gold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-love-gold" />
              <span>Movement &amp; Evasion</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-love-cream">Move Left / Right</span>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 rounded bg-love-darkPurple border border-love-pink/40 text-love-cream font-mono font-bold">
                    {formatKey(keys.moveLeft)}
                  </kbd>
                  <kbd className="px-2 py-1 rounded bg-love-darkPurple border border-love-pink/40 text-love-cream font-mono font-bold">
                    {formatKey(keys.moveRight)}
                  </kbd>
                </div>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-love-cream">Jump &amp; Platforming</span>
                <kbd className="px-3 py-1 rounded bg-love-darkPurple border border-love-pink/40 text-love-cream font-mono font-bold">
                  {formatKey(keys.jump)}
                </kbd>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <span className="text-love-cream">Dodge Dash (Invulnerable)</span>
                <kbd className="px-2.5 py-1 rounded bg-love-darkPurple border border-love-pink/40 text-love-cream font-mono font-bold">
                  {formatKey(keys.dodge)}
                </kbd>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-love-cream">Pause Chronicles</span>
                <kbd className="px-2.5 py-1 rounded bg-love-darkPurple border border-love-pink/40 text-love-cream font-mono font-bold">
                  {formatKey(keys.pause)}
                </kbd>
              </div>
            </div>
          </div>

          {/* Magical Combat & Synergy */}
          <div className="p-4 rounded-xl bg-love-midnight/50 border border-love-secondaryPurple/30 space-y-3">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-love-pink flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-love-pink" />
              <span>Combat &amp; Spells</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <div>
                  <p className="text-love-cream font-medium">Basic Melee Strike</p>
                  <p className="text-[10px] text-love-softPink/60">Fast close-quarters staff swing</p>
                </div>
                <kbd className="px-2.5 py-1 rounded bg-love-darkPurple border border-love-pink/40 text-love-cream font-mono font-bold">
                  {formatKey(keys.attackBasic)}
                </kbd>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <div>
                  <p className="text-love-cream font-medium">Love Magic Staff Bolt</p>
                  <p className="text-[10px] text-love-softPink/60">Ranged pink orb that tracks foes</p>
                </div>
                <kbd className="px-2.5 py-1 rounded bg-love-darkPurple border border-love-pink/40 text-love-cream font-mono font-bold">
                  {formatKey(keys.attackStaff)}
                </kbd>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-white/5">
                <div>
                  <p className="text-love-cream font-medium">Princess Elinore Blessing</p>
                  <p className="text-[10px] text-love-softPink/60">Companion protective starlight barrier</p>
                </div>
                <kbd className="px-2.5 py-1 rounded bg-love-darkPurple border border-love-gold/60 text-love-gold font-mono font-bold">
                  {formatKey(keys.companionAbility)}
                </kbd>
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-love-cream font-medium">Dominance Ultimate Surge</p>
                  <p className="text-[10px] text-love-violet">Transform into Violet Dominance (100% Meter)</p>
                </div>
                <kbd className="px-2.5 py-1 rounded bg-love-deepViolet/80 border border-love-violet text-love-cream font-mono font-bold shadow-violet-glow">
                  {formatKey(keys.dominanceUltimate)}
                </kbd>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile Touch Controls Layout Guide */
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-gradient-to-r from-love-darkPurple/80 to-love-midnight border border-love-secondaryPurple/40">
            <h3 className="font-cinzel text-sm font-bold text-love-gold mb-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-love-gold" />
              <span>Mobile Touch Ergonomics</span>
            </h3>

            {/* Visual Touch Layout Representation */}
            <div className="relative w-full h-48 rounded-lg bg-love-midnight/80 border border-love-pink/20 overflow-hidden flex items-center justify-between px-6">
              {/* Left Joystick Area */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full border-2 border-love-softPink/40 bg-love-darkPurple/50 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-love-pink/80 shadow-love-glow" />
                </div>
                <span className="text-[10px] font-cinzel text-love-softPink/80 mt-2">Analog Joystick</span>
              </div>

              {/* Center Game Space */}
              <div className="text-center opacity-40">
                <p className="font-cinzel text-xs text-love-cream">16:9 Landscape Screen</p>
                <p className="text-[10px] text-love-softPink">Rotate phone to landscape</p>
              </div>

              {/* Right Action Clusters */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-love-deepViolet/80 border border-love-violet flex items-center justify-center text-[10px] font-bold text-white shadow-violet-glow">
                    Q
                  </div>
                  <div className="w-9 h-9 rounded-full bg-love-darkPurple border border-love-gold/60 flex items-center justify-center text-[10px] font-bold text-love-gold">
                    E
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-11 h-11 rounded-full bg-love-darkPurple border border-love-pink flex items-center justify-center text-xs font-bold text-love-pink">
                    Staff
                  </div>
                  <div className="w-11 h-11 rounded-full bg-love-pink text-love-midnight flex items-center justify-center text-xs font-bold">
                    Jump
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <span className="font-cinzel font-bold text-love-cream">Left Thumb</span>
              <p className="text-[10px] text-love-softPink/70 mt-1">Free-floating responsive movement pad</p>
            </div>
            <div className="p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <span className="font-cinzel font-bold text-love-cream">Right Thumb</span>
              <p className="text-[10px] text-love-softPink/70 mt-1">Multi-touch buttons for attack &amp; spells</p>
            </div>
            <div className="p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <span className="font-cinzel font-bold text-love-cream">Top Right</span>
              <p className="text-[10px] text-love-softPink/70 mt-1">Direct instant pause button</p>
            </div>
            <div className="p-3 rounded-lg bg-love-midnight/40 border border-love-secondaryPurple/20">
              <span className="font-cinzel font-bold text-love-cream">Haptic Feedback</span>
              <p className="text-[10px] text-love-softPink/70 mt-1">Vibration on staff cast &amp; ultimate</p>
            </div>
          </div>
        </div>
      )}
    </ModalWrapper>
  );
};
