// Link.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@/components/Atoms";

interface LinkProps {
  to?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Link: React.FC<LinkProps> = ({
  to = "#",
  children,
  className = "",
  onClick = null,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      className={`${className} text-black hover:text-primary-500 cursor-pointer transition duration-300`}
      onClick={() => {
        if (onClick) {
          onClick();
        }
        navigate(to);
      }}
    >
      {children}
    </Box>
  );
};

export default Link;
