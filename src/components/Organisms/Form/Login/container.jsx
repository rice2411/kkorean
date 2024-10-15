import React, { useState } from "react";

import { FirebaseService } from "@/services";
import Toast from "@/utils/Toast";
import { useLoading, useAuth } from "@/hooks";
import { NotificationsAPI } from "@/apis";
import { NOTIFICATION_CONSTANTS } from "@/constants";
import DateFNSUtils from "@/utils/DateFNS";
import LoginFormPresenter from "./presenter";
const LoginFormContainer = () => {
    const { showLoading, hideLoading } = useLoading();
    const { handleLogin } = useAuth();
    const [isChecked, setIsChecked] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    //#region HANDLE FUNCTION
    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    const handleChange = (e) => {
        setError("");
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async () => {
        if (!data.email || !data.password) return;
        try {
            showLoading();
            const res = await FirebaseService.login(data);
            if (res.data) {
                handleLogin(res.data);
                await NotificationsAPI.createNotification({
                    type: NOTIFICATION_CONSTANTS.NOTIFICATION_TYPE.LOGIN,
                    message: `Người dùng <b>${
                        res.data.email
                    }</b> đã <b>đăng nhập</b> vào hệ thống vào lúc ${DateFNSUtils.now()}`,
                });
                return;
            }
            if (res.error) {
                if (res.error.message.includes("user-disabled"))
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
