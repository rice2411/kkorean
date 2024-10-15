import { Modal } from "@/components/Organisms";
import { GroupsForm } from "../../Form";
import { useModal } from "@/hooks";

function GroupsModalCustom() {
  const { handleModiferModalSuccess, handleModiferModalBlank, modalBlank } =
    useModal();
  useModal();
  return (
    <>
      <Modal.BlankModal>
        <GroupsForm.GroupsUpsertForm
          handleModiferModalSuccess={handleModiferModalSuccess}
          handleModiferModalBlank={handleModiferModalBlank}
          modalBlank={modalBlank}
        />
      </Modal.BlankModal>
    </>
  );
}

export default GroupsModalCustom;
