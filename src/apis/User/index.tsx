import { IUser } from "@/interface";
import { FirebaseService } from "@/services";
import { ApiUtils } from "@/utils"; // Assuming you have a utils file for common utilities

const key = "users";

const UsersAPI = {
    getList: async (): Promise<
        IUser.DetailedUser[] | Error | string | undefined
    > => {
        try {
            const response =
                await FirebaseService.getDocuments<IUser.DetailedUser>(key);
            return (
                response.data ||
                response.error ||
                new Error("Failed to fetch user list.")
            );
        } catch (err) {
            console.error(err);
            return new Error("An error occurred while fetching the user list.");
        }
    },

    create: async (
        data: IUser.DetailedUser
    ): Promise<IUser.DetailedUser | Error | string | undefined> => {
        try {
            const response = await FirebaseService.register(data);
            return response.data || response.error;
        } catch (err) {
            console.error(err);
            return new Error("An error occurred while creating the user.");
        }
    },

    update: async (
        data: IUser.DetailedUser
    ): Promise<IUser.DetailedUser | Error | string | undefined> => {
        try {
            const response = await FirebaseService.updateDocument(key, data);
            return (
                response.data ||
                response.error ||
                new Error("Failed to update user.")
            );
        } catch (err) {
            console.error(err);
            return new Error("An error occurred while updating the user.");
        }
    },

    delete: async (data: IUser.DetailedUser): Promise<void> => {
        try {
            const request = [
                FirebaseService.deleteDocument(key, data),
                FirebaseService.deleteAccountByEmail(data),
            ];
            await Promise.all(request);
        } catch (err) {
            console.error(err);
            new Error("An error occurred while deleting the user.");
        }
    },

    resetAccountPassword: async (
        data: IUser.DetailedUser
    ): Promise<any | Error> => {
        try {
            const response = await FirebaseService.resetAccountPassword(data);
            return response.data
                ? ApiUtils.Response.success("Password reset successful.")
                : response.error || new Error("Failed to reset password.");
        } catch (err) {
            console.error(err);
            return new Error("An error occurred while resetting the password.");
        }
    },

    updateAccountStatus: async (
        data: IUser.DetailedUser,
        disabled: boolean
    ): Promise<any | Error> => {
        try {
            const response = await FirebaseService.updateAccountStatus(
                data,
                disabled
            );
            return response.data
                ? ApiUtils.Response.success(
                      "Account status updated successfully."
                  )
                : response.error ||
                      new Error("Failed to update account status.");
        } catch (err) {
            console.error(err);
            return new Error(
                "An error occurred while updating the account status."
            );
        }
    },
};

export default UsersAPI;
