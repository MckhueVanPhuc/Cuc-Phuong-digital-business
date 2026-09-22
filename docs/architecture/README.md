# Architecture Documents

| Tài liệu | Góc nhìn | Nguồn chính |
|---|---|---|
| [Context diagram](context-diagram.md) | Tác nhân, ranh giới M01–M03 và contract liên module | Spec M01–M03 |
| [Usage flow](usage-flow.md) | Các flowchart nghiệp vụ, đánh số UF-01…UF-07 | Block nguyên văn trong spec M01–M03 |
| [Sequence diagrams](sequence-diagrams.md) | Thứ tự tương tác, đánh số SD-01…SD-04 | Block nguyên văn trong spec M01–M03 |
| [System configuration](system-configuration.md) | Baseline client storage, backend, authorization, integration, retention, network và environment | Constraint đã xác nhận trong spec M01–M03 |

## Quy ước bảo trì

- `usage-flow.md` và `sequence-diagrams.md` chỉ tổng hợp diagram đã tồn tại trong spec; không tự sửa node, participant hoặc nhánh.
- `context-diagram.md` là sơ đồ tổng hợp liên module, vì vậy có thể chuẩn hóa tên nhưng không được tạo contract mới.
- `system-configuration.md` là baseline triển khai MVP tối giản; physical schema chi tiết và UI design được hoàn thiện trong implementation.
- Khi một spec thay đổi diagram hoặc contract, phải cập nhật tài liệu architecture và chạy lại kiểm tra đối chiếu.

## Baseline hiện tại

- M01: `spec-M01.md`, version ghi trong metadata của spec.
- M02: `spec-M02.md`, version ghi trong metadata của spec.
- M03: `spec-M03.md` v1.0, status Ready for SDD/implementation planning, cập nhật ngày 2026-09-22.
