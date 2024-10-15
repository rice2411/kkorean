import { useState, useEffect } from "react";

const Svg = ({
    src,
    className,
    width = 0,
    height = 0,
    fill = "currentColor",
    viewBox = "0 0 20 20",
}) => {
    const [svgContent, setSvgContent] = useState(null);

    useEffect(() => {
        fetch(src)
            .then((response) => response.text())
            .then((data) => setSvgContent(data));
    }, []);

    return (
        <svg
            viewBox={viewBox}
            className={className}
            width={width}
            height={height}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            fill={fill}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
        />
    );
};

export default Svg;
