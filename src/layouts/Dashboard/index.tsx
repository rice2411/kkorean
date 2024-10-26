import { DashboardTemplate } from "@/components/Templates";
import { useDocumentTitle } from "@/hooks";
import AppProvider from "../provider";
function DashboardLayout() {
  useDocumentTitle("Quản lý");

  return (
    <>
      <AppProvider>
        <DashboardTemplate />
      </AppProvider>
    </>
  );
}

export default DashboardLayout;
