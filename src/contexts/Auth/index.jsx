import React, { createContext, useEffect, useState } from "react";
import AuthUtils from "@/utils/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { CONFIG_CONSTANTS } from "@/constants/";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [user, setUser] = useState(AuthUtils.getUser());

    const handleLogin = async (user) => {
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
    }, [pathname]);

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
