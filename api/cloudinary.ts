import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
//@ts-ignore
import { NextApiRequest, NextApiResponse } from "next";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.VITE_CLOUDINARY_API_KEY,
    api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
});

// Định nghĩa interface cho dữ liệu nhận từ request
interface ApiRequest {
    api: string;
    publicId: string;
    examId: string;
}

// Định nghĩa interface cho kết quả trả về
interface ApiResponse {
    message?: string;
    error?: string;
    resources?: any[]; // Hoặc có thể thay thế bằng kiểu dữ liệu cụ thể hơn nếu biết trước cấu trúc
    result?: any; // Tương tự, có thể thay thế bằng kiểu dữ liệu cụ thể hơn
    details?: any;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse> // Sử dụng interface ApiResponse cho Response
) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method === "POST") {
        const { api, publicId, examId }: ApiRequest = req.body; // Sử dụng interface ApiRequest
        let result: any = null; // Có thể thay thế bằng kiểu dữ liệu cụ thể hơn

        try {
            switch (api) {
                case "deleteImageByPublicId":
                    result = await cloudinary.uploader.destroy(publicId);
                    return res.status(200).json({
                        message: "Image deleted successfully",
                        result,
                    });
                case "searchAssetsByPublicIdPrefix":
                    result = await cloudinary.search
                        .expression(`public_id:${examId}*`)
                        .max_results(51)
                        .execute();
                    return res.status(200).json({
                        message: "Images fetched successfully",
                        resources: result.resources,
                    });
                default:
                    return res.status(400).json({ error: "API unknown" });
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
