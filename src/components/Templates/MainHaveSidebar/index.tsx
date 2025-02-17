import { Box } from "@/components/Atoms";
import { Footer, Header, Sidebar } from "@/components/Organisms";
import { IUI } from "@/interface";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface IProps {
  listSidebar: IUI.SidebarItem[];
}
const MainHaveSidebarTemplate: React.FC<IProps> = ({ listSidebar }) => {
  return (
    <>
      <Header.MainHeader sidebarItems={listSidebar} />
      <Box className="flex relative min-h-screen">
        <Box>
          <Sidebar.MainSidebar
            list={listSidebar}
            blockClass={"max-w-[260px] w-full fixed z-10 h-full border-r lg:block hidden"}
          />
        </Box>
        <Box className="flex flex-col w-full lg:ml-[260px]">
          <Box className="flex-grow min-h-screen">
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default MainHaveSidebarTemplate;
