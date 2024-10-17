import { MODAL_CONSTANTS, CONFIG_CONSTANTS } from "@/constants";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks";
import Toast from "@/utils/Toast";
import { GroupsAPI, UsersAPI } from "@/apis";
import { useRevalidator } from "react-router-dom";
import { useLoading } from "@/hooks";
import TableUsersPresenter from "./presenter";
import { IUser, IGroup, IContext } from "@/interface";
import { ContainerProps } from "./props";

const TableUsersContainer: React.FC<ContainerProps> = ({ users }) => {
  const revalidator = useRevalidator();
  const { showLoading, hideLoading } =
    useLoading() as unknown as IContext.ILoadingContext.UseLoadingReturnType;
  const {
    handleModiferModalBlank,
    handleModiferModalConfirm,
    handleModiferModalImportantConfirm,
  } = useModal() as unknown as IContext.IModalContext.UseModalReturnType;

  const [groups, setGroups] = useState<IGroup.BaseGroup[]>([]);

  //#region LOGIC FUNCTION

  const onCloseModalConfirm = () => {
    handleModiferModalConfirm({ isOpen: false });
  };

  const onResetPassword = async (user: IUser.DetailedUser) => {
    try {
      showLoading();
      const response = (await UsersAPI.resetAccountPassword(
        user
      )) as IUser.DetailedUser;
      if (response.id) {
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

  const onUpdateAccountStatus = async (user: IUser.DetailedUser) => {
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
      const response = (await GroupsAPI.getListCache(
        cache
      )) as IGroup.BaseGroup[];
      setGroups(response);
      return response;
    } catch (err) {
      Toast.error("Có lỗi xảy ra vui lòng thử lại sau");
      console.log(err);
    } finally {
      hideLoading();
    }
  };

  const onDeleteAccount = async (user: IUser.DetailedUser) => {
    try {
      const newGroups = (await onGetClassList()) as IGroup.BaseGroup[];
      const selectedGroup = newGroups.find(
        (item) => item.id === user.group
      ) as IGroup.BaseGroup;
      await UsersAPI.delete(user);
      await GroupsAPI.update({
        ...selectedGroup,
        members: selectedGroup.members - 1,
      } as IGroup.BaseGroup);
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
  const handleConfirmUpdateAccountStatus = (user: IUser.DetailedUser) => {
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

  const handleImportantConfirm = (user: IUser.DetailedUser) => {
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

  const handleOpenModalUser = (type: number, data?: IUser.DetailedUser) => {
    handleModiferModalBlank({
      isOpen: true,
      title:
        type === MODAL_CONSTANTS.EModalType.CREATE
          ? "Thêm tài khoản"
          : "Chỉnh sửa tài khoản",
      type,
      defaultData: data,
    });
  };

  const handleConfirmResetPassword = (user: IUser.DetailedUser) => {
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
