import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: Partial<User> | null;
  token: string | null;
  setAuth: (user: Partial<User>, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: (() => {
    const saved = localStorage.getItem('bbs_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  })(),
  token: localStorage.getItem('bbs_token') || null,
  setAuth: (user, token) => {
    localStorage.setItem('bbs_token', token);
    localStorage.setItem('bbs_user', JSON.stringify(user));
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('bbs_token');
    localStorage.removeItem('bbs_user');
    set({ user: null, token: null });
  },
}));
