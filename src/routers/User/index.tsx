import { UserLayout } from "@/layouts";
import { User } from "@/pages";
import { RouteObject } from "react-router-dom";

const MainRouter: RouteObject = {
  element: <UserLayout />,
  path: "/user",
  children: [
      {
          path: "profile",
          element: <User.Profile />,
      }
  ]
};

export default MainRouter;
