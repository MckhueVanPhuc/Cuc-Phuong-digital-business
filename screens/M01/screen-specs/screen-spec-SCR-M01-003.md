# Screen Specification: SCR-M01-003 — Chi tiết tuyến & Chuẩn bị

| Field | Value |
|---|---|
| Screen ID | `SCR-M01-003` |
| Screen name | Chi tiết tuyến & Chuẩn bị |
| Module | `M01` |
| Actor | Du khách (Visitor) |
| Priority | Must |
| Mockup | `screens/M01/mockup-SCR-M01-003.html` |
| Status | Draft |

## 1. Purpose

**Shown when:** Du khách chọn một route từ danh mục (`SCR-M01-001`) hoặc từ kết quả recommendation (`SCR-M01-002`).

**The user leaves when:** Quay về nguồn vào, mở `SCR-M01-004` (quản lý tài nguyên), hoặc sau khi Start hợp lệ → chuyển sang M02.

## 2. Mockup

```
┌──────────────────────────────────┐
│ ←      Chi tiết tuyến       🌐 VI│  ← Header (E-01…E-03)
├──────────────────────────────────┤
│  ┌────────────────────────────┐  │
│  │     [ROUTE HERO IMAGE]     │  │  ← Hero image (E-04)
│  │  ─────────────────────── │  │
│  │  Tuyến Rừng Nguyên Sinh   │  │  ← Route name (E-05)
│  │  5 km · 120 phút · ⬛ Dễ  │  │  ← Route meta (E-06)
│  └────────────────────────────┘  │
│                                  │
│  Mô tả tuyến                     │  ← Content section header (E-07)
│  Hành trình xuyên rừng nguyên   │
│  sinh với hệ sinh thái đa dạng. │
│  Tuyến phù hợp cho người yêu    │
│  thiên nhiên và chụp ảnh...     │
│                                  │
│  Điểm nổi bật                    │  ← Content section (E-08)
│  • Rừng già cổ thụ (>600 năm)  │
│  • Thác nước trong rừng         │
│  • Hệ động vật phong phú        │
│                                  │
│  ⚠ Cần chuẩn bị offline          │  ← Offline warning (E-09)
│  Tuyến này có 2 điểm không có   │
│  sóng di động. Bạn cần tải tài  │
│  nguyên để xem nội dung offline. │
│                                  │
│  Trạng thái: Chưa tải            │  ← Package status (E-10)
│                                  │
│  ┌────────────────────────────┐  │
│  │      📥 Tải tài nguyên     │  │  ← Primary action (E-11)
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │        ▶ Bắt đầu tuyến     │  │  ← Start button (E-12)
│  └────────────────────────────┘  │
│                                  │
│  hoặc [Quản lý tài nguyên]       │  ← Secondary link (E-13)
│                                  │
├──────────────────────────────────┤
│  📥 Tài nguyên offline      (i) │  ← Footer entry → SCR-M01-004 (E-14)
└──────────────────────────────────┘

  DOWNLOADING variant:
│  Trạng thái: Đang tải...  34%    │
│  ████████░░░░░░░░░░░  34%        │  ← Download progress (E-15)
│                                  │
│  [Hủy tải]                       │  ← Cancel button (E-16)
```

## 3. Element Inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M01-003-01 | Back button | Button | "←" icon, quay về nguồn vào | Yes | Tap → quay `SCR-M01-001` hoặc `SCR-M01-002` |
| 2 | E-SCR-M01-003-02 | Screen title | Text | "Chi tiết tuyến" / "Route Details" — static i18n | Yes | None |
| 3 | E-SCR-M01-003-03 | Language toggle | Button | Current language code "VI" or "EN" | Yes | Shared control; reads `LanguagePreference.languageCode` |
| 4 | E-SCR-M01-003-04 | Route hero image | Image | Route image từ ENT-001; `alt` = route name | Yes | Hiển thị gradient placeholder nếu ảnh không tải được |
| 5 | E-SCR-M01-003-05 | Route name | Text | `name` theo `LanguagePreference` từ ENT-001/ENT-007 | Yes | Playfair Display font; font-size 22px |
| 6 | E-SCR-M01-003-06 | Route meta row | Text | `distance` (km), `estimatedDuration` (phút/min), `difficulty` localized label từ ENT-001 | Yes | Difficulty badge: NHE → "Dễ/Easy" (green), TRUNG_BINH → "Trung bình/Moderate" (orange), KHO → "Khó/Difficult" (red) |
| 7 | E-SCR-M01-003-07 | Description section | Text | `content.description` theo ngôn ngữ từ ENT-001 | Yes | Hiển thị mô tả tuyến; không hiển thị nếu không có |
| 8 | E-SCR-M01-003-08 | Highlights / safety section | Text | `content.highlights` và `content.safetyInformation` nếu áp dụng từ ENT-001 | No | Hiển thị nếu M03 cung cấp; ẩn section nếu không có |
| 9 | E-SCR-M01-003-09 | Offline warning | Container | Hiển thị khi route có checkpoint `OFFLINE_REQUIRED` và chưa có gói `SAN_SANG`; gồm số checkpoint bị ảnh hưởng và hậu quả | Conditional | Theo FR-M01-005/006; chỉ hiển thị khi `offlineRequired = true` và `packageReadiness ≠ SAN_SANG` |
| 10 | E-SCR-M01-003-10 | Package status indicator | Text | Hiển thị trạng thái gói hiện tại: "Chưa tải" / "Đang tải..." / "Đã sẵn sàng" / "Chưa hoàn tất" | Yes | Theo SM-001: CHUA_TAI, DANG_TAI, SAN_SANG, CHUA_HOAN_TAT; mỗi trạng thái có label và icon tương ứng |
| 11 | E-SCR-M01-003-11 | Primary action button | Button | Context-sensitive: "Tải tài nguyên" (CHUA_TAI/CHUA_HOAN_TAT) hoặc "Tải lại" (SAN_SANG có update) | Yes | Tap → FR-M01-007 (tải) hoặc trigger lazy update (FR-M01-010); không hiển thị khi đang tải |
| 12 | E-SCR-M01-003-12 | Start button | Button | "Bắt đầu tuyến" / "Start Route" | Yes | Theo FR-M01-011: chỉ enable khi route `HOAT_DONG` và điều kiện offline đã đáp ứng (FR-M01-011 guard) |
| 13 | E-SCR-M01-003-13 | Resource management link | Button | "Quản lý tài nguyên" / "Manage Resources" | No | Tap → `SCR-M01-004` với `routeId` hiện tại |
| 14 | E-SCR-M01-003-14 | Download progress bar | Progress | Percentage và visual bar; hiển thị khi `status = DANG_TAI` | Conditional | Theo FR-M01-007/008; animate progress từ 0–100% |
| 15 | E-SCR-M01-003-15 | Cancel download button | Button | "Hủy tải" / "Cancel"; hiển thị khi `status = DANG_TAI` | Conditional | Tap → hủy tải, quay về trạng thái CHUA_TAI; không xóa dữ liệu đã tải một phần |
| 16 | E-SCR-M01-003-16 | Offline resource footer entry | Button | "Tài nguyên offline" label + info icon | No | Tap navigates to `SCR-M01-004` |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| Loading | Skeleton/shimmer trên route detail area | Đang fetch route metadata từ M03 |
| Online-only route | Route detail + Start button enabled; no offline warning | Route không có checkpoint `OFFLINE_REQUIRED` (FR-M01-005: `offlineRequired = false`) |
| Route with package `SAN_SANG` | Route detail + package status "Đã sẵn sàng" + Start button enabled | `packageReadiness = SAN_SANG` (FR-M01-005/008) |
| Missing package warning | Route detail + offline warning + package status "Chưa tải" + [Tải] + [Bắt đầu tuyến] disabled | `offlineRequired = true` + `packageReadiness ∉ {SAN_SANG, confirmed}` |
| Download in progress | Route detail + package status "Đang tải..." + progress bar + [Hủy tải]; other buttons disabled | `status = DANG_TAI` (FR-M01-007/008) |
| Package incomplete | Route detail + package status "Chưa hoàn tất" + [Tải lại] | `status = CHUA_HOAN_TAT` (FR-M01-008) |
| Route unavailable | Message: "Tuyến này không còn khả dụng" + [Quay lại] | Route đã sync là `TAM_DONG`/xóa (BR-M01-031) |

## 5. Interactions and Navigation

| # | Element | User action | System response | Destination screen / result |
|---|---|---|---|---|
| 1 | E-01 Back button | Tap | Quay về nguồn vào | `SCR-M01-001` hoặc `SCR-M01-002` |
| 2 | E-03 Language toggle | Tap | Mở language selector overlay; sau chọn → cập nhật `LanguagePreference` và reload content | Stays; content re-renders vi/en |
| 3 | E-11 [Tải] button | Tap | Trigger FR-M01-007: request nguồn → bắt đầu tải snapshot song ngữ → chuyển state sang `DANG_TAI` | Stays; state → Downloading |
| 4 | E-11 [Tải lại] button | Tap | Trigger FR-M01-010 lazy update: request manifest → so sánh version → staging nếu có bản mới | Stays; state → Downloading |
| 5 | E-12 Start button | Tap | Trigger FR-M01-011 guard check: verify `HOAT_DONG` + offline conditions → nếu hợp lệ → FR-M01-012 tạo `SelectedRouteContext` → FR-M01-013 công bố → mở M02 | → M02 (Module 2) |
| 6 | E-13 Resource management link | Tap | Điều hướng tới quản lý tài nguyên | `SCR-M01-004` với `routeId` hiện tại |
| 7 | E-15 [Hủy tải] button | Tap | Hủy tải; quay về trạng thái `CHUA_TAI`; không xóa dữ liệu đã tải một phần | Stays; state → Missing package warning |
| 8 | E-16 Offline resource footer entry | Tap | Điều hướng tới resource management | `SCR-M01-004` |

## 6. Screen-level Rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M01-003-001 | Chỉ route `status = HOAT_DONG` mới hiển thị Start button enabled; route `TAM_DONG`/xóa hiển thị unavailable message | FR-M01-011, BR-M01-023, BR-M01-031 |
| SR-SCR-M01-003-002 | Offline warning chỉ hiển thị khi `offlineRequired = true` và `packageReadiness ≠ SAN_SANG`; thể hiện số checkpoint và hậu quả | FR-M01-005, BR-M01-014 |
| SR-SCR-M01-003-003 | Start button chỉ enable khi: route `HOAT_DONG` VÀ (không cần offline HOẶC đã có gói `SAN_SANG` HOẶC đã xác nhận tiếp tục không tải) | FR-M01-011, BR-M01-016, BR-M01-017 |
| SR-SCR-M01-003-004 | Chọn "Tải" đơn thuần không đủ để enable Start; gói phải đạt `SAN_SANG` trước khi Start được chấp nhận | FR-M01-011, BR-M01-016, BR-M01-017 |
| SR-SCR-M01-003-005 | Mọi nội dung hiển thị phải theo `LanguagePreference.languageCode` hiện hành | FR-M01-001, FR-M01-013 |
| SR-SCR-M01-003-006 | Package progress bar chỉ hiển thị khi `status = DANG_TAI`; percentage cập nhật theo tiến trình tải | FR-M01-008, SM-001 |
| SR-SCR-M01-003-007 | Start thành công ghi `SelectedRouteContext.routeId` và công bố ba contract cho M02 | FR-M01-012, FR-M01-013 |

## 7. Linked Requirements

| FR ID | How the screen supports it |
|---|---|
| FR-M01-001 | Language toggle; all content labels per i18n |
| FR-M01-003 | Route hero, name, meta, description, highlights theo ngôn ngữ |
| FR-M01-005 | Offline warning hiển thị số checkpoint `OFFLINE_REQUIRED` và hậu quả khi chưa có gói |
| FR-M01-006 | Decision panel: Tải / Start / Quản lý tài nguyên |
| FR-M01-007 | [Tải] button trigger tải snapshot song ngữ |
| FR-M01-008 | Package status indicator theo SM-001; progress bar khi đang tải |
| FR-M01-009 | Link tới `SCR-M01-004` |
| FR-M01-010 | [Tải lại] trigger lazy update khi có version mới |
| FR-M01-011 | Start button guard check; route unavailable message |
| FR-M01-012 | Tạo/ghi đè `SelectedRouteContext.routeId` sau Start hợp lệ |
| FR-M01-013 | Công bố LanguagePreference + SelectedRouteContext + package SAN_SANG sau Start |

## 8. Responsive and Accessibility Notes

- Smallest supported viewport: **375 × 667 px** (mobile portrait). Route detail scrolls; hero image fixed aspect ratio.
- Touch targets: minimum 44 × 44 px per WCAG 2.1 Level AA.
- Hero image: 16:9 aspect ratio on mobile; alt text = route name.
- Route name uses Playfair Display (display font); body content uses Nunito.
- Start button: full-width, prominent; disabled state visually distinct (opacity, no pointer).
- Language toggle (E-03): full label required.
- Screen reader: landmark regions for header/content/action areas; progress bar uses `aria-valuenow`.
- Download progress: announced to screen reader on completion or failure.

## 9. Open Questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M01-003-001 | Button [Bắt đầu tuyến] có cần disable với animation/shimmer khi đang kiểm tra guard, hay chỉ thuần disabled? | No | Open |
| OQ-SCR-M01-003-002 | Nếu tải thất bại khi đang có gói cũ `SAN_SANG`, giao diện có hiển thị cả gói cũ đang active không? | No | Open — theo SM-001 thì gói cũ vẫn SAN_SANG |

## Completion Checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-16).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described with trigger conditions.
- [x] Navigation targets (`SCR-M01-001`, `SCR-M01-002`, `SCR-M01-004`, M02) are valid.
- [x] Linked requirements (FR-M01-001/003/005-013) are correct and traceable.
- [x] SM-001 states reflected in package status indicator.
- [ ] Mockup file path confirmed after visual design sign-off.
