import UsersUpsertFormContainer from "./container";

function UsersUpsertForm({
  groups,
  handleModiferModalSuccess,
  handleModiferModalBlank,
  modalBlank,
}) {
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
