// Fix: Removed `/// <reference types="vite/client" />` as it was causing a "Cannot find type definition" error.
import { createClient } from '@supabase/supabase-js';

// Fix: Use Vite's `import.meta.env` for environment variables.
// Fix: Cast `import.meta` to `any` to bypass TypeScript errors about the missing `env` property.
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anon key are required. Please check your environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY).");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);