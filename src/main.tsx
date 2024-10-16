import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routers from "./routers";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={routers} />
);
