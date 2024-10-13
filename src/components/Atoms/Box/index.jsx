import React from "react";

const Box = React.forwardRef(
    (
        { children, className, onClick, onMouseEnter, onMouseLeave, name, id },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={className}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                name={name}
                id={id}
            >
                {children}
            </div>
        );
    }
);
export default Box;
