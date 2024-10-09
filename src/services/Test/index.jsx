import firebaseService from "../Firebase";

const key = "tests";

const TestService = {
    getListCache: async () => {
        const list = JSON.parse(localStorage.getItem(key));
        if (!list) {
            const resposne = await TestService.getList();
            return resposne;
        }
        return list;
    },
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
    create: async (_class) => {
        try {
            const response = await firebaseService.createDocument(key, _class);
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
    update: async (user) => {
        try {
            const response = await firebaseService.updateDocument(key, user);
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
    delete: async (user) => {
        try {
            const response = await firebaseService.deleteDocument(key, user);
            if (response.data) {
                const res = await firebaseService.deleteAccount(user);
                if (res.data) {
                    return res.data;
                }
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
export default TestService;
