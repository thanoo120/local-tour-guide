import { useEffect, useState } from 'react';

export function useTheme() {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('lanka_theme') ?? 'light';
  });

  useEffect(() => {
    const root = document.documentElement;

    const apply = (t) => {
      if (t === 'dark') {
        root.classList.add('dark');
      } else if (t === 'light') {
        root.classList.remove('dark');
      } else {
        const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', sysDark);
      }
    };

    apply(theme);

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => apply('system');
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [theme]);

  const setTheme = (t) => {
    setThemeState(t);
    localStorage.setItem('lanka_theme', t);
  };

  return { theme, setTheme };
}
