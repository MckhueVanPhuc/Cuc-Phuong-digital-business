# Screen Specification: SCR-M01-001 — Danh mục tuyến

| Field | Value |
|---|---|
| Screen ID | `SCR-M01-001` |
| Screen name | Danh mục tuyến |
| Module | `M01` |
| Actor | Du khách (Visitor) |
| Priority | Must |
| Mockup | `screens/M01/mockup-SCR-M01-001.png` or link |
| Status | Draft |

## 1. Purpose

**Shown when:** Mở M01 (app launch hoặc chuyển về Module 1).

**The user leaves when:** Chọn một route để mở chi tiết (`SCR-M01-003`), chọn Gợi ý tuyến (`SCR-M01-002`), chọn Quản lý tài nguyên offline (`SCR-M01-004`), hoặc đổi ngôn ngữ.

## 2. Mockup

```
┌──────────────────────────────────┐
│ ☰           Cúc Phương     🌐 VI │  ← Header (E-01…E-03)
├──────────────────────────────────┤
│                                  │
│  ┌────────────────────────────┐  │
│  │   🗺  Gợi ý tuyến          │  │  ← Entry card to SCR-M01-002 (E-04)
│  └────────────────────────────┘  │
│                                  │
│  ─── Danh sách tuyến ─────────── │  ← Section header (E-05)
│                                  │
│  ┌────────────────────────────┐  │
│  │ [IMG]                      │  │
│  │ Tuyến rừng nguyên sinh    │  │  ← Route card #1 (E-06)
│  │ 5 km · 120 phút · ⬛ Dễ   │  │     → tap → SCR-M01-003
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ [IMG]                      │  │
│  │ Tuyến đại waterfall       │  │  ← Route card #2 (E-07)
│  │ 8 km · 240 phút · ⬛ Trung │  │
│  └────────────────────────────┘  │
│                                  │
│  ... (scrollable)                │
│                                  │
├──────────────────────────────────┤
│  📥 Tài nguyên offline      (i) │  ← Footer entry (E-08)
└──────────────────────────────────┘
```

> Hình trên là wireframe mô tả cấu trúc. Mockup chi tiết (màu, typography, spacing) nằm trong `mockup-SCR-M01-001.png`.

## 3. Element inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M01-001-01 | Header bar | Header | App name "Cúc Phương" — static i18n | Yes | None |
| 2 | E-SCR-M01-001-02 | Menu button | Button | Hamburger icon / nav toggle | No | None |
| 3 | E-SCR-M01-001-03 | Language toggle | Button | Current language code "VI" or "EN" | Yes | None — shared control; reads `LanguagePreference.languageCode` |
| 4 | E-SCR-M01-001-04 | Recommendation entry card | Button / Card | Label "Gợi ý tuyến" + icon, localized | Yes | None — tap navigates to `SCR-M01-002` |
| 5 | E-SCR-M01-001-05 | Route list section header | Text | "Danh sách tuyến" — static i18n | Yes | None |
| 6 | E-SCR-M01-001-06 | Route card | Button / Card | Route `name`, `distance`, `estimatedDuration`, `difficulty` from ENT-001 per `LanguagePreference` | Yes | Card renders all four fields; difficulty displayed as localized label; route must be `HOAT_DONG` |
| 7 | E-SCR-M01-001-07 | Route card (2..N) | Button / Card | Same fields as E-06 | Yes | Same validation as E-06; list sorted by M03 display order |
| 8 | E-SCR-M01-001-08 | Offline resource footer entry | Button | "Tài nguyên offline" label + info icon | No | Tap navigates to `SCR-M01-004` |

> E-06/E-07: `distance` hiển thị kèm đơn vị "km"; `estimatedDuration` hiển thị kèm đơn vị "phút" theo i18n locale. `difficulty` map: `NHE` → "Dễ", `TRUNG_BINH` → "Trung bình", `KHO` → "Khó".

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| Default | Danh sách tuyến hoặc language gate (xem §4.1) | Mở M01, đã có `LanguagePreference` |
| Language gate | Overlay chọn ngôn ngữ vi/en | Chưa có `LanguagePreference` — FR-M01-001 preconditions |
| Loading | Spinner/skeleton trên route list area | Đang fetch public route từ M03 |
| Route list | Một hoặc nhiều route card; recommendation card; footer entry | Dữ liệu route `HOAT_DONG` đã load |
| Empty / source unavailable | Empty state message: "Không có tuyến khả dụng" | M03 không trả route hoặc hết network |

> **Language gate:** Khi chưa có `LanguagePreference`, màn hình hiển thị overlay hai nút "Tiếng Việt" và "English" thay vì nội dung chính. Sau khi chọn, overlay đóng và hiển thị danh sách. Language gate không phải screen độc lập — nó là một trạng thái của `SCR-M01-001`.

## 5. Interactions and navigation

| # | Element | User action | System response | Destination screen / result |
|---|---|---|---|---|
| 1 | E-03 Language toggle | Tap | Mở language selector overlay; sau chọn → cập nhật `LanguagePreference` và reload content theo ngôn ngữ mới | Stays; content re-renders vi/en |
| 2 | E-04 Recommendation card | Tap | Điều hướng tới recommendation screen | `SCR-M01-002` |
| 3 | E-06 Route card #1 | Tap | Điều hướng tới route detail/preparation | `SCR-M01-003` với `routeId` tương ứng |
| 4 | E-07 Route card #2..N | Tap | Điều hướng tới route detail/preparation | `SCR-M01-003` với `routeId` tương ứng |
| 5 | E-08 Offline resource entry | Tap | Điều hướng tới resource management | `SCR-M01-004` |

## 6. Screen-level rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M01-001-001 | Chỉ hiển thị route có `status = HOAT_DONG` từ M03; loại nháp và `TAM_DONG` | FR-M01-002, BR-M01-023 |
| SR-SCR-M01-001-002 | Mọi nội dung hiển thị phải theo `LanguagePreference.languageCode` hiện hành | FR-M01-001, FR-M01-003 |
| SR-SCR-M01-001-003 | Chọn route từ danh sách chưa tạo/ghi đè `SelectedRouteContext` | FR-M01-012, BR-M01-022 |
| SR-SCR-M01-001-004 | Language gate bắt buộc trước khi truy cập nội dung khi chưa có `LanguagePreference` | FR-M01-001, BR-M01-020 |

## 7. Linked requirements

| FR ID | How the screen supports it |
|---|---|
| FR-M01-001 | Language toggle cho phép đổi ngôn ngữ; language gate buộc chọn khi chưa có preference |
| FR-M01-002 | Hiển thị danh sách route public `HOAT_DONG` từ M03 |
| FR-M01-003 | Route card hiển thị `name`, `distance`, `estimatedDuration`, `difficulty` theo ngôn ngữ |
| FR-M01-004 | Recommendation entry card mở `SCR-M01-002` |
| FR-M01-009 | Footer entry mở `SCR-M01-004` |

## 8. Responsive and accessibility notes

- Smallest supported viewport: **375 × 667 px** (iPhone SE / mobile portrait). Route list scrolls vertically; cards fill available width.
- Card layout: single-column list on mobile; two-column grid on tablet (≥ 768 px).
- Touch targets: minimum 44 × 44 px per WCAG 2.1 Level AA.
- Language toggle (E-03): tap target includes full label "VI"/"EN"; icon-only is not sufficient — accessibility label required.
- Images on route cards: decorative only (route identity conveyed by name/distance); `alt` text should be the route name.
- Screen reader: each route card is a single interactive element; expand for detail is out of scope on this screen.

## 9. Open questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M01-001-001 | Có hiển thị skeleton/shimmer trong khi loading hay chỉ spinner đơn giản? | No | Open |
| OQ-SCR-M01-001-002 | Route card có cần lazy-load ảnh không hay ảnh đã optimize từ M03? | No | Open |
| OQ-SCR-M01-001-003 | Thứ tự route trong danh sách do M03 quyết định hay M01 sort theo tiêu chí nào? | Yes | Open |

## Completion checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-08).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described or marked not applicable with a reason.
- [x] Navigation targets (`SCR-M01-002`, `SCR-M01-003`, `SCR-M01-004`) are valid screen IDs in the screen list.
- [x] Linked requirements (FR-M01-001/002/003/004/009) are correct and traceable to the spec.
- [x] Language gate is captured as a screen state, not a separate screen.
- [ ] Mockup file path confirmed after visual design sign-off.
