# Screen Specification: SCR-M03-001 — Route Administration

| Field | Value |
|---|---|
| Screen ID | `SCR-M03-001` |
| Screen name | Route Administration |
| Module | `M03` |
| Actor | Content Staff / Reviewer |
| Priority | Must |
| Mockup | `screens/M03/mockup-SCR-M03-001.html` |
| Status | Draft |

## 1. Purpose

**Shown when:** Người dùng M03 (Content Staff hoặc Reviewer) đã đăng nhập và chọn khu vực quản trị tuyến, hoặc quay về sau khi làm việc ở màn khác.

**The user leaves when:** Tạo tuyến mới → `SCR-M03-002`; mở tuyến để sửa → `SCR-M03-002`; mở checkpoint workspace → `SCR-M03-003`; gửi duyệt → `SCR-M03-004`; xem báo cáo → `SCR-M03-005`; quản lý tài khoản → `SCR-M03-006` (Reviewer only).

## 2. Mockup

```
┌──────────────────────────────────────┐
│ ☰        Route Administration    👤 │  ← Header (E-01…E-02)
├──────────────────────────────────────┤
│                                      │
│  [🔍 Tìm kiếm tuyến...          ]   │  ← Search bar (E-03)
│                                      │
│  Bộ lọc: [NHAP][CHO_DUYET]          │  ← Status tabs (E-04)
│           [HOAT_DONG][TAM_DONG]      │
│                                      │
│  ─── Tuyến (12) ─────────────────── │  ← List header (E-05)
│                                      │
│  ┌──────────────────────────────────┐│
│  │ 🟢 Tuyến Rừng Nguyên Sinh     ││  ← Route item #1 (E-06)
│  │   NHAP · Content Staff: Lan NT  ││
│  │   [Mở] [Xóa]                   ││
│  └──────────────────────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │ 🟡 Tuyến Đại Thác Nước        ││  ← Route item #2 (E-07)
│  │   CHO_DUYET · Đang chờ Minh PK ││
│  │   [Mở]                         ││
│  └──────────────────────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │ ⚫ Tuyến Hang Động             ││  ← Route item #3 (E-08)
│  │   TAM_DONG · Đóng: Sạc lở      ││
│  │   [Mở] [Mở lại ✓]             ││  ← "Mở lại" = Reviewer only
│  └──────────────────────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │ 🟢 Tuyến Khám Phá Rừng Sâu    ││  ← Route item #4 (E-09)
│  │   HOAT_DONG · 5 checkpoint      ││
│  │   [Mở] [Đóng ⚠]               ││
│  └──────────────────────────────────┘│
│                                      │
│  ┌──────────────────────────────────┐│
│  │        + Tạo tuyến mới          ││  ← Create button (E-10)
│  └──────────────────────────────────┘│
│                                      │
├──────────────────────────────────────┤
│  📋 Báo cáo      👤 Quản lý tài khoản│  ← Nav footer (E-11…E-12)
└──────────────────────────────────────┘

  EMPTY state:
│  Không có tuyến nào phù hợp.        │
│  Bạn có thể tạo tuyến mới.          │
│                                      │
│  ┌──────────────────────────────────┐│
│  │        + Tạo tuyến mới          ││
│  └──────────────────────────────────┘│

  CONFIRM CLOSE modal:
  ┌──────────────────────────────────┐
  │  ⚠ Xác nhận đóng tuyến           │
  │                                   │
  │  "Tuyến Rừng Nguyên Sinh"        │
  │  sẽ ngừng hoạt động.            │
  │                                   │
  │  Lý do đóng:                     │
  │  [Sạc lở                  ]      │  ← Reason input (E-13)
  │                                   │
  │  [Hủy]        [Xác nhận đóng]   │
  └──────────────────────────────────┘
```

## 3. Element Inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M03-001-01 | Sidebar / hamburger menu | Navigation | Links to: Route Administration, Báo cáo (SCR-M03-005), Quản lý tài khoản (SCR-M03-006, Reviewer only) | Yes | RBAC: "Quản lý tài khoản" hidden for Content Staff |
| 2 | E-SCR-M03-001-02 | User identity badge | Text | Current user's email/display name | Yes | Read-only; reflects logged-in account |
| 3 | E-SCR-M03-001-03 | Search bar | Input | Free-text search on route `ten_tuyen` | No | Filters list client-side or server-side |
| 4 | E-SCR-M03-001-04 | Status filter tabs | Tabs | NHAP / CHO_DUYET / HOAT_DONG / TAM_DONG | Yes | Multi-select or single-select; state reflected in URL params |
| 5 | E-SCR-M03-001-05 | Route list header | Text | "Tuyến (N)" — total count from filtered result | Yes | Updates on filter/search change |
| 6 | E-SCR-M03-001-06 | Route item #1 | Card | Route name + status badge + creator name + action buttons | Yes | Tap → open `SCR-M03-002` with `ma_tuyen` |
| 7 | E-SCR-M03-001-07 | Route item #2..N | Card | Same as E-06 | No | Repeat for each route in filtered list |
| 8 | E-SCR-M03-001-08 | Route item — TAM_DONG | Card | Status badge ⚫ + closure reason snippet + [Mở lại ✓] | Conditional | [Mở lại] visible only for Reviewer role; BR-010 |
| 9 | E-SCR-M03-001-09 | Route item — HOAT_DONG | Card | [Đóng ⚠] button visible | Conditional | [Đóng] visible for Content Staff AND Reviewer; FR-012 |
| 10 | E-SCR-M03-001-10 | Create new route button | Button | "+ Tạo tuyến mới" | Yes | Tap → create draft route → navigate `SCR-M03-002` with new `ma_tuyen` |
| 11 | E-SCR-M03-001-11 | Reports nav entry | Button | "📋 Báo cáo" label | Yes | Tap → `SCR-M03-005` |
| 12 | E-SCR-M03-001-12 | User management nav entry | Button | "👤 Quản lý tài khoản" label | Conditional | Hidden for Content Staff; visible for Reviewer only; tap → `SCR-M03-006` |
| 13 | E-SCR-M03-001-13 | Close confirmation reason input | Textarea | Free-text reason for closing the route | Yes (on confirm close) | Required before confirming close; minimum 5 characters; logged by FR-012 |
| 14 | E-SCR-M03-001-14 | Empty state message | Container | "Không có tuyến nào phù hợp." + create CTA | Yes | Shown when filter returns 0 routes |
| 15 | E-SCR-M03-001-15 | Concurrency refresh indicator | Banner | "Dữ liệu đã thay đổi. Làm mới?" | Conditional | Shown when concurrent update detected; FR-018 |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| Loading | Skeleton rows on route list | Initial load or filter change |
| Route list | Filtered route items with action buttons per role | Routes fetched successfully |
| Empty — no routes | Empty state message + create CTA | Filter/search returns 0 results |
| Close confirmation | Modal with reason textarea + [Hủy] + [Xác nhận đóng] | User tapped [Đóng] on a route item |
| Route reopening | Toast/banner: "Đã mở lại tuyến" | Reviewer confirmed reopen action |
| Concurrency conflict | Banner: "Dữ liệu đã thay đổi" + [Làm mới] | Server returns stale-write result (FR-018) |
| Content Staff — no management | User management nav entry hidden | `account.role ≠ REVIEWER` |

## 5. Interactions and Navigation

| # | Element | User action | System response | Destination screen / result |
|---|---|---|---|---|
| 1 | E-06..E-09 [Mở] button | Tap | Navigate to route editor with `ma_tuyen` | `SCR-M03-002` |
| 2 | E-08 [Mở lại] button | Tap | Navigate to reopen confirmation (or inline confirm) | `SCR-M03-001` → route reopened |
| 3 | E-09 [Đóng] button | Tap | Open close confirmation modal | Modal displayed |
| 4 | E-10 [+ Tạo tuyến mới] | Tap | Create new draft route record → navigate | `SCR-M03-002` with new `ma_tuyen` |
| 5 | E-11 [📋 Báo cáo] | Tap | Navigate to operations reports | `SCR-M03-005` |
| 6 | E-12 [👤 Quản lý tài khoản] | Tap | Navigate to user management | `SCR-M03-006` (Reviewer only) |
| 7 | E-13 [Xác nhận đóng] | Tap | FR-012: close route + log actor/time/reason | Modal closes; route item updated to TAM_DONG |
| 8 | E-13 [Hủy] | Tap | Close modal without action | Modal closes |
| 9 | E-15 [Làm mới] | Tap | Re-fetch route list | Stays; list refreshed |

## 6. Screen-level Rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M03-001-001 | [Đóng ⚠] visible for BOTH Content Staff AND Reviewer; [Mở lại] only for Reviewer | FR-012, FR-013, BR-010 |
| SR-SCR-M03-001-002 | Close action logs actor + timestamp + reason server-side; reason required ≥ 5 characters | FR-012, BR-008 |
| SR-SCR-M03-001-003 | "Quản lý tài khoản" nav entry hidden from Content Staff UI (server rejects Content Staff calls regardless) | FR-014, BR-009 |
| SR-SCR-M03-001-004 | Route list reflects role permissions: Content Staff sees own routes + shared context; Reviewer sees all routes | FR-014 |
| SR-SCR-M03-001-005 | Every write action (close/reopen) enforces permission server-side; stale write rejected via FR-018 | FR-014, FR-018 |
| SR-SCR-M03-001-006 | Search/filter state should be reflected in URL params for shareable deep links | — |

## 7. Linked Requirements

| FR ID | How the screen supports it |
|---|---|
| FR-001 | [Mở] → `SCR-M03-002` for route create/edit |
| FR-003 | Tag assignment visible in route item preview; tags validated at approval |
| FR-009 | Completeness guard triggers from `SCR-M03-002` submission |
| FR-012 | [Đóng] button on HOAT_DONG routes; logs actor/time/reason |
| FR-013 | [Mở lại] only for Reviewer; route returns to HOAT_DONG |
| FR-014 | Server enforces RBAC for every write; UI hides unauthorized actions |
| FR-018 | Concurrency conflict banner on stale write result |
| FR-019 | User management nav entry (Reviewer only) → `SCR-M03-006` |

## 8. Responsive and Accessibility Notes

- Smallest supported viewport: **1280 × 800 px** (desktop admin). Mobile view optional/stretch.
- Touch targets: minimum 44 × 44 px per WCAG 2.1 Level AA for action buttons.
- Route item cards: keyboard navigable; `role="list"`, `role="listitem"`.
- Status badge: icon + text label; not color-only for accessibility.
- Close confirmation modal: focus trapped inside; `role="dialog"`, `aria-labelledby`.
- Filter tabs: `role="tablist"` with `role="tab"` per filter; active tab has `aria-selected="true"`.
- Search: `role="searchbox"` with accessible label.

## 9. Open Questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M03-001-001 | Có cần pagination cho route list (100+ routes) hay infinite scroll? | No | Open |
| OQ-SCR-M03-001-002 | Search filter gửi server-side hay client-side? Ảnh hưởng pagination strategy. | No | Open |
| OQ-SCR-M03-001-003 | "Mở lại" có cần modal xác nhận riêng hay inline confirm? | No | Open |

## Completion Checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-15).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described with trigger conditions.
- [x] Navigation targets (`SCR-M03-002`, `SCR-M03-003`, `SCR-M03-004`, `SCR-M03-005`, `SCR-M03-006`) are valid.
- [x] All linked FRs (FR-001, 003, 009, 012, 013, 014, 018, 019) traced.
- [x] RBAC differentiation (Content Staff vs Reviewer) captured in element states.
- [x] Close/reopen flow with audit logging captured.
- [ ] Mockup file path confirmed after visual design sign-off.
