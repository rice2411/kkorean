import { MainLayout } from "@/layouts";
import { Home } from "@/pages";
import { RouteObject } from "react-router-dom";

const MainRouter: RouteObject = {
    element: <MainLayout />,
    path: "/",
    children: [
        {
            path: "/",
            element: <Home />,
            // loader: homeLoader,
        },
    ],
};

export default MainRouter;
