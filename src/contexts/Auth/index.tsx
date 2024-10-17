import React, { createContext, useEffect, useState, ReactNode } from "react";
import AuthUtils from "@/utils/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { CONFIG_CONSTANTS } from "@/constants/";
import { IUser } from "@/interface";

interface AuthContextType {
    user: IUser.BaseUser | null;
    handleLogin: (user: IUser.BaseUser) => Promise<void>;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [user, setUser] = useState<IUser.BaseUser | null>(
        AuthUtils.getUser()
    );

    const handleLogin = async (user: IUser.BaseUser) => {
        setUser(user);
        AuthUtils.login(user);
        if(!user?.isFirstTimeLogin) navigate("/");
    };

    const handleLogout = () => {
        setUser(null);
        AuthUtils.logout();
        navigate("/login");
    };

    useEffect(() => {
        if (!user && CONFIG_CONSTANTS.PROTECTED_ROUTE.includes(pathname)) {
            handleLogout();
        }
        if (
            user?.role !== CONFIG_CONSTANTS.USER_ROLE.ADMIN &&
            pathname.includes("dashboard")
        ) {
            navigate("/");
        }
    }, [pathname, user]);

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
