import { IUser } from "@/interface";

interface UseAuthReturnType {
    user: IUser.DetailedUser;
    handleLogin: (user: IUser.BaseUser) => void;
    handleLogout: () => void;
}

export type { UseAuthReturnType };
