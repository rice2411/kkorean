import { Heading } from "@/components/Atoms";
import { Table } from "@/components/Organisms";

function ExamsPage({ exams }) {
  return (
    <>
      <section className="antialiased mt-4">
        <Heading>Danh sách bộ đề</Heading>
        <Table.TableExams exams={exams} />
      </section>
    </>
  );
}

export default ExamsPage;
