import ExamResultPage from "@/components/Pages/Exam/Result";
import { useEffect } from "react";
import NProgress from "nprogress";
function ExamResult() {
  useEffect(() => {
    NProgress.done();
  }, []);
  return <ExamResultPage />;
}

export default ExamResult;
