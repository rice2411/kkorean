import { HTTP_CONSTANTS } from "@/constants";
import { IAPI } from "@/interface";

const ApiUtils = {
  fetchAPI: async (
    url: string,
    {
      body,
      method = "POST",
      headers = {
        "Content-Type": "application/json",
      },
    }: IAPI.ApiOptions = {},
    isFormData: boolean = false
  ): Promise<Response | Error> => {
    try {
      const requestOptions: RequestInit = {
        method,
        body: isFormData ? body : JSON.stringify(body),
        headers: isFormData ? undefined : headers,
      };

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (err) {
      return new Error(`API call failed: ${err}`);
    }
  },
  Response: {
    success: <T,>(
      data: T,
      message: string = "OK",
      status: number = HTTP_CONSTANTS.HTTP_STATUS_CODE.OK
    ): IAPI.ApiResponse<T> => {
      return {
        data,
        message,
        status,
      };
    },
    error: (
      data: any,
      message: string = "Unknown Error",
      status: number = HTTP_CONSTANTS.HTTP_STATUS_CODE.UNKNOW_ERROR
    ): IAPI.ApiResponse => {
      return {
        error: data,
        message,
        status,
      };
    },
  },
};

export default ApiUtils;
