// Link.js
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box } from "@/components/Atoms";

const Link = ({
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
            target={target}
            rel={rel}
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

Link.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
};

export default Link;
