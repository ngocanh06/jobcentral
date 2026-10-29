-- ============================================================================
-- JobCentral Database Schema Migration
-- Migration: 001_create_jobcentral_tables.sql
-- Compatible with: PostgreSQL 14+
-- ============================================================================

-- Enable UUID extension if needed (using SERIAL/INT for simplicity matching mock IDs)
-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(50),
    role VARCHAR(50) NOT NULL DEFAULT 'candidate', -- 'candidate', 'recruiter', 'admin'
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. INDUSTRIES / CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS industries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. COMPANIES TABLE (Recruiter companies)
CREATE TABLE IF NOT EXISTS companies (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL, -- Recruiter owner
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    cover_url TEXT,
    industry_id INT REFERENCES industries(id) ON DELETE SET NULL,
    location VARCHAR(255),
    district VARCHAR(100),
    city VARCHAR(100),
    size VARCHAR(100), -- e.g. "100-500 nhân viên"
    website VARCHAR(255),
    description TEXT,
    verified BOOLEAN DEFAULT FALSE,
    rating NUMERIC(3,2) DEFAULT 0.00,
    review_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. JOBS TABLE (Job postings)
CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    salary_display VARCHAR(100), -- e.g. "25 - 35 triệu"
    salary_category VARCHAR(50), -- e.g. "20to35", "above35", "under10"
    salary_usd VARCHAR(50), -- e.g. "$1,200 - $1,600"
    job_type VARCHAR(50) DEFAULT 'Full-time', -- Full-time, Part-time, Remote, Internship
    experience VARCHAR(50), -- intern, fresher, junior, senior, lead
    location VARCHAR(255),
    district VARCHAR(100),
    city VARCHAR(100),
    category VARCHAR(100),
    industry_id INT REFERENCES industries(id) ON DELETE SET NULL,
    description TEXT,
    requirements_summary VARCHAR(255),
    requirements TEXT[], -- Array of requirements
    responsibilities TEXT[], -- Array of responsibilities
    benefits TEXT[], -- Array of benefits
    is_featured BOOLEAN DEFAULT FALSE,
    is_urgent BOOLEAN DEFAULT FALSE,
    is_intern BOOLEAN DEFAULT FALSE,
    is_quick_apply BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'active', -- active, closed, draft
    posted_time VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. CV PROFILES TABLE (Online CVs built by candidates)
CREATE TABLE IF NOT EXISTS cv_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    summary TEXT,
    experience_json JSONB,
    education_json JSONB,
    skills_json JSONB,
    projects_json JSONB,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. JOB APPLICATIONS TABLE (Candidates applying for jobs)
CREATE TABLE IF NOT EXISTS job_applications (
    id SERIAL PRIMARY KEY,
    job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    cv_id INT REFERENCES cv_profiles(id) ON DELETE SET NULL,
    cover_letter TEXT,
    status VARCHAR(50) DEFAULT 'applied', -- applied, reviewing, interviewed, offered, rejected
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. SAVED JOBS TABLE (Bookmarked jobs by candidates)
CREATE TABLE IF NOT EXISTS saved_jobs (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    job_id INT REFERENCES jobs(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, job_id)
);

-- 8. FOLLOWED COMPANIES TABLE (Bookmarked companies by candidates)
CREATE TABLE IF NOT EXISTS followed_companies (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    company_id INT REFERENCES companies(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, company_id)
);

-- 9. COMPANY REVIEWS TABLE (Reviews & ratings on companies)
CREATE TABLE IF NOT EXISTS company_reviews (
    id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(255),
    pros TEXT,
    cons TEXT,
    advice TEXT,
    position VARCHAR(100),
    is_current_employee BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. ARTICLES TABLE (Career advice & market news)
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary TEXT,
    content TEXT,
    author VARCHAR(255),
    category VARCHAR(100),
    image_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. CONVERSATIONS TABLE (Chat channels between candidates & recruiters)
CREATE TABLE IF NOT EXISTS conversations (
    id SERIAL PRIMARY KEY,
    job_id INT REFERENCES jobs(id) ON DELETE SET NULL,
    candidate_id INT REFERENCES users(id) ON DELETE CASCADE,
    recruiter_id INT REFERENCES users(id) ON DELETE CASCADE,
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. MESSAGES TABLE (Chat messages)
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    conversation_id INT REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. NOTIFICATIONS TABLE (System & interaction notifications)
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50), -- application, job_alert, system, message
    is_read BOOLEAN DEFAULT FALSE,
    reference_id INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create performance indexes
CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
CREATE INDEX IF NOT EXISTS idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
