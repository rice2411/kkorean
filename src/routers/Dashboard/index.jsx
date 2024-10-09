import { DashboardLayout } from "@/layouts";
import {
    OverviewPage,
    TestsPage,
    UsersPage,
    ClassesPage,
} from "@/pages/Dashboard";
import { ClassesPageLoader } from "@/pages/Dashboard/Classes/loader";
import { TestsPageLoader } from "@/pages/Dashboard/Tests/loader";
import { UsersPageLoader } from "@/pages/Dashboard/Users/loader";

const DashboardRouter = {
    element: <DashboardLayout />,
    path: "/dashboard",
    children: [
        {
            path: "",
            element: <OverviewPage />,
        },
        {
            path: "users",
            element: <UsersPage />,
            loader: UsersPageLoader,
        },
        {
            path: "classes",
            element: <ClassesPage />,
            loader: ClassesPageLoader,
        },
        {
            path: "tests",
            element: <TestsPage />,
            loader: TestsPageLoader,
        },
    ],
};

export default DashboardRouter;
