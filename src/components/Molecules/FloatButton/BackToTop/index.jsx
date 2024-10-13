// src/components/BackToTopButton.jsx

import React, { useState, useEffect } from "react";
import { Box } from "@/components/Atoms";

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {isVisible && (
                <Box
                    onClick={scrollToTop}
                    className="cursor-pointer fixed flex justify-center items-center text-3xl bottom-5 w-14 h-14 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
                    aria-label="Back to top"
                >
                    ↑
                </Box>
            )}
        </>
    );
};

export default BackToTopButton;
