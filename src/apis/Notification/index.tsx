import { IAPI, INotification } from "@/interface";
import { FirebaseService } from "@/services";

const key = "notifications";

const NotificationsAPI = {
    createNotification: async (data: {
        type: number;
        message: string;
    }): Promise<IAPI.ApiResponse<INotification.BaseNotification> | unknown> => {
        try {
            const notificationData: Omit<INotification.BaseNotification, "id"> =
                {
                    type: data.type,
                    message: data.message,
                    createdDate: Date.now(),
                    isRead: false,
                };
            const response = (await FirebaseService.createDocument(
                key,
                notificationData
            )) as IAPI.ApiResponse<INotification.BaseNotification>;
            return response.data || response.error;
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
        IAPI.ApiResponse<INotification.BaseNotification[]> | unknown
    > => {
        try {
            const response =
                (await FirebaseService.updateMultipleDocuments<INotification.BaseNotification>(
                    key,
                    data
                )) as IAPI.ApiResponse<INotification.BaseNotification[]>;
            return response.data || response.error;
        } catch (err) {
            console.error(err);
            return new Error("An error occurred while updating notifications.");
        }
    },
};

export default NotificationsAPI;
