import React, { CSSProperties, ForwardedRef } from "react";

interface BoxProps {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties; // Added style property
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  id?: string;
}

const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    { children, className, style, onClick, onMouseEnter, onMouseLeave, id },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={className}
        style={style} // Applied the style property here
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
