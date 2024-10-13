import { DashboardLayout } from "@/layouts";
import { Dashboard } from "@/pages/";

const DashboardRouter = {
    element: <DashboardLayout />,
    path: "/dashboard",
    children: [
        {
            path: "",
            element: <Dashboard.OverviewPage />,
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
