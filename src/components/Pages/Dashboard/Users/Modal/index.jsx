import { Box, Input, Label, Select, Button } from "@/components/Atoms";
import { Modal } from "@/components/Organisms";
import { DEFAULT_PASSWORD, EMAIL_DOMAIN } from "@/constants/kkorean";
import MODAL_TYPE from "@/constants/modal";
import { useLoading } from "@/hooks";
import useModal from "@/hooks/useModal";
import { UserService } from "@/services";
import Toast from "@/utils/Toast";
import { useEffect, useState } from "react";
import { useRevalidator } from "react-router-dom";

const DEFAULT_USER_VALUE = {
    fullName: "",
    email: "",
    password: DEFAULT_PASSWORD,
    class: "default",
};

function UserModifierModal({ classes }) {
    const revalidator = useRevalidator();
    const { handleModiferModalSuccess, handleModiferModalBlank, modalBlank } =
        useModal();
    const { showLoading, hideLoading } = useLoading();
    const [user, setUser] = useState(DEFAULT_USER_VALUE);
    const [classOption, setClassOption] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleContinue = () => {
        resetUserState();
    };

    const handleCancel = () => {
        handleModiferModalSuccess({ isOpen: false });
        handleModiferModalBlank({ isOpen: false });
    };

    const resetUserState = () => {
        handleModiferModalSuccess({ isOpen: false });
        setUser(DEFAULT_USER_VALUE);
    };

    const handleCreateResponse = (email) => {
        const textResult = `Tài khoản <b>${email}</b> đã được tạo với mật khẩu là <b>${DEFAULT_USER_VALUE.password}</b>`;
        handleModiferModalSuccess({
            isOpen: true,
            text: textResult,
            okButton: {
                text: "Tiếp tục tạo",
                onClick: handleContinue,
            },
            cancelButton: {
                text: "Hủy",
                onClick: handleCancel,
            },
        });
    };

    const handleUpdateResponse = (email) => {
        const textResult = `Tài khoản <b>${email}</b> đã được cập nhật`;
        handleModiferModalSuccess({
            isOpen: true,
            text: textResult,
            okButton: {
                text: "Tiếp tục tạo",
                onClick: handleContinue,
            },
            cancelButton: {
                text: "Hủy",
                onClick: handleCancel,
            },
        });
    };

    const onCreateOrUpdate = async (action) => {
        const emailParam = user.email + EMAIL_DOMAIN;
        const response =
            action === MODAL_TYPE.CREATE
                ? await UserService.create({ ...user, email: emailParam })
                : await UserService.update({ ...user, email: emailParam });

        if (response.data) {
            action === MODAL_TYPE.CREATE
                ? handleCreateResponse(user.email)
                : handleUpdateResponse(user.email);
        }
    };

    const handleSubmit = async () => {
        try {
            showLoading();
            const action =
                modalBlank.type === MODAL_TYPE.CREATE
                    ? MODAL_TYPE.CREATE
                    : "update";
            await onCreateOrUpdate(action);
        } catch (err) {
            Toast.error("Có lỗi xảy ra vui lòng thử lại sau");
            console.error(err);
        } finally {
            revalidator.revalidate();
            hideLoading();
        }
    };

    const handleGetListOption = async () => {
        showLoading();
        try {
            const options =
                classes?.map((item) => ({
                    label: item.name,
                    value: item.id,
                })) || [];
            setClassOption(options);
        } catch (err) {
            Toast.error("Có lỗi xảy ra vui lòng thử lại sau");
            console.error(err);
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        handleGetListOption();
    }, [classes]);

    useEffect(() => {
        const initialUserData =
            modalBlank.type === MODAL_TYPE.CREATE
                ? DEFAULT_USER_VALUE
                : {
                      ...modalBlank.defaultData,
                      email: modalBlank.defaultData?.email.split("@")[0],
                      password: DEFAULT_PASSWORD,
                  };
        setUser(initialUserData);
    }, [modalBlank]);

    return (
        <>
            <Modal.BlankModal>
                <Box className="grid gap-4 mb-4 sm:grid-cols-2">
                    <Box className="sm:col-span-2">
                        <Label htmlFor="fullName" text="Họ và tên" required />
                        <Input
                            type="text"
                            name="fullName"
                            placeholder="Họ và tên"
                            required
                            value={user.fullName}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        />
                    </Box>
                    <Box>
                        <Label htmlFor="email" text="Tài khoản" required />
                        <Input
                            type="text"
                            name="email"
                            placeholder="Tài khoản"
                            required
                            value={user.email}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        />
                    </Box>
                    <Box>
                        <Label htmlFor="password" text="Mật khẩu" required />
                        <Input
                            type="text"
                            name="password"
                            value={user.password}
                            disabled
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        />
                    </Box>
                    <Box className="sm:col-span-2">
                        <Label htmlFor="class" text="Lớp" required />
                        <Select
                            id="class"
                            name="class"
                            value={user.class}
                            onChange={handleChange}
                            options={classOption}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        />
                    </Box>
                </Box>
                <Button
                    onClick={handleSubmit}
                    disabled={
                        !user.email ||
                        !user.fullName ||
                        user.class === "default"
                    }
                    className="w-full text-white bg-primary-700 hover:bg-primary-800 rounded-lg text-sm px-5 py-2.5"
                >
                    {modalBlank.type === MODAL_TYPE.CREATE ? (
                        <>
                            {" "}
                            <svg
                                className="mr-1 -ml-1 w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Tạo tài khoản
                        </>
                    ) : (
                        "Lưu"
                    )}
                </Button>
            </Modal.BlankModal>
            <Modal.SuccessModal />
        </>
    );
}

export default UserModifierModal;
