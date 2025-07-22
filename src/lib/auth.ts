import { create } from 'zustand';
import { AdminUser } from '../types';

interface AuthStore {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<{ token: string; user: AdminUser }>;
  logout: () => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  login: async (email, password) => {
    const response = await fetch('https://inaraliving-in.onrender.com/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json(); // { token, user }

    localStorage.setItem('token', data.token);

    set({
      user: {
        email: data.user.email,
        isAuthenticated: true,
      },
    });

    return { token: data.token, user: data.user };
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null });
  },
}));
