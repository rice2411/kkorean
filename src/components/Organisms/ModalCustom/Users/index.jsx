import { Box, Input, Label, Select, Button, Svg } from "@/components/Atoms";
import { Modal } from "@/components/Organisms";
import { CONFIG_CONSTANTS, MODAL_CONSTANTS } from "@/constants";
import { FileHelpers } from "@/helpers";
import { useLoading } from "@/hooks";
import { useModal } from "@/hooks";
import { UserService } from "@/services";
import Toast from "@/utils/Toast";
import { useEffect, useState } from "react";
import { useRevalidator } from "react-router-dom";

const DEFAULT_USER_VALUE = {
    fullName: "",
    email: "",
    group: "default",
};

function UsersModalCustom({ groups }) {
    const revalidator = useRevalidator();
    const { handleModiferModalSuccess, handleModiferModalBlank, modalBlank } =
        useModal();
    const { showLoading, hideLoading } = useLoading();
    const [user, setUser] = useState(DEFAULT_USER_VALUE);
    const [groupOption, setGroupOption] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleContinue = () => {
        resetUserState();
        handleCancel();
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
        const textResult = `Tài khoản <b>${email}</b> đã được tạo với mật khẩu là <b>${CONFIG_CONSTANTS.DEFAULT_PASSWORD}</b>`;
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
                text: "Tiếp tục",
                onClick: handleContinue,
            },
            cancelButton: {
                text: "Hủy",
                onClick: handleCancel,
            },
        });
    };

    const onCreateOrUpdate = async (action) => {
        const emailParam = user.email + CONFIG_CONSTANTS.EMAIL_DOMAIN;
        const response =
            action === MODAL_CONSTANTS.MODAL_TYPE.CREATE
                ? await UserService.create({ ...user, email: emailParam })
                : await UserService.update({ ...user, email: emailParam });

        if (response.data) {
            action === MODAL_CONSTANTS.MODAL_TYPE.CREATE
                ? handleCreateResponse(user.email)
                : handleUpdateResponse(user.email);
        }
    };

    const handleSubmit = async () => {
        try {
            showLoading();
            const action =
                modalBlank.type === MODAL_CONSTANTS.MODAL_TYPE.CREATE
                    ? MODAL_CONSTANTS.MODAL_TYPE.CREATE
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
                groups?.map((item) => ({
                    label: item.name,
                    value: item.id,
                })) || [];
            setGroupOption(options);
        } catch (err) {
            Toast.error("Có lỗi xảy ra vui lòng thử lại sau");
            console.error(err);
        } finally {
            hideLoading();
        }
    };

    useEffect(() => {
        handleGetListOption();
    }, [groups]);

    useEffect(() => {
        const initialUserData =
            modalBlank.type === MODAL_CONSTANTS.MODAL_TYPE.CREATE
                ? DEFAULT_USER_VALUE
                : {
                      ...modalBlank.defaultData,
                      email: modalBlank.defaultData?.email.split("@")[0],
                      password: CONFIG_CONSTANTS.DEFAULT_PASSWORD,
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
                    <Box className="sm:col-span-2">
                        <Label htmlFor="email" text="Tài khoản" required />
                        <Input
                            disabled={
                                modalBlank.type ===
                                MODAL_CONSTANTS.MODAL_TYPE.UPDATE
                            }
                            type="text"
                            name="email"
                            placeholder="Tài khoản"
                            required
                            value={user.email}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        />
                    </Box>
                    <Box className="sm:col-span-2">
                        <Label htmlFor="group" text="Lớp" required />
                        <Select
                            id="group"
                            name="group"
                            value={user.group}
                            onChange={handleChange}
                            options={groupOption}
                            placeholder={"Vui lòng chọn"}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                        />
                    </Box>
                </Box>
                <Button
                    onClick={handleSubmit}
                    disabled={
                        !user.email ||
                        !user.fullName ||
                        user.group === "default"
                    }
                    className="w-full text-white bg-primary-700 hover:bg-primary-800 rounded-lg text-sm px-5 py-2.5"
                >
                    {modalBlank.type === MODAL_CONSTANTS.MODAL_TYPE.CREATE ? (
                        <>
                            <Svg
                                className="mr-1 -ml-1 w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                src={FileHelpers.getLocalFile("add", "path")}
                            ></Svg>
                            Tạo tài khoản
                        </>
                    ) : (
                        "Lưu"
                    )}
                </Button>
            </Modal.BlankModal>
        </>
    );
}

export default UsersModalCustom;
