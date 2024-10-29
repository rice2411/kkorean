import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routers from "./routers";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ServiceWorker } from "./config";

ServiceWorker.register();

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={routers} />
);
