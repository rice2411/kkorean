
import { Heading } from "@/components/Atoms";
import { Table } from "@/components/Organisms";


const GroupsPage = () => {
  return (
    <>
      <section className="antialiased mt-4">
        <Heading>Danh sách lớp</Heading>
        <Table.TableGroups />
      </section>
    </>
  );
};

export default GroupsPage;
