import React from "react";
import { MODAL_CONSTANTS } from "@/constants";
import { useModal } from "@/hooks";
import Toast from "@/utils/Toast";
import { GroupsAPI } from "@/apis";
import { useLoading } from "@/hooks";
import { useRevalidator } from "react-router-dom";
import TableGroupsPresenter from "./presenter";
import { IContext, IGroup } from "@/interface";

interface Props {
  groups: IGroup.BaseGroup[];
}

const TableGroupsContainer: React.FC<Props> = ({ groups }) => {
  const revalidator = useRevalidator();
  const { showLoading, hideLoading } =
    useLoading() as IContext.ILoadingContext.UseLoadingReturnType;
  const { handleModiferModalBlank, handleModiferModalConfirm } =
    useModal() as IContext.IModalContext.UseModalReturnType;

  //#region LOGIC FUNCTION
  const onCloseModalConfirm = () => {
    handleModiferModalConfirm({ isOpen: false });
  };

  const onDelete = async (group: IGroup.BaseGroup) => {
    try {
      showLoading();
      await GroupsAPI.delete(group);
      await revalidator.revalidate();
      onCloseModalConfirm();
      Toast.success(`Đã xoá thành công lớp ${group.name}`);
    } catch (err) {
      Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
      console.log(err);
    } finally {
      hideLoading();
    }
  };
  //#endregion

  //#region HANDLE FUNCTION

  const handleOpenModalModifier = (type: number, data?: IGroup.BaseGroup) => {
    handleModiferModalBlank({
      isOpen: true,
      title:
        type === MODAL_CONSTANTS.MODAL_TYPE.CREATE
          ? "Thêm lớp"
          : "Chỉnh sửa lớp",
      type: type,
      defaultData: data,
    });
  };

  const handleDeleteGroup = (group: IGroup.BaseGroup) => {
    handleModiferModalConfirm({
      isOpen: true,
      text: `Bạn có muốn xóa lớp <b>${group.name}</b>`,
      okButton: {
        text: "Xác nhận",
        onClick: () => {
          onDelete(group);
        },
      },
      cancelButton: {
        text: "Hủy",
        onClick: onCloseModalConfirm,
      },
    });
  };
  //#endregion

  return (
    <TableGroupsPresenter
      groups={groups}
      handleOpenModalModifier={handleOpenModalModifier}
      handleDeleteGroup={handleDeleteGroup}
    />
  );
};

export default TableGroupsContainer;
