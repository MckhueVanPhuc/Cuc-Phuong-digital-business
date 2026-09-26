# Screen Specification: SCR-M02-002 — Nội dung checkpoint

| Field | Value |
|---|---|
| Screen ID | `SCR-M02-002` |
| Screen name | Nội dung checkpoint |
| Module | `M02` |
| Actor | Khách sử dụng web-app / Khách tự do |
| Priority | Must |
| Mockup | `screens/M02/mockup-SCR-M02-002.html` |
| Status | Draft |

## 1. Purpose

**Shown when:** Khách tap checkpoint item trên journey map (`SCR-M02-001`) hoặc tap [Xem nội dung] trong scan result overlay.

**The user leaves when:** Quay lại `SCR-M02-001`, hoặc đóng ứng dụng (dữ liệu đã lưu).

## 2. Mockup

```
┌──────────────────────────────────┐
│ ←     Nội dung checkpoint    🌐 VI│  ← Header (E-01…E-03)
├──────────────────────────────────┤
│  ┌────────────────────────────┐  │
│  │     [STATIC IMAGE 1]       │  │  ← Image gallery (E-04)
│  └────────────────────────────┘  │
│  ● ○ ○ ○                         │  ← Image dots (E-05)
│                                  │
│  ② Rừng Cổ Thụ                   │  ← Checkpoint name (E-06)
│  OFFLINE · Đã tải                │  ← Connectivity badge (E-07)
│                                  │
│  Rừng già cổ thụ trên 600 năm.  │  ← introductionText (E-08)
│  Đây là khu vực được bảo tồn    │
│  nghiêm ngặt, nơi sinh sống của  │
│  nhiều loài động vật quý hiếm.  │
│                                  │
│  ─── Audio ────────────────────  │  ← Media section header (E-09)
│  (không hiển thị cho OFFLINE)    │
│                                  │
│  ─── Video ────────────────────  │  ← Media section (E-10)
│  (không hiển thị cho OFFLINE)    │
│                                  │
├──────────────────────────────────┤
│  ↩ Quay lại bản đồ           (i) │  ← Back entry (E-11)
└──────────────────────────────────┘

  ONLINE_AVAILABLE variant (M03 live):
│  ② Thác Nước Trong Rừng          │
│  ONLINE · Có thể có nội dung mới │  ← Connectivity badge online
│                                  │
│  Thác nước cao 30m giữa rừng    │
│  nguyên sinh. Tiếng nước và       │
│  không khí trong lành...          │
│                                  │
│  ─── Audio ────────────────────  │
│  🔊 Tiếng Thác Nước              │
│  2:34 / 2:34  [▶] [─●───────]  │  ← Audio player (E-12)
│                                  │
│  ─── Video ────────────────────  │
│  ┌────────────────────────────┐  │
│  │     [VIDEO PLAYER]         │  │
│  │  ▶                       │  │  ← Video player (E-13)
│  └────────────────────────────┘  │
│                                  │
├──────────────────────────────────┤
│  ↩ Quay lại bản đồ           (i) │
└──────────────────────────────────┘

  LIVE LOADING variant:
│  ② Thác Nước Trong Rừng          │
│  ONLINE · Đang tải nội dung...   │  ← Loading badge
│                                  │
│  ⏳ Đang tải nội dung...         │  ← Loading indicator (E-14)
│                                  │
├──────────────────────────────────┤
│  ↩ Quay lại bản đồ           (i) │
└──────────────────────────────────┘

  LIVE SOURCE UNAVAILABLE variant:
│  ② Thác Nước Trong Rừng          │
│  ⚠ Không tải được nội dung online │  ← Error badge (E-15)
│                                  │
│  Không thể tải nội dung từ máy   │
│  chủ. Kiểm tra kết nối mạng.     │
│  Nội dung offline không khả dụng  │
│  cho checkpoint này.              │
│                                  │
│  [Quay lại bản đồ]              │
└──────────────────────────────────┘
```

## 3. Element Inventory

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-M02-002-01 | Back button | Button | "←" icon, quay về bản đồ | Yes | Tap → quay `SCR-M02-001` |
| 2 | E-SCR-M02-002-02 | Screen title | Text | "Nội dung checkpoint" / "Checkpoint Content" — static i18n | Yes | None |
| 3 | E-SCR-M02-002-03 | Language toggle | Button | Current language code "VI" or "EN" | Yes | Shared control; reads `LanguagePreference.languageCode` |
| 4 | E-SCR-M02-002-04 | Image gallery | Image(s) | `staticImages` array từ nội dung; alt = checkpoint name; swipeable | Yes | Hiển thị gradient placeholder nếu ảnh không tải được |
| 5 | E-SCR-M02-002-05 | Image dots/pagination | Visual | Dot indicators for multiple images | Conditional | Hiển thị khi `staticImages.length > 1` |
| 6 | E-SCR-M02-002-06 | Checkpoint name | Text | `checkpoint.name` từ M03 hoặc checkpoint label | Yes | Playfair Display; font-size 22px |
| 7 | E-SCR-M02-002-07 | Connectivity badge | Badge | "OFFLINE · Đã tải" (OFFLINE_REQUIRED) hoặc "ONLINE · Có thể có nội dung mới" (ONLINE_AVAILABLE) | Yes | Badge color/style tùy loại: green for offline ready, blue for online |
| 8 | E-SCR-M02-002-08 | introductionText | Text | `localizedContent.introductionText` (vi/en) | Yes | Theo `LanguagePreference.languageCode` |
| 9 | E-SCR-M02-002-09 | Audio section header | Label | "Audio" / "Âm thanh" — static i18n | Conditional | Chỉ hiển thị khi `connectivityMode = ONLINE_AVAILABLE` và có audio resource |
| 10 | E-SCR-M02-002-10 | Video section header | Label | "Video" — static i18n | Conditional | Chỉ hiển thị khi `connectivityMode = ONLINE_AVAILABLE` và có video resource |
| 11 | E-SCR-M02-002-11 | Back to map entry | Button | "↩ Quay lại bản đồ" label + icon | Yes | Tap → quay `SCR-M02-001` |
| 12 | E-SCR-M02-002-12 | Audio player | Player | SourceRef audio từ M03; controls: play/pause, seek bar, time display | Conditional | Hiển thị khi `mediaResources` chứa type audio và `connectivityMode = ONLINE_AVAILABLE`; không tự động phát (FR-M02-014) |
| 13 | E-SCR-M02-002-13 | Video player | Player | SourceRef video từ M03; controls: play/pause, fullscreen | Conditional | Hiển thị khi `mediaResources` chứa type video và `connectivityMode = ONLINE_AVAILABLE`; không tự động phát (FR-M02-014) |
| 14 | E-SCR-M02-002-14 | Loading indicator | Visual | Spinner hoặc skeleton trên toàn nội dung | Conditional | Hiển thị khi `connectivityMode = ONLINE_AVAILABLE` và đang tải từ M03 |
| 15 | E-SCR-M02-002-15 | Source unavailable message | Container | Warning message + [Quay lại bản đồ] | Conditional | Hiển thị khi M03 không trả được nội dung cho ONLINE_AVAILABLE checkpoint |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| Offline content | Image + name + badge "OFFLINE · Đã tải" + text; no audio/video | `connectivityMode = OFFLINE_REQUIRED`; content from OfflinePackage (M01) |
| Live content loading | Spinner/skeleton; badge "ONLINE · Đang tải nội dung..." | `connectivityMode = ONLINE_AVAILABLE`; M03 content not yet loaded |
| Live content | Image + name + badge "ONLINE · Có thể có nội dung mới" + text + audio/video players | `connectivityMode = ONLINE_AVAILABLE`; M03 content loaded successfully |
| Live source unavailable | Error message; badge "⚠ Không tải được nội dung online" | `connectivityMode = ONLINE_AVAILABLE`; M03 request failed |
| Media playing | Audio/video in active/playback state; controls reflect current position | User tapped play |
| Media stopped | Audio/video paused; controls reflect last position | User tapped pause or playback ended |

## 5. Interactions and Navigation

| # | Element | User action | System response | Destination screen / result |
|---|---|---|---|---|
| 1 | E-01 Back button | Tap | Quay về bản đồ | `SCR-M02-001` |
| 2 | E-03 Language toggle | Tap | Mở language selector overlay; reload content vi/en | Stays; content re-renders |
| 3 | E-04 Image gallery | Swipe | Chuyển ảnh tiếp theo/trước | Stays; active image changes |
| 4 | E-05 Image dots | Tap dot | Chuyển trực tiếp tới ảnh tương ứng | Stays; active image changes |
| 5 | E-11 Back to map entry | Tap | Quay về bản đồ | `SCR-M02-001` |
| 6 | E-12 Audio play button | Tap | Phát audio từ vị trí hiện tại; button chuyển thành pause | Stays; audio plays |
| 7 | E-12 Audio pause button | Tap | Tạm dừng audio; position preserved | Stays; audio paused |
| 8 | E-12 Audio seek bar | Drag/tap | Di chuyển position | Stays; audio jumps to position |
| 9 | E-13 Video play button | Tap | Phát video | Stays; video plays |
| 10 | E-13 Video fullscreen | Tap | Mở rộng video toàn màn hình | Fullscreen overlay |
| 11 | E-15 [Quay lại bản đồ] | Tap | Quay về bản đồ | `SCR-M02-001` |

## 6. Screen-level Rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-M02-002-001 | Nội dung checkpoint OFFLINE_REQUIRED đọc từ OfflineStationContent trong OfflinePackage (M01); chỉ text + ảnh; không audio/video | FR-M02-012, BR-M02-013 |
| SR-SCR-M02-002-002 | Nội dung checkpoint ONLINE_AVAILABLE đọc trực tiếp từ M03 tại thời điểm mở; không preload, không cache offline | FR-M02-013, BR-M02-014 |
| SR-SCR-M02-002-003 | Audio/video chỉ phát khi khách chủ động bấm play; không tự động phát dưới bất kỳ điều kiện nào | FR-M02-014 |
| SR-SCR-M02-002-004 | introductionText hiển thị theo nhánh vi/en khớp `LanguagePreference.languageCode` hiện hành, bất kể nguồn đọc (M01/M03) | FR-M02-015 |
| SR-SCR-M02-002-005 | Khi M03 không trả được cho ONLINE_AVAILABLE: hiển thị thông báo lỗi; checkpoint vẫn được ghi check-in vì check-in là hành động độc lập với xem nội dung | FR-M02-011, FR-M02-012 |
| SR-SCR-M02-002-006 | Trạng thái playback (vị trí audio/video) không cần lưu cục bộ; mỗi lần mở bắt đầu lại từ đầu | FR-M02-013 |
| SR-SCR-M02-002-007 | Checkpoint content không tạo PlaySession mới; chỉ đọc nội dung; BR-M02-030 khách tự do không ghi dữ liệu | FR-M02-026 |

## 7. Linked Requirements

| FR ID | How the screen supports it |
|---|---|
| FR-M02-011 | Check-in là hành động độc lập; mở nội dung không ảnh hưởng trạng thái check-in |
| FR-M02-012 | OFFLINE_REQUIRED content từ OfflinePackage (M01); text + ảnh |
| FR-M02-013 | ONLINE_AVAILABLE content trực tiếp từ M03; text + ảnh + audio/video |
| FR-M02-014 | Audio/video chỉ phát khi khách chủ động chọn play |
| FR-M02-015 | introductionText theo LanguagePreference vi/en |
| FR-M02-025 | Read-only M01 OfflinePackage và M03 content |
| FR-M02-026 | Khách tự do: xem nội dung không tạo PlaySession/CheckpointVisit |
| FR-M02-027 | Không có cơ chế gợi ý; thông điệp nằm trong introductionText |

## 8. Responsive and Accessibility Notes

- Smallest supported viewport: **375 × 667 px** (mobile portrait). Content scrolls; media players fixed at bottom.
- Touch targets: minimum 44 × 44 px per WCAG 2.1 Level AA.
- Image gallery: swipeable; dot indicators for multi-image; alt text = checkpoint name.
- Audio player: keyboard accessible play/pause; seek bar announces current time.
- Video player: fullscreen on tap; caption support for future (per OQ-M02-001 from spec).
- Language toggle (E-03): full label required.
- Screen reader: landmark regions for header/content/media; media controls have aria-label.
- Connectivity badge: icon + text label; not color-only.

## 9. Open Questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-M02-002-001 | Audio/video có cần phụ đề cho người khiếm thị không? | No | Open — từ spec-M02.md OQ-001 |
| OQ-SCR-M02-002-002 | Video player có hỗ trợ picture-in-picture trên mobile không? | No | Open |
| OQ-SCR-M02-002-003 | Offline checkpoint có cần hiển thị badge "OFFLINE · Đã tải" hay chỉ để trống? | No | Open |

## Completion Checklist

- [x] Every visible/interactable element is in the inventory (E-01..E-15).
- [x] Each input has a validation rule or explicit `None`.
- [x] Each state is described with trigger conditions.
- [x] Navigation target (`SCR-M02-001`) is valid.
- [x] All linked FRs (FR-M02-011..015, 025..027) are traced.
- [x] OFFLINE_REQUIRED vs ONLINE_AVAILABLE content paths clearly separated.
- [x] Auto-play prevention (FR-M02-014) captured.
- [ ] Mockup file path confirmed after visual design sign-off.
