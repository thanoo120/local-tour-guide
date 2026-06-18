export default function Header() {
  return (
    <header className="flex justify-between items-center px-5 h-16 w-full fixed top-0 z-50
                       bg-white dark:bg-surface-900 shadow-sm">
      <button
        type="button"
        aria-label="Menu"
        className="text-surface-500 dark:text-surface-400 active:scale-95 transition-transform"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      <h1 className="font-heading font-bold text-xl text-primary-600 dark:text-primary-300">
        LankaGuide
      </h1>

      <button
        type="button"
        aria-label="Profile"
        className="w-10 h-10 rounded-full overflow-hidden active:scale-95 transition-transform"
      >
        <div className="w-full h-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center
                        text-primary-600 dark:text-primary-300 font-bold text-sm font-heading">
          TG
        </div>
      </button>
    </header>
  );
}
