import { Box, Paragraph, Link } from "@/components/Atoms";
import { useId } from "react";
const items = [
    {
        href: "/dashboard",
        icon: (
            <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
        ),
        text: "Tổng quan",
    },
    {
        href: "/dashboard/exams/",
        icon: (
            <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                />
            </svg>
        ),
        text: "Bộ đề",
    },
    {
        href: "/dashboard/users/",
        icon: (
            <svg
                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
            </svg>
        ),
        text: "Tài khoản",
    },
    {
        href: "/dashboard/groups/",
        icon: (
            <svg
                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 "
                version="1.1"
                id="_x32_"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
            >
                <g id="SVGRepo_bgCarrier"></g>
                <g id="SVGRepo_tracerCarrier"></g>
                <g id="SVGRepo_iconCarrier">
                    <g>
                        {" "}
                        <path d="M81.44,116.972c23.206,0,42.007-18.817,42.007-42.008c0-23.215-18.801-42.016-42.007-42.016 c-23.216,0-42.016,18.801-42.016,42.016C39.424,98.155,58.224,116.972,81.44,116.972z"></path>{" "}
                        <path d="M224.166,245.037c0-0.856-0.142-1.673-0.251-2.498l62.748-45.541c3.942-2.867,4.83-8.411,1.963-12.362 c-1.664-2.285-4.342-3.652-7.17-3.652c-1.877,0-3.667,0.589-5.191,1.689l-62.874,45.636c-2.341-1.068-4.909-1.704-7.65-1.704 h-34.178l-8.294-47.222c-4.555-23.811-14.112-42.51-34.468-42.51h-86.3C22.146,136.873,0,159.019,0,179.383v141.203 c0,10.178,8.246,18.432,18.424,18.432c5.011,0,0,0,12.864,0l7.005,120.424c0,10.83,8.788,19.61,19.618,19.61 c8.12,0,28.398,0,39.228,0c10.83,0,19.61-8.78,19.61-19.61l9.204-238.53h0.463l5.27,23.269c1.744,11.097,11.293,19.28,22.524,19.28 h51.534C215.92,263.461,224.166,255.215,224.166,245.037z M68.026,218.861v-67.123h24.126v67.123l-12.817,15.118L68.026,218.861z"></path>{" "}
                        <polygon points="190.326,47.47 190.326,200.869 214.452,200.869 214.452,71.595 487.874,71.595 487.874,302.131 214.452,302.131 214.452,273.113 190.326,273.113 190.326,326.256 512,326.256 512,47.47 "></polygon>{" "}
                        <path d="M311.81,388.597c0-18.801-15.235-34.029-34.028-34.029c-18.801,0-34.036,15.228-34.036,34.029 c0,18.785,15.235,34.028,34.036,34.028C296.574,422.625,311.81,407.381,311.81,388.597z"></path>{" "}
                        <path d="M277.781,440.853c-24.259,0-44.866,15.919-52.782,38.199h105.565 C322.648,456.771,302.04,440.853,277.781,440.853z"></path>{" "}
                        <path d="M458.573,388.597c0-18.801-15.235-34.029-34.028-34.029c-18.801,0-34.036,15.228-34.036,34.029 c0,18.785,15.235,34.028,34.036,34.028C443.338,422.625,458.573,407.381,458.573,388.597z"></path>{" "}
                        <path d="M424.545,440.853c-24.259,0-44.866,15.919-52.783,38.199h105.565 C469.411,456.771,448.804,440.853,424.545,440.853z"></path>{" "}
                    </g>{" "}
                </g>
            </svg>
        ),
        text: "Danh sách lớp",
    },
];

function DashboardSidebar({ toggleSidebar }) {
    return (
        <>
            <aside
                id="default-sidebar"
                className={`${
                    !toggleSidebar && "-translate-x-full"
                } fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform  bg-white border-r border-gray-200 md:translate-x-0`}
                aria-label="Sidenav"
            >
                <Box className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 ">
                    <Box className="space-y-2">
                        {items.map((item) => (
                            <Link
                                to={item.href}
                                onClick={null}
                                key={useId()}
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 group"
                            >
                                {item.icon}
                                <Paragraph className="flex-1 ml-3 text-left whitespace-nowrap">
                                    {item.text}
                                </Paragraph>
                            </Link>
                        ))}
                    </Box>
                    <Box className="pt-5 mt-5 space-y-2 border-t border-gray-200 ">
                        <Link
                            to="/"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 group"
                        >
                            <svg
                                className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 "
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier"></g>
                                <g id="SVGRepo_tracerCarrier"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
                                        fill="currentColor"
                                    ></path>
                                </g>
                            </svg>
                            <Paragraph className="ml-3">Trang chủ</Paragraph>
                        </Link>
                    </Box>
                </Box>
            </aside>
        </>
    );
}

export default DashboardSidebar;
