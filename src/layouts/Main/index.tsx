import { AuthProvider } from "@/contexts/Auth";
import { LoadingProvider } from "@/contexts/LoadingOverlay";
import { MainTemplate } from "@/components/Templates";
import { useDocumentTitle } from "@/hooks";

function MainLayout() {
    useDocumentTitle("Trang chủ");
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
