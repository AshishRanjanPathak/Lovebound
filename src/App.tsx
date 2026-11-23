import React, { useEffect } from 'react';
import { useUIStore } from './stores/useUIStore';
import { useGameStore } from './stores/useGameStore';
import { SplashScreen } from './components/menu/SplashScreen';
import { MainMenu } from './components/menu/MainMenu';
import { PhaserGame } from './game/PhaserGame';
import { ParticleBackground } from './components/common/ParticleBackground';

export const App: React.FC = () => {
  const { view, currentOverlay, openOverlay, closeOverlay } = useUIStore();
  const { setPaused } = useGameStore();

  // Global ESC key handling for navigation hierarchy
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (view === 'gameplay') {
          if (currentOverlay === 'pause') {
            setPaused(false);
            closeOverlay();
          } else if (currentOverlay !== null) {
            closeOverlay();
          } else {
            setPaused(true);
            openOverlay('pause');
          }
        } else if (view === 'main-menu') {
          if (currentOverlay !== null) {
            closeOverlay();
          }
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [view, currentOverlay, openOverlay, closeOverlay, setPaused]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-love-midnight text-love-cream font-sans">
      {/* Background Particles (Active in menus) */}
      {view !== 'gameplay' && <ParticleBackground />}

      {/* Main View Switcher */}
      {view === 'splash' && <SplashScreen />}
      {view === 'main-menu' && <MainMenu />}
      {view === 'gameplay' && <PhaserGame />}
    </div>
  );
};

export default App;
