import { MODAL_CONSTANTS } from "@/constants";
import { useLoading } from "@/hooks";
import { GroupsAPI } from "@/apis";
import Toast from "@/utils/Toast";
import { useEffect, useState } from "react";
import { useRevalidator } from "react-router-dom";
import GroupsUpsertFormPresenter from "./presenter";
import { IContext, IGroup } from "@/interface";
import { Props } from "./props";

const GroupsUpsertFormContainer: React.FC<Props> = ({
  handleModiferModalSuccess,
  handleModiferModalBlank,
  modalBlank,
}) => {
  const revalidator = useRevalidator();
  const { showLoading, hideLoading } =
    useLoading() as unknown as IContext.ILoadingContext.UseLoadingReturnType;
  const [groupName, setGroupName] = useState<string>("");

  const onContinue = () => {
    handleModiferModalSuccess({ isOpen: false });
  };

  const onCancel = () => {
    handleModiferModalSuccess({ isOpen: false });
    handleModiferModalBlank({ isOpen: false });
  };

  const onCreate = async () => {
    const param: IGroup.GroupRequest = {
      name: groupName,
      members: 0,
    };
    const response = (await GroupsAPI.create(param)) as IGroup.BaseGroup;
    if (response.id) {
      const textResult = `Lớp <b>${param.name}</b> đã được tạo.`;
      handleModiferModalSuccess({
        isOpen: true,
        text: textResult,
        okButton: {
          text: "OK",
          onClick: onContinue,
        },
      });
    }
  };

  const onUpdate = async () => {
    const param: IGroup.BaseGroup = {
      ...(modalBlank.defaultData as IGroup.BaseGroup),
      name: groupName,
    };
    const response = (await GroupsAPI.update(param)) as IGroup.BaseGroup;
    if (response.id) {
      const textResult = `Lớp <b>${param.name}</b> đã được cập nhật.`;
      handleModiferModalSuccess({
        isOpen: true,
        text: textResult,
        okButton: {
          text: "OK",
          onClick: onCancel,
        },
        cancelButton: {
          text: "Hủy",
          onClick: onCancel,
        },
      });
    }
  };

  const handleSubmit = async () => {
    try {
      showLoading();
      modalBlank.type === MODAL_CONSTANTS.EModalType.CREATE
        ? await onCreate()
        : await onUpdate();
    } catch (err) {
      Toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
      console.log(err);
    } finally {
      revalidator.revalidate();
      hideLoading();
    }
  };

  useEffect(() => {
    setGroupName(
      modalBlank.type === MODAL_CONSTANTS.EModalType.CREATE
        ? ""
        : modalBlank?.defaultData?.name || ""
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
};

export default GroupsUpsertFormContainer;
