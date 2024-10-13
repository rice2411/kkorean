// Heading.js
import React from "react";

const Heading = ({
    level = 1,
    children,
    className = "",
    color = "text-black",
}) => {
    const sizes = {
        1: "text-4xl font-bold",
        2: "text-3xl font-semibold",
        3: "text-2xl font-medium",
        4: "text-xl font-normal",
        5: "text-lg font-light",
        6: "text-base ",
    };

    const Tag = `h${level}`; // Dựa vào cấp độ để xác định thẻ HTML

    return (
        <Tag className={`antialiased ${sizes[level]} ${color} ${className}`}>
            {children}
        </Tag>
    );
};

export default Heading;
