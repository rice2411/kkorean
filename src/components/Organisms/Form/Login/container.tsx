import React, { useState } from "react";
import { FirebaseService } from "@/services";
import Toast from "@/utils/Toast";
import { useLoading, useAuth, useModal } from "@/hooks";
import { NotificationsAPI } from "@/apis";
import { MODAL_CONSTANTS, NOTIFICATION_CONSTANTS } from "@/constants";
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
    const { handleModiferModalBlank } = useModal() as unknown as IContext.IModalContext.UseModalReturnType;
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

  const handleSubmit = async () => {
    if (!data.email || !data.password) return;

        try {
            showLoading();
            const res = (await FirebaseService.login(
                data
            )) as unknown as IAPI.ApiResponse<IUser.BaseUser>;
            if (res.data) {
                const user = res.data as IUser.BaseUser;
                handleLogin(user);
                if(res?.data?.isFirstTimeLogin) handleShowPopupResetPassword();
                await NotificationsAPI.createNotification({
                    type: NOTIFICATION_CONSTANTS.NOTIFICATION_TYPE.LOGIN,
                    message: `Người dùng <b>${
                        res.data.email
                    }</b> đã <b>đăng nhập</b> vào hệ thống vào lúc ${DateFNSUtils.now()}`,
                });
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
            Toast.error(
                "Lỗi không xác định vui lòng liên hệ admin để khắc phục"
            );
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
            type: MODAL_CONSTANTS.MODAL_TYPE.UPDATE,
            defaultData: null,
        });
    }
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
