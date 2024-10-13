# KKorean

KKorean là 1 trang web giúp bạn luyện đề thi TOPIK ở kĩ năng nghe và đọc.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Dự án là trang web nơi để các bạn có thể luyện tập thêm về kĩ năng nghe, đọc trong các kì thi TOPIK gồm các bộ đề đa dạng được tổng hợp qua các kì thi

## Features

Các chức năng chính:

- Landing Page giới thiệu về trung tâm
- Làm thử đề thi ( miễn phí và trả phí )
- Quản lý bộ đề thi
- Cung cấp tài khoản cho học viên
- Thống kê điểm

## Tech Stack

Dự án sử dụng các công nghệ sau:

- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Firebase (Firestore, Authentication, Realtime Database )
- **Other:** Cloudinary
- **Deployment:** Vercel

## Installation

Hướng dẫn cài đặt dự án ở máy local:

1. Clone the repository:

   ```bash
   git clone https://github.com/rice2411/kkorean.git

   ```

2. Chuyển hướng tới thư mục dự án:

   ```bash
   cd kkorean

   ```

3. Cài đặt các package cần thiết:

   ```bash
   npm install

   ```

4. Tạo file .env:

   ```bash
   touch .env
   ```

   Thêm các biến môi trường theo file `.env.sample`

5. Cài đặt vercel:

   ```bash
   npm i -g vercel

   ```

6. Xác thực vercel:

   ```bash
   vercel dev
   ```

   Hãy làm theo các chỉ dẫn ở trên terminal

7. Khởi chạy dự án:
   ```bash
   npm run dev
   ```

## Usage

Hướng dẫn sử dụng:

- Dự án mặc định chạy ở `http://localhost:5317` port của Vite
- Dự án có sử dụng `Serverless Function` được cấu hình bằng `vercel` chạy ở `http://localhost:3000`
- Dự án dùng `BaaS Firebase` để thay thế Backend
- Sử dụng `Cloudinary` để lưu trữ các file image, audio

## Scripts

- Development: npm run dev (khởi chạy Vite và Vercel dev functions cùng 1 lúc)
- Build: npm run build (build cho production)
- Vercel Functions: npm run vercel-function (khởi chạy server vercel)

## Folder Structure

Cấu trúc dự án:

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

## Environment Variables

Cung cấp giá trị cho các biến môi trường ở `.env.sample` để khởi chạy

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

## Contributing

Một số git convention:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature/your-feature).
5. Create a new pull request.

Đảm bảo các PR được follow theo đúng trình tự.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact

Thông tin liên lạc:

1. **Author**: Rice.
2. **Email**: minhrice.dev@gmail.com
3. **Github**: [rice2411](https://github.com/rice2411)
4. **LinkedIn**: [Anh Minh](https://www.linkedin.com/in/rice2411/)
