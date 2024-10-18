import React, { createContext, useEffect, useState, ReactNode } from "react";
import AuthUtils from "@/utils/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { CONFIG_CONSTANTS } from "@/constants/";
import { IContext, IUser } from "@/interface";
import { FirebaseService } from "@/services";
import { useLoading } from "@/hooks";

interface AuthContextType {
  user: IUser.BaseUser | null;
  handleLogin: (user: IUser.BaseUser) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { loading, showLoading, hideLoading } =
    useLoading() as unknown as IContext.ILoadingContext.UseLoadingReturnType;
  const { pathname } = useLocation();
  const [user, setUser] = useState<IUser.BaseUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true); // Trạng thái để quản lý việc khởi tạo

  const handleLogin = async (user: IUser.BaseUser) => {
    setUser(user);
    AuthUtils.login(user);
    navigate("/");
  };

  const handleLogout = async () => {
    showLoading();
    setUser(null);
    navigate("/login");
    AuthUtils.logout();
    await FirebaseService.logout();
    hideLoading();
  };

  useEffect(() => {
    const unsubscribe = FirebaseService.onAuthStateChanged((baseUser) => {
      setUser(baseUser);
      setIsInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!isInitializing && !user) {
        navigate("/login");
      }

      if (
        user &&
        user?.role !== CONFIG_CONSTANTS.EUserRole.ADMIN &&
        pathname.includes("dashboard")
      ) {
        navigate("/");
      }
    }
  }, [pathname, user, isInitializing]);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
