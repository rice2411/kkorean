import { AuthProvider } from "@/contexts/Auth";
import { LoadingProvider } from "@/contexts/LoadingOverlay";
import { DashboardTemplate } from "@/components/Templates";
import { ModalProvider } from "@/contexts/Modal";
function DashboardLayout() {
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
