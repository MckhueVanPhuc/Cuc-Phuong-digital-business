# Function List M03 — Operations & Content Administration

## 1. Document information

| Field | Value |
|---|---|
| Module | M03 — Operations & Content Administration |
| Source Spec | [spec-M03.md](../spec/modules/spec-M03.md) |
| Priority Source | [MVP-Scope.md](../../MVP-Scope.md) |
| Rule | Priority của sub-function kế thừa trực tiếp function cha |

## 2. Function hierarchy

| Module | Function ID | Function | Priority |
|---|---|---|---|
| M03 | FN-M03-001 | Route Administration | Must |
| M03 | FN-M03-002 | Checkpoint Administration | Must |
| M03 | FN-M03-003 | QR Administration | Must |
| M03 | FN-M03-004 | Bilingual Content | Must |
| M03 | FN-M03-005 | Supplementary Media | Should |
| M03 | FN-M03-006 | Review, Publication & Snapshot | Must |
| M03 | FN-M03-007 | Live Route Maintenance | Must |
| M03 | FN-M03-008 | Emergency Operations | Must |
| M03 | FN-M03-009 | Authorization & Concurrency | Must |
| M03 | FN-M03-010 | Session Intake & Reports | Must |

## 3. Detailed function list

| Module | Function ID | Function | Sub-function ID | Sub-function | Source FR | Priority |
|---|---|---|---|---|---|---|
| M03 | FN-M03-001 | Route Administration | SF-M03-001-01 | Tạo/sửa route với tên, mô tả, cảnh báo song ngữ và metadata hành trình | FR-001 | Must |
| M03 | FN-M03-001 | Route Administration | SF-M03-001-02 | Cho lưu nháp với trường Việt bắt buộc; yêu cầu đủ `vi/en` khi duyệt | FR-002 | Must |
| M03 | FN-M03-001 | Route Administration | SF-M03-001-03 | Gán ít nhất một tag trong mỗi nhóm time/group/experience | FR-003 | Must |
| M03 | FN-M03-002 | Checkpoint Administration | SF-M03-002-01 | Tạo/sửa/sắp thứ tự checkpoint và gán connectivity sau xác minh thực địa | FR-004 | Must |
| M03 | FN-M03-003 | QR Administration | SF-M03-003-01 | Sinh một hoặc nhiều QR active cho một checkpoint | FR-005 | Must |
| M03 | FN-M03-003 | QR Administration | SF-M03-003-02 | Phân biệt reprint và identity change; không để checkpoint mất QR active cuối cùng | FR-006 | Must |
| M03 | FN-M03-004 | Bilingual Content | SF-M03-004-01 | Soạn và phát hành `introductionText` đủ `vi/en`, tối thiểu 30 ký tự | FR-007 | Must |
| M03 | FN-M03-005 | Supplementary Media | SF-M03-005-01 | Quản lý ảnh/audio/video; chỉ ảnh tĩnh published đi vào snapshot offline | FR-008 | Should |
| M03 | FN-M03-006 | Review, Publication & Snapshot | SF-M03-006-01 | Chạy completeness guard và maker-checker trước approval | FR-009 | Must |
| M03 | FN-M03-006 | Review, Publication & Snapshot | SF-M03-006-02 | Tạo/publish immutable snapshot khi phát hành hoặc dữ liệu offline thay đổi | FR-010 | Must |
| M03 | FN-M03-007 | Live Route Maintenance | SF-M03-007-01 | Thêm hoặc loại checkpoint khỏi route live mà không duyệt lại toàn tuyến | FR-011 | Must |
| M03 | FN-M03-008 | Emergency Operations | SF-M03-008-01 | Cho Content Staff/Reviewer đóng ngay route/checkpoint và ghi actor/time/reason | FR-012 | Must |
| M03 | FN-M03-008 | Emergency Operations | SF-M03-008-02 | Chỉ Reviewer mở lại sau xác nhận an toàn | FR-013 | Must |
| M03 | FN-M03-009 | Authorization & Concurrency | SF-M03-009-01 | Enforce permission matrix ở backend/RLS | FR-014 | Must |
| M03 | FN-M03-009 | Authorization & Concurrency | SF-M03-009-02 | Reject stale update bằng `id + updated_at`, không auto-merge | FR-018 | Must |
| M03 | FN-M03-010 | Session Intake & Reports | SF-M03-010-01 | Validate và upsert terminal anonymous `SessionSyncRecord` theo `sessionId` | FR-015 | Must |
| M03 | FN-M03-010 | Session Intake & Reports | SF-M03-010-02 | RPT-01 tổng hợp unique session và tỷ lệ hoàn tất/bỏ dở | FR-016 | Must |
| M03 | FN-M03-010 | Session Intake & Reports | SF-M03-010-03 | RPT-02 tổng hợp unique session ghé từng checkpoint | FR-017 | Must |

## 4. Coverage summary

| Metric | Value |
|---|---:|
| Functions | 10 |
| Sub-functions | 18 |
| Source FR covered | 18/18 |
| Must sub-functions | 17 |
| Should sub-functions | 1 |

Không có sub-function tự đặt priority khác function cha.
