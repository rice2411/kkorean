import { AuthProvider } from "@/contexts/Auth";
import { LoadingProvider } from "@/contexts/LoadingOverlay";
import { MainTemplate } from "@/components/Templates";

function MainLayout() {
    return (
        <>
            <LoadingProvider>
                <AuthProvider>
                    <MainTemplate />
                </AuthProvider>
            </LoadingProvider>
        </>
    );
}

export default MainLayout;
