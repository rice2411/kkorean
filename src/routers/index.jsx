import { createBrowserRouter, Navigate } from "react-router-dom";
import MainRouter from "./Main";
import DocumentUIRouter from "./DocumentUI";
import AuthRouter from "./Auth";
import DashboardRouter from "./Dashboard";

export default createBrowserRouter([
    MainRouter,
    DocumentUIRouter,
    AuthRouter,
    DashboardRouter,
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);
