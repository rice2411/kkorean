import { Box } from "@/components/Atoms";
import { Footer, Header, Sidebar } from "@/components/Organisms";
import { IUI } from "@/interface";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface IProps {
  listSidebar: IUI.SidebarItem[]
}
const MainHaveSidebarTemplate: React.FC<IProps> = ({ listSidebar }) => {
  return (
    <>
      <Header.MainHeader />
      <Box className="flex relative">
        <Box className="max-w-[260px] border-r w-full absolute z-10 h-full">
          <Sidebar.MainSidebar list={listSidebar} />
        </Box>
        <Box className="flex flex-col w-full ml-[260px]">
          <Box className="flex-grow h-full">
            <Outlet />
          </Box>
          <Footer /> {/* Đặt Footer ngay sau phần nội dung chính */}
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
};

export default MainHaveSidebarTemplate;
