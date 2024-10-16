import React, { useEffect, useState } from "react";

interface ImageProps {
    src: string;
    alt?: string;
    className?: string;
    width?: string;
    height?: string;
    rounded?: boolean;
    onClick?: React.MouseEventHandler<HTMLImageElement>;
    id?: string;
}

const Image: React.FC<ImageProps> = ({
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
    const [url, setUrl] = useState<string>("https://placehold.co/50x50/png");

    useEffect(() => {
        setUrl(src);
    }, [src]);

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
