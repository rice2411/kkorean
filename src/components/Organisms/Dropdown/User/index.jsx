import {
  Box,
  HorizontalRule,
  Image,
  Link,
  Paragraph,
} from "@/components/Atoms";
import { CONFIG_CONSTANTS } from "@/constants";
import { getLocalFile } from "@/helpers/File";
import { useAuth } from "@/hooks";
import { useState } from "react";

const links = [
  {
    to: "/dashboard/users",
    icon: (
      <svg
        className="mr-2 w-4 h-4 text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 18"
      >
        <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
      </svg>
    ),
    text: "Tài khoản",
  },
  {
    to: "/dashboard/exams",
    icon: (
      <svg
        className="mr-2 w-4 h-4 text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        {" "}
        <path d="m1.56 6.245 8 3.924a1 1 0 0 0 .88 0l8-3.924a1 1 0 0 0 0-1.8l-8-3.925a1 1 0 0 0-.88 0l-8 3.925a1 1 0 0 0 0 1.8Z" />{" "}
        <path d="M18 8.376a1 1 0 0 0-1 1v.163l-7 3.434-7-3.434v-.163a1 1 0 0 0-2 0v.786a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.786a1 1 0 0 0-1-1Z" />{" "}
        <path d="M17.993 13.191a1 1 0 0 0-1 1v.163l-7 3.435-7-3.435v-.163a1 1 0 1 0-2 0v.787a1 1 0 0 0 .56.9l8 3.925a1 1 0 0 0 .88 0l8-3.925a1 1 0 0 0 .56-.9v-.787a1 1 0 0 0-1-1Z" />{" "}
      </svg>
    ),
    text: "Bộ đề",
  },
];

function UserDropdown() {
  const { user, handleLogout } = useAuth();
  const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

  return (
    <>
      <Box
        onClick={() => {
          setIsOpenUserMenu((state) => !state);
          setIsOpenNotification(false);
        }}
        className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 cursor-pointer"
      >
        <Image
          className="w-8 h-8 rounded-full"
          src={getLocalFile("user-none", "jpg")}
          alt="user photo"
        />
      </Box>
      <Box
        className={`${
          !isOpenUserMenu && "hidden"
        } absolute z-50 my-4 w-56 text-base list-none bg-white rounded Boxide-y Boxide-gray-100 shadow top-7 right-5`}
        id="dropdown"
      >
        <Box className="py-3 px-4">
          <Paragraph className="block text-sm font-semibold text-gray-900 ">
            {user.fullName}
          </Paragraph>
          <Paragraph className="block text-sm text-gray-500 truncate ">
            {user.email}
          </Paragraph>
        </Box>
        {user.role === CONFIG_CONSTANTS.USER_ROLE.ADMIN && (
          <Box>
            <Paragraph className="text-xs font-bold ml-3 mb-3">
              Quản trị
            </Paragraph>
            <HorizontalRule />
            <Box className="py-1 text-gray-500 " aria-labelledby="dropdown">
              <Link
                to={"/dashboard"}
                className="block py-2 px-4 text-sm hover:bg-gray-100   "
              >
                Quản lý
              </Link>
            </Box>
            <Paragraph className="text-xs font-bold ml-3 mb-3">
              Phím tắt
            </Paragraph>
            <HorizontalRule />
            <Box className="py-1 text-gray-500 " aria-labelledby="dropdown">
              {links.map((item) => (
                <Link
                  onClick={() => {
                    setIsOpenUserMenu(false);
                  }}
                  key={item.to}
                  to={item.to}
                  className="flex items-center py-2 px-4 text-sm hover:bg-gray-100  "
                >
                  {item.icon}
                  {item.text}
                </Link>
              ))}
            </Box>
          </Box>
        )}
        <Box className="py-1 text-gray-500 " aria-labelledby="dropdown">
          <Link
            to={"/login"}
            onClick={() => handleLogout()}
            className="block py-2 px-4 text-sm hover:bg-gray-100  "
          >
            Đăng xuất
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default UserDropdown;
