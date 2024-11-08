import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routers from "./routers";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css";
import "./index.css";
import { ServiceWorker } from "./config";

ServiceWorker.register();

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routers} />
);
