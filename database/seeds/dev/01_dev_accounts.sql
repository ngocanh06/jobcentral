-- ============================================================================
-- JobCentral Development Seeds (Mock Accounts & Data)
-- File: database/seeds/dev/01_dev_accounts.sql
-- Description: Test accounts and demo data for local development & testing.
-- ONLY RUN ON LOCAL/STAGING ENVIRONMENTS.
-- ============================================================================

-- Default password hash for '123456'
-- bcrypt hash: $2a$10$X... (or similar)
INSERT INTO users (email, password_hash, full_name, role, is_active) VALUES
    ('candidate.test@jobcentral.vn', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ứng viên Test', 'candidate', TRUE),
    ('recruiter.test@jobcentral.vn', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Nhà tuyển dụng Test', 'recruiter', TRUE),
    ('admin.test@jobcentral.vn', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Quản trị viên', 'admin', TRUE)
ON CONFLICT (email) DO NOTHING;
