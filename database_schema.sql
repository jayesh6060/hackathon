-- CLOCKIT 2026 (JITD) - Production Database Schema for Supabase / PostgreSQL
-- Covers Teams, Members, Submissions, Evaluation Scoring, and Admin RLS Policies

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TEAMS TABLE
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_code VARCHAR(30) UNIQUE NOT NULL, -- e.g. JITD-2026-7842
    team_name VARCHAR(120) NOT NULL,
    selected_theme VARCHAR(100) NOT NULL,
    college_name VARCHAR(250) NOT NULL,
    leader_name VARCHAR(150) NOT NULL,
    leader_email VARCHAR(180) NOT NULL,
    leader_phone VARCHAR(30) NOT NULL,
    status VARCHAR(40) DEFAULT 'submitted', -- 'submitted', 'shortlisted', 'rejected'
    payment_status VARCHAR(30) DEFAULT 'pending', -- 'pending', 'paid', 'waived'
    payment_ref VARCHAR(100),
    level2_confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TEAM MEMBERS TABLE (2 to 4 members total)
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    member_name VARCHAR(150) NOT NULL,
    member_email VARCHAR(180) NOT NULL,
    member_phone VARCHAR(30) NOT NULL,
    role_designation VARCHAR(80) DEFAULT 'Developer',
    college_id_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. SUBMISSIONS TABLE (Prototypes & Repos)
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    prototype_title VARCHAR(200) NOT NULL,
    prototype_desc TEXT NOT NULL,
    github_url VARCHAR(350) NOT NULL,
    demo_url VARCHAR(350),
    baseline_commit_sha VARCHAR(60),
    level2_enhancement_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. EVALUATIONS TABLE (The 5 Standardized Criteria)
CREATE TABLE IF NOT EXISTS public.evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    reviewer_name VARCHAR(150) NOT NULL,
    score_relevance INT CHECK (score_relevance BETWEEN 0 AND 25),
    score_credibility INT CHECK (score_credibility BETWEEN 0 AND 25),
    score_feasibility INT CHECK (score_feasibility BETWEEN 0 AND 20),
    score_clarity INT CHECK (score_clarity BETWEEN 0 AND 15),
    score_originality INT CHECK (score_originality BETWEEN 0 AND 15),
    total_score INT GENERATED ALWAYS AS (
        score_relevance + score_credibility + score_feasibility + score_clarity + score_originality
    ) STORED,
    recommendation VARCHAR(50) NOT NULL, -- 'Shortlist for Level 2', 'Needs Technical Viva', 'Reject'
    reviewer_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;

-- Public can register teams and insert submissions
CREATE POLICY "Public can register team" ON public.teams
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view team by team_code" ON public.teams
    FOR SELECT USING (true);

CREATE POLICY "Public can register team members" ON public.team_members
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can submit prototype" ON public.submissions
    FOR INSERT WITH CHECK (true);

-- Authenticated reviewers and admins can view and grade
CREATE POLICY "Reviewers can evaluate submissions" ON public.evaluations
    FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

