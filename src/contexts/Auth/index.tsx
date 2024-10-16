import React, { createContext, useEffect, useState, ReactNode } from "react";
import AuthUtils from "@/utils/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { CONFIG_CONSTANTS } from "@/constants/";

interface User {
    role: number;
    // Add any other user properties as needed
}

interface AuthContextType {
    user: User | null;
    handleLogin: (user: User) => Promise<void>;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [user, setUser] = useState<User | null>(AuthUtils.getUser());

    const handleLogin = async (user: User) => {
        setUser(user);
        AuthUtils.login(user);
        navigate("/");
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
