import { Bounce, toast, ToastOptions } from "react-toastify";

const config: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
};

const ToastUtils = {
    success: (message: string): void => {
        toast.success(message, config);
    },
    error: (message: string): void => {
        toast.error(message, config);
    },
    warning: (message: string): void => {
        toast.warn(message, config);
    },
};

export default ToastUtils;
