import { ToastContainer } from "react-toastify";
import { LoginPage } from "@/components/Pages";
import { LoadingProvider } from "@/contexts/LoadingOverlay";
import { AuthProvider } from "@/contexts/Auth";
import { ModalProvider } from "@/contexts/Modal";

function Login() {
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
