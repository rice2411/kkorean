# KKorean

KKorean là 1 trang web giúp bạn luyện đề thi TOPIK ở kĩ năng nghe và đọc.

## Installation

Yêu cầu sử dụng version [nodejs](https://nodejs.org/en) 20.18.0.

Cài đặt các package

```bash
npm i
```

Tiến hành cài đặt vercel

```bash
npm i -g vercel
```

Tiến hành chạy vercel để cấp quyền truy cập

```bash
vercel dev
```

## Usage

Tạo file `.env` cùng cấp với thư mục root theo cấu trúc ở `.env.sample`

```bash
# APP
VITE_SERVERLESS_FUNCTION_API_URL =


# SERVERLESS
FIREBASE_SERVICE_ACCOUNT =
CLOUDINARY_CLOUD_NAME =
CLOUDINARY_API_KEY =
CLOUDINARY_API_SECRET =

# FIREBASE
VITE_FIREBASE_API_KEY =
VITE_FIREBASE_AUTH_DOMAIN =
VITE_FIREBASE_PROJECT_ID =
VITE_FIREBASE_STORAGE_BUCKET =
VITE_FIREBASE_MESSAGING_SENDER_ID =
VITE_FIREBASE_APP_ID =
VITE_FIREBASE_MEASUREMENT_ID =


# CLOUDINARY
VITE_CLOUDINARY_RESPONSE_LINK =
VITE_CLOUDINARY_UPLOAD_LINK =
VITE_CLOUDINARY_CLOUD_NAME =
```

Khởi chạy dự án

```bash
npm run dev
```

Dự án sẽ chạy ở port `5137` của `vite` và `serverless api` sẽ chạy ở `3000` của `vercel`

### Cấu trúc thư mục

============================

> Một số chú thích và quy ước đặt tên cho cấu trúc thư mục

### A typical top-level directory layout

    .
    ├── api                     # Cung cấp các serverless function cho ứng dụng
    ├── node_modules            # Chứa các package cần thiết
    ├── public                  # Chứa các static files ( images, svg .. )
    ├── src                     # Source files
    ├── tools                   # Tools and utilities
    ├── .env.sample             # Cấu trúc file môi trường
    ├── .gitignore              # File config của git
    ├── .node-version           # Phiên bản nodejs của dự án
    ├── eslint.config.js        # Config Eslint
    ├── index.html              # File HTML chính
    ├── jsconfig.json           # ....
    ├── tailwind.config.js      # Config tailwind
    ├── vercel                  # Config production
    └── README.md

## Contributing

Pull requests are welcome. Đối với những thay đổi lớn, vui lòng `open issue` trước để thảo luận về những gì bạn muốn thay đổi.

Vui lòng đảm bảo `self test` trước khi tạo

## License

[MIT](https://choosealicense.com/licenses/mit/)
