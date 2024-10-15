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

    const [url, setUrl] = useState("https://placehold.co/50x50/png");

    useEffect(() => {
        setUrl(src);
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
