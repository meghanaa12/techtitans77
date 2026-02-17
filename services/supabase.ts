
import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace these with your actual Supabase URL and Anon Key from the Supabase Dashboard
// Project Settings > API
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing. Authentication will fail with 'Failed to fetch'. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your environment.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to fetch resources filtered by network
 */
export const getFilteredResources = async (network: 'EDU' | 'GENERAL') => {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      // Simple filter for visibility. You can refine this based on the SQL visibility column.
      .or(`visibility.eq.${network},visibility.eq.PUBLIC`);
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Resource fetch failed:", err);
    throw err; // Propagate error so UI can handle it
  }
};
