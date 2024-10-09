import { useLocation } from "react-router-dom";
import { Link, Image, Paragraph } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";
import { useId } from "react";

const tabs = [
    "Button",
    "Input",
    "Select",
    "Checkbox",
    "Radio",
    "Toggle",
    "Form",
    "Heading",
    "Link",
    "Loading",
    "Paragraph",
    "Image",
    "HorizontalRule",
    "Tooltip",
];

function DocumentUISidebar() {
    const { pathname } = useLocation();
    return (
        <>
            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0 bg-gray-800"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <div className="flex items-center ps-2.5 mb-5">
                        <Image
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-6 me-3 sm:h-7"
                            alt="Flowbite Logo"
                        />
                        <Paragraph className="self-center text-md font-semibold whitespace-nowrap text-white">
                            Demo Components Base
                        </Paragraph>
                    </div>
                    <ul className="space-y-2 font-medium">
                        {tabs.map((tab) => (
                            <Link
                                to={tab.toLowerCase()} // Chuyển đổi tên tab thành đường dẫn
                                key={useId()}
                                className={`flex items-center p-2 rounded-lg text-white hover:bg-gray-700 ${
                                    pathname.includes(tab.toLowerCase()) &&
                                    "bg-gray-700"
                                }`}
                            >
                                {tab}
                            </Link>
                        ))}
                        <Link
                            to="/"
                            className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
                        >
                            <Image
                                src={FileHelpers.getLocalFile("logout", "svg")}
                                className="h-7 w-7"
                            />
                            <span className="flex-1 ms-3 whitespace-nowrap">
                                Về trang chủ
                            </span>
                        </Link>
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default DocumentUISidebar;
