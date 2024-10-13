// src/components/BackToTopButton.jsx

import React, { useEffect, useId, useState } from "react";
import { Box, Image } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";
import { Tooltip } from "@/components/Atoms";

const SocialMediaButton = () => {
    const data = [
        {
            icon: "facebook",
            id: "facebook",
            link: "https://www.facebook.com/rice2411/",
            text: `Liên hệ tại Facebook`,
        },
        {
            icon: "zalo",
            id: "zalo",
            link: "https://zalo.me/0776750418",
            text: `Liên hệ tại Zalo`,
        },
    ];

    const [position, setPosition] = useState("bottom-5");

    const handleClick = (id) => {
        window.open(data.find((item) => item.id === id).link, "_blank");
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setPosition("bottom-24");
            } else {
                setPosition("bottom-5");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <Box className={`flex flex-col fixed right-5 ${position}`}>
            {data.map((item) => (
                <Tooltip text={item.link} position="left" key={useId()}>
                    <Box
                        className="cursor-pointer flex justify-center items-center w-14 h-14  bg-white text-black p-3 rounded-full shadow-lg mt-3"
                        aria-label="Back to top"
                        onClick={() => handleClick(item.id)}
                    >
                        <Image
                            src={FileHelpers.getLocalFile(item.icon, "png")}
                            className="h-7 w-7"
                        />
                    </Box>
                </Tooltip>
            ))}
        </Box>
    );
};

export default SocialMediaButton;
