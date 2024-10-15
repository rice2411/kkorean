import { CloudinaryService } from "@/services";

const FilesAPI = {
    upload: async (fileName, file, type = "image") => {
        const formData = new FormData();
        formData.append("public_id", fileName);
        formData.append("file", file);
        formData.append("upload_preset", "kkorean");
        try {
            const response = await CloudinaryService.upload(formData, type);
            if (response.data) {
                return response.data;
            }
            if (response.error) {
                return response.error;
            }
        } catch (error) {
            return error;
        }
    },
    deleteImageByPublicId: async (publicId) => {
        try {
            const response = await CloudinaryService.deleteImageByPublicId(
                publicId
            );
            if (response.data) {
                return response.data;
            }
            if (response.error) {
                return response.error;
            }
        } catch (error) {
            return error;
        }
    },
    searchAssetsByPublicIdPrefix: async (examId) => {
        try {
            const response =
                await CloudinaryService.searchAssetsByPublicIdPrefix(examId);
            if (response.data) {
                return response.data;
            }
            if (response.error) {
                return response.error;
            }
        } catch (error) {
            return error;
        }
    },
};
export default FilesAPI;
