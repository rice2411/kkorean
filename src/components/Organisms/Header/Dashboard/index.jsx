import { Box, Link, Image, Paragraph } from "@/components/Atoms";
import { Dropdown } from "@/components/Organisms";

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
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h14M1 6h14M1 11h7"
                                />
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
                        {/* Notification Dropdown */}
                        <Dropdown.NotificationDropdown />
                        {/* Userdropdown */}
                        <Dropdown.UserDropdown />
                    </Box>
                </Box>
            </nav>
        </header>
    );
}

export default DashboardHeader;
