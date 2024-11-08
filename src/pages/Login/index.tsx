import { ToastContainer } from "react-toastify";
import { LoginPage } from "@/components/Pages";
import { LoadingProvider } from "@/contexts/LoadingOverlay";
import { AuthProvider } from "@/contexts/Auth";
import { ModalProvider } from "@/contexts/Modal";
import { useEffect } from "react";
import NProgress from "nprogress";
function Login() {
  useEffect(() => {
    NProgress.done();
  }, []);
  return (
    <>
      <LoadingProvider>
        <AuthProvider>
          <ModalProvider>
            <LoginPage />
          </ModalProvider>
          <ToastContainer />
        </AuthProvider>
      </LoadingProvider>
    </>
  );
}

export default Login;
