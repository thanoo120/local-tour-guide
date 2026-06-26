import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import translations from '../data/translations';

const STORAGE_KEY = 'lanka_lang';

const LanguageContext = createContext(null);

/**
 * Provider that wraps the app to supply language / translation utilities.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = useCallback((code) => {
    setLanguageState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {}
  }, []);

  /**
   * Translate a key to the current language.
   * Falls back to English, then to the key itself.
   */
  const t = useCallback(
    (key) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[language] ?? entry.en ?? key;
    },
    [language],
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook to access language utilities anywhere in the tree.
 * @returns {{ language: string, setLanguage: (code: string) => void, t: (key: string) => string }}
 */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
