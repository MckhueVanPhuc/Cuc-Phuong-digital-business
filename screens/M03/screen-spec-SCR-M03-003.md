# Screen Specification: SCR-M03-003 — Checkpoint Content & QR Workspace

| Field | Value |
|---|---|
| Screen ID | `SCR-M03-003` |
| Screen name | Checkpoint Content & QR Workspace |
| Module | `M03` |
| Actor | Content Staff / Reviewer |
| Priority | Must |
| Mockup | `screens/M03/mockup-SCR-M03-003.html` |
| Status | Draft |

## 1. Purpose

**Shown when:** Content Staff tap [✏️] hoặc [+ Thêm checkpoint] từ `SCR-M03-002`, hoặc Reviewer truy cập checkpoint đang chờ duyệt từ `SCR-M03-004`.

**The user leaves when:** Lưu checkpoint → quay `SCR-M03-002`; gửi checkpoint cần xác nhận → `SCR-M03-004` (cho Reviewer); quay lại `SCR-M03-002`.

## 2. Mockup

```
┌──────────────────────────────────────────────────────────────┐
│ ← Quay lại    Checkpoint #2: Thác Nước Trong Rừng     👤 Lan NT│
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ─── Thông tin checkpoint ──────────────────────────────    │
│                                                              │
│  Tên checkpoint (VI) *                                       │
│  [Thác Nước Trong Rừng                                 ]   │  ← Name VI (E-04)
│                                                              │
│  Thứ tự trên tuyến *                                        │
│  [2                                                    ]   │  ← Sequence (E-05)
│                                                              │
│  Chế độ kết nối *                                           │
│  (●) ONLINE (có sóng di động)                               │  ← Connectivity: ONLINE (E-06)
│  ( ) OFFLINE (cần tài nguyên offline)                       │
│                                                              │
│  Xác nhận kiểm tra thực địa *                              │
│  [Đã xác nhận sóng 4G tại vị trí                       ]   │  ← Field check note (E-07)
│  ⚠ Chỉ hiển thị khi chọn ONLINE                            │
│                                                              │
│  ─── Mã QR ─────────────────────────────────────────────   │
│                                                              │
│  📷 Tạo mã QR mới                                          │  ← Generate QR (E-08)
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 📄 QR #A: "Cạnh thác phải"              HOAT_DONG   │  │
│  │    Nội dung: QC-7F2A...                             │  │
│  │    [In lại]  [Đổi mã ⚠]                            │  │  ← QR item #1 (E-09)
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 📄 QR #B: "Điểm ngắm tổng quan"        HOAT_DONG   │  │
│  │    Nội dung: QC-9C3B...                             │  │
│  │    [In lại]  [Đổi mã ⚠]                            │  │  ← QR item #2 (E-10)
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  + Thêm mã QR khác                                         │  ← Add QR (E-11)
│                                                              │
│  ─── Nội dung giới thiệu ───────────────────────────────   │
│                                                              │
│  Tiếng Việt                                                  │
│  [Thác nước cao 30m giữa rừng nguyên sinh...           ]   │  ← Content VI (E-12)
│  Trạng thái: [DANG_NHAP ▾]                                 │  ← Content VI status (E-13)
│                                                              │
│  Tiếng Anh                                                  │
│  [A 30m waterfall in the pristine forest...               ]   │  ← Content EN (E-14)
│  Trạng thái: [DA_CONG_BO ▾]                                │  ← Content EN status (E-15)
│                                                              │
│  ⚠ Cả hai ngôn ngữ phải DA_CONG_BO trước khi checkpoint   │
│    có thể HOAT_DONG                                        │  ← Activation guard (E-16)
│                                                              │
│  ─── Tài nguyên bổ sung ────────────────────────────────    │
│                                                              │
│  Hình ảnh tĩnh                                              │
│  [📷 Tải lên]                                              │  ← Image upload (E-17)
│  Ảnh: IMG_001.jpg ✅  IMG_002.jpg ✅  IMG_003.jpg [🗑️]     │
│                                                              │
│  Âm thanh / Video                                           │
│  [🔊 Tải lên]  (chỉ online — không đi kèm gói offline)      │  ← Media upload (E-18)
│  audio_thacnuoc.mp3 ✅  video_thacnuoc.mp4 ✅               │
│                                                              │
│  ─── Kiểm tra điều kiện ────────────────────────────────   │
│                                                              │
│  ✅ Có ít nhất 1 mã QR HOAT_DONG                           │
│  ✅ Nội dung VI đã DA_CONG_BO                               │
│  ❌ Nội dung EN chưa DA_CONG_BO                             │
│  ❌ Xác nhận thực địa còn trống (nếu ONLINE)               │  ← Activation guard (E-19)
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                    Lưu checkpoint                       │  │  ← Save (E-20)
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  📋 Báo cáo      👤 Quản lý tài khoản                        │
└──────────────────────────────────────────────────────────────┘

  IDENTITY CHANGE confirm (reprint vs change):
  ┌────────────────────────────────────────────────────────────┐
  │  ⚠ Đổi mã QR                                             │
  │                                                           │
  │  Bạn đang thay đổi nội dung mã QR #A.                    │
  │  Hành động này yêu cầu người duyệt xác nhận.            │
  │  Checkpoint có OFFLINE_REQUIRED: snapshot sẽ được tạo lại.│
  │                                                           │
  │  Lý do thay đổi *:                                       │
  │  [Thác nước đã dời vị trí...                        ]   │  ← Change reason (E-21)
  │                                                           │
  │  [Hủy]              [Gửi xác nhận]                        │
  └────────────────────────────────────────────────────────────┘

  REPRINT confirm:
  ┌────────────────────────────────────────────────────────────┐
  │  📄 In lại mã QR #A                                       │
  │                                                           │
  │  Mã QR giữ nguyên nội dung: QC-7F2A...                   │
  │  Không ảnh hưởng checkpoint hay snapshot.                  │
  │                                                           │
  │  [Hủy]              [Xác nhận in]                        │
  └────────────────────────────────────────────────────────────┘
```

## 3. Element Inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M03-003-01 | Back button | Button | "← Quay lại" → `SCR-M03-002` | Yes | Tap → unsaved changes prompt if dirty |
| 2 | E-SCR-M03-003-02 | Screen title | Text | "Checkpoint #[seq]: [ten_diem]" | Yes | Updates as name VI is filled |
| 3 | E-SCR-M03-003-03 | User badge | Text | Logged-in account display name | Yes | Read-only |
| 4 | E-SCR-M03-003-04 | Name VI input | Input | `ten_diem` (checkpoint name) | Yes | Required; max 200 characters |
| 5 | E-SCR-M03-003-05 | Sequence input | Input | `thu_tu` — integer, unique within route | Yes | Must be ≥ 1; must not conflict with existing checkpoints |
| 6 | E-SCR-M03-003-06 | Connectivity mode selector | Radio | ONLINE_AVAILABLE / OFFLINE_REQUIRED; localized labels | Yes | Switching mode changes QR/activation logic |
| 7 | E-SCR-M03-003-07 | Field check note input | Textarea | Confirmation note when ONLINE_AVAILABLE selected | Conditional | Required when connectivity = ONLINE_AVAILABLE; FR-004 |
| 8 | E-SCR-M03-003-08 | Generate QR button | Button | "📷 Tạo mã QR mới" | Yes | Generates `noi_dung_ma` + `ma_qr` with status HOAT_DONG; FR-005 |
| 9 | E-SCR-M03-003-09 | QR item #1..N | Card | `ten_doi_tuong_gan_ma` + truncated `noi_dung_ma` + [In lại] + [Đổi mã ⚠] | Yes | Per active QR attached to this checkpoint; FR-005 |
| 10 | E-SCR-M03-003-10 | Add QR button | Button | "+ Thêm mã QR khác" | Yes | Creates another QR with HOAT_DONG status |
| 11 | E-SCR-M03-003-11 | Content VI textarea | Textarea | `noi_dung_gioi_thieu.vi`; min 30 characters | Yes | FR-007; min 30 chars |
| 12 | E-SCR-M03-003-12 | Content VI status selector | Select | `trang_thai`: DANG_NHAP / DANG_CHO_DUYET / DA_CONG_BO | Yes | Content Staff changes to DA_CONG_BO to publish |
| 13 | E-SCR-M03-003-13 | Content EN textarea | Textarea | `noi_dung_gioi_thieu.en`; min 30 characters | Conditional | Required for checkpoint to reach HOAT_DONG |
| 14 | E-SCR-M03-003-14 | Content EN status selector | Select | Same as E-12 | Conditional | Required for checkpoint to reach HOAT_DONG |
| 15 | E-SCR-M03-003-15 | Activation guard banner | Banner | Warning when bilingual content not yet DA_CONG_BO | Yes | Recomputes on content/status change |
| 16 | E-SCR-M03-003-16 | Static image upload | Upload | Accept image files; display thumbnails with [🗑️] | No | Only published images enter offline snapshot; FR-008 |
| 17 | E-SCR-M03-003-17 | Audio/video upload | Upload | Accept audio/video; show file list | No | Online-only; not included in offline snapshot; FR-008 |
| 18 | E-SCR-M03-003-18 | Activation checklist | Checklist | Per-gate item showing pass/fail | Yes | FR-007, BR-002 |
| 19 | E-SCR-M03-003-19 | Save checkpoint button | Button | "Lưu checkpoint" | Yes | Saves checkpoint; route stays NHAP or submitted |
| 20 | E-SCR-M03-003-20 | Identity change confirmation modal | Modal | Change reason + [Hủy] + [Gửi xác nhận]; shown for [Đổi mã] | Yes | BR-005: requires reviewer approval; triggers snapshot for OFFLINE_REQUIRED |
| 21 | E-SCR-M03-003-21 | Reprint confirmation modal | Modal | Confirms no identity change; [Hủy] + [Xác nhận in] | Yes | BR-005: reprint keeps identity; no snapshot |
| 22 | E-SCR-M03-003-22 | Nav footer | Buttons | "📋 Báo cáo", "👤 Quản lý tài khoản" | Yes | Same as other M03 screens |
| 23 | E-SCR-M03-003-23 | Concurrency conflict banner | Banner | "Dữ liệu đã thay đổi" + [Tải lại] | Conditional | FR-018: shown when stale write result returned |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| New checkpoint | Empty form; no QR codes; content status = DANG_NHAP | Created via [+ Thêm checkpoint] |
| Edit existing | Pre-filled form; existing QR list; content with current statuses | Opened via [✏️] from `SCR-M03-002` |
| Online — no field check | Connectivity = ONLINE; field-check note hidden/disabled | Connectivity mode = ONLINE_AVAILABLE selected |
| Online — field check entered | Field-check note visible and required | Connectivity = ONLINE with note |
| Offline | Connectivity = OFFLINE; no field-check note; QR+content rules same | Connectivity = OFFLINE_REQUIRED |
| Activation blocked | Activation guard banner with ❌ items | Content VI/EN not both DA_CONG_BO OR no QR |
| Ready to activate | All ✅ in checklist; checkpoint can reach HOAT_DONG | All activation gates pass |
| Identity change pending | [Đổi mã] → modal → sent for Reviewer approval | Content Staff requests identity change |
| Reprinting | [In lại] → confirmation → QR reprinted with same content | BR-005 |
| Stale-write conflict | Conflict banner; [Tải lại] | FR-018 |
| Reviewer viewing | Read-only or edit mode; [Gửi xác nhận] visible for identity change | Actor = Reviewer + pending change |

## 5. Interactions and Navigation

| # | Element | User action | System response | Destination / result |
|---|---|---|---|---|
| 1 | E-01 Back | Tap | Unsaved changes prompt if dirty; else → `SCR-M03-002` | `SCR-M03-002` |
| 2 | E-06 Connectivity radio | Change | Show/hide field check note; recompute activation checklist | Stays; form updated |
| 3 | E-08 [📷 Tạo mã QR mới] | Tap | Generate QR code → add to list with HOAT_DONG | QR item appears in list |
| 4 | E-09..E-10 [In lại] | Tap | Open reprint confirmation modal | Modal displayed |
| 5 | E-09..E-10 [Đổi mã ⚠] | Tap | Open identity-change modal with reason field | Modal displayed |
| 6 | E-20 [Gửi xác nhận] | Tap | Submit identity change for Reviewer approval; FR-006 | Checkpoint flagged pending approval |
| 7 | E-21 [Xác nhận in] | Tap | Reprint QR with same `noi_dung_ma`; BR-005 | Modal closes; reprint queued/generated |
| 8 | E-12..E-14 Content status selector | Change | Content status updates; recompute activation checklist | Stays; checklist updates |
| 9 | E-16..E-17 Upload inputs | Upload file | File validated (type, size); added to list with status | File item appears |
| 10 | E-19 [Lưu checkpoint] | Tap | Save checkpoint + content + QR relationships + media; FR-007/FR-008 | Toast: "Đã lưu checkpoint" |
| 11 | E-23 [Tải lại] | Tap | Fetch latest server version → replace local form | Form replaced |

## 6. Screen-level Rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M03-003-001 | Checkpoint can reach HOAT_DONG only when: ≥ 1 QR HOAT_DONG AND both content VI and EN are DA_CONG_BO | FR-007, BR-002 |
| SR-SCR-M03-003-002 | ONLINE_AVAILABLE requires a field-check confirmation note; OFFLINE_REQUIRED does not | FR-004 |
| SR-SCR-M03-003-003 | Reprint keeps `noi_dung_ma` unchanged; no new snapshot triggered | BR-005 |
| SR-SCR-M03-003-004 | Identity change requires reviewer approval and a reason; blocked if it would leave zero active QR codes | FR-006, BR-005 |
| SR-SCR-M03-003-005 | Identity change on OFFLINE_REQUIRED checkpoint immediately triggers new snapshot after reviewer approval | FR-010 |
| SR-SCR-M03-003-006 | Only published static images (status DA_CONG_BO, type IMAGE) enter the offline snapshot; audio/video always online-only | FR-008, BR-002 |
| SR-SCR-M03-003-007 | Every save sends `id` + `updated_at`; stale write → conflict banner and [Tải lại] | FR-018 |
| SR-SCR-M03-003-008 | QR `thu_tu` must be unique within a route; duplicate sequence triggers validation error | FR-004 |
| SR-SCR-M03-003-009 | Deleting a QR (archiving) is allowed; identity change is blocked if it would leave zero active QR codes | FR-006, BR-005 |
| SR-SCR-M03-003-010 | Content VI/EN must each be ≥ 30 characters to be set to DA_CONG_BO | FR-007 |

## 7. Linked Requirements

| FR ID | How the screen supports it |
|---|---|
| FR-004 | Name, sequence, connectivity mode, field check note; sequence uniqueness validated |
| FR-005 | QR list, generate, reprint, change-identity actions |
| FR-006 | Identity change blocked when no replacement QR exists; reason required |
| FR-007 | Bilingual content textarea + DA_CONG_BO status; 30-char minimum enforced |
| FR-008 | Image/audio/video upload; offline/online media routing in snapshot |
| FR-009 | Activation checklist shown; completeness gates enforced before save |
| FR-010 | Identity change on OFFLINE_REQUIRED triggers snapshot regeneration |
| FR-011 | Adding/removing checkpoint on live route supported via editor |
| FR-014 | Server enforces all write permissions regardless of UI state |
| FR-018 | Optimistic concurrency conflict UI |

## 8. Responsive and Accessibility Notes

- Smallest supported viewport: **1280 × 800 px** (desktop). Content scrolls vertically; media section below fold.
- Upload inputs: `role="button"` with accessible label; file list has `role="list"`.
- QR item cards: `role="listitem"`; each action button has `aria-label`.
- Activation checklist: `role="list"`; pass/fail visually and textually distinct.
- Identity change modal: `role="dialog"`, focus trapped; reason field has `aria-label` and required indicator.
- Content textareas: `aria-label` per language; character counter announced.

## 9. Open Questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M03-003-001 | QR [Đổi mã] gửi notification đến Reviewer như thế nào? (email in-app, notification, hay chỉ pending state trên SCR-M03-004?) | No | Open |
| OQ-SCR-M03-003-002 | File upload hỗ trợ drag-and-drop hay chỉ button click? | No | Open |
| OQ-SCR-M03-003-003 | Media upload có preview inline không, hay chỉ hiển thị filename? | No | Open |
| OQ-SCR-M03-003-004 | Reviewer có thể edit checkpoint trực tiếp từ SCR-M03-003 hay chỉ approve/reject từ SCR-M03-004? | No | Open |

## Completion Checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-23).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described with trigger conditions.
- [x] Navigation targets (`SCR-M03-002`, `SCR-M03-004`) are valid.
- [x] All linked FRs (FR-004, 005, 006, 007, 008, 009, 010, 011, 014, 018) traced.
- [x] QR reprint vs identity-change flows separated with correct consequence labels.
- [x] Bilingual content activation guard captured.
- [x] Optimistic concurrency conflict state captured.
- [ ] Mockup file path confirmed after visual design sign-off.
