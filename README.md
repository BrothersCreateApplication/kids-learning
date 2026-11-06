# Bé Học Vui

Web học tập song ngữ dành cho trẻ nhỏ, chạy hoàn toàn cục bộ và không cần cài đặt.

**Bản đang chạy:** https://brotherscreateapplication.github.io/kids-learning/

## Cách mở

- Cách nhanh nhất: mở `index.html` bằng Chrome hoặc Edge.
- Hoặc chạy một máy chủ tĩnh trong thư mục này:

  ```powershell
  python -m http.server 4173
  ```

  Sau đó mở `http://127.0.0.1:4173`.

## Nội dung

- 26 thẻ chữ cái, không kèm hình minh họa.
- 21 thẻ học số từ 0 đến 20.
- 93 động vật với ảnh chụp thực tế; loài đã tuyệt chủng dùng ảnh mô hình phục dựng.
- 26 loại phương tiện quen thuộc với ảnh thật và tên song ngữ.
- 58 động vật có bản ghi tiếng kêu.
- Chuyển đổi giữa tiếng Việt và tiếng Anh.
- Bấm vào động vật để nghe tên, nghe tiếng kêu và xem hoạt ảnh mô tả hành động.
- Tìm kiếm và lọc động vật theo nhóm.
- Trò chơi 6 câu dành cho bé 3 tuổi: nghe tiếng kêu rồi bấm vào đúng con vật. Câu hỏi chỉ dùng các con vật quen thuộc như chó, mèo, gà, bò, vịt, heo, sư tử, voi, hổ và chim.
- Số hình lựa chọn tăng dần từ 2 lên 3 và 4; bấm sai có thể nghe lại và chọn tiếp.
- Xếp hạng sao và kỷ lục được lưu trên thiết bị.

Giọng đọc được tạo bằng VieNeu-TTS (tiếng Việt) và Microsoft Edge Neural TTS (tiếng Anh), sau đó lưu trong `assets/audio`, vì vậy vẫn hoạt động trên máy chưa cài giọng đọc tiếng Việt. Nguồn ảnh, tiếng kêu và giấy phép có tại [credits.html](credits.html).

## Cài như ứng dụng

Web hỗ trợ PWA và có thể cài trên iPhone, iPad hoặc Android:

- iPhone/iPad: mở bằng Safari, nhấn **Chia sẻ** → **Thêm vào Màn hình chính**.
- Android/Chrome: mở menu ⋮ → **Cài đặt ứng dụng**.

PWA được phát hành qua HTTPS tại địa chỉ trên.
