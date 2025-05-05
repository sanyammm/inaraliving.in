import { create } from 'zustand';
import { AdminUser } from '../types';

interface AuthStore {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    // In a real app, this would make an API call
    if (email === 'admin@example.com' && password === 'admin123') {
      set({ user: { email, isAuthenticated: true } });
    } else {
      throw new Error('Invalid credentials');
    }
  },
  logout: () => set({ user: null }),
}));