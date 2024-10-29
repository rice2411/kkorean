import { useId, useState } from "react";
import { Box, Paragraph, Image } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";
import { IUI } from "@/interface";
import { Sidebar } from "@/components/Organisms";

interface IProps {
    links: IUI.SidebarItem[];
}

const SidebarMobile: React.FC<IProps> = ({ links }) => {
    const [isOpenSidebarMobile, setIsOpenSidebarMobile] = useState(false);

    const toggleMobileMenu = () => {
        setIsOpenSidebarMobile(!isOpenSidebarMobile);
    };

    return (
        <>
            {/* Button to toggle sidebar */}
            <Box
                className="cursor-pointer inline-flex items-center p-2 mr-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2"
                onClick={toggleMobileMenu}
            >
                <Paragraph className="sr-only">Open sidebar menu</Paragraph>
                <Image
                    src={FileHelpers.getLocalFile("sidebar", "path")}
                    className="h-5 w-5"
                />
            </Box>

            {/* Overlay */}
            {isOpenSidebarMobile && (
                <Box
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
                    onClick={toggleMobileMenu}
                />
            )}

            {/* Sidebar */}
            <Box
                className={`fixed top-0 left-0 max-w-[260px] w-full h-full z-20 bg-white border-r transform transition-transform duration-300 ease-in-out ${
                    isOpenSidebarMobile ? "translate-x-0" : "-translate-x-full"
                }`}
            > 
                <Box className="flex items-center p-5">
                    <Image
                        src={FileHelpers.getLocalFile("logo", "svg")}
                        className="mr-3 h-6 sm:h-9"
                        alt="Kkorean Logo"
                    />
                    <Paragraph className="self-center text-xl font-semibold whitespace-nowrap">
                        KKorean
                    </Paragraph>
                </Box>
                <Sidebar.MainSidebar
                    key={useId()}
                    list={links}
                    blockClass="h-full"
                />
            </Box>
        </>
    );
};

export default SidebarMobile;
