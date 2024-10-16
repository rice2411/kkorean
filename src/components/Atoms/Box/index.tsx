import React, { ForwardedRef } from "react";

interface BoxProps {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    id?: string;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
    (
        { children, className, onClick, onMouseEnter, onMouseLeave, id },
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        return (
            <div
                ref={ref}
                className={className}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                id={id}
            >
                {children}
            </div>
        );
    }
);

export default Box;
