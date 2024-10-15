import { FirebaseService } from "@/services";

const key = "exams";

const ExamsAPI = {
    getList: async () => {
        try {
            const response = await FirebaseService.getDocuments(key);

            if (response.data) {
                localStorage.setItem(key, JSON.stringify(response.data));
                return response.data;
            }
            if (response.error) {
                return response.error;
            }
        } catch (err) {
            return err;
        }
    },
    create: async (data) => {
        try {
            const response = await FirebaseService.createDocument(key, data);
            if (response.data) {
                return response;
            }
            if (response.error) {
                return response.error;
            }
        } catch (err) {
            return err;
        }
    },
    update: async (data) => {
        try {
            const response = await FirebaseService.updateDocument(key, data);
            if (response.data) {
                return response;
            }
            if (response.error) {
                return response.error;
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    delete: async (data) => {
        try {
            const response = await FirebaseService.deleteDocument(key, data);
            if (response.data) {
                return response.data;
            }
            if (response.error) {
                return response.error;
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },
};
export default ExamsAPI;
