import { CONFIG_CONSTANTS, MODAL_CONSTANTS } from "@/constants";
import { useLoading } from "@/hooks";
import { GroupsAPI, UsersAPI } from "@/apis";
import Toast from "@/utils/Toast";
import { useEffect, useState } from "react";
import { useRevalidator } from "react-router-dom";
import UsersUpsertFormPresenter from "./presenter";

interface User {
    fullName: string;
    email: string;
    group: string;
}

interface Group {
    id: string;
    name: string;
    members: number;
}

interface ModalBlank {
    type: string;
    defaultData: User;
}

interface UsersUpsertFormContainerProps {
    groups: Group[];
    handleModiferModalSuccess: (value: {
        isOpen: boolean;
        text?: string;
        okButton?: any;
        cancelButton?: any;
    }) => void;
    handleModiferModalBlank: (value: { isOpen: boolean }) => void;
    modalBlank: ModalBlank;
}

const DEFAULT_USER_VALUE: User = {
    fullName: "",
    email: "",
    group: "default",
};

function UsersUpsertFormContainer({
    groups,
    handleModiferModalSuccess,
    handleModiferModalBlank,
    modalBlank,
}: UsersUpsertFormContainerProps) {
    const revalidator = useRevalidator();
    const { showLoading, hideLoading } = useLoading();
    const [user, setUser] = useState<User>(DEFAULT_USER_VALUE);
    const [groupOption, setGroupOption] = useState<
        { label: string; value: string }[]
    >([]);

    //#region LOGIC FUNCTION
    const onContinue = () => {
        onResetUserState();
        onCancel();
    };

    const onCancel = () => {
        handleModiferModalSuccess({ isOpen: false });
        handleModiferModalBlank({ isOpen: false });
    };

    const onResetUserState = () => {
        handleModiferModalSuccess({ isOpen: false });
        setUser(DEFAULT_USER_VALUE);
    };

    const onCreateResponse = (email: string) => {
        const textResult = `Tài khoản <b>${email}</b> đã được tạo với mật khẩu là <b>${CONFIG_CONSTANTS.DEFAULT_PASSWORD}</b>`;
        handleModiferModalSuccess({
            isOpen: true,
            text: textResult,
            okButton: {
                text: "Tiếp tục tạo",
                onClick: onContinue,
            },
            cancelButton: {
                text: "Hủy",
                onClick: onCancel,
            },
        });
    };

    const onUpdateResponse = (email: string) => {
        const textResult = `Tài khoản <b>${email}</b> đã được cập nhật`;
        handleModiferModalSuccess({
            isOpen: true,
            text: textResult,
            okButton: {
                text: "Tiếp tục",
                onClick: onContinue,
            },
            cancelButton: {
                text: "Hủy",
                onClick: onCancel,
            },
        });
    };

    const onUpsert = async (action: string) => {
        const emailParam = user.email + CONFIG_CONSTANTS.EMAIL_DOMAIN;
        const response =
            action === MODAL_CONSTANTS.MODAL_TYPE.CREATE
                ? await UsersAPI.create({ ...user, email: emailParam })
                : await UsersAPI.update({ ...user, email: emailParam });
        if (response.data) {
            if (action === MODAL_CONSTANTS.MODAL_TYPE.CREATE) {
                const selectedGroup = groups.find(
                    (item) => item.id === user.group
                );
                if (selectedGroup) {
                    await GroupsAPI.update({
                        ...selectedGroup,
                        members: selectedGroup.members + 1,
                    });
                }
                onCreateResponse(user.email);
            } else {
                onUpdateResponse(user.email);
            }
        }
        await GroupsAPI.getListCache(false);
    };

    const onGetListOption = async () => {
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
    //#endregion

    //#region HANDLE FUNCTION
    const handleSubmit = async () => {
        try {
            showLoading();
            const action =
                modalBlank.type === MODAL_CONSTANTS.MODAL_TYPE.CREATE
                    ? MODAL_CONSTANTS.MODAL_TYPE.CREATE
                    : "update";
            await onUpsert(action);
        } catch (err) {
            Toast.error("Có lỗi xảy ra vui lòng thử lại sau");
            console.error(err);
        } finally {
            revalidator.revalidate();
            hideLoading();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
    //#endregion

    useEffect(() => {
        onGetListOption();
    }, [groups]);

    useEffect(() => {
        const initialUserData: User =
            modalBlank.type === MODAL_CONSTANTS.MODAL_TYPE.CREATE
                ? DEFAULT_USER_VALUE
                : {
                      ...modalBlank.defaultData,
                      email: modalBlank.defaultData?.email.split("@")[0],
                  };
        setUser(initialUserData);
    }, [modalBlank]);

    return (
        <UsersUpsertFormPresenter
            user={user}
            modalBlank={modalBlank}
            groupOption={groupOption}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
        />
    );
}

export default UsersUpsertFormContainer;
