import { NavLink } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

export default function BottomNav({ favoritesCount = 0 }) {
  const { t } = useLanguage();

  const NAV_ITEMS = [
    {
      path: '/explore',
      label: t('nav.explore'),
      color: '#7c3aed',
      bg: 'rgba(124,58,237,0.12)',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth={active ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={active ? 'currentColor' : 'none'} />
        </svg>
      ),
    },
    {
      path: '/favorites',
      label: t('nav.saved'),
      color: '#f43f5e',
      bg: 'rgba(244,63,94,0.10)',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24"
             fill={active ? 'currentColor' : 'none'}
             stroke="currentColor" strokeWidth={active ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      ),
    },
    {
      path: '/bookings',
      label: t('nav.bookings'),
      color: '#06b6d4',
      bg: 'rgba(6,182,212,0.10)',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor" strokeWidth={active ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill={active ? 'currentColor' : 'none'} stroke="currentColor" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      path: '/guides',
      label: 'Guides',
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.10)',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24"
             fill={active ? 'currentColor' : 'none'}
             stroke="currentColor" strokeWidth={active ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      path: '/profile',
      label: t('nav.profile'),
      color: '#f97316',
      bg: 'rgba(249,115,22,0.10)',
      icon: (active) => (
        <svg width="22" height="22" viewBox="0 0 24 24"
             fill={active ? 'currentColor' : 'none'}
             stroke="currentColor" strokeWidth={active ? 2 : 1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-107.5 z-50"
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(124,58,237,0.10)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.10)',
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)',
      }}
    >
      <div className="flex items-center justify-around px-1 pt-1.5 pb-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/explore'}
            className="flex items-center justify-center"
            style={{ minHeight: '52px', flex: 1 }}
          >
            {({ isActive }) => (
              <div
                className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${isActive ? 'nav-item-active' : ''}`}
                style={{
                  borderRadius: '14px',
                  padding: isActive ? '6px 14px' : '6px 12px',
                  background: isActive ? item.bg : 'transparent',
                  color: isActive ? item.color : '#94a3b8',
                  minWidth: isActive ? '72px' : 'auto',
                }}
              >
                <div className="relative">
                  {item.icon(isActive)}
                  {item.label === t('nav.saved') && favoritesCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 min-w-4 h-4 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5"
                      style={{ background: 'linear-gradient(135deg, #f43f5e, #f97316)' }}
                    >
                      {favoritesCount > 9 ? '9+' : favoritesCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold leading-none">
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
