import { FirebaseService } from "@/services";

const key = "notifications";

const NotificationsAPI = {
    createNotification: async (data) => {
        try {
            const notificationData = {
                type: data.type,
                message: data.message,
                createdDate: Date.now(),
                isRead: false,
            };
            const response = await FirebaseService.createDocument(
                key,
                notificationData
            );
            if (response.data) {
                return response.data;
            }
            if (response.error) {
                return response.error;
            }
        } catch (err) {
            return err;
        }
    },
    updateMultiple: async (data) => {
        try {
            const response = await FirebaseService.updateMutilpleDocument(
                key,
                data
            );
            if (response.data) {
                return response.data;
            }
            if (response.error) {
                return response.error;
            }
        } catch (err) {
            return err;
        }
    },
};
export default NotificationsAPI;
