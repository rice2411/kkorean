// Link.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@/components/Atoms";

interface LinkProps {
    to?: string;
    children: React.ReactNode;
    className?: string;
    target?: string;
    rel?: string;
    onClick?: () => void;
}

const Link: React.FC<LinkProps> = ({
    to = "#",
    children,
    className = "",
    target = "_self",
    rel,
    onClick = null,
}) => {
    const navigate = useNavigate();

    return (
        <Box
            className={`${className} text-blue-600 cursor-pointer`}
            onClick={() => {
                if (onClick) {
                    onClick();
                }
                navigate(to);
            }}
            target={target}
            rel={rel}
        >
            {children}
        </Box>
    );
};

export default Link;
