import { Bounce, toast } from "react-toastify";

const config = {
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
  success: (mess) => {
    toast.success(mess, config);
  },
  error: (mess) => {
    toast.error(mess, config);
  },
  warning: (mess) => {
    toast.warn(mess, config);
  },
};

export default ToastUtils;
