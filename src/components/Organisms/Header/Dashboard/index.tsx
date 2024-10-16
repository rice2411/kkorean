import { Box, Link, Image, Paragraph, Svg } from "@/components/Atoms";
import { Dropdown } from "@/components/Organisms";
import { FileHelpers } from "@/helpers";

interface DashboardHeaderProps {
    setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    setToggleSidebar,
}) => {
    return (
        <header className="antialiased">
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
                <Box className="flex flex-wrap justify-between items-center">
                    <Box className="flex justify-start items-center">
                        <Box
                            onClick={() => {
                                setToggleSidebar((state) => !state);
                            }}
                            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
                        >
                            <Svg
                                className="w-[18px] h-[18px]"
                                fill="none"
                                viewBox="0 0 17 14"
                                src={FileHelpers.getLocalFile("menu", "path")}
                            />
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
                            <Paragraph className="self-center text-2xl font-semibold whitespace-nowrap">
                                Admin KKorean
                            </Paragraph>
                        </Link>
                    </Box>
                    <Box className="flex items-center lg:order-2">
                        {/* Notification Dropdown */}
                        <Dropdown.NotificationDropdown />
                        {/* User Dropdown */}
                        <Dropdown.UserDropdown />
                    </Box>
                </Box>
            </nav>
        </header>
    );
};

export default DashboardHeader;
