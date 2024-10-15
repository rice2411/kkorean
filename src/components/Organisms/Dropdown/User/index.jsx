import {
    Box,
    HorizontalRule,
    Image,
    Link,
    Paragraph,
    Svg,
} from "@/components/Atoms";
import { CONFIG_CONSTANTS, NOTIFICATION_CONSTANTS } from "@/constants";
import { FileHelpers } from "@/helpers/";
import { useAuth, useClickOutside } from "@/hooks";
import { NotificationService } from "@/services";
import DateFNSUtils from "@/utils/DateFNS";
import { useRef, useState } from "react";

function UserDropdown({ dropdownClass }) {
    const { user, handleLogout } = useAuth();
    const dropdownRef = useRef();
    const parentRef = useRef();
    const [isOpenUserMenu, setIsOpenUserMenu] = useState(false);

    const links = [
        {
            href: "/dashboard/users/",
            icon: (
                <Svg
                    className="mr-2 w-4 h-4 text-gray-400"
                    viewBox="0 0 24 24"
                    src={FileHelpers.getLocalFile("account", "path")}
                ></Svg>
            ),
            text: "Tài khoản",
        },
        {
            href: "/dashboard/exams",
            icon: (
                <Svg
                    className="mr-2 w-4 h-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    src={FileHelpers.getLocalFile("exams", "path")}
                ></Svg>
            ),
            text: "Bộ đề",
        },
    ];

    useClickOutside(parentRef, dropdownRef, () => setIsOpenUserMenu(false));

    if (!user) return null;

    return (
        <>
            <Box
                ref={parentRef}
                onClick={() => {
                    setIsOpenUserMenu((state) => !state);
                }}
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 cursor-pointer"
            >
                <Image
                    className="w-8 h-8 rounded-full"
                    src={FileHelpers.getLocalFile("user-none", "jpg")}
                    alt="user photo"
                />
            </Box>
            <Box
                ref={dropdownRef}
                className={`${
                    !isOpenUserMenu && "hidden"
                } absolute z-50 my-4 w-56 text-base list-none bg-white rounded Boxide-y Boxide-gray-100 shadow top-7 right-5 ${dropdownClass}`}
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
                        <Box
                            className="py-1 text-gray-500 "
                            aria-labelledby="dropdown"
                        >
                            <Link
                                onClick={() => {
                                    setIsOpenUserMenu(false);
                                }}
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
                        <Box
                            className="py-1 text-gray-500 "
                            aria-labelledby="dropdown"
                        >
                            {links.map((item, index) => (
                                <Link
                                    onClick={() => {
                                        setIsOpenUserMenu(false);
                                    }}
                                    key={index}
                                    to={item.href}
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
                        onClick={async () => {
                            await NotificationService.createNotification({
                                type: NOTIFICATION_CONSTANTS.NOTIFICATION_TYPE
                                    .LOGOUT,
                                message: `Người dùng <b>${
                                    user.email
                                }</b> đã <b>đăng xuất</b> khỏi hệ thống vào lúc ${DateFNSUtils.now()}`,
                            });
                            handleLogout();
                        }}
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
