import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import routers from "./routers";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
                console.log(
                    "Service Worker registered with scope: ",
                    registration.scope
                );
            })
            .catch((error) => {
                console.log("Service Worker registration failed: ", error);
            });
    });
}

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={routers} />
);
