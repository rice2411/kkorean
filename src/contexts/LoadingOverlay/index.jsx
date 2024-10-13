import React, { createContext, useState } from "react";
import { LoadingOverlay } from "@/components/Molecules";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");

    const showLoading = () => setLoading(true);
    const hideLoading = () => setLoading(false);

    return (
        <LoadingContext.Provider value={{ loading, showLoading, hideLoading ,setLoadingText}}>
            {children}
            {loading && <LoadingOverlay loadingText={loadingText} />}
        </LoadingContext.Provider>
    );
};

export { LoadingContext, LoadingProvider };
