import { create } from 'zustand';
import type { Session } from '@supabase/supabase-js';

interface AppState {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

// Fix: Changed to a named import for `create` to match modern zustand usage.
export const useAppStore = create<AppState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));