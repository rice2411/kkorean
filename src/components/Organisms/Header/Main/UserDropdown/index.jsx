import React, { useEffect, useRef, useState } from "react";
import { Box, Image, Link } from "@/components/Atoms";
import { useAuth } from "@/hooks";
import { FileHelpers } from "@/helpers";

const UserDropdown = () => {
    const ref = useRef(null);
    const { handleLogout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                if (event.target.id !== "user-img") setIsOpen(false);
                return;
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <Box className="relative inline-block ">
            <Image
                id="user-img"
                src={FileHelpers.getLocalFile("user", "svg")}
                className="rounded-full h-8 w-8 bg-gray-200 p-2 mr-2 cursor-pointer"
                onClick={toggleDropdown}
            />
            <Box
                ref={ref}
                className={`right-2 absolute z-10 bg-white Boxide-y Boxide-gray-100 rounded-lg shadow w-44 mt-1 ${
                    isOpen ? "" : "hidden"
                }`}
            >
                <Box
                    className="py-2 text-sm "
                    aria-labelledby="dropdownBoxiderButton"
                >
                    <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Dashboard
                    </Link>
                </Box>
                <Box className="py-2">
                    <Link
                        to={"/login"}
                        onClick={() => handleLogout()}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Đăng xuất
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default UserDropdown;
