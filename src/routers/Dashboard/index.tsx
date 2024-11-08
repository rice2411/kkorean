import { DashboardLayout } from "@/layouts";
import { Dashboard } from "@/pages";
import { RouteObject } from "react-router-dom";

const DashboardRouter: RouteObject = {
  element: <DashboardLayout />,
  path: "/dashboard",
  children: [
    {
      path: "",
      element: <Dashboard.Overview />,
      loader: Dashboard.OverviewPageLoader,
    },
    {
      path: "users",
      element: <Dashboard.Users />,
      loader: Dashboard.UsersPageLoader,
    },
    {
      path: "groups",
      element: <Dashboard.Groups />,
      loader: Dashboard.GroupsPageLoader,
    },
    {
      path: "exams",
      element: <Dashboard.Exams />,
      loader: Dashboard.ExamsPageLoader,
    },
  ],
};

export default DashboardRouter;
