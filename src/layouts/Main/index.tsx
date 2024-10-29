import { MainTemplate } from "@/components/Templates";
import { useDocumentTitle } from "@/hooks";
import AppProvider from "../provider";

function MainLayout() {
  useDocumentTitle("Trang chủ");
  return (
    <>
      <AppProvider>
        <MainTemplate />
      </AppProvider>
    </>
  );
}

export default MainLayout;
