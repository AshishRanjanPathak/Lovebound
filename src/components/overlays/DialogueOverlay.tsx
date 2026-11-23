import React, { useState, useEffect } from 'react';
import { useUIStore } from '../../stores/useUIStore';
import { useSettingsStore } from '../../stores/useSettingsStore';
import { MissingAssetPlaceholder } from '../common/MissingAssetPlaceholder';
import { audioService } from '../../services/audioService';
import { FastForward, ChevronRight } from 'lucide-react';

export const DialogueOverlay: React.FC = () => {
  const { activeDialogue, activeDialogueIndex, nextDialogue, setDialogue } = useUIStore();
  const { settings } = useSettingsStore();

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const currentNode = activeDialogue?.nodes[activeDialogueIndex];

  const getSpeedMs = () => {
    switch (settings.gameplay.dialogueSpeed) {
      case 'slow':
        return 45;
      case 'fast':
        return 12;
      case 'instant':
        return 0;
      case 'normal':
      default:
        return 25;
    }
  };

  useEffect(() => {
    if (!currentNode) return;

    if (settings.gameplay.dialogueSpeed === 'instant') {
      setDisplayedText(currentNode.text);
      setIsTyping(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);

    let charIndex = 0;
    const speed = getSpeedMs();
    const fullText = currentNode.text;

    const timer = setInterval(() => {
      charIndex++;
      setDisplayedText(fullText.slice(0, charIndex));

      // Optional sound blip on characters
      if (charIndex % 3 === 0) {
        audioService.playSound('button-hover');
      }

      if (charIndex >= fullText.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [currentNode, settings.gameplay.dialogueSpeed]);

  if (!activeDialogue || !currentNode) return null;

  const handleAdvance = () => {
    if (isTyping) {
      // Complete current line
      setDisplayedText(currentNode.text);
      setIsTyping(false);
      audioService.playSound('button-hover');
    } else {
      audioService.playSound('button-click');
      nextDialogue();
    }
  };

  const handleSkip = () => {
    audioService.playSound('menu-close');
    setDialogue(null);
  };

  const getSpeakerColor = () => {
    switch (currentNode.speaker) {
      case 'heroine':
        return 'text-love-pink border-love-pink/50';
      case 'princess':
        return 'text-love-gold border-love-gold/50';
      case 'hata':
        return 'text-emerald-400 border-emerald-500/50';
      case 'bunny':
        return 'text-fuchsia-400 border-fuchsia-500/50';
      case 'rishi':
        return 'text-amber-400 border-amber-500/50';
      default:
        return 'text-love-cream border-white/40';
    }
  };

  return (
    <div
      onClick={handleAdvance}
      className="fixed inset-0 z-50 flex flex-col justify-end p-4 sm:p-8 bg-love-midnight/60 backdrop-blur-sm select-none cursor-pointer"
    >
      {/* Skip Button Top Right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSkip();
        }}
        className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-love-darkPurple/80 border border-love-pink/40 text-xs font-cinzel text-love-softPink hover:text-white hover:border-love-pink transition-all"
      >
        <FastForward className="w-3.5 h-3.5" />
        <span>Skip Cutscene</span>
      </button>

      {/* Main Dialogue Box Container */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleAdvance();
        }}
        className="relative w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center sm:items-end gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-love-darkPurple/95 via-love-midnight/95 to-love-darkPurple/95 border-2 border-love-pink/50 shadow-2xl shadow-love-midnight"
      >
        {/* Character Portrait Frame */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-xl overflow-hidden border-2 border-love-pink/60 bg-love-midnight shadow-card-soft">
          <MissingAssetPlaceholder
            assetId={currentNode.portraitAssetId}
            type="portrait"
            className="w-full h-full"
          />
        </div>

        {/* Text Area */}
        <div className="flex-1 w-full space-y-2">
          {/* Speaker Name Tag */}
          <div className="flex items-center gap-2">
            <span className={`font-cinzel text-base sm:text-lg font-bold tracking-wider ${getSpeakerColor()}`}>
              {currentNode.speakerName}
            </span>
            {currentNode.speakerTitle && (
              <span className="font-cinzel text-xs text-love-cream/60">
                &bull; {currentNode.speakerTitle}
              </span>
            )}
          </div>

          {/* Typewriter Dialogue Text */}
          <p className="text-sm sm:text-base text-love-cream font-sans min-h-[56px] leading-relaxed">
            {displayedText}
            {isTyping && <span className="inline-block w-1.5 h-4 ml-1 bg-love-pink animate-pulse" />}
          </p>

          {/* Advance Prompt */}
          <div className="flex justify-end pt-1">
            <span className="flex items-center gap-1 font-cinzel text-[11px] text-love-softPink/80 animate-pulse">
              <span>Press Space or Click to continue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
