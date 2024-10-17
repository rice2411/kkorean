import React, { useEffect, useState } from "react";
import Toast from "@/utils/Toast";
import { useLoading, useModal } from "@/hooks";
import { IAPI, IContext } from "@/interface";
import UpdatePasswordFormPresenter from "./presenter";
import { useNavigate, useRevalidator } from "react-router-dom";
import AuthService from "@/services/Firebase/authService";

// Định nghĩa kiểu cho dữ liệu đăng nhập

const UpdatePasswordFormContainer: React.FC = () => {
    const DEFAULT_LOGIN_USER_VALUE = {
        newPassword: "",
        confirmPassword: "",
      };
const { modalBlank } = useModal() as IContext.IModalContext.UseModalReturnType;
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading() as IContext.ILoadingContext.UseLoadingReturnType;
  const [data, setData] = useState(DEFAULT_LOGIN_USER_VALUE);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setData((prevUser) => ({ ...prevUser, [name]: value }));
  };
  
  const handleSubmit = async () => {
    try {
        showLoading();
        const response = await AuthService.updatePasswordUser(data?.newPassword) as IAPI.ApiResponse<{isSuccess: boolean}>;
        if(response?.data?.isSuccess) navigate("/")
        else Toast.error("Có lỗi xảy ra vui lòng thử lại sau");
    } catch (err) {
        Toast.error("Có lỗi xảy ra vui lòng thử lại sau");
        console.error(err);
    } finally {
        revalidator.revalidate();
        hideLoading();
    }
  }
  useEffect(() => {
    const initialUserData = DEFAULT_LOGIN_USER_VALUE;
    setData(initialUserData);
  }, [modalBlank]);
    //#endregion

    return (
        <UpdatePasswordFormPresenter
            data={data}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    );
};

export default UpdatePasswordFormContainer;
