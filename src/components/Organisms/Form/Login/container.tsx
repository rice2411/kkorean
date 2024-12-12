import React, { useState } from "react";
import { FirebaseService } from "@/services";
import Toast from "@/utils/Toast";
import { useLoading, useAuth, useModal } from "@/hooks";
import { NotificationsAPI } from "@/apis";
import {
  CONFIG_CONSTANTS,
  MODAL_CONSTANTS,
  NOTIFICATION_CONSTANTS,
} from "@/constants";
import DateFNSUtils from "@/utils/DateFNS";
import LoginFormPresenter from "./presenter";
import { IAPI, IContext, IUser } from "@/interface";

// Định nghĩa kiểu cho dữ liệu đăng nhập
interface ILoginData {
  email: string;
  password: string;
}

const LoginFormContainer: React.FC = () => {
  const { showLoading, hideLoading } =
    useLoading() as unknown as IContext.ILoadingContext.UseLoadingReturnType;
  const { handleLogin } =
    useAuth() as unknown as IContext.IAuthContenxt.UseAuthReturnType;
  const { handleModiferModalBlank } =
    useModal() as unknown as IContext.IModalContext.UseModalReturnType;
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [data, setData] = useState<ILoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  //#region HANDLE FUNCTION
  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      showLoading();
      const res: any = null;
      if (res.data) {
        return;
      }
      if (res.error) {
        //@ts-ignore
        if (res?.error?.message?.includes("user-disabled"))
          setError("Tài khoản bị khóa vui lòng liên hệ admin");
        else {
          setError("Thông tin đăng nhập không đúng");
        }
      }
    } catch (err) {
      console.log(err);
      Toast.error("Lỗi không xác định vui lòng liên hệ admin để khắc phục");
    } finally {
      hideLoading();
    }
  };

  const handleForgotPass = () => {
    Toast.warning("Vui lòng liên hệ admin để lấy lại mật khẩu");
  };

  const handleShowPopupResetPassword = () => {
    handleModiferModalBlank({
      isOpen: true,
      title: "Thay đổi mật khẩu",
      type: MODAL_CONSTANTS.EModalType.UPDATE,
      defaultData: null,
    });
  };
  //#endregion

  return (
    <LoginFormPresenter
      data={data}
      error={error}
      handleChange={handleChange}
      handleCheck={handleCheck}
      handleSubmit={handleSubmit}
      handleForgotPass={handleForgotPass}
    />
  );
};

export default LoginFormContainer;
