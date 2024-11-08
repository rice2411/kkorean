import { IAPI, IExam } from "@/interface";
import { FirebaseService } from "@/services";

const key = "exams";

const ExamsAPI = {
  getListCache: async (
    cache: boolean = true
  ): Promise<IAPI.ApiResponse<IExam.BaseExam[]> | unknown> => {
    const list: IExam.BaseExam[] = JSON.parse(
      localStorage.getItem(key) || "[]"
    );
    if (!list.length || !cache) {
      return await ExamsAPI.getList();
    }
    return list;
  },

  getList: async (): Promise<IAPI.ApiResponse<IExam.BaseExam[]> | unknown> => {
    try {
      const response = (await FirebaseService.getDocuments(
        key
      )) as IAPI.ApiResponse<IExam.BaseExam[]>;
      if (response.data) {
        localStorage.setItem(key, JSON.stringify(response.data));
        return response.data;
      }
      return response.error || new Error("Failed to fetch the group list.");
    } catch (err) {
      console.error(err);
      return new Error("An error occurred while fetching the group list.");
    }
  },
  get: async (
    id: string
  ): Promise<IAPI.ApiResponse<IExam.BaseExam> | unknown> => {
    try {
      const response = (await FirebaseService.getDocumentById<IExam.BaseExam>(
        key,
        id
      )) as IAPI.ApiResponse<IExam.BaseExam>;
      return response.data || null;
    } catch (err) {
      console.log(err);
      return [];
    }
  },

  create: async (
    data: IExam.ExamRequest
  ): Promise<IAPI.ApiResponse<IExam.BaseExam> | unknown> => {
    try {
      const response = (await FirebaseService.createDocument<IExam.BaseExam>(
        key,
        data
      )) as IAPI.ApiResponse<IExam.BaseExam>;
      return response.data || response.error;
    } catch (err) {
      console.log(err);
      return err as Error;
    }
  },

  update: async (
    data: IExam.BaseExam
  ): Promise<IAPI.ApiResponse<IExam.BaseExam> | unknown> => {
    try {
      const response = (await FirebaseService.updateDocument<IExam.BaseExam>(
        key,
        data
      )) as IAPI.ApiResponse<IExam.BaseExam>;
      return response.data || response.error;
    } catch (err) {
      console.log(err);
      return err as Error;
    }
  },

  delete: async (
    data: IExam.BaseExam
  ): Promise<IAPI.ApiResponse<IExam.BaseExam> | unknown> => {
    try {
      const response = (await FirebaseService.deleteDocument<IExam.BaseExam>(
        key,
        data
      )) as IAPI.ApiResponse<IExam.BaseExam>;

      return response.data || response.error;
    } catch (err) {
      console.log(err);
      return err as Error;
    }
  },
  countDocuments: async (): Promise<IAPI.ApiResponse<number> | unknown> => {
    try {
      const response = (await FirebaseService.countDocuments(
        key
      )) as IAPI.ApiResponse;
      return response;
    } catch (err) {
      console.error(err);
      throw new Error("An error occurred while updating the account status.");
    }
  },
};

export default ExamsAPI;
