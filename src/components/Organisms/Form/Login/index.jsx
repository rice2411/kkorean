import React, { useState } from "react";
import {
    Heading,
    Label,
    Input,
    Button,
    Checkbox,
    Link,
    Image,
    Paragraph,
    Box,
} from "@/components/Atoms";
import firebaseService from "@/services/Firebase";
import Toast from "@/utils/Toast";
import { useLoading, useAuth } from "@/hooks";
import { FileHelpers } from "@/helpers";
const LoginForm = () => {
    const { showLoading, hideLoading } = useLoading();
    const { handleLogin } = useAuth();
    const [isChecked, setIsChecked] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    const handleChange = (e) => {
        setError("");
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const onSubmit = async () => {
        if (!data.email || !data.password) return;
        try {
            showLoading();
            const res = await firebaseService.login(data);

            if (res.data) {
                handleLogin(res.data);
                return;
            }
            if (res.error) {
                console.log(res.error.message);
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

    return (
        <Box className="flex flex-col items-center justify-center h-screen lg:w-1/2 w-full px-2">
            <Link
                to="#"
                className="flex items-center mb-6 text-2xl font-semibold !text-gray-900 "
            >
                <Image
                    className="w-8 h-8 mr-2"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                    alt="logo"
                />
                KKorean
            </Link>
            <Box className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <Box className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <Heading level={3} className="font-bold">
                        Đăng nhập
                    </Heading>
                    {error && (
                        <Paragraph className="text-red-500">{error}</Paragraph>
                    )}
                    <Box className="space-y-4 md:space-y-6">
                        <Box>
                            <Label
                                text="Tên đăng nhập"
                                htmlFor="email"
                                required={true}
                            />
                            <Input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="admin@kkorean.com"
                                value={data.email}
                                onChange={handleChange}
                                status={error ? "error" : "default"}
                            />
                        </Box>
                        <Box>
                            <Label
                                text="Mật khẩu"
                                htmlFor="password"
                                required={true}
                            />
                            <Input
                                type={togglePassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={handleChange}
                                icon={
                                    togglePassword
                                        ? FileHelpers.getLocalFile(
                                              "close-eye",
                                              "svg"
                                          )
                                        : FileHelpers.getLocalFile(
                                              "open-eye",
                                              "svg"
                                          )
                                }
                                iconPosition="right"
                                onIconClick={() => {
                                    setTogglePassword((state) => !state);
                                }}
                                status={error ? "error" : "default"}
                            />
                        </Box>
                        <Box className="flex items-center justify-between">
                            <Checkbox
                                label="Ghi nhớ đăng nhập"
                                checked={isChecked}
                                onChange={handleCheck}
                            />
                            <Paragraph
                                onClick={handleForgotPass}
                                className="text-sm font-medium  hover:underline text-blue-500 cursor-pointer"
                            >
                                Quên mật khẩu
                            </Paragraph>
                        </Box>
                        <Button
                            type="button"
                            variant={"primary"}
                            className="w-full"
                            onClick={onSubmit}
                            disabled={!data.email || !data.password}
                            hover={data.email && data.password}
                        >
                            Đăng nhập
                        </Button>
                        <Box className="flex justify-between">
                            <Paragraph className="text-sm font-light text-gray-500">
                                Liên hệ với admin để được cấp tài khoản
                            </Paragraph>
                            <Link to="/" className="text-sm font-light ">
                                Quay về trang chủ
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginForm;
