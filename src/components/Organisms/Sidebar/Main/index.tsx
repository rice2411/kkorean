import React from "react";
import { Box, Link } from "@/components/Atoms";
import { IUI } from "@/interface";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  list: IUI.SidebarItem[];
  blockClass?: string;
  itemClass?: string;
}

const MainSidebar: React.FC<SidebarProps> = ({
  list,
  blockClass,
  itemClass,
}) => {
  const location = useLocation();
  return (
    <Box className={`w-64 bg-white h-screen p-4 ${blockClass || ""}`}>
      <ul className="space-y-2">
        {list.map((item, index) => (
          <li
            key={index}
            className={`flex items-center gap-2 text-white hover:bg-gray-300 rounded-lg px-3 py-2 ${
              itemClass || ""
            } ${location.pathname === item.href ? "bg-gray-300" : ""}`}
          >
            {item?.icon && <>{item?.icon}</>}
            <Link to={item?.href} className="flex-grow">
              {item?.text}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default MainSidebar;
