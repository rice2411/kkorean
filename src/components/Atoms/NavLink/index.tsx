// NavLink.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@/components/Atoms";

interface NavLinkProps {
    to?: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
    to = "#",
    children,
    className = "",
    onClick = null,
}) => {
    const navigate = useNavigate();

    return (
        <Box
            className={`${className} flex items-center border-b-2 border-transparent hover:border-primary-500 text-gray-500 hover:text-gray-700 cursor-pointer transition-all`}
            onClick={() => {
                if (onClick) {
                    onClick();
                }
                navigate(to);
            }}
        >
            {children}
        </Box>
    );
};

export default NavLink;
