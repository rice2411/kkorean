import { useNavigate } from "react-router-dom";
import { Button, Box } from "@/components/Atoms";
import { useAuth } from "@/hooks";
import HeaderMobile from "./Mobile/mobile";
import { Dropdown } from "@/components/Organisms";
import { IContext, IUI } from "@/interface";
import SidebarMobile from "./Mobile/sidebar";

interface IProps {
  sidebarItems?: IUI.SidebarItem[];
}
const MainHeader: React.FC<IProps> = ({ sidebarItems = [] }) => {
  const { user } =
    useAuth() as unknown as IContext.IAuthContenxt.UseAuthReturnType;
  const navigate = useNavigate();

  const links = [
    { to: "/", text: "Trang chủ" },
    { to: "/exam", text: "Thi thử" },
  ];

  return (
    <header className="sticky top-0 z-10 ">
      <nav className="bg-white border-b border-stone-300 px-4 lg:px-6 py-2.5">
        <Box className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
          <Box className="flex items-center">
            {!!sidebarItems?.length && <SidebarMobile links={sidebarItems} />}
          </Box>
          <Box className="flex lg:flex-row-reverse">
            <Box className="flex items-center lg:ml-10">
              {user ? (
                <Dropdown.UserDropdown dropdownClass={"lg:right-32"} />
              ) : (
                <Button
                  variant="primary"
                  hover={true}
                  onClick={() => navigate("login")}
                >
                  Đăng nhập
                </Button>
              )}
            </Box>
            <HeaderMobile links={links} />
          </Box>
        </Box>
      </nav>
    </header>
  );
};

export default MainHeader;
