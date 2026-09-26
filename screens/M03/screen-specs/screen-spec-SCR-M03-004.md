# Screen Specification: SCR-M03-004 — Review & Publication

| Field | Value |
|---|---|
| Screen ID | `SCR-M03-004` |
| Screen name | Review & Publication |
| Module | `M03` |
| Actor | Reviewer |
| Priority | Must |
| Mockup | `screens/M03/mockup-SCR-M03-004.html` |
| Status | Draft |

## 1. Purpose

**Shown when:** Reviewer chọn route hoặc checkpoint có trạng thái `CHO_DUYET` từ `SCR-M03-001`, hoặc navigate trực tiếp từ `SCR-M03-002` sau khi Content Staff gửi duyệt.

**The user leaves when:** Duyệt thành công → quay `SCR-M03-001`; từ chối → quay `SCR-M03-001`; lỗi snapshot → ở lại chờ retry; quay lại `SCR-M03-001`.

## 2. Mockup

```
┌──────────────────────────────────────────────────────────────┐
│ ← Quay lại    Duyệt tuyến: Tuyến Rừng Nguyên Sinh   👤 Minh PK│
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ─── Thông tin tuyến ────────────────────────────────────   │
│                                                              │
│  Tuyến: Tuyến Rừng Nguyên Sinh                             │
│  Người tạo: Lan NT                                          │
│  Ngày gửi duyệt: 2026-09-20 14:30                          │
│  Trạng thái: CHO_DUYET                                      │
│                                                              │
│  ─── Kiểm tra điều kiện xuất bản ────────────────────────   │
│                                                              │
│  ✅ Tên VI: Tuyến Rừng Nguyên Sinh                         │
│  ✅ Mô tả VI: Hành trình xuyên rừng...                     │
│  ✅ Tên EN: Pristine Forest Trail                           │
│  ✅ Mô tả EN: Journey through the pristine forest...         │
│  ✅ Cảnh báo EN: đã điền (tùy chọn)                        │
│  ✅ Thẻ thời gian: Buổi sáng, Cả ngày                      │
│  ✅ Thẻ đối tượng: Gia đình, Bạn bè                        │
│  ✅ Thẻ trải nghiệm: Thiên nhiên, Thể chất                  │
│  ✅ Khoảng cách & thời lượng: 5km / 120 phút               │
│  ✅ Độ khó: Trung bình                                      │
│  ✅ Checkpoint #1: Rừng Nguyên Sinh — OFFLINE — 1 QR      │
│     ✅ Nội dung VI: DA_CONG_BO                               │
│     ✅ Nội dung EN: DA_CONG_BO                               │
│  ✅ Checkpoint #2: Thác Nước Trong Rừng — ONLINE — 2 QR   │
│     ✅ Nội dung VI: DA_CONG_BO                               │
│     ✅ Nội dung EN: DA_CONG_BO                               │
│  ⚠ Checkpoint #3: Rừng Cổ Thụ — OFFLINE — 0 QR           │  ← Gap item
│     ❌ Cần ít nhất 1 mã QR                                 │
│     ❌ Nội dung EN: DANG_NHAP                                │
│                                                              │
│  ─── Kiểm tra bổ sung ───────────────────────────────────   │
│                                                              │
│  ⚠ Checkpoint #3 chưa đủ điều kiện                        │
│    → Bạn có muốn duyệt phần còn lại trước?                │  ← Partial approval option (E-10)
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  [Từ chối ✗]              [Duyệt ✓]                   │  │  ← Actions (E-11, E-12)
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  📋 Báo cáo      👤 Quản lý tài khoản                        │
└──────────────────────────────────────────────────────────────┘

  REJECT modal:
  ┌────────────────────────────────────────────────────────────┐
  │  ✗ Từ chối duyệt tuyến                                    │
  │                                                           │
  │  Tuyến "Tuyến Rừng Nguyên Sinh"                         │
  │  sẽ được trả về trạng thái NHAP.                        │
  │                                                           │
  │  Lý do từ chối *:                                        │
  │  [Checkpoint #3 chưa có mã QR và nội dung EN...      ]  │  ← Reject reason (E-13)
  │                                                           │
  │  [Hủy]              [Xác nhận từ chối]                    │
  └────────────────────────────────────────────────────────────┘

  PUBLISHING state:
  ┌────────────────────────────────────────────────────────────┐
  │  ⏳ Đang xuất bản snapshot...                              │
  │                                                           │
  │  Đang tạo gói dữ liệu offline cho Tuyến Rừng Nguyên Sinh.│
  │  Vui lòng chờ trong giây lát.                             │
  │                                                           │
  │  [Hủy bỏ]                                                │  ← Cancel (E-14)
  └────────────────────────────────────────────────────────────┘

  PUBLISHED success:
  ┌────────────────────────────────────────────────────────────┐
  │  ✅ Xuất bản thành công                                    │
  │                                                           │
  │  Tuyến "Tuyến Rừng Nguyên Sinh"                         │
  │  đã HOAT_DONG.                                           │
  │                                                           │
  │  Snapshot #4 đã tạo: 2026-09-21 10:05                    │
  │  Snapshot trước (#3) vẫn khả dụng.                       │
  │                                                           │
  │  [Quay lại danh sách tuyến]                              │
  └────────────────────────────────────────────────────────────┘

  PUBLISH ERROR state:
  ┌────────────────────────────────────────────────────────────┐
  │  ⚠ Không thể xuất bản snapshot                            │
  │                                                           │
  │  Đã xảy ra lỗi khi tạo gói offline.                      │
  │  Tuyến vẫn ở trạng thái CHO_DUYET.                      │
  │  Thử lại hoặc liên hệ quản trị viên.                     │
  │                                                           │
  │  [Thử lại]                    [Quay lại danh sách]       │
  └────────────────────────────────────────────────────────────┘
```

## 3. Element Inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M03-004-01 | Back button | Button | "← Quay lại" → `SCR-M03-001` | Yes | Tap → confirm if in-progress action; else navigate |
| 2 | E-SCR-M03-004-02 | Screen title | Text | "Duyệt tuyến: [ten_tuyen]" hoặc "Duyệt checkpoint: [ten_diem]" | Yes | Updates based on item type being reviewed |
| 3 | E-SCR-M03-004-03 | User badge | Text | Logged-in Reviewer display name | Yes | Read-only |
| 4 | E-SCR-M03-004-04 | Route/checkpoint summary | Text | Item type + creator + submission date + current status | Yes | Shows `cho_xac_nhan` if reviewer IS the creator (BR-003) |
| 5 | E-SCR-M03-004-05 | Route completeness checklist | Checklist | All FR-009 guard items as checklist rows | Yes | One row per gate item; ✅ = pass, ❌ = gap; FR-009 |
| 6 | E-SCR-M03-004-06 | Checkpoint detail rows | Expandable row | Per checkpoint: name, connectivity, QR count, VI/EN content status | Yes | Expandable to show full checkpoint details |
| 7 | E-SCR-M03-004-07 | Gap count badge | Badge | "X có vấn đề" — number of failing gates | Conditional | Shown when gaps exist |
| 8 | E-SCR-M03-004-08 | Per-checkpoint gap list | Text | Specific gaps per checkpoint (missing QR, VI/EN not published) | Conditional | Shown when checkpoint has gaps |
| 9 | E-SCR-M03-004-09 | Partial approval option | Toggle/Button | "Duyệt phần đã đủ điều kiện?" — allow partial route activation | Conditional | Shown when at least one checkpoint passes all gates but others fail; FR-011 |
| 10 | E-SCR-M03-004-10 | Partial approval note | Text | Explains partial: only passing checkpoints go HOAT_DONG; others stay NHAP | Conditional | Shown when partial approval option is visible |
| 11 | E-SCR-M03-004-11 | Reject button | Button | "Từ chối ✗" — red/negative action | Yes | Tap → open reject modal; disabled when reviewer IS the creator |
| 12 | E-SCR-M03-004-12 | Approve button | Button | "Duyệt ✓" — green/positive action | Yes | Tap → initiate publish flow; disabled when reviewer IS the creator OR gaps exist |
| 13 | E-SCR-M03-004-13 | Reject reason textarea | Textarea | Free-text reason for rejection | Yes (on confirm) | Required ≥ 10 characters; FR-009 rejection reason logged |
| 14 | E-SCR-M03-004-14 | Cancel publishing button | Button | "Hủy bỏ" during snapshot generation | Conditional | Aborts publishing; route returns to CHO_DUYET; FR-010 |
| 15 | E-SCR-M03-004-15 | Publishing progress indicator | Visual | Spinner or progress bar during snapshot generation | Conditional | Shown while snapshot is being generated |
| 16 | E-SCR-M03-004-16 | Published success banner | Banner | "✅ Xuất bản thành công" + snapshot info + "Quay lại" | Conditional | Shown after successful publish; FR-010 |
| 17 | E-SCR-M03-004-17 | Publish error banner | Banner | "⚠ Không thể xuất bản" + retry/back options | Conditional | Shown when snapshot generation fails |
| 18 | E-SCR-M03-004-18 | Nav footer | Buttons | "📋 Báo cáo", "👤 Quản lý tài khoản" | Yes | Same as other M03 screens |
| 19 | E-SCR-M03-004-19 | Creator = reviewer warning | Banner | "Bạn là người tạo tuyến này. Không thể tự duyệt." | Conditional | BR-003: shown when logged-in reviewer also created the item |
| 20 | E-SCR-M03-004-20 | Snapshot history reference | Text | "Snapshot #N — thời gian" | Conditional | Shown after publish; FR-010 retention policy reminder |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| Ready to review | Full checklist; both action buttons enabled | Item is CHO_DUYET + reviewer ≠ creator + no gaps |
| Ready with gaps | Checklist with ❌ items; Approve disabled; Reject enabled | Item is CHO_DUYET + gaps exist |
| Gaps only on some checkpoints | Partial approval option visible | At least one checkpoint passes all gates |
| Reviewer = creator | Warning banner; both buttons disabled | `nguoi_duyet = nguoi_tao` (BR-003) |
| Rejecting | Reject modal open; reason field | User tapped Reject |
| Publishing | Progress spinner; Cancel button visible | User tapped Approve + snapshot starting |
| Published | Success banner with snapshot reference | Snapshot generated and published |
| Publish failed | Error banner; retry option | Snapshot generation error |
| Item not CHO_DUYET | Redirect or empty state | Item status changed externally (FR-018) |

## 5. Interactions and Navigation

| # | Element | User action | System response | Destination / result |
|---|---|---|---|---|
| 1 | E-01 Back | Tap | Confirm if publishing in-progress; else → `SCR-M03-001` | `SCR-M03-001` |
| 2 | E-05..E-08 Checklist rows | Tap row | Expand/collapse per-checkpoint detail | Stays; row expands |
| 3 | E-09 Partial approval | Tap | Toggle partial approval selection | Stays; Approve button updates label |
| 4 | E-11 [Từ chối ✗] | Tap | Open reject modal with reason field | Modal displayed |
| 5 | E-13 [Xác nhận từ chối] | Tap | Set item status → NHAP; log rejection reason; notify Content Staff | Modal closes; navigate `SCR-M03-001` |
| 6 | E-12 [Duyệt ✓] | Tap | Trigger FR-009 guard; if pass → publish flow | Snapshot generation begins |
| 7 | E-14 [Hủy bỏ] | Tap | Abort snapshot generation; item stays CHO_DUYET | Publishing overlay closes |
| 8 | E-17 [Thử lại] | Tap | Re-run snapshot generation | Publishing state resumes |
| 9 | E-18 Nav entries | Tap | Navigate to respective screens | `SCR-M03-005` or `SCR-M03-006` |
| 10 | E-19 [Quay lại] | Tap | Navigate to route list | `SCR-M03-001` |

## 6. Screen-level Rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M03-004-001 | Reviewer cannot approve an item they created; Approve/Reject buttons disabled + warning shown | BR-003, FR-009 |
| SR-SCR-M03-004-002 | Approve blocked when any FR-009 gate fails; gap list shown with specific failure items | FR-009, BR-002 |
| SR-SCR-M03-004-003 | Snapshot generated immediately on Approve; route goes HOAT_DONG only after snapshot confirmed | FR-010, BR-006 |
| SR-SCR-M03-004-004 | Previous snapshot remains reachable during and after new snapshot publication | FR-010, BR-006 |
| SR-SCR-M03-004-005 | Reject sets item status → NHAP; rejection reason required ≥ 10 chars; logged with actor + timestamp | FR-009, BR-003 |
| SR-SCR-M03-004-006 | Partial approval: if some checkpoints pass all gates, reviewer may approve only those; failing checkpoints stay NHAP | FR-011, BR-007 |
| SR-SCR-M03-004-007 | Cancel during publishing: aborts snapshot generation; item stays CHO_DUYET; no snapshot created | FR-010 |
| SR-SCR-M03-004-008 | Offline-required checkpoints enter snapshot; ONLINE_AVAILABLE checkpoints do not | FR-010, BR-002 |
| SR-SCR-M03-004-009 | Server rejects any approval request from non-Reviewer role regardless of UI state | FR-014, BR-009 |
| SR-SCR-M03-004-010 | Every write sends `id` + `updated_at`; stale write → redirect to list with conflict message | FR-018 |

## 7. Linked Requirements

| FR ID | How the screen supports it |
|---|---|
| FR-009 | Completeness checklist with per-gate pass/fail; Approve blocked on any gap |
| FR-010 | Publishing progress → success/error → snapshot reference; retention note |
| FR-011 | Partial approval option when some checkpoints pass all gates |
| FR-014 | Server enforces reviewer ≠ creator; UI hides/blocks actions server would reject |
| FR-018 | Stale-write conflict detection; redirect on stale approval attempt |

## 8. Responsive and Accessibility Notes

- Smallest supported viewport: **1280 × 800 px** (desktop). Form scrolls vertically.
- Checklist: `role="list"` with `role="listitem"`; pass items green checkmark, fail items red × with `aria-label` describing the gap.
- Approve/Reject buttons: `aria-label` with descriptive text; disabled state announced.
- Reject modal: focus trapped; `role="dialog"`, `aria-labelledby`; reason field has `aria-label` and required indicator.
- Publishing overlay: `role="alertdialog"`; spinner has `aria-live="polite"`.
- Success/error banners: `role="alert"` for screen reader announcement.
- Reviewer = creator warning: `role="alert"` and visually prominent.

## 9. Open Questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M03-004-001 | Rejection notification gửi đến Content Staff như thế nào? (in-app, email, hay chỉ trạng thái NHAP trên SCR-M03-001?) | No | Open |
| OQ-SCR-M03-004-002 | "Hủy bỏ" trong quá trình publish có rollback trạng thái về trước khi bấm duyệt không, hay giữ nguyên CHO_DUYET? | No | Open |
| OQ-SCR-M03-004-003 | Partial approval — failing checkpoints stay NHAP nhưng vẫn thuộc route đã HOAT_DONG. Có cần confirm cụ thể từ reviewer không? | No | Open |
| OQ-SCR-M03-004-004 | Snapshot generation error — retry sẽ tạo lại snapshot mới hay phải tạo lại từ đầu? | No | Open |

## Completion Checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-20).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described with trigger conditions.
- [x] Navigation targets (`SCR-M03-001`, `SCR-M03-005`, `SCR-M03-006`) are valid.
- [x] All linked FRs (FR-009, 010, 011, 014, 018) traced.
- [x] Reviewer ≠ creator guard (BR-003) captured in element states.
- [x] Publishing progress and success/error states captured.
- [x] Partial approval flow captured (FR-011, BR-007).
- [ ] Mockup file path confirmed after visual design sign-off.
