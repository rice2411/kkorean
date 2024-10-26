import { Box } from "@/components/Atoms";
import { Footer, Header } from "@/components/Organisms";
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
      <ToastContainer />
    </Box>
  );
};

export default MainTemplate;
