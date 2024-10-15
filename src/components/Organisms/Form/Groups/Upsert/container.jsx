import { MODAL_CONSTANTS } from "@/constants";
import { useLoading } from "@/hooks";
import { GroupsAPI } from "@/apis";
import Toast from "@/utils/Toast";
import { useEffect, useState } from "react";
import { useRevalidator } from "react-router-dom";
import GroupsUpsertFormPresenter from "./presenter";

function GroupsUpsertFormContainer({
  handleModiferModalSuccess,
  handleModiferModalBlank,
  modalBlank,
}) {
  const revalidator = useRevalidator();

  const { showLoading, hideLoading } = useLoading();
  const [groupName, setGroupName] = useState("");

  const onContinue = () => {
    handleModiferModalSuccess({ isOpen: false });
  };

  const onCancel = () => {
    handleModiferModalSuccess({ isOpen: false });
    handleModiferModalBlank({ isOpen: false });
  };

  const onCreate = async () => {
    const param = {
      name: groupName,
      members: 0,
    };
    const response = await GroupsAPI.create(param);
    if (response.data) {
      const textResult = `Lớp <b>${param.name}</b> đã được tạo.`;
      handleModiferModalSuccess({
        isOpen: true,
        text: textResult,
        okButton: {
          text: "Tiếp tục tạo",
          onClick: onContinue,
        },
        cancelButton: {
          text: "Hủy ",
          onClick: onCancel,
        },
      });
    }
  };

  const onUpdate = async () => {
    const param = {
      ...modalBlank.defaultData,
      name: groupName,
    };
    const response = await GroupsAPI.update(param);
    if (response.data) {
      const textResult = `Lớp <b>${param.name}</b> đã được cập nhật.`;
      handleModiferModalSuccess({
        isOpen: true,
        text: textResult,
        okButton: {
          text: "OK",
          onClick: onCancel,
        },
        cancelButton: {
          text: "Hủy ",
          onClick: onCancel,
        },
      });
    }
  };

  const handleSubmit = async () => {
    try {
      showLoading();
      modalBlank.type === MODAL_CONSTANTS.MODAL_TYPE.CREATE
        ? await onCreate()
        : await onUpdate();
    } catch (err) {
      Toast.error("Có lỗi xảy ra vui lòng thử lại sau");
      console.log(err);
    } finally {
      revalidator.revalidate();
      hideLoading();
    }
  };

  useEffect(() => {
    setGroupName(
      modalBlank.type === MODAL_CONSTANTS.MODAL_TYPE.CREATE
        ? ""
        : modalBlank?.defaultData?.name
    );
  }, [modalBlank]);

  return (
    <GroupsUpsertFormPresenter
      handleSubmit={handleSubmit}
      setGroupName={setGroupName}
      groupName={groupName}
      modalBlank={modalBlank}
    />
  );
}

export default GroupsUpsertFormContainer;
