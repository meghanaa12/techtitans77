
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Project details provided by user
const supabaseUrl = 'https://HlhK7TFQdXycIxfH800cTg.supabase.co';
const supabaseAnonKey = 'sb_publishable_HlhK7TFQdXycIxfH800cTg_38ybFD1x';

export const isSupabaseConfigured = true;

let supabaseClient: any = null;

try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} catch (err) {
  console.error("Supabase client creation failed:", err);
}

// Export the client
export const supabase = supabaseClient;

/**
 * Enhanced fetcher that handles "Failed to fetch" by returning mock data
 * if the live database is unreachable.
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
    console.warn("Falling back to Demo Data due to connection error:", err);
    // Return mock resources if DB is down
    return [
      {
        id: 'mock-1',
        title: 'Quantum Mechanics - Midterm Prep',
        description: 'Comprehensive notes covering wave-particle duality and Schrodinger equation.',
        uploader_id: 'system',
        uploader_name: 'Dr. Aris',
        category: 'Class Notes',
        subject: 'Physics',
        semester: 4,
        upload_date: new Date().toISOString(),
        rating: 4.8,
        downloads: 124,
        tags: ['Physics', 'Quantum', 'Notes'],
        ai_summary: 'Detailed derivation of fundamental quantum states.',
        file_url: '#',
        visibility: 'PUBLIC'
      },
      {
        id: 'mock-2',
        title: 'Data Structures 2024 PYQ',
        description: 'Last years final question paper with solved answers for trees and graphs.',
        uploader_id: 'system',
        uploader_name: 'CS Dept',
        category: 'Question Paper',
        subject: 'Computer Science',
        semester: 3,
        upload_date: new Date().toISOString(),
        rating: 4.9,
        downloads: 850,
        tags: ['CS', 'Algorithms', 'PYQ'],
        ai_summary: 'Focuses heavily on dynamic programming and graph traversals.',
        file_url: '#',
        visibility: 'EDU'
      }
    ];
  }
};
