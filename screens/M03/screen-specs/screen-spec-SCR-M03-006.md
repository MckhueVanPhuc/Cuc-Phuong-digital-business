# Screen Specification: SCR-M03-006 — User & Role Management

| Field | Value |
|---|---|
| Screen ID | `SCR-M03-006` |
| Screen name | User & Role Management |
| Module | `M03` |
| Actor | Reviewer |
| Priority | Must |
| Mockup | `screens/M03/mockup-SCR-M03-006.html` |
| Status | Draft |

## 1. Purpose

**Shown when:** Reviewer chọn "👤 Quản lý tài khoản" từ nav footer bất kỳ màn M03 nào.

**The user leaves when:** Quay lại `SCR-M03-001`; lưu thay đổi tài khoản → ở lại với trạng thái saved.

## 2. Mockup

```
┌──────────────────────────────────────────────────────────────┐
│ ← Quay lại    Quản lý tài khoản                       👤 Minh PK│
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ─── Tài khoản quản trị (3) ──────────────────────────────  │
│                                                              │
│  [🔍 Tìm kiếm tài khoản...                              ]  │  ← Search bar (E-04)
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 👤 minhpk@cucphuong.vn                                 ││
│  │    REVIEWER · Hoạt động                               ││  ← Account item #1 (E-05)
│  │    Mời lần cuối: 2026-09-01                           ││
│  │    [Thay đổi vai trò]  [Tắt tài khoản ⚠]             ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 👤 lannt@cucphuong.vn                                  ││
│  │    CONTENT_STAFF · Hoạt động                          ││  ← Account item #2 (E-06)
│  │    Mời lần cuối: 2026-08-15                           ││
│  │    [Thay đổi vai trò]  [Tắt tài khoản]                ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  ┌──────────────────────────────────────────────────────────┐│
│  │ 👤 trantuan@example.com                                 ││
│  │    CONTENT_STAFF · Đã mời (chờ xác nhận)              ││  ← Pending invite item (E-07)
│  │    Mời lần cuối: 2026-09-20                           ││
│  │    [Gửi lại lời mời]  [Hủy lời mời]                   ││
│  └──────────────────────────────────────────────────────────┘│
│                                                              │
│  ─── Mời tài khoản mới ──────────────────────────────────  │
│                                                              │
│  Email *:                                                    │
│  [                                                 ]         │  ← Invite email input (E-08)
│                                                              │
│  Vai trò *:                                                  │
│  ( ) Content Staff                                          │
│  ( ) Reviewer                                               │  ← Role selector (E-09)
│                                                              │
│  ⚠ Chỉ có thể gán vai trò CONTENT_STAFF hoặc REVIEWER.    │
│    Không có vai trò tùy chỉnh.                             │
│                                                              │
│  [Gửi lời mời]                                              │  ← Invite button (E-10)
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  📋 Báo cáo      👤 Quản lý tài khoản                        │
└──────────────────────────────────────────────────────────────┘

  CHANGE ROLE modal:
┌────────────────────────────────────────────────────────────┐
│  Thay đổi vai trò                                          │
│                                                           │
│  Tài khoản: lannt@cucphuong.vn                           │
│  Vai trò hiện tại: CONTENT_STAFF                         │
│                                                           │
│  Vai trò mới *:                                          │
│  ( ) Content Staff                                        │
│  (●) Reviewer                                            │  ← New role selector (E-11)
│                                                           │
│  [Hủy]              [Xác nhận thay đổi]                   │
└────────────────────────────────────────────────────────────┘

  LAST REVIEWER BLOCKED:
┌────────────────────────────────────────────────────────────┐
│  ⚠ Không thể thay đổi                                     │
│                                                           │
│  Tài khoản này là Reviewer duy nhất đang hoạt động.     │
│  Hệ thống bắt buộc có ít nhất một Reviewer hoạt động.  │
│                                                           │
│  Hãy mời và gửi lời mời cho một Reviewer mới trước khi  │
│  thay đổi tài khoản này.                                 │
│                                                           │
│  [Đã hiểu]                                                │
└────────────────────────────────────────────────────────────┘

  INVITE SENT success:
┌────────────────────────────────────────────────────────────┐
│  ✅ Đã gửi lời mời                                        │
│                                                           │
│  Lời mời đã gửi đến trantuan@example.com.                │
│  Tài khoản sẽ có vai trò CONTENT_STAFF sau khi xác nhận.│
│                                                           │
│  [Đóng]                                                   │
└────────────────────────────────────────────────────────────┘

  DEACTIVATE CONFIRM modal:
┌────────────────────────────────────────────────────────────┐
│  ⚠ Tắt tài khoản                                          │
│                                                           │
│  Tài khoản: lannt@cucphuong.vn                           │
│  Sau khi tắt, người dùng sẽ không thể đăng nhập.        │
│                                                           │
│  [Hủy]              [Xác nhận tắt]                       │
└────────────────────────────────────────────────────────────┘

  DEACTIVATE LAST REVIEWER BLOCKED:
┌────────────────────────────────────────────────────────────┐
│  ⚠ Không thể tắt tài khoản                               │
│                                                           │
│  Đây là Reviewer duy nhất đang hoạt động.               │
│  Hệ thống bắt buộc có ít nhất một Reviewer hoạt động.  │
│                                                           │
│  Hãy mời và phê duyệt một Reviewer mới trước.           │
│                                                           │
│  [Đã hiểu]                                                │
└────────────────────────────────────────────────────────────┘
```

## 3. Element Inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M03-006-01 | Back button | Button | "← Quay lại" → `SCR-M03-001` | Yes | Tap → navigate back |
| 2 | E-SCR-M03-006-02 | Screen title | Text | "Quản lý tài khoản" — static i18n | Yes | None |
| 3 | E-SCR-M03-006-03 | User badge | Text | Logged-in Reviewer display name | Yes | Read-only |
| 4 | E-SCR-M03-006-04 | Search bar | Input | Free-text search on email | No | Filters account list client-side |
| 5 | E-SCR-M03-006-05 | Account item (active) | Card | Email + role badge + status + [Thay đổi vai trò] + [Tắt] | Yes | Shows for each `active = true` account |
| 6 | E-SCR-M03-006-06 | Account item (active, non-reviewer) | Card | Email + role badge + [Thay đổi vai trò] + [Tắt] | Yes | CONTENT_STAFF can be deactivated |
| 7 | E-SCR-M03-006-07 | Account item (pending invite) | Card | Email + "Đã mời (chờ xác nhận)" + [Gửi lại] + [Hủy lời mời] | Conditional | Shown for accounts with `invited_at` but no activation |
| 8 | E-SCR-M03-006-08 | Invite email input | Input | `email` for new invitation | Yes | Valid email format; FR-019 |
| 9 | E-SCR-M03-006-09 | Invite role selector | Radio | `CONTENT_STAFF` or `REVIEWER`; fixed labels | Yes | Required; FR-019; BR-016 |
| 10 | E-SCR-M03-006-10 | Invite button | Button | "Gửi lời mời" | Yes | Triggers invitation flow via auth provider; FR-019 |
| 11 | E-SCR-M03-006-11 | Change role modal | Modal | Current role → new role selector + confirm | Conditional | Opens on [Thay đổi vai trò] tap |
| 12 | E-SCR-M03-006-12 | Change role new role selector | Radio | Same options as invite; pre-selects current | Conditional | Within modal; FR-019 |
| 13 | E-SCR-M03-006-13 | Deactivate confirm modal | Modal | Account info + warning + [Hủy] + [Xác nhận tắt] | Conditional | Opens on [Tắt tài khoản] tap for non-last-reviewer |
| 14 | E-SCR-M03-006-14 | Last-reviewer blocked modal | Modal | "Không thể thay đổi" + explanation + [Đã hiểu] | Conditional | Shown when action would leave zero active Reviewers; BR-016, FR-019 |
| 15 | E-SCR-M03-006-15 | Invite sent toast/overlay | Toast | "✅ Đã gửi lời mời" + email + role | Yes | Shown after successful invite |
| 16 | E-SCR-M03-006-16 | Role badge | Badge | `REVIEWER` (red/purple) or `CONTENT_STAFF` (blue) | Yes | Visual role indicator; static i18n labels |
| 17 | E-SCR-M03-006-17 | Account status badge | Badge | "Hoạt động" / "Đã mời (chờ xác nhận)" / "Đã tắt" | Yes | Per account status |
| 18 | E-SCR-M03-006-18 | Resend invite button | Button | "Gửi lại lời mời" on pending account | Conditional | Triggers new invitation; FR-019 |
| 19 | E-SCR-M03-006-19 | Cancel invite button | Button | "Hủy lời mời" on pending account | Conditional | Removes pending invitation; FR-019 |
| 20 | E-SCR-M03-006-20 | Nav footer | Buttons | "📋 Báo cáo", "👤 Quản lý tài khoản" | Yes | Same as other M03 screens |
| 21 | E-SCR-M03-006-21 | Last active reviewer indicator | Badge | "(Reviewer cuối cùng)" label on account card | Conditional | Shown on the one remaining active Reviewer; FR-019 |
| 22 | E-SCR-M03-006-22 | Empty account list | Container | "Chưa có tài khoản quản trị nào." + invite CTA | Conditional | Shown when no accounts exist |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| Account list | Searchable list of all accounts with action buttons | Screen opened |
| Invite form ready | Email + role fields empty; Invite button disabled until valid | Default state |
| Invite form valid | Email valid + role selected; Invite button enabled | User filled valid email + selected role |
| Invite sent | Success overlay; account appears as pending | Invite submitted successfully |
| Resending invite | Button shows spinner; resend count incremented | [Gửi lại] tapped |
| Changing role | Modal with current → new role selector | [Thay đổi vai trò] tapped |
| Last-reviewer change blocked | Blocked modal; action buttons disabled | Attempting to demote/deactivate last Reviewer |
| Deactivating account | Confirmation modal | [Tắt tài khoản] tapped |
| Last-reviewer deactivation blocked | Blocked modal explaining requirement | Attempting to deactivate last Reviewer |
| Account deactivated | Account disappears from active list; toast confirmation | Deactivation confirmed |
| Invite cancelled | Pending account removed from list; toast confirmation | Cancel invite confirmed |
| Search active | Filtered account list matching search term | User typed in search bar |
| Empty search | "Không có tài khoản phù hợp." message | Search returns 0 results |
| Loading | Spinner on account list area | Initial load or refresh |

## 5. Interactions and Navigation

| # | Element | User action | System response | Destination / result |
|---|---|---|---|---|
| 1 | E-01 Back button | Tap | Navigate back | `SCR-M03-001` |
| 2 | E-04 Search bar | Type | Filter account list by email substring | List updates |
| 3 | E-05..E-07 [Thay đổi vai trò] | Tap | Open change role modal with current role pre-selected | Modal displayed |
| 4 | E-12 [Xác nhận thay đổi] (modal) | Tap | Update account role via server; FR-019 | Modal closes; list updates; action logged |
| 5 | E-05..E-07 [Tắt tài khoản] | Tap | Open deactivate confirmation modal | Modal displayed |
| 6 | E-13 [Xác nhận tắt] | Tap | Set account `active = false` via server; FR-019 | Modal closes; account removed from active list; action logged |
| 7 | E-07 [Gửi lại lời mời] | Tap | Re-trigger auth provider invitation; FR-019 | Button shows sent confirmation |
| 8 | E-07 [Hủy lời mời] | Tap | Cancel pending invitation; FR-019 | Account removed from pending list |
| 9 | E-08..E-10 Invite form | Fill + tap | Validate email format; validate role selected; submit invitation | Invite sent overlay shown; new pending account appears |
| 10 | E-14 [Đã hiểu] | Tap | Close blocked modal | Modal closes |
| 11 | E-20 Nav entries | Tap | Navigate to respective screens | `SCR-M03-001` or `SCR-M03-005` |

## 6. Screen-level Rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M03-006-001 | Only two fixed roles exist: CONTENT_STAFF and REVIEWER; no custom roles | BR-016, FR-019 |
| SR-SCR-M03-006-002 | Invite: creates pending AdminAccount + sends auth provider invitation; role assigned at activation | FR-019, BR-016 |
| SR-SCR-M03-006-003 | Change role: updates `role` field immediately; new permission takes effect on next authorized request | FR-019 |
| SR-SCR-M03-006-004 | Deactivate: sets `active = false`; user cannot log in after deactivation; action logged with actor + timestamp | FR-019, BR-016 |
| SR-SCR-M03-006-005 | Last-active-Reviewer guard: any action (demote or deactivate) that would leave zero active Reviewers is blocked server-side | FR-019, BR-016, SC-008 |
| SR-SCR-M03-006-006 | Last-active-Reviewer blocked modal shown before server call; UI cannot bypass this guard | FR-019, BR-016 |
| SR-SCR-M03-006-007 | Every write (invite/change role/deactivate) sends `id` + `updated_at`; stale write rejected via FR-018 | FR-018, BR-015 |
| SR-SCR-M03-006-008 | Server enforces Reviewer-only access for all account management operations; Content Staff requests rejected regardless of UI | FR-014, BR-009, BR-016 |
| SR-SCR-M03-006-009 | Invitation/reset delivery is handled by the authentication provider; M03 only triggers the flow | FR-019 |
| SR-SCR-M03-006-010 | Pending invite can be cancelled before activation; resend generates a new invitation token | FR-019 |
| SR-SCR-M03-006-011 | Account list includes all statuses: active, pending-invite, deactivated | FR-019 |

## 7. Linked Requirements

| FR ID | How the screen supports it |
|---|---|
| FR-014 | Server enforces Reviewer-only access; UI hides all management features from Content Staff |
| FR-019 | Invite, change role, activate/deactivate; last-active-Reviewer guard |
| FR-018 | Optimistic concurrency on account updates |

## 8. Responsive and Accessibility Notes

- Smallest supported viewport: **1280 × 800 px** (desktop). Account list scrolls vertically.
- Account cards: `role="listitem"` within `role="list"`; each card has accessible name combining email + role.
- Role badge: icon + text label; not color-only for accessibility.
- Status badge: "Hoạt động" / "Đã mời" / "Đã tắt" — all text labels.
- Change role modal: focus trapped; `role="dialog"`, `aria-labelledby`; role radio group has `role="radiogroup"`.
- Deactivate modal: `role="alertdialog"`; warning message prominently styled.
- Blocked modals: `role="alertdialog"` with `aria-live="assertive"`.
- Invite form: email input labeled; role radio group labeled; invite button has `aria-label`.
- Search: `role="searchbox"` with accessible label.
- "Reviewer cuối cùng" indicator: visually prominent; `aria-label` announcing the constraint.

## 9. Open Questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M03-006-001 | Pending invite expiry: lời mời có hết hạn không? Nếu có, hệ thống tự động hủy hay cần admin thủ công? | No | Open |
| OQ-SCR-M03-006-002 | Deactivated account data (lịch sử tạo route, checkpoint) có bị ảnh hưởng không? Có cần anonymize không? | No | Open |
| OQ-SCR-M03-006-003 | "Gửi lại lời mời" — giới hạn số lần gửi lại không? Có cooldown period không? | No | Open |
| OQ-SCR-M03-006-004 | Account list có phân trang khi có nhiều tài khoản không? | No | Open |
| OQ-SCR-M03-006-005 | Invite email validation — chỉ check format hay cần verify domain/corporate email? | No | Open |

## Completion Checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-22).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described with trigger conditions.
- [x] Navigation targets (`SCR-M03-001`, `SCR-M03-005`) are valid.
- [x] All linked FRs (FR-014, 018, 019) traced.
- [x] Last-active-Reviewer guard captured in states and modals.
- [x] Invite/change-role/deactivate flows all represented.
- [x] Search and filter on account list captured.
- [ ] Mockup file path confirmed after visual design sign-off.
