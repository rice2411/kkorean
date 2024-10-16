// Paragraph.tsx
import React from "react";

interface ParagraphProps {
    children: React.ReactNode;
    className?: string;
    color?: string;
    align?: "left" | "center" | "right" | "justify";
    onClick?: () => void;
}

const Paragraph: React.FC<ParagraphProps> = ({
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
