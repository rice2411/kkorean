import { ExamLayout } from "@/layouts";
import { Exam } from "@/pages";
import { RouteObject } from "react-router-dom";

const ExamRotuer: RouteObject = {
  element: <ExamLayout />,
  path: "/",
  children: [
    {
      element: <Exam.ExamDoing />,
      path: "/exam/doing",
    },
    {
      element: <Exam.ExamResult />,
      path: "/exam/result",
    },
  ],
};

export default ExamRotuer;
