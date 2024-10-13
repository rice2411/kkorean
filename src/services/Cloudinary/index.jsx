import ApiUtils from "@/utils/API";
import Response from "@/utils/HTTP/response";

const UPLOAD_LINK = import.meta.env.VITE_CLOUDINARY_UPLOAD_LINK;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const route = {
  adminApi: `/api/cloudinary`,
  upload: `${UPLOAD_LINK}/${CLOUD_NAME}/image/upload`,
};

const CloudinaryService = {
  upload: async (payload) => {
    try {
      const response = await fetch(route.upload, {
        method: "POST",
        body: payload,
      });

      const data = await response.json();
      return Response.success(data);
    } catch (err) {
      return Response.error(err);
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
        return Response.success(data);
      }
    } catch (error) {
      return Response.error(err);
    }
  },
  searchImageByPublicIdPrefix: async (examId) => {
    try {
      const response = await ApiUtils.fetchAdminAPI(route.adminApi, {
        examId,
        api: "searchImageByPublicIdPrefix",
      });
      return Response.success(response.data.resources);
    } catch (err) {
      console.log(err);
      return Response.error(err);
    }
  },
};
export default CloudinaryService;
