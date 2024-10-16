import { IAPI, IGroup } from "@/interface";
import { FirebaseService } from "@/services";

const key = "groups";

const GroupsAPI = {
  getListCache: async (
    cache: boolean = true
  ): Promise<IAPI.ApiResponse<IGroup.BaseGroup[]> | unknown> => {
    const list: IGroup.BaseGroup[] = JSON.parse(
      localStorage.getItem(key) || "[]"
    );
    if (!list.length || !cache) {
      return await GroupsAPI.getList();
    }
    return list;
  },

  getList: async (): Promise<
    IAPI.ApiResponse<IGroup.BaseGroup[]> | unknown
  > => {
    try {
      const response = (await FirebaseService.getDocuments(
        key
      )) as IAPI.ApiResponse<IGroup.BaseGroup[]>;
      if (response.data) {
        localStorage.setItem(key, JSON.stringify(response.data));
        return response.data;
      }
      return response.error || new Error("Failed to fetch the group list.");
    } catch (err) {
      console.error(err);
      return new Error("An error occurred while fetching the group list.");
    }
  },

  create: async (
    data: IGroup.GroupRequest
  ): Promise<IAPI.ApiResponse<IGroup.BaseGroup> | unknown> => {
    try {
      const response = (await FirebaseService.createDocument(
        key,
        data
      )) as IAPI.ApiResponse<IGroup.BaseGroup>;
      return (
        response.data ||
        response.error ||
        new Error("Failed to create a group.")
      );
    } catch (err) {
      console.error(err);
      return new Error("An error occurred while creating a group.");
    }
  },

  update: async (
    data: IGroup.BaseGroup
  ): Promise<IAPI.ApiResponse<IGroup.BaseGroup> | unknown> => {
    try {
      const response = (await FirebaseService.updateDocument(
        key,
        data
      )) as IAPI.ApiResponse<IGroup.BaseGroup>;
      return (
        response.data ||
        response.error ||
        new Error("Failed to update the group.")
      );
    } catch (err) {
      console.error(err);
      return new Error("An error occurred while updating the group.");
    }
  },

  delete: async (
    data: IGroup.BaseGroup
  ): Promise<IAPI.ApiResponse<IGroup.BaseGroup> | unknown> => {
    try {
      const response = (await FirebaseService.deleteDocument(
        key,
        data
      )) as IAPI.ApiResponse<IGroup.BaseGroup>;
      if (response.data) {
        return (
          response.data ||
          response.error ||
          new Error("Failed to delete the account associated with the group.")
        );
      }
      return response.error || new Error("Failed to delete the group.");
    } catch (err) {
      console.error(err);
      return new Error("An error occurred while deleting the group.");
    }
  },
};

export default GroupsAPI;
