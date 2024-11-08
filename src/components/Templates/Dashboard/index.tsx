import { Box } from "@/components/Atoms";
import { BreadCrumb } from "@/components/Molecules";
import { Header, Modal, Sidebar } from "@/components/Organisms";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const DashboardTemplate: React.FC = () => {
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const { pathname } = useLocation();

  const configBreadCrumb = (): string[] => {
    return pathname.split("/").filter((item) => item !== "");
  };

  return (
    <>
      <Header.DashboardHeader setToggleSidebar={setToggleSidebar} />
      <Sidebar.DashboardSidebar
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
      />
      <Box className="flex flex-col min-h-screen p-4 md:ml-64 h-auto pt-20">
        <Box className="flex-grow overflow-auto">
          <BreadCrumb data={configBreadCrumb()} />
          <Outlet />
        </Box>
      </Box>
      <ToastContainer />
      <Modal.ConfirmModal />
      <Modal.SuccessModal />
      <Modal.ImportantConfirmModal />
    </>
  );
};

export default DashboardTemplate;
