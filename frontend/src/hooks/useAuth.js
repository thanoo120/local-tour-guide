import { useState, useCallback } from 'react';

const STORAGE_KEY = 'lanka_guide_user';

const DEMO_USERS = [
  { email: 'demo@lankaguide.com', password: 'demo1234', name: 'Demo User', initials: 'DU' },
  { email: 'admin@lankaguide.com', password: 'admin123', name: 'Admin', initials: 'AD' },
];

function loadUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveUser(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
}

export function useAuth() {
  const [user, setUser] = useState(() => loadUser());

  const login = useCallback(({ email, password }) => {
    const found = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { ok: false, error: 'Invalid email or password.' };
    }
    const session = { email: found.email, name: found.name, initials: found.initials };
    saveUser(session);
    setUser(session);
    return { ok: true };
  }, []);

  const signup = useCallback(({ name, email, password }) => {
    if (!name.trim()) return { ok: false, error: 'Name is required.' };
    if (!email.includes('@')) return { ok: false, error: 'Enter a valid email.' };
    if (password.length < 6) return { ok: false, error: 'Password must be at least 6 characters.' };

    const initials = name.trim().split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
    const session = { email, name: name.trim(), initials };
    saveUser(session);
    setUser(session);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    clearUser();
    setUser(null);
  }, []);

  const updateProfile = useCallback(({ name, email }) => {
    if (!name.trim()) return { ok: false, error: 'Name is required.' };
    if (!email.includes('@')) return { ok: false, error: 'Enter a valid email.' };
    const initials = name.trim().split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
    const updated = { ...loadUser(), name: name.trim(), email, initials };
    saveUser(updated);
    setUser(updated);
    return { ok: true };
  }, []);

  const updateProfilePhoto = useCallback((photoDataUrl) => {
    const updated = { ...loadUser(), photo: photoDataUrl };
    saveUser(updated);
    setUser(updated);
  }, []);

  return { user, login, signup, logout, updateProfile, updateProfilePhoto, isLoggedIn: !!user };
}
