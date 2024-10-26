import { AuthProvider } from "@/contexts/Auth";
import { LoadingProvider } from "@/contexts/LoadingOverlay";
import { ModalProvider } from "@/contexts/Modal";
import { useOffline } from "@/hooks";
import { ReactNode } from "react";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  useOffline();
  return (
    <>
      <LoadingProvider>
        <AuthProvider>
          <ModalProvider>{children}</ModalProvider>
        </AuthProvider>
      </LoadingProvider>
    </>
  );
};

export default AppProvider;
