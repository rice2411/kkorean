import { Heading } from "@/components/Atoms";
import { Table } from "@/components/Organisms";
import { IExam } from "@/interface";
interface Props {
  exams: IExam.BaseExam[];
}

const ExamsPage: React.FC<Props> = ({ exams }) => {
  return (
    <>
      <section className="antialiased mt-4">
        <Heading>Danh sách bộ đề</Heading>
        <Table.TableExams exams={exams} />
      </section>
    </>
  );
};

export default ExamsPage;
