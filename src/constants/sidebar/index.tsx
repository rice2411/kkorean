import { Svg } from "@/components/Atoms";
import { FileHelpers } from "@/helpers";
import { IUI } from "@/interface";

const MAIN_USER_ITEMS: IUI.SidebarItem[] = [
  {
      href: "/user/profile",
      icon: (
          <Svg
              className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
              fill="currentColor"
              viewBox="0 0 20 20"
              src={FileHelpers.getLocalFile("statictis", "path")}
          ></Svg>
      ),
      text: "Thông Tin Cá Nhân",
  },
  {
      href: "/user/profile",
      icon: (
          <Svg
              className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
              fill="currentColor"
              viewBox="0 0 20 20"
              src={FileHelpers.getLocalFile("exams", "path")}
          ></Svg>
      ),
      text: "Bảo Mật",
  },
  {
      href: "/user/profile",
      icon: (
          <Svg
              className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
              fill="currentColor"
              viewBox="0 0 20 20"
              src={FileHelpers.getLocalFile("groupAccount", "path")}
          ></Svg>
      ),
      text: "Hệ Thống Điểm",
  }
];

export { MAIN_USER_ITEMS }