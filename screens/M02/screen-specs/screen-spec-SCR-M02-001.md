# Screen Specification: SCR-M02-001 — Phiên trải nghiệm

| Field | Value |
|---|---|
| Screen ID | `SCR-M02-001` |
| Screen name | Phiên trải nghiệm |
| Module | `M02` |
| Actor | Khách sử dụng web-app / Khách tự do |
| Priority | Must |
| Mockup | `screens/M02/mockup-SCR-M02-001.html` |
| Status | Draft |

## 1. Purpose

**Shown when:** Khách bấm Bắt đầu từ M01 (`SCR-M01-003`), khách quay lại trong phiên đang chạy, hoặc khách tự do mở trực tiếp scanner.

**The user leaves when:** Mở nội dung checkpoint (`SCR-M02-002`), mở màn kết thúc (`SCR-M02-003`) khi đủ điều kiện, hoặc quay M01 nếu thiếu `SelectedRouteContext`.

## 2. Mockup

```
┌──────────────────────────────────┐
│ ←        Phiên trải nghiệm  🌐 VI│  ← Header (E-01…E-03)
├──────────────────────────────────┤
│                                  │
│  Tuyến Rừng Nguyên Sinh          │  ← Route name (E-04)
│  5 km · 120 phút · ⬛ Dễ         │
│                                  │
│  ─── Hành trình của bạn ──────── │  ← Journey header (E-05)
│                                  │
│  ●─●─○─○─○─○                    │  ← Progress line (E-06)
│                                  │
│  ┌────────────────────────────┐  │
│  │ ① Tuyến Rừng Nguyên Sinh │  │  ← Checkpoint #1 (E-07)
│  │    ✅ Đã khám phá lúc 09:15 │  │    checked-in → filled marker
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ ② Thác Nước Trong Rừng  │  │  ← Checkpoint #2 (E-08)
│  │    ✅ Đã khám phá lúc 09:40 │  │    checked-in
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ ③ Rừng Cổ Thụ            │  │  ← Checkpoint #3 (E-09)
│  │    ⬜ Chưa khám phá       │  │    not checked-in → hollow
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ ④ Điểm Ngắm Cảnh         │  │  ← Checkpoint #4 (E-10)
│  │    ⬜ Chưa khám phá       │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ ⑤ Trạm Cuối               │  │  ← Checkpoint #5 (E-11)
│  │    ⬜ Chưa khám phá       │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │      📷 Quét mã QR        │  │  ← QR scan button (E-12)
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │       Kết thúc hành trình  │  │  ← End button (E-13)
│  └────────────────────────────┘  │
│                                  │
├──────────────────────────────────┤
│  ↩ Quay lại M01             (i) │  ← Back to M01 entry (E-14)
└──────────────────────────────────┘

  SCAN RESULT — SUCCESS variant:
  ┌──────────────────────────────────┐
  │  ✅ Check-in thành công!         │
  │                                   │
  │  Bạn đã check-in tại             │
  │  "Rừng Cổ Thụ"                  │
  │                                   │
  │  [Xem nội dung trạm]             │
  │  [Quay lại bản đồ]              │
  └──────────────────────────────────┘

  SCAN RESULT — DUPLICATE variant:
  ┌──────────────────────────────────┐
  │  ℹ Bạn đã khám phá trạm này     │
  │                                   │
  │  Thời điểm: 09:15               │
  │                                   │
  │  [Xem nội dung]                  │
  │  [Quay lại bản đồ]              │
  └──────────────────────────────────┘

  SCAN RESULT — OUTSIDE ROUTE variant:
  ┌──────────────────────────────────┐
  │  ℹ Mã QR ngoài tuyến            │
  │                                   │
  │  Mã này không thuộc hành trình   │
  │  của bạn, nhưng chúng tôi tìm   │
  │  thấy thông tin:                 │
  │                                   │
  │  "Điểm Cắm Trại A"              │
  │                                   │
  │  [Xem nội dung]                  │
  │  [Quay lại bản đồ]              │
  └──────────────────────────────────┘

  SCAN RESULT — NOT FOUND variant:
  ┌──────────────────────────────────┐
  │  ❌ Không tìm thấy thông tin    │
  │                                   │
  │  Không tìm thấy thông tin cho   │
  │  mã QR này.                     │
  │                                   │
  │  [Quay lại bản đồ]              │
  └──────────────────────────────────┘

  NO CONTEXT redirect overlay:
  ┌──────────────────────────────────┐
  │  ⚠ Chưa chọn tuyến               │
  │                                   │
  │  Bạn cần chọn một tuyến ở M01   │
  │  trước khi bắt đầu phiên.        │
  │                                   │
  │  [Quay lại chọn tuyến]           │
  └──────────────────────────────────┘

  ROUTE SWITCHED banner (in-session):
  ┌──────────────────────────────────┐
  │ ⚠ Hành trình trước đã kết thúc  │
  │  Phiên tuyến cũ được ghi nhận.   │
  │  Checkpoint đã check-in được giữ. │
  └──────────────────────────────────┘
```

## 3. Element Inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M02-001-01 | Back button | Button | "←" icon | Yes | Tap → quay M01 |
| 2 | E-SCR-M02-001-02 | Screen title | Text | "Phiên trải nghiệm" / "Journey Session" — static i18n | Yes | None |
| 3 | E-SCR-M02-001-03 | Language toggle | Button | Current language code "VI" or "EN" | Yes | Shared control; reads `LanguagePreference.languageCode` |
| 4 | E-SCR-M02-001-04 | Route info row | Text | Route `name`, `distance`, `estimatedDuration`, `difficulty` từ SelectedRouteContext.routeId | Yes | Difficulty label localized; hiển thị khi có `SelectedRouteContext` |
| 5 | E-SCR-M02-001-05 | Journey section header | Text | "Hành trình của bạn" / "Your Journey" — static i18n | Yes | Hiển thị khi có PlaySession DANG_DIEN_RA |
| 6 | E-SCR-M02-001-06 | Progress line | Visual | Dots/circles representing total checkpoints; filled for checked-in, hollow for pending | Yes | Count = journeyCheckpoints.length; fill state from CheckpointVisit |
| 7 | E-SCR-M02-001-07 | Checkpoint item #1 | Card | ① + checkpoint name + "✅ Đã khám phá lúc [time]" / "⬜ Chưa khám phá" | Yes | Tap → mở SCR-M02-002 với checkpointId; visual fill reflects CheckpointVisit |
| 8 | E-SCR-M02-001-08 | Checkpoint item #2 | Card | Same as E-07 | Yes | Hiển thị khi `journeyCheckpoints.length ≥ 2` |
| 9 | E-SCR-M02-001-09 | Checkpoint item #3 | Card | Same as E-07 | No | Hiển thị khi `journeyCheckpoints.length ≥ 3` |
| 10 | E-SCR-M02-001-10 | Checkpoint item #4 | Card | Same as E-07 | No | Hiển thị khi `journeyCheckpoints.length ≥ 4` |
| 11 | E-SCR-M02-001-11 | Checkpoint item #5 | Card | Same as E-07 | No | Hiển thị khi `journeyCheckpoints.length ≥ 5`; checkpoint cuối = trigger cho Kết thúc |
| 12 | E-SCR-M02-001-12 | QR scan button | Button | "📷 Quét mã QR" / "Scan QR Code" | Yes | Tap → mở camera/QR reader; BR-M02-010: accept in any order |
| 13 | E-SCR-M02-001-13 | End journey button | Button | "Kết thúc hành trình" / "End Journey" | Conditional | Chỉ hiển thị và enable khi checkpoint cuối đã CheckpointVisit (FR-M02-019/020) |
| 14 | E-SCR-M02-001-14 | Back to M01 entry | Button | "↩ Quay lại M01" label | Yes | Tap → navigate to M01 |
| 15 | E-SCR-M02-001-15 | No-context overlay | Modal/Overlay | Warning message + [Quay lại chọn tuyến] | Yes | Hiển thị khi `SelectedRouteContext.routeId` không tồn tại; BR-M02-001 |
| 16 | E-SCR-M02-001-16 | Scan result — success | Card/Toast | "✅ Check-in thành công!" + checkpoint name + time; two action buttons | Yes | Hiển thị khi QR hợp lệ + checkpoint chưa check-in |
| 17 | E-SCR-M02-001-17 | Scan result — duplicate | Card/Toast | "ℹ Bạn đã khám phá trạm này" + checkedInAt | Yes | Hiển thị khi QR hợp lệ + checkpoint đã check-in (FR-M02-008) |
| 18 | E-SCR-M02-001-18 | Scan result — outside route | Card/Toast | "ℹ Mã QR ngoài tuyến" + checkpoint name from M03 + [Xem nội dung] | Yes | Hiển thị khi QR không thuộc journeyCheckpoints nhưng M03 tra được nội dung (BR-M02-009) |
| 19 | E-SCR-M02-001-19 | Scan result — not found | Card/Toast | "❌ Không tìm thấy thông tin" | Yes | Hiển thị khi QR không thuộc journeyCheckpoints và M03 không tra được (BR-M02-009) |
| 20 | E-SCR-M02-001-20 | Route-switched banner | Banner | Warning: phiên cũ chuyển BO_DO; CheckpointVisit giữ nguyên | Yes | Hiển thị khi `SelectedRouteContext.routeId` đổi trong lúc có phiên DANG_DIEN_RA (FR-M02-018) |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| No context | Overlay: "Chưa chọn tuyến" + [Quay lại chọn tuyến] | `SelectedRouteContext.routeId` không tồn tại khi mở M02 |
| Ready to start | Route info + journey list (empty) + QR button + End disabled | Có `SelectedRouteContext` nhưng chưa có PlaySession DANG_DIEN_RA |
| Active / Resumed | Route info + progress line + full checkpoint list with statuses + QR + End | PlaySession DANG_DIEN_RA tồn tại (mới tạo hoặc khôi phục) |
| Scan processing | Spinner/loading overlay while QR is being processed | QR scanned; awaiting resolution |
| Scan success | "Check-in thành công" card + checkpoint name + [Xem nội dung] + [Quay lại bản đồ] | QR VALID + checkpoint chưa check-in (FR-M02-007) |
| Scan duplicate | "Bạn đã khám phá trạm này" card + checkedInAt + [Xem nội dung] + [Quay lại bản đồ] | QR VALID + checkpoint đã check-in (FR-M02-008) |
| Scan outside route | "Mã QR ngoài tuyến" card + M03 checkpoint name + [Xem nội dung] + [Quay lại bản đồ] | QR không thuộc journeyCheckpoints nhưng M03 có nội dung (BR-M02-009) |
| Scan not found | "Không tìm thấy thông tin" card + [Quay lại bản đồ] | QR không thuộc journeyCheckpoints và M03 không tra được |
| Route switched | Warning banner pinned above journey list; existing checkpoints kept | `SelectedRouteContext.routeId` đổi trong lúc phiên DANG_DIEN_RA (FR-M02-018) |

## 5. Interactions and Navigation

| # | Element | User action | System response | Destination screen / result |
|---|---|---|---|---|
| 1 | E-01 Back button | Tap | Quay về M01 | `SCR-M01-001` |
| 2 | E-03 Language toggle | Tap | Mở language selector overlay; reload content vi/en | Stays; content re-renders |
| 3 | E-07..E-11 Checkpoint items | Tap | Mở SCR-M02-002 với checkpointId tương ứng | `SCR-M02-002` với checkpointId |
| 4 | E-12 QR scan button | Tap | Mở camera/QR reader; sau khi quét → phân giải qrIdentifier | Overlay/camera view active |
| 5 | E-13 End button | Tap | Trigger FR-M02-019 guard: verify last checkpoint checked-in → navigate to end | `SCR-M02-003` |
| 6 | E-14 Back to M01 | Tap | Quay về M01 | `SCR-M01-001` |
| 7 | E-15 Overlay [Quay lại chọn tuyến] | Tap | Quay về M01 chọn tuyến | `SCR-M01-001` |
| 8 | E-16 [Xem nội dung] | Tap | Mở SCR-M02-002 với checkpointId vừa scan | `SCR-M02-002` |
| 9 | E-16 [Quay lại bản đồ] | Tap | Đóng scan result overlay; quay về journey map | Stays on SCR-M02-001; map refreshed |
| 10 | E-17..E-18 [Xem nội dung] | Tap | Same as E-16 | `SCR-M02-002` |
| 11 | E-17..E-18 [Quay lại bản đồ] | Tap | Same as E-09 | Stays on SCR-M02-001 |
| 12 | E-19 [Quay lại bản đồ] | Tap | Same as E-09 | Stays on SCR-M02-001 |
| 13 | E-20 Banner dismiss | Tap / auto-dismiss | Đóng banner; map updates to new route | Stays on SCR-M02-001 |

## 6. Screen-level Rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M02-001-001 | Chỉ cho phép một PlaySession DANG_DIEN_RA tại một thời điểm trên thiết bị; BR-M02-002 | FR-M02-001, FR-M02-002 |
| SR-SCR-M02-001-002 | PlaySession chỉ được tạo khi `SelectedRouteContext.routeId` tồn tại; nếu không hiển thị no-context overlay | FR-M02-001, BR-M02-001 |
| SR-SCR-M02-001-003 | Checkpoint được hiển thị theo đúng thứ tự `sequence` từ M03; không sắp xếp client-side | FR-M02-003, FR-M02-004 |
| SR-SCR-M02-001-004 | QR scan được chấp nhận bất kể thứ tự checkpoint trên bản đồ; không cảnh báo lệch thứ tự | FR-M02-010, BR-M02-010 |
| SR-SCR-M02-001-005 | Check-in chỉ ghi nhận khi checkpoint chưa từng check-in; quét lại chỉ hiển thị thời điểm đã check-in | FR-M02-007, FR-M02-008 |
| SR-SCR-M02-001-006 | QR ngoài journeyCheckpoints: hiển thị nội dung nếu M03 tra được; không ghi CheckpointVisit; không thông báo lỗi | FR-M02-009, BR-M02-009 |
| SR-SCR-M02-001-007 | End button chỉ enable khi checkpoint cuối (sequence cuối) đã có CheckpointVisit | FR-M02-019, FR-M02-020 |
| SR-SCR-M02-001-008 | Khi `routeId` đổi trong lúc có phiên DANG_DIEN_RA: phiên hiện tại chuyển BO_DO; CheckpointVisit giữ nguyên | FR-M02-018, BR-M02-004 |
| SR-SCR-M02-001-009 | Mọi nội dung hiển thị theo `LanguagePreference.languageCode` hiện hành | FR-M02-015, FR-M02-025 |
| SR-SCR-M02-001-010 | Dữ liệu phiên và check-in được lưu cục bộ liên tục; không bị mất khi reload hoặc đóng app | FR-M02-016, FR-M02-017 |

## 7. Linked Requirements

| FR ID | How the screen supports it |
|---|---|
| FR-M02-001 | Tạo PlaySession DANG_DIEN_RA khi bấm Bắt đầu với SelectedRouteContext |
| FR-M02-002 | Chỉ có một DANG_DIEN_RA tại một thời điểm |
| FR-M02-003 | Bản đồ tĩnh timeline hiển thị checkpoint theo thứ tự |
| FR-M02-004 | Đọc checkpoint trực tiếp từ M03 theo sequence |
| FR-M02-005 | Cập nhật đánh dấu checked-in trên bản đồ khi CheckpointVisit được ghi |
| FR-M02-006 | Phân giải qrIdentifier → checkpointId và xác thực thuộc journeyCheckpoints |
| FR-M02-007 | Ghi CheckpointVisit mới khi checkpoint chưa check-in |
| FR-M02-008 | Hiển thị thời điểm đã check-in khi quét lại |
| FR-M02-009 | Hiển thị nội dung từ M03 khi QR ngoài journeyCheckpoints |
| FR-M02-010 | Chấp nhận QR bất kể thứ tự; không cảnh báo |
| FR-M02-015 | introductionText theo LanguagePreference vi/en |
| FR-M02-016 | Lưu PlaySession/CheckpointVisit liên tục trên thiết bị |
| FR-M02-017 | Không mất dữ liệu CheckpointVisit đã lưu khi reload/đóng app |
| FR-M02-018 | Chuyển phiên hiện tại BO_DO khi routeId đổi; giữ CheckpointVisit |
| FR-M02-019 | Kết thúc chỉ khi checkpoint cuối đã check-in + khách chủ động bấm |
| FR-M02-020 | End button chỉ enable khi checkpoint cuối đã CheckpointVisit |
| FR-M02-025 | Read-only các store M01 và M03 |
| FR-M02-026 | Khách tự do: không tạo PlaySession/CheckpointVisit/sync |

## 8. Responsive and Accessibility Notes

- Smallest supported viewport: **375 × 667 px** (mobile portrait). Journey map is vertically scrollable.
- Touch targets: minimum 44 × 44 px per WCAG 2.1 Level AA.
- QR scan button: prominent, full-width, centered below checkpoint list.
- Progress line (E-06): accessible via `aria-label` describing "N checkpoint trong tổng M" with checked count.
- Scan result overlays: role="dialog", aria-labelledby for screen reader.
- Checkpoint items: each is a single interactive card; tap to open content.
- Language toggle (E-03): full label required.
- No-context overlay: focus trapped; only one action available.

## 9. Open Questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M02-001-001 | QR scanner dùng camera native hay thư viện JS (ví dụ: html5-qrcode)? | No | Open |
| OQ-SCR-M02-001-002 | Khách tự do có cần entry riêng (URL/deep link) không, hay dùng chung màn với người có phiên? | No | Open |
| OQ-SCR-M02-001-003 | Scan result overlay tự đóng sau bao lâu nếu không tương tác? | No | Open |

## Completion Checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-20).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described with trigger conditions.
- [x] Navigation targets (`SCR-M02-002`, `SCR-M02-003`, `SCR-M01-001`) are valid.
- [x] All linked FRs (FR-M02-001..011, 015..020, 025, 026) are traced.
- [x] Background behaviors (persist/resume, auto-abandon, idempotent check-in) captured in rules.
- [x] QR result variants (success/duplicate/outside/not-found) all represented.
- [ ] Mockup file path confirmed after visual design sign-off.
