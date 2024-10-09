import { MainLayout } from "@/layouts";
import { HomePage } from "@/pages";

const MainRouter = {
    element: <MainLayout />,
    path: "/",
    children: [
        {
            path: "/",
            element: <HomePage />,
            // loader: homeLoader,
        },
    ],
};

export default MainRouter;
