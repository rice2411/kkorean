import firebaseService from "../Firebase";

const key = "users";

const UserService = {
    getList: async () => {
        try {
            const response = await firebaseService.getDocuments(key);

            if (response.data) {
                return response.data;
            }
            if (response.err) {
                return response.err;
            }
        } catch (err) {
            return err;
        }
    },
    create: async (user) => {
        try {
            const response = await firebaseService.register(user);
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
export default UserService;
