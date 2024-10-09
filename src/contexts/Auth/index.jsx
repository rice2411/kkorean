import React, { createContext, useEffect, useState } from "react";
import AuthUtils from "@/utils/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { PROTECTED_ROUTE } from "@/constants/route";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [user, setUser] = useState(AuthUtils.getUser());

    const handleLogin = (user) => {
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
        if (!user && PROTECTED_ROUTE.includes(pathname)) {
            handleLogout();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
