import { useState } from 'react';

/**
 * Animated heart-shaped favorite toggle button.
 * Minimum 48x48px touch target for mobile accessibility.
 */
export default function FavoriteButton({ isFavorite, onToggle, size = 'md', className = '' }) {
  const [animating, setAnimating] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimating(true);
    onToggle();
    setTimeout(() => setAnimating(false), 600);
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 26,
  };

  return (
    <button
      onClick={handleClick}
      className={`touch-target ${sizeClasses[size]} rounded-full flex items-center justify-center
                  transition-all duration-300 active:scale-90
                  ${isFavorite
                    ? 'bg-red-50 dark:bg-red-900/30 text-red-500'
                    : 'bg-white/80 dark:bg-surface-800/80 text-surface-400 hover:text-red-400'
                  }
                  backdrop-blur-sm shadow-sm
                  ${animating ? 'animate-heartbeat' : ''}
                  ${className}`}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      type="button"
    >
      <svg
        width={iconSizes[size]}
        height={iconSizes[size]}
        viewBox="0 0 24 24"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    </button>
  );
}
