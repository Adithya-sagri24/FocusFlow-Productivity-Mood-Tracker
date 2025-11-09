import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAppStore } from '../store/useAppStore';

export const useAuth = () => {
  const session = useAppStore((state) => state.session);
  const setSession = useAppStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [setSession]);

  return { session };
};
