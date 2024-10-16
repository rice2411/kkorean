import { MODAL_CONSTANTS, CONFIG_CONSTANTS } from "@/constants";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks";
import Toast from "@/utils/Toast";
import { GroupsAPI, UsersAPI } from "@/apis";
import { useRevalidator } from "react-router-dom";
import { useLoading } from "@/hooks";
import TableUsersPresenter from "./presenter";
import { IUser, IGroup } from "@/types"; // Adjust the path to your types accordingly

interface TableUsersContainerProps {
    users: IUser[];
}

const TableUsersContainer: React.FC<TableUsersContainerProps> = ({ users }) => {
    const revalidator = useRevalidator();
    const { showLoading, hideLoading } = useLoading();
    const {
        handleModiferModalBlank,
        handleModiferModalConfirm,
        handleModiferModalImportantConfirm,
    } = useModal();

    const [groups, setGroups] = useState<IGroup[]>([]);

    //#region LOGIC FUNCTION

    const onCloseModalConfirm = () => {
        handleModiferModalConfirm({ isOpen: false });
    };

    const onResetPassword = async (user: IUser) => {
        try {
            showLoading();
            const response = await UsersAPI.resetAccountPassword(user);
            if (response.data) {
                Toast.success(
                    `Đổi mật khẩu thành công, mật khẩu là ${CONFIG_CONSTANTS.DEFAULT_PASSWORD}`
                );
            }
        } catch (err) {
            console.log(err);
            Toast.error("Đã có lỗi xảy ra vui lòng thử lại");
        } finally {
            onCloseModalConfirm();
            hideLoading();
        }
    };

    const onUpdateAccountStatus = async (user: IUser) => {
        try {
            showLoading();
            const userUpdated = {
                ...user,
                isDisabled: user.isDisabled ? 0 : 1,
            };
            await UsersAPI.update(userUpdated);
            await UsersAPI.updateAccountStatus(
                user,
                userUpdated.isDisabled ? true : false
            );
            await revalidator.revalidate();
            Toast.success(
                `${
                    userUpdated.isDisabled ? "Vô hiệu hóa" : "Khôi phục"
                } thành công tài khoản ${user.email}`
            );
            onCloseModalConfirm();
        } catch (err) {
            Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
            console.log(err);
        } finally {
            hideLoading();
        }
    };

    const onGetClassList = async (cache = true) => {
        showLoading();
        try {
            const response = await GroupsAPI.getListCache(cache);
            setGroups(response);
            return response;
        } catch (err) {
            Toast.error("Có lỗi xảy ra vui lòng thử lại sau");
            console.log(err);
        } finally {
            hideLoading();
        }
    };

    const onDeleteAccount = async (user: IUser) => {
        try {
            const newGroups = await onGetClassList();
            const selectedGroup = newGroups.find(
                (item) => item.id === user.group
            );
            await UsersAPI.delete(user);
            await GroupsAPI.update({
                ...selectedGroup,
                members: selectedGroup.members - 1,
            });
            Toast.success(`Đã xóa thành công tài khoản ${user.email}`);
        } catch (err) {
            Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
            console.log(err);
        } finally {
            handleModiferModalImportantConfirm({
                isOpen: false,
                confirmData: "",
            });
            revalidator.revalidate();
            await onGetClassList(false);
            hideLoading();
        }
    };
    //#endregion

    //#region HANDLE FUNCTION
    const handleConfirmUpdateAccountStatus = (user: IUser) => {
        handleModiferModalConfirm({
            isOpen: true,
            text: `Bạn có muốn ${
                user.isDisabled ? "khôi phục" : "vô hiệu hóa "
            } tài khoản <b>${user.email}</b>`,
            okButton: {
                text: "Xác nhận",
                onClick: () => {
                    onUpdateAccountStatus(user);
                },
            },
            cancelButton: {
                text: "Hủy",
                onClick: onCloseModalConfirm,
            },
        });
    };

    const handleImportantConfirm = (user: IUser) => {
        handleModiferModalImportantConfirm({
            isOpen: true,
            text: `Bạn có muốn <b>xóa vĩnh viễn</b> tài khoản <b>${user.email}</b> <br/> <span class='text-sm'>Hành động này sẽ không khôi phục lại được</span>`,
            okButton: {
                text: "Xóa",
                onClick: () => {
                    onDeleteAccount(user);
                },
            },
            confirmData: "delete " + user.email.split("@")[0],
        });
    };

    const handleOpenModalUser = (type: string, data?: IUser) => {
        handleModiferModalBlank({
            isOpen: true,
            title:
                type === MODAL_CONSTANTS.MODAL_TYPE.CREATE
                    ? "Thêm tài khoản"
                    : "Chỉnh sửa tài khoản",
            type,
            defaultData: data,
        });
    };

    const handleConfirmResetPassword = (user: IUser) => {
        handleModiferModalConfirm({
            isOpen: true,
            text: `Bạn có muốn khôi phục mật khẩu cho tài khoản <b>${user.email}</b> không? Mật khẩu mặc định sẽ là <b>${CONFIG_CONSTANTS.DEFAULT_PASSWORD}<b>`,
            okButton: {
                text: "Xác nhận",
                onClick: () => {
                    onResetPassword(user);
                },
            },
            cancelButton: {
                text: "Hủy",
                onClick: onCloseModalConfirm,
            },
        });
    };
    //#endregion

    useEffect(() => {
        onGetClassList();
    }, []);

    return (
        <TableUsersPresenter
            users={users}
            groups={groups}
            handleConfirmUpdateAccountStatus={handleConfirmUpdateAccountStatus}
            handleImportantConfirm={handleImportantConfirm}
            handleOpenModalUser={handleOpenModalUser}
            handleConfirmResetPassword={handleConfirmResetPassword}
        />
    );
};

export default TableUsersContainer;
