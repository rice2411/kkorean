import React, { createContext, useState, ReactNode } from "react";
import { LoadingOverlay } from "@/components/Molecules";

interface LoadingContextType {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
  setLoadingText: (text: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("");

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider
      value={{ loading, showLoading, hideLoading, setLoadingText }}
    >
      {children}
      {loading && <LoadingOverlay loadingText={loadingText} />}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
