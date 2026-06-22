import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  {
    path: '/explore',
    label: 'Explore',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth={active ? 1.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={active ? 'currentColor' : 'none'} />
      </svg>
    ),
  },
  {
    path: '/favorites',
    label: 'Saved',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24"
           fill={active ? 'currentColor' : 'none'}
           stroke="currentColor" strokeWidth={active ? 1.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
  {
    path: '/bookings',
    label: 'Bookings',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor" strokeWidth={active ? 1.5 : 1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill={active ? 'currentColor' : 'none'} stroke="currentColor" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24"
           fill={active ? 'currentColor' : 'none'}
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
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50
                 bg-white dark:bg-surface-900 rounded-t-xl
                 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 12px)' }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/explore'}
            className="relative"
          >
            {({ isActive }) => (
              <div className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-200
                               ${isActive
                                 ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full px-4 py-1.5'
                                 : 'text-surface-400 dark:text-surface-500 px-3 py-1.5'
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
        ))}
      </div>
    </nav>
  );
}
