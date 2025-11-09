import { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { supabase } from '../lib/supabaseClient';
import type { Session } from '../types';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const session = useAppStore((state) => state.session);
  const setSession = useAppStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session as Session | null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session as Session | null);
      }
    );

    return () => subscription.unsubscribe();
  }, [setSession]);

  return { session, loading };
};
