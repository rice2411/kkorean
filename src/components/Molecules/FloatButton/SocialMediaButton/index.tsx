import React, { useEffect, useId, useState } from "react";
import { Box, Image } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";
import { Tooltip } from "@/components/Atoms";

interface SocialMediaItem {
    icon: string;
    id: string;
    link: string;
    text: string;
}

const SocialMediaButton: React.FC = () => {
    const data: SocialMediaItem[] = [
        {
            icon: "facebook",
            id: "facebook",
            link: "https://www.facebook.com/rice2411/",
            text: "Liên hệ tại Facebook",
        },
        {
            icon: "zalo",
            id: "zalo",
            link: "https://zalo.me/0776750418",
            text: "Liên hệ tại Zalo",
        },
    ];

    const [position, setPosition] = useState<string>("bottom-5");

    const handleClick = (id: string) => {
        const item = data.find((item) => item.id === id);
        if (item) {
            window.open(item.link, "_blank");
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setPosition(window.scrollY > 300 ? "bottom-24" : "bottom-5");
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Box className={`flex flex-col fixed right-5 ${position}`}>
            {data.map((item) => (
                <Tooltip text={item.link} position="left" key={useId()}>
                    <Box
                        className="cursor-pointer flex justify-center items-center w-14 h-14 bg-white text-black p-3 rounded-full shadow-lg mt-3"
                        aria-label="Social media link"
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
