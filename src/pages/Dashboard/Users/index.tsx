import { DashboardPage } from "@/components/Pages/";
import NProgress from "nprogress";
import { useEffect } from "react";
function Users() {
  useEffect(() => {
    NProgress.done();
  }, []);
  return (
    <>
      <DashboardPage.UsersPage />
    </>
  );
}

export default Users;
