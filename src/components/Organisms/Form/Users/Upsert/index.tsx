import UsersUpsertFormContainer from "./container";

interface Group {
    id: string;
    name: string;
    members: number;
}
interface User {
    fullName: string;
    email: string;
    group: string;
}

interface ModalBlank {
    type: string;
    defaultData: User;
}

interface UsersUpsertFormProps {
    groups: Group[];
    handleModiferModalSuccess: (value: {
        isOpen: boolean;
        text?: string;
        okButton?: any;
        cancelButton?: any;
    }) => void;
    handleModiferModalBlank: (value: { isOpen: boolean }) => void;
    modalBlank: ModalBlank;
}

function UsersUpsertForm({
    groups,
    handleModiferModalSuccess,
    handleModiferModalBlank,
    modalBlank,
}: UsersUpsertFormProps) {
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
