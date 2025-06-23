import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

interface Preferences {
  currency: string;
  language: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token?: string;
  avatar?: string;
  role: 'guest' | 'host';
  phone?: string;
  bio?: string;
  createdAt: string;
  preferences?: Preferences;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  initializeAuth: () => void;
  setUser: (user: Partial<User> | null) => void;
  setToken: (token: string | null) => void;
  changePassword: (data: { currentPassword: string; newPassword: string }) => Promise<void>;
  updateNotificationPreferences: (prefs: { email: boolean; sms: boolean; push: boolean }) => Promise<void>;
  updateAccountPreferences: (prefs: { currency: string; language: string }) => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/login', { email, password });
          const { user, token } = response.data;
          
          set({ user, token, isLoading: false });
          localStorage.setItem('token', token); // Store token in localStorage
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          const response = await api.post('/auth/register', userData);
          const { user, token } = response.data;
          
          set({ user, token, isLoading: false });
          localStorage.setItem('token', token); // Store token in localStorage
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.response?.data?.message || 'Registration failed');
        }
      },

      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('token'); // Remove token from localStorage
        delete api.defaults.headers.common['Authorization'];
      },

     updateProfile: async (userData) => {
  set({ isLoading: true });
  try {
    const response = await api.put('/auth/profile', userData);
    const { user } = response.data;
    
    set({ user, isLoading: false });
  } catch (error: any) {
    set({ isLoading: false });
    throw new Error(error.response?.data?.message || 'Profile update failed');
  }
},

      initializeAuth: () => {
        const { token } = get();
        if (token) {
          localStorage.setItem('token', token); // Sync token to localStorage
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
      },

      setUser: (user) => {
        if (user === null) {
          set({ user: null });
        } else {
          set((state) => ({
            user: state.user ? { ...state.user, ...user } : null
          }));
        }
      },

      setToken: (token) => {
        set({ token });
        if (token) {
          localStorage.setItem('token', token); 
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        }
      },

    changePassword: async ({ currentPassword, newPassword }) => {
  set({ isLoading: true });
  try {
    
    await api.post('/auth/change-password', { currentPassword, newPassword });
    set({ isLoading: false });
  } catch (error: any) {
    set({ isLoading: false });
    throw new Error(error.response?.data?.message || 'Password change failed');
  }
},

      updateNotificationPreferences: async (prefs) => {
        set({ isLoading: true });
        try {
          const response = await api.put('/auth/notifications', prefs);
          const { user } = response.data;
          set({ user, isLoading: false });
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.response?.data?.message || 'Notification update failed');
        }
      },

      updateAccountPreferences: async (prefs) => {
        set({ isLoading: true });
        try {
          const response = await api.put('/auth/account-preferences', prefs);
          const { user } = response.data;
          set({ user, isLoading: false });
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.response?.data?.message || 'Preferences update failed');
        }
      },
    }),
    {
      name: 'stayfinder-auth',
      partialize: (state) => ({ user: state.user, token: state.token }), 
    }
  )
);