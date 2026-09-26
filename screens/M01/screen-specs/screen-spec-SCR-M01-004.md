# Screen Specification: SCR-M01-004 — Quản lý tài nguyên offline

| Field | Value |
|---|---|
| Screen ID | `SCR-M01-004` |
| Screen name | Quản lý tài nguyên offline |
| Module | `M01` |
| Actor | Du khách (Visitor) |
| Priority | Should |
| Mockup | `screens/M01/mockup-SCR-M01-004.html` |
| Status | Draft |

## 1. Purpose

**Shown when:** Du khách tap vào entry "Tài nguyên offline" từ `SCR-M01-001`, `SCR-M01-003`, hoặc `SCR-M01-002`.

**The user leaves when:** Quay về nguồn vào (`SCR-M01-001`, `SCR-M01-002`, hoặc `SCR-M01-003`).

## 2. Mockup

```
┌──────────────────────────────────┐
│ ←    Tài nguyên offline    🌐 VI│  ← Header (E-01…E-03)
├──────────────────────────────────┤
│                                  │
│  Bạn đã tải 2 tuyến offline.     │  ← Summary line (E-04)
│  Dùng khi không có kết nối.      │
│                                  │
│  ─── Tuyến đã tải ────────────  │  ← Section header (E-05)
│                                  │
│  ┌────────────────────────────┐  │
│  │ [IMG]  Tuyến Rừng          │  │
│  │        Nguyên Sinh         │  │  ← Package item #1 (E-06)
│  │  v1.2.0 · ✅ Đã sẵn sàng   │  │
│  │  [Xóa]                     │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │ [IMG]  Tuyến Đại           │  │
│  │        Thác Nước           │  │  ← Package item #2 (E-07)
│  │  v1.1.5 · ✅ Đã sẵn sàng   │  │
│  │  [Xóa]                     │  │
│  └────────────────────────────┘  │
│                                  │
│  ─── Chưa tải ────────────────  │  ← Section header (E-08)
│                                  │
│  ┌────────────────────────────┐  │
│  │ [IMG]  Tuyến Khám Phá      │  │
│  │        Hang Động           │  │  ← Undownloaded item (E-09)
│  │  Chưa tải                  │  │
│  │  [Tải]                     │  │
│  └────────────────────────────┘  │
│                                  │
│  ─── Tải không thành công ────  │  ← Section header (E-10)
│                                  │
│  ┌────────────────────────────┐  │
│  │ [IMG]  Tuyến Đỉnh Núi      │  │
│  │        Cao                   │  │  ← Incomplete item (E-11)
│  │  v1.0.1 · ⚠ Chưa hoàn tất  │  │
│  │  [Tải lại]                 │  │
│  └────────────────────────────┘  │
│                                  │
│  ─── Không có tài nguyên ────  │  ← Empty section header (E-12)
│  Bạn chưa tải tuyến nào offline. │
│  Quay lại danh sách tuyến để     │
│  chuẩn bị tài nguyên.            │
│                                  │
├──────────────────────────────────┤
│  📥 Tài nguyên offline      (i) │  ← Footer entry (E-13)
└──────────────────────────────────┘

  DELETE CONFIRMATION modal:
  ┌──────────────────────────────────┐
  │  Xác nhận xóa                    │
  │                                   │
  │  Bạn có chắc muốn xóa tài nguyên │
  │  offline của "Tuyến Rừng          │
  │  Nguyên Sinh" không?             │
  │                                   │
  │  Sau khi xóa, bạn sẽ cần tải    │
  │  lại nếu muốn dùng offline.      │
  │                                   │
  │  [Hủy]        [Xóa]              │
  └──────────────────────────────────┘
```

## 3. Element Inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M01-004-01 | Back button | Button | "←" icon, quay về nguồn vào | Yes | Tap → quay nguồn vào (có thể là SCR-M01-001, 002, hoặc 003) |
| 2 | E-SCR-M01-004-02 | Screen title | Text | "Tài nguyên offline" / "Offline Resources" — static i18n | Yes | None |
| 3 | E-SCR-M01-004-03 | Language toggle | Button | Current language code "VI" or "EN" | Yes | Shared control; reads `LanguagePreference.languageCode` |
| 4 | E-SCR-M01-004-04 | Summary line | Text | Tổng số tuyến đã tải + mô tả ngắn; số dynamic từ IndexedDB query | Yes | "Bạn đã tải N tuyến offline." / "You have downloaded N offline routes." |
| 5 | E-SCR-M01-004-05 | "Tuyến đã tải" section header | Text | "Tuyến đã tải" / "Downloaded Routes" — static i18n | Yes | Hiển thị khi có ít nhất 1 package `SAN_SANG` |
| 6 | E-SCR-M01-004-06 | Package item (downloaded) | Card | Route name, `contentVersion`, state label "Đã sẵn sàng" / "Ready" (icon ✅), [Xóa] button | Yes | Hiển thị cho mỗi package `status = SAN_SANG`; [Xóa] → mở confirmation modal |
| 7 | E-SCR-M01-004-07 | Package item #2..N (downloaded) | Card | Same as E-06 | No | Hiển thị khi `SAN_SANG` packages > 1 |
| 8 | E-SCR-M01-004-08 | "Chưa tải" section header | Text | "Chưa tải" / "Not Downloaded" — static i18n | Yes | Hiển thị khi có ít nhất 1 route có `OFFLINE_REQUIRED` nhưng chưa có package local |
| 9 | E-SCR-M01-004-09 | Undownloaded item | Card | Route image, route name, "Chưa tải" / "Not downloaded", [Tải] button | Yes | Hiển thị cho mỗi route `OFFLINE_REQUIRED` mà không có package; [Tải] → FR-M01-007 |
| 10 | E-SCR-M01-004-10 | "Tải không thành công" section header | Text | "Tải không thành công" / "Download Failed" — static i18n | Yes | Hiển thị khi có ít nhất 1 package `CHUA_HOAN_TAT` |
| 11 | E-SCR-M01-004-11 | Incomplete package item | Card | Route image, route name, `contentVersion`, state label "Chưa hoàn tất" (icon ⚠), [Tải lại] button | Yes | Hiển thị cho mỗi package `status = CHUA_HOAN_TAT`; [Tải lại] → FR-M01-007 (tải lại toàn bộ) |
| 12 | E-SCR-M01-004-12 | Empty state message | Container | Thông báo "Không có tài nguyên offline" + [Quay lại danh sách tuyến] | Yes | Hiển thị khi không có package nào và không có route `OFFLINE_REQUIRED` nào để hiển thị |
| 13 | E-SCR-M01-004-13 | Delete confirmation modal | Modal | Title, message, [Hủy] và [Xóa] buttons; message chứa route name đang xóa | Yes | Hiển thị khi user tap [Xóa] trên package item; [Hủy] → đóng modal; [Xóa] → FR-M01-009 với `deleteConfirmed = true` |
| 14 | E-SCR-M01-004-14 | Footer entry | Button | "Tài nguyên offline" label + info icon | No | Tap → refresh list (re-fetch từ IndexedDB) |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| Has downloaded packages | Summary + "Tuyến đã tải" section + package items + [Xóa] buttons | ≥1 package `SAN_SANG` tồn tại |
| Has downloaded + undownloaded | Both "Tuyến đã tải" and "Chưa tải" sections | ≥1 `SAN_SANG` AND ≥1 route `OFFLINE_REQUIRED` chưa có package |
| Has incomplete packages | "Tải không thành công" section + [Tải lại] | ≥1 package `CHUA_HOAN_TAT` |
| All packages deleted / nothing downloaded | Empty state message + [Quay lại] | 0 packages AND 0 route `OFFLINE_REQUIRED` available |
| Delete confirmation | Modal overlay with route name and confirm/cancel | User tap [Xóa] |
| Deleting | [Xóa] button shows spinner; modal disabled | System executing delete action |

## 5. Interactions and Navigation

| # | Element | User action | System response | Destination screen / result |
|---|---|---|---|---|
| 1 | E-01 Back button | Tap | Quay về nguồn vào | Nguồn vào: `SCR-M01-001`, `SCR-M01-002`, hoặc `SCR-M01-003` |
| 2 | E-03 Language toggle | Tap | Mở language selector overlay; sau chọn → cập nhật `LanguagePreference` và reload content | Stays; content re-renders vi/en |
| 3 | E-06/E-07 [Xóa] button | Tap | Mở delete confirmation modal với route name | Modal displayed; no navigation |
| 4 | E-09 [Tải] button | Tap | Trigger FR-M01-007: tải package cho route tương ứng | Stays; item moves to appropriate section when state changes |
| 5 | E-11 [Tải lại] button | Tap | Trigger FR-M01-007: tải lại toàn bộ package cho route | Stays; item moves when state changes to `SAN_SANG` |
| 6 | E-12 [Quay lại danh sách tuyến] | Tap | Quay về catalog | `SCR-M01-001` |
| 7 | E-13 [Hủy] in modal | Tap | Đóng modal; không thực hiện xóa | Modal closes; list unchanged |
| 8 | E-13 [Xóa] in modal | Tap | Trigger FR-M01-009 với `action = XOA`, `deleteConfirmed = true` → xóa package → modal đóng → item biến mất khỏi danh sách | Modal closes; package removed; sections re-rendered |
| 9 | E-14 Footer entry | Tap | Refresh/re-fetch package list từ IndexedDB | Stays; list re-rendered |

## 6. Screen-level Rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M01-004-001 | Chỉ hiển thị package từ IndexedDB M01; M03 chỉ được gọi khi user yêu cầu Tải/Tải lại hoặc kiểm tra version | FR-M01-009, BR-M01-031 |
| SR-SCR-M01-004-002 | Ba hành động duy nhất: Xem (qua thông tin trên item), Tải (→ FR-M01-007), Xóa (→ FR-M01-009); không có action Update hoặc Retry riêng | FR-M01-009, BR-M01-019 |
| SR-SCR-M01-004-003 | Xóa bắt buộc phải qua confirmation modal; chỉ xóa đúng package được chọn; chưa xác nhận thì chưa xóa | FR-M01-009, BR-M01-019 |
| SR-SCR-M01-004-004 | Tải sau lỗi vẫn là hành động Tải (không phải Update hay Retry); tải lại toàn bộ package | FR-M01-007, BR-M01-019, SM-001 |
| SR-SCR-M01-004-005 | Mọi nội dung hiển thị phải theo `LanguagePreference.languageCode` hiện hành | FR-M01-001, FR-M01-013 |
| SR-SCR-M01-004-006 | Package `status` hiển thị đúng label: `SAN_SANG` → "Đã sẵn sàng" (✅), `CHUA_TAI` → "Chưa tải", `DANG_TAI` → "Đang tải...", `CHUA_HOAN_TAT` → "Chưa hoàn tất" (⚠) | FR-M01-009, SM-001 |
| SR-SCR-M01-004-007 | `contentVersion` hiển thị dạng "v1.2.0" theo format version nào M03 trả về | FR-M01-009 |

## 7. Linked Requirements

| FR ID | How the screen supports it |
|---|---|
| FR-M01-001 | Language toggle; all labels/content per i18n |
| FR-M01-007 | [Tải] và [Tải lại] buttons trigger tải snapshot |
| FR-M01-008 | Package status hiển thị theo SM-001 |
| FR-M01-009 | Xem, Tải, Xóa đúng ba hành động; Xóa bắt buộc qua confirmation |
| FR-M01-010 | [Tải lại] trên `CHUA_HOAN_TAT` tải toàn bộ theo FR-M01-007 |
| FR-M01-013 | Package state changes trigger re-publish nếu cần |

## 8. Responsive and Accessibility Notes

- Smallest supported viewport: **375 × 667 px** (mobile portrait). Single-column list; sections divide by status.
- Touch targets: minimum 44 × 44 px per WCAG 2.1 Level AA.
- Delete modal: backdrop dims main content; modal is centered; focus trapped inside modal.
- Package item: single card; [Tải]/[Xóa] button is sub-element, not a separate focusable row.
- Language toggle (E-03): full label required.
- Screen reader: each section has a heading; delete confirmation modal uses `role="dialog"`, `aria-labelledby`, `aria-describedby`.

## 9. Open Questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M01-004-001 | Undownloaded items trong section "Chưa tải" — hiển thị dựa trên route nào? Tất cả route `OFFLINE_REQUIRED` từ M03 hay chỉ route đã xem gần đây? | No | Open |
| OQ-SCR-M01-004-002 | Delete confirmation có cần thêm thông tin về dung lượng đã chiếm (MB) không? | No | Open |

## Completion Checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-14).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described with trigger conditions.
- [x] Navigation targets (`SCR-M01-001`, `SCR-M01-002`, `SCR-M01-003`) are valid.
- [x] Linked requirements (FR-M01-001/007/008/009/010/013) are correct and traceable.
- [x] Three actions (Xem/Tải/Xóa) per FR-M01-009 and BR-M01-019 captured.
- [x] Delete confirmation as screen-level modal state.
- [ ] Mockup file path confirmed after visual design sign-off.
