import { ExamDoingPage } from "@/components/Pages/Exam";
import { useEffect } from "react";
import NProgress from "nprogress";
function ExamDoing() {
  useEffect(() => {
    NProgress.done();
  }, []);
  return <ExamDoingPage />;
}

export default ExamDoing;
