import { Modal } from "@/components/Organisms";

import { useModal } from "@/hooks";
import { UsersForm } from "../../Form";
import { IContext, IGroup } from "@/interface";

interface Props {
    groups: IGroup.BaseGroup[];
}

const UsersModalCustom: React.FC<Props> = ({ groups }) => {
    const { handleModiferModalSuccess, handleModiferModalBlank, modalBlank } =
        useModal() as unknown as IContext.IModalContext.UseModalReturnType;

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
};

export default UsersModalCustom;
