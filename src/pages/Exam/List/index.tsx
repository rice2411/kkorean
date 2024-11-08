import { ExamListPage } from "@/components/Pages/Exam";
import { useEffect } from "react";
import NProgress from "nprogress";
function ExamList() {
  useEffect(() => {
    NProgress.done();
  }, []);
  return <ExamListPage />;
}

export default ExamList;
