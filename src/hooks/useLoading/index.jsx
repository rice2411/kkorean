import { useContext } from "react";
import { LoadingContext } from "@/contexts/LoadingOverlay";

const useLoading = () => {
    return useContext(LoadingContext);
};

export default useLoading;
