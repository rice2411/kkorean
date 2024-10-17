import { IAPI, IExam } from "@/interface";
import { FirebaseService } from "@/services";

const key = "exams";

const ExamsAPI = {
    getList: async (): Promise<
        IAPI.ApiResponse<IExam.BaseExam[]> | unknown
    > => {
        try {
            const response =
                (await FirebaseService.getDocuments<IExam.BaseExam>(
                    key
                )) as IAPI.ApiResponse<IExam.BaseExam[]>;
            return response.data || [];
        } catch (err) {
            console.log(err);
            return [];
        }
    },

    create: async (
        data: IExam.ExamRequest
    ): Promise<IAPI.ApiResponse<IExam.BaseExam> | unknown> => {
        try {
            const response =
                (await FirebaseService.createDocument<IExam.BaseExam>(
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
            const response =
                (await FirebaseService.updateDocument<IExam.BaseExam>(
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
            const response =
                (await FirebaseService.deleteDocument<IExam.BaseExam>(
                    key,
                    data
                )) as IAPI.ApiResponse<IExam.BaseExam>;

            return response.data || response.error;
        } catch (err) {
            console.log(err);
            return err as Error;
        }
    },
};

export default ExamsAPI;
