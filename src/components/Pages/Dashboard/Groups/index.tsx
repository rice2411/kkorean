import { Heading } from "@/components/Atoms";
import { Table } from "@/components/Organisms";
import { IGroup } from "@/interface";

interface Props {
  groups: IGroup.BaseGroup[];
}

const GroupsPage: React.FC<Props> = ({ groups }) => {
  return (
    <>
      <section className="antialiased mt-4">
        <Heading>Danh sách lớp</Heading>
        <Table.TableGroups groups={groups} />
      </section>
    </>
  );
};

export default GroupsPage;
