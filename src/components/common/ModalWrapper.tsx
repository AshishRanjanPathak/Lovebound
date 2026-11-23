import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface ModalWrapperProps {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  closeOnBackdropClick?: boolean;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  children,
  maxWidth = 'max-w-3xl',
  closeOnBackdropClick = true,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-love-midnight/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background dismissal */}
      <div
        className="absolute inset-0"
        onClick={() => {
          if (closeOnBackdropClick) {
            audioService.playSound('menu-close');
            onClose();
          }
        }}
      />

      {/* Modal Dialog Container */}
      <div
        className={`relative z-10 w-full ${maxWidth} max-h-[92vh] flex flex-col bg-gradient-to-b from-love-darkPurple via-love-midnight to-love-darkPurple border border-love-pink/40 rounded-xl shadow-2xl shadow-love-midnight/90 overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ornate Gold Border Corners */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-love-gold pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-love-gold pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-love-gold pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-love-gold pointer-events-none" />

        {/* Modal Header */}
        <div className="relative px-6 py-5 border-b border-love-secondaryPurple/50 flex items-center justify-between bg-love-darkPurple/40">
          <div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-love-cream via-love-softPink to-love-pink drop-shadow">
              {title}
            </h2>
            {subtitle && (
              <p className="font-cinzel text-xs tracking-widest text-love-gold/90 mt-0.5 uppercase">
                {subtitle}
              </p>
            )}
          </div>

          <button
            onClick={() => {
              audioService.playSound('menu-close');
              onClose();
            }}
            className="p-1.5 rounded-lg text-love-softPink hover:text-white hover:bg-love-secondaryPurple/50 transition-colors border border-transparent hover:border-love-pink/40"
            title="Close (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-100px)] custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
