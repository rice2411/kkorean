import { IAPI, IUser } from "@/interface";
import { FirebaseService } from "@/services";
import { ApiUtils } from "@/utils";

const key = "users";

const UsersAPI = {
  getList: async (): Promise<
    IAPI.ApiResponse<IUser.DetailedUser[]> | unknown
  > => {
    try {
      const response = (await FirebaseService.getDocuments<
        IUser.DetailedUser[]
      >(key)) as IAPI.ApiResponse<IUser.DetailedUser[]>;
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
    data: IUser.UserRequest
  ): Promise<IAPI.ApiResponse<IUser.DetailedUser> | unknown> => {
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
  ): Promise<IAPI.ApiResponse<IUser.DetailedUser> | unknown> => {
    try {
      const response = (await FirebaseService.updateDocument(
        key,
        data
      )) as IAPI.ApiResponse<IUser.DetailedUser>;
      return (
        response.data || response.error || new Error("Failed to update user.")
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
  ): Promise<IAPI.ApiResponse<IAPI.BaseResponse> | unknown> => {
    try {
      const response = (await FirebaseService.resetAccountPassword(
        data
      )) as IAPI.ApiResponse<IAPI.BaseResponse>;
      return response.data
        ? ApiUtils.Response.success("Password reset successful.")
        : response.error || new Error("Failed to reset password.");
    } catch (err) {
      console.error(err);
      throw new Error("An error occurred while resetting the password.");
    }
  },

  updateAccountStatus: async (
    data: IUser.DetailedUser,
    disabled: boolean
  ): Promise<IAPI.ApiResponse<IAPI.BaseResponse> | unknown> => {
    try {
      const response = await FirebaseService.updateAccountStatus(
        data,
        disabled
      );
      return response.data || response.error;
    } catch (err) {
      console.error(err);
      throw new Error("An error occurred while updating the account status.");
    }
  },

  updatePassword: async (
    newPassword: string
  ): Promise<IAPI.ApiResponse<IAPI.BaseResponse> | unknown> => {
    try {
      const response = (await FirebaseService.updatePasswordUser(
        newPassword
      )) as IAPI.ApiResponse;
      return response;
    } catch (err) {
      console.error(err);
      throw new Error("An error occurred while updating the account status.");
    }
  },

  updateUserAttribute: async <T extends object>(
    dataUpdate: T & { id: string }
  ): Promise<IAPI.ApiResponse<IAPI.BaseResponse> | unknown> => {
    try {
      const response = (await FirebaseService.updateDocument(
        "users",
        dataUpdate
      )) as IAPI.ApiResponse;
      return response;
    } catch (err) {
      console.error(err);
      throw new Error("An error occurred while updating the account status.");
    }
  },

  countDocuments: async (): Promise<IAPI.ApiResponse<number> | unknown> => {
    try {
      const response = (await FirebaseService.countDocuments(
        key
      )) as IAPI.ApiResponse;
      return response;
    } catch (err) {
      console.error(err);
      throw new Error("An error occurred while updating the account status.");
    }
  },
};

export default UsersAPI;
