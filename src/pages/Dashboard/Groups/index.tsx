import { DashboardPage } from "@/components/Pages";
import { useEffect } from "react";
import NProgress from "nprogress";
function Group() {
  useEffect(() => {
    NProgress.done();
  }, []);
  return <DashboardPage.GroupsPage />;
}

export default Group;
