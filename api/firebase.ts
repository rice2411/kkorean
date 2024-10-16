import { cert, initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
import dotenv from "dotenv";
import { NextApiRequest, NextApiResponse } from "next";

// Tải biến môi trường từ tệp .env
dotenv.config();

// Khởi tạo ứng dụng Firebase
initializeApp({
    credential: cert(
        JSON.parse(process.env.VITE_FIREBASE_SERVICE_ACCOUNT as string)
    ),
});

// Định nghĩa interface cho dữ liệu nhận từ request
interface ApiRequest {
    id: string;
    disabled: boolean;
    email: string;
    newPassword: string;
    api: string;
}

// Định nghĩa interface cho kết quả trả về
interface ApiResponse {
    message?: string;
    error?: string;
    details?: any; // Hoặc có thể thay thế bằng kiểu dữ liệu cụ thể hơn nếu biết trước
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse> // Sử dụng interface ApiResponse cho Response
) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS"); // Cải thiện cú pháp cho Allow-Methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method === "POST") {
        try {
            // Phân tích dữ liệu từ request body và sử dụng ApiRequest interface
            const { id, disabled, email, newPassword, api }: ApiRequest =
                req.body;

            // Xử lý các API request
            switch (api) {
                case `updateAccountStatus`:
                    await admin.auth().updateUser(id, { disabled });
                    return res
                        .status(200)
                        .json({ message: "Account status has been updated" });
                case `deleteAccountByEmail`:
                    const userRecord = await admin.auth().getUserByEmail(email);
                    await admin.auth().deleteUser(userRecord.uid);
                    return res
                        .status(200)
                        .json({ message: "User deleted successfully." });
                case `resetAccountPassword`:
                    await admin.auth().updateUser(id, {
                        password: newPassword,
                        disabled: true,
                    });
                    return res
                        .status(200)
                        .json({ message: "Password updated successfully" });
                default:
                    return res.status(400).end(`API key unknown`);
            }
        } catch (error) {
            return res
                .status(500)
                .json({ error: "Failed to fetch", details: error });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
