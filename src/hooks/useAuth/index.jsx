import { useContext } from "react";
import { AuthContext } from "@/contexts/Auth";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
