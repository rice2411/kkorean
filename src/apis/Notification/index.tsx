import { INotification } from "@/interface";
import { FirebaseService } from "@/services";

const key = "notifications";

const NotificationsAPI = {
    createNotification: async (data: {
        type: string;
        message: string;
    }): Promise<
        | INotification.BaseNotification
        | Omit<INotification.BaseNotification, "id">
        | Error
        | string
        | undefined
    > => {
        try {
            const notificationData: Omit<INotification.BaseNotification, "id"> =
                {
                    type: data.type,
                    message: data.message,
                    createdDate: Date.now(),
                    isRead: false,
                };
            const response = await FirebaseService.createDocument(
                key,
                notificationData
            );
            return (
                response.data ||
                response.error ||
                new Error("Failed to create notification.")
            );
        } catch (err) {
            console.error(err);
            return new Error(
                "An error occurred while creating a notification."
            );
        }
    },

    updateMultiple: async (
        data: INotification.BaseNotification[]
    ): Promise<
        INotification.BaseNotification[] | Error | string | undefined
    > => {
        try {
            const response =
                await FirebaseService.updateMultipleDocuments<INotification.BaseNotification>(
                    key,
                    data
                );
            return (
                response.data ||
                response.error ||
                new Error("Failed to update notifications.")
            );
        } catch (err) {
            console.error(err);
            return new Error("An error occurred while updating notifications.");
        }
    },
};

export default NotificationsAPI;
