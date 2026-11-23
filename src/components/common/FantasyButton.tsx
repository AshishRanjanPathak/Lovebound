import React from 'react';
import { audioService } from '../../services/audioService';

interface FantasyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const FantasyButton: React.FC<FantasyButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  disabled,
  onClick,
  onMouseEnter,
  ...rest
}) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      audioService.playSound('button-hover');
    }
    onMouseEnter?.(e);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      audioService.playSound('button-click');
    }
    onClick?.(e);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-semibold tracking-wider',
    md: 'px-6 py-3 text-sm font-bold tracking-widest',
    lg: 'px-8 py-4 text-base font-extrabold tracking-[0.2em]',
  }[size];

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-love-secondaryPurple via-love-darkPurple to-love-secondaryPurple text-love-cream border border-love-pink/50 hover:border-love-pink hover:shadow-love-glow active:scale-[0.98]',
    secondary:
      'bg-love-midnight/80 text-love-cream/90 border border-love-softPink/30 hover:border-love-softPink hover:bg-love-darkPurple/60 hover:text-white active:scale-[0.98]',
    gold:
      'bg-gradient-to-r from-love-darkPurple via-love-secondaryPurple to-love-darkPurple text-love-gold border border-love-gold/60 hover:border-love-gold hover:shadow-gold-glow active:scale-[0.98]',
    danger:
      'bg-gradient-to-r from-red-950 via-love-darkPurple to-red-950 text-red-200 border border-red-500/50 hover:border-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] active:scale-[0.98]',
  }[variant];

  const disabledClasses = disabled
    ? 'opacity-40 cursor-not-allowed filter grayscale hover:shadow-none hover:border-transparent active:scale-100 pointer-events-none'
    : 'cursor-pointer transition-all duration-200';

  return (
    <button
      {...rest}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`relative group font-cinzel uppercase rounded-md overflow-hidden select-none outline-none focus-visible:ring-2 focus-visible:ring-love-pink/80 flex items-center justify-center gap-2 ${sizeClasses} ${variantClasses} ${disabledClasses} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {/* Subtle corner decorations */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-love-gold opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-love-gold opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-love-gold opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-love-gold opacity-60 group-hover:opacity-100 transition-opacity" />

      {/* Hover shimmer line */}
      <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />

      {icon && <span className="relative z-10 transition-transform group-hover:scale-110">{icon}</span>}
      <span className="relative z-10 drop-shadow-sm">{children}</span>
    </button>
  );
};
