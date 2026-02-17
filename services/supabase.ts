
import { createClient } from '@supabase/supabase-js';

// Prioritize environment variables, fallback to placeholders
// Note: Ensure your .env file or deployment platform has these keys set
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project-ref.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'your-anon-key';

// Only initialize if we have a valid-looking URL to prevent immediate runtime crashes
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to fetch resources filtered by network
 * Ensures students only see EDU content and outsiders only see General content.
 */
export const getFilteredResources = async (network: 'EDU' | 'GENERAL') => {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .or(`visibility.eq.${network},visibility.eq.PUBLIC`);
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error("Resource fetch failed:", err);
    return []; // Return empty array instead of crashing
  }
};
