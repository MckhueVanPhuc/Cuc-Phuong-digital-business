# Sequence Diagrams — Cúc Phương Quest

File này chỉ tập hợp nguyên văn các block `sequenceDiagram` đã có trong specification module; không diễn giải, chỉnh sửa hoặc bổ sung flow.

## M01 — Start route & handoff

Nguồn: [spec-M01.md](../../specs/spec-M01.md), §4.7.

```mermaid
sequenceDiagram
    actor V as Visitor
    participant M01 as M01
    participant D as Dữ liệu dùng chung do M01 sở hữu
    participant M02 as M02
    Note over M01,D: LanguagePreference đã công bố, gói SAN_SANG nếu đã tải
    V->>M01: Start route đã chọn
    M01->>M01: Kiểm tra HOAT_DONG và điều kiện offline
    Note over M01: Nhánh Start hợp lệ theo FR-M01-011
    M01->>D: Tạo hoặc ghi đè SelectedRouteContext.routeId
    M01->>M02: Mở M02 sau Start hợp lệ
    M02->>D: Đọc độc lập route context và ngôn ngữ hiện hành
    D-->>M02: routeId và LanguagePreference
    opt Có OfflinePackage active SAN_SANG
        M02->>D: Đọc gói sẵn sàng
        D-->>M02: resourceIndex, content vi/en và ảnh local
    end
    Note over M02,D: M02 không sửa dữ liệu M01, QR ngoài route không đổi context
```

## M02 — Sequence for the main flow (Quét QR và Check-in)

Nguồn: [spec-M02.md](../../specs/spec-M02.md), §4.2.

```mermaid
sequenceDiagram
    actor DK as Khách
    participant M02 as M02 Frontend
    participant API as M02 API
    participant DB as Local Storage
    participant M01 as M01 Store
    participant M03 as M03 API

    DK->>M02: Quét mã QR
    M02->>M02: Phân giải qrIdentifier → checkpointId

    alt checkpointId thuộc journeyCheckpoints
        alt Checkpoint chưa check-in
            M02->>DB: Ghi CheckpointVisit mới
            DB-->>M02: Đã lưu
            alt OFFLINE_REQUIRED
                M02->>M01: Đọc OfflineStationContent
                M01-->>M02: Nội dung text + ảnh
                M02-->>DK: Hiển nội dung
            else ONLINE_AVAILABLE
                M02->>M03: Lấy LiveStationContent
                M03-->>M02: Nội dung text + ảnh + media
                M02-->>DK: Hiển nội dung
            end
        else Checkpoint đã check-in
            DB->>M02: Đọc lại checkedInAt
            M02-->>DK: Hiển "bạn đã khám phá trạm này lúc x giờ"
        end
    else checkpointId không thuộc journeyCheckpoints
        M02->>M03: Tra qrIdentifier → nội dung
        M03-->>M02: Nội dung (nếu có)
        M02-->>DK: Hiển nội dung hoặc báo không tìm thấy
    end
```

## M02 — Sequence for session sync

Nguồn: [spec-M02.md](../../specs/spec-M02.md), §4.3.

```mermaid
sequenceDiagram
    participant M02 as M02 Frontend
    participant API as M02 API
    participant M03 as M03 API
    participant DB as Local Storage

    Note over M02: Phiên chuyển HOAN_TAT hoặc BO_DO
    M02->>DB: Đọc SessionSyncRecord
    DB-->>M02: Dữ liệu ẩn danh
    M02->>M03: POST /sessions/sync (sessionId, routeId, timestamps, visitedCheckpoints)
    M03->>M03: Upsert theo sessionId
    M03-->>M02: 200 OK
    M02->>DB: Cập nhật syncedAt
```

## M03

[spec-M03.md](../../specs/spec-M03.md) hiện là scaffold và chưa có block `sequenceDiagram`, nên không có sơ đồ M03 trong file tổng hợp này.
