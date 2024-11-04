import React from "react";
interface BlurryBubbleProps {
  color: string;
  w: string;
  h: string;
  position: {
    top?: string | number;
    bottom?: string | number;
    left?: string | number;
    right?: string | number;
  };
  animationDelay?: string;
}
const BlurryBubble: React.FC<BlurryBubbleProps> = ({
  color,
  w,
  h,
  position,
  animationDelay = "",
}) => {
  return (
    <div
      style={{ width: w, height: h, backgroundColor: color, ...position }}
      className={`rounded-full mix-blend-multiply blur-xl opacity-60 absolute animate-blob ${animationDelay}`}
    ></div>
  );
};
export default BlurryBubble;
