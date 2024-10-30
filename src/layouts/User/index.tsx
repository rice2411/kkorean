import { AuthProvider } from "@/contexts/Auth";
import { LoadingProvider } from "@/contexts/LoadingOverlay";
import { useDocumentTitle } from "@/hooks";
import { MAIN_USER_ITEMS } from "@/constants/sidebar";
import { MainHaveSidebarTemplate } from "@/components/Templates";

function UserLayout() {
    useDocumentTitle("Profile");
    return (
        <>
            <LoadingProvider>
                <AuthProvider>
                    <MainHaveSidebarTemplate listSidebar={MAIN_USER_ITEMS} />
                </AuthProvider>
            </LoadingProvider>
        </>
    );
}

export default UserLayout;
