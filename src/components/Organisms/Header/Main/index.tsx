import { useNavigate } from "react-router-dom";
import { Button, Paragraph, Image, Box } from "@/components/Atoms";
import { useAuth } from "@/hooks";
import HeaderMobile from "./Mobile/mobile";
import { Dropdown } from "@/components/Organisms";
import { IContext } from "@/interface";
import { FileHelpers } from "@/helpers";

const MainHeader: React.FC = () => {
  const { user } =
    useAuth() as unknown as IContext.IAuthContenxt.UseAuthReturnType;
  const navigate = useNavigate();

  const links = [
    { to: "/", text: "Trang chủ" },
    { to: "/exam", text: "Thi thử" },
    { to: "/", text: "Ngữ pháp" },
    { to: "/", text: "Blog" },
    { to: "/", text: "Giới thiệu" },
    { to: "/DocumentUI", text: "Tài liệu" },
  ];

  return (
    <header className="fixed w-full backdrop-blur-3xl ">
      <nav className="bg-transparent border-b border-stone-300 px-4 lg:px-6 py-2.5">
        <Box className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl">
          <Box className="flex items-center">
            <Image
              src={FileHelpers.getLocalFile("logo", "svg")}
              className="mr-3 h-6 sm:h-9"
              alt="Kkorean Logo"
            />
            <Paragraph className="self-center text-xl font-semibold whitespace-nowrap">
              KKorean
            </Paragraph>
          </Box>
          <Box className="flex lg:flex-row-reverse">
            <Box className="flex items-center lg:ml-10">
              {user ? (
                <Dropdown.UserDropdown dropdownClass={"lg:right-32"} />
              ) : (
                <Button
                  variant="secondary-outline"
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
