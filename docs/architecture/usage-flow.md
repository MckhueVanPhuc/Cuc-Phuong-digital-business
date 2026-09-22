# Usage Flow — Cúc Phương Quest

File này chỉ tập hợp nguyên văn các block `flowchart` đã có trong specification module; không diễn giải, chỉnh sửa hoặc bổ sung flow.

## Danh mục flow

1. [UF-01 — Overall M01 Usage Flow](#uf-01--overall-m01-usage-flow)
2. [UF-02 — Route Discovery & Recommendation](#uf-02--route-discovery--recommendation)
3. [UF-03 — Offline Preparation](#uf-03--offline-preparation)
4. [UF-04 — Resource Management & Lazy Update](#uf-04--resource-management--lazy-update)
5. [UF-05 — Start Route & Handoff](#uf-05--start-route--handoff)
6. [UF-06 — M02 Usage Flow](#uf-06--m02-usage-flow)
7. [UF-07 — M03 Route Publication Flow](#uf-07--m03-route-publication-flow)

## M01 — Functional Flows

Nguồn: [spec-M01.md](../../specs/spec-M01.md), §4.1–§4.5.

### UF-01 — Overall M01 Usage Flow

```mermaid
flowchart TD
    A["Mở ứng dụng"] --> L{"Đã có LanguagePreference?"}
    L -->|"Chưa"| P["Chọn vi hoặc en"]
    L -->|"Có"| E["Khám phá route; có thể dùng recommendation — 4.2"]
    P --> E
    E --> R["Chọn route HOAT_DONG"]
    R --> O["Đánh giá và xử lý chuẩn bị offline — 4.3"]
    O -->|"Quay lại"| E
    O -->|"Không cần gói / gói sẵn sàng / đã xác nhận không tải"| S["Du khách yêu cầu Start"]
    S --> H["Kiểm tra Start và bàn giao — 4.5"]
    H -->|"Hợp lệ"| C["Ghi SelectedRouteContext; công bố dữ liệu"]
    C --> M["Mở M02; đọc contract dùng chung"]
    H -->|"Không hợp lệ"| N["Không Start mới; không ghi context mới"]
```

### UF-02 — Route Discovery & Recommendation

```mermaid
flowchart TD
    A["Route và tags public từ M03"] --> B["Chỉ xét HOAT_DONG; loại nháp và route không còn khả dụng"]
    B --> C{"Du khách chọn cách khám phá"}
    C -->|"Danh mục"| D["Cung cấp route khả dụng"]
    C -->|"Recommendation"| I["Nhận timeTag, groupTag, experienceTag"]
    I --> V{"Đủ ba lựa chọn hợp lệ?"}
    V -->|"Không"| W["Chưa xử lý recommendation"]
    V -->|"Có"| F["Khớp đồng thời ba tag — REC-01 đến REC-04"]
    F --> N{"Có ứng viên?"}
    N -->|"Có"| R["Trả toàn bộ; không scoring/ranking"]
    N -->|"Không"| Z["Không có tuyến phù hợp; không near-match"]
    Z -->|"Đổi tiêu chí"| I
    Z -->|"Quay lại danh mục"| D
    D --> T["Du khách mở thông tin route"]
    R --> T
    T --> Q["Tên, cự ly, thời lượng, độ khó, content theo ngôn ngữ"]
```

### UF-03 — Offline Preparation

```mermaid
flowchart TD
    A["Route đã chọn; checkpoint và trạng thái gói"] --> B{"Có OFFLINE_REQUIRED?"}
    B -->|"Không"| S["Hoàn tất chuẩn bị; chuyển tới kiểm tra Start"]
    B -->|"Có"| P{"Route này có gói active SAN_SANG?"}
    P -->|"Có"| S
    P -->|"Không"| W["Cảnh báo số checkpoint ảnh hưởng và hậu quả"]
    W --> D{"Quyết định của du khách"}
    D -->|"Quay lại"| R["Quay lại; không Start"]
    D -->|"Tiếp tục không tải"| C["Du khách xác nhận hậu quả; không tạo gói"]
    C --> S
    D -->|"Tải"| G{"Request nguồn thành công?"}
    G -->|"Không"| U["Không bắt đầu tải; giữ trạng thái hiện hành"]
    G -->|"Có"| T["DANG_TAI: thu nhận snapshot song ngữ và ảnh khai báo"]
    T --> V{"Tải/lưu và kiểm tra manifest đầy đủ?"}
    V -->|"Có"| K["SAN_SANG; công bố gói"]
    K --> S
    V -->|"Không, không có gói cũ hợp lệ"| E["CHUA_HOAN_TAT; không công bố dữ liệu dở"]
    E -->|"Lần sau du khách chọn Tải"| G
```

### UF-04 — Resource Management & Lazy Update

```mermaid
flowchart TD
    A["Mở/chọn lại route có gói SAN_SANG"] --> Q{"Request manifest nguồn thành công?"}
    Q -->|"Không"| O["Giữ gói cũ SAN_SANG; không bắt đầu update"]
    Q -->|"Có"| V{"Có contentVersion mới?"}
    V -->|"Không"| O
    V -->|"Có"| T["Chuẩn bị snapshot mới; tiếp tục công bố gói cũ"]
    T --> C{"Bản mới hoàn chỉnh theo manifest?"}
    C -->|"Có"| N["Chuyển activeVersion nguyên tử; sau đó dọn bản cũ"]
    C -->|"Tải hoặc kiểm tra thất bại"| F["Xóa staging chưa hoàn tất; giữ gói cũ SAN_SANG"]
```

### UF-05 — Start Route & Handoff

```mermaid
flowchart TD
    A["Du khách yêu cầu Start route đã chọn"] --> R{"Route còn HOAT_DONG trong dữ liệu public hiện hành?"}
    R -->|"Không"| X["Không Start mới; giữ package/context hiện có"]
    R -->|"Có"| O{"Route này không cần offline hoặc có gói active SAN_SANG?"}
    O -->|"Có"| C["Ghi SelectedRouteContext.routeId; ghi đè route cũ nếu có"]
    O -->|"Không"| W{"Đã xác nhận tiếp tục không tải?"}
    W -->|"Chưa"| P["Chưa Start; cần xử lý cảnh báo theo 4.3"]
    W -->|"Rồi"| C
    C --> D["Công bố context; mở M02"]
    D --> M["M02 đọc routeId, ngôn ngữ, gói SAN_SANG nếu có"]
```

## M02 — Usage flow

Nguồn: [spec-M02.md](../../specs/spec-M02.md), §4.1.

### UF-06 — M02 Usage Flow

```mermaid
flowchart TD
    A[Khách mở M02] --> B{Có PlaySession?}
    B -->|Không| C{Khách loại nào?}
    C -->|Web-app đã Start| D[Bấm Bắt đầu]
    C -->|Khách tự do| E[Quét QR trực tiếp]
    B -->|Có| F[Khôi phục phiên]
    D --> G[Tạo PlaySession DANG_DIEN_RA]
    F --> G
    G --> H[Đọc checkpoint từ M03 theo sequence]
    H --> I[Hiển bản đồ hành trình]
    I --> J[Quét mã QR]
    J --> K{QR thuộc journeyCheckpoints?}
    K -->|Có| L{Đã check-in?}
    L -->|Chưa| M[Ghi CheckpointVisit]
    L -->|Rồi| N[Hiển thị thời điểm đã khám phá]
    K -->|Không| O{M03 tra được nội dung?}
    O -->|Có| P[Hiển nội dung từ M03]
    O -->|Không| Q[Báo không tìm thấy]
    M --> R{ONLINE_AVAILABLE?}
    P --> R
    N --> J
    Q --> J
    R -->|Có| S[Đọc nội dung từ M03]
    R -->|Không| T[Đọc nội dung từ OfflinePackage]
    S --> U[Hiển thị text + ảnh + media]
    T --> V[Hiển thị text + ảnh]
    U --> W
    V --> W
    W{Đến trạm cuối + bấm Kết thúc?}
    W -->|Chưa| J
    W -->|Rồi| X[Chuyển HOAN_TAT]
    X --> Y[Đồng bộ ẩn danh về M03]
    E --> Z[M02 tra M03 theo qrIdentifier]
    Z --> AA{Hiển nội dung?}
    AA -->|Có| AB[Hiển nội dung trạm]
    AA -->|Không| AC[Báo không tìm thấy]
    AB --> AD[End - không check-in, không đồng bộ]
    AC --> AD
    G -.->|Start Route khác| AE[Chuyển phiên hiện tại sang BO_DO]
    AE --> Y
```

## M03 — Usage flow

Nguồn: [spec-M03.md](../../specs/spec-M03.md), §4.1.

### UF-07 — M03 Route Publication Flow

```mermaid
flowchart TD
    S(["Content staff starts a new route"]) --> B["Enter Vietnamese name, description, distance, duration, difficulty"]
    B --> P["Add an attraction point"]
    P --> V{"Connectivity mode?"}
    V -->|"Network-available"| F["Confirm a field check found a stable connection"]
    V -->|"Offline-required"| Q["Generate one or more QR codes for the point"]
    F --> Q
    Q --> C["Write introduction content in Vietnamese and English"]
    C --> K{"Point has an active QR code and both languages published?"}
    K -->|"No"| Q
    K -->|"Yes"| A["Point activated"]
    A --> M{"More attraction points to add?"}
    M -->|"Yes"| P
    M -->|"No"| T["Assign the three recommendation tag groups"]
    T --> EN["Add the English name and description"]
    EN --> R["Submit the route for approval"]
    R --> G{"Bilingual fields, tags, points and content all complete?"}
    G -->|"No"| W["Block submission, show the missing items"]
    W --> B
    G -->|"Yes"| RV{"A different reviewer approves?"}
    RV -->|"Reject"| W2["Route returns to NHAP with the reason"]
    RV -->|"Approve"| PB["Route becomes HOAT_DONG"]
    PB --> SN["System generates and publishes the first snapshot"]
    SN --> E(["Trip-planning module can now read the route"])
```
