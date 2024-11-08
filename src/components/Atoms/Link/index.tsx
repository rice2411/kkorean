import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box } from "@/components/Atoms";
import NProgress from "nprogress";

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
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    if (pathname === to) return;
    NProgress.start();
    if (onClick) onClick();
    navigate(to);
  }, [to, onClick, navigate]);

  return (
    <Box
      className={`${className} text-black hover:text-primary-500 cursor-pointer transition duration-300`}
      onClick={handleClick}
    >
      {children}
    </Box>
  );
};

export default Link;
