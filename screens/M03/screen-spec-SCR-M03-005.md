# Screen Specification: SCR-M03-005 — Operations Reports

| Field | Value |
|---|---|
| Screen ID | `SCR-M03-005` |
| Screen name | Operations Reports |
| Module | `M03` |
| Actor | Content Staff / Reviewer |
| Priority | Must |
| Mockup | `screens/M03/mockup-SCR-M03-005.html` |
| Status | Draft |

## 1. Purpose

**Shown when:** Content Staff hoặc Reviewer chọn "📋 Báo cáo" từ nav footer bất kỳ màn M03 nào.

**The user leaves when:** Quay lại `SCR-M03-001` hoặc chuyển sang report khác; thay đổi filter → cập nhật dữ liệu.

## 2. Mockup

```
┌──────────────────────────────────────────────────────────────┐
│ ← Quay lại    Báo cáo vận hành                       👤 Lan NT│
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ─── Bộ lọc ─────────────────────────────────────────────   │
│                                                              │
│  Từ ngày:  [2026-08-22        ]   Đến ngày:  [2026-09-21 ]│  ← Date range (E-04, E-05)
│  Tuyến:    [Tất cả tuyến    ▾]                             │  ← Route filter (E-06)
│                                                              │
│  Thời gian: Asia/Bangkok (UTC+7)                            │  ← Timezone note (E-07)
│                                                              │
│  [Tải dữ liệu]                                              │  ← Load button (E-08)
│                                                              │
│  ─── RPT-01: Tổng quan phiên ───────────────────────────── │
│                                                              │
│  Tổng số phiên: 247                                         │  ← Total sessions (E-09)
│  Hoàn thành (HOAN_TAT): 198    Tỷ lệ: 80.2%               │  ← Completion rate (E-10)
│  Bỏ dở (BO_DO):          49    Tỷ lệ: 19.8%               │  ← Abandonment rate (E-11)
│  Đang diễn ra (DANG_DIEN_RA): 0    Tỷ lệ: 0.0%            │  ← Active sessions (E-12)
│                                                              │
│  ─── Biểu đồ theo tuyến ────────────────────────────────   │
│                                                              │
│  Tuyến Rừng Nguyên Sinh      ████████████████████  120 phiên│  ← Route bar chart (E-13)
│  Tuyến Đại Thác Nước         ██████████████          89 phiên│
│  Tuyến Hang Động             ████████                 38 phiên│
│                                                              │
│  ─── RPT-02: Checkpoint visit ────────────────────────────  │
│                                                              │
│  Tuyến: [Tuyến Rừng Nguyên Sinh ▾]  (chọn để xem chi tiết)│  ← RPT-02 route selector (E-14)
│                                                              │
│  Checkpoint              Lượt ghé thăm    Tỷ lệ ghé thăm    │
│  #1 Rừng Nguyên Sinh            118          98.3%          │  ← Checkpoint visit row (E-15)
│  #2 Thác Nước Trong Rừng        115          95.8%          │
│  #3 Rừng Cổ Thụ                 108          90.0%          │
│  #4 Điểm Ngắm Cảnh              102          85.0%          │
│  #5 Trạm Cuối                    98          81.7%          │  ← Last checkpoint (E-16)
│                                                              │
│  Tỷ lệ ghé thăm = unique sessions đã ghé checkpoint / tổng │
│  phiên đã hoàn thành của tuyến.                            │  ← Calculation note (E-17)
│  Mỗi session chỉ tính 1 lần cho mỗi checkpoint.             │
│                                                              │
│  ─── Xuất báo cáo ────────────────────────────────────────  │
│                                                              │
│  [📥 Xuất CSV]    [📥 Xuất PDF]                             │  ← Export buttons (E-18, E-19)
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  📋 Báo cáo      👤 Quản lý tài khoản                        │
└──────────────────────────────────────────────────────────────┘

  EMPTY state (no data in range):
┌──────────────────────────────────────────────────────────────┐
│  Không có dữ liệu phiên trong khoảng thời gian này.        │
│  Thử thay đổi bộ lọc hoặc mở rộng khoảng thời gian.       │
│                                                              │
│  [Tải dữ liệu]                                              │
└──────────────────────────────────────────────────────────────┘

  RPT-02 DETAIL view (after selecting route):
┌──────────────────────────────────────────────────────────────┐
│  RPT-02: Chi tiết checkpoint — Tuyến Rừng Nguyên Sinh      │
│                                                              │
│  Checkpoint              Lượt ghé thăm    Tỷ lệ ghé thăm    │
│  #1 Rừng Nguyên Sinh            118          98.3%          │
│  #2 Thác Nước Trong Rừng        115          95.8%          │
│  #3 Rừng Cổ Thụ                 108          90.0%          │
│  #4 Điểm Ngắm Cảnh              102          85.0%          │
│  #5 Trạm Cuối                    98          81.7%          │
│                                                              │
│  ─── Funnel drop-off ───────────────────────────────────   │
│                                                              │
│  Funnel: 247 bắt đầu → 118 đến checkpoint #1 → ... → 98 về │
│  Drop-off rate checkpoint #3→#4: 5.6% (6/108)              │  ← Drop-off analysis (E-20)
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## 3. Element Inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M03-005-01 | Back button | Button | "← Quay lại" → `SCR-M03-001` | Yes | Tap → navigate back |
| 2 | E-SCR-M03-005-02 | Screen title | Text | "Báo cáo vận hành" — static i18n | Yes | None |
| 3 | E-SCR-M03-005-03 | User badge | Text | Logged-in account display name | Yes | Read-only |
| 4 | E-SCR-M03-005-04 | From date input | Date picker | `fromDate`; default: today − 30 days | Yes | Must be ≤ `toDate`; FR-016 |
| 5 | E-SCR-M03-005-05 | To date input | Date picker | `toDate`; default: today | Yes | Must be ≥ `fromDate`; FR-016 |
| 6 | E-SCR-M03-005-06 | Route filter selector | Select | "Tất cả tuyến" or specific route; optional | No | Optional; FR-016/FR-017 |
| 7 | E-SCR-M03-005-07 | Timezone note | Text | "Asia/Bangkok (UTC+7)" — reminder | Yes | Static; BR-014 |
| 8 | E-SCR-M03-005-08 | Load data button | Button | "Tải dữ liệu" | Yes | Tap → query RPT-01 and RPT-02 with current filters |
| 9 | E-SCR-M03-005-09 | Total sessions counter | Number | `totalSessions` from RPT-01 | Yes | FR-016 |
| 10 | E-SCR-M03-005-10 | Completion rate | Number + % | `hoanThanh` count + rate from RPT-01 | Yes | FR-016 |
| 11 | E-SCR-M03-005-11 | Abandonment rate | Number + % | `boDo` count + rate from RPT-01 | Yes | FR-016 |
| 12 | E-SCR-M03-005-12 | Active sessions indicator | Number + % | `dangDienRa` count + rate from RPT-01 | Yes | FR-016; shows 0 for past-dated ranges |
| 13 | E-SCR-M03-005-13 | Per-route bar chart | Chart | Sessions per route as horizontal bars | Yes | FR-016; shows only routes with sessions in range |
| 14 | E-SCR-M03-005-14 | RPT-02 route selector | Select | Specific route to show checkpoint detail | Conditional | Shown after RPT-01 loaded; required for RPT-02 |
| 15 | E-SCR-M03-005-15 | Checkpoint visit row | Row | checkpoint name + unique visit count + rate | Yes | FR-017; ordered by `thu_tu` |
| 16 | E-SCR-M03-005-16 | Last checkpoint indicator | Badge | "(checkpoint cuối)" label on last item | Yes | Shown on item with highest `thu_tu` |
| 17 | E-SCR-M03-005-17 | Calculation methodology note | Text | Explains rate formula and deduplication rule | Yes | Static; BR-014 |
| 18 | E-SCR-M03-005-18 | Export CSV button | Button | "📥 Xuất CSV" | Yes | Exports current filtered view as CSV; FR-016/FR-017 |
| 19 | E-SCR-M03-005-19 | Export PDF button | Button | "📥 Xuất PDF" | Yes | Exports current filtered view as PDF; FR-016/FR-017 |
| 20 | E-SCR-M03-005-20 | Drop-off analysis | Text/Chart | Per-segment drop-off rate between consecutive checkpoints | Conditional | Shown when RPT-02 route has ≥ 2 checkpoints; FR-017 |
| 21 | E-SCR-M03-005-21 | Empty state message | Container | "Không có dữ liệu..." + reload CTA | Conditional | Shown when query returns 0 results |
| 22 | E-SCR-M03-005-22 | Loading indicator | Spinner | Shown while data is being queried | Conditional | Shown during report query |
| 23 | E-SCR-M03-005-23 | Query error banner | Banner | Error message + retry option | Conditional | Shown when report query fails |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| Initial load | Default 30-day range; Load button ready; empty report area | Screen opened |
| Loading | Spinner on report area; Load disabled | User tapped Load |
| Data loaded | RPT-01 summary + chart + RPT-02 selector visible | Query returned results |
| Data loaded + route selected | RPT-01 + full RPT-02 checkpoint table with drop-off | Route selected in RPT-02 selector |
| Empty — no sessions in range | Empty state message; still shows filter and Load button | Query returned zero sessions |
| Query error | Error banner with retry option | Query failed |
| Active sessions (today) | RPT-01 shows DANG_DIEN_RA count > 0 with annotation | Today is within date range |

## 5. Interactions and Navigation

| # | Element | User action | System response | Destination / result |
|---|---|---|---|---|
| 1 | E-01 Back button | Tap | Navigate to route administration | `SCR-M03-001` |
| 2 | E-04..E-06 Filter inputs | Change | Mark filters as dirty; disable Load if invalid | Stays; validation runs |
| 3 | E-08 [Tải dữ liệu] | Tap | Query RPT-01 + RPT-02 with filters; BR-014 timezone | Report area updates |
| 4 | E-14 RPT-02 selector | Change | Query RPT-02 for selected route; show checkpoint table | RPT-02 section updates |
| 5 | E-18 [Xuất CSV] | Tap | Generate CSV of current report view; trigger download | Browser download |
| 6 | E-19 [Xuất PDF] | Tap | Generate PDF of current report view; trigger download | Browser download |
| 7 | E-20 Drop-off row | Tap | Expand row to show per-segment funnel detail | Row expands |
| 8 | E-23 [Thử lại] | Tap | Re-run failed query | Loading state → result |

## 6. Screen-level Rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M03-005-001 | Default date range: `fromDate` = today − 30 days, `toDate` = today; both inclusive | FR-016, FR-017, BR-014 |
| SR-SCR-M03-005-002 | Date filtering and grouping uses `Asia/Bangkok` (UTC+7); stored timestamps remain ISO 8601 | BR-014 |
| SR-SCR-M03-005-003 | RPT-01: unique total sessions + HOAN_TAT count/rate + BO_DO count/rate by date range and route | FR-016 |
| SR-SCR-M03-005-004 | RPT-02: unique sessions per checkpoint, counting at most once per (sessionId, checkpointId) | FR-017, BR-013 |
| SR-SCR-M03-005-005 | Route filter in RPT-01 is optional; "Tất cả" aggregates across all routes | FR-016 |
| SR-SCR-M03-005-006 | Route filter in RPT-02 is required to show checkpoint-level detail | FR-017 |
| SR-SCR-M03-005-007 | Data source: SessionSyncRecord upserted by M02; upsert key = `sessionId`; no PII | FR-015, BR-013 |
| SR-SCR-M03-005-008 | Retried M02 sync never duplicates sessions in reports (upsert by sessionId) | FR-015, SC-006 |
| SR-SCR-M03-005-009 | CSV export includes current filter context (date range, route) in filename | — |
| SR-SCR-M03-005-010 | Both Content Staff and Reviewer can view RPT-01 and RPT-02; same data, same filters | FR-016, FR-017, permission matrix |

## 7. Linked Requirements

| FR ID | How the screen supports it |
|---|---|
| FR-015 | SessionSyncRecord upserted by sessionId; this screen reads the accumulated data |
| FR-016 | RPT-01: total sessions + completion/abandonment rates by date range and route |
| FR-017 | RPT-02: per-checkpoint unique visit count/rate; drop-off analysis |
| FR-014 | Both roles see the same report data; server enforces access |

## 8. Responsive and Accessibility Notes

- Smallest supported viewport: **1280 × 800 px** (desktop). Report tables scroll horizontally if needed.
- Date inputs: labeled `<label>` with `aria-describedby` for format hint.
- Bar chart: accessible via `aria-label` on each bar with numeric value; not purely visual.
- Report table: `role="table"` with `scope="col"` headers; sortable columns have `aria-sort`.
- Rate percentages: announced alongside counts for screen reader users.
- Export buttons: `aria-label` with export format and current filter context.
- Timezone note: `aria-label` reminding user about Asia/Bangkok.
- Loading and error states: `role="status"` or `role="alert"` for screen reader announcement.

## 9. Open Questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M03-005-001 | RPT-02 "Tỷ lệ ghé thăm" — denominator là tổng phiên của tuyến (bao gồm BO_DO) hay chỉ HOAN_TAT? | Yes | Open |
| OQ-SCR-M03-005-002 | Export format chi tiết: CSV có những cột nào? PDF có layout mẫu chưa? | No | Open |
| OQ-SCR-M03-005-003 | RPT-02 có hỗ trợ filter theo checkpoint cụ thể (ngoài route filter) không? | No | Open |
| OQ-SCR-M03-005-004 | Drop-off analysis (E-20) — hiển thị funnel chart, bảng số, hay cả hai? | No | Open |

## Completion Checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-23).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described with trigger conditions.
- [x] Navigation targets (`SCR-M03-001`) are valid.
- [x] All linked FRs (FR-015, 016, 017, 014) traced.
- [x] RPT-01 and RPT-02 both represented with filters.
- [x] Export buttons included (CSV + PDF).
- [x] Empty state and error handling captured.
- [ ] Mockup file path confirmed after visual design sign-off.
