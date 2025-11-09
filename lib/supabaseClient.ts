/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

// Fix: Use Vite's `import.meta.env` for environment variables.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anon key are required. Please check your environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);