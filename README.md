# to.on Studio — Trung tâm Phát hành & Cập nhật (Official Releases)

Kho lưu trữ phân phối chính thức các bản cài đặt và gói cập nhật cho ứng dụng **to.on Studio** (macOS).

---

## 🚀 Tải về phiên bản mới nhất

### Bản cài đặt đầy đủ (Dành cho người cài lần đầu):
- **Phiên bản:** `v0.3.336c`
- **Tải bộ cài macOS (Apple Silicon & Intel):** [Tải to.on-0.3.336c.dmg](https://github.com/Horaus/to.on-releases/releases/download/v0.3.336c/to.on-0.3.336c.dmg)
- **Mã kiểm tra toàn vẹn (SHA-256):** `e3681b918e6087bba71ff1e863e4ef5a0727b567807ba85c84a08faff87931c1`

---

## ⚡ Cập nhật nhanh trực tiếp trong ứng dụng (In-App OTA)
> **Bạn đã cài đặt to.on trên máy?**
> Bạn **không cần** tải lại file DMG nặng 168MB!
> Khi mở ứng dụng, to.on sẽ tự động phát hiện phiên bản mới và hiển thị nút **"Cập nhật ngay (OTA)"**. Ứng dụng sẽ tự động tải gói cập nhật (`app.asar` ~50MB) và áp dụng chỉ sau 1 cú nhấp chuột.

- **Gói cập nhật OTA:** [app-0.3.336c.asar](https://github.com/Horaus/to.on-releases/releases/download/v0.3.336c/app-0.3.336c.asar)
- **SHA-256:** `c8a1ef4450be3c19e547decb58566fd40b579f3224315409caab50e83889b4da`

---

## 📝 Nhật ký thay đổi (Changelog v0.3.336c)
- **Tối ưu chuyển tab:** Loại bỏ hoàn toàn tình trạng đứng hình hoặc gián đoạn khi chuyển đổi giữa Kịch bản, Phong cách và Storyboard.
- **Gemini Auto & Thinking:** Thiết lập mặc định chế độ cân bằng Auto; tự động nhận diện khối suy nghĩ (Thinking block) và gia hạn timeout động, tránh timeout giả.
- **ChatGPT Auto-Counter:** Tự động phát hiện và phản bác các cảnh báo vi phạm chính sách nội dung sai của ChatGPT, giúp AI tiếp tục tạo ảnh mà không bị dừng lại.
- **Sửa lỗi Upload Reference:** Nhận diện linh hoạt ảnh đính kèm trong composer của ChatGPT, loại bỏ triệt để lỗi `REFERENCE_UPLOAD_NOT_CONFIRMED`.
- **Hệ thống Cập nhật OTA Nghiêm ngặt:** Tích hợp bộ kiểm tra mã băm SHA-256 khắt khe, hoán đổi nguyên tử và cơ chế Boot Guard chống crash-loop tự động hoàn tác.

---

## 🛠 Hướng dẫn Đăng bản cập nhật mới (Dành cho Quản trị viên)
1. Build bản candidate mới từ mã nguồn.
2. Chạy script đồng bộ: `node scripts/sync-release.mjs <candidate-dir>`.
3. Mở **GitHub Desktop** $\rightarrow$ Commit và Push thay đổi của `version.json` và `README.md`.
4. Vào trang repo trên GitHub $\rightarrow$ **Releases** $\rightarrow$ **Draft a new release**:
   - Chọn Tag (ví dụ `v0.3.336c`).
   - Kéo thả 2 file từ thư mục `releases/v0.3.336c/` vào:
     + `to.on-0.3.336c.dmg`
     + `app-0.3.336c.asar`
   - Bấm **Publish release**.
