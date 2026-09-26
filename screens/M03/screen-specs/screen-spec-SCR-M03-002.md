# Screen Specification: SCR-M03-002 — Route Editor

| Field | Value |
|---|---|
| Screen ID | `SCR-M03-002` |
| Screen name | Route Editor |
| Module | `M03` |
| Actor | Content Staff |
| Priority | Must |
| Mockup | `screens/M03/mockup-SCR-M03-002.html` |
| Status | Draft |

## 1. Purpose

**Shown when:** Content Staff bấm [Mở] trên route item từ `SCR-M03-001`, hoặc tạo tuyến mới từ `[+ Tạo tuyến mới]`.

**The user leaves when:** Lưu nháp → ở lại với trạng thái NHAP; mở checkpoint workspace → `SCR-M03-003`; gửi duyệt → `SCR-M03-004`; quay lại `SCR-M03-001`.

## 2. Mockup

```
┌──────────────────────────────────────────────────────────────┐
│ ← Quay lại    Soạn tuyến: Tuyến Rừng Nguyên Sinh     👤 Lan NT│
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ─── Thông tin tuyến ────────────────────────────────────   │
│                                                              │
│  Tên tuyến (VI) *                                          │
│  [Tuyến Rừng Nguyên Sinh                               ]   │  ← Name VI (E-04)
│                                                              │
│  Mô tả (VI) *                                               │
│  [Hành trình xuyên rừng nguyên sinh...                 ]   │  ← Desc VI (E-05)
│                                                              │
│  Tên tuyến (EN)                                             │
│  [                                                       ]   │  ← Name EN (E-06)
│                                                              │
│  Mô tả (EN)                                                 │
│  [                                                       ]   │  ← Desc EN (E-07)
│                                                              │
│  Cảnh báo an toàn (VI)                                      │
│  [                                                       ]   │  ← Safety VI (E-08)
│                                                              │
│  Cảnh báo an toàn (EN)                                      │
│  [                                                       ]   │  ← Safety EN (E-09)
│                                                              │
│  ─── Đặc điểm tuyến ────────────────────────────────────    │
│                                                              │
│  Cự ly (km) *  [5  ]  Thời lượng (phút) *  [120 ]          │  ← Distance/Duration (E-10)
│                                                              │
│  Độ khó *     [Dễ ▾]                                        │  ← Difficulty (E-11)
│               ○ Dễ  ● Trung bình  ○ Khó                     │
│                                                              │
│  ─── Gợi ý tuyến ──────────────────────────────────────    │
│                                                              │
│  Thời gian khám phá * (chọn 1+)                              │
│  [x] Buổi sáng  [ ] Buổi trưa  [ ] Buổi chiều  [x] Cả ngày│  ← timeTags (E-12)
│                                                              │
│  Đối tượng phù hợp * (chọn 1+)                              │
│  [x] Gia đình  [ ] Cặp đôi   [ ] Bạn bè  [ ] Một mình      │  ← groupTags (E-13)
│                                                              │
│  Loại hình trải nghiệm * (chọn 1+)                          │
│  [ ] Khám phá  [x] Thiên nhiên  [ ] Văn hóa  [x] Thể chất  │  ← experienceTags (E-14)
│                                                              │
│  ─── Checkpoint ─────────────────────────────────────────    │
│                                                              │
│  #1  Rừng Nguyên Sinh          ONLINE    [✏️] [🗑️]          │  ← Checkpoint #1 (E-15)
│  #2  Thác Nước Trong Rừng      OFFLINE   [✏️] [🗑️]          │  ← Checkpoint #2 (E-16)
│  #3  Rừng Cổ Thụ              OFFLINE   [✏️] [🗑️]          │  ← Checkpoint #3 (E-17)
│                                                              │
│  + Thêm checkpoint                                         │  ← Add checkpoint (E-18)
│                                                              │
│  ─── Kiểm tra điều kiện ────────────────────────────────   │
│                                                              │
│  ❌ Tên EN còn trống                                        │
│  ❌ Mô tả EN còn trống                                      │  ← Completeness gaps (E-19)
│  ✅ Đã chọn đủ tag                                          │
│  ✅ Đã thêm checkpoint                                       │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Lưu nháp                                  │  │  ← Save draft (E-20)
│  └────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Gửi duyệt                                 │  │  ← Submit for review (E-21)
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  📋 Báo cáo      👤 Quản lý tài khoản                        │  ← Nav footer (E-22)
└──────────────────────────────────────────────────────────────┘

  CONFLICT state (stale write):
  ┌────────────────────────────────────────────────────────────┐
  │  ⚠ Dữ liệu đã thay đổi bởi người khác.                   │
  │  [Xem thay đổi]              [Tải lại phiên bản mới nhất] │  ← Conflict banner (E-23)
  └────────────────────────────────────────────────────────────┘
```

## 3. Element Inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M03-002-01 | Back button | Button | "← Quay lại" — quay `SCR-M03-001` | Yes | Tap → unsaved changes prompt if dirty |
| 2 | E-SCR-M03-002-02 | Screen title | Text | "Soạn tuyến: [ten_tuyen]" hoặc "Tạo tuyến mới" | Yes | Updates when name VI is filled |
| 3 | E-SCR-M03-002-03 | User badge | Text | Logged-in Content Staff display name | Yes | Read-only |
| 4 | E-SCR-M03-002-04 | Name VI input | Input | `ten_tuyen.vi` | Yes (save draft) | Required; max 200 characters |
| 5 | E-SCR-M03-002-05 | Description VI input | Textarea | `mo_ta.vi` | Yes (save draft) | Required at approval; max 2000 characters |
| 6 | E-SCR-M03-002-06 | Name EN input | Input | `ten_tuyen.en` | Conditional | Required at approval; max 200 characters |
| 7 | E-SCR-M03-002-07 | Description EN input | Textarea | `mo_ta.en` | Conditional | Required at approval; max 2000 characters |
| 8 | E-SCR-M03-002-08 | Safety warning VI input | Textarea | `canh_bao_an_toan.vi` | No | Optional; max 500 characters |
| 9 | E-SCR-M03-002-09 | Safety warning EN input | Textarea | `canh_bao_an_toan.en` | Conditional | Required if VI warning exists at approval |
| 10 | E-SCR-M03-002-10 | Distance & duration inputs | Inputs | `cu_ly_km` (decimal, >0), `thoi_luong_du_kien_phut` (integer, >0) | Yes | Both required |
| 11 | E-SCR-M03-002-11 | Difficulty selector | Radio | `do_kho`: NHE / TRUNG_BINH / KHO; localized labels: Dễ / Trung bình / Khó | Yes | One must be selected |
| 12 | E-SCR-M03-002-12 | timeTags checkboxes | Checkbox group | Values: BUOI_SANG / BUOI_TRUA / BUOI_CHIEU / CA_NGAY; min 1 required at approval | Yes | ≥ 1 required at submit; FR-003 |
| 13 | E-SCR-M03-002-13 | groupTags checkboxes | Checkbox group | Values: GIA_DINH / CAP_DOI / BAN_BE / MOT_MINH; min 1 required at approval | Yes | ≥ 1 required at submit; FR-003 |
| 14 | E-SCR-M03-002-14 | experienceTags checkboxes | Checkbox group | Values: KHAM_PHA / THIEN_NHIEN / VAN_HOA / THE_CHAT; min 1 required at approval | Yes | ≥ 1 required at submit; FR-003 |
| 15 | E-SCR-M03-002-15 | Checkpoint item #1 | Row | `#seq` + `ten_diem` + connectivity badge + [✏️] + [🗑️] | Yes | Tap [✏️] → `SCR-M03-003` with `ma_diem` |
| 16 | E-SCR-M03-002-16 | Checkpoint item #2..N | Row | Same as E-15 | No | Repeat per checkpoint |
| 17 | E-SCR-M03-002-17 | Add checkpoint button | Button | "+ Thêm checkpoint" | Yes | Tap → create checkpoint draft → navigate `SCR-M03-003` |
| 18 | E-SCR-M03-002-18 | Completeness checklist | Checklist | Inline validation result: gaps vs ✅ items | Yes | Recomputed on every field change; FR-009 |
| 19 | E-SCR-M03-002-19 | Save draft button | Button | "Lưu nháp" | Yes | Saves all dirty fields; route stays NHAP |
| 20 | E-SCR-M03-002-20 | Submit for review button | Button | "Gửi duyệt" | Yes | FR-009 guard: if gaps → show gaps; if pass → navigate `SCR-M03-004` |
| 21 | E-SCR-M03-002-21 | Nav footer entries | Buttons | "📋 Báo cáo", "👤 Quản lý tài khoản" | Yes | Same as `SCR-M03-001` E-11/E-12 |
| 22 | E-SCR-M03-002-22 | Stale-write conflict banner | Banner | "Dữ liệu đã thay đổi bởi người khác" + [Xem thay đổi] + [Tải lại] | Conditional | FR-018: shown when server rejects stale write |
| 23 | E-SCR-M03-002-23 | Concurrency diff view | Inline/panel | Shows diff between local draft and server version | Conditional | Shown after user taps [Xem thay đổi] |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| New route | Empty form; route status NHAP; no checkpoints | Created via [+ Tạo tuyến mới] |
| Edit existing draft | Pre-filled form; route status NHAP; existing checkpoints listed | Opened from route item |
| In progress | Some fields filled; completeness checklist partial | User editing |
| Completeness blocked | Submit disabled; gap list shown | Gaps exist in checklist |
| Ready to submit | All ✅ in checklist; Submit button enabled | All required fields valid |
| Submitting | Submit button shows spinner; form disabled | Server processing submit |
| Stale-write conflict | Conflict banner; [Xem thay đổi] / [Tải lại] | FR-018 stale write result |
| Submitted | Route status → CHO_DUYET; form read-only | Submit success |

## 5. Interactions and Navigation

| # | Element | User action | System response | Destination / result |
|---|---|---|---|---|
| 1 | E-01 Back button | Tap | Prompt if unsaved changes; else → `SCR-M03-001` | `SCR-M03-001` |
| 2 | E-04..E-14 All inputs | Change | Mark form dirty; recompute completeness checklist | Stays; checklist updates |
| 3 | E-15..E-16 [✏️] Edit checkpoint | Tap | Navigate to checkpoint workspace | `SCR-M03-003` with `ma_diem` |
| 4 | E-15..E-16 [🗑️] Delete checkpoint | Tap | Confirm delete → remove from list | Item removed; order updated |
| 5 | E-17 [+ Thêm checkpoint] | Tap | Create checkpoint draft → navigate | `SCR-M03-003` with new `ma_diem` |
| 6 | E-20 [Lưu nháp] | Tap | Save all fields as NHAP | Toast: "Đã lưu nháp" |
| 7 | E-21 [Gửi duyệt] | Tap | FR-009 completeness check; if pass → navigate; if fail → show gaps | `SCR-M03-004` on pass |
| 8 | E-22 Nav entries | Tap | Navigate to respective screens | `SCR-M03-005` or `SCR-M03-006` |
| 9 | E-23 [Tải lại] | Tap | Fetch latest server version → replace local form | Form replaced |
| 10 | E-23 [Xem thay đổi] | Tap | Show diff between local and server version | Diff panel shown |

## 6. Screen-level Rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M03-002-001 | Vietnamese name and description required to save as NHAP draft; English required only at approval | FR-001, FR-002, BR-001 |
| SR-SCR-M03-002-002 | Submit button guard: all three tag groups must have ≥ 1 selected; all gaps shown inline | FR-003, FR-009, BR-002 |
| SR-SCR-M03-002-003 | Route status is NHAP until submitted; CHO_DUYET after submit; HOAT_DONG after approval | BR-001, BR-002, BR-003 |
| SR-SCR-M03-002-004 | Submit route → status changes to CHO_DUYET; creator cannot approve their own route | BR-003, FR-009 |
| SR-SCR-M03-002-005 | Optimistic concurrency: every save sends `id` + `updated_at`; stale result → conflict banner | FR-018 |
| SR-SCR-M03-002-006 | Offline-required checkpoints require ≥ 1 active QR code before route can be submitted | BR-002, BR-004 |
| SR-SCR-M03-002-007 | Route cannot be submitted if any checkpoint is missing published bilingual content | BR-002, FR-007 |
| SR-SCR-M03-002-008 | Checkpoint connectivity_mode (ONLINE_AVAILABLE) requires a field-check confirmation note | FR-004 |

## 7. Linked Requirements

| FR ID | How the screen supports it |
|---|---|
| FR-001 | All bilingual fields (VI/EN name, description, safety warning) in editor form |
| FR-002 | VI required at draft; EN required at approval gate |
| FR-003 | Three tag groups with ≥ 1 required; submit blocked if any group empty |
| FR-004 | Checkpoint list shows connectivity_mode; ONLINE_AVAILABLE requires verification note |
| FR-007 | Checkpoint bilingual content requirement enforced before submit |
| FR-009 | Completeness guard computes gap list on submit; results shown inline |
| FR-018 | Stale-write conflict detection and resolution UI |
| FR-019 | User management accessible via nav footer |

## 8. Responsive and Accessibility Notes

- Smallest supported viewport: **1280 × 800 px** (desktop). Form scrolls vertically.
- All inputs: labeled with `<label>` elements; error messages use `aria-describedby`.
- Tag checkboxes: `role="group"` with `aria-label` per group.
- Completeness checklist: `role="list"` with `role="listitem"`; pass items distinguished from fail items.
- Conflict banner: `role="alert"` for screen reader announcement.
- Form dirty state: warn user before navigating away if unsaved changes exist.

## 9. Open Questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M03-002-001 | Tag options có cần icon riêng cho từng loại tag không? | No | Open |
| OQ-SCR-M03-002-002 | Checkpoint connectivity_mode confirmation note (FR-004) — format là free-text hay chọn preset? | No | Open |
| OQ-SCR-M03-002-003 | "Xem thay đổi" diff view — side-by-side hay unified diff? | No | Open |

## Completion Checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-23).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described with trigger conditions.
- [x] Navigation targets (`SCR-M03-001`, `SCR-M03-003`, `SCR-M03-004`, `SCR-M03-005`, `SCR-M03-006`) are valid.
- [x] All linked FRs (FR-001, 002, 003, 004, 007, 009, 018, 019) traced.
- [x] Completeness guard / submission gate captured.
- [x] Optimistic concurrency conflict state captured.
- [ ] Mockup file path confirmed after visual design sign-off.
