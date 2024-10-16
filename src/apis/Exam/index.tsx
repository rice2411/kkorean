import { IExam } from "@/interface";
import { FirebaseService } from "@/services";

const key = "exams";

const ExamsAPI = {
    getList: async (): Promise<IExam.BaseExam[]> => {
        try {
            const response = await FirebaseService.getDocuments<IExam.BaseExam>(
                key
            );
            return response.data || [];
        } catch (err) {
            console.log(err);
            return [];
        }
    },

    create: async (
        data: IExam.ExamRequest
    ): Promise<IExam.BaseExam | Error | string | undefined> => {
        try {
            const response =
                await FirebaseService.createDocument<IExam.BaseExam>(key, data);
            if (response.data) {
                return response.data;
            }
            if (response.error) {
                return response.error;
            }
        } catch (err) {
            console.log(err);
            return err as Error;
        }
    },

    update: async (
        data: IExam.BaseExam
    ): Promise<IExam.BaseExam | Error | string | undefined> => {
        try {
            const response =
                await FirebaseService.updateDocument<IExam.BaseExam>(key, data);
            if (response.data) {
                return response.data;
            }
            if (response.error) {
                return response.error;
            }
        } catch (err) {
            console.log(err);
            return err as Error;
        }
    },

    delete: async (
        data: IExam.BaseExam
    ): Promise<IExam.BaseExam | Error | string | undefined> => {
        try {
            const response =
                await FirebaseService.deleteDocument<IExam.BaseExam>(key, data);

            if (response.data) {
                return response.data;
            }
            if (response.error) {
                return response.error;
            }
        } catch (err) {
            console.log(err);
            return err as Error;
        }
    },
};

export default ExamsAPI;
