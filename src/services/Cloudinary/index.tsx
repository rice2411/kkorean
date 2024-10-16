import { IAPI, IFile } from "@/interface";
import { TFile } from "@/types";
import { ApiUtils } from "@/utils";

const UPLOAD_LINK = import.meta.env.VITE_CLOUDINARY_UPLOAD_LINK as string;
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;

const route = {
  adminApi: `/api/cloudinary`,
  upload: `${UPLOAD_LINK}/${CLOUD_NAME}`,
};

const CloudinaryService = {
  upload: async (
    payload: any,
    type: TFile.UploadType
  ): Promise<IAPI.ApiResponse<IFile.FileItem> | unknown> => {
    try {
      const response = (await ApiUtils.fetchAPI(
        `${route.upload}/${type}/upload`,
        {
          body: payload,
        },
        true
      )) as Response;
      if (response.ok) {
        const data: IFile.FileItem = await response.json();
        return ApiUtils.Response.success(data);
      }
      return ApiUtils.Response.error(response);
    } catch (error) {
      return ApiUtils.Response.error(error);
    }
  },
  deleteImageByPublicId: async (
    publicId: string
  ): Promise<IAPI.ApiResponse<IAPI.BaseResponse> | unknown> => {
    try {
      const response = (await ApiUtils.fetchAPI(route.adminApi, {
        body: {
          publicId,
          api: "deleteImageByPublicId",
        },
      })) as Response;
      if (response.ok) {
        const data: IAPI.BaseResponse = await response.json();
        return ApiUtils.Response.success(data);
      }
      return ApiUtils.Response.error(response);
    } catch (error) {
      return ApiUtils.Response.error(error);
    }
  },
  searchAssetsByPublicIdPrefix: async (
    examId: string
  ): Promise<IAPI.ApiResponse<IFile.FileResponse> | unknown> => {
    try {
      const response = (await ApiUtils.fetchAPI(route.adminApi, {
        body: { examId, api: "searchAssetsByPublicIdPrefix" },
      })) as Response;
      if (response.ok) {
        const data: IFile.FileResponse = await response.json();
        return ApiUtils.Response.success(data);
      }
      return ApiUtils.Response.error(response);
    } catch (error) {
      return ApiUtils.Response.error(error);
    }
  },
};

export default CloudinaryService;
