import { createClient } from '@supabase/supabase-js';

// Accessing the variables from your .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Must match .env exactly

export const supabase = createClient(supabaseUrl, supabaseKey);