import { Modal } from "@/components/Organisms";

import { useModal } from "@/hooks";
import { UsersForm } from "../../Form";

function UsersModalCustom({ groups }) {
  const { handleModiferModalSuccess, handleModiferModalBlank, modalBlank } =
    useModal();

  return (
    <>
      <Modal.BlankModal>
        <UsersForm.UsersUpsertForm
          groups={groups}
          modalBlank={modalBlank}
          handleModiferModalSuccess={handleModiferModalSuccess}
          handleModiferModalBlank={handleModiferModalBlank}
        />
      </Modal.BlankModal>
    </>
  );
}

export default UsersModalCustom;
