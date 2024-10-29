import DoingLayout from "@/layouts/Doing";
import { Exam } from "@/pages";
import { RouteObject } from "react-router-dom";

const DoingRouter: RouteObject = {
    element: <DoingLayout />,
    path: "/",
    children: [
        {
            element: <Exam.ExamDoing />,
            path: "/exam/doing",
        },
    ],
};

export default DoingRouter;
