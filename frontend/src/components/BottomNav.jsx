import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/explore', icon: 'explore', label: 'Explore' },
  { path: '/favorites', icon: 'favorite', label: 'Favorites' },
];

/**
 * Mobile bottom navigation bar with animated active state indicator.
 */
export default function BottomNav({ favoritesCount = 0 }) {
  return (
    <nav
      id="bottom-nav"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50
                 glass border-t border-surface-200 dark:border-surface-800"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 8px)' }}
    >
      <div className="flex items-center justify-around px-2 pt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `touch-target flex flex-col items-center gap-0.5 px-4 py-1 rounded-2xl
               transition-all duration-300 relative
               ${isActive
                 ? 'text-primary-600 dark:text-primary-400'
                 : 'text-surface-400 dark:text-surface-500 hover:text-surface-600 dark:hover:text-surface-300'
               }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator pill */}
                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 
                                   bg-primary-500 rounded-full animate-fade-in" />
                )}

                <NavIcon name={item.icon} isActive={isActive} />

                {/* Favorites badge */}
                {item.icon === 'favorite' && favoritesCount > 0 && (
                  <span className="absolute -top-0.5 right-2 min-w-[18px] h-[18px] 
                                   bg-red-500 text-white text-[10px] font-bold 
                                   rounded-full flex items-center justify-center px-1
                                   animate-fade-in">
                    {favoritesCount > 9 ? '9+' : favoritesCount}
                  </span>
                )}

                <span className={`text-[10px] font-medium transition-all duration-300
                                  ${isActive ? 'font-semibold' : ''}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function NavIcon({ name, isActive }) {
  const strokeWidth = isActive ? 2.5 : 1.8;
  const size = 24;

  const icons = {
    home: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2" />
      </svg>
    ),
    explore: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    favorite: isActive ? (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"
           strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ) : (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  };

  return icons[name] || null;
}
