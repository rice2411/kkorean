import { DashboardPage } from "@/components/Pages";
import { IExam } from "@/interface";
import { useLoaderData } from "react-router-dom";

function Exams() {
  const exams = useLoaderData() as IExam.BaseExam[];
  return (
    <>
      <DashboardPage.ExamsPage exams={exams} />
    </>
  );
}

export default Exams;
