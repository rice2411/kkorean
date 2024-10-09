import React, { useState } from "react";
import { Box } from "@/components/Atoms";

const Tooltip = ({ text, position = "top", children }) => {
    const [visible, setVisible] = useState(false);

    const positionClasses = {
        top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
        bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
        left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
        right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
    };

    return (
        <Box className="relative inline-block">
            <Box
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
            >
                {children}
            </Box>
            {visible && (
                <Box
                    className={`absolute z-10 p-2 text-black bg-white rounded-md shadow-md whitespace-nowrap ${positionClasses[position]}`}
                >
                    {text}
                    <Box
                        className={`absolute w-2 h-2 bg-white rotate-45 ${getArrowPosition(
                            position
                        )}`}
                    ></Box>
                </Box>
            )}
        </Box>
    );
};

const getArrowPosition = (position) => {
    switch (position) {
        case "top":
            return "top-full left-1/2 transform -translate-x-1/2";
        case "bottom":
            return "-top-1 left-1/2 transform -translate-x-1/2";
        case "left":
            return "top-1/2 left-full transform -translate-y-1/2";
        case "right":
            return "top-1/2 -left-1 transform -translate-y-1/2";
        default:
            return "";
    }
};

export default Tooltip;
