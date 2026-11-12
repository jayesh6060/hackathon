import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wdhlzgryxfjlxtjdddrz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_B45_HYbMxyl3lpQdndublQ_M0c058VB';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
