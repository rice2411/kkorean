import { IAPI, IResult } from "@/interface";
import { FirebaseService } from "@/services";

const key = "results";

const ResultsAPI = {
  get: async (
    id: string
  ): Promise<IAPI.ApiResponse<IResult.BaseResult> | unknown> => {
    try {
      const response =
        (await FirebaseService.getDocumentById<IResult.BaseResult>(
          key,
          id
        )) as IAPI.ApiResponse<IResult.BaseResult>;
      return response.data || null;
    } catch (err) {
      console.log(err);
      return [];
    }
  },

  getList: async (): Promise<
    IAPI.ApiResponse<IResult.BaseResult[]> | unknown
  > => {
    try {
      const response = (await FirebaseService.getDocuments(
        key
      )) as IAPI.ApiResponse<IResult.BaseResult[]>;
      if (response.data) {
        localStorage.setItem(key, JSON.stringify(response.data));
        return response.data;
      }
      return response.error || new Error("Failed to fetch the result list.");
    } catch (err) {
      console.error(err);
      return new Error("An error occurred while fetching the result list.");
    }
  },

  create: async (
    data: IResult.ResultRequest
  ): Promise<IAPI.ApiResponse<IResult.BaseResult> | unknown> => {
    try {
      const response = (await FirebaseService.createDocument(
        key,
        data
      )) as IAPI.ApiResponse<IResult.BaseResult>;
      return (
        response.data ||
        response.error ||
        new Error("Failed to create a result.")
      );
    } catch (err) {
      console.error(err);
      return new Error("An error occurred while creating a result.");
    }
  },

  update: async (
    data: IResult.BaseResult
  ): Promise<IAPI.ApiResponse<IResult.BaseResult> | unknown> => {
    try {
      const response = (await FirebaseService.updateDocument(
        key,
        data
      )) as IAPI.ApiResponse<IResult.BaseResult>;
      return (
        response.data ||
        response.error ||
        new Error("Failed to update the result.")
      );
    } catch (err) {
      console.error(err);
      return new Error("An error occurred while updating the result.");
    }
  },

  delete: async (
    data: IResult.BaseResult
  ): Promise<IAPI.ApiResponse<IResult.BaseResult> | unknown> => {
    try {
      const response = (await FirebaseService.deleteDocument(
        key,
        data
      )) as IAPI.ApiResponse<IResult.BaseResult>;
      if (response.data) {
        return (
          response.data ||
          response.error ||
          new Error("Failed to delete the account associated with the result.")
        );
      }
      return response.error || new Error("Failed to delete the result.");
    } catch (err) {
      console.error(err);
      return new Error("An error occurred while deleting the result.");
    }
  },
};

export default ResultsAPI;
