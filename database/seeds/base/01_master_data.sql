-- ============================================================================
-- JobCentral Base Seeds (Master Data)
-- File: database/seeds/base/01_master_data.sql
-- Description: Essential lookup data (Industries, Categories) required on all environments.
-- ============================================================================

INSERT INTO industries (name, code) VALUES
    ('Công nghệ thông tin / Phần mềm', 'IT'),
    ('Thiết kế UI / UX / Đồ họa', 'DESIGN'),
    ('Dữ liệu & Trí tuệ nhân tạo (AI)', 'AI_ML'),
    ('Tài chính / Kế toán / Ngân hàng', 'FINANCE'),
    ('Marketing / Truyền thông / PR', 'MARKETING'),
    ('Nhân sự / Hành chính', 'HR'),
    ('Kinh doanh / Bán hàng', 'SALES'),
    ('Kỹ thuật / Cơ khí / Xây dựng', 'ENGINEERING')
ON CONFLICT (code) DO NOTHING;
