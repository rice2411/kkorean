import { HTTP_CONSTANTS } from "@/constants";

const HttpUtils = {
  Response: {
    success: (
      data,
      message = "OK",
      status = HTTP_CONSTANTS.HTTP_STATUS_CODE.OK
    ) => {
      return {
        data,
        message,
        status,
      };
    },
    error: (
      data,
      message = "Unkown Error",
      status = HTTP_CONSTANTS.HTTP_STATUS_CODE.UNKNOW_ERROR
    ) => {
      return {
        error: data,
        message,
        status,
      };
    },
  },
};

export default HttpUtils;
