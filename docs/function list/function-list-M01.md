# Function List M01 — Route Planning & Preparation

## 1. Document information

| Field | Value |
|---|---|
| Module | M01 — Route Planning & Preparation |
| Source Spec | [spec-M01.md](../spec/modules/spec-M01.md) |
| Priority Source | [MVP-Scope.md](../../MVP-Scope.md) |
| Rule | Priority của sub-function kế thừa trực tiếp function cha |

## 2. Function hierarchy

| Module | Function ID | Function | Priority |
|---|---|---|---|
| M01 | FN-M01-001 | Language Preference | Must |
| M01 | FN-M01-002 | Route Discovery | Must |
| M01 | FN-M01-003 | Route Recommendation | Should |
| M01 | FN-M01-004 | Offline Preparation & Package | Should |
| M01 | FN-M01-005 | Offline Resource Management | Should |
| M01 | FN-M01-006 | Route Start & M02 Handoff | Must |

## 3. Detailed function list

| Module | Function ID | Function | Sub-function ID | Sub-function | Source FR | Priority |
|---|---|---|---|---|---|---|
| M01 | FN-M01-001 | Language Preference | SF-M01-001-01 | Chọn hoặc đổi ngôn ngữ `vi/en`, lưu và áp dụng `LanguagePreference` online/offline | FR-M01-001 | Must |
| M01 | FN-M01-002 | Route Discovery | SF-M01-002-01 | Đọc và hiển thị danh mục route public `HOAT_DONG` | FR-M01-002 | Must |
| M01 | FN-M01-002 | Route Discovery | SF-M01-002-02 | Hiển thị tên, cự ly, thời lượng, độ khó và nội dung route theo ngôn ngữ hiện hành | FR-M01-003 | Must |
| M01 | FN-M01-003 | Route Recommendation | SF-M01-003-01 | Nhận đủ `timeTag`, `groupTag`, `experienceTag`, exact-match và trả toàn bộ `0..N` route phù hợp | FR-M01-004 | Should |
| M01 | FN-M01-004 | Offline Preparation & Package | SF-M01-004-01 | Xác định route có checkpoint `OFFLINE_REQUIRED`, số điểm bị ảnh hưởng và readiness của package | FR-M01-005 | Should |
| M01 | FN-M01-004 | Offline Preparation & Package | SF-M01-004-02 | Xử lý đúng ba lựa chọn: Tải, Tiếp tục không tải, Quay lại | FR-M01-006 | Should |
| M01 | FN-M01-004 | Offline Preparation & Package | SF-M01-004-03 | Tải snapshot song ngữ và ảnh tĩnh theo manifest/checkpointId | FR-M01-007 | Should |
| M01 | FN-M01-004 | Offline Preparation & Package | SF-M01-004-04 | Validate đầy đủ và chỉ publish package active khi trạng thái `SAN_SANG` | FR-M01-008 | Should |
| M01 | FN-M01-004 | Offline Preparation & Package | SF-M01-004-05 | Lazy update bằng staging, atomic switch và giữ package cũ khi update lỗi | FR-M01-010 | Should |
| M01 | FN-M01-005 | Offline Resource Management | SF-M01-005-01 | Xem, tải hoặc xóa đúng package sau xác nhận; không tạo action Update/Retry riêng | FR-M01-009 | Should |
| M01 | FN-M01-006 | Route Start & M02 Handoff | SF-M01-006-01 | Kiểm tra trạng thái route và điều kiện offline trước khi chấp nhận Start | FR-M01-011 | Must |
| M01 | FN-M01-006 | Route Start & M02 Handoff | SF-M01-006-02 | Tạo/ghi đè `SelectedRouteContext.routeId` chỉ sau Start hợp lệ | FR-M01-012 | Must |
| M01 | FN-M01-006 | Route Start & M02 Handoff | SF-M01-006-03 | Công bố độc lập `LanguagePreference`, `SelectedRouteContext` và package active `SAN_SANG` cho M02 | FR-M01-013 | Must |

## 4. Coverage summary

| Metric | Value |
|---|---:|
| Functions | 6 |
| Sub-functions | 13 |
| Source FR covered | 13/13 |
| Must sub-functions | 6 |
| Should sub-functions | 7 |

Không có sub-function tự đặt priority khác function cha.
