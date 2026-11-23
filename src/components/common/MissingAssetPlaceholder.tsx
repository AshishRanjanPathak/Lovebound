import React from 'react';
import { getAssetById } from '../../assets/assetManifest';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

interface MissingAssetPlaceholderProps {
  assetId: string;
  className?: string;
  type?: 'logo' | 'heroine' | 'princess' | 'boss' | 'portrait' | 'background' | 'generic';
  aspectRatio?: string;
}

export const MissingAssetPlaceholder: React.FC<MissingAssetPlaceholderProps> = ({
  assetId,
  className = '',
  type = 'generic',
  aspectRatio = 'aspect-square',
}) => {
  const asset = getAssetById(assetId);

  // Determine silhouette / decorative content based on type or asset category
  const renderArtisticFallback = () => {
    switch (type) {
      case 'logo':
        return (
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-love-pink/30 to-love-violet/30 blur-xl rounded-full" />
              <h1 className="relative font-cinzel text-4xl sm:text-6xl md:text-7xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-love-softPink to-love-pink drop-shadow-[0_4px_25px_rgba(255,121,183,0.65)]">
                LOVEBOUND
              </h1>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-love-gold" />
              <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-love-gold">
                Threads of Fate &amp; Devotion
              </p>
              <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-love-gold" />
            </div>
          </div>
        );

      case 'heroine':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-end overflow-hidden">
            {/* Magical Aura */}
            <div className="absolute bottom-0 w-72 h-96 bg-gradient-to-t from-love-pink/30 via-love-violet/20 to-transparent blur-2xl rounded-full animate-pulse-glow" />
            
            {/* Stylized Anime Heroine Silhouette with Staff */}
            <svg
              viewBox="0 0 300 500"
              className="w-full h-full max-h-[85vh] drop-shadow-[0_0_25px_rgba(255,121,183,0.5)] z-10 animate-float-slow"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Magical Staff */}
              <line x1="210" y1="50" x2="160" y2="480" stroke="#FF79B7" strokeWidth="6" strokeLinecap="round" />
              <circle cx="210" cy="50" r="28" stroke="#E9C77B" strokeWidth="4" fill="#21162F" />
              <path d="M 210,32 C 215,22 225,22 230,28 C 235,34 225,48 210,56 C 195,48 185,34 190,28 C 195,22 205,22 210,32 Z" fill="#FF79B7" />
              <circle cx="210" cy="50" r="8" fill="#FFF4EB" className="animate-ping" />

              {/* Heroine Silhouette */}
              {/* Head & Hair */}
              <circle cx="130" cy="110" r="32" fill="#2B1B3D" stroke="#F49AC2" strokeWidth="2" />
              {/* Long Anime Twin Tails */}
              <path d="M 115 120 Q 70 200 60 340 Q 80 260 115 160 Z" fill="#3D204E" opacity="0.9" />
              <path d="M 145 120 Q 170 220 180 350 Q 155 250 145 160 Z" fill="#3D204E" opacity="0.9" />
              {/* Flowing Magical Robe / Dress */}
              <path d="M 110 140 L 150 140 L 175 320 L 85 320 Z" fill="url(#heroineGrad)" stroke="#FF79B7" strokeWidth="1.5" />
              <path d="M 85 320 Q 130 460 70 480 Q 140 430 190 480 Q 175 380 175 320 Z" fill="#1C1226" stroke="#8B5CF6" strokeWidth="2" />
              
              {/* Gradients */}
              <defs>
                <linearGradient id="heroineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#55306F" />
                  <stop offset="50%" stopColor="#2B163E" />
                  <stop offset="100%" stopColor="#101323" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute bottom-6 z-20 px-3 py-1 bg-love-darkPurple/80 border border-love-pink/40 rounded-full text-xs text-love-cream flex items-center gap-1.5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-love-pink animate-spin" />
              <span className="font-cinzel text-[11px] tracking-wider text-love-softPink">Astraea — Heroine of Love Magic</span>
            </div>
          </div>
        );

      case 'princess':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-end overflow-hidden">
            {/* Princess Aura */}
            <div className="absolute bottom-4 w-48 h-64 bg-gradient-to-t from-love-gold/25 via-love-softPink/15 to-transparent blur-xl rounded-full" />
            
            {/* Companion Princess Silhouette */}
            <svg
              viewBox="0 0 240 400"
              className="w-full h-full max-h-[65vh] drop-shadow-[0_0_20px_rgba(233,199,123,0.5)] z-10 animate-float-reverse"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tiara */}
              <path d="M 110,65 L 120,50 L 130,65 L 140,55 L 150,65" stroke="#E9C77B" strokeWidth="3" strokeLinecap="round" />
              <circle cx="130" cy="58" r="3" fill="#FF79B7" />

              {/* Princess Head & Ribbon */}
              <circle cx="130" cy="95" r="24" fill="#241433" stroke="#E9C77B" strokeWidth="2" />
              {/* Soft Princess Gown */}
              <path d="M 115 120 L 145 120 L 175 300 L 85 300 Z" fill="url(#princessGrad)" stroke="#F49AC2" strokeWidth="1.5" />
              <path d="M 85 300 Q 130 380 90 395 Q 130 360 170 395 Q 160 330 175 300 Z" fill="#1E102A" stroke="#E9C77B" strokeWidth="1.5" />
              
              <defs>
                <linearGradient id="princessGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4A214D" />
                  <stop offset="100%" stopColor="#1A0D23" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute bottom-4 z-20 px-3 py-1 bg-love-darkPurple/80 border border-love-gold/40 rounded-full text-xs text-love-cream flex items-center gap-1.5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-love-gold animate-ping" />
              <span className="font-cinzel text-[11px] tracking-wider text-love-gold">Princess Elinore</span>
            </div>
          </div>
        );

      case 'portrait':
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-love-secondaryPurple/50 via-love-darkPurple to-love-midnight border-2 border-love-pink/40 rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-love-midnight via-transparent to-transparent opacity-60" />
            <div className="flex flex-col items-center justify-center p-2 text-center z-10">
              <Sparkles className="w-8 h-8 text-love-pink/70 mb-1" />
              <span className="font-cinzel text-xs font-semibold text-love-cream/90 truncate max-w-[90%]">
                {asset?.purpose?.split(' ')[0] || 'Character'}
              </span>
            </div>
          </div>
        );

      case 'boss':
        return (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-love-deepViolet/40 to-love-midnight border border-love-violet/50 rounded-xl p-4 text-center">
            <div className="w-16 h-16 rounded-full bg-love-darkPurple flex items-center justify-center border-2 border-love-violet/60 mb-2 shadow-violet-glow">
              <span className="font-cinzel font-bold text-xl text-love-violet">BOSS</span>
            </div>
            <p className="font-cinzel font-semibold text-sm text-love-cream">{asset?.id.replace('boss-', '').toUpperCase()}</p>
            <p className="text-[11px] text-love-softPink/80 mt-1 max-w-[180px]">{asset?.purpose}</p>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center w-full h-full p-4 border border-love-secondaryPurple/30 rounded-lg bg-love-darkPurple/30 text-center">
            <ImageIcon className="w-6 h-6 text-love-softPink/50 mb-1" />
            <span className="text-xs text-love-cream/70 font-cinzel">{asset?.purpose || 'Game Asset'}</span>
            <span className="text-[10px] text-love-softPink/60 mt-1">{asset?.path}</span>
          </div>
        );
    }
  };

  return (
    <div className={`relative ${aspectRatio} ${className}`} title={asset?.path || assetId}>
      {renderArtisticFallback()}
    </div>
  );
};
