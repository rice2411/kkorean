import { MainLayout } from "@/layouts";
import { Home } from "@/pages";

const MainRouter = {
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
