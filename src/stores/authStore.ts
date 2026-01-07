import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        // Simulate API call - replace with actual API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: '1',
          email,
          name: email.split('@')[0],
          avatar: undefined,
        };
        
        set({
          user: mockUser,
          token: 'mock-token',
          isAuthenticated: true,
          isLoading: false,
        });
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: '1',
          email,
          name,
          avatar: undefined,
        };
        
        set({
          user: mockUser,
          token: 'mock-token',
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'cloudnest-auth',
    }
  )
);
