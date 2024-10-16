import GroupsUpsertFormContainer from "./container";
import { Props } from "./props";

const GroupsUpsertForm: React.FC<Props> = ({
  handleModiferModalSuccess,
  handleModiferModalBlank,
  modalBlank,
}) => {
  return (
    <GroupsUpsertFormContainer
      handleModiferModalSuccess={handleModiferModalSuccess}
      handleModiferModalBlank={handleModiferModalBlank}
      modalBlank={modalBlank}
    />
  );
};

export default GroupsUpsertForm;
