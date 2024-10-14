import ApiUtils from "@/utils/API";
import HttpUtils from "@/utils/HTTP";
import Response from "@/utils/HTTP";

const UPLOAD_LINK = import.meta.env.VITE_CLOUDINARY_UPLOAD_LINK;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const route = {
  adminApi: `/api/cloudinary`,
  upload: `${UPLOAD_LINK}/${CLOUD_NAME}`,
};

const CloudinaryService = {
  upload: async (payload, type = "image") => {
    try {
      const response = await fetch(route.upload + `/${type}/upload`, {
        method: "POST",
        body: payload,
      });

      const data = await response.json();
      return HttpUtils.Response.success(data);
    } catch (err) {
      return HttpUtils.Response.error(err);
    }
  },
  deleteImageByPublicId: async (publicId) => {
    try {
      const response = await ApiUtils.fetchAdminAPI(route.adminApi, {
        publicId,
        api: "deleteImageByPublicId",
      });

      const data = await response.json();
      if (response.ok) {
        return HttpUtils.Response.success(data);
      }
    } catch (error) {
      return HttpUtils.Response.error(err);
    }
  },
  searchImageByPublicIdPrefix: async (examId) => {
    try {
      const response = await ApiUtils.fetchAdminAPI(route.adminApi, {
        examId,
        api: "searchImageByPublicIdPrefix",
      });
      return HttpUtils.Response.success(response.data.resources);
    } catch (err) {
      console.log(err);
      return HttpUtils.Response.error(err);
    }
  },
};
export default CloudinaryService;
