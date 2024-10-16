import { IAPI, IFile } from "@/interface";
import { CloudinaryService } from "@/services";
import { TFile } from "@/types";

const FilesAPI = {
  upload: async (
    fileName: string,
    file: File,
    type: TFile.UploadType = "image"
  ): Promise<IAPI.ApiResponse<IFile.FileItem> | unknown> => {
    const formData = new FormData();
    formData.append("public_id", fileName);
    formData.append("file", file);
    formData.append("upload_preset", "kkorean");
    try {
      const response = (await CloudinaryService.upload(
        formData,
        type
      )) as IAPI.ApiResponse<IFile.FileItem>;
      return (
        response.data ||
        new Error(response.error || "Unknown error occurred during upload.")
      );
    } catch (error) {
      return error as Error; // Ensure it's an Error type
    }
  },

  deleteImageByPublicId: async (
    publicId: string
  ): Promise<IAPI.ApiResponse<IAPI.BaseResponse> | unknown> => {
    try {
      const response = (await CloudinaryService.deleteImageByPublicId(
        publicId
      )) as IAPI.ApiResponse<IAPI.BaseResponse>;
      return (
        response.data ||
        new Error(response.error || "Unknown error occurred during deletion.")
      );
    } catch (error) {
      return error as Error;
    }
  },

  searchAssetsByPublicIdPrefix: async (
    examId: string
  ): Promise<IAPI.ApiResponse<IFile.FileResponse> | unknown> => {
    try {
      const response = (await CloudinaryService.searchAssetsByPublicIdPrefix(
        examId
      )) as IAPI.ApiResponse<IFile.FileResponse>;
      return (
        response.data ||
        new Error(response.error || "Unknown error occurred during upload.")
      );
    } catch (error) {
      return error as Error;
    }
  },
};

export default FilesAPI;
