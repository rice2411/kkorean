import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import MainRouter from "./Main";
import AuthRouter from "./Auth";
import DashboardRouter from "./Dashboard";
import ExamRotuer from "./Exam";

const router: RouteObject[] = [
  MainRouter,
  AuthRouter,
  DashboardRouter,
  ExamRotuer,
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default createBrowserRouter(router);
