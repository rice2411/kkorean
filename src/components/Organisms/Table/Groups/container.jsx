import { MODAL_CONSTANTS } from "@/constants";
import { useModal } from "@/hooks";
import Toast from "@/utils/Toast";
import { GroupsAPI } from "@/apis";
import { useLoading } from "@/hooks";
import { useRevalidator } from "react-router-dom";
import TableGroupsPresenter from "./presenter";

function TableGroupsContainer({ groups }) {
    const revalidator = useRevalidator();
    const { showLoading, hideLoading } = useLoading();
    const { handleModiferModalBlank, handleModiferModalConfirm } = useModal();

    //#region LOGIC FUNCTION
    const onCloseModalConfirm = () => {
        handleModiferModalConfirm({ isOpen: false });
    };

    const onDelete = async (group) => {
        try {
            showLoading();
            await GroupsAPI.delete(group);
            await revalidator.revalidate();
            onCloseModalConfirm();
        } catch (err) {
            Toast.error("Đã có lỗi xảy ra vui lòng thử lại sau");
            console.log(err);
        } finally {
            hideLoading();
        }
    };
    //#endregion

    //#region HANDLE FUNCTION

    const handleOpenModalModifier = (type, data) => {
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
    const handleDeleteGroup = (group) => {
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
                onClick: handleClose,
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
}

export default TableGroupsContainer;
