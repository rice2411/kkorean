import { Heading } from "@/components/Atoms";
import { Table } from "@/components/Organisms";


const ExamsPage = () => {
  return (
    <>
      <section className="antialiased mt-4">
        <Heading>Danh sách bộ đề</Heading>
        <Table.TableExams  />
      </section>
    </>
  );
};

export default ExamsPage;
