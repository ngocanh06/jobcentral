# Quản lý database MySQL

Thư mục này lưu trữ các tài nguyên liên quan đến cấu trúc và dữ liệu của
database JobCentral.

## Cấu trúc

- `migrations/`: các thay đổi cấu trúc database, đặt tên theo thứ tự chạy
  (ví dụ: `001_create_users.sql`, `002_add_job_status.sql`).

- `seeds/`: dữ liệu mẫu phục vụ phát triển và kiểm thử. Không dùng dữ liệu mẫu
  để ghi đè dữ liệu môi trường thật.

- `schema/`: bản mô tả cấu trúc database hiện tại, dùng để đối chiếu sau khi
  áp dụng migrations.

- `scripts/`: script hỗ trợ quản trị, xuất/nhập hoặc đồng bộ database.

- `tests/`: kiểm thử cấu trúc và dữ liệu database.

## Quy trình đồng bộ

1. Sao lưu database đích trước khi thay đổi.
2. Kiểm tra các migration mới trong `migrations/` và thứ tự áp dụng.
3. Chạy từng migration trên đúng môi trường MySQL đích; không chạy lại migration
   đã được áp dụng.
4. Chạy các kiểm thử trong `tests/` và xác nhận ứng dụng hoạt động bình thường.
5. Cập nhật tài liệu trong `schema/` để phản ánh cấu trúc hiện tại.
6. Chỉ nạp dữ liệu từ `seeds/` vào môi trường phát triển hoặc kiểm thử khi cần.

Ghi lại trong mô tả thay đổi môi trường đã đồng bộ và các migration đã chạy.
Không lưu mật khẩu, khóa bí mật hoặc dữ liệu cá nhân thật trong các tệp của
thư mục này.
