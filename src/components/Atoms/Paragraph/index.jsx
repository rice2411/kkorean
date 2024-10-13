// Paragraph.js
import React from "react";

const Paragraph = ({
    children,
    className = "",
    color = "text-black",
    align = "left",
    onClick = () => {},
}) => {
    const alignmentClasses = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
    };

    return (
        <p
            className={`${alignmentClasses[align]} ${color} ${className}`}
            onClick={onClick}
        >
            {children}
        </p>
    );
};

export default Paragraph;
