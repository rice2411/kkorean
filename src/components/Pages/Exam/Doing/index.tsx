import { useLocation } from "react-router-dom";
import { IExam } from "@/interface";
import { EExamMode } from "@/constants/exam";
import { ExamTemplate } from "@/components/Templates";

function ExamDoingPage() {
  const location = useLocation();
  const exam = location.state as IExam.BaseExam;

  return <ExamTemplate mode={EExamMode.DOING} exam={exam} />;
}

export default ExamDoingPage;
