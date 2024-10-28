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
import { FileHelpers } from "@/helpers";
import { ModalCustom } from "@/components/Organisms/";

// Định nghĩa kiểu cho props của LoginFormPresenter
interface LoginFormPresenterProps {
    data: {
        email: string;
        password: string;
    };
    error: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheck: () => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleForgotPass: () => void;
}

// Định nghĩa component LoginFormPresenter
const LoginFormPresenter: React.FC<LoginFormPresenterProps> = ({
    data,
    error,
    handleChange,
    handleCheck,
    handleSubmit,
    handleForgotPass,
}) => {
    // @ts-ignore
    const [isChecked, setIsChecked] = useState(false);
    const [togglePassword, setTogglePassword] = useState(false);

    return (
        <>
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
                <form
                    className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0"
                    onSubmit={handleSubmit}
                >
                    <Box className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <Heading level={3} className="font-bold">
                            Đăng nhập
                        </Heading>
                        {error && (
                            <Paragraph className="text-red-500">
                                {error}
                            </Paragraph>
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
                                    placeholder="admin"
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
                                    value={"1"}
                                />
                                <Paragraph
                                    onClick={handleForgotPass}
                                    className="text-sm font-medium  hover:underline text-blue-500 cursor-pointer"
                                >
                                    Quên mật khẩu
                                </Paragraph>
                            </Box>
                            <Button
                                variant={"primary"}
                                className="w-full"
                                onClick={() => {}}
                                disabled={!data.email || !data.password}
                                hover={!!data.email && !!data.password}
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
                </form>
            </Box>
            <ModalCustom.UpdatePasswordModalCustom />
        </>
    );
};

export default LoginFormPresenter;
