import { NavLink } from 'react-router-dom';

export default function Header({ user }) {
  const initials = user?.initials ?? '?';
  const avatar = user?.avatar;

  return (
    <header className="flex justify-between items-center px-5 h-16 w-full fixed top-0 z-50
                       bg-white dark:bg-surface-900 shadow-sm transition-all duration-200">
      <button
        type="button"
        aria-label="Menu"
        className="text-surface-500 dark:text-surface-400 active:scale-95 transition-transform
                   hover:bg-surface-100 dark:hover:bg-surface-800 p-2 rounded-full"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <h1 className="font-heading font-bold text-xl text-primary-600 dark:text-primary-400">
        LankaGuide
      </h1>

      <NavLink to="/profile" aria-label="Profile" className="active:scale-95 transition-transform">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-200 dark:border-primary-800
                        bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
          {avatar ? (
            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-primary-600 dark:text-primary-300 font-bold text-sm font-heading">
              {initials}
            </span>
          )}
        </div>
      </NavLink>
    </header>
  );
}
