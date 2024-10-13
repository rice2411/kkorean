import HTTP_STATUS_CODE from "./statusCode";

const Response = {
    success: (data, message = "OK", status = HTTP_STATUS_CODE.OK) => {
        return {
            data,
            message,
            status,
        };
    },
    error: (
        data,
        message = "Unkown Error",
        status = HTTP_STATUS_CODE.UNKNOW_ERROR
    ) => {
        return {
            error: data,
            message,
            status,
        };
    },
};

export default Response;
