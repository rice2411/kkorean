import React from "react";

interface HeadingProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    children: React.ReactNode;
    className?: string;
    color?: string;
}

const Heading: React.FC<HeadingProps> = ({
    level = 1,
    children,
    className = "",
    color = "text-black",
}) => {
    const sizes: { [key: number]: string } = {
        1: "text-4xl font-bold",
        2: "text-3xl font-semibold",
        3: "text-2xl font-medium",
        4: "text-xl font-normal",
        5: "text-lg font-light",
        6: "text-base",
    };

    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <Tag className={`antialiased ${sizes[level]} ${color} ${className}`}>
            {children}
        </Tag>
    );
};

export default Heading;
