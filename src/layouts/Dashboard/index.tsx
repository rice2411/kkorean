import { AuthProvider } from "@/contexts/Auth";
import { LoadingProvider } from "@/contexts/LoadingOverlay";
import { DashboardTemplate } from "@/components/Templates";
import { ModalProvider } from "@/contexts/Modal";
import { useDocumentTitle } from "@/hooks";
function DashboardLayout() {
    useDocumentTitle("Quản lý");

    return (
        <>
            <LoadingProvider>
                <AuthProvider>
                    <ModalProvider>
                        <DashboardTemplate />
                    </ModalProvider>
                </AuthProvider>
            </LoadingProvider>
        </>
    );
}

export default DashboardLayout;
