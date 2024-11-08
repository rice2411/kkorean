import { DashboardPage } from "@/components/Pages";
import { useEffect } from "react";
import NProgress from "nprogress";
function Exams() {
  useEffect(() => {
    NProgress.done();
  }, []);
  return (
    <>
      <DashboardPage.ExamsPage />
    </>
  );
}

export default Exams;
