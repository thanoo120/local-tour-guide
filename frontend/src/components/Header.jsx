import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export default function Header({ user, theme, onToggleTheme }) {
  const [animating, setAnimating] = useState(false);
  const displayName = user?.name ?? user?.initials ?? 'Guest';
  const isDark = theme === 'dark';

  const handleToggle = () => {
    setAnimating(true);
    onToggleTheme();
    setTimeout(() => setAnimating(false), 400);
  };

  return (
    <header
      className="flex justify-between items-center px-5 h-16 fixed top-0 z-50 transition-all duration-200"
      style={{ background: '#1a1a1a', width: '100%', maxWidth: '430px', left: '50%', transform: 'translateX(-50%)' }}
    >
      {/* Logo + Brand */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: '#f97316' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="white" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        <div className="flex flex-col leading-tight">
          <h1 className="font-heading font-bold text-white" style={{ fontSize: '17px', lineHeight: '1.2' }}>
            LankaGuide
          </h1>
          <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '400' }}>
            Sri Lanka Travel Companion
          </span>
        </div>
      </div>

      {/* Right side: theme toggle + user pill */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className={animating ? 'animate-theme-pop' : ''}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: '#2d2d2d',
            border: '1px solid #3f3f3f',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: isDark ? '#fbbf24' : '#94a3b8',
            transition: 'color 0.2s, background 0.2s',
            cursor: 'pointer',
          }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* User pill button */}
        <NavLink
          to="/profile"
          aria-label="Profile"
          className="flex items-center gap-2 active:scale-95 transition-transform"
          style={{
            background: '#2d2d2d',
            border: '1px solid #3f3f3f',
            borderRadius: '9999px',
            padding: '7px 14px 7px 10px',
          }}
        >
          {user?.photo ? (
            <img
              src={user.photo}
              alt="Profile"
              style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}
          <span style={{ color: '#e5e7eb', fontSize: '13px', fontWeight: '500', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {displayName}
          </span>
        </NavLink>
      </div>
    </header>
  );
}
