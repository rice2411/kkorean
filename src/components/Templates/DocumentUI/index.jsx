import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Organisms";
import { Box } from "@/components/Atoms";

function DocumentUITemplate() {
    return (
        <>
            <Sidebar.DocumentUISidebar />
            <Box className="flex flex-col min-h-screen">
                <Box className="flex-grow overflow-auto">
                    <Outlet />
                </Box>
            </Box>
        </>
    );
}

export default DocumentUITemplate;
