import { IExam } from "@/interface";
import TableExamsContainer from "./container";

interface Props {
  exams: IExam.BaseExam[];
}

const TableExams: React.FC<Props> = ({ exams }) => {
  return <TableExamsContainer exams={exams} />;
};

export default TableExams;
