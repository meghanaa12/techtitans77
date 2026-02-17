
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Derived project ID from the publishable key provided: HlhK7TFQdXycIxfH800cTg
// Use provided keys as defaults if environment variables aren't set
const supabaseUrl = process.env.SUPABASE_URL || 'https://HlhK7TFQdXycIxfH800cTg.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_HlhK7TFQdXycIxfH800cTg_38ybFD1x';

// Only initialize if we have valid credentials to avoid the "supabaseUrl is required" error
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let supabaseClient: SupabaseClient | null = null;

if (isSupabaseConfigured) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error("Supabase initialization failed:", err);
  }
} else {
  console.warn("SUPABASE_URL or SUPABASE_ANON_KEY is missing. Using local mock mode if available.");
}

export const supabase = supabaseClient as SupabaseClient;

/**
 * Helper to fetch resources filtered by network
 */
export const getFilteredResources = async (network: 'EDU' | 'GENERAL') => {
  if (!isSupabaseConfigured || !supabase) {
    console.error("Cannot fetch resources: Supabase not configured.");
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .or(`visibility.eq.${network},visibility.eq.PUBLIC`);
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Resource fetch failed:", err);
    throw err;
  }
};
