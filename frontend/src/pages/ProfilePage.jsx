import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAttractions } from '../hooks/useAttractions';

const STATS = [
  { label: 'Places Visited', value: '12', icon: '📍' },
  { label: 'Favorites', value: null, icon: '❤️' },
  { label: 'Reviews', value: '5', icon: '⭐' },
];

const MENU_SECTIONS = [
  {
    title: 'Preferences',
    items: [
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
          </svg>
        ),
        label: 'Language',
        value: 'English',
        chevron: true,
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        ),
        label: 'Location Services',
        value: 'On',
        chevron: false,
        toggle: true,
        defaultOn: true,
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M18 8h1a4 4 0 010 8h-1" />
            <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        ),
        label: 'Notifications',
        value: 'Off',
        chevron: false,
        toggle: true,
        defaultOn: false,
      },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        ),
        label: 'Edit Profile',
        chevron: true,
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        ),
        label: 'Privacy & Security',
        chevron: true,
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        ),
        label: 'Help & FAQ',
        chevron: true,
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        ),
        label: 'Send Feedback',
        chevron: true,
      },
      {
        icon: (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        ),
        label: 'About LankaGuide',
        value: 'v1.0.0',
        chevron: true,
      },
    ],
  },
];

function ToggleSwitch({ on, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      aria-checked={on}
      role="switch"
      style={{
        width: '44px', height: '26px', borderRadius: '999px',
        background: on ? '#00513f' : '#cbd5e1',
        border: 'none', cursor: 'pointer', padding: '3px',
        transition: 'background 0.2s',
        display: 'flex', alignItems: 'center',
        justifyContent: on ? 'flex-end' : 'flex-start',
      }}
    >
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: 'all 0.2s',
      }} />
    </button>
  );
}

function MenuItem({ item }) {
  const [on, setOn] = useState(item.defaultOn ?? false);

  return (
    <button
      type="button"
      onClick={item.toggle ? () => setOn(v => !v) : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        width: '100%', padding: '14px 20px',
        background: 'none', border: 'none', cursor: item.toggle || item.chevron ? 'pointer' : 'default',
        textAlign: 'left',
      }}
    >
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px',
        background: 'var(--color-surface-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-surface-600)', flexShrink: 0,
      }}
        className="dark:bg-surface-800 dark:text-surface-400"
      >
        {item.icon}
      </div>

      <span style={{ flex: 1, fontSize: '15px', fontWeight: '500', color: 'inherit' }}
            className="text-surface-800 dark:text-surface-200">
        {item.label}
      </span>

      {item.toggle ? (
        <ToggleSwitch on={on} onChange={setOn} />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {item.value && (
            <span style={{ fontSize: '13px' }} className="text-surface-400 dark:text-surface-500">
              {item.value}
            </span>
          )}
          {item.chevron && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 className="text-surface-400 dark:text-surface-500">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
        </div>
      )}
    </button>
  );
}

export default function ProfilePage({ user, favoritesCount = 0, onLogout }) {
  const { attractions } = useAttractions();
  const initials = user?.initials ?? '?';
  const displayName = user?.name ?? 'Traveler';
  const displayEmail = user?.email ?? '';

  const stats = STATS.map(s =>
    s.label === 'Favorites' ? { ...s, value: String(favoritesCount) } : s
  );

  return (
    <div className="page-content">

      {/* Avatar + name */}
      <div style={{ padding: '24px 20px 20px', textAlign: 'center' }}>
        <div style={{
          width: '88px', height: '88px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #016b54, #2d9e80)',
          margin: '0 auto 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(1,107,84,0.35)',
        }}>
          <span style={{
            fontFamily: 'var(--font-heading)', fontWeight: '700',
            fontSize: '28px', color: '#fff', letterSpacing: '1px',
          }}>{initials}</span>
        </div>

        <h2 className="font-heading font-bold text-surface-900 dark:text-surface-100"
            style={{ fontSize: '22px', marginBottom: '4px' }}>
          {displayName}
        </h2>
        <p className="text-surface-500 dark:text-surface-400" style={{ fontSize: '14px', marginBottom: '16px' }}>
          {displayEmail}
        </p>

        <button
          type="button"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'var(--color-primary-600)', color: '#fff',
            padding: '9px 22px', borderRadius: '999px',
            fontSize: '14px', fontWeight: '600', border: 'none', cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          Edit Profile
        </button>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex', margin: '0 20px 24px',
        background: 'var(--color-surface-100)', borderRadius: '16px',
        overflow: 'hidden',
      }} className="dark:bg-surface-800">
        {stats.map((stat, i) => (
          <div key={stat.label} style={{
            flex: 1, padding: '16px 8px', textAlign: 'center',
            borderRight: i < stats.length - 1 ? '1px solid var(--color-surface-200)' : 'none',
          }} className={i < stats.length - 1 ? 'dark:border-r dark:border-surface-700' : ''}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{stat.icon}</div>
            <div className="font-heading font-bold text-surface-900 dark:text-surface-100"
                 style={{ fontSize: '20px', lineHeight: '1' }}>
              {stat.value}
            </div>
            <div className="text-surface-500 dark:text-surface-400"
                 style={{ fontSize: '11px', marginTop: '3px', lineHeight: '1.3' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Menu sections */}
      {MENU_SECTIONS.map((section) => (
        <div key={section.title} style={{ marginBottom: '8px' }}>
          <p className="text-surface-400 dark:text-surface-500"
             style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
                      letterSpacing: '0.08em', padding: '0 20px 6px' }}>
            {section.title}
          </p>
          <div style={{
            margin: '0 20px',
            background: '#fff',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }} className="dark:bg-surface-900">
            {section.items.map((item, i) => (
              <div key={item.label}>
                <MenuItem item={item} />
                {i < section.items.length - 1 && (
                  <div style={{ height: '1px', background: 'var(--color-surface-100)', margin: '0 20px' }}
                       className="dark:bg-surface-800" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Sign out */}
      <div style={{ padding: '16px 20px 8px' }}>
        <button
          type="button"
          onClick={onLogout}
          style={{
            width: '100%', padding: '14px',
            background: '#fff1f2', color: '#e11d48',
            borderRadius: '16px', border: 'none', cursor: 'pointer',
            fontSize: '15px', fontWeight: '600',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          }}
          className="dark:bg-red-950/30 dark:text-red-400"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>

      {/* Explore CTA */}
      <div style={{ padding: '8px 20px 16px', textAlign: 'center' }}>
        <p className="text-surface-400 dark:text-surface-600" style={{ fontSize: '12px' }}>
          Discover more of Sri Lanka →{' '}
          <Link to="/explore" className="text-primary-600 dark:text-primary-400 font-semibold">
            Explore now
          </Link>
        </p>
      </div>

    </div>
  );
}
