# System Configuration

## Trạng thái

**Deferred:** tài liệu này sẽ được hoàn thiện sau khi `spec-M03.md` được cập nhật. Context diagram đã được tách riêng tại [context-diagram.md](context-diagram.md).

## Nội dung sẽ được chốt

- Môi trường triển khai và miền/URL cho development, staging, production.
- Thành phần frontend: web app, service worker, Cache Storage và IndexedDB cho trải nghiệm offline.
- Dịch vụ backend: xác thực, cơ sở dữ liệu, phân quyền/RLS, lưu trữ media và tác vụ nền (nếu có).
- Ranh giới API, cơ chế xác thực, các contract trao đổi M01–M02–M03 và đồng bộ `SessionSyncRecord`.
- Biến cấu hình, secrets, CORS, quản lý khóa và quyền truy cập theo môi trường.
- Quan sát vận hành: logging, error monitoring, metrics/alerting, backup, khôi phục và retention.
- Các kiểm soát bảo mật, mạng và giới hạn truy cập cần thiết cho MVP.

## Đầu vào khi hoàn thiện

- [Specification M01](../../specs/spec-M01.md), [Specification M02](../../specs/spec-M02.md), [Specification M03](../../specs/spec-M03.md)
- [Context diagram](context-diagram.md)
- Ba BRD trong thư mục `business-requirements/`
