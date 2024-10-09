import React, { createContext, useState } from "react";
import { LoadingOverlay } from "@/components/Molecules";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const showLoading = () => setLoading(true);
    const hideLoading = () => setLoading(false);

    return (
        <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
            {children}
            {loading && <LoadingOverlay />}
        </LoadingContext.Provider>
    );
};

export { LoadingContext, LoadingProvider };
