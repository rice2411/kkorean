import firebaseService from "../Firebase";

const key = "exams";

const ExamService = {
    getList: async () => {
        try {
            const response = await firebaseService.getDocuments(key);

            if (response.data) {
                localStorage.setItem(key, JSON.stringify(response.data));
                return response.data;
            }
            if (response.err) {
                return response.err;
            }
        } catch (err) {
            return err;
        }
    },
    create: async (data) => {
        try {
            const response = await firebaseService.createDocument(key, data);
            if (response.data) {
                return response;
            }
            if (response.err) {
                return response.err;
            }
        } catch (err) {
            return err;
        }
    },
    update: async (data) => {
        try {
            const response = await firebaseService.updateDocument(key, data);
            if (response.data) {
                return response;
            }
            if (response.err) {
                return response.err;
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    delete: async (data) => {
        try {
            const response = await firebaseService.deleteDocument(key, data);
            if (response.data) {
                return response.data;
            }
            if (response.err) {
                return response.err;
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },
};
export default ExamService;
