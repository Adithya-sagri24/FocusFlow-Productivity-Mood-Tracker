// Fix: Implemented the missing Zustand store for managing global application state.
import { create } from 'zustand';
import type { Session } from '../types';

interface AppState {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));
