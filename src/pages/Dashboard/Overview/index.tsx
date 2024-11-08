import { DashboardPage } from "@/components/Pages";
import { useEffect } from "react";
import NProgress from "nprogress";
function Overview() {
  useEffect(() => {
    NProgress.done();
  }, []);
  return <DashboardPage.OverviewPage />;
}

export default Overview;
