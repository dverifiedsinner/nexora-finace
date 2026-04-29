import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uhhpaerwzxrqjddyqrho.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoaHBhZXJ3enhycWpkZHlxcmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MDk2ODgsImV4cCI6MjA5Mjk4NTY4OH0.5Ma9zJPX9wyqmHEMyPvQgMmiez6_3E-5N7Uhi-SHvF8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
