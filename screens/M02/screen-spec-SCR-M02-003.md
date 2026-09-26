# Screen Specification: SCR-M02-003 — Kết thúc phiên

| Field | Value |
|---|---|
| Screen ID | `SCR-M02-003` |
| Screen name | Kết thúc phiên |
| Module | `M02` |
| Actor | Khách sử dụng web-app |
| Priority | Must |
| Mockup | `screens/M02/mockup-SCR-M02-003.html` |
| Status | Draft |

## 1. Purpose

**Shown when:** Khách đã check-in tất cả checkpoint (checkpoint cuối đã CheckpointVisit) và bấm Kết thúc từ `SCR-M02-001`.

**The user leaves when:** Quay về `SCR-M01-001` (chọn tuyến mới hoặc kết thúc trải nghiệm).

## 2. Mockup

```
┌──────────────────────────────────┐
│ ←         Kết thúc phiên    🌐 VI│  ← Header (E-01…E-03)
├──────────────────────────────────┤
│                                  │
│         🎉                       │
│                                  │
│  Chúc mừng bạn đã hoàn thành    │  ← Congratulations (E-04)
│  hành trình!                     │
│                                  │
│  Tuyến Rừng Nguyên Sinh          │  ← Route summary (E-05)
│  5 checkpoint đã khám phá         │
│  Thời gian: 09:00 – 11:20       │
│                                  │
│  ─── Chi tiết check-in ────────  │  ← Check-in summary header (E-06)
│                                  │
│  ✅ 09:15  Rừng Nguyên Sinh      │  ← Visit #1 (E-07)
│  ✅ 09:40  Thác Nước Trong Rừng │
│  ✅ 10:05  Rừng Cổ Thụ           │
│  ✅ 10:40  Điểm Ngắm Cảnh       │
│  ✅ 11:20  Trạm Cuối            │  ← Last visit (E-08)
│                                  │
│  ─── Trạng thái đồng bộ ─────── │  ← Sync status header (E-09)
│                                  │
│  🟡 Đang đồng bộ...              │  ← Sync in progress (E-10)
│  Hoặc: ✅ Đã đồng bộ            │  ← Sync done (E-11)
│  Hoặc: ⚠ Chưa đồng bộ          │  ← Sync pending (E-12)
│  Đồng bộ sẽ tự động thực hiện  │
│  khi có kết nối mạng.            │
│                                  │
│  ─── Không đồng bộ ────────────  │  ← Offline note (E-13)
│  Phiên của bạn được lưu cục bộ. │
│  Dữ liệu sẽ được gửi khi có     │
│  mạng. Không lo mất dữ liệu.    │
│                                  │
│  ┌────────────────────────────┐  │
│  │   Quay lại chọn tuyến mới  │  │  ← Primary action (E-14)
│  └────────────────────────────┘  │
│                                  │
├──────────────────────────────────┤
│  📥 Tài nguyên offline      (i) │  ← Footer (E-15) → SCR-M01-004
└──────────────────────────────────┘

  CONFIRMATION variant (pre-confirmation):
┌──────────────────────────────────┐
│  Bạn đã khám phá 5/5 checkpoint.│
│  Kết thúc phiên này?            │
│                                  │
│  [Hủy]          [Xác nhận]      │
└──────────────────────────────────┘

  ROUTE SWITCHED context:
┌──────────────────────────────────┐
│  ⚠ Phiên tuyến "Tuyến Rừng     │
│     Nguyên Sinh" đã kết thúc.  │
│  Phiên "Tuyến Đại Thác Nước"    │
│  đang chạy.                     │
│  Checkpoint đã check-in: 3/5     │
└──────────────────────────────────┘
```

## 3. Element Inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M02-003-01 | Back button | Button | "←" icon | Yes | Tap → quay `SCR-M02-001`; disabled when session already finalized |
| 2 | E-SCR-M02-003-02 | Screen title | Text | "Kết thúc phiên" / "End Session" — static i18n | Yes | None |
| 3 | E-SCR-M02-003-03 | Language toggle | Button | Current language code "VI" or "EN" | Yes | Shared control; reads `LanguagePreference.languageCode` |
| 4 | E-SCR-M02-003-04 | Congratulations message | Text | "Chúc mừng bạn đã hoàn thành hành trình!" / "Congratulations on completing your journey!" — static i18n | Yes | Hiển thị khi session.status = HOAN_TAT |
| 5 | E-SCR-M02-003-05 | Route summary | Text | Route `name`, tổng số checkpoint đã khám phá, thời gian bắt đầu – kết thúc | Yes | Duration computed from PlaySession.startedAt → endedAt |
| 6 | E-SCR-M02-003-06 | Check-in summary header | Text | "Chi tiết check-in" / "Check-in Details" — static i18n | Yes | Hiển thị danh sách CheckpointVisit |
| 7 | E-SCR-M02-003-07 | Visit item #1 | Text | ✅/check icon + checkedInAt (HH:mm) + checkpoint name | Yes | Hiển thị tất cả CheckpointVisit theo checkedInAt ASC |
| 8 | E-SCR-M02-003-08 | Visit item #N | Text | Same as E-07 | No | Hiển thị cho mỗi CheckpointVisit còn lại |
| 9 | E-SCR-M02-003-09 | Sync status header | Text | "Trạng thái đồng bộ" / "Sync Status" — static i18n | Yes | Always displayed after HOAN_TAT |
| 10 | E-SCR-M02-003-10 | Sync in-progress indicator | Text/Visual | "🟡 Đang đồng bộ..." — hiển thị khi đang gửi | Conditional | Hiển thị khi `syncedAt = null` và đang thử gửi |
| 11 | E-SCR-M02-003-11 | Sync done indicator | Text/Visual | "✅ Đã đồng bộ" + syncedAt timestamp | Conditional | Hiển thị khi `syncedAt` đã có giá trị |
| 12 | E-SCR-M02-003-12 | Sync pending indicator | Text/Visual | "⚠ Chưa đồng bộ" + offline note | Conditional | Hiển thị khi `syncedAt = null` và không đang thử gửi (offline) |
| 13 | E-SCR-M02-003-13 | Offline reassurance note | Text | Thông báo dữ liệu được lưu cục bộ và sẽ gửi khi có mạng | Yes | Hiển thị khi sync pending |
| 14 | E-SCR-M02-003-14 | Primary action button | Button | "Quay lại chọn tuyến mới" / "Choose a New Route" | Yes | Tap → quay `SCR-M01-001`; clears SelectedRouteContext |
| 15 | E-SCR-M02-003-15 | Footer entry | Button | "📥 Tài nguyên offline" label | No | Tap → `SCR-M01-004` |
| 16 | E-SCR-M02-003-16 | Confirmation overlay | Modal | Pre-confirmation: "Bạn đã khám phá N/M checkpoint. Kết thúc phiên này?" + [Hủy] + [Xác nhận] | Yes | Hiển thị khi user tap End ở SCR-M02-001 trước khi chuyển state; FR-M02-019 |
| 17 | E-SCR-M02-003-17 | Route-switched note | Banner | Warning khi phiên HOAN_TAT khác với phiên DANG_DIEN_RA hiện tại | Conditional | Hiển thị khi SelectedRouteContext.routeId đã đổi sang phiên khác |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| Confirmation pending | Overlay: check-in count + [Hủy] + [Xác nhận] | User tapped End on SCR-M02-001; state transition not yet executed |
| Completed + sync in progress | Congratulations + visit list + "🟡 Đang đồng bộ..." | session.status = HOAN_TAT + sync attempt in flight |
| Completed + sync done | Congratulations + visit list + "✅ Đã đồng bộ" | session.status = HOAN_TAT + syncedAt populated |
| Completed + sync pending (offline) | Congratulations + visit list + "⚠ Chưa đồng bộ" + offline note | session.status = HOAN_TAT + no network / sync failed |
| Route switched context | Banner: phiên tuyến cũ kết thúc, phiên mới đang chạy | `SelectedRouteContext.routeId` đổi sang route khác sau khi phiên cũ chuyển BO_DO |

## 5. Interactions and Navigation

| # | Element | User action | System response | Destination screen / result |
|---|---|---|---|---|
| 1 | E-01 Back button | Tap | Quay về `SCR-M02-001` nếu chưa finalized; nếu finalized thì quay M01 | `SCR-M02-001` hoặc `SCR-M01-001` |
| 2 | E-03 Language toggle | Tap | Mở language selector overlay; reload content vi/en | Stays; content re-renders |
| 3 | E-14 Primary action button | Tap | Quay về M01; clear SelectedRouteContext; allow new session | `SCR-M01-001` |
| 4 | E-15 Footer entry | Tap | Mở quản lý tài nguyên offline | `SCR-M01-004` |
| 5 | E-16 [Hủy] | Tap | Đóng overlay; quay `SCR-M02-001`; không finalize session | `SCR-M02-001` |
| 6 | E-16 [Xác nhận] | Tap | Trigger FR-M02-019: set PlaySession.endedAt → HOAN_TAT; trigger sync if online | Stays; state → Completed (pending/based on sync) |
| 7 | E-17 Banner dismiss | Tap / auto | Đóng banner | Stays on SCR-M02-003 |

## 6. Screen-level Rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M02-003-001 | Chỉ chuyển PlaySession sang HOAN_TAT khi checkpoint cuối (sequence cuối) đã có CheckpointVisit và khách chủ động bấm Xác nhận | FR-M02-019, BR-M02-005 |
| SR-SCR-M02-003-002 | PlaySession.endedAt được ghi tại thời điểm khách bấm Xác nhận, không phải tại thời điểm check-in checkpoint cuối | FR-M02-019 |
| SR-SCR-M02-003-003 | Sync không chặn hiển thị màn kết thúc; sync có thể HOẶC KHÔNG hoàn thành trước khi user rời khỏi | FR-M02-023 |
| SR-SCR-M02-003-004 | Sync pending: giữ SessionSyncRecord cục bộ; thử lại tự động khi có mạng | FR-M02-021, FR-M02-023 |
| SR-SCR-M02-003-005 | Dữ liệu sync không chứa bất kỳ PII nào; sessionId là ẩn danh | FR-M02-022, BR-M02-024 |
| SR-SCR-M02-003-006 | M03 dùng sessionId làm khóa upsert để tránh nhân đôi bản ghi khi gửi lại | FR-M02-024 |
| SR-SCR-M02-003-007 | Check-in summary hiển thị theo thứ tự checkedInAt (thời gian thực), không theo sequence; total = journeyCheckpoints.length | FR-M02-021 |
| SR-SCR-M02-003-008 | Mọi nội dung hiển thị theo `LanguagePreference.languageCode` hiện hành | FR-M02-015 |
| SR-SCR-M02-003-009 | Quay lại chọn tuyến mới: xóa SelectedRouteContext để M01 hiển thị language gate nếu cần | BR-M02-004 |

## 7. Linked Requirements

| FR ID | How the screen supports it |
|---|---|
| FR-M02-015 | introductionText theo LanguagePreference vi/en |
| FR-M02-019 | HOAN_TAT chỉ khi checkpoint cuối đã check-in + khách bấm Xác nhận |
| FR-M02-020 | Nút Kết thúc chỉ khả dụng sau khi checkpoint cuối đã check-in |
| FR-M02-021 | Gửi SessionSyncRecord (sessionId, routeId, timestamps, visitedCheckpoints) về M03 khi online |
| FR-M02-022 | Dữ liệu sync không chứa PII |
| FR-M02-023 | Sync không chặn kết thúc; giữ record offline nếu chưa sync |
| FR-M02-024 | M03 upsert theo sessionId để tránh nhân đôi |
| FR-M02-025 | Read-only M01/M03 contracts |

## 8. Responsive and Accessibility Notes

- Smallest supported viewport: **375 × 667 px** (mobile portrait). Scrollable content.
- Touch targets: minimum 44 × 44 px per WCAG 2.1 Level AA.
- Visit list: each item is a single row; checkmark icon + time + checkpoint name.
- Sync status: icon + text label; not color-only for accessibility.
- Confirmation modal: focus trapped inside modal; backdrop dims main content.
- Language toggle (E-03): full label required.
- Screen reader: landmarks for header/content/action/sync areas; confirmation modal uses role="dialog".

## 9. Open Questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M02-003-001 | Trên màn kết thúc, nếu sync pending có nên cho user tự trigger "Thử đồng bộ lại" không? | No | Open |
| OQ-SCR-M02-003-002 | Checkpoint nào chưa check-in (nếu có) có hiển thị trong danh sách không, hay chỉ hiển thị những checkpoint đã khám phá? | No | Open |
| OQ-SCR-M02-003-003 | Khi user quay lại chọn tuyến mới, phiên đã kết thúc (HOAN_TAT) có cần hiển thị lại không? | No | Open |

## Completion Checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-17).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described with trigger conditions.
- [x] Navigation targets (`SCR-M02-001`, `SCR-M01-001`, `SCR-M01-004`) are valid.
- [x] All linked FRs (FR-M02-015, 019..025) are traced.
- [x] Confirmation overlay captured as screen-level modal state.
- [x] Sync states (in-progress/done/pending) all represented.
- [ ] Mockup file path confirmed after visual design sign-off.
