
-- cogniHUB: Idempotent Database Setup for Supabase

-- 1. CREATE CUSTOM TYPES
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

-- 2. CREATE PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY, 
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'STUDENT',
  network network_type NOT NULL DEFAULT 'GENERAL',
  points INTEGER DEFAULT 0,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 1,
  badges TEXT[] DEFAULT '{}',
  avatar_url TEXT,
  college_name TEXT,
  department TEXT,
  graduation_year INTEGER,
  current_semester INTEGER,
  specialization TEXT,
  office_hours TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. CREATE RESOURCES TABLE
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

-- 4. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- 5. RLS POLICIES (with existence checks)
DO $$
BEGIN
    -- Profiles Policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public profiles are viewable by everyone') THEN
        CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own profile') THEN
        CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
    END IF;

    -- Resources Policies
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Network-isolated resource visibility') THEN
        CREATE POLICY "Network-isolated resource visibility" ON resources FOR SELECT USING (
            visibility = 'PUBLIC' OR 
            visibility::text = (SELECT network::text FROM profiles WHERE id = auth.uid())
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can upload resources') THEN
        CREATE POLICY "Users can upload resources" ON resources FOR INSERT WITH CHECK (auth.uid() = uploader_id);
    END IF;
END $$;
