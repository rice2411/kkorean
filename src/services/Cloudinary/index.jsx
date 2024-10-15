import { HttpUtils } from "@/utils";
import ApiUtils from "@/utils/API";

const UPLOAD_LINK = import.meta.env.VITE_CLOUDINARY_UPLOAD_LINK;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const route = {
    adminApi: `/api/cloudinary`,
    upload: `${UPLOAD_LINK}/${CLOUD_NAME}`,
};

const CloudinaryService = {
    upload: async (payload, type = "image") => {
        try {
            const response = await ApiUtils.fetchAPI(
                route.upload + `/${type}/upload`,
                {
                    body: payload,
                    header: {
                        "Content-Type": "multipart/form-data",
                    },
                },
                true
            );
            const data = response.json();
            if (response.ok) {
                return HttpUtils.Response.success(data);
            }
            return HttpUtils.Response.error(response);
        } catch (error) {
            return HttpUtils.Response.error(error);
        }
    },
    deleteImageByPublicId: async (publicId) => {
        try {
            const response = await ApiUtils.fetchAPI(route.adminApi, {
                body: {
                    publicId,
                    api: "deleteImageByPublicId",
                },
            });
            const data = response.json();
            if (response.ok) {
                return HttpUtils.Response.success(data);
            }
            return HttpUtils.Response.error(response);
        } catch (error) {
            return HttpUtils.Response.error(error);
        }
    },
    searchImageByPublicIdPrefix: async (examId) => {
        try {
            const response = await ApiUtils.fetchAPI(route.adminApi, {
                body: { examId, api: "searchImageByPublicIdPrefix" },
            });
            const data = response.json();
            if (response.ok) {
                return HttpUtils.Response.success(data);
            }
            return HttpUtils.Response.error(response);
        } catch (error) {
            return HttpUtils.Response.error(error);
        }
    },
};
export default CloudinaryService;
