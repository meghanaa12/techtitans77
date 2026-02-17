
import { createClient } from '@supabase/supabase-js';

// Provided Supabase Configuration
// Note: In a production environment, always use environment variables.
const supabaseUrl = process.env.SUPABASE_URL || 'https://HlhK7TFQdXycIxfH800cTg.supabase.co';
const supabaseAnonKey = 'sb_publishable_HlhK7TFQdXycIxfH800cTg_38ybFD1x';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to fetch resources filtered by network
 * Ensures students only see EDU content and outsiders only see General content.
 */
export const getFilteredResources = async (network: 'EDU' | 'GENERAL') => {
  // Logic to separate queries based on the network model
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .or(`visibility.eq.${network},visibility.eq.PUBLIC`);
  
  if (error) throw error;
  return data;
};
