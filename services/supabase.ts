
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Project details
const supabaseUrl = 'https://HlhK7TFQdXycIxfH800cTg.supabase.co';
const supabaseAnonKey = 'sb_publishable_HlhK7TFQdXycIxfH800cTg_38ybFD1x';

export const isSupabaseConfigured = true;

let supabaseClient: any = null;

try {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} catch (err) {
  console.error("Supabase client creation failed:", err);
}

export const supabase = supabaseClient;

/**
 * Enhanced fetcher that handles "Failed to fetch" by returning high-quality mock data
 */
export const getFilteredResources = async (network: 'EDU' | 'GENERAL') => {
  try {
    if (!supabase) throw new Error("Supabase client not initialized");
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .or(`visibility.eq.${network},visibility.eq.PUBLIC`);
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn("Connection error, using Demo Archive:", err);
    return [
      {
        id: 'mock-1',
        title: 'Quantum Mechanics - Midterm Prep',
        description: 'Comprehensive notes covering wave-particle duality and Schrodinger equation.',
        uploader_id: 'b2222222-2222-2222-2222-222222222222',
        uploader_name: 'Prof. Sarah Chen',
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
        uploader_id: 'b2222222-2222-2222-2222-222222222222',
        uploader_name: 'Prof. Sarah Chen',
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
      },
      {
        id: 'mock-3',
        title: 'Network Security Fundamentals',
        description: 'Introduction to cryptography and secure communication protocols.',
        uploader_id: 'a1111111-1111-1111-1111-111111111111',
        uploader_name: 'Platform Chief',
        category: 'Study Material',
        subject: 'IT Security',
        semester: 6,
        upload_date: new Date().toISOString(),
        rating: 4.7,
        downloads: 412,
        tags: ['Security', 'IT', 'Network'],
        ai_summary: 'Covers RSA, AES, and SSL/TLS handshake mechanisms.',
        file_url: '#',
        visibility: 'PUBLIC'
      }
    ];
  }
};
