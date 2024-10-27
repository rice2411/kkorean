import { MainLayout } from "@/layouts";
import { Exam, Landing } from "@/pages";
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
    },
  ],
};

export default MainRouter;
