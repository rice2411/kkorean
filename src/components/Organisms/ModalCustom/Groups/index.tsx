import { Modal } from "@/components/Organisms";
import { GroupsForm } from "../../Form";
import { useModal } from "@/hooks";
import { IContext } from "@/interface";

const GroupsModalCustom: React.FC = () => {
  const { handleModiferModalSuccess, handleModiferModalBlank, modalBlank } =
    useModal() as unknown as IContext.IModalContext.UseModalReturnType;

  return (
    <Modal.BlankModal>
      <GroupsForm.GroupsUpsertForm
        handleModiferModalSuccess={handleModiferModalSuccess}
        handleModiferModalBlank={handleModiferModalBlank}
        modalBlank={modalBlank} // Assuming modalBlank follows the defined state interface
      />
    </Modal.BlankModal>
  );
};

export default GroupsModalCustom;
