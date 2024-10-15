import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { api, publicId, examId } = JSON.parse(req.body);
    let result = null;
    try {
      switch (api) {
        case "deleteImageByPublicId":
          result = await cloudinary.uploader.destroy(publicId);
          return res
            .status(200)
            .json({ message: "Image deleted successfully", result });
        case "searchImageByPublicIdPrefix":
          result = await cloudinary.search
            .expression(`public_id:${examId}*`)
            .max_results(50)
            .execute();
          return res.status(200).json({
            message: "Images fetched successfully",
            resources: result.resources,
          });
        default:
          return res.status(400).json({ error: "API unknow" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch", details: error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
