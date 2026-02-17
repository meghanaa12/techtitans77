-- cogniHUB: Complete Database Setup for Supabase
-- This script sets up schema, security, and demo personas.

-- 1. CLEANUP (Optional: Uncomment if you want to start fresh)
-- DROP TABLE IF EXISTS resources;
-- DROP TABLE IF EXISTS profiles;
-- DROP TYPE IF EXISTS user_role;
-- DROP TYPE IF EXISTS network_type;
-- DROP TYPE IF EXISTS visibility_type;

-- 2. CREATE CUSTOM TYPES
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('STUDENT', 'TEACHER', 'ADMIN', 'OUTSIDER');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'network_type') THEN
        CREATE TYPE network_type AS ENUM ('EDU', 'GENERAL');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'visibility_type') THEN
        CREATE TYPE visibility_type AS ENUM ('EDU', 'GENERAL', 'PUBLIC');
    END IF;
END $$;

-- 3. CREATE PROFILES TABLE
-- This table stores user data and links to Supabase Auth
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY, -- Links to auth.users.id
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'STUDENT',
  network network_type NOT NULL DEFAULT 'GENERAL',
  points INTEGER DEFAULT 0,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 1,
  badges TEXT[] DEFAULT '{}',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. CREATE RESOURCES TABLE
-- Stores academic materials with network-specific visibility
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  uploader_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  subject TEXT,
  semester INTEGER,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  rating DECIMAL(3,2) DEFAULT 0.0,
  downloads INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  ai_summary TEXT,
  file_url TEXT,
  visibility visibility_type NOT NULL DEFAULT 'PUBLIC'
);

-- 5. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- 6. RLS POLICIES

-- Profiles: Users can view all profiles but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Resources: Strict Network Isolation
-- Rule: Users see PUBLIC content OR content matching their EDU/GENERAL network
CREATE POLICY "Network-isolated resource visibility" ON resources
  FOR SELECT USING (
    visibility = 'PUBLIC' OR 
    visibility::text = (SELECT network::text FROM profiles WHERE id = auth.uid())
  );

-- Resources: Uploader permissions
CREATE POLICY "Users can upload resources" ON resources
  FOR INSERT WITH CHECK (auth.uid() = uploader_id);

CREATE POLICY "Users can delete own resources" ON resources
  FOR DELETE USING (auth.uid() = uploader_id);

-- 7. SEED DEMO PERSONAS
-- These IDs match the logic in Login.tsx
INSERT INTO profiles (id, email, full_name, role, network, points, xp, streak, badges)
VALUES 
  ('a1111111-1111-1111-1111-111111111111', 'admin@cognihub.edu', 'Platform Chief', 'ADMIN', 'EDU', 2500, 8000, 45, ARRAY['System Architect', 'Verified']),
  ('b2222222-2222-2222-2222-222222222222', 'teacher@cognihub.edu', 'Prof. Sarah Chen', 'TEACHER', 'EDU', 1200, 4500, 20, ARRAY['Star Educator', 'Verified']),
  ('c3333333-3333-3333-3333-333333333333', 'student@cognihub.edu', 'Alex Johnson', 'STUDENT', 'EDU', 650, 1800, 7, ARRAY['Resource Scout']),
  ('d4444444-4444-4444-4444-444444444444', 'mike.outsider@gmail.com', 'Mike Smith', 'OUTSIDER', 'GENERAL', 150, 400, 2, ARRAY['Guest Learner'])
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email, 
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  network = EXCLUDED.network;

-- 8. SEED INITIAL RESOURCES
INSERT INTO resources (title, description, uploader_id, category, subject, semester, rating, downloads, tags, visibility)
VALUES 
  ('Algorithms Final PYQ 2025', 'Internal faculty-prepared sample questions for competitive preparation.', 'b2222222-2222-2222-2222-222222222222', 'Question Paper', 'Computer Science', 4, 4.9, 45, ARRAY['Algorithms', 'Internal'], 'EDU'),
  ('Public Data Science Basics', 'Open resource for community learners interested in starting with Python.', 'd4444444-4444-4444-4444-444444444444', 'Study Material', 'Data Science', 1, 4.2, 120, ARRAY['Public', 'Entry Level'], 'GENERAL'),
  ('Academic Ethics Handbook', 'Standard guide for all network members to maintain integrity.', 'a1111111-1111-1111-1111-111111111111', 'Reference Book', 'General Ethics', 1, 5.0, 850, ARRAY['Ethics', 'Policy'], 'PUBLIC')
ON CONFLICT DO NOTHING;
