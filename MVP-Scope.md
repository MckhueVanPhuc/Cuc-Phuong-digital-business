# MVP Scope — M01, M02 & M03

- **MoSCoW** là cách phân loại mức độ ưu tiên của scope MVP.
- **Must**: bắt buộc phải có để MVP đáp ứng mục tiêu cốt lõi.
- **Should**: quan trọng, nên làm sớm; có thể hoãn nếu cần cắt scope MVP.
- **Could**: giá trị bổ sung, chỉ thực hiện khi còn thời gian và nguồn lực.
- **Won't**: chủ động không làm trong MVP hiện tại; có thể được xem xét ở roadmap sau.

| Module | # | Function chính | Capability | MoSCoW |
|---|---:|---|---|---|
| M01 | 1 | Quản lý ngôn ngữ | Chọn/đổi `vi/en`, duy trì `LanguagePreference`, áp dụng cho UI/nội dung online hoặc offline | Must |
| M01 | 2 | Khám phá route | Đọc route public M03, xem danh mục và chi tiết route | Must |
| M01 | 3 | Recommendation route | Exact-match ba nhóm tag, trả `0..N` route và empty state | Should |
| M01 | 4 | Quản lý trải nghiệm và dữ liệu offline | Đánh giá offline, quyết định người dùng, chuẩn bị/quản lý package, lazy update và bàn giao sau Start hợp lệ | Should |
| M02 | 1 | Quản lý phiên trải nghiệm | Bắt đầu phiên; một phiên trên mỗi thiết bị | Must |
| M02 | 1 | Quản lý phiên trải nghiệm | Tự khôi phục khi đóng/mở lại web app | Must |
| M02 | 1 | Quản lý phiên trải nghiệm | Chuyển “bỏ dở” khi Start hành trình khác giữa chừng | Must |
| M02 | 1 | Quản lý phiên trải nghiệm | Hoàn tất phiên (nút Kết thúc) | Must |
| M02 | 2 | Hiển thị bản đồ hành trình | Bản đồ tĩnh dạng sơ đồ/timeline | Must |
| M02 | 2 | Hiển thị bản đồ hành trình | Cập nhật đánh dấu real-time khi check-in | Should |
| M02 | 3 | Quét QR & check-in | Xác thực QR, ghi check-in mới | Must |
| M02 | 3 | Quét QR & check-in | Check-in tự do, không ép thứ tự | Must |
| M02 | 3 | Quét QR & check-in | Phản hồi khi quét lặp (hiện lại timestamp cũ) | Should |
| M02 | 4 | Hiển thị nội dung trạm | Storytelling text + ảnh, offline, cho mọi checkpoint | Must |
| M02 | 4 | Hiển thị nội dung trạm | Áp dụng đúng nhánh `vi/en` theo `LanguagePreference` | Must |
| M02 | 4 | Hiển thị nội dung trạm | Audio/video theo yêu cầu cho checkpoint online | Should |
| M03 | 1 | Quản lý tuyến & trạm | Tạo/cập nhật Route song ngữ, ba nhóm tag, Trạm/connectivity; sinh/quản lý QR ổn định và Đổi định danh khi bắt buộc | Must |
| M03 | 2 | Soạn nội dung storytelling | Soạn storytelling song ngữ cho từng trạm; đính kèm media bổ sung và chuỗi gợi ý theo kịch bản | Must |
| M03 | 3 | Kiểm duyệt & phát hành | Kiểm tra tự động tính đầy đủ, phê duyệt hai bước, tạo/công bố SnapshotTuyen bất biến cho M01 đóng gói offline | Must |
| M03 | 4 | Vận hành khẩn cấp | Đóng/mở tuyến-trạm khi có rủi ro; cố gắng gửi cảnh báo tới phiên M02 đang kết nối, không cam kết thiết bị offline | Must |
| M03 | 5 | Phân quyền quản trị | Cấu hình/thực thi vai trò QuanTriVien/NguoiDuyetNoiDung ở backend | Should |
| M03 | 6 | Giám sát & báo cáo vận hành | Tổng hợp RPT-01/RPT-02 từ dữ liệu phiên M02; hiện là Draft, chưa có BR chính thức | Should |
| M03 | 7 | Offline-capable admin panel | Lưu nháp client và tự đồng bộ khi mất kết nối lúc soạn tuyến/trạm; phạm vi chưa chốt (`XAMB-M03-009`) | Could |

## Won't — Not in This MVP

| Capability | MoSCoW | Scope decision |
|---|---|---|
| SOS notification | Won't | Không xây dựng chức năng gửi/cảnh báo SOS trong MVP này. |
| GPS tracking systems | Won't | Không xây dựng theo dõi vị trí GPS trong MVP này. |

