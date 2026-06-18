import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  {
    path: '/explore',
    label: 'Explore',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
           stroke="currentColor" strokeWidth={active ? 1.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    path: '/favorites',
    label: 'Saved',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
           stroke="currentColor" strokeWidth={active ? 1.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    path: '/',
    label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
           stroke="currentColor" strokeWidth={active ? 1.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1m-2 0h2" />
      </svg>
    ),
  },
  {
    path: null,
    label: 'Profile',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
           stroke="currentColor" strokeWidth={active ? 1.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

export default function BottomNav({ favoritesCount = 0 }) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-107.5 z-50
                 bg-white dark:bg-surface-900 rounded-t-2xl
                 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)' }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {NAV_ITEMS.map((item) => {
          if (!item.path) {
            return (
              <button
                key={item.label}
                type="button"
                className="flex flex-col items-center justify-center gap-0.5 px-4 py-1.5
                           text-surface-400 dark:text-surface-500 transition-all"
              >
                {item.icon(false)}
                <span className="text-[11px] font-medium">{item.label}</span>
              </button>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className="relative"
            >
              {({ isActive }) => (
                <div className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-200
                                 ${isActive
                                   ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full px-5 py-1.5'
                                   : 'text-surface-400 dark:text-surface-500 px-4 py-1.5'
                                 }`}>
                  <div className="relative">
                    {item.icon(isActive)}
                    {item.label === 'Saved' && favoritesCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-4 h-4 bg-red-500 text-white
                                       text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
                        {favoritesCount > 9 ? '9+' : favoritesCount}
                      </span>
                    )}
                  </div>
                  <span className={`text-[11px] transition-all duration-200 ${isActive ? 'font-bold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
