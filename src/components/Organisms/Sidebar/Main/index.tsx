import React from "react";
import { Box, Link } from "@/components/Atoms";
import { IUI } from "@/interface";

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
  return (
    <Box className={`w-64 bg-white border-r h-screen p-4 ${blockClass || ""}`}>
      <ul className="space-y-2">
        {list.map((item, index) => (
          <li
            key={index}
            className={`flex items-center text-white hover:bg-gray-700 rounded-lg px-3 py-2 ${itemClass}`}
          >
            {item?.icon && <>{item?.icon}</>}
            <Link to={item?.url} className="flex-grow">
              {item?.text}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default MainSidebar;
