# Database Architecture & Management - JobCentral

Thư mục quản lý toàn bộ cơ sở dữ liệu (Database Schema, Migrations, Seed Data, Scripts và Tests) cho dự án JobCentral.

---

## 📁 Cấu trúc thư mục

```text
database/
├── migrations/      # Thay đổi cấu trúc theo thứ tự thời gian (KHÔNG sửa file đã chạy)
├── schema/          # Snapshot cấu trúc hiện tại (sinh tự động hoặc dump từ DB)
├── seeds/
│   ├── base/        # Dữ liệu hệ thống bắt buộc (vai trò, ngành nghề, vùng lương...)
│   └── dev/         # Dữ liệu demo, mock data, tài khoản test môi trường phát triển
├── scripts/         # Shell / SQL scripts tiện ích (backup, restore, reset, healthcheck)
├── tests/           # Kiểm thử tính toàn vẹn dữ liệu, schema validation, migration test
└── README.md        # Hướng dẫn quy ước, quy trình chạy và bảo trì
```

---

## 📌 Chi tiết các thư mục & Quy ước

### 1. `migrations/`
- **Mục đích**: Lưu trữ các file SQL / migration script thay đổi cấu trúc cơ sở dữ liệu (tạo bảng, sửa cột, thêm index, foreign keys).
- **Quy tắc bất biến (Immutability)**:
  - **TUYỆT ĐỐI KHÔNG** sửa nội dung của migration file đã được chạy trên môi trường chung (staging/production).
  - Khi cần thay đổi hoặc sửa lỗi, **hãy tạo một migration mới** để rollback hoặc cập nhật.
- **Quy ước đặt tên**:
  - Dùng timestamp hoặc số thứ tự tăng dần:
    - Định dạng timestamp: `YYYYMMDDHHMMSS_mo_ta_ngan_gon.sql` (VD: `20261027083000_create_users_table.sql`)
    - Hoặc số thứ tự: `001_create_users_table.sql`, `002_add_avatar_to_users.sql`

---

### 2. `schema/`
- **Mục đích**: Lưu snapshot mới nhất của toàn bộ schema cơ sở dữ liệu.
- Giúp lập trình viên mới nắm bắt nhanh toàn bộ cấu trúc DB mà không cần duyệt qua hàng chục file migration.
- Thường được sinh tự động sau khi chạy hết migrations (`schema.sql` hoặc `schema.prisma`).

---

### 3. `seeds/`
Được chia làm 2 tầng rõ ràng:

#### a. `seeds/base/` (Dữ liệu nền tảng - Bắt buộc)
- Dữ liệu tĩnh/danh mục mà hệ thống bắt buộc phải có để hoạt động:
  - Danh mục vai trò và quyền (Roles, Permissions).
  - Danh mục ngành nghề, lĩnh vực tuyển dụng.
  - Vùng lương, bậc lương, cấp bậc (Fresher, Junior, Senior...).
  - Tỉnh / Thành phố, Quận / Huyện.
- Chạy trên **tất cả** các môi trường: Local, Dev, Staging, Production.

#### b. `seeds/dev/` (Dữ liệu thử nghiệm - Development only)
- Mock data phục vụ kiểm thử giao diện và tính năng:
  - Tài khoản test (Admin, Recruiter, Candidate mẫu).
  - Tin tuyển dụng mẫu, hồ sơ ứng viên demo.
  - Lịch sử tương tác, ứng tuyển giả lập.
- **Chỉ chạy trên Local hoặc Staging**, không bao giờ nạp vào Production.

---

### 4. `scripts/`
- Tập hợp các tiện ích dòng lệnh hỗ trợ vận hành DB:
  - `backup.*`: Sao lưu cơ sở dữ liệu định kỳ hoặc trước khi deploy.
  - `restore.*`: Phục hồi dữ liệu từ bản sao lưu.
  - `reset.*`: Xóa toàn bộ dữ liệu, chạy lại migrations và nạp seeds từ đầu (cho local).
  - `check_health.*`: Kiểm tra trạng thái kết nối DB.

---

### 5. `tests/`
- Bộ test dành riêng cho database:
  - Kiểm tra xem migrations có chạy xuôi (Up) và ngược (Down/Rollback) trơn tru không.
  - Kiểm tra các ràng buộc toàn vẹn dữ liệu (Foreign keys, Unique, Check constraints).
  - Xác thực seed data không vi phạm ràng buộc.

---

## 🚀 Thứ tự thực hiện (Execution Order)

Khi thiết lập môi trường mới từ đầu, tuân thủ đúng thứ tự sau:

1. **Khởi tạo Database**: Tạo database rỗng và cấp quyền kết nối.
2. **Chạy Migrations**: Thực thi toàn bộ file trong `migrations/` theo thứ tự thời gian/số thứ tự.
3. **Nạp Dữ liệu Bắt buộc**: Thực thi toàn bộ script trong `seeds/base/`.
4. **Nạp Dữ liệu Demo (Nếu ở Local/Dev)**: Thực thi các script trong `seeds/dev/`.
5. **Cập nhật Schema Snapshot**: Xuất snapshot schema hiện tại vào `schema/schema.sql`.

---

## ⚠️ Lưu ý an toàn

- Không commit thông tin nhạy cảm (mật khẩu, database credentials) vào Git. Luôn dùng biến môi trường `.env`.
- Mọi câu lệnh phá hủy cấu trúc (`DROP TABLE`, `TRUNCATE`) trong `scripts/` cần có xác nhận (prompt) trước khi thực thi.
