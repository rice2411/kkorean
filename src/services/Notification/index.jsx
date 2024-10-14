import firebaseService from "../Firebase";

const key = "notifications";

const NotificationService = {
    createNotification: async (data) => {
        try {
            const notificationData = {
                type: data.type,
                message: data.message,
                createdDate: Date.now(),
                isRead: false,
            };
            const response = await firebaseService.createDocument(
                key,
                notificationData
            );
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
    updateMultiple: async (data) => {
        try {
            const response = await firebaseService.updateMutilpleDocument(
                key,
                data
            );
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
};
export default NotificationService;
