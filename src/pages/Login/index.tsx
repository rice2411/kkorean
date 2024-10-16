import { ToastContainer } from "react-toastify";
import { LoginPage } from "@/components/Pages";
import { LoadingProvider } from "@/contexts/LoadingOverlay";
import { AuthProvider } from "@/contexts/Auth";

function Login() {
    return (
        <>
            <LoadingProvider>
                <AuthProvider>
                    <LoginPage />
                    <ToastContainer />
                </AuthProvider>
            </LoadingProvider>
        </>
    );
}

export default Login;