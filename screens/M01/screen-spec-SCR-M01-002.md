# Screen Specification: SCR-M01-002 — Gợi ý tuyến

| Field | Value |
|---|---|
| Screen ID | `SCR-M01-002` |
| Screen name | Gợi ý tuyến |
| Module | `M01` |
| Actor | Du khách (Visitor) |
| Priority | Should |
| Mockup | `screens/M01/mockup-SCR-M01-002.html` |
| Status | Draft |

## 1. Purpose

**Shown when:** Du khách tap vào entry card "Gợi ý tuyến" từ `SCR-M01-001`.

**The user leaves when:** Quay lại `SCR-M01-001`, hoặc chọn một route để mở chi tiết (`SCR-M01-003`).

## 2. Mockup

```
┌──────────────────────────────────┐
│ ←           Gợi ý tuyến     🌐 VI│  ← Header (E-01…E-03)
├──────────────────────────────────┤
│                                  │
│  Bạn muốn đi trong bao lâu?      │  ← Question label (E-04)
│  ┌────────────────────────────┐  │
│  │  ◉ ≤90 phút               │  │  ← timeTag selector (E-05)
│  │  ○ 90–180 phút            │  │
│  │  ○ >180 phút              │  │
│  └────────────────────────────┘  │
│                                  │
│  Bạn đi cùng ai?                │  ← Question label (E-06)
│  ┌────────────────────────────┐  │
│  │  ○ Một mình / người lớn   │  │  ← groupTag selector (E-07)
│  │  ○ Gia đình có trẻ em     │  │
│  │  ○ Có người cao tuổi      │  │
│  └────────────────────────────┘  │
│                                  │
│  Bạn muốn trải nghiệm gì?       │  ← Question label (E-08)
│  ┌────────────────────────────┐  │
│  │  ○ Thiên nhiên / chụp ảnh │  │  ← experienceTag selector (E-09)
│  │  ○ Tìm hiểu               │  │
│  │  ○ Khám phá                │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │      Tìm tuyến phù hợp    │  │  ← Submit button (E-10)
│  └────────────────────────────┘  │
│                                  │
│  ─── Kết quả ──────────────────  │  ← Results header (E-11)
│  ┌────────────────────────────┐  │
│  │ [IMG]                      │  │
│  │ Tuyến Rừng Nguyên Sinh    │  │  ← Result card #1 → SCR-M01-003 (E-12)
│  │ 5 km · 120 phút · ⬛ Dễ   │  │
│  └────────────────────────────┘  │
│                                  │
├──────────────────────────────────┤
│  📥 Tài nguyên offline      (i) │  ← Footer entry → SCR-M01-004 (E-13)
└──────────────────────────────────┘

  EMPTY STATE variant:
  ┌──────────────────────────────────┐
  │  😕 Không có tuyến phù hợp      │
  │                                  │
  │  Không có tuyến nào khớp đủ     │
  │  ba tiêu chí đã chọn.           │
  │                                  │
  │  [Đổi tiêu chí]  [Quay lại]     │
  └──────────────────────────────────┘
```

## 3. Element Inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M01-002-01 | Back button | Button | "←" icon, quay về nguồn vào | Yes | Tap → quay `SCR-M01-001` |
| 2 | E-SCR-M01-002-02 | Screen title | Text | "Gợi ý tuyến" / "Route Recommendation" — static i18n | Yes | None |
| 3 | E-SCR-M01-002-03 | Language toggle | Button | Current language code "VI" or "EN" | Yes | Shared control; reads `LanguagePreference.languageCode` |
| 4 | E-SCR-M01-002-04 | Time question label | Text | "Bạn muốn đi trong bao lâu?" — static i18n | Yes | None |
| 5 | E-SCR-M01-002-05 | timeTag selector | Radio group | Ba tùy chọn: `TIME_NGAN` (≤90 phút), `TIME_VUA` (>90–180 phút), `TIME_DAI` (>180 phút); values theo ENT-003 | Yes | Chỉ một giá trị được chọn tại một thời điểm; cả ba phải có giá trị hợp lệ trước khi enable submit |
| 6 | E-SCR-M01-002-06 | Group question label | Text | "Bạn đi cùng ai?" — static i18n | Yes | None |
| 7 | E-SCR-M01-002-07 | groupTag selector | Radio group | Ba tùy chọn: `GROUP_CA_NHAN_NGUOI_LON`, `GROUP_GIA_DINH_CO_TRE`, `GROUP_CAN_DE_DANG`; labels theo ENT-003 | Yes | Same validation as E-05 |
| 8 | E-SCR-M01-002-08 | Experience question label | Text | "Bạn muốn trải nghiệm gì?" — static i18n | Yes | None |
| 9 | E-SCR-M01-002-09 | experienceTag selector | Radio group | Ba tùy chọn: `INTEREST_THIEN_NHIEN_CHUP_ANH`, `INTEREST_TIM_HIEU`, `INTEREST_KHAM_PHA`; labels theo ENT-003 | Yes | Same validation as E-05 |
| 10 | E-SCR-M01-002-10 | Submit button | Button | "Tìm tuyến phù hợp" / "Find Matching Routes"; enable khi đủ ba lựa chọn | Yes | Disabled (visual + functional) khi chưa đủ ba tag; tap trigger matching logic FR-M01-004 |
| 11 | E-SCR-M01-002-11 | Results section header | Text | "Kết quả" / "Results" — hiển thị sau khi matching xong | No | Hiển thị chỉ khi `matchedRoutes` không rỗng; ẩn ở states khác |
| 12 | E-SCR-M01-002-12 | Route result card | Button / Card | Route `name`, `distance`, `estimatedDuration`, `difficulty` từ ENT-001; thứ tự theo M03 displayOrder | Yes | Card renders all four fields; difficulty displayed as localized label; tap navigates to `SCR-M01-003` với `routeId` tương ứng |
| 13 | E-SCR-M01-002-13 | Route result card #2..N | Button / Card | Same fields as E-12 | No | Hiển thị khi `matchedRoutes.length > 1`; mỗi card tương ứng một route trong kết quả |
| 14 | E-SCR-M01-002-14 | Empty state message | Container | Thông báo "Không có tuyến phù hợp với các tiêu chí đã chọn" theo BR-M01-013 | Yes | Hiển thị khi `matchedRoutes` rỗng; đây là outcome hợp lệ, không phải error |
| 15 | E-SCR-M01-002-15 | Empty state action buttons | Buttons | Hai nút: "Đổi tiêu chí" và "Quay lại" | Yes | "Đổi tiêu chí" → clear selectors, quay về input state; "Quay lại" → quay `SCR-M01-001` |
| 16 | E-SCR-M01-002-16 | Offline resource footer entry | Button | "Tài nguyên offline" label + info icon | No | Tap navigates to `SCR-M01-004` |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| Default / Input incomplete | Ba câu hỏi + selectors + submit button disabled | Mở SCR-M01-002; chưa đủ ba tag |
| Input complete | Ba câu hỏi + selectors + submit button enabled | Cả ba tag đều có giá trị hợp lệ |
| Loading | Spinner hoặc skeleton trên khu vực kết quả | Đang thực hiện matching (FR-M01-004) |
| Results | Results section header + một hoặc nhiều route card | `matchedRoutes` không rỗng |
| Empty / Zero results | Empty state message + hai action button | `matchedRoutes` rỗng — đây là outcome hợp lệ theo BR-M01-013, không phải lỗi |

## 5. Interactions and Navigation

| # | Element | User action | System response | Destination screen / result |
|---|---|---|---|---|
| 1 | E-01 Back button | Tap | Quay về nguồn vào | `SCR-M01-001` |
| 2 | E-03 Language toggle | Tap | Mở language selector overlay; sau chọn → cập nhật `LanguagePreference` và reload content | Stays; content re-renders vi/en |
| 3 | E-05 timeTag selector | Tap option | Chọn giá trị `timeTag`; nếu đủ cả ba → enable submit | Stays; update input state |
| 4 | E-07 groupTag selector | Tap option | Chọn giá trị `groupTag`; nếu đủ cả ba → enable submit | Stays; update input state |
| 5 | E-09 experienceTag selector | Tap option | Chọn giá trị `experienceTag`; nếu đủ cả ba → enable submit | Stays; update input state |
| 6 | E-10 Submit button | Tap | Trigger FR-M01-004: exact-match ba tag với route `HOAT_DONG`; nếu có kết quả → hiển thị route cards; nếu 0 kết quả → hiển thị empty state | Results state hoặc Empty state |
| 7 | E-12 Route result card #1 | Tap | Điều hướng tới route detail/preparation | `SCR-M01-003` với `routeId` tương ứng |
| 8 | E-13 Route result card #2..N | Tap | Same as E-12 | `SCR-M01-003` với `routeId` tương ứng |
| 9 | E-14/E-15 "Đổi tiêu chí" | Tap | Clear cả ba tag selector, quay về input state | Default state |
| 10 | E-15 "Quay lại" | Tap | Quay về catalog | `SCR-M01-001` |
| 11 | E-16 Offline resource footer entry | Tap | Điều hướng tới resource management | `SCR-M01-004` |

## 6. Screen-level Rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M01-002-001 | Chỉ route `status = HOAT_DONG` mới là ứng viên matching; loại nháp và `TAM_DONG` | FR-M01-004, BR-M01-011, BR-M01-023 |
| SR-SCR-M01-002-002 | Route phải đồng thời chứa đúng một tag thuộc mỗi nhóm (timeTag, groupTag, experienceTag) mới là ứng viên — REC-04 | FR-M01-004, REC-01…06 |
| SR-SCR-M01-002-003 | Không scoring, ranking hoặc giới hạn số kết quả; toàn bộ ứng viên được trả | FR-M01-004, BR-M01-012 |
| SR-SCR-M01-002-004 | 0 kết quả là outcome hợp lệ; hiển thị empty state với đúng thông báo BR-M01-013; không nới điều kiện hoặc trả near-match | FR-M01-004, BR-M01-013 |
| SR-SCR-M01-002-005 | Mọi nội dung hiển thị phải theo `LanguagePreference.languageCode` hiện hành | FR-M01-001, FR-M01-013 |
| SR-SCR-M01-002-006 | Chọn route từ kết quả chưa tạo/ghi đè `SelectedRouteContext` | FR-M01-012, BR-M01-022 |

## 7. Linked Requirements

| FR ID | How the screen supports it |
|---|---|
| FR-M01-001 | Language toggle cho phép đổi ngôn ngữ; tất cả labels/content theo i18n |
| FR-M01-004 | Nhận ba tag input, exact-match với route `HOAT_DONG`, trả `0..N` ứng viên hoặc empty outcome |
| FR-M01-003 | Route result cards hiển thị `name`, `distance`, `estimatedDuration`, `difficulty` theo ngôn ngữ |
| FR-M01-009 | Footer entry mở `SCR-M01-004` |

## 8. Responsive and Accessibility Notes

- Smallest supported viewport: **375 × 667 px** (iPhone SE / mobile portrait). Single-column layout; question groups stack vertically.
- Touch targets: minimum 44 × 44 px per WCAG 2.1 Level AA.
- Radio buttons must be clearly distinguishable; selected state uses filled circle + brand primary color.
- Screen reader: each radio group has a group label (E-04/E-06/E-08); selected option announced.
- Language toggle (E-03): full label required, not icon-only.
- Route result cards: single interactive element each; no nested interactive elements.

## 9. Open Questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M01-002-001 | Radio options có cần visual illustration/icon riêng cho từng tag không? | No | Open |
| OQ-SCR-M01-002-002 | Nếu M03 chưa có route nào cho một tổ hợp tag cụ thể (ví dụ: chưa có tag "Có người cao tuổi"), có nên ẩn option đó không? | No | Open |

## Completion Checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-16).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described or marked not applicable with a reason.
- [x] Navigation targets (`SCR-M01-001`, `SCR-M01-003`, `SCR-M01-004`) are valid screen IDs.
- [x] Linked requirements (FR-M01-001/003/004/009) are correct and traceable.
- [x] REC-01..06 are reflected in screen-level rules.
- [ ] Mockup file path confirmed after visual design sign-off.
