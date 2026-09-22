# System Context Diagram — Cúc Phương Quest

```mermaid
flowchart LR
    visitor["Du khách"]
    admin["Quản trị viên"]
    reviewer["Người duyệt nội dung"]

    m01["M01<br/>Lập kế hoạch & chuẩn bị tuyến"]
    m02["M02<br/>Trải nghiệm khám phá tại thực địa"]
    m03["M03<br/>Vận hành & quản trị nội dung"]

    visitor -->|"chọn ngôn ngữ, tiêu chí, tuyến; tải offline; Start"| m01
    m01 -->|"danh mục/gợi ý tuyến, cảnh báo, trạng thái gói"| visitor
    visitor -->|"quét QR, khám phá checkpoint"| m02
    m02 -->|"nội dung, tiến độ và kết quả phiên"| visitor

    admin -->|"quản lý tuyến, checkpoint, QR, nội dung, media; đóng khẩn cấp"| m03
    reviewer -->|"duyệt nội dung, mở lại checkpoint"| m03
    m03 -->|"báo cáo RPT-01/RPT-02"| admin
    m03 -->|"trạng thái nội dung cần duyệt"| reviewer

    m03 -->|"dữ liệu công khai tuyến/checkpoint/nội dung/tag; snapshot đã xuất bản"| m01
    m01 -->|"LanguagePreference; SelectedRouteContext sau Start; OfflinePackage SAN_SANG"| m02
    m03 -->|"RouteJourneyMap: checkpointId, sequence, connectivityMode, qrIdentifiers[]; nội dung công khai/tra QR trực tuyến"| m02
    m02 -->|"SessionSyncRecord chỉ khi phiên HOAN_TAT hoặc BO_DO"| m03
```

## Ranh giới trách nhiệm

| Thành phần | Sở hữu chính |
|---|---|
| M01 | Chọn tuyến, chọn ngôn ngữ, chuẩn bị/tải gói offline và khởi tạo ngữ cảnh tuyến cho du khách. |
| M02 | Quét QR, trải nghiệm tại checkpoint, tiến độ và phiên chơi (`PlaySession`, `CheckpointVisit`). |
| M03 | Dữ liệu vận hành: tuyến, checkpoint, QR, nội dung, media, xuất bản, kiểm duyệt và báo cáo. |

## Quy ước liên module

- Một `checkpointId` có thể có nhiều `qrIdentifiers[]`; QR được ánh xạ về checkpoint đó.
- Tài nguyên offline và check-in ở M02 được định danh theo `checkpointId`, không theo từng mã QR.
- M03 là nguồn dữ liệu công khai; M01 sử dụng snapshot đã xuất bản cho chuẩn bị tuyến, còn M02 dùng `RouteJourneyMap` và chỉ tra cứu trực tuyến khi cần.
- M02 không gửi sự kiện từng lượt quét sang M03. Chỉ đồng bộ bản ghi phiên ẩn danh khi phiên ở trạng thái kết thúc.