import { IGroup } from "@/interface";
import TableGroupsContainer from "./container";

interface Props {
  groups: IGroup.BaseGroup[];
}

const TableGroups: React.FC<Props> = ({ groups }) => {
  return <TableGroupsContainer groups={groups} />;
};

export default TableGroups;
