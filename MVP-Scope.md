# MVP Scope — Cúc Phương Quest

## 1. Quy tắc priority

- **Must:** bắt buộc để hoàn thành hành trình MVP hoặc bảo đảm dữ liệu/an toàn đúng logic.
- **Should:** có giá trị rõ ràng nhưng có thể cắt mà luồng cốt lõi vẫn chạy được.
- **Could:** chỉ làm khi còn nguồn lực.
- **Won't:** không triển khai trong MVP hiện tại.
- Function List dùng priority của bảng này làm nguồn chuẩn. Mọi sub-function **kế thừa nguyên priority của function cha**, không tự nâng/hạ riêng.

## 2. In-scope functions

| Module | Function ID | Function | Scope summary | Priority |
|---|---|---|---|---|
| M01 | FN-M01-001 | Language Preference | Chọn/đổi `vi/en`, duy trì và công bố `LanguagePreference` | Must |
| M01 | FN-M01-002 | Route Discovery | Đọc route public, xem danh mục và chi tiết tuyến | Must |
| M01 | FN-M01-003 | Route Recommendation | Exact-match ba nhóm tag và trả `0..N` kết quả | Should |
| M01 | FN-M01-004 | Offline Preparation & Package | Đánh giá nhu cầu offline, quyết định, tải/validate/update package | Should |
| M01 | FN-M01-005 | Offline Resource Management | Xem, tải và xóa đúng package local | Should |
| M01 | FN-M01-006 | Route Start & M02 Handoff | Guard Start, ghi context và công bố contract cho M02 | Must |
| M02 | FN-M02-001 | Play Session Lifecycle | Tạo, khôi phục, bỏ dở và hoàn tất phiên | Must |
| M02 | FN-M02-002 | Journey Map | Đọc journey map, hiển thị thứ tự checkpoint và tiến độ | Must |
| M02 | FN-M02-003 | QR Resolution & Check-in | Phân giải nhiều QR/checkpoint, check-in idempotent và quét tự do | Must |
| M02 | FN-M02-004 | Checkpoint Content | Chọn đúng nguồn offline/online, ngôn ngữ và media | Must |
| M02 | FN-M02-005 | Local Persistence | Lưu session/checkpoint visit, bảo toàn khi reload/network change | Must |
| M02 | FN-M02-006 | Terminal Session Sync | Tạo và retry `SessionSyncRecord` ẩn danh, upsert idempotent ở M03 | Must |
| M02 | FN-M02-007 | Free Visitor Scan | Cho khách ngoài web-app quét và xem nội dung mà không tạo session | Must |
| M02 | FN-M02-008 | Cross-module Contract Consumption | Chỉ đọc contract M01/M03 và không sửa dữ liệu nguồn | Must |
| M03 | FN-M03-001 | Route Administration | CRUD tuyến song ngữ, metadata và ba nhóm recommendation tag | Must |
| M03 | FN-M03-002 | Checkpoint Administration | CRUD/order checkpoint và xác nhận connectivity mode | Must |
| M03 | FN-M03-003 | QR Administration | Nhiều QR/checkpoint, reprint và identity change có kiểm soát | Must |
| M03 | FN-M03-004 | Bilingual Content | Soạn, validate và phát hành `introductionText` `vi/en` | Must |
| M03 | FN-M03-005 | Supplementary Media | Quản lý ảnh tĩnh và audio/video; chỉ ảnh tĩnh vào offline snapshot | Should |
| M03 | FN-M03-006 | Review, Publication & Snapshot | Completeness guard, maker-checker, publish và immutable snapshot | Must |
| M03 | FN-M03-007 | Live Route Maintenance | Thêm/loại checkpoint trên route đang hoạt động, giữ lịch sử | Must |
| M03 | FN-M03-008 | Emergency Operations | Đóng khẩn cấp, mở lại theo quyền và ghi audit log | Must |
| M03 | FN-M03-009 | Authorization & Concurrency | RLS/server authorization và reject stale write | Must |
| M03 | FN-M03-010 | Session Intake & Reports | Upsert terminal session, RPT-01 và RPT-02 | Must |

## 3. Won't — ngoài MVP

| Capability | Module | Lý do |
|---|---|---|
| AI/ML recommendation, scoring/ranking | M01 | MVP chỉ exact-match ba tag |
| Đồng bộ package giữa thiết bị hoặc tài khoản | M01 | Package chỉ nằm trên trình duyệt/thiết bị hiện tại |
| GPS tracking và turn-by-turn navigation | Cross-module | Không cần cho trải nghiệm QR/checkpoint MVP |
| Storytelling, hidden message và hint chain | M02/M03 | Nội dung MVP chỉ là `introductionText` song ngữ |
| Gamification, điểm, huy hiệu, leaderboard | M02 | Không thuộc hành trình cốt lõi |
| Cảnh báo real-time tới phiên đang chạy | M03 → M02 | Không thể cam kết ở khu vực mất kết nối; dùng biện pháp an toàn ngoài hệ thống |
| Offline-capable M03 admin/draft sync | M03 | Admin MVP làm việc online-only |
| Báo QR lắp sai vị trí từ M02 | M02/M03 | Không có contract/workflow trong MVP |
| Temporary role delegation | M03 | Dùng tài khoản Reviewer dự phòng |
| Auto-merge concurrent admin edits | M03 | MVP reject stale write và yêu cầu reload |

## 4. Nguồn

- [Specification M01](docs/spec/modules/spec-M01.md)
- [Specification M02](docs/spec/modules/spec-M02.md)
- [Specification M03](docs/spec/modules/spec-M03.md)
