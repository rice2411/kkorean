import { Box, Paragraph, Link, Svg } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";
import { IUI } from "@/interface";
import { useId } from "react";

// Define the structure of the items

const items: IUI.SidebarItem[] = [
    {
        href: "/dashboard",
        icon: (
            <Svg
                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                src={FileHelpers.getLocalFile("statictis", "path")}
            ></Svg>
        ),
        text: "Tổng quan",
    },
    {
        href: "/dashboard/exams/",
        icon: (
            <Svg
                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                src={FileHelpers.getLocalFile("exams", "path")}
            ></Svg>
        ),
        text: "Bộ đề",
    },
    {
        href: "/dashboard/users/",
        icon: (
            <Svg
                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
                fill="currentColor"
                viewBox="0 0 20 20"
                src={FileHelpers.getLocalFile("groupAccount", "path")}
            ></Svg>
        ),
        text: "Tài khoản",
    },
    {
        href: "/dashboard/groups/",
        icon: (
            <Svg
                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
                src={FileHelpers.getLocalFile("groups", "path")}
                viewBox="0 0 512 512"
                fill="currentColor"
            ></Svg>
        ),
        text: "Danh sách lớp",
    },
];

// Define props interface for DashboardSidebar
interface DashboardSidebarProps {
    toggleSidebar: boolean;
}

function DashboardSidebar({ toggleSidebar }: DashboardSidebarProps) {
    return (
        <aside
            id="default-sidebar"
            className={`${
                !toggleSidebar && "-translate-x-full"
            } fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 md:translate-x-0`}
            aria-label="Sidenav"
        >
            <Box className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200">
                <Box className="space-y-2">
                    {items.map((item) => (
                        <Link
                            to={item.href}
                            key={useId()}
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
                        >
                            {item.icon}
                            <Paragraph className="flex-1 ml-3 text-left whitespace-nowrap">
                                {item.text}
                            </Paragraph>
                        </Link>
                    ))}
                </Box>
                <Box className="pt-5 mt-5 space-y-2 border-t border-gray-200">
                    <Link
                        to="/"
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 group"
                    >
                        <Svg
                            className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
                            fill="currentColor"
                            src={FileHelpers.getLocalFile("home", "path")}
                        ></Svg>
                        <Paragraph className="ml-3">Trang chủ</Paragraph>
                    </Link>
                </Box>
            </Box>
        </aside>
    );
}

export default DashboardSidebar;
