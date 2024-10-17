import UsersUpsertFormContainer from "./container";
import { ContainerProps } from "./props";

function UsersUpsertForm({
    groups,
    modalBlank,
    handleModiferModalSuccess,
    handleModiferModalBlank,
}: ContainerProps) {
    return (
        <UsersUpsertFormContainer
            groups={groups}
            modalBlank={modalBlank}
            handleModiferModalSuccess={handleModiferModalSuccess}
            handleModiferModalBlank={handleModiferModalBlank}
        />
    );
}

export default UsersUpsertForm;
