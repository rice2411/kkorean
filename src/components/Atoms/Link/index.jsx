// Link.js
import React from "react";
import PropTypes from "prop-types";
import { Link as ReactRouterLink } from "react-router-dom";

const Link = ({
    to = "#",
    children,
    className = "",
    target = "_self",
    rel,
    onClick = () => {},
}) => {
    return (
        <ReactRouterLink
            to={to}
            className={`${className} text-blue-600  `}
            target={target}
            rel={rel}
            onClick={onClick}
        >
            {children}
        </ReactRouterLink>
    );
};

Link.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
};

export default Link;
