import { IExam, IResult } from "@/interface";
import { EExamMode } from "@/constants/exam";
import ExamTemplateContainer from "./container";

interface Props {
  mode: EExamMode;
  exam: IExam.BaseExam;
  result?: IResult.BaseResult;
}

const ExamTemplate: React.FC<Props> = ({ mode, exam, result }) => {
  return <ExamTemplateContainer mode={mode} exam={exam} result={result} />;
};

export default ExamTemplate;
