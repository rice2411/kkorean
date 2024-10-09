import { Box, Link, Image, Paragraph } from "@/components/Atoms";

function DashboardHeader({ setToggleSidebar }) {
    return (
        <header className="antialiased">
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
                <Box className="flex flex-wrap justify-between items-center">
                    <Box className="flex justify-start items-center">
                        <Box
                            id="toggleSidebar"
                            aria-expanded="true"
                            aria-controls="sidebar"
                            className="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 "
                        >
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 12"
                            >
                                {" "}
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h14M1 6h14M1 11h7"
                                />{" "}
                            </svg>
                        </Box>
                        <Box
                            onClick={() => {
                                setToggleSidebar((state) => !state);
                            }}
                            type="button"
                            aria-expanded="true"
                            aria-controls="sidebar"
                            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 "
                        >
                            <svg
                                className="w-[18px] h-[18px]"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                            <Paragraph className="sr-only">
                                Toggle sidebar
                            </Paragraph>
                        </Box>
                        <Link to="https://flowbite.com" className="flex mr-4">
                            <Image
                                src="https://flowbite.s3.amazonaws.com/logo.svg"
                                className="mr-3 h-8"
                                alt="FlowBite Logo"
                            />
                            <Paragraph className="self-center text-2xl font-semibold whitespace-nowrap ">
                                Admin KKorean
                            </Paragraph>
                        </Link>
                    </Box>
                    <Box className="flex items-center lg:order-2">
                        <Box className="hidden sm:inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 ">
                            <svg
                                aria-hidden="true"
                                className="mr-1 -ml-1 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>{" "}
                            New Widget
                        </Box>
                        <Box
                            id="toggleSidebarMobileSearch"
                            className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 "
                        >
                            <Paragraph className="sr-only">Search</Paragraph>
                            {/* Search icon */}
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </Box>
                        {/* Notifications */}
                        <Box
                            type="Box"
                            data-dropdown-toggle="notification-dropdown"
                            className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 "
                        >
                            <Paragraph className="sr-only">
                                View notifications
                            </Paragraph>
                            {/* Bell icon */}
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 14 20"
                            >
                                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                            </svg>
                        </Box>
                        {/* Dropdown menu */}
                        <Box
                            className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded Boxide-y Boxide-gray-100 shadow-lg "
                            id="notification-dropdown"
                        >
                            <Box className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 ">
                                Notifications
                            </Box>
                            <Box>
                                <Link
                                    href="#"
                                    className="flex py-3 px-4 border-b hover:bg-gray-100 "
                                >
                                    <Box className="flex-shrink-0">
                                        <Image
                                            className="w-11 h-11 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                                            alt="Bonnie Green avatar"
                                        />
                                        <Box className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 ">
                                            <svg
                                                className="w-2 h-2 text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 18 18"
                                            >
                                                <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />
                                                <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                                            </svg>
                                        </Box>
                                    </Box>
                                    <Box className="pl-3 w-full">
                                        <Box className="text-gray-500 font-normal text-sm mb-1.5 ">
                                            New message from{" "}
                                            <Paragraph className="font-semibold text-gray-900 ">
                                                Bonnie Green
                                            </Paragraph>
                                            : "Hey, what's up? All set for the
                                            presentation?"
                                        </Box>
                                        <Box className="text-xs font-medium text-primary-700 ">
                                            a few moments ago
                                        </Box>
                                    </Box>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex py-3 px-4 border-b hover:bg-gray-100 "
                                >
                                    <Box className="flex-shrink-0">
                                        <Image
                                            className="w-11 h-11 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                                            alt="Jese Leos avatar"
                                        />
                                        <Box className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-gray-900 rounded-full border border-white ">
                                            <svg
                                                className="w-2 h-2 text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 18"
                                            >
                                                <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                                            </svg>
                                        </Box>
                                    </Box>
                                    <Box className="pl-3 w-full">
                                        <Box className="text-gray-500 font-normal text-sm mb-1.5 ">
                                            <Paragraph className="font-semibold text-gray-900 ">
                                                Jese leos
                                            </Paragraph>{" "}
                                            and{" "}
                                            <Paragraph className="font-medium text-gray-900 ">
                                                5 others
                                            </Paragraph>{" "}
                                            started following you.
                                        </Box>
                                        <Box className="text-xs font-medium text-primary-700 ">
                                            10 minutes ago
                                        </Box>
                                    </Box>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex py-3 px-4 border-b hover:bg-gray-100 "
                                >
                                    <Box className="flex-shrink-0">
                                        <Image
                                            className="w-11 h-11 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                                            alt="Joseph McFall avatar"
                                        />
                                        <Box className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-red-600 rounded-full border border-white ">
                                            <svg
                                                className="w-2 h-2 text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 18"
                                            >
                                                {" "}
                                                <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />{" "}
                                            </svg>
                                        </Box>
                                    </Box>
                                    <Box className="pl-3 w-full">
                                        <Box className="text-gray-500 font-normal text-sm mb-1.5 ">
                                            <Paragraph className="font-semibold text-gray-900 ">
                                                Joseph Mcfall
                                            </Paragraph>{" "}
                                            and{" "}
                                            <Paragraph className="font-medium text-gray-900 ">
                                                141 others
                                            </Paragraph>{" "}
                                            love your story. See it and view
                                            more stories.
                                        </Box>
                                        <Box className="text-xs font-medium text-primary-700 ">
                                            44 minutes ago
                                        </Box>
                                    </Box>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex py-3 px-4 border-b hover:bg-gray-100 "
                                >
                                    <Box className="flex-shrink-0">
                                        <Image
                                            className="w-11 h-11 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                                            alt="Roberta Casas image"
                                        />
                                        <Box className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-green-400 rounded-full border border-white ">
                                            <svg
                                                className="w-2 h-2 text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 18"
                                            >
                                                <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                                            </svg>
                                        </Box>
                                    </Box>
                                    <Box className="pl-3 w-full">
                                        <Box className="text-gray-500 font-normal text-sm mb-1.5 ">
                                            <Paragraph className="font-semibold text-gray-900 ">
                                                Leslie Livingston
                                            </Paragraph>{" "}
                                            mentioned you in a comment:{" "}
                                            <Paragraph className="font-medium text-primary-700 ">
                                                @bonnie.green
                                            </Paragraph>{" "}
                                            what do you say?
                                        </Box>
                                        <Box className="text-xs font-medium text-primary-700 ">
                                            1 hour ago
                                        </Box>
                                    </Box>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex py-3 px-4 hover:bg-gray-100 "
                                >
                                    <Box className="flex-shrink-0">
                                        <Image
                                            className="w-11 h-11 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/robert-brown.png"
                                            alt="Robert image"
                                        />
                                        <Box className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-purple-500 rounded-full border border-white ">
                                            <svg
                                                className="w-2 h-2 text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 14"
                                            >
                                                <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
                                            </svg>
                                        </Box>
                                    </Box>
                                    <Box className="pl-3 w-full">
                                        <Box className="text-gray-500 font-normal text-sm mb-1.5 ">
                                            <Paragraph className="font-semibold text-gray-900 ">
                                                Robert Brown
                                            </Paragraph>{" "}
                                            posted a new video: Glassmorphism -
                                            learn how to implement the new
                                            design trend.
                                        </Box>
                                        <Box className="text-xs font-medium text-primary-700 ">
                                            3 hours ago
                                        </Box>
                                    </Box>
                                </Link>
                            </Box>
                            <Link
                                href="#"
                                className="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100"
                            >
                                <Box className="inline-flex items-center ">
                                    <svg
                                        aria-hidden="true"
                                        className="mr-2 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    View all
                                </Box>
                            </Link>
                        </Box>
                        {/* Apps */}
                        <Box
                            type="Box"
                            data-dropdown-toggle="apps-dropdown"
                            className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100   "
                        >
                            <Paragraph className="sr-only">
                                View notifications
                            </Paragraph>
                            {/* Icon */}
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 18"
                            >
                                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                            </svg>
                        </Box>
                        {/* Dropdown menu */}
                        <Box
                            className="hidden overflow-hidden z-50 my-4 max-w-sm text-base list-none bg-white rounded Boxide-y Boxide-gray-100 shadow-lg "
                            id="apps-dropdown"
                        >
                            <Box className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50">
                                Apps
                            </Box>
                            <Box className="grid grid-cols-3 gap-4 p-4">
                                <Link
                                    href="#"
                                    className="block p-4 text-center rounded-lg hover:bg-gray-100  group"
                                >
                                    <svg
                                        className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500  "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 20"
                                    >
                                        <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                    </svg>
                                    <Box className="text-sm font-medium text-gray-900 ">
                                        Sales
                                    </Box>
                                </Link>
                                <Link
                                    href="#"
                                    className="block p-4 text-center rounded-lg hover:bg-gray-100  group"
                                >
                                    <svg
                                        className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 19"
                                    >
                                        <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                                        <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                                    </svg>
                                    <Box className="text-sm font-medium text-gray-900 ">
                                        Users
                                    </Box>
                                </Link>
                                <Link
                                    href="#"
                                    className="block p-4 text-center rounded-lg hover:bg-gray-100  group"
                                >
                                    <svg
                                        className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500  "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 18"
                                    >
                                        {" "}
                                        <path d="M15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783ZM6 2h6a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2Zm7 5H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Z" />{" "}
                                        <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />{" "}
                                    </svg>
                                    <Box className="text-sm font-medium text-gray-900 ">
                                        Inbox
                                    </Box>
                                </Link>
                                <Link
                                    href="#"
                                    className="block p-4 text-center rounded-lg hover:bg-gray-100  group"
                                >
                                    <svg
                                        className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500  "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                    <Box className="text-sm font-medium text-gray-900 ">
                                        Profile
                                    </Box>
                                </Link>
                                <Link
                                    href="#"
                                    className="block p-4 text-center rounded-lg hover:bg-gray-100  group"
                                >
                                    <svg
                                        className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500  "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                                    </svg>
                                    <Box className="text-sm font-medium text-gray-900 ">
                                        Settings
                                    </Box>
                                </Link>
                                <Link
                                    href="#"
                                    className="block p-4 text-center rounded-lg hover:bg-gray-100  group"
                                >
                                    <svg
                                        className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500  "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 16"
                                    >
                                        <path d="M19 0H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1ZM2 6v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6H2Zm11 3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0h2a1 1 0 0 1 2 0v1Z" />
                                    </svg>
                                    <Box className="text-sm font-medium text-gray-900 ">
                                        Products
                                    </Box>
                                </Link>
                                <Link
                                    href="#"
                                    className="block p-4 text-center rounded-lg hover:bg-gray-100  group"
                                >
                                    <svg
                                        className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500  "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 11 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M1.75 15.363a4.954 4.954 0 0 0 2.638 1.574c2.345.572 4.653-.434 5.155-2.247.502-1.813-1.313-3.79-3.657-4.364-2.344-.574-4.16-2.551-3.658-4.364.502-1.813 2.81-2.818 5.155-2.246A4.97 4.97 0 0 1 10 5.264M6 17.097v1.82m0-17.5v2.138"
                                        />
                                    </svg>
                                    <Box className="text-sm font-medium text-gray-900 ">
                                        Pricing
                                    </Box>
                                </Link>
                                <Link
                                    href="#"
                                    className="block p-4 text-center rounded-lg hover:bg-gray-100  group"
                                >
                                    <svg
                                        className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500  "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 16 20"
                                    >
                                        <path d="M7 11H5v1h2v-1Zm4 3H9v1h2v-1Zm-4 0H5v1h2v-1ZM5 5V.13a2.98 2.98 0 0 0-1.293.749L.88 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM13 16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6Zm-1-8H9a1 1 0 0 1 0-2h3a1 1 0 1 1 0 2Zm0-3H9a1 1 0 0 1 0-2h3a1 1 0 1 1 0 2Z" />
                                        <path d="M11 11H9v1h2v-1Z" />
                                    </svg>
                                    <Box className="text-sm font-medium text-gray-900 ">
                                        Billing
                                    </Box>
                                </Link>
                                <Link
                                    href="#"
                                    className="block p-4 text-center rounded-lg hover:bg-gray-100  group"
                                >
                                    <svg
                                        className="mx-auto mb-2 w-5 h-5 text-gray-400 group-hover:text-gray-500  "
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                                        />
                                    </svg>
                                    <Box className="text-sm font-medium text-gray-900 ">
                                        Logout
                                    </Box>
                                </Link>
                            </Box>
                        </Box>
                        <Box
                            type="Box"
                            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
                            id="user-menu-Box"
                            aria-expanded="false"
                            data-dropdown-toggle="dropdown"
                        >
                            <Paragraph className="sr-only">
                                Open user menu
                            </Paragraph>
                            <Image
                                className="w-8 h-8 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                alt="user photo"
                            />
                        </Box>
                        {/* Dropdown menu */}
                        <Box
                            className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded Boxide-y Boxide-gray-100 shadow "
                            id="dropdown"
                        >
                            <Box className="py-3 px-4">
                                <Paragraph className="block text-sm font-semibold text-gray-900 ">
                                    Neil sims
                                </Paragraph>
                                <Paragraph className="block text-sm text-gray-500 truncate ">
                                    name@flowbite.com
                                </Paragraph>
                            </Box>
                            <Box
                                className="py-1 text-gray-500 "
                                aria-labelledby="dropdown"
                            >
                                <Link
                                    href="#"
                                    className="block py-2 px-4 text-sm hover:bg-gray-100   "
                                >
                                    My profile
                                </Link>
                                <Link
                                    href="#"
                                    className="block py-2 px-4 text-sm hover:bg-gray-100   "
                                >
                                    Account settings
                                </Link>
                            </Box>
                            <Box
                                className="py-1 text-gray-500 "
                                aria-labelledby="dropdown"
                            >
                                <Link
                                    href="#"
                                    className="flex items-center py-2 px-4 text-sm hover:bg-gray-100  "
                                >
                                    <svg
                                        className="mr-2 w-4 h-4 text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 18"
                                    >
                                        <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                                    </svg>
                                    My likes
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center py-2 px-4 text-sm hover:bg-gray-100  "
                                >
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
                                    Collections
                                </Link>
                                <Link
                                    href="#"
                                    className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100  "
                                >
                                    <Paragraph className="flex items-center">
                                        <svg
                                            className="mr-2 w-4 h-4 text-primary-600 "
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="m7.164 3.805-4.475.38L.327 6.546a1.114 1.114 0 0 0 .63 1.89l3.2.375 3.007-5.006ZM11.092 15.9l.472 3.14a1.114 1.114 0 0 0 1.89.63l2.36-2.362.38-4.475-5.102 3.067Zm8.617-14.283A1.613 1.613 0 0 0 18.383.291c-1.913-.33-5.811-.736-7.556 1.01-1.98 1.98-6.172 9.491-7.477 11.869a1.1 1.1 0 0 0 .193 1.316l.986.985.985.986a1.1 1.1 0 0 0 1.316.193c2.378-1.3 9.889-5.5 11.869-7.477 1.746-1.745 1.34-5.643 1.01-7.556Zm-3.873 6.268a2.63 2.63 0 1 1-3.72-3.72 2.63 2.63 0 0 1 3.72 3.72Z" />
                                        </svg>
                                        Pro version
                                    </Paragraph>
                                    <svg
                                        className="w-2.5 h-2.5 text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                </Link>
                            </Box>
                            <Box
                                className="py-1 text-gray-500 "
                                aria-labelledby="dropdown"
                            >
                                <Link
                                    href="#"
                                    className="block py-2 px-4 text-sm hover:bg-gray-100  "
                                >
                                    Sign out
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </nav>
        </header>
    );
}

export default DashboardHeader;
