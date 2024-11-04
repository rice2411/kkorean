import { Box } from "@/components/Atoms";
import { Header, Modal } from "@/components/Organisms";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const MainTemplate: React.FC = () => {
  return (
    <Box className="relative h-screen overflow-hidden">
      <Header.MainHeader />
      <Box className="flex flex-col items-center h-full ">
        <Outlet />
      </Box>
      {/* <Footer /> */}
      <Modal.ConfirmModal />
      <ToastContainer />
    </Box>
  );
};

export default MainTemplate;
