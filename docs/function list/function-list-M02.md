# Function List M02 — Field Experience

## 1. Document information

| Field | Value |
|---|---|
| Module | M02 — Field Experience |
| Source Spec | [spec-M02.md](../spec/modules/spec-M02.md) |
| Priority Source | [MVP-Scope.md](../../MVP-Scope.md) |
| Rule | Priority của sub-function kế thừa trực tiếp function cha |

## 2. Function hierarchy

| Module | Function ID | Function | Priority |
|---|---|---|---|
| M02 | FN-M02-001 | Play Session Lifecycle | Must |
| M02 | FN-M02-002 | Journey Map | Must |
| M02 | FN-M02-003 | QR Resolution & Check-in | Must |
| M02 | FN-M02-004 | Checkpoint Content | Must |
| M02 | FN-M02-005 | Local Persistence | Must |
| M02 | FN-M02-006 | Terminal Session Sync | Must |
| M02 | FN-M02-007 | Free Visitor Scan | Must |
| M02 | FN-M02-008 | Cross-module Contract Consumption | Must |

## 3. Detailed function list

| Module | Function ID | Function | Sub-function ID | Sub-function | Source FR | Priority |
|---|---|---|---|---|---|---|
| M02 | FN-M02-001 | Play Session Lifecycle | SF-M02-001-01 | Tạo `PlaySession DANG_DIEN_RA` sau khi người dùng bấm Bắt đầu và có route context | FR-M02-001 | Must |
| M02 | FN-M02-001 | Play Session Lifecycle | SF-M02-001-02 | Bảo đảm tối đa một phiên đang diễn ra trên thiết bị | FR-M02-002 | Must |
| M02 | FN-M02-001 | Play Session Lifecycle | SF-M02-001-03 | Chuyển phiên hiện tại sang `BO_DO` khi route context đổi | FR-M02-018 | Must |
| M02 | FN-M02-001 | Play Session Lifecycle | SF-M02-001-04 | Chỉ hoàn tất khi đã check-in điểm cuối và người dùng bấm Kết thúc | FR-M02-019 | Must |
| M02 | FN-M02-001 | Play Session Lifecycle | SF-M02-001-05 | Chỉ bật/hiển thị hành động Kết thúc khi đạt điều kiện | FR-M02-020 | Must |
| M02 | FN-M02-002 | Journey Map | SF-M02-002-01 | Hiển thị journey map/timeline theo đúng sequence | FR-M02-003 | Must |
| M02 | FN-M02-002 | Journey Map | SF-M02-002-02 | Đọc toàn bộ checkpoint trực tiếp từ M03 | FR-M02-004 | Must |
| M02 | FN-M02-002 | Journey Map | SF-M02-002-03 | Đánh dấu checkpoint trên journey map sau check-in | FR-M02-005 | Must |
| M02 | FN-M02-003 | QR Resolution & Check-in | SF-M02-003-01 | Phân giải `qrIdentifier` về `checkpointId` và kiểm tra membership hành trình | FR-M02-006 | Must |
| M02 | FN-M02-003 | QR Resolution & Check-in | SF-M02-003-02 | Ghi `CheckpointVisit` lần đầu theo checkpointId | FR-M02-007 | Must |
| M02 | FN-M02-003 | QR Resolution & Check-in | SF-M02-003-03 | Không ghi trùng; hiển thị timestamp cũ khi quét lại cùng checkpoint | FR-M02-008 | Must |
| M02 | FN-M02-003 | QR Resolution & Check-in | SF-M02-003-04 | Tra nội dung QR ngoài hành trình nhưng không ghi visit | FR-M02-009 | Must |
| M02 | FN-M02-003 | QR Resolution & Check-in | SF-M02-003-05 | Cho phép check-in không theo thứ tự journey map | FR-M02-010 | Must |
| M02 | FN-M02-003 | QR Resolution & Check-in | SF-M02-003-06 | Tách việc check-in khỏi hành động tùy chọn mở nội dung | FR-M02-011 | Must |
| M02 | FN-M02-004 | Checkpoint Content | SF-M02-004-01 | Đọc text/ảnh của `OFFLINE_REQUIRED` từ OfflinePackage M01 | FR-M02-012 | Must |
| M02 | FN-M02-004 | Checkpoint Content | SF-M02-004-02 | Đọc text/ảnh/audio/video của `ONLINE_AVAILABLE` trực tiếp từ M03 | FR-M02-013 | Must |
| M02 | FN-M02-004 | Checkpoint Content | SF-M02-004-03 | Chỉ phát audio/video khi người dùng chủ động chọn | FR-M02-014 | Must |
| M02 | FN-M02-004 | Checkpoint Content | SF-M02-004-04 | Chọn nhánh `introductionText vi/en` theo `LanguagePreference` | FR-M02-015 | Must |
| M02 | FN-M02-004 | Checkpoint Content | SF-M02-004-05 | Không cung cấp hint chain; thông điệp nằm trong introduction text | FR-M02-027 | Must |
| M02 | FN-M02-005 | Local Persistence | SF-M02-005-01 | Lưu liên tục PlaySession và CheckpointVisit độc lập trạng thái mạng | FR-M02-016 | Must |
| M02 | FN-M02-005 | Local Persistence | SF-M02-005-02 | Không mất/ghi lùi visit hợp lệ khi reload hoặc network thay đổi | FR-M02-017 | Must |
| M02 | FN-M02-006 | Terminal Session Sync | SF-M02-006-01 | Tạo/gửi `SessionSyncRecord` khi có mạng | FR-M02-021 | Must |
| M02 | FN-M02-006 | Terminal Session Sync | SF-M02-006-02 | Loại toàn bộ PII khỏi payload | FR-M02-022 | Must |
| M02 | FN-M02-006 | Terminal Session Sync | SF-M02-006-03 | Chỉ sync phiên `HOAN_TAT`/`BO_DO`, giữ local và retry khi offline | FR-M02-023 | Must |
| M02 | FN-M02-006 | Terminal Session Sync | SF-M02-006-04 | Yêu cầu M03 upsert idempotent theo `sessionId` | FR-M02-024 | Must |
| M02 | FN-M02-007 | Free Visitor Scan | SF-M02-007-01 | Cho khách tự do xem nội dung QR mà không tạo session, visit hoặc sync | FR-M02-026 | Must |
| M02 | FN-M02-008 | Cross-module Contract Consumption | SF-M02-008-01 | Chỉ đọc SelectedRouteContext, LanguagePreference, OfflinePackage và dữ liệu public M03; không sửa store nguồn | FR-M02-025 | Must |

## 4. Coverage summary

| Metric | Value |
|---|---:|
| Functions | 8 |
| Sub-functions | 27 |
| Source FR covered | 27/27 |
| Must sub-functions | 27 |

Không có sub-function tự đặt priority khác function cha.
