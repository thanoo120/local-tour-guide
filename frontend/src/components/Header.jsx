import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
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
      className="flex justify-between items-center px-5 h-16 fixed top-0 z-50"
      style={{
        width: '100%',
        maxWidth: '430px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(135deg, #1a0533 0%, #0d1b4a 55%, #03254e 100%)',
        boxShadow: '0 2px 20px rgba(124,58,237,0.35)',
      }}
    >
      
      <div className="flex items-center gap-2.5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
            boxShadow: '0 2px 10px rgba(124,58,237,0.5)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="white" stroke="white" strokeWidth="1" />
          </svg>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-heading font-bold" style={{
            fontSize: '16px', lineHeight: '1.1', margin: 0,
            background: 'linear-gradient(90deg, #a78bfa, #67e8f9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            LankaGuide
          </h1>
          <span style={{ fontSize: '10px', color: 'rgba(167,139,250,0.7)', fontWeight: '400', lineHeight: '1.4', marginTop: '1px' }}>
            Sri Lanka Travel Companion
          </span>
        </div>
      </div>

    
      <div className="flex items-center gap-2">
      
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className={animating ? 'animate-theme-pop' : ''}
          style={{
            width: '34px', height: '34px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: isDark ? '#fbbf24' : '#a78bfa',
            transition: 'all 0.2s',
            cursor: 'pointer',
          }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

       
        <NavLink
          to="/profile"
          aria-label="Profile"
          className="flex items-center gap-2 active:scale-95 transition-transform"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '6px 12px 6px 8px',
          }}
        >
          {user?.photo ? (
            <img
              src={user.photo}
              alt="Profile"
              style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          ) : (
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #7c3aed, #f97316)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', fontWeight: '700', color: '#fff',
            }}>
              {(user?.name?.[0] ?? 'G').toUpperCase()}
            </div>
          )}
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px', fontWeight: '600', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {displayName}
          </span>
        </NavLink>
      </div>
    </header>
  );
}
