import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import MainRouter from "./Main";
import AuthRouter from "./Auth";
import DashboardRouter from "./Dashboard";
import DoingRouter from "./Doing";
import User from "./User";
const router: RouteObject[] = [
    MainRouter,
    AuthRouter,
    DashboardRouter,
    User,
    DoingRouter,
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
];

export default createBrowserRouter(router);
