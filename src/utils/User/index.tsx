import { IUser } from "@/interface";

const UserUtils = {
  setUser: (user: IUser.BaseUser) => {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  },
  getUser: (): IUser.DetailedUser | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  removeUser: (): boolean => {
    try {
      localStorage.removeItem("user");
      return true;
    } catch (err) {
      console.error("Error during logout:", err); // Log the error for debugging
      return false;
    }
  },
};

export default UserUtils;
