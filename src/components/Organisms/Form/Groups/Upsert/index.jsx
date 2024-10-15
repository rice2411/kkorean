import GroupsUpsertFormContainer from "./container";

function GroupsUpsertForm({
  handleModiferModalSuccess,
  handleModiferModalBlank,
  modalBlank,
}) {
  return (
    <GroupsUpsertFormContainer
      handleModiferModalSuccess={handleModiferModalSuccess}
      handleModiferModalBlank={handleModiferModalBlank}
      modalBlank={modalBlank}
    />
  );
}

export default GroupsUpsertForm;
