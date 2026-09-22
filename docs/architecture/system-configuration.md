# System Configuration

## 1. Trạng thái và phạm vi

Tài liệu này chốt **configuration baseline triển khai MVP** cho M01–M03, gồm cả các quyết định kỹ thuật tối giản phục vụ vibe coding. Physical table/column schema chi tiết và UI design vẫn thuộc implementation.

## 2. Thành phần logic

| Thành phần | Trách nhiệm cấu hình |
|---|---|
| M01 web client | Public route catalog/recommendation, language, offline preparation, package lifecycle và Start handoff |
| M02 web client | Session thực địa, QR scan, local progress, nội dung offline/online và terminal-session sync |
| M03 administration client | CRUD/submit/review/publish, QR/content/media management, closure/reopen và reports |
| Backend/data platform | Public projections, authenticated writes, server-side authorization, snapshot/version data, media references và session upsert |
| Client storage | Cache app shell/i18n, package offline M01, context/preferences và tiến độ/session M02 |

M01–M03 là ranh giới module logic. Specification không bắt buộc chúng phải là ba deployment/service vật lý độc lập.

## 3. Cấu hình client và offline

| Dữ liệu | Owner | Nơi lưu/đọc đã chốt | Quy tắc |
|---|---|---|---|
| App shell và resource i18n `vi/en` | M01 | Cache Storage | Phải dùng được khi offline |
| `LanguagePreference` | M01 | Client data dùng chung | M02 chỉ đọc; thay đổi không tải/xóa package |
| `SelectedRouteContext.routeId` | M01 | Client data dùng chung | Chỉ tạo/ghi đè sau Start hợp lệ; M02 chỉ đọc |
| `OfflinePackage`, manifest/index/content/ảnh | M01 | IndexedDB | Chỉ package active `SAN_SANG` được công bố cho M02 |
| Ảnh offline | M01 | Byte/Blob local trong IndexedDB | URL hoặc signed URL không được tính là đã tải |
| `PlaySession`, `CheckpointVisit`, pending `SessionSyncRecord` | M02 | IndexedDB qua Dexie | Lưu liên tục; giữ record chưa sync khi mất mạng |

IndexedDB v1 dùng các store logic: `preferences`, `route_context`, `offline_packages`, `offline_package_staging`, `play_sessions`, `checkpoint_visits`, `pending_session_sync`. Nếu thiếu quota khi tải/cập nhật, xóa staging chưa hoàn tất, giữ package active cũ và báo người dùng giải phóng dung lượng; không tự xóa package active. Migration tăng integer database version và chạy trước khi module đọc dữ liệu.

## 4. Backend, dữ liệu và media

- Supabase RLS là constraint đã duyệt trong M01: guest chỉ được đọc dữ liệu public; write của M03 phải được kiểm soát; frontend không chứa service-role key.
- M03 phải kiểm tra quyền write ở server/backend, không chỉ ẩn action trên giao diện.
- M03 quản lý dữ liệu tuyến, checkpoint, QR, nội dung song ngữ, media, version history và immutable route snapshot.
- Một checkpoint có thể có nhiều QR active; mọi projection/snapshot liên quan phải cung cấp toàn bộ `qrIdentifiers[]` và ánh xạ về một `checkpointId`.
- Media M03 có thể gồm ảnh/audio/video. Package offline M01 chỉ chứa introduction text song ngữ và ảnh tĩnh khai báo cho checkpoint `OFFLINE_REQUIRED`; không chứa audio/video.
- Database và object storage dùng Supabase; tên bucket cụ thể được tạo trong migration/config của implementation, không hard-code trong business logic.

## 5. Authorization baseline

| Principal/role | Read | Write/action |
|---|---|---|
| Guest/du khách | Public routes, checkpoints, QR mapping, content và snapshot cần thiết | Không được ghi nguồn M03 |
| Content Staff | Dữ liệu quản trị được cấp quyền và reports | Tạo/sửa, gửi duyệt và đóng khẩn cấp theo permission matrix M03 |
| Reviewer | Dữ liệu chờ duyệt và vận hành | Duyệt/từ chối; đóng/mở lại theo spec M03; người duyệt không được là người tạo |
| M02 client | Contract M01 và public projection M03 | Chỉ gửi `SessionSyncRecord` ẩn danh; không sửa dữ liệu nguồn |

Authentication dùng Supabase Auth invite-only cho M03. MVP dùng session mặc định của Supabase, không bắt buộc MFA; account provisioning do Reviewer thực hiện.

## 6. Contract và integration configuration

| Hướng | Contract/configuration | Hành vi bắt buộc |
|---|---|---|
| M03 → M01 | Public route/status/tags/content và versioned snapshot | M01 chỉ tải/update sau khi request nguồn thực tế thành công |
| M01 → M02 | `LanguagePreference` | Publish sau chọn/đổi hợp lệ |
| M01 → M02 | `SelectedRouteContext.routeId` | Publish sau Start hợp lệ |
| M01 → M02 | `OfflinePackage SAN_SANG` | Atomic switch; không để M02 đọc staging/dữ liệu dở |
| M03 → M02 | `RouteJourneyMap`, QR mapping, live content | Checkpoint có sequence, connectivity mode và danh sách QR |
| M02 → M03 | `POST /sessions/sync` với `SessionSyncRecord` | Chỉ `HOAN_TAT`/`BO_DO`, không PII, upsert idempotent theo `sessionId` |

Quy ước integration MVP:

- Base URL lấy từ `VITE_SUPABASE_URL`; Edge Function đồng bộ đặt tên versioned `sessions-sync-v1` và expose logical path `/sessions/sync` cho client wrapper.
- Timeout mặc định 15 giây cho request public/admin. Upload media dùng 60 giây.
- Public GET và terminal session sync được retry tối đa 3 lần với backoff 1/2/4 giây. Admin write không auto-retry; người dùng chủ động lưu lại.
- Khi offline, `SessionSyncRecord` ở lại `pending_session_sync` và retry khi app mở/có request nguồn thành công.
- Error contract chung: `{ code, message, details?, requestId? }`; UI hiển thị `message`, log `code/requestId`, không hiển thị stack trace.
- Breaking contract tạo function/version mới; không thay đổi âm thầm payload đang dùng.

## 7. Snapshot và retention

- Snapshot đã công bố là bất biến; thay đổi dữ liệu offline đã phát hành tạo `contentVersion` mới.
- M01 staging bản mới và chỉ chuyển `activeVersion` sau khi manifest/content/resource đầy đủ; lỗi phải giữ package cũ `SAN_SANG`.
- M03 giữ snapshot current, previous và mọi version bị thay thế chưa đủ 30 ngày theo baseline M01.
- Không có acknowledgement M01 → M03 cho việc dọn snapshot.
- Route/checkpoint bị đóng không tự xóa package hoặc context đã có trên thiết bị; phiên M02 đang chạy không nhận cảnh báo real-time từ M03.

## 8. Network và background behavior

- Không dùng riêng `navigator.onLine` để kết luận nguồn M03 khả dụng; M01 phải dựa trên kết quả request manifest/API thực tế.
- `OFFLINE_REQUIRED`: M02 đọc content từ package local.
- `ONLINE_AVAILABLE`: M02 đọc live content từ M03; spec không định nghĩa offline fallback.
- Phiên kết thúc khi offline được giữ local và thử đồng bộ khi có mạng trở lại.
- Không dùng scheduler, queue, worker hoặc cron trong MVP. Snapshot chạy đồng bộ trong transaction khi publish; report query theo yêu cầu; session retry do client M02 thực hiện.

## 9. Implementation profile cho MVP

| Hạng mục | Quyết định |
|---|---|
| Frontend | Một React + TypeScript + Vite PWA; M01/M02 là public routes, M03 là protected admin routes trong cùng codebase |
| Offline/PWA | `vite-plugin-pwa`/Workbox cho app shell và i18n; Dexie làm wrapper IndexedDB cho package và local session |
| Backend | Một Supabase project: Postgres, Auth, RLS, Storage và Edge Functions/RPC cho thao tác cần tính nguyên tử |
| Validation | Zod schema dùng chung ở client và Edge Functions cho contract/payload |
| Hosting | Vercel static deployment cho frontend; Supabase hosted backend |
| Architecture style | Modular monolith; không microservice, message broker hoặc queue trong MVP |
| Admin connectivity | M03 online-only; không lưu/sync draft offline |

Cấu trúc này ưu tiên triển khai nhanh nhưng vẫn giữ ranh giới module bằng thư mục/code ownership và contract typed, không tách thành ba hệ thống triển khai riêng.

## 10. Cấu hình môi trường

MVP dùng hai môi trường để giảm vận hành:

| Environment | Mục đích | Backend |
|---|---|---|
| Local | Phát triển và test trên máy | Supabase local qua CLI |
| Production | Demo/nghiệm thu/vận hành MVP | Một Supabase hosted project + một Vercel project |

Không tạo staging riêng trong MVP. Khi cần nghiệm thu độc lập với production, bổ sung Preview deployment của Vercel trỏ tới Supabase branch/project test; đây không phải môi trường luôn bật.

| Biến cấu hình | Nơi dùng | Quy tắc |
|---|---|---|
| `VITE_SUPABASE_URL` | Frontend | Khác nhau theo environment |
| `VITE_SUPABASE_ANON_KEY` | Frontend | Public anon key; an toàn khi RLS đúng |
| `SUPABASE_SERVICE_ROLE_KEY` | Edge Functions/server only | Tuyệt đối không có prefix `VITE_`, không đưa vào frontend |
| `VITE_APP_VERSION` | Frontend/cache migration | Tăng cùng release có thay đổi cache/schema |
| `VITE_DEFAULT_TIMEZONE` | Report UI | Cố định `Asia/Bangkok` |

## 11. Quyết định dữ liệu và xử lý

### 11.1 M03 admin và concurrency

- Content Staff/`QuanTriVien` và Reviewer/`NguoiDuyetNoiDung` dùng Supabase Auth theo cơ chế invite-only; không có public sign-up.
- Vai trò lưu trong bảng profile/role do Reviewer quản lý; RLS và server function kiểm tra role trên mọi write.
- Không có ủy quyền tạm thời. Ban quản lý duy trì ít nhất hai tài khoản Reviewer để dự phòng.
- M03 online-only. Mất kết nối khi lưu thì hiển thị lỗi và giữ dữ liệu đang nhập trong form cho đến khi reload; không xây local draft sync.
- Mỗi bản ghi chỉnh sửa có `updated_at`. Update dùng optimistic concurrency với điều kiện `id + updated_at`; nếu không còn khớp, từ chối ghi và yêu cầu tải lại bản mới. Không xây merge tự động.

### 11.2 Snapshot

`SnapshotTuyen.danh_sach_checkpoint` dùng contract tối thiểu sau cho từng checkpoint `OFFLINE_REQUIRED`:

```text
checkpointId
qrIdentifiers[]
connectivityMode
localizedContent.vi.introductionText
localizedContent.en.introductionText
staticImages[]: { url, mimeType, size, checksum }
```

Snapshot được tạo trong server transaction/RPC khi approval hoặc thay đổi đã phát hành ảnh hưởng dữ liệu offline. Chỉ sau khi snapshot đầy đủ chuyển `DA_CONG_BO` mới cập nhật `activeContentVersion`. Không dùng background queue trong MVP.

### 11.3 Session sync và reporting

- `POST /sessions/sync` được triển khai bằng một Edge Function hoặc RPC server-side; validate Zod, chỉ nhận `HOAN_TAT`/`BO_DO`, upsert theo `sessionId` và từ chối payload có PII ngoài schema.
- RPT-01: bộ lọc từ ngày/đến ngày/route, mặc định 30 ngày; tổng session duy nhất, số/tỷ lệ `HOAN_TAT`, số/tỷ lệ `BO_DO`.
- RPT-02: bộ lọc từ ngày/đến ngày/route, mặc định 30 ngày; số session duy nhất đã ghé từng checkpoint, tối đa một lượt/checkpoint/session.
- Timestamp lưu ISO 8601/UTC; lọc và nhóm ngày theo `Asia/Bangkok`.
- Report chạy query/view theo yêu cầu khi người dùng mở màn hình; không cron, pre-aggregation hoặc realtime subscription trong MVP.

### 11.4 Các quyết định scope khác

- `toa_do_gps` là metadata tùy chọn cho vận hành; không dùng dẫn đường, check-in hoặc validation.
- Không có chức năng báo QR lắp sai vị trí trong MVP.
- Contract `qrIdentifiers[]` đã chốt; M02 phân giải nhiều QR về một `checkpointId` và check-in idempotent theo `(sessionId, checkpointId)`.
- Cả Content Staff và Reviewer được đóng khẩn cấp; chỉ Reviewer được mở lại.

## 12. Security và vận hành

- Enforce least privilege bằng RLS và server-side permission checks; frontend chỉ dùng anon key.
- QR identity change và approval/publish/snapshot thực hiện qua server function có transaction; reprint không đổi identity.
- Audit log bắt buộc cho publish, QR identity change, emergency close/reopen và thay đổi role.
- Dùng Supabase/Vercel logs cho MVP; lỗi nghiệp vụ hiển thị mã correlation/request ID khi có. Không tích hợp observability vendor riêng ở MVP.
- Production phải dùng Supabase plan có backup tự động hằng ngày với retention tối thiểu 7 ngày; trước migration lớn phải tạo backup thủ công/export.
- Secret chỉ lưu trong Vercel/Supabase environment settings; xoay service-role key ngay khi nghi lộ và ít nhất mỗi 90 ngày.
- Emergency closure ghi target, lý do, actor và thời điểm. Biện pháp an toàn thực địa vẫn nằm ngoài hệ thống.
