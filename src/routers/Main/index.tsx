import { MainLayout } from "@/layouts";
import { Exam, Landing } from "@/pages";
import { ExamListPageLoader } from "@/pages/Exam/List/loader";
import { RouteObject } from "react-router-dom";

const MainRouter: RouteObject = {
    element: <MainLayout />,
    path: "/",
    children: [
        {
            path: "/",
            element: <Landing />,
        },
        {
            path: "/exam",
            element: <Exam.ExamList />,
            loader: ExamListPageLoader,
        },
    ],
};

export default MainRouter;
