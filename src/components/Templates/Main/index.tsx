import { Box } from "@/components/Atoms";
import { Footer, Header, Modal } from "@/components/Organisms";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const MainTemplate: React.FC = () => {
    return (
        <Box className="relative">
            <Header.MainHeader />
            <Box className="flex flex-col min-h-screen">
                <Box className="flex-grow overflow-auto">
                    <Outlet />
                </Box>
            </Box>
            <Footer />
            <Modal.ConfirmModal />
            <ToastContainer />
        </Box>
    );
};

export default MainTemplate;
