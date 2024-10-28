import { useDocumentTitle } from "@/hooks";
import AppProvider from "../provider";
import { Outlet } from "react-router-dom";

function DoingLayout() {
    useDocumentTitle("Kiểm tra");
    return (
        <>
            <AppProvider>
                <Outlet />
            </AppProvider>
        </>
    );
}

export default DoingLayout;
