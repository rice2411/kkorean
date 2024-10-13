// Image.js
import Toast from "@/utils/Toast";
import React, { useEffect, useState } from "react";

const Image = ({
    src,
    alt = "Image",
    className = "",
    width = "",
    height = "",
    rounded = false,
    onClick,
    id,
}) => {
    const roundedClass = rounded ? "rounded-full" : "";

    const [url, setUrl] = useState("");

    const fetchUrl = async () => {
        try {
            const response = await src;
            setUrl(response);
        } catch (err) {
            setUrl("https://placehold.co/600x400/png");
        }
    };

    useEffect(() => {
        fetchUrl();
    }, []);

    return (
        <img
            id={id}
            src={url}
            alt={alt}
            className={`${roundedClass} ${className}`}
            style={{ width, height }}
            onClick={onClick}
            loading="lazy"
        />
    );
};

export default Image;
