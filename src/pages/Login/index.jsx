import { ToastContainer } from "react-toastify";
import Login from "@/components/Pages/Login";
import { LoadingProvider } from "@/contexts/LoadingOverlay";
import { AuthProvider } from "@/contexts/Auth";

function LoginPage() {
    return (
        <>
            <LoadingProvider>
                <AuthProvider>
                    <Login />
                    <ToastContainer />
                </AuthProvider>
            </LoadingProvider>
        </>
    );
}

export default LoginPage;
