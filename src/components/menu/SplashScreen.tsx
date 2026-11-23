import React, { useState, useEffect } from 'react';
import { useUIStore } from '../../stores/useUIStore';
import { audioService } from '../../services/audioService';
import { MissingAssetPlaceholder } from '../common/MissingAssetPlaceholder';
import { assetValidator } from '../../assets/assetValidator';
import { Sparkles, FastForward } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setView } = useUIStore();
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasVisited] = useState(() => {
    try {
      return localStorage.getItem('lovebound_visited') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Quick asset validation check in background
    assetValidator.validateAll();

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        return prev + 4;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const handleProceed = () => {
    audioService.playSound('button-click');
    try {
      localStorage.setItem('lovebound_visited', 'true');
    } catch {
      // ignore
    }
    setView('main-menu');
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        handleProceed();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div
      onClick={isLoaded ? handleProceed : undefined}
      className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-love-midnight via-love-darkPurple to-love-midnight select-none overflow-hidden cursor-pointer"
    >
      {/* Background ethereal radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(85,48,111,0.45)_0%,rgba(16,19,35,0.95)_75%)]" />

      {/* Floating starry particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-love-pink animate-ping opacity-75" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-love-gold animate-pulse opacity-60" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-love-violet animate-pulse-glow" />
      </div>

      {/* Skip button for returning players */}
      {hasVisited && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleProceed();
          }}
          className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-love-darkPurple/80 border border-love-pink/40 text-xs font-cinzel text-love-softPink hover:text-white hover:border-love-pink transition-all"
        >
          <FastForward className="w-3.5 h-3.5" />
          <span>Skip</span>
        </button>
      )}

      {/* Main Logo & Title Composition */}
      <div className="relative z-10 flex flex-col items-center max-w-lg px-6 animate-in fade-in zoom-in-95 duration-700">
        <MissingAssetPlaceholder assetId="branding-logo-main" type="logo" className="mb-8" />

        {/* Loading Progress Bar */}
        <div className="w-64 sm:w-80 flex flex-col items-center gap-2">
          <div className="w-full h-1.5 bg-love-midnight/80 rounded-full overflow-hidden border border-love-secondaryPurple/50 p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-love-pink via-love-violet to-love-gold rounded-full transition-all duration-100 ease-out shadow-love-glow"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between w-full text-[11px] font-cinzel text-love-cream/70">
            <span>{isLoaded ? 'Awakening Magic...' : 'Preparing Kingdom...'}</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Start Prompt */}
        <div className="h-10 mt-6 flex items-center justify-center">
          {isLoaded && (
            <div className="flex items-center gap-2 text-love-cream font-cinzel text-sm sm:text-base tracking-[0.25em] uppercase animate-pulse">
              <Sparkles className="w-4 h-4 text-love-pink animate-spin" />
              <span>Click Anywhere to Enter</span>
              <Sparkles className="w-4 h-4 text-love-gold animate-spin" />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-center z-10">
        <p className="font-cinzel text-[11px] text-love-softPink/50 tracking-wider">
          LOVEBOUND &bull; 2D Anime Action-Adventure &bull; v0.1.0-alpha
        </p>
      </div>
    </div>
  );
};
